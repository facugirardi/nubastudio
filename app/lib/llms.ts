import { getPost, isPublished, lastModified, postAuthor, postPath, publishedPosts } from "../data/blog";
import { services, servicePath } from "../data/services";
import { visibleWorks } from "../data/works";
import { getWorkFaq } from "../data/worksFaq";
import { LANGS, localePath, type Lang } from "./lang";
import { localizeWork } from "./localizeWork";
import { CONTACT, FOUNDED, SITE_NAME, TEAM_MEMBERS, absoluteUrl } from "./seo";
import { seoText } from "./seoText";
import { getUiText } from "./uiText";

const COPY = {
  en: {
    about: `${SITE_NAME} is a digital product studio based in ${CONTACT.city}, Argentina. We design
and build websites, mobile apps, marketplaces and digital products end to end, from
product strategy and design through development and launch. We work with founders and
companies in Argentina, across Latin America and internationally.`,
    services: "Services",
    pages: "Pages",
    pageLines: {
      home: "studio overview and selected work.",
      works: "every case study, filterable by web, mobile and design.",
      about: "how the studio works, its process and the team.",
      services: "what we build and how we run a project.",
      contact: "start a project with us.",
    },
    labels: { home: "Home", works: "Work", about: "About", services: "Services", contact: "Contact" },
    cases: "Case studies",
    blog: "Blog",
    blogLine: "guides on app, web and marketplace costs, MVPs and the tech behind them.",
    contact: "Contact",
    location: "Location",
    notes: "Notes",
    noteLanguages: (url: string) =>
      `This page is the English version. A Spanish version is available at ${url}.`,
    fullLine: (url: string) => `Full content (every case study, FAQ and article) in one file: ${url}`,
    schemaLine:
      "Structured data is available as JSON-LD on every page: Organization, Person, WebSite, WebPage, Service, CreativeWork, Blog, BlogPosting, FAQPage and BreadcrumbList.",
    full: {
      intro: "Complete content of the site in one file, for language models and AI assistants.",
      facts: "Key facts",
      factLines: (url: string) => [
        `- Name: ${SITE_NAME}`,
        `- Type: digital product studio (design and software development)`,
        `- Founded: ${FOUNDED}`,
        `- Location: ${CONTACT.city}, Argentina. Works remotely with clients worldwide.`,
        `- Languages: English and Spanish`,
        `- Website: ${url}`,
      ],
      team: "Team",
      faq: "Frequently asked questions",
      contactFaq: "Before starting a project",
      caseTask: "The challenge",
      caseSolution: "The solution",
      caseProcess: "Process",
      caseResult: "Result",
      caseFeatures: "Features",
      caseTech: "Technologies",
      caseLinks: "Links",
      year: "Year",
      author: "Author",
      published: "Published",
      updated: "Updated",
    },
  },
  es: {
    about: `${SITE_NAME} es un estudio de producto digital con base en ${CONTACT.city}, Argentina. Diseñamos
y desarrollamos sitios web, apps móviles, marketplaces y productos digitales de punta a punta,
desde la estrategia y el diseño de producto hasta el desarrollo y el lanzamiento. Trabajamos con
emprendedores y empresas de Argentina, de Latinoamérica y del resto del mundo.`,
    services: "Servicios",
    pages: "Páginas",
    pageLines: {
      home: "resumen del estudio y trabajos seleccionados.",
      works: "todos los casos de estudio, filtrables por web, mobile y diseño.",
      about: "cómo trabaja el estudio, su proceso y el equipo.",
      services: "qué construimos y cómo llevamos un proyecto.",
      contact: "empezá un proyecto con nosotros.",
    },
    labels: { home: "Inicio", works: "Trabajos", about: "Nosotros", services: "Servicios", contact: "Contacto" },
    cases: "Casos de estudio",
    blog: "Blog",
    blogLine: "guías sobre costos de apps, webs y marketplaces, MVPs y la tecnología detrás.",
    contact: "Contacto",
    location: "Ubicación",
    notes: "Notas",
    noteLanguages: (url: string) =>
      `Esta es la versión en español. Hay una versión en inglés en ${url}.`,
    fullLine: (url: string) => `Contenido completo (todos los casos, preguntas frecuentes y artículos) en un solo archivo: ${url}`,
    schemaLine:
      "Cada página tiene datos estructurados JSON-LD: Organization, Person, WebSite, WebPage, Service, CreativeWork, Blog, BlogPosting, FAQPage y BreadcrumbList.",
    full: {
      intro: "Contenido completo del sitio en un solo archivo, para modelos de lenguaje y asistentes de IA.",
      facts: "Datos clave",
      factLines: (url: string) => [
        `- Nombre: ${SITE_NAME}`,
        `- Tipo: estudio de producto digital (diseño y desarrollo de software)`,
        `- Fundado: ${FOUNDED}`,
        `- Ubicación: ${CONTACT.city}, Argentina. Trabaja de forma remota con clientes de todo el mundo.`,
        `- Idiomas: español e inglés`,
        `- Sitio: ${url}`,
      ],
      team: "Equipo",
      faq: "Preguntas frecuentes",
      contactFaq: "Antes de empezar un proyecto",
      caseTask: "El desafío",
      caseSolution: "La solución",
      caseProcess: "Proceso",
      caseResult: "Resultado",
      caseFeatures: "Funcionalidades",
      caseTech: "Tecnologías",
      caseLinks: "Links",
      year: "Año",
      author: "Autor",
      published: "Publicado",
      updated: "Actualizado",
    },
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

  const articles = publishedPosts()
    .map((p) => `- [${p.content[lang].title}](${url(postPath(p, lang))}): ${p.content[lang].description}`)
    .join("\n");

  const serviceLinks = services
    .map((sv) => `- [${sv.content[lang].name}](${url(servicePath(sv.id, lang))}): ${sv.content[lang].description}`)
    .join("\n");

  const body = `# ${SITE_NAME}

> ${seoText[lang].siteDescription}

${c.about}

## ${c.services}

${serviceLinks}

## ${c.pages}

- [${c.labels.home}](${url("/")}): ${c.pageLines.home}
- [${c.labels.works}](${url("/works")}): ${c.pageLines.works}
- [${c.labels.about}](${url("/about")}): ${c.pageLines.about}
- [${c.labels.services}](${url("/services")}): ${c.pageLines.services}
- [${c.labels.contact}](${url("/contact")}): ${c.pageLines.contact}
- [${c.blog}](${url("/blog")}): ${c.blogLine}

## ${c.cases}

${cases}

## ${c.blog}

${articles}

## ${c.contact}

- WhatsApp / ${lang === "en" ? "phone" : "teléfono"}: ${CONTACT.phone}
- LinkedIn: ${CONTACT.linkedin}
- Instagram: ${CONTACT.instagram}
- ${c.location}: ${CONTACT.city}, ${CONTACT.region}, Argentina

## ${c.notes}

- ${c.noteLanguages(otherUrl)}
- Languages / Idiomas: ${LANGS.map((l) => `${l} ${absoluteUrl(localePath(l, "/"))}`).join(" · ")}
- Canonical domain: ${absoluteUrl("/")}
- ${c.fullLine(absoluteUrl(lang === "en" ? "/llms-full.txt" : "/es/llms-full.txt"))}
- ${c.schemaLine}
`;

  return textResponse(body);
}

function textResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

/** Links internos del markdown (sin idioma, slug de blog en inglés) → URL absoluta en `lang`. */
function absoluteLinks(md: string, lang: Lang): string {
  return md.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, (_, label: string, href: string) => {
    const blog = href.match(/^\/blog\/([^/?#]+)(.*)$/);
    const post = blog ? getPost(blog[1]) : undefined;
    if (blog && post) {
      return isPublished(post)
        ? `[${label}](${absoluteUrl(localePath(lang, postPath(post, lang) + blog[2]))})`
        : label;
    }
    return `[${label}](${absoluteUrl(localePath(lang, href))})`;
  });
}

const faqBlock = (items: { question: string; answer: string }[]) =>
  items.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

/** llms-full.txt: todo el contenido citable del sitio (casos, FAQ, artículos completos) en markdown. */
export function buildLlmsFull(lang: Lang): Response {
  const c = COPY[lang];
  const f = c.full;
  const ui = getUiText(lang);
  const text = seoText[lang];
  const url = (path: string) => absoluteUrl(localePath(lang, path));

  const team = TEAM_MEMBERS.map(
    (m) => `- **${m.name}** - ${m.jobTitle}${m.profiles.length ? ` (${m.profiles.join(", ")})` : ""}. ${m.bio[lang]}`
  ).join("\n");

  const serviceSections = [
    ...services.map((sv) => {
      const sc = sv.content[lang];
      const body = absoluteLinks(sc.body.trim(), lang).replace(/^(#{2,3}) /gm, (_, h: string) => `#${h} `);
      return `## ${sc.name}\n\n${url(servicePath(sv.id, lang))}\n\n> ${sc.description}\n\n${body}\n\n### ${f.faq}\n\n${faqBlock(sc.faq).replace(/^### /gm, "#### ")}`;
    }),
    ...text.serviceItems.filter((s) => !s.service).map((s) => `## ${s.name}\n\n${s.description}`),
  ].join("\n\n---\n\n");

  const cases = visibleWorks
    .map((raw) => {
      const w = localizeWork(raw, lang);
      const parts = [
        `## ${w.title} - ${w.seoTitle ?? w.subtitle}`,
        `${url(`/cases/${w.slug}`)}${w.year ? ` · ${f.year}: ${w.year}` : ""}`,
        w.description ?? w.seoDescription ?? "",
        w.task ? `### ${f.caseTask}\n\n${w.task}` : "",
        w.solutions ? `### ${f.caseSolution}\n\n${w.solutions}` : "",
        w.process ? `### ${f.caseProcess}\n\n${w.process}` : "",
        w.result ? `### ${f.caseResult}\n\n${w.result}` : "",
        w.features?.length ? `### ${f.caseFeatures}\n\n${w.features.map((x) => `- ${x}`).join("\n")}` : "",
        w.technologies?.length ? `### ${f.caseTech}\n\n${w.technologies.join(", ")}` : "",
      ];
      const links = [w.links?.web, w.links?.ios, w.links?.android, w.links?.other?.url].filter(Boolean);
      if (links.length) parts.push(`### ${f.caseLinks}\n\n${links.map((l) => `- ${l}`).join("\n")}`);
      const faq = getWorkFaq(w.slug, lang);
      if (faq.length) parts.push(`### ${f.faq}\n\n${faqBlock(faq).replace(/^### /gm, "#### ")}`);
      return parts.filter(Boolean).join("\n\n");
    })
    .join("\n\n---\n\n");

  const articles = publishedPosts()
    .map((p) => {
      const pc = p.content[lang];
      const modified = lastModified(p);
      const meta = [
        url(postPath(p, lang)),
        `${f.author}: ${postAuthor(p).name}`,
        `${f.published}: ${p.date}`,
        ...(modified !== p.date ? [`${f.updated}: ${modified}`] : []),
      ].join(" · ");
      const body = absoluteLinks(pc.body.trim(), lang).replace(/^(#{2,3}) /gm, (_, h: string) => `#${h} `);
      const faq = pc.faq?.length ? `\n\n### ${f.faq}\n\n${faqBlock(pc.faq).replace(/^### /gm, "#### ")}` : "";
      return `## ${pc.title}\n\n${meta}\n\n> ${pc.description}\n\n${body}${faq}`;
    })
    .join("\n\n---\n\n");

  const body = `# ${SITE_NAME}

> ${text.siteDescription}

${f.intro}

## ${f.facts}

${f.factLines(url("/")).join("\n")}

${c.about}

## ${f.team}

${team}

# ${c.services}

${serviceSections}

## ${f.faq}

${faqBlock(ui.faq)}

## ${f.contactFaq}

${faqBlock(ui.contact.faq)}

# ${c.cases}

${cases}

# ${c.blog}

${articles}

# ${c.contact}

- WhatsApp / ${lang === "en" ? "phone" : "teléfono"}: ${CONTACT.phone} (${CONTACT.whatsapp})
- ${c.labels.contact}: ${url("/contact")}
- LinkedIn: ${CONTACT.linkedin}
- Instagram: ${CONTACT.instagram}
- ${c.location}: ${CONTACT.city}, ${CONTACT.region}, Argentina
`;

  return textResponse(body);
}
