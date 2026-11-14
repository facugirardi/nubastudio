import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import ServicesIndex from "../../components/services/ServicesIndex";
import HomeProcess from "../../components/home/HomeProcess";
import HomeCta from "../../components/home/HomeCta";
import Footer from "../../components/home/Footer";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, servicesJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageAlternates, pageOpenGraph } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";
import { getUiText } from "../../lib/uiText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { services } = seoText[lang];
  return {
    title: services.title,
    description: services.description,
    alternates: pageAlternates(lang, "/services"),
    openGraph: pageOpenGraph(lang, "/services", {
      title: services.ogTitle,
      description: services.description,
    }),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const text = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          servicesJsonLd(text.serviceItems, lang),
          // Las preguntas del JSON-LD salen del mismo diccionario que las que se ven en pantalla.
          faqJsonLd(getUiText(lang).faq),
          breadcrumbJsonLd([
            { name: text.crumbs.home, path: localePath(lang, "/") },
            { name: text.crumbs.services, path: localePath(lang, "/services") },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main>
          <ServicesIndex process={<HomeProcess index="03" />} />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
