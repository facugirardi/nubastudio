import { SITE_HOST, SITE_URL } from "./seo";

/** La clave es pública: IndexNow la valida leyendo public/<clave>.txt en el mismo host. */
export const INDEXNOW_KEY = "7c317796690faa0fcc7990b12cee00c8";

const ENDPOINT = "https://api.indexnow.org/IndexNow";
const MAX_URLS = 10000;

/**
 * Avisa a Bing (y a los buscadores que usan IndexNow) de URLs nuevas o cambiadas.
 * Solo en producción: en preview y local no se envía nada para no notificar URLs falsas.
 */
export async function submitToIndexNow(urls: string[]): Promise<{ sent: number; status?: number }> {
  const list = [...new Set(urls)].filter((u) => u.startsWith(SITE_URL)).slice(0, MAX_URLS);
  if (list.length === 0 || process.env.VERCEL_ENV !== "production") return { sent: 0 };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: list,
    }),
  });
  return { sent: list.length, status: res.status };
}
