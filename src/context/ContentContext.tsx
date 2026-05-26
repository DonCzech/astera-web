"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { SiteContent, DEFAULT_CONTENT } from "@/lib/content-types";
import { Lang, detectLang, getDefaultContent } from "@/lib/i18n";

interface AdminState {
  isAdmin: boolean;
  email: string | null;
  setupRequired: boolean;
}

export type SaveStatus = "saved" | "saving" | "unsaved" | "idle";

interface ContentContextValue {
  content: SiteContent;
  savedContent: SiteContent;
  admin: AdminState;
  canUndo: boolean;
  saveStatus: SaveStatus;
  contentLoaded: boolean;
  currentLang: Lang;
  allLangContent: Record<Lang, SiteContent>;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K], lang?: Lang) => void;
  saveSection: (section: keyof SiteContent, lang?: Lang) => Promise<void>;
  saveAll: () => Promise<void>;
  revertSection: (section: keyof SiteContent) => void;
  undo: () => void;
  logout: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}

export type InitialContent = Record<Lang, SiteContent>;

const MAX_HISTORY = 30;
const AUTOSAVE_DELAY = 1500;

const LANGS: Lang[] = ["cs", "en", "ua"];

// Initial state with empty navItems — prevents stale DEFAULT_CONTENT nav
// from flashing before the DB value loads.
function makeEmptyNavContent(base: SiteContent): SiteContent {
  return { ...base, header: { ...base.header, navItems: [] } };
}

export function ContentProvider({ children, initialContent }: { children: ReactNode; initialContent?: InitialContent }) {
  const pathname = usePathname();
  const currentLang: Lang = detectLang(pathname ?? "/");

  const emptyNav = {
    cs: makeEmptyNavContent(DEFAULT_CONTENT),
    en: makeEmptyNavContent(getDefaultContent("en")),
    ua: makeEmptyNavContent(getDefaultContent("ua")),
  };

  const [allLangContent, setAllLangContent] = useState<Record<Lang, SiteContent>>(
    initialContent ?? emptyNav
  );
  const [savedAllLangContent, setSavedAllLangContent] = useState<Record<Lang, SiteContent>>(
    initialContent ?? emptyNav
  );
  const [admin, setAdmin] = useState<AdminState>({ isAdmin: false, email: null, setupRequired: false });
  const [canUndo, setCanUndo] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [contentLoaded, setContentLoaded] = useState(false);

  const historyRef = useRef<Record<Lang, SiteContent>[]>([]);
  const allLangContentRef = useRef<Record<Lang, SiteContent>>(allLangContent);
  const pendingSectionsRef = useRef<Map<string, Lang>>(new Map()); // "section:lang" → Lang
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    allLangContentRef.current = allLangContent;
  }, [allLangContent]);

  // ── Load on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (initialContent) {
      // SSR already provided content — only check admin status client-side
      allLangContentRef.current = initialContent;
      setContentLoaded(true);
      fetch("/api/admin/me").then(r => r.json()).then(meData => {
        setAdmin({
          isAdmin: meData.admin === true,
          email: meData.email || null,
          setupRequired: meData.setupRequired === true,
        });
      });
      return;
    }

    Promise.all([
      fetch("/api/content?lang=cs").then(r => r.json()),
      fetch("/api/content?lang=en").then(r => r.json()),
      fetch("/api/content?lang=ua").then(r => r.json()),
      fetch("/api/admin/me").then(r => r.json()),
    ]).then(([cs, en, ua, meData]) => {
      const loaded = { cs, en, ua } as Record<Lang, SiteContent>;
      setAllLangContent(loaded);
      setSavedAllLangContent(loaded);
      allLangContentRef.current = loaded;
      historyRef.current = [];
      setCanUndo(false);
      setSaveStatus("idle");
      setContentLoaded(true);
      setAdmin({
        isAdmin: meData.admin === true,
        email: meData.email || null,
        setupRequired: meData.setupRequired === true,
      });
    });
  }, []);

  // ── Autosave helper ──────────────────────────────────────────────────────
  const flushSave = useCallback(async () => {
    const pending = Array.from(pendingSectionsRef.current.entries());
    if (pending.length === 0) return;
    pendingSectionsRef.current.clear();
    setSaveStatus("saving");
    const all = allLangContentRef.current;
    try {
      await Promise.all(
        pending.map(([key, lang]) => {
          const section = key.split(":")[0];
          return fetch("/api/content", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              section,
              content: all[lang][section as keyof SiteContent],
              lang,
            }),
          });
        })
      );
      setSavedAllLangContent({ ...allLangContentRef.current });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("unsaved");
    }
  }, []);

  // ── updateSection ────────────────────────────────────────────────────────
  const updateSection = useCallback(
    <K extends keyof SiteContent>(section: K, data: SiteContent[K], lang?: Lang) => {
      const targetLang = lang ?? currentLang;
      setAllLangContent(prev => {
        const next = {
          ...prev,
          [targetLang]: { ...prev[targetLang], [section]: data },
        };
        historyRef.current = [...historyRef.current.slice(-(MAX_HISTORY - 1)), prev];
        setCanUndo(true);
        return next;
      });
      pendingSectionsRef.current.set(`${String(section)}:${targetLang}`, targetLang);
      setSaveStatus("unsaved");
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(flushSave, AUTOSAVE_DELAY);
    },
    [flushSave, currentLang]
  );

  // ── Undo ──────────────────────────────────────────────────────────────────
  const undo = useCallback(() => {
    const history = historyRef.current;
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    historyRef.current = history.slice(0, -1);
    setAllLangContent(prev);
    setCanUndo(historyRef.current.length > 0);
    LANGS.forEach(lang =>
      Object.keys(prev[lang]).forEach(sec =>
        pendingSectionsRef.current.set(`${sec}:${lang}`, lang)
      )
    );
    setSaveStatus("unsaved");
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(flushSave, AUTOSAVE_DELAY);
  }, [flushSave]);

  // ── Explicit save (single section) ───────────────────────────────────────
  const saveSection = useCallback(async (section: keyof SiteContent, lang?: Lang) => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    const targetLang = lang ?? currentLang;
    pendingSectionsRef.current.set(`${String(section)}:${targetLang}`, targetLang);
    await flushSave();
  }, [flushSave, currentLang]);

  // ── Save all ──────────────────────────────────────────────────────────────
  const saveAll = useCallback(async () => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    const all = allLangContentRef.current;
    LANGS.forEach(lang =>
      Object.keys(all[lang]).forEach(sec =>
        pendingSectionsRef.current.set(`${sec}:${lang}`, lang)
      )
    );
    await flushSave();
  }, [flushSave]);

  // ── Revert section ────────────────────────────────────────────────────────
  const revertSection = useCallback((section: keyof SiteContent) => {
    setAllLangContent(prev => {
      historyRef.current = [...historyRef.current.slice(-(MAX_HISTORY - 1)), prev];
      setCanUndo(true);
      const next = { ...prev };
      LANGS.forEach(lang => {
        next[lang] = { ...prev[lang], [section]: savedAllLangContent[lang][section] };
      });
      return next;
    });
  }, [savedAllLangContent]);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const refreshAdmin = useCallback(async () => {
    const meData = await fetch("/api/admin/me").then(r => r.json());
    setAdmin({
      isAdmin: meData.admin === true,
      email: meData.email || null,
      setupRequired: meData.setupRequired === true,
    });
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAdmin({ isAdmin: false, email: null, setupRequired: false });
    historyRef.current = [];
    setCanUndo(false);
  }, []);

  const content = allLangContent[currentLang];
  const savedContent = savedAllLangContent[currentLang];

  const value: ContentContextValue = {
    content,
    savedContent,
    admin,
    canUndo,
    saveStatus,
    contentLoaded,
    currentLang,
    allLangContent,
    updateSection,
    saveSection,
    saveAll,
    revertSection,
    undo,
    logout,
    refreshAdmin,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}
