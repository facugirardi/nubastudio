"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "../../data/works";
import { FOUNDED } from "../../lib/seo";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import SectionHeading from "./SectionHeading";
import { useReveal } from "./useReveal";

gsap.registerPlugin(ScrollTrigger);

export default function HomeProcess({ index = "03" }: { index?: string }) {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.home;
  const ref = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  useReveal(ref);

  const steps = ui.services.process;

  useEffect(() => {
    const list = stepsRef.current;
    const fill = fillRef.current;
    const count = countRef.current;
    if (!list || !fill || !count) return;

    const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", list);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => (n.dataset.on = "true"));
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (c) => {
        const axis = c.conditions?.desktop ? "scaleX" : "scaleY";
        gsap.fromTo(
          fill,
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.6,
              onUpdate: (self) => {
                nodes.forEach((n, i) => {
                  n.dataset.on = String(self.progress >= i / nodes.length + 0.01);
                });
              },
            },
          }
        );
      });

      count.textContent = "00";
      const state = { v: 0 };
      gsap.to(state, {
        v: works.length,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: count, start: "top 90%", once: true },
        onUpdate: () => {
          count.textContent = String(Math.round(state.v)).padStart(2, "0");
        },
      });
    }, list.parentElement ?? list);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: ui.about.since, value: FOUNDED },
    { label: ui.about.projectsShipped, value: String(works.length).padStart(2, "0"), counter: true },
    { label: ui.about.basedIn, value: "Córdoba, AR" },
  ];

  return (
    <section ref={ref} className="relative border-t border-white/[0.07] bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <SectionHeading index={index} label={t.processLabel} heading={t.processHeading}>
          <p className="max-w-[40ch] text-[16px] leading-[1.6] text-white/55">{ui.about.sub}</p>
        </SectionHeading>

        <div className="relative border-t border-white/[0.07]">
          <ol ref={stepsRef} className="relative grid grid-cols-1 lg:grid-cols-4">
            <span aria-hidden className="pointer-events-none absolute bottom-0 left-[27px] top-0 w-px bg-white/[0.08] sm:left-[35px] lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[52px] lg:h-px lg:w-auto" />
            <span
              ref={fillRef}
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-[27px] top-0 w-px origin-top bg-gradient-to-b from-[#C6FF00]/0 via-[#C6FF00]/70 to-[#C6FF00] sm:left-[35px] lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[52px] lg:h-px lg:w-auto lg:origin-left lg:bg-gradient-to-r"
            />
            {steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                className="relative py-10 pl-14 pr-5 sm:pl-[72px] sm:pr-8 lg:border-l lg:border-white/[0.07] lg:px-10 lg:pb-14 lg:pt-[88px] lg:first:border-l-0"
              >
                <span
                  data-node
                  data-on="false"
                  aria-hidden
                  className="absolute left-[23px] top-[46px] h-[9px] w-[9px] rounded-full border border-white/25 bg-black transition-[background-color,border-color,box-shadow] duration-300 data-[on=true]:border-[#C6FF00] data-[on=true]:bg-[#C6FF00] data-[on=true]:shadow-[0_0_14px_rgba(198,255,0,0.6)] sm:left-[31px] lg:left-10 lg:top-[48px]"
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">0{i + 1}</p>
                <h3 className="mt-3 text-[22px] font-medium tracking-[-0.03em] text-[#EDEDED]">{step.title}</h3>
                <p className="mt-2 max-w-[32ch] text-[15px] leading-[1.55] text-white/50">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <dl className="grid grid-cols-1 gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} data-reveal className="flex flex-col gap-3 bg-black px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">{stat.label}</dt>
              <dd className="text-[clamp(2.5rem,4.5vw,4rem)] font-[450] leading-none tracking-[-0.05em] text-[#EDEDED] tabular-nums">
                {stat.counter ? <span ref={countRef}>{stat.value}</span> : stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
