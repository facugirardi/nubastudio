"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    gsap.to(el, {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        el.style.display = "none";
        onComplete();
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
