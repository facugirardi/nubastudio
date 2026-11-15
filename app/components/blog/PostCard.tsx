import { postPath, readingMinutes, type Post } from "../../data/blog";
import { localePath, type Lang } from "../../lib/lang";
import { getUiText } from "../../lib/uiText";
import { ArrowUpRight } from "../icons";

export function formatDate(date: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "es" ? "es-AR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export default function PostCard({ post, lang, headingLevel = 3 }: { post: Post; lang: Lang; headingLevel?: 2 | 3 }) {
  const t = getUiText(lang).blog;
  const c = post.content[lang];
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="group/card relative flex h-full flex-col bg-black p-6 transition-colors duration-200 hover:bg-white/[0.025] sm:p-7">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
        {t.categories[post.category]}
        <span className="text-white/20"> · </span>
        {readingMinutes(post, lang)} {t.minRead}
      </p>
      <Heading className="mt-4 text-[21px] font-[450] leading-[1.2] tracking-[-0.035em] text-[#EDEDED]">
        <a href={localePath(lang, postPath(post, lang))} className="after:absolute after:inset-0 focus-visible:outline-none">
          {c.title}
        </a>
      </Heading>
      <p className="mt-3 line-clamp-3 text-[15px] leading-[1.6] text-white/50">{c.excerpt}</p>
      <div className="mt-auto flex items-center justify-between pt-8 text-[13px] text-white/55">
        <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
        <span className="inline-flex items-center gap-1 text-white/55 transition-colors group-hover/card:text-[#C6FF00]">
          {t.read}
          <ArrowUpRight size={10} className="transition-transform duration-200 group-hover/card:-translate-y-px group-hover/card:translate-x-px" />
        </span>
      </div>
    </article>
  );
}
