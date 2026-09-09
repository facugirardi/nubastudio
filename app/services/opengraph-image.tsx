import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../lib/ogImage";

export const alt = "Services — Nuba Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: "We design and build",
    accent: "digital products",
    subtitle:
      "Web development · Mobile apps · Marketplaces & platforms · Branding · Product strategy and MVP.",
    footer: "Services",
  });
}
