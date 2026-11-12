import type { Metadata } from "next";
import { CasePage, caseMetadata, caseStaticParams } from "../../../lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStaticParams();
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return caseMetadata("en", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CasePage lang="en" slug={slug} />;
}
