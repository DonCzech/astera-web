"use client";
import { PageBlock } from "@/lib/content-types";

const ALIGN = { left: "left", center: "center", right: "right" } as const;

function HeadingBlock({ b }: { b: PageBlock }) {
  const Tag = (b.level || "h2") as any;
  return (
    <div style={{ padding: "16px 0" }}>
      <Tag style={{
        textAlign: ALIGN[b.align || "left"],
        color: b.color || "#1f1f1f",
        fontSize: b.fontSize ? b.fontSize + "px" : undefined,
        fontFamily: "'Poppins', sans-serif",
        margin: 0,
      }}>
        {b.content || "Nadpis"}
      </Tag>
    </div>
  );
}

function TextBlock({ b }: { b: PageBlock }) {
  return (
    <div style={{ padding: "8px 0", textAlign: ALIGN[b.align || "left"] }}>
      <div
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: "#374151" }}
        dangerouslySetInnerHTML={{ __html: b.content || "" }}
      />
    </div>
  );
}

function ImageBlock({ b }: { b: PageBlock }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={b.src} alt={b.alt || ""} style={{ width: b.width || "100%", height: "auto", display: "block", borderRadius: 8 }} />
  );
  return (
    <div style={{ padding: "12px 0", textAlign: ALIGN[b.align || "center"] }}>
      {b.href ? <a href={b.href}>{img}</a> : img}
    </div>
  );
}

function ButtonBlock({ b }: { b: PageBlock }) {
  const padding = b.size === "sm" ? "8px 20px" : b.size === "lg" ? "16px 48px" : "12px 32px";
  const fontSize = b.size === "sm" ? 13 : b.size === "lg" ? 17 : 15;
  return (
    <div style={{ padding: "12px 0", textAlign: ALIGN[b.align || "center"] }}>
      <a
        href={b.href || "#"}
        style={{
          display: "inline-block",
          padding,
          fontSize,
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          background: b.bgColor || "#40accd",
          color: b.textColor || "#fff",
          borderRadius: 8,
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}
      >
        {b.content || "Button"}
      </a>
    </div>
  );
}

function BannerBlock({ b }: { b: PageBlock }) {
  return (
    <div style={{
      padding: "64px 32px",
      background: b.bgImage
        ? `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${b.bgImage}) center/cover`
        : (b.bgColor || "linear-gradient(135deg,#40accd,#2e8fa8)"),
      textAlign: ALIGN[b.align || "center"],
      borderRadius: 12,
    }}>
      <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, fontFamily: "'Poppins',sans-serif", margin: "0 0 12px" }}>
        {b.content || "Banner nadpis"}
      </h2>
      {b.subtitle && <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, fontFamily: "'Poppins',sans-serif", margin: "0 0 24px" }}>{b.subtitle}</p>}
      {b.ctaText && (
        <a href={b.ctaHref || "#"} style={{
          display: "inline-block", padding: "12px 32px", background: "#fff", color: b.bgColor || "#40accd",
          fontWeight: 700, borderRadius: 8, textDecoration: "none", fontFamily: "'Poppins',sans-serif", fontSize: 15,
        }}>
          {b.ctaText}
        </a>
      )}
    </div>
  );
}

function NewsletterBlock({ b }: { b: PageBlock }) {
  return (
    <div style={{ padding: "40px 32px", background: "#f9f7f7", borderRadius: 12, textAlign: ALIGN[b.align || "center"] }}>
      <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 24, fontWeight: 700, color: "#1f1f1f", margin: "0 0 12px" }}>
        {b.content || "Newsletter"}
      </h3>
      {b.body && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#6b7280", margin: "0 0 20px" }}>{b.body}</p>}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", maxWidth: 400, margin: "0 auto" }}>
        <input type="email" placeholder="Váš e-mail" style={{ flex: 1, padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, fontFamily: "'Poppins',sans-serif" }} />
        <button style={{ padding: "10px 20px", background: "#40accd", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>
          Odebírat
        </button>
      </div>
    </div>
  );
}

export default function BlockRenderer({ blocks }: { blocks: PageBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return <div style={{ padding: "60px 32px", textAlign: "center", color: "#9ca3af", fontFamily: "'Poppins',sans-serif" }}>Tato stránka nemá žádný obsah. Přidej bloky v editoru (✏️).</div>;
  }
  return (
    <>
      {blocks.map(b => (
        <div key={b.id} className="container-main" style={{ paddingTop: 8, paddingBottom: 8 }}>
          {b.type === "heading" && <HeadingBlock b={b} />}
          {b.type === "text" && <TextBlock b={b} />}
          {b.type === "image" && <ImageBlock b={b} />}
          {b.type === "button" && <ButtonBlock b={b} />}
          {b.type === "banner" && <BannerBlock b={b} />}
          {b.type === "newsletter" && <NewsletterBlock b={b} />}
          {b.type === "spacer" && <div style={{ height: b.height || 40 }} />}
        </div>
      ))}
    </>
  );
}
