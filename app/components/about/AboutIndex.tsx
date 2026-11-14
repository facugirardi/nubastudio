"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../home/SectionHeading";
import { useReveal } from "../home/useReveal";
import { openCase } from "../home/WorkCard";
import { prefetchCase } from "../caseTransition";
import { visibleWorks, works } from "../../data/works";
import { localizeWork } from "../../lib/localizeWork";
import { CONTACT, FOUNDED } from "../../lib/seo";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "Ángel Vaquero", role: "Strategy", photo: "/images/angelito.webp" },
  { name: "Facundo Girardi", role: "Development", photo: "/images/facu.webp" },
  { name: "Alejo Vaquero", role: "Design", photo: "/images/alejo.webp" },
] as const;

const VERB_ROLES = ["Strategy", "Design", "Development"] as const;

type Person = (typeof TEAM)[number];

function personFor(role: (typeof VERB_ROLES)[number]): Person {
  return TEAM.find((p) => p.role === role) ?? TEAM[0];
}

function Word({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]">
      <span data-word className={`inline-block ${className}`}>
        {children}
      </span>
    </span>
  );
}

function Header() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const start = ui.about.headlineStart.split(" ");
  const end = ui.about.headlineEnd.split(" ");
  const verbs = ui.about.headlineVerbs;
  const and = lang === "es" ? "y" : "and";

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.035, ease: "expo.out", delay: 0.1 }
      );
      gsap.fromTo(
        el.querySelectorAll("[data-intro]"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.5 }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const x = gsap.quickTo(card, "x", { duration: reduce ? 0 : 0.5, ease: "power3.out" });
    const y = gsap.quickTo(card, "y", { duration: reduce ? 0 : 0.5, ease: "power3.out" });
    const rot = gsap.quickTo(card, "rotation", { duration: 0.6, ease: "power3.out" });
    let frame = 0;
    let px = 0;
    let py = 0;
    let lastX = 0;
    const apply = () => {
      frame = 0;
      x(px + 24);
      y(py + 24);
      if (!reduce) rot(Math.max(-8, Math.min(8, (px - lastX) * 0.3)));
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
  }, []);

  const enter = (i: number) => (e: React.PointerEvent) => {
    const card = cardRef.current;
    if (active === null && card) gsap.set(card, { x: e.clientX + 24, y: e.clientY + 24, rotation: 0 });
    setActive(i);
  };

  const facts = [
    { label: ui.about.basedIn, value: CONTACT.city },
    { label: ui.about.since, value: FOUNDED },
    { label: ui.about.projectsShipped, value: String(works.length).padStart(2, "0") },
    { label: ui.about.thePeople, value: String(TEAM.length).padStart(2, "0") },
  ];

  return (
    <div ref={rootRef}>
      <div className="px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pb-24 lg:pt-40">
        <p data-intro className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
          <span className="text-white/25">[{FOUNDED}]</span> {ui.aboutPage.label}
        </p>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.75rem,7vw,6.5rem)] font-[450] leading-[1.02] tracking-[-0.055em] text-[#EDEDED]">
          {start.map((w, i) => (
            <Fragment key={`s${i}`}>
              <Word>{w}</Word>{" "}
            </Fragment>
          ))}
          {verbs.map((verb, i) => {
            const person = personFor(VERB_ROLES[i]);
            return (
              <Fragment key={verb}>
                <span
                  onPointerEnter={enter(i)}
                  onPointerLeave={() => setActive(null)}
                  className="group/verb inline-flex cursor-default items-baseline whitespace-nowrap"
                >
                  <Word>
                    <span className="relative mr-[0.12em] inline-block h-[0.72em] w-[0.72em] translate-y-[0.06em] overflow-hidden rounded-full border border-white/20 align-baseline">
                      <Image
                        src={person.photo}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover object-top grayscale transition-[filter] duration-500 group-hover/verb:grayscale-0"
                      />
                    </span>
                  </Word>
                  <Word className={`transition-colors duration-300 ${active !== null && active !== i ? "text-[#C6FF00]/35" : "text-[#C6FF00]"}`}>
                    {verb}
                    {i < verbs.length - 2 ? "," : ""}
                  </Word>
                </span>{" "}
                {i === verbs.length - 2 ? (
                  <>
                    <Word>{and}</Word>{" "}
                  </>
                ) : null}
              </Fragment>
            );
          })}
          {end.map((w, i) => (
            <Fragment key={`e${i}`}>
              <Word className="text-white">{w}</Word>
              {i < end.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>
      </div>

      <div className="grid border-t border-white/[0.07] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
        <p data-intro className="px-5 py-8 text-[16px] leading-[1.6] text-white/55 sm:px-8 lg:border-r lg:border-white/[0.07] lg:px-10 lg:py-10">
          {ui.about.sub}
        </p>
        <dl className="grid grid-cols-2 border-t border-white/[0.07] sm:grid-cols-4 lg:border-t-0">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              data-intro
              className={`flex flex-col justify-between gap-6 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 ${i > 0 ? "sm:border-l sm:border-white/[0.07]" : ""} ${i % 2 === 1 ? "border-l border-white/[0.07]" : ""} ${i > 1 ? "border-t border-white/[0.07] sm:border-t-0" : ""}`}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">{fact.label}</dt>
              <dd className="whitespace-nowrap text-[clamp(1.5rem,2.4vw,2.25rem)] font-[450] leading-none tracking-[-0.04em] text-[#EDEDED] tabular-nums">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        ref={cardRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden w-[220px] overflow-hidden rounded-xl border border-white/[0.12] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-[opacity,scale] duration-300 ease-out [@media(pointer:fine)]:block ${
          active === null ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative aspect-[4/5]">
          {VERB_ROLES.map((role, i) => {
            const person = personFor(role);
            return (
              <Image
                key={role}
                src={person.photo}
                alt=""
                fill
                sizes="220px"
                className={`object-cover object-top transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            );
          })}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10">
            {VERB_ROLES.map((role, i) => {
              const person = personFor(role);
              return (
                <div key={role} className={`absolute inset-x-4 bottom-4 transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}>
                  <p className="text-[15px] font-medium tracking-[-0.02em] text-[#EDEDED]">{person.name}</p>
                  <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/55">{ui.about.roles[role]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Reel() {
  const { lang, path } = useLanguage();
  const items = visibleWorks.map((w) => localizeWork(w, lang));
  const loop = [...items, ...items];

  return (
    <div className="group/reel relative overflow-hidden border-y border-white/[0.07] py-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <ul className="hero-marquee-track flex w-max gap-4 [animation:hero-marquee_70s_linear_infinite] group-hover/reel:[animation-play-state:paused]">
        {loop.map((work, i) => {
          const dup = i >= items.length;
          return (
            <li key={`${work.slug}-${i}`} aria-hidden={dup || undefined}>
              <a
                href={path(`/cases/${work.slug}`)}
                tabIndex={dup ? -1 : undefined}
                onClick={openCase(work)}
                onPointerEnter={() => prefetchCase(work.slug)}
                className="group/shot relative block aspect-[16/10] h-44 overflow-hidden rounded-xl border border-white/[0.08] sm:h-56 lg:h-64"
              >
                <Image
                  src={work.image}
                  alt={dup ? "" : `${work.title} - ${work.subtitle}`}
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100">
                  <span className="text-[15px] font-medium tracking-[-0.02em] text-[#EDEDED]">{work.title}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/60">{work.year}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Studio() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  return (
    <div>
      <SectionHeading index="01" label={ui.about.theStudio} heading={ui.aboutPage.studioHeading} />
      <div className="grid border-t border-white/[0.07] lg:grid-cols-2">
        <p
          data-reveal
          className="px-5 py-12 text-[clamp(1.4rem,2.4vw,2rem)] font-[450] leading-[1.3] tracking-[-0.03em] text-[#EDEDED] sm:px-8 lg:border-r lg:border-white/[0.07] lg:px-10 lg:py-16"
        >
          {ui.about.origin[0]}
        </p>
        <div className="border-t border-white/[0.07] px-5 py-12 sm:px-8 lg:border-t-0 lg:px-10 lg:py-16">
          <p data-reveal className="max-w-[46ch] text-[16px] leading-[1.65] text-white/55 lg:text-[17px]">
            {ui.about.origin[1]}
          </p>
        </div>
      </div>
    </div>
  );
}

function People() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);

  return (
    <div className="border-t border-white/[0.07]">
      <SectionHeading index="02" label={ui.about.thePeople} heading={ui.aboutPage.peopleHeading}>
        <p className="max-w-[40ch] text-[16px] leading-[1.6] text-white/55">{ui.aboutPage.peopleSub}</p>
      </SectionHeading>
      <ul className="grid grid-cols-1 gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
        {TEAM.map((person, i) => (
          <li key={person.name} data-reveal className="group/person bg-black p-5 sm:p-6 lg:p-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <Image
                src={person.photo}
                alt={`${person.name}, ${ui.about.roles[person.role]}`}
                fill
                sizes="(max-width: 639px) 100vw, 33vw"
                className="object-cover object-top brightness-[0.8] grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/person:scale-[1.03] group-hover/person:brightness-100 group-hover/person:grayscale-0"
              />
              <span className="absolute left-4 top-4 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/70 mix-blend-difference">
                0{i + 1}
              </span>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <p className="text-[20px] font-medium tracking-[-0.03em] text-[#EDEDED]">{person.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">{ui.about.roles[person.role]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutIndex() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <Header />
      </div>
      <Reel />
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <Studio />
        <People />
      </div>
    </section>
  );
}
