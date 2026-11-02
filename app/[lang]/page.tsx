import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "../components/HomeClient";
import HomeSeoContent from "../components/HomeSeoContent";
import { visibleWorks } from "../data/works";
import { JsonLd, worksCollectionJsonLd } from "../lib/jsonLd";
import { isLang } from "../lib/lang";
import { localizeWork } from "../lib/localizeWork";
import { pageAlternates, pageOpenGraph } from "../lib/pageMeta";
import { seoText } from "../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { home } = seoText[lang];
  return {
    // El título de la home ya lleva la marca: sin el sufijo "- Nuba Studio" del template.
    title: { absolute: home.title },
    description: home.description,
    alternates: pageAlternates(lang, "/"),
    openGraph: pageOpenGraph(lang, "/", { title: home.ogTitle, description: home.description }),
    twitter: { card: "summary_large_image", title: home.ogTitle, description: home.description },
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <JsonLd data={worksCollectionJsonLd(visibleWorks.map((w) => localizeWork(w, lang)), lang)} />
      <HomeClient seoFallback={<HomeSeoContent lang={lang} />} />
    </>
  );
}
