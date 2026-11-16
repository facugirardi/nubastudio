import type { Post } from "../types";

const post: Post = {
  slug: "want-to-build-an-app-where-to-start",
  date: "2026-11-17",
  category: "product",
  cases: ["ushuaia360", "nuddo"],
  content: {
    en: {
      title: "I want to build an app for my business: where do I start?",
      seoTitle: "I want to build an app: where do I start?",
      description:
        "You have an idea for an app but don't know who to talk to or what to prepare. The steps to go from idea to a launched app, and how to pick who builds it.",
      excerpt:
        "You have the idea. You don't know who to call, what to prepare or how much it will cost. This is the order we would follow if we were in your place.",
      body: `
Most people who want an app start in the same place: a clear problem, a rough idea of the solution and no idea who to talk to. That is fine. You don't need to know anything technical to start. You need to know what to bring to the first conversation and what to ask.

## 1. Write the problem, not the features

Before thinking about screens, write in three or four sentences who has the problem, what they do today to solve it and why that is not good enough. For example: "Hikers in Tierra del Fuego lose signal on the trail and get lost. Today they use paper maps or screenshots. Nothing works offline with real trail data."

That paragraph is worth more than a list of 40 features. It is what lets a team suggest the smallest version that solves it. It is also exactly how [Ushuaia360](/cases/ushuaia360) started: an offline hiking app, because the problem was the signal, not the map.

## 2. Decide who uses it and on what device

- **Your clients, on their phone:** an iOS and Android app.
- **Your team, at a desk:** probably a web platform, not an app.
- **Both:** a web backoffice for your team and an app for your clients, sharing the same data.

If you are unsure whether you need a native app, a cross-platform one or a web app, [this comparison](/blog/native-vs-react-native-vs-pwa) covers the trade-offs.

## 3. Pick the first version, not the final one

The first version should do one thing well for one type of user. Payments, chats, ratings and dashboards can come later, once real people use it. That first version is an [MVP](/blog/what-is-an-mvp), and it is the fastest and cheapest way to find out if the idea works. If you want to test the idea before building anything, [these are the ways to validate it](/blog/how-to-validate-an-app-idea).

## 4. Have a budget range in mind

You don't need an exact number, but a range helps the team propose something realistic. What drives the cost of an app is the number of user roles, integrations (payments, maps, external systems) and whether it needs to work offline. We broke it down in [how much it costs to build an app](/blog/how-much-does-it-cost-to-build-an-app).

## 5. Choose who builds it

This is the question most people actually have: who do I talk to? There are three options:

| | Freelancer | In-house team | Studio or agency |
|---|---|---|---|
| Best for | A small, well-defined piece | A product that is the core of the company, long term | A full product, from idea to launch |
| Design, development and strategy | Usually one of the three | You hire each role | All three in one team |
| Speed to start | Fast | Slow (hiring) | Fast |
| Risk | Depends on one person | Hiring and management | Depends on the studio you pick |

We compare them in detail in [freelancer, in-house or agency](/blog/freelancer-vs-in-house-vs-agency), and [how to choose a development agency](/blog/how-to-choose-a-software-development-agency) lists the questions to ask before signing.

## 6. What to bring to the first call

- The problem paragraph from step 1.
- Who uses it and on what device.
- Two or three apps you like, and what you like about them.
- A budget range and a target date, if you have them.
- Anything that already exists: a spreadsheet, a website, a process on paper.

With that, a good team should be able to tell you in one conversation whether the project makes sense, what the first version would include and roughly what it costs.

## What happens next

At Nuba Studio, after that first call we send a proposal with the scope and a closed price for the first version. Then come discovery, design, development and launch, with something working you can try every one or two weeks. The full process is in [from idea to launch](/blog/from-idea-to-launch-our-process).

If you have an idea for an app and want to know if it makes sense, [tell us about it](/contact). We will be honest if the answer is not to build it yet.
`,
      faq: [
        {
          question: "Do I need to know how to code to build an app?",
          answer:
            "No. You need to know the problem, who has it and what you want them to be able to do. Turning that into screens and code is the job of the team you hire.",
        },
        {
          question: "Who should I talk to if I want to build an app?",
          answer:
            "A studio or agency that does design and development is usually the simplest option if you want a complete app from idea to launch. A freelancer works for small, well-defined pieces, and an in-house team makes sense when the app is the core of your company long term.",
        },
        {
          question: "How long does it take to build an app?",
          answer:
            "A focused first version usually takes between two and four months from the first conversation to the app stores, depending on the number of features and integrations.",
        },
        {
          question: "Does my app need to be on iOS and Android?",
          answer:
            "If your clients use it on their phone, almost always yes. Cross-platform frameworks like React Native let you launch on both with a single codebase, which lowers the cost compared to two separate native apps.",
        },
      ],
    },
    es: {
      title: "Quiero desarrollar una app para mi negocio: ¿por dónde empiezo?",
      seoTitle: "Quiero desarrollar una app: por dónde empiezo",
      description:
        "Tenés una idea de app pero no sabés con quién hablar ni qué preparar. Los pasos para ir de la idea a una app publicada y cómo elegir quién la desarrolla.",
      excerpt:
        "Tenés la idea. No sabés a quién llamar, qué preparar ni cuánto va a costar. Este es el orden que seguiríamos si estuviéramos en tu lugar.",
      body: `
Casi todos los que quieren una app arrancan en el mismo lugar: un problema claro, una idea aproximada de la solución y ni idea de con quién hablar. Está bien. No necesitás saber nada técnico para empezar. Necesitás saber qué llevar a la primera charla y qué preguntar.

## 1. Escribí el problema, no las funciones

Antes de pensar en pantallas, escribí en tres o cuatro oraciones quién tiene el problema, qué hace hoy para resolverlo y por qué no alcanza. Por ejemplo: "Los que hacen trekking en Tierra del Fuego pierden señal en el sendero y se pierden. Hoy usan mapas en papel o capturas de pantalla. Nada funciona sin internet con datos reales de los senderos".

Ese párrafo vale más que una lista de 40 funciones. Es lo que le permite a un equipo proponerte la versión más chica que lo resuelve. Y es exactamente cómo empezó [Ushuaia360](/cases/ushuaia360): una app de trekking que funciona sin conexión, porque el problema era la señal, no el mapa.

## 2. Definí quién la usa y en qué dispositivo

- **Tus clientes, desde el celular:** una app iOS y Android.
- **Tu equipo, desde una computadora:** probablemente una plataforma web, no una app.
- **Los dos:** un backoffice web para tu equipo y una app para tus clientes, compartiendo los mismos datos.

Si no sabés si necesitás una app nativa, una multiplataforma o una web app, [esta comparación](/blog/native-vs-react-native-vs-pwa) explica qué gana y qué pierde cada una.

## 3. Elegí la primera versión, no la final

La primera versión tiene que hacer una cosa bien para un tipo de usuario. Pagos, chats, calificaciones y dashboards pueden venir después, cuando haya gente real usándola. Esa primera versión es un [MVP](/blog/what-is-an-mvp), y es la forma más rápida y barata de saber si la idea funciona. Si querés probar la idea antes de desarrollar nada, [estas son las formas de validarla](/blog/how-to-validate-an-app-idea).

## 4. Tené un rango de presupuesto en mente

No hace falta un número exacto, pero un rango ayuda a que el equipo te proponga algo realista. Lo que define el costo de una app es la cantidad de roles de usuario, las integraciones (pagos, mapas, sistemas externos) y si tiene que funcionar sin internet. Lo desarmamos en [cuánto cuesta desarrollar una app](/blog/how-much-does-it-cost-to-build-an-app).

## 5. Elegí quién la desarrolla

Esta es la pregunta que casi todos tienen en realidad: ¿con quién hablo? Hay tres opciones:

| | Freelancer | Equipo propio | Estudio o agencia |
|---|---|---|---|
| Conviene para | Una pieza chica y bien definida | Un producto que es el núcleo de la empresa, a largo plazo | Un producto completo, de la idea al lanzamiento |
| Diseño, desarrollo y estrategia | Normalmente uno de los tres | Contratás cada rol | Los tres en un solo equipo |
| Velocidad para arrancar | Rápida | Lenta (hay que contratar) | Rápida |
| Riesgo | Depende de una persona | Contratación y gestión | Depende del estudio que elijas |

Las comparamos en detalle en [freelancer, equipo propio o agencia](/blog/freelancer-vs-in-house-vs-agency), y en [cómo elegir una agencia de desarrollo](/blog/how-to-choose-a-software-development-agency) están las preguntas para hacer antes de firmar.

## 6. Qué llevar a la primera llamada

- El párrafo del problema del paso 1.
- Quién la usa y en qué dispositivo.
- Dos o tres apps que te gusten, y qué te gusta de ellas.
- Un rango de presupuesto y una fecha objetivo, si los tenés.
- Lo que ya exista: una planilla, una web, un proceso en papel.

Con eso, un buen equipo debería poder decirte en una charla si el proyecto tiene sentido, qué incluiría la primera versión y cuánto cuesta aproximadamente.

## Qué pasa después

En Nuba Studio, después de esa primera charla mandamos una propuesta con el alcance y un presupuesto cerrado para la primera versión. Después vienen el descubrimiento, el diseño, el desarrollo y el lanzamiento, con algo funcionando que podés probar cada una o dos semanas. El proceso completo está en [de la idea al lanzamiento](/blog/from-idea-to-launch-our-process).

Si tenés una idea de app y querés saber si tiene sentido, [contanos](/contact). Si la respuesta es que todavía no conviene desarrollarla, te lo vamos a decir.
`,
      faq: [
        {
          question: "¿Necesito saber programar para desarrollar una app?",
          answer:
            "No. Necesitás conocer el problema, quién lo tiene y qué querés que pueda hacer. Convertir eso en pantallas y código es el trabajo del equipo que contrates.",
        },
        {
          question: "¿Con quién hablo si quiero desarrollar una app?",
          answer:
            "Si querés una app completa, de la idea al lanzamiento, lo más simple suele ser un estudio o agencia que haga diseño y desarrollo. Un freelancer sirve para piezas chicas y bien definidas, y un equipo propio tiene sentido cuando la app es el núcleo de tu empresa a largo plazo.",
        },
        {
          question: "¿Cuánto tarda desarrollar una app?",
          answer:
            "Una primera versión enfocada suele llevar entre dos y cuatro meses desde la primera charla hasta las tiendas, según la cantidad de funciones e integraciones.",
        },
        {
          question: "¿Mi app tiene que estar en iOS y Android?",
          answer:
            "Si tus clientes la usan desde el celular, casi siempre sí. Frameworks multiplataforma como React Native permiten lanzar en las dos con un solo código, lo que baja el costo frente a dos apps nativas separadas.",
        },
      ],
    },
  },
};

export default post;
