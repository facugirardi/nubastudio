/**
 * Reemplaza a next/dist/build/polyfills/polyfill-module (ver turbopack.resolveAlias en
 * next.config.ts). Next lo incluye siempre: trimStart/trimEnd, Symbol.description, flat/flatMap,
 * Promise.finally, Object.fromEntries, Array.at y Object.hasOwn. Todo eso existe de forma nativa
 * desde Chrome 93 / Safari 15.4 / Firefox 92, y los navegadores base de Next 16 son
 * Chrome 111 / Edge 111 / Firefox 111 / Safari 16.4 (los más viejos reciben polyfill-nomodule).
 *
 * URL.canParse sí falta en parte de ese rango (Chrome < 120, Safari < 17, Firefox < 115), así que
 * se conserva.
 */
if (!("canParse" in URL)) {
  (URL as unknown as { canParse: (url: string | URL, base?: string | URL) => boolean }).canParse = (url, base) => {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}

export {};
