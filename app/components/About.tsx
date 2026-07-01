"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT =
  "We merge branding, interaction, and code to build experiences that resonate deeply and inspire action.";

const ROW1 = [
  { image: "/images/cases/nuddo/frame2.webp",         slug: "nuddo",      w: "42vw", h: "340px", mb: "0px"  },
  { image: "/images/cases/kennedys/ken1.webp",        slug: "kennedys",   w: "20vw", h: "360px", mb: "30px" },
  { image: "/images/cases/ffmates/ffmatesmock1.webp", slug: "ffmates",    w: "16vw", h: "320px", mb: "10px" },
  { image: "/images/cases/checkrto/check1.webp",      slug: "checkrto",   w: "34vw", h: "350px", mb: "40px" },
  { image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&h=600&fit=crop", slug: "bausing",    w: "26vw", h: "330px", mb: "20px" },
  { image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop", slug: "partidosya", w: "30vw", h: "360px", mb: "5px"  },
];

const ROW2 = [
  { image: "/images/cases/ffmates/ffmatesmock2.webp", slug: "ffmates",    w: "28vw"  },
  { image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop", slug: "partidosya", w: "38vw"  },
  { image: "/images/cases/kennedys/ken2.webp",        slug: "kennedys",   w: "20vw"  },
  { image: "/images/cases/checkrto/check3.webp",      slug: "checkrto",   w: "36vw"  },
  { image: "/images/cases/nuddo/nuddo4.webp",         slug: "nuddo",      w: "24vw"  },
  { image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&h=600&fit=crop", slug: "bausing",    w: "30vw"  },
];

const ABOUT_WORDS_LIST = ABOUT_TEXT.split(" ");

export default function About() {
  const pinRef    = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref   = useRef<HTMLDivElement>(null);
  const row2Ref   = useRef<HTMLDivElement>(null);
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
      // entrada al montar: las palabras suben con fade + desenfoque, escalonadas
      const words = textRef.current?.querySelectorAll<HTMLSpanElement>(".about-word-group");
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
            stagger: 0.05,
            delay: 0.2,
          }
        );
      }

      // paint text
      const letters = textRef.current?.querySelectorAll<HTMLSpanElement>(".about-char");
      if (letters && letters.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
        letters.forEach((char) => {
          tl.fromTo(
            char,
            { color: "rgba(255,255,255,0.1)" },
            { color: "#ffffff", ease: "none", duration: 1 },
            "<0.18"
          );
        });
      }

      // marquee fade-in
      gsap.fromTo(
        [row1Ref.current, row2Ref.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: row1Ref.current, start: "top 85%" },
        }
      );
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

  return (
    <>
      <style>{`
        .about-section {
          background: #000;
          color: #fff;
        }

        /* sticky pin */
        .about-pin-zone {
          position: relative;
          height: 300vh;
        }
        .about-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 4rem;
          box-sizing: border-box;
          overflow: hidden;
        }
        .about-paint-text {
          font-size: clamp(3rem, 7vw, 8.5rem);
          font-weight: 400;
          line-height: 1.18;
          letter-spacing: -0.03em;
          text-align: center;
          margin: 0;
          max-width: 900px;
          word-wrap: break-word;
          transform: translateY(-120px);
        }
        .about-word-group {
          display: inline-block;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(110%);
          filter: blur(10px);
          will-change: transform, opacity, filter;
        }
        .about-char {
          display: inline;
          color: rgba(255,255,255,0.1);
          will-change: color;
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
        .marquee-row--right { animation: marquee-right 44s linear infinite; }

        @keyframes marquee-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); }    }

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
        .about-social-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          position: relative;
          z-index: 1;
        }
        .about-social-link {
          font-size: clamp(2.8rem, 7vw, 7rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #fff;
          text-decoration: none;
          line-height: 1.1;
          transition: color 0.25s ease;
          position: relative;
        }
        .about-social-links:hover .about-social-link { color: rgba(255,255,255,0.5); }
        .about-social-links:hover .about-social-link:hover { color: #fff; }
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
          .about-sticky { padding: 5rem 1.5rem; }
          .about-paint-text { font-size: clamp(2rem, 8vw, 3.5rem); }
          .about-marquee-wrap { padding: 3.5rem 0 4.5rem; gap: 0.75rem; }
          .marquee-row { gap: 0.75rem; }
          .about-social-link { font-size: clamp(2rem, 12vw, 3.5rem); }
          .about-social-footer { padding: 0 1.5rem 0 4rem; font-size: 0.6rem; letter-spacing: 0.08em; }
        }
      `}</style>

      <section id="about" ref={sectionRef} className="about-section">
        <div ref={pinRef} className="about-pin-zone">
          <div className="about-sticky">
            <p ref={textRef} className="about-paint-text">
              {ABOUT_WORDS_LIST.map((word, wi) => (
                <Fragment key={wi}>
                  <span className="about-word-group">
                    {Array.from(word).map((char, ci) => (
                      <span key={ci} className="about-char">{char}</span>
                    ))}
                  </span>
                  {wi < ABOUT_WORDS_LIST.length - 1 && " "}
                </Fragment>
              ))}
            </p>
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
                <img src={item.image} alt="" loading="lazy" decoding="async" />
                <div className="mq-overlay">
                  <span className="mq-label">View more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social links */}
      <section ref={socialRef} className="about-social">
        <div className="about-social-grid" />
        <div ref={cellsRef} className="about-social-cells" />
        <nav className="about-social-links">
          {[
            { label: "whatsapp", href: "https://wa.me/5493513471844" },
            { label: "email",    href: "mailto:hello@nubastudio.com" },
            { label: "linkedin", href: "https://linkedin.com/company/nubastudio" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="about-social-link">
              {label}
            </a>
          ))}
        </nav>
        <footer className="about-social-footer">
          <span>Design &amp; Development</span>
          <span>&copy; {new Date().getFullYear()} · Nuba Studio</span>
        </footer>
      </section>
    </>
  );
}
