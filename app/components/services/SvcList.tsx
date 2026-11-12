"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "../LocaleLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getWork } from "../../data/works";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";

gsap.registerPlugin(ScrollTrigger);

const META = [
  { tags: ["Next.js", "React", "CMS", "Motion"], cases: ["checkrto", "mes", "provia-consulting"], image: "/images/cases/checkrto/check1.webp" },
  { tags: ["React Native", "Expo", "iOS", "Android"], cases: ["nuddo", "ushuaia360"], image: "/images/cases/nuddo/nuddo1.webp" },
  { tags: ["Payments", "Dashboards", "Auth", "APIs"], cases: ["nubapay", "nuddo"], image: "/images/cases/nubapay/nuba1.webp" },
  { tags: ["Identity", "Art direction", "Systems"], cases: [] as string[], image: "/images/cases/kennedys/ken1.webp" },
  { tags: ["Discovery", "Prototyping", "Roadmap"], cases: ["nubapay"], image: "/images/cases/nuddo/nuddo4.webp" },
];

export default function SvcList() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.servicesPage.list;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  // Cada imagen se descubre de abajo hacia arriba al entrar en pantalla.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>(".sv-item-img").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="lx-sec sv-list">
      <header className="lx-head" data-reveal>
        <span className="lx-label">{t.label}</span>
        <h2 className="lx-h2">{t.title}</h2>
      </header>

      <ol className="sv-items">
        {ui.services.list.map((s, i) => {
          const meta = META[i];
          const cases = meta.cases.map((slug) => getWork(slug)).filter(Boolean);
          return (
            <li key={s.title} className="sv-item" data-reveal>
              <span className="sv-item-n">({String(i + 1).padStart(2, "0")})</span>
              <h3 className="sv-item-t">{s.title}</h3>
              <span className="sv-item-img">
                <Image src={meta.image} alt={s.title} fill sizes="(max-width: 899px) 100vw, 28vw" quality={90} />
              </span>
              <p className="sv-item-d">{s.desc}</p>
              <span className="sv-item-tags">{meta.tags.join(" · ")}</span>
              {cases.length > 0 && (
                <p className="sv-item-cases">
                  <span className="sv-item-k">{t.cases}</span>
                  {cases.map((w, j) => (
                    <Fragment key={w!.slug}>
                      {j > 0 && <span aria-hidden> · </span>}
                      <Link href={`/cases/${w!.slug}`} className="lx-ul">
                        {w!.title}
                      </Link>
                    </Fragment>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
