"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localePath, splitLocale, type Lang } from "./locale";

export type { Lang } from "./locale";

const STORAGE_KEY = "nuba_lang";

function readStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {}
  return null;
}

function storeLang(l: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {}
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  /** Prefija una ruta interna con el idioma actual ("/about" → "/es/about"). */
  lp: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * El idioma sale de la URL (/es/* = español), así Google indexa cada versión
 * por separado. `lang` llega fijo desde el layout de cada idioma; sin él (404
 * global) se deduce del pathname y no se redirige.
 */
export function LanguageProvider({ lang: fixedLang, children }: { lang?: Lang; children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const lang = fixedLang ?? splitLocale(pathname).lang;

  const goTo = useCallback(
    (l: Lang, mode: "push" | "replace") => {
      const { path } = splitLocale(window.location.pathname);
      const target = localePath(path, l) + window.location.search + window.location.hash;
      if (mode === "replace") router.replace(target);
      else router.push(target);
    },
    [router]
  );

  // Respeta la elección previa del usuario; en la primera visita sugiere español
  // por el idioma del navegador. Los crawlers no tienen preferencia guardada y
  // navegan en inglés, así que siempre ven la URL que pidieron.
  useEffect(() => {
    if (!fixedLang) return;
    const stored = readStoredLang();
    if (stored) {
      if (stored !== fixedLang) goTo(stored, "replace");
      return;
    }
    const nav = navigator.language || navigator.languages?.[0] || "";
    if (fixedLang === "en" && nav.toLowerCase().startsWith("es")) {
      storeLang("es");
      goTo("es", "replace");
    }
  }, [fixedLang, goTo]);

  const value = useMemo<LanguageContextValue>(() => {
    const setLang = (l: Lang) => {
      storeLang(l);
      if (l !== lang) goTo(l, "push");
    };
    return {
      lang,
      setLang,
      toggleLang: () => setLang(lang === "es" ? "en" : "es"),
      lp: (path: string) => localePath(path, lang),
    };
  }, [lang, goTo]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
