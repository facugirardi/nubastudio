import type { Post } from "../types";

const post: Post = {
  slug: "custom-software-vs-saas",
  date: "2026-11-14",
  category: "costs",
  cases: ["checkrto", "kennedys"],
  content: {
    en: {
      title: "Custom software vs. SaaS: when to build and when to buy",
      seoTitle: "Custom software vs. SaaS: build or buy?",
      description:
        "Should you build custom software or pay for an existing SaaS tool? A practical framework to decide, with the real costs of each option over three years.",
      excerpt:
        "Most businesses should buy software. Some should build it. A simple framework to know which group you are in, before you spend on either.",
      body: `
Every growing business reaches the same point: the spreadsheets stop scaling, and someone asks whether to pay for a tool or build one. Both answers can be right. The mistake is making the decision based on the monthly price alone.

## Short definitions

- **SaaS (software as a service):** software you rent by subscription, like a CRM, an ERP or a booking system. You use it as it is, with the settings it allows.
- **Custom software:** software built for your specific process. You own it, and it does exactly what you need, no more and no less.

## Buy when the process is standard

If your process looks like everyone else's, someone has already built good software for it. Accounting, payroll, email marketing, basic e-commerce and generic CRMs are solved problems. Building them yourself is paying a lot to get something worse.

Buy if:

- The tool covers 80 percent of what you need without forcing workarounds.
- The process is not what makes you different from your competitors.
- You need it running this month, not in three.

## Build when the process is your advantage

Build when the way you work is part of what you sell, or when no tool fits without bending the business around it.

Build if:

- Your team spends hours copying data between tools that do not talk to each other.
- You pay for five subscriptions to cover one process, and still use spreadsheets in between.
- The software is the product you sell to your clients.
- Your industry has rules, documents or flows that generic tools ignore.

[CheckRTO](/cases/checkrto) is a clear case. Mandatory vehicle inspections ran on paper forms, reports typed up again somewhere else and certificates issued through a separate process. No off-the-shelf tool knew what a technical inspection was. A custom platform now carries each inspection from intake to digital certificate as a single record.

## The cost comparison people get wrong

SaaS looks cheaper because you compare a monthly fee with a one-time build. Compare three years instead, and include the hidden costs on both sides.

| | SaaS | Custom software |
|---|---|---|
| Upfront cost | Low or none | Medium to high |
| Monthly cost | Grows with users and features | Hosting and maintenance |
| Fit with your process | You adapt to the tool | The tool adapts to you |
| Integrations | Only those offered | Whatever you need |
| Data ownership | In the provider's system | Yours |
| Risk | Price increases, discontinued features | Depends on who builds and maintains it |

A subscription charged per user looks cheap with 5 users. With 40 users it costs eight times as much, every year, for software you will never own.

## The middle path: SaaS plus a custom layer

You do not have to choose one. Many of the best setups use standard SaaS for the commodity parts (payments, email, accounting) and custom software for the core. In [Kennedy's Group](/cases/kennedys), the public site, the bookings and the Loggia backoffice are custom, because that is how [a luxury villa business](/blog/how-to-build-a-luxury-villa-rental-platform) actually runs, while email delivery and geolocation run on proven services underneath.

## Three questions to decide

1. If a competitor used the same tool, would they work exactly like you? If yes, buy.
2. How many hours per week does your team lose to workarounds? Multiply by a year.
3. Is this software something you will sell, or something you will use? If you sell it, build it.

If after answering you are still unsure, [let's talk it through](/contact). Sometimes the right answer is not to build anything, and we will tell you. When it is worth building, start with [a focused MVP](/blog/what-is-an-mvp).
`,
      faq: [
        {
          question: "Is custom software more expensive than SaaS?",
          answer:
            "Upfront, yes. Over three to five years it often is not, especially when the subscription is charged per user and the team grows, or when you pay for several tools to cover one process.",
        },
        {
          question: "Who owns custom software?",
          answer:
            "You should. Before signing, make sure the contract states that the code, the repositories and the accounts are transferred to you when the project ends.",
        },
        {
          question: "Can custom software integrate with the tools I already use?",
          answer:
            "Yes. Connecting to existing tools through their APIs is one of the most common reasons to build custom software in the first place.",
        },
      ],
    },
    es: {
      title: "Software a medida vs. SaaS: cuándo desarrollar y cuándo contratar",
      seoTitle: "Software a medida vs. SaaS: cuál conviene",
      description:
        "¿Conviene desarrollar software a medida o pagar una herramienta SaaS? Un criterio práctico para decidir, con los costos reales de cada opción a tres años.",
      excerpt:
        "La mayoría de los negocios deberían contratar software. Algunos deberían desarrollarlo. Un criterio simple para saber en qué grupo estás antes de gastar.",
      body: `
Todo negocio que crece llega al mismo punto: las planillas dejan de alcanzar y alguien pregunta si pagar una herramienta o desarrollar una. Las dos respuestas pueden ser correctas. El error es decidir solo por el precio mensual.

## Definiciones cortas

- **SaaS (software como servicio):** software que alquilás por suscripción, como un CRM, un ERP o un sistema de reservas. Lo usás como viene, con la configuración que permite.
- **Software a medida:** software hecho para tu proceso. Es tuyo y hace exactamente lo que necesitás, ni más ni menos.

## Contratá cuando el proceso es estándar

Si tu proceso se parece al de todos, alguien ya hizo un buen software para eso. Contabilidad, sueldos, email marketing, e-commerce básico y CRMs genéricos son problemas resueltos. Desarrollarlos vos es pagar mucho para tener algo peor.

Contratá si:

- La herramienta cubre el 80 por ciento de lo que necesitás sin obligarte a hacer malabares.
- El proceso no es lo que te diferencia de tu competencia.
- Lo necesitás funcionando este mes, no en tres.

## Desarrollá cuando el proceso es tu ventaja

Desarrollá cuando tu forma de trabajar es parte de lo que vendés, o cuando ninguna herramienta encaja sin torcer el negocio para que entre.

Desarrollá si:

- Tu equipo pierde horas copiando datos entre herramientas que no se hablan.
- Pagás cinco suscripciones para cubrir un proceso y igual usás planillas en el medio.
- El software es el producto que les vendés a tus clientes.
- Tu industria tiene normas, documentos o flujos que las herramientas genéricas ignoran.

[CheckRTO](/cases/checkrto) es un caso claro. La revisión técnica vehicular obligatoria funcionaba con formularios en papel, informes que se volvían a tipear en otro lado y certificados emitidos por un proceso aparte. Ninguna herramienta del mercado sabía qué era una inspección técnica. Una plataforma a medida ahora lleva cada inspección desde el ingreso hasta el certificado digital como un único registro.

## La comparación de costos que se suele hacer mal

El SaaS parece más barato porque comparás una cuota mensual con un desarrollo único. Compará a tres años y sumá los costos ocultos de los dos lados.

| | SaaS | Software a medida |
|---|---|---|
| Costo inicial | Bajo o nulo | Medio a alto |
| Costo mensual | Crece con usuarios y funciones | Hosting y mantenimiento |
| Encaje con tu proceso | Vos te adaptás a la herramienta | La herramienta se adapta a vos |
| Integraciones | Solo las que ofrece | Las que necesites |
| Propiedad de los datos | En el sistema del proveedor | Tuya |
| Riesgo | Aumentos de precio, funciones discontinuadas | Depende de quién lo desarrolla y mantiene |

Una suscripción que se cobra por usuario parece barata con 5 usuarios. Con 40 usuarios cuesta ocho veces más, todos los años, por un software que nunca va a ser tuyo.

## El camino del medio: SaaS más una capa a medida

No tenés que elegir uno solo. Muchas de las mejores soluciones usan SaaS estándar para las partes genéricas (pagos, emails, contabilidad) y software a medida para el núcleo. En [Kennedy's Group](/cases/kennedys), el sitio público, las reservas y el backoffice Loggia son a medida, porque así funciona de verdad [un negocio de villas de lujo](/blog/how-to-build-a-luxury-villa-rental-platform), mientras que el envío de emails y la geolocalización usan servicios probados por debajo.

## Tres preguntas para decidir

1. Si un competidor usara la misma herramienta, ¿trabajaría exactamente como vos? Si la respuesta es sí, contratá.
2. ¿Cuántas horas por semana pierde tu equipo en parches? Multiplicalo por un año.
3. ¿Este software lo vas a vender o lo vas a usar? Si lo vendés, desarrollalo.

Si después de responderlas seguís con dudas, [charlémoslo](/contact). A veces la respuesta correcta es no desarrollar nada, y te lo vamos a decir. Cuando vale la pena, conviene arrancar con [un MVP enfocado](/blog/what-is-an-mvp).
`,
      faq: [
        {
          question: "¿El software a medida es más caro que un SaaS?",
          answer:
            "Al principio, sí. A tres o cinco años muchas veces no, sobre todo cuando la suscripción se cobra por usuario y el equipo crece, o cuando pagás varias herramientas para cubrir un solo proceso.",
        },
        {
          question: "¿De quién es el software a medida?",
          answer:
            "Debería ser tuyo. Antes de firmar, asegurate de que el contrato diga que el código, los repositorios y las cuentas se te transfieren al terminar el proyecto.",
        },
        {
          question: "¿El software a medida se puede integrar con las herramientas que ya uso?",
          answer:
            "Sí. Conectar herramientas existentes a través de sus APIs es justamente una de las razones más comunes para desarrollar software a medida.",
        },
      ],
    },
  },
};

export default post;
