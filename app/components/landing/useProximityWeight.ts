"use client";

import { useEffect, type RefObject } from "react";

const WEIGHT_MAX = 900;

/**
 * Las palabras marcadas con `data-g` dentro de `targetRef` ganan peso cuando el
 * cursor se acerca y vuelven suave a `baseRef.current` al alejarse.
 * Solo corre mientras la sección está en pantalla.
 */
export function useProximityWeight(
  rootRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  baseRef: RefObject<number>,
  deps: unknown[] = []
) {
  useEffect(() => {
    const root = rootRef.current;
    const target = targetRef.current;
    if (!root || !target) return;
    const els = Array.from(target.querySelectorAll<HTMLElement>("[data-g]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reactive = fine && !reduce;
    const cur = els.map(() => baseRef.current);
    let mx = -1e4;
    let my = -1e4;
    let raf = 0;
    let running = false;

    const tick = () => {
      const radius = Math.max(220, root.clientWidth * 0.2);
      els.forEach((el, i) => {
        const b = baseRef.current;
        let goal = b;
        if (reactive) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
          goal = b + (WEIGHT_MAX - b) * Math.max(0, 1 - d / radius);
        }
        cur[i] += (goal - cur[i]) * (reduce ? 1 : 0.12);
        el.style.fontWeight = String(Math.round(cur[i]));
      });
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -1e4;
      my = -1e4;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(root);

    return () => {
      stop();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, targetRef, baseRef, ...deps]);
}
