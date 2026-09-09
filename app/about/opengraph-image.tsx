import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../lib/ogImage";

export const alt = "About Nuba Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: "We turn ideas into",
    accent: "digital products",
    subtitle:
      "A small, senior team from Córdoba, Argentina. Three disciplines, one process, nothing handed off.",
    footer: "About the studio",
  });
}
