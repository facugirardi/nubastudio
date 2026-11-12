"use client";

import { useRef } from "react";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";

export default function SvcCapabilities() {
  const { lang } = useLanguage();
  const t = getUiText(lang).servicesPage.capabilities;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  return (
    <section ref={ref} className="lx-sec sv-caps">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
      </header>

      <div className="sv-cap-grid">
        {t.groups.map((g) => (
          <div key={g.name} className="sv-cap" data-reveal>
            <span className="sv-cap-k">{g.name}</span>
            <ul>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
