import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    url: absoluteUrl("/"),
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  const jsonLd = organizationJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
