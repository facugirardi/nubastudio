import type { Lang } from "../../lib/lang";

export type BlogCategory = "costs" | "product" | "industry" | "tech";

export type PostContent = {
  title: string;
  /** Versión corta del título para <title> (Google corta cerca de los 60 caracteres con " - Nuba Studio"). */
  seoTitle?: string;
  /** 140–160 caracteres: meta description, Open Graph y JSON-LD. */
  description: string;
  /** Bajada visible en el listado y debajo del título. */
  excerpt: string;
  /**
   * Cuerpo en un markdown acotado (ver app/components/blog/PostBody.tsx):
   * ## / ### títulos, párrafos, listas "-" y "1.", "> " destacado, tablas con "|",
   * **negrita**, `código` y [links](/ruta). Los links internos van sin prefijo de idioma.
   */
  body: string;
  faq?: { question: string; answer: string }[];
};

export type Post = {
  /** Slug en inglés; el de español sale de slugs.ts. */
  slug: string;
  /** ISO yyyy-mm-dd. Si es futura, el artículo queda programado: no se publica hasta ese día. */
  date: string;
  updated?: string;
  category: BlogCategory;
  /** Autor (nombre exacto de TEAM_MEMBERS). Sin este campo se usa el de su categoría (ver postAuthor). */
  author?: string;
  /** Slugs de casos visibles que el artículo recomienda al final. */
  cases?: string[];
  content: Record<Lang, PostContent>;
};
