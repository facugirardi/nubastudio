"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Works, { preloadSpiral } from "./Works";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";
import { isWebGLAvailable } from "../lib/webglSupport";

// Solo en escritorio se prueba WebGL, una única vez y ya al evaluar este módulo: si hay soporte, la
// espiral (three.js) empieza a descargarse en paralelo a la hidratación y está lista cuando termina
// el loader. En móvil y sin WebGL no se prueba ni se descarga nada de 3D.
let desktopWebGL: boolean | null = null;
function probeDesktopWebGL() {
  desktopWebGL ??= isWebGLAvailable();
  return desktopWebGL;
}
if (typeof window !== "undefined" && window.innerWidth >= 768 && probeDesktopWebGL()) {
  void preloadSpiral();
}

export default function HomeClient({ seoFallback }: { seoFallback?: React.ReactNode }) {
  const [view, setView] = useState<"spiral" | "list">("spiral");
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Arranca visible (también en el HTML del SSR) para que el contenido nunca
  // pinte antes que el loader; si ya se mostró en la sesión se saltea al montar.
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("loader_shown") === "1") {
      setLoaderDone(true);
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem("loader_shown", "1");
    setLoaderDone(true);
  }, []);

  const handleWebGLFailed = useCallback(() => {
    setWebglAvailable(false);
    setView("list");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wantsList = params.get("view") === "list";
    const mobile = window.innerWidth < 768;
    // En móvil la espiral nunca se usa (siempre lista): ni se prueba WebGL ni se descarga three.js.
    const webglOk = mobile ? false : probeDesktopWebGL();
    setWebglAvailable(webglOk);
    setIsMobile(mobile);
    if (!webglOk || wantsList || mobile) setView("list");
  }, []);

  const showSpiralToggle = webglAvailable === true && !isMobile;

  return (
    <>
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}
      <SmoothScroll infinite={view === "spiral"}>
        <Navbar
          visible={true}
          view={view}
          setView={setView}
          showToggle={showSpiralToggle}
          webglAvailable={showSpiralToggle}
        />
        <main>
          {seoFallback}
          <Works
            view={view}
            setView={setView}
            webglAvailable={webglAvailable === true}
            onWebGLFailed={handleWebGLFailed}
          />
        </main>
      </SmoothScroll>
    </>
  );
}
