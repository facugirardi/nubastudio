export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://nuba.studio";

export const SITE_NAME = "Nuba Studio";

export const SITE_TAGLINE = "Digital product studio";

export const SITE_DESCRIPTION =
  "Nuba Studio is a digital product studio from Córdoba, Argentina. We design and build websites, mobile apps, marketplaces and digital products end to end.";

export const TWITTER_HANDLE = "@nubastudio";

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

export const KEYWORDS = [
  "digital product studio",
  "web design agency",
  "web development studio",
  "mobile app development",
  "marketplace development",
  "product design",
  "Next.js development",
  "React Native development",
  "UI UX design studio",
  "agencia digital Córdoba",
  "desarrollo web Argentina",
  "diseño de productos digitales",
];
