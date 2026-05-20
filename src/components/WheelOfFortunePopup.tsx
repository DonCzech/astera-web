"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useContent } from "@/context/ContentContext";
import type { WheelSegment } from "@/lib/content-types";

const purple = "#7c3bb2";
const gold   = "#c9a84c";
const goldLight = "#f5e9c8";
const cream  = "#fffcf5";
const creamDeep = "#f5ede0";

const WHEEL_SIZE_DESKTOP = 300;
const WHEEL_SIZE_MOBILE  = 220;

// ── Sparkle particles on entrance ──────────────────────────────────────────

const SPARKS = [
  { angle:   0, d: 120 }, { angle:  40, d: 100 }, { angle:  80, d: 130 },
  { angle: 130, d:  90 }, { angle: 170, d: 115 }, { angle: 210, d: 105 },
  { angle: 250, d: 125 }, { angle: 300, d:  95 }, { angle: 340, d: 110 },
];

function Sparks({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5, overflow: "hidden", borderRadius: 22 }}>
      {SPARKS.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.d;
        const dy = Math.sin(rad) * s.d;
        const symbols = ["✦", "★", "✸", "◆", "✺"];
        return (
          <div key={i} style={{
            position: "absolute",
            top: "50%", left: "50%",
            fontSize: 14 + (i % 3) * 4,
            color: i % 2 === 0 ? gold : goldLight,
            animation: `sparkFly${i % 3} 0.85s ${i * 0.06}s cubic-bezier(0.2, 0.8, 0.4, 1) both`,
            "--dx": `${dx}px`, "--dy": `${dy}px`,
          } as React.CSSProperties}>
            {symbols[i % symbols.length]}
          </div>
        );
      })}
    </div>
  );
}

// ── Ornament divider ────────────────────────────────────────────────────────

function OrnamentDivider({ tight = false }: { tight?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: tight ? "10px 0" : "18px 0", color: gold }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${gold}77)` }} />
      <span style={{ fontSize: 11, letterSpacing: 7, opacity: 0.85 }}>✦ ✦ ✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${gold}77)` }} />
    </div>
  );
}

// ── Canvas wheel drawing ────────────────────────────────────────────────────

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

function drawWheel(canvas: HTMLCanvasElement, segments: WheelSegment[], size = WHEEL_SIZE_DESKTOP) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width  = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width  = `${size}px`;
  canvas.style.height = `${size}px`;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  const cx = size / 2, cy = size / 2;
  const R = size / 2 - 6;
  const innerR = R - 10;

  const total = segments.reduce((s, seg) => s + seg.weight, 0);
  let startAngle = 0;

  for (const seg of segments) {
    const sliceAngle = (seg.weight / total) * 2 * Math.PI;
    const endAngle   = startAngle + sliceAngle;
    const midAngle   = startAngle + sliceAngle / 2;

    const segGrad = ctx.createRadialGradient(cx, cy, innerR * 0.3, cx, cy, innerR);
    segGrad.addColorStop(0, lightenColor(seg.color, 28));
    segGrad.addColorStop(1, seg.color);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, innerR, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = segGrad;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.42)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Tick at boundary
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle);
    ctx.beginPath();
    ctx.moveTo(innerR, 0);
    ctx.lineTo(R - 2, 0);
    ctx.strokeStyle = `${gold}cc`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Segment label
    const fontSize = size < 260 ? 9 : 11;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(midAngle);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,0.65)";
    ctx.shadowBlur = 5;
    ctx.fillText(seg.label, innerR - 8, 4);
    ctx.shadowBlur = 0;
    ctx.fillStyle = `${goldLight}bb`;
    ctx.font = "8px serif";
    ctx.textAlign = "left";
    ctx.fillText("◆", 22, 4);
    ctx.restore();

    startAngle = endAngle;
  }

  // Outer gold ring
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, 2 * Math.PI);
  const ringGrad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
  ringGrad.addColorStop(0, goldLight);
  ringGrad.addColorStop(0.5, gold);
  ringGrad.addColorStop(1, goldLight);
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, R - 5, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Glossy overlay
  const glossGrad = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, 0, cx, cy, R);
  glossGrad.addColorStop(0, "rgba(255,255,255,0.22)");
  glossGrad.addColorStop(0.45, "rgba(255,255,255,0.06)");
  glossGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, 2 * Math.PI);
  ctx.fillStyle = glossGrad;
  ctx.fill();

  // White dots at boundaries
  const total2 = segments.reduce((s, seg) => s + seg.weight, 0);
  let a2 = 0;
  for (const seg of segments) {
    const sx = cx + (R - 5) * Math.cos(a2);
    const sy = cy + (R - 5) * Math.sin(a2);
    ctx.beginPath();
    ctx.arc(sx, sy, 3.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    a2 += (seg.weight / total2) * 2 * Math.PI;
  }

  // Center circle
  const cR = 26;
  const cGrad = ctx.createRadialGradient(cx - 8, cy - 8, 2, cx, cy, cR);
  cGrad.addColorStop(0, "#fffae8");
  cGrad.addColorStop(0.5, gold);
  cGrad.addColorStop(1, "#8a6020");
  ctx.beginPath();
  ctx.arc(cx, cy, cR, 0, 2 * Math.PI);
  ctx.fillStyle = cGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#3d1a00";
  ctx.font = "bold 18px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✦", cx, cy);
}

// ── Main component ──────────────────────────────────────────────────────────

type Phase = "idle" | "spinning" | "win" | "loss" | "done";

export default function WheelOfFortunePopup() {
  const { content, admin } = useContent();
  const cfg = content.wheelOfFortune;

  const [visible,    setVisible]    = useState(false);
  const [sparks,     setSparks]     = useState(false);
  const [phase,      setPhase]      = useState<Phase>("idle");
  const [email,      setEmail]      = useState("");
  const [sending,    setSending]    = useState(false);
  const [winner,     setWinner]     = useState<WheelSegment | null>(null);
  const [isMobile,   setIsMobile]   = useState(false);
  const wheelSize = isMobile ? WHEEL_SIZE_MOBILE : WHEEL_SIZE_DESKTOP;

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const wheelWrapRef = useRef<HTMLDivElement>(null);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioCtxRef  = useRef<AudioContext | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 620);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Draw on mount / segment / size change
  useEffect(() => {
    if (!visible || !canvasRef.current || !cfg?.segments?.length) return;
    drawWheel(canvasRef.current, cfg.segments, wheelSize);
  }, [visible, cfg?.segments, wheelSize]);

  // Scroll-to-bottom trigger
  useEffect(() => {
    if (!cfg?.enabled) return;
    if (!admin.isAdmin) {
      const lastShown = localStorage.getItem("wheel_shown_at");
      if (lastShown && Date.now() - Number(lastShown) < 24 * 60 * 60 * 1000) return;
    }
    const check = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 220) {
        setTimeout(() => {
          setVisible(true);
          setSparks(true);
          setTimeout(() => setSparks(false), 1200);
        }, 700);
        window.removeEventListener("scroll", check);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [cfg?.enabled]);

  // Lock scroll
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      localStorage.setItem("wheel_shown_at", String(Date.now()));
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const playSpinSound = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      if (audioCtxRef.current) audioCtxRef.current.close();
      const ctx = new AC();
      audioCtxRef.current = ctx;

      const spinDuration = 5.2;
      // Schedule ticks: start fast (~18/s), decelerate to ~1.5/s using easeOut curve
      let t = 0;
      while (t < spinDuration) {
        const progress = t / spinDuration;
        // easeOut: interval grows from 0.055s to 0.65s
        const interval = 0.055 + Math.pow(progress, 1.8) * 0.595;

        const now = ctx.currentTime + t;

        // Short bandpass click (roulette pin sound)
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;

        const bpf = ctx.createBiquadFilter();
        bpf.type = "bandpass";
        bpf.frequency.value = 1800 + Math.random() * 400;
        bpf.Q.value = 3;

        const gain = ctx.createGain();
        // Ticks get slightly louder as wheel slows (more satisfying at end)
        gain.gain.value = 0.18 + progress * 0.14;

        src.connect(bpf);
        bpf.connect(gain);
        gain.connect(ctx.destination);
        src.start(now);
        src.stop(now + 0.04);

        t += interval;
      }

      // Final "stop" thud
      const thudTime = ctx.currentTime + spinDuration + 0.05;
      const thudBuf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
      const thudData = thudBuf.getChannelData(0);
      for (let i = 0; i < thudData.length; i++) {
        thudData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
      }
      const thudSrc = ctx.createBufferSource();
      thudSrc.buffer = thudBuf;
      const thudGain = ctx.createGain();
      thudGain.gain.value = 0.38;
      thudSrc.connect(thudGain);
      thudGain.connect(ctx.destination);
      thudSrc.start(thudTime);

    } catch { /* AudioContext not supported or blocked */ }
  }, []);

  const resetAndClose = useCallback(() => {
    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    setVisible(false);
    setPhase("idle");
    setEmail("");
    setWinner(null);
    setSending(false);
    if (wheelWrapRef.current) {
      wheelWrapRef.current.style.transition = "none";
      wheelWrapRef.current.style.transform  = "rotate(0deg)";
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") resetAndClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [resetAndClose]);

  // Weighted random selection
  const selectWinner = useCallback((): WheelSegment => {
    const segs = cfg.segments;
    const totalW = segs.reduce((s, seg) => s + seg.weight, 0);
    let r = Math.random() * totalW;
    for (const seg of segs) {
      r -= seg.weight;
      if (r <= 0) return seg;
    }
    return segs[segs.length - 1];
  }, [cfg?.segments]);

  const handleSpin = useCallback(() => {
    if (phase !== "idle") return;
    const won = selectWinner();
    setWinner(won);
    setPhase("spinning");

    const segs   = cfg.segments;
    const totalW = segs.reduce((s, seg) => s + seg.weight, 0);
    let cumDeg   = 0;

    for (const seg of segs) {
      const segDeg = (seg.weight / totalW) * 360;
      if (seg.id === won.id) {
        const midDeg  = cumDeg + segDeg / 2;
        const R_base  = ((270 - midDeg) % 360 + 360) % 360;
        const jitter  = (Math.random() - 0.5) * segDeg * 0.35;
        const target  = R_base + 5 * 360 + jitter;

        if (wheelWrapRef.current) {
          wheelWrapRef.current.style.transition = "none";
          wheelWrapRef.current.style.transform  = "rotate(0deg)";
          void wheelWrapRef.current.offsetHeight;
          wheelWrapRef.current.style.transition = "transform 5.2s cubic-bezier(0.12, 0, 0.22, 1)";
          wheelWrapRef.current.style.transform  = `rotate(${target}deg)`;
        }
        playSpinSound();

        spinTimerRef.current = setTimeout(() => {
          setPhase(won.isLoss ? "loss" : "win");
        }, 5400);
        return;
      }
      cumDeg += segDeg;
    }
  }, [phase, selectWinner, cfg?.segments]);

  // Submit email after win
  const handleEmailSubmit = useCallback(async () => {
    if (!email.includes("@") || !email.includes(".") || !winner) return;
    setSending(true);
    try {
      await fetch("/api/wheel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          segmentLabel: winner.label,
          coupon: winner.coupon,
          isWin: true,
        }),
      });
    } catch { /* silent */ }
    setSending(false);
    setPhase("done");
  }, [email, winner]);

  if (!cfg?.enabled || !visible) return null;

  const isEmailValid = email.includes("@") && email.includes(".");

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) resetAndClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(14, 4, 30, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
        animation: "wfBackdropIn 0.45s ease both",
      }}
    >
      <div
        style={{
          width: "min(100%, 820px)",
          maxHeight: "calc(100dvh - 28px)",
          overflowX: "hidden",
          overflowY: "auto",
          background: `linear-gradient(160deg, ${cream} 0%, #fdf5e8 60%, ${creamDeep} 100%)`,
          borderRadius: 22,
          border: `1px solid ${gold}88`,
          boxShadow: `0 50px 120px rgba(14,4,30,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.9)`,
          position: "relative",
          animation: "wfModalIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={cfg.title}
      >
        {/* Entrance sparkles */}
        <Sparks active={sparks} />

        {/* Corner ornaments */}
        {(["tl","tr","bl","br"] as const).map(c => (
          <div key={c} aria-hidden style={{
            position: "absolute",
            top: c[0]==="t" ? 10 : undefined, bottom: c[0]==="b" ? 10 : undefined,
            left: c[1]==="l" ? 10 : undefined, right: c[1]==="r" ? 10 : undefined,
            width: 22, height: 22, pointerEvents: "none",
            borderTop:    c[0]==="t" ? `1px solid ${gold}66` : undefined,
            borderBottom: c[0]==="b" ? `1px solid ${gold}66` : undefined,
            borderLeft:   c[1]==="l" ? `1px solid ${gold}66` : undefined,
            borderRight:  c[1]==="r" ? `1px solid ${gold}66` : undefined,
            borderRadius: c==="tl"?"5px 0 0 0":c==="tr"?"0 5px 0 0":c==="bl"?"0 0 0 5px":"0 0 5px 0",
          }} />
        ))}

        {/* Close */}
        <button
          onClick={resetAndClose} aria-label="Zavřít"
          style={{
            position: "absolute", top: 13, right: 13, zIndex: 20,
            width: 30, height: 30, borderRadius: "50%",
            background: `${goldLight}cc`, border: `1px solid ${gold}55`,
            color: "#5a3a00", fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >✕</button>

        {/* Header */}
        <div className="wf-header" style={{
          padding: "22px 44px 16px", textAlign: "center",
          borderBottom: `1px solid ${gold}44`,
          background: `radial-gradient(ellipse at 50% 0%, ${goldLight}66 0%, transparent 70%)`,
          position: "relative",
        }}>
          <div aria-hidden style={{
            position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)",
            fontSize: 80, lineHeight: 1, color: gold, opacity: 0.05,
            fontFamily: "serif", pointerEvents: "none", userSelect: "none",
          }}>🎡</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(17px, 2.4vw, 23px)", fontWeight: 700,
            color: "#2a1a00", margin: "0 0 5px", lineHeight: 1.25, position: "relative",
          }}>{cfg.title}</h2>
          <p style={{
            fontSize: 13, color: "#4a3728", margin: 0,
            fontFamily: "'Poppins', sans-serif", lineHeight: 1.5, position: "relative",
          }}>{cfg.subtitle}</p>
        </div>

        {/* Body grid */}
        <div className="wf-grid" style={{
          display: "grid", gridTemplateColumns: "auto 1fr",
          alignItems: "center", minHeight: 340,
        }}>

          {/* ── Wheel column ── */}
          <div className="wf-wheel-col" style={{
            padding: "28px 22px 28px 30px",
            borderRight: `1px solid ${gold}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ position: "relative", display: "inline-block" }}>

              {/* Animated glow ring */}
              <div aria-hidden style={{
                position: "absolute", inset: -20, borderRadius: "50%",
                background: `radial-gradient(circle, ${gold}30 0%, transparent 68%)`,
                pointerEvents: "none",
                animation: phase === "idle"
                  ? "wfIdleGlow 2.4s ease-in-out infinite alternate"
                  : phase === "spinning"
                  ? "wfSpinGlow 0.8s ease-in-out infinite alternate"
                  : "none",
              }} />

              {/* Pointer arrow at top */}
              <div aria-hidden style={{
                position: "absolute", top: -14, left: "50%",
                transform: "translateX(-50%)", zIndex: 10,
                filter: `drop-shadow(0 3px 7px rgba(0,0,0,0.5))`,
                animation: phase === "idle" ? "wfPointerBounce 1.8s ease-in-out infinite" : "none",
              }}>
                <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
                  <polygon points="0,0 26,0 13,22" fill={gold} />
                  <polygon points="3,1 23,1 13,17" fill={goldLight} opacity="0.55" />
                </svg>
              </div>

              {/* Outer ring */}
              <div aria-hidden style={{
                position: "absolute", inset: -4, borderRadius: "50%",
                border: `4px solid ${gold}55`,
                boxShadow: `0 0 0 2px ${goldLight}44, 0 0 24px ${gold}44`,
                pointerEvents: "none",
              }} />

              {/* Idle wobble wrapper — NEVER on wheelWrapRef, spin transform lives there */}
              <div style={{
                borderRadius: "50%",
                animation: phase === "idle" ? "wfIdleWobble 4s ease-in-out infinite" : "none",
              }}>
                {/* wheelWrapRef gets ONLY the JS spin transform — no React animation prop */}
                <div ref={wheelWrapRef} style={{
                  borderRadius: "50%",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 3px ${gold}66`,
                  willChange: "transform",
                }}>
                  <canvas ref={canvasRef} style={{ display: "block", borderRadius: "50%", width: wheelSize, height: wheelSize }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="wf-right-col" style={{ padding: "28px 30px 28px 22px" }}>

            {/* IDLE — spin button */}
            {phase === "idle" && (
              <div style={{ animation: "wfSlideIn 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                <OrnamentDivider tight />
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18, fontWeight: 700, color: "#2a1a00", margin: "0 0 8px",
                }}>Zkuste štěstí!</p>
                <p style={{
                  fontSize: 12, color: "#4a3728", margin: "0 0 20px",
                  lineHeight: 1.7, fontFamily: "'Poppins', sans-serif",
                }}>
                  Otočte kolem a zjistěte, jakou výhodu jste získali. Nic neplatíte, točíte zadarmo!
                </p>

                <button
                  onClick={handleSpin}
                  style={{
                    width: "100%", padding: "14px 16px",
                    background: `linear-gradient(135deg, ${purple} 0%, #5f2a8d 100%)`,
                    color: "#fff", border: "none", borderRadius: 999,
                    fontSize: 15, fontWeight: 800,
                    fontFamily: "'Poppins', sans-serif",
                    cursor: "pointer",
                    boxShadow: `0 6px 24px ${purple}55`,
                    letterSpacing: 0.4,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    animation: "wfBtnPulse 2.2s ease-in-out infinite",
                  }}
                >
                  {cfg.spinButtonText}
                </button>

                {/* Prize teaser */}
                <div style={{
                  marginTop: 18, padding: "11px 14px",
                  background: `linear-gradient(135deg, ${cream}, ${goldLight}55)`,
                  borderRadius: 12, border: `1px solid ${gold}44`,
                }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#5a3a00", margin: "0 0 7px", fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Co lze vyhrát
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {cfg.segments.filter(s => !s.isLoss).map(s => (
                      <span key={s.id} style={{
                        fontSize: 10, padding: "3px 9px", borderRadius: 999,
                        background: s.color + "22", border: `1px solid ${s.color}55`,
                        color: "#3d2000", fontFamily: "'Poppins', sans-serif",
                      }}>{s.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SPINNING — prázdné, kolo mluví samo za sebe */}
            {phase === "spinning" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 120 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 12, height: 12, borderRadius: "50%",
                      background: gold,
                      animation: `wfDotPulse 1.2s ${i * 0.22}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* WIN — email form */}
            {phase === "win" && winner && (
              <div style={{ animation: "wfWinIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                <OrnamentDivider tight />

                <div style={{ textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 42, animation: "wfBounce 0.7s cubic-bezier(0.34,1.56,0.64,1)" }}>🎉</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20, fontWeight: 700, color: "#2a1a00", margin: "4px 0 6px",
                  }}>{cfg.winTitle}</h3>

                  {/* Prize badge */}
                  <div style={{
                    display: "inline-block",
                    background: `linear-gradient(135deg, ${goldLight} 0%, ${cream} 100%)`,
                    border: `2px solid ${gold}`,
                    borderRadius: 14, padding: "10px 20px", margin: "0 0 4px",
                    boxShadow: `0 4px 20px ${gold}33`,
                  }}>
                    <p style={{ fontSize: 11, color: "#6b5a3a", margin: "0 0 3px", fontFamily: "'Poppins',sans-serif", textTransform: "uppercase", letterSpacing: "0.07em" }}>Vaše výhra</p>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 20, fontWeight: 700, color: "#3d2000", margin: 0,
                    }}>{winner.label}</p>
                  </div>
                </div>

                {/* Email form */}
                <p style={{ fontSize: 12, color: "#4a3728", margin: "0 0 10px", lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>
                  Zadejte e-mail a výhru vám okamžitě odešleme:
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleEmailSubmit(); }}
                    placeholder={cfg.emailPlaceholder}
                    autoFocus
                    autoComplete="email"
                    style={{
                      flex: 1, minWidth: 0,
                      padding: "11px 14px", borderRadius: 10,
                      border: `1.5px solid ${isEmailValid ? gold : gold + "55"}`,
                      background: cream, fontSize: 13,
                      fontFamily: "'Poppins', sans-serif",
                      outline: "none", color: "#2a1a00",
                      transition: "border-color 0.2s",
                    }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={!isEmailValid || sending}
                    style={{
                      padding: "11px 18px", borderRadius: 10,
                      background: isEmailValid && !sending
                        ? `linear-gradient(135deg, ${purple}, #5f2a8d)`
                        : "#d1d5db",
                      color: "#fff", border: "none",
                      fontSize: 13, fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: isEmailValid && !sending ? "pointer" : "not-allowed",
                      boxShadow: isEmailValid ? `0 4px 14px ${purple}44` : "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {sending ? "Odesílám…" : "Odeslat výhru →"}
                  </button>
                </div>
                <p style={{ fontSize: 10, color: "#9b8570", margin: "8px 0 0", fontFamily: "'Poppins', sans-serif" }}>
                  🔒 {cfg.privacyText}
                </p>
              </div>
            )}

            {/* DONE — sent confirmation */}
            {phase === "done" && winner && (
              <div style={{ textAlign: "center", animation: "wfWinIn 0.5s ease both" }}>
                <OrnamentDivider tight />
                <div style={{ fontSize: 46, margin: "6px 0 10px", animation: "wfBounce 0.6s ease" }}>✅</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 19, fontWeight: 700, color: "#2a1a00", margin: "0 0 8px",
                }}>Výhra odeslána!</h3>
                <p style={{ fontSize: 12, color: "#4a3728", lineHeight: 1.65, fontFamily: "'Poppins', sans-serif", margin: "0 0 6px" }}>
                  {cfg.winText}
                </p>
                {winner.coupon && (
                  <div style={{
                    display: "inline-block", marginBottom: 16,
                    background: `linear-gradient(135deg, ${purple}, #5f2a8d)`,
                    color: "#fff", borderRadius: 10, padding: "8px 18px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 16, fontWeight: 800, letterSpacing: "0.14em",
                    boxShadow: `0 4px 16px ${purple}44`,
                  }}>
                    {winner.coupon}
                  </div>
                )}
                <br />
                <button
                  onClick={resetAndClose}
                  style={{
                    padding: "11px 30px",
                    background: `linear-gradient(135deg, ${purple}, #5f2a8d)`,
                    color: "#fff", border: "none", borderRadius: 999,
                    fontSize: 13, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
                    cursor: "pointer", boxShadow: `0 4px 14px ${purple}44`,
                  }}
                >Zavřít</button>
              </div>
            )}

            {/* LOSS */}
            {phase === "loss" && (
              <div style={{ textAlign: "center", animation: "wfSlideIn 0.4s ease both" }}>
                <OrnamentDivider tight />

                {/* Animated stars */}
                <div style={{ fontSize: 13, letterSpacing: 6, color: gold, margin: "8px 0 10px", animation: "wfIdleGlow 2s ease-in-out infinite alternate" }}>
                  ✦ ✦ ✦
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 19, fontWeight: 700, color: "#2a1a00", margin: "0 0 8px", lineHeight: 1.3,
                }}>{cfg.lossTitle}</h3>

                <p style={{ fontSize: 12, color: "#4a3728", lineHeight: 1.75, fontFamily: "'Poppins', sans-serif", margin: "0 0 6px" }}>
                  {cfg.lossText}
                </p>

                <p style={{ fontSize: 11, color: `${gold}cc`, fontFamily: "'Playfair Display', serif", fontStyle: "italic", margin: "0 0 20px" }}>
                  Ještě jedna šance je na cestě k vám ✦
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button
                    onClick={() => {
                      if (wheelWrapRef.current) {
                        wheelWrapRef.current.style.transition = "none";
                        wheelWrapRef.current.style.transform = "rotate(0deg)";
                      }
                      setPhase("idle");
                      setWinner(null);
                    }}
                    style={{
                      padding: "13px 30px",
                      background: `linear-gradient(135deg, ${purple}, #5f2a8d)`,
                      color: "#fff", border: "none", borderRadius: 999,
                      fontSize: 14, fontWeight: 700, fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer", boxShadow: `0 4px 18px ${purple}44`,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                      animation: "wfBtnPulse 2.2s ease-in-out infinite",
                    }}
                  >
                    Točit znovu
                  </button>
                  <button
                    onClick={resetAndClose}
                    style={{
                      padding: "10px 30px",
                      background: "transparent",
                      color: "#9b8570", border: `1px solid ${gold}55`, borderRadius: 999,
                      fontSize: 12, fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                    }}
                  >Zavřít</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @keyframes wfBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes wfModalIn {
          from { opacity: 0; transform: translateY(40px) scale(0.88); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes wfSlideIn {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes wfWinIn {
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes wfBounce {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.25); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes wfIdleGlow {
          from { opacity: 0.4; transform: scale(1); }
          to   { opacity: 0.9; transform: scale(1.12); }
        }
        @keyframes wfSpinGlow {
          from { opacity: 0.6; transform: scale(1.05); }
          to   { opacity: 1;   transform: scale(1.22); }
        }
        @keyframes wfIdleWobble {
          0%,100% { transform: rotate(-1.5deg); }
          50%     { transform: rotate(1.5deg); }
        }
        @keyframes wfPointerBounce {
          0%,100% { transform: translateX(-50%) translateY(0px); }
          50%     { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes wfBtnPulse {
          0%,100% { box-shadow: 0 6px 24px ${purple}55; }
          50%     { box-shadow: 0 6px 36px ${purple}99, 0 0 0 4px ${purple}22; }
        }
        @keyframes wfDotPulse {
          0%, 100% { transform: scale(0.6); opacity: 0.4; }
          50%      { transform: scale(1.3); opacity: 1; }
        }
        /* Spark keyframes — 3 variants */
        @keyframes sparkFly0 {
          0%   { transform: translate(-50%,-50%) translate(0,0) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%,-50%) translate(var(--dx),var(--dy)) scale(0); opacity: 0; }
        }
        @keyframes sparkFly1 {
          0%   { transform: translate(-50%,-50%) translate(0,0) scale(1.4) rotate(0deg); opacity: 1; }
          100% { transform: translate(-50%,-50%) translate(var(--dx),var(--dy)) scale(0) rotate(180deg); opacity: 0; }
        }
        @keyframes sparkFly2 {
          0%   { transform: translate(-50%,-50%) translate(0,0) scale(1); opacity: 1; }
          40%  { opacity: 1; }
          100% { transform: translate(-50%,-50%) translate(var(--dx),var(--dy)) scale(0.2) rotate(-90deg); opacity: 0; }
        }
        @media (max-width: 620px) {
          .wf-grid { grid-template-columns: 1fr !important; }
          .wf-wheel-col {
            border-right: none !important;
            border-bottom: 1px solid ${gold}33 !important;
            padding: 18px 16px 12px !important;
          }
          .wf-right-col { padding: 12px 18px 20px !important; }
          /* Tighter header on mobile */
          .wf-header { padding: 16px 24px 12px !important; }
          .wf-header h2 { font-size: 17px !important; }
          .wf-header p  { font-size: 12px !important; }
          /* Smaller prize teaser on mobile */
          .wf-prize-teaser { margin-top: 12px !important; }
        }
      `}</style>
    </div>
  );
}
