"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "nuba_lang";

function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {}
  // Sin preferencia guardada: se infiere del idioma/localización del navegador.
  const nav = typeof navigator !== "undefined" ? navigator.language || navigator.languages?.[0] : "";
  return nav?.toLowerCase().startsWith("es") ? "es" : "en";
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Arranca en "en" (idioma base del contenido hardcodeado) para matchear el SSR;
  // la detección real corre en el efecto, apenas hidrata en el cliente.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((l) => (l === "es" ? "en" : "es")),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
