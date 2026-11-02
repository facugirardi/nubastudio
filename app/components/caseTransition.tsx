"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { getLenis } from "./SmoothScroll";
import { heroImageSet } from "../lib/optimizedImage";

/* ───────── Store de módulo: sobrevive la navegación SPA de Next ───────── */
export type CaseTransitionPayload = {
  image: string;
  slug: string;
  rect: { left: number; top: number; width: number; height: number };
};

type Listener = (p: CaseTransitionPayload) => void;
let listener: Listener | null = null;

// El hero del caso pinta la imagen en un box de 120vh centrado (inset: -10% 0)
// para tener recorrido de parallax. El morph termina en ese mismo encuadre,
// así el overlay y el hero coinciden pixel a pixel y el relevo no se ve.
export const HERO_OVERSCAN = 0.2;

const MORPH = 1.15; // duración del zoom card → hero
const NAV_AT = 0.46; // fracción del morph en la que se dispara el router.push
const RADIUS = 12;
const DECODE_MAX = 260; // ms de gracia para decodificar la imagen antes de arrancar

let prefetch: ((slug: string) => void) | null = null;

// Se dispara desde la card del spiral (o la lista) al clickear un proyecto.
export function startCaseTransition(p: CaseTransitionPayload) {
  if (listener) listener(p);
  else window.location.href = `/cases/${p.slug}`; // fallback sin overlay montado
}

// Calienta la ruta en hover: el mount de la página de caso deja de robarle
// frames al morph justo cuando está a mitad de camino.
export function prefetchCase(slug: string) {
  prefetch?.(slug);
}

/* ───────── Coordinación con la página de caso que monta debajo ───────── */
let entryDelay = 0;
let heroReady: (() => void) | null = null;

// La página de caso espera a que el overlay se haya retirado para animar su
// contenido; sin transición previa usa el fallback.
export function consumeCaseEntryDelay(fallback = 0.15) {
  const d = entryDelay || fallback;
  entryDelay = 0;
  return d;
}

export function markCaseHeroReady() {
  heroReady?.();
  heroReady = null;
}

function waitForHero(timeout: number) {
  return new Promise<void>((resolve) => {
    const t = setTimeout(() => {
      heroReady = null;
      resolve();
    }, timeout);
    heroReady = () => {
      clearTimeout(t);
      resolve();
    };
  });
}

function decoded(img: HTMLImageElement) {
  const ready = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
  return Promise.race([ready, new Promise((r) => setTimeout(r, DECODE_MAX))]);
}

/* ───────── Overlay: morph de la imagen (card → hero fullscreen) ───────── */
export default function CaseTransitionProvider() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    prefetch = (slug) => router.prefetch(`/cases/${slug}`);

    listener = async (p) => {
      const root = rootRef.current;
      const backdrop = backdropRef.current;
      const wrap = wrapRef.current;
      const img = imgRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!root || !backdrop || !wrap || !img || busyRef.current || reduced) {
        router.push(`/cases/${p.slug}`);
        return;
      }
      busyRef.current = true;

      const lenis = getLenis();
      lenis?.stop();

      // El hero mide en unidades de CSS (100vh), que en mobile no coincide con
      // innerHeight; se mide con una sonda para que el morph cierre en su sitio.
      const probe = document.createElement("div");
      probe.style.cssText =
        "position:fixed;top:0;left:0;width:0;height:100vh;visibility:hidden;pointer-events:none";
      document.body.appendChild(probe);
      const vh = probe.offsetHeight || window.innerHeight;
      probe.remove();

      const vw = document.documentElement.clientWidth;
      const heroH = vh * (1 + HERO_OVERSCAN);
      // El wrap arranca escalado uniformemente (nunca deforma la imagen) y el
      // sobrante se recorta con clip-path, que sólo cuesta paint. La escala es la
      // que cubre la card en ambos ejes, así el primer frame calza con el thumb.
      const scale = Math.max(p.rect.width / vw, p.rect.height / heroH);
      const cropX = Math.max(0, (vw - p.rect.width / scale) / 2);
      const cropY = Math.max(0, (heroH - p.rect.height / scale) / 2);

      // Los cuatro lados + el radio siempre explícitos: si el navegador serializa
      // la forma corta, GSAP interpola los números fuera de lugar.
      const clipFrom = `inset(${cropY}px ${cropX}px ${cropY}px ${cropX}px round ${RADIUS / scale}px)`;
      const clipTo = "inset(0px 0px 0px 0px round 0px)";
      const from = {
        x: p.rect.left - cropX * scale,
        y: p.rect.top - cropY * scale,
        scale,
        clipPath: clipFrom,
      };

      // Misma variante que el hero: el relevo reusa la descarga en vez de bajar el original.
      if (img.dataset.src !== p.image) {
        const set = heroImageSet(p.image);
        img.dataset.src = p.image;
        img.sizes = set.sizes;
        img.srcset = set.srcSet;
        img.src = set.src;
      }

      gsap.set(root, { opacity: 1, pointerEvents: "auto" });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(wrap, {
        width: vw,
        height: heroH,
        transformOrigin: "0 0",
        force3D: true,
        ...from,
      });

      // Si la imagen todavía no está decodificada, el primer frame del morph
      // llega vacío o con un stall del hilo principal.
      await decoded(img);
      if (!busyRef.current) return;

      const tl = gsap.timeline({
        onComplete: async () => {
          await waitForHero(700);
          gsap.to(root, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
            onComplete: () => {
              gsap.set(root, { pointerEvents: "none" });
              gsap.set(wrap, { clearProps: "clipPath" });
              busyRef.current = false;
              getLenis()?.start();
            },
          });
        },
      });

      tl.to(backdrop, { opacity: 1, duration: MORPH * 0.45, ease: "power2.out" }, 0)
        .fromTo(
          wrap,
          from,
          {
            x: 0,
            y: (-vh * HERO_OVERSCAN) / 2,
            scale: 1,
            clipPath: clipTo,
            duration: MORPH,
            ease: "power2.inOut",
            immediateRender: false,
          },
          0
        )
        // Navega antes de que termine el zoom → la página monta detrás del overlay
        .call(
          () => {
            entryDelay = MORPH * (1 - NAV_AT) + 0.3;
            router.push(`/cases/${p.slug}`);
          },
          undefined,
          MORPH * NAV_AT
        );
    };

    return () => {
      listener = null;
      prefetch = null;
    };
  }, [router]);

  return (
    <div
      ref={rootRef}
      data-case-overlay
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        opacity: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div ref={backdropRef} style={{ position: "absolute", inset: 0, background: "#000" }} />
      <div
        ref={wrapRef}
        data-case-morph
        style={{ position: "absolute", left: 0, top: 0, willChange: "transform, clip-path" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          alt=""
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
