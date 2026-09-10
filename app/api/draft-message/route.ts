import { NextResponse } from "next/server";

const MODEL = "gemini-flash-lite-latest";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const MAX_INPUT = 2000;
const RATE_WINDOW = 60_000;
const RATE_LIMIT = 8;
const GLOBAL_LIMIT = 60;
const MAX_TRACKED = 2000;

const SYSTEM_PROMPT = `You help visitors of Nuba Studio (a digital product agency that builds websites, apps and marketplaces) turn rough notes into a clear first message to send on WhatsApp.

Rewrite the user's notes as a short message written in FIRST PERSON, as if the visitor is writing to Nuba. Rules:
- Reply with ONLY the message text. No quotes, no preamble, no explanations, no markdown.
- Write in the SAME language the user wrote in.
- Start with a brief greeting: "Hola Nuba" (or the natural equivalent in the user's language).
- Never use emojis, emoticons or decorative symbols. Plain text only.
- Keep it between 2 and 5 sentences. Be concrete about what they need or want.
- Preserve any detail they gave (budget, timeline, type of project, links, company).
- Natural, human tone. No corporate filler. Do not invent details that were not provided.`;

const EMOJI = new RegExp(
  "[\\p{Extended_Pictographic}\\u{1F1E6}-\\u{1F1FF}\\u{1F3FB}-\\u{1F3FF}\\uFE0F\\u200D]",
  "gu"
);

const hits = new Map<string, number[]>();
let globalHits: number[] = [];

const fresh = (times: number[], now: number) => times.filter((t) => now - t < RATE_WINDOW);

function sweep(now: number) {
  for (const [key, times] of hits) {
    const recent = fresh(times, now);
    if (recent.length) hits.set(key, recent);
    else hits.delete(key);
  }
}

function rateLimited(client: string) {
  const now = Date.now();

  // Techo global: es el unico limite que no se puede eludir rotando cabeceras,
  // y el que de verdad protege la cuota de Gemini y el pool de conexiones.
  globalHits = fresh(globalHits, now);
  if (globalHits.length >= GLOBAL_LIMIT) return true;
  globalHits.push(now);

  // Sin esto el Map crece sin techo: una cabecera distinta por request
  // deja una entrada que nunca se borraba.
  if (hits.size >= MAX_TRACKED) sweep(now);
  if (hits.size >= MAX_TRACKED) return true;

  const recent = fresh(hits.get(client) ?? [], now);
  hits.set(client, recent);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  return false;
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 });
  }

  // x-real-ip lo pone la plataforma; x-forwarded-for lo puede falsificar el
  // cliente, asi que solo sirve de reparto aproximado, no de barrera.
  const client =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (rateLimited(client)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let text = "";
  try {
    const body = await req.json();
    text = typeof body?.text === "string" ? body.text.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!text) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }
  if (text.length > MAX_INPUT) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const payload = JSON.stringify({
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ parts: [{ text }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
  });

  const ATTEMPT_TIMEOUT = 11_000;

  try {
    let res: Response | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), ATTEMPT_TIMEOUT);
      try {
        res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": key },
          body: payload,
          signal: ac.signal,
        });
      } catch {
        res = null;
      } finally {
        clearTimeout(timer);
      }
      if (res?.ok) break;
      if (res && res.status !== 429 && res.status < 500) break;
      if (attempt === 0) await new Promise((r) => setTimeout(r, 800));
    }

    if (!res || !res.ok) {
      return NextResponse.json({ error: "AI request failed" }, { status: 502 });
    }

    const data = await res.json();
    const raw: string | undefined = data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();

    const message = raw
      ?.replace(/^["'“”]+|["'“”]+$/g, "")
      .replace(EMOJI, "")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/[ \t]+([,.;:!?])/g, "$1")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!message) {
      return NextResponse.json({ error: "No output" }, { status: 502 });
    }

    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "AI unreachable" }, { status: 502 });
  }
}
