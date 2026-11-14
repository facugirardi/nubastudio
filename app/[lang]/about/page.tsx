import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutIndex from "../../components/about/AboutIndex";
import HomeCta from "../../components/home/HomeCta";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import { JsonLd, breadcrumbJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageAlternates, pageOpenGraph } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { about } = seoText[lang];
  return {
    title: about.title,
    description: about.description,
    alternates: pageAlternates(lang, "/about"),
    openGraph: pageOpenGraph(lang, "/about", { title: about.ogTitle, description: about.description }),
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { crumbs } = seoText[lang];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: crumbs.home, path: localePath(lang, "/") },
          { name: crumbs.about, path: localePath(lang, "/about") },
        ])}
      />
      <SmoothScroll>
        <Navbar />
        <main>
          <AboutIndex />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
