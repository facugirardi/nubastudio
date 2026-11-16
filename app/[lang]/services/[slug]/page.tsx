import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../../components/home/Footer";
import Navbar from "../../../components/Navbar";
import SmoothScroll from "../../../components/SmoothScroll";
import ServiceLanding from "../../../components/services/ServiceLanding";
import { getServiceBySlug, serviceLocalizedPath, servicePath, serviceSlugs } from "../../../data/services";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd } from "../../../lib/jsonLd";
import { isLang, localePath } from "../../../lib/lang";
import { pageMetadata } from "../../../lib/pageMeta";
import { seoText } from "../../../lib/seoText";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams({ params }: { params: { lang: string } }) {
  return serviceSlugs(isLang(params.lang) ? params.lang : "en").map((slug) => ({ slug }));
}

export const dynamicParams = false;
/** Los artículos relacionados programados aparecen el día que se publican. */
export const revalidate = 3600;

function find(lang: string, slug: string) {
  return isLang(lang) ? getServiceBySlug(slug, lang) : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = find(lang, slug);
  if (!isLang(lang) || !service) return {};
  const c = service.content[lang];
  return {
    ...pageMetadata(lang, serviceLocalizedPath(service.id), { title: c.seoTitle, description: c.description }),
    keywords: c.keywords,
  };
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  const service = find(lang, slug);
  if (!isLang(lang) || !service) notFound();
  const c = service.content[lang];
  const path = servicePath(service.id, lang);
  const { crumbs } = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(lang, path, { name: c.seoTitle, description: c.description }),
          serviceJsonLd(lang, { path, name: c.name, description: c.description, keywords: c.keywords }),
          faqJsonLd(c.faq),
          breadcrumbJsonLd([
            { name: crumbs.home, path: localePath(lang, "/") },
            { name: crumbs.services, path: localePath(lang, "/services") },
            { name: c.name, path: localePath(lang, path) },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <ServiceLanding service={service} lang={lang} />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
