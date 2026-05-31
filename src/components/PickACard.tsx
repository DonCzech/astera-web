"use client";
import { useState } from "react";

type Phase = "idle" | "animating" | "revealed";

const answers = [
  "Záři mezi správnými lidmi.",
  "Buď k sobě laskavá.",
  "Naslouchej své intuici.",
  "Malé změny pomohou.",
  "Ukliď své finance.",
  "Přehodnoť své vztahy.",
  "Dopřej mysli klid.",
  "Zpomal a odpočívej.",
  "Otevři staré otázky.",
  "Všímej si znamení.",
  "Následuj svá přání.",
  "Pusť staré věci.",
];

export default function PickACard() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [answer, setAnswer] = useState<string | null>(null);

  const handleClick = () => {
    if (phase === "animating") return;
    if (phase === "revealed") { setPhase("idle"); setAnswer(null); return; }
    setAnswer(null);
    setPhase("animating");
    setTimeout(() => {
      const pick = answers[Math.floor(Math.random() * answers.length)];
      setAnswer(pick);
      setPhase("revealed");
    }, 1800);
  };

  return (
    <section className="pac-section">
      {/* Top fade separator */}
      <div className="pac-sep pac-sep-top" />

      <div className="container-main">
        <div className="pac-grid">

          {/* LEFT — ball */}
          <div className="pac-ball-col">
            {/* Outer: drop-shadow on hover (separate from mask) */}
            <div
              className={`pac-outer pac-outer-${phase}`}
              onClick={handleClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleClick()}
              aria-label="Klikni na kouli"
            >
              {/* Inner mask: clips the white JPG background */}
              <div className="pac-mask">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/koule.jpg"
                  alt="Křišťálová koule"
                  className="pac-img"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* SPACER */}
          <div />

          {/* RIGHT */}
          <div className="pac-right">
            {phase === "idle" && (
              <>
                <span className="pac-line" />
                <h2 className="pac-title">Zeptej se křišťálové koule</h2>
                <p className="pac-subtitle">
                  Nech křišťálovou kouli odhalit, co si teď žádá tvou pozornost…
                </p>
              </>
            )}

            {phase === "animating" && (
              <div className="pac-waiting">
                <span className="pac-dot" /><span className="pac-dot" /><span className="pac-dot" />
              </div>
            )}

            {phase === "revealed" && answer && (
              <div className="pac-result">
                <span className="pac-line" />
                <p className="pac-answer">{answer}</p>
                <p className="pac-consult">
                  Cítíš, že v poselství je něco víc?{" "}
                  <a href="/sluzby" className="pac-consult-link">
                    Konzultace ti pomůže porozumět tomu do hloubky.
                  </a>
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom fade separator */}
      <div className="pac-sep pac-sep-bot" />

      <style>{`
        /* ── Section ── */
        .pac-section {
          position: relative;
          background: radial-gradient(ellipse 110% 130% at 28% 50%,
            #ffffff 0%, #f8f4ff 45%, #ede5ff 100%);
          padding: 80px 0;
          overflow: hidden;
        }

        /* Subtle separators — thin purple gradient lines at edges */
        .pac-sep {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(124,59,178,0.18) 30%,
            rgba(124,59,178,0.18) 70%, transparent 100%);
        }
        .pac-sep-top { top: 0; }
        .pac-sep-bot { bottom: 0; }

        /* ── Grid ── */
        .pac-grid {
          display: grid;
          grid-template-columns: 5fr 1fr 4fr;
          align-items: center;
        }

        /* ── Ball ── */
        .pac-ball-col { display: flex; justify-content: center; }

        /* Outer — carries drop-shadow; separate from mask layer */
        .pac-outer {
          width: min(100%, 420px);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: filter 0.35s ease;
          filter: drop-shadow(0 8px 32px rgba(124,59,178,0.15));
        }
        .pac-outer:hover {
          filter: drop-shadow(0 8px 48px rgba(124,59,178,0.42))
                  drop-shadow(0 0 80px rgba(100,40,200,0.22));
        }
        .pac-outer-animating {
          filter: drop-shadow(0 8px 48px rgba(124,59,178,0.5))
                  drop-shadow(0 0 90px rgba(100,40,200,0.3)) !important;
          animation: pac-breathe 0.9s ease-in-out infinite alternate;
        }
        .pac-outer-revealed {
          filter: drop-shadow(0 8px 40px rgba(124,59,178,0.35))
                  drop-shadow(0 0 60px rgba(100,40,200,0.18));
        }

        /* Inner mask — clips white JPG edges to oval */
        .pac-mask {
          -webkit-mask-image: radial-gradient(ellipse 80% 86% at 52% 47%,
            black 48%, rgba(0,0,0,0.5) 62%, transparent 76%);
          mask-image: radial-gradient(ellipse 80% 86% at 52% 47%,
            black 48%, rgba(0,0,0,0.5) 62%, transparent 76%);
        }

        .pac-img {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
        }

        /* ── Right ── */
        .pac-right { color: #1f1f1f; }

        .pac-line {
          display: block;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #7c3bb2, transparent);
          margin-bottom: 18px;
          border-radius: 2px;
        }
        .pac-title {
          font-family: 'Playfair Display', serif;
          color: #1f1f1f;
          font-size: 26px;
          line-height: 1.3;
          margin: 0 0 14px;
        }
        .pac-subtitle {
          font-family: 'Poppins', sans-serif;
          color: #5a4a6b;
          font-size: 15px;
          line-height: 1.75;
          margin: 0;
        }

        /* Waiting dots */
        .pac-waiting {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .pac-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #7c3bb2;
          opacity: 0.5;
          animation: pac-bounce 1.1s ease-in-out infinite;
        }
        .pac-dot:nth-child(2) { animation-delay: 0.18s; }
        .pac-dot:nth-child(3) { animation-delay: 0.36s; }

        /* Result */
        .pac-result { animation: pac-fadein 0.6s ease forwards; }
        .pac-answer {
          font-family: 'Playfair Display', serif;
          color: #2d1054;
          font-size: 34px;
          line-height: 1.4;
          margin: 0 0 20px;
        }
        .pac-consult {
          font-family: 'Poppins', sans-serif;
          color: #5a4a6b;
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }
        .pac-consult-link {
          color: #7c3bb2;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .pac-consult-link:hover { color: #5f2a8d; }

        /* ── Keyframes ── */
        @keyframes pac-breathe {
          from { transform: scale(1);    }
          to   { transform: scale(1.025); }
        }
        @keyframes pac-bounce {
          0%,80%,100% { transform: translateY(0);    }
          40%          { transform: translateY(-8px); }
        }
        @keyframes pac-fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .pac-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pac-grid > :nth-child(2) { display: none; }
          .pac-outer { width: min(100%, 280px); margin: 0 auto; }
          .pac-right { text-align: center; }
          .pac-line { margin-left: auto; margin-right: auto; }
          .pac-title { font-size: 22px; }
          .pac-answer { font-size: 26px; }
          .pac-waiting { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
