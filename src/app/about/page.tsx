"use client";
import { useContent } from "@/context/ContentContext";
import EditableText from "@/components/admin/EditableText";
import EditableImg from "@/components/admin/EditableImg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const { content } = useContent();
  const p = content.aboutPage;

  return (
    <>
      <Header />
      <main style={{ paddingTop: "102px", fontFamily: "'Poppins', sans-serif" }}>

        {/* Hero */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          minHeight: "520px",
        }} className="about-hero-grid">
          <div style={{
            background: "linear-gradient(135deg, #1a0a2e 0%, #2d1654 50%, #1a0a2e 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 64px",
          }}>
            <EditableText
              section="aboutPage"
              field="heroTitle"
              tag="h1"
              style={{ color: "#fff", fontSize: 42, fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}
              richText
            />
            <EditableText
              section="aboutPage"
              field="heroSubtitle"
              tag="p"
              style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.6 }}
              richText
            />
          </div>
          <div style={{ overflow: "hidden" }}>
            <EditableImg
              section="aboutPage"
              field="heroImage"
              alt="Colette Baron-Reid"
              style={{ width: "100%", height: "520px", objectFit: "cover" } as React.CSSProperties}
            />
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: "#f9f7f7", padding: "48px 0" }}>
          <div className="container-main" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }} >
            {p.statsItems.map((item, i) => (
              <div key={i} style={{ padding: "24px 16px" }}>
                <EditableText
                  section="aboutPage"
                  field={`statsItems.${i}.number`}
                  tag="div"
                  style={{ fontSize: 42, fontWeight: 800, color: "#7c3aed", lineHeight: 1 }}
                />
                <EditableText
                  section="aboutPage"
                  field={`statsItems.${i}.label`}
                  tag="div"
                  style={{ fontSize: 14, color: "#6b7280", marginTop: 8, fontWeight: 500 }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Bio */}
        <section style={{ padding: "80px 0" }}>
          <div className="container-main" style={{ maxWidth: 800, margin: "0 auto", padding: "0 30px" }}>
            <EditableText
              section="aboutPage"
              field="bio1"
              tag="p"
              style={{ fontSize: 17, lineHeight: 1.8, color: "#374151", marginBottom: 24 }}
              richText
            />
            <EditableText
              section="aboutPage"
              field="bio2"
              tag="p"
              style={{ fontSize: 17, lineHeight: 1.8, color: "#374151", marginBottom: 24 }}
              richText
            />
            <EditableText
              section="aboutPage"
              field="bio3"
              tag="p"
              style={{ fontSize: 17, lineHeight: 1.8, color: "#374151" }}
              richText
            />
          </div>
        </section>

        {/* Quote */}
        <section style={{ background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", padding: "64px 0" }}>
          <div className="container-main" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "0 30px" }}>
            <div style={{ fontSize: 48, color: "rgba(255,255,255,0.4)", marginBottom: 16, lineHeight: 1 }}>"</div>
            <EditableText
              section="aboutPage"
              field="quoteText"
              tag="blockquote"
              style={{ fontSize: 22, color: "#fff", fontStyle: "italic", lineHeight: 1.6, margin: "0 0 24px" }}
              richText
            />
            <EditableText
              section="aboutPage"
              field="quoteAuthor"
              tag="cite"
              style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", fontStyle: "normal", fontWeight: 600 }}
            />
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 0", textAlign: "center" }}>
          <div className="container-main" style={{ maxWidth: 600, margin: "0 auto", padding: "0 30px" }}>
            <EditableText
              section="aboutPage"
              field="ctaTitle"
              tag="h2"
              style={{ fontSize: 32, fontWeight: 700, color: "#1f1f1f", marginBottom: 16 }}
              richText
            />
            <EditableText
              section="aboutPage"
              field="ctaText"
              tag="p"
              style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, marginBottom: 32 }}
              richText
            />
            <a
              href={p.ctaButtonHref}
              className="btn-primary"
              style={{ padding: "14px 36px", fontSize: 15, display: "inline-block" }}
            >
              <EditableText section="aboutPage" field="ctaButtonText" tag="span" />
            </a>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .container-main > div[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
