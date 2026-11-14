import type { ReactNode } from "react";
import { getPost, isPublished, postPath } from "../../data/blog";
import { localePath, type Lang } from "../../lib/lang";

type Block =
  | { type: "h2" | "h3"; text: string; id: string }
  | { type: "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of body.trim().split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    const first = lines[0];
    if (first.startsWith("### ")) {
      const text = first.slice(4);
      blocks.push({ type: "h3", text, id: headingId(text) });
    } else if (first.startsWith("## ")) {
      const text = first.slice(3);
      blocks.push({ type: "h2", text, id: headingId(text) });
    } else if (first.startsWith("- ")) {
      blocks.push({ type: "ul", items: lines.map((l) => l.replace(/^- /, "")) });
    } else if (/^\d+\. /.test(first)) {
      blocks.push({ type: "ol", items: lines.map((l) => l.replace(/^\d+\. /, "")) });
    } else if (first.startsWith("> ")) {
      blocks.push({ type: "quote", text: lines.map((l) => l.replace(/^> ?/, "")).join(" ") });
    } else if (first.startsWith("|")) {
      const [head, , ...rows] = lines;
      blocks.push({ type: "table", head: cells(head), rows: rows.map(cells) });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

export function tableOfContents(body: string) {
  return parseBody(body).flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
}

/**
 * Los links del cuerpo se escriben sin idioma y con el slug en inglés: acá se
 * pasan al idioma de la página. Un link a un artículo todavía programado sale
 * como texto (null) hasta el día en que se publica.
 */
function internalHref(href: string, lang: Lang): string | null {
  const match = href.match(/^\/blog\/([^/?#]+)(.*)$/);
  if (!match) return localePath(lang, href);
  const post = getPost(match[1]);
  if (!post) return localePath(lang, href);
  return isPublished(post) ? localePath(lang, `${postPath(post, lang)}${match[2]}`) : null;
}

function inline(text: string, lang: Lang): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = m.index;
    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className="font-medium text-[#EDEDED]">
          {inline(m[1], lang)}
        </strong>
      );
    } else if (m[2] !== undefined) {
      out.push(
        <code key={key} className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.86em] text-[#EDEDED]">
          {m[2]}
        </code>
      );
    } else {
      const external = /^https?:\/\//.test(m[4]);
      const target = internalHref(m[4], lang);
      if (target === null) {
        out.push(m[3]);
        last = re.lastIndex;
        continue;
      }
      const href = external ? m[4] : target;
      out.push(
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[#EDEDED] underline decoration-[#C6FF00]/50 underline-offset-[3px] transition-colors hover:decoration-[#C6FF00]"
        >
          {m[3]}
        </a>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function PostBody({ body, lang }: { body: string; lang: Lang }) {
  return (
    <div className="text-[17px] leading-[1.75] text-white/65">
      {parseBody(body).map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-16 scroll-mt-28 text-[clamp(1.6rem,2.6vw,2.1rem)] font-[450] leading-[1.15] tracking-[-0.04em] text-[#EDEDED] first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={block.id} className="mt-10 scroll-mt-28 text-[20px] font-medium tracking-[-0.025em] text-[#EDEDED]">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-5">
                {inline(block.text, lang)}
              </p>
            );
          case "quote":
            return (
              <aside key={i} className="mt-8 border-l-2 border-[#C6FF00] bg-white/[0.03] py-4 pl-5 pr-4 text-white/80">
                {inline(block.text, lang)}
              </aside>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List
                key={i}
                className={`mt-5 space-y-2.5 pl-5 marker:text-white/35 ${block.type === "ul" ? "list-disc" : "list-decimal marker:font-mono marker:text-[0.85em]"}`}
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1.5">
                    {inline(item, lang)}
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={i} className="mt-8 overflow-x-auto rounded-xl border border-white/[0.09]">
                <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-[1.5]">
                  <thead>
                    <tr className="bg-white/[0.04]">
                      {block.head.map((h, j) => (
                        <th key={j} className="px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-white/45">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-t border-white/[0.07]">
                        {row.map((cell, k) => (
                          <td key={k} className={`px-4 py-3 align-top ${k === 0 ? "text-[#EDEDED]" : ""}`}>
                            {inline(cell, lang)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
