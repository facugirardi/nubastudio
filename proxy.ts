import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LANG_COOKIE, isLang } from "./app/lib/lang";

/**
 * El inglés es el idioma raíz y el español vive bajo /es. Las páginas están en
 * app/[lang]/…, así que acá se traduce la URL pública a la interna:
 *   /about      → se sirve app/[lang]/about con lang=en (la URL no cambia)
 *   /es/about   → pasa tal cual
 *   /en/about   → 308 a /about (una sola URL para el inglés: sin duplicados)
 */
/** El 404 global no recibe params: el idioma le llega en este header (ver app/global-not-found.tsx). */
const LANG_HEADER = "x-site-lang";

function withLang(request: NextRequest, lang: "en" | "es") {
  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, lang);
  return { headers };
}

/** Países donde se habla español: ahí la primera visita sin idioma elegido va a /es. */
const SPANISH_COUNTRIES = new Set([
  "AR", "UY", "CL", "PY", "BO", "PE", "EC", "CO", "VE", "MX", "ES",
  "GT", "HN", "SV", "NI", "CR", "PA", "CU", "DO", "PR", "GQ",
]);
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|whatsapp|telegram|linkedin|twitter|discord|lighthouse/i;

/** Español si el país (IP) o el idioma principal del navegador lo es; los bots siempre ven el inglés. */
function prefersSpanish(request: NextRequest) {
  if (BOT.test(request.headers.get("user-agent") ?? "")) return false;
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country && SPANISH_COUNTRIES.has(country)) return true;
  const primary = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase();
  return Boolean(primary?.startsWith("es"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === "es") return NextResponse.next({ request: withLang(request, "es") });

  if (first === "en") {
    // La imagen para compartir de las páginas en inglés vive en /en/…-image: se sirve tal cual.
    if (pathname.includes("/opengraph-image")) {
      return NextResponse.next({ request: withLang(request, "en") });
    }
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/en".length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Sin prefijo = inglés. En la primera visita, si no eligió idioma y todo indica español, lo mandamos a /es
  // (307, temporal: la URL en inglés sigue siendo la canónica). Elegir idioma en el selector guarda la cookie.
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  if (
    request.method === "GET" &&
    !isLang(saved) &&
    !pathname.includes("/opengraph-image") &&
    prefersSpanish(request)
  ) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
    const res = NextResponse.redirect(redirect, 307);
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url, { request: withLang(request, "en") });
}

export const config = {
  // Sin /api, sin lo interno de Next y sin archivos (iconos, imágenes, robots, sitemap, llms…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
