"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../SmoothScroll";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useNavTone } from "../landing/useNavTone";

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

export default function SvcProcess() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.servicesPage.process;
  const steps = ui.services.process;
  const n = steps.length;
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  // En desktop la sección queda fija y el scroll recorre los pasos uno por uno.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: `+=${n * 65}%`,
        pin: true,
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          setActive((prev) => (prev === i ? prev : i));
        },
      });
      stRef.current = st;
      return () => {
        st.kill();
        stRef.current = null;
      };
    });
    return () => mm.revert();
  }, [n]);

  // Clic en un paso: con la sección fija, el scroll va hasta ese paso.
  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) {
      setActive(i);
      return;
    }
    const y = st.start + ((i + 0.5) / n) * (st.end - st.start);
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = steps[active];

  return (
    <section ref={ref} className="sv-proc">
      <div ref={stageRef} className="sv-proc-stage">
        <header className="sv-proc-head">
          <span className="lx-label">{t.label}</span>
          <span className="lx-label" aria-live="polite">
            ({pad(active + 1)}/{pad(n)})
          </span>
        </header>

        <div className="sv-proc-body">
          <ol className="sv-proc-list">
            {steps.map((p, i) => (
              <li key={p.title} className={`sv-proc-item ${i === active ? "is-on" : ""}`}>
                <button type="button" onClick={() => goTo(i)} aria-current={i === active ? "step" : undefined}>
                  <span className="sv-proc-n">({pad(i + 1)})</span>
                  <span className="sv-proc-t">{p.title}</span>
                </button>
                <div className="sv-proc-inline">
                  <p>{p.desc}</p>
                  <span className="sv-proc-k">{t.deliverablesLabel}</span>
                  <ul>
                    {t.deliverables[i].map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div key={active} className="sv-proc-detail">
            <p className="sv-proc-d">{current.desc}</p>
            <span className="sv-proc-k">{t.deliverablesLabel}</span>
            <ul className="sv-proc-del">
              {t.deliverables[active].map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
