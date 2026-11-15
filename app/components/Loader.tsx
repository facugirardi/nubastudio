"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { getLenis } from "./SmoothScroll";
import { NUBA_CLOUD_PATH, NUBA_MARK_PATH } from "./NubaMark";
import { LOADER_ID, LOADER_KEY, markRevealed } from "../lib/loaderGate";

const SIZE = 96;
const BASE = SIZE / 78;
/** Centro de la parte más ancha de la nube (coordenadas del logo): el zoom entra por ahí. */
const OX = 43;
const OY = 42;

/**
 * Corre antes del primer pintado: si ya se vio en la sesión o la persona pidió
 * menos movimiento, el loader no llega a aparecer (sin parpadeo). Si se muestra,
 * marca <html data-loader="on">: el título del hero sale visible debajo del loader
 * y Chrome cuenta el LCP en el primer pintado, no cuando se abre la nube.
 */
const SKIP_SCRIPT = `(function(){try{var d=document.getElementById("${LOADER_ID}");if(!d)return;if(sessionStorage.getItem("${LOADER_KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){d.style.display="none";d.dataset.state="skip"}else{document.documentElement.style.overflow="hidden";document.documentElement.dataset.loader="on"}}catch(e){}})()`;

/**
 * Loader de la home (una vez por sesión). El trazo del logo es la barra de progreso:
 * avanza con lo que de verdad carga en la primera pantalla (fuentes e imágenes).
 * Al completarse se llena de lima y la cámara entra por la nube, que funciona de
 * ventana al sitio. El hero arranca cuando la nube se abre (loaderGate).
 * Mínimo 0,9 s para que se vea el dibujo; a los 3 s se abre pase lo que pase.
 */
export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const zoomRef = useRef<SVGGElement>(null);
  const holeRef = useRef<SVGGElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      try {
        sessionStorage.setItem(LOADER_KEY, "1");
      } catch {}
      root.dataset.state = "done";
      root.style.display = "none";
      delete document.documentElement.dataset.loader;
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      markRevealed();
    };

    let skip = root.dataset.state === "skip";
    try {
      skip ||= sessionStorage.getItem(LOADER_KEY) === "1";
    } catch {}
    skip ||= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      root.dataset.state = "skip";
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();

    const end = Math.hypot(window.innerWidth, window.innerHeight) / 12;
    // El logo y la ventana del sitio (máscara) viven en SVG distintos: se les escribe
    // la misma transformación a mano para que la nube y el calado coincidan exacto.
    const zoom = { k: 1 };
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const applyZoom = () => {
      const t = `translate(${cx} ${cy}) scale(${BASE}) translate(-39 -39) translate(${OX} ${OY}) scale(${zoom.k}) translate(${-OX} ${-OY})`;
      zoomRef.current?.setAttribute("transform", t);
      holeRef.current?.setAttribute("transform", t);
    };
    applyZoom();

    // ── Progreso real: lo que se ve en la primera pantalla (fuentes e imágenes) ──
    // La luz WebGL del hero no se espera: en celulares lentos tarda segundos y llega sola después.
    const done = { fonts: false, images: false };
    const WEIGHT = { fonts: 0.4, images: 0.6 };
    const target = () => 0.08 + 0.92 * (Object.keys(done) as (keyof typeof done)[]).reduce((a, k) => a + (done[k] ? WEIGHT[k] : 0), 0);
    const timers: number[] = [];
    const after = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    document.fonts?.ready.then(() => (done.fonts = true)).catch(() => (done.fonts = true));
    if (!document.fonts) done.fonts = true;

    // Solo las imágenes de la primera pantalla: lo de más abajo (o de terceros) no frena la entrada.
    const firstScreen = [...document.images].filter((img) => {
      if (root.contains(img)) return false;
      const r = img.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
    });
    Promise.all(
      firstScreen.map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
      )
    ).then(() => (done.images = true));

    // Red de seguridad: pase lo que pase, a los 3 s se abre.
    after(3000, () => Object.assign(done, { fonts: true, images: true }));

    const started = performance.now();
    const MIN_MS = 900;
    const progress = { p: 0 };
    let finale: gsap.core.Timeline | null = null;

    gsap.fromTo(captionRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 });

    const tick = () => {
      const goal = target();
      // Avanza suave hacia lo que de verdad cargó; nunca retrocede.
      progress.p = Math.min(goal, progress.p + Math.max(0.004, (goal - progress.p) * 0.08));
      if (strokeRef.current) strokeRef.current.style.strokeDashoffset = String(1 - progress.p);
      if (counterRef.current) counterRef.current.textContent = String(Math.round(progress.p * 100)).padStart(3, "0");

      if (!finale && progress.p >= 0.999 && performance.now() - started >= MIN_MS) {
        gsap.ticker.remove(tick);
        finale = gsap
          .timeline({ onComplete: finish })
          .to(fillRef.current, { opacity: 1, duration: 0.25, ease: "power1.out" }, 0)
          .to(strokeRef.current, { opacity: 0, duration: 0.2 }, 0.1)
          .to(captionRef.current, { opacity: 0, y: -6, duration: 0.2, ease: "power2.in" }, 0.15)
          .set(holeRef.current, { opacity: 1 }, 0.3)
          .call(markRevealed, [], 0.3)
          .to(zoom, { k: end, duration: 0.75, ease: "power4.in", onUpdate: applyZoom }, 0.3);
      }
    };
    gsap.ticker.add(tick);

    // Solo se frena: en desarrollo React monta dos veces y la segunda tiene que poder arrancar de cero.
    return () => {
      gsap.ticker.remove(tick);
      finale?.kill();
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      id={LOADER_ID}
      ref={rootRef}
      aria-hidden
      suppressHydrationWarning
      className="fixed inset-0 z-[9999] overflow-hidden"
    >
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
      {/* Sin JS (o si falla) el loader no puede quedar tapando la página. */}
      <noscript>
        <style>{`#${LOADER_ID}{display:none!important}`}</style>
      </noscript>
      <style>{`#${LOADER_ID}{animation:nuba-loader-failsafe 0s linear 5s forwards}@keyframes nuba-loader-failsafe{to{visibility:hidden;pointer-events:none}}`}</style>
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <mask id="nuba-loader-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <g ref={holeRef} opacity={0}>
              <path d={NUBA_CLOUD_PATH} fill="#000" />
            </g>
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="#000" mask="url(#nuba-loader-mask)" />

        <g ref={zoomRef}>
          <path ref={fillRef} d={NUBA_MARK_PATH} fillRule="evenodd" fill="#C6FF00" opacity={0} />
          <path
            ref={strokeRef}
            d={NUBA_MARK_PATH}
            fill="none"
            stroke="#EDEDED"
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </g>
      </svg>

      <p
        ref={captionRef}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 items-baseline gap-2.5 whitespace-nowrap font-display text-[17px] font-semibold tracking-[-0.04em] text-[#EDEDED] opacity-0"
        style={{ marginTop: SIZE / 2 + 26 }}
      >
        Nuba Studio
        <span ref={counterRef} className="text-[13px] font-medium tabular-nums tracking-[-0.01em] text-[#C6FF00]">
          000
        </span>
      </p>
    </div>
  );
}
