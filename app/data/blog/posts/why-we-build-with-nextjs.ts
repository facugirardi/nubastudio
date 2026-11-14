import type { Post } from "../types";

const post: Post = {
  slug: "why-we-build-with-nextjs",
  date: "2026-11-14",
  category: "tech",
  cases: ["kennedys", "tivvu"],
  content: {
    en: {
      title: "Why we build with Next.js (and what your business gets from it)",
      seoTitle: "Why we build with Next.js",
      description:
        "What Next.js is, explained for non-technical founders, and what it means for your business: speed, SEO, a single codebase for site and platform, and hiring.",
      excerpt:
        "You do not need to know what a framework is to care about the result: a site that loads fast, ranks well and can grow into a platform. Why Next.js is often our choice.",
      body: `
We are not tied to a single technology. We look for the right one for each project, based on what it needs to do, how it has to grow and who will maintain it. That said, many of our web projects end up on Next.js, and the reasons have more to do with business than with code.

## What Next.js is, in one paragraph

Next.js is a framework (a structured set of tools) built on React, the most widely used library for building web interfaces. It lets a single project serve fast, search-friendly pages and, at the same time, the interactive parts of an application: dashboards, forms, checkouts. Companies of every size use it, from startups to large e-commerce sites and media.

## What your business gets

### 1. Pages that load fast

Next.js can generate pages ahead of time or on the server, so the visitor receives ready-made HTML instead of waiting for their phone to build the page. Speed affects how many visitors stay and how Google ranks you. We cover this in [Core Web Vitals for business](/blog/core-web-vitals-for-business).

### 2. Content that search engines can read

Some web technologies show an empty page to search engines and fill it later with JavaScript. Next.js sends the content in the HTML from the first moment, along with titles, descriptions and structured data. For a business that depends on being found, that matters. See our [SEO checklist for Next.js](/blog/nextjs-seo-checklist).

### 3. The site and the platform in the same project

Many businesses start with a marketing site and later need a client area, a dashboard or a checkout. With Next.js, the public site and the application can live in the same project and share components, design and data. In [Kennedy's Group](/cases/kennedys), the public site runs on Next.js on top of the same API as the Loggia backoffice. In [Tivvu](/cases/tivvu), every real estate agency gets a public site rendered on the server and cached for speed and search, on top of the same data as the dashboard.

### 4. One language from end to end

Next.js uses TypeScript and React, the same language and ecosystem used for mobile apps with React Native. A team can share knowledge, and sometimes code, between the web and the app.

### 5. Easy to find people who know it

React and Next.js are among the most used tools in web development. If tomorrow you want to build your own team, it will be much easier to hire people who already know the stack than with a niche technology.

### 6. Flexible hosting

A Next.js project can be deployed on specialized platforms in minutes or on your own servers. You are not locked into a provider.

## When we do not use Next.js

Choosing a technology because it is fashionable is a mistake. Some examples where we choose something else:

- **Very simple, mostly static institutional sites.** For [Provia Consulting](/cases/provia-consulting) we used Astro, which ships pure static HTML. The site has no dynamic behavior that would justify more, so it loads immediately and costs almost nothing to run.
- **Mobile apps.** For the phone we use React Native with Expo.
- **Heavy backend logic, data or AI.** Behind many of our products there is a Python API (Flask) or Node.js, depending on the case.
- **Existing products.** If your product already runs on another technology that works, we work with it.

## What really matters

Your users will never know what framework your site uses. They will notice whether it loads fast, whether they find what they are looking for and whether it works on their phone. The technology is a means to that. If you want to know which one fits your project, [ask us](/contact). It is one of the first things we define in [our process](/blog/from-idea-to-launch-our-process).
`,
      faq: [
        {
          question: "Is Next.js good for SEO?",
          answer:
            "Yes. Next.js sends content in the HTML from the first request and makes it easy to manage titles, descriptions, canonical URLs, sitemaps and structured data, which are the technical foundations of SEO.",
        },
        {
          question: "Is Next.js only for large companies?",
          answer:
            "No. It works for a five-page site as well as for a large platform. The advantage is that the same project can grow from one to the other.",
        },
        {
          question: "Can a Next.js site have a CMS?",
          answer:
            "Yes. Next.js integrates with most headless CMSs, so a non-technical team can edit content while developers keep control of the design and performance.",
        },
      ],
    },
    es: {
      title: "Por qué desarrollamos con Next.js (y qué gana tu negocio con eso)",
      seoTitle: "Por qué desarrollamos con Next.js",
      description:
        "Qué es Next.js, explicado para emprendedores no técnicos, y qué significa para tu negocio: velocidad, SEO, un solo proyecto para sitio y plataforma, y contratación.",
      excerpt:
        "No hace falta saber qué es un framework para que te importe el resultado: un sitio que carga rápido, posiciona bien y puede crecer hasta ser una plataforma. Por qué Next.js suele ser nuestra elección.",
      body: `
No estamos atados a una sola tecnología. Buscamos la correcta para cada proyecto, según lo que tiene que hacer, cómo tiene que crecer y quién lo va a mantener. Dicho esto, muchos de nuestros proyectos web terminan en Next.js, y las razones tienen más que ver con el negocio que con el código.

## Qué es Next.js, en un párrafo

Next.js es un framework (un conjunto ordenado de herramientas) construido sobre React, la librería más usada para hacer interfaces web. Permite que un mismo proyecto sirva páginas rápidas y fáciles de leer para los buscadores y, al mismo tiempo, las partes interactivas de una aplicación: paneles, formularios, checkouts. Lo usan empresas de todos los tamaños, desde startups hasta grandes e-commerce y medios.

## Qué gana tu negocio

### 1. Páginas que cargan rápido

Next.js puede generar las páginas por adelantado o en el servidor, así el visitante recibe el HTML listo en lugar de esperar a que su celular arme la página. La velocidad influye en cuántos visitantes se quedan y en cómo te posiciona Google. Lo explicamos en [Core Web Vitals para negocios](/blog/core-web-vitals-for-business).

### 2. Contenido que los buscadores pueden leer

Algunas tecnologías web les muestran una página vacía a los buscadores y la completan después con JavaScript. Next.js manda el contenido en el HTML desde el primer momento, junto con títulos, descripciones y datos estructurados. Para un negocio que depende de que lo encuentren, eso importa. Mirá nuestra [checklist de SEO para Next.js](/blog/nextjs-seo-checklist).

### 3. El sitio y la plataforma en el mismo proyecto

Muchos negocios arrancan con un sitio institucional y después necesitan un área de clientes, un panel o un checkout. Con Next.js, el sitio público y la aplicación pueden vivir en el mismo proyecto y compartir componentes, diseño y datos. En [Kennedy's Group](/cases/kennedys), el sitio público funciona con Next.js sobre la misma API que el backoffice Loggia. En [Tivvu](/cases/tivvu), cada inmobiliaria tiene un sitio público generado en el servidor y guardado en caché para que sea rápido y posicione, sobre los mismos datos que el panel.

### 4. Un solo lenguaje de punta a punta

Next.js usa TypeScript y React, el mismo lenguaje y ecosistema que se usa para apps móviles con React Native. Un equipo puede compartir conocimiento, y a veces código, entre la web y la app.

### 5. Es fácil encontrar gente que lo sepa usar

React y Next.js están entre las herramientas más usadas del desarrollo web. Si mañana querés armar tu propio equipo, va a ser mucho más fácil contratar gente que ya conoce estas tecnologías que con una tecnología de nicho.

### 6. Hosting flexible

Un proyecto en Next.js se puede publicar en plataformas especializadas en minutos o en servidores propios. No quedás atado a un proveedor.

## Cuándo no usamos Next.js

Elegir una tecnología porque está de moda es un error. Algunos ejemplos en los que elegimos otra cosa:

- **Sitios institucionales muy simples y mayormente estáticos.** Para [Provia Consulting](/cases/provia-consulting) usamos Astro, que publica HTML estático puro. El sitio no tiene comportamiento dinámico que justifique más, así que carga al instante y cuesta casi nada mantenerlo.
- **Apps móviles.** Para el celular usamos React Native con Expo.
- **Lógica de backend pesada, datos o IA.** Detrás de muchos de nuestros productos hay una API en Python (Flask) o Node.js, según el caso.
- **Productos existentes.** Si tu producto ya funciona sobre otra tecnología, trabajamos con esa.

## Lo que de verdad importa

Tus usuarios nunca van a saber qué framework usa tu sitio. Van a notar si carga rápido, si encuentran lo que buscan y si funciona en su celular. La tecnología es un medio para eso. Si querés saber cuál encaja en tu proyecto, [preguntanos](/contact). Es una de las primeras cosas que definimos en [nuestro proceso](/blog/from-idea-to-launch-our-process).
`,
      faq: [
        {
          question: "¿Next.js es bueno para el SEO?",
          answer:
            "Sí. Next.js manda el contenido en el HTML desde el primer pedido y facilita manejar títulos, descripciones, URLs canónicas, sitemaps y datos estructurados, que son las bases técnicas del SEO.",
        },
        {
          question: "¿Next.js es solo para empresas grandes?",
          answer:
            "No. Sirve tanto para un sitio de cinco páginas como para una plataforma grande. La ventaja es que el mismo proyecto puede crecer de uno a otro.",
        },
        {
          question: "¿Un sitio en Next.js puede tener un CMS?",
          answer:
            "Sí. Next.js se integra con la mayoría de los CMS headless, así un equipo no técnico puede editar el contenido mientras los desarrolladores mantienen el control del diseño y el rendimiento.",
        },
      ],
    },
  },
};

export default post;
