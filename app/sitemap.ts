import type { MetadataRoute } from "next";
import { works } from "./data/works";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
      { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified }));

  const caseRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: absoluteUrl(`/cases/${work.slug}`),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.8,
    images: [absoluteUrl(work.image)],
  }));

  return [...staticRoutes, ...caseRoutes];
}
