import { OG_CONTENT_TYPE, OG_SIZE, pageOgAlt, renderPageOgImage } from "../../../lib/ogImage";

export const alt = pageOgAlt("es", "about");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOgImage("es", "about");
}
