"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

/* ───────── Store de módulo: sobrevive la navegación SPA de Next ───────── */
export type CaseTransitionPayload = {
  image: string;
  slug: string;
  rect: { left: number; top: number; width: number; height: number };
};

type Listener = (p: CaseTransitionPayload) => void;
let listener: Listener | null = null;

// Se dispara desde la card del spiral (o la lista) al clickear un proyecto.
export function startCaseTransition(p: CaseTransitionPayload) {
  if (listener) listener(p);
  else window.location.href = `/cases/${p.slug}`; // fallback sin overlay montado
}

/* ───────── Overlay: morph de la imagen (card → hero fullscreen) ───────── */
export default function CaseTransitionProvider() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    listener = (p) => {
      const root = rootRef.current;
      const backdrop = backdropRef.current;
      const img = imgRef.current;
      if (!root || !backdrop || !img || busyRef.current) {
        router.push(`/cases/${p.slug}`);
        return;
      }
      busyRef.current = true;

      root.style.pointerEvents = "auto";
      root.style.opacity = "1";
      img.src = p.image;

      // Estado inicial: la imagen exactamente sobre la card clickeada
      gsap.set(img, {
        position: "fixed",
        left: p.rect.left,
        top: p.rect.top,
        width: p.rect.width,
        height: p.rect.height,
        borderRadius: 14,
        objectFit: "cover",
        opacity: 1,
      });
      gsap.set(backdrop, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Espera un beat a que la página de caso monte debajo, luego revela
          gsap.to(root, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.15,
            onComplete: () => {
              root.style.pointerEvents = "none";
              busyRef.current = false;
            },
          });
        },
      });

      tl.to(backdrop, { opacity: 1, duration: 0.45, ease: "power2.out" }, 0)
        .to(
          img,
          {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            duration: 0.72,
            ease: "power3.inOut",
          },
          0
        )
        // Navega antes de que termine el zoom → la página monta detrás del overlay
        .call(() => router.push(`/cases/${p.slug}`), undefined, 0.42);
    };
    return () => {
      listener = null;
    };
  }, [router]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div ref={backdropRef} style={{ position: "absolute", inset: 0, background: "#000" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} alt="" style={{ display: "block" }} />
    </div>
  );
}
