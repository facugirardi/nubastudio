import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../lib/ogImage";

export const alt = "Contact Nuba Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: "Let's build",
    accent: "something real",
    subtitle:
      "Tell us about your project. We build websites, apps and marketplaces from Córdoba, Argentina.",
    footer: "Contact",
  });
}
