import { ImageResponse } from "next/og";
import { works, getWork } from "../../data/works";
import { SITE_NAME } from "../../lib/seo";

export const alt = `Case study by ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
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
          <div style={{ display: "flex" }}>nuba.studio</div>
        </div>
      </div>
    ),
    size
  );
}
