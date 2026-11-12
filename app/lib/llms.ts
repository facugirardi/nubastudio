import { visibleWorks } from "../data/works";
import { LANGS, localePath, type Lang } from "./lang";
import { localizeWork } from "./localizeWork";
import { CONTACT, SITE_NAME, absoluteUrl } from "./seo";
import { seoText } from "./seoText";

const COPY = {
  en: {
    about: `${SITE_NAME} is a digital product studio based in ${CONTACT.city}, Argentina. We design
and build websites, mobile apps, marketplaces and digital products end to end, from
product strategy and design through development and launch. We work with founders and
companies in Argentina, across Latin America and internationally.`,
    services: "Services",
    serviceLines: [
      "- **Web development** - sites and platforms built with Next.js, React and TypeScript.",
      "- **Mobile apps** - iOS and Android products built with React Native and Expo.",
      "- **Marketplaces & platforms** - two-sided products with payments, dashboards and APIs.",
      "- **Product strategy & MVP** - discovery, prototyping and roadmap through to a shipped MVP.",
    ],
    pages: "Pages",
    pageLines: {
      home: "studio overview, services and featured work.",
      works: "portfolio of case studies.",
      about: "how the studio works, its process and the team.",
      services: "what we build and how we run a project.",
      contact: "start a project with us.",
    },
    labels: { home: "Home", works: "Work", about: "About", services: "Services", contact: "Contact" },
    cases: "Case studies",
    contact: "Contact",
    location: "Location",
    notes: "Notes",
    noteLanguages: (url: string) =>
      `This page is the English version. A Spanish version is available at ${url}.`,
  },
  es: {
    about: `${SITE_NAME} es un estudio de producto digital con base en ${CONTACT.city}, Argentina. Diseñamos
y desarrollamos sitios web, apps móviles, marketplaces y productos digitales de punta a punta,
desde la estrategia y el diseño de producto hasta el desarrollo y el lanzamiento. Trabajamos con
emprendedores y empresas de Argentina, de Latinoamérica y del resto del mundo.`,
    services: "Servicios",
    serviceLines: [
      "- **Desarrollo web** - sitios y plataformas hechos con Next.js, React y TypeScript.",
      "- **Apps móviles** - productos iOS y Android hechos con React Native y Expo.",
      "- **Marketplaces y plataformas** - productos de dos lados con pagos, dashboards y APIs.",
      "- **Estrategia de producto y MVP** - descubrimiento, prototipado y hoja de ruta hasta un MVP en producción.",
    ],
    pages: "Páginas",
    pageLines: {
      home: "resumen del estudio, servicios y trabajos destacados.",
      works: "portfolio de casos de estudio.",
      about: "cómo trabaja el estudio, su proceso y el equipo.",
      services: "qué construimos y cómo llevamos un proyecto.",
      contact: "empezá un proyecto con nosotros.",
    },
    labels: { home: "Inicio", works: "Trabajos", about: "Nosotros", services: "Servicios", contact: "Contacto" },
    cases: "Casos de estudio",
    contact: "Contacto",
    location: "Ubicación",
    notes: "Notas",
    noteLanguages: (url: string) =>
      `Esta es la versión en español. Hay una versión en inglés en ${url}.`,
  },
} as const;

/** El llms.txt de un idioma: el inglés vive en /llms.txt y el español en /es/llms.txt. */
export function buildLlms(lang: Lang): Response {
  const c = COPY[lang];
  const url = (path: string) => absoluteUrl(localePath(lang, path));
  const otherUrl = absoluteUrl(lang === "en" ? "/es/llms.txt" : "/llms.txt");

  const cases = visibleWorks
    .map((raw) => {
      const w = localizeWork(raw, lang);
      return `- [${w.title} - ${w.seoTitle ?? w.subtitle}](${url(`/cases/${w.slug}`)})${
        w.year ? ` (${w.year})` : ""
      }: ${w.seoDescription ?? w.description ?? ""}`;
    })
    .join("\n");

  const body = `# ${SITE_NAME}

> ${seoText[lang].siteDescription}

${c.about}

## ${c.services}

${c.serviceLines.join("\n")}

## ${c.pages}

- [${c.labels.home}](${url("/")}): ${c.pageLines.home}
- [${c.labels.works}](${url("/works")}): ${c.pageLines.works}
- [${c.labels.about}](${url("/about")}): ${c.pageLines.about}
- [${c.labels.services}](${url("/services")}): ${c.pageLines.services}
- [${c.labels.contact}](${url("/contact")}): ${c.pageLines.contact}

## ${c.cases}

${cases}

## ${c.contact}

- WhatsApp / ${lang === "en" ? "phone" : "teléfono"}: ${CONTACT.phone}
- LinkedIn: ${CONTACT.linkedin}
- ${c.location}: ${CONTACT.city}, ${CONTACT.region}, Argentina

## ${c.notes}

- ${c.noteLanguages(otherUrl)}
- Languages / Idiomas: ${LANGS.map((l) => `${l} ${absoluteUrl(localePath(l, "/"))}`).join(" · ")}
- Canonical domain: ${absoluteUrl("/")}
- Structured data (Organization, WebSite, CreativeWork, BreadcrumbList) is available
  as JSON-LD on every page.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
