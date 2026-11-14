import { BLOG_CATEGORIES, postsByCategory, publishedPosts } from "../../data/blog";
import type { Lang } from "../../lib/lang";
import { getUiText } from "../../lib/uiText";
import PostCard from "./PostCard";

export default function BlogIndex({ lang }: { lang: Lang }) {
  const t = getUiText(lang).blog;

  return (
    <div className="font-display text-[#EDEDED]">
      <header className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:px-10 lg:pb-20 lg:pt-40">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
            <span className="text-white/25">[{String(publishedPosts().length).padStart(2, "0")}]</span> {t.label}
          </p>
          <h1 className="mt-5 max-w-[16ch] text-[clamp(2.75rem,6vw,5.25rem)] font-[450] leading-[0.98] tracking-[-0.055em]">
            {t.heading}
          </h1>
          <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.6] text-white/55 lg:text-[17px]">{t.sub}</p>
        </div>

        <nav aria-label={t.categoriesLabel} className="lg:justify-self-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">{t.categoriesLabel}</p>
          <ol className="mt-4 min-w-[280px] border-t border-white/[0.08]">
            {BLOG_CATEGORIES.filter((cat) => postsByCategory(cat).length).map((cat) => (
              <li key={cat} className="border-b border-white/[0.08]">
                <a
                  href={`#${cat}`}
                  className="flex items-baseline justify-between gap-6 py-3 text-[15px] text-white/60 transition-colors hover:text-[#EDEDED]"
                >
                  {t.categories[cat]}
                  <span className="font-mono text-[11px] text-white/30">{String(postsByCategory(cat).length).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {BLOG_CATEGORIES.map((cat, i) => {
        const list = postsByCategory(cat);
        if (!list.length) return null;
        return (
          <section key={cat} id={cat} aria-labelledby={`${cat}-title`} className="scroll-mt-16 border-t border-white/[0.07]">
            <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
              <div className="flex items-baseline justify-between gap-6 px-5 py-6 sm:px-8 lg:px-10">
                <h2 id={`${cat}-title`} className="text-[22px] font-[450] tracking-[-0.035em]">
                  <span className="mr-3 font-mono text-[11px] tracking-normal text-white/30">0{i + 1}</span>
                  {t.categories[cat]}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">
                  {list.length} {t.articles}
                </p>
              </div>
              <div className="grid gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
                {list.map((post) => (
                  <PostCard key={post.slug} post={post} lang={lang} />
                ))}
                {list.length % 2 !== 0 && <div aria-hidden className="hidden bg-black sm:block lg:hidden" />}
                {list.length % 3 !== 0 && <div aria-hidden className="hidden bg-black lg:block" style={{ gridColumn: `span ${3 - (list.length % 3)}` }} />}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
