/**
 * Dominio canónico. Producción sirve en www (Vercel redirige el apex a www),
 * así que canonicals, sitemap y JSON-LD tienen que apuntar ahí. Si se cambia el
 * dominio principal en Vercel, cambiar NEXT_PUBLIC_SITE_URL.
 */
import type { Lang } from "./lang";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.nuba.studio";

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const SITE_NAME = "Nuba Studio";

export const SITE_TAGLINE = "Digital product studio";

export const SITE_DESCRIPTION =
  "Nuba Studio is a custom software and app development company in Argentina, based in Córdoba. We design and build business systems, websites, mobile apps and marketplaces end to end.";

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
  /** Biografía visible en /about y `description` del Person: solo hechos verificables. */
  bio: Record<Lang, string>;
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
    bio: {
      en: "Co-founder and product designer at Nuba Studio. Alejo leads interface and experience design on every project, from the first wireframes to the design system developers build on, and writes the studio's industry guides on real estate, events and marketplaces.",
      es: "Cofundador y diseñador de producto en Nuba Studio. Alejo lidera el diseño de interfaz y experiencia en cada proyecto, desde los primeros wireframes hasta el sistema de diseño sobre el que se desarrolla, y escribe las guías por industria del estudio: inmobiliarias, eventos y marketplaces.",
    },
  },
  {
    id: "facundo-girardi",
    name: "Facundo Girardi",
    role: "Development",
    jobTitle: "Software Developer",
    photo: "/images/facu.webp",
    profiles: ["https://www.linkedin.com/in/facugirardi/"],
    knowsAbout: ["Software development", "Next.js", "React Native", "TypeScript", "Web performance"],
    bio: {
      en: "Co-founder and software developer at Nuba Studio. Facundo leads development: the websites, iOS and Android apps and APIs behind the studio's products, built with Next.js, React Native and TypeScript, and writes about performance, SEO and the technology choices behind each project.",
      es: "Cofundador y desarrollador de software en Nuba Studio. Facundo lidera el desarrollo: los sitios, las apps iOS y Android y las APIs detrás de los productos del estudio, hechos con Next.js, React Native y TypeScript, y escribe sobre performance, SEO y las decisiones técnicas de cada proyecto.",
    },
  },
  {
    id: "angel-vaquero",
    name: "Ángel Vaquero",
    role: "Strategy",
    jobTitle: "Product Strategist",
    photo: "/images/angelito.webp",
    profiles: ["https://www.linkedin.com/in/angel-vaquero-7592a8194/"],
    knowsAbout: ["Product strategy", "MVP development", "Marketplaces", "Software project estimation"],
    bio: {
      en: "Co-founder and product strategist at Nuba Studio. Ángel leads discovery and scope: turning an idea into a closed scope, a roadmap and an estimate before anything is built, and writes the studio's guides on costs, MVPs and how to choose a development partner.",
      es: "Cofundador y estratega de producto en Nuba Studio. Ángel lidera el descubrimiento y el alcance: convertir una idea en un alcance cerrado, una hoja de ruta y una estimación antes de construir nada, y escribe las guías del estudio sobre costos, MVPs y cómo elegir con quién desarrollar.",
    },
  },
];

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
