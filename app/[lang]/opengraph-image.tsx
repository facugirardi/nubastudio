import { ImageResponse } from "next/og";
import { LANGS, isLang } from "../lib/lang";
import { SITE_HOST, SITE_NAME, SITE_TAGLINE } from "../lib/seo";
import { seoText } from "../lib/seoText";

export const alt = `${SITE_NAME} - ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const text = seoText[isLang(raw) ? raw : "en"];
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
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#C6FF00",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {text.og.home.title}
            <span style={{ color: "#C6FF00", marginLeft: 22 }}>{text.og.home.accent}</span>
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", maxWidth: 900 }}>
            {text.siteDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "rgba(255,255,255,0.45)",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>{text.og.home.footer}</div>
          <div style={{ display: "flex" }}>{SITE_HOST}</div>
        </div>
      </div>
    ),
    size
  );
}
