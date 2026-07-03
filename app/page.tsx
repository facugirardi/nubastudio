"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Works from "./components/Works";
import Loader from "./components/Loader";
import SmoothScroll from "./components/SmoothScroll";
import { isWebGLAvailable } from "./lib/webglSupport";

export default function Home() {
  const [view, setView] = useState<"spiral" | "list">("spiral");
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [loaderDone, setLoaderDone] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("loader_shown") !== "1") {
      setLoaderDone(false);
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
