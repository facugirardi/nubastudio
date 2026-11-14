import type { MetadataRoute } from "next";
import { visibleWorks } from "./data/works";
import { LANGS, localePath } from "./lib/lang";
import { absoluteUrl } from "./lib/seo";

/**
 * Fecha de la ultima edicion real de contenido, no la del build.
 * Usar `new Date()` marcaba todas las URLs como modificadas en cada deploy,
 * que es una señal ruidosa para el crawler. Actualizar a mano al editar copy.
 */
const CONTENT_UPDATED = new Date("2026-11-02");

type Entry = Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority"> & {
  path: string;
  image?: string;
};

/** Una entrada por idioma y página, cada una con la lista completa de hreflang. */
function entriesFor({ path, image, ...rest }: Entry): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const lang of LANGS) languages[lang] = absoluteUrl(localePath(lang, path));
  languages["x-default"] = absoluteUrl(localePath("en", path));

  return LANGS.map((lang) => ({
    url: absoluteUrl(localePath(lang, path)),
    lastModified: CONTENT_UPDATED,
    ...rest,
    alternates: { languages },
    ...(image ? { images: [absoluteUrl(image)] } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Entry[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/works", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  ];

  const caseRoutes: Entry[] = visibleWorks.map((work) => ({
    path: `/cases/${work.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
    image: work.image,
  }));

  return [...staticRoutes, ...caseRoutes].flatMap(entriesFor);
}
