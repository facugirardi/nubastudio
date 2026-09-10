import { works } from "../data/works";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

export function GET() {
  const cases = works
    .map(
      (w) =>
        `- [${w.title} — ${w.seoTitle ?? w.subtitle}](${absoluteUrl(`/cases/${w.slug}`)})${
          w.year ? ` (${w.year})` : ""
        }: ${w.seoDescription ?? w.description ?? ""}`
    )
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is a digital product studio based in ${CONTACT.city}, Argentina. We design
and build websites, mobile apps, marketplaces and digital products end to end, from
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
- [About](${absoluteUrl("/about")}): how the studio works, its process and the team.
- [Services](${absoluteUrl("/services")}): what we build and how we run a project.
- [Contact](${absoluteUrl("/contact")}): start a project with us.

## Case studies

${cases}

## Contact

- WhatsApp / phone: ${CONTACT.phone}
- LinkedIn: ${CONTACT.linkedin}
- Location: ${CONTACT.city}, ${CONTACT.region}, Argentina

## Notes

- Content is published in English. The studio works in English and Spanish.
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
