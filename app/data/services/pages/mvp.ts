import type { Service } from "../types";

const service: Service = {
  id: "mvp",
  stack: ["Discovery", "Prototyping", "UX/UI", "Next.js", "React Native", "Analytics"],
  cases: ["nubapay", "tivvu", "nuddo"],
  posts: [
    "what-is-an-mvp",
    "how-to-validate-an-app-idea",
    "from-idea-to-launch-our-process",
    "freelancer-vs-in-house-vs-agency",
    "how-to-choose-a-software-development-agency",
  ],
  content: {
    en: {
      name: "Product Strategy & MVP",
      h1: "MVP development for startups and new products.",
      seoTitle: "MVP Development for Startups & New Products",
      description:
        "From idea to a launched MVP: discovery, scope, design and development of a first version real users can try, so you validate the product before you overspend.",
      lead:
        "We help you turn an idea into the smallest product that can prove it works, and then build it. Strategy, design and code in one team, so the first version is focused, real and ready to grow.",
      includes: [
        { title: "Discovery", desc: "Users, problem, business model and the riskiest assumption to test first." },
        { title: "Scope", desc: "What goes into version one and what waits, written down and agreed." },
        { title: "Prototype", desc: "Clickable flows to test with real users before writing production code." },
        { title: "Design", desc: "UX and UI built on a design system that will survive version two." },
        { title: "Development", desc: "Web or mobile, with the backend, payments and admin it needs to run." },
        { title: "Launch & roadmap", desc: "Analytics from day one and a plan for what to build next." },
      ],
      body: `
Most new products do not fail because they were built badly. They fail because they were built for months before anyone checked whether people wanted them. An MVP, a minimum viable product, is the antidote: the smallest version of your product that real users can use, built to learn as fast and as cheaply as possible what to do next.

We are a software development company in Argentina, based in Córdoba, and we work with founders, startups and companies launching new products across Argentina and abroad. We take part in the strategy, not only the code.

## What an MVP is, and what it is not

An MVP is not a worse version of your full product, and it is not a demo. It is one core flow, done well, for one type of user. If you are building a marketplace, it is the flow that completes one real trade. If you are building an app, it is the one thing users would miss if it disappeared. Everything else waits until real users ask for it. We go deeper in [what an MVP is](/blog/what-is-an-mvp).

## How we decide what goes in

The hardest part of an MVP is saying no. In discovery we work with you to answer three questions:

- **Who is the first user?** Not everyone who could use it, the person who needs it most right now.
- **What must they be able to do?** The single job the product has to get done for them.
- **What is the riskiest assumption?** The belief that, if wrong, sinks the idea. That is what the MVP has to test.

From there we write a closed scope: what is in version one, what is explicitly out, and how we will know it worked.

## Validate before you build

When the idea is still unproven, a clickable prototype tested with a handful of real users can answer the big questions in days, before a single line of production code. We explain how in [how to validate an app idea](/blog/how-to-validate-an-app-idea). Sometimes the prototype says go; sometimes it saves you the whole build.

## Built to grow, not to be thrown away

A fast MVP does not have to be disposable. We build on the same stack we use for mature products, Next.js for web and React Native for mobile with a solid backend, so the first version becomes the foundation of the second instead of a rewrite. We designed and built [Nubapay](/cases/nubapay), an ordering and payment platform for massive events, and [Tivvu](/cases/tivvu), a platform for real estate agencies, from the first scope to a product in production.

## From idea to launch

1. **Discovery.** Users, problem, model and the riskiest assumption.
2. **Scope and prototype.** A closed scope and, when it helps, a prototype tested with users.
3. **Design.** The core flow and a design system ready for what comes next.
4. **Development.** Short cycles you can try as they progress, with the admin and integrations the product needs to run.
5. **Launch and learning.** Analytics from day one, real feedback and a roadmap for version two.

We walk through each stage in detail in [from idea to launch: our process](/blog/from-idea-to-launch-our-process).

## Who it is for

Founders with an idea and no technical team, companies testing a new line of business, and teams that need a partner who will challenge the scope as well as build it. If you are weighing your options, our guides on [freelancer, in-house or agency](/blog/freelancer-vs-in-house-vs-agency) and [how to choose a development agency](/blog/how-to-choose-a-software-development-agency) can help. And if you already have the idea, [tell us about it](/contact).
`,
      faq: [
        {
          question: "How long does it take to build an MVP?",
          answer:
            "Most MVPs we build take between two and four months from kickoff to launch. A validation prototype can be ready in a few weeks. The scope is what defines the timeline, which is why we cut it carefully before we start.",
        },
        {
          question: "I only have an idea. Is that enough to start?",
          answer:
            "Yes. Turning an idea into a scope, a prototype and a plan is part of the work. You do not need a specification or designs; we start with a conversation about the problem and the people who have it.",
        },
        {
          question: "Should my MVP be a website or an app?",
          answer:
            "It depends on how your users will use it. A web app is faster to launch and easier to share from a link; a mobile app makes sense when the product needs the phone's camera, location or notifications. We recommend one or the other based on your users, not on habit.",
        },
        {
          question: "Can the MVP grow into the full product?",
          answer:
            "Yes, that is how we build it. We use the same stack we use for mature products, so version two is built on top of version one instead of starting over.",
        },
        {
          question: "Do I need a technical cofounder?",
          answer:
            "Not to launch an MVP. We act as your product and technical team from discovery to launch and after it. If you plan to build an in-house team later, we hand over clean code and documentation so they can take it from there.",
        },
      ],
      og: {
        title: "MVP development",
        accent: "for startups",
        subtitle: "Discovery, scope, prototype and a first version real users can try. Strategy, design and code in one team.",
      },
      keywords: [
        "MVP development",
        "MVP development company",
        "startup product development",
        "product strategy",
        "prototype development",
        "minimum viable product",
      ],
    },
    es: {
      name: "Estrategia de producto y MVP",
      h1: "Desarrollo de MVP para startups y productos nuevos.",
      seoTitle: "Desarrollo de MVP para Startups y Productos Nuevos",
      description:
        "De la idea a un MVP lanzado: descubrimiento, alcance, diseño y desarrollo de una primera versión que usuarios reales puedan probar, para validar antes de invertir de más.",
      lead:
        "Te ayudamos a convertir una idea en el producto más chico que pueda demostrar que funciona, y después lo desarrollamos. Estrategia, diseño y código en un mismo equipo, para que la primera versión sea enfocada, real y lista para crecer.",
      includes: [
        { title: "Descubrimiento", desc: "Usuarios, problema, modelo de negocio y la hipótesis más riesgosa para probar primero." },
        { title: "Alcance", desc: "Qué entra en la primera versión y qué espera, por escrito y acordado." },
        { title: "Prototipo", desc: "Flujos navegables para probar con usuarios reales antes de programar." },
        { title: "Diseño", desc: "UX y UI sobre un sistema de diseño que aguante la versión dos." },
        { title: "Desarrollo", desc: "Web o mobile, con el backend, los pagos y el panel que necesita para funcionar." },
        { title: "Lanzamiento y hoja de ruta", desc: "Analítica desde el día uno y un plan de qué construir después." },
      ],
      body: `
La mayoría de los productos nuevos no fracasan porque estén mal hechos. Fracasan porque se desarrollaron durante meses antes de que alguien comprobara si la gente los quería. Un MVP, un producto mínimo viable, es el antídoto: la versión más chica de tu producto que usuarios reales pueden usar, hecha para aprender lo más rápido y barato posible qué hacer después.

Somos una empresa argentina de desarrollo de software, con base en Córdoba, y trabajamos con emprendedores, startups y empresas que lanzan productos nuevos en toda Argentina y en el exterior. Participamos de la estrategia, no solo del código.

## Qué es un MVP y qué no

Un MVP no es una versión peor de tu producto completo ni una demo. Es un flujo central, bien hecho, para un tipo de usuario. Si estás armando un marketplace, es el flujo que completa una venta real. Si es una app, es lo único que los usuarios extrañarían si desapareciera. Todo lo demás espera a que los usuarios reales lo pidan. Lo profundizamos en [qué es un MVP](/blog/what-is-an-mvp).

## Cómo decidimos qué entra

Lo más difícil de un MVP es decir que no. En el descubrimiento trabajamos con vos tres preguntas:

- **¿Quién es el primer usuario?** No todos los que podrían usarlo: la persona que más lo necesita hoy.
- **¿Qué tiene que poder hacer?** La única tarea que el producto tiene que resolverle.
- **¿Cuál es la hipótesis más riesgosa?** La creencia que, si está mal, hunde la idea. Eso es lo que el MVP tiene que probar.

A partir de ahí escribimos un alcance cerrado: qué entra en la primera versión, qué queda afuera explícitamente y cómo vamos a saber si funcionó.

## Validar antes de construir

Cuando la idea todavía no está probada, un prototipo navegable probado con un puñado de usuarios reales puede responder las grandes preguntas en días, antes de escribir una sola línea de código de producción. Lo explicamos en [cómo validar una idea de app](/blog/how-to-validate-an-app-idea). A veces el prototipo dice que sí; a veces te ahorra todo el desarrollo.

## Hecho para crecer, no para tirar

Un MVP rápido no tiene por qué ser descartable. Lo construimos con la misma tecnología que usamos para productos maduros, Next.js para web y React Native para mobile con un backend sólido, así la primera versión se convierte en la base de la segunda en lugar de rehacerse. Diseñamos y desarrollamos [Nubapay](/cases/nubapay), una plataforma de pedidos y pagos para eventos masivos, y [Tivvu](/cases/tivvu), una plataforma para inmobiliarias, desde el primer alcance hasta un producto en producción.

## De la idea al lanzamiento

1. **Descubrimiento.** Usuarios, problema, modelo y la hipótesis más riesgosa.
2. **Alcance y prototipo.** Un alcance cerrado y, cuando suma, un prototipo probado con usuarios.
3. **Diseño.** El flujo central y un sistema de diseño listo para lo que viene.
4. **Desarrollo.** Ciclos cortos que podés probar a medida que avanzan, con el panel y las integraciones que el producto necesita para funcionar.
5. **Lanzamiento y aprendizaje.** Analítica desde el primer día, feedback real y una hoja de ruta para la versión dos.

Recorremos cada etapa en detalle en [de la idea al lanzamiento: nuestro proceso](/blog/from-idea-to-launch-our-process).

## Para quién es

Para emprendedores con una idea y sin equipo técnico, empresas que prueban una nueva línea de negocio y equipos que necesitan a alguien que discuta el alcance además de construirlo. Si estás comparando opciones, nuestras guías sobre [freelancer, equipo propio o agencia](/blog/freelancer-vs-in-house-vs-agency) y [cómo elegir una agencia de desarrollo](/blog/how-to-choose-a-software-development-agency) te pueden ayudar. Y si ya tenés la idea, [contánosla](/contact).
`,
      faq: [
        {
          question: "¿Cuánto tarda el desarrollo de un MVP?",
          answer:
            "La mayoría de los MVPs que hacemos llevan entre dos y cuatro meses desde el arranque hasta el lanzamiento. Un prototipo de validación puede estar en pocas semanas. El alcance es lo que define el plazo, por eso lo recortamos con cuidado antes de empezar.",
        },
        {
          question: "Solo tengo una idea. ¿Alcanza para empezar?",
          answer:
            "Sí. Convertir una idea en un alcance, un prototipo y un plan es parte del trabajo. No necesitás especificaciones ni diseños: empezamos con una conversación sobre el problema y las personas que lo tienen.",
        },
        {
          question: "¿Mi MVP tiene que ser una web o una app?",
          answer:
            "Depende de cómo lo van a usar tus usuarios. Una web app se lanza más rápido y se comparte con un link; una app móvil tiene sentido cuando el producto necesita la cámara, la ubicación o las notificaciones del celular. Te recomendamos una u otra según tus usuarios, no por costumbre.",
        },
        {
          question: "¿El MVP puede crecer hasta ser el producto completo?",
          answer:
            "Sí, así lo construimos. Usamos la misma tecnología que en productos maduros, así la versión dos se construye sobre la uno en lugar de empezar de cero.",
        },
        {
          question: "¿Necesito un socio técnico?",
          answer:
            "No para lanzar un MVP. Funcionamos como tu equipo de producto y tecnología desde el descubrimiento hasta el lanzamiento y después. Si más adelante querés armar un equipo propio, entregamos código prolijo y documentado para que sigan desde ahí.",
        },
      ],
      og: {
        title: "Desarrollo de MVP",
        accent: "para startups",
        subtitle: "Descubrimiento, alcance, prototipo y una primera versión que usuarios reales pueden probar. Estrategia, diseño y código en un equipo.",
      },
      keywords: [
        "desarrollo de MVP",
        "empresa de desarrollo de MVP",
        "desarrollo de productos para startups",
        "estrategia de producto",
        "desarrollo de prototipos",
        "producto mínimo viable",
      ],
    },
  },
};

export default service;
