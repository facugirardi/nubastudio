"use client";

import { useRef } from "react";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import SectionHeading from "./SectionHeading";
import { useReveal } from "./useReveal";
import { ArrowRight } from "../icons";

const LINE = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" } as const;
const MOVE = "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-box:fill-box]";

function WebFig() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <rect x="28" y="20" width="144" height="100" rx="7" {...LINE} />
      <path d="M28 36h144" {...LINE} />
      <circle cx="38" cy="28" r="2" {...LINE} />
      <circle cx="46" cy="28" r="2" {...LINE} />
      <circle cx="54" cy="28" r="2" {...LINE} />
      <g className={`${MOVE} group-hover/cell:-translate-y-[3px] group-data-[active=true]/cell:-translate-y-[3px]`}>
        <rect x="40" y="46" width="76" height="8" rx="2" {...LINE} />
        <rect x="40" y="59" width="52" height="4" rx="2" {...LINE} />
      </g>
      <g className={`${MOVE} delay-[60ms] group-hover/cell:-translate-y-[6px] group-data-[active=true]/cell:-translate-y-[6px]`}>
        <rect x="40" y="76" width="36" height="32" rx="3" {...LINE} />
      </g>
      <g className={`${MOVE} delay-[120ms] group-hover/cell:-translate-y-[6px] group-data-[active=true]/cell:-translate-y-[6px]`}>
        <rect x="82" y="76" width="36" height="32" rx="3" {...LINE} />
      </g>
      <g className={`${MOVE} delay-[180ms] group-hover/cell:-translate-y-[6px] group-data-[active=true]/cell:-translate-y-[6px]`}>
        <rect x="124" y="76" width="36" height="32" rx="3" {...LINE} />
      </g>
    </svg>
  );
}

function MobileFig() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <g className={`${MOVE} origin-bottom group-hover/cell:-translate-x-[10px] group-data-[active=true]/cell:-translate-x-[10px] group-hover/cell:-rotate-[8deg] group-data-[active=true]/cell:-rotate-[8deg]`}>
        <rect x="62" y="22" width="50" height="100" rx="9" {...LINE} opacity="0.5" />
      </g>
      <g className={`${MOVE} origin-bottom group-hover/cell:translate-x-[8px] group-data-[active=true]/cell:translate-x-[8px] group-hover/cell:rotate-[4deg] group-data-[active=true]/cell:rotate-[4deg]`}>
        <rect x="90" y="16" width="50" height="104" rx="9" fill="#000" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M108 23h14" {...LINE} />
        <rect x="98" y="34" width="34" height="22" rx="3" {...LINE} />
        <path d="M98 64h34M98 72h22M98 80h28" {...LINE} />
        <rect x="98" y="96" width="34" height="12" rx="6" {...LINE} />
      </g>
    </svg>
  );
}

function MarketFig() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <path
        d="M56 70h34M110 70h34M56 46l38 18M56 94l38-18M144 46l-38 18M144 94l-38-18"
        {...LINE}
        strokeDasharray="3 4"
        className="[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-[1600ms] ease-linear group-hover/cell:[stroke-dashoffset:-28] group-data-[active=true]/cell:[stroke-dashoffset:-28]"
      />
      <g className={`${MOVE} origin-center group-hover/cell:rotate-45 group-data-[active=true]/cell:rotate-45`}>
        <rect x="88" y="58" width="24" height="24" rx="5" {...LINE} />
      </g>
      {[
        [44, 46],
        [44, 70],
        [44, 94],
        [156, 46],
        [156, 70],
        [156, 94],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" {...LINE} />
      ))}
    </svg>
  );
}

function BrandFig() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <path d="M100 14v112M44 70h112M60 30l80 80M140 30l-80 80" {...LINE} opacity="0.25" />
      <g className={`${MOVE} origin-center group-hover/cell:rotate-90 group-data-[active=true]/cell:rotate-90`}>
        <rect x="66" y="36" width="68" height="68" rx="14" {...LINE} />
      </g>
      <g className={`${MOVE} origin-center group-hover/cell:scale-[1.18] group-data-[active=true]/cell:scale-[1.18]`}>
        <circle cx="100" cy="70" r="22" {...LINE} />
      </g>
      <circle cx="100" cy="70" r="46" {...LINE} opacity="0.35" />
    </svg>
  );
}

function StrategyFig() {
  const bars = [
    { x: 46, h: 18 },
    { x: 70, h: 30 },
    { x: 94, h: 44 },
    { x: 118, h: 62 },
    { x: 142, h: 80 },
  ];
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <path d="M34 118h134" {...LINE} opacity="0.4" />
      {bars.map((b, i) => (
        <g
          key={b.x}
          className={`${MOVE} origin-bottom scale-y-[0.7] group-hover/cell:scale-y-100 group-data-[active=true]/cell:scale-y-100`}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          <rect x={b.x} y={118 - b.h} width="14" height={b.h} rx="2" {...LINE} />
        </g>
      ))}
      <path d="M53 92 77 80l24-14 24-18 24-22" {...LINE} strokeDasharray="2 4" opacity="0.6" />
    </svg>
  );
}

export const FIGS = [WebFig, MobileFig, MarketFig, BrandFig, StrategyFig];

export default function HomeServices() {
  const { lang, path } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.home;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative border-t border-white/[0.07] bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <SectionHeading index="02" label={t.servicesLabel} heading={t.servicesHeading}>
          <p className="max-w-[40ch] text-[16px] leading-[1.6] text-white/55">{ui.services.intro}</p>
        </SectionHeading>

        <ul className="grid grid-cols-1 gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {ui.services.list.map((service, i) => {
            const Fig = FIGS[i % FIGS.length];
            return (
              <li key={service.title} data-reveal className="group/cell relative flex flex-col bg-black p-5 sm:p-8 lg:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/30">FIG 0.{i + 1}</p>
                <div className="my-8 h-36 text-white/45 transition-colors duration-500 group-hover/cell:text-white/80 group-data-[active=true]/cell:text-white/80 lg:h-40">
                  <Fig />
                </div>
                <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#EDEDED]">{service.title}</h3>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.55] text-white/50">{service.desc}</p>
              </li>
            );
          })}

          <li data-reveal className="relative bg-black">
            <a
              href={path("/contact")}
              className="group/cta relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden p-5 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C6FF00] sm:p-8 lg:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[120%] w-[120%] rounded-full bg-[radial-gradient(circle,rgba(198,255,0,0.12),transparent_60%)] opacity-60 transition-opacity duration-500 group-hover/cta:opacity-100"
              />
              <p className="relative font-mono text-[11px] uppercase tracking-[0.08em] text-white/30">FIG 0.{ui.services.list.length + 1}</p>
              <div className="relative">
                <h3 className="text-[clamp(1.6rem,2.4vw,2.1rem)] font-[450] leading-[1.05] tracking-[-0.04em] text-[#EDEDED]">
                  {t.servicesCtaTitle}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.55] text-white/55">{t.servicesCtaDesc}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[#C6FF00]">
                  {t.servicesCtaLink}
                  <ArrowRight className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1" />
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
