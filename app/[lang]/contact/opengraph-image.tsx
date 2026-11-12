import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../../lib/ogImage";
import { LANGS, isLang } from "../../lib/lang";
import { seoText } from "../../lib/seoText";

export const alt = "Nuba Studio";
export const size = OG_SIZE;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return renderOgImage(seoText[isLang(lang) ? lang : "en"].og.contact);
}
