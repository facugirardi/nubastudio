"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const WHATSAPP_NUMBER = "5493513471844";
const MAX_CHARS = 2000;

const HEADLINE = "Let's build something together.";
const HEADLINE_WORDS = HEADLINE.split(" ");

const SEEDS = [
  { label: "a website", text: "I need a website for " },
  { label: "a mobile app", text: "I need a mobile app for " },
  { label: "a marketplace", text: "I want to build a marketplace for " },
  { label: "not sure yet", text: "I have an idea but I'm not sure where to start. " },
];

const CHANNELS = [
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "LinkedIn", href: "https://linkedin.com/company/nubastudio" },
];

type Status = "idle" | "polishing" | "polished" | "error";

const STATUS_COPY: Partial<Record<Status, string>> = {
  polishing: "Writing your draft",
  error: "AI unavailable",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cellsRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [text, setText] = useState("");
  const [beforePolish, setBeforePolish] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const filled = text.trim().length > 0;
  const nearLimit = text.length > MAX_CHARS * 0.6;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [
      ".contact-word",
      ".contact-sub",
      ".contact-composer",
      ".contact-seeds",
      ".contact-direct",
    ];

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".contact-word",
        { yPercent: 108, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power4.out", stagger: 0.055 }
      )
        .fromTo(".contact-sub", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(".contact-composer", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.45")
        .fromTo(
          [".contact-seeds", ".contact-direct"],
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = cellsRef.current;
    if (!section || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SIZE = 60;
    const TINTS = [
      "rgba(198,255,0,0.13)",
      "rgba(198,255,0,0.07)",
      "rgba(255,255,255,0.06)",
      "rgba(198,255,0,0.04)",
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
      cell.style.background = TINTS[Math.floor(Math.random() * TINTS.length)];
      layer.appendChild(cell);
      cell.addEventListener("animationend", () => cell.remove());
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  async function polish() {
    const value = text.trim();
    if (!value || status === "polishing") return;
    setStatus("polishing");
    try {
      const res = await fetch("/api/draft-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });
      const data = await res.json();
      if (!res.ok || !data?.message) throw new Error(data?.error ?? "failed");
      setBeforePolish(value);
      setText(data.message);
      setStatus("polished");
    } catch {
      setStatus("error");
    }
  }

  function undoPolish() {
    if (beforePolish === null) return;
    setText(beforePolish);
    setBeforePolish(null);
    setStatus("idle");
  }

  function applySeed(seed: string) {
    setText(seed);
    setBeforePolish(null);
    setStatus("idle");
    const el = textareaRef.current;
    if (el) {
      el.focus();
      requestAnimationFrame(() => el.setSelectionRange(seed.length, seed.length));
    }
  }

  function send() {
    const value = text.trim();
    if (!value) return;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(value)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <style>{`
        .contact-section {
          position: relative;
          min-height: 100vh;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 5.5rem 1.5rem 4.5rem;
        }
        .contact-grid, .contact-cells {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .contact-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 115% 95% at 50% 45%, #000 45%, transparent 100%);
        }
        .contact-cells { overflow: hidden; }
        .contact-cell {
          position: absolute;
          width: 60px;
          height: 60px;
          animation: contact-cell-fade 1.15s ease forwards;
        }
        @keyframes contact-cell-fade {
          0% { opacity: 0; }
          12% { opacity: 1; }
          100% { opacity: 0; }
        }

        .contact-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 660px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .contact-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          letter-spacing: -0.005em;
          color: rgba(255,255,255,0.5);
        }
        .contact-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent, #C6FF00);
          flex-shrink: 0;
        }
        .contact-status[data-state="polishing"] .contact-status-dot {
          animation: contact-pulse 1.1s ease-in-out infinite;
        }
        .contact-status[data-state="error"] .contact-status-dot {
          background: rgba(255,255,255,0.28);
        }
        @keyframes contact-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }

        .contact-headline {
          margin: 0;
          font-size: clamp(2.2rem, 5.1vw, 4.1rem);
          font-weight: 400;
          line-height: 1.06;
          letter-spacing: -0.042em;
          max-width: 15ch;
        }
        .contact-word {
          display: inline-block;
          white-space: nowrap;
          visibility: hidden;
        }

        .contact-sub {
          margin: 1.05rem 0 0;
          max-width: 44ch;
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.45);
          visibility: hidden;
        }

        .contact-composer {
          width: 100%;
          margin-top: 1.9rem;
          text-align: left;
          background: #000;
          border: 1px solid rgba(255,255,255,0.17);
          border-radius: 16px;
          visibility: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-composer:focus-within {
          border-color: rgba(198,255,0,0.42);
          box-shadow: 0 0 0 1px rgba(198,255,0,0.16), 0 26px 64px -30px rgba(198,255,0,0.45);
        }
        .contact-textarea {
          display: block;
          width: 100%;
          min-height: 104px;
          resize: none;
          background: none;
          border: none;
          outline: none;
          padding: 1.3rem 1.35rem 0.65rem;
          color: #fff;
          font: inherit;
          font-size: 1.06rem;
          line-height: 1.6;
          letter-spacing: -0.011em;
        }
        .contact-textarea::placeholder { color: rgba(255,255,255,0.29); }

        .contact-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 0.95rem 0.9rem 1.35rem;
        }
        .contact-bar-meta {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.38);
          font-variant-numeric: tabular-nums;
        }
        .contact-undo {
          font: inherit;
          font-size: 0.78rem;
          background: none;
          border: none;
          padding: 0;
          color: rgba(255,255,255,0.55);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .contact-undo:hover { color: #fff; }
        .contact-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
        }

        .contact-btn {
          font: inherit;
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, opacity 0.25s ease;
        }
        .contact-btn:disabled { opacity: 0.32; cursor: not-allowed; }
        .contact-btn--ghost {
          padding: 0.56rem 1rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.19);
          color: rgba(255,255,255,0.78);
        }
        .contact-btn--ghost:not(:disabled):hover {
          border-color: rgba(255,255,255,0.45);
          color: #fff;
        }
        .contact-btn--send {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.3rem 0.3rem 1rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.22);
          color: #fff;
          font-weight: 500;
        }
        .contact-btn--send:not(:disabled):hover { border-color: rgba(255,255,255,0.5); }
        .contact-send-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: #fff;
          flex-shrink: 0;
          transition: background 0.25s ease;
        }
        .contact-send-icon {
          width: 13px;
          height: 13px;
          fill: none;
          stroke: #000;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .contact-btn--send:disabled {
          opacity: 1;
          background: transparent;
          border-color: rgba(255,255,255,0.13);
          color: rgba(255,255,255,0.28);
        }
        .contact-btn--send:disabled .contact-send-badge { background: rgba(255,255,255,0.22); }

        .contact-seeds {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.45rem;
          margin-top: 2.3rem;
          visibility: hidden;
        }
        .contact-seed {
          font: inherit;
          font-size: 0.8rem;
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.48);
          cursor: pointer;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .contact-seed:hover { color: #fff; border-color: rgba(255,255,255,0.34); }

        .contact-direct {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem 1.5rem;
          width: 100%;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.075);
          font-size: 0.92rem;
          visibility: hidden;
        }
        .contact-phone {
          color: #fff;
          font-weight: 500;
          letter-spacing: -0.015em;
          text-decoration: none;
        }
        .contact-direct-link {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .contact-direct-link:hover { color: #fff; }
        .contact-place { color: rgba(255,255,255,0.3); }

        .contact-footer {
          position: absolute;
          bottom: 1.6rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.22);
          z-index: 1;
        }

        .contact-section :focus-visible {
          outline: 2px solid rgba(198,255,0,0.6);
          outline-offset: 3px;
        }
        .contact-composer:focus-within .contact-textarea:focus-visible { outline: none; }

        @media (max-width: 640px) {
          .contact-section { padding: 5.5rem 1.15rem 3.5rem; }
          .contact-composer { margin-top: 1.5rem; }
          .contact-bar {
            flex-wrap: wrap;
            gap: 0.7rem;
            padding: 0.75rem 0.85rem 0.85rem;
          }
          .contact-bar-meta, .contact-undo { padding-left: 0.4rem; }
          .contact-actions { width: 100%; margin-left: 0; }
          .contact-actions .contact-btn {
            flex: 1;
            padding-left: 0.7rem;
            padding-right: 0.7rem;
            text-align: center;
          }
          .contact-direct { margin-top: 1.6rem; padding-top: 1.3rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-status-dot { animation: none; }
          .contact-cell { animation-duration: 1ms; }
        }
      `}</style>

      <div className="contact-grid" />
      <div ref={cellsRef} className="contact-cells" />

      <div className="contact-inner">
        <h1 className="contact-headline">
          {HEADLINE_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span className="contact-word">{word}</span>
              {i < HEADLINE_WORDS.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        <p className="contact-sub">
          Write what you need, however rough. We&apos;ll tidy it into a proper message and
          open it in WhatsApp.
        </p>

        <div className="contact-composer">
          <textarea
            ref={textareaRef}
            className="contact-textarea"
            aria-label="Your message"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="A website for my coffee shop, with online booking. Ready before December."
            maxLength={MAX_CHARS}
          />
          <div className="contact-bar">
            {status === "polishing" || status === "error" ? (
              <span className="contact-status" data-state={status} aria-live="polite">
                <span className="contact-status-dot" />
                {STATUS_COPY[status]}
              </span>
            ) : beforePolish !== null && status === "polished" ? (
              <button type="button" className="contact-undo" onClick={undoPolish}>
                Undo
              </button>
            ) : nearLimit ? (
              <span className="contact-bar-meta">
                {text.length}/{MAX_CHARS}
              </span>
            ) : null}
            <div className="contact-actions">
              <button
                type="button"
                className="contact-btn contact-btn--ghost"
                onClick={polish}
                disabled={!filled || status === "polishing"}
              >
                {status === "polishing" ? "Polishing" : "Polish with AI"}
              </button>
              <button
                type="button"
                className="contact-btn contact-btn--send"
                onClick={send}
                disabled={!filled}
              >
                Send
                <span className="contact-send-badge">
                  <svg className="contact-send-icon" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 13.5V3M8 3 3.2 7.8M8 3l4.8 4.8" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="contact-seeds">
          {SEEDS.map((seed) => (
            <button
              key={seed.label}
              type="button"
              className="contact-seed"
              onClick={() => applySeed(seed.text)}
            >
              {seed.label}
            </button>
          ))}
        </div>

        <div className="contact-direct">
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="contact-phone">
            +54 9 351 347 1844
          </a>
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct-link"
            >
              {c.label}
            </a>
          ))}
          <span className="contact-place">Córdoba, Argentina</span>
        </div>
      </div>

      <footer className="contact-footer">
        <span>&copy; {new Date().getFullYear()} Nuba Studio</span>
      </footer>
    </section>
  );
}
