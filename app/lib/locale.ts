export type Lang = "es" | "en";

export const LANGS: Lang[] = ["en", "es"];

export const DEFAULT_LANG: Lang = "en";

export const OG_LOCALE: Record<Lang, string> = { en: "en_US", es: "es_AR" };

export const HREFLANG: Record<Lang, string> = { en: "en", es: "es" };

/** "/about" → "/es/about" para español; deja intactos anchors, queries y URLs externas. */
export function localePath(path: string, lang: Lang): string {
  if (lang === DEFAULT_LANG || !path.startsWith("/")) return path;
  if (path === "/") return "/es";
  if (path === "/es" || path.startsWith("/es/") || path.startsWith("/es?") || path.startsWith("/es#")) return path;
  return `/es${path}`;
}

/** "/es/about" → { lang: "es", path: "/about" } */
export function splitLocale(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return { lang: "es", path: pathname.slice(3) || "/" };
  }
  return { lang: "en", path: pathname || "/" };
}
