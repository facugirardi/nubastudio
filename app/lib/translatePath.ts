import { translateBlogPath } from "../data/blog/slugs";
import { translateServicePath } from "../data/services/slugs";
import type { Lang } from "./lang";

/** Un path sin idioma escrito en `from` → el mismo contenido en `to` (traduce los slugs de blog y servicios). */
export function translatePath(path: string, from: Lang, to: Lang): string {
  if (from === to) return path;
  return translateServicePath(translateBlogPath(path, from, to), from, to);
}
