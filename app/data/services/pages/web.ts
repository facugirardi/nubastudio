import type { Service } from "../types";

const service: Service = {
  id: "web",
  stack: ["Next.js", "React", "TypeScript", "Astro", "Headless CMS", "Vercel"],
  cases: ["mes", "provia-consulting", "bausing", "kennedys"],
  posts: [
    "why-we-build-with-nextjs",
    "core-web-vitals-for-business",
    "nextjs-seo-checklist",
    "optimize-website-for-ai-search",
    "websites-for-consulting-and-financial-firms",
  ],
  content: {
    en: {
      name: "Web Development",
      h1: "Custom web development that loads fast and wins clients.",
      seoTitle: "Custom Web Development Company | Next.js",
      description:
        "Custom websites and web platforms built with Next.js: fast, ready for Google and AI search from day one, and designed to turn visitors into clients.",
      lead:
        "Institutional sites, e-commerce and web platforms designed and coded by the same team. No templates, no page builders: a site built around your business that loads in a blink and is easy to find.",
      includes: [
        { title: "Corporate & institutional sites", desc: "Sites that make a firm read as the specialist it is, with a CMS your team can edit." },
        { title: "E-commerce", desc: "Online stores with catalog, checkout, payments and the integrations behind them." },
        { title: "Web platforms & dashboards", desc: "Accounts, roles, backoffices and internal tools that run the operation." },
        { title: "SEO & AI search", desc: "Structured data, clean URLs, multilingual setup and pages that answer real questions." },
        { title: "Performance", desc: "Core Web Vitals in the green: images, fonts and code tuned for every device." },
        { title: "Maintenance", desc: "Updates, monitoring and new features after launch, for as long as you need." },
      ],
      body: `
A website is often the first conversation a client has with your company, and most of the time it happens without you in the room. If the page is slow, confusing or hard to find, that conversation ends before it starts. Our web development work is about making that first conversation go well: a site that loads fast, explains what you do in seconds and makes the next step obvious.

We are a web development company in Argentina, based in Córdoba, and we build websites and web platforms for companies across Argentina and abroad. Design and code happen at the same table, so what you approve in the design is what goes live.

## What we build

- **Corporate and institutional websites.** Consulting firms, financial companies and professional services that need to look as solid online as they are in person. [Més Capital](/cases/mes) and [Provia Consulting](/cases/provia-consulting) are two examples.
- **E-commerce.** Stores where the catalog, the checkout and the payment flow are designed together. In [Bausing](/cases/bausing) the store and a digital wallet share one account.
- **Web platforms.** Products with logins, roles, dashboards and backoffices. For [Kennedy's Group](/cases/kennedys) we run the public property site, the booking API and the backoffice the whole operation uses.
- **Landing pages and microsites** for launches, campaigns and new product lines.

## Why custom instead of a template

Templates and page builders are a good fit when the site is a business card and nothing more. They stop being one when you need the site to rank, to integrate with your systems, to load fast on a mid-range phone or to grow into a product. A custom site has only the code it needs, so it is faster, easier to maintain and does exactly what your business requires. We compare both paths in detail in [custom software vs SaaS](/blog/custom-software-vs-saas).

## Built with Next.js

Most of our sites run on Next.js and React with TypeScript, deployed on Vercel. It gives us server rendering for SEO, very fast page loads and a clear path from a marketing site to a full platform without starting over. We explain the reasoning in [why we build with Next.js](/blog/why-we-build-with-nextjs). When a site is mostly static, like Provia Consulting, we sometimes choose Astro instead: the right tool depends on the project, not on habit.

Content lives in a headless CMS when your team needs to edit pages, publish news or manage products without calling a developer.

## Ready for Google and AI search from day one

SEO is not something we add at the end. Every site ships with clean URLs, correct titles and descriptions, a sitemap, structured data (JSON-LD), Open Graph images for sharing and, when needed, separate URLs per language with hreflang. We also prepare the site for AI search engines like ChatGPT, Perplexity and Google AI Overviews, which read content differently from classic search. Our [Next.js SEO checklist](/blog/nextjs-seo-checklist) and the guide on [optimizing a website for AI search](/blog/optimize-website-for-ai-search) cover what that involves.

Speed is part of SEO too. We aim for green [Core Web Vitals](/blog/core-web-vitals-for-business) on real devices, not only on a developer's laptop.

## How a web project runs

1. **Discovery.** We understand your business, your clients and what the site has to achieve: leads, sales, bookings or credibility.
2. **Structure and content.** We define the pages, the message of each one and what visitors need to find.
3. **Design.** From wireframes to the final interface, reviewed with you as it evolves.
4. **Development.** We build, connect the CMS and integrations, and test on real devices.
5. **Launch and follow-up.** We publish, set up analytics and Search Console, and keep improving after go-live.

## Who it is for

Companies that need a site that sells, not just one that exists: firms whose clients check them online before calling, brands that sell directly, and teams whose website is turning into a product. If you are not sure whether you need a website, a platform or an app, [tell us about the project](/contact) and we will help you scope it.
`,
      faq: [
        {
          question: "How long does it take to build a website?",
          answer:
            "It depends on the scope. A focused institutional site sits at the short end of our usual range and can take a few weeks; a platform with accounts, payments or a backoffice takes longer, often two to four months. We give you a real timeline once we understand what the site has to do.",
        },
        {
          question: "Will I be able to edit the content myself?",
          answer:
            "Yes. When your team needs to update pages, publish news or manage products, we connect a CMS so you can do it without touching code. If the site rarely changes, we keep it simpler and faster without one.",
        },
        {
          question: "Do you redesign existing websites?",
          answer:
            "Yes. We can redesign and rebuild an existing site, keeping the URLs and the search rankings you already have with the right redirects, or improve it step by step on its current technology when that makes more sense.",
        },
        {
          question: "Is SEO included?",
          answer:
            "Technical SEO is part of every site we build: fast pages, clean URLs, titles and descriptions, sitemap, structured data and multilingual setup when needed. We also prepare the content to be understood and cited by AI search engines.",
        },
        {
          question: "Do you work with WordPress?",
          answer:
            "We usually build with Next.js and a headless CMS because it gives faster, more secure sites. If your site already runs on WordPress and it works for you, we can work with it; we recommend changing technology only when there is a clear reason.",
        },
      ],
      og: {
        title: "Custom web development",
        accent: "that wins clients",
        subtitle: "Corporate sites, e-commerce and web platforms built with Next.js. Fast, SEO-ready, designed and coded by one team.",
      },
      keywords: [
        "custom web development",
        "web development company",
        "Next.js development",
        "corporate website design",
        "e-commerce development",
        "web platform development",
      ],
    },
    es: {
      name: "Desarrollo web",
      h1: "Desarrollo web a medida que carga rápido y consigue clientes.",
      seoTitle: "Desarrollo Web a Medida | Diseño y Next.js",
      description:
        "Sitios y plataformas web a medida hechos con Next.js: rápidos, listos para Google y buscadores con IA desde el día uno, y pensados para convertir visitas en clientes.",
      lead:
        "Sitios institucionales, e-commerce y plataformas web diseñados y programados por el mismo equipo. Sin plantillas ni constructores de páginas: un sitio pensado para tu negocio, que carga al instante y es fácil de encontrar.",
      includes: [
        { title: "Sitios institucionales", desc: "Webs que muestran a tu empresa como la especialista que es, con un CMS que tu equipo puede editar." },
        { title: "E-commerce", desc: "Tiendas online con catálogo, checkout, pagos y las integraciones que hay detrás." },
        { title: "Plataformas y dashboards", desc: "Cuentas, roles, backoffices y herramientas internas para gestionar la operación." },
        { title: "SEO y buscadores con IA", desc: "Datos estructurados, URLs limpias, versión multi-idioma y páginas que responden preguntas reales." },
        { title: "Performance", desc: "Core Web Vitals en verde: imágenes, fuentes y código optimizados para cualquier dispositivo." },
        { title: "Mantenimiento", desc: "Actualizaciones, monitoreo y nuevas funcionalidades después del lanzamiento." },
      ],
      body: `
Muchas veces el sitio web es la primera conversación que un cliente tiene con tu empresa, y casi siempre pasa sin que estés presente. Si la página es lenta, confusa o difícil de encontrar, esa conversación termina antes de empezar. Nuestro trabajo de desarrollo web apunta a que esa primera conversación salga bien: un sitio que carga rápido, explica lo que hacés en segundos y deja claro cuál es el siguiente paso.

Somos una empresa argentina de desarrollo web, con base en Córdoba, y hacemos sitios y plataformas web para empresas de toda Argentina y del exterior. Diseño y código se trabajan en la misma mesa, así que lo que aprobás en el diseño es lo que sale publicado.

## Qué desarrollamos

- **Sitios institucionales y corporativos.** Consultoras, empresas financieras y servicios profesionales que necesitan verse online tan sólidos como son en persona. [Més Capital](/cases/mes) y [Provia Consulting](/cases/provia-consulting) son dos ejemplos.
- **E-commerce.** Tiendas donde el catálogo, el checkout y el flujo de pago se diseñan juntos. En [Bausing](/cases/bausing) la tienda y una billetera digital comparten una misma cuenta.
- **Plataformas web.** Productos con login, roles, dashboards y backoffices. Para [Kennedy's Group](/cases/kennedys) llevamos el sitio público de propiedades, la API de reservas y el backoffice con el que se maneja toda la operación.
- **Landing pages y micrositios** para lanzamientos, campañas y nuevas líneas de producto.

## Por qué a medida y no una plantilla

Las plantillas y los constructores de páginas sirven cuando el sitio es una tarjeta de presentación y nada más. Dejan de servir cuando necesitás posicionar en Google, integrar tus sistemas, cargar rápido en un celular de gama media o crecer hasta convertirte en un producto. Un sitio a medida tiene solo el código que necesita: es más rápido, más fácil de mantener y hace exactamente lo que tu negocio requiere. Comparamos los dos caminos en [software a medida vs SaaS](/blog/custom-software-vs-saas).

## Hecho con Next.js

La mayoría de nuestros sitios usan Next.js y React con TypeScript, publicados en Vercel. Nos da renderizado del lado del servidor para SEO, páginas que cargan muy rápido y un camino claro para pasar de un sitio institucional a una plataforma completa sin empezar de cero. Lo explicamos en [por qué desarrollamos con Next.js](/blog/why-we-build-with-nextjs). Cuando un sitio es casi todo estático, como el de Provia Consulting, a veces elegimos Astro: la herramienta depende del proyecto, no de la costumbre.

El contenido vive en un CMS headless cuando tu equipo necesita editar páginas, publicar novedades o cargar productos sin llamar a un desarrollador.

## Listo para Google y los buscadores con IA desde el primer día

El SEO no es algo que agregamos al final. Cada sitio sale con URLs limpias, títulos y descripciones correctos, sitemap, datos estructurados (JSON-LD), imágenes para compartir en redes y, cuando hace falta, URLs separadas por idioma con hreflang. También lo preparamos para buscadores con IA como ChatGPT, Perplexity y los resúmenes de Google, que leen el contenido de otra manera. Nuestro [checklist de SEO para Next.js](/blog/nextjs-seo-checklist) y la guía de [SEO para buscadores con IA](/blog/optimize-website-for-ai-search) cuentan qué implica.

La velocidad también es SEO. Apuntamos a [Core Web Vitals](/blog/core-web-vitals-for-business) en verde en dispositivos reales, no solo en la computadora de un desarrollador.

## Cómo es un proyecto web

1. **Descubrimiento.** Entendemos tu negocio, tus clientes y qué tiene que lograr el sitio: consultas, ventas, reservas o confianza.
2. **Estructura y contenido.** Definimos las páginas, el mensaje de cada una y lo que el visitante necesita encontrar.
3. **Diseño.** De los wireframes a la interfaz final, revisada con vos a medida que avanza.
4. **Desarrollo.** Programamos, conectamos el CMS y las integraciones, y probamos en dispositivos reales.
5. **Lanzamiento y seguimiento.** Publicamos, configuramos analítica y Search Console, y seguimos mejorando después de salir.

## Para quién es

Para empresas que necesitan un sitio que venda, no solo uno que exista: firmas a las que sus clientes buscan online antes de llamar, marcas que venden de forma directa y equipos cuyo sitio se está convirtiendo en un producto. Si no tenés claro si necesitás una web, una plataforma o una app, [contanos el proyecto](/contact) y te ayudamos a definirlo.
`,
      faq: [
        {
          question: "¿Cuánto tarda el desarrollo de un sitio web?",
          answer:
            "Depende del alcance. Un sitio institucional acotado está en la parte corta de nuestro rango y puede llevar unas pocas semanas; una plataforma con cuentas, pagos o backoffice lleva más, muchas veces de dos a cuatro meses. Te damos un plazo real cuando entendemos qué tiene que hacer el sitio.",
        },
        {
          question: "¿Voy a poder editar el contenido yo?",
          answer:
            "Sí. Cuando tu equipo necesita actualizar páginas, publicar novedades o cargar productos, conectamos un CMS para que lo hagas sin tocar código. Si el sitio casi no cambia, lo dejamos más simple y más rápido sin uno.",
        },
        {
          question: "¿Rediseñan sitios que ya existen?",
          answer:
            "Sí. Podemos rediseñar y rehacer un sitio existente manteniendo las URLs y el posicionamiento que ya tenés con las redirecciones correctas, o mejorarlo de a poco sobre su tecnología actual cuando tiene más sentido.",
        },
        {
          question: "¿El SEO está incluido?",
          answer:
            "El SEO técnico es parte de cada sitio que hacemos: páginas rápidas, URLs limpias, títulos y descripciones, sitemap, datos estructurados y versión multi-idioma cuando hace falta. También preparamos el contenido para que los buscadores con IA lo entiendan y lo citen.",
        },
        {
          question: "¿Trabajan con WordPress?",
          answer:
            "Normalmente desarrollamos con Next.js y un CMS headless porque da sitios más rápidos y seguros. Si tu sitio ya está en WordPress y te funciona, podemos trabajar sobre eso; recomendamos cambiar de tecnología solo cuando hay una razón clara.",
        },
      ],
      og: {
        title: "Desarrollo web a medida",
        accent: "que consigue clientes",
        subtitle: "Sitios institucionales, e-commerce y plataformas web con Next.js. Rápidos, listos para SEO, diseñados y programados por un mismo equipo.",
      },
      keywords: [
        "desarrollo web a medida",
        "empresa de desarrollo web",
        "diseño web Córdoba",
        "desarrollo Next.js",
        "desarrollo de e-commerce",
        "desarrollo de plataformas web",
      ],
    },
  },
};

export default service;
