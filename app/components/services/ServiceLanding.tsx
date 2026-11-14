import Image from "next/image";
import { getPost, isPublished, postPath } from "../../data/blog";
import { services, servicePath, type Service } from "../../data/services";
import { getWork } from "../../data/works";
import { localePath, type Lang } from "../../lib/lang";
import { localizeWork } from "../../lib/localizeWork";
import { getUiText } from "../../lib/uiText";
import { Inline, parseBody } from "../blog/PostBody";
import HomeCta from "../home/HomeCta";
import { ArrowRight, ArrowUpRight } from "../icons";
import Reveal from "./Reveal";
import ServiceFigure from "./ServiceFigure";

type Block = ReturnType<typeof parseBody>[number];

const label = "font-mono text-[11px] uppercase tracking-[0.08em]";
const frame = "mx-auto max-w-[1400px] border-x border-white/[0.07]";
const pad = "px-5 sm:px-8 lg:px-10";

const num = (n: number) => String(n).padStart(2, "0");

/** El cuerpo en markdown, partido en la intro y una sección por cada "## ". */
function sections(body: string) {
  const intro: Block[] = [];
  const out: Section[] = [];
  for (const block of parseBody(body)) {
    if (block.type === "h2")
      out.push({ id: block.id, title: block.text, blocks: [] });
    else (out.at(-1)?.blocks ?? intro).push(block);
  }
  return { intro, sections: out };
}

type Section = { id: string; title: string; blocks: Block[] };

/** Las secciones de solo texto seguidas se agrupan en una grilla de tarjetas; las que tienen listas o pasos van solas. */
function groupSections(list: Section[]) {
  const groups: Section[][] = [];
  for (const section of list) {
    const simple = section.blocks.every(
      (b) => b.type === "p" || b.type === "quote",
    );
    const last = groups.at(-1);
    const lastSimple = last?.every((x) =>
      x.blocks.every((b) => b.type === "p" || b.type === "quote"),
    );
    if (simple && last && lastSimple) last.push(section);
    else groups.push([section]);
  }
  return groups;
}

/** "**Título.** resto" → { title, rest }: los ítems de lista se muestran como tarjetas o pasos. */
function splitLead(item: string) {
  const m = item.match(/^\*\*(.+?)\*\*[\s,.:;-]*(.*)$/);
  if (!m) return { title: null, rest: item };
  return { title: m[1].replace(/[.:]$/, ""), rest: m[2] };
}

function Blocks({ blocks, lang }: { blocks: Block[]; lang: Lang }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "p" || block.type === "quote") {
          return (
            <p
              key={i}
              data-reveal
              className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-white/55 first:mt-0 [&_a]:text-[#EDEDED] [&_a]:underline [&_a]:decoration-[#C6FF00]/50 [&_a]:underline-offset-[3px] hover:[&_a]:decoration-[#C6FF00] [&_strong]:font-medium [&_strong]:text-[#EDEDED]"
            >
              <Inline text={block.text} lang={lang} />
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={i}
              className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] first:mt-0 sm:grid-cols-2"
            >
              {block.items.map((item, j) => {
                const { title, rest } = splitLead(item);
                return (
                  <li
                    key={j}
                    data-reveal
                    className="bg-black p-6 [&_a]:text-[#EDEDED] [&_a]:underline [&_a]:decoration-[#C6FF00]/50 [&_a]:underline-offset-[3px] hover:[&_a]:decoration-[#C6FF00]"
                  >
                    <span
                      aria-hidden
                      className="mb-5 block h-1.5 w-1.5 rounded-full bg-[#C6FF00]"
                    />
                    {title && (
                      <p className="text-[17px] font-medium leading-[1.3] tracking-[-0.02em] text-[#EDEDED]">
                        <Inline text={title} lang={lang} />
                      </p>
                    )}
                    <p
                      className={`${title ? "mt-2" : ""} text-[15px] leading-[1.6] text-white/50`}
                    >
                      <Inline text={rest} lang={lang} />
                    </p>
                  </li>
                );
              })}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol
              key={i}
              className="mt-8 border-t border-white/[0.08] first:mt-0"
            >
              {block.items.map((item, j) => {
                const { title, rest } = splitLead(item);
                return (
                  <li
                    key={j}
                    data-reveal
                    className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-white/[0.08] py-6 [&_a]:text-[#EDEDED] [&_a]:underline [&_a]:decoration-[#C6FF00]/50 [&_a]:underline-offset-[3px]"
                  >
                    <span className="font-mono text-[12px] text-[#C6FF00]">
                      {num(j + 1)}
                    </span>
                    <div>
                      {title && (
                        <p className="text-[19px] font-medium tracking-[-0.025em] text-[#EDEDED]">
                          <Inline text={title} lang={lang} />
                        </p>
                      )}
                      <p
                        className={`${title ? "mt-1.5" : ""} max-w-[56ch] text-[15px] leading-[1.6] text-white/50`}
                      >
                        <Inline text={rest} lang={lang} />
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        }
        return null;
      })}
    </>
  );
}

export default function ServiceLanding({
  service,
  lang,
}: {
  service: Service;
  lang: Lang;
}) {
  const ui = getUiText(lang);
  const t = ui.serviceLanding;
  const c = service.content[lang];
  const body = sections(c.body);
  const [statement, ...introRest] = body.intro;
  const cases = service.cases.flatMap((slug) => {
    const work = getWork(slug);
    return work && !work.hidden ? [localizeWork(work, lang)] : [];
  });
  const reading = service.posts.flatMap((slug) => {
    const post = getPost(slug);
    return post && isPublished(post) ? [post] : [];
  });
  const others = services.filter((s) => s.id !== service.id);
  let index = 0;
  const next = () => num(++index);

  return (
    <div className="bg-black font-display text-[#EDEDED]">
      <Reveal className="relative">
        <div
          className={`${frame} grid gap-12 ${pad} pb-16 pt-32 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:pb-20 lg:pt-40`}
        >
          <div>
            <p data-reveal className={`${label} text-white/45`}>
              <a
                href={localePath(lang, "/services")}
                className="transition-colors hover:text-[#EDEDED]"
              >
                {t.label}
              </a>
              <span className="text-white/25"> / </span>
              {c.name}
            </p>
            <h1
              data-reveal
              className="mt-6 max-w-[16ch] text-[clamp(2.6rem,5.8vw,5.25rem)] font-[450] leading-[0.98] tracking-[-0.055em]"
            >
              {c.h1}
            </h1>
            <p
              data-reveal
              className="mt-8 max-w-[50ch] text-[17px] leading-[1.6] text-white/55 lg:text-[18px]"
            >
              {c.lead}
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <a
                href={localePath(lang, "/contact")}
                className="group/cta inline-flex h-12 items-center gap-2 rounded-full bg-[#C6FF00] px-6 text-[15px] font-medium text-black transition-colors hover:bg-[#d4ff40]"
              >
                {t.primaryCta}
                <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" />
              </a>
              <a
                href={localePath(lang, "/works")}
                className="inline-flex h-12 items-center rounded-full border border-white/[0.14] px-6 text-[15px] text-[#EDEDED] transition-colors hover:border-white/30 hover:bg-white/[0.04]"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505]"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-position:center] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent_80%)]"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,0,0.12),transparent_65%)]"
            />
            <div aria-hidden className="h-[58%] w-[72%] text-white/75">
              <ServiceFigure id={service.id} />
            </div>
            <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
              {service.stack.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/[0.1] bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.04em] text-white/55 backdrop-blur"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {statement && (
        <Reveal className="border-t border-white/[0.07]">
          <div
            className={`${frame} grid gap-10 ${pad} py-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20 lg:py-28`}
          >
            <p
              data-reveal
              className="max-w-[46ch] text-[clamp(1.25rem,1.9vw,1.65rem)] font-[450] leading-[1.35] tracking-[-0.025em] text-[#EDEDED]"
            >
              {statement.type === "p" ? (
                <Inline text={statement.text} lang={lang} />
              ) : null}
            </p>
            {introRest.length > 0 && (
              <div className="lg:self-end">
                <Blocks blocks={introRest} lang={lang} />
              </div>
            )}
          </div>
        </Reveal>
      )}

      <Reveal className="border-t border-white/[0.07]">
        <div className={frame}>
          <div className={`${pad} pb-12 pt-20 lg:pb-16 lg:pt-28`}>
            <p data-reveal className={`${label} text-white/45`}>
              <span className="text-white/25">[{next()}]</span>{" "}
              {t.includesLabel}
            </p>
            <h2
              data-reveal
              className="mt-5 max-w-[18ch] text-[clamp(2.25rem,4.2vw,3.75rem)] font-[450] leading-[1.02] tracking-[-0.05em]"
            >
              {t.includesHeading}
            </h2>
          </div>
          <ul className="grid gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {c.includes.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                className="group/inc relative bg-black p-6 transition-colors duration-300 hover:bg-white/[0.02] sm:p-8 lg:p-10"
              >
                <p className="font-mono text-[11px] text-white/30 transition-colors group-hover/inc:text-[#C6FF00]">
                  FIG 0.{i + 1}
                </p>
                <h3 className="mt-10 text-[20px] font-medium tracking-[-0.025em]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.55] text-white/50">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {groupSections(body.sections).map((group) =>
        group.length > 1 ? (
          <Reveal key={group[0].id} className="border-t border-white/[0.07]">
            <ul
              className={`${frame} grid gap-px bg-white/[0.07] md:grid-cols-2`}
            >
              {group.map((section) => (
                <li
                  key={section.id}
                  className="group/card relative bg-black px-5 py-14 transition-colors duration-300 hover:bg-white/[0.015] sm:px-8 lg:px-10 lg:py-16"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-8 top-10 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(198,255,0,0.1),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                  />
                  <p data-reveal className={`${label} text-white/25`}>
                    [{next()}]
                  </p>
                  <h2
                    id={section.id}
                    data-reveal
                    className="mt-8 max-w-[20ch] scroll-mt-28 text-[clamp(1.6rem,2.4vw,2.15rem)] font-[450] leading-[1.08] tracking-[-0.045em]"
                  >
                    {section.title}
                  </h2>
                  <div className="mt-6 [&_p]:text-[16px]">
                    <Blocks blocks={section.blocks} lang={lang} />
                  </div>
                </li>
              ))}
              {group.length % 2 === 1 && (
                <li aria-hidden className="hidden bg-black md:block" />
              )}
            </ul>
          </Reveal>
        ) : (
          group.map((section) => (
            <Reveal key={section.id} className="border-t border-white/[0.07]">
              <div
                className={`${frame} grid gap-10 ${pad} py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20 lg:py-28`}
              >
                <div>
                  <div>
                    <p data-reveal className={`${label} text-white/45`}>
                      <span className="text-white/25">[{next()}]</span>
                    </p>
                    <h2
                      id={section.id}
                      data-reveal
                      className="mt-5 max-w-[16ch] scroll-mt-28 text-[clamp(2rem,3.6vw,3.25rem)] font-[450] leading-[1.04] tracking-[-0.05em]"
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div>
                  <Blocks blocks={section.blocks} lang={lang} />
                </div>
              </div>
            </Reveal>
          ))
        ),
      )}

      {cases.length > 0 && (
        <Reveal className="border-t border-white/[0.07]">
          <div className={frame}>
            <div className={`${pad} pb-12 pt-20 lg:pb-16 lg:pt-28`}>
              <p data-reveal className={`${label} text-white/45`}>
                <span className="text-white/25">[{next()}]</span>{" "}
                {ui.services.relatedWork}
              </p>
              <h2
                data-reveal
                className="mt-5 max-w-[18ch] text-[clamp(2.25rem,4.2vw,3.75rem)] font-[450] leading-[1.02] tracking-[-0.05em]"
              >
                {t.relatedWork}
              </h2>
            </div>
            <div className="grid gap-px border-t border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
              {cases.map((work) => (
                <a
                  key={work.slug}
                  data-reveal
                  href={localePath(lang, `/cases/${work.slug}`)}
                  className="group/case block bg-black p-5 sm:p-8 lg:p-10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08]">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/case:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <div>
                      <p className="text-[24px] font-[450] tracking-[-0.04em]">
                        {work.title}
                      </p>
                      <p className="mt-1 text-[14px] text-white/50">
                        {work.seoTitle ?? work.subtitle}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.12] text-white/50 transition-colors group-hover/case:border-[#C6FF00] group-hover/case:bg-[#C6FF00] group-hover/case:text-black">
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <Reveal className="border-t border-white/[0.07]">
        <div
          className={`${frame} grid gap-10 ${pad} py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20 lg:py-28`}
        >
          <div>
            <p data-reveal className={`${label} text-white/45`}>
              <span className="text-white/25">[{next()}]</span>{" "}
              {ui.servicesPage.faqLabel}
            </p>
            <h2
              id="faq"
              data-reveal
              className="mt-5 max-w-[14ch] scroll-mt-28 text-[clamp(2rem,3.6vw,3.25rem)] font-[450] leading-[1.04] tracking-[-0.05em]"
            >
              {t.faq}
            </h2>
          </div>
          <div className="border-t border-white/[0.08]">
            {c.faq.map((item, i) => (
              <details
                key={item.question}
                data-reveal
                className="group/faq border-b border-white/[0.08]"
                open={i === 0}
              >
                <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[11px] text-white/30">
                    {num(i + 1)}
                  </span>
                  <span className="text-[clamp(1.1rem,1.6vw,1.35rem)] font-[450] tracking-[-0.03em] text-white/70 transition-colors group-open/faq:text-[#EDEDED] group-hover/faq:text-[#EDEDED]">
                    {item.question}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-[transform,background-color,color,border-color] duration-300 group-open/faq:rotate-45 group-open/faq:border-[#EDEDED] group-open/faq:bg-[#EDEDED] group-open/faq:text-black">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 2v8M2 6h8"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-7 pl-[3.5rem] pr-12 text-[16px] leading-[1.65] text-white/55">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="border-t border-white/[0.07]">
        <div className={`${frame} grid lg:grid-cols-2`}>
          <nav
            aria-labelledby="other-services"
            className={`${pad} py-16 lg:border-r lg:border-white/[0.07] lg:py-20`}
          >
            <div className="flex items-baseline justify-between gap-6">
              <h2
                id="other-services"
                data-reveal
                className={`${label} text-white/45`}
              >
                {t.otherServices}
              </h2>
              <a
                href={localePath(lang, "/services")}
                className="text-[14px] text-white/50 transition-colors hover:text-[#EDEDED]"
              >
                {t.allServices}
              </a>
            </div>
            <ul className="mt-6 border-t border-white/[0.08]">
              {others.map((s) => (
                <li
                  key={s.id}
                  data-reveal
                  className="border-b border-white/[0.08]"
                >
                  <a
                    href={localePath(lang, servicePath(s.id, lang))}
                    className="group/other flex items-center justify-between gap-6 py-5"
                  >
                    <span>
                      <span className="block text-[clamp(1.3rem,2.2vw,1.75rem)] font-[450] tracking-[-0.04em] text-white/75 transition-[color,transform] duration-300 group-hover/other:translate-x-1 group-hover/other:text-[#EDEDED]">
                        {ui.nav.servicesMenu.items[s.id].title}
                      </span>
                      <span className="mt-1 block text-[14px] text-white/40">
                        {ui.nav.servicesMenu.items[s.id].desc}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-white/40 transition-colors group-hover/other:text-[#C6FF00]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {reading.length > 0 && (
            <nav
              aria-labelledby="related-reading"
              className={`border-t border-white/[0.07] ${pad} py-16 lg:border-t-0 lg:py-20`}
            >
              <div className="flex items-baseline justify-between gap-6">
                <h2
                  id="related-reading"
                  data-reveal
                  className={`${label} text-white/45`}
                >
                  {t.relatedReading}
                </h2>
                <a
                  href={localePath(lang, "/blog")}
                  className="text-[14px] text-white/50 transition-colors hover:text-[#EDEDED]"
                >
                  Blog
                </a>
              </div>
              <ul className="mt-6 border-t border-white/[0.08]">
                {reading.map((post) => (
                  <li
                    key={post.slug}
                    data-reveal
                    className="border-b border-white/[0.08]"
                  >
                    <a
                      href={localePath(lang, postPath(post, lang))}
                      className="group/read flex items-center justify-between gap-6 py-5"
                    >
                      <span className="text-[16px] leading-[1.4] tracking-[-0.015em] text-white/65 transition-colors group-hover/read:text-[#EDEDED]">
                        {post.content[lang].title}
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="shrink-0 text-white/35 transition-colors group-hover/read:text-[#C6FF00]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Reveal>

      <HomeCta />
    </div>
  );
}
