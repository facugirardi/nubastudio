import type { Post } from "../types";

const post: Post = {
  slug: "optimize-website-for-ai-search",
  date: "2026-12-09",
  category: "tech",
  content: {
    en: {
      title: "How to prepare your website for AI search (ChatGPT, Perplexity, Google AI)",
      seoTitle: "How to optimize your website for AI search",
      description:
        "How to make your business visible in AI answers from ChatGPT, Perplexity and Google: clear content, structured data, llms.txt and being cited by others.",
      excerpt:
        "More and more people ask an AI instead of searching. What it takes for your business to appear in those answers, and what is just hype.",
      body: `
Until recently, being found online meant ranking on Google. Today a growing share of people ask ChatGPT, Perplexity, Claude or Google's AI Overviews directly: "which studio builds marketplaces in Argentina?", "how much does an app cost?". The answer is a paragraph, sometimes with a few cited sources. If your business is not in that paragraph, for that person it does not exist.

Optimizing for these answers is sometimes called GEO (generative engine optimization) or AEO (answer engine optimization). The good news: most of it is good SEO done well.

## How AI assistants find information

AI systems answer in two ways:

1. **From what they learned during training,** based on content published before a cutoff date.
2. **By searching the web in real time** and summarizing the pages they find, often citing them.

In both cases they need to find your content, understand it and trust it. That is where you can act.

## 1. Answer the questions your clients ask

AI assistants answer questions. Pages that answer clearly and directly are the easiest to use as a source. Write content that responds to the real questions of your clients: what it costs, how long it takes, what to choose, how it works.

Put the answer first and the nuance after. A paragraph that starts with "A marketplace MVP usually takes three to five months" is much easier to cite than one that gets there after three paragraphs of introduction.

## 2. Be specific and concrete

Generic phrases like "we offer innovative solutions" give an AI nothing to say about you. Concrete facts do: where you are, what you do, for whom, with what technologies, with which results. Case studies with real numbers and details are excellent material.

## 3. Structured data

JSON-LD tells machines what each page is: your organization, your services, your articles, your FAQs. It is useful for traditional search engines and for AI systems that read the web. Include Organization with your profiles (sameAs) so your brand is identified as a single entity across sites. More in our [technical SEO checklist](/blog/nextjs-seo-checklist).

## 4. An llms.txt file

\`llms.txt\` is a proposed standard: a plain-text file at the root of your site that summarizes in Markdown who you are, what you do and which are your most important pages. It is a curated map for language models. It is still an emerging convention and there is no guarantee every system reads it, but it is cheap to add and makes your site easier to understand. This site has one in each language.

## 5. Let the crawlers in

AI companies use their own crawlers (GPTBot, ClaudeBot, PerplexityBot and others). If your \`robots.txt\` blocks them, your content will not be used in their answers. Decide consciously: for a business that wants to be found, allowing them is usually the right call.

## 6. Content in the HTML, fast

Many AI crawlers do not execute JavaScript as well as Google does. If your content only appears after scripts run, they may not see it. Server-rendered or static HTML, as with Next.js or Astro, solves this.

## 7. Be mentioned elsewhere

AI systems trust what several independent sources say. Profiles on LinkedIn, Clutch or Google Business Profile, mentions in articles, directories and interviews, and reviews from clients all reinforce what your own site says. Keep your name, description and location consistent everywhere.

## 8. Keep it updated

AI answers about prices and options age fast. Dated content, updated regularly, signals that the information is current. A blog with useful guides, like this one, is a natural way to keep fresh content.

## What is hype

- **Secret tricks or hidden prompts** in the page to "convince" the AI: they do not work reliably and can damage your credibility.
- **Mass-produced AI content** with no real information: it adds nothing that a model does not already know, so there is no reason to cite it.
- **Abandoning traditional SEO:** many AI systems rely on traditional search results to find their sources.

## How to check if you appear

Ask the assistants the questions your clients would ask, in each language you work in, and look at which sources they cite. Repeat every few months. It is not an exact metric, but it shows whether you are part of the conversation.

## The short version

Clear answers to real questions, concrete facts, structured data, an llms.txt, open access for crawlers, fast HTML and consistent mentions on other sites. None of it is magic, and all of it also helps your traditional SEO.

If you want your site to be ready for how people search now, [let's talk](/contact).
`,
      faq: [
        {
          question: "What is llms.txt?",
          answer:
            "A plain-text Markdown file at the root of a website that summarizes what the business does and links to its most important pages, so language models can understand the site quickly. It is an emerging convention, not an official standard.",
        },
        {
          question: "Should I block AI crawlers like GPTBot?",
          answer:
            "If you want your business to appear in AI answers, no. Blocking them prevents your content from being used. Some publishers block them to protect paid content, which is a different situation.",
        },
        {
          question: "Is optimizing for AI different from SEO?",
          answer:
            "Mostly not. Clear content, structured data, fast pages and authority from other sites help in both. The difference is a stronger focus on direct answers and on being cited by independent sources.",
        },
      ],
    },
    es: {
      title: "Cómo preparar tu sitio para los buscadores con IA (ChatGPT, Perplexity, Google)",
      seoTitle: "Cómo optimizar tu sitio para buscadores con IA",
      description:
        "Cómo lograr que tu negocio aparezca en las respuestas de ChatGPT, Perplexity y la IA de Google: contenido claro, datos estructurados, llms.txt y menciones.",
      excerpt:
        "Cada vez más gente le pregunta a una IA en lugar de buscar. Qué hace falta para que tu negocio aparezca en esas respuestas, y qué es puro humo.",
      body: `
Hasta hace poco, que te encuentren en internet significaba posicionar en Google. Hoy una parte cada vez mayor de la gente le pregunta directamente a ChatGPT, Perplexity, Claude o a las respuestas con IA de Google: "¿qué estudio desarrolla marketplaces en Argentina?", "¿cuánto cuesta una app?". La respuesta es un párrafo, a veces con algunas fuentes citadas. Si tu negocio no está en ese párrafo, para esa persona no existe.

Optimizar para estas respuestas a veces se llama GEO (optimización para motores generativos) o AEO (optimización para motores de respuesta). La buena noticia: la mayor parte es buen SEO bien hecho.

## Cómo encuentran información los asistentes de IA

Los sistemas de IA responden de dos formas:

1. **Con lo que aprendieron durante el entrenamiento,** a partir de contenido publicado antes de una fecha de corte.
2. **Buscando en la web en tiempo real** y resumiendo las páginas que encuentran, muchas veces citándolas.

En los dos casos necesitan encontrar tu contenido, entenderlo y confiar en él. Ahí es donde podés actuar.

## 1. Respondé las preguntas que hacen tus clientes

Los asistentes de IA responden preguntas. Las páginas que responden de forma clara y directa son las más fáciles de usar como fuente. Escribí contenido que responda las preguntas reales de tus clientes: cuánto cuesta, cuánto tarda, qué conviene elegir, cómo funciona.

Poné la respuesta primero y los matices después. Un párrafo que arranca con "Un MVP de marketplace suele llevar de tres a cinco meses" es mucho más fácil de citar que uno que llega ahí después de tres párrafos de introducción.

## 2. Sé específico y concreto

Frases genéricas como "ofrecemos soluciones innovadoras" no le dan a una IA nada para decir sobre vos. Los datos concretos sí: dónde estás, qué hacés, para quién, con qué tecnologías y con qué resultados. Los casos de estudio con detalles reales son un material excelente.

## 3. Datos estructurados

El JSON-LD les dice a las máquinas qué es cada página: tu organización, tus servicios, tus artículos, tus preguntas frecuentes. Sirve para los buscadores tradicionales y para los sistemas de IA que leen la web. Incluí Organization con tus perfiles (sameAs) para que tu marca se identifique como una sola entidad en distintos sitios. Más en nuestra [checklist de SEO técnico](/blog/nextjs-seo-checklist).

## 4. Un archivo llms.txt

\`llms.txt\` es un estándar propuesto: un archivo de texto en la raíz de tu sitio que resume en Markdown quién sos, qué hacés y cuáles son tus páginas más importantes. Es un mapa curado para los modelos de lenguaje. Todavía es una convención emergente y no hay garantía de que todos los sistemas lo lean, pero agregarlo cuesta poco y hace que tu sitio sea más fácil de entender. Este sitio tiene uno en cada idioma.

## 5. Dejá entrar a los rastreadores

Las empresas de IA usan sus propios rastreadores (GPTBot, ClaudeBot, PerplexityBot y otros). Si tu \`robots.txt\` los bloquea, tu contenido no se va a usar en sus respuestas. Decidilo a conciencia: para un negocio que quiere que lo encuentren, permitirlos suele ser lo correcto.

## 6. El contenido en el HTML, y rápido

Muchos rastreadores de IA no ejecutan JavaScript tan bien como Google. Si tu contenido solo aparece después de que corren los scripts, puede que no lo vean. Un HTML generado en el servidor o estático, como con Next.js o Astro, lo resuelve.

## 7. Que te mencionen en otros lados

Los sistemas de IA confían en lo que dicen varias fuentes independientes. Perfiles en LinkedIn, Clutch o Google Business Profile, menciones en artículos, directorios y entrevistas, y reseñas de clientes refuerzan lo que dice tu propio sitio. Mantené tu nombre, tu descripción y tu ubicación coherentes en todos lados.

## 8. Mantenelo actualizado

Las respuestas de la IA sobre precios y opciones envejecen rápido. Un contenido con fecha, actualizado con regularidad, indica que la información está vigente. Un blog con guías útiles, como este, es una forma natural de tener contenido fresco.

## Lo que es humo

- **Trucos secretos o instrucciones escondidas** en la página para "convencer" a la IA: no funcionan de forma confiable y pueden dañar tu credibilidad.
- **Contenido generado en masa con IA** sin información real: no aporta nada que el modelo no sepa, así que no hay motivo para citarlo.
- **Abandonar el SEO tradicional:** muchos sistemas de IA usan los resultados de los buscadores tradicionales para encontrar sus fuentes.

## Cómo saber si aparecés

Hacele a los asistentes las preguntas que harían tus clientes, en cada idioma en el que trabajás, y mirá qué fuentes citan. Repetilo cada algunos meses. No es una métrica exacta, pero te muestra si sos parte de la conversación.

## La versión corta

Respuestas claras a preguntas reales, datos concretos, datos estructurados, un llms.txt, acceso libre para los rastreadores, HTML rápido y menciones coherentes en otros sitios. Nada de eso es magia, y todo ayuda también a tu SEO tradicional.

Si querés que tu sitio esté listo para cómo busca la gente hoy, [hablemos](/contact).
`,
      faq: [
        {
          question: "¿Qué es llms.txt?",
          answer:
            "Un archivo de texto en Markdown en la raíz de un sitio que resume qué hace el negocio y enlaza sus páginas más importantes, para que los modelos de lenguaje entiendan el sitio rápido. Es una convención emergente, no un estándar oficial.",
        },
        {
          question: "¿Debería bloquear rastreadores de IA como GPTBot?",
          answer:
            "Si querés que tu negocio aparezca en las respuestas de la IA, no. Bloquearlos impide que se use tu contenido. Algunos medios los bloquean para proteger contenido pago, que es una situación distinta.",
        },
        {
          question: "¿Optimizar para la IA es distinto del SEO?",
          answer:
            "En su mayor parte, no. El contenido claro, los datos estructurados, las páginas rápidas y la autoridad de otros sitios ayudan en los dos. La diferencia es un foco mayor en las respuestas directas y en que te citen fuentes independientes.",
        },
      ],
    },
  },
};

export default post;
