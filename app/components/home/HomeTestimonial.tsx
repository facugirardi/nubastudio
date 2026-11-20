"use client";

import { useRef } from "react";
import Image from "next/image";
import { visibleWorks } from "../../data/works";
import { publishedTestimonials } from "../../data/testimonials";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { prefetchCase } from "../caseTransition";
import { ArrowUpRight } from "../icons";
import { openCase } from "./WorkCard";
import { useReveal } from "./useReveal";

export default function HomeTestimonial() {
  const { lang, path } = useLanguage();
  const t = getUiText(lang).home;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const item = publishedTestimonials[0];
  const work = item && visibleWorks.find((w) => w.slug === item.caseSlug);
  if (!item || !work) return null;

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-t border-white/[0.07]">
        <figure className="relative grid gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-16 lg:px-10 lg:py-32">
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
            <span aria-hidden className="text-white/25">[“]</span> {t.testimonialLabel}
          </p>

          <div>
            <blockquote
              data-reveal
              className="relative max-w-[30ch] text-[clamp(1.75rem,3.4vw,3rem)] font-[450] leading-[1.12] tracking-[-0.045em]"
            >
              <span aria-hidden className="absolute -left-[0.55em] top-0 text-[#C6FF00]">
                “
              </span>
              {item.quote[lang]}
              <span aria-hidden className="text-[#C6FF00]">”</span>
            </blockquote>

            <figcaption data-reveal className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.07] pt-8">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-[15px] font-medium"
                >
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[15px] font-medium tracking-[-0.01em]">{item.name}</span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
                    {item.role[lang]}
                  </span>
                </span>
              </div>

              <a
                href={path(`/cases/${work.slug}`)}
                onClick={openCase(work)}
                onPointerEnter={() => prefetchCase(work.slug)}
                className="group/tcase flex items-center gap-4 rounded-xl border border-white/[0.08] p-2 pr-4 transition-colors duration-200 hover:border-white/[0.16] hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6FF00]"
              >
                <span className="relative block h-11 w-16 overflow-hidden rounded-lg bg-white/[0.04]">
                  <Image src={work.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="text-[14px] text-white/60 transition-colors group-hover/tcase:text-[#EDEDED]">
                  {t.viewCase} · {work.title}
                </span>
                <ArrowUpRight className="text-white/55 transition-[transform,color] duration-200 group-hover/tcase:-translate-y-px group-hover/tcase:translate-x-px group-hover/tcase:text-[#C6FF00]" />
              </a>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
