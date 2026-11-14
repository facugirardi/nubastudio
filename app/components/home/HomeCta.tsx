"use client";

import { useRef } from "react";
import NubaMark from "../NubaMark";
import { CONTACT } from "../../lib/seo";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { useReveal } from "./useReveal";
import { ArrowRight, ArrowUpRight } from "../icons";

export default function HomeCta() {
  const { lang, path } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.home;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative isolate overflow-hidden border-t border-white/[0.07] bg-black font-display text-[#EDEDED]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-position:center_center] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_45%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(198,255,0,0.04)_40%,transparent_68%)]"
      />

      <div className="mx-auto flex max-w-[1400px] flex-col items-center border-x border-white/[0.07] px-5 py-28 text-center sm:px-8 lg:py-40">
        <div data-reveal className="relative mb-10">
          <span aria-hidden className="absolute inset-[-60%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),transparent_62%)] blur-xl" />
          <NubaMark className="relative h-14 w-14 text-black [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.4))]" />
        </div>

        <h2 data-reveal className="text-[clamp(2.75rem,6.4vw,5.5rem)] font-[450] leading-[0.98] tracking-[-0.055em]">
          {t.ctaHeading.map((line, i) => (
            <span key={line} className={`block ${i === 1 ? "text-white/45" : ""}`}>
              {line}
            </span>
          ))}
        </h2>
        <p data-reveal className="mt-6 max-w-[42ch] text-[16px] leading-[1.6] text-white/55 sm:text-[17px]">
          {t.ctaSub}
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <a
            href={path("/contact")}
            className="group/cta inline-flex h-11 items-center gap-2 rounded-full bg-[#EDEDED] pl-5 pr-4 text-[15px] font-medium text-black transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00]"
          >
            {ui.hero.primaryCta}
            <ArrowRight className="transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5" />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.02] px-5 text-[15px] font-medium text-[#EDEDED] transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00]"
          >
            {t.whatsapp}
            <ArrowUpRight size={11} className="text-white/45" />
          </a>
        </div>
      </div>
    </section>
  );
}
