"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "../LocaleLink";
import { gsap } from "gsap";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useNavTone } from "./useNavTone";
import { useProximityWeight } from "./useProximityWeight";
import Arrow from "../Arrow";

function useClock(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la hora depende del cliente
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export default function Hero({ ready }: { ready: boolean }) {
  const { lang } = useLanguage();
  const t = getUiText(lang).landing.hero;
  const local = useClock("America/Argentina/Cordoba");
  const utc = useClock("UTC");
  const [base, setBase] = useState<300 | 700>(300);
  const baseRef = useRef<number>(300);
  const rootRef = useRef<HTMLElement>(null);
  const manRef = useRef<HTMLParagraphElement>(null);
  const introPlayed = useRef(false);

  useNavTone(rootRef, "#0b0b0a", "#ffffff");

  // "*palabra*" va en grotesca (peso variable); el resto en serif.
  const words = useMemo(
    () =>
      t.manifesto.split(" ").map((raw) => {
        const g = raw.startsWith("*") && raw.endsWith("*");
        return { text: g ? raw.slice(1, -1) : raw, g };
      }),
    [t.manifesto]
  );

  const chooseBase = (w: 300 | 700) => {
    baseRef.current = w;
    setBase(w);
  };

  // Las palabras en grotesca ganan peso cuando el cursor se acerca.
  useProximityWeight(rootRef, manRef, baseRef, [words]);

  // Al cambiar de idioma las palabras se vuelven a montar ocultas: si la entrada ya
  // corrió, entran de nuevo con la misma animación.
  useEffect(() => {
    if (!introPlayed.current) return;
    const man = manRef.current;
    if (!man) return;
    const els = man.querySelectorAll("[data-word]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(els, { opacity: 0, y: "0.35em" }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.035 });
  }, [words]);

  // Entrada: una sola vez, cuando el loader terminó.
  useEffect(() => {
    if (!ready || introPlayed.current) return;
    const root = rootRef.current;
    if (!root) return;
    introPlayed.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap
      .timeline()
      .to(root.querySelectorAll("[data-hero-in]"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 })
      .to(
        root.querySelectorAll("[data-word]"),
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.045 },
        0.1
      );
  }, [ready]);

  return (
    <section ref={rootRef} className="ln-hero">
      <div className="hx-meta" data-hero-in>
        <span>{t.since}</span>
        <span className="hx-clocks">
          <span>
            Córdoba <b>{local || "--:--"}</b>
          </span>
          <span>
            UTC <b>{utc || "--:--"}</b>
          </span>
        </span>
      </div>

      <h1 ref={manRef} className="hx-man">
        {words.map((w, i) => (
          <span key={`${w.text}-${i}`}>
            <span
              className={`hx-w ${w.g ? "hx-g" : "hx-s"}`}
              data-word
              {...(w.g ? { "data-g": "" } : {})}
            >
              {i === 0 && <i className="hx-dot" aria-hidden />}
              {w.text}
            </span>{" "}
          </span>
        ))}
      </h1>

      <div className="hx-foot" data-hero-in>
        <span>{t.discipline}</span>
        <span className="hx-toggle" role="group" aria-label="Fine / Bold">
          <button type="button" aria-pressed={base === 300} onClick={() => chooseBase(300)}>
            {t.fine}
          </button>
          <span aria-hidden>/</span>
          <button type="button" aria-pressed={base === 700} onClick={() => chooseBase(700)}>
            {t.bold}
          </button>
        </span>
        <Link href="/contact" className="hx-cta">
          {t.cta}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
