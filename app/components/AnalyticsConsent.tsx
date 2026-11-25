"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../lib/i18n";
import { SITE_HOST } from "../lib/seo";
import LocaleLink from "./LocaleLink";

const GTM_ID = "GTM-PT4M3NXK";
const GA_ID = "G-CX20Z9V367";
const CLARITY_ID = "zgf4omxkye";
export const CONSENT_STORAGE_KEY = "nuba_consent";

const TEXT = {
  en: {
    message: "We use cookies to measure how the site is used and improve it. Nothing is loaded unless you accept.",
    accept: "Accept",
    reject: "Reject",
    more: "Privacy policy",
  },
  es: {
    message: "Usamos cookies para medir cómo se usa el sitio y mejorarlo. No se carga nada si no aceptás.",
    accept: "Aceptar",
    reject: "Rechazar",
    more: "Política de privacidad",
  },
} as const;

function loadScript(id: string, src: string) {
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadTags() {
  if (window.location.hostname !== SITE_HOST || document.getElementById("gtm-script")) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];

  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript("gtm-script", `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(_command: string, _value: unknown) {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_ID);
  loadScript("ga-script", `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);

  const c = window as unknown as { clarity?: ((...args: unknown[]) => void) & { q?: unknown[] } };
  c.clarity =
    c.clarity ||
    function (...args: unknown[]) {
      (c.clarity!.q = c.clarity!.q || []).push(args);
    };
  c.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
  loadScript("clarity-script", `https://www.clarity.ms/tag/${CLARITY_ID}`);
}

function readChoice(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveChoice(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {}
}

/** GA4, Google Tag Manager y Clarity: solo se cargan si la persona aceptó. */
export default function AnalyticsConsent() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "granted") {
      loadTags();
      return;
    }
    if (choice === "denied") return;
    // Aparece recién con la primera interacción: Chrome deja de medir el LCP ahí,
    // así el texto del banner nunca pasa a ser el elemento LCP de la página.
    const events = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
    let timer = 0;
    const show = () => {
      stop();
      timer = window.setTimeout(() => setVisible(true), 800);
    };
    const stop = () => events.forEach((e) => window.removeEventListener(e, show));
    events.forEach((e) => window.addEventListener(e, show, { passive: true }));
    return () => {
      stop();
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;
  const t = TEXT[lang];

  const choose = (value: "granted" | "denied") => {
    saveChoice(value);
    if (value === "granted") loadTags();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      className="fixed inset-x-4 bottom-4 z-[120] max-w-[420px] rounded-2xl border border-white/15 bg-black/90 p-5 text-white backdrop-blur-md sm:inset-x-auto sm:left-6 sm:bottom-6"
    >
      <p className="font-sans text-[14px] leading-relaxed text-white/80">{t.message}</p>
      <LocaleLink href="/privacy" className="mt-2 inline-block font-sans text-[13px] text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline">
        {t.more}
      </LocaleLink>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-[#C6FF00] px-5 py-2 font-display text-[14px] font-medium text-black transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00]"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-white/25 px-5 py-2 font-display text-[14px] font-medium text-white transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t.reject}
        </button>
      </div>
    </div>
  );
}
