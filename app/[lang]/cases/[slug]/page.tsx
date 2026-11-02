import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmoothScroll from "../../../components/SmoothScroll";
import CaseStudy from "../../../components/CaseStudy";
import { getWork, getNextWork, works } from "../../../data/works";
import { JsonLd, breadcrumbJsonLd, caseStudyJsonLd } from "../../../lib/jsonLd";
import { isLang, localePath } from "../../../lib/lang";
import { localizeWork } from "../../../lib/localizeWork";
import { pageAlternates, pageOpenGraph } from "../../../lib/pageMeta";
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
  const path = `/cases/${work.slug}`;

  return {
    title,
    description,
    keywords: [work.title, work.subtitle, ...(work.technologies ?? [])],
    alternates: pageAlternates(lang, path),
    openGraph: pageOpenGraph(lang, path, {
      type: "article",
      title: `${title} - ${SITE_NAME}`,
      description,
    }),
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${SITE_NAME}`,
      description,
    },
  };
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
