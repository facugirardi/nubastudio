import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "./lib/seo";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            We turn ideas into
            <span style={{ color: "#C6FF00", marginLeft: 22 }}>digital products</span>
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", maxWidth: 900 }}>
            {SITE_DESCRIPTION}
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
          <div style={{ display: "flex" }}>Web · Apps · Marketplaces</div>
          <div style={{ display: "flex" }}>nuba.studio</div>
        </div>
      </div>
    ),
    size
  );
}
