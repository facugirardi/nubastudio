import Image from "next/image";
import { lastModified, postAuthor, readingMinutes, relatedPosts, type Post } from "../../data/blog";
import { getWork } from "../../data/works";
import { localePath, type Lang } from "../../lib/lang";
import { localizeWork } from "../../lib/localizeWork";
import { getUiText } from "../../lib/uiText";
import FaqList from "../FaqList";
import { ArrowRight, ArrowUpRight } from "../icons";
import PostBody, { tableOfContents } from "./PostBody";
import PostCard, { formatDate } from "./PostCard";

export default function BlogArticle({ post, lang }: { post: Post; lang: Lang }) {
  const t = getUiText(lang).blog;
  const c = post.content[lang];
  const toc = tableOfContents(c.body);
  const modified = lastModified(post);
  const author = postAuthor(post);
  const cases = (post.cases ?? []).flatMap((slug) => {
    const work = getWork(slug);
    return work && !work.hidden ? [localizeWork(work, lang)] : [];
  });

  return (
    <div className="font-display text-[#EDEDED]">
      <header className="mx-auto max-w-[1400px] px-5 pb-14 pt-32 sm:px-8 lg:px-10 lg:pb-20 lg:pt-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
          <a href={localePath(lang, "/blog")} className="transition-colors hover:text-[#EDEDED]">
            {t.label}
          </a>
          <span className="text-white/25"> / </span>
          <a href={`${localePath(lang, "/blog")}#${post.category}`} className="transition-colors hover:text-[#EDEDED]">
            {t.categories[post.category]}
          </a>
        </p>
        <h1 className="mt-6 max-w-[22ch] text-[clamp(2.4rem,5.2vw,4.5rem)] font-[450] leading-[1.02] tracking-[-0.055em]">{c.title}</h1>
        <p className="mt-7 max-w-[60ch] text-[17px] leading-[1.6] text-white/55 lg:text-[19px]">{c.excerpt}</p>
        <p className="mt-9 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
          <span>
            {t.published} <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          </span>
          {modified !== post.date && (
            <span>
              {t.updated} <time dateTime={modified}>{formatDate(modified, lang)}</time>
            </span>
          )}
          <span>
            {readingMinutes(post, lang)} {t.minRead}
          </span>
          <span>
            {t.by}{" "}
            <a href={localePath(lang, "/about")} rel="author" className="text-white/60 transition-colors hover:text-[#EDEDED]">
              {author.name}
            </a>
            , Nuba Studio
          </span>
        </p>
      </header>

      <div className="border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20 lg:px-10 lg:py-20">
          <article className="min-w-0 max-w-[70ch]">
            <PostBody body={c.body} lang={lang} />

            {c.faq && c.faq.length > 0 && (
              <section aria-labelledby="faq" className="mt-20">
                <h2 id="faq" className="scroll-mt-28 text-[clamp(1.6rem,2.6vw,2.1rem)] font-[450] tracking-[-0.04em]">
                  {t.faq}
                </h2>
                <FaqList items={c.faq} className="mt-6" />
              </section>
            )}
          </article>

          {toc.length > 2 && (
            <aside className="hidden lg:block">
              <nav aria-label={t.onThisPage} className="sticky top-28">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">{t.onThisPage}</p>
                <ol className="mt-4 space-y-2.5 border-l border-white/[0.08] pl-4 text-[13.5px] leading-[1.45]">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-white/45 transition-colors hover:text-[#EDEDED]">
                        {item.text}
                      </a>
                    </li>
                  ))}
                  {c.faq && c.faq.length > 0 && (
                    <li>
                      <a href="#faq" className="text-white/45 transition-colors hover:text-[#EDEDED]">
                        {t.faq}
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            </aside>
          )}
        </div>
      </div>

      {cases.length > 0 && (
        <section aria-labelledby="related-cases" className="border-t border-white/[0.07]">
          <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <h2 id="related-cases" className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
              {t.relatedCases}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {cases.map((work) => (
                <a
                  key={work.slug}
                  href={localePath(lang, `/cases/${work.slug}`)}
                  className="group/case overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02] transition-colors hover:border-white/20"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/case:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-end justify-between gap-6 p-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">{t.relatedCase}</p>
                      <p className="mt-2 text-[22px] font-[450] tracking-[-0.035em]">{work.title}</p>
                      <p className="mt-1 text-[14px] text-white/50">{work.seoTitle ?? work.subtitle}</p>
                    </div>
                    <ArrowUpRight size={14} className="mb-1 shrink-0 text-white/40 transition-colors group-hover/case:text-[#C6FF00]" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-8 rounded-2xl border border-white/[0.09] bg-[radial-gradient(ellipse_80%_120%_at_0%_0%,rgba(198,255,0,0.07),transparent_60%)] p-8 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-[450] leading-[1.05] tracking-[-0.05em]">{t.ctaTitle}</p>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-white/55">{t.ctaSub}</p>
            </div>
            <a
              href={localePath(lang, "/contact")}
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-[#C6FF00] px-6 text-[15px] font-medium text-black transition-colors hover:bg-[#d4ff40] lg:self-auto"
            >
              {t.ctaButton}
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="keep-reading" className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
          <div className="flex items-baseline justify-between gap-6 px-5 py-6 sm:px-8 lg:px-10">
            <h2 id="keep-reading" className="text-[22px] font-[450] tracking-[-0.035em]">
              {t.keepReading}
            </h2>
            <a href={localePath(lang, "/blog")} className="text-[14px] text-white/50 transition-colors hover:text-[#EDEDED]">
              {t.backToBlog}
            </a>
          </div>
          <div className="grid gap-px border-t border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
            {relatedPosts(post).map((p) => (
              <PostCard key={p.slug} post={p} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
