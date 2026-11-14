"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useLenis } from "./SmoothScroll";
import { visibleWorks } from "../data/works";
import { localizeWork } from "../lib/localizeWork";
import { useLanguage } from "../lib/i18n";
import { getUiText } from "../lib/uiText";
import { NUBA_MARK_PATH } from "./NubaMark";
import { ArrowRight } from "./icons";
import type { HeroLight, LightTarget } from "./heroLight";

type Sky = { outer: string; mid: string; core: string; edge: string; rim: string };

const SKIES: Sky[] = [
  {
    outer: "radial-gradient(circle, rgba(198,255,0,0.07) 0%, rgba(198,255,0,0.025) 35%, transparent 62%)",
    mid: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.07) 38%, transparent 68%)",
    core: "radial-gradient(circle, #fff 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.15) 55%, transparent 72%)",
    edge: "rgba(255,255,255,0.22)",
    rim: "rgba(255,255,255,0.95)",
  },
  {
    outer: "radial-gradient(circle, rgba(170,120,255,0.11) 0%, rgba(140,150,255,0.05) 30%, rgba(120,200,255,0.035) 45%, transparent 64%)",
    mid: "radial-gradient(circle, rgba(255,150,100,0.3) 0%, rgba(220,120,190,0.12) 30%, rgba(150,130,255,0.07) 46%, rgba(120,200,255,0.04) 58%, transparent 70%)",
    core: "radial-gradient(circle, #fff1dc 0%, rgba(255,184,120,0.85) 26%, rgba(240,120,150,0.3) 46%, rgba(160,130,255,0.16) 60%, transparent 74%)",
    edge: "rgba(255,170,120,0.35)",
    rim: "rgba(255,206,170,0.95)",
  },
  {
    outer: "radial-gradient(circle, rgba(70,90,220,0.12) 0%, rgba(70,90,220,0.04) 35%, transparent 62%)",
    mid: "radial-gradient(circle, rgba(120,150,255,0.26) 0%, rgba(90,120,255,0.07) 38%, transparent 68%)",
    core: "radial-gradient(circle, #e6eeff 0%, rgba(140,165,255,0.75) 28%, rgba(80,100,230,0.2) 55%, transparent 72%)",
    edge: "rgba(150,175,255,0.32)",
    rim: "rgba(176,194,255,0.95)",
  },
  {
    outer: "radial-gradient(circle, rgba(198,255,0,0.14) 0%, rgba(198,255,0,0.045) 35%, transparent 62%)",
    mid: "radial-gradient(circle, rgba(198,255,0,0.32) 0%, rgba(198,255,0,0.08) 38%, transparent 68%)",
    core: "radial-gradient(circle, #f6ffd6 0%, rgba(198,255,0,0.85) 28%, rgba(198,255,0,0.22) 55%, transparent 72%)",
    edge: "rgba(198,255,0,0.4)",
    rim: "rgba(214,255,80,0.95)",
  },
];

const NIGHT = 2;
const REST_INTENSITY = 0.4;

const RIM_CONE = "conic-gradient(from calc(var(--rim-a, 0deg) - 180deg), transparent 0deg 95deg, var(--rim) 180deg, transparent 265deg 360deg)";
const RING_MASK = "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)";
const RING_MASK_WEBKIT = "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";

const STARS = (() => {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: 46 }, () => {
    const x = (rand() * 100).toFixed(1);
    const y = (rand() * 100).toFixed(1);
    const a = (0.25 + rand() * 0.6).toFixed(2);
    const r = rand() > 0.85 ? 1.6 : 1;
    return `radial-gradient(${r}px ${r}px at ${x}% ${y}%, rgba(255,255,255,${a}), transparent)`;
  }).join(",");
})();

export default function Hero({ ready }: { ready: boolean }) {
  const { lang, path } = useLanguage();
  const t = getUiText(lang).hero;
  const lenis = useLenis();
  const works = visibleWorks.map((w) => localizeWork(w, lang));

  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<HeroLight | null>(null);
  const glTarget = useRef<LightTarget>({ x: 0, y: -600, hover: 0, intensity: REST_INTENSITY });
  const [sky, setSky] = useState(0);

  useEffect(() => {
    glRef.current?.setPalette(sky);
  }, [sky]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const mark = markRef.current;
    if (!ready || !root || !canvas || !mark) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => {
      import("./heroLight")
        .then(({ createHeroLight }) => {
          if (cancelled) return;
          const light = createHeroLight({
            canvas,
            mark,
            target: glTarget.current,
            palette: sky,
            onLost: () => {
              glRef.current = null;
              delete root.dataset.gl;
            },
          });
          if (!light) return;
          glRef.current = light;
          root.dataset.gl = "on";
        })
        .catch(() => {});
    });

    return () => {
      cancelled = true;
      cancelIdle(handle);
      glRef.current?.destroy();
      glRef.current = null;
      delete root.dataset.gl;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const changeWeather = () => {
    setSky((s) => (s + 1) % SKIES.length);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.timeline({ overwrite: true })
      .to(pressRef.current, { scale: 0.97, duration: 0.18, ease: "power2.out" })
      .to(pressRef.current, { scale: 1, duration: 0.8, ease: "expo.out" });
    gsap.fromTo(flashRef.current, { opacity: 0.85, scale: 0.6 }, { opacity: 0, scale: 1.25, duration: 1.1, ease: "expo.out", overwrite: true });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const lines = root.querySelectorAll<HTMLElement>("[data-line]");

    if (reduce) {
      root.dataset.state = "done";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(glowRef.current, { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 2.2 }, 0)
        .fromTo(
          markRef.current,
          { opacity: 0, y: 28, scale: 0.92, filter: "blur(10px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 },
          0.1
        )
        .fromTo(
          lines,
          { opacity: 0, yPercent: 40, filter: "blur(8px)" },
          { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.09 },
          0.25
        )
        .fromTo(
          reveal,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.05 },
          0.5
        );
      root.dataset.state = "done";
    }, root);

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    const mark = markRef.current;
    const parallax = parallaxRef.current;
    if (!root || !glow || !mark || !parallax) return;
    const content = root.querySelectorAll<HTMLElement>("[data-scroll-out]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const glowX = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power3.out" });

    const light = { a: 0, i: REST_INTENSITY };
    const target = glTarget.current;
    const paint = () => {
      mark.style.setProperty("--rim-a", `${light.a}deg`);
      mark.style.setProperty("--rim-i", light.i.toFixed(3));
      if (!fine) {
        const rad = (light.a * Math.PI) / 180;
        const reach = mark.offsetWidth * 2.2;
        target.x = Math.sin(rad) * reach;
        target.y = -Math.cos(rad) * reach;
        target.intensity = 0.75;
      }
    };
    paint();
    const toAngle = gsap.quickTo(light, "a", { duration: 0.9, ease: "power3.out", onUpdate: paint });
    const toIntensity = gsap.quickTo(light, "i", { duration: 0.7, ease: "power2.out", onUpdate: paint });
    const aim = (deg: number) => toAngle(light.a + ((((deg - light.a) % 360) + 540) % 360) - 180);

    let pointerFrame = 0;
    let px = 0;
    let py = 0;
    const track = () => {
      pointerFrame = 0;
      const r = root.getBoundingClientRect();
      glowX(((px - r.left) / r.width - 0.5) * 70);
      glowY(((py - r.top) / r.height - 0.5) * 50);

      const m = mark.getBoundingClientRect();
      const dx = px - (m.left + m.width / 2);
      const dy = py - (m.top + m.height / 2);
      const dist = Math.hypot(dx, dy);
      const near = 1 - Math.min(Math.max((dist - m.width * 0.5) / (m.width * 3.2), 0), 1);

      if (root.dataset.gl === "on") {
        target.x = dx;
        target.y = dy;
        target.hover = Math.abs(dx) < m.width / 2 && Math.abs(dy) < m.height / 2 ? 1 : 0;
        target.intensity = 0.55 + 0.6 * near;
        return;
      }
      if (dist > 4) aim((Math.atan2(dx, -dy) * 180) / Math.PI);
      toIntensity(REST_INTENSITY + (1 - REST_INTENSITY) * near);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(track);
    };
    const onLeave = () => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      glowX(0);
      glowY(0);
      aim(0);
      toIntensity(REST_INTENSITY);
      target.x = 0;
      target.y = -mark.offsetWidth * 3;
      target.hover = 0;
      target.intensity = REST_INTENSITY + 0.15;
    };

    let orbit: gsap.core.Tween | null = null;
    if (!fine) {
      light.i = 0.6;
      orbit = gsap.to(light, { a: 360, duration: 14, ease: "none", repeat: -1, onUpdate: paint });
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const h = root.offsetHeight || 1;
        const p = Math.min(Math.max(window.scrollY / h, 0), 1);
        gsap.set(parallax, { y: p * h * 0.35, opacity: 1 - p * 1.1 });
        gsap.set(content, { y: p * h * -0.08, opacity: 1 - p * 1.4 });
      });
    };

    if (fine) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      orbit?.kill();
    };
  }, []);

  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("work");
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  const marqueeItems = [...works, ...works];

  return (
    <section
      ref={rootRef}
      data-state="pending"
      aria-label="Nuba Studio"
      className="hero group/hero relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black font-display text-[#EDEDED]"
    >
      <style>{`
        .hero[data-state="pending"] [data-reveal],
        .hero[data-state="pending"] [data-line],
        .hero[data-state="pending"] .hero-glow,
        .hero[data-state="pending"] .hero-mark { opacity: 0; }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_42%,rgba(255,255,255,0.05),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col border-x border-white/[0.07]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent lg:block"
        />

        <div className="relative grid flex-1 grid-cols-1 items-center gap-y-10 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10 lg:px-10 lg:pb-16 lg:pt-24">
          <div
            ref={parallaxRef}
            className="pointer-events-none relative order-first flex justify-center will-change-transform lg:order-none lg:col-start-2 lg:row-start-1"
          >
            <div
              ref={glowRef}
              aria-hidden
              className="hero-glow absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 sm:h-[820px] sm:w-[820px]"
            >
              <div
                className="absolute inset-[12%] rounded-full transition-opacity duration-1000 ease-out motion-reduce:transition-none [mask-image:radial-gradient(circle,black_30%,transparent_70%)]"
                style={{ backgroundImage: STARS, opacity: sky === NIGHT ? 1 : 0 }}
              />
              <div className="hero-css-light absolute inset-0">
              {SKIES.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none"
                  style={{ opacity: sky === i ? 1 : 0 }}
                >
                  <div className="absolute inset-0 rounded-full" style={{ backgroundImage: s.outer }} />
                  <div className="absolute inset-[18%] rounded-full" style={{ backgroundImage: s.mid }} />
                  <div className="absolute inset-[36%] rounded-full blur-xl" style={{ backgroundImage: s.core }} />
                </div>
              ))}
              </div>
              <div
                ref={flashRef}
                className="absolute inset-[30%] rounded-full opacity-0 blur-2xl"
                style={{ backgroundImage: SKIES[sky].core }}
              />
            </div>

            <canvas
              ref={canvasRef}
              aria-hidden
              className="hero-gl pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 sm:h-[820px] sm:w-[820px]"
            />

            <div className="[perspective:900px]">
              <div ref={markRef} className="hero-mark relative h-[132px] w-[132px] sm:h-[176px] sm:w-[176px] lg:h-[212px] lg:w-[212px]">
                <button
                  ref={pressRef}
                  type="button"
                  onClick={changeWeather}
                  aria-label={`${t.weatherAction}: ${t.weather[sky]}`}
                  className="hero-rim group/sky pointer-events-auto relative block h-full w-full cursor-pointer rounded-[22%] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#C6FF00]"
                  style={{ "--rim": SKIES[sky].rim } as React.CSSProperties}
                >
                  <span aria-hidden className="hero-css-light pointer-events-none absolute inset-0">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-[8%] rounded-[28%] blur-[16px] [mask-image:radial-gradient(closest-side,transparent_62%,black_80%)] sm:blur-[22px]"
                    style={{ backgroundImage: RIM_CONE, opacity: "calc(var(--rim-i, 0.4) * 0.85)" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-[6%] rounded-[28%] opacity-0 blur-[18px] transition-opacity duration-500 group-hover/sky:opacity-50 sm:blur-[24px]"
                    style={{ background: "var(--rim)" }}
                  />
                  </span>
                  <svg viewBox="0 0 78 78" className="relative h-full w-full overflow-visible" aria-hidden>
                    <path d={NUBA_MARK_PATH} fillRule="evenodd" clipRule="evenodd" fill="#000" />
                    <path
                      d={NUBA_MARK_PATH}
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="none"
                      stroke={SKIES[sky].edge}
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      className="transition-[stroke] duration-1000"
                    />
                  </svg>
                  <span aria-hidden className="hero-css-light pointer-events-none absolute inset-0">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[21.7%] p-[1.5px]"
                    style={{ backgroundImage: RIM_CONE, opacity: "var(--rim-i, 0.4)", mask: RING_MASK, WebkitMask: RING_MASK_WEBKIT, WebkitMaskComposite: "xor" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[21.7%] p-px opacity-0 transition-opacity duration-500 group-hover/sky:opacity-80"
                    style={{ background: "var(--rim)", mask: RING_MASK, WebkitMask: RING_MASK_WEBKIT, WebkitMaskComposite: "xor" }}
                  />
                  </span>
                </button>
              </div>
            </div>
          </div>

            <div data-scroll-out className="relative z-10 lg:col-start-1 lg:row-start-1">
              <h2 className="text-[clamp(2.6rem,4.3vw,4.5rem)] font-[450] leading-[1] tracking-[-0.055em]">
                {t.titleLines.map((line) => (
                  <span key={line} data-line className="block will-change-transform lg:whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h2>

              <div data-reveal className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  href={path("/contact")}
                  className="group/cta inline-flex h-11 items-center gap-2 rounded-full bg-[#EDEDED] pl-4 pr-3.5 text-[14px] sm:pl-5 sm:pr-4 sm:text-[15px] font-medium text-black transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00]"
                >
                  {t.primaryCta}
                  <ArrowRight className="transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5" />
                </Link>
                <a
                  href="#work"
                  onClick={scrollToWork}
                  className="inline-flex h-11 items-center rounded-full border border-white/[0.14] bg-white/[0.02] px-4 text-[14px] sm:px-5 sm:text-[15px] font-medium text-[#EDEDED] transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00]"
                >
                  {t.secondaryCta}
                </a>
              </div>
            </div>

            <div data-scroll-out className="relative z-10 lg:col-start-3 lg:row-start-1 lg:justify-self-end">
              <ul className="flex flex-col gap-2.5">
                {t.pillars.map((pillar, i) => (
                  <li key={pillar} data-reveal className="flex items-baseline gap-3 text-[15px] text-[#EDEDED] lg:text-base">
                    <span className="font-mono text-[11px] text-white/35">0{i + 1}</span>
                    {pillar}
                  </li>
                ))}
              </ul>
              <p data-reveal className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
                {t.location}
              </p>
            </div>
        </div>

        <div data-reveal className="relative flex h-16 items-center border-t border-white/[0.07] lg:h-20">
          <div className="hidden shrink-0 items-center border-r border-white/[0.07] px-5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/60 sm:flex sm:px-8 lg:px-10">
            <span>{t.status}</span>
          </div>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="hero-marquee-track flex w-max items-center [animation:hero-marquee_45s_linear_infinite] group-hover/hero:[animation-play-state:paused]">
              {marqueeItems.map((work, i) => {
                const dup = i >= works.length;
                return (
                  <Link
                    key={`${work.slug}-${i}`}
                    href={path(`/cases/${work.slug}`)}
                    aria-hidden={dup || undefined}
                    tabIndex={dup ? -1 : undefined}
                    className="px-8 text-[19px] font-medium tracking-[-0.03em] text-white/45 transition-colors duration-200 hover:text-white lg:px-12 lg:text-[22px]"
                  >
                    {work.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
