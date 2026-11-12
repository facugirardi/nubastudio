import type { Metadata } from "next";
import { HREFLANG, LANGS, OG_LOCALE, localePath, type Lang } from "./locale";
import { SITE_NAME } from "./seo";

/** URLs alternativas por idioma para una ruta base ("/about"). */
export function languageAlternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of LANGS) langs[HREFLANG[l]] = localePath(path, l);
  langs["x-default"] = localePath(path, "en");
  return langs;
}

/**
 * Metadata completa de una página. Next reemplaza (no mezcla) los objetos
 * openGraph/twitter del layout, así que cada página tiene que declarar todo.
 */
export function buildMetadata({
  lang,
  path,
  title,
  description,
  socialTitle,
  absoluteTitle = false,
  type = "website",
  noindex = false,
}: {
  lang: Lang;
  /** Ruta base sin prefijo de idioma, ej. "/about". */
  path: string;
  title: string;
  description: string;
  /** Título para OG/Twitter; por defecto `${title} — Nuba Studio`. */
  socialTitle?: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = localePath(path, lang);
  const social = socialTitle ?? (absoluteTitle ? title : `${title} — ${SITE_NAME}`);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      title: social,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
