"use client";

import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../Loader";
import Navbar from "../Navbar";
import SmoothScroll from "../SmoothScroll";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import Hero from "./Hero";
import Statement from "./Statement";
import FeaturedWorks from "./FeaturedWorks";
import ServicesRows from "./ServicesRows";
import Process from "./Process";
import ClosingCta from "./ClosingCta";
import Faq from "./Faq";
import "./landing.css";

export default function LandingClient() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  // Arranca en false (también en el HTML del SSR) para que el contenido nunca
  // pinte antes que el loader; si ya se mostró en la sesión se saltea al montar.
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("loader_shown") === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- depende de sessionStorage (solo cliente)
      setLoaderDone(true);
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem("loader_shown", "1");
    setLoaderDone(true);
  }, []);

  // El copy cambia de largo con el idioma: recalcular posiciones de los triggers.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <>
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}
      <SmoothScroll>
        <Navbar visible={true} view="spiral" showToggle={false} />
        <main className="ln">
          <Hero ready={loaderDone} />
          <Statement />
          <FeaturedWorks />
          <ServicesRows />
          <Process />
          <Faq label={ui.landing.faq.label} title={ui.landing.faq.title} />
          <ClosingCta />
        </main>
      </SmoothScroll>
    </>
  );
}
