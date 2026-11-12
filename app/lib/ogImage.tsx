import { ImageResponse } from "next/og";
import { getWork } from "../data/works";
import { localizeWork } from "./localizeWork";
import type { Lang } from "./locale";
import { PAGE_COPY } from "./pageCopy";
import { SITE_HOST, SITE_NAME } from "./seo";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage({
  title,
  accent,
  subtitle,
  footer,
}: {
  title: string;
  accent?: string;
  subtitle: string;
  footer: string;
}) {
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
          <div style={{ fontSize: 30, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
            {accent ? <span style={{ color: "#C6FF00", marginLeft: 22 }}>{accent}</span> : null}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", maxWidth: 960 }}>
            {subtitle}
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
          <div style={{ display: "flex" }}>{footer}</div>
          <div style={{ display: "flex" }}>{SITE_HOST}</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

type PageKey = keyof (typeof PAGE_COPY)["en"];

export function pageOgAlt(lang: Lang, page: PageKey) {
  return PAGE_COPY[lang][page].og.alt;
}

export function renderPageOgImage(lang: Lang, page: PageKey) {
  const { title, accent, subtitle, footer } = PAGE_COPY[lang][page].og;
  return renderOgImage({ title, accent, subtitle, footer });
}

export const CASE_OG_ALT: Record<Lang, string> = {
  en: `Case study by ${SITE_NAME}`,
  es: `Caso de estudio de ${SITE_NAME}`,
};

export function renderCaseOgImage(lang: Lang, slug: string) {
  const raw = getWork(slug);
  const work = raw ? localizeWork(raw, lang) : undefined;
  const title = work?.title ?? SITE_NAME;
  const subtitle = work?.seoTitle ?? work?.subtitle ?? "";
  const tech = (work?.technologies ?? []).slice(0, 5).join(" · ");

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
          <div style={{ fontSize: 28, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            {SITE_NAME}
          </div>
          {work?.year ? (
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.4)", marginLeft: "auto" }}>
              {work.year}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              display: "flex",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 40, color: "#C6FF00", display: "flex" }}>{subtitle}</div>
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
          <div style={{ display: "flex" }}>{tech}</div>
          <div style={{ display: "flex" }}>{SITE_HOST}</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
