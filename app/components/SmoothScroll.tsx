"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

// El overlay de transición vive en el layout raíz, fuera de este provider:
// necesita frenar el scroll durante el morph sin pasar por el contexto.
let activeLenis: Lenis | null = null;
export const getLenis = () => activeLenis;

export default function SmoothScroll({
  children,
  infinite = false,
}: {
  children: React.ReactNode;
  infinite?: boolean;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: infinite ? 1.15 : 1,
      infinite,
      // En mobile el scroll nativo se corta al llegar al final del documento;
      // syncTouch delega el touch a Lenis y permite el loop infinito de la espiral.
      ...(infinite && {
        syncTouch: true,
        syncTouchLerp: 0.1,
      }),
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- instancia creada solo en cliente tras montar
    setLenis(instance);
    activeLenis = instance;

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => instance.resize();
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      gsap.ticker.remove(raf);
      instance.destroy();
      if (activeLenis === instance) activeLenis = null;
      setLenis(null);
    };
  }, [infinite]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
