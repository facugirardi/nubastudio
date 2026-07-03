"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";

const HEADLINE = "Let's build something together.";
const HEADLINE_WORDS = HEADLINE.split(" ");

const SECONDARY = [
  { label: "whatsapp", href: "https://wa.me/5493513471844" },
  { label: "linkedin", href: "https://linkedin.com/company/nubastudio" },
  { label: "córdoba, ar", href: undefined },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll<HTMLSpanElement>(".contact-word");
      if (words && words.length) {
        gsap.fromTo(
          words,
          { yPercent: 110, autoAlpha: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            stagger: 0.06,
            delay: 0.3,
          }
        );
      }

      gsap.fromTo(
        [emailRef.current, secondaryRef.current],
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.85 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = cellsRef.current;
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
      cell.className = "contact-cell";
      cell.style.left = col * SIZE + "px";
      cell.style.top = row * SIZE + "px";
      cell.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      layer.appendChild(cell);
      cell.addEventListener("animationend", () => cell.remove());
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <style>{`
        .contact-section {
          position: relative;
          min-height: 100vh;
          background: #000;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 8rem 2.5rem 2rem;
          box-sizing: border-box;
        }
        .contact-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }
        .contact-cells {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .contact-cell {
          position: absolute;
          width: 60px;
          height: 60px;
          will-change: opacity;
          animation: contact-cell-fade 1.1s ease forwards;
        }
        @keyframes contact-cell-fade {
          0%   { opacity: 0; }
          10%  { opacity: 1; }
          100% { opacity: 0; }
        }

        .contact-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2.4rem;
          pointer-events: none;
        }
        .contact-inner a { pointer-events: auto; }

        .contact-headline {
          font-size: clamp(2.6rem, 7vw, 7rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin: 0;
          max-width: 14ch;
        }
        .contact-word {
          display: inline-block;
          white-space: nowrap;
          opacity: 0;
          will-change: transform, opacity, filter;
        }

        .contact-email {
          position: relative;
          font-size: clamp(1.6rem, 4.2vw, 3.2rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #fff;
          text-decoration: none;
          padding-bottom: 0.12em;
        }
        .contact-email::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #C6FF00;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .contact-email:hover { color: #C6FF00; }
        .contact-email:hover::after { transform: scaleX(1); }

        .contact-secondary {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          opacity: 0;
        }
        .contact-secondary a {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .contact-secondary a:hover { color: #fff; }
        .contact-sep { color: rgba(255,255,255,0.2); }

        .contact-footer {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2.5rem;
          box-sizing: border-box;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
          z-index: 1;
        }

        @media (max-width: 700px) {
          .contact-section { padding: 7rem 1.5rem 2rem; }
          .contact-headline { font-size: clamp(2rem, 10vw, 3.5rem); }
          .contact-secondary { flex-wrap: wrap; justify-content: center; gap: 0.7rem 1rem; }
          .contact-footer { padding: 0 1.5rem; font-size: 0.6rem; letter-spacing: 0.08em; }
        }
      `}</style>

      <div className="contact-grid" />
      <div ref={cellsRef} className="contact-cells" />

      <div className="contact-inner">
        <h1 ref={headlineRef} className="contact-headline">
          {HEADLINE_WORDS.map((word, wi) => (
            <Fragment key={wi}>
              <span className="contact-word">{word}</span>
              {wi < HEADLINE_WORDS.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        <a ref={emailRef} href="mailto:hello@nuba.studio" target="_blank" rel="noopener noreferrer" className="contact-email">
          hello@nuba.studio
        </a>

        <div ref={secondaryRef} className="contact-secondary">
          {SECONDARY.map(({ label, href }, i) => (
            <Fragment key={label}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              ) : (
                <span>{label}</span>
              )}
              {i < SECONDARY.length - 1 && <span className="contact-sep">·</span>}
            </Fragment>
          ))}
        </div>
      </div>

      <footer className="contact-footer">
        <span>Let&apos;s talk</span>
        <span>&copy; {new Date().getFullYear()} · Nuba Studio</span>
      </footer>
    </section>
  );
}
