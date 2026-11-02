"use client";

import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMotionValue } from "./motionValue";
import { optimizedSrc } from "../lib/optimizedImage";
import { useLenis } from "./SmoothScroll";
import { startCaseTransition } from "./caseTransition";
import WebGLErrorBoundary from "./WebGLErrorBoundary";
import { visibleWorks } from "../data/works";
import { localizeWork } from "../lib/localizeWork";
import { useLanguage } from "../lib/i18n";
import { getUiText } from "../lib/uiText";

/**
 * La espiral 3D (three.js + react-three-fiber + drei: ~250 KB comprimidos) vive en
 * WorksSpiral.tsx y se descarga recién cuando hace falta: nunca en móvil, en la vista
 * lista ni en navegadores sin WebGL. HomeClient la precarga apenas confirma que el
 * equipo la va a usar, así en escritorio ya está lista cuando termina el loader.
 */
let spiralModule: Promise<typeof import("./WorksSpiral")> | null = null;
export function preloadSpiral() {
  spiralModule ??= import("./WorksSpiral").catch((err) => {
    spiralModule = null; // permite reintentar; mientras tanto el error boundary muestra la lista
    throw err;
  });
  return spiralModule;
}
const WorksSpiral = lazy(preloadSpiral);

/* ───────── Works ───────── */
export default function Works({
  view,
  setView,
  webglAvailable = true,
  onWebGLFailed,
}: {
  view: "spiral" | "list";
  setView: (v: "spiral" | "list") => void;
  webglAvailable?: boolean;
  onWebGLFailed?: () => void;
}) {
  const effectiveView = webglAvailable ? view : "list";
  const prevViewRef = useRef(effectiveView);
  const sectionRef = useRef<HTMLElement>(null);
  const [mobile, setMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [labelTitle, setLabelTitle] = useState("");   // nombre del proyecto en hover
  const [labelImage, setLabelImage] = useState("");   // thumbnail del proyecto en hover
  const [labelOpen, setLabelOpen] = useState(false);  // dispara el slide del label
  const [hovered, setHovered] = useState<number | null>(null); // work activo en la lista
  const [listMode, setListMode] = useState<"grid" | "list" | "feed">("list"); // sub-vista dentro de list
  const initialModeSetRef = useRef(false); // en mobile arranca en grid (una sola vez, al detectar el viewport)
  const { lang, path } = useLanguage();
  const t = getUiText(lang);
  const localizedWorks = useMemo(() => visibleWorks.map((w) => localizeWork(w, lang)), [lang]);
  // El Canvas no se oculta con opacity: sigue en GPU (~360MB de texturas 4500px + CSS filter).
  // Lo desmontamos al pasar a lista, con un margen para el fade-out.
  const [canvasMounted, setCanvasMounted] = useState(
    () => webglAvailable && view === "spiral"
  );

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 768;
      setMobile(isMobile);
      if (!initialModeSetRef.current) {
        initialModeSetRef.current = true;
        if (isMobile) setListMode("grid");
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll INFINITO: integro la velocidad de Lenis en un offset continuo (nunca salta).
  // DIR = -1 → invertido: scroll hacia abajo mueve las cards en sentido contrario.
  const lenis = useLenis();
  const offset = useMotionValue(0);

  useEffect(() => {
    // Al cambiar de vista el layout de la sección cambia (list: auto · spiral: 600vh sticky):
    // volver arriba para que el sticky quede pineado y la espiral centrada.
    if (prevViewRef.current !== effectiveView) {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    prevViewRef.current = effectiveView;
  }, [effectiveView, lenis]);

  useEffect(() => {
    if (effectiveView === "spiral" && webglAvailable) {
      setCanvasMounted(true);
      return;
    }
    const t = setTimeout(() => setCanvasMounted(false), 500);
    return () => clearTimeout(t);
  }, [effectiveView, webglAvailable]);

  useEffect(() => {
    if (effectiveView !== "spiral") return;
    // El scale(1) snapea al entrar, pero si la altura del contenedor no cambió el ResizeObserver
    // no dispara y queda la medición vieja (hecha con scale 0.9). Forzamos re-medición enseguida.
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    return () => clearTimeout(t);
  }, [effectiveView]);

  const impulse = useMotionValue(0);   // skew por inercia del scroll (se suaviza, vuelve a 0 al frenar)
  const FACTOR = 0.00004;        // sensibilidad scroll → ciclos de recorrido (más rápido)
  const DIR = -1;                // invertido
  const IMPULSE = 0.0015;        // intensidad del efecto de impulso
  const AUTO_SPEED = 0.006;      // rotación automática: ciclos de recorrido por segundo (muy lento)
  const sensRef = useRef(FACTOR * DIR);
  const impRef = useRef(IMPULSE);
  const autoRef = useRef(AUTO_SPEED);   // magnitud de la rotación automática
  const autoDirRef = useRef(DIR);       // signo: sigue el último sentido del scroll
  const hoverCountRef = useRef(0);      // cards centrales con hover activo (>0 → frenar)
  const brakeRef = useRef(1);           // freno suavizado de la auto-rotación (1=corre · 0=frenado)
  sensRef.current = FACTOR * DIR; // se actualiza en cada render → el loop siempre lee el valor actual
  impRef.current = IMPULSE;
  autoRef.current = AUTO_SPEED;
  useEffect(() => {
    if (!lenis || effectiveView !== "spiral") return;
    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); // clamp: evita saltos al volver de pestaña en background
      prev = now;
      const v = lenis.velocity;
      // La rotación automática toma el sentido del último scroll (umbral: ignora ruido al frenar)
      if (Math.abs(v) > 5) autoDirRef.current = Math.sign(v) * DIR;
      // Freno: al hacer hover sobre una card central la auto-rotación se detiene (suave)
      const brakeTarget = hoverCountRef.current > 0 ? 0 : 1;
      brakeRef.current += (brakeTarget - brakeRef.current) * Math.min(1, dt * 6);
      // Avance = scroll (velocidad de Lenis) + rotación automática continua (por dt, frenable)
      const next =
        offset.get() +
        v * sensRef.current +
        autoRef.current * autoDirRef.current * dt * brakeRef.current;
      offset.set(next - Math.floor(next)); // wrap a [0,1): precisión estable, loop sin costura
      // Impulso: skew suavizado → scroll arriba = derecha · scroll abajo = izquierda
      const target = Math.max(-1, Math.min(1, -v * impRef.current));
      impulse.set(impulse.get() + (target - impulse.get()) * 0.12);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [lenis, offset, impulse, effectiveView]);

  // Canvas: solo existe en spiral (y 500ms de fade-out). En list no debe quedar
  // un WebGL context + texturas 4500px + filter:blur ocupando GPU.
  const canvas = useMemo(
    () =>
      webglAvailable && canvasMounted ? (
        <WebGLErrorBoundary onError={onWebGLFailed}>
          <Suspense fallback={null}>
            <WorksSpiral
              active={effectiveView === "spiral"}
              inView={inView}
              mobile={mobile}
              offset={offset}
              impulse={impulse}
              onSelect={(slug, image, rect) => startCaseTransition({ slug, image, rect })}
              onHoverStart={(title, image) => {
                hoverCountRef.current += 1;
                setLabelTitle(title);
                setLabelImage(image);
                setLabelOpen(true);
              }}
              onHoverEnd={() => {
                hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
                if (hoverCountRef.current === 0) setLabelOpen(false);
              }}
            />
          </Suspense>
        </WebGLErrorBoundary>
      ) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effectiveView, inView, mobile, webglAvailable, canvasMounted, onWebGLFailed]
  );

  // Abre el caso con la transición saliendo desde el thumbnail del item clickeado
  const openWork =
    (w: { slug: string; image: string }) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Deja pasar cmd/ctrl/shift-click al navegador para abrir en pestana nueva.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const preview = e.currentTarget.querySelector("img");
      const src = preview ?? e.currentTarget;
      const r = src.getBoundingClientRect();
      startCaseTransition({
        slug: w.slug,
        image: w.image,
        rect: { left: r.left, top: r.top, width: r.width, height: r.height },
      });
    };

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        height: effectiveView === "list" ? "auto" : mobile ? "600dvh" : "600vh",
        minHeight: effectiveView === "list" ? "100dvh" : undefined,
        position: "relative",
        background: "#000",
      }}
    >
      <style>{`
        .works-list {
          width: 100%;
          padding: clamp(7rem, 14vh, 10rem) clamp(1.25rem, 3vw, 2.5rem) clamp(3rem, 8vh, 5rem);
        }
        .works-list-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: clamp(1.5rem, 4vw, 2.75rem);
        }
        .works-mode {
          display: flex;
          align-items: baseline;
          gap: clamp(1.75rem, 5vw, 4.5rem);
        }
        .works-mode-btn {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(1.05rem, 1.8vw, 1.6rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.48);
          transition: color 0.25s ease;
        }
        .works-mode-btn:hover {
          color: rgba(255, 255, 255, 0.6);
        }
        .works-mode-btn.is-on {
          color: #fff;
        }
        @keyframes worksBodyIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .works-body-anim {
          animation: worksBodyIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .works-list-heading {
          margin: 0;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(1.7rem, 3.2vw, 2.7rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #fff;
        }
        .works-list-count {
          font-size: 0.38em;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.48);
          vertical-align: super;
          letter-spacing: 0;
          margin-left: 0.15em;
        }
        .works-list-row,
        .works-grid-item,
        .works-feed-item {
          text-decoration: none;
          color: inherit;
        }
        .works-list-row {
          width: 100%;
          display: grid;
          grid-template-columns: clamp(96px, 11vw, 148px) 1.2fr 1fr auto;
          align-items: center;
          column-gap: clamp(1.25rem, 4vw, 3.5rem);
          padding: 4px 0;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        .works-list-thumb,
        .works-list-cat,
        .works-list-year {
          transition: opacity 0.3s ease;
        }
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-thumb,
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-title,
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-cat,
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-year {
          opacity: 0.5;
        }
        .works-list-thumb {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 2px;
          position: relative;
        }
        .works-list-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .works-list-row.is-active .works-list-thumb img,
        .works-list-row:hover .works-list-thumb img {
          transform: scale(1.07);
        }
        .works-list-meta {
          display: contents;
        }
        .works-list-title {
          display: block;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(0.95rem, 1.25vw, 1.15rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: #fff;
          transition: color 0.25s ease, opacity 0.3s ease;
        }
        .works-list-row.is-active .works-list-title,
        .works-list-row:hover .works-list-title {
          color: #fff;
        }
        .works-list-cat {
          display: block;
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.48);
        }
        .works-list-year {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: rgba(255, 255, 255, 0.48);
          font-variant-numeric: tabular-nums;
          justify-self: end;
        }
        .works-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.75rem);
        }
        .works-grid-item {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
        }
        .works-grid-thumb {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 2px;
          position: relative;
        }
        .works-grid-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .works-grid-item:hover .works-grid-thumb img {
          transform: scale(1.06);
        }
        .works-grid-caption {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.65rem;
        }
        .works-grid-title {
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          font-weight: 500;
          color: #fff;
        }
        .works-grid-year {
          font-size: clamp(0.78rem, 0.95vw, 0.88rem);
          color: rgba(255, 255, 255, 0.48);
          font-variant-numeric: tabular-nums;
        }
        .works-grid-item,
        .works-feed-item {
          transition: opacity 0.3s ease;
        }
        .works-list.is-dim .works-grid-item:not(.is-active),
        .works-list.is-dim .works-feed-item:not(.is-active) {
          opacity: 0.5;
        }
        .works-feed {
          display: flex;
          flex-direction: column;
          gap: clamp(3rem, 7vh, 5.5rem);
          width: min(900px, 100%);
          margin: 0 auto;
        }
        .works-feed-item {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
        }
        .works-feed-thumb {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 2px;
          position: relative;
        }
        .works-feed-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .works-feed-item:hover .works-feed-thumb img {
          transform: scale(1.04);
        }
        .works-feed-caption {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.8rem;
        }
        .works-feed-title {
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-weight: 500;
          color: #fff;
        }
        .works-feed-cat {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: rgba(255, 255, 255, 0.48);
          margin-left: 0.9rem;
        }
        .works-feed-year {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: rgba(255, 255, 255, 0.48);
          font-variant-numeric: tabular-nums;
        }
        @media (max-width: 1023px) {
          .works-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 767px) {
          .works-list-row {
            grid-template-columns: 92px 1fr auto;
            column-gap: 1rem;
          }
          .works-list-meta {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            min-width: 0;
          }
          .works-feed-cat {
            display: none;
          }
          .works-mode-btn-feed {
            display: none;
          }
        }
        @media (max-width: 639px) {
          .works-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div
        style={{
          position: effectiveView === "list" ? "relative" : "sticky",
          top: effectiveView === "list" ? undefined : 0,
          height: effectiveView === "list" ? "auto" : mobile ? "100dvh" : "100vh",
          minHeight: effectiveView === "list" ? "100dvh" : undefined,
          width: "100%",
          overflow: effectiveView === "list" ? "visible" : "hidden",
          touchAction: effectiveView === "spiral" ? "pan-y" : "auto",
        }}
      >
        {/* Grid muy sutil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            maskImage: "radial-gradient(ellipse 78% 68% at 54% 50%, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 78% 68% at 54% 50%, black 25%, transparent 80%)",
            zIndex: 0,
            opacity: effectiveView === "spiral" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Glow radial detrás de la card activa */}
        <div
          style={{
            position: "absolute",
            left: "54%",
            top: "50%",
            width: "55vw",
            height: "55vw",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(198,255,0,0.06) 0%, rgba(255,255,255,0.035) 22%, transparent 60%)",
            filter: "blur(20px)",
            zIndex: 1,
            pointerEvents: "none",
            opacity: effectiveView === "spiral" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />


        {/* Canvas único con la curva de cards (drop-shadow real), memoizado */}
        {canvas}

        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 7,
            background:
              "radial-gradient(ellipse 82% 76% at 54% 50%, transparent 38%, rgba(0,0,0,0.72) 100%)",
            opacity: effectiveView === "spiral" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {effectiveView === "spiral" && (
          <>
        {/* Label del proyecto: card blanca que sube desde el medio-abajo de la pantalla */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "5%",
            transform: "translateX(-50%)",
            zIndex: 8,
            padding: "6px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              transform: labelOpen ? "translateY(0)" : "translateY(60vh)",
              transition: labelOpen
                ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"   // entra: desacelera al llegar
                : "transform 0.5s cubic-bezier(0.64, 0, 0.78, 1)",  // sale: misma curva reflejada (acelera al irse)
              willChange: "transform",
              display: "flex",
              alignItems: "center",
              gap: mobile ? "0.6rem" : "0.85rem",
              background: "#fff",
              color: "#000",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: mobile ? "0.95rem" : "1.3rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              padding: mobile ? "0.4rem 0.9rem 0.4rem 0.4rem" : "0.45rem 1.4rem 0.45rem 0.45rem",
              borderRadius: "10px",
              boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
            }}
          >
            {labelImage && (
              <img
                src={optimizedSrc(labelImage, 64)}
                alt=""
                style={{
                  height: mobile ? "1.9rem" : "2.4rem",
                  width: mobile ? "2.6rem" : "3.3rem",
                  objectFit: "cover",
                  borderRadius: "7px",
                  display: "block",
                  flexShrink: 0,
                }}
              />
            )}
            {labelTitle}
          </div>
        </div>

        {/* Scroll to explore */}
        <div
          style={{
            position: "absolute",
            right: "3.5rem",
            bottom: "3.5rem",
            zIndex: 10,
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            pointerEvents: "none",
            display: mobile ? "none" : "block",
          }}
        >
          {t.works.scrollToExplore}
        </div>
          </>
        )}

        {/* Vista lista: no montar thumbs en spiral (si no, el browser decodifica 7×4500px). */}
        {effectiveView === "list" && (
        <div
          className={`works-list${hovered !== null ? " is-dim" : ""}`}
          style={{
            position: "relative",
            zIndex: 9,
            pointerEvents: "auto",
          }}
        >
          <header className="works-list-head">
            <h2 className="works-list-heading">
              {t.works.heading}
              <sup className="works-list-count">({String(visibleWorks.length).padStart(2, "0")})</sup>
            </h2>
            <nav className="works-mode" aria-label="View mode">
              {(["grid", "list", "feed"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`works-mode-btn${listMode === m ? " is-on" : ""}${m === "feed" ? " works-mode-btn-feed" : ""}`}
                  onClick={() => setListMode(m)}
                >
                  {m === "grid" ? t.works.grid : m === "list" ? t.works.list : t.works.feed}
                </button>
              ))}
            </nav>
          </header>
          {listMode === "list" && (
          <div key="list" className="works-list-body works-body-anim">
          {localizedWorks.map((w, i) => {
            const isActive = effectiveView === "list" && hovered === i;
            return (
              <Link
                key={w.slug}
                href={path(`/cases/${w.slug}`)}
                className={`works-list-row${isActive ? " is-active" : ""}`}
                onClick={openWork(w)}
                onMouseEnter={() => {
                  if (effectiveView !== "list") return;
                  setHovered(i);
                }}
                onMouseLeave={() => setHovered(null)}
                style={{
                  opacity: effectiveView === "list" ? 1 : 0,
                  transform:
                    effectiveView === "list"
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transition: `opacity 0.6s ease ${effectiveView === "list" ? 0.12 + i * 0.06 : 0}s, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${effectiveView === "list" ? 0.12 + i * 0.06 : 0}s`,
                }}
              >
                <div className="works-list-thumb">
                  <Image src={w.image} alt={`${w.title} - ${w.subtitle}`} fill sizes="148px" priority={i === 0} />
                </div>
                <div className="works-list-meta">
                  <span className="works-list-title">{w.title}</span>
                  <span className="works-list-cat">{w.subtitle}</span>
                </div>
                <span className="works-list-year">{w.year}</span>
              </Link>
            );
          })}
          </div>
          )}
          {listMode === "grid" && (
            <div key="grid" className="works-grid works-body-anim">
              {localizedWorks.map((w, i) => (
                <Link
                  key={w.slug}
                  href={path(`/cases/${w.slug}`)}
                  className={`works-grid-item${hovered === i ? " is-active" : ""}`}
                  onClick={openWork(w)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="works-grid-thumb">
                    <Image src={w.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" priority={i === 0} />
                  </div>
                  <div className="works-grid-caption">
                    <span className="works-grid-title">{w.title}</span>
                    <span className="works-grid-year">{w.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {listMode === "feed" && (
            <div key="feed" className="works-feed works-body-anim">
              {localizedWorks.map((w, i) => (
                <Link
                  key={w.slug}
                  href={path(`/cases/${w.slug}`)}
                  className={`works-feed-item${hovered === i ? " is-active" : ""}`}
                  onClick={openWork(w)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="works-feed-thumb">
                    <Image src={w.image} alt="" fill sizes="(max-width: 900px) 100vw, 900px" priority={i === 0} />
                  </div>
                  <div className="works-feed-caption">
                    <span>
                      <span className="works-feed-title">{w.title}</span>
                      <span className="works-feed-cat">{w.subtitle}</span>
                    </span>
                    <span className="works-feed-year">{w.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        )}
      </div>
    </section>
  );
}
