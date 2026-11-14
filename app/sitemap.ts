import type { MetadataRoute } from "next";
import { lastModified, postPath, publishedPosts } from "./data/blog";
import { visibleWorks } from "./data/works";
import { LANGS, localePath } from "./lib/lang";
import { hreflangMap, pathIn, type LocalizedPath } from "./lib/pageMeta";
import { absoluteUrl } from "./lib/seo";

/**
 * Fecha de la ultima edicion real de contenido, no la del build.
 * Usar `new Date()` marcaba todas las URLs como modificadas en cada deploy,
 * que es una señal ruidosa para el crawler. Actualizar a mano al editar copy.
 */
const CONTENT_UPDATED = new Date("2026-11-14");

type Entry = Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority"> & {
  path: LocalizedPath;
  images?: string[];
  modified?: Date;
};

/** Una entrada por idioma y página, cada una con la lista completa de hreflang. */
function entriesFor({ path, images, modified, ...rest }: Entry): MetadataRoute.Sitemap {
  const languages = hreflangMap(path);

  return LANGS.map((lang) => ({
    url: absoluteUrl(localePath(lang, pathIn(path, lang))),
    lastModified: modified ?? CONTENT_UPDATED,
    ...rest,
    alternates: { languages },
    ...(images ? { images: images.map((src) => absoluteUrl(src)) } : {}),
  }));
}

/** Los artículos programados entran solos al sitemap el día que se publican. */
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Entry[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/works", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  ];

  const caseRoutes: Entry[] = visibleWorks.map((work) => ({
    path: `/cases/${work.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
    images: work.images ?? [work.image],
  }));

  const postRoutes: Entry[] = publishedPosts().map((post) => ({
    path: { en: postPath(post, "en"), es: postPath(post, "es") },
    changeFrequency: "monthly",
    priority: 0.7,
    modified: new Date(lastModified(post)),
  }));

  return [...staticRoutes, ...caseRoutes, ...postRoutes].flatMap(entriesFor);
}
