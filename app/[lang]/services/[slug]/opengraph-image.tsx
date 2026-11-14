import { getServiceBySlug, serviceSlug, SERVICE_IDS } from "../../../data/services";
import { LANGS, isLang } from "../../../lib/lang";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../../../lib/ogImage";
import { seoText } from "../../../lib/seoText";

export const alt = "Nuba Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => SERVICE_IDS.map((id) => ({ lang, slug: serviceSlug(id, lang) })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const lang = isLang(rawLang) ? rawLang : "en";
  const service = getServiceBySlug(slug, lang);
  if (!service) return renderOgImage(seoText[lang].og.services);
  const { og, name } = service.content[lang];
  return renderOgImage({ ...og, footer: name });
}
