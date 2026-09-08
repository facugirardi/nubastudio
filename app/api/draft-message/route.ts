import { NextResponse } from "next/server";

const MODEL = "gemini-flash-lite-latest";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const MAX_INPUT = 2000;
const RATE_LIMIT = 8;
const RATE_WINDOW = 60_000;

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

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
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
