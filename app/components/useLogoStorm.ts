"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { stripLocale } from "../lib/lang";
import { getLenis } from "./SmoothScroll";

const STREAK_MS = 800;
const ANGRY_AT = 5;
const THUNDER_AT = 7;

/**
 * En la home el logo no recarga la página: sube al principio. Si lo tocan muchas veces
 * seguidas, la nube se enoja (tiembla, se oscurece, tira rayos) y a la séptima truena.
 */
export function useLogoStorm() {
  const markRef = useRef<HTMLSpanElement>(null);
  const boltRef = useRef<SVGSVGElement>(null);
  const count = useRef(0);
  const last = useRef(0);
  const calm = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (calm.current) clearTimeout(calm.current);
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (stripLocale(window.location.pathname) !== "/") return;
    e.preventDefault();

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });

    const mark = markRef.current;
    const bolt = boltRef.current;
    if (!mark || !bolt || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const now = performance.now();
    count.current = now - last.current < STREAK_MS ? count.current + 1 : 1;
    last.current = now;
    const n = count.current;

    const reset = () => {
      count.current = 0;
      gsap.to(mark, { color: "#EDEDED", duration: 0.8, ease: "power2.out" });
    };
    if (calm.current) clearTimeout(calm.current);
    calm.current = setTimeout(reset, 2500);

    if (n < ANGRY_AT) {
      gsap.fromTo(mark, { y: 0 }, { y: -3, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", overwrite: "auto" });
      return;
    }

    const strike = () =>
      gsap.fromTo(
        bolt,
        { opacity: 1, scaleY: 0.2 },
        { scaleY: 1, duration: 0.12, ease: "power4.out", onComplete: () => void gsap.to(bolt, { opacity: 0, duration: 0.35, delay: 0.1 }) }
      );

    gsap.to(mark, { color: "#5a5a5a", duration: 0.25 });
    gsap.fromTo(
      mark,
      { x: 0 },
      { x: n >= THUNDER_AT ? 3 : 2, duration: 0.04, repeat: n >= THUNDER_AT ? 11 : 7, yoyo: true, ease: "none", onComplete: () => void gsap.set(mark, { x: 0 }) }
    );
    strike();

    if (n >= THUNDER_AT) {
      const flash = document.createElement("div");
      flash.setAttribute("aria-hidden", "true");
      flash.style.cssText = "position:fixed;inset:0;background:#fff;pointer-events:none;z-index:160;opacity:0";
      document.body.appendChild(flash);
      flash
        .animate([{ opacity: 0 }, { opacity: 0.22 }, { opacity: 0.04 }, { opacity: 0.16 }, { opacity: 0 }], {
          duration: 700,
          easing: "ease-out",
        })
        .finished.finally(() => flash.remove());
      if (calm.current) clearTimeout(calm.current);
      calm.current = setTimeout(reset, 900);
    }
  };

  return { markRef, boltRef, onClick };
}
