import type { Post } from "../types";

const post: Post = {
  slug: "from-idea-to-launch-our-process",
  date: "2026-11-20",
  category: "product",
  cases: ["ushuaia360", "checkrto"],
  content: {
    en: {
      title: "From idea to launch: how we build a digital product, step by step",
      seoTitle: "From idea to launch: building a digital product",
      description:
        "What happens from the first call to launch day when you build an app or platform with a studio: discovery, design, development, launch and what comes after.",
      excerpt:
        "Discovery, design, build, launch. What happens in each stage, what you need to bring, and what you should be seeing every couple of weeks.",
      body: `
If you have never built a digital product, the process can feel like a black box: you explain your idea, months go by, and something appears at the end. It should not work like that. This is how a project runs with us, stage by stage, so you know what to expect and what to ask for, whoever you work with.

Most projects take between two and four months from kickoff to launch. A focused site lands at the shorter end; a marketplace or an app with a backend sits at the longer one.

## Before we start: the first conversation

It starts with a call about your business, not about features. Who are the users? What do they do today instead of using your product? What has to be true for this to work? From there we send a first reading of scope, timing and budget.

What you need to bring: the problem, who has it, and whatever you already know about them. You do not need a specification document. Helping write it is part of our job.

## Stage 1: Discovery (1 - 2 weeks)

We dig into your goals, your users and the constraints that shape the work. The output is concrete:

- The core flow of the product, written in one sentence.
- The list of features, sorted into what goes in the [MVP](/blog/what-is-an-mvp) and what waits.
- The user roles and what each one needs to do.
- Technical decisions: [web, app or both](/blog/native-vs-react-native-vs-pwa), integrations, payments.
- A closed scope and a calendar.

Discovery is the cheapest place to change your mind. Moving a box on a whiteboard costs minutes; moving it after it is built costs weeks.

## Stage 2: Design (2 - 4 weeks)

We go from wireframes to polished UI, iterated fast and in the open.

First the structure: wireframes that define what is on each screen and how people move between them, without colors or decoration, so the conversation stays on the flow. Then the visual design and a clickable prototype you can test on your phone before a line of code exists.

In a product like [CheckRTO](/cases/checkrto), where inspectors work through a structured checklist and the report generates itself from what they enter, the structure of that checklist is the product. That is exactly the kind of decision worth settling in wireframes, before anyone argues about colors.

## Stage 3: Build (6 - 12 weeks)

Clean, scalable code shipped in tight loops, with no black boxes. In practice that means:

- **Deliveries every one or two weeks** in a test environment you can open and use.
- **Short, regular check-ins** to review what was built and adjust priorities.
- **The admin panel built alongside the product,** not at the end.
- **Design and development at the same table,** so details are not lost between teams.

If at any point you go more than two weeks without seeing working software, something is wrong, with us or with anyone else.

## Stage 4: Launch (1 - 2 weeks)

Launching is a project in itself: final testing on real devices, store submission for apps (Apple's review can take a few days), domain and email setup, analytics, and real data loaded. For an app like [Ushuaia360](/cases/ushuaia360), launching means checking offline navigation with no signal at all, because that is the situation it was built for.

## After launch: measure and iterate

We ship, measure what matters and keep improving after go-live. The first weeks with real users always reveal something nobody predicted: a step people skip, a feature nobody uses, a question everyone asks. That is the most valuable information you will get, and the next iteration should be built from it.

We stay on for maintenance and continuous improvement when clients want us to: fixing, monitoring and shipping new features long after the first release.

## What you should ask of any team

- A written scope before starting.
- Working software every one or two weeks.
- Direct access to the people designing and building.
- The code, accounts and data in your name.

If you are about to start a project, [tell us about it](/contact) and we will walk you through how it would run in your case.
`,
      faq: [
        {
          question: "How long does it take to build a digital product?",
          answer:
            "Most projects take between two and four months from kickoff to launch. A focused website lands at the shorter end; a marketplace or an app with a backend sits at the longer one.",
        },
        {
          question: "Do I need a technical specification before contacting a studio?",
          answer:
            "No. You need to know the problem and who has it. Turning that into a scope and a specification is part of the discovery stage.",
        },
        {
          question: "How involved do I need to be during the project?",
          answer:
            "Expect a short check-in every week or two and quick answers to product questions. Your input matters most in discovery and design, when changes are cheap.",
        },
      ],
    },
    es: {
      title: "De la idea al lanzamiento: cómo construimos un producto digital, paso a paso",
      seoTitle: "De la idea al lanzamiento de un producto digital",
      description:
        "Qué pasa desde la primera reunión hasta el lanzamiento cuando desarrollás una app o plataforma con un estudio: descubrimiento, diseño, desarrollo y después.",
      excerpt:
        "Descubrimiento, diseño, desarrollo, lanzamiento. Qué pasa en cada etapa, qué tenés que traer y qué deberías ver cada un par de semanas.",
      body: `
Si nunca construiste un producto digital, el proceso puede parecer una caja negra: contás tu idea, pasan los meses y al final aparece algo. No debería funcionar así. Así corre un proyecto con nosotros, etapa por etapa, para que sepas qué esperar y qué pedir, trabajes con quien trabajes.

La mayoría de los proyectos lleva entre dos y cuatro meses desde el arranque hasta el lanzamiento. Un sitio enfocado queda en el extremo corto; un marketplace o una app con backend, en el largo.

## Antes de empezar: la primera charla

Arranca con una charla sobre tu negocio, no sobre funciones. ¿Quiénes son los usuarios? ¿Qué hacen hoy en lugar de usar tu producto? ¿Qué tiene que ser cierto para que esto funcione? A partir de ahí te mandamos una primera lectura de alcance, tiempos y presupuesto.

Lo que tenés que traer: el problema, quién lo tiene y lo que ya sepas sobre esas personas. No necesitás un documento de especificaciones. Ayudarte a escribirlo es parte de nuestro trabajo.

## Etapa 1: Descubrimiento (1 - 2 semanas)

Investigamos tus objetivos, tus usuarios y las restricciones que le dan forma al trabajo. El resultado es concreto:

- El flujo principal del producto, escrito en una oración.
- La lista de funciones, separada entre lo que entra en el [MVP](/blog/what-is-an-mvp) y lo que espera.
- Los tipos de usuario y lo que necesita hacer cada uno.
- Las decisiones técnicas: [web, app o las dos](/blog/native-vs-react-native-vs-pwa), integraciones, pagos.
- Un alcance cerrado y un calendario.

El descubrimiento es el lugar más barato para cambiar de opinión. Mover una caja en un pizarrón cuesta minutos; moverla después de construida cuesta semanas.

## Etapa 2: Diseño (2 - 4 semanas)

Pasamos de los wireframes (bocetos de estructura) a la interfaz final, iterando rápido y a la vista.

Primero la estructura: wireframes que definen qué hay en cada pantalla y cómo se pasa de una a otra, sin colores ni decoración, para que la conversación quede en el flujo. Después el diseño visual y un prototipo navegable que podés probar en tu celular antes de que exista una línea de código.

En un producto como [CheckRTO](/cases/checkrto), donde los inspectores completan una lista de verificación estructurada y el informe se genera solo a partir de lo que cargan, la estructura de esa lista es el producto. Es justo el tipo de decisión que conviene cerrar en wireframes, antes de que alguien discuta colores.

## Etapa 3: Desarrollo (6 - 12 semanas)

Código limpio y escalable, entregado en ciclos cortos y sin cajas negras. En la práctica eso significa:

- **Entregas cada una o dos semanas** en un entorno de prueba que podés abrir y usar.
- **Reuniones cortas y regulares** para revisar lo construido y ajustar prioridades.
- **El panel de administración construido junto con el producto,** no al final.
- **Diseño y desarrollo en la misma mesa,** para que los detalles no se pierdan entre equipos.

Si en algún momento pasan más de dos semanas sin que veas software funcionando, algo está mal, con nosotros o con cualquier otro.

## Etapa 4: Lanzamiento (1 - 2 semanas)

Lanzar es un proyecto en sí mismo: pruebas finales en dispositivos reales, publicación en las tiendas en el caso de las apps (la revisión de Apple puede llevar unos días), configuración de dominio y emails, analítica y datos reales cargados. En una app como [Ushuaia360](/cases/ushuaia360), lanzar implica verificar la navegación offline sin nada de señal, porque esa es la situación para la que fue hecha.

## Después del lanzamiento: medir e iterar

Lanzamos, medimos lo que importa y seguimos mejorando después de salir a producción. Las primeras semanas con usuarios reales siempre muestran algo que nadie previó: un paso que la gente saltea, una función que nadie usa, una pregunta que todos hacen. Es la información más valiosa que vas a tener, y la próxima iteración debería construirse a partir de ella.

Nos quedamos para el mantenimiento y la mejora continua cuando el cliente lo quiere: corrigiendo, monitoreando y sumando funciones mucho después de la primera versión.

## Lo que deberías pedirle a cualquier equipo

- Un alcance por escrito antes de empezar.
- Software funcionando cada una o dos semanas.
- Acceso directo a quienes diseñan y desarrollan.
- El código, las cuentas y los datos a tu nombre.

Si estás por arrancar un proyecto, [contanos de qué se trata](/contact) y te explicamos cómo correría en tu caso.
`,
      faq: [
        {
          question: "¿Cuánto tiempo lleva construir un producto digital?",
          answer:
            "La mayoría de los proyectos lleva entre dos y cuatro meses desde el arranque hasta el lanzamiento. Un sitio web enfocado queda en el extremo corto; un marketplace o una app con backend, en el largo.",
        },
        {
          question: "¿Necesito una especificación técnica antes de contactar a un estudio?",
          answer:
            "No. Necesitás conocer el problema y quién lo tiene. Convertir eso en un alcance y una especificación es parte de la etapa de descubrimiento.",
        },
        {
          question: "¿Cuánto me tengo que involucrar durante el proyecto?",
          answer:
            "Contá con una reunión corta cada una o dos semanas y respuestas rápidas a las preguntas de producto. Tu opinión pesa más en el descubrimiento y el diseño, cuando los cambios son baratos.",
        },
      ],
    },
  },
};

export default post;
