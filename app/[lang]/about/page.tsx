import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutClient from "../../components/about/AboutClient";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageMetadata } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/about", seoText[lang].about);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const text = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(lang, "/about", { name: text.about.title, description: text.about.description, type: "AboutPage" }),
          breadcrumbJsonLd([
            { name: text.crumbs.home, path: localePath(lang, "/") },
            { name: text.crumbs.about, path: localePath(lang, "/about") },
          ]),
        ]}
      />
      <AboutClient />
    </>
  );
}
