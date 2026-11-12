import type { MetadataRoute } from "next";
import { visibleWorks } from "./data/works";
import { HREFLANG, LANGS, localePath } from "./lib/locale";
import { absoluteUrl } from "./lib/seo";

/**
 * Fecha de la ultima edicion real de contenido, no la del build.
 * Usar `new Date()` marcaba todas las URLs como modificadas en cada deploy,
 * que es una señal ruidosa para el crawler. Actualizar a mano al editar copy.
 */
const CONTENT_UPDATED = new Date("2026-11-12");

type Route = {
  path: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
  images?: string[];
};

function languages(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of LANGS) langs[HREFLANG[l]] = absoluteUrl(localePath(path, l));
  langs["x-default"] = absoluteUrl(localePath(path, "en"));
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Route[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/works", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    ...visibleWorks.map((work) => ({
      path: `/cases/${work.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: (work.images ?? [work.image]).map((src) => absoluteUrl(src)),
    })),
  ];

  return routes.flatMap((route) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(localePath(route.path, lang)),
      lastModified: CONTENT_UPDATED,
      changeFrequency: route.changeFrequency,
      priority: lang === "en" ? route.priority : Math.round(route.priority * 90) / 100,
      alternates: { languages: languages(route.path) },
      ...(route.images ? { images: route.images } : {}),
    }))
  );
}
