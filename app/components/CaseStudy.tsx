"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import { useLenis } from "./SmoothScroll";
import {
  HERO_OVERSCAN,
  PORTRAIT,
  PORTRAIT_HERO_RATIO,
  PORTRAIT_HERO_TOP,
  consumeCaseEntryDelay,
  markCaseHeroReady,
  prefetchCase,
  startCaseTransition,
} from "./caseTransition";
import { useReveal } from "./home/useReveal";
import { ArrowRight, ArrowUpRight } from "./icons";
import FaqList from "./FaqList";
import type { WorkItem } from "../data/works";
import { getWorkFaq } from "../data/worksFaq";
import { HERO_QUALITY, HERO_SIZES, heroImageSet } from "../lib/optimizedImage";
import { localizeWork } from "../lib/localizeWork";
import { useLanguage } from "../lib/i18n";
import { getUiText, type UiText } from "../lib/uiText";

gsap.registerPlugin(ScrollTrigger);

function platforms(links: WorkItem["links"] | undefined, t: UiText) {
  if (!links) return [];
  const out: { label: string; href: string }[] = [];
  if (links.web) out.push({ label: t.caseStudy.liveSite, href: links.web });
  if (links.ios) out.push({ label: t.caseStudy.iosApp, href: links.ios });
  if (links.android) out.push({ label: t.caseStudy.androidApp, href: links.android });
  if (links.behance) out.push({ label: t.caseStudy.behance, href: links.behance });
  if (links.other) out.push({ label: links.other.label, href: links.other.url });
  return out;
}

const pad = (n: number) => String(n).padStart(2, "0");

function Label({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
      <span aria-hidden className="text-white/25">[{index}]</span> {children}
    </p>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 border-b border-white/[0.08] py-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">{label}</dt>
      <dd className="m-0 text-[15px] text-[#EDEDED]">{children}</dd>
    </div>
  );
}

export type CaseArticle = { title: string; excerpt: string; href: string };

export default function CaseStudy({
  work: rawWork,
  next: rawNext,
  articles = [],
}: {
  work: WorkItem;
  next: WorkItem;
  articles?: CaseArticle[];
}) {
  const router = useRouter();
  const lenis = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);
  const { lang, path } = useLanguage();
  const t = getUiText(lang);
  const cs = t.caseStudy;
  const faq = getWorkFaq(rawWork.slug, lang);
  const work = localizeWork(rawWork, lang);
  const next = localizeWork(rawNext, lang);
  useReveal(contentRef);

  const links = platforms(work.links, t);
  const pairImages =
    work.slug === "nuddo"
      ? (work.images ?? []).filter((src) => src.endsWith(".png"))
      : [];
  // El hero ya muestra work.image a pantalla completa: repetirla como primera
  // pieza de la galeria la descargaba dos veces en los 11 casos.
  const gallery = (work.images ?? []).filter(
    (src) => (work.coverInGallery || src !== work.image) && !pairImages.includes(src)
  );

  const chapters = [
    { label: cs.challenge, body: work.task },
    { label: cs.solution, body: work.solutions },
    { label: cs.process, body: work.process },
  ].filter((b): b is { label: string; body: string } => Boolean(b.body));

  let section = 1;
  const nextIndex = () => pad(++section);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });

    // El overlay del morph se retira recién cuando el hero terminó de decodificar.
    const heroImg = heroImgRef.current?.querySelector("img");
    if (!heroImg) {
      markCaseHeroReady();
    } else if (heroImg.complete) {
      (heroImg.decode?.() ?? Promise.resolve()).then(markCaseHeroReady, markCaseHeroReady);
    } else {
      heroImg.addEventListener("load", markCaseHeroReady, { once: true });
      heroImg.addEventListener("error", markCaseHeroReady, { once: true });
    }

    // Precarga la variante optimizada del próximo caso: la misma que usa el overlay.
    const preload = new window.Image();
    const nextSet = heroImageSet(next.image);
    preload.sizes = nextSet.sizes;
    preload.srcset = nextSet.srcSet;
    preload.src = nextSet.src;

    const entryDelay = consumeCaseEntryDelay();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.from("[data-hero]", {
          y: 28,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.07,
          delay: entryDelay,
          clearProps: "filter",
        });
      }

      // Parallax del hero: scrub numérico → la imagen persigue al scroll con
      // inercia propia en vez de pegarse frame a frame.
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: HERO_OVERSCAN * 100 * 0.75,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            // La sección, no el box: el box nace 10% por encima del viewport y
            // el progreso arrancaría ya empezado, desalineando el fin del morph.
            trigger: heroImgRef.current.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      if (!reduced) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }
    }, rootRef);

    return () => {
      heroImg?.removeEventListener("load", markCaseHeroReady);
      heroImg?.removeEventListener("error", markCaseHeroReady);
      ctx.revert();
    };
  }, [work.slug, next.image, lenis]);

  const goNext = () => {
    const el = nextImgRef.current;
    if (!el) {
      router.push(path(`/cases/${next.slug}`));
      return;
    }
    const r = el.getBoundingClientRect();
    startCaseTransition({
      image: next.image,
      slug: next.slug,
      rect: { left: r.left, top: r.top, width: r.width, height: r.height },
    });
  };

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-black font-display text-[#EDEDED]">
      <Navbar />

      {/* Hero fullscreen: el morph de la card aterriza en este mismo encuadre. */}
      <section className="cs-hero relative h-screen overflow-hidden">
        <div
          ref={heroImgRef}
          className="cs-hero-media absolute inset-x-0 z-0 will-change-transform"
          style={{ top: `${(-HERO_OVERSCAN / 2) * 100}%`, bottom: `${(-HERO_OVERSCAN / 2) * 100}%` }}
        >
          <Image
            className="cs-hero-img"
            src={work.image}
            alt={`${work.title} - ${work.subtitle} ${cs.caseByline}`}
            fill
            priority
            quality={HERO_QUALITY}
            sizes={HERO_SIZES}
            style={{ display: "block", zIndex: 1 }}
          />
        </div>
        <div
          aria-hidden
          className="cs-hero-shade absolute inset-0 z-[1] bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.55)_32%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.4)_100%)]"
        />

        <div className="cs-hero-text absolute inset-x-0 bottom-0 z-[2]">
          <div className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8 lg:px-10 lg:pb-14">
            <nav data-hero aria-label={cs.breadcrumb} className="font-mono text-[11px] uppercase tracking-[0.08em]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={path("/")} className="text-white/55 transition-colors hover:text-[#EDEDED]">
                    {cs.home}
                  </Link>
                </li>
                <li aria-hidden className="text-white/25">/</li>
                <li>
                  <Link href={path("/works")} className="text-white/55 transition-colors hover:text-[#EDEDED]">
                    {cs.work}
                  </Link>
                </li>
                <li aria-hidden className="text-white/25">/</li>
                <li aria-current="page" className="text-white/75">
                  {work.title}
                </li>
              </ol>
            </nav>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <h1
                data-hero
                className="max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)] font-[450] leading-[0.92] tracking-[-0.06em]"
              >
                {work.title}
              </h1>
              <div data-hero className="flex flex-wrap items-center gap-2 pb-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-black/40 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/70 backdrop-blur-md">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#C6FF00]" />
                  {work.subtitle}
                </span>
                {work.year ? (
                  <span className="rounded-full border border-white/[0.14] bg-black/40 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/50 backdrop-blur-md">
                    {work.year}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div ref={contentRef} className="relative">
        <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
          {/* Overview */}
          <section className="grid gap-12 border-b border-white/[0.07] px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:py-28">
            <div>
              <Label index="01">{cs.overview}</Label>
              {work.description ? (
                <p
                  data-reveal
                  className="mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] font-[450] leading-[1.22] tracking-[-0.035em] text-[#EDEDED]"
                >
                  {work.description}
                </p>
              ) : null}
            </div>

            <dl data-reveal className="m-0 self-end border-t border-white/[0.08]">
              {work.year ? <MetaRow label={cs.year}>{work.year}</MetaRow> : null}
              <MetaRow label={cs.discipline}>{work.subtitle}</MetaRow>
              {work.technologies?.length ? (
                <MetaRow label={cs.stack}>
                  <ul className="flex flex-wrap gap-1.5">
                    {work.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-white/55"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </MetaRow>
              ) : null}
              {links.length ? (
                <MetaRow label={cs.links}>
                  <ul className="flex flex-col gap-2">
                    {links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/l inline-flex items-center gap-1.5 text-[#EDEDED] underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-[#C6FF00]"
                        >
                          {l.label}
                          <ArrowUpRight
                            size={10}
                            className="text-white/55 transition-transform duration-200 group-hover/l:-translate-y-px group-hover/l:translate-x-px"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </MetaRow>
              ) : null}
            </dl>
          </section>

          {/* Desafío / Solución / Proceso */}
          {chapters.length ? (
            <ol className="border-b border-white/[0.07]">
              {chapters.map((b, i) => (
                <li
                  key={b.label}
                  className={`grid lg:grid-cols-2 ${i > 0 ? "border-t border-white/[0.07]" : ""}`}
                >
                  <div className="px-5 pb-6 pt-16 sm:px-8 lg:border-r lg:border-white/[0.07] lg:px-10 lg:py-24">
                    <div className="lg:sticky lg:top-32">
                      <Label index={nextIndex()}>{pad(i + 1)} / {pad(chapters.length)}</Label>
                      <h2
                        data-reveal
                        className="mt-5 text-[clamp(2rem,3.4vw,3rem)] font-[450] leading-[1.02] tracking-[-0.05em] text-[#EDEDED]"
                      >
                        {b.label}
                      </h2>
                    </div>
                  </div>
                  <p
                    data-reveal
                    className="m-0 max-w-[60ch] px-5 pb-16 text-[17px] leading-[1.7] text-white/60 sm:px-8 lg:px-10 lg:py-24 lg:text-[18px]"
                  >
                    {b.body}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}

          {/* Galería */}
          {gallery.length || pairImages.length ? (
            <section className="border-b border-white/[0.07] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
              <Label index={nextIndex()}>{cs.gallery}</Label>
              <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2">
                {gallery.map((src, i) => {
                  const wide = i % 3 === 0 || (i % 3 === 1 && i === gallery.length - 1);
                  return (
                    <figure
                      key={src}
                      data-reveal
                      className={`relative m-0 aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] ${
                        wide ? "lg:col-span-2" : ""
                      }`}
                    >
                      <div data-parallax className="absolute inset-x-0 -inset-y-[6%] will-change-transform">
                        <Image
                          src={src}
                          alt={`${work.title} - ${work.subtitle}, ${cs.screenWord} ${i + 1}`}
                          fill
                          quality={95}
                          sizes={wide ? "(max-width: 1440px) 100vw, 1320px" : "(max-width: 1023px) 100vw, 660px"}
                          className="object-cover"
                        />
                      </div>
                      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
                      <figcaption className="absolute left-4 top-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/50 mix-blend-difference">
                        {pad(i + 1)} / {pad(gallery.length)}
                      </figcaption>
                    </figure>
                  );
                })}

                {pairImages.map((src, i) => (
                  <figure
                    key={src}
                    data-reveal
                    className="relative m-0 flex items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#050505] p-6 sm:p-10"
                  >
                    <Image
                      src={src}
                      alt={`${work.title} - ${work.subtitle}, ${cs.screenWord} ${gallery.length + i + 1}`}
                      width={2400}
                      height={1600}
                      quality={95}
                      sizes="(max-width: 1023px) 100vw, 660px"
                      className="h-auto w-full max-w-[520px] object-contain"
                    />
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {/* Funcionalidades */}
          {work.features?.length ? (
            <section className="border-b border-white/[0.07]">
              <div className="px-5 pb-10 pt-20 sm:px-8 lg:px-10 lg:pb-12 lg:pt-28">
                <Label index={nextIndex()}>{cs.keyFeatures}</Label>
              </div>
              <ul className="grid sm:grid-cols-2">
                {work.features.map((f, i) => (
                  <li
                    key={f}
                    data-reveal
                    className="group/f relative flex items-baseline gap-5 border-t border-white/[0.07] px-5 py-6 transition-colors duration-300 hover:bg-white/[0.02] sm:px-8 sm:odd:border-r lg:px-10 lg:py-8"
                  >
                    <span className="font-mono text-[11px] text-white/30 transition-colors duration-300 group-hover/f:text-[#C6FF00]">
                      {pad(i + 1)}
                    </span>
                    <span className="text-[clamp(1.05rem,1.5vw,1.3rem)] tracking-[-0.025em] text-white/80">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Resultado */}
          {work.result ? (
            <section className="relative isolate overflow-hidden border-b border-white/[0.07] px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_80%_at_30%_50%,black,transparent_75%)]"
              />
              <Label index={nextIndex()}>{cs.theResult}</Label>
              <p
                data-reveal
                className="mt-6 max-w-[34ch] text-[clamp(1.6rem,3vw,2.6rem)] font-[450] leading-[1.18] tracking-[-0.04em]"
              >
                {work.result}
              </p>
              {links.length ? (
                <div data-reveal className="mt-10 flex flex-wrap gap-2.5 sm:gap-3">
                  {links.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        i === 0
                          ? "group/cta inline-flex h-11 items-center gap-2 rounded-full bg-[#EDEDED] pl-5 pr-4 text-[15px] font-medium text-black transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00]"
                          : "group/cta inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.02] px-5 text-[15px] font-medium text-[#EDEDED] transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00]"
                      }
                    >
                      {l.label}
                      <ArrowUpRight
                        size={11}
                        className={`transition-transform duration-200 group-hover/cta:-translate-y-px group-hover/cta:translate-x-px ${i === 0 ? "" : "text-white/55"}`}
                      />
                    </a>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {faq.length ? (
            <section className="grid gap-10 border-b border-white/[0.07] px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20 lg:px-10 lg:py-28">
              <Label index={nextIndex()}>{cs.faq}</Label>
              <div data-reveal>
                <FaqList items={faq} />
              </div>
            </section>
          ) : null}

          {articles.length ? (
            <section className="grid gap-10 border-b border-white/[0.07] px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20 lg:px-10 lg:py-28">
              <Label index={nextIndex()}>{cs.relatedArticles}</Label>
              <ul data-reveal className="border-t border-white/[0.08]">
                {articles.map((article) => (
                  <li key={article.href} className="border-b border-white/[0.08]">
                    <a href={article.href} className="group/article flex items-start justify-between gap-6 py-6">
                      <span>
                        <span className="block text-[clamp(1.15rem,1.6vw,1.4rem)] font-[450] leading-[1.25] tracking-[-0.03em] text-[#EDEDED]">
                          {article.title}
                        </span>
                        <span className="mt-2 line-clamp-2 block max-w-[60ch] text-[15px] leading-[1.6] text-white/50">{article.excerpt}</span>
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="mt-2 shrink-0 text-white/55 transition-colors group-hover/article:text-[#C6FF00]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Próximo proyecto */}
          <Link
            href={path(`/cases/${next.slug}`)}
            onClick={(e) => {
              // Deja pasar cmd/ctrl/shift-click y el boton del medio al navegador.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              goNext();
            }}
            onPointerEnter={() => prefetchCase(next.slug)}
            aria-label={`${cs.nextProject}: ${next.title} - ${next.subtitle}`}
            className="group/next grid gap-8 px-5 py-16 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C6FF00] sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-16 lg:px-10 lg:py-24"
          >
            <div className="flex flex-col gap-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
                <span aria-hidden className="text-white/25">[→]</span> {cs.nextProject}
              </p>
              <div>
                <p className="text-[clamp(2.5rem,6vw,5.5rem)] font-[450] leading-[0.95] tracking-[-0.06em] transition-colors duration-300 group-hover/next:text-white">
                  {next.title}
                </p>
                <p className="mt-3 text-[15px] text-white/50">{next.subtitle}</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover/next:translate-x-1 group-hover/next:border-[#EDEDED] group-hover/next:bg-[#EDEDED] group-hover/next:text-black">
                <ArrowRight />
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <Image
                ref={nextImgRef}
                src={next.image}
                alt={`${next.title} - ${next.subtitle}`}
                fill
                sizes="(max-width: 1023px) 100vw, 760px"
                className="object-cover opacity-70 transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/next:scale-[1.035] group-hover/next:opacity-100"
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
            </div>
          </Link>

          <div className="flex justify-center border-t border-white/[0.07] py-6">
            <Link
              href={path("/works")}
              className="group/all inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white/55 transition-colors hover:text-[#EDEDED]"
            >
              {cs.allWork}
              <ArrowRight size={12} className="transition-transform duration-200 group-hover/all:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cs-hero-img { object-fit: cover; }
        @media ${PORTRAIT} {
          .cs-hero-img { object-fit: contain; }
          /* Hero compacto: la imagen entera al ancho y el título debajo, sin relleno alrededor. */
          .cs-hero { height: auto !important; background: #000; }
          .cs-hero-media {
            position: relative !important;
            inset: auto !important;
            height: auto !important;
            aspect-ratio: ${PORTRAIT_HERO_RATIO};
            margin-top: ${PORTRAIT_HERO_TOP}px;
            overflow: hidden;
            background: #000;
            transform: none !important;
          }
          .cs-hero-shade { display: none; }
          .cs-hero-text { position: relative !important; }
          .cs-hero-text > div { padding-top: 1.75rem; }
        }
      `}</style>
    </div>
  );
}
