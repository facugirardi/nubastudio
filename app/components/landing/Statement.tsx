"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "../LocaleLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { splitMarked } from "./marked";
import { useNavTone } from "./useNavTone";
import Arrow from "../Arrow";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const { lang } = useLanguage();
  const t = getUiText(lang).landing.studio;
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => splitMarked(t.text), [t.text]);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  // Cada palabra pasa de gris a tinta a medida que la sección avanza.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        root.querySelectorAll(".lx-sw"),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: root.querySelector(".lx-st"), start: "top 78%", end: "bottom 55%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, [words]);

  return (
    <section ref={ref} className="lx-sec lx-studio">
      <span className="lx-label">{t.label}</span>
      <div className="lx-studio-body">
        <p className="lx-st" aria-label={t.text.replaceAll("*", "")}>
          {words.map((w, i) => (
            <span key={`${w.text}-${i}`} aria-hidden>
              <span className={`lx-sw ${w.marked ? "lx-serif" : ""}`}>{w.text}</span>{" "}
            </span>
          ))}
        </p>
        <Link href="/about" className="lx-ul">
          {t.link}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
