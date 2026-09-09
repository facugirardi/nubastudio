import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";
import HomeSeoContent from "./components/HomeSeoContent";
import { works } from "./data/works";
import { JsonLd, worksCollectionJsonLd } from "./lib/jsonLd";
import { SITE_DESCRIPTION, SITE_NAME } from "./lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Digital product studio in Córdoba, Argentina`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${SITE_NAME} — Digital product studio`,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={worksCollectionJsonLd(works)} />
      <HomeClient seoFallback={<HomeSeoContent />} />
    </>
  );
}
