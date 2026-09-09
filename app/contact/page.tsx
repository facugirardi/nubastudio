import type { Metadata } from "next";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import { JsonLd, breadcrumbJsonLd } from "../lib/jsonLd";
import { CONTACT, SITE_NAME, absoluteUrl } from "../lib/seo";

const description =
  "Tell us about your project. Nuba Studio builds websites, apps and marketplaces from Córdoba, Argentina — reach us on WhatsApp or LinkedIn and we'll get back to you.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: `Contact ${SITE_NAME}`,
    description,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: absoluteUrl("/contact"),
            name: `Contact ${SITE_NAME}`,
            description,
            mainEntity: {
              "@type": "Organization",
              name: SITE_NAME,
              telephone: CONTACT.phone,
              url: absoluteUrl("/"),
              sameAs: [CONTACT.linkedin, CONTACT.whatsapp],
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar visible={true} view="spiral" showToggle={false} />
        <main>
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
