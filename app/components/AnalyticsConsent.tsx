"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../lib/i18n";

const GTM_ID = "GTM-PT4M3NXK";
const GA_ID = "G-CX20Z9V367";
const STORAGE_KEY = "nuba_consent";

const TEXT = {
  en: {
    message: "We use cookies to measure how the site is used and improve it. Nothing is loaded unless you accept.",
    accept: "Accept",
    reject: "Reject",
  },
  es: {
    message: "Usamos cookies para medir cómo se usa el sitio y mejorarlo. No se carga nada si no aceptás.",
    accept: "Aceptar",
    reject: "Rechazar",
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
  if (document.getElementById("gtm-script")) return;
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
}

function readChoice(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveChoice(value: "granted" | "denied") {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
}

/** GA4 y Google Tag Manager (para Clarity): solo se cargan si la persona aceptó. */
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
    const timer = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(timer);
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
