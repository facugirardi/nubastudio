import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import ServicesIndex from "../../components/services/ServicesIndex";
import HomeProcess from "../../components/home/HomeProcess";
import HomeCta from "../../components/home/HomeCta";
import Footer from "../../components/home/Footer";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd, faqJsonLd, servicesJsonLd } from "../../lib/jsonLd";
import { servicePath } from "../../data/services/slugs";
import { isLang, localePath } from "../../lib/lang";
import { pageMetadata } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";
import { getUiText } from "../../lib/uiText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/services", seoText[lang].services);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const text = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(lang, "/services", { name: text.services.title, description: text.services.description, type: "WebPage" }),
          servicesJsonLd(
            text.serviceItems.map((item) => ({ ...item, path: item.service && servicePath(item.service, lang) })),
            lang
          ),
          // Las preguntas del JSON-LD son las mismas que se ven en la página.
          faqJsonLd(getUiText(lang).faq),
          breadcrumbJsonLd([
            { name: text.crumbs.home, path: localePath(lang, "/") },
            { name: text.crumbs.services, path: localePath(lang, "/services") },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <ServicesIndex process={<HomeProcess index="03" />} />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
