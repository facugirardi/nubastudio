"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { getWork } from "../data/works";

gsap.registerPlugin(ScrollTrigger);

const INTRO_TEXT =
  "We design and build digital products end to end, from the first idea to the moment they ship.";

const SERVICES = [
  {
    n: "01",
    title: "Web Development",
    desc: "Sites and platforms that load fast, feel alive and turn visitors into clients.",
    tags: ["Next.js", "React", "CMS", "Motion"],
    cases: ["checkrto", "mes", "provia-consulting"],
    image: "/images/cases/checkrto/check1.webp",
  },
  {
    n: "02",
    title: "Mobile Apps",
    desc: "Native-feeling iOS & Android products people actually want to open.",
    tags: ["React Native", "Expo", "iOS", "Android"],
    cases: ["nuddo", "ushuaia360"],
    image: "/images/cases/nuddo/frame2.webp",
  },
  {
    n: "03",
    title: "Marketplaces & Platforms",
    desc: "Two-sided products with payments, dashboards and infrastructure built to scale.",
    tags: ["Payments", "Dashboards", "Auth", "APIs"],
    cases: ["nubapay", "nuddo", "unickeys"],
    image: "/images/cases/nubapay/m1.webp",
  },
  {
    n: "04",
    title: "Branding & Identity",
    desc: "Visual systems that make you unmistakable across every touchpoint.",
    tags: ["Identity", "Art Direction", "Systems"],
    cases: [],
    image: "/images/cases/kennedys/ken1.webp",
  },
  {
    n: "05",
    title: "Product Strategy & MVP",
    desc: "From raw idea to a shipped MVP, validated, scoped and built to grow.",
    tags: ["Discovery", "Prototyping", "Roadmap"],
    cases: ["nubapay", "unickeys"],
    image: "/images/cases/nuddo/nuddo4.webp",
  },
];

const TECH = [
  "Next.js", "React", "TypeScript", "React Native", "Node", "GSAP",
  "Three.js", "Tailwind", "Figma", "Framer", "Expo", "PostgreSQL",
];

const PROCESS = [
  { n: "01", title: "Discovery", desc: "We dig into your goals, your users and the constraints that shape the work." },
  { n: "02", title: "Design", desc: "From wireframes to polished UI, iterated fast and in the open." },
  { n: "03", title: "Build", desc: "Clean, scalable code shipped in tight loops, no black boxes." },
  { n: "04", title: "Launch & Iterate", desc: "We ship, measure what matters and keep improving after go-live." },
];

const INTRO_WORDS = INTRO_TEXT.split(" ");

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaCellsRef = useRef<HTMLDivElement>(null);

  // Hover dim: al hacer hover en una fila, las demás se dimean
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const rows = Array.from(list.querySelectorAll<HTMLLIElement>(".svc-row"));
    const enters: Array<() => void> = [];

    rows.forEach((row) => {
      const onEnter = () => rows.forEach((r) => r.classList.toggle("is-dim", r !== row));
      const onLeave = () => rows.forEach((r) => r.classList.remove("is-dim"));
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      enters.push(() => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => enters.forEach((fn) => fn());
  }, []);

  // Grid interactivo en el CTA: celdas de color al mover el cursor (igual que About)
  useEffect(() => {
    const section = ctaRef.current;
    const layer = ctaCellsRef.current;
    if (!section || !layer) return;

    const SIZE = 60;
    const COLORS = [
      "#FF2D95", "#00E5FF", "#C6FF00", "#FF6B00", "#B026FF",
      "#FFE600", "#FF1744", "#00E676", "#2979FF", "#E040FB",
    ];
    let last = "";

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / SIZE);
      const row = Math.floor((e.clientY - rect.top) / SIZE);
      const key = `${col}:${row}`;
      if (key === last) return;
      last = key;

      const cell = document.createElement("div");
      cell.className = "svc-grid-cell";
      cell.style.left = col * SIZE + "px";
      cell.style.top = row * SIZE + "px";
      cell.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      layer.appendChild(cell);
      cell.addEventListener("animationend", () => cell.remove());
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  // Reveals de scroll (GSAP ScrollTrigger)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = introRef.current?.querySelectorAll<HTMLSpanElement>(".svc-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { yPercent: 110, autoAlpha: 0, filter: "blur(10px)" },
          {
            yPercent: 0, autoAlpha: 1, filter: "blur(0px)",
            duration: 1, ease: "power4.out", stagger: 0.04,
            scrollTrigger: { trigger: introRef.current, start: "top 80%" },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".svc-step").forEach((step) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .svc {
          background: #000;
          color: #fff;
          padding: 0 2.5rem;
          overflow: hidden;
        }

        /* Intro */
        .svc-intro {
          max-width: 1400px;
          margin: 0 auto;
          padding: 22vh 0 14vh;
        }
        .svc-intro-text {
          font-size: clamp(2rem, 5vw, 5.2rem);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.03em;
          max-width: 20ch;
        }
        .svc-word {
          display: inline-block;
          white-space: nowrap;
          will-change: transform, opacity, filter;
        }
        .svc-intro-text .accent { color: var(--accent, #C6FF00); }

        /* Lista de servicios */
        .svc-list-wrap { max-width: 1400px; margin: 0 auto; padding-bottom: 12vh; }
        .svc-list { list-style: none; border-top: 1px solid rgba(255,255,255,0.14); }
        .svc-row {
          position: relative;
          display: grid;
          grid-template-columns: 5rem minmax(0, 1fr) minmax(0, 0.9fr) 3rem;
          align-items: center;
          gap: 1.5rem;
          padding: 2.4rem 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          cursor: pointer;
          transition: opacity 0.4s ease, padding-left 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .svc-list:hover .svc-row.is-dim { opacity: 0.28; }
        .svc-row:hover { padding-left: 1.6rem; }
        .svc-n {
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          font-variant-numeric: tabular-nums;
          transition: color 0.35s ease;
        }
        .svc-row:hover .svc-n { color: var(--accent, #C6FF00); }
        .svc-title {
          font-size: clamp(1.6rem, 3.4vw, 3.2rem);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.05;
        }
        .svc-desc {
          font-size: 0.98rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.55);
          max-width: 42ch;
        }
        .svc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.9rem;
        }
        .svc-cases {
          margin-top: 1.1rem;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .svc-cases-label {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin-right: 0.2rem;
        }
        .svc-cases-sep { color: rgba(255,255,255,0.25); }
        .svc-case-link {
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          border-bottom: 1px solid #fff;
          padding-bottom: 1px;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .svc-case-link:hover {
          color: var(--accent, #C6FF00);
          border-color: var(--accent, #C6FF00);
        }
        .svc-tag {
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          padding: 0.28rem 0.7rem;
        }
        .svc-arrow {
          justify-self: end;
          color: rgba(255,255,255,0.35);
          transform: translateX(-8px);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, color 0.35s ease;
        }
        .svc-row:hover .svc-arrow { opacity: 1; transform: translateX(0); color: var(--accent, #C6FF00); }

        /* Marquee de tecnologías */
        .svc-tech {
          border-top: 1px solid rgba(255,255,255,0.14);
          border-bottom: 1px solid rgba(255,255,255,0.14);
          margin: 0 -2.5rem;
          padding: 2.2rem 0;
          overflow: hidden;
          display: flex;
        }
        .svc-tech-row {
          display: flex;
          align-items: center;
          gap: 3.5rem;
          width: max-content;
          animation: svc-marquee 30s linear infinite;
          will-change: transform;
        }
        @keyframes svc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .svc-tech-item {
          font-size: clamp(1.4rem, 3vw, 2.6rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 3.5rem;
        }
        .svc-tech-star {
          color: var(--accent, #C6FF00);
          font-size: 0.9em;
        }

        /* Process */
        .svc-process { max-width: 1400px; margin: 0 auto; padding: 14vh 0; }
        .svc-process-head {
          font-size: clamp(1.8rem, 4vw, 3.6rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          margin-bottom: 5rem;
        }
        .svc-process-head .accent { color: var(--accent, #C6FF00); }
        .svc-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .svc-step { border-top: 1px solid rgba(255,255,255,0.2); padding-top: 1.4rem; }
        .svc-step-n {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--accent, #C6FF00);
          font-variant-numeric: tabular-nums;
          margin-bottom: 2.5rem;
        }
        .svc-step-title { font-size: 1.35rem; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 0.8rem; }
        .svc-step-desc { font-size: 0.92rem; line-height: 1.5; color: rgba(255,255,255,0.55); }

        /* CTA */
        .svc-cta {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 2.5rem;
          padding: 10vh 0;
          margin: 0 -2.5rem;
          overflow: hidden;
        }
        .svc-cta-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .svc-cta-cells {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .svc-grid-cell {
          position: absolute;
          width: 60px;
          height: 60px;
          will-change: opacity;
          animation: svc-cell-fade 1.1s ease forwards;
        }
        @keyframes svc-cell-fade {
          0%   { opacity: 0; }
          10%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .svc-cta-label,
        .svc-cta-title,
        .svc-cta-mail { position: relative; z-index: 1; }
        .svc-cta-label {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .svc-cta-title {
          font-size: clamp(2.6rem, 9vw, 9rem);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.04em;
        }
        .svc-cta-title .accent { color: var(--accent, #C6FF00); }
        .svc-cta-mail {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-size: clamp(1.1rem, 2.4vw, 1.9rem);
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 0.35rem;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .svc-cta-mail:hover { color: var(--accent, #C6FF00); border-color: var(--accent, #C6FF00); }
        .svc-cta-social {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 1.1rem;
          margin-top: 0.5rem;
        }
        .svc-cta-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 50%;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        .svc-cta-social-link:hover {
          color: var(--accent, #C6FF00);
          border-color: var(--accent, #C6FF00);
          transform: translateY(-3px);
        }

        @media (max-width: 900px) {
          .svc-row {
            grid-template-columns: 3rem 1fr;
            grid-template-areas: "n title" ". desc";
            row-gap: 0.9rem;
            padding: 1.8rem 0;
          }
          .svc-n { grid-area: n; }
          .svc-title { grid-area: title; }
          .svc-body { grid-area: desc; }
          .svc-desc { max-width: none; }
          .svc-arrow { display: none; }
          .svc-reveal { display: none; }
          .svc-row:hover { padding-left: 0; }
          .svc-steps { grid-template-columns: 1fr; gap: 0; }
          .svc-step { padding: 1.8rem 0; }
        }
      `}</style>

      <section id="services" ref={sectionRef} className="svc">
        {/* Intro */}
        <div className="svc-intro">
          <h1 ref={introRef} className="svc-intro-text">
            {INTRO_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span className={`svc-word${word === "products" ? " accent" : ""}`}>{word}</span>
                {i < INTRO_WORDS.length - 1 && " "}
              </Fragment>
            ))}
          </h1>
        </div>

        {/* Lista de servicios */}
        <div className="svc-list-wrap">
          <ul ref={listRef} className="svc-list">
            {SERVICES.map((s) => (
              <li key={s.n} className="svc-row" data-image={s.image}>
                <span className="svc-n">{s.n}</span>
                <h2 className="svc-title">{s.title}</h2>
                <div className="svc-body">
                  <p className="svc-desc">{s.desc}</p>
                  <div className="svc-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="svc-tag">{t}</span>
                    ))}
                  </div>
                  {s.cases.length > 0 && (
                    <p className="svc-cases">
                      <span className="svc-cases-label">Related work</span>
                      {s.cases.map((slug, i) => {
                        const work = getWork(slug);
                        if (!work) return null;
                        return (
                          <Fragment key={slug}>
                            {i > 0 && <span className="svc-cases-sep">·</span>}
                            <Link
                              href={`/cases/${slug}`}
                              className="svc-case-link"
                              title={`${work.title} — ${work.seoTitle ?? work.subtitle}`}
                            >
                              {work.title}
                            </Link>
                          </Fragment>
                        );
                      })}
                    </p>
                  )}
                </div>
                <span className="svc-arrow" aria-hidden>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Marquee de tecnologías */}
        <div className="svc-tech">
          <div className="svc-tech-row">
            {[...TECH, ...TECH].map((t, i) => (
              <span key={i} className="svc-tech-item">
                {t}
                <span className="svc-tech-star">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="svc-process">
          <h2 className="svc-process-head">
            How we <span className="accent">work</span>
          </h2>
          <div className="svc-steps">
            {PROCESS.map((p) => (
              <div key={p.n} className="svc-step">
                <div className="svc-step-n">{p.n}</div>
                <h4 className="svc-step-title">{p.title}</h4>
                <p className="svc-step-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} id="svc-cta" className="svc-cta">
          <div className="svc-cta-grid" />
          <div ref={ctaCellsRef} className="svc-cta-cells" />
          <span className="svc-cta-label">Have a project in mind?</span>
          <h2 className="svc-cta-title">
            Let&apos;s build<br />something <span className="accent">real</span>
          </h2>
          <a href="tel:+5493513471844" className="svc-cta-mail">
            +54 9 351 347 1844
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <div className="svc-cta-social">
            <a
              href="https://linkedin.com/company/nubastudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="svc-cta-social-link"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.87H5.56v8.47h2.78zM6.95 8.62a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22zm11.39 9.72v-4.64c0-2.5-1.34-3.66-3.12-3.66a2.7 2.7 0 0 0-2.44 1.34V9.87h-2.78c.04.79 0 8.47 0 8.47h2.78v-4.73c0-.25.02-.5.09-.68.2-.5.66-1.01 1.42-1.01 1 0 1.4.76 1.4 1.88v4.54h2.87z" />
              </svg>
            </a>
            <a
              href="https://wa.me/5493513471844"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="svc-cta-social-link"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2zm0 1.67c2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.84c0 4.56-3.7 8.26-8.27 8.26a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.8.83-3-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.56 3.7-8.26 8.27-8.26zm-3.6 4.4c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.18 1.77 2.7 4.3 3.78.6.26 1.07.42 1.43.53.6.2 1.15.17 1.58.1.48-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.65.8-.8.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25-.01-.38.11-.5.11-.12.25-.29.37-.44.13-.15.17-.25.25-.42.09-.17.05-.31-.02-.44-.06-.12-.55-1.37-.77-1.87-.2-.48-.4-.42-.55-.42-.14-.01-.31-.01-.48-.01z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
