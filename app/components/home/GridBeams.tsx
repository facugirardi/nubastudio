"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BASE_SPEED = 0.16;
const SCROLL_GAIN = 0.55;
const BASE_LEN = 0.26;
const GAP = 0.9;
const H_BASE_SPEED = 0.12;
const H_LEN = 0.28;
const H_GAP = 0.8;

export default function GridBeams() {
  const railsRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rails = railsRef.current;
    const layer = linesRef.current;
    if (!rails || !layer) return;
    const vBeams = Array.from(rails.querySelectorAll<HTMLElement>(".grid-beam-v"));

    const lines = Array.from(document.querySelectorAll<HTMLElement>("main section, footer")).filter(
      (el) => parseFloat(getComputedStyle(el).borderTopWidth) > 0,
    );
    const hBeams = lines.map(() => {
      const node = document.createElement("span");
      node.className = "grid-beam-h";
      layer.appendChild(node);
      return node;
    });

    let y = -BASE_LEN;
    let x = -H_LEN;
    let lastScroll = window.scrollY;
    let velocity = 0;
    let delay = 2.5;

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scroll = window.scrollY;
      const raw = dt > 0 ? (scroll - lastScroll) / vh / dt : 0;
      lastScroll = scroll;
      velocity += (raw - velocity) * Math.min(1, dt * 6);
      if (delay > 0) {
        delay -= dt;
        return;
      }

      const push = Math.abs(velocity);
      const boost = Math.min(push * 0.35, 0.45);
      const stretch = 1 + Math.min(push * 0.4, 0.8);

      y += (BASE_SPEED + push * SCROLL_GAIN) * dt;
      if (y > 1 + GAP) y = 0;
      const len = BASE_LEN * stretch;
      for (const b of vBeams) {
        b.style.height = `${len * vh}px`;
        b.style.transform = `translate3d(0, ${(y - len) * vh}px, 0)`;
        b.style.opacity = String(0.5 + boost);
      }

      x += (H_BASE_SPEED + push * SCROLL_GAIN * 0.6) * dt;
      if (x > 1 + H_GAP) x = 0;
      lines.forEach((el, i) => {
        const node = hBeams[i];
        const r = el.getBoundingClientRect();
        if (r.top < -2 || r.top > vh) {
          node.style.opacity = "0";
          return;
        }
        const w = Math.min(r.width, vw);
        const hLen = H_LEN * stretch * w;
        node.style.width = `${hLen}px`;
        node.style.transform = `translate3d(${r.left + x * w - hLen}px, ${r.top}px, 0)`;
        node.style.opacity = String(0.5 + boost);
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      hBeams.forEach((n) => n.remove());
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] overflow-hidden motion-reduce:hidden">
      <style>{`
        .grid-beam-v, .grid-beam-h {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          will-change: transform, opacity;
        }
        .grid-beam-v {
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(237,237,237,0.08) 50%, rgba(237,237,237,0.35) 88%, rgba(237,237,237,0.6));
        }
        .grid-beam-h {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(237,237,237,0.08) 50%, rgba(237,237,237,0.35) 88%, rgba(237,237,237,0.6));
        }
        .grid-beam-v::after, .grid-beam-h::after {
          content: "";
          position: absolute;
          background: inherit;
          filter: blur(4px);
          opacity: 0.3;
        }
        .grid-beam-v::after { inset: 0 -3px; }
        .grid-beam-h::after { inset: -3px 0; }
      `}</style>
      <div ref={railsRef} className="relative mx-auto hidden h-full max-w-[1400px] min-[1400px]:block">
        <span className="grid-beam-v" />
        <span className="grid-beam-v !left-auto right-0" />
      </div>
      <div ref={linesRef} className="absolute inset-0" />
    </div>
  );
}
