import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "./seo";
import { LANGS, localePath, otherLang, type Lang } from "./lang";
import { seoText } from "./seoText";

/**
 * canonical y hreflang de una página. Cada idioma tiene su canonical (apunta a
 * su propia URL: ninguna traducción apunta al inglés) y todas comparten la misma
 * lista de alternates, con x-default en la versión inglesa. `path` puede ser
 * uno por idioma cuando la URL se traduce (los artículos del blog).
 */
export type LocalizedPath = string | Record<Lang, string>;

export function pathIn(path: LocalizedPath, lang: Lang): string {
  return typeof path === "string" ? path : path[lang];
}

export function hreflangMap(path: LocalizedPath): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = absoluteUrl(localePath(l, pathIn(path, l)));
  languages["x-default"] = absoluteUrl(localePath("en", pathIn(path, "en")));
  return languages;
}

export function pageAlternates(lang: Lang, path: LocalizedPath): NonNullable<Metadata["alternates"]> {
  return { canonical: absoluteUrl(localePath(lang, pathIn(path, lang))), languages: hreflangMap(path) };
}

/** Open Graph con la URL y el locale del idioma de la página (y el otro como alternativo). */
export function pageOpenGraph(
  lang: Lang,
  path: string,
  { title, description, type = "website" }: { title: string; description: string; type?: "website" | "article" }
): NonNullable<Metadata["openGraph"]> {
  return {
    type,
    url: absoluteUrl(localePath(lang, path)),
    siteName: SITE_NAME,
    locale: seoText[lang].ogLocale,
    alternateLocale: [seoText[otherLang(lang)].ogLocale],
    title,
    description,
  };
}

/**
 * Metadata completa de una página. Next reemplaza (no mezcla) los objetos
 * openGraph/twitter del layout, así que cada página declara todo acá.
 */
export function pageMetadata(
  lang: Lang,
  path: LocalizedPath,
  {
    title,
    description,
    ogTitle,
    type = "website",
    absoluteTitle = false,
    noindex = false,
  }: {
    title: string;
    description: string;
    ogTitle?: string;
    type?: "website" | "article";
    absoluteTitle?: boolean;
    noindex?: boolean;
  }
): Metadata {
  const social = ogTitle ?? (absoluteTitle ? title : `${title} - ${SITE_NAME}`);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: pageAlternates(lang, path),
    openGraph: pageOpenGraph(lang, pathIn(path, lang), { title: social, description, type }),
    twitter: { card: "summary_large_image", title: social, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
