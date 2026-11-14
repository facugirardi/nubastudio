import type { Post } from "../types";

const post: Post = {
  slug: "how-to-validate-an-app-idea",
  date: "2026-11-27",
  category: "product",
  content: {
    en: {
      title: "How to validate an app idea before investing in development",
      seoTitle: "How to validate an app idea before building it",
      description:
        "Seven practical ways to validate an app or startup idea before paying for development: interviews, landing pages, prototypes, pre-sales and concierge tests.",
      excerpt:
        "The most expensive way to test an idea is to build it. Seven cheaper ways to find out whether people want it, from a quick weekend test to a clickable prototype.",
      body: `
The most expensive way to find out whether an idea works is to build the whole product and launch it. Months of work and a large budget, just to learn something you could have known in a few weeks. Validation is about answering the riskiest questions with the least possible investment.

## What you are actually validating

"Validate the idea" is too vague. Break it into three questions:

1. **The problem:** do people have it, often, and does it hurt enough?
2. **The solution:** does your way of solving it make sense to them?
3. **The business:** will they pay, and will enough of them pay?

Each method below answers one or more of these. Start with the problem: if it is not real, nothing else matters.

## 1. Talk to potential users (the right way)

Ten conversations with people who have the problem are worth more than a hundred opinions from friends. The trick is asking about the past, not the future:

- Bad: "Would you use an app that...?" (everyone says yes to be nice)
- Good: "When was the last time this happened to you? What did you do? How much did it cost you?"

If nobody can remember the last time the problem happened, it is probably not a problem.

## 2. Look at what people already do

Find the workarounds. Spreadsheets, WhatsApp groups, Facebook posts, paper forms. A messy workaround is the best sign that a problem is real and that people are already investing effort in it. Many of the products we have built, like [CheckRTO](/cases/checkrto) for vehicle inspections, replace a process that ran on paper and re-typing.

## 3. Launch a landing page

A single page that explains the promise, with a clear call to action: sign up for the waiting list, request a demo, reserve a spot. Drive some traffic with ads aimed at your target user and measure how many act. It costs little and gives you a first number instead of an opinion.

## 4. Do it by hand (concierge test)

Deliver the service manually to a few customers before building anything. If your app will connect people who need a service with people who provide it, do the matching yourself through WhatsApp and a spreadsheet. You will learn what really matters in the process, and whether people come back.

## 5. Build a clickable prototype

A prototype designed in Figma looks and feels like a real app, but there is no code behind it. Put it in front of users and watch them try to complete the main task without help. Where they get stuck tells you more than any survey. A validation prototype usually costs a fraction of development and takes two to four weeks.

## 6. Pre-sell

The strongest validation is money. Offer early access, a founding-customer discount or a paid pilot. If people pay before the product exists, you have a business signal. If they love the idea but will not pay, you have learned something important too.

## 7. Use no-code tools for a first version

For some ideas, especially marketplaces and internal tools, a first version can be assembled with no-code tools in days. It will not scale, and that is fine: its job is to prove demand, not to last.

## Signs that you are ready to build

- You can describe the user and the problem in one sentence, with real examples.
- People are using a workaround, a prototype or your manual service.
- Some of them have paid, or committed to pay.
- You know which [features go in the MVP](/blog/what-is-an-mvp) and which ones wait.

## Signs that you should keep testing

- Your evidence is "everyone I talked to loved it".
- You cannot name ten specific people who would use it next week.
- The feature list keeps growing instead of shrinking.

When you reach the point where building is the next step, [we can help you scope the first version](/contact). And if you want to know what it will cost, start with [how much an app costs](/blog/how-much-does-it-cost-to-build-an-app).
`,
      faq: [
        {
          question: "How much does it cost to validate an app idea?",
          answer:
            "From almost nothing (interviews and a landing page) to a professionally designed clickable prototype, depending on what you need to test. In all cases it is a small part of what building the product takes.",
        },
        {
          question: "How many users should I interview?",
          answer:
            "Ten to fifteen conversations with people who actually have the problem usually reveal the main patterns. If the answers keep surprising you, keep going.",
        },
        {
          question: "Is a prototype enough to raise investment?",
          answer:
            "It can help, especially when combined with evidence of demand such as a waiting list, pilots or pre-sales. Investors value proof that people want it more than the prototype itself.",
        },
      ],
    },
    es: {
      title: "Cómo validar una idea de app antes de invertir en desarrollo",
      seoTitle: "Cómo validar una idea de app antes de desarrollarla",
      description:
        "Siete formas prácticas de validar una idea de app o startup antes de pagar el desarrollo: entrevistas, landing pages, prototipos, preventa y pruebas manuales.",
      excerpt:
        "La forma más cara de probar una idea es construirla. Siete formas más baratas de saber si la gente la quiere, desde una prueba de un fin de semana hasta un prototipo navegable.",
      body: `
La forma más cara de saber si una idea funciona es construir el producto entero y lanzarlo. Meses de trabajo y mucho presupuesto para aprender algo que podrías haber sabido en unas semanas. Validar es responder las preguntas más riesgosas con la menor inversión posible.

## Qué estás validando en realidad

"Validar la idea" es demasiado vago. Dividilo en tres preguntas:

1. **El problema:** ¿la gente lo tiene, seguido, y le duele lo suficiente?
2. **La solución:** ¿tu forma de resolverlo tiene sentido para ellos?
3. **El negocio:** ¿van a pagar, y van a pagar suficientes?

Cada método de abajo responde una o más de estas preguntas. Empezá por el problema: si no es real, lo demás no importa.

## 1. Hablá con usuarios potenciales (bien)

Diez charlas con personas que tienen el problema valen más que cien opiniones de amigos. El truco es preguntar por el pasado, no por el futuro:

- Mal: "¿Usarías una app que...?" (todos dicen que sí por cortesía)
- Bien: "¿Cuándo fue la última vez que te pasó esto? ¿Qué hiciste? ¿Cuánto te costó?"

Si nadie se acuerda de la última vez que le pasó, probablemente no sea un problema.

## 2. Mirá lo que la gente ya hace

Buscá los parches. Planillas, grupos de WhatsApp, publicaciones en Facebook, formularios en papel. Un parche desprolijo es la mejor señal de que un problema es real y de que la gente ya le dedica esfuerzo. Muchos de los productos que construimos, como [CheckRTO](/cases/checkrto) para la revisión técnica vehicular, reemplazan un proceso que funcionaba con papel y con datos tipeados dos veces.

## 3. Lanzá una landing page

Una sola página que explique la promesa, con una acción clara: anotarse en la lista de espera, pedir una demo, reservar un lugar. Llevale algo de tráfico con anuncios dirigidos a tu usuario y medí cuántos actúan. Cuesta poco y te da un primer número en lugar de una opinión.

## 4. Hacelo a mano (prueba concierge)

Prestá el servicio manualmente a algunos clientes antes de construir nada. Si tu app va a conectar gente que necesita un servicio con gente que lo ofrece, hacé vos la conexión por WhatsApp y una planilla. Vas a aprender qué importa de verdad en el proceso, y si la gente vuelve.

## 5. Hacé un prototipo navegable

Un prototipo diseñado en Figma se ve y se siente como una app real, pero no tiene código detrás. Ponelo frente a usuarios y mirá cómo intentan completar la tarea principal sin ayuda. Dónde se traban te dice más que cualquier encuesta. Un prototipo de validación suele costar una fracción del desarrollo y lleva de dos a cuatro semanas.

## 6. Prevendé

La validación más fuerte es la plata. Ofrecé acceso anticipado, un descuento para los primeros clientes o un piloto pago. Si la gente paga antes de que exista el producto, tenés una señal de negocio. Si les encanta la idea pero no pagan, también aprendiste algo importante.

## 7. Usá herramientas no-code para una primera versión

Para algunas ideas, sobre todo marketplaces y herramientas internas, una primera versión se puede armar con herramientas no-code en días. No va a escalar, y está bien: su trabajo es probar la demanda, no durar.

## Señales de que estás listo para desarrollar

- Podés describir al usuario y al problema en una oración, con ejemplos reales.
- La gente está usando un parche, un prototipo o tu servicio manual.
- Algunos pagaron, o se comprometieron a pagar.
- Sabés qué [funciones entran en el MVP](/blog/what-is-an-mvp) y cuáles esperan.

## Señales de que todavía tenés que seguir probando

- Tu evidencia es "a todos los que les conté les encantó".
- No podés nombrar a diez personas concretas que lo usarían la semana que viene.
- La lista de funciones crece en lugar de achicarse.

Cuando llegues al punto en que construir es el próximo paso, [te ayudamos a definir la primera versión](/contact). Y si querés saber cuánto va a costar, empezá por [cuánto cuesta una app](/blog/how-much-does-it-cost-to-build-an-app).
`,
      faq: [
        {
          question: "¿Cuánto cuesta validar una idea de app?",
          answer:
            "Desde casi nada (entrevistas y una landing page) hasta un prototipo navegable diseñado profesionalmente, según lo que necesites probar. En todos los casos es una parte chica de lo que requiere construir el producto.",
        },
        {
          question: "¿A cuántos usuarios debería entrevistar?",
          answer:
            "Entre diez y quince charlas con personas que realmente tienen el problema suelen mostrar los patrones principales. Si las respuestas te siguen sorprendiendo, seguí.",
        },
        {
          question: "¿Alcanza un prototipo para conseguir inversión?",
          answer:
            "Puede ayudar, sobre todo combinado con evidencia de demanda como una lista de espera, pilotos o preventas. Los inversores valoran la prueba de que la gente lo quiere más que el prototipo en sí.",
        },
      ],
    },
  },
};

export default post;
