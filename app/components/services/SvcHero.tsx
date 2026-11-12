"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "../LocaleLink";
import { gsap } from "gsap";
import Arrow from "../Arrow";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { splitMarked } from "../landing/marked";
import { useNavTone } from "../landing/useNavTone";
import { useProximityWeight } from "../landing/useProximityWeight";

export default function SvcHero() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.servicesPage.hero;
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const baseRef = useRef<number>(300);
  const words = useMemo(() => splitMarked(t.title), [t.title]);

  useNavTone(rootRef, "#0b0b0a", "#ffffff");
  useProximityWeight(rootRef, titleRef, baseRef, [words]);

  // Entrada: las palabras suben una por una (también al cambiar de idioma).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-word]");
    const meta = root.querySelectorAll("[data-sv-in]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([...els, ...meta], { opacity: 1, y: 0 });
      return;
    }
    gsap
      .timeline({ delay: 0.25 })
      .fromTo(meta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
      .fromTo(els, { opacity: 0, y: "0.35em" }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.04 }, 0.1);
  }, [words]);

  return (
    <section ref={rootRef} className="sv-hero">
      <div className="sv-hero-top" data-sv-in>
        <nav aria-label="Breadcrumb" className="sv-crumbs">
          <Link href="/" className="lx-ul">
            {ui.caseStudy.home}
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{ui.nav.services}</span>
        </nav>
      </div>

      <h1 ref={titleRef} className="sv-h1">
        {words.map((w, i) => (
          <span key={`${w.text}-${i}`}>
            <span className={`sv-w ${w.marked ? "lx-g" : "lx-serif"}`} data-word {...(w.marked ? { "data-g": "" } : {})}>
              {w.text}
            </span>{" "}
          </span>
        ))}
      </h1>

      <div className="sv-hero-foot" data-sv-in>
        <p className="sv-lead">{ui.services.intro}</p>
        <Link href="/contact" className="lx-ul sv-cta">
          {t.cta}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
