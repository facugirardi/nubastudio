"use client";

import { FIGS } from "../home/HomeServices";
import type { ServiceId } from "../../data/services/slugs";

const FIG_INDEX: Record<ServiceId, number> = { web: 0, mobile: 1, marketplaces: 2, mvp: 4 };

export default function ServiceFigure({ id }: { id: ServiceId }) {
  const Fig = FIGS[FIG_INDEX[id]];
  return <Fig />;
}
