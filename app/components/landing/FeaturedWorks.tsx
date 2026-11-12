"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "../LocaleLink";
import { gsap } from "gsap";
import { visibleWorks } from "../../data/works";
import { localizeWork } from "../../lib/localizeWork";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "./useReveal";
import { useNavTone } from "./useNavTone";
import Arrow from "../Arrow";

const pad = (n: number) => String(n).padStart(2, "0");

export default function FeaturedWorks() {
  const { lang } = useLanguage();
  const t = getUiText(lang).landing.works;
  const works = useMemo(() => visibleWorks.slice(0, 6).map((w) => localizeWork(w, lang)), [lang]);
  const featured = works.slice(0, 2);
  const rest = works.slice(2);
  const [active, setActive] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fineRef = useRef(false);

  useReveal(rootRef);
  useNavTone(rootRef, "#0b0b0a", "#ffffff");

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    fineRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fineRef.current) return;
    gsap.set(preview, { autoAlpha: 0 });
    const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX + 28);
      yTo(e.clientY - preview.offsetHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const show = (i: number) => {
    if (!fineRef.current) return;
    setActive(i);
    gsap.to(previewRef.current, { autoAlpha: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
  };
  const hide = () => {
    if (!fineRef.current) return;
    setActive(null);
    gsap.to(previewRef.current, { autoAlpha: 0, duration: 0.25, ease: "power2.in", overwrite: "auto" });
  };

  return (
    <section ref={rootRef} id="work" className="lx-sec lx-works">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <Link href="/works" className="lx-ul lx-head-more">
          {t.all} ({pad(visibleWorks.length)})
          <Arrow />
        </Link>
      </header>

      <div className="lx-feat">
        {featured.map((w, i) => (
          <Link key={w.slug} href={`/cases/${w.slug}`} className="lx-card" data-reveal aria-label={`${t.view}: ${w.title}`}>
            <span className="lx-card-img">
              <Image src={w.image} alt={`${w.title} — ${w.subtitle}`} fill sizes={i === 0 ? "(max-width: 899px) 100vw, 64vw" : "(max-width: 899px) 100vw, 34vw"} quality={90} />
            </span>
            <span className="lx-cap">
              <span className="lx-cap-n">({pad(i + 1)})</span>
              <span className="lx-cap-t">{w.title}</span>
              <span className="lx-cap-s">{w.subtitle}</span>
              <span className="lx-cap-y">{w.year}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="lx-list" onMouseLeave={hide}>
        {rest.map((w, i) => (
          <Link
            key={w.slug}
            href={`/cases/${w.slug}`}
            className="lx-row"
            data-reveal
            onMouseEnter={() => show(i)}
            onFocus={() => show(i)}
            onBlur={hide}
            aria-label={`${t.view}: ${w.title}`}
          >
            <span className="lx-row-n">({pad(i + 3)})</span>
            <span className="lx-row-t">
              {w.title}
              <Arrow className="lx-row-a" />
            </span>
            <span className="lx-row-s">{w.subtitle}</span>
            <span className="lx-row-y">{w.year}</span>
          </Link>
        ))}
      </div>

      <div ref={previewRef} className="lx-preview" aria-hidden>
        {rest.map((w, i) => (
          <div key={w.slug} className={`lx-preview-img ${active === i ? "is-on" : ""}`}>
            <Image src={w.image} alt="" fill sizes="320px" quality={90} />
          </div>
        ))}
      </div>
    </section>
  );
}
