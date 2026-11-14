"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";
import HomeWork from "./home/HomeWork";
import HomeServices from "./home/HomeServices";
import HomeProcess from "./home/HomeProcess";
import HomeCta from "./home/HomeCta";
import Footer from "./home/Footer";

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
        <Navbar />
        <main>
          {seoFallback}
          <Hero ready={loaderDone} />
          <HomeWork />
          <HomeServices />
          <HomeProcess />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
