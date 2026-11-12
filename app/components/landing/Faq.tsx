"use client";

import { useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "./useReveal";
import { useNavTone } from "./useNavTone";

type Props = {
  label: string;
  title: string;
  navBg?: string;
  /** Preguntas a mostrar; por defecto, las generales del sitio. */
  items?: { question: string; answer: string }[];
};

export default function Faq({ label, title, navBg = "#ffffff", items }: Props) {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const ref = useRef<HTMLElement>(null);
  const uid = useId();
  const [open, setOpen] = useState<number | null>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", navBg);

  const toggle = (i: number) => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bodies = root.querySelectorAll<HTMLElement>(".lx-faq-a");
    const next = open === i ? null : i;
    bodies.forEach((el, j) => {
      const show = j === next;
      gsap.to(el, {
        height: show ? "auto" : 0,
        opacity: show ? 1 : 0,
        duration: reduce ? 0 : show ? 0.55 : 0.35,
        ease: show ? "power3.out" : "power2.inOut",
        overwrite: true,
      });
    });
    setOpen(next);
  };

  return (
    <section ref={ref} className="lx-sec lx-faq">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{label}</span>
        <h2 className="lx-h2">{title}</h2>
      </header>
      <ul className="lx-faq-list">
        {(items ?? ui.faq).map((f, i) => {
          const isOpen = open === i;
          const id = `${uid}-faq-${i}`;
          return (
            <li key={f.question} className={`lx-faq-item ${isOpen ? "is-open" : ""}`} data-reveal>
              <button
                type="button"
                className="lx-faq-q"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => toggle(i)}
              >
                <span className="lx-faq-n">({String(i + 1).padStart(2, "0")})</span>
                <span className="lx-faq-t">{f.question}</span>
                <i className="lx-faq-icon" aria-hidden />
              </button>
              <div id={id} className="lx-faq-a" role="region" aria-label={f.question}>
                <p>{f.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
