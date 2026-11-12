"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "../LocaleLink";
import { gsap } from "gsap";
import Arrow from "../Arrow";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { splitMarked } from "./marked";
import { useNavTone } from "./useNavTone";
import { useProximityWeight } from "./useProximityWeight";

type Props = {
  /** Nombre de la página en las migas. */
  crumb: string;
  /** Título con las palabras en grotesk marcadas entre asteriscos. */
  title: string;
  lead: string;
  cta: { label: string; href: string; dir?: "up-right" | "down" };
};

/** Hero de páginas internas: migas + hora, título serif/grotesk y bajada con CTA. */
export default function PageHero({ crumb, title, lead, cta }: Props) {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const baseRef = useRef<number>(300);
  const words = useMemo(() => splitMarked(title), [title]);
  const [time, setTime] = useState("");

  useNavTone(rootRef, "#0b0b0a", "#ffffff");
  useProximityWeight(rootRef, titleRef, baseRef, [words]);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Argentina/Cordoba",
      }).format(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la hora depende del cliente
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20000);
    return () => clearInterval(id);
  }, []);

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
          <span aria-current="page">{crumb}</span>
        </nav>
        <span>
          {ui.landing.contact.location} <b className="ph-clock">{time || "--:--"}</b>
        </span>
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
        <p className="sv-lead">{lead}</p>
        <Link href={cta.href} className="lx-ul sv-cta">
          {cta.label}
          <Arrow dir={cta.dir ?? "up-right"} />
        </Link>
      </div>
    </section>
  );
}
