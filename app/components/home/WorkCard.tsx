"use client";

import Image from "next/image";
import { prefetchCase, startCaseTransition } from "../caseTransition";
import { ArrowUpRight } from "../icons";
import type { WorkItem } from "../../data/works";

function spotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export function openCase(work: WorkItem, source?: () => Element | null) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const el = source?.() ?? e.currentTarget.querySelector("img") ?? e.currentTarget;
    const r = el.getBoundingClientRect();
    startCaseTransition({
      slug: work.slug,
      image: work.image,
      rect: { left: r.left, top: r.top, width: r.width, height: r.height },
    });
  };
}

function Arrow() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover/card:rotate-45 group-hover/card:border-[#EDEDED] group-hover/card:bg-[#EDEDED] group-hover/card:text-black">
      <ArrowUpRight />
    </span>
  );
}

export default function WorkCard({
  work,
  index,
  href,
  viewCase,
  featured = false,
  priority = false,
}: {
  work: WorkItem;
  index: number;
  href: string;
  viewCase: string;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={openCase(work)}
      onPointerMove={spotlight}
      onPointerEnter={() => prefetchCase(work.slug)}
      aria-label={`${viewCase}: ${work.title}`}
      className={`group/card relative flex h-full flex-col overflow-hidden bg-black p-5 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C6FF00] sm:p-8 lg:p-10 ${
        featured ? "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12" : ""
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{ background: "radial-gradient(560px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 60%)" }}
      />

      <div className={`relative flex items-start justify-between gap-6 ${featured ? "lg:flex-col lg:justify-between lg:py-2" : ""}`}>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
            {String(index + 1).padStart(2, "0")}
            {work.year ? <span className="text-white/25"> · {work.year}</span> : null}
          </p>
          <h3
            className={`mt-3 font-[450] tracking-[-0.045em] text-[#EDEDED] ${
              featured ? "text-[clamp(2rem,3.6vw,3.25rem)] leading-[1]" : "text-[26px] leading-[1.05] lg:text-[30px]"
            }`}
          >
            {work.title}
          </h3>
          <p className="mt-2 text-[15px] text-white/50">{work.subtitle}</p>
          {featured && work.description ? (
            <p className="mt-6 hidden max-w-[44ch] text-[15px] leading-[1.6] text-white/60 lg:block">{work.description}</p>
          ) : null}
        </div>

        {featured ? (
          <div className="hidden w-full items-end justify-between gap-6 lg:flex">
            <ul className="flex flex-wrap gap-1.5">
              {work.technologies?.slice(0, 5).map((tech) => (
                <li key={tech} className="rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-white/50">
                  {tech}
                </li>
              ))}
            </ul>
            <Arrow />
          </div>
        ) : null}
        <div className={featured ? "lg:hidden" : ""}>
          <Arrow />
        </div>
      </div>

      <div className={`relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] ${featured ? "lg:mt-0" : ""}`}>
        <Image
          src={work.image}
          alt={`${work.title} - ${work.subtitle}`}
          fill
          sizes={featured ? "(max-width: 1023px) 100vw, 800px" : "(max-width: 767px) 100vw, 680px"}
          priority={priority}
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.035]"
        />
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
      </div>
    </a>
  );
}
