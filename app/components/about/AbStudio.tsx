"use client";

import { useRef } from "react";
import { visibleWorks } from "../../data/works";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";

export default function AbStudio() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.about.studio;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  const facts = [
    { k: t.facts.basedIn, v: t.facts.basedInValue },
    { k: t.facts.since, v: "2024" },
    { k: t.facts.shipped, v: String(visibleWorks.length).padStart(2, "0") },
    { k: t.facts.languages, v: t.facts.languagesValue },
  ];

  return (
    <section ref={ref} className="lx-sec ab-studio">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
      </header>

      <div className="ab-studio-body">
        {t.body.map((p, i) => (
          <p key={i} className={i === 0 ? "ab-p ab-p-lead" : "ab-p"} data-reveal>
            {p}
          </p>
        ))}
      </div>

      <dl className="ab-facts">
        {facts.map((f) => (
          <div key={f.k} className="ab-fact" data-reveal>
            <dt>{f.k}</dt>
            <dd>{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
