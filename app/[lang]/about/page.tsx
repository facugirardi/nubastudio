import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutIndex, { type AuthorArticles } from "../../components/about/AboutIndex";
import { postAuthor, postPath, publishedPosts } from "../../data/blog";
import HomeCta from "../../components/home/HomeCta";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import { JsonLd, breadcrumbJsonLd, teamJsonLd, webPageJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageMetadata } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

/** Los artículos de cada persona suman el día que se publican. */
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/about", seoText[lang].about);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const text = seoText[lang];
  const articles: AuthorArticles = {};
  for (const post of publishedPosts()) {
    (articles[postAuthor(post).id] ??= []).push({ title: post.content[lang].title, href: localePath(lang, postPath(post, lang)) });
  }

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(lang, "/about", { name: text.about.title, description: text.about.description, type: "AboutPage" }),
          breadcrumbJsonLd([
            { name: text.crumbs.home, path: localePath(lang, "/") },
            { name: text.crumbs.about, path: localePath(lang, "/about") },
          ]),
          ...teamJsonLd(lang),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <AboutIndex articles={articles} />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
