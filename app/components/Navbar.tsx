"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import LogoMark from "./LogoMark";

const NAV_LINKS = ["Work", "About", "Services", "Contact"];

const CHIP_W = 92;
const CHIP_H = 40;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5493513471844",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
];

export default function Navbar({
  visible,
  view,
  setView,
  showToggle = true,
}: {
  visible: boolean;
  view: "spiral" | "list";
  setView: (v: "spiral" | "list") => void;
  showToggle?: boolean;
}) {
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, thumbStart: 0 });
  const ignoreClickRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Margen lateral del nav / anclaje del chip-panel (más chico en mobile)
  const padX = isMobile ? "1.25rem" : "2.5rem";
  // Chip: pill "menu" en desktop · botón cuadrado con hamburguesa en mobile
  const chipW = isMobile ? 46 : CHIP_W;

  // Scramble/decode: al hacer hover las letras ciclan suave y se fijan formando la palabra
  const scrambleRafs = useRef(new WeakMap<HTMLElement, number>());
  const runScramble = (el: HTMLElement, finalText: string, duration = 400) => {
    const prev = scrambleRafs.current.get(el);
    if (prev) cancelAnimationFrame(prev);
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const len = finalText.length;
    const cache = new Array(len).fill("");
    const start = performance.now();
    let lastSwap = 0;
    const SWAP_MS = 70; // las letras random cambian cada 70ms → gentle, no frenético
    // easeInOutCubic: el avance del "decode" entra y sale suave
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const step = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const t = ease(raw);
      const swap = now - lastSwap >= SWAP_MS;
      if (swap) lastSwap = now;
      el.replaceChildren();
      for (let i = 0; i < len; i++) {
        const c = finalText[i];
        if (c === " ") { el.append(" "); continue; }
        const span = document.createElement("span");
        if (t >= (i + 1) / len) {
          span.textContent = c; // esta letra ya se asentó (negro normal)
        } else {
          if (swap || !cache[i]) cache[i] = chars[(Math.random() * chars.length) | 0];
          span.textContent = cache[i]; // encriptada: bloque negro + letra blanca
          span.className = "enc";
        }
        el.append(span);
      }
      if (raw < 1) {
        scrambleRafs.current.set(el, requestAnimationFrame(step));
      } else {
        el.textContent = finalText;
        scrambleRafs.current.delete(el);
      }
    };
    scrambleRafs.current.set(el, requestAnimationFrame(step));
  };

  // Bounce escalonado de las letras de "menu" (hover + al cerrar el panel)
  const bounceMenuChars = (delay = 0) => {
    const chars = labelRef.current?.querySelectorAll<HTMLElement>(".menu-char");
    if (!chars) return;
    const tl = gsap.timeline({ overwrite: true, delay });
    chars.forEach((char, i) => {
      tl.to(char, {
        y: -5,
        rotation: 6,
        fontWeight: 700,
        fontSize: "17px",
        duration: 0.2,
        ease: "power2.out",
      }, i * 0.07)
      .to(char, {
        y: 0,
        rotation: 0,
        fontWeight: 400,
        fontSize: "16px",
        duration: 0.25,
        ease: "power2.in",
      }, i * 0.07 + 0.2);
    });
  };

  // Posición x del thumb para la opción "list" (spiral = 0)
  const slotMax = () => {
    const c = toggleRef.current;
    return c ? c.clientWidth / 2 - 4 : 0;
  };

  // Sincroniza el thumb con la vista (cuando NO se está arrastrando) — con overshoot
  useEffect(() => {
    if (dragRef.current.active) return;
    gsap.to(thumbRef.current, {
      x: view === "list" ? slotMax() : 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      overwrite: true,
    });
  }, [view, isMobile]);

  const onThumbDown = (e: React.PointerEvent) => {
    // No capturamos el puntero todavía: un click simple debe seguir funcionando.
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      thumbStart: Number(gsap.getProperty(thumbRef.current, "x")),
    };
  };

  const onThumbMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 4) {
      // Recién acá pasa a ser un arrastre real → capturamos el puntero.
      d.moved = true;
      try { toggleRef.current?.setPointerCapture(e.pointerId); } catch {}
      gsap.to(thumbRef.current, { scale: 1.16, duration: 0.2, ease: "power3.out", overwrite: "auto" });
    }
    if (d.moved) {
      const max = slotMax();
      const nx = Math.max(0, Math.min(max, d.thumbStart + dx));
      gsap.set(thumbRef.current, { x: nx });
      // Color en vivo: la opción bajo el thumb se vuelve negra (índice 0 = spiral, 1 = list)
      const listActive = nx >= max / 2;
      toggleRef.current?.querySelectorAll(".view-opt").forEach((b, i) => {
        const active = i === 0 ? !listActive : listActive;
        (b as HTMLElement).style.color = active ? "#000" : "rgba(255,255,255,0.6)";
      });
    }
  };

  const onThumbUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    if (d.moved) toggleRef.current?.releasePointerCapture(e.pointerId);
    d.active = false;
    gsap.to(thumbRef.current, { scale: 1, duration: 0.35, ease: "back.out(2)", overwrite: "auto" });
    if (d.moved) {
      ignoreClickRef.current = true;
      setTimeout(() => (ignoreClickRef.current = false), 60);
      const max = slotMax();
      const toList = Number(gsap.getProperty(thumbRef.current, "x")) > max / 2;
      gsap.to(thumbRef.current, { x: toList ? max : 0, duration: 0.4, ease: "back.out(2)", overwrite: true });
      const target = toList ? "list" : "spiral";
      if (target !== view) setView(target);
    }
  };

  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(
      navRef.current,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.8, ease: "power3.out" }
    );
  }, [visible]);

  // El chip "Menu" y el panel son el MISMO elemento: al abrir crece de chip a panel.
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const label = labelRef.current;
    const content = contentRef.current;
    if (!panel || !overlay || !label || !content) return;

    // Mobile: casi fullscreen (margen simétrico = padX). Desktop: columna a la derecha.
    const mobile = window.innerWidth < 768;
    const mPad = 20; // 1.25rem en px → debe coincidir con padX en mobile
    const chipW = mobile ? 46 : CHIP_W;
    const openW = mobile ? window.innerWidth - mPad * 2 : Math.min(window.innerWidth * 0.34, 460);
    const openH = window.innerHeight - 38.4; // top 1.5rem + bottom 0.9rem

    if (open) {
      gsap.to(panel, { x: 0, y: 0, scaleX: 1, scaleY: 1, width: openW, height: openH, borderRadius: 24, duration: 0.7, ease: "power4.inOut", overwrite: true });
      gsap.to(label, { opacity: 0, duration: 0.2, ease: "power2.out", overwrite: true });
      gsap.to(content, { opacity: 1, duration: 0.45, delay: 0.3, ease: "power2.out", overwrite: true });
      gsap.fromTo(
        content.querySelectorAll("[data-stagger]"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, delay: 0.42, ease: "power3.out", overwrite: true }
      );
      gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out", overwrite: true });
    } else {
      gsap.timeline()
        .to(panel, { width: chipW, height: CHIP_H, borderRadius: 999, duration: 0.5, ease: "power3.inOut", overwrite: true })
        .to(panel, { scaleX: 1.12, scaleY: 0.84, transformOrigin: "center center", duration: 0.16, ease: "power2.out" }, "-=0.1")
        .to(panel, { scaleX: 1, scaleY: 1, duration: 1, ease: "elastic.out(1, 0.5)" });
      gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.3, ease: "power2.out", overwrite: true });
      bounceMenuChars(0.5);
      gsap.to(content, { opacity: 0, duration: 0.15, ease: "power2.in", overwrite: true });
      gsap.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.in", overwrite: true });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        .menu-label, .view-opt, .menu-panel-link, .menu-close, .menu-email {
          font-family: var(--font-outfit), sans-serif;
          font-weight: 400;
        }
        .menu-label {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          letter-spacing: 0.01em;
          color: #000;
          pointer-events: auto;
          white-space: nowrap;
        }

        .view-toggle {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          height: 40px;
          padding: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
        }
        .view-thumb {
          position: absolute;
          top: 4px;
          left: 4px;
          bottom: 4px;
          width: calc(50% - 4px);
          background: #fff;
          border-radius: 999px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          cursor: grab;
          touch-action: none;
        }
        .view-thumb:active { cursor: grabbing; }
        .view-opt {
          position: relative;
          z-index: 1;
          width: 6rem;
          height: 100%;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: center;
          font-weight: 400;
          font-size: 0.78rem;
          letter-spacing: -0.01em;
          text-transform: lowercase;
          transition: color 0.3s ease;
        }

        .menu-panel-link {
          display: block;
          font-size: clamp(2.2rem, min(5.5vw, 7.5vh), 4.4rem);
          line-height: 1.06;
          font-weight: 400;
          letter-spacing: -0.025em;
          color: #000;
          text-decoration: none;
          width: fit-content;
          font-variant-numeric: tabular-nums;
          cursor: pointer;
        }
        .menu-panel-link .enc {
          background: #000;
          color: #fff;
          border-radius: 0;
        }
        .menu-close {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #000;
          font-size: 0.85rem;
          letter-spacing: 0.02em;
        }
        .menu-close .x {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .menu-close:hover .x { transform: rotate(90deg); }
        .menu-email {
          color: #000;
          text-decoration: none;
          font-size: 1rem;
          opacity: 0.7;
          transition: opacity 0.25s;
        }
        .menu-email:hover { opacity: 1; }
        .menu-social {
          position: relative;
          overflow: hidden;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }
        .menu-social::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #C6FF00;
          transform: translateY(101%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }
        .menu-social svg { position: relative; z-index: 1; }
        .menu-social:hover { color: #000; }
        .menu-social:hover::before { transform: translateY(0); }

        @media (max-width: 767px) {
          .view-opt { width: 4.4rem; font-size: 0.72rem; }
        }
      `}</style>

      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: `1.5rem ${padX}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: 0,
          background: "transparent",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Nuba Studio — inicio"
          style={{ display: "flex", alignItems: "center" }}
        >
          <LogoMark play={visible} />
        </a>

        {/* Spiral / List toggle (centro) — thumb arrastrable */}
        {showToggle ? (
          <div
            className="view-toggle"
            ref={toggleRef}
            onPointerDown={onThumbDown}
            onPointerMove={onThumbMove}
            onPointerUp={onThumbUp}
            onPointerCancel={onThumbUp}
          >
            <span ref={thumbRef} className="view-thumb" />
            {(["spiral", "list"] as const).map((opt) => (
              <button
                key={opt}
                className="view-opt"
                onClick={() => { if (ignoreClickRef.current) return; setView(opt); }}
                style={{ color: view === opt ? "#000" : "rgba(255,255,255,0.6)" }}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}

        {/* Espaciador para mantener el layout (el morph va por fuera del nav) */}
        <span style={{ width: chipW, height: CHIP_H, display: "block" }} />
      </nav>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1001,
          background: "rgba(0,0,0,0.45)",
          opacity: 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Morph: chip "Menu" ⇄ panel (mismo elemento) */}
      <div
        ref={panelRef}
        onClick={() => { if (!open) setOpen(true); }}
        style={{
          position: "fixed",
          top: "1.5rem",
          right: padX,
          zIndex: 1002,
          width: chipW,
          height: CHIP_H,
          background: "#fff",
          borderRadius: 999,
          overflow: "hidden",
          cursor: open ? "default" : "pointer",
          boxShadow: "0 18px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Etiqueta del chip */}
        <span
          ref={labelRef}
          className="menu-label"
          onMouseEnter={() => {
            if (open) return;
            // El chip se deforma un poco (squash & stretch) y rebota
            gsap.timeline({ overwrite: true })
              .to(panelRef.current, { scaleX: 1.06, scaleY: 0.9, transformOrigin: "center center", duration: 0.4, ease: "power2.inOut" })
              .to(panelRef.current, { scaleX: 1, scaleY: 1, duration: 1.1, ease: "elastic.out(1, 0.55)" });
            bounceMenuChars();
          }}
          onMouseLeave={() => {}}
        >
          {isMobile ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          ) : (
            "menu".split("").map((char, i) => (
              <span key={i} className="menu-char" style={{ display: "inline-block" }}>{char}</span>
            ))
          )}
        </span>

        {/* Contenido del panel (tamaño abierto fijo, se revela al crecer) */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: isMobile ? "calc(100vw - 40px)" : "min(34vw, 460px)",
            height: "100%",
            padding: isMobile ? "1.4rem 1.6rem 1.7rem" : "1.6rem 2.5rem 1.8rem",
            display: "flex",
            flexDirection: "column",
            opacity: 0,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {/* Close */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="menu-close"
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              aria-label="Close menu"
            >
              close
              <span className="x">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </span>
            </button>
          </div>

          {/* Links */}
          <nav style={{ marginTop: "auto", marginBottom: "auto", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                data-stagger
                href={link === "Work" ? undefined : link === "About" ? "/about" : link === "Services" ? "/services" : link === "Contact" ? "/contact" : `#${link.toLowerCase()}`}
                className="menu-panel-link"
                onMouseEnter={(e) => runScramble(e.currentTarget, link.toLowerCase())}
                onClick={(e) => {
                  if (link === "Work") {
                    e.preventDefault();
                    setOpen(false);
                    if (pathname !== "/") {
                      window.location.href = "/?view=list";
                      return;
                    }
                    if (view === "spiral") {
                      setView("list");
                      setTimeout(() => {
                        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }
                  } else if (link === "About") {
                    e.preventDefault();
                    setOpen(false);
                    window.location.href = "/about";
                  } else if (link === "Services") {
                    e.preventDefault();
                    setOpen(false);
                    window.location.href = "/services";
                  } else if (link === "Contact") {
                    e.preventDefault();
                    setOpen(false);
                    window.location.href = "/contact";
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {link.toLowerCase()}
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <a data-stagger href="mailto:hello@nubastudio.com" className="menu-email">
              hello@nubastudio.com
            </a>
            <div data-stagger style={{ display: "flex", gap: "0.7rem" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
