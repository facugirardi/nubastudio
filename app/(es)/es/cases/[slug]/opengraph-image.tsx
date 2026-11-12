import { caseStaticParams } from "../../../../lib/pages";
import { CASE_OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderCaseOgImage } from "../../../../lib/ogImage";

export const alt = CASE_OG_ALT.es;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return caseStaticParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCaseOgImage("es", slug);
}
