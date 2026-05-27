"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MOON_DATA } from "@/lib/moon-data";

const PHASE_CS: Record<string, string> = {
  "New Moon":       "Nový měsíc",
  "Waxing Crescent":"Dorůstající srpek",
  "First Quarter":  "První čtvrtina",
  "Waxing Gibbous": "Dorůstající měsíc",
  "Full Moon":      "Úplněk",
  "Waning Gibbous": "Ubývající měsíc",
  "Third Quarter":  "Poslední čtvrtina",
  "Last Quarter":   "Poslední čtvrtina",
  "Waning Crescent":"Ubývající srpek",
};

const PHASE_DESC: Record<string, string> = {
  "New Moon":       "Měsíc není viditelný. Čas nových záměrů, začátků a otevírání nových kapitol.",
  "Waxing Crescent":"Světlo pomalu přibývá. Ideální čas pro plánování, budování a první kroky.",
  "First Quarter":  "Polovina cesty k úplňku. Čas rozhodnutí a překonávání překážek.",
  "Waxing Gibbous": "Energie a světlo narůstají. Záměry se rozvíjejí, dochází k pokroku.",
  "Full Moon":      "Měsíc svítí v plné síle. Vrchol energie, vyvrcholení a osvícení.",
  "Waning Gibbous": "Světlo začíná ubývat. Čas vděčnosti, sdílení a reflexe.",
  "Third Quarter":  "Čas uvolnění a odpouštění. Zbavte se toho, co již neslouží.",
  "Last Quarter":   "Čas uvolnění a odpouštění. Zbavte se toho, co již neslouží.",
  "Waning Crescent":"Příprava na nový cyklus. Odpočinek, introspekce a odevzdání.",
};

const STAGE_CS: Record<string, string> = {
  "Waxing": "dorůstající",
  "Waning": "ubývající",
};

const CZECH_MONTHS = [
  "ledna","února","března","dubna","května","června",
  "července","srpna","září","října","listopadu","prosince",
];
const CZECH_DAYS = ["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"];

function todayKey() {
  const n = new Date();
  return `${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}`;
}

function fallbackImg(date: Date): string {
  const known = new Date("2000-01-06T18:14:00Z");
  const cycle = 29.53058867;
  const age = (((date.getTime()-known.getTime())/86400000)%cycle+cycle)%cycle;
  const map = [0,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
  return `${map[Math.round((age/cycle)*16)%16]}.png`;
}

function buildMoonDay() {
  const now = new Date();
  const key = todayKey();
  const entry = MOON_DATA[key] ?? { img: fallbackImg(now), phase: "Waxing Gibbous", stage: "Waxing", illumination: 50 };
  const label = `${CZECH_DAYS[now.getDay()]} ${now.getDate()}. ${CZECH_MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  return { entry, label };
}

interface Props {
  /** height of the surrounding header — used to vertically centre the widget */
  headerHeight: number;
}

export default function MoonWidget({ headerHeight }: Props) {
  const [open, setOpen] = useState(false);
  // Calculate synchronously — moon phase is the same all day, no hydration mismatch
  const [{ entry: moonDay, label: dateLabel }] = useState(buildMoonDay);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey   = (e: KeyboardEvent) => e.key==="Escape" && setOpen(false);
    const onClick = (e: MouseEvent)    => { if (popupRef.current && !popupRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  const phaseCs = PHASE_CS[moonDay.phase] ?? moonDay.phase;
  const desc    = PHASE_DESC[moonDay.phase] ?? "";
  const stageCs = STAGE_CS[moonDay.stage]  ?? moonDay.stage;
  const imgSrc  = `/images/moon-phases/${moonDay.img}`;

  return (
    <>
      {/* ── Nav item ──────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Fáze měsíce"
        style={{
          display: "flex", alignItems: "center", gap: "7px",
          padding: "0 12px",
          height: `${headerHeight}px`,
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px", fontWeight: 500, color: "#1f1f1f",
          whiteSpace: "nowrap",
          transition: "color 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#7c3bb2")}
        onMouseLeave={e => (e.currentTarget.style.color = "#1f1f1f")}
      >
        <Image
          src={imgSrc} alt={phaseCs}
          width={20} height={20}
          style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          unoptimized
        />
        <span className="moon-widget-text">{phaseCs}</span>
      </button>

      {/* ── Popup ─────────────────────────────────────────────── */}
      {open && (
        <div
          style={{
            position: "fixed", inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2000,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            ref={popupRef}
            style={{
              backgroundColor: "#0f0f1a",
              borderRadius: "18px",
              padding: "36px 32px 32px",
              width: "min(340px, 90vw)",
              display: "flex", flexDirection: "column", alignItems: "center",
              boxShadow: "0 24px 64px rgba(0,0,0,0.65)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Zavřít"
              style={{
                position: "absolute", top: "14px", right: "16px",
                background: "none", border: "none", cursor: "pointer",
                color: "#d4c9a8", opacity: 0.4, fontSize: "22px", lineHeight: 1, padding: "4px",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
            >×</button>

            <div style={{ marginBottom: "22px" }}>
              <Image src={imgSrc} alt={phaseCs} width={180} height={180}
                style={{ borderRadius: "50%", objectFit: "cover" }} unoptimized />
            </div>

            <p style={{ color: "#9b8e72", fontSize: "11px", letterSpacing: "0.1em",
              fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", marginBottom: "6px" }}>
              {dateLabel}
            </p>

            <h2 style={{ color: "#f0e4c0", fontSize: "22px",
              fontFamily: "'Playfair Display', serif", marginBottom: "5px", textAlign: "center" }}>
              {phaseCs}
            </h2>

            <p style={{ color: "#9b8e72", fontSize: "12px",
              fontFamily: "'Poppins', sans-serif", marginBottom: "18px" }}>
              osvětlení {moonDay.illumination}&nbsp;% · {stageCs}
            </p>

            <div style={{ width: "40px", height: "1px", backgroundColor: "#2a2a40", marginBottom: "18px" }} />

            <p style={{ color: "#c4b99a", fontSize: "13px", lineHeight: "1.75",
              fontFamily: "'Poppins', sans-serif", textAlign: "center" }}>
              {desc}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
