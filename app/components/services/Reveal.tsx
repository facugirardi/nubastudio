"use client";

import { useRef } from "react";
import { useReveal } from "../home/useReveal";

/** Anima la entrada de los [data-reveal] de adentro (el contenido sale igual en el HTML del servidor). */
export default function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
