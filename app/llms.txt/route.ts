import { visibleWorks } from "../data/works";
import { localizeWork } from "../lib/localizeWork";
import { localePath } from "../lib/locale";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

export function GET() {
  const cases = visibleWorks
    .map(
      (w) =>
        `- [${w.title} — ${w.seoTitle ?? w.subtitle}](${absoluteUrl(`/cases/${w.slug}`)})${
          w.year ? ` (${w.year})` : ""
        }: ${w.seoDescription ?? w.description ?? ""}`
    )
    .join("\n");

  const casesEs = visibleWorks
    .map((raw) => {
      const w = localizeWork(raw, "es");
      return `- [${w.title} — ${w.seoTitle ?? w.subtitle}](${absoluteUrl(localePath(`/cases/${w.slug}`, "es"))})`;
    })
    .join("\n");

  const es = (p: string) => absoluteUrl(localePath(p, "es"));

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is a digital product studio based in ${CONTACT.city}, Argentina. We design
and build websites, mobile apps, marketplaces and custom software end to end, from
product strategy and design through development and launch. We work with founders and
companies in Argentina, across Latin America and internationally.

## Services

- **Web development** — sites and platforms built with Next.js, React and TypeScript.
- **Mobile apps** — iOS and Android products built with React Native and Expo.
- **Marketplaces & platforms** — two-sided products with payments, dashboards and APIs.
- **Branding & identity** — visual systems and art direction for digital products.
- **Product strategy & MVP** — discovery, prototyping and roadmap through to a shipped MVP.

## Pages

- [Home](${absoluteUrl("/")}): studio overview and selected work.
- [Work](${absoluteUrl("/works")}): portfolio of case studies.
- [Services](${absoluteUrl("/services")}): what we build and how we run a project.
- [About](${absoluteUrl("/about")}): how the studio works, its principles and the team.
- [Contact](${absoluteUrl("/contact")}): start a project with us.

## Case studies

${cases}

## Versión en español

- [Inicio](${es("/")})
- [Trabajos](${es("/works")})
- [Servicios](${es("/services")})
- [Nosotros](${es("/about")})
- [Contacto](${es("/contact")})

${casesEs}

## Contact

- WhatsApp / phone: ${CONTACT.phone}
- LinkedIn: ${CONTACT.linkedin}
- Location: ${CONTACT.city}, ${CONTACT.region}, Argentina

## Notes

- Content is published in English (${absoluteUrl("/")}) and Spanish (${es("/")}).
- Canonical domain: ${absoluteUrl("/")}
- Structured data (Organization, WebSite, WebPage, CreativeWork, BreadcrumbList, FAQPage)
  is available as JSON-LD on every page.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
