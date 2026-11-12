import type { Lang } from "./locale";

/**
 * Dominio canónico. Producción sirve en www (Vercel redirige el apex a www),
 * así que canonicals, sitemap y JSON-LD tienen que apuntar ahí. Si algún día
 * se cambia el dominio principal en Vercel, cambiar NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.nuba.studio";

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const SITE_NAME = "Nuba Studio";

export const SITE_COPY: Record<Lang, { tagline: string; description: string }> = {
  en: {
    tagline: "Web & app development studio",
    description:
      "Nuba Studio designs and builds websites, mobile apps, marketplaces and custom software from Córdoba, Argentina. Strategy, design and code, end to end.",
  },
  es: {
    tagline: "Estudio de desarrollo web y apps",
    description:
      "Nuba Studio diseña y desarrolla sitios web, apps móviles, marketplaces y software a medida desde Córdoba, Argentina. Estrategia, diseño y código.",
  },
};

export const SITE_TAGLINE = SITE_COPY.en.tagline;

export const SITE_DESCRIPTION = SITE_COPY.en.description;

export const CONTACT = {
  phone: "+5493513471844",
  whatsapp: "https://wa.me/5493513471844",
  linkedin: "https://linkedin.com/company/nubastudio",
  city: "Córdoba",
  region: "Córdoba",
  country: "AR",
  // ── Completar para cerrar las señales de entidad y SEO local ──
  // Todo lo de abajo se omite del JSON-LD mientras esté vacío, así que
  // el markup sigue siendo válido; solo pierde fuerza.
  email: "",        // ej. "hola@nuba.studio" — hoy no hay email público en el sitio
  street: "",       // ej. "Av. Colón 1234, Piso 2" — necesario para el local pack
  postalCode: "",   // ej. "X5000"
  latitude: "",     // coordenadas del estudio, para geo
  longitude: "",
};

/** Perfiles públicos del estudio. Alimentan `sameAs`: cuantos más, mejor
 *  desambigua la entidad "Nuba Studio" para Google y para los LLMs. */
export const PROFILES: string[] = [
  "https://linkedin.com/company/nubastudio",
  // Agregar los que existan: Instagram, perfil de Behance del estudio,
  // Clutch, Google Business Profile, GitHub, Dribbble.
];

export const FOUNDED = "2024";

export const TEAM_MEMBERS = [
  { name: "Alejo Vaquero", role: "Design" },
  { name: "Facundo Girardi", role: "Development" },
  { name: "Ángel Vaquero", role: "Strategy" },
];

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
