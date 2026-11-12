import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesClient from "../../components/services/ServicesClient";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd, faqJsonLd, servicesJsonLd } from "../../lib/jsonLd";
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
          servicesJsonLd(text.serviceItems, lang),
          // Las preguntas del JSON-LD son las mismas que se ven en la página.
          faqJsonLd(getUiText(lang).servicesPage.faq.items),
          breadcrumbJsonLd([
            { name: text.crumbs.home, path: localePath(lang, "/") },
            { name: text.crumbs.services, path: localePath(lang, "/services") },
          ]),
        ]}
      />
      <ServicesClient />
    </>
  );
}
