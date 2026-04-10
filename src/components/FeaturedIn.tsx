export default function FeaturedIn() {
  return (
    <section style={{ backgroundColor: "#ffffff", padding: "60px 0" }}>
      <div className="container-main">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            marginTop: 0,
          }}
        >
          Featured In
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "center",
          }}
          className="featured-grid"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/3rd-part-logo-asset-11.jpg"
            alt="CBS, The Doctors, Dr. Phil, Elle"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/3rd-part-logo-asset-22.jpg"
            alt="W Magazine, Fortune, Today NBC, Hay House"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
