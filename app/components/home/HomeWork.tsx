"use client";

import { useRef } from "react";
import { ArrowRight } from "../icons";
import { visibleWorks } from "../../data/works";
import { localizeWork } from "../../lib/localizeWork";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import SectionHeading from "./SectionHeading";
import WorkCard from "./WorkCard";
import { useReveal } from "./useReveal";

const FEATURED = 3;

export default function HomeWork() {
  const { lang, path } = useLanguage();
  const t = getUiText(lang).home;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const works = visibleWorks.map((w) => localizeWork(w, lang));
  const shown = works.slice(0, FEATURED);

  return (
    <section id="work" ref={ref} className="relative bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <SectionHeading index="01" label={t.workLabel} heading={t.workHeading}>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
            {String(works.length).padStart(2, "0")} {t.workLabel.toLowerCase()}
          </p>
        </SectionHeading>

        <ul className="grid grid-cols-1 gap-px border-t border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
          {shown.map((work, i) => (
            <li key={work.slug} data-reveal className={i === 0 ? "md:col-span-2" : ""}>
              <WorkCard
                work={work}
                index={i}
                featured={i === 0}
                priority={i === 0}
                viewCase={t.viewCase}
                href={path(`/cases/${work.slug}`)}
              />
            </li>
          ))}
        </ul>

        {works.length > FEATURED ? (
          <div data-reveal className="border-t border-white/[0.07]">
            <a
              href={path("/works")}
              className="group/more relative flex w-full items-center justify-center gap-3 overflow-hidden py-8 text-[15px] font-medium text-white/60 transition-colors duration-200 hover:text-[#EDEDED] focus-visible:text-[#EDEDED] focus-visible:outline-none lg:py-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_120%_at_50%_100%,rgba(255,255,255,0.06),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover/more:opacity-100"
              />
              <span className="relative">{t.seeMore}</span>
              <span className="relative font-mono text-[11px] text-white/35">({String(works.length).padStart(2, "0")})</span>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] transition-[transform,background-color,color,border-color] duration-300 ease-out group-hover/more:translate-x-0.5 group-hover/more:border-[#EDEDED] group-hover/more:bg-[#EDEDED] group-hover/more:text-black">
                <ArrowRight size={12} />
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
