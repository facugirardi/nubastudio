"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import NubaMark from "./NubaMark";
import { getLenis } from "./SmoothScroll";
import { langFromPathname } from "../lib/lang";
import { LOADER_KEY, markHydrated } from "../lib/loaderGate";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const COVER_MS = 520;
const REVEAL_MS = 680;
const MAX_WAIT_MS = 6000;

/**
 * Los links internos comunes (<a> y next/link) navegan sin recargar, tapados por un telón
 * que sube con un filo lima. Los casos quedan afuera: tienen su propio morph de imagen.
 * Cambiar de idioma, anclas, archivos y links con modificadores siguen siendo navegación normal.
 */
function internalUrl(a: HTMLAnchorElement): URL | null {
  if (!a.href || (a.target && a.target !== "_self") || a.hasAttribute("download")) return null;
  if (a.dataset.transition === "off") return null;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.hash) return null;
  if (url.pathname === location.pathname) return null;
  if (langFromPathname(url.pathname) !== langFromPathname(location.pathname)) return null;
  if (/\/cases\//.test(url.pathname) || /\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith("/api")) return null;
  return url;
}

function anchorFrom(e: Event) {
  const el = e.target as Element | null;
  return el?.closest?.("a") ?? null;
}

function nextFrame() {
  return new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<string | null>(null);
  const busyRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [label, setLabel] = useState("");

  const reveal = useRef<() => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const edge = edgeRef.current;
    const inner = innerRef.current;
    const content = contentRef.current;
    if (!root || !panel || !edge || !inner || !content) return;

    // Solo transform y opacity: el telón se mueve en el compositor, sin repintar la pantalla.
    // El panel se desliza y su interior hace el movimiento inverso, así el logo queda quieto
    // y el borde del panel lo va tapando o destapando.
    const slide = (from: number, to: number, duration: number) => {
      const opts = { duration, easing: EASE, fill: "forwards" as const };
      inner.animate([{ transform: `translateY(${-from}%)` }, { transform: `translateY(${-to}%)` }], opts);
      return panel.animate([{ transform: `translateY(${from}%)` }, { transform: `translateY(${to}%)` }], opts);
    };

    markHydrated();
    const prefetched = new Set<string>();

    const finish = () => {
      root.style.visibility = "hidden";
      root.style.pointerEvents = "none";
      busyRef.current = false;
      targetRef.current = null;
    };

    reveal.current = async () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      targetRef.current = null;
      await nextFrame();
      gsap.globalTimeline.resume();
      const h = window.innerHeight;
      content.animate([{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-12px)" }], {
        duration: REVEAL_MS * 0.4,
        easing: "ease-in",
        fill: "forwards",
      });
      edge.animate([{ transform: `translateY(${h}px)` }, { transform: "translateY(-2px)" }], {
        duration: REVEAL_MS,
        easing: EASE,
        fill: "forwards",
      });
      slide(0, -100, REVEAL_MS).onfinish = finish;
    };

    const cover = (url: URL) => {
      busyRef.current = true;
      const href = url.pathname + url.search;
      setLabel(url.pathname.replace(/^\/es(?=\/|$)/, "") || "/");
      try {
        sessionStorage.setItem(LOADER_KEY, "1");
      } catch {}
      getLenis()?.stop();
      [panel, inner, edge, content].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));

      root.style.visibility = "visible";
      root.style.pointerEvents = "auto";
      const h = window.innerHeight;
      content.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: COVER_MS * 0.7, delay: COVER_MS * 0.45, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" }
      );
      edge.animate([{ transform: `translateY(${h}px)` }, { transform: "translateY(-2px)" }], {
        duration: COVER_MS,
        easing: EASE,
        fill: "forwards",
      });
      slide(100, 0, COVER_MS).onfinish = () => {
        targetRef.current = url.pathname;
        // Las entradas de la página nueva (reveals, titulares) esperan a que el telón se levante.
        gsap.globalTimeline.pause();
        timeoutRef.current = setTimeout(() => reveal.current(), MAX_WAIT_MS);
        router.push(href);
      };
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = anchorFrom(e);
      if (!a) return;
      const url = internalUrl(a);
      if (!url) return;
      e.preventDefault();
      if (busyRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(url.pathname + url.search);
        return;
      }
      cover(url);
    };

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const a = anchorFrom(e);
      if (!a) return;
      const url = internalUrl(a);
      if (!url) return;
      const href = url.pathname + url.search;
      if (prefetched.has(href)) return;
      prefetched.add(href);
      router.prefetch(href);
    };

    window.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    return () => {
      window.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", onPointerOver);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      gsap.globalTimeline.resume();
    };
  }, [router]);

  useEffect(() => {
    if (targetRef.current && targetRef.current === window.location.pathname) reveal.current();
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[150]"
      style={{ visibility: "hidden" }}
    >
      <div
        ref={panelRef}
        className="absolute inset-0 overflow-hidden bg-black"
        style={{ transform: "translateY(100%)" }}
      >
        <div ref={innerRef} className="absolute inset-0" style={{ transform: "translateY(-100%)" }}>
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-position:center_center] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_50%,black,transparent_80%)]" />
          <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0">
            <NubaMark className="h-8 w-8 text-[#EDEDED]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
              <span className="text-white/25">nuba.studio</span>
              {label === "/" ? "" : label}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={edgeRef}
        className="absolute inset-x-0 top-0 h-px bg-[#C6FF00] shadow-[0_0_24px_2px_rgba(198,255,0,0.45)]"
        style={{ transform: "translateY(100vh)" }}
      />
    </div>
  );
}
