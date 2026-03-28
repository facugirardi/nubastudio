import type { Metadata } from "next";
import { works } from "@/data/works";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import CaseStudyPageClient from "./CaseStudyPageClient";

function caseStudyJsonLd(slug: string) {
  const work = works.find((w) => w.slug === slug);
  if (!work) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.description ?? work.subtitle,
    image: absoluteUrl(work.image),
    url: absoluteUrl(`/cases/${slug}`),
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    return {
      title: "Case study not found",
      description: siteConfig.description,
    };
  }

  const title = `${work.title} — case study`;
  const description =
    work.description?.slice(0, 160).trim() ||
    `${work.subtitle}. ${siteConfig.name} portfolio.`;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/cases/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/cases/${slug}`),
      type: "article",
      images: [
        {
          url: absoluteUrl(work.image),
          alt: work.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const jsonLd = caseStudyJsonLd(slug);
  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <CaseStudyPageClient slug={slug} />
    </>
  );
}
