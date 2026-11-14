import { buildLlmsFull } from "../lib/llms";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return buildLlmsFull("en");
}
