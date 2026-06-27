import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const purple = "#7c3bb2";
const purpleDeep = "#3b2454";
const gold = "#c9a84c";
const ink = "#1f1f1f";
const mist = "#f6f2f8";
const sage = "#e8f4ef";

export const metadata: Metadata = {
  title: { absolute: "Akce a online setkání | Astera Light" },
  description:
    "Živá a online setkání s Asterou pro výklad karet, intuici, zklidnění, práci se záměrem a jemné vedení v bezpečném prostoru.",
  alternates: { canonical: absoluteUrl("/events") },
  openGraph: {
    title: "Akce a online setkání | Astera Light",
    description:
      "Komorní eventy, webináře a intuitivní večery s Asterou pro klid, jasnost a návrat k sobě.",
    url: absoluteUrl("/events"),
    siteName: SITE_NAME,
    type: "website",
    locale: "cs_CZ",
  },
};

const eventTypes = [
  {
    title: "Intuitivní večery",
    text: "Komorní online setkání, kde se ztišíme, otevřeme téma večera a necháme prostor pro karty, otázky i jemné vedení.",
    meta: "online / živě",
  },
  {
    title: "Webináře a kurzy",
    text: "Praktické bloky pro práci s intuicí, kartami, energií prostoru a záměrem. Vhodné i pro začátečníky.",
    meta: "záznam i živý vstup",
  },
  {
    title: "Uzavřené kruhy",
    text: "Menší skupiny pro hlubší práci, sdílení a podporu. Bez tlaku na výkon, s důrazem na bezpečný a citlivý rámec.",
    meta: "malá skupina",
  },
];

const flow = [
  "Zastavení, zklidnění a naladění na téma setkání.",
  "Práce s kartami, intuicí nebo jednoduchým rituálem podle typu akce.",
  "Prostor pro otázky, sdílení a praktické kroky, které si odnesete do běžného dne.",
];

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="events-page">
        <section className="events-hero">
          <div className="container-main events-hero-inner">
            <div className="events-hero-copy">
              <p className="events-eyebrow">Astera Light · Akce a setkání</p>
              <h1>Prostor, kde se intuice ztiší do jasné odpovědi</h1>
              <p className="events-lead">
                Online večery, webináře a komorní kruhy pro chvíle, kdy potřebujete zpomalit, nadechnout se a znovu slyšet vlastní vnitřní hlas.
              </p>
              <div className="events-actions">
                <a className="btn-primary events-primary" href="https://app.rezora.cz/book/astera">
                  Rezervovat místo
                </a>
                <a className="events-secondary" href="#aktualni-akce">
                  Zobrazit akce
                </a>
              </div>
            </div>

            <div className="events-hero-media" aria-label="Astera Light event">
              <OptimizedImage
                src="/images/astera-with-computer.jpg"
                alt="Astera Light online event"
                sizes="(max-width: 768px) 92vw, 430px"
                fetchPriority="high"
                className="events-main-image"
              />
              <div className="events-floating-note">
                <span>Další setkání</span>
                <strong>otevřeno pro rezervace</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="events-intro">
          <div className="container-main events-intro-grid">
            <div>
              <p className="events-kicker">Co tady najdete</p>
              <h2>Živé vedení, které má klidný rytmus a jasný směr</h2>
            </div>
            <p>
              Každé setkání je vedené tak, aby bylo srozumitelné, laskavé a použitelné v běžném životě. Nejde o zahlcení informacemi, ale o návrat k sobě, k tělu a k odpovědím, které už se někde tiše ozývají.
            </p>
          </div>
        </section>

        <section id="aktualni-akce" className="events-types">
          <div className="container-main">
            <div className="events-section-head">
              <p className="events-kicker">Formáty setkání</p>
              <h2>Vyberte si prostor, který vás právě volá</h2>
            </div>
            <div className="events-card-grid">
              {eventTypes.map((item) => (
                <article className="events-card" key={item.title}>
                  <span className="events-card-mark" aria-hidden>✦</span>
                  <p>{item.meta}</p>
                  <h3>{item.title}</h3>
                  <span>{item.text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="events-feature">
          <div className="container-main events-feature-inner">
            <div className="events-feature-image">
              <OptimizedImage
                src="/images/Live-Event.png"
                alt="Live Event"
                sizes="119px"
                noPlaceholder
              />
            </div>
            <div className="events-feature-copy">
              <p className="events-kicker">Aktuálně</p>
              <h2>Online setkání s Asterou</h2>
              <p>
                Pokud cítíte, že nastal čas udělat si jasno, přijďte do prostoru, kde nemusíte nic dokazovat. Stačí přinést otázku, záměr nebo jen ochotu na chvíli zpomalit.
              </p>
              <ul>
                {flow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="events-closing">
          <div className="container-main events-closing-inner">
            <p className="events-kicker">Rezervace</p>
            <h2>Vyberte si termín, který vám dá prostor nadechnout se</h2>
            <p>
              Přesný program a volné termíny najdete v rezervačním systému. Pokud si nejste jistí, který typ setkání je pro vás vhodný, můžete začít konzultací.
            </p>
            <a className="btn-primary events-primary" href="https://app.rezora.cz/book/astera">
              Přejít na rezervaci
            </a>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .events-page {
          background: #ffffff;
          color: ${ink};
          overflow: hidden;
        }

        .events-page *,
        .events-page *::before,
        .events-page *::after {
          box-sizing: border-box;
        }

        .events-hero {
          min-height: 720px;
          padding: 168px 0 86px;
          background:
            linear-gradient(115deg, rgba(255,255,255,0.96) 0%, rgba(250,247,252,0.94) 46%, rgba(232,244,239,0.88) 100%),
            image-set(url('/optimized/images/astera-hero-image-1200w.webp') type('image/webp'), url('/optimized/images/astera-hero-image-1200w.jpg'));
          background-size: cover;
          background-position: center;
        }

        .events-hero-inner {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.72fr);
          align-items: center;
          gap: 58px;
        }

        .events-hero-copy {
          max-width: 650px;
          min-width: 0;
        }

        .events-eyebrow,
        .events-kicker {
          margin: 0 0 14px;
          color: ${gold};
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .events-hero h1 {
          margin: 0;
          max-width: 620px;
          color: ${purpleDeep};
          font-size: clamp(34px, 5.4vw, 64px);
          line-height: 1.02;
          font-weight: 700;
        }

        .events-lead {
          max-width: 560px;
          margin: 24px 0 0;
          color: #483650;
          font-size: 17px;
          line-height: 1.78;
        }

        .events-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .events-primary {
          border-radius: 999px;
          box-shadow: 0 16px 34px rgba(124, 59, 178, 0.22);
        }

        .events-secondary {
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          color: ${purple};
          border: 1px solid rgba(124, 59, 178, 0.22);
          border-radius: 999px;
          padding: 9px 24px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          background: rgba(255,255,255,0.72);
        }

        .events-hero-media {
          position: relative;
          justify-self: center;
          width: min(100%, 430px);
          min-width: 0;
        }

        .events-main-image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 8px;
          border: 1px solid rgba(201, 168, 76, 0.36);
          box-shadow: 0 34px 80px rgba(49, 31, 65, 0.2);
        }

        .events-floating-note {
          position: absolute;
          right: -22px;
          bottom: 26px;
          z-index: 3;
          width: 188px;
          padding: 16px 18px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(201, 168, 76, 0.42);
          box-shadow: 0 18px 40px rgba(55, 37, 71, 0.16);
        }

        .events-floating-note span,
        .events-floating-note strong {
          display: block;
          font-family: 'Poppins', sans-serif;
        }

        .events-floating-note span {
          color: #6f6278;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .events-floating-note strong {
          margin-top: 4px;
          color: ${purpleDeep};
          font-size: 16px;
          line-height: 1.25;
        }

        .events-intro {
          padding: 74px 0;
          background: #ffffff;
        }

        .events-intro-grid {
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: 54px;
          align-items: start;
        }

        .events-intro h2,
        .events-section-head h2,
        .events-feature-copy h2,
        .events-closing h2 {
          margin: 0;
          color: ${purpleDeep};
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.14;
        }

        .events-intro p:not(.events-kicker),
        .events-feature-copy p,
        .events-closing p {
          margin: 0;
          color: #4c4250;
          font-size: 16px;
          line-height: 1.82;
        }

        .events-types {
          padding: 74px 0 86px;
          background: ${mist};
        }

        .events-section-head {
          max-width: 660px;
          margin: 0 auto 36px;
          text-align: center;
        }

        .events-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .events-card {
          position: relative;
          min-height: 300px;
          padding: 30px 26px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid rgba(124, 59, 178, 0.13);
          box-shadow: 0 18px 48px rgba(70, 48, 88, 0.08);
          overflow: hidden;
        }

        .events-card-mark {
          position: absolute;
          right: 20px;
          top: 16px;
          color: rgba(201, 168, 76, 0.44);
          font-size: 42px;
          line-height: 1;
        }

        .events-card p {
          margin: 0 0 26px;
          color: ${gold};
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.11em;
        }

        .events-card h3 {
          margin: 0 0 14px;
          color: ${purpleDeep};
          font-size: 25px;
          line-height: 1.18;
        }

        .events-card span:not(.events-card-mark) {
          display: block;
          color: #4c4250;
          font-size: 14px;
          line-height: 1.78;
        }

        .events-feature {
          padding: 86px 0;
          background: linear-gradient(90deg, #ffffff 0%, ${sage} 100%);
        }

        .events-feature-inner {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          align-items: center;
          gap: 54px;
        }

        .events-feature-image {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 220px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid rgba(201, 168, 76, 0.3);
          box-shadow: 0 20px 50px rgba(54, 73, 65, 0.1);
        }

        .events-feature-image img {
          width: 119px;
          height: auto;
        }

        .events-feature-copy {
          max-width: 720px;
        }

        .events-feature-copy p {
          margin-top: 18px;
        }

        .events-feature-copy ul {
          display: grid;
          gap: 12px;
          margin: 24px 0 0;
          padding: 0;
          list-style: none;
        }

        .events-feature-copy li {
          position: relative;
          padding-left: 28px;
          color: #3f3844;
          font-size: 15px;
          line-height: 1.65;
        }

        .events-feature-copy li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${gold};
          box-shadow: 0 0 0 5px rgba(201, 168, 76, 0.16);
        }

        .events-closing {
          padding: 92px 0 104px;
          background: ${purpleDeep};
          color: #ffffff;
          text-align: center;
        }

        .events-closing-inner {
          max-width: 760px;
        }

        .events-closing h2,
        .events-closing p {
          color: #ffffff;
        }

        .events-closing p {
          margin: 20px auto 30px;
          color: rgba(255,255,255,0.86);
        }

        @media (max-width: 900px) {
          .events-hero {
            min-height: auto;
            padding: 132px 0 66px;
          }

          .events-hero-inner,
          .events-intro-grid,
          .events-feature-inner {
            grid-template-columns: 1fr;
          }

          .events-hero-inner,
          .events-feature-inner {
            gap: 36px;
          }

          .events-hero-media {
            justify-self: start;
            width: min(100%, 390px);
          }

          .events-card-grid {
            grid-template-columns: 1fr;
          }

          .events-card {
            min-height: 0;
          }
        }

        @media (max-width: 640px) {
          .events-page {
            max-width: 100vw;
            overflow-x: hidden;
          }

          .events-page .container-main {
            width: 100%;
            max-width: 100vw;
            padding-left: 30px;
            padding-right: 30px;
          }

          .events-hero {
            padding: 112px 0 54px;
          }

          .events-hero-copy,
          .events-hero-media,
          .events-intro-grid,
          .events-section-head,
          .events-feature-copy,
          .events-closing-inner {
            width: calc(100vw - 60px);
            max-width: calc(100vw - 60px);
          }

          .events-hero h1 {
            max-width: 310px;
            font-size: 28px;
            line-height: 1.08;
          }

          .events-lead {
            max-width: 310px;
            font-size: 15px;
            line-height: 1.7;
          }

          .events-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .events-primary,
          .events-secondary {
            width: calc(100vw - 60px);
            justify-content: center;
            text-align: center;
          }

          .events-floating-note {
            position: static;
            width: auto;
            margin-top: 12px;
          }

          .events-intro,
          .events-types,
          .events-feature,
          .events-closing {
            padding: 54px 0;
          }
        }
      `}</style>
    </>
  );
}
