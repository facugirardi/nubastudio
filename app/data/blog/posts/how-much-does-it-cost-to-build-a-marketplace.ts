import type { Post } from "../types";

const post: Post = {
  slug: "how-much-does-it-cost-to-build-a-marketplace",
  date: "2026-11-14",
  category: "costs",
  cases: ["nuddo", "nubapay"],
  content: {
    en: {
      title: "How much does it cost to build a marketplace?",
      seoTitle: "How much does it cost to build a marketplace?",
      description:
        "What really defines the budget of a two-sided marketplace: the features that drive the work, the build vs. white-label decision and how to plan the first version.",
      excerpt:
        "A marketplace is two products and a payment system sharing one database. What defines its budget, feature by feature, and why every quote has to start from your model.",
      body: `
A marketplace looks simple from the outside: people list things, other people buy them. Underneath, it is at least two products (one for each side), a payment system that holds money between strangers, and an operations layer that keeps the whole thing honest. That is why marketplaces cost more than a regular app, and why cheap quotes for them are almost always incomplete.

## Why there is no price list

No two marketplaces work the same way. Selling second-hand clothes, renting equipment, booking services or ordering at an event are all "marketplaces", and they share almost nothing in how money, trust and logistics move. That is why we quote every marketplace from its own model, not from a table.

What we can tell you is how the work is usually organized:

| Stage | What it includes |
|---|---|
| Concierge or no-code test | Manual matching, forms, existing tools |
| Marketplace MVP | Listings, search, checkout, basic reputation, admin |
| Full marketplace | Web + iOS + Android, payouts, shipping, disputes, analytics |

Where your project lands, and how big each stage is, depends on the factors below.

## What defines the budget

### Two onboarding flows

Buyers and sellers need different sign-ups, different profiles and different dashboards. Sellers usually need verification, a way to manage their listings and a view of their sales. That alone can double the number of screens.

### Listings and search

Publishing has to be fast or supply never shows up. In [Nuddo](/cases/nuddo), a [second-hand fashion marketplace](/blog/how-to-build-a-second-hand-fashion-marketplace), we designed listing so it takes a few steps, because if uploading a garment feels like a project, nobody does it. Search needs filters that match how people actually decide: size, price, condition, location.

### Payments between strangers

This is the hardest part. A marketplace usually needs to charge the buyer, hold the money, take a commission and pay the seller once the deal is done. In Latin America that typically means Mercado Pago with split payments or a provider like Stripe Connect where it is available. Refunds, disputes and taxes all live here.

### Trust and reputation

Reviews, ratings, verified profiles and a visible transaction history. Strangers do not trade without a reason to trust each other, and the reputation system is that reason.

### Logistics

If physical goods move, someone has to arrange the handoff. Integrating a shipping provider so the delivery is booked as part of the purchase removes the moment where most deals die.

### The admin panel

Moderating listings, resolving disputes, issuing refunds, checking payouts, banning bad actors. Marketplaces need more back office than almost any other product.

## Build from scratch or use a white-label platform?

White-label marketplace platforms (Sharetribe, CS-Cart and similar) let you launch in weeks for a monthly fee. They make sense when your marketplace looks like the standard model: listings, checkout, commission.

Build custom when:

- Your transaction is not a standard purchase (bookings, auctions, services, events, rentals).
- You need local payment methods or logistics the platform does not support.
- The marketplace itself is your competitive advantage, not just the channel.

In [Nubapay](/cases/nubapay), for example, the flow is ordering and paying at massive events, with pickup validated by a unique QR. No template covers that.

## How to make the first version a smart investment

1. **Pick one side to subsidize.** Most marketplaces start by building the best possible experience for supply and a simple one for demand.
2. **Do things manually first.** Approvals, disputes and even matching can be handled by a person with an admin panel before you automate them.
3. **Launch in one niche and one city.** Narrow liquidity beats broad emptiness. We cover this in detail in [the chicken-and-egg problem](/blog/marketplace-chicken-and-egg-problem).
4. **Web before apps.** A responsive web marketplace validates demand at a lower cost; the apps come once people are coming back.

## The short answer

The cost of a marketplace depends on how the transaction works, how money moves between the sides, how much trust and logistics the platform has to provide, and how far the first version needs to go. Because every marketplace is its own model, every budget is personalized.

Before investing, make sure you know [what your MVP really needs](/blog/what-is-an-mvp). And if you want to know what your marketplace would take, [tell us about it](/contact) and we will send you a first reading of scope, timing and investment.
`,
      faq: [
        {
          question: "Can I build a marketplace without coding?",
          answer:
            "Yes, to test the idea. Tools like Sharetribe or even forms and spreadsheets let you validate demand in weeks. Most successful marketplaces move to custom software once the transaction model and volume justify it.",
        },
        {
          question: "How do marketplaces handle payments in Argentina?",
          answer:
            "The most common option is Mercado Pago with split payments, which lets the platform keep a commission and send the rest to the seller. The exact setup depends on the business model and tax situation.",
        },
        {
          question: "How long does it take to build a marketplace?",
          answer:
            "An MVP with payments and an admin panel takes three to five months. A full product on web, iOS and Android usually takes five to nine.",
        },
      ],
    },
    es: {
      title: "¿Cuánto cuesta hacer un marketplace?",
      description:
        "Qué define el presupuesto de un marketplace: las funciones que más pesan, la decisión entre desarrollo a medida o marca blanca y cómo planear la primera versión.",
      excerpt:
        "Un marketplace son dos productos y un sistema de pagos que comparten una base de datos. Qué define su presupuesto, función por función, y por qué cada cotización arranca de tu modelo.",
      body: `
Un marketplace parece simple visto de afuera: unos publican, otros compran. Por dentro son al menos dos productos (uno para cada lado), un sistema de pagos que retiene plata entre desconocidos y una capa de operación que mantiene todo en orden. Por eso un marketplace cuesta más que una app común, y por eso los presupuestos baratos casi siempre están incompletos.

## Por qué no hay una lista de precios

No hay dos marketplaces que funcionen igual. Vender ropa usada, alquilar equipos, reservar servicios o pedir en un evento son todos "marketplaces", y no comparten casi nada en cómo circulan la plata, la confianza y la logística. Por eso cotizamos cada marketplace a partir de su propio modelo, no de una tabla.

Lo que sí podemos contarte es cómo se suele organizar el trabajo:

| Etapa | Qué incluye |
|---|---|
| Prueba manual o no-code | Conexión manual, formularios, herramientas existentes |
| MVP de marketplace | Publicaciones, búsqueda, checkout, reputación básica, admin |
| Marketplace completo | Web + iOS + Android, liquidaciones, envíos, disputas, métricas |

En qué punto cae tu proyecto, y qué tan grande es cada etapa, depende de los factores de abajo.

## Qué define el presupuesto

### Dos flujos de registro

Compradores y vendedores necesitan registros, perfiles y paneles distintos. Los vendedores suelen necesitar verificación, una forma de gestionar sus publicaciones y una vista de sus ventas. Eso solo puede duplicar la cantidad de pantallas.

### Publicaciones y búsqueda

Publicar tiene que ser rápido o la oferta nunca aparece. En [Nuddo](/cases/nuddo), un [marketplace de ropa de segunda mano](/blog/how-to-build-a-second-hand-fashion-marketplace), diseñamos la publicación para que lleve pocos pasos, porque si subir una prenda se siente como un proyecto, nadie lo hace. La búsqueda necesita filtros que coincidan con cómo decide la gente: talle, precio, estado, ubicación.

### Pagos entre desconocidos

Es la parte más difícil. Un marketplace normalmente tiene que cobrarle al comprador, retener la plata, quedarse con una comisión y pagarle al vendedor cuando se cierra la operación. En Argentina eso suele ser Mercado Pago con pagos divididos (split de pagos). Devoluciones, disputas e impuestos viven acá.

### Confianza y reputación

Reseñas, calificaciones, perfiles verificados y un historial visible de operaciones. Dos desconocidos no comercian sin una razón para confiar, y el sistema de reputación es esa razón.

### Logística

Si se mueven productos físicos, alguien tiene que coordinar la entrega. Integrar un servicio de envíos para que el envío se contrate como parte de la compra elimina el momento en que se caen la mayoría de las operaciones.

### El panel de administración

Moderar publicaciones, resolver disputas, hacer devoluciones, revisar liquidaciones, bloquear a los que hacen trampa. Un marketplace necesita más backoffice que casi cualquier otro producto.

## ¿Desarrollo a medida o plataforma de marca blanca?

Las plataformas de marketplace de marca blanca (Sharetribe, CS-Cart y similares) te permiten lanzar en semanas por una cuota mensual. Tienen sentido cuando tu marketplace sigue el modelo estándar: publicación, compra, comisión.

Conviene desarrollar a medida cuando:

- Tu operación no es una compra estándar (reservas, subastas, servicios, eventos, alquileres).
- Necesitás medios de pago o logística local que la plataforma no soporta.
- El marketplace en sí es tu ventaja competitiva, no solo el canal.

En [Nubapay](/cases/nubapay), por ejemplo, el flujo es pedir y pagar en eventos masivos, con retiro validado por un QR único. Ninguna plantilla cubre eso.

## Cómo hacer que la primera versión sea una buena inversión

1. **Elegí un lado para cuidar primero.** La mayoría de los marketplaces arrancan construyendo la mejor experiencia posible para la oferta y una simple para la demanda.
2. **Hacé las cosas a mano al principio.** Aprobaciones, disputas y hasta la conexión entre partes las puede manejar una persona con un panel de administración antes de automatizarlas.
3. **Lanzá en un nicho y una ciudad.** Mejor poca oferta concentrada que mucha dispersa. Lo explicamos en detalle en [el problema del huevo y la gallina](/blog/marketplace-chicken-and-egg-problem).
4. **Primero web, después apps.** Un marketplace web responsive valida la demanda a menor costo; las apps llegan cuando la gente vuelve.

## La respuesta corta

El costo de un marketplace depende de cómo funciona la operación, cómo circula la plata entre las partes, cuánta confianza y logística tiene que resolver la plataforma y hasta dónde tiene que llegar la primera versión. Como cada marketplace es un modelo propio, cada presupuesto es personalizado.

Antes de invertir, asegurate de saber [qué necesita realmente tu MVP](/blog/what-is-an-mvp). Y si querés saber qué necesitaría tu marketplace, [contanos de qué se trata](/contact) y te mandamos una primera lectura de alcance, tiempos e inversión.
`,
      faq: [
        {
          question: "¿Se puede hacer un marketplace sin programar?",
          answer:
            "Sí, para probar la idea. Herramientas como Sharetribe o incluso formularios y planillas te permiten validar la demanda en semanas. La mayoría de los marketplaces exitosos pasan a software a medida cuando el modelo y el volumen lo justifican.",
        },
        {
          question: "¿Cómo se manejan los pagos en un marketplace en Argentina?",
          answer:
            "La opción más común es Mercado Pago con pagos divididos, que permite que la plataforma se quede con una comisión y le envíe el resto al vendedor. La configuración exacta depende del modelo de negocio y de la situación impositiva.",
        },
        {
          question: "¿Cuánto tiempo lleva desarrollar un marketplace?",
          answer:
            "Un MVP con pagos y panel de administración lleva de tres a cinco meses. Un producto completo en web, iOS y Android suele llevar de cinco a nueve.",
        },
      ],
    },
  },
};

export default post;
