"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import NubaMark from "./NubaMark";


export default function Loader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const limeRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const black = blackRef.current;
    const lime = limeRef.current;
    const cloud = cloudRef.current;
    const progress = progressRef.current;
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


    const state = { value: 0 };
    const render = () => {
      counter.textContent = String(Math.round(state.value)).padStart(3, "0");
      // El logo se llena de abajo hacia arriba a medida que avanza la carga.
      progress.style.clipPath = `inset(${100 - state.value}% 0 0 0)`;
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
        <div ref={cloudRef} style={{ position: "relative", width: "clamp(140px, 17vw, 220px)", opacity: 0 }}>
          <NubaMark className="block h-auto w-full text-white/[0.14]" />
          <div style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 0 14px rgba(198,255,0,0.45))" }}>
            <div ref={progressRef} style={{ color: "#C6FF00", clipPath: "inset(100% 0 0 0)" }}>
              <NubaMark className="block h-auto w-full" />
            </div>
          </div>
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
            justifyContent: "flex-end",
            fontFamily: "var(--font-outfit), sans-serif",
            opacity: 0,
          }}
        >
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
