"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterPaint } from "../../lib/afterPaint";

gsap.registerPlugin(ScrollTrigger);

/** `belowFold`: la sección arranca fuera de la primera pantalla, así que el setup espera al primer pintado (afterPaint). */
export function useReveal(ref: RefObject<HTMLElement | null>, { belowFold = false } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {}, root);
    const setup = () => ctx.add(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      gsap.set(items, { opacity: 0, y: 24, filter: "blur(6px)" });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.07,
            ease: "expo.out",
            clearProps: "filter",
          }),
      });
    });

    if (!belowFold) {
      setup();
      return () => ctx.revert();
    }
    const cancel = afterPaint(setup);
    return () => {
      cancel();
      ctx.revert();
    };
  }, [ref, belowFold]);
}
