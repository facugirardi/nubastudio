"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Works from "./Works";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";

const noop = () => {};

export default function HomeClient({ seoFallback }: { seoFallback?: React.ReactNode }) {
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

  return (
    <>
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}
      <SmoothScroll infinite={false}>
        <Navbar visible={true} view="list" setView={noop} showToggle={false} webglAvailable={false} />
        <main>
          {seoFallback}
          <Works view="list" setView={noop} webglAvailable={false} onWebGLFailed={noop} />
        </main>
      </SmoothScroll>
    </>
  );
}
