import type { Service } from "../types";

const service: Service = {
  id: "marketplaces",
  stack: ["Next.js", "React Native", "Python", "PostgreSQL", "Mercado Pago", "Paddle"],
  cases: ["nuddo", "tivvu", "kennedys", "nubapay"],
  posts: [
    "how-much-does-it-cost-to-build-a-marketplace",
    "marketplace-chicken-and-egg-problem",
    "how-to-build-a-second-hand-fashion-marketplace",
    "how-to-build-a-luxury-villa-rental-platform",
    "custom-software-vs-saas",
  ],
  content: {
    en: {
      name: "Marketplaces & Platforms",
      h1: "Marketplace development, from the first trade to scale.",
      seoTitle: "Marketplace & Platform Development Company",
      description:
        "We build marketplaces and two-sided platforms: buyer and seller flows, protected payments, reputation, shipping or bookings, and the backoffice to run it all.",
      lead:
        "Two-sided products where strangers trust each other enough to trade. We design and build the whole thing: both sides of the market, the money in between and the tools your team needs to operate it.",
      includes: [
        { title: "Buyer & seller flows", desc: "Listing, search, checkout and order management, designed for both sides." },
        { title: "Payments", desc: "Protected payments, commissions and payouts with providers like Mercado Pago." },
        { title: "Trust & reputation", desc: "Reviews, verification and moderation so people trade with strangers." },
        { title: "Logistics & bookings", desc: "Shipping, availability calendars and reservations built into the deal." },
        { title: "Backoffice", desc: "Moderation, disputes, support and reports for the team that runs it." },
        { title: "SaaS platforms", desc: "Multi-tenant products with roles, subscriptions and billing." },
      ],
      body: `
A marketplace is two products that have to work at the same time: one for the people who sell or offer something and one for the people who buy or book it. In between sits the hardest part, the trust that lets two strangers exchange money. Our marketplace development work is about getting those three pieces right from the first version, so the platform can grow without being rebuilt.

We are a design and development studio based in Córdoba, Argentina, and we build marketplaces and platforms for founders and companies across Argentina, Latin America and the rest of the world.

## What makes a marketplace different

An online store has one seller. A marketplace has many, and every one of them needs to publish, price, sell, get paid and build a reputation. That multiplies the work: two sets of user flows, permissions for each role, rules for commissions and refunds, and an operations team that needs to see everything. It is also why a marketplace usually costs more than an app of similar size; we explain the factors in [how much it costs to build a marketplace](/blog/how-much-does-it-cost-to-build-a-marketplace).

## Payments and trust

Money between strangers is the core of any marketplace. Depending on the model we design flows where the payment is held until the item arrives, split between parties, refunded when something goes wrong and paid out to sellers on a schedule. In Latin America that usually means Mercado Pago; for subscriptions and global billing we have used Paddle.

Trust is built in the product, not only in the payment. Reputation, reviews, verified profiles and clear rules for disputes are what make the second purchase happen.

## Marketplaces and platforms we have built

- **[Nuddo](/cases/nuddo)**, a second-hand fashion marketplace on web, iOS and Android with protected payments, door-to-door shipping and seller reputation. We tell the full story in [how to build a second-hand fashion marketplace](/blog/how-to-build-a-second-hand-fashion-marketplace).
- **[Tivvu](/cases/tivvu)**, a SaaS platform for real estate agencies: properties, clients, offers and bookings in one dashboard, plus a branded public site for each agency.
- **[Kennedy's Group](/cases/kennedys)**, a luxury villa rental platform with a booking API and a backoffice for the whole operation. See [how to build a luxury villa rental platform](/blog/how-to-build-a-luxury-villa-rental-platform).
- **[Nubapay](/cases/nubapay)**, an ordering and payment platform for massive events, where attendees order by QR and organizers watch sales in real time.

## The backoffice nobody budgets for

Every marketplace is also an operation: someone approves sellers, moderates listings, handles disputes, answers support and reads the numbers. We design the backoffice together with the product, because a platform that cannot be operated cannot grow.

## Custom or off-the-shelf?

There are tools to launch a basic marketplace without code, and for testing demand they can be a good first step. They stop fitting when your model has its own rules: a special payment flow, a local logistics partner, bookings, or a commission structure the tool does not support. We help you decide with the questions in [custom software vs SaaS](/blog/custom-software-vs-saas).

## Launching with both sides

The classic marketplace problem is that buyers come for sellers and sellers come for buyers. Part of our work is deciding which side to build for first and which features help the first users stay. We wrote about it in [the chicken-and-egg problem](/blog/marketplace-chicken-and-egg-problem).

## How we run a marketplace project

1. **Model and rules.** Who sells, who buys, how money moves and what the platform keeps.
2. **First version.** The smallest flow that completes a real trade, end to end.
3. **Design.** Both sides of the market and the backoffice, tested with real users.
4. **Development.** Web and mobile against one API, payments and integrations included.
5. **Launch and growth.** We ship, measure and keep adding what the market asks for.

If you have a marketplace or platform in mind, [tell us how it works](/contact) and we will send a first reading of scope and timing.
`,
      faq: [
        {
          question: "How do payments between buyers and sellers work?",
          answer:
            "It depends on the model. We usually integrate a provider like Mercado Pago so the platform can hold the payment until the order is completed, keep its commission and pay the seller out. Refunds and disputes are designed as part of the flow, not added later.",
        },
        {
          question: "Should my marketplace start as a website or an app?",
          answer:
            "Most marketplaces start on the web, because it is faster to launch and easier to find on Google. If your users need the phone, like for photos, location or notifications, we build web and mobile against the same API, as we did for Nuddo.",
        },
        {
          question: "Can I use a no-code marketplace builder instead?",
          answer:
            "For testing demand, sometimes yes. When your model needs its own payment rules, logistics, bookings or integrations, a custom platform pays off. We tell you honestly which stage you are in.",
        },
        {
          question: "Do you build SaaS platforms, not only marketplaces?",
          answer:
            "Yes. We build multi-tenant platforms with accounts, roles, subscriptions and billing, like Tivvu for real estate agencies, as well as booking and operations platforms like the one we run for Kennedy's Group.",
        },
        {
          question: "How long does it take to build a marketplace?",
          answer:
            "A first version that completes a real trade end to end usually sits at the long end of our two-to-four-month range, depending on payments, logistics and whether it ships on web, mobile or both.",
        },
      ],
      og: {
        title: "Marketplace development,",
        accent: "built to scale",
        subtitle: "Two-sided platforms with protected payments, reputation, logistics and a backoffice to run them. Web and mobile.",
      },
      keywords: [
        "marketplace development",
        "marketplace development company",
        "two-sided platform development",
        "SaaS platform development",
        "booking platform development",
        "custom marketplace software",
      ],
    },
    es: {
      name: "Marketplaces y plataformas",
      h1: "Desarrollo de marketplaces, de la primera venta a escala.",
      seoTitle: "Desarrollo de Marketplaces y Plataformas a Medida",
      description:
        "Desarrollamos marketplaces y plataformas de dos lados: compradores y vendedores, pagos protegidos, reputación, envíos o reservas, y el backoffice para operarlo todo.",
      lead:
        "Productos de dos lados donde desconocidos confían lo suficiente como para comerciar. Diseñamos y desarrollamos todo: los dos lados del mercado, la plata que se mueve en el medio y las herramientas que tu equipo necesita para operarlo.",
      includes: [
        { title: "Flujos de compra y venta", desc: "Publicación, búsqueda, checkout y gestión de pedidos, pensados para los dos lados." },
        { title: "Pagos", desc: "Pagos protegidos, comisiones y liquidaciones con medios como Mercado Pago." },
        { title: "Confianza y reputación", desc: "Reseñas, verificación y moderación para que la gente le compre a desconocidos." },
        { title: "Logística y reservas", desc: "Envíos, calendarios de disponibilidad y reservas integrados en la operación." },
        { title: "Backoffice", desc: "Moderación, reclamos, soporte y reportes para el equipo que lo opera." },
        { title: "Plataformas SaaS", desc: "Productos multi-cuenta con roles, suscripciones y facturación." },
      ],
      body: `
Un marketplace son dos productos que tienen que funcionar al mismo tiempo: uno para quienes venden u ofrecen algo y otro para quienes compran o reservan. En el medio está lo más difícil, la confianza que permite que dos desconocidos intercambien plata. Nuestro trabajo de desarrollo de marketplaces apunta a resolver bien esas tres piezas desde la primera versión, para que la plataforma pueda crecer sin rehacerse.

Somos un estudio de diseño y desarrollo de Córdoba, Argentina, y desarrollamos marketplaces y plataformas para emprendedores y empresas de Argentina, Latinoamérica y el resto del mundo.

## Qué hace distinto a un marketplace

Una tienda online tiene un vendedor. Un marketplace tiene muchos, y cada uno necesita publicar, poner precio, vender, cobrar y construir reputación. Eso multiplica el trabajo: dos conjuntos de flujos, permisos para cada rol, reglas para comisiones y devoluciones, y un equipo de operaciones que necesita verlo todo. Por eso un marketplace suele costar más que una app de tamaño parecido; explicamos los factores en [cuánto cuesta hacer un marketplace](/blog/how-much-does-it-cost-to-build-a-marketplace).

## Pagos y confianza

La plata entre desconocidos es el centro de cualquier marketplace. Según el modelo, diseñamos flujos donde el pago se retiene hasta que llega el producto, se divide entre las partes, se devuelve cuando algo sale mal y se liquida a los vendedores en fechas definidas. En Latinoamérica eso suele ser Mercado Pago; para suscripciones y cobros globales usamos Paddle.

La confianza se construye en el producto, no solo en el pago. Reputación, reseñas, perfiles verificados y reglas claras para los reclamos son lo que hace que exista la segunda compra.

## Marketplaces y plataformas que desarrollamos

- **[Nuddo](/cases/nuddo)**, un marketplace de ropa de segunda mano en web, iOS y Android con pagos protegidos, envío puerta a puerta y reputación de vendedores. Contamos la historia completa en [cómo hacer un marketplace de ropa de segunda mano](/blog/how-to-build-a-second-hand-fashion-marketplace).
- **[Tivvu](/cases/tivvu)**, una plataforma SaaS para inmobiliarias: propiedades, clientes, ofertas y reservas en un solo panel, más un sitio público con la marca de cada inmobiliaria.
- **[Kennedy's Group](/cases/kennedys)**, una plataforma de alquiler de villas de lujo con API de reservas y un backoffice para toda la operación. Mirá [cómo hacer una plataforma de alquiler de villas de lujo](/blog/how-to-build-a-luxury-villa-rental-platform).
- **[Nubapay](/cases/nubapay)**, una plataforma de pedidos y pagos para eventos masivos, donde la gente pide por QR y los organizadores ven las ventas en tiempo real.

## El backoffice que nadie presupuesta

Todo marketplace es también una operación: alguien aprueba vendedores, modera publicaciones, resuelve reclamos, responde consultas y mira los números. Diseñamos el backoffice junto con el producto, porque una plataforma que no se puede operar no puede crecer.

## ¿A medida o una herramienta lista?

Hay herramientas para lanzar un marketplace básico sin código, y para probar si hay demanda pueden ser un buen primer paso. Dejan de servir cuando tu modelo tiene reglas propias: un flujo de pago especial, un socio logístico local, reservas o un esquema de comisiones que la herramienta no permite. Te ayudamos a decidir con las preguntas de [software a medida vs SaaS](/blog/custom-software-vs-saas).

## Lanzar con los dos lados

El problema clásico de un marketplace es que los compradores llegan por los vendedores y los vendedores por los compradores. Parte de nuestro trabajo es decidir para qué lado construir primero y qué funcionalidades ayudan a que los primeros usuarios se queden. Lo escribimos en [cómo conseguir los primeros usuarios de un marketplace](/blog/marketplace-chicken-and-egg-problem).

## Cómo llevamos un proyecto de marketplace

1. **Modelo y reglas.** Quién vende, quién compra, cómo se mueve la plata y qué se queda la plataforma.
2. **Primera versión.** El flujo más chico que completa una operación real, de punta a punta.
3. **Diseño.** Los dos lados del mercado y el backoffice, probados con usuarios reales.
4. **Desarrollo.** Web y mobile sobre una misma API, con pagos e integraciones incluidos.
5. **Lanzamiento y crecimiento.** Publicamos, medimos y seguimos sumando lo que el mercado pide.

Si tenés un marketplace o una plataforma en mente, [contanos cómo funciona](/contact) y te mandamos una primera lectura de alcance y plazos.
`,
      faq: [
        {
          question: "¿Cómo funcionan los pagos entre compradores y vendedores?",
          answer:
            "Depende del modelo. Normalmente integramos un medio como Mercado Pago para que la plataforma retenga el pago hasta que se complete el pedido, se quede con su comisión y le liquide al vendedor. Las devoluciones y los reclamos se diseñan como parte del flujo, no se agregan después.",
        },
        {
          question: "¿Mi marketplace tiene que empezar como web o como app?",
          answer:
            "La mayoría empieza en la web, porque se lanza más rápido y se encuentra más fácil en Google. Si tus usuarios necesitan el celular, por fotos, ubicación o notificaciones, hacemos web y mobile sobre la misma API, como en Nuddo.",
        },
        {
          question: "¿Puedo usar una herramienta sin código para armar el marketplace?",
          answer:
            "Para probar si hay demanda, a veces sí. Cuando tu modelo necesita reglas de pago propias, logística, reservas o integraciones, una plataforma a medida se paga sola. Te decimos con honestidad en qué etapa estás.",
        },
        {
          question: "¿Hacen plataformas SaaS, no solo marketplaces?",
          answer:
            "Sí. Desarrollamos plataformas multi-cuenta con usuarios, roles, suscripciones y facturación, como Tivvu para inmobiliarias, y plataformas de reservas y operación como la que llevamos para Kennedy's Group.",
        },
        {
          question: "¿Cuánto tarda el desarrollo de un marketplace?",
          answer:
            "Una primera versión que completa una operación real de punta a punta suele estar en la parte larga de nuestro rango de dos a cuatro meses, según los pagos, la logística y si sale en web, mobile o ambos.",
        },
      ],
      og: {
        title: "Desarrollo de marketplaces,",
        accent: "pensados para escalar",
        subtitle: "Plataformas de dos lados con pagos protegidos, reputación, logística y un backoffice para operarlas. Web y mobile.",
      },
      keywords: [
        "desarrollo de marketplaces",
        "empresa de desarrollo de marketplaces",
        "desarrollo de plataformas a medida",
        "desarrollo de plataformas SaaS",
        "desarrollo de plataforma de reservas",
        "cómo hacer un marketplace",
      ],
    },
  },
};

export default service;
