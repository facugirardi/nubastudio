import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import WorksIndex from "../../components/works/WorksIndex";
import HomeCta from "../../components/home/HomeCta";
import Footer from "../../components/home/Footer";
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
          breadcrumbJsonLd([
            { name: crumbs.home, path: localePath(lang, "/") },
            { name: crumbs.works, path: localePath(lang, "/works") },
          ]),
          worksCollectionJsonLd(visibleWorks.map((w) => localizeWork(w, lang)), lang, "/works"),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <WorksIndex />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
