import type { WorkItem } from "../data/works";
import { WORKS_ES } from "../data/works.es";
import type { Lang } from "./i18n";

/**
 * Devuelve el WorkItem con los campos narrativos (subtitle/task/solutions/
 * description/process/result/features) en el idioma pedido. Title, images,
 * technologies, links, year, seoTitle y seoDescription no se traducen.
 */
export function localizeWork(work: WorkItem, lang: Lang): WorkItem {
  if (lang === "en") return work;
  const t = WORKS_ES[work.slug];
  if (!t) return work;
  return {
    ...work,
    subtitle: t.subtitle ?? work.subtitle,
    task: t.task ?? work.task,
    solutions: t.solutions ?? work.solutions,
    description: t.description ?? work.description,
    process: t.process ?? work.process,
    result: t.result ?? work.result,
    features: t.features ?? work.features,
  };
}
