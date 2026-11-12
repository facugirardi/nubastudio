"use client";

import { useMemo, useRef } from "react";
import Link from "../LocaleLink";
import { visibleWorks } from "../../data/works";
import { localizeWork } from "../../lib/localizeWork";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";
import Arrow from "../Arrow";

/** Proyectos agrupados por año, del más reciente al más viejo. */
export default function AbRecord() {
  const { lang } = useLanguage();
  const t = getUiText(lang).about.record;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, [lang]);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  const years = useMemo(() => {
    const map = new Map<string, ReturnType<typeof localizeWork>[]>();
    visibleWorks.forEach((w) => {
      const y = w.year ?? "—";
      map.set(y, [...(map.get(y) ?? []), localizeWork(w, lang)]);
    });
    return [...map.entries()].sort(([a], [b]) => b.localeCompare(a));
  }, [lang]);

  return (
    <section ref={ref} className="lx-sec ab-record">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
      </header>

      {years.map(([year, list]) => (
        <div key={year} className="ab-yr">
          <div className="ab-yr-head" data-reveal>
            <span className="ab-yr-y lx-serif">{year}</span>
            <span className="lx-label">({String(list.length).padStart(2, "0")})</span>
          </div>
          <ul className="ab-yr-list">
            {list.map((w) => (
              <li key={w.slug} data-reveal>
                <Link href={`/cases/${w.slug}`} className="ab-yr-row" aria-label={`${t.view}: ${w.title}`}>
                  <span className="ab-yr-t">{w.title}</span>
                  <span className="ab-yr-s">{w.subtitle}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
