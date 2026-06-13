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
  // Always returns the latest section data regardless of React render cycle
  getLatestSection: <K extends keyof SiteContent>(section: K, lang?: Lang) => SiteContent[K];
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

function syncSharedMediaFields(all: Record<Lang, SiteContent>): Record<Lang, SiteContent> {
  const newsletterImage = all.cs.newsletter?.image;
  if (!newsletterImage) return all;

  return {
    ...all,
    en: {
      ...all.en,
      newsletter: { ...all.en.newsletter, image: newsletterImage },
    },
    ua: {
      ...all.ua,
      newsletter: { ...all.ua.newsletter, image: newsletterImage },
    },
  };
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
  }, [initialContent]);

  // ── Autosave helper ──────────────────────────────────────────────────────
  const flushSave = useCallback(async () => {
    const pending = Array.from(pendingSectionsRef.current.entries());
    if (pending.length === 0) return;
    pendingSectionsRef.current.clear();
    setSaveStatus("saving");
    const all = syncSharedMediaFields(allLangContentRef.current);
    allLangContentRef.current = all;
    setAllLangContent(all);
    try {
      const responses = await Promise.all(
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
      const failed = await Promise.all(
        responses
          .filter(r => !r.ok)
          .map(async r => `${r.status} ${r.url}: ${await r.text().catch(() => "")}`)
      );
      if (failed.length > 0) {
        console.error("[ContentContext] Save failed:", failed);
        throw new Error(`${failed.length} save(s) failed`);
      }
      setSavedAllLangContent({ ...allLangContentRef.current });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("[ContentContext] flushSave error:", err);
      setSaveStatus("unsaved");
    }
  }, []);

  // ── updateSection ────────────────────────────────────────────────────────
  const updateSection = useCallback(
    <K extends keyof SiteContent>(section: K, data: SiteContent[K], lang?: Lang) => {
      const targetLang = lang ?? currentLang;
      // Compute next state and update the ref SYNCHRONOUSLY — so any immediate
      // saveSection() call reads the correct new data, not the stale value.
      const prev = allLangContentRef.current;
      let next = {
        ...prev,
        [targetLang]: { ...prev[targetLang], [section]: data },
      };
      if (section === "newsletter") {
        const image = (data as SiteContent["newsletter"]).image;
        if (image) {
          next = {
            ...next,
            cs: { ...next.cs, newsletter: { ...next.cs.newsletter, image } },
            en: { ...next.en, newsletter: { ...next.en.newsletter, image } },
            ua: { ...next.ua, newsletter: { ...next.ua.newsletter, image } },
          };
        }
      }
      allLangContentRef.current = next;
      historyRef.current = [...historyRef.current.slice(-(MAX_HISTORY - 1)), prev];
      setAllLangContent(next);
      setCanUndo(true);
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
    const all = syncSharedMediaFields(allLangContentRef.current);
    allLangContentRef.current = all;
    setAllLangContent(all);
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

  // Reads from the mutable ref — always returns the latest data even during async operations
  // where the React state in the caller's closure may be stale (e.g. after an image upload).
  const getLatestSection = useCallback(<K extends keyof SiteContent>(section: K, lang?: Lang): SiteContent[K] => {
    const targetLang = lang ?? currentLang;
    return allLangContentRef.current[targetLang][section];
  }, [currentLang]);

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
    getLatestSection,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}
