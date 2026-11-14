"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkCard, { openCase } from "../home/WorkCard";
import { prefetchCase } from "../caseTransition";
import { ArrowUpRight } from "../icons";
import { visibleWorks, works as allWorks, type WorkItem } from "../../data/works";
import { localizeWork } from "../../lib/localizeWork";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";

gsap.registerPlugin(ScrollTrigger);

type Filter = "all" | "web" | "mobile" | "design";
type View = "grid" | "list" | "feed";

const FILTERS: Filter[] = ["all", "web", "mobile", "design"];

function categories(slug: string): Filter[] {
  const source = allWorks.find((w) => w.slug === slug)?.subtitle ?? "";
  const out: Filter[] = [];
  if (/Web|Full-Stack/i.test(source)) out.push("web");
  if (/Mobile/i.test(source)) out.push("mobile");
  if (/Design/i.test(source)) out.push("design");
  return out;
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function FeedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 13h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function useSlidingPill<T extends string>(active: T) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const measure = () => {
      const el = group.querySelector<HTMLElement>(`[data-key="${active}"]`);
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(group);
    return () => ro.disconnect();
  }, [active]);

  return { groupRef, pill };
}

export default function WorksIndex() {
  const { lang, path } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.worksPage;

  const works = useMemo(() => visibleWorks.map((w) => localizeWork(w, lang)), [lang]);
  const cats = useMemo(() => Object.fromEntries(works.map((w) => [w.slug, categories(w.slug)])), [works]);
  const counts = useMemo(
    () =>
      Object.fromEntries(FILTERS.map((f) => [f, f === "all" ? works.length : works.filter((w) => cats[w.slug].includes(f)).length])) as Record<Filter, number>,
    [works, cats]
  );

  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = filter === "all" ? works : works.filter((w) => cats[w.slug].includes(filter));

  const headRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const { groupRef: filterGroupRef, pill: filterPill } = useSlidingPill(filter);
  const { groupRef: viewGroupRef, pill: viewPill } = useSlidingPill(view);

  useEffect(() => {
    const head = headRef.current;
    if (!head || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        head.querySelectorAll("[data-intro]"),
        { opacity: 0, y: 24, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.08, ease: "expo.out", delay: 0.15, clearProps: "filter" }
      );
    }, head);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ScrollTrigger.refresh();
      return;
    }
    const items = list.querySelectorAll<HTMLElement>(":scope > li");
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: view === "list" ? 14 : view === "feed" ? 40 : 28, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: view === "list" ? 0.035 : view === "feed" ? 0.1 : 0.06,
        ease: "expo.out",
        delay: firstRender.current ? 0.35 : 0,
        clearProps: "filter",
        onStart: () => ScrollTrigger.refresh(),
      }
    );
    firstRender.current = false;
    return () => {
      tween.kill();
    };
  }, [filter, view]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || view !== "list" || !window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const x = gsap.quickTo(preview, "x", { duration: reduce ? 0 : 0.55, ease: "power3.out" });
    const y = gsap.quickTo(preview, "y", { duration: reduce ? 0 : 0.55, ease: "power3.out" });
    const rot = gsap.quickTo(preview, "rotation", { duration: 0.6, ease: "power3.out" });
    let lastX = 0;
    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      x(px);
      y(py);
      if (!reduce) rot(Math.max(-7, Math.min(7, (px - lastX) * 0.25)));
      lastX = px;
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [view]);

  useEffect(() => {
    const list = listRef.current;
    if (view !== "feed" || !list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      list.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    }, list);
    return () => ctx.revert();
  }, [view, filter]);

  const pickFilter = (f: Filter) => {
    setHovered(null);
    setFilter(f);
  };

  const openFromList = (work: WorkItem, i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const preview = previewRef.current;
    const usePreview = hovered === i && preview && window.matchMedia("(pointer: fine)").matches;
    openCase(work, () => (usePreview ? preview : null))(e);
  };

  return (
    <section className="relative bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <div ref={headRef} className="grid gap-10 px-5 pb-14 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:px-10 lg:pb-20 lg:pt-40">
          <div>
            <p data-intro className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
              <span className="text-white/25">[{String(works.length).padStart(2, "0")}]</span> {t.label}
            </p>
            <h1 data-intro className="mt-5 max-w-[15ch] text-[clamp(2.75rem,6vw,5.25rem)] font-[450] leading-[0.98] tracking-[-0.055em]">
              {t.heading}
            </h1>
          </div>
          <p data-intro className="max-w-[42ch] text-[16px] leading-[1.6] text-white/55 lg:justify-self-end lg:text-[17px]">
            {t.sub}
          </p>
        </div>

        <div className="sticky top-16 z-20 flex items-center justify-between gap-3 border-y border-white/[0.07] bg-black/75 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-10">
          <div ref={filterGroupRef} role="tablist" aria-label={t.filterLabel} className="relative -ml-1.5 flex min-w-0 items-center sm:ml-0">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-white/[0.09] transition-[left,width] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ left: filterPill?.left ?? 0, width: filterPill?.width ?? 0, opacity: filterPill ? 1 : 0 }}
            />
            {FILTERS.map((f) => (
              <button
                key={f}
                data-key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                disabled={counts[f] === 0}
                onClick={() => pickFilter(f)}
                className={`relative flex h-8 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[14px] sm:px-3.5 transition-colors duration-200 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00] ${
                  filter === f ? "text-[#EDEDED]" : "text-white/50 hover:text-[#EDEDED]"
                }`}
              >
                {t.filters[f]}
                <span className="hidden font-mono text-[10px] text-white/35 tabular-nums sm:inline">{String(counts[f]).padStart(2, "0")}</span>
              </button>
            ))}
          </div>

          <div ref={viewGroupRef} role="group" aria-label={t.viewLabel} className="relative flex shrink-0 items-center rounded-full border border-white/[0.1] p-0.5">
            <span
              aria-hidden
              className="pointer-events-none absolute top-0.5 bottom-0.5 rounded-full bg-white/[0.1] transition-[left,width] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ left: viewPill?.left ?? 0, width: viewPill?.width ?? 0, opacity: viewPill ? 1 : 0 }}
            />
            {(["grid", "list", "feed"] as const).map((v) => (
              <button
                key={v}
                data-key={v}
                type="button"
                aria-pressed={view === v}
                aria-label={t[v]}
                onClick={() => {
                  setHovered(null);
                  setView(v);
                }}
                className={`relative flex h-7 w-9 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00] ${
                  view === v ? "text-[#EDEDED]" : "text-white/45 hover:text-[#EDEDED]"
                }`}
              >
                {v === "grid" ? <GridIcon /> : v === "list" ? <ListIcon /> : <FeedIcon />}
              </button>
            ))}
          </div>
        </div>

        {view === "grid" ? (
          <ul key={`grid-${filter}`} ref={listRef} className="grid grid-cols-1 gap-px bg-white/[0.07] md:grid-cols-2">
            {shown.map((work, i) => (
              <li key={work.slug} className={i === shown.length - 1 && shown.length % 2 === 1 ? "md:col-span-2" : ""}>
                <WorkCard
                  work={work}
                  index={i}
                  href={path(`/cases/${work.slug}`)}
                  viewCase={ui.home.viewCase}
                  featured={i === shown.length - 1 && shown.length % 2 === 1 && shown.length > 1}
                  priority={i < 2}
                />
              </li>
            ))}
          </ul>
        ) : view === "feed" ? (
          <ul key={`feed-${filter}`} ref={listRef}>
            {shown.map((work, i) => (
              <FeedItem
                key={work.slug}
                work={work}
                index={i}
                href={path(`/cases/${work.slug}`)}
                viewCase={ui.home.viewCase}
                priority={i === 0}
              />
            ))}
          </ul>
        ) : (
          <ul key={`list-${filter}`} ref={listRef} onPointerLeave={() => setHovered(null)}>
            {shown.map((work, i) => (
              <ListRow
                key={work.slug}
                work={work}
                index={i}
                href={path(`/cases/${work.slug}`)}
                dimmed={hovered !== null && hovered !== i}
                onEnter={(e) => {
                  const preview = previewRef.current;
                  if (hovered === null && preview && e) gsap.set(preview, { x: e.clientX, y: e.clientY, rotation: 0 });
                  setHovered(i);
                  prefetchCase(work.slug);
                }}
                onClick={openFromList(work, i)}
                viewCase={ui.home.viewCase}
              />
            ))}
          </ul>
        )}
      </div>

      {view === "list" ? (
        <div
          ref={previewRef}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[16/10] w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/[0.1] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-[opacity,scale] duration-300 ease-out [@media(pointer:fine)]:block ${
            hovered === null ? "scale-90 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {shown.map((work, i) => (
            <Image
              key={work.slug}
              src={work.image}
              alt=""
              fill
              sizes="360px"
              className={`object-cover transition-opacity duration-300 ${hovered === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ListRow({
  work,
  index,
  href,
  dimmed,
  onEnter,
  onClick,
  viewCase,
}: {
  work: WorkItem;
  index: number;
  href: string;
  dimmed: boolean;
  onEnter: (e?: React.PointerEvent<HTMLAnchorElement>) => void;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  viewCase: string;
}) {
  return (
    <li className="border-b border-white/[0.07]">
      <a
        href={href}
        onPointerEnter={(e) => onEnter(e)}
        onFocus={() => onEnter()}
        onClick={onClick}
        aria-label={`${viewCase}: ${work.title}`}
        className={`group/row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 outline-none transition-opacity duration-300 focus-visible:bg-white/[0.03] sm:px-8 md:grid-cols-[3.5rem_minmax(0,1.3fr)_minmax(0,1fr)_4rem_2.25rem] md:gap-6 lg:px-10 lg:py-8 ${
          dimmed ? "opacity-35" : "opacity-100"
        }`}
      >
        <span className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md border border-white/[0.08] md:hidden">
          <Image src={work.image} alt="" fill sizes="64px" className="object-cover" />
        </span>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-white/35 md:block">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[clamp(1.4rem,3vw,2.6rem)] font-[450] leading-[1.05] tracking-[-0.045em] text-[#EDEDED] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2">
            {work.title}
          </span>
          <span className="mt-1 block truncate text-[13px] text-white/45 md:hidden">{work.subtitle}</span>
        </span>
        <span className="hidden truncate text-[15px] text-white/50 md:block">{work.subtitle}</span>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-white/35 tabular-nums md:block">{work.year}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover/row:rotate-45 group-hover/row:border-[#EDEDED] group-hover/row:bg-[#EDEDED] group-hover/row:text-black">
          <ArrowUpRight />
        </span>
      </a>
    </li>
  );
}

function FeedItem({
  work,
  index,
  href,
  viewCase,
  priority,
}: {
  work: WorkItem;
  index: number;
  href: string;
  viewCase: string;
  priority: boolean;
}) {
  return (
    <li className="border-b border-white/[0.07]">
      <a
        href={href}
        onClick={(e) => openCase(work, () => e.currentTarget.querySelector("[data-feed-media]"))(e)}
        onPointerEnter={() => prefetchCase(work.slug)}
        aria-label={`${viewCase}: ${work.title}`}
        className="group/feed block px-5 py-8 outline-none focus-visible:bg-white/[0.02] sm:px-8 lg:px-10 lg:py-12"
      >
        <div data-feed-media className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] lg:aspect-[2/1]">
          <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
            <Image
              src={work.image}
              alt={`${work.title} - ${work.subtitle}`}
              fill
              sizes="(max-width: 1400px) 100vw, 1320px"
              priority={priority}
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feed:scale-[1.03]"
            />
          </div>
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        </div>

        <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-start lg:gap-8">
          <span className="hidden pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/35 lg:block">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-[clamp(2rem,4.4vw,3.75rem)] font-[450] leading-[1] tracking-[-0.05em] text-[#EDEDED]">{work.title}</h3>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
                {work.subtitle}
                {work.year ? <span className="text-white/25"> · {work.year}</span> : null}
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover/feed:rotate-45 group-hover/feed:border-[#EDEDED] group-hover/feed:bg-[#EDEDED] group-hover/feed:text-black lg:hidden">
              <ArrowUpRight />
            </span>
          </div>
          {work.description ? (
            <p className="max-w-[52ch] text-[15px] leading-[1.6] text-white/55 lg:pt-2">{work.description}</p>
          ) : (
            <span className="hidden lg:block" />
          )}
          <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover/feed:rotate-45 group-hover/feed:border-[#EDEDED] group-hover/feed:bg-[#EDEDED] group-hover/feed:text-black lg:flex">
            <ArrowUpRight />
          </span>
        </div>
      </a>
    </li>
  );
}
