"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INTRO_TEXT =
  "We design and build digital products end to end — from the first idea to the moment they ship.";

const SERVICES = [
  {
    n: "01",
    title: "Web Design & Development",
    desc: "Sites and platforms that load fast, feel alive and turn visitors into clients.",
    tags: ["Next.js", "React", "CMS", "Motion"],
    image: "/images/cases/checkrto/check1.webp",
  },
  {
    n: "02",
    title: "Mobile Apps",
    desc: "Native-feeling iOS & Android products people actually want to open.",
    tags: ["React Native", "Expo", "iOS", "Android"],
    image: "/images/cases/nuddo/frame2.webp",
  },
  {
    n: "03",
    title: "Marketplaces & Platforms",
    desc: "Two-sided products with payments, dashboards and infrastructure built to scale.",
    tags: ["Payments", "Dashboards", "Auth", "APIs"],
    image: "/images/cases/ffmates/ffmatesmock1.webp",
  },
  {
    n: "04",
    title: "Branding & Identity",
    desc: "Visual systems that make you unmistakable across every touchpoint.",
    tags: ["Identity", "Art Direction", "Systems"],
    image: "/images/cases/kennedys/ken1.webp",
  },
  {
    n: "05",
    title: "Product Strategy & MVP",
    desc: "From raw idea to a shipped MVP — validated, scoped and built to grow.",
    tags: ["Discovery", "Prototyping", "Roadmap"],
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
  { n: "03", title: "Build", desc: "Clean, scalable code shipped in tight loops — no black boxes." },
  { n: "04", title: "Launch & Iterate", desc: "We ship, measure what matters and keep improving after go-live." },
];

const INTRO_WORDS = INTRO_TEXT.split(" ");

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaCellsRef = useRef<HTMLDivElement>(null);

  // Hover-reveal: imagen flotante que sigue el cursor sobre la lista de servicios
  useEffect(() => {
    const reveal = revealRef.current;
    const img = revealImgRef.current;
    const list = listRef.current;
    if (!reveal || !img || !list) return;

    const xTo = gsap.quickTo(reveal, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(reveal, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    list.addEventListener("mousemove", onMove);

    const rows = Array.from(list.querySelectorAll<HTMLLIElement>(".svc-row"));
    const enters: Array<() => void> = [];

    const onListEnter = () => gsap.to(reveal, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    const onListLeave = () => gsap.to(reveal, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: "power3.out" });
    list.addEventListener("mouseenter", onListEnter);
    list.addEventListener("mouseleave", onListLeave);

    rows.forEach((row) => {
      const src = row.dataset.image!;
      const onEnter = () => {
        img.src = src;
        rows.forEach((r) => r.classList.toggle("is-dim", r !== row));
      };
      const onLeave = () => rows.forEach((r) => r.classList.remove("is-dim"));
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      enters.push(() => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      list.removeEventListener("mousemove", onMove);
      list.removeEventListener("mouseenter", onListEnter);
      list.removeEventListener("mouseleave", onListLeave);
      enters.forEach((fn) => fn());
    };
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

        /* Imagen flotante que sigue el cursor */
        .svc-reveal {
          position: fixed;
          top: 0; left: 0;
          width: 320px;
          height: 220px;
          margin: -110px 0 0 -160px;
          border-radius: 14px;
          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transform: scale(0.85);
          z-index: 50;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .svc-reveal img { width: 100%; height: 100%; object-fit: cover; display: block; }

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
        .svc-tech-item::after {
          content: "";
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent, #C6FF00);
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
          <p ref={introRef} className="svc-intro-text">
            {INTRO_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span className={`svc-word${word === "products" ? " accent" : ""}`}>{word}</span>
                {i < INTRO_WORDS.length - 1 && " "}
              </Fragment>
            ))}
          </p>
        </div>

        {/* Lista de servicios */}
        <div className="svc-list-wrap">
          <ul ref={listRef} className="svc-list">
            {SERVICES.map((s) => (
              <li key={s.n} className="svc-row" data-image={s.image}>
                <span className="svc-n">{s.n}</span>
                <h3 className="svc-title">{s.title}</h3>
                <div className="svc-body">
                  <p className="svc-desc">{s.desc}</p>
                  <div className="svc-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="svc-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <span className="svc-arrow">
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
              <span key={i} className="svc-tech-item">{t}</span>
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
        <div ref={ctaRef} className="svc-cta">
          <div className="svc-cta-grid" />
          <div ref={ctaCellsRef} className="svc-cta-cells" />
          <span className="svc-cta-label">Have a project in mind?</span>
          <h2 className="svc-cta-title">
            Let&apos;s build<br />something <span className="accent">real</span>
          </h2>
          <a href="mailto:hello@nubastudio.com" className="svc-cta-mail">
            hello@nubastudio.com
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </section>

      {/* Imagen flotante (fuera de la lista para poder seguir el cursor por todo el viewport) */}
      <div ref={revealRef} className="svc-reveal">
        <img ref={revealImgRef} alt="" />
      </div>
    </>
  );
}
