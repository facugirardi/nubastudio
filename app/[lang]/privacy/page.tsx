import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/Navbar";
import PrivacyContent from "../../components/privacy/PrivacyContent";
import SmoothScroll from "../../components/SmoothScroll";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageMetadata } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/privacy", seoText[lang].privacy);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const text = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(lang, "/privacy", { name: text.privacy.title, description: text.privacy.description }),
          breadcrumbJsonLd([
            { name: text.crumbs.home, path: localePath(lang, "/") },
            { name: text.crumbs.privacy, path: localePath(lang, "/privacy") },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <PrivacyContent lang={lang} />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
