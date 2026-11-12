import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "./seo";
import { LANGS, localePath, otherLang, type Lang } from "./lang";
import { seoText } from "./seoText";

/**
 * canonical y hreflang de una página. Cada idioma tiene su canonical (apunta a
 * su propia URL: ninguna traducción apunta al inglés) y todas comparten la misma
 * lista de alternates, con x-default en la versión inglesa.
 */
export function pageAlternates(lang: Lang, path: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath("en", path));
  return { canonical: absoluteUrl(localePath(lang, path)), languages };
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
  path: string,
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
    openGraph: pageOpenGraph(lang, path, { title: social, description, type }),
    twitter: { card: "summary_large_image", title: social, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
