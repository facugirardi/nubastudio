"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar";
import SmoothScroll from "../SmoothScroll";
import ClosingCta from "../landing/ClosingCta";
import PageHero from "../landing/PageHero";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import AbStrip from "./AbStrip";
import AbStudio from "./AbStudio";
import AbPrinciples from "./AbPrinciples";
import AbTeam from "./AbTeam";
import AbRecord from "./AbRecord";
import "../landing/landing.css";
import "../services/services.css";
import "./about.css";

export default function AboutClient() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const hero = ui.about.hero;

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <SmoothScroll>
      <Navbar visible={true} view="spiral" showToggle={false} />
      <main className="ln">
        <PageHero crumb={ui.nav.about} title={hero.title} lead={hero.lead} cta={{ label: hero.cta, href: "/contact" }} />
        <AbStrip />
        <AbStudio />
        <AbPrinciples />
        <AbTeam />
        <AbRecord />
        <ClosingCta />
      </main>
    </SmoothScroll>
  );
}
