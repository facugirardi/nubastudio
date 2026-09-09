"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { works } from "../data/works";

gsap.registerPlugin(ScrollTrigger);

const ROTATING_WORDS = ["branding", "interaction", "code"];

const ABOUT_SUB =
  "Three disciplines, one process. Nothing is handed off, so every experience holds together, and every detail earns its place.";

const ROW1 = [
  { image: "/images/cases/nubapay/m1.webp",           slug: "nubapay",    w: "38vw", h: "340px", mb: "8px"  },
  { image: "/images/cases/nuddo/frame2.webp",         slug: "nuddo",      w: "42vw", h: "340px", mb: "0px"  },
  { image: "/images/cases/kennedys/ken1.webp",        slug: "kennedys",   w: "20vw", h: "360px", mb: "30px" },
  { image: "/images/cases/ffmates/ffmatesmock1.webp", slug: "ffmates",    w: "16vw", h: "320px", mb: "10px" },
  { image: "/images/cases/mes/m1.webp",               slug: "mes",        w: "28vw", h: "340px", mb: "18px" },
  { image: "/images/cases/checkrto/check1.webp",      slug: "checkrto",   w: "34vw", h: "350px", mb: "40px" },
  { image: "/images/cases/unickeys/m1.webp",          slug: "unickeys",   w: "24vw", h: "330px", mb: "22px" },
  { image: "/images/cases/ushuaia360/m1.webp",        slug: "ushuaia360", w: "22vw", h: "360px", mb: "12px" },
  { image: "/images/cases/bausing/desktop1-bausing.webp", slug: "bausing",    w: "26vw", h: "330px", mb: "20px" },
  { image: "/images/cases/partidosya/py1-min.webp",       slug: "partidosya", w: "30vw", h: "360px", mb: "5px"  },
];

const SOCIALS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5493513471844",
    icon: "M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2zm0 1.67c2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.84c0 4.56-3.7 8.26-8.27 8.26a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.8.83-3-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.56 3.7-8.26 8.27-8.26zm-3.6 4.4c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.18 1.77 2.7 4.3 3.78.6.26 1.07.42 1.43.53.6.2 1.15.17 1.58.1.48-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.65.8-.8.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25-.01-.38.11-.5.11-.12.25-.29.37-.44.13-.15.17-.25.25-.42.09-.17.05-.31-.02-.44-.06-.12-.55-1.37-.77-1.87-.2-.48-.4-.42-.55-.42-.14-.01-.31-.01-.48-.01z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/nubastudio",
    icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.87H5.56v8.47h2.78zM6.95 8.62a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22zm11.39 9.72v-4.64c0-2.5-1.34-3.66-3.12-3.66a2.7 2.7 0 0 0-2.44 1.34V9.87h-2.78c.04.79 0 8.47 0 8.47h2.78v-4.73c0-.25.02-.5.09-.68.2-.5.66-1.01 1.42-1.01 1 0 1.4.76 1.4 1.88v4.54h2.87z",
  },
];

// TODO completar con los datos reales del estudio
const STUDIO = {
  city: "Córdoba",
  country: "Argentina",
  since: "2024",
};

const ORIGIN = [
  "Nuba started from a simple conviction: the best products come from teams that never hand the work off. One table, three disciplines, the same conversation from first sketch to last deploy.",
  "We design and build sites, apps, marketplaces and platforms. The scope changes with every project. The way we work doesn't.",
];

const TEAM: { name: string; role: string; photo?: string }[] = [
  { name: "Alejo Vaquero",   role: "Design",      photo: "/images/alejo.webp" },
  { name: "Facundo Girardi", role: "Development", photo: "/images/facu.webp" },
  { name: "Ángel Vaquero",   role: "Strategy",    photo: "/images/angelito.webp" },
];


export default function About() {
  const stmtRef   = useRef<HTMLDivElement>(null);
  const rotRef    = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref   = useRef<HTMLDivElement>(null);
  const originRef  = useRef<HTMLDivElement>(null);
  const teamRef    = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLElement>(null);
  const cellsRef  = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 700);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // entrada: cada linea sube desde su mascara
      const reveals = stmtRef.current?.querySelectorAll<HTMLElement>(".stmt-reveal");
      if (reveals && reveals.length) {
        gsap.fromTo(
          reveals,
          { yPercent: 110, autoAlpha: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.09,
            delay: 0.15,
          }
        );
      }

      // rotacion de la palabra clave
      const rotWords = rotRef.current?.querySelectorAll<HTMLElement>(".rot-word");
      if (rotWords && rotWords.length > 1) {
        gsap.set(rotWords, { yPercent: 110, autoAlpha: 0, filter: "blur(10px)" });
        gsap.to(rotWords[0], {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
          delay: 0.24,
        });

        const tl = gsap.timeline({ repeat: -1, delay: 1.35 });
        rotWords.forEach((_, i) => {
          const current = rotWords[i];
          const next = rotWords[(i + 1) % rotWords.length];
          tl.to(
            current,
            { yPercent: -110, autoAlpha: 0, filter: "blur(8px)", duration: 0.6, ease: "power3.in" },
            "+=1.8"
          ).fromTo(
            next,
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            {
              yPercent: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power3.out",
              immediateRender: false,
            },
            "<0.1"
          );
        });
      }

      // marquee fade-in
      gsap.fromTo(
        row1Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: row1Ref.current, start: "top 85%" },
        }
      );

      [originRef, teamRef].forEach((ref) => {
        const el = ref.current;
        if (!el) return;
        gsap.from(el.querySelectorAll(".about-reveal"), {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = socialRef.current;
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
      cell.className = "grid-cell";
      cell.style.left = col * SIZE + "px";
      cell.style.top = row * SIZE + "px";
      cell.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      layer.appendChild(cell);
      cell.addEventListener("animationend", () => cell.remove());
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const el = socialRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".social-reveal", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .about-section {
          background: #000;
          color: #fff;
        }

        /* statement */
        .about-statement {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 4rem 5rem;
          box-sizing: border-box;
        }
        .stmt-inner {
          width: 100%;
          max-width: 1400px;
          text-align: center;
        }
        .stmt-heading {
          margin: 0;
          font-size: clamp(2.6rem, 6.4vw, 6.2rem);
          font-weight: 500;
          line-height: 1.02;
          letter-spacing: -0.045em;
        }
        .stmt-line-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
        }
        .stmt-line { display: inline-block; will-change: transform, opacity, filter; }
        .stmt-rot {
          position: relative;
          display: block;
          height: 1.16em;
          overflow: hidden;
        }
        .rot-word {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          line-height: 1.16;
          color: #C6FF00;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity, filter;
        }
        .stmt-foot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
          margin-top: 3.25rem;
        }
        .stmt-rule {
          flex-shrink: 0;
          width: clamp(60px, 8vw, 110px);
          height: 1px;
          background: rgba(255,255,255,0.25);
        }
        .stmt-sub {
          margin: 0;
          max-width: 46ch;
          font-size: clamp(0.95rem, 1.35vw, 1.2rem);
          line-height: 1.6;
          color: rgba(255,255,255,0.55);
        }

        /* marquee */
        .about-marquee-wrap {
          padding: 6rem 0 8rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .marquee-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: max-content;
          will-change: transform;
        }
        .marquee-row--left  { animation: marquee-left  38s linear infinite; }

        @keyframes marquee-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }

        .mq-card {
          position: relative;
          flex-shrink: 0;
          border-radius: 14px;
          overflow: hidden;
          background: #111;
          cursor: pointer;
          display: block;
        }
        .mq-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .mq-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mq-card:hover .mq-overlay { background: rgba(0,0,0,0.5); }

        .mq-label {
          background: #fff;
          color: #000;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0;
          text-transform: none;
          padding: 0.65rem 1.5rem;
          border-radius: 999px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          white-space: nowrap;
        }
        .mq-card:hover .mq-label { opacity: 1; transform: translateY(0); }

        /* origin */
        .about-origin {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 4rem 9rem;
          box-sizing: border-box;
        }
        .origin-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C6FF00;
          align-self: start;
        }
        .origin-body { max-width: 60ch; }
        .origin-p {
          margin: 0 0 1.75rem;
          font-size: clamp(1.15rem, 2vw, 1.75rem);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.015em;
          color: rgba(255,255,255,0.8);
        }
        .origin-p:last-of-type { color: rgba(255,255,255,0.5); }
        .origin-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 2.5rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .origin-meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .origin-meta-k {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .origin-meta-v {
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #fff;
        }

        /* team */
        .about-team {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 4rem 9rem;
          box-sizing: border-box;
        }
        .team-head {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .team-title {
          margin: 0;
          font-size: clamp(2rem, 4.5vw, 3.6rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .team-count {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.35);
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .team-card { display: block; }
        .team-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 14px;
          overflow: hidden;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .team-photo img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1);
          transition: filter 0.5s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .team-card:hover .team-photo img {
          filter: grayscale(0);
          transform: scale(1.04);
        }
        .team-initials {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.05em;
          color: rgba(255,255,255,0.16);
          transition: color 0.4s ease;
        }
        .team-card:hover .team-initials { color: #C6FF00; }
        .team-name {
          margin: 1rem 0 0.25rem;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: #fff;
        }
        .team-role {
          margin: 0;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.45);
        }

        /* social section */
        .about-social {
          position: relative;
          min-height: 100vh;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .about-social-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .about-social-cells {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .grid-cell {
          position: absolute;
          width: 60px;
          height: 60px;
          will-change: opacity;
          animation: cell-fade 1.1s ease forwards;
        }
        @keyframes cell-fade {
          0%   { opacity: 0; }
          10%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .about-social-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2.5rem;
          padding: 0 2rem;
        }
        .social-eyebrow {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C6FF00;
        }
        .social-title {
          margin: 0;
          max-width: 16ch;
          font-size: clamp(2.6rem, 8vw, 7rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1.02;
          color: #fff;
        }
        .social-title em {
          font-style: normal;
          color: #C6FF00;
        }
        .social-email {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.5rem;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .social-email::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -0.15em;
          width: 100%;
          height: 2px;
          background: #C6FF00;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .social-email:hover { color: #C6FF00; }
        .social-email:hover::after { transform: scaleX(1); }
        .social-email .arrow {
          display: inline-block;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .social-email:hover .arrow { transform: translateX(10px); }
        .social-secondary {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          margin-top: 0.5rem;
        }
        .social-icon-link {
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
        .social-icon-link:hover {
          color: #C6FF00;
          border-color: #C6FF00;
          transform: translateY(-3px);
        }

        .about-social-footer {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2.5rem 0 5.5rem;
          box-sizing: border-box;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          z-index: 1;
        }

        @media (max-width: 700px) {
          .about-statement { padding: 7rem 1.5rem 3rem; min-height: 85vh; }
          .stmt-heading { font-size: clamp(2.1rem, 11vw, 3.6rem); }
          .stmt-foot { gap: 1.25rem; margin-top: 2.5rem; }
          .stmt-rule { width: 60px; }
          .about-marquee-wrap { padding: 3.5rem 0 4.5rem; gap: 0.75rem; }
          .marquee-row { gap: 0.75rem; }
          .about-origin {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1rem 1.5rem 5rem;
          }
          .origin-p { margin-bottom: 1.25rem; }
          .origin-meta { gap: 1.75rem; margin-top: 2rem; }
          .about-team { padding: 0 1.5rem 5rem; }
          .team-head { margin-bottom: 2rem; }
          .team-grid { grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
          .about-social-inner { gap: 1.75rem; }
          .social-title { font-size: clamp(2.2rem, 11vw, 3.5rem); }
          .social-email { font-size: clamp(1.2rem, 6vw, 2rem); }
          .social-secondary { flex-wrap: wrap; justify-content: center; gap: 0.9rem; }
          .about-social-footer { padding: 0 1.5rem 0 4rem; font-size: 0.6rem; letter-spacing: 0.08em; }
        }
      `}</style>

      <section id="about" ref={sectionRef} className="about-section">
        <div ref={stmtRef} className="about-statement">
          <div className="stmt-inner">
            <h1 className="stmt-heading">
              <span className="stmt-line-mask">
                <span className="stmt-line stmt-reveal">We turn</span>
              </span>
              <span ref={rotRef} className="stmt-rot">
                {ROTATING_WORDS.map((word) => (
                  <span key={word} className="rot-word">{word}</span>
                ))}
              </span>
              <span className="stmt-line-mask">
                <span className="stmt-line stmt-reveal">into experiences</span>
              </span>
              <span className="stmt-line-mask">
                <span className="stmt-line stmt-reveal">that move people.</span>
              </span>
            </h1>

            <div className="stmt-foot">
              <span className="stmt-rule stmt-reveal" />
              <p className="stmt-sub stmt-reveal">{ABOUT_SUB}</p>
            </div>
          </div>
        </div>

        <div className="about-marquee-wrap">
          <div ref={row1Ref} className="marquee-row marquee-row--left">
            {[...ROW1, ...ROW1].map((item, i) => (
              <Link
                key={i}
                href={`/cases/${item.slug}`}
                className="mq-card"
                style={
                  isMobile
                    ? { width: i % 2 === 0 ? "230px" : "165px", height: "160px", marginBottom: 0 }
                    : { width: item.w, height: item.h, marginBottom: item.mb }
                }
              >
                <Image
                  src={item.image}
                  alt={`${works.find((w) => w.slug === item.slug)?.title ?? item.slug} case study by Nuba Studio`}
                  fill
                  sizes="(max-width: 900px) 50vw, 40vw"
                />
                <div className="mq-overlay">
                  <span className="mq-label">View more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div ref={originRef} className="about-origin">
          <span className="origin-label about-reveal">The studio</span>
          <div className="origin-body">
            {ORIGIN.map((p, i) => (
              <p key={i} className="origin-p about-reveal">{p}</p>
            ))}
            <div className="origin-meta">
              <div className="origin-meta-item about-reveal">
                <span className="origin-meta-k">Based in</span>
                <span className="origin-meta-v">{STUDIO.city}, {STUDIO.country}</span>
              </div>
              <div className="origin-meta-item about-reveal">
                <span className="origin-meta-k">Since</span>
                <span className="origin-meta-v">{STUDIO.since}</span>
              </div>
              <div className="origin-meta-item about-reveal">
                <span className="origin-meta-k">Projects shipped</span>
                <span className="origin-meta-v">{works.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={teamRef} className="about-team">
          <div className="team-head">
            <h2 className="team-title about-reveal">The people</h2>
            <span className="team-count about-reveal">({String(TEAM.length).padStart(2, "0")})</span>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card about-reveal">
                <div className="team-photo">
                  {m.photo ? (
                    <Image src={m.photo} alt={m.name} fill sizes="(max-width: 900px) 45vw, 260px" />
                  ) : (
                    <span className="team-initials">
                      {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                  )}
                </div>
                <p className="team-name">{m.name}</p>
                <p className="team-role">{m.role}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Social links */}
      <section ref={socialRef} className="about-social">
        <div className="about-social-grid" />
        <div ref={cellsRef} className="about-social-cells" />
        <div className="about-social-inner">
          <span className="social-eyebrow social-reveal">Get in touch</span>
          <h2 className="social-title social-reveal">
            Let&apos;s build something <em>great</em>.
          </h2>
          <a href="tel:+5493513471844" className="social-email social-reveal">
            +54 9 351 347 1844
            <span className="arrow">&rarr;</span>
          </a>
          <div className="social-secondary social-reveal">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-icon-link"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <footer className="about-social-footer">
          <span>Design &amp; Development</span>
          <span>&copy; {new Date().getFullYear()} · Nuba Studio</span>
        </footer>
      </section>
    </>
  );
}
