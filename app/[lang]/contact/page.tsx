import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactIndex from "../../components/contact/ContactIndex";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import { JsonLd, breadcrumbJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageAlternates, pageOpenGraph } from "../../lib/pageMeta";
import { CONTACT, SITE_NAME, absoluteUrl } from "../../lib/seo";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { contact } = seoText[lang];
  return {
    title: contact.title,
    description: contact.description,
    alternates: pageAlternates(lang, "/contact"),
    openGraph: pageOpenGraph(lang, "/contact", { title: contact.ogTitle, description: contact.description }),
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { contact, crumbs, contactPageName } = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: absoluteUrl(localePath(lang, "/contact")),
            name: contactPageName,
            description: contact.description,
            inLanguage: lang,
            mainEntity: {
              "@type": "Organization",
              name: SITE_NAME,
              telephone: CONTACT.phone,
              url: absoluteUrl(localePath(lang, "/")),
              sameAs: [CONTACT.linkedin, CONTACT.instagram, CONTACT.whatsapp],
            },
          },
          breadcrumbJsonLd([
            { name: crumbs.home, path: localePath(lang, "/") },
            { name: crumbs.contact, path: localePath(lang, "/contact") },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main>
          <ContactIndex />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
