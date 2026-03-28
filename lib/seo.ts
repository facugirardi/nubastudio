import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site";

/** Build an absolute URL for meta tags, JSON-LD, sitemap. */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function defaultOpenGraphImages(): NonNullable<Metadata["openGraph"]>["images"] {
  return [
    {
      url: absoluteUrl("/images/cases/nuddo/frame2.webp"),
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} — selected work`,
    },
  ];
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url,
    description: siteConfig.description,
    logo: absoluteUrl("/Nuba logo.svg"),
    sameAs: [] as string[],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://calendly.com/facugirardi22/30min",
    },
  };
}
