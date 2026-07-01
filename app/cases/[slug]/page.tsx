"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import SmoothScroll from "../../components/SmoothScroll";
import CaseStudy from "../../components/CaseStudy";
import { getWork, getNextWork } from "../../data/works";

export default function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const work = getWork(slug);
  if (!work) notFound();

  return (
    <SmoothScroll>
      <CaseStudy work={work} next={getNextWork(slug)} />
    </SmoothScroll>
  );
}
