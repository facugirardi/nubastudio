/**
 * Idiomas del sitio. El inglés es el idioma raíz (sin prefijo: /, /about…) y el
 * español vive bajo /es (/es, /es/about…). Todo acá es puro: se usa igual desde
 * componentes de servidor y de cliente.
 */
export type Lang = "en" | "es";

export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "es";
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "es" : "en";
}

/** La URL de `path` ("/", "/about", "/?view=list"…) en el idioma pedido. */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  if (path === "/") return "/es";
  if (path.startsWith("/?") || path.startsWith("/#")) return `/es${path.slice(1)}`;
  return `/es${path}`;
}

/** "/es/about" → "/about", "/es" → "/", "/en/x" → "/x" (interno), "/about" → "/about". */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(?:en|es)(?=\/|$)(.*)$/);
  if (!match) return pathname || "/";
  return match[1] || "/";
}

/** El idioma que dice una URL del navegador: bajo /es es español, el resto inglés. */
export function langFromPathname(pathname: string): Lang {
  return /^\/es(?:\/|$)/.test(pathname) ? "es" : "en";
}
