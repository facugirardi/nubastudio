/**
 * Dominio canónico. Producción sirve en www (Vercel redirige el apex a www),
 * así que canonicals, sitemap y JSON-LD tienen que apuntar ahí. Si se cambia el
 * dominio principal en Vercel, cambiar NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.nuba.studio";

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const SITE_NAME = "Nuba Studio";

export const SITE_TAGLINE = "Digital product studio";

export const SITE_DESCRIPTION =
  "Nuba Studio is a digital product studio from Córdoba, Argentina. We design and build websites, mobile apps, marketplaces and digital products end to end.";

export const CONTACT = {
  phone: "+5493513471844",
  whatsapp: "https://wa.me/5493513471844",
  linkedin: "https://www.linkedin.com/company/nubastudio",
  instagram: "https://instagram.com/nubastudio.ar",
  instagramHandle: "@nubastudio.ar",
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
  "https://www.linkedin.com/company/nubastudio",
  "https://instagram.com/nubastudio.ar",
  // Agregar los que existan: Instagram, perfil de Behance del estudio,
  // Clutch, Google Business Profile, GitHub, Dribbble.
];

export const FOUNDED = "2025";
export const PROJECTS_SHIPPED = 9;

export type TeamMember = {
  id: string;
  name: string;
  role: "Design" | "Development" | "Strategy";
  jobTitle: string;
  photo: string;
  /** Perfiles personales (LinkedIn, GitHub, Behance…): alimentan `sameAs` del Person. */
  profiles: string[];
  knowsAbout: string[];
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alejo-vaquero",
    name: "Alejo Vaquero",
    role: "Design",
    jobTitle: "Product Designer",
    photo: "/images/alejo.webp",
    profiles: ["https://www.linkedin.com/in/alejovaquero/"],
    knowsAbout: ["Product design", "UI/UX design", "Design systems", "Web design"],
  },
  {
    id: "facundo-girardi",
    name: "Facundo Girardi",
    role: "Development",
    jobTitle: "Software Developer",
    photo: "/images/facu.webp",
    profiles: ["https://www.linkedin.com/in/facugirardi/"],
    knowsAbout: ["Software development", "Next.js", "React Native", "TypeScript", "Web performance"],
  },
  {
    id: "angel-vaquero",
    name: "Ángel Vaquero",
    role: "Strategy",
    jobTitle: "Product Strategist",
    photo: "/images/angelito.webp",
    profiles: ["https://www.linkedin.com/in/angel-vaquero-7592a8194/"],
    knowsAbout: ["Product strategy", "MVP development", "Marketplaces", "Software project estimation"],
  },
];

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
