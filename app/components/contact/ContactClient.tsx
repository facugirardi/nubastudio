"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar";
import SmoothScroll from "../SmoothScroll";
import PageHero from "../landing/PageHero";
import Faq from "../landing/Faq";
import ClosingCta from "../landing/ClosingCta";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import CtComposer from "./CtComposer";
import CtDirect from "./CtDirect";
import "../landing/landing.css";
import "../services/services.css";
import "./contact.css";

export default function ContactClient() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.contact;

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <SmoothScroll>
      <Navbar visible={true} view="spiral" showToggle={false} />
      <main className="ln">
        <PageHero crumb={ui.nav.contact} title={t.title} lead={t.sub} cta={{ label: t.cta, href: "#message", dir: "down" }} />
        <CtComposer />
        <CtDirect />
        <Faq label={t.faqLabel} title={t.faqTitle} items={t.faqItems} />
        <ClosingCta />
      </main>
    </SmoothScroll>
  );
}
