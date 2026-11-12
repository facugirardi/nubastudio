"use client";

import { useEffect, useRef, useState } from "react";
import Link from "../LocaleLink";
import { useLenis } from "../SmoothScroll";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { CONTACT } from "../../lib/seo";
import { useReveal } from "./useReveal";
import { useNavTone } from "./useNavTone";
import { useProximityWeight } from "./useProximityWeight";
import Arrow from "../Arrow";

const INDEX = [
  { key: "work", href: "/works" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const WORDMARK = "NUBA STUDIO".split("");

export default function ClosingCta() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.landing.contact;
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const wordBaseRef = useRef<number>(300);
  const [time, setTime] = useState("");
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");
  useProximityWeight(ref, wordRef, wordBaseRef);

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

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="lx-sec lx-dark lx-contact">
      <footer className="lx-foot">
        <div>
          <span className="lx-foot-k">{t.index}</span>
          {INDEX.map((item) => (
            <Link key={item.key} href={item.href} className="lx-ul">
              {ui.nav[item.key]}
            </Link>
          ))}
        </div>
        <div>
          <span className="lx-foot-k">{t.phone}</span>
          <a href={`tel:${CONTACT.phone}`} className="lx-ul">
            +54 9 351 347 1844
          </a>
        </div>
        <div>
          <span className="lx-foot-k">{t.social}</span>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="lx-ul">
            WhatsApp
            <Arrow />
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="lx-ul">
            LinkedIn
            <Arrow />
          </a>
        </div>
        <div>
          <span className="lx-foot-k">{t.location}</span>
          <span>{time || "--:--"}</span>
        </div>
        <div className="lx-foot-end">
          <span>{t.rights}</span>
          <button type="button" onClick={toTop} className="lx-ul">
            {t.top}
            <Arrow dir="up" />
          </button>
        </div>
      </footer>

      <div ref={wordRef} className="lx-word" aria-hidden>
        {WORDMARK.map((ch, i) => (
          <span key={i} data-g>
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </div>
    </section>
  );
}
