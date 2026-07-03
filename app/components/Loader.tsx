"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PATH_D =
  "M3.00897 14.3017C2.20703 13.3954 1.62112 12.3191 1.29535 11.1537C0.969576 9.98825 0.912436 8.7641 1.12823 7.5734C1.34402 6.3827 1.82712 5.25646 2.54115 4.27948C3.25519 3.3025 4.18156 2.50023 5.25052 1.93308C6.31948 1.36592 7.50317 1.04866 8.71249 1.00517C9.92181 0.961679 11.1252 1.1931 12.2322 1.68201C13.3391 2.17091 14.3207 2.90456 15.1031 3.82773C15.8855 4.7509 16.4482 5.83952 16.749 7.01165H18.009C19.0718 7.01082 20.1072 7.34868 20.965 7.97621C21.8228 8.60374 22.4584 9.48828 22.7794 10.5015C23.1004 11.5147 23.0902 12.6038 22.7503 13.6108C22.4103 14.6178 21.7689 15.5213 20.889 16.1017C20.009 16.682 13.009 16.5117 13.009 16.5117";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const limeRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const black = blackRef.current;
    const lime = limeRef.current;
    const cloud = cloudRef.current;
    const progress = progressPathRef.current;
    const counter = counterRef.current;
    const footer = footerRef.current;
    if (!root || !black || !lime || !cloud || !progress || !counter || !footer) return;

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

    // Entrada: aparecen el contenedor de la nube y el footer.
    tl.fromTo(
        footer,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.25
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

    // Al 100%: pulso de la nube, sale el footer y suben las cortinas.
    tl.to(cloud, { scale: 1.06, duration: 0.35, ease: "power2.out" }, "+=0.1")
      .to(footer, { yPercent: 120, opacity: 0, duration: 0.45, ease: "power2.in" }, "<")
      .to(black, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.05")
      .to(lime, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.85");

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
      <div ref={limeRef} style={{ position: "absolute", inset: 0, background: "#C6FF00" }} />
      <div
        ref={blackRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div ref={cloudRef} style={{ width: "clamp(200px, 28vw, 340px)", opacity: 0 }}>
          <svg
            viewBox="0 0 25 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
          >
            <path
              ref={progressPathRef}
              d={PATH_D}
              stroke="#C6FF00"
              strokeWidth={0.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 14px rgba(198,255,0,0.45))" }}
            />
          </svg>
        </div>

        <div
          ref={footerRef}
          style={{
            position: "absolute",
            left: "clamp(20px, 4vw, 56px)",
            right: "clamp(20px, 4vw, 56px)",
            bottom: "clamp(20px, 4vw, 48px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            fontFamily: "var(--font-outfit), sans-serif",
            opacity: 0,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 12,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Nuba Studio
          </span>
          <span
            style={{
              color: "#fff",
              fontSize: "clamp(64px, 11vw, 130px)",
              fontWeight: 500,
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span ref={counterRef}>000</span>
            <span style={{ fontSize: "0.28em", color: "#C6FF00", verticalAlign: "super" }}>%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
