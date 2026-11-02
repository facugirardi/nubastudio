"use client";

import { createContext, useContext, useMemo } from "react";
import { localePath, type Lang } from "./lang";

export type { Lang } from "./lang";

type LanguageContextValue = {
  lang: Lang;
  /** La URL de `path` en el idioma de la página: path("/about") → "/about" o "/es/about". */
  path: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * El idioma sale de la URL: lo decide el layout según el segmento [lang] y llega
 * acá como prop, así el HTML que sale del servidor ya está en el idioma de la
 * página (nada de detectarlo o cambiarlo en el navegador después de hidratar).
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const value = useMemo<LanguageContextValue>(
    () => ({ lang, path: (path) => localePath(lang, path) }),
    [lang]
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
