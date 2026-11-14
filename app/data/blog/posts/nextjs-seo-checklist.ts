import type { Post } from "../types";

const post: Post = {
  slug: "nextjs-seo-checklist",
  date: "2026-12-14",
  category: "tech",
  content: {
    en: {
      title: "Technical SEO checklist for Next.js sites",
      description:
        "A practical technical SEO checklist for Next.js: metadata, canonical URLs, hreflang for multilingual sites, sitemaps, structured data, Open Graph and performance.",
      excerpt:
        "The technical foundations that let search engines find, understand and rank a Next.js site, including multilingual setups. The same checklist we apply to our own site.",
      body: `
Good content is what ranks, but only if search engines can find it, read it and understand what it is about. That is the job of technical SEO. Next.js gives you good tools for it; you still have to use them. This is the checklist we apply to our projects and to this very site.

## 1. Content in the HTML

Make sure the important content is in the HTML the server sends, not loaded later by JavaScript. With the App Router, server components do this by default. Check it by viewing the page source: if your main text is not there, search engines may not see it either.

## 2. Unique titles and descriptions

Every page needs its own title and description, written for people searching, not for the brand.

- **Title:** under 60 characters, with the main search term toward the start.
- **Description:** 140 to 160 characters, explaining what the visitor will find.

In Next.js this is done with \`generateMetadata\` on each page. A good practice is to keep all SEO texts in one file per language, so they are easy to review and translate.

## 3. Canonical URLs

Every page should declare its canonical URL: the one version you want indexed. It avoids duplicates such as with and without "www", trailing slashes or URL parameters. Pick one domain (for example, always with "www") and redirect everything else to it.

## 4. Multilingual sites: hreflang done right

If your site has several languages, search engines need to know which page is the translation of which:

- Each language has its own URL (for example, "/about" and "/es/about").
- Each version declares a canonical pointing to itself, not to the English version.
- All versions list each other with hreflang, plus an "x-default".
- The language comes from the URL, so the server sends the HTML already translated. Do not detect the language in the browser and swap texts after loading.

Translate the SEO texts for how people search in each language, not word for word.

## 5. Sitemap and robots

- A \`sitemap.xml\` generated from your data (pages, products, cases, articles), with the alternate languages of each URL.
- A real last-modified date, not the build date: marking every URL as changed on every deploy is noise for crawlers.
- A \`robots.txt\` that points to the sitemap and blocks only what should be private.

In Next.js both can be generated with \`app/sitemap.ts\` and \`app/robots.ts\`.

## 6. Structured data (JSON-LD)

Structured data tells search engines what each page is: an organization, an article, a FAQ, a product, a breadcrumb. It can produce rich results and helps AI systems understand your business.

Basic set for a company site:

- **Organization** with name, logo, contact and profiles (sameAs).
- **WebSite** per language.
- **BreadcrumbList** on inner pages.
- **BlogPosting** on articles, **FAQPage** where there are real questions and answers.

Make sure the structured data matches what is visible on the page.

## 7. Images for sharing (Open Graph)

When someone shares a link on WhatsApp, LinkedIn or Slack, the preview comes from the Open Graph tags. Next.js can generate those images automatically with \`opengraph-image.tsx\`, so every page and article has its own image without designing them by hand.

## 8. Performance

Speed is part of the page experience that Google evaluates. Optimize images, avoid unnecessary scripts and render on the server. We go deeper in [Core Web Vitals for business](/blog/core-web-vitals-for-business).

## 9. Internal links

Search engines discover and value pages through links. Link related content: articles to the services and case studies that prove them, case studies to their services. Use real links with descriptive text, not "click here".

## 10. 404 pages and redirects

- A useful 404 page in the right language, with links back to the main sections.
- Permanent redirects (301 or 308) when a URL changes, so you do not lose what it had earned.

## 11. Search Console

Verify the site in Google Search Console, submit the sitemap and check the indexing and Core Web Vitals reports regularly. It is the only way to see your site as Google sees it.

## 12. Make it readable for AI

More and more people ask ChatGPT, Perplexity or Google's AI instead of searching. Clear content, structured data and an \`llms.txt\` file help those systems understand your business. We explain it in [how to prepare your site for AI search](/blog/optimize-website-for-ai-search).

## The checklist in one list

- Content in the server HTML.
- Unique title and description per page and per language.
- A canonical URL and a single domain.
- Hreflang with x-default on multilingual sites.
- Sitemap with real dates and robots.txt.
- JSON-LD: Organization, WebSite, BreadcrumbList, BlogPosting, FAQPage.
- Open Graph images.
- Good Core Web Vitals on mobile.
- Descriptive internal links.
- Translated 404 and permanent redirects.
- Search Console set up.

If you want us to review the technical SEO of your site, or build one that starts with all of this in place, [get in touch](/contact).
`,
      faq: [
        {
          question: "Is Next.js better for SEO than React alone?",
          answer:
            "Usually yes, because Next.js renders content on the server and includes tools for metadata, sitemaps and images. A React app rendered only in the browser can be indexed, but it is slower and less reliable for search.",
        },
        {
          question: "Should each language version have its own canonical?",
          answer:
            "Yes. Each translation should point its canonical to itself and list the other versions with hreflang. Pointing every language to the English canonical tells Google to ignore the translations.",
        },
        {
          question: "How long does it take to see SEO results?",
          answer:
            "Technical fixes can show up in weeks, once Google recrawls the site. Ranking for competitive terms with new content usually takes several months of consistent publishing.",
        },
      ],
    },
    es: {
      title: "Checklist de SEO técnico para sitios en Next.js",
      description:
        "Checklist práctica de SEO técnico para Next.js: metadata, canónicas, hreflang para sitios multi-idioma, sitemaps, datos estructurados, Open Graph y velocidad.",
      excerpt:
        "Las bases técnicas para que los buscadores encuentren, entiendan y posicionen un sitio en Next.js, incluidos los sitios en varios idiomas. La misma checklist que usamos en nuestro sitio.",
      body: `
Lo que posiciona es el buen contenido, pero solo si los buscadores lo pueden encontrar, leer y entender de qué se trata. Ese es el trabajo del SEO técnico. Next.js trae buenas herramientas para eso; igual hay que usarlas. Esta es la checklist que aplicamos en nuestros proyectos y en este mismo sitio.

## 1. El contenido en el HTML

Asegurate de que el contenido importante esté en el HTML que manda el servidor, no cargado después con JavaScript. Con el App Router, los componentes de servidor lo hacen por defecto. Verificalo mirando el código fuente de la página: si tu texto principal no está ahí, puede que los buscadores tampoco lo vean.

## 2. Títulos y descripciones únicos

Cada página necesita su propio título y su propia descripción, escritos para la gente que busca, no para la marca.

- **Título:** menos de 60 caracteres, con el término de búsqueda principal cerca del principio.
- **Descripción:** de 140 a 160 caracteres, explicando qué va a encontrar el visitante.

En Next.js se hace con \`generateMetadata\` en cada página. Una buena práctica es tener todos los textos de SEO en un archivo por idioma, así es fácil revisarlos y traducirlos.

## 3. URLs canónicas

Cada página debería declarar su URL canónica: la única versión que querés que se indexe. Evita duplicados como con y sin "www", barras al final o parámetros en la URL. Elegí un dominio (por ejemplo, siempre con "www") y redirigí todo lo demás a ese.

## 4. Sitios en varios idiomas: hreflang bien hecho

Si tu sitio tiene varios idiomas, los buscadores necesitan saber qué página es la traducción de cuál:

- Cada idioma tiene su propia URL (por ejemplo, "/about" y "/es/about").
- Cada versión declara una canónica que apunta a sí misma, no a la versión en inglés.
- Todas las versiones se listan entre sí con hreflang, más un "x-default".
- El idioma sale de la URL, así el servidor manda el HTML ya traducido. No detectes el idioma en el navegador para cambiar los textos después de cargar.

Traducí los textos de SEO según cómo busca la gente en cada idioma, no palabra por palabra.

## 5. Sitemap y robots

- Un \`sitemap.xml\` generado a partir de tus datos (páginas, productos, casos, artículos), con los idiomas alternativos de cada URL.
- Una fecha de última modificación real, no la del build: marcar todas las URLs como modificadas en cada deploy es ruido para los rastreadores.
- Un \`robots.txt\` que apunte al sitemap y bloquee solo lo que tiene que ser privado.

En Next.js los dos se pueden generar con \`app/sitemap.ts\` y \`app/robots.ts\`.

## 6. Datos estructurados (JSON-LD)

Los datos estructurados les dicen a los buscadores qué es cada página: una organización, un artículo, preguntas frecuentes, un producto, una miga de pan. Pueden generar resultados enriquecidos y ayudan a los sistemas de IA a entender tu negocio.

Lo básico para el sitio de una empresa:

- **Organization** con nombre, logo, contacto y perfiles (sameAs).
- **WebSite** por idioma.
- **BreadcrumbList** en las páginas internas.
- **BlogPosting** en los artículos y **FAQPage** donde haya preguntas y respuestas reales.

Asegurate de que los datos estructurados coincidan con lo que se ve en la página.

## 7. Imágenes para compartir (Open Graph)

Cuando alguien comparte un link en WhatsApp, LinkedIn o Slack, la vista previa sale de las etiquetas Open Graph. Next.js puede generar esas imágenes automáticamente con \`opengraph-image.tsx\`, así cada página y cada artículo tiene su propia imagen sin diseñarlas a mano.

## 8. Velocidad

La velocidad es parte de la experiencia de página que evalúa Google. Optimizá las imágenes, evitá scripts innecesarios y generá las páginas en el servidor. Lo profundizamos en [Core Web Vitals para negocios](/blog/core-web-vitals-for-business).

## 9. Links internos

Los buscadores descubren y valoran las páginas a través de los links. Enlazá el contenido relacionado: los artículos con los servicios y los casos que los prueban, los casos con sus servicios. Usá links reales con texto descriptivo, no "hacé clic acá".

## 10. Páginas 404 y redirecciones

- Una página 404 útil y en el idioma correcto, con links a las secciones principales.
- Redirecciones permanentes (301 o 308) cuando cambia una URL, para no perder lo que había ganado.

## 11. Search Console

Verificá el sitio en Google Search Console, enviá el sitemap y revisá seguido los informes de indexación y de Core Web Vitals. Es la única forma de ver tu sitio como lo ve Google.

## 12. Que lo pueda leer la IA

Cada vez más gente le pregunta a ChatGPT, Perplexity o la IA de Google en lugar de buscar. Un contenido claro, los datos estructurados y un archivo \`llms.txt\` ayudan a esos sistemas a entender tu negocio. Lo explicamos en [cómo preparar tu sitio para los buscadores con IA](/blog/optimize-website-for-ai-search).

## La checklist en una lista

- Contenido en el HTML del servidor.
- Título y descripción únicos por página y por idioma.
- Una URL canónica y un solo dominio.
- Hreflang con x-default en sitios multi-idioma.
- Sitemap con fechas reales y robots.txt.
- JSON-LD: Organization, WebSite, BreadcrumbList, BlogPosting, FAQPage.
- Imágenes Open Graph.
- Buenas Core Web Vitals en celular.
- Links internos descriptivos.
- 404 traducida y redirecciones permanentes.
- Search Console configurado.

Si querés que revisemos el SEO técnico de tu sitio, o construir uno que arranque con todo esto resuelto, [escribinos](/contact).
`,
      faq: [
        {
          question: "¿Next.js es mejor para el SEO que React solo?",
          answer:
            "Normalmente sí, porque Next.js genera el contenido en el servidor e incluye herramientas para metadata, sitemaps e imágenes. Una app en React que se arma solo en el navegador se puede indexar, pero es más lenta y menos confiable para los buscadores.",
        },
        {
          question: "¿Cada versión de idioma debería tener su propia canónica?",
          answer:
            "Sí. Cada traducción debería apuntar la canónica a sí misma y listar las otras versiones con hreflang. Apuntar todos los idiomas a la canónica en inglés le dice a Google que ignore las traducciones.",
        },
        {
          question: "¿Cuánto tarda en verse el resultado del SEO?",
          answer:
            "Los arreglos técnicos se pueden notar en semanas, cuando Google vuelve a rastrear el sitio. Posicionar términos competitivos con contenido nuevo suele llevar varios meses de publicación constante.",
        },
      ],
    },
  },
};

export default post;
