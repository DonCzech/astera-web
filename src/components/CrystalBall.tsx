"use client";
import { useState } from "react";

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

export default function CrystalBall() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const askBall = () => {
    if (!question.trim() || isShaking) return;
    setIsShaking(true);
    setAnswer(null);
    setRevealed(false);

    setTimeout(() => {
      const pick = answers[Math.floor(Math.random() * answers.length)];
      setAnswer(pick);
      setIsShaking(false);
      setTimeout(() => setRevealed(true), 80);
    }, 1800);
  };

  return (
    <section className="cb-section">
      <div className="container-main">
        <div className="cb-wrap">
          {/* Header */}
          <p className="cb-eyebrow">Křišťálová koule</p>
          <h2 className="cb-title">Zeptej se křišťálové koule</h2>
          <p className="cb-subtitle">
            Nech křišťálovou kouli odhalit, co si teď žádá tvou pozornost…
          </p>

          {/* Ball */}
          <div className={`cb-ball-wrap${isShaking ? " cb-shake" : ""}`}>
            <div className="cb-glow-ring" />
            <div className="cb-sphere">
              <div className="cb-swirl cb-swirl-a" />
              <div className="cb-swirl cb-swirl-b" />
              <div className="cb-swirl cb-swirl-c" />
              <div className="cb-shine" />
              <div className="cb-shine-small" />
              {answer && (
                <div className={`cb-inner-answer${revealed ? " cb-visible" : ""}`}>
                  <p className="cb-inner-text">{answer}</p>
                </div>
              )}
            </div>
            <div className="cb-base-shadow" />
            <div className="cb-base" />
          </div>

          {/* Input */}
          <div className="cb-input-row">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askBall()}
              placeholder="Napiš svou otázku…"
              className="cb-input"
            />
            <button
              onClick={askBall}
              disabled={!question.trim() || isShaking}
              className="cb-btn"
            >
              {isShaking ? "Koule naslouchá…" : "Zeptat se koule"}
            </button>
          </div>

          {/* Answer below ball */}
          <div className={`cb-answer-row${revealed && answer ? " cb-answer-visible" : ""}`}>
            <p className="cb-answer-text">{answer}</p>
            <p className="cb-consult-text">
              Cítíš, že v poselství je něco víc?{" "}
              <a href="/sluzby" className="cb-consult-link">
                Konzultace ti pomůže porozumět tomu do hloubky.
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .cb-section {
          background: linear-gradient(160deg, #0e0720 0%, #1b0a35 45%, #0b1728 100%);
          padding: 80px 0 90px;
        }
        .cb-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .cb-eyebrow {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #a78bda;
          margin: 0 0 10px;
        }
        .cb-title {
          font-family: 'Playfair Display', serif;
          color: #ffffff;
          font-size: 34px;
          line-height: 1.25;
          margin: 0 0 14px;
        }
        .cb-subtitle {
          font-family: 'Poppins', sans-serif;
          color: #c4a8e8;
          font-size: 15px;
          line-height: 1.75;
          margin: 0 0 52px;
          max-width: 480px;
        }

        /* ── Ball ── */
        .cb-ball-wrap {
          position: relative;
          width: 300px;
          height: 320px;
          margin: 0 auto 44px;
        }
        .cb-glow-ring {
          position: absolute;
          inset: -24px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,59,178,0.22) 0%, transparent 68%);
          animation: cb-pulse 3.2s ease-in-out infinite;
        }
        .cb-sphere {
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 252px;
          border-radius: 50%;
          background: radial-gradient(circle at 36% 32%,
            #7b52c8 0%,
            #4a2098 28%,
            #1e0d45 60%,
            #090e22 100%);
          overflow: hidden;
          box-shadow:
            inset 0 0 55px rgba(100,70,200,0.45),
            inset 0 0 22px rgba(59,130,246,0.25),
            0 0 50px rgba(110,65,190,0.35),
            0 0 100px rgba(110,65,190,0.12),
            0 20px 60px rgba(0,0,0,0.6);
        }
        .cb-swirl {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
        }
        .cb-swirl-a {
          width: 170%; height: 170%;
          top: -35%; left: -35%;
          background: radial-gradient(ellipse at 45% 45%,
            rgba(140,90,230,0.55) 0%, transparent 58%);
          animation: cb-swirl1 9s linear infinite;
        }
        .cb-swirl-b {
          width: 150%; height: 150%;
          top: -25%; left: -25%;
          background: radial-gradient(ellipse at 58% 55%,
            rgba(70,130,255,0.35) 0%, transparent 55%);
          animation: cb-swirl1 14s linear infinite reverse;
        }
        .cb-swirl-c {
          width: 120%; height: 120%;
          top: -10%; left: -10%;
          background: radial-gradient(ellipse at 30% 70%,
            rgba(180,100,255,0.2) 0%, transparent 50%);
          animation: cb-swirl1 20s linear infinite;
        }
        .cb-shine {
          position: absolute;
          width: 38%; height: 26%;
          top: 10%; left: 14%;
          background: radial-gradient(ellipse,
            rgba(255,255,255,0.38) 0%, transparent 100%);
          border-radius: 50%;
          transform: rotate(-28deg);
        }
        .cb-shine-small {
          position: absolute;
          width: 14%; height: 10%;
          top: 52%; right: 16%;
          background: radial-gradient(ellipse,
            rgba(255,255,255,0.18) 0%, transparent 100%);
          border-radius: 50%;
        }
        .cb-inner-answer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(8,4,26,0.65);
          backdrop-filter: blur(2px);
          opacity: 0;
          transition: opacity 0.9s ease;
        }
        .cb-inner-answer.cb-visible { opacity: 1; }
        .cb-inner-text {
          font-family: 'Playfair Display', serif;
          color: #e8d5ff;
          font-size: 16px;
          line-height: 1.55;
          margin: 0;
          text-shadow: 0 0 24px rgba(180,140,255,0.9), 0 0 8px rgba(180,140,255,0.5);
        }
        .cb-base {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 90px; height: 28px;
          background: linear-gradient(135deg,
            rgba(120,90,180,0.55) 0%,
            rgba(60,30,100,0.75) 100%);
          border-radius: 0 0 48px 48px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.55);
        }
        .cb-base-shadow {
          position: absolute;
          bottom: -6px; left: 50%;
          transform: translateX(-50%);
          width: 140px; height: 18px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%);
          border-radius: 50%;
        }
        .cb-shake {
          animation: cb-shake 0.42s ease-in-out 0s 4;
        }

        /* ── Input ── */
        .cb-input-row {
          display: flex;
          gap: 12px;
          width: 100%;
          max-width: 520px;
          margin-bottom: 32px;
        }
        .cb-input {
          flex: 1;
          padding: 14px 22px;
          border-radius: 50px;
          border: 1px solid rgba(167,139,218,0.35);
          background: rgba(255,255,255,0.06);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .cb-input:focus { border-color: rgba(167,139,218,0.75); }
        .cb-input::placeholder { color: rgba(196,168,232,0.5); }
        .cb-btn {
          padding: 14px 28px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #7c3bb2 0%, #5f2a8d 100%);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 4px 18px rgba(124,59,178,0.45);
        }
        .cb-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .cb-btn:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(124,59,178,0.6); }

        /* ── Answer below ── */
        .cb-answer-row {
          max-width: 440px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
          pointer-events: none;
        }
        .cb-answer-row.cb-answer-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .cb-answer-text {
          font-family: 'Playfair Display', serif;
          color: #e8d5ff;
          font-size: 20px;
          line-height: 1.5;
          margin: 0 0 12px;
        }
        .cb-consult-text {
          font-family: 'Poppins', sans-serif;
          color: #a78bda;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }
        .cb-consult-link {
          color: #c4a8e8;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .cb-consult-link:hover { color: #ffffff; }

        /* ── Animations ── */
        @keyframes cb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        @keyframes cb-swirl1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cb-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-9px, 2px) rotate(-4deg); }
          40% { transform: translate(9px, -2px) rotate(4deg); }
          60% { transform: translate(-7px, 1px) rotate(-2deg); }
          80% { transform: translate(7px, -1px) rotate(2deg); }
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .cb-title { font-size: 26px; }
          .cb-ball-wrap { width: 240px; height: 260px; }
          .cb-sphere { left: 18px; right: 18px; height: 202px; }
          .cb-base { width: 72px; height: 22px; }
          .cb-input-row { flex-direction: column; }
          .cb-btn { border-radius: 50px; }
        }
      `}</style>
    </section>
  );
}
