import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingClient from "../components/landing/LandingClient";
import { JsonLd, webPageJsonLd } from "../lib/jsonLd";
import { isLang } from "../lib/lang";
import { pageMetadata } from "../lib/pageMeta";
import { seoText } from "../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { home } = seoText[lang];
  // El título de la home ya lleva la marca: sin el sufijo "- Nuba Studio" del template.
  return pageMetadata(lang, "/", { ...home, absoluteTitle: true });
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { home } = seoText[lang];

  return (
    <>
      <JsonLd data={webPageJsonLd(lang, "/", { name: home.title, description: home.description })} />
      <LandingClient />
    </>
  );
}
