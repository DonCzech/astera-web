"use client";
import { useRef, useLayoutEffect, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useContent } from "@/context/ContentContext";
import { SiteContent } from "@/lib/content-types";

function getPath(obj: any, path: string): string {
  return String(path.split(".").reduce((o: any, k: string) => o?.[k], obj) ?? "");
}

function setPath(obj: any, path: string, val: string): any {
  const parts = path.split(".");
  if (parts.length === 1) return { ...obj, [path]: val };
  const [k, i, p] = parts;
  const arr = [...(obj[k] as any[])];
  arr[+i] = { ...arr[+i], [p]: val };
  return { ...obj, [k]: arr };
}

const FONTS = ["Poppins", "Playfair Display", "Arial", "Georgia", "Verdana", "Times New Roman"];
const SIZES = ["11","12","13","14","15","16","18","20","22","24","28","32","38","48","56","64"];

interface Props {
  section: keyof SiteContent;
  field: string;
  tag?: string;
  style?: React.CSSProperties;
  className?: string;
  richText?: boolean;
}

export default function EditableText({
  section, field, tag = "span", style, className, richText,
}: Props) {
  const { content, admin, updateSection } = useContent();
  const ref = useRef<HTMLElement>(null);
  const editing = useRef(false);   // true while user is actively typing
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tbPos, setTbPos] = useState<{ top: number; left: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const value = getPath(content[section], field);
  const isAdmin = admin.isAdmin;

  // ── Sync innerHTML to DOM (admin mode only) ────────────────────────────────
  // useLayoutEffect: runs synchronously after DOM update → no flash of empty content.
  // Fires when: value changes (external edit from panel) OR isAdmin becomes true.
  // Skips update while user is actively typing (editing.current = true).
  useLayoutEffect(() => {
    if (isAdmin && !editing.current && ref.current) {
      ref.current.innerHTML = value;
    }
  }, [value, isAdmin]);

  // ── Toolbar position ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!focused || !ref.current) { setTbPos(null); return; }
    const update = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const top = r.top < 62 ? r.bottom + 6 : r.top - 50;
      const left = Math.max(8, Math.min(r.left, window.innerWidth - 390));
      setTbPos({ top, left });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [focused]);

  // ── Formatting helpers ──────────────────────────────────────────────────────
  // If user has no selection → select all text in the element first
  const ensureSelection = useCallback(() => {
    if (!ref.current) return;
    ref.current.focus();
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, []);

  const applyCommand = useCallback((fn: () => void) => {
    ensureSelection();
    fn();
    setFocused(true);
  }, [ensureSelection]);

  const applySize = useCallback((px: string) => {
    if (!ref.current) return;
    ensureSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = px + "px";
    try { range.surroundContents(span); }
    catch { document.execCommand("insertHTML", false, `<span style="font-size:${px}px">${sel}</span>`); }
  }, [ensureSelection]);

  const El = (tag || "span") as any;

  // ── Non-admin: always render with content ──────────────────────────────────
  if (!isAdmin) {
    if (richText) {
      return <El style={style} className={className} dangerouslySetInnerHTML={{ __html: value }} />;
    }
    return <El style={style} className={className}>{value}</El>;
  }

  // ── Admin: floating toolbar ────────────────────────────────────────────────
  const toolbar = mounted && focused && tbPos
    ? createPortal(
        <div
          onMouseDown={e => e.preventDefault()}
          style={{
            position: "fixed",
            top: tbPos.top,
            left: tbPos.left,
            zIndex: 999999,
            background: "#111827",
            borderRadius: 10,
            padding: "5px 10px",
            display: "flex",
            gap: 4,
            alignItems: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.55)",
            fontFamily: "sans-serif",
            userSelect: "none",
          }}
        >
          {/* B / I / U */}
          {(["B","I","U"] as const).map((l) => {
            const cmd = l === "B" ? "bold" : l === "I" ? "italic" : "underline";
            return (
              <button key={l} type="button" title={cmd}
                onClick={() => applyCommand(() => document.execCommand(cmd, false))}
                style={{ fontWeight: l === "B" ? 700 : 400, fontStyle: l === "I" ? "italic" : "normal",
                  textDecoration: l === "U" ? "underline" : "none", padding: "3px 8px",
                  background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                  cursor: "pointer", fontSize: 13, borderRadius: 5, minWidth: 28 }}
              >{l}</button>
            );
          })}

          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />

          {/* Font size */}
          <select defaultValue=""
            onChange={e => { applyCommand(() => applySize(e.target.value)); e.target.value = ""; }}
            style={{ fontSize: 11, background: "#1f2937", color: "#fff", border: "1px solid #374151", borderRadius: 5, padding: "3px 4px", maxWidth: 72 }}
          >
            <option value="" disabled>Vel.</option>
            {SIZES.map(s => <option key={s} value={s}>{s}px</option>)}
          </select>

          {/* Font family */}
          <select defaultValue=""
            onChange={e => { applyCommand(() => document.execCommand("fontName", false, e.target.value)); e.target.value = ""; }}
            style={{ fontSize: 11, background: "#1f2937", color: "#fff", border: "1px solid #374151", borderRadius: 5, padding: "3px 4px", maxWidth: 110 }}
          >
            <option value="" disabled>Font</option>
            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          {/* Text color */}
          <label title="Barva textu"
            style={{ display: "flex", alignItems: "center", gap: 3, color: "#fff", fontSize: 12, cursor: "pointer", padding: "3px 6px", background: "rgba(255,255,255,0.1)", borderRadius: 5 }}
          >
            A
            <input type="color" defaultValue="#ffffff"
              onChange={e => applyCommand(() => document.execCommand("foreColor", false, e.target.value))}
              style={{ width: 18, height: 18, border: "none", background: "none", padding: 0, cursor: "pointer" }}
            />
          </label>

          <span style={{ fontSize: 10, color: "#6b7280", marginLeft: 2 }}>vyber text → formátuj</span>
        </div>,
        document.body
      )
    : null;

  // ── Admin: contentEditable element ─────────────────────────────────────────
  // NO dangerouslySetInnerHTML here — innerHTML is managed via useLayoutEffect above.
  // This ensures the element always shows content AND React never overwrites user edits.
  return (
    <>
      {toolbar}
      <El
        ref={ref}
        style={{
          ...style,
          outline: focused ? "2px solid #40accd" : hovered ? "1px dashed rgba(64,172,205,0.55)" : "none",
          outlineOffset: 3,
          borderRadius: 3,
          cursor: "text",
          minWidth: "4px",
        }}
        className={className}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => { editing.current = true; setFocused(true); }}
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          const html = e.currentTarget.innerHTML;
          editing.current = false;
          setFocused(false);
          updateSection(section, setPath(content[section], field, html));
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </>
  );
}
