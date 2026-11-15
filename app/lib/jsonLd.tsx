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
  type TeamMember,
} from "./seo";
import { servicePath } from "../data/services/slugs";
import { seoText } from "./seoText";

/** Quita claves vacías para no emitir campos huecos en el JSON-LD. */
function compact<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== "" && v !== undefined && v !== null)
  ) as T;
}

const ORG_ID = `${SITE_URL}/#organization`;
const personId = (m: TeamMember) => `${SITE_URL}/about#${m.id}`;

const AREA_SERVED = [
  { "@type": "Country", name: "Argentina" },
  { "@type": "City", name: "Buenos Aires" },
  { "@type": "City", name: "Córdoba" },
  { "@type": "City", name: "Ushuaia" },
  { "@type": "Country", name: "Greece" },
  { "@type": "Place", name: "Worldwide" },
];

/** Persona del equipo: una sola entidad por persona (mismo @id en todo el sitio). */
export function personJsonLd(member: TeamMember, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(member),
    name: member.name,
    jobTitle: member.jobTitle,
    description: member.bio[lang],
    image: absoluteUrl(member.photo),
    url: `${langUrl(lang, "/about")}#${member.id}`,
    worksFor: { "@id": ORG_ID },
    knowsAbout: member.knowsAbout,
    knowsLanguage: ["es", "en"],
    homeLocation: { "@type": "Place", name: `${CONTACT.city}, Argentina` },
    ...(member.profiles.length ? { sameAs: member.profiles } : {}),
  };
}

export const teamJsonLd = (lang: Lang) => TEAM_MEMBERS.map((m) => personJsonLd(m, lang));
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
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon-512.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/icon-512.png"),
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
    founder: TEAM_MEMBERS.map((m) => ({ "@type": "Person", "@id": personId(m), name: m.name })),
    employee: TEAM_MEMBERS.map((m) => ({
      "@type": "Person",
      "@id": personId(m),
      name: m.name,
      jobTitle: m.jobTitle,
    })),
    numberOfEmployees: { "@type": "QuantitativeValue", value: TEAM_MEMBERS.length },
    areaServed: AREA_SERVED,
    knowsAbout: [
      "Web design",
      "Web development",
      "Mobile app development",
      "Marketplace development",
      "Product design",
      "UI/UX design",
      "MVP development",
      "Custom software development",
      "E-commerce development",
      "Payment platforms",
      "Next.js",
      "React Native",
      "Generative engine optimization",
    ],
    sameAs: PROFILES,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: seoText[lang].servicesListName,
      url: langUrl(lang, "/services"),
      itemListElement: seoText[lang].serviceItems.flatMap((item) =>
        item.service
          ? [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  "@id": `${langUrl(lang, servicePath(item.service, lang))}#service`,
                  name: item.name,
                  url: langUrl(lang, servicePath(item.service, lang)),
                },
              },
            ]
          : []
      ),
    },
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

/** La página en sí (WebPage, AboutPage o ContactPage), ligada al sitio de su idioma. */
export function webPageJsonLd(
  lang: Lang,
  path: string,
  { name, description, type = "WebPage" }: { name: string; description: string; type?: "WebPage" | "AboutPage" | "ContactPage" }
) {
  const url = langUrl(lang, path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { "@id": siteId(lang) },
    about: { "@id": ORG_ID },
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

export function worksCollectionJsonLd(works: WorkItem[], lang: Lang, path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": path === "/" ? `${langUrl(lang, "/")}#work` : `${langUrl(lang, path)}#webpage`,
    ...(path === "/" ? {} : { url: langUrl(lang, path) }),
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
    ...(productJsonLd(work) ? { about: productJsonLd(work) } : {}),
  };
}

/** El producto en producción (web y/o app en las tiendas): los links públicos son la evidencia verificable del caso. */
function productJsonLd(work: WorkItem) {
  const { web, ios, android } = work.links ?? {};
  const live = [web, ios, android].filter((u): u is string => Boolean(u));
  if (!live.length) return null;
  const os = [ios && "iOS", android && "Android"].filter(Boolean).join(", ");
  return os
    ? {
        "@type": "MobileApplication",
        name: work.title,
        operatingSystem: os,
        applicationCategory: work.seoTitle ?? work.subtitle,
        url: web ?? ios ?? android,
        sameAs: live,
        ...(work.year ? { dateCreated: work.year } : {}),
      }
    : {
        "@type": "WebSite",
        name: work.title,
        url: web,
        ...(work.year ? { dateCreated: work.year } : {}),
      };
}

/** Landing de un servicio: el Service con su URL, ligado a la página y a la organización. */
export function serviceJsonLd(
  lang: Lang,
  { path, name, description, keywords }: { path: string; name: string; description: string; keywords: string[] }
) {
  const url = langUrl(lang, path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name,
    serviceType: name,
    description,
    keywords: keywords.join(", "),
    inLanguage: lang,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    availableChannel: { "@type": "ServiceChannel", serviceUrl: langUrl(lang, "/contact") },
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}

export function servicesJsonLd(
  services: { name: string; description: string; path?: string }[],
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
        serviceType: service.name,
        ...(service.path ? { url: langUrl(lang, service.path) } : {}),
        provider: { "@id": ORG_ID },
        areaServed: AREA_SERVED,
      },
    })),
  };
}

export function blogJsonLd(lang: Lang, items: { title: string; path: string }[]) {
  const url = langUrl(lang, "/blog");
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    url,
    name: seoText[lang].blog.name,
    description: seoText[lang].blog.description,
    inLanguage: lang,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": siteId(lang) },
    blogPost: items.map((item) => ({
      "@type": "BlogPosting",
      headline: item.title,
      url: langUrl(lang, item.path),
    })),
  };
}

export function blogPostingJsonLd(
  lang: Lang,
  post: {
    path: string;
    title: string;
    description: string;
    date: string;
    modified: string;
    section: string;
    words: number;
    author: TeamMember;
  }
) {
  const url = langUrl(lang, post.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    image: `${url}/opengraph-image`,
    datePublished: post.date,
    dateModified: post.modified,
    inLanguage: lang,
    articleSection: post.section,
    wordCount: post.words,
    author: {
      "@type": "Person",
      "@id": personId(post.author),
      name: post.author.name,
      jobTitle: post.author.jobTitle,
      url: `${langUrl(lang, "/about")}#${post.author.id}`,
      worksFor: { "@id": ORG_ID },
      ...(post.author.profiles.length ? { sameAs: post.author.profiles } : {}),
    },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${langUrl(lang, "/blog")}#blog` },
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
