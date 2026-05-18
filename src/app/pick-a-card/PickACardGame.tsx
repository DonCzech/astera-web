"use client";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Card = {
  id: number;
  title: string;
  concepts: string;
  message: string;
  gradient: string;
  symbol: string;
};

const cards: Card[] = [
  {
    id: 1,
    title: "Milost v chaosu",
    concepts: "milost, volba, přijetí složitostí",
    message: "I uprostřed bouře je v tobě klidné místo. Dovol si tam vstoupit a naslouchat.",
    gradient: "linear-gradient(135deg, #7c3bb2 0%, #c9a84c 100%)",
    symbol: "✦",
  },
  {
    id: 2,
    title: "Nová cesta",
    concepts: "začátek, odvaha, důvěra",
    message: "Před tebou se otevírá nová stezka. Udělej první krok, i když nevidíš celou cestu.",
    gradient: "linear-gradient(135deg, #c9a84c 0%, #f5e9c8 100%)",
    symbol: "☽",
  },
  {
    id: 3,
    title: "Hluboké uzdravení",
    concepts: "léčení, soucit, péče",
    message: "Tvé tělo i duše vědí, jak se uzdravit. Dej jim čas a něžnou pozornost.",
    gradient: "linear-gradient(135deg, #6ab7a8 0%, #c9e8df 100%)",
    symbol: "❋",
  },
  {
    id: 4,
    title: "Strážce moudrosti",
    concepts: "intuice, vedení, vnitřní hlas",
    message: "Odpověď, kterou hledáš venku, již znáš uvnitř. Ztiš se a naslouchej.",
    gradient: "linear-gradient(135deg, #2d4a6e 0%, #7c9bbf 100%)",
    symbol: "✧",
  },
  {
    id: 5,
    title: "Tanec hojnosti",
    concepts: "hojnost, vděčnost, otevření",
    message: "Vesmír ti chce dát víc, než si dovedeš představit. Otevři dlaně k přijetí.",
    gradient: "linear-gradient(135deg, #d4814a 0%, #f5d4a8 100%)",
    symbol: "✺",
  },
  {
    id: 6,
    title: "Tichý hlas",
    concepts: "ticho, kontemplace, vhled",
    message: "Ne každá odpověď přichází slovy. Někdy je největší pravda v tichu.",
    gradient: "linear-gradient(135deg, #4a4063 0%, #9b8fb5 100%)",
    symbol: "◯",
  },
  {
    id: 7,
    title: "Plamen vášně",
    concepts: "tvoření, oheň, akce",
    message: "Tvá vášeň je posvátná. Nedovol nikomu, aby ji utlumil — naopak ji rozdmýchej.",
    gradient: "linear-gradient(135deg, #b2384a 0%, #f5a89b 100%)",
    symbol: "✸",
  },
  {
    id: 8,
    title: "Měsíční brána",
    concepts: "cykly, ženská energie, plynutí",
    message: "Vše má svůj čas — odliv i příliv. Důvěřuj rytmu, ve kterém právě jsi.",
    gradient: "linear-gradient(135deg, #3a5f8a 0%, #c5d8e8 100%)",
    symbol: "☾",
  },
  {
    id: 9,
    title: "Strom kořenů",
    concepts: "stabilita, uzemnění, předkové",
    message: "Tvé kořeny sahají hluboko. Stůj pevně a vítr tě jen posílí.",
    gradient: "linear-gradient(135deg, #5a4a2e 0%, #c9a84c 100%)",
    symbol: "⚘",
  },
  {
    id: 10,
    title: "Křídla svobody",
    concepts: "svoboda, nadhled, odpoutání",
    message: "To, co tě svazovalo, již nemá moc. Rozpřáhni křídla — patří ti celé nebe.",
    gradient: "linear-gradient(135deg, #87a9c9 0%, #e8f1f8 100%)",
    symbol: "✶",
  },
  {
    id: 11,
    title: "Setkání duší",
    concepts: "spojení, láska, rezonance",
    message: "Ten správný člověk přichází ve správný čas. Buď tím, kým jsi — to je tvůj magnet.",
    gradient: "linear-gradient(135deg, #b35a8a 0%, #f5c5d8 100%)",
    symbol: "♡",
  },
  {
    id: 12,
    title: "Hvězdná setba",
    concepts: "vize, manifestace, sen",
    message: "Sen, který nosíš v srdci, není náhoda. Zalévej ho denně malými činy.",
    gradient: "linear-gradient(135deg, #1a1f4a 0%, #c9a84c 100%)",
    symbol: "✦",
  },
];

const CARD_BACK_GRADIENT = "linear-gradient(135deg, #f5b8c8 0%, #c9a4d4 50%, #f5d4a8 100%)";

const CARD_W = 200;
const CARD_H = 290;
const GAP = 20;

export default function PickACardGame() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "zoom" | "flip" | "shown">("idle");
  const [shuffled, setShuffled] = useState<Card[]>(cards);

  useEffect(() => {
    setShuffled([...cards].sort(() => Math.random() - 0.5));
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    sliderRef.current?.scrollBy({ left: dir * (CARD_W + GAP) * 3, behavior: "smooth" });
  };

  const [revealedCard, setRevealedCard] = useState<Card | null>(null);

  const pickCard = (id: number) => {
    if (phase !== "idle") return;
    setSelectedId(id);
    const random = cards[Math.floor(Math.random() * cards.length)];
    setRevealedCard(random);
    setPhase("zoom");
    setTimeout(() => setPhase("flip"), 700);
    setTimeout(() => setPhase("shown"), 1400);
  };

  const closeReveal = () => {
    if (phase !== "shown") return;
    setSelectedId(null);
    setRevealedCard(null);
    setPhase("idle");
  };

  const selected = revealedCard;

  return (
    <>
      <Header />
      <main className="pick-card-main" style={{ background: "linear-gradient(180deg, #fffcf5 0%, #f5ede0 100%)", minHeight: "calc(100vh - 80px)", paddingTop: "146px", paddingBottom: "80px" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.18, color: "#2d2540", margin: "0 0 18px", fontWeight: 500, overflow: "visible" }}>
            Vyberte si svojí kartu
          </h1>
          <div style={{ maxWidth: 720, margin: "0 auto 42px", padding: "0 18px" }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", color: "#5a5566", margin: 0, lineHeight: 1.75, overflow: "visible" }}>
              Karty jsou starodávným nástrojem duchovního vedení. Položte si v duchu otázku, projděte kartami a vyberte tu, která vás osloví. Karta vám poskytne vhled do dalšího kroku.
            </p>
          </div>

          {/* Slider */}
          <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
            <button
              aria-label="Posunout vlevo"
              onClick={() => scrollBy(-1)}
              style={arrowStyle("left")}
              disabled={phase !== "idle"}
            >
              ‹
            </button>
            <div
              ref={sliderRef}
              style={{
                display: "flex",
                gap: `${GAP}px`,
                overflowX: "auto",
                scrollBehavior: "smooth",
                padding: "30px 60px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="card-slider"
            >
              {shuffled.map((card) => {
                const isSelected = card.id === selectedId;
                const hidden = selectedId !== null && !isSelected;
                return (
                  <div
                    key={card.id}
                    onClick={() => pickCard(card.id)}
                    className="card-back"
                    style={{
                      flex: `0 0 ${CARD_W}px`,
                      height: `${CARD_H}px`,
                      borderRadius: "14px",
                      background: CARD_BACK_GRADIENT,
                      cursor: phase === "idle" ? "pointer" : "default",
                      position: "relative",
                      transition: "opacity 0.5s ease, transform 0.35s ease",
                      opacity: hidden ? 0 : isSelected && phase !== "idle" ? 0 : 1,
                      transform: isSelected && phase !== "idle" ? "scale(0.85)" : "scale(1)",
                      boxShadow: "0 8px 24px rgba(45, 37, 64, 0.18)",
                      pointerEvents: phase === "idle" ? "auto" : "none",
                      overflow: "hidden",
                    }}
                  >
                    <CardBackPattern />
                  </div>
                );
              })}
            </div>
            <button
              aria-label="Posunout vpravo"
              onClick={() => scrollBy(1)}
              style={arrowStyle("right")}
              disabled={phase !== "idle"}
            >
              ›
            </button>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: "#8a8497", marginTop: "16px" }}>
              Posuňte kartami nebo klikněte na šipky. Pak kliknutím vyberte svou kartu.
            </p>
          </div>
        </div>

        {/* Selected card overlay */}
        {selected && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: phase === "shown" ? "rgba(20, 14, 40, 0.78)" : "rgba(20, 14, 40, 0)",
              transition: "background 0.6s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              pointerEvents: phase === "shown" ? "auto" : "none",
            }}
            onClick={closeReveal}
          >
            {phase === "shown" && (
              <button
                type="button"
                aria-label="Zavřít kartu"
                onClick={closeReveal}
                style={{
                  position: "absolute",
                  top: "22px",
                  right: "22px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  fontSize: "22px",
                  lineHeight: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                ×
              </button>
            )}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                perspective: "1400px",
                width: "min(340px, 88vw)",
                height: "min(490px, 80vh)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.9s cubic-bezier(0.7, 0, 0.3, 1), scale 0.7s ease",
                  transform: phase === "zoom" ? "scale(0.6) rotateY(0deg)" : phase === "flip" ? "scale(1) rotateY(90deg)" : phase === "shown" ? "scale(1) rotateY(180deg)" : "scale(0.3) rotateY(0deg)",
                }}
              >
                {/* Back */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    background: CARD_BACK_GRADIENT,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
                    overflow: "hidden",
                  }}
                >
                  <CardBackPattern />
                </div>
                {/* Front */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    background: selected.gradient,
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 30px",
                    textAlign: "center",
                    color: "#fff",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)" }} />
                  <div style={{ position: "relative", fontFamily: "'Cormorant Garamond', serif", fontSize: "70px", lineHeight: 1, opacity: 0.9, marginBottom: "18px" }}>
                    {selected.symbol}
                  </div>
                  <h2 style={{ position: "relative", fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 500, margin: "0 0 14px", letterSpacing: "0.5px" }}>
                    {selected.title}
                  </h2>
                  <div style={{ position: "relative", fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", opacity: 0.85, marginBottom: "22px" }}>
                    {selected.concepts}
                  </div>
                  <div style={{ position: "relative", width: "40px", height: "1px", background: "rgba(255,255,255,0.5)", marginBottom: "22px" }} />
                  <p style={{ position: "relative", fontFamily: "'Cormorant Garamond', serif", fontSize: "19px", lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
                    {selected.message}
                  </p>
                </div>
              </div>
            </div>

            {phase === "shown" && (
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Vaše karta pro dnešek
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        .card-slider::-webkit-scrollbar { display: none; }
        .card-back:hover { transform: translateY(-8px) !important; }
        @media (max-width: 640px) {
          .pick-card-main {
            padding-top: 108px !important;
          }
        }
      `}</style>
      <Footer />
    </>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: "8px",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    boxShadow: "0 4px 14px rgba(45, 37, 64, 0.15)",
    cursor: "pointer",
    fontSize: "26px",
    color: "#2d2540",
    fontFamily: "serif",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function CardBackPattern() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: "12px", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "10px" }} />
      <div style={{ position: "absolute", inset: "18px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "8px" }} />
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "44px",
        color: "rgba(255,255,255,0.85)",
        textShadow: "0 2px 12px rgba(0,0,0,0.25)",
      }}>
        ✦
      </div>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.15) 0%, transparent 50%)",
      }} />
    </div>
  );
}
