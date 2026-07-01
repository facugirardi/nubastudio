"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Grain from "./Grain";

gsap.registerPlugin(ScrollTrigger);

const TAGLINE_WORDS = ["Nuba", "Studio"];
const SUBTITLE = "Studio digital";

export default function Hero({ visible }: { visible: boolean }) {
  const scrollLabelRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!visible) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      wordsRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        scrollLabelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
  }, [visible]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Grain */}
      <Grain />

      {/* Scroll indicator — centro */}
      <div
        ref={scrollLabelRef}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}>
          scroll
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3V17M10 17L4 11M10 17L16 11"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Tagline */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1rem" }}>
        <h1
          style={{
            fontSize: "clamp(4rem, 13vw, 14rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#fff",
            display: "flex",
            gap: "0.25em",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {TAGLINE_WORDS.map((word, i) => (
            <span key={word} style={{ display: "inline-block", overflow: "hidden" }}>
              <span
                ref={(el) => { wordsRef.current[i] = el; }}
                style={{ display: "inline-block", opacity: 0 }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          style={{
            marginTop: "2rem",
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            opacity: 0,
          }}
        >
          {SUBTITLE}
        </p>
      </div>


    </section>
  );
}
