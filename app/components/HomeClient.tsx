"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Works from "./Works";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";
import { isWebGLAvailable } from "../lib/webglSupport";

export default function HomeClient({ seoFallback }: { seoFallback?: React.ReactNode }) {
  const [view, setView] = useState<"spiral" | "list">("spiral");
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
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
    const webglOk = isWebGLAvailable();
    setWebglAvailable(webglOk);
    if (!webglOk || wantsList) setView("list");
  }, []);

  const showSpiralToggle = webglAvailable === true;

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
