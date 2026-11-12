"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Secciones activas detrás del navbar. Con varias seguidas, gana la última que entró;
// sin ninguna activa, el logo vuelve a su color por defecto.
const active = new Map<symbol, { fg: string; bg: string }>();

function apply() {
  const root = document.documentElement;
  const tones = Array.from(active.values());
  const last = tones[tones.length - 1];
  if (last) {
    root.style.setProperty("--nav-fg", last.fg);
    root.style.setProperty("--nav-bg", last.bg);
  } else {
    root.style.removeProperty("--nav-fg");
    root.style.removeProperty("--nav-bg");
  }
}

/**
 * Mientras la sección pasa por detrás del navbar, el nav toma su texto (`fg`) y su
 * fondo (`bg`), así el contenido que scrollea por debajo no se mezcla con el logo.
 */
export function useNavTone(ref: RefObject<HTMLElement | null>, fg: string, bg: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = Symbol("nav-tone");
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 44px",
      end: "bottom 44px",
      onToggle: (self) => {
        if (self.isActive) active.set(id, { fg, bg });
        else active.delete(id);
        apply();
      },
    });
    return () => {
      st.kill();
      active.delete(id);
      apply();
    };
  }, [ref, fg, bg]);
}
