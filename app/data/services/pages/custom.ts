import type { Service } from "../types";

const service: Service = {
  id: "custom",
  stack: ["Next.js", "React", "TypeScript", "Python", "Node.js", "PostgreSQL", "React Native"],
  cases: ["kennedys", "checkrto", "tivvu"],
  posts: [
    "custom-software-vs-saas",
    "software-development-companies-argentina",
    "how-to-choose-a-software-development-agency",
    "real-estate-agency-software",
    "from-idea-to-launch-our-process",
  ],
  content: {
    en: {
      name: "Custom Software Development",
      h1: "Custom software development for companies and startups.",
      seoTitle: "Custom Software Development Company in Argentina",
      description:
        "Custom software development company from Córdoba, Argentina. We design and build business systems, web platforms, backoffices and apps around how your company works.",
      lead:
        "Systems built around how your business actually works: the platform your clients use, the backoffice your team runs it from and the integrations that tie it to everything else.",
      includes: [
        { title: "Business systems", desc: "Operations, bookings, inspections, inventory or sales, modeled on your real process." },
        { title: "Web platforms", desc: "Client portals, dashboards and SaaS products that run in the browser." },
        { title: "Backoffices", desc: "The admin panel where your team manages users, data, payments and support." },
        { title: "APIs & integrations", desc: "Payments, invoicing, ERPs, CRMs and the tools your business already uses." },
        { title: "Mobile apps", desc: "iOS and Android apps on the same backend, when the system needs to be in a pocket." },
        { title: "Maintenance", desc: "We stay on after launch: fixes, improvements and new features." },
      ],
      body: `
Custom software makes sense when the way your business works is the advantage, and no off-the-shelf tool fits it without bending the process. It is a system designed and built for one company: its users, its rules, its data and the other tools it already runs on.

Nuba Studio is a custom software development company based in Córdoba, Argentina. We are a small, senior team where product design, development and strategy sit at the same table, and we build for companies and founders in Argentina, Latin America, the United States and Europe.

## What we build

Most of our custom software projects fall into one of these shapes:

- **Operational systems** that replace spreadsheets, paper and five disconnected tools with one platform. [CheckRTO](/cases/checkrto) runs the full vehicle inspection cycle, from the inspection itself to the digital certificate.
- **Platforms with a public side and a private side.** [Kennedy's](/cases/kennedys) is a luxury villa rental company: we built the public property site, the booking API and Loggia, the backoffice where the whole operation runs.
- **Vertical SaaS products** for one industry. [Tivvu](/cases/tivvu) puts properties, clients, offers, bookings and a branded website for real estate agencies in a single panel.

If you are still deciding whether to build or to pay for an existing tool, we compare both paths in [custom software vs. SaaS](/blog/custom-software-vs-saas).

## Studio, not a software factory

A classic software factory works from a requirements document: you write what you need and a team codes it. We work differently. We start by understanding the business, design the flows with the people who will use them and only then write code, in short cycles you can try as they progress. The same people who design the system build it, so nothing is lost between departments.

That makes us a good fit for products and systems that need to be thought through, not only coded. If what you need is to add twenty developers to an existing team, a larger staff augmentation company will serve you better, and we will tell you so.

## How a project runs

1. **Discovery.** We map how the business works today, who the users are and where the current tools fail.
2. **Scope.** We decide what goes into the first version, in writing, with a clear budget.
3. **Design.** Flows and screens validated with real users before production code.
4. **Development.** Backend, web platform, backoffice and apps, delivered in short cycles.
5. **Launch.** Data migration, team onboarding and the first weeks in production with us on call.
6. **Evolution.** Maintenance and new features as the business changes.

We explain each stage in [from idea to launch](/blog/from-idea-to-launch-our-process).

## Technology

We build web platforms and backoffices with Next.js, React and TypeScript, backends in Python or Node.js on PostgreSQL, and mobile apps with React Native. The code, the repositories and the cloud accounts are yours from day one.

To know what your system would cost, [tell us how your business works](/contact). If you are comparing providers, our guide on [software development companies in Argentina](/blog/software-development-companies-argentina) covers what to check.
`,
      faq: [
        {
          question: "What is custom software development?",
          answer:
            "It is designing and building a system for one specific company instead of adapting the business to a generic tool. It fits when your process is what sets you apart, when you need several tools to talk to each other or when SaaS licenses grow faster than the business.",
        },
        {
          question: "How much does custom software cost?",
          answer:
            "It depends on the number of user roles, integrations, data migration and the depth of the design. After a first conversation we send a scoped proposal with a closed budget for the first version, so you know the number before we start.",
        },
        {
          question: "How long does it take to build a custom system?",
          answer:
            "A first version usually takes between two and five months, depending on scope. We deliver working software every few weeks, so you start using parts of the system before the whole project is finished.",
        },
        {
          question: "Do you work with companies outside Argentina?",
          answer:
            "Yes. We work in English and Spanish with clients in Latin America, the United States and Europe. Argentina's time zone overlaps with most of the Americas and with the European afternoon.",
        },
        {
          question: "Who owns the code?",
          answer:
            "You do. The code, the repositories, the domain and the cloud accounts belong to your company from the start.",
        },
      ],
      og: {
        title: "Custom software development",
        accent: "for companies and startups",
        subtitle: "Business systems, web platforms, backoffices and apps, designed and built around how your company works.",
      },
      keywords: [
        "custom software development",
        "custom software development company",
        "software development company Argentina",
        "software development Córdoba Argentina",
        "nearshore software development",
        "business software development",
      ],
    },
    es: {
      name: "Desarrollo de software a medida",
      h1: "Desarrollo de software a medida para empresas y startups.",
      seoTitle: "Empresa de Desarrollo de Software a Medida en Córdoba",
      description:
        "Empresa de desarrollo de software a medida en Córdoba, Argentina. Diseñamos y desarrollamos sistemas, plataformas web, backoffices y apps a la medida de tu negocio.",
      lead:
        "Sistemas hechos alrededor de cómo trabaja tu negocio: la plataforma que usan tus clientes, el backoffice desde el que tu equipo la opera y las integraciones que la conectan con todo lo demás.",
      includes: [
        { title: "Sistemas de gestión", desc: "Operaciones, reservas, inspecciones, stock o ventas, sobre tu proceso real." },
        { title: "Plataformas web", desc: "Portales de clientes, dashboards y productos SaaS que corren en el navegador." },
        { title: "Backoffices", desc: "El panel donde tu equipo gestiona usuarios, datos, pagos y soporte." },
        { title: "APIs e integraciones", desc: "Mercado Pago, facturación electrónica, ERPs, CRMs y las herramientas que ya usás." },
        { title: "Apps móviles", desc: "Apps iOS y Android sobre el mismo backend, cuando el sistema tiene que ir en el bolsillo." },
        { title: "Mantenimiento", desc: "Seguimos después del lanzamiento: correcciones, mejoras y nuevas funcionalidades." },
      ],
      body: `
El software a medida tiene sentido cuando la forma en que trabaja tu negocio es la ventaja, y ninguna herramienta enlatada la acompaña sin torcer el proceso. Es un sistema diseñado y desarrollado para una empresa: sus usuarios, sus reglas, sus datos y las herramientas que ya usa.

Nuba Studio es una empresa de desarrollo de software a medida de Córdoba, Argentina. Somos un equipo chico y senior donde diseño de producto, desarrollo y estrategia trabajan en la misma mesa, y desarrollamos para empresas y emprendedores de Córdoba, el resto de Argentina, Latinoamérica, Estados Unidos y Europa.

## Qué desarrollamos

La mayoría de nuestros proyectos de software a medida tienen una de estas formas:

- **Sistemas de gestión** que reemplazan planillas, papel y cinco herramientas sueltas por una sola plataforma. [CheckRTO](/cases/checkrto) maneja todo el ciclo de la revisión técnica vehicular, desde la inspección hasta el certificado digital.
- **Plataformas con un lado público y uno privado.** [Kennedy's](/cases/kennedys) alquila villas de lujo: hicimos el sitio público de propiedades, la API de reservas y Loggia, el backoffice donde corre toda la operación.
- **Productos SaaS verticales** para una industria. [Tivvu](/cases/tivvu) reúne propiedades, clientes, ofertas, reservas y un sitio con la marca de cada inmobiliaria en un solo panel.

Si todavía estás decidiendo entre desarrollar o pagar una herramienta existente, comparamos los dos caminos en [software a medida vs. SaaS](/blog/custom-software-vs-saas).

## Estudio, no software factory

Una software factory clásica trabaja a partir de un documento de requerimientos: vos escribís lo que necesitás y un equipo lo programa. Nosotros trabajamos distinto. Primero entendemos el negocio, diseñamos los flujos con la gente que los va a usar y recién ahí escribimos código, en ciclos cortos que podés probar a medida que avanzan. Las mismas personas que diseñan el sistema lo desarrollan, así nada se pierde entre departamentos.

Por eso encajamos bien en productos y sistemas que hay que pensar, no solo programar. Si lo que necesitás es sumar veinte desarrolladores a un equipo que ya existe, una empresa más grande de staff augmentation te va a servir mejor, y te lo vamos a decir.

## Cómo es un proyecto

1. **Descubrimiento.** Relevamos cómo funciona hoy el negocio, quiénes son los usuarios y dónde fallan las herramientas actuales.
2. **Alcance.** Definimos qué entra en la primera versión, por escrito y con un presupuesto claro.
3. **Diseño.** Flujos y pantallas validados con usuarios reales antes del código de producción.
4. **Desarrollo.** Backend, plataforma web, backoffice y apps, en entregas cortas.
5. **Lanzamiento.** Migración de datos, capacitación del equipo y las primeras semanas en producción con nosotros atentos.
6. **Evolución.** Mantenimiento y nuevas funcionalidades a medida que el negocio cambia.

Contamos cada etapa en [de la idea al lanzamiento](/blog/from-idea-to-launch-our-process).

## Tecnología

Desarrollamos plataformas web y backoffices con Next.js, React y TypeScript, backends en Python o Node.js sobre PostgreSQL y apps móviles con React Native. El código, los repositorios y las cuentas en la nube son tuyos desde el primer día.

Para saber cuánto costaría tu sistema, [contanos cómo funciona tu negocio](/contact). Si estás comparando proveedores, nuestra guía sobre [empresas de desarrollo de software en Córdoba y Argentina](/blog/software-development-companies-argentina) repasa qué mirar.
`,
      faq: [
        {
          question: "¿Qué es el desarrollo de software a medida?",
          answer:
            "Es diseñar y desarrollar un sistema para una empresa en particular, en lugar de adaptar el negocio a una herramienta genérica. Conviene cuando tu proceso es lo que te diferencia, cuando necesitás que varias herramientas hablen entre sí o cuando las licencias de SaaS crecen más rápido que el negocio.",
        },
        {
          question: "¿Cuánto cuesta un software a medida?",
          answer:
            "Depende de la cantidad de roles de usuario, las integraciones, la migración de datos y la profundidad del diseño. Después de una primera charla mandamos una propuesta con el alcance y un presupuesto cerrado para la primera versión, así sabés el número antes de empezar.",
        },
        {
          question: "¿Cuánto tarda el desarrollo de un sistema a medida?",
          answer:
            "Una primera versión suele llevar entre dos y cinco meses, según el alcance. Entregamos software funcionando cada pocas semanas, así empezás a usar partes del sistema antes de que termine todo el proyecto.",
        },
        {
          question: "¿Trabajan con empresas de todo el país?",
          answer:
            "Sí. Estamos en Córdoba y trabajamos de forma remota con empresas de toda Argentina, Latinoamérica, Estados Unidos y Europa, con reuniones por videollamada cada semana y entregas que podés probar a medida que avanzan.",
        },
        {
          question: "¿De quién es el código?",
          answer:
            "Tuyo. El código, los repositorios, el dominio y las cuentas en la nube son de tu empresa desde el principio.",
        },
      ],
      og: {
        title: "Desarrollo de software",
        accent: "a medida",
        subtitle: "Sistemas, plataformas web, backoffices y apps, diseñados y desarrollados alrededor de cómo trabaja tu empresa.",
      },
      keywords: [
        "desarrollo de software a medida",
        "empresa de desarrollo de software",
        "empresa de software Córdoba",
        "software factory Córdoba",
        "desarrollo de sistemas a medida",
        "desarrollo de software Argentina",
      ],
    },
  },
};

export default service;
