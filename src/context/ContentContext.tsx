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
import { SiteContent, DEFAULT_CONTENT } from "@/lib/content-types";

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
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
  saveSection: (section: keyof SiteContent) => Promise<void>;
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

const MAX_HISTORY = 30;
const AUTOSAVE_DELAY = 1500; // ms

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [savedContent, setSavedContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [admin, setAdmin] = useState<AdminState>({ isAdmin: false, email: null, setupRequired: false });
  const [canUndo, setCanUndo] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [contentLoaded, setContentLoaded] = useState(false);

  const historyRef = useRef<SiteContent[]>([]);
  const contentRef = useRef<SiteContent>(DEFAULT_CONTENT); // always up-to-date ref for closures
  const pendingSectionsRef = useRef<Set<string>>(new Set());
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep contentRef in sync
  contentRef.current = content;

  // ── Load on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([
      fetch("/api/content").then(r => r.json()),
      fetch("/api/admin/me").then(r => r.json()),
    ]).then(([contentData, meData]) => {
      setContent(contentData);
      setSavedContent(contentData);
      contentRef.current = contentData;
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
    const sections = Array.from(pendingSectionsRef.current);
    if (sections.length === 0) return;
    pendingSectionsRef.current.clear();
    setSaveStatus("saving");
    try {
      await Promise.all(
        sections.map(sec =>
          fetch("/api/content", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ section: sec, content: contentRef.current[sec as keyof SiteContent] }),
          })
        )
      );
      setSavedContent({ ...contentRef.current });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("unsaved");
    }
  }, []);

  // ── updateSection — called by all editors ────────────────────────────────
  const updateSection = useCallback(
    <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
      setContent(prev => {
        const next = { ...prev, [section]: data };
        historyRef.current = [...historyRef.current.slice(-(MAX_HISTORY - 1)), prev];
        setCanUndo(true);
        return next;
      });

      // Queue autosave
      pendingSectionsRef.current.add(section as string);
      setSaveStatus("unsaved");
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(flushSave, AUTOSAVE_DELAY);
    },
    [flushSave]
  );

  // ── Undo ──────────────────────────────────────────────────────────────────
  const undo = useCallback(() => {
    const history = historyRef.current;
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    historyRef.current = history.slice(0, -1);
    setContent(prev);
    setCanUndo(historyRef.current.length > 0);
    // Queue autosave for reverted state
    Object.keys(prev).forEach(sec => pendingSectionsRef.current.add(sec));
    setSaveStatus("unsaved");
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(flushSave, AUTOSAVE_DELAY);
  }, [flushSave]);

  // ── Explicit save (single section) ───────────────────────────────────────
  const saveSection = useCallback(async (section: keyof SiteContent) => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    pendingSectionsRef.current.add(section as string);
    await flushSave();
  }, [flushSave]);

  // ── Save all ──────────────────────────────────────────────────────────────
  const saveAll = useCallback(async () => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    Object.keys(contentRef.current).forEach(sec => pendingSectionsRef.current.add(sec));
    await flushSave();
  }, [flushSave]);

  // ── Revert section to last saved ─────────────────────────────────────────
  const revertSection = useCallback((section: keyof SiteContent) => {
    setContent(prev => {
      historyRef.current = [...historyRef.current.slice(-(MAX_HISTORY - 1)), prev];
      setCanUndo(true);
      return { ...prev, [section]: savedContent[section] };
    });
  }, [savedContent]);

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

  return (
    <ContentContext.Provider value={{
      content, savedContent, admin, canUndo, saveStatus, contentLoaded,
      updateSection, saveSection, saveAll, revertSection, undo, logout, refreshAdmin,
    }}>
      {children}
    </ContentContext.Provider>
  );
}
