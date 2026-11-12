import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "../../components/HomeClient";
import HomeSeoContent from "../../components/HomeSeoContent";
import { visibleWorks } from "../../data/works";
import { JsonLd, breadcrumbJsonLd, worksCollectionJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { localizeWork } from "../../lib/localizeWork";
import { pageMetadata } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/works", seoText[lang].works);
}

export default async function WorksPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { crumbs } = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          worksCollectionJsonLd(visibleWorks.map((w) => localizeWork(w, lang)), lang),
          breadcrumbJsonLd([
            { name: crumbs.home, path: localePath(lang, "/") },
            { name: crumbs.works, path: localePath(lang, "/works") },
          ]),
        ]}
      />
      <HomeClient seoFallback={<HomeSeoContent lang={lang} />} />
    </>
  );
}
