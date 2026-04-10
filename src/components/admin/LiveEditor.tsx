"use client";
import { useState, useCallback, useRef } from "react";
import { useContent } from "@/context/ContentContext";
import { SiteContent, NavItem, ManifestCard, FooterLink } from "@/lib/content-types";
import RichTextEditor from "./RichTextEditor";

type Section = keyof SiteContent;

const SECTIONS: { key: Section; label: string }[] = [
  { key: "header", label: "Header" },
  { key: "hero", label: "Hero" },
  { key: "newsletter", label: "Newsletter" },
  { key: "about", label: "About" },
  { key: "manifest", label: "Cards" },
  { key: "pickacard", label: "Pick Card" },
  { key: "oracle", label: "Oracle" },
  { key: "footer", label: "Footer" },
  { key: "aboutPage", label: "Stránka: O nás" },
];

const PANEL_W = 460; // panel width desktop

// ── Shared field components ─────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function PlainInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", boxSizing: "border-box", padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 7, fontSize: 13, outline: "none", fontFamily: "inherit", background: "#fafafa" }}
    />
  );
}

function RTE({ value, onChange, minHeight }: { value: string; onChange: (v: string) => void; minHeight?: number }) {
  return <RichTextEditor value={value} onChange={onChange} minHeight={minHeight ?? 44} />;
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Immediate preview
    const reader = new FileReader();
    reader.onload = ev => { if (ev.target?.result) setPreview(ev.target.result as string); };
    reader.readAsDataURL(file);

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) { onChange(data.url); setPreview(null); }
    e.target.value = "";
  }

  const displaySrc = preview ?? value;

  return (
    <Field label={label}>
      {displaySrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={displaySrc} alt="" style={{ width: "100%", maxHeight: 110, objectFit: "cover", borderRadius: 7, marginBottom: 7, border: "1px solid #e5e7eb" }} />
      )}
      <div style={{ display: "flex", gap: 6 }}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="/images/..."
          style={{ flex: 1, padding: "7px 10px", border: "1px solid #e5e7eb", borderRadius: 7, fontSize: 12, outline: "none", background: "#fafafa" }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{ padding: "7px 12px", background: "#40accd", color: "#fff", border: "none", borderRadius: 7, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", fontWeight: 600 }}
        >
          {uploading ? "…" : "📂 Upload"}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
    </Field>
  );
}

// ── Divider ─────────────────────────────────────────────────────────────────────

function Divider({ label }: { label?: string }) {
  return (
    <div style={{ margin: "18px 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
      {label && <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
    </div>
  );
}

// ── Section editors ──────────────────────────────────────────────────────────────

function HeaderEditor() {
  const { content, updateSection } = useContent();
  const h = content.header;
  const upd = (k: string, v: string) => updateSection("header", { ...h, [k]: v });

  const updateNav = useCallback(
    (items: NavItem[]) => updateSection("header", { ...h, navItems: items }),
    [h, updateSection]
  );
  const updateItem = (i: number, field: string, val: string) => {
    const items = h.navItems.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    updateNav(items);
  };
  const addItem = () => updateNav([...h.navItems, { label: "New Item", href: "#" }]);
  const removeItem = (i: number) => updateNav(h.navItems.filter((_, idx) => idx !== i));

  return (
    <div>
      <Field label="Logo URL">
        <PlainInput value={h.logoHref} onChange={v => upd("logoHref", v)} />
      </Field>
      <Field label="Sign In URL">
        <PlainInput value={h.signInHref} onChange={v => upd("signInHref", v)} />
      </Field>

      <Divider label="Navigační položky" />
      {h.navItems.map((item, i) => (
        <div key={i} style={{ background: "#f9fafb", borderRadius: 8, padding: "10px 12px", marginBottom: 8, border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <input type="text" value={item.label} onChange={e => updateItem(i, "label", e.target.value)} placeholder="Label" style={{ flex: 1, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, outline: "none" }} />
            <input type="text" value={item.href} onChange={e => updateItem(i, "href", e.target.value)} placeholder="URL" style={{ flex: 2, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, outline: "none" }} />
            <button type="button" onClick={() => removeItem(i)} style={{ padding: "6px 9px", background: "#fee2e2", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer", color: "#c00" }}>✕</button>
          </div>
          {item.dropdown && item.dropdown.length > 0 && (
            <div style={{ paddingLeft: 8, borderLeft: "2px solid #e5e7eb" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4, textTransform: "uppercase" }}>Dropdown</div>
              {item.dropdown.map((sub, j) => (
                <div key={j} style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  <input type="text" value={sub.label} onChange={e => {
                    const items = h.navItems.map((it, idx) => idx === i ? { ...it, dropdown: it.dropdown?.map((s, si) => si === j ? { ...s, label: e.target.value } : s) } : it);
                    updateNav(items);
                  }} style={{ flex: 1, padding: "4px 6px", border: "1px solid #e5e7eb", borderRadius: 4, fontSize: 11, outline: "none" }} />
                  <input type="text" value={sub.href} onChange={e => {
                    const items = h.navItems.map((it, idx) => idx === i ? { ...it, dropdown: it.dropdown?.map((s, si) => si === j ? { ...s, href: e.target.value } : s) } : it);
                    updateNav(items);
                  }} style={{ flex: 2, padding: "4px 6px", border: "1px solid #e5e7eb", borderRadius: 4, fontSize: 11, outline: "none" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button type="button" onClick={addItem} style={{ padding: "7px 14px", background: "#eff6ff", border: "1px solid #40accd", borderRadius: 7, fontSize: 12, cursor: "pointer", color: "#40accd", fontWeight: 600 }}>
        + Přidat položku menu
      </button>
    </div>
  );
}

function HeroEditor() {
  const { content, updateSection } = useContent();
  const h = content.hero;
  const upd = (k: string, v: string) => updateSection("hero", { ...h, [k]: v });

  return (
    <div>
      <Field label="Nadpis (H1)">
        <RTE value={h.title} onChange={v => upd("title", v)} />
      </Field>
      <Field label="Podnadpis">
        <RTE value={h.subtitle} onChange={v => upd("subtitle", v)} />
      </Field>
      <Field label="Text tlačítka">
        <PlainInput value={h.ctaText} onChange={v => upd("ctaText", v)} />
      </Field>
      <Field label="URL tlačítka">
        <PlainInput value={h.ctaHref} onChange={v => upd("ctaHref", v)} />
      </Field>
      <ImageField label="Pozadí (desktop)" value={h.backgroundImage} onChange={v => upd("backgroundImage", v)} />
      <ImageField label="Obrázek (mobil)" value={h.mobileImage} onChange={v => upd("mobileImage", v)} />
    </div>
  );
}

function NewsletterEditor() {
  const { content, updateSection } = useContent();
  const n = content.newsletter;
  const upd = (k: string, v: string) => updateSection("newsletter", { ...n, [k]: v });

  return (
    <div>
      <Field label="Nadpis">
        <RTE value={n.title} onChange={v => upd("title", v)} />
      </Field>
      <Field label="Text">
        <RTE value={n.body} onChange={v => upd("body", v)} minHeight={80} />
      </Field>
      <Field label="Text tlačítka">
        <PlainInput value={n.buttonText} onChange={v => upd("buttonText", v)} />
      </Field>
      <ImageField label="Obrázek" value={n.image} onChange={v => upd("image", v)} />
    </div>
  );
}

function AboutEditor() {
  const { content, updateSection } = useContent();
  const a = content.about;
  const upd = (k: string, v: string) => updateSection("about", { ...a, [k]: v });

  return (
    <div>
      <Field label="Nadpis">
        <RTE value={a.title} onChange={v => upd("title", v)} />
      </Field>
      <Field label="Odstavec 1">
        <RTE value={a.body1} onChange={v => upd("body1", v)} minHeight={80} />
      </Field>
      <Field label="Odstavec 2">
        <RTE value={a.body2} onChange={v => upd("body2", v)} minHeight={80} />
      </Field>
      <Field label="Text tlačítka">
        <PlainInput value={a.buttonText} onChange={v => upd("buttonText", v)} />
      </Field>
      <Field label="URL tlačítka">
        <PlainInput value={a.buttonHref} onChange={v => upd("buttonHref", v)} />
      </Field>
      <ImageField label="Obrázek nahoře" value={a.imageTop} onChange={v => upd("imageTop", v)} />
      <ImageField label="Obrázek dole" value={a.imageBottom} onChange={v => upd("imageBottom", v)} />
    </div>
  );
}

function ManifestEditor() {
  const { content, updateSection } = useContent();
  const m = content.manifest;

  const updateCard = (i: number, k: string, v: string) => {
    const cards = m.cards.map((c, idx) => idx === i ? { ...c, [k]: v } : c);
    updateSection("manifest", { ...m, cards });
  };

  return (
    <div>
      <Field label="Nadpis sekce">
        <RTE value={m.sectionTitle} onChange={v => updateSection("manifest", { ...m, sectionTitle: v })} />
      </Field>
      {m.cards.map((card: ManifestCard, i: number) => (
        <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16, marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#40accd", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Karta {i + 1}: {card.title}
          </div>
          <Field label="Nadpis karty">
            <RTE value={card.title} onChange={v => updateCard(i, "title", v)} />
          </Field>
          <Field label="Text karty">
            <RTE value={card.text} onChange={v => updateCard(i, "text", v)} minHeight={70} />
          </Field>
          <Field label="Text tlačítka">
            <PlainInput value={card.btnText} onChange={v => updateCard(i, "btnText", v)} />
          </Field>
          <Field label="URL tlačítka">
            <PlainInput value={card.btnHref} onChange={v => updateCard(i, "btnHref", v)} />
          </Field>
          <ImageField label="Obrázek karty" value={card.image} onChange={v => updateCard(i, "image", v)} />
        </div>
      ))}
    </div>
  );
}

function PickACardEditor() {
  const { content, updateSection } = useContent();
  const p = content.pickacard;
  const upd = (k: string, v: string) => updateSection("pickacard", { ...p, [k]: v });

  return (
    <div>
      <Field label="Nadpis">
        <RTE value={p.title} onChange={v => upd("title", v)} />
      </Field>
      <Field label="Text">
        <RTE value={p.body} onChange={v => upd("body", v)} minHeight={80} />
      </Field>
      <Field label="Text tlačítka">
        <PlainInput value={p.buttonText} onChange={v => upd("buttonText", v)} />
      </Field>
      <Field label="URL tlačítka">
        <PlainInput value={p.buttonHref} onChange={v => upd("buttonHref", v)} />
      </Field>
      <ImageField label="Obrázek" value={p.image} onChange={v => upd("image", v)} />
    </div>
  );
}

function OracleEditor() {
  const { content, updateSection } = useContent();
  const o = content.oracle;
  const upd = (k: string, v: string) => updateSection("oracle", { ...o, [k]: v });

  return (
    <div>
      <Field label="Nadpis">
        <RTE value={o.title} onChange={v => upd("title", v)} />
      </Field>
      <Field label="Text">
        <RTE value={o.body} onChange={v => upd("body", v)} minHeight={70} />
      </Field>
      <Field label="YouTube embed URL">
        <PlainInput value={o.youtubeUrl} onChange={v => upd("youtubeUrl", v)} placeholder="https://www.youtube.com/embed/..." />
      </Field>
    </div>
  );
}

function FooterEditor() {
  const { content, updateSection } = useContent();
  const f = content.footer;

  const updateFooterLink = (i: number, k: string, v: string) => {
    const links = f.footerLinks.map((l, idx) => idx === i ? { ...l, [k]: v } : l);
    updateSection("footer", { ...f, footerLinks: links });
  };
  const addFooterLink = () =>
    updateSection("footer", { ...f, footerLinks: [...f.footerLinks, { label: "New Link", href: "#" }] });
  const removeFooterLink = (i: number) =>
    updateSection("footer", { ...f, footerLinks: f.footerLinks.filter((_, idx) => idx !== i) });

  const updateSocial = (i: number, k: string, v: string) => {
    const links = f.socialLinks.map((l, idx) => idx === i ? { ...l, [k]: v } : l);
    updateSection("footer", { ...f, socialLinks: links });
  };

  return (
    <div>
      <Field label="Nadpis newsletteru">
        <RTE value={f.newsletterTitle} onChange={v => updateSection("footer", { ...f, newsletterTitle: v })} />
      </Field>
      <Field label="Copyright">
        <PlainInput value={f.copyright} onChange={v => updateSection("footer", { ...f, copyright: v })} />
      </Field>

      <Divider label="Odkazy v patičce" />
      {f.footerLinks.map((link: FooterLink, i: number) => (
        <div key={i} style={{ display: "flex", gap: 5, marginBottom: 6 }}>
          <input type="text" value={link.label} onChange={e => updateFooterLink(i, "label", e.target.value)} placeholder="Label" style={{ flex: 1, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, outline: "none" }} />
          <input type="text" value={link.href} onChange={e => updateFooterLink(i, "href", e.target.value)} placeholder="URL" style={{ flex: 2, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, outline: "none" }} />
          <button type="button" onClick={() => removeFooterLink(i)} style={{ padding: "6px 9px", background: "#fee2e2", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer", color: "#c00" }}>✕</button>
        </div>
      ))}
      <button type="button" onClick={addFooterLink} style={{ padding: "6px 12px", background: "#eff6ff", border: "1px solid #40accd", borderRadius: 7, fontSize: 12, cursor: "pointer", color: "#40accd", fontWeight: 600, marginBottom: 16 }}>
        + Přidat odkaz
      </button>

      <Divider label="Sociální sítě" />
      {f.socialLinks.map((social, i) => (
        <div key={i} style={{ display: "flex", gap: 5, marginBottom: 6 }}>
          <input type="text" value={social.name} onChange={e => updateSocial(i, "name", e.target.value)} placeholder="Název" style={{ flex: 1, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, outline: "none" }} />
          <input type="text" value={social.href} onChange={e => updateSocial(i, "href", e.target.value)} placeholder="URL" style={{ flex: 2, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, outline: "none" }} />
        </div>
      ))}
    </div>
  );
}

// ── AboutPage editor ─────────────────────────────────────────────────────────────

function AboutPageEditor() {
  const { content, updateSection } = useContent();
  const p = content.aboutPage;
  const upd = (data: typeof p) => updateSection("aboutPage", data);

  return (
    <div>
      <Field label="Hero nadpis"><RichTextEditor value={p.heroTitle} onChange={v => upd({ ...p, heroTitle: v })} /></Field>
      <Field label="Hero podnapis"><RichTextEditor value={p.heroSubtitle} onChange={v => upd({ ...p, heroSubtitle: v })} /></Field>
      <Field label="Hero obrázek (URL)"><input value={p.heroImage} onChange={e => upd({ ...p, heroImage: e.target.value })} style={{ width: "100%", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12 }} /></Field>
      <Divider label="Bio texty" />
      <Field label="Bio odstavec 1"><RichTextEditor value={p.bio1} onChange={v => upd({ ...p, bio1: v })} /></Field>
      <Field label="Bio odstavec 2"><RichTextEditor value={p.bio2} onChange={v => upd({ ...p, bio2: v })} /></Field>
      <Field label="Bio odstavec 3"><RichTextEditor value={p.bio3} onChange={v => upd({ ...p, bio3: v })} /></Field>
      <Divider label="Citát" />
      <Field label="Text citátu"><RichTextEditor value={p.quoteText} onChange={v => upd({ ...p, quoteText: v })} /></Field>
      <Field label="Autor citátu"><input value={p.quoteAuthor} onChange={e => upd({ ...p, quoteAuthor: e.target.value })} style={{ width: "100%", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12 }} /></Field>
      <Divider label="CTA sekce" />
      <Field label="CTA nadpis"><RichTextEditor value={p.ctaTitle} onChange={v => upd({ ...p, ctaTitle: v })} /></Field>
      <Field label="CTA text"><RichTextEditor value={p.ctaText} onChange={v => upd({ ...p, ctaText: v })} /></Field>
      <Field label="CTA button text"><input value={p.ctaButtonText} onChange={e => upd({ ...p, ctaButtonText: e.target.value })} style={{ width: "100%", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12 }} /></Field>
      <Field label="CTA button href"><input value={p.ctaButtonHref} onChange={e => upd({ ...p, ctaButtonHref: e.target.value })} style={{ width: "100%", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12 }} /></Field>
      <Divider label="Statistiky" />
      {p.statsItems.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <input value={item.number} onChange={e => { const arr = [...p.statsItems]; arr[i] = { ...arr[i], number: e.target.value }; upd({ ...p, statsItems: arr }); }}
            placeholder="2M+" style={{ flex: 1, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12 }} />
          <input value={item.label} onChange={e => { const arr = [...p.statsItems]; arr[i] = { ...arr[i], label: e.target.value }; upd({ ...p, statsItems: arr }); }}
            placeholder="Popis" style={{ flex: 2, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12 }} />
        </div>
      ))}
    </div>
  );
}

// ── Section editor map ──────────────────────────────────────────────────────────

const EDITORS: Record<Section, React.ComponentType> = {
  header: HeaderEditor,
  hero: HeroEditor,
  newsletter: NewsletterEditor,
  about: AboutEditor,
  manifest: ManifestEditor,
  pickacard: PickACardEditor,
  oracle: OracleEditor,
  footer: FooterEditor,
  aboutPage: AboutPageEditor,
};

// ── Main LiveEditor panel ──────────────────────────────────────────────────────

export default function LiveEditor() {
  const { admin, saveAll, revertSection, undo, canUndo, saveStatus, logout } = useContent();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [editorKey, setEditorKey] = useState(0);

  if (!admin.isAdmin) return null;

  const ActiveEditor = EDITORS[activeSection];

  function handleUndo() {
    undo();
    setEditorKey(k => k + 1);
  }

  async function handleLogout() {
    await logout();
    setOpen(false);
  }

  // Save status indicator
  const statusColor = saveStatus === "saved" ? "#059669" : saveStatus === "saving" ? "#f59e0b" : saveStatus === "unsaved" ? "#ef4444" : "transparent";
  const statusText = saveStatus === "saved" ? "✓ Uloženo" : saveStatus === "saving" ? "Ukládám…" : saveStatus === "unsaved" ? "● Neuloženo" : "";

  return (
    <>
      {/* Floating save button (always visible) */}
      <button
        onClick={saveAll}
        title="Uložit vše"
        style={{
          position: "fixed",
          bottom: 28,
          right: open ? PANEL_W + 72 : 90,
          zIndex: 9999,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: saveStatus === "saved" ? "#059669" : saveStatus === "unsaved" ? "#f59e0b" : "#6b7280",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: 22,
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          transition: "right 0.3s ease, background 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        💾
      </button>

      {/* Toggle (pencil) button */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? "Zavřít editor" : "Otevřít editor"}
        style={{
          position: "fixed",
          bottom: 28,
          right: open ? PANEL_W + 12 : 28,
          zIndex: 9999,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#40accd",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: 22,
          boxShadow: "0 4px 20px rgba(64,172,205,0.55)",
          transition: "right 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open ? "✕" : "✏️"}
      </button>

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : -PANEL_W - 10,
          width: PANEL_W,
          height: "100vh",
          background: "#fff",
          boxShadow: "-6px 0 30px rgba(0,0,0,0.13)",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",           // ← crucial: constrains flex children
          transition: "right 0.3s ease",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Panel header */}
        <div style={{ flexShrink: 0, padding: "14px 18px", borderBottom: "1px solid #e5e7eb", background: "linear-gradient(135deg,#40accd,#2e8fa8)", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.2px" }}>✏️ Site Editor</div>
              <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>{admin.email}</div>
            </div>
            <button
              onClick={handleLogout}
              style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "5px 12px", borderRadius: 7, fontSize: 11, cursor: "pointer", fontWeight: 600 }}
            >
              Odhlásit
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <div style={{ flexShrink: 0, display: "flex", overflowX: "auto", borderBottom: "1px solid #e5e7eb", background: "#f9fafb", scrollbarWidth: "none" }}>
          {SECTIONS.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              style={{
                padding: "10px 14px",
                fontSize: 12,
                fontWeight: 600,
                border: "none",
                borderBottom: activeSection === s.key ? "2px solid #40accd" : "2px solid transparent",
                background: "none",
                color: activeSection === s.key ? "#40accd" : "#6b7280",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Editor content — scrollable */}
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "18px 20px" }}>
          <ActiveEditor key={`${activeSection}-${editorKey}`} />
        </div>

        {/* Action bar */}
        <div style={{ flexShrink: 0, padding: "12px 18px", borderTop: "1px solid #e5e7eb", background: "#f9fafb", display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            title={canUndo ? "Vrátit poslední změnu (max 30)" : "Žádné změny k vrácení"}
            style={{
              padding: "9px 14px",
              background: canUndo ? "#fff" : "#f3f4f6",
              border: `1px solid ${canUndo ? "#d1d5db" : "#e5e7eb"}`,
              borderRadius: 8,
              fontSize: 13,
              cursor: canUndo ? "pointer" : "default",
              color: canUndo ? "#374151" : "#9ca3af",
              fontWeight: 500,
            }}
          >
            ↺ Zpět
          </button>
          <button
            onClick={saveAll}
            disabled={saveStatus === "saving"}
            style={{
              flex: 1,
              padding: "9px 14px",
              background: saveStatus === "saving" ? "#9ca3af" : "#40accd",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: saveStatus === "saving" ? "default" : "pointer",
              color: "#fff",
            }}
          >
            {saveStatus === "saving" ? "Ukládám…" : "💾 Uložit vše"}
          </button>
          {statusText && (
            <div style={{ fontSize: 11, color: statusColor, fontWeight: 600, whiteSpace: "nowrap" }}>{statusText}</div>
          )}
        </div>
      </div>

      {/* Admin bar at top */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: open ? PANEL_W : 0,
          zIndex: 9997,
          background: "#40accd",
          color: "#fff",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "4px 12px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.3px",
          transition: "right 0.3s ease",
        }}
      >
        <span>Admin — klikni na text/obrázek pro editaci · ✏️ otevře panel</span>
        {statusText && (
          <span style={{ background: "rgba(0,0,0,0.2)", borderRadius: 4, padding: "1px 8px", color: statusColor === "#059669" ? "#a7f3d0" : statusColor === "#f59e0b" ? "#fde68a" : "#fca5a5" }}>
            {statusText}
          </span>
        )}
      </div>

      {/* Mobile: full-width panel override */}
      <style>{`
        @media (max-width: 500px) {
          /* JS-set width can't be overridden easily, handled via inline */
        }
      `}</style>
    </>
  );
}
