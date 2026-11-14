import type { Post } from "../types";

const post: Post = {
  slug: "how-to-build-a-second-hand-fashion-marketplace",
  date: "2026-11-23",
  category: "industry",
  cases: ["nuddo"],
  content: {
    en: {
      title: "How to build a second-hand fashion marketplace",
      description:
        "What a circular fashion marketplace needs to work: fast listing, protected payments, built-in shipping and reputation. Lessons from building Nuddo.",
      excerpt:
        "Resale collapses at three points: listing is tedious, paying a stranger feels unsafe and the handoff kills the deal. How to design a marketplace that solves all three.",
      body: `
Second-hand fashion is one of the fastest-growing categories in e-commerce. Buyers want lower prices and less waste, sellers want to turn their closet into money. And yet most people still sell through Instagram posts, WhatsApp groups and Facebook Marketplace, with all the friction that comes with them.

We built [Nuddo](/cases/nuddo), a circular fashion marketplace on web, iOS and Android. This is what we learned about what such a product needs.

## Where resale breaks down

Selling a garment you no longer wear should take minutes. In practice, resale collapses at three points:

1. **Publishing is tedious,** so the item never gets listed.
2. **Paying a stranger feels unsafe,** for both sides.
3. **Arranging the handoff kills the deal,** even after the price was agreed.

A good marketplace is designed so that none of those three points requires a decision from the user.

## 1. Listing in a few steps

Supply is everything in a marketplace, and in fashion supply comes from people who are not professional sellers. If listing a garment feels like a project, they postpone it forever.

In Nuddo, listing an item takes a few steps. The sequence mattered: we designed and tested the selling flow first, because a marketplace with no inventory has nothing to sell, and every other screen was built around keeping that flow short.

Practical rules for a good listing flow:

- Photos first, straight from the camera.
- Only the fields that buyers filter by: category, size, condition, price.
- Smart defaults and suggestions instead of empty fields.
- Publish first, edit details later.

## 2. Payments with protection on both sides

Neither the buyer nor the seller should have to trust a stranger on their own. Payments in Nuddo run through Mercado Pago with protection on both sides, so the money is handled by the platform instead of a bank transfer between people who have never met.

This is also where the business model lives: the platform can take its commission as part of the transaction. If you want to understand the costs involved, we cover them in [how much a marketplace costs](/blog/how-much-does-it-cost-to-build-a-marketplace).

## 3. Shipping as part of the purchase

The moment where most peer-to-peer deals die is after they are agreed: "where do we meet?", "who pays shipping?". In Nuddo, door-to-door shipping is part of the transaction, with standard or economical options depending on what the garment is worth. The buyer pays, the label is generated, and nobody has to negotiate anything afterwards.

## Trust: reputation before the purchase

A reputation system makes a seller's history visible before the purchase, not after. Ratings, reviews and completed sales let people who have never met trade with confidence. Without it, buyers fall back on the only safe option they know: not buying.

## Room for brands

Second-hand marketplaces can also become a channel for new products. Nuddo gives local fashion brands their own space to show new collections alongside second-hand listings. It adds recognizable supply to the catalog and a revenue line beyond peer-to-peer sales.

## Web, iOS and Android from one backend

Fashion is browsed on the phone, but many people still discover products from a link. Nuddo runs on web, the App Store and Google Play against a single Flask API, so a listing, a payment and a shipping label behave identically wherever they are created. React Native covers both mobile platforms from one codebase, and the web is built in Next.js. More on that choice in [native vs. React Native vs. PWA](/blog/native-vs-react-native-vs-pwa).

## Before launching: solve the empty catalog

The hardest part of a new marketplace is not the code, it is the first hundred listings. We wrote a full guide on [the chicken-and-egg problem](/blog/marketplace-chicken-and-egg-problem) with tactics to get there.

If you are building a resale, rental or circular economy marketplace, [we would like to hear about it](/contact).
`,
      faq: [
        {
          question: "What features does a second-hand clothing app need?",
          answer:
            "Fast listing with photos, filters by size, category and condition, protected payments, integrated shipping, a reputation system and an admin panel for moderation and disputes.",
        },
        {
          question: "How do second-hand marketplaces make money?",
          answer:
            "Usually with a commission on each sale, sometimes combined with shipping fees, featured listings or a paid space for brands selling new products.",
        },
        {
          question: "Should I launch on web or as an app first?",
          answer:
            "Web is usually the cheapest way to validate demand. Fashion resale benefits from apps because people browse often, so many marketplaces launch both from a shared backend.",
        },
      ],
    },
    es: {
      title: "Cómo desarrollar un marketplace de ropa de segunda mano",
      seoTitle: "Cómo crear un marketplace de ropa usada",
      description:
        "Qué necesita un marketplace de moda circular para funcionar: publicar rápido, pagos protegidos, envíos integrados y reputación. Lo que aprendimos con Nuddo.",
      excerpt:
        "La reventa se cae en tres puntos: publicar da fiaca, pagarle a un desconocido da desconfianza y coordinar la entrega mata la venta. Cómo diseñar un marketplace que resuelva los tres.",
      body: `
La moda de segunda mano es una de las categorías que más crece en el comercio electrónico. Los compradores quieren precios más bajos y menos desperdicio; los vendedores, convertir su placard en plata. Y sin embargo la mayoría sigue vendiendo por Instagram, grupos de WhatsApp y Facebook Marketplace, con toda la fricción que eso implica.

Desarrollamos [Nuddo](/cases/nuddo), un marketplace de moda circular para web, iOS y Android. Esto es lo que aprendimos sobre lo que necesita un producto así.

## Dónde se rompe la reventa

Vender una prenda que ya no usás debería llevar minutos. En la práctica, la reventa se cae en tres puntos:

1. **Publicar es tedioso,** así que la prenda nunca se publica.
2. **Pagarle a un desconocido da desconfianza,** de los dos lados.
3. **Coordinar la entrega mata la venta,** incluso después de acordar el precio.

Un buen marketplace está diseñado para que ninguno de esos tres puntos requiera una decisión del usuario.

## 1. Publicar en pocos pasos

En un marketplace la oferta es todo, y en moda la oferta viene de personas que no son vendedores profesionales. Si publicar una prenda se siente como un proyecto, lo postergan para siempre.

En Nuddo, publicar una prenda lleva pocos pasos. El orden importó: diseñamos y probamos primero el flujo de venta, porque un marketplace sin productos no tiene nada que vender, y todas las demás pantallas se construyeron alrededor de mantener ese flujo corto.

Reglas prácticas para un buen flujo de publicación:

- Fotos primero, directo desde la cámara.
- Solo los campos por los que filtran los compradores: categoría, talle, estado, precio.
- Valores por defecto y sugerencias en lugar de campos vacíos.
- Publicar primero y editar detalles después.

## 2. Pagos con protección para las dos partes

Ni el comprador ni el vendedor deberían tener que confiar solos en un desconocido. Los pagos en Nuddo funcionan con Mercado Pago y protección para ambas partes, así la plata la maneja la plataforma en lugar de una transferencia entre personas que nunca se vieron.

Ahí también vive el modelo de negocio: la plataforma puede cobrar su comisión como parte de la operación. Si querés entender los costos, los repasamos en [cuánto cuesta hacer un marketplace](/blog/how-much-does-it-cost-to-build-a-marketplace).

## 3. El envío como parte de la compra

El momento en que se caen la mayoría de las ventas entre personas es después de acordarlas: "¿dónde nos vemos?", "¿quién paga el envío?". En Nuddo, el envío puerta a puerta es parte de la operación, con opciones estándar o económicas según lo que vale la prenda. El comprador paga, se genera la etiqueta y nadie tiene que negociar nada después.

## Confianza: la reputación antes de comprar

Un sistema de reputación muestra el historial del vendedor antes de la compra, no después. Calificaciones, reseñas y ventas completadas permiten que personas que nunca se vieron compren y vendan con confianza. Sin eso, los compradores vuelven a la única opción segura que conocen: no comprar.

## Lugar para las marcas

Los marketplaces de segunda mano también pueden ser un canal para productos nuevos. Nuddo les da a las marcas de moda locales su propio espacio para mostrar colecciones nuevas junto a las prendas usadas. Suma oferta reconocible al catálogo y una línea de ingresos más allá de las ventas entre personas.

## Web, iOS y Android con un solo backend

La moda se mira en el celular, pero mucha gente todavía descubre productos desde un link. Nuddo funciona en la web, App Store y Google Play sobre una única API en Flask, así una publicación, un pago y una etiqueta de envío se comportan igual sin importar dónde se crearon. React Native cubre las dos plataformas móviles con un solo código, y la web está hecha en Next.js. Más sobre esa decisión en [app nativa vs. React Native vs. PWA](/blog/native-vs-react-native-vs-pwa).

## Antes de lanzar: resolvé el catálogo vacío

Lo más difícil de un marketplace nuevo no es el código, son las primeras cien publicaciones. Escribimos una guía completa sobre [el problema del huevo y la gallina](/blog/marketplace-chicken-and-egg-problem) con tácticas para llegar.

Si estás construyendo un marketplace de reventa, alquiler o economía circular, [nos encantaría conocerlo](/contact).
`,
      faq: [
        {
          question: "¿Qué funciones necesita una app de ropa de segunda mano?",
          answer:
            "Publicación rápida con fotos, filtros por talle, categoría y estado, pagos protegidos, envíos integrados, un sistema de reputación y un panel de administración para moderar y resolver disputas.",
        },
        {
          question: "¿Cómo ganan plata los marketplaces de segunda mano?",
          answer:
            "Normalmente con una comisión por venta, a veces combinada con cargos de envío, publicaciones destacadas o un espacio pago para marcas que venden productos nuevos.",
        },
        {
          question: "¿Conviene lanzar primero en la web o como app?",
          answer:
            "La web suele ser la forma más barata de validar la demanda. La reventa de moda se beneficia de las apps porque la gente entra seguido, así que muchos marketplaces lanzan las dos sobre un backend compartido.",
        },
      ],
    },
  },
};

export default post;
