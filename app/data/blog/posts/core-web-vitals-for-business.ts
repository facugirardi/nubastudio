import type { Post } from "../types";

const post: Post = {
  slug: "core-web-vitals-for-business",
  date: "2026-11-25",
  category: "tech",
  cases: ["provia-consulting"],
  content: {
    en: {
      title: "Core Web Vitals: why a slow website costs you sales",
      description:
        "What Core Web Vitals are, explained for business owners: how Google measures your site's speed, why it affects sales and the fixes that usually matter most.",
      excerpt:
        "Google measures how fast your site feels, and so do your visitors. The three metrics that matter, what they mean for your business and the most common fixes.",
      body: `
A slow website does not show up as an error. It shows up as visitors who leave before the page loads, forms that nobody fills in and campaigns that cost more than they should. Google measures that experience with a set of metrics called Core Web Vitals, and uses them as one of the signals to rank pages.

## The three metrics, without jargon

| Metric | What it measures | Good value |
|---|---|---|
| LCP (Largest Contentful Paint) | How long it takes for the main content to appear | Under 2.5 seconds |
| INP (Interaction to Next Paint) | How fast the page responds when you tap or click | Under 200 milliseconds |
| CLS (Cumulative Layout Shift) | How much things jump around while the page loads | Under 0.1 |

In plain words: does it appear fast, does it respond fast, and does it stay still.

## Why it matters for the business

- **Visitors leave.** On mobile, every extra second of loading increases the share of people who give up before seeing anything.
- **Ads get more expensive.** If you pay for clicks and the landing page is slow, you pay for visitors who never see your offer.
- **Search ranking.** Core Web Vitals are part of how Google evaluates the page experience. They do not beat good content, but between two similar pages, the faster one has an advantage.
- **Trust.** A page that jumps while you try to tap a button feels broken, even if it is not.

## How to measure your site

- **PageSpeed Insights** (pagespeed.web.dev): enter your URL and you will see real data from Chrome users, if your site has enough traffic, plus a lab test.
- **Google Search Console:** the Core Web Vitals report groups your pages into good, needs improvement and poor.

Look at the mobile results first. That is where most visitors are, and where problems show up.

## The most common causes, and their fixes

### Huge images

The most frequent problem. Photos uploaded straight from a camera or a stock site, several megabytes each. Fix: modern formats like WebP or AVIF, sizes adapted to each screen, and lazy loading of images that are not visible yet.

### Too many scripts

Chat widgets, several analytics tools, pixels from every ad network, heatmaps. Each one adds weight and competes for the phone's processor. Fix: review what is really used and load the rest later.

### Fonts and elements that move the layout

Images without defined dimensions, banners that appear on top and fonts that change size when they load cause the jumps that CLS measures. Fix: reserve the space of each element before it loads.

### Pages built in the browser

Some sites send an almost empty page and build everything with JavaScript on the visitor's phone. On a mid-range phone with a weak connection, that takes a long time. Fix: render the content on the server or ahead of time, as frameworks like [Next.js](/blog/why-we-build-with-nextjs) or Astro do.

### Slow hosting

A cheap shared server far from your visitors adds delay to everything. A CDN (a network of servers that delivers the site from the location closest to each visitor) usually solves it.

## Fast by design

It is much cheaper to build a fast site than to fix a slow one. For [Provia Consulting](/cases/provia-consulting), a [consulting firm website](/blog/websites-for-consulting-and-financial-firms), we chose Astro so the site ships as static HTML: it loads immediately and costs almost nothing to keep online. On every project, we treat performance as part of the design, not as a final adjustment.

## A quick checklist

- Images in WebP or AVIF, with defined sizes.
- Only the scripts you really use.
- Fonts optimized, with a fallback that does not move the layout.
- Content rendered on the server or pre-generated.
- A CDN in front of the site.
- Mobile results checked in PageSpeed Insights after every major change.

If your site is slow and you do not know where to start, [we can review it](/contact). Speed is also one of the foundations of our [SEO checklist](/blog/nextjs-seo-checklist).
`,
      faq: [
        {
          question: "Do Core Web Vitals affect Google rankings?",
          answer:
            "Yes, as part of the page experience signals. Relevant content still matters more, but between similar pages, a better experience can make the difference.",
        },
        {
          question: "Why is my site fast on my computer but slow on PageSpeed?",
          answer:
            "PageSpeed measures a mid-range phone on a mobile connection, which is how many of your visitors arrive. A fast office computer on fiber hides most problems.",
        },
        {
          question: "What is the quickest win to improve speed?",
          answer:
            "In most sites, optimizing images: converting them to WebP or AVIF, serving the right size for each screen and lazy loading the ones below the fold.",
        },
      ],
    },
    es: {
      title: "Core Web Vitals: por qué una web lenta te hace perder ventas",
      seoTitle: "Core Web Vitals: por qué una web lenta vende menos",
      description:
        "Qué son las Core Web Vitals, explicado para dueños de negocios: cómo mide Google la velocidad de tu sitio, por qué afecta las ventas y los arreglos que más importan.",
      excerpt:
        "Google mide qué tan rápido se siente tu sitio, y tus visitantes también. Las tres métricas que importan, qué significan para tu negocio y los arreglos más comunes.",
      body: `
Un sitio lento no aparece como un error. Aparece como visitantes que se van antes de que cargue la página, formularios que nadie completa y campañas que cuestan más de lo que deberían. Google mide esa experiencia con un conjunto de métricas llamado Core Web Vitals, y las usa como una de las señales para posicionar las páginas.

## Las tres métricas, sin jerga

| Métrica | Qué mide | Valor bueno |
|---|---|---|
| LCP (Largest Contentful Paint) | Cuánto tarda en aparecer el contenido principal | Menos de 2,5 segundos |
| INP (Interaction to Next Paint) | Qué tan rápido responde la página cuando tocás o hacés clic | Menos de 200 milisegundos |
| CLS (Cumulative Layout Shift) | Cuánto se mueven las cosas mientras carga la página | Menos de 0,1 |

En criollo: ¿aparece rápido, responde rápido y se queda quieta?

## Por qué le importa a tu negocio

- **Los visitantes se van.** En el celular, cada segundo extra de carga aumenta la cantidad de gente que abandona antes de ver algo.
- **Los anuncios salen más caros.** Si pagás por clic y la página de destino es lenta, pagás por visitantes que nunca ven tu oferta.
- **Posicionamiento en buscadores.** Las Core Web Vitals son parte de cómo Google evalúa la experiencia de una página. No le ganan al buen contenido, pero entre dos páginas parecidas, la más rápida tiene ventaja.
- **Confianza.** Una página que salta mientras intentás tocar un botón se siente rota, aunque no lo esté.

## Cómo medir tu sitio

- **PageSpeed Insights** (pagespeed.web.dev): ingresás tu URL y ves datos reales de usuarios de Chrome, si tu sitio tiene suficiente tráfico, más una prueba de laboratorio.
- **Google Search Console:** el informe de Core Web Vitals agrupa tus páginas en buenas, a mejorar y malas.

Mirá primero los resultados en celular. Ahí está la mayoría de los visitantes y ahí aparecen los problemas.

## Las causas más comunes y cómo se arreglan

### Imágenes enormes

El problema más frecuente. Fotos subidas directo desde una cámara o un banco de imágenes, de varios megas cada una. Solución: formatos modernos como WebP o AVIF, tamaños adaptados a cada pantalla y carga diferida de las imágenes que todavía no se ven.

### Demasiados scripts

Widgets de chat, varias herramientas de analítica, píxeles de cada red de anuncios, mapas de calor. Cada uno suma peso y compite por el procesador del celular. Solución: revisar qué se usa de verdad y cargar el resto después.

### Tipografías y elementos que mueven el diseño

Imágenes sin dimensiones definidas, banners que aparecen arriba y tipografías que cambian de tamaño al cargar provocan los saltos que mide el CLS. Solución: reservar el espacio de cada elemento antes de que cargue.

### Páginas armadas en el navegador

Algunos sitios mandan una página casi vacía y arman todo con JavaScript en el celular del visitante. En un celular de gama media con una conexión débil, eso tarda mucho. Solución: generar el contenido en el servidor o por adelantado, como hacen frameworks como [Next.js](/blog/why-we-build-with-nextjs) o Astro.

### Hosting lento

Un servidor compartido barato y lejos de tus visitantes le suma demora a todo. Una CDN (una red de servidores que entrega el sitio desde el punto más cercano a cada visitante) suele resolverlo.

## Rápido desde el diseño

Es mucho más barato construir un sitio rápido que arreglar uno lento. Para [Provia Consulting](/cases/provia-consulting), el [sitio de una consultora](/blog/websites-for-consulting-and-financial-firms), elegimos Astro para que el sitio se publique como HTML estático: carga al instante y cuesta casi nada mantenerlo online. En cada proyecto tratamos el rendimiento como parte del diseño, no como un ajuste final.

## Una checklist rápida

- Imágenes en WebP o AVIF, con tamaños definidos.
- Solo los scripts que de verdad usás.
- Tipografías optimizadas, con una alternativa que no mueva el diseño.
- Contenido generado en el servidor o por adelantado.
- Una CDN delante del sitio.
- Resultados en celular revisados en PageSpeed Insights después de cada cambio importante.

Si tu sitio es lento y no sabés por dónde empezar, [lo revisamos](/contact). La velocidad también es una de las bases de nuestra [checklist de SEO](/blog/nextjs-seo-checklist).
`,
      faq: [
        {
          question: "¿Las Core Web Vitals afectan el posicionamiento en Google?",
          answer:
            "Sí, como parte de las señales de experiencia de la página. El contenido relevante sigue pesando más, pero entre páginas parecidas una mejor experiencia puede hacer la diferencia.",
        },
        {
          question: "¿Por qué mi sitio anda rápido en mi computadora pero sale lento en PageSpeed?",
          answer:
            "PageSpeed mide un celular de gama media con conexión móvil, que es como llegan muchos de tus visitantes. Una computadora rápida con fibra óptica esconde la mayoría de los problemas.",
        },
        {
          question: "¿Qué es lo más rápido para mejorar la velocidad?",
          answer:
            "En la mayoría de los sitios, optimizar las imágenes: convertirlas a WebP o AVIF, servir el tamaño correcto para cada pantalla y diferir la carga de las que están más abajo.",
        },
      ],
    },
  },
};

export default post;
