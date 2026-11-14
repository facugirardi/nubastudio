import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "../../components/blog/BlogIndex";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import { postPath, publishedPosts } from "../../data/blog";
import { JsonLd, blogJsonLd, breadcrumbJsonLd } from "../../lib/jsonLd";
import { isLang, localePath } from "../../lib/lang";
import { pageAlternates, pageOpenGraph } from "../../lib/pageMeta";
import { seoText } from "../../lib/seoText";

type Props = { params: Promise<{ lang: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { blog } = seoText[lang];
  return {
    title: blog.title,
    description: blog.description,
    alternates: pageAlternates(lang, "/blog"),
    openGraph: pageOpenGraph(lang, "/blog", { title: blog.ogTitle, description: blog.description }),
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { crumbs } = seoText[lang];

  return (
    <>
      <JsonLd
        data={[
          blogJsonLd(
            lang,
            publishedPosts().map((p) => ({ title: p.content[lang].title, path: postPath(p, lang) }))
          ),
          breadcrumbJsonLd([
            { name: crumbs.home, path: localePath(lang, "/") },
            { name: crumbs.blog, path: localePath(lang, "/blog") },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main>
          <BlogIndex lang={lang} />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
