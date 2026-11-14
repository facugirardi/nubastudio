import type { Post } from "../types";

const post: Post = {
  slug: "what-is-an-mvp",
  date: "2026-11-14",
  category: "product",
  cases: ["nubapay", "tivvu"],
  content: {
    en: {
      title: "What is an MVP and how to decide what goes in it",
      description:
        "What a minimum viable product really is, what it is not, and a practical method to decide which features go into your MVP and which ones wait.",
      excerpt:
        "An MVP is not a cheap version of your product. It is the smallest thing that answers your riskiest question. Here is how to define yours.",
      body: `
"MVP" is probably the most misused term in product development. Some people use it to mean "a cheap first version", others "everything we want, but rushed". Both lead to the same place: a product that took too long, cost too much and still did not answer the question that mattered.

## What an MVP actually is

An MVP (minimum viable product) is the smallest version of your product that real users can use to solve a real problem, built to learn whether the idea works before investing in everything else.

Two words carry the weight:

- **Minimum:** only what is needed to complete the core job. Nothing "for later".
- **Viable:** it has to work well. A broken or confusing product teaches you nothing, because people abandon it before you learn anything.

## What an MVP is not

- **It is not a prototype.** A prototype simulates the product; an MVP is used for real, with real data and, ideally, real money.
- **It is not version 1.0 with fewer screens.** It is a version focused on one hypothesis.
- **It is not ugly on purpose.** Good design costs little when the scope is small, and it changes whether people trust the product.

## Start with the riskiest question

Every product idea rests on assumptions. Write them down and pick the one that would kill the business if it were false. Usually it is one of these:

1. Do people have this problem badly enough to change how they solve it?
2. Will they pay for it, and how much?
3. Can we deliver the promise (supply, operations, technology)?

The MVP exists to answer that question. Every feature that does not help answer it waits.

## A method to decide what goes in

### 1. Write the core flow in one sentence

"An attendee scans a QR, orders, pays and picks up without waiting in line." That sentence is the MVP. If a feature is not part of it, it is a candidate to cut.

### 2. List everything, then sort into three columns

- **Must have:** without it the core flow does not work.
- **Should have:** improves the experience, but users can complete the job without it.
- **Later:** everything else, especially what starts with "it would be nice if".

Only the first column gets built. Be ruthless: most teams put twice as many things in "must" as they should.

### 3. Do manually what you can

Reports, approvals, onboarding and support can be done by a person with a simple admin panel at first. Automate when the volume hurts, not before.

### 4. Define what success looks like before launching

Pick two or three numbers that will tell you whether the hypothesis holds: how many users complete the core flow, how many come back, how many pay. Without that, the launch is just an opinion.

## Examples from our work

The core of [Nubapay](/cases/nubapay) fits in one sentence: order and pay from your phone at an event, and pick up with a unique QR. Everything else, from the live dashboard for organizers to the AI assistant, exists to support that flow. If a feature does not make that sentence work better, it is not part of the core.

[Tivvu](/cases/tivvu) gives [real estate agencies](/blog/real-estate-agency-software) one place for listings, clients and offers. The data importer looks like a secondary feature, but it is part of the core: an agency will not adopt a new system if moving over means retyping hundreds of properties. Sometimes the "must have" is what removes the reason not to switch.

## How long it takes and what it costs

A well-defined MVP usually takes two to four months. The investment depends entirely on the product: the roles, payments and integrations in that first flow. We explain what defines it in [how much it costs to build an app](/blog/how-much-does-it-cost-to-build-an-app).

## After the MVP

Launching is where learning starts. Measure, talk to users, and decide what to build next based on what they do, not what they say. The "later" column will look very different after a month with real users.

If you are trying to define the MVP for your idea, [we can help you scope it](/contact). Most of the value of a good MVP is decided before anyone writes code.
`,
      faq: [
        {
          question: "How long does it take to build an MVP?",
          answer:
            "A focused MVP for a web or mobile product usually takes two to four months, depending on the number of user roles, payments and integrations.",
        },
        {
          question: "What is the difference between an MVP and a prototype?",
          answer:
            "A prototype simulates the product to test ideas and usability. An MVP is a working product that real users use with real data, so you can measure actual behavior.",
        },
        {
          question: "How many features should an MVP have?",
          answer:
            "As few as needed to complete one core flow for one type of user. If you cannot describe the MVP in a single sentence, it probably has too much.",
        },
      ],
    },
    es: {
      title: "Qué es un MVP y cómo decidir qué incluir",
      description:
        "Qué es realmente un producto mínimo viable, qué no es, y un método práctico para decidir qué funciones entran en tu MVP y cuáles esperan.",
      excerpt:
        "Un MVP no es una versión barata de tu producto. Es lo mínimo que responde tu pregunta más riesgosa. Cómo definir el tuyo.",
      body: `
"MVP" es probablemente el término peor usado en el desarrollo de productos. Algunos lo usan para decir "una primera versión barata" y otros "todo lo que queremos, pero apurado". Las dos terminan en el mismo lugar: un producto que llevó demasiado tiempo, costó demasiado y aun así no respondió la pregunta que importaba.

## Qué es realmente un MVP

Un MVP (producto mínimo viable) es la versión más chica de tu producto que usuarios reales pueden usar para resolver un problema real, construida para aprender si la idea funciona antes de invertir en todo lo demás.

Dos palabras cargan todo el peso:

- **Mínimo:** solo lo necesario para completar la tarea principal. Nada "para después".
- **Viable:** tiene que funcionar bien. Un producto roto o confuso no te enseña nada, porque la gente lo abandona antes de que aprendas algo.

## Qué no es un MVP

- **No es un prototipo.** Un prototipo simula el producto; un MVP se usa de verdad, con datos reales e, idealmente, plata real.
- **No es la versión 1.0 con menos pantallas.** Es una versión enfocada en una hipótesis.
- **No es feo a propósito.** El buen diseño cuesta poco cuando el alcance es chico, y cambia que la gente confíe o no en el producto.

## Empezá por la pregunta más riesgosa

Toda idea de producto se apoya en supuestos. Escribilos y elegí el que mataría al negocio si fuera falso. Normalmente es uno de estos:

1. ¿La gente tiene este problema lo suficiente como para cambiar cómo lo resuelve?
2. ¿Va a pagar por esto, y cuánto?
3. ¿Podemos cumplir la promesa (oferta, operación, tecnología)?

El MVP existe para responder esa pregunta. Toda función que no ayude a responderla, espera.

## Un método para decidir qué entra

### 1. Escribí el flujo principal en una oración

"Un asistente escanea un QR, pide, paga y retira sin hacer fila." Esa oración es el MVP. Si una función no forma parte de ella, es candidata a quedar afuera.

### 2. Listá todo y ordenalo en tres columnas

- **Imprescindible:** sin esto el flujo principal no funciona.
- **Deseable:** mejora la experiencia, pero el usuario puede completar la tarea sin esto.
- **Después:** todo lo demás, sobre todo lo que empieza con "estaría bueno que".

Solo se construye la primera columna. Sé implacable: la mayoría de los equipos ponen el doble de cosas en "imprescindible" de las que deberían.

### 3. Hacé a mano lo que puedas

Reportes, aprobaciones, altas de usuarios y soporte los puede hacer una persona con un panel de administración simple al principio. Automatizá cuando el volumen duela, no antes.

### 4. Definí qué es éxito antes de lanzar

Elegí dos o tres números que te digan si la hipótesis se sostiene: cuántos usuarios completan el flujo principal, cuántos vuelven, cuántos pagan. Sin eso, el lanzamiento es solo una opinión.

## Ejemplos de nuestro trabajo

El núcleo de [Nubapay](/cases/nubapay) entra en una oración: pedir y pagar desde el celular en un evento y retirar con un QR único. Todo lo demás, desde el panel en vivo para organizadores hasta el asistente con IA, existe para sostener ese flujo. Si una función no hace que esa oración funcione mejor, no es parte del núcleo.

[Tivvu](/cases/tivvu) les da a las [inmobiliarias](/blog/real-estate-agency-software) un solo lugar para propiedades, clientes y ofertas. El importador de datos parece una función secundaria, pero es parte del núcleo: una inmobiliaria no adopta un sistema nuevo si mudarse significa volver a cargar cientos de propiedades a mano. A veces lo "imprescindible" es lo que elimina la excusa para no cambiar.

## Cuánto tiempo lleva y qué define su costo

Un MVP bien definido suele llevar de dos a cuatro meses. La inversión depende por completo del producto: los tipos de usuario, los pagos y las integraciones de ese primer flujo. Explicamos qué la define en [cuánto cuesta desarrollar una app](/blog/how-much-does-it-cost-to-build-an-app).

## Después del MVP

El lanzamiento es donde empieza el aprendizaje. Medí, hablá con usuarios y decidí qué construir después según lo que hacen, no lo que dicen. La columna "después" se va a ver muy distinta tras un mes con usuarios reales.

Si estás tratando de definir el MVP de tu idea, [te ayudamos a recortarlo](/contact). La mayor parte del valor de un buen MVP se decide antes de escribir una línea de código.
`,
      faq: [
        {
          question: "¿Cuánto tiempo lleva desarrollar un MVP?",
          answer:
            "Un MVP enfocado para un producto web o mobile suele llevar de dos a cuatro meses, según la cantidad de tipos de usuario, pagos e integraciones.",
        },
        {
          question: "¿Cuál es la diferencia entre un MVP y un prototipo?",
          answer:
            "Un prototipo simula el producto para probar ideas y usabilidad. Un MVP es un producto que funciona y que usuarios reales usan con datos reales, para medir comportamiento real.",
        },
        {
          question: "¿Cuántas funciones debería tener un MVP?",
          answer:
            "Las mínimas para completar un flujo principal para un tipo de usuario. Si no podés describir el MVP en una oración, probablemente tiene demasiado.",
        },
      ],
    },
  },
};

export default post;
