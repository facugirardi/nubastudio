import { buildLlms } from "../../lib/llms";

export const dynamic = "force-static";

export function GET() {
  return buildLlms("es");
}
