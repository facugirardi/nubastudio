// Envía a IndexNow todas las URLs del sitemap de producción: npm run indexnow
// Para URLs puntuales: npm run indexnow -- https://www.nuba.studio/works https://www.nuba.studio/es/works
const SITE = "https://www.nuba.studio";
const KEY = "7c317796690faa0fcc7990b12cee00c8";

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
urls = [...new Set(urls)].filter((u) => u.startsWith(SITE));

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});
console.log(`${urls.length} URLs enviadas → HTTP ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
