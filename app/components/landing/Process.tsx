"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "./useReveal";
import { useNavTone } from "./useNavTone";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.landing.process;
  const ref = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  // La regla de cada paso se dibuja de izquierda a derecha, en orden.
  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps) return;
    const rules = steps.querySelectorAll(".lx-step-rule");
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        rules,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          stagger: 0.18,
          scrollTrigger: { trigger: steps, start: "top 80%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="lx-sec lx-process">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
      </header>

      <ol ref={stepsRef} className="lx-steps">
        {ui.services.process.map((p, i) => (
          <li key={p.title} className="lx-step" data-reveal>
            <i className="lx-step-rule" aria-hidden />
            <span className="lx-step-n">({String(i + 1).padStart(2, "0")})</span>
            <h3 className="lx-step-t">{p.title}</h3>
            <p className="lx-step-d">{p.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
