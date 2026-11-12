"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "../LocaleLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { visibleWorks } from "../../data/works";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useNavTone } from "../landing/useNavTone";

gsap.registerPlugin(ScrollTrigger);

const RATIOS = ["4 / 3", "3 / 4", "16 / 10", "1 / 1", "4 / 3", "3 / 4", "16 / 10"];
const pad = (n: number) => String(n).padStart(2, "0");

/** Tira de trabajos que se desliza en horizontal mientras se scrollea. */
export default function AbStrip() {
  const { lang } = useLanguage();
  const t = getUiText(lang).about.strip;
  const items = useMemo(() => visibleWorks.slice(0, RATIOS.length), []);
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  useEffect(() => {
    const root = ref.current;
    const track = trackRef.current;
    if (!root || !track) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -(track.scrollWidth - root.clientWidth),
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="ab-strip" aria-label={t.label}>
      <ul ref={trackRef} className="ab-strip-track">
        {items.map((w, i) => (
          <li key={w.slug} style={{ aspectRatio: RATIOS[i] }}>
            <Link href={`/cases/${w.slug}`} className="ab-strip-item">
              <span className="ab-strip-img">
                <Image src={w.image} alt={w.title} fill sizes="(max-width: 899px) 70vw, 34vw" />
              </span>
              <span className="ab-strip-cap">
                <span>({pad(i + 1)})</span>
                <span>{w.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
