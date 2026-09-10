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
  consumeCaseEntryDelay,
  markCaseHeroReady,
  startCaseTransition,
} from "./caseTransition";
import type { WorkItem } from "../data/works";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C6FF00";
const noop = () => {};

function ExternalLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function platforms(links?: WorkItem["links"]) {
  if (!links) return [];
  const out: { label: string; href: string }[] = [];
  if (links.web) out.push({ label: "Live site", href: links.web });
  if (links.ios) out.push({ label: "iOS App", href: links.ios });
  if (links.android) out.push({ label: "Android App", href: links.android });
  if (links.behance) out.push({ label: "Behance", href: links.behance });
  if (links.other) out.push({ label: links.other.label, href: links.other.url });
  return out;
}

export default function CaseStudy({ work, next }: { work: WorkItem; next: WorkItem }) {
  const router = useRouter();
  const lenis = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);

  const links = platforms(work.links);
  const pairImages =
    work.slug === "nuddo"
      ? (work.images ?? []).filter((src) => src.endsWith(".png"))
      : [];
  // El hero ya muestra work.image a pantalla completa: repetirla como primera
  // pieza de la galeria la descargaba dos veces en los 11 casos.
  const gallery = (work.images ?? []).filter(
    (src) => src !== work.image && !pairImages.includes(src)
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

    // Precarga la imagen cruda del próximo caso: es la que usa el overlay.
    const preload = new window.Image();
    preload.src = next.image;

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

      // Líneas lima de las features crecen al entrar
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
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
      router.push(`/cases/${next.slug}`);
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
    <div ref={rootRef} style={{ background: "#000", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />
      <Navbar visible view="list" setView={noop} showToggle={false} />

      {/* ───────── Hero fullscreen (match con el final del morph) ───────── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* El box mide 120vh centrado: el overlay del morph aterriza en este mismo encuadre. */}
        <div
          ref={heroImgRef}
          style={{
            position: "absolute",
            inset: `${(-HERO_OVERSCAN / 2) * 100}% 0`,
            zIndex: 0,
            willChange: "transform",
          }}
        >
          <Image
            src={work.image}
            alt={`${work.title} — ${work.subtitle} case study by Nuba Studio`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", display: "block" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            padding: "0 6vw 6vh",
          }}
        >
          {/* Breadcrumb visible que refleja el BreadcrumbList del JSON-LD. */}
          <nav
            data-hero
            aria-label="Breadcrumb"
            style={{ marginBottom: "1rem", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            <ol style={{ display: "flex", alignItems: "center", gap: "0.55rem", listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li aria-hidden style={{ color: "rgba(255,255,255,0.28)" }}>/</li>
              <li aria-current="page" style={{ color: "rgba(255,255,255,0.72)" }}>
                {work.title}
              </li>
            </ol>
          </nav>

          <div data-hero style={{ display: "flex", alignItems: "center", marginBottom: "1.4rem" }}>
            <span style={{ textTransform: "uppercase", letterSpacing: "0.22em", fontSize: "0.72rem", color: ACCENT }}>
              {work.subtitle}
            </span>
          </div>
          <h1
            data-hero
            style={{
              fontSize: "clamp(3rem, 11vw, 11rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              fontWeight: 600,
              margin: 0,
            }}
          >
            {work.title}
          </h1>
        </div>
        <div
          data-hero
          style={{
            position: "absolute",
            right: "6vw",
            bottom: "6vh",
            zIndex: 2,
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          scroll
        </div>
      </section>

      {/* ───────── Intro / overview ───────── */}
      <section style={{ padding: "clamp(5rem, 12vw, 11rem) 6vw", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "minmax(0, 1fr)" }} className="cs-intro-grid">
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignSelf: "start" }}>
            {(work.technologies ?? []).slice(0, 4).map((t) => (
              <span
                key={t}
                style={{
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: 999,
                  padding: "0.35rem 0.9rem",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.7)",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <p
            data-reveal
            style={{
              fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
              lineHeight: 1.28,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.92)",
              margin: 0,
            }}
          >
            {work.description}
          </p>
        </div>
      </section>

      {/* ───────── Challenge / Solution / Process (sticky bicolumna) ───────── */}
      {[
        { label: "The Challenge", body: work.task },
        { label: "The Solution", body: work.solutions },
        { label: "The Process", body: work.process },
      ]
        .filter((b) => b.body)
        .map((b) => (
          <section
            key={b.label}
            style={{ padding: "0 6vw clamp(4rem, 9vw, 8rem)", maxWidth: 1400, margin: "0 auto" }}
          >
            <div className="cs-two-col" style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "1fr" }}>
              <div>
                <h2
                  data-reveal
                  style={{
                    position: "sticky",
                    top: "18vh",
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  <span style={{ color: ACCENT }}>—</span> {b.label}
                </h2>
              </div>
              <p
                data-reveal
                style={{
                  fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.62)",
                  margin: 0,
                  maxWidth: 720,
                }}
              >
                {b.body}
              </p>
            </div>
          </section>
        ))}

      {/* ───────── Galería con parallax alternado ───────── */}
      {(gallery.length > 0 || pairImages.length > 0) && (
        <section style={{ padding: "clamp(2rem, 6vw, 5rem) 6vw", display: "flex", flexDirection: "column", gap: "clamp(4rem, 9vw, 8rem)" }}>
          {gallery.length > 0 &&
            gallery.map((src, i) => (
              <figure
                key={src}
                style={{
                  margin: 0,
                  overflow: "hidden",
                  borderRadius: 16,
                  alignSelf: i % 3 === 0 ? "stretch" : i % 3 === 1 ? "flex-end" : "flex-start",
                  width: i % 3 === 0 ? "100%" : "min(78%, 1000px)",
                  aspectRatio: "16 / 10",
                  position: "relative",
                }}
              >
                {/* El sobreancho vertical vive en el wrapper: la Image con fill
                    no admite height propio y el transform va sobre el div. */}
                <div
                  data-parallax
                  style={{ position: "absolute", inset: "-16% 0", willChange: "transform" }}
                >
                  <Image
                    src={src}
                    alt={`${work.title} — ${work.subtitle}, screen ${i + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 1000px"
                    style={{ objectFit: "cover", display: "block" }}
                  />
                </div>
              </figure>
            ))}

          {pairImages.length > 0 && (
            <div className="cs-pair-row">
              {pairImages.map((src, i) => (
                <figure key={src} className="cs-pair-figure">
                  <Image
                    src={src}
                    alt={`${work.title} — ${work.subtitle}, screen ${i + 1}`}
                    width={2400}
                    height={1600}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ───────── Features numeradas ───────── */}
      {work.features && work.features.length > 0 && (
        <section style={{ padding: "clamp(4rem, 10vw, 9rem) 6vw", maxWidth: 1200, margin: "0 auto" }}>
          <h2 data-reveal style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "2.5rem" }}>
            Key features
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {work.features.map((f, i) => (
              <li key={f} data-reveal style={{ padding: "1.4rem 0", position: "relative" }}>
                <div data-line style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.12)" }} />
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
                  <span style={{ color: ACCENT, fontSize: "0.8rem", fontVariantNumeric: "tabular-nums", minWidth: "2rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)", letterSpacing: "-0.02em" }}>{f}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ───────── Result ───────── */}
      {work.result && (
        <section style={{ padding: "clamp(4rem, 9vw, 8rem) 6vw", maxWidth: 1100, margin: "0 auto" }}>
          <h2 data-reveal style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, marginBottom: "1.6rem" }}>
            The Result
          </h2>
          <p data-reveal style={{ fontSize: "clamp(1.3rem, 2.8vw, 2.2rem)", lineHeight: 1.4, letterSpacing: "-0.02em", margin: 0 }}>
            {work.result}
          </p>
          {links.length > 0 && (
            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.8rem" }}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.85rem 1.6rem",
                    borderRadius: 999,
                    background: ACCENT,
                    color: "#000",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ───────── Marquee del stack ───────── */}
      {work.technologies && work.technologies.length > 0 && (
        <section style={{ padding: "clamp(3rem, 7vw, 6rem) 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
          <div data-marquee style={{ display: "flex", width: "max-content", gap: "3rem", whiteSpace: "nowrap" }}>
            {[...work.technologies, ...work.technologies, ...work.technologies, ...work.technologies].map((t, i) => (
              <span key={i} style={{ fontSize: "clamp(1.4rem, 3vw, 2.6rem)", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.5)", display: "inline-flex", alignItems: "center", gap: "3rem" }}>
                {t}
                <span style={{ color: ACCENT, fontSize: "0.9em" }}>✦</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ───────── Next case ───────── */}
      <Link
        href={`/cases/${next.slug}`}
        onClick={(e) => {
          // Deja pasar cmd/ctrl/shift-click y el boton del medio al navegador.
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          goNext();
        }}
        style={{ position: "relative", height: "70vh", overflow: "hidden", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "inherit" }}
        className="cs-next"
        aria-label={`Next project: ${next.title} — ${next.subtitle}`}
      >
        <Image
          ref={nextImgRef}
          src={next.image}
          alt={`${next.title} — ${next.subtitle}`}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.35, transition: "opacity 0.5s ease, transform 0.8s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={{ textTransform: "uppercase", letterSpacing: "0.25em", fontSize: "0.72rem", color: ACCENT, marginBottom: "1rem" }}>
            Next project
          </div>
          <div style={{ fontSize: "clamp(2.6rem, 9vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.04em", fontWeight: 600 }}>
            {next.title}
          </div>
        </div>
      </Link>

      <style>{`
        .cs-pair-row {
          display: flex;
          gap: clamp(1rem, 2.5vw, 2rem);
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cs-pair-figure {
          margin: 0;
          flex: 1 1 calc(50% - 1rem);
          max-width: 520px;
          min-width: 0;
          border-radius: 16;
          overflow: hidden;
        }
        .cs-pair-figure img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }
        @media (min-width: 900px) {
          .cs-intro-grid { grid-template-columns: 280px 1fr !important; gap: 5rem !important; }
          .cs-two-col { grid-template-columns: 1fr 1fr !important; gap: 5rem !important; }
        }
        @media (max-width: 699px) {
          .cs-pair-row {
            flex-direction: column;
            align-items: center;
            max-width: 100%;
          }
          .cs-pair-row figure,
          .cs-pair-figure {
            flex: 1 1 100%;
            max-width: min(520px, 100%) !important;
            width: 100%;
          }
        }
        .cs-cta { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease; }
        .cs-cta:hover { transform: translateY(-3px); background: #d4ff33; }
        .cs-next:hover img { opacity: 0.6 !important; transform: scale(1.04); }
      `}</style>
    </div>
  );
}
