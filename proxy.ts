import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url, { request: withLang(request, "en") });
}

export const config = {
  // Sin /api, sin lo interno de Next y sin archivos (iconos, imágenes, robots, sitemap, llms…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
