"use client";

import { useRef } from "react";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { CONTACT } from "../../lib/seo";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";
import Arrow from "../Arrow";

const pad = (n: number) => String(n).padStart(2, "0");

export default function CtDirect() {
  const { lang } = useLanguage();
  const t = getUiText(lang).contact;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  const channels = [
    { name: t.channels.whatsapp, value: "+54 9 351 347 1844", href: CONTACT.whatsapp, external: true },
    { name: t.channels.phone, value: "+54 9 351 347 1844", href: `tel:${CONTACT.phone}`, external: false },
    { name: t.channels.linkedin, value: "/company/nubastudio", href: CONTACT.linkedin, external: true },
  ];

  return (
    <section ref={ref} className="lx-sec ct-direct">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.directLabel}</span>
        <h2 className="lx-h2">{t.directTitle}</h2>
      </header>

      <div className="lx-list ct-list">
        {channels.map((c, i) => (
          <a
            key={c.name}
            href={c.href}
            className="lx-row"
            data-reveal
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className="lx-row-n">({pad(i + 1)})</span>
            <span className="lx-row-t">
              {c.name}
              <Arrow className="lx-row-a" />
            </span>
            <span className="lx-row-s ct-val">{c.value}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
