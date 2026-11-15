import type { Service } from "../types";

const service: Service = {
  id: "mobile",
  stack: ["React Native", "Expo", "TypeScript", "iOS", "Android", "Python", "Node.js"],
  cases: ["nuddo", "ushuaia360"],
  posts: [
    "how-much-does-it-cost-to-build-an-app",
    "native-vs-react-native-vs-pwa",
    "software-development-companies-argentina",
    "offline-first-mobile-apps",
    "how-to-validate-an-app-idea",
    "sports-field-booking-app",
  ],
  content: {
    en: {
      name: "Mobile App Development",
      h1: "Mobile app development for iOS and Android.",
      seoTitle: "iOS & Android App Development Company in Argentina",
      description:
        "We design and build iOS and Android apps with React Native and Expo: one codebase, native feel, plus the backend and admin panel behind them. From idea to the stores.",
      lead:
        "Apps people actually want to open, designed and built end to end: the app on both stores, the backend that powers it and the admin panel your team uses to run it.",
      includes: [
        { title: "iOS & Android apps", desc: "One React Native codebase that feels native on both platforms." },
        { title: "Backend & APIs", desc: "Accounts, data, notifications and the business logic behind every screen." },
        { title: "Admin panel", desc: "The web backoffice to manage users, content, orders and support." },
        { title: "Payments & maps", desc: "Mercado Pago and other providers, GPS, location and real-time features." },
        { title: "Offline-first", desc: "Apps that keep working with no signal and sync when it comes back." },
        { title: "Store publishing", desc: "App Store and Google Play setup, review and every release after launch." },
      ],
      body: `
A mobile app lives on the most personal screen your users have, next to the apps they open every day. That sets the bar: it has to be fast, clear and reliable from the first tap, or it gets deleted. Our mobile app development work covers everything it takes to clear that bar, from the first sketch to the version that goes live on the App Store and Google Play.

We are an app development company based in Córdoba, Argentina, a small design and development studio that builds apps for founders and companies in Argentina, Latin America and around the world. The same team designs the interface, writes the app and builds the backend, so nothing gets lost between handoffs.

## One app, both stores

We build with React Native and Expo. It lets us write one codebase that runs on iOS and Android with native performance and native components, instead of building and maintaining two separate apps. For most products that means less time to launch and a smaller maintenance bill every year after. When a project genuinely needs fully native code, or when a progressive web app is enough, we say so. We compare the three options in [native vs React Native vs PWA](/blog/native-vs-react-native-vs-pwa).

## What is behind the app

The app is the part users see. Behind it there is almost always:

- **A backend and an API** that store accounts and data, send notifications and apply the rules of your business. We usually build it in Python or Node.js on PostgreSQL.
- **An admin panel**, a web backoffice where your team approves users, edits content, checks orders and answers support. It is the part most quotes forget, and one of the most important.
- **Integrations** with payments, maps, shipping, email and whatever systems your business already uses.

We build all three together, so a change in the app and a change in the backend ship at the same time.

## Hard requirements we have solved

Some apps have a requirement that shapes every decision. [Ushuaia360](/cases/ushuaia360) is a hiking app for Tierra del Fuego that has to work with no signal at all: users download trails, GPS traces and 360° photos before they leave town and navigate fully offline. We explain how in our guide to [apps that work offline](/blog/offline-first-mobile-apps).

[Nuddo](/cases/nuddo) is a second-hand fashion marketplace on iOS, Android and web, with protected payments through Mercado Pago, door-to-door shipping and seller reputation, all running against one API so a listing behaves the same wherever it is created.

## From idea to the stores

1. **Discovery.** We understand who uses the app, what they need to get done and what success looks like.
2. **Scope.** We decide what goes into the first version and what waits. If the idea is still unproven, we start by [validating it](/blog/how-to-validate-an-app-idea).
3. **Design.** User flows, wireframes and the final interface, tested on a real phone early.
4. **Development.** App, backend and admin panel, built in short cycles you can try as they progress.
5. **Publishing.** We prepare the store listings, handle the App Store and Google Play review and launch.
6. **After launch.** Operating systems update every year and users ask for new things. We stay on for maintenance and new features.

## What an app costs

There is no price list for an app: the budget depends on the number of user roles, payments, integrations, offline or real-time requirements and the depth of the design. We break it down in [how much it costs to build an app](/blog/how-much-does-it-cost-to-build-an-app). The fastest way to get a real number is to [tell us about your app](/contact).
`,
      faq: [
        {
          question: "Do you build native apps or cross-platform?",
          answer:
            "We usually build with React Native and Expo: one codebase that runs natively on iOS and Android. It cuts time and maintenance for most products. If your app needs fully native code for a specific reason, we tell you up front.",
        },
        {
          question: "Do you publish the app on the App Store and Google Play?",
          answer:
            "Yes. We set up the store listings, prepare screenshots and metadata, go through Apple and Google review and handle every release after the first one. We recommend opening the developer accounts in your company's name, so the app and its listing stay yours.",
        },
        {
          question: "Do you also build the backend and the admin panel?",
          answer:
            "Yes. Almost every app needs a backend for accounts, data and notifications, and a web admin panel for your team. We build them together with the app, so everything ships at the same time.",
        },
        {
          question: "Can you take over an app that already exists?",
          answer:
            "Yes. We review the code and the infrastructure, tell you what state it is in and what we recommend, and then keep improving it and shipping new features, on its current technology when that makes sense.",
        },
        {
          question: "How long does it take to build an app?",
          answer:
            "Most apps take between two and four months from kickoff to the stores, depending on the number of roles, integrations and requirements like payments or offline mode. A validation prototype can be ready much sooner.",
        },
      ],
      og: {
        title: "Mobile app development",
        accent: "for iOS and Android",
        subtitle: "React Native and Expo apps with the backend and admin panel behind them. From idea to the App Store and Google Play.",
      },
      keywords: [
        "mobile app development",
        "iOS and Android app development",
        "React Native development",
        "Expo app development",
        "app development company",
        "app development company Argentina",
        "offline mobile app",
      ],
    },
    es: {
      name: "Desarrollo de apps",
      h1: "Desarrollo de aplicaciones móviles para iOS y Android, desde Córdoba para todo el país.",
      seoTitle: "Desarrollo de Apps iOS y Android en Argentina",
      description:
        "Empresa de desarrollo de apps de Córdoba para toda Argentina. Hacemos apps iOS y Android con React Native, con el backend y el panel de administración detrás.",
      lead:
        "Apps que la gente quiere abrir, diseñadas y desarrolladas de punta a punta: la app en las dos tiendas, el backend que la hace funcionar y el panel con el que tu equipo la administra.",
      includes: [
        { title: "Apps iOS y Android", desc: "Un solo código en React Native que se siente nativo en las dos plataformas." },
        { title: "Backend y APIs", desc: "Cuentas, datos, notificaciones y la lógica de negocio detrás de cada pantalla." },
        { title: "Panel de administración", desc: "El backoffice web para gestionar usuarios, contenido, pedidos y soporte." },
        { title: "Pagos y mapas", desc: "Mercado Pago y otros medios, GPS, ubicación y funciones en tiempo real." },
        { title: "Modo offline", desc: "Apps que siguen funcionando sin señal y sincronizan cuando vuelve." },
        { title: "Publicación en tiendas", desc: "Alta en App Store y Google Play, revisión y cada versión después del lanzamiento." },
      ],
      body: `
Una app vive en la pantalla más personal que tienen tus usuarios, al lado de las apps que abren todos los días. Eso pone la vara alta: tiene que ser rápida, clara y confiable desde el primer toque, o la borran. Nuestro trabajo de desarrollo de aplicaciones móviles cubre todo lo necesario para pasar esa vara, desde el primer boceto hasta la versión publicada en App Store y Google Play.

Somos una empresa de desarrollo de apps de Córdoba, Argentina: un estudio chico de diseño y desarrollo que hace apps para emprendedores y empresas de Córdoba, el resto de Argentina, Latinoamérica y otros países. El mismo equipo diseña la interfaz, programa la app y arma el backend, así que nada se pierde en el camino.

## Una app, las dos tiendas

Desarrollamos con React Native y Expo. Nos permite escribir un solo código que corre en iOS y Android con rendimiento y componentes nativos, en lugar de hacer y mantener dos apps separadas. Para la mayoría de los productos eso significa salir antes y pagar menos mantenimiento cada año. Cuando un proyecto de verdad necesita código nativo, o cuando alcanza con una web app progresiva, te lo decimos. Comparamos las tres opciones en [app nativa vs React Native vs PWA](/blog/native-vs-react-native-vs-pwa).

## Qué hay detrás de la app

La app es la parte que ven los usuarios. Detrás casi siempre hay:

- **Un backend y una API** que guardan cuentas y datos, mandan notificaciones y aplican las reglas de tu negocio. Normalmente lo hacemos en Python o Node.js sobre PostgreSQL.
- **Un panel de administración**, un backoffice web donde tu equipo aprueba usuarios, edita contenido, revisa pedidos y responde consultas. Es lo que la mayoría de los presupuestos olvida, y una de las partes más importantes.
- **Integraciones** con pagos, mapas, envíos, email y los sistemas que tu negocio ya usa.

Hacemos las tres cosas juntas, así un cambio en la app y uno en el backend salen al mismo tiempo.

## Requisitos difíciles que ya resolvimos

Algunas apps tienen un requisito que define todas las decisiones. [Ushuaia360](/cases/ushuaia360) es una app de senderismo en Tierra del Fuego que tiene que funcionar sin nada de señal: los usuarios descargan senderos, trazas GPS y fotos 360° antes de salir y navegan totalmente offline. Contamos cómo en nuestra guía de [apps que funcionan sin internet](/blog/offline-first-mobile-apps).

[Nuddo](/cases/nuddo) es un marketplace de ropa de segunda mano en iOS, Android y web, con pagos protegidos por Mercado Pago, envío puerta a puerta y reputación de vendedores, todo sobre una misma API para que una publicación funcione igual donde sea que se cree.

## De la idea a las tiendas

1. **Descubrimiento.** Entendemos quién usa la app, qué necesita resolver y cómo se ve el éxito.
2. **Alcance.** Definimos qué entra en la primera versión y qué espera. Si la idea todavía no está probada, empezamos por [validarla](/blog/how-to-validate-an-app-idea).
3. **Diseño.** Flujos, wireframes y la interfaz final, probada temprano en un celular real.
4. **Desarrollo.** App, backend y panel de administración, en ciclos cortos que podés probar a medida que avanzan.
5. **Publicación.** Preparamos las fichas de las tiendas, pasamos la revisión de App Store y Google Play y lanzamos.
6. **Después del lanzamiento.** Los sistemas operativos se actualizan todos los años y los usuarios piden cosas nuevas. Seguimos con mantenimiento y nuevas funcionalidades.

## Cuánto cuesta una app

No hay lista de precios para una app: el presupuesto depende de la cantidad de roles, los pagos, las integraciones, si necesita modo offline o tiempo real y la profundidad del diseño. Lo explicamos en [cuánto cuesta desarrollar una app](/blog/how-much-does-it-cost-to-build-an-app). La forma más rápida de tener un número real es [contarnos tu app](/contact).
`,
      faq: [
        {
          question: "¿Hacen apps nativas o multiplataforma?",
          answer:
            "Normalmente desarrollamos con React Native y Expo: un solo código que corre de forma nativa en iOS y Android. Para la mayoría de los productos reduce tiempos y mantenimiento. Si tu app necesita código nativo por una razón concreta, te lo decimos desde el principio.",
        },
        {
          question: "¿Publican la app en App Store y Google Play?",
          answer:
            "Sí. Armamos las fichas de las tiendas, preparamos capturas y textos, pasamos la revisión de Apple y Google y nos ocupamos de cada versión después de la primera. Recomendamos abrir las cuentas de desarrollador a nombre de tu empresa, así la app y su ficha quedan a tu nombre.",
        },
        {
          question: "¿También hacen el backend y el panel de administración?",
          answer:
            "Sí. Casi todas las apps necesitan un backend para cuentas, datos y notificaciones, y un panel web para tu equipo. Los desarrollamos junto con la app, así todo sale al mismo tiempo.",
        },
        {
          question: "¿Pueden tomar una app que ya existe?",
          answer:
            "Sí. Revisamos el código y la infraestructura, te contamos en qué estado está y qué recomendamos, y después seguimos mejorándola y sumando funcionalidades, sobre su tecnología actual cuando tiene sentido.",
        },
        {
          question: "¿Cuánto tarda el desarrollo de una app?",
          answer:
            "La mayoría de las apps llevan entre dos y cuatro meses desde el arranque hasta las tiendas, según la cantidad de roles, integraciones y requisitos como pagos o modo offline. Un prototipo de validación puede estar mucho antes.",
        },
      ],
      og: {
        title: "Desarrollo de apps",
        accent: "para iOS y Android",
        subtitle: "Apps en React Native y Expo con el backend y el panel de administración detrás. De la idea a App Store y Google Play.",
      },
      keywords: [
        "desarrollo de aplicaciones móviles",
        "desarrollo de apps iOS y Android",
        "desarrollo React Native",
        "empresa de desarrollo de apps",
        "empresa de desarrollo de apps Argentina",
        "empresa de desarrollo de apps Córdoba",
        "desarrollo de aplicaciones móviles Córdoba",
        "desarrollo de apps Argentina",
        "app que funciona sin internet",
      ],
    },
  },
};

export default service;
