"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Arrow from "./Arrow";
import ClosingCta from "./landing/ClosingCta";
import { useNavTone } from "./landing/useNavTone";
import "./landing/landing.css";
import "./case/case.css";
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
  startCaseTransition,
} from "./caseTransition";
import type { WorkItem } from "../data/works";
import { HERO_QUALITY, HERO_SIZES, heroImageSet } from "../lib/optimizedImage";
import { localizeWork } from "../lib/localizeWork";
import { useLanguage } from "../lib/i18n";
import { getUiText, type UiText } from "../lib/uiText";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};

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

export default function CaseStudy({ work: rawWork, next: rawNext }: { work: WorkItem; next: WorkItem }) {
  const router = useRouter();
  const lenis = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [portrait, setPortrait] = useState(false);
  const { lang, path } = useLanguage();
  const t = getUiText(lang);
  const work = localizeWork(rawWork, lang);
  const next = localizeWork(rawNext, lang);

  // Sobre el hero el nav queda blanco; desde el contenido pasa a tinta sobre papel.
  useNavTone(contentRef, "#0b0b0a", "#ffffff");
  // En vertical el hero es compacto y queda sobre papel: el nav también va en tinta.
  useNavTone(heroRef, portrait ? "#0b0b0a" : "#ffffff", portrait ? "#ffffff" : "transparent");

  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT);
    const sync = () => setPortrait(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

    const ctx = gsap.context(() => {
      // Hero: título + meta entran (el overlay de transición ya reveló la imagen)
      gsap.from("[data-hero]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: entryDelay,
      });

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

      // Reveal escalonado de bloques de texto
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 46,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Parallax sutil en las imágenes de galería
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el, i) => {
        gsap.fromTo(
          el,
          // El wrapper sobra 16% arriba y abajo: el recorrido se queda dentro.
          { yPercent: i % 2 === 0 ? 8 : 12 },
          {
            yPercent: i % 2 === 0 ? -8 : -12,
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

      // Marquee infinito del stack
      const track = document.querySelector<HTMLElement>("[data-marquee]");
      if (track) {
        gsap.to(track, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
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

  const chapters = [
    { label: t.caseStudy.challenge, body: work.task },
    { label: t.caseStudy.solution, body: work.solutions },
    { label: t.caseStudy.process, body: work.process },
  ].filter((c) => c.body);
  // Rótulos numerados como en la landing: (01) Resumen, (02) El Desafío…
  let n = 0;
  const num = () => `(${String(++n).padStart(2, "0")})`;
  const overviewN = num();
  const chapterNs = chapters.map(() => num());
  const featuresN = work.features?.length ? num() : "";
  const resultN = work.result ? num() : "";
  const shotClass = (i: number) => (i % 3 === 0 ? "cs-shot-full" : i % 3 === 1 ? "cs-shot-l" : "cs-shot-r");

  return (
    <div ref={rootRef} className="ln cs">
      <Navbar visible view="list" setView={noop} showToggle={false} />

      {/* ───────── Hero fullscreen (match con el final del morph) ───────── */}
      <section ref={heroRef} className="cs-hero">
        {/* El box mide 120vh centrado: el overlay del morph aterriza en este mismo encuadre. */}
        <div
          ref={heroImgRef}
          className="cs-hero-media"
          style={{ position: "absolute", inset: `${(-HERO_OVERSCAN / 2) * 100}% 0`, zIndex: 0, willChange: "transform" }}
        >
          <Image
            className="cs-hero-img"
            src={work.image}
            alt={`${work.title} - ${work.subtitle} ${t.caseStudy.caseByline}`}
            fill
            priority
            fetchPriority="high"
            quality={HERO_QUALITY}
            sizes={HERO_SIZES}
            style={{ display: "block", zIndex: 1 }}
          />
        </div>
        <div className="cs-hero-shade" />
        <div className="cs-hero-text">
          {/* Breadcrumb visible que refleja el BreadcrumbList del JSON-LD. */}
          <nav data-hero className="cs-crumbs" aria-label={t.caseStudy.breadcrumb}>
            <ol>
              <li>
                <Link href={path("/")}>{t.caseStudy.home}</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={path("/works")}>{t.nav.work}</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{work.title}</li>
            </ol>
          </nav>
          {/* El H1 lleva el nombre y qué es el producto: es la frase que la gente busca. */}
          <h1 data-hero className="cs-h1">
            {work.title}
            {work.seoTitle && <> <span className="cs-h1-sub">{work.seoTitle}</span></>}
          </h1>
          <div data-hero className="cs-hero-foot">
            <span>{work.subtitle}</span>
            {work.year && (
              <span>
                {t.caseStudy.year} <b>{work.year}</b>
              </span>
            )}
            <span>{t.caseStudy.scroll}</span>
          </div>
        </div>
      </section>

      <div ref={contentRef}>
        {/* ───────── Resumen + datos ───────── */}
        <section className="lx-sec">
          <div className="cs-grid">
            <span className="lx-label" data-reveal>
              {overviewN} {t.caseStudy.overview}
            </span>
            {work.description && (
              <p className="cs-lead" data-reveal>
                {work.description}
              </p>
            )}
            <dl className="cs-facts" data-reveal>
              <div className="cs-fact">
                <dt>{t.caseStudy.discipline}</dt>
                <dd>{work.subtitle}</dd>
              </div>
              {work.year && (
                <div className="cs-fact">
                  <dt>{t.caseStudy.year}</dt>
                  <dd>{work.year}</dd>
                </div>
              )}
              {work.technologies && work.technologies.length > 0 && (
                <div className="cs-fact">
                  <dt>{t.caseStudy.stack}</dt>
                  <dd>{work.technologies.slice(0, 5).join(", ")}</dd>
                </div>
              )}
              {links.length > 0 && (
                <div className="cs-fact">
                  <dt>{t.caseStudy.visit}</dt>
                  <dd className="cs-fact-links">
                    {links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lx-ul">
                        {l.label}
                        <Arrow />
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        {/* ───────── Desafío / Solución / Proceso ───────── */}
        {chapters.length > 0 && (
          <section className="lx-sec cs-chapters">
            {chapters.map((c, i) => (
              <div key={c.label} className="cs-chapter" data-reveal>
                <span className="cs-chapter-n">{chapterNs[i]}</span>
                <h2 className="cs-chapter-t">{c.label}</h2>
                <p className="cs-chapter-b">{c.body}</p>
              </div>
            ))}
          </section>
        )}

        {/* ───────── Galería con parallax ───────── */}
        {(gallery.length > 0 || pairImages.length > 0) && (
          <section className="lx-sec cs-gallery">
            {gallery.map((src, i) => (
              <figure key={src} className={`cs-shot ${shotClass(i)}`}>
                {/* El sobreancho vertical vive en el wrapper: la Image con fill
                    no admite height propio y el transform va sobre el div. */}
                <div data-parallax className="cs-shot-par">
                  <Image
                    src={src}
                    alt={`${work.title} - ${work.subtitle}, ${t.caseStudy.screenWord} ${i + 1}`}
                    fill
                    quality={95}
                    sizes={i % 3 === 0 ? "100vw" : "(max-width: 899px) 100vw, 60vw"}
                  />
                </div>
              </figure>
            ))}
            {pairImages.length > 0 && (
              <div className="cs-pair">
                {pairImages.map((src, i) => (
                  <figure key={src}>
                    <Image
                      src={src}
                      alt={`${work.title} - ${work.subtitle}, ${t.caseStudy.screenWord} ${i + 1}`}
                      width={2400}
                      height={1600}
                      quality={95}
                      sizes="(max-width: 899px) 100vw, 520px"
                    />
                  </figure>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ───────── Funcionalidades ───────── */}
        {work.features && work.features.length > 0 && (
          <section className="lx-sec">
            <div className="cs-grid">
              <div className="lx-label" data-reveal>
                {featuresN} <h2 className="cs-label-h">{t.caseStudy.keyFeatures}</h2>
              </div>
              <ol className="cs-feats">
                {work.features.map((f, i) => (
                  <li key={f} className="cs-feat" data-reveal>
                    <span className="cs-feat-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="cs-feat-t">{f}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ───────── Resultado ───────── */}
        {work.result && (
          <section className="lx-sec">
            <div className="cs-grid">
              <div className="lx-label" data-reveal>
                {resultN} <h2 className="cs-label-h">{t.caseStudy.theResult}</h2>
              </div>
              <p className="cs-result" data-reveal>
                {work.result}
              </p>
              {links.length > 0 && (
                <div className="cs-links" data-reveal>
                  {links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lx-ul">
                      {l.label}
                      <Arrow />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ───────── Stack en marquee ───────── */}
        {work.technologies && work.technologies.length > 0 && (
          <div className="cs-marquee" aria-hidden>
            <div data-marquee className="cs-marquee-track">
              {[...work.technologies, ...work.technologies, ...work.technologies, ...work.technologies].map((tech, i) => (
                <span key={i} className="cs-marquee-item">
                  {tech}
                  <i className="cs-marquee-dot" />
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ───────── Próximo caso ───────── */}
        <section className="lx-sec">
          <Link
            href={path(`/cases/${next.slug}`)}
            onClick={(e) => {
              // Deja pasar cmd/ctrl/shift-click y el boton del medio al navegador.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              goNext();
            }}
            className="cs-next"
            aria-label={`${t.caseStudy.nextProject}: ${next.title} - ${next.subtitle}`}
          >
            <span className="cs-next-head">
              <span className="lx-label">{t.caseStudy.nextProject}</span>
              <span className="lx-label cs-next-name">
                {next.title}
                <Arrow />
              </span>
            </span>
            <span className="cs-next-img">
              <Image ref={nextImgRef} src={next.image} alt={`${next.title} - ${next.subtitle}`} fill sizes="100vw" />
            </span>
          </Link>
        </section>
      </div>

      <ClosingCta />

      <style>{`
        @media ${PORTRAIT} {
          .cs-hero-img { object-fit: contain; }
          /* Hero compacto: la imagen entera al ancho y el título debajo, sin relleno alrededor. */
          .cs-hero { height: auto; background: var(--paper); }
          .cs-hero-media {
            position: relative !important;
            inset: auto !important;
            height: auto !important;
            aspect-ratio: ${PORTRAIT_HERO_RATIO};
            margin-top: ${PORTRAIT_HERO_TOP}px;
            overflow: hidden;
            background: var(--paper);
            transform: none !important;
          }
          .cs-hero-shade { display: none; }
          .cs-hero-text { position: relative; padding-top: 1.75rem; color: var(--ink); }
          .cs-crumbs ol { color: rgba(11, 11, 10, 0.5); }
          .cs-crumbs a:hover, .cs-crumbs [aria-current] { color: var(--ink); }
          .cs-hero-foot { color: rgba(11, 11, 10, 0.6); border-top-color: rgba(11, 11, 10, 0.18); }
          .cs-hero-foot b { color: var(--ink); }
        }
      `}</style>
    </div>
  );
}
