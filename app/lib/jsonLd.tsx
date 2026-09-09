import type { WorkItem } from "../data/works";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "./seo";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "Nuba",
    url: SITE_URL,
    logo: absoluteUrl("/Nuba%20logo.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: SITE_DESCRIPTION,
    slogan: "We turn ideas into digital products",
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    areaServed: [
      { "@type": "Country", name: "Argentina" },
      { "@type": "Place", name: "Latin America" },
      { "@type": "Place", name: "Worldwide" },
    ],
    knowsAbout: [
      "Web design",
      "Web development",
      "Mobile app development",
      "Marketplace development",
      "Product design",
      "UI/UX design",
      "Brand identity",
    ],
    sameAs: [CONTACT.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT.phone,
        url: CONTACT.whatsapp,
        availableLanguage: ["en", "es"],
      },
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function worksCollectionJsonLd(works: WorkItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/#work`,
    name: `Selected work — ${SITE_NAME}`,
    description: `Case studies of websites, apps and digital products designed and built by ${SITE_NAME}.`,
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: works.length,
      itemListElement: works.map((work, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/cases/${work.slug}`),
        name: work.title,
      })),
    },
  };
}

export function caseStudyJsonLd(work: WorkItem) {
  const url = absoluteUrl(`/cases/${work.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#case`,
    url,
    name: work.title,
    headline: `${work.title} — ${work.seoTitle ?? work.subtitle}`,
    description: work.seoDescription ?? work.description ?? `${work.title} — ${work.subtitle}`,
    image: (work.images ?? [work.image]).map((src) => absoluteUrl(src)),
    dateCreated: work.year,
    inLanguage: "en",
    genre: work.subtitle,
    keywords: [...(work.technologies ?? []), work.subtitle].join(", "),
    creator: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
  };
}

export function servicesJsonLd(
  services: { name: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services — ${SITE_NAME}`,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Argentina" },
      },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
