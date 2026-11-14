import type { Lang } from "../../lib/lang";

/**
 * Las landings de servicio y su slug en cada idioma. Vive aparte del contenido
 * para que el Navbar y el proxy puedan armar y traducir URLs sin cargarlo.
 */
export const SERVICE_IDS = ["web", "mobile", "marketplaces", "mvp"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

/** Si el servicio tiene landing propia (Branding, por ejemplo, vive solo en /services). */
export function isServiceId(id: string): id is ServiceId {
  return (SERVICE_IDS as readonly string[]).includes(id);
}

const SLUGS: Record<ServiceId, Record<Lang, string>> = {
  web: { en: "web-development", es: "desarrollo-web" },
  mobile: { en: "mobile-app-development", es: "desarrollo-de-apps" },
  marketplaces: { en: "marketplace-development", es: "desarrollo-de-marketplaces" },
  mvp: { en: "mvp-development", es: "desarrollo-de-mvp" },
};

export function serviceSlug(id: ServiceId, lang: Lang): string {
  return SLUGS[id][lang];
}

/** Path sin prefijo de idioma: "/services/desarrollo-web". */
export function servicePath(id: ServiceId, lang: Lang): string {
  return `/services/${serviceSlug(id, lang)}`;
}

export function serviceIdFromSlug(slug: string, lang: Lang): ServiceId | undefined {
  return SERVICE_IDS.find((id) => SLUGS[id][lang] === slug);
}

/** "/services/<slug en `from`>" → la misma landing en `to`. Cualquier otro path queda igual. */
export function translateServicePath(path: string, from: Lang, to: Lang): string {
  const match = path.match(/^\/services\/([^/?#]+)(.*)$/);
  const id = match ? serviceIdFromSlug(match[1], from) : undefined;
  return match && id ? `${servicePath(id, to)}${match[2]}` : path;
}
