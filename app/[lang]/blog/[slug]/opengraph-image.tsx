import { ImageResponse } from "next/og";
import { getPost, postSlug, posts } from "../../../data/blog";
import { LANGS, isLang } from "../../../lib/lang";
import { SITE_NAME } from "../../../lib/seo";
import { getUiText } from "../../../lib/uiText";

export const alt = `${SITE_NAME} Blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => posts.map((post) => ({ lang, slug: postSlug(post, lang) })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const lang = isLang(rawLang) ? rawLang : "en";
  const post = getPost(slug, lang);
  const title = post?.content[lang].title ?? SITE_NAME;
  const category = post ? getUiText(lang).blog.categories[post.category] : "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#C6FF00", display: "flex" }} />
          <div style={{ fontSize: 28, letterSpacing: "0.28em", textTransform: "uppercase" }}>{SITE_NAME}</div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.4)", marginLeft: "auto" }}>Blog</div>
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 70 : 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            display: "flex",
            maxWidth: 1020,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", color: "#C6FF00" }}>{category}</div>
          <div style={{ display: "flex" }}>nuba.studio</div>
        </div>
      </div>
    ),
    size
  );
}
