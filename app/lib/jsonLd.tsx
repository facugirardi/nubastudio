import type { WorkItem } from "../data/works";
import { localePath, type Lang } from "./lang";
import {
  CONTACT,
  FOUNDED,
  PROFILES,
  SITE_NAME,
  SITE_URL,
  TEAM_MEMBERS,
  absoluteUrl,
} from "./seo";
import { seoText } from "./seoText";

/** Quita claves vacías para no emitir campos huecos en el JSON-LD. */
function compact<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== "" && v !== undefined && v !== null)
  ) as T;
}

const ORG_ID = `${SITE_URL}/#organization`;
/** Cada idioma es su propio WebSite (su URL y su inLanguage); la organización es una sola. */
const siteId = (lang: Lang) => (lang === "en" ? `${SITE_URL}/#website` : `${SITE_URL}/es#website`);
const langUrl = (lang: Lang, path: string) => absoluteUrl(localePath(lang, path));

export function organizationJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "Nuba",
    url: langUrl(lang, "/"),
    logo: absoluteUrl("/Nuba%20logo.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: seoText[lang].siteDescription,
    slogan: seoText[lang].slogan,
    telephone: CONTACT.phone,
    foundingDate: FOUNDED,
    knowsLanguage: ["en", "es"],
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    address: compact({
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.country,
    }),
    ...(CONTACT.latitude && CONTACT.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: CONTACT.latitude,
            longitude: CONTACT.longitude,
          },
        }
      : {}),
    employee: TEAM_MEMBERS.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      worksFor: { "@id": ORG_ID },
    })),
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
    sameAs: PROFILES,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT.phone,
        ...(CONTACT.email ? { email: CONTACT.email } : {}),
        url: CONTACT.whatsapp,
        availableLanguage: ["en", "es"],
      },
    ],
  };
}

export function webSiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId(lang),
    url: langUrl(lang, "/"),
    name: SITE_NAME,
    description: seoText[lang].siteDescription,
    inLanguage: lang,
    publisher: { "@id": ORG_ID },
  };
}

/** `path` es la ruta pública ya localizada (localePath). */
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

export function worksCollectionJsonLd(works: WorkItem[], lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${langUrl(lang, "/")}#work`,
    name: seoText[lang].worksCollection.name,
    description: seoText[lang].worksCollection.description,
    inLanguage: lang,
    isPartOf: { "@id": siteId(lang) },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: works.length,
      itemListElement: works.map((work, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: langUrl(lang, `/cases/${work.slug}`),
        name: work.title,
      })),
    },
  };
}

/** `work` ya viene localizado (localizeWork), así que el texto sale en el idioma de la página. */
export function caseStudyJsonLd(work: WorkItem, lang: Lang) {
  const url = langUrl(lang, `/cases/${work.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#case`,
    url,
    name: work.title,
    headline: `${work.title} - ${work.seoTitle ?? work.subtitle}`,
    description: work.seoDescription ?? work.description ?? `${work.title} - ${work.subtitle}`,
    image: (work.images ?? [work.image]).map((src) => absoluteUrl(src)),
    dateCreated: work.year,
    inLanguage: lang,
    genre: work.subtitle,
    keywords: [...(work.technologies ?? []), work.subtitle].join(", "),
    creator: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    isPartOf: { "@id": siteId(lang) },
  };
}

export function servicesJsonLd(
  services: { name: string; description: string }[],
  lang: Lang
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seoText[lang].servicesListName,
    inLanguage: lang,
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

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
