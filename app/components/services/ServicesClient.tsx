"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar";
import SmoothScroll from "../SmoothScroll";
import ClosingCta from "../landing/ClosingCta";
import { useLanguage } from "../../lib/i18n";
import SvcHero from "./SvcHero";
import SvcCapabilities from "./SvcCapabilities";
import SvcList from "./SvcList";
import SvcProcess from "./SvcProcess";
import SvcStack from "./SvcStack";
import Faq from "../landing/Faq";
import { getUiText } from "../../lib/uiText";
import "../landing/landing.css";
import "./services.css";

export default function ServicesClient() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);

  // El copy cambia de largo con el idioma: recalcular posiciones de los triggers.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <SmoothScroll>
      <Navbar visible={true} view="spiral" showToggle={false} />
      <main className="ln">
        <SvcHero />
        <SvcCapabilities />
        <SvcList />
        <SvcProcess />
        <SvcStack />
        <Faq label={ui.servicesPage.faq.label} title={ui.servicesPage.faq.title} items={ui.servicesPage.faq.items} />
        <ClosingCta />
      </main>
    </SmoothScroll>
  );
}
