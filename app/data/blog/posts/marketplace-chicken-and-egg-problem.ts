import type { Post } from "../types";

const post: Post = {
  slug: "marketplace-chicken-and-egg-problem",
  date: "2026-12-04",
  category: "product",
  cases: ["nuddo", "nubapay"],
  content: {
    en: {
      title: "The marketplace chicken-and-egg problem: how to get your first users",
      seoTitle: "Marketplace cold start: getting your first users",
      description:
        "Buyers won't come without sellers, and sellers won't come without buyers. Proven tactics to solve the marketplace cold start and reach liquidity.",
      excerpt:
        "Buyers won't come without sellers, sellers won't come without buyers. Eight tactics that marketplaces use to break the loop, and how product design helps.",
      body: `
Every marketplace starts with the same paradox. Buyers come for the offer, and sellers come for the buyers. On day one there are neither, so nobody has a reason to show up. This is the chicken-and-egg problem, and more marketplaces die from it than from bad technology.

The goal is to reach **liquidity**: the point where a buyer who arrives finds what they are looking for, and a seller who lists sells within a reasonable time. Until then, everything is about getting there.

## Start with supply (almost always)

In most marketplaces, supply is harder to get and easier to keep. A seller with listed items stays even if sales are slow at first; a buyer who finds an empty catalog never comes back. So the first effort usually goes to the supply side.

## Eight tactics that work

### 1. Go narrow: one niche, one city

A marketplace with 50 listings in one category and one city feels full. The same 50 spread across ten categories and the whole country feels empty. Start where you can reach density fast and expand from there.

### 2. Bring supply in by hand

In the beginning, recruit sellers one by one. Call them, visit them, load their listings for them if needed. It does not scale, and it is not supposed to: it builds the catalog that attracts the first buyers.

### 3. Make publishing almost effortless

If listing takes twenty minutes, supply never arrives. In [Nuddo](/cases/nuddo), the circular fashion marketplace, listing an item takes a few steps, so publishing feels like a small act rather than a project. Every field you remove from the publishing flow is more supply.

### 4. Give one side a tool that is useful on its own

A classic tactic: build something that serves one side even without the other. A management tool, a free storefront, a dashboard. Sellers adopt it for the tool, and the marketplace grows on top. [Nubapay](/cases/nubapay) works this way for event organizers: the live sales dashboard and QR ordering are valuable from the first event, regardless of how big the platform is.

### 5. Piggyback on existing communities

Your first users already gather somewhere: Instagram accounts, Facebook groups, clubs, fairs, associations. Go where they are instead of waiting for them to find you. Partnerships with a single well-connected community can seed a whole category.

### 6. Bring in anchor sellers

A few known names attract both buyers and other sellers. In Nuddo, local fashion brands sell new collections in the same catalog as second-hand listings, which gives the marketplace recognizable supply from the start.

### 7. Subsidize the hard side

Zero commission for the first sellers, guaranteed income, free shipping for the first buyers. Pay to make the early experience good for whichever side is harder to win, and remove the subsidy once the market works on its own.

### 8. Remove the moments where deals die

Liquidity is not only about numbers, it is about completed transactions. In peer-to-peer marketplaces, deals often die after they are agreed: the payment feels unsafe or the handoff is too complicated. Protected payments and shipping booked as part of the purchase turn interest into closed deals.

## Product decisions that help with cold start

- **A reputation system from day one,** so early buyers have a reason to trust sellers they do not know.
- **An admin panel** that lets your team load listings, moderate and support users manually.
- **Notifications and saved searches,** so a buyer who did not find something today hears about it tomorrow.
- **Web first,** so new users can try it without downloading an app.

## Metrics to watch

- Percentage of listings that sell in a given period.
- Percentage of searches that end in a contact or a purchase.
- How many buyers and sellers come back in the following month.

If you are planning a marketplace, read [how much it costs to build one](/blog/how-much-does-it-cost-to-build-a-marketplace), and [tell us about your idea](/contact). We will help you think through the launch plan as well as the product.
`,
      faq: [
        {
          question: "Which side of a marketplace should I attract first?",
          answer:
            "Usually supply, because sellers with listed items tend to stay even if sales are slow, while buyers who find an empty catalog rarely come back.",
        },
        {
          question: "What is liquidity in a marketplace?",
          answer:
            "It is the point where buyers reliably find what they are looking for and sellers reliably sell within a reasonable time. Reaching it in one niche is more valuable than being thin across many.",
        },
        {
          question: "Should a new marketplace charge commission from day one?",
          answer:
            "Not necessarily. Many marketplaces waive or reduce the commission for early users on the harder side, and introduce it once the market has enough activity.",
        },
      ],
    },
    es: {
      title: "El problema del huevo y la gallina en marketplaces: cómo conseguir los primeros usuarios",
      seoTitle: "Primeros usuarios para tu marketplace",
      description:
        "Sin vendedores no vienen compradores y sin compradores no vienen vendedores. Tácticas probadas para arrancar un marketplace y llegar a la liquidez.",
      excerpt:
        "Sin vendedores no hay compradores y sin compradores no hay vendedores. Ocho tácticas que usan los marketplaces para romper el círculo, y cómo ayuda el diseño de producto.",
      body: `
Todo marketplace arranca con la misma paradoja. Los compradores vienen por la oferta y los vendedores vienen por los compradores. El primer día no hay ninguno de los dos, así que nadie tiene motivo para aparecer. Es el problema del huevo y la gallina, y mata más marketplaces que la mala tecnología.

El objetivo es llegar a la **liquidez**: el punto en el que un comprador que entra encuentra lo que busca y un vendedor que publica vende en un tiempo razonable. Hasta ahí, todo se trata de llegar.

## Empezá por la oferta (casi siempre)

En la mayoría de los marketplaces, la oferta es más difícil de conseguir y más fácil de retener. Un vendedor con productos publicados se queda aunque al principio venda poco; un comprador que encuentra un catálogo vacío no vuelve. Por eso el primer esfuerzo suele ir al lado de la oferta.

## Ocho tácticas que funcionan

### 1. Achicá: un nicho, una ciudad

Un marketplace con 50 publicaciones en una categoría y una ciudad se siente lleno. Las mismas 50 repartidas en diez categorías y todo el país se sienten vacías. Arrancá donde puedas llegar rápido a la densidad y expandite desde ahí.

### 2. Conseguí la oferta a mano

Al principio, sumá vendedores uno por uno. Llamalos, visitalos, cargales las publicaciones si hace falta. No escala, y no tiene que escalar: arma el catálogo que atrae a los primeros compradores.

### 3. Hacé que publicar sea casi sin esfuerzo

Si publicar lleva veinte minutos, la oferta nunca llega. En [Nuddo](/cases/nuddo), el marketplace de moda circular, publicar una prenda lleva pocos pasos, así que se siente como un gesto chico y no como un proyecto. Cada campo que sacás del flujo de publicación es más oferta.

### 4. Dale a un lado una herramienta que sirva por sí sola

Una táctica clásica: construir algo que le sirva a un lado aunque el otro todavía no esté. Una herramienta de gestión, una tienda gratis, un panel. Los vendedores la adoptan por la herramienta y el marketplace crece arriba. [Nubapay](/cases/nubapay) funciona así para los organizadores de eventos: el panel de ventas en vivo y los pedidos por QR tienen valor desde el primer evento, sin importar el tamaño de la plataforma.

### 5. Apoyate en comunidades que ya existen

Tus primeros usuarios ya se juntan en algún lado: cuentas de Instagram, grupos de Facebook, clubes, ferias, asociaciones. Andá donde están en lugar de esperar que te encuentren. Una alianza con una sola comunidad bien conectada puede llenar una categoría entera.

### 6. Sumá vendedores ancla

Algunos nombres conocidos atraen tanto a compradores como a otros vendedores. En Nuddo, marcas de moda locales venden colecciones nuevas en el mismo catálogo que las prendas de segunda mano, lo que le da al marketplace una oferta reconocible desde el principio.

### 7. Subsidiá el lado difícil

Cero comisión para los primeros vendedores, ingresos garantizados, envío gratis para los primeros compradores. Pagá para que la experiencia inicial sea buena para el lado más difícil de ganar, y sacá el subsidio cuando el mercado funcione solo.

### 8. Eliminá los momentos donde se caen las operaciones

La liquidez no es solo una cuestión de números, sino de operaciones cerradas. En los marketplaces entre personas, las ventas se caen muchas veces después de acordadas: el pago da desconfianza o la entrega es demasiado complicada. Los pagos protegidos y el envío contratado como parte de la compra convierten el interés en ventas.

## Decisiones de producto que ayudan a arrancar

- **Un sistema de reputación desde el primer día,** para que los primeros compradores tengan un motivo para confiar en vendedores que no conocen.
- **Un panel de administración** que le permita a tu equipo cargar publicaciones, moderar y atender usuarios a mano.
- **Notificaciones y búsquedas guardadas,** para que un comprador que hoy no encontró algo se entere mañana.
- **Primero web,** para que la gente pueda probar sin descargar una app.

## Métricas para mirar

- Porcentaje de publicaciones que se venden en un período.
- Porcentaje de búsquedas que terminan en un contacto o una compra.
- Cuántos compradores y vendedores vuelven el mes siguiente.

Si estás planeando un marketplace, leé [cuánto cuesta hacer uno](/blog/how-much-does-it-cost-to-build-a-marketplace) y [contanos tu idea](/contact). Te ayudamos a pensar el plan de lanzamiento además del producto.
`,
      faq: [
        {
          question: "¿Qué lado del marketplace conviene atraer primero?",
          answer:
            "Normalmente la oferta, porque los vendedores con productos publicados suelen quedarse aunque vendan poco al principio, mientras que los compradores que encuentran un catálogo vacío rara vez vuelven.",
        },
        {
          question: "¿Qué es la liquidez en un marketplace?",
          answer:
            "Es el punto en el que los compradores encuentran lo que buscan y los vendedores venden en un tiempo razonable de forma consistente. Llegar a eso en un nicho vale más que estar flojo en muchos.",
        },
        {
          question: "¿Un marketplace nuevo debería cobrar comisión desde el primer día?",
          answer:
            "No necesariamente. Muchos marketplaces eliminan o reducen la comisión para los primeros usuarios del lado más difícil y la introducen cuando el mercado tiene suficiente actividad.",
        },
      ],
    },
  },
};

export default post;
