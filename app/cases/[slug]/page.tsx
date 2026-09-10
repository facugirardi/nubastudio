import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmoothScroll from "../../components/SmoothScroll";
import CaseStudy from "../../components/CaseStudy";
import { getWork, getNextWork, works } from "../../data/works";
import { JsonLd, breadcrumbJsonLd, caseStudyJsonLd } from "../../lib/jsonLd";
import { SITE_NAME } from "../../lib/seo";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Case not found" };

  const description =
    work.seoDescription ??
    work.description ??
    `${work.title} — ${work.subtitle} by ${SITE_NAME}.`;
  const title = `${work.title} — ${work.seoTitle ?? work.subtitle}`;
  const url = `/cases/${work.slug}`;

  return {
    title,
    description,
    keywords: [work.title, work.subtitle, ...(work.technologies ?? [])],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${title} — ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  return (
    <>
      <JsonLd
        data={[
          caseStudyJsonLd(work),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: work.title, path: `/cases/${work.slug}` },
          ]),
        ]}
      />
      <SmoothScroll>
        <main>
          <CaseStudy work={work} next={getNextWork(slug)} />
        </main>
      </SmoothScroll>
    </>
  );
}
