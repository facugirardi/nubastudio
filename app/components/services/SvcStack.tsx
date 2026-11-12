"use client";

import { useRef } from "react";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";

export default function SvcStack() {
  const { lang } = useLanguage();
  const t = getUiText(lang).servicesPage.stack;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  return (
    <section ref={ref} className="lx-sec sv-stack">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
      </header>
      <p className="sv-stack-note" data-reveal>
        {t.note}
      </p>
      <dl className="sv-stack-grid">
        {t.groups.map((g) => (
          <div key={g.name} className="sv-stack-g" data-reveal>
            <dt>{g.name}</dt>
            {g.items.map((item) => (
              <dd key={item}>{item}</dd>
            ))}
          </div>
        ))}
      </dl>
    </section>
  );
}
