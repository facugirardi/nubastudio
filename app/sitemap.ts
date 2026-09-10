import type { MetadataRoute } from "next";
import { works } from "./data/works";
import { absoluteUrl } from "./lib/seo";

/**
 * Fecha de la ultima edicion real de contenido, no la del build.
 * Usar `new Date()` marcaba las 15 URLs como modificadas en cada deploy,
 * que es una señal ruidosa para el crawler. Actualizar a mano al editar copy.
 */
const CONTENT_UPDATED = new Date("2026-09-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
      { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified: CONTENT_UPDATED }));

  const caseRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: absoluteUrl(`/cases/${work.slug}`),
    lastModified: CONTENT_UPDATED,
    changeFrequency: "yearly",
    priority: 0.8,
    images: [absoluteUrl(work.image)],
  }));

  return [...staticRoutes, ...caseRoutes];
}
