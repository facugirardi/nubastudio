"use client";

import { useRef } from "react";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";

const pad = (n: number) => String(n).padStart(2, "0");

export default function AbPrinciples() {
  const { lang } = useLanguage();
  const t = getUiText(lang).about.principles;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  return (
    <section ref={ref} className="lx-sec ab-principles">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
      </header>

      <ol className="ab-pr-grid">
        {t.items.map((p, i) => (
          <li key={p.title} className="ab-pr" data-reveal>
            <span className="ab-pr-n">({pad(i + 1)})</span>
            <h3 className="ab-pr-t">{p.title}</h3>
            <p className="ab-pr-d">{p.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
