"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Grain from "./Grain";
import { useLenis } from "./SmoothScroll";
import { startCaseTransition } from "./caseTransition";
import type { WorkItem } from "../data/works";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C6FF00";
const noop = () => {};

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
  const gallery = (work.images ?? [work.image]).filter((src) => !src.endsWith(".png"));
  const devices = (work.images ?? []).filter((src) => src.endsWith(".png"));

  useEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
    const ctx = gsap.context(() => {
      // Hero: título + meta entran (el overlay de transición ya reveló la imagen)
      gsap.from("[data-hero]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.35,
      });

      // Parallax del hero
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: heroImgRef.current, start: "top top", end: "bottom top", scrub: true },
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
          { yPercent: i % 2 === 0 ? 10 : 16 },
          {
            yPercent: i % 2 === 0 ? -10 : -16,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Marquee infinito del stack
      const track = document.querySelector<HTMLElement>("[data-marquee]");
      if (track) {
        gsap.to(track, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [work.slug, lenis]);

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
      <Navbar visible view="list" setView={noop} showToggle={false} />
      <div style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none", overflow: "hidden" }}>
        <Grain zIndex={60} />
      </div>

      {/* ───────── Hero fullscreen (match con el final del morph) ───────── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div ref={heroImgRef} style={{ position: "absolute", inset: "-10% 0", zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.image}
            alt={work.title}
            fetchPriority="high"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
          <div data-hero style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "1.4rem" }}>
            <span style={{ height: 1, width: 46, background: ACCENT }} />
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

      {/* ───────── Challenge / Solution (sticky bicolumna) ───────── */}
      {[
        { label: "The Challenge", body: work.task },
        { label: "The Solution", body: work.solutions },
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
      {gallery.length > 1 && (
        <section style={{ padding: "clamp(2rem, 6vw, 5rem) 6vw", display: "flex", flexDirection: "column", gap: "clamp(4rem, 9vw, 8rem)" }}>
          {gallery.map((src, i) => (
            <figure
              key={src}
              style={{
                margin: 0,
                overflow: "hidden",
                borderRadius: 16,
                alignSelf: i % 3 === 0 ? "stretch" : i % 3 === 1 ? "flex-end" : "flex-start",
                width: i % 3 === 0 ? "100%" : "min(78%, 1000px)",
                aspectRatio: "16 / 10",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax
                src={src}
                alt={`${work.title} — ${i + 1}`}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "120%", objectFit: "cover", display: "block" }}
              />
            </figure>
          ))}
        </section>
      )}

      {/* ───────── Mockups mobile (device block) ───────── */}
      {devices.length > 0 && (
        <section style={{ padding: "clamp(3rem, 8vw, 7rem) 6vw" }}>
          <div
            style={{
              display: "flex",
              gap: "clamp(1.5rem, 4vw, 4rem)",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            {devices.map((src, i) => (
              <div
                key={src}
                data-reveal
                style={{
                  width: "min(240px, 40vw)",
                  transform: i % 2 === 0 ? "translateY(0)" : "translateY(-6%)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${work.title} mobile ${i + 1}`} loading="lazy" decoding="async" style={{ width: "100%", display: "block" }} />
              </div>
            ))}
          </div>
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
                  {l.label} <span aria-hidden>↗</span>
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
      <section
        onClick={goNext}
        style={{ position: "relative", height: "70vh", overflow: "hidden", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        className="cs-next"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={nextImgRef}
          src={next.image}
          alt={next.title}
          loading="lazy"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, transition: "opacity 0.5s ease, transform 0.8s ease" }}
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
      </section>

      <style>{`
        @media (min-width: 900px) {
          .cs-intro-grid { grid-template-columns: 280px 1fr !important; gap: 5rem !important; }
          .cs-two-col { grid-template-columns: 1fr 1fr !important; gap: 5rem !important; }
        }
        .cs-cta { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease; }
        .cs-cta:hover { transform: translateY(-3px); background: #d4ff33; }
        .cs-next:hover img { opacity: 0.6 !important; transform: scale(1.04); }
      `}</style>
    </div>
  );
}
