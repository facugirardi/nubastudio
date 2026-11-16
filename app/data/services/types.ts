import type { Lang } from "../../lib/lang";
import type { ServiceId } from "./slugs";

export type ServiceContent = {
  /** Nombre corto (menú, migas de pan, JSON-LD). */
  name: string;
  /** H1 de la landing: distinto en cada servicio y con la búsqueda principal adentro. */
  h1: string;
  /** <title> sin el sufijo " - Nuba Studio" (que lo agrega el layout). */
  seoTitle: string;
  /** 140–160 caracteres: meta description, Open Graph y JSON-LD. */
  description: string;
  /** Bajada visible debajo del H1. */
  lead: string;
  /** Qué incluye el servicio: tarjetas debajo del header. */
  includes: { title: string; desc: string }[];
  /** Markdown acotado de PostBody. Links internos sin idioma; los del blog con el slug en inglés. */
  body: string;
  faq: { question: string; answer: string }[];
  og: { title: string; accent: string; subtitle: string };
  /** Búsquedas que cubre (keywords del JSON-LD). */
  keywords: string[];
};

export type Service = {
  id: ServiceId;
  /** Tecnologías o capacidades que se muestran como etiquetas. */
  stack: string[];
  /** Slugs de casos visibles relacionados. */
  cases: string[];
  /** Slugs en inglés de artículos del blog relacionados. */
  posts: string[];
  content: Record<Lang, ServiceContent>;
};
