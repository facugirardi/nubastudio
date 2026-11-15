import type { Lang } from "../../lib/lang";

/**
 * Slug de cada artículo en español, indexado por el slug en inglés (que es el
 * `slug` del post). Vive aparte de los posts para que el Navbar pueda traducir
 * la URL al cambiar de idioma sin cargar el contenido de los artículos.
 */
const ES_SLUGS: Record<string, string> = {
  "how-much-does-it-cost-to-build-an-app": "cuanto-cuesta-desarrollar-una-app",
  "how-much-does-it-cost-to-build-a-marketplace": "cuanto-cuesta-hacer-un-marketplace",
  "what-is-an-mvp": "que-es-un-mvp",
  "how-to-choose-a-software-development-agency": "como-elegir-una-agencia-de-desarrollo-de-software",
  "native-vs-react-native-vs-pwa": "app-nativa-vs-react-native-vs-pwa",
  "custom-software-vs-saas": "software-a-medida-vs-saas",
  "software-development-companies-argentina": "empresas-de-desarrollo-de-software-en-cordoba",
  "freelancer-vs-in-house-vs-agency": "freelancer-equipo-propio-o-agencia",
  "from-idea-to-launch-our-process": "de-la-idea-al-lanzamiento",
  "how-to-validate-an-app-idea": "como-validar-una-idea-de-app",
  "marketplace-chicken-and-egg-problem": "primeros-usuarios-de-un-marketplace",
  "how-to-build-a-luxury-villa-rental-platform": "plataforma-de-alquiler-de-villas-de-lujo",
  "how-to-build-a-second-hand-fashion-marketplace": "marketplace-de-ropa-de-segunda-mano",
  "offline-first-mobile-apps": "apps-que-funcionan-sin-internet",
  "cashless-event-payments-qr-ordering": "pedidos-por-qr-y-pagos-en-eventos",
  "websites-for-consulting-and-financial-firms": "sitio-web-para-consultoras-y-empresas-financieras",
  "real-estate-agency-software": "software-para-inmobiliarias",
  "sports-field-booking-app": "app-de-reserva-de-canchas",
  "blockchain-certificates-use-cases": "certificados-en-blockchain",
  "why-we-build-with-nextjs": "por-que-desarrollamos-con-nextjs",
  "core-web-vitals-for-business": "core-web-vitals-para-negocios",
  "nextjs-seo-checklist": "checklist-seo-nextjs",
  "optimize-website-for-ai-search": "seo-para-buscadores-con-ia",
};

const EN_SLUGS: Record<string, string> = Object.fromEntries(Object.entries(ES_SLUGS).map(([en, es]) => [es, en]));

export function blogSlug(enSlug: string, lang: Lang): string {
  return lang === "es" ? (ES_SLUGS[enSlug] ?? enSlug) : enSlug;
}

/** El slug en inglés (el `slug` del post) a partir del de la URL. */
export function enBlogSlug(slug: string, lang: Lang): string {
  return lang === "es" ? (EN_SLUGS[slug] ?? slug) : slug;
}

/** Path sin prefijo de idioma: "/blog/que-es-un-mvp". */
export function blogPath(enSlug: string, lang: Lang): string {
  return `/blog/${blogSlug(enSlug, lang)}`;
}

/** "/blog/<slug en `from`>" → el mismo artículo en `to`. Cualquier otro path queda igual. */
export function translateBlogPath(path: string, from: Lang, to: Lang): string {
  const match = path.match(/^\/blog\/([^/?#]+)(.*)$/);
  if (!match) return path;
  return `${blogPath(enBlogSlug(match[1], from), to)}${match[2]}`;
}
