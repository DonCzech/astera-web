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

function HeroSectionBlock({ b }: { b: PageBlock }) {
  return (
    <div style={{
      position: "relative",
      minHeight: 480,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: b.heroBgImage
        ? `${b.heroOverlay || "linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45))"}, url(${b.heroBgImage}) center/cover no-repeat`
        : (b.bgColor || "linear-gradient(135deg,#1a0a2e,#2d1654)"),
      borderRadius: 12,
      overflow: "hidden",
      textAlign: ALIGN[b.align || "center"],
      padding: "60px 40px",
    }}>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
        <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 800, fontFamily: "'Poppins',sans-serif", margin: "0 0 16px", lineHeight: 1.15 }}>
          {b.content || "Hero Nadpis"}
        </h1>
        {b.subtitle && <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 20, fontFamily: "'Poppins',sans-serif", margin: "0 0 32px", lineHeight: 1.6 }}>{b.subtitle}</p>}
        {b.ctaText && (
          <a href={b.ctaHref || "#"} style={{
            display: "inline-block", padding: "14px 40px", background: b.bgColor || "#40accd",
            color: "#fff", fontWeight: 700, borderRadius: 8, textDecoration: "none",
            fontFamily: "'Poppins',sans-serif", fontSize: 16,
          }}>
            {b.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}

function CardsGridBlock({ b }: { b: PageBlock }) {
  const cards = b.cards || [];
  return (
    <div style={{ padding: "48px 0" }}>
      {b.sectionTitle && (
        <h2 style={{ textAlign: "center", fontFamily: "'Poppins',sans-serif", fontSize: 32, fontWeight: 700, color: "#1f1f1f", marginBottom: 36, marginTop: 0 }}>
          {b.sectionTitle}
        </h2>
      )}
      <div style={{
        display: "grid",
        gridTemplateColumns: cards.length === 1 ? "1fr" : cards.length === 2 ? "repeat(2,1fr)" : "repeat(3,1fr)",
        gap: 24,
      }} className="cards-grid-block">
        {cards.map((card, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            {card.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.image} alt={card.title} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
            )}
            <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 20, fontWeight: 700, color: "#1f1f1f", margin: "0 0 12px" }}>{card.title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.6, flex: 1, margin: "0 0 20px" }}>{card.text}</p>
              {card.btnText && (
                <a href={card.btnHref || "#"} className="btn-primary" style={{ display: "inline-block", padding: "10px 24px", fontSize: 13, textDecoration: "none" }}>
                  {card.btnText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.cards-grid-block{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

function TwoColBlock({ b }: { b: PageBlock }) {
  const imgCol = (
    <div style={{ flex: 1, minWidth: 0 }}>
      {b.twoColImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.twoColImage} alt={b.twoColTitle || ""} style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }} />
      )}
    </div>
  );
  const textCol = (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {b.twoColTitle && <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 32, fontWeight: 700, color: "#1f1f1f", margin: "0 0 16px" }}>{b.twoColTitle}</h2>}
      {b.twoColText && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16, lineHeight: 1.8, color: "#374151", margin: "0 0 24px" }} dangerouslySetInnerHTML={{ __html: b.twoColText }} />}
      {b.twoColBtnText && (
        <a href={b.twoColBtnHref || "#"} className="btn-primary" style={{ display: "inline-block", padding: "12px 32px", fontSize: 15, textDecoration: "none", alignSelf: "flex-start" }}>
          {b.twoColBtnText}
        </a>
      )}
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 48, alignItems: "center", padding: "40px 0", flexWrap: "wrap" }}>
      {b.imageLeft !== false ? imgCol : textCol}
      {b.imageLeft !== false ? textCol : imgCol}
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
          {b.type === "hero-section" && <HeroSectionBlock b={b} />}
          {b.type === "cards-grid" && <CardsGridBlock b={b} />}
          {b.type === "two-col" && <TwoColBlock b={b} />}
        </div>
      ))}
    </>
  );
}
