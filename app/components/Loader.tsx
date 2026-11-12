"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "../lib/i18n";
import { getUiText } from "../lib/uiText";

const PAPER = "#ffffff";
const INK = "#0b0b0a";
const LIME = "#c6ff00";
const RULE = "rgba(11, 11, 10, 0.18)";
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
const MONO_STYLE = {
  fontFamily: MONO,
  fontSize: "0.72rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const PATH_D =
  "M3.00897 14.3017C2.20703 13.3954 1.62112 12.3191 1.29535 11.1537C0.969576 9.98825 0.912436 8.7641 1.12823 7.5734C1.34402 6.3827 1.82712 5.25646 2.54115 4.27948C3.25519 3.3025 4.18156 2.50023 5.25052 1.93308C6.31948 1.36592 7.50317 1.04866 8.71249 1.00517C9.92181 0.961679 11.1252 1.1931 12.2322 1.68201C13.3391 2.17091 14.3207 2.90456 15.1031 3.82773C15.8855 4.7509 16.4482 5.83952 16.749 7.01165H18.009C19.0718 7.01082 20.1072 7.34868 20.965 7.97621C21.8228 8.60374 22.4584 9.48828 22.7794 10.5015C23.1004 11.5147 23.0902 12.6038 22.7503 13.6108C22.4103 14.6178 21.7689 15.5213 20.889 16.1017C20.009 16.682 13.009 16.5117 13.009 16.5117";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const { lang } = useLanguage();
  const hero = getUiText(lang).landing.hero;
  const rootRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const limeRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const paper = paperRef.current;
    const lime = limeRef.current;
    const cloud = cloudRef.current;
    const progress = progressPathRef.current;
    const counter = counterRef.current;
    const footer = footerRef.current;
    const meta = metaRef.current;
    if (!root || !paper || !lime || !cloud || !progress || !counter || !footer || !meta) return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      root.style.display = "none";
      document.documentElement.style.overflow = "";
      onComplete();
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const L = progress.getTotalLength();
    gsap.set(progress, { strokeDasharray: L, strokeDashoffset: L });

    const state = { value: 0 };
    const render = () => {
      counter.textContent = String(Math.round(state.value)).padStart(3, "0");
      gsap.set(progress, { strokeDashoffset: L * (1 - state.value / 100) });
    };
    render();

    const tl = gsap.timeline({ onComplete: finish });

    // Entrada: aparecen la nube y las barras superior e inferior.
    tl.fromTo(
        [meta, footer],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.06 },
        0.2
      )
      .fromTo(
        cloud,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.15
      );

    // Progreso en ráfagas, como carga real.
    tl.to(state, { value: 28, duration: 0.55, ease: "power2.out", onUpdate: render }, 0.45)
      .to(state, { value: 47, duration: 0.35, ease: "power1.inOut", onUpdate: render }, "+=0.18")
      .to(state, { value: 76, duration: 0.55, ease: "power2.inOut", onUpdate: render }, "+=0.22")
      .to(state, { value: 100, duration: 0.65, ease: "power3.inOut", onUpdate: render }, "+=0.15");

    // Al 100%: pulso de la nube, salen las barras y suben las cortinas.
    tl.to(cloud, { scale: 1.06, duration: 0.35, ease: "power2.out" }, "+=0.1")
      .to([meta, footer], { y: -12, opacity: 0, duration: 0.45, ease: "power2.in" }, "<")
      .to(paper, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.05")
      .to(lime, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.85");

    // La coreografía dura ~4.4s a velocidad 1; el H1 del hero no pinta hasta
    // que termina, así que eso era el LCP. A 2x queda en ~2.2s.
    tl.timeScale(2);

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div ref={limeRef} style={{ position: "absolute", inset: 0, background: LIME }} />
      <div
        ref={paperRef}
        style={{
          position: "absolute",
          inset: 0,
          background: PAPER,
          color: INK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={metaRef}
          style={{
            ...MONO_STYLE,
            position: "absolute",
            top: 96,
            left: "clamp(20px, 3vw, 40px)",
            right: "clamp(20px, 3vw, 40px)",
            paddingBottom: "0.9rem",
            borderBottom: `1px solid ${RULE}`,
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            color: "rgba(11, 11, 10, 0.6)",
            opacity: 0,
          }}
        >
          <span>{hero.index}</span>
          <span>{hero.discipline}</span>
        </div>

        <div ref={cloudRef} style={{ width: "clamp(200px, 26vw, 320px)", opacity: 0 }}>
          <svg
            viewBox="0 0 25 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
          >
            <path
              d={PATH_D}
              stroke={RULE}
              strokeWidth={0.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={progressPathRef}
              d={PATH_D}
              stroke={INK}
              strokeWidth={0.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          ref={footerRef}
          style={{
            position: "absolute",
            left: "clamp(20px, 3vw, 40px)",
            right: "clamp(20px, 3vw, 40px)",
            bottom: "clamp(20px, 3vw, 36px)",
            paddingTop: "1rem",
            borderTop: `1px solid ${RULE}`,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            opacity: 0,
          }}
        >
          <span style={{ ...MONO_STYLE, display: "inline-flex", alignItems: "center", gap: "0.6em" }}>
            <i
              style={{
                display: "inline-block",
                width: "0.7em",
                height: "0.7em",
                borderRadius: "50%",
                background: INK,
              }}
            />
            {lang === "es" ? "Cargando" : "Loading"}
          </span>
          <span
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(64px, 11vw, 150px)",
              fontWeight: 300,
              lineHeight: 0.85,
              letterSpacing: "-0.045em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span ref={counterRef}>000</span>
            <span style={{ fontSize: "0.28em", verticalAlign: "super", letterSpacing: 0 }}>%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
