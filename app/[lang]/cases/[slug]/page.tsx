import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmoothScroll from "../../../components/SmoothScroll";
import CaseStudy from "../../../components/CaseStudy";
import { getWork, getNextWork, works } from "../../../data/works";
import { JsonLd, breadcrumbJsonLd, caseStudyJsonLd } from "../../../lib/jsonLd";
import { isLang, localePath } from "../../../lib/lang";
import { localizeWork } from "../../../lib/localizeWork";
import { pageMetadata } from "../../../lib/pageMeta";
import { SITE_NAME } from "../../../lib/seo";
import { seoText } from "../../../lib/seoText";

type Props = { params: Promise<{ lang: string; slug: string }> };

// Los params de [lang] los aporta el layout: acá solo hace falta la lista de casos.
export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const found = getWork(slug);
  if (!isLang(lang) || !found) return { title: "Case not found" };
  const work = localizeWork(found, lang);

  const description =
    work.seoDescription ??
    work.description ??
    `${work.title} - ${work.subtitle} - ${SITE_NAME}.`;
  const title = `${work.title} - ${work.seoTitle ?? work.subtitle}`;

  return pageMetadata(lang, `/cases/${work.slug}`, {
    title,
    description,
    type: "article",
    // Los casos ocultos siguen accesibles por URL directa (Behance, links viejos)
    // pero fuera del índice: no están enlazados ni en el sitemap.
    noindex: Boolean(work.hidden),
  });
}

export default async function CasePage({ params }: Props) {
  const { lang, slug } = await params;
  const found = getWork(slug);
  if (!isLang(lang) || !found) notFound();
  const work = localizeWork(found, lang);

  return (
    <>
      <JsonLd
        data={[
          caseStudyJsonLd(work, lang),
          breadcrumbJsonLd([
            { name: seoText[lang].crumbs.home, path: localePath(lang, "/") },
            { name: seoText[lang].crumbs.works, path: localePath(lang, "/works") },
            { name: work.title, path: localePath(lang, `/cases/${work.slug}`) },
          ]),
        ]}
      />
      <SmoothScroll>
        <main>
          <CaseStudy work={found} next={getNextWork(slug)} />
        </main>
      </SmoothScroll>
    </>
  );
}
