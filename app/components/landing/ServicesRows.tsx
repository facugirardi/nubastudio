"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "../LocaleLink";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "./useReveal";
import { useNavTone } from "./useNavTone";
import Arrow from "../Arrow";

const META = [
  { tags: ["Next.js", "React", "CMS", "Motion"], image: "/images/cases/mes/mes-v3-1.webp" },
  { tags: ["React Native", "Expo", "iOS", "Android"], image: "/images/cases/nuddo/nuddo-mock-1.webp" },
  { tags: ["Payments", "Dashboards", "Auth", "APIs"], image: "/images/cases/nubapay/nubapay-v2-1.webp" },
  { tags: ["Identity", "Art direction", "Systems"], image: "/images/cases/kennedys/kennedys-v2-1.webp" },
  { tags: ["Discovery", "Prototyping", "Roadmap"], image: "/images/cases/nuddo/nuddo4.webp" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Cinco paneles: el activo se ensancha y muestra el detalle del servicio. */
export default function ServicesRows() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.landing.services;
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  return (
    <section ref={ref} className="lx-sec lx-services">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
        <Link href="/services" className="lx-ul lx-head-more">
          {t.all}
          <Arrow />
        </Link>
      </header>

      <ul className="lx-panels" data-reveal>
        {ui.services.list.map((s, i) => {
          const on = i === active;
          return (
            <li
              key={s.title}
              className={`lx-panel ${on ? "is-on" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <button
                type="button"
                className="lx-panel-hit"
                aria-expanded={on}
                aria-controls={`svc-panel-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="sr-only">{s.title}</span>
              </button>

              <span className="lx-panel-n">({pad(i + 1)})</span>
              <span className="lx-panel-v" aria-hidden>
                {s.title}
              </span>

              <div id={`svc-panel-${i}`} className="lx-panel-body">
                <h3 className="lx-panel-t">{s.title}</h3>
                <p className="lx-panel-d">{s.desc}</p>
                <span className="lx-panel-tags">{META[i].tags.join(" · ")}</span>
                <span className="lx-panel-img">
                  <Image src={META[i].image} alt={s.title} fill sizes="(max-width: 899px) 100vw, 30vw" quality={90} />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
