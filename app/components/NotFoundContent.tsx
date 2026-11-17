"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useLanguage } from "../lib/i18n";
import { getUiText } from "../lib/uiText";
import NubaMark, { NUBA_MARK_PATH } from "./NubaMark";
import { CONTACT, SITE_NAME } from "../lib/seo";

const CloudDodge = dynamic(() => import("./CloudDodge"), { ssr: false });

const CLOUD_PATH = NUBA_MARK_PATH.slice(NUBA_MARK_PATH.lastIndexOf("M26.88"));

const VB = { x: 12, y: 20, w: 53, h: 44 };

const NODES: [number, number][] = [
  [26.88, 60.48],
  [43.68, 60.48],
  [53.415, 57.708],
  [60.2295, 50.2235],
  [62.0791, 40.2719],
  [58.4089, 30.8388],
  [50.32, 24.7541],
  [40.239, 23.8432],
  [31.1904, 28.3795],
  [25.8888, 37.002],
  [18.0563, 40.9477],
  [15.1323, 49.216],
  [18.7428, 57.2085],
];

type NotFoundText = ReturnType<typeof getUiText>["notFound"];

function sitePages(path: (p: string) => string, t: NotFoundText): [string, string][] {
  return [
    [path("/"), t.machineHome],
    [path("/works"), t.works],
    [path("/about"), t.machineAboutPage],
    [path("/services"), t.services],
    [path("/contact"), t.contact],
    [path("/blog"), "Blog"],
  ];
}

function HumanView({ requested, stamp }: { requested: string; stamp: string }) {
  const { lang, path } = useLanguage();
  const t = getUiText(lang).notFound;
  const root = useRef<HTMLDivElement>(null);
  const cloud = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = root.current;
    const svg = cloud.current;
    if (!el || !svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line = svg.querySelector<SVGPathElement>("[data-line]");
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-node]"));
    const guides = Array.from(svg.querySelectorAll<SVGLineElement>("[data-guide]"));
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (reduce) return;
      const len = line?.getTotalLength() ?? 0;
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(nodes, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(guides, { opacity: 0 });
      gsap.set("[data-reveal]", { y: 24, opacity: 0 });
      gsap.set("[data-digit]", { y: 60, opacity: 0 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to("[data-digit]", { y: 0, opacity: 1, duration: 1, stagger: 0.12 })
        .to(line, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.1)
        .to(nodes, { scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, 0.5)
        .to(guides, { opacity: 1, duration: 0.8 }, 1.4)
        .to("[data-reveal]", { y: 0, opacity: 1, duration: 0.8, stagger: 0.09 }, 0.9);

      const qx = nodes.map((n) => gsap.quickTo(n, "x", { duration: 0.6, ease: "power3.out" }));
      const qy = nodes.map((n) => gsap.quickTo(n, "y", { duration: 0.6, ease: "power3.out" }));
      const tilt = {
        x: gsap.quickTo(svg, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(svg, "y", { duration: 0.8, ease: "power3.out" }),
      };

      const onMove = (e: PointerEvent) => {
        const box = svg.getBoundingClientRect();
        const unit = box.width / VB.w;
        tilt.x(((e.clientX / window.innerWidth) - 0.5) * 24);
        tilt.y(((e.clientY / window.innerHeight) - 0.5) * 16);
        NODES.forEach(([nx, ny], i) => {
          const dx = box.left + (nx - VB.x) * unit - e.clientX;
          const dy = box.top + (ny - VB.y) * unit - e.clientY;
          const dist = Math.hypot(dx, dy) || 1;
          const radius = 160;
          const push = Math.max(0, 1 - dist / radius) * 2.2;
          qx[i]((dx / dist) * push);
          qy[i]((dy / dist) * push);
        });
      };
      const onLeave = () => {
        qx.forEach((q) => q(0));
        qy.forEach((q) => q(0));
        tilt.x(0);
        tilt.y(0);
      };
      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      });
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const cards = [
    { href: path("/works"), label: t.works, hint: t.worksHint },
    { href: path("/services"), label: t.services, hint: t.servicesHint },
    { href: path("/contact"), label: t.contact, hint: t.contactHint },
  ];

  const digit = "font-medium leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)]";

  return (
    <div ref={root} className="relative flex flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-28 text-center">
        <div
          className="flex items-center justify-center gap-[0.04em]"
          style={{ fontSize: "clamp(6rem, 24vw, 17rem)" }}
          aria-hidden
        >
          <span data-digit className={digit}>4</span>
          <svg
            ref={cloud}
            viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
            className="w-[1.05em] overflow-visible"
            fill="none"
            style={{ height: "auto" }}
          >
            <line data-guide x1={VB.x} y1="60.48" x2={VB.x + VB.w} y2="60.48" stroke="rgba(255,255,255,0.18)" strokeWidth="0.18" strokeDasharray="1 1" />
            <line data-guide x1="40.239" y1={VB.y} x2="40.239" y2={VB.y + VB.h} stroke="rgba(255,255,255,0.18)" strokeWidth="0.18" strokeDasharray="1 1" />
            <path
              data-line
              d={CLOUD_PATH}
              stroke="var(--accent)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {NODES.map(([cx, cy], i) => (
              <circle
                key={i}
                data-node
                cx={cx}
                cy={cy}
                r="1.3"
                fill="#000"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="0.4"
              />
            ))}
          </svg>
          <span data-digit className={digit}>4</span>
        </div>

        <div className="flex max-w-xl flex-col items-center gap-4">
          <h1 data-reveal className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            {t.heading}
          </h1>
          <p data-reveal className="max-w-[44ch] text-white/55">{t.body}</p>
          <p
            data-reveal
            className="min-h-[2.4em] break-all font-mono text-[11px] leading-relaxed tracking-wide text-white/55"
          >
            {requested && (
              <>
                <span className="text-white/55">{t.requested}</span> {requested}
                <br />
                {stamp}
              </>
            )}
          </p>
        </div>

        <Link
          data-reveal
          href={path("/")}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
        >
          {t.backHome}
        </Link>

        <nav className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              data-reveal
              href={c.href}
              className="group rounded-xl border border-white/10 p-4 text-left transition-colors hover:border-accent/60"
            >
              <span className="flex items-center justify-between text-sm font-medium">
                {c.label}
                <span className="text-white/55 transition-all group-hover:translate-x-1 group-hover:text-accent">→</span>
              </span>
              <span className="mt-1 block text-xs text-white/55">{c.hint}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function MachineView({ requested, stamp }: { requested: string; stamp: string }) {
  const { lang, path } = useLanguage();
  const t = getUiText(lang).notFound;
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-line]", { opacity: 0, x: -8, duration: 0.35, stagger: 0.035, ease: "power1.out" });
    }, el);
    return () => ctx.revert();
  }, []);

  const row = (label: string, value: React.ReactNode) => (
    <div key={label} data-line className="flex gap-3">
      <span className="w-[9.5rem] shrink-0 text-accent/60">{label.toUpperCase().padEnd(14, ".")}</span>
      <span className="min-w-0 break-words">{value}</span>
    </div>
  );
  const rule = (title: string) => (
    <div data-line className="mt-8 flex items-center gap-3 text-accent/60">
      <span>{title}</span>
      <span className="h-px flex-1 bg-accent/30" />
    </div>
  );
  const link = (href: string, label: string, external = false) => (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="underline decoration-accent/40 underline-offset-4 transition-colors hover:bg-accent hover:text-black hover:decoration-transparent"
    >
      {label}
    </a>
  );

  const pages = sitePages(path, t);

  return (
    <div ref={root} className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-6 pb-28 pt-6 font-mono text-[12px] leading-relaxed text-accent sm:text-[13px]">
      <div data-line className="text-[clamp(1.6rem,6vw,3rem)] font-bold leading-none tracking-tight">404 NOT_FOUND</div>
      <div data-line className="mt-4 text-accent/70">{t.machineTitle}</div>
      <p data-line className="mt-3 max-w-[60ch] text-accent/55">{t.machineIntro}</p>

      <div className="mt-6 space-y-1">
        {row(t.requested, requested || "…")}
        {row(t.machineStatus, "404")}
        {row(t.machineTime, stamp || "…")}
      </div>

      {rule(t.machineAbout)}
      <div className="mt-3 space-y-1">
        {row(t.machineName, SITE_NAME)}
        {row(t.machineLocation, `${CONTACT.city}, Argentina`)}
        {row(t.machineServicesLabel, t.machineServices)}
      </div>

      {rule(t.machinePages)}
      <div className="mt-3 space-y-1">
        {pages.map(([href, label]) => row(label, link(href, href)))}
      </div>

      {rule(t.machineLinks)}
      <div className="mt-3 space-y-1">
        {row("WhatsApp", link(CONTACT.whatsapp, CONTACT.whatsapp, true))}
        {row("LinkedIn", link(CONTACT.linkedin, CONTACT.linkedin, true))}
        {row("Instagram", link(CONTACT.instagram, CONTACT.instagramHandle, true))}
        {row(t.machineLlms, link(lang === "en" ? "/llms.txt" : "/es/llms.txt", lang === "en" ? "/llms.txt" : "/es/llms.txt"))}
      </div>
    </div>
  );
}

export default function NotFoundContent() {
  const { lang, path } = useLanguage();
  const t = getUiText(lang).notFound;
  const [mode, setMode] = useState<"human" | "machine">("human");
  const [playing, setPlaying] = useState(false);
  const [requested, setRequested] = useState("");
  const [stamp, setStamp] = useState("");

  useEffect(() => {
    setRequested(window.location.pathname);
    setStamp(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
  }, []);

  const tab = (value: "human" | "machine", label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === value}
      onClick={() => setMode(value)}
      className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
        mode === value ? "bg-accent text-black" : "text-white/55 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <main id="main" tabIndex={-1} className="relative flex outline-none min-h-dvh flex-col overflow-hidden">
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href={path("/")}
          aria-label="Nuba Studio"
          className={`transition-colors hover:text-accent ${mode === "machine" ? "text-accent" : "text-white"}`}
        >
          <NubaMark className="h-7 w-7" />
        </Link>
        <div className="flex items-center gap-5">
          {mode === "human" ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group/play rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-accent/60 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <span aria-hidden className="text-accent">▶</span> {t.game.play}
            </button>
          ) : null}
          <span className={`hidden font-mono text-[11px] tracking-[0.2em] sm:inline ${mode === "machine" ? "text-accent/60" : "text-white/55"}`}>
            {t.errorLabel}
          </span>
        </div>
      </header>

      {mode === "human" && (
        <nav aria-label={t.machineTitle} className="sr-only">
          <p>{t.machineIntro}</p>
          <ul>
            {sitePages(path, t).map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
            <li>
              <a href={lang === "en" ? "/llms.txt" : "/es/llms.txt"}>{t.machineLlms}</a>
            </li>
          </ul>
        </nav>
      )}

      {mode === "human" ? <HumanView requested={requested} stamp={stamp} /> : <MachineView requested={requested} stamp={stamp} />}

      <div
        role="tablist"
        className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-full border border-white/15 bg-black/80 p-1 backdrop-blur"
      >
        {tab("human", t.modeHuman)}
        {tab("machine", t.modeMachine)}
      </div>

      {playing ? <CloudDodge text={t.game} onClose={() => setPlaying(false)} /> : null}
    </main>
  );
}
