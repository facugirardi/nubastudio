import Link from "next/link";
import { visibleWorks } from "../data/works";
import { localePath, type Lang } from "../lib/lang";
import { localizeWork } from "../lib/localizeWork";
import { seoText } from "../lib/seoText";

/**
 * El texto y los links de la home en HTML plano, en el idioma de la página: así
 * Google lee los proyectos y los servicios sin tener que usar la espiral.
 */
export default function HomeSeoContent({ lang }: { lang: Lang }) {
  const text = seoText[lang].homeContent;

  return (
    <section className="sr-only" aria-label={text.ariaLabel}>
      <h1>{text.h1}</h1>
      {text.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <h2>{text.selectedWork}</h2>
      <ul>
        {visibleWorks.map((raw) => {
          const work = localizeWork(raw, lang);
          const summary = work.seoDescription ?? work.description;
          return (
            <li key={work.slug}>
              <Link href={localePath(lang, `/cases/${work.slug}`)}>
                {work.title} - {work.seoTitle ?? work.subtitle}
                {work.year ? ` (${work.year})` : ""}
              </Link>
              {summary ? <p>{summary}</p> : null}
            </li>
          );
        })}
      </ul>

      <h2>{text.explore}</h2>
      <ul>
        <li>
          <Link href={localePath(lang, "/about")}>{text.links.about}</Link>
        </li>
        <li>
          <Link href={localePath(lang, "/services")}>{text.links.services}</Link>
        </li>
        <li>
          <Link href={localePath(lang, "/contact")}>{text.links.contact}</Link>
        </li>
      </ul>
    </section>
  );
}
