"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Única gramática de reveal de la landing: todo lo marcado con `data-reveal`
 * sube y aparece en cascada al entrar en viewport.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!els.length) return;
      gsap.set(els, { y: 28, opacity: 0 });
      ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
      });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
