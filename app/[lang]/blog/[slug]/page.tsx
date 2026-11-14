import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "../../../components/blog/BlogArticle";
import Footer from "../../../components/home/Footer";
import Navbar from "../../../components/Navbar";
import SmoothScroll from "../../../components/SmoothScroll";
import { getPost, isPublished, lastModified, postAuthor, postPath, postSlug, posts } from "../../../data/blog";
import { JsonLd, blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd } from "../../../lib/jsonLd";
import { isLang, localePath } from "../../../lib/lang";
import { pageAlternates, pageOpenGraph } from "../../../lib/pageMeta";
import { SITE_NAME } from "../../../lib/seo";
import { seoText } from "../../../lib/seoText";
import { getUiText } from "../../../lib/uiText";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const lang = isLang(params.lang) ? params.lang : "en";
  return posts.map((post) => ({ slug: postSlug(post, lang) }));
}

export const dynamicParams = false;
/** Los artículos programados (fecha futura) dan 404 hasta su día: se revalida cada hora. */
export const revalidate = 3600;

function find(lang: string, slug: string) {
  if (!isLang(lang)) return undefined;
  const post = getPost(slug, lang);
  return post && postSlug(post, lang) === slug && isPublished(post) ? post : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = find(lang, slug);
  if (!isLang(lang) || !post) return {};
  const { seoTitle, description } = post.content[lang];
  const title = seoTitle ?? post.content[lang].title;
  const path = postPath(post, lang);
  const og = pageOpenGraph(lang, path, { type: "article", title: `${title} - ${SITE_NAME}`, description });

  return {
    title,
    description,
    alternates: pageAlternates(lang, { en: postPath(post, "en"), es: postPath(post, "es") }),
    authors: [{ name: postAuthor(post).name }],
    openGraph: {
      ...og,
      type: "article",
      publishedTime: post.date,
      modifiedTime: lastModified(post),
      section: getUiText(lang).blog.categories[post.category],
    },
    twitter: { card: "summary_large_image", title: `${title} - ${SITE_NAME}`, description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const post = find(lang, slug);
  if (!isLang(lang) || !post) notFound();
  const c = post.content[lang];
  const { crumbs } = seoText[lang];
  const path = postPath(post, lang);

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd(lang, {
            path,
            title: c.title,
            description: c.description,
            date: post.date,
            modified: lastModified(post),
            section: getUiText(lang).blog.categories[post.category],
            words: c.body.split(/\s+/).filter(Boolean).length,
            author: postAuthor(post),
          }),
          breadcrumbJsonLd([
            { name: crumbs.home, path: localePath(lang, "/") },
            { name: crumbs.blog, path: localePath(lang, "/blog") },
            { name: c.title, path: localePath(lang, path) },
          ]),
          ...(c.faq?.length ? [faqJsonLd(c.faq)] : []),
        ]}
      />
      <SmoothScroll>
        <Navbar />
        <main>
          <BlogArticle post={post} lang={lang} />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
