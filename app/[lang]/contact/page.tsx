import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactClient from "../../components/contact/ContactClient";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageMetadata } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/contact", seoText[lang].contact);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const text = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(lang, "/contact", { name: text.contact.title, description: text.contact.description, type: "ContactPage" }),
          breadcrumbJsonLd([
            { name: text.crumbs.home, path: localePath(lang, "/") },
            { name: text.crumbs.contact, path: localePath(lang, "/contact") },
          ]),
        ]}
      />
      <ContactClient />
    </>
  );
}
