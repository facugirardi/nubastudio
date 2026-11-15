import type { Lang } from "../../lib/lang";
import { SERVICE_IDS, serviceIdFromSlug, servicePath, serviceSlug, type ServiceId } from "./slugs";
import type { Service } from "./types";
import custom from "./pages/custom";
import web from "./pages/web";
import mobile from "./pages/mobile";
import marketplaces from "./pages/marketplaces";
import mvp from "./pages/mvp";

export type { Service, ServiceContent } from "./types";
export { SERVICE_IDS, servicePath, serviceSlug, translateServicePath, type ServiceId } from "./slugs";

const BY_ID: Record<ServiceId, Service> = { custom, web, mobile, marketplaces, mvp };

export const services: Service[] = SERVICE_IDS.map((id) => BY_ID[id]);

export function getService(id: ServiceId): Service {
  return BY_ID[id];
}

export function getServiceBySlug(slug: string, lang: Lang): Service | undefined {
  const id = serviceIdFromSlug(slug, lang);
  return id ? BY_ID[id] : undefined;
}

/** { en, es } para canonical, hreflang y sitemap. */
export function serviceLocalizedPath(id: ServiceId): Record<Lang, string> {
  return { en: servicePath(id, "en"), es: servicePath(id, "es") };
}

export function serviceSlugs(lang: Lang): string[] {
  return SERVICE_IDS.map((id) => serviceSlug(id, lang));
}
