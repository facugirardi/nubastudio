"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../SmoothScroll";
import { FIGS } from "../home/HomeServices";
import SectionHeading from "../home/SectionHeading";
import { useReveal } from "../home/useReveal";
import { openCase } from "../home/WorkCard";
import { prefetchCase } from "../caseTransition";
import { ArrowUpRight } from "../icons";
import { visibleWorks } from "../../data/works";
import { localizeWork } from "../../lib/localizeWork";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { TECH_LOGOS } from "./techLogos";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_META = [
  { id: "web", tags: { en: ["Next.js", "React", "CMS", "Motion"], es: ["Next.js", "React", "CMS", "Animación"] }, cases: ["checkrto", "mes", "provia-consulting"] },
  { id: "mobile", tags: { en: ["React Native", "Expo", "iOS", "Android"], es: ["React Native", "Expo", "iOS", "Android"] }, cases: ["nuddo", "ushuaia360"] },
  { id: "platforms", tags: { en: ["Payments", "Dashboards", "Auth", "APIs"], es: ["Pagos", "Dashboards", "Autenticación", "APIs"] }, cases: ["nubapay", "kennedys"] },
  { id: "branding", tags: { en: ["Identity", "Art direction", "Systems"], es: ["Identidad", "Dirección de arte", "Sistemas"] }, cases: [] as string[] },
  { id: "strategy", tags: { en: ["Discovery", "Prototyping", "Roadmap"], es: ["Descubrimiento", "Prototipado", "Hoja de ruta"] }, cases: ["nubapay", "tivvu"] },
];


function Header() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.servicesPage;
  const lenis = useLenis();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-intro]"),
        { opacity: 0, y: 24, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.07, ease: "expo.out", delay: 0.15, clearProps: "filter" }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const jump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -64 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={ref} className="grid gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:px-10 lg:pb-20 lg:pt-40">
      <div>
        <p data-intro className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
          <span className="text-white/25">[{String(ui.services.list.length).padStart(2, "0")}]</span> {t.label}
        </p>
        <h1 data-intro className="mt-5 max-w-[14ch] text-[clamp(2.75rem,6vw,5.25rem)] font-[450] leading-[0.98] tracking-[-0.055em]">
          {t.heading}
        </h1>
        <p data-intro className="mt-8 max-w-[44ch] text-[16px] leading-[1.6] text-white/55 lg:text-[17px]">
          {ui.services.intro}
        </p>
      </div>

      <nav data-intro aria-label={t.onThisPage} className="lg:justify-self-end">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">{t.onThisPage}</p>
        <ol className="mt-4 border-t border-white/[0.08]">
          {ui.services.list.map((service, i) => (
            <li key={service.title} className="border-b border-white/[0.08]">
              <a
                href={`#${SERVICE_META[i].id}`}
                onClick={jump(SERVICE_META[i].id)}
                className="group/nav flex items-center gap-4 py-3 text-[15px] text-white/60 transition-colors duration-200 hover:text-[#EDEDED] lg:min-w-[340px]"
              >
                <span className="font-mono text-[11px] text-white/30">0{i + 1}</span>
                <span className="flex-1 transition-transform duration-300 ease-out group-hover/nav:translate-x-1">{service.title}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="text-white/30 transition-[transform,color] duration-300 group-hover/nav:translate-y-0.5 group-hover/nav:text-[#EDEDED]">
                  <path d="M6 2.5v7M2.5 6 6 9.5 9.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

function ServiceRows() {
  const { lang, path } = useLanguage();
  const ui = getUiText(lang);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ctx = gsap.context(() => {
      list.querySelectorAll<HTMLElement>(":scope > li").forEach((li) => {
        ScrollTrigger.create({
          trigger: li,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: (self) => {
            li.dataset.active = String(self.isActive);
          },
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={listRef} className="border-t border-white/[0.07]">
      {ui.services.list.map((service, i) => {
        const meta = SERVICE_META[i];
        const Fig = FIGS[i % FIGS.length];
        const cases = meta.cases
          .map((slug) => visibleWorks.find((w) => w.slug === slug))
          .filter((w): w is NonNullable<typeof w> => Boolean(w))
          .map((w) => localizeWork(w, lang));

        return (
          <li
            key={service.title}
            id={meta.id}
            data-active="false"
            className="group/cell scroll-mt-16 border-b border-white/[0.07] lg:grid lg:grid-cols-2"
          >
            <div className="px-5 py-12 sm:px-8 lg:border-r lg:border-white/[0.07] lg:px-10 lg:py-20">
              <div>
                <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/30">
                  FIG 0.{i + 1}
                </p>
                <h2 data-reveal className="mt-5 text-[clamp(2rem,3.4vw,3rem)] font-[450] leading-[1.02] tracking-[-0.05em] text-[#EDEDED]">
                  {service.title}
                </h2>
                <p data-reveal className="mt-4 max-w-[40ch] text-[16px] leading-[1.6] text-white/55">
                  {service.desc}
                </p>
                <ul data-reveal className="mt-8 flex flex-wrap gap-1.5">
                  {meta.tags[lang].map((tag) => (
                    <li key={tag} className="rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-white/50">
                      {tag}
                    </li>
                  ))}
                </ul>

                {cases.length ? (
                  <div data-reveal className="mt-10">
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">{ui.services.relatedWork}</p>
                    <ul className="mt-3 border-t border-white/[0.08]">
                      {cases.map((work) => (
                        <li key={work.slug} className="border-b border-white/[0.08]">
                          <a
                            href={path(`/cases/${work.slug}`)}
                            onClick={openCase(work)}
                            onPointerEnter={() => prefetchCase(work.slug)}
                            className="group/case flex items-center gap-4 py-3"
                          >
                            <span className="relative h-9 w-14 shrink-0 overflow-hidden rounded-md border border-white/[0.08]">
                              <Image src={work.image} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 group-hover/case:scale-110" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[15px] text-[#EDEDED]">{work.title}</span>
                              <span className="block truncate text-[13px] text-white/40">{work.subtitle}</span>
                            </span>
                            <span className="text-white/35 transition-[transform,color] duration-300 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5 group-hover/case:text-[#EDEDED]">
                              <ArrowUpRight />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="relative px-5 pb-12 sm:px-8 lg:px-10 lg:py-20">
              <div
                data-reveal
                className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] lg:sticky lg:top-32"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-position:center] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent_80%)]"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,0,0.1),transparent_65%)] opacity-0 transition-opacity duration-700 group-data-[active=true]/cell:opacity-100 group-hover/cell:opacity-100"
                />
                <div className="h-[58%] w-[72%] text-white/40 transition-colors duration-700 group-data-[active=true]/cell:text-white/85 group-hover/cell:text-white/85">
                  <Fig />
                </div>
                <span className="absolute left-5 top-4 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/25">
                  0{i + 1} / 0{ui.services.list.length}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Stack() {
  const { lang } = useLanguage();
  const t = getUiText(lang).servicesPage;
  return (
    <div className="border-t border-white/[0.07]">
      <SectionHeading index="02" label={t.stackLabel} heading={t.stackHeading}>
        <p className="max-w-[40ch] text-[16px] leading-[1.6] text-white/55">{t.stackSub}</p>
      </SectionHeading>
      <ul className="grid grid-cols-2 gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-3 lg:grid-cols-6">
        {TECH_LOGOS.map((tech) => (
          <li
            key={tech.name}
            data-reveal
            className="group/tech relative flex h-32 flex-col items-center justify-center gap-4 overflow-hidden bg-black text-white/45 transition-colors duration-300 hover:text-[#EDEDED] lg:h-40"
            style={{ "--brand": tech.color } as React.CSSProperties}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tech:opacity-100"
              style={{ background: "radial-gradient(circle at 50% 120%, color-mix(in srgb, var(--brand) 22%, transparent), transparent 62%)" }}
            />
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="relative h-8 w-8 fill-current transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tech:-translate-y-1 group-hover/tech:text-[var(--brand)] lg:h-9 lg:w-9"
            >
              <path d={tech.path} />
            </svg>
            <span className="relative text-[14px] font-medium tracking-[-0.02em]">{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Faq() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.servicesPage;
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-white/[0.07]">
      <SectionHeading index="04" label={t.faqLabel} heading={t.faqHeading} />
      <ul className="border-t border-white/[0.07]">
        {ui.faq.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${baseId}-faq-${i}`;
          return (
            <li key={item.question} data-reveal className="border-b border-white/[0.07]">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group/q grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 text-left outline-none focus-visible:bg-white/[0.03] sm:px-8 lg:grid-cols-[3.5rem_minmax(0,1fr)_auto] lg:px-10 lg:py-8"
                >
                  <span className="font-mono text-[11px] text-white/30">0{i + 1}</span>
                  <span
                    className={`text-[clamp(1.15rem,1.8vw,1.5rem)] font-[450] tracking-[-0.03em] transition-colors duration-200 ${
                      isOpen ? "text-[#EDEDED]" : "text-white/65 group-hover/q:text-[#EDEDED]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ${
                      isOpen ? "rotate-45 border-[#EDEDED] bg-[#EDEDED] text-black" : "border-white/[0.12] text-white/60 group-hover/q:border-white/30"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`max-w-[68ch] px-5 pb-8 pl-[calc(1.25rem+2.5rem+1rem)] text-[16px] leading-[1.65] text-white/55 transition-opacity duration-500 sm:px-8 sm:pl-[calc(2rem+2.5rem+1rem)] lg:pl-[calc(2.5rem+3.5rem+1rem)] ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ServicesIndex({ process }: { process: React.ReactNode }) {
  const topRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  useReveal(topRef);
  useReveal(faqRef);

  return (
    <>
      <section ref={topRef} className="relative bg-black font-display text-[#EDEDED]">
        <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
          <Header />
          <ServiceRows />
          <Stack />
        </div>
      </section>
      {process}
      <section ref={faqRef} className="relative bg-black font-display text-[#EDEDED]">
        <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
          <Faq />
        </div>
      </section>
    </>
  );
}
