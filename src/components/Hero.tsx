"use client";
import { useRef } from "react";
import { useContent } from "@/context/ContentContext";
import EditableText from "./admin/EditableText";
import EditableImg from "./admin/EditableImg";

export default function Hero() {
  const { content, admin, updateSection } = useContent();
  const h = content.hero;
  const fileRef = useRef<HTMLInputElement>(null);

  // Background image upload (for the CSS background — special case)
  async function handleBgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) updateSection("hero", { ...h, backgroundImage: data.url });
    e.target.value = "";
  }

  return (
    <>
      {/* Desktop Hero */}
      <section
        id="home-hero"
        style={{
          backgroundImage: `url('${h.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "102px",
          paddingBottom: "100px",
          position: "relative",
        }}
        className="desktop-hero"
      >
        {/* Admin: change background button */}
        {admin.isAdmin && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              position: "absolute",
              top: 120,
              right: 20,
              zIndex: 10,
              background: "rgba(0,0,0,0.65)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            📷 Změnit pozadí
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgUpload} />

        <div className="container-main" style={{ width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
            <div>
              <EditableText
                section="hero"
                field="title"
                tag="h1"
                style={{ color: "#1f1f1f", marginBottom: "20px", marginTop: 0, display: "block" }}
              />
              <EditableText
                section="hero"
                field="subtitle"
                tag="p"
                richText
                style={{ fontSize: "18px", lineHeight: "24px", color: "#1f1f1f", marginBottom: "32px", fontFamily: "'Poppins', sans-serif", display: "block" }}
              />
              <a href={h.ctaHref} className="btn-primary">
                <EditableText section="hero" field="ctaText" tag="span" />
              </a>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Mobile Hero */}
      <section style={{ paddingTop: "60px" }} className="mobile-hero">
        <EditableImg
          section="hero"
          field="mobileImage"
          alt="Colette Baron-Reid"
          style={{ width: "100%", display: "block" }}
        />
        <div style={{ padding: "40px 24px", textAlign: "center" }}>
          <EditableText
            section="hero"
            field="title"
            tag="h1"
            style={{ color: "#1f1f1f", marginBottom: "16px", display: "block" }}
          />
          <EditableText
            section="hero"
            field="subtitle"
            tag="p"
            richText
            style={{ fontSize: "18px", lineHeight: "24px", color: "#1f1f1f", marginBottom: "28px", fontFamily: "'Poppins', sans-serif", display: "block" }}
          />
          <a href={h.ctaHref} className="btn-primary">
            <EditableText section="hero" field="ctaText" tag="span" />
          </a>
        </div>
      </section>

      <style>{`
        .desktop-hero { display: flex; }
        .mobile-hero { display: none; }
        @media (max-width: 640px) {
          .desktop-hero { display: none !important; }
          .mobile-hero { display: block !important; }
        }
      `}</style>
    </>
  );
}
