"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";

const TEAM = [
  { name: "Alejo Vaquero", role: "Design", photo: "/images/alejo.webp" },
  { name: "Facundo Girardi", role: "Development", photo: "/images/facu.webp" },
  { name: "Ángel Vaquero", role: "Strategy", photo: "/images/angelito.webp" },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

export default function AbTeam() {
  const { lang } = useLanguage();
  const t = getUiText(lang).about.team;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  return (
    <section ref={ref} className="lx-sec ab-team">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
        <span className="lx-label ab-team-count">({pad(TEAM.length)})</span>
      </header>

      <ul className="ab-team-grid">
        {TEAM.map((m, i) => (
          <li key={m.name} className="ab-member" data-reveal>
            <span className="ab-member-img">
              <Image src={m.photo} alt={m.name} fill sizes="(max-width: 899px) 90vw, 24vw" />
            </span>
            <span className="ab-member-cap">
              <span className="ab-member-n">({pad(i + 1)})</span>
              <span className="ab-member-name">{m.name}</span>
              <span className="ab-member-role">{t.roles[m.role]}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
