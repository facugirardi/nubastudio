import type { Post } from "../types";

const post: Post = {
  slug: "native-vs-react-native-vs-pwa",
  date: "2026-11-14",
  category: "costs",
  cases: ["ushuaia360", "nubapay"],
  content: {
    en: {
      title: "Native app vs. React Native vs. PWA: which one does your business need?",
      seoTitle: "Native vs. React Native vs. PWA: which to choose",
      description:
        "Native, cross-platform with React Native, or a progressive web app? A plain-language comparison of cost, speed, performance and when each one makes sense.",
      excerpt:
        "Three ways to put your product on a phone, with very different costs. A plain comparison, without the technical jargon, to help you choose.",
      body: `
When you decide to "make an app", there are three very different ways to do it. The choice changes the budget, the timeline and what your product can do, so it is worth understanding before you ask for quotes.

## The three options in one sentence each

- **Native app:** two separate apps, one written for iPhone (Swift) and one for Android (Kotlin).
- **Cross-platform (React Native):** one codebase that produces real apps for both stores.
- **PWA (progressive web app):** a website that can be installed on the phone's home screen and behaves like an app.

## Side by side

| | Native | React Native | PWA |
|---|---|---|---|
| Relative cost | Highest (two apps) | Medium (one codebase) | Lowest |
| Time to launch | Slowest | Fast | Fastest |
| App Store and Google Play | Yes | Yes | No (installed from the browser) |
| Performance | Best possible | Near native for most apps | Good, depends on the browser |
| Camera, GPS, offline | Full access | Full access | Partial, especially on iPhone |
| Push notifications | Yes | Yes | Limited on iPhone |
| One update for everyone | No | Mostly | Yes, instantly |

## When native makes sense

Native is the right call when the app pushes the phone to its limits: heavy 3D, advanced video editing, augmented reality, or deep integration with very new hardware features. It is also common in large companies that already have separate iOS and Android teams.

For most startups and businesses, native means paying for the same product twice.

## When React Native makes sense

For the vast majority of products we build, React Native is the sweet spot. You get real apps in both stores, access to the camera, GPS, notifications and offline storage, and one team writing one codebase. That usually means 30 to 40 percent less cost than going native.

[Ushuaia360](/cases/ushuaia360) is a good example: a hiking app with GPS traces, 360° photos and full offline navigation, built with React Native and Expo, live on both the App Store and Google Play. If an app can work at the end of the world with no signal, the technology is not the bottleneck. The same goes for apps people open every week, like a [sports field booking app](/blog/sports-field-booking-app), where notifications and a saved payment method make the difference.

## When a PWA (or a plain web app) makes sense

A PWA is ideal when people will use the product occasionally and you do not want to force a download. Think ordering at a venue, booking a one-time service or checking a status.

In [Nubapay](/cases/nubapay), attendees at massive events scan a QR, order and pay from their phone browser without installing anything. At a festival with a line of people, "download our app first" is a lost sale. Choosing the web there was a product decision, not a budget one.

## Questions to decide

1. **Will people use it every week?** If yes, an app in the stores earns its place on the home screen. If not, the web is probably enough.
2. **Do you need push notifications on iPhone?** If they are central to the business, go with React Native.
3. **Does it need to work without signal?** Full offline points to React Native or native.
4. **How sure are you about the idea?** If you are still validating, start on the web and move to apps when you know people come back.

## Our recommendation

For a new product: **web or PWA to validate, React Native to grow**, native only if there is a specific technical reason. And whatever you choose, keep the backend separate from the app so you can add a new channel later without rebuilding everything.

If you are not sure which one fits your case, [we can help you decide](/contact). It is usually a 30-minute conversation. You can also check [how much an app costs](/blog/how-much-does-it-cost-to-build-an-app) with each approach.
`,
      faq: [
        {
          question: "Is React Native as good as native?",
          answer:
            "For most business apps, users cannot tell the difference. Native still wins for very demanding graphics, advanced video or brand-new hardware features.",
        },
        {
          question: "Can a PWA be published on the App Store?",
          answer:
            "Not directly. A PWA is installed from the browser. Google Play accepts PWAs packaged in a wrapper, but Apple's App Store requires a real app, which is where React Native comes in.",
        },
        {
          question: "Can I start with a PWA and move to an app later?",
          answer:
            "Yes, and it is a common path. If the backend is built as a separate API, the same business logic can serve the web and a future React Native app.",
        },
      ],
    },
    es: {
      title: "App nativa vs. React Native vs. PWA: ¿cuál necesita tu negocio?",
      seoTitle: "App nativa vs. React Native vs. PWA: cuál elegir",
      description:
        "¿Nativa, multiplataforma con React Native o una web app progresiva? Una comparación clara de costo, velocidad, rendimiento y cuándo conviene cada una.",
      excerpt:
        "Tres formas de llevar tu producto al celular, con costos muy distintos. Una comparación clara, sin jerga técnica, para ayudarte a elegir.",
      body: `
Cuando decidís "hacer una app", hay tres formas muy distintas de hacerla. La elección cambia el presupuesto, los plazos y lo que tu producto puede hacer, así que vale la pena entenderla antes de pedir presupuestos.

## Las tres opciones en una frase cada una

- **App nativa:** dos apps separadas, una escrita para iPhone (Swift) y otra para Android (Kotlin).
- **Multiplataforma (React Native):** un solo código que genera apps reales para las dos tiendas.
- **PWA (web app progresiva):** un sitio web que se puede instalar en la pantalla del celular y se comporta como una app.

## Comparación lado a lado

| | Nativa | React Native | PWA |
|---|---|---|---|
| Costo relativo | El más alto (dos apps) | Medio (un solo código) | El más bajo |
| Tiempo de lanzamiento | El más lento | Rápido | El más rápido |
| App Store y Google Play | Sí | Sí | No (se instala desde el navegador) |
| Rendimiento | El mejor posible | Casi nativo en la mayoría de las apps | Bueno, depende del navegador |
| Cámara, GPS, offline | Acceso completo | Acceso completo | Parcial, sobre todo en iPhone |
| Notificaciones push | Sí | Sí | Limitadas en iPhone |
| Una actualización para todos | No | Casi siempre | Sí, al instante |

## Cuándo conviene una app nativa

La nativa es la opción correcta cuando la app exige al máximo al celular: 3D pesado, edición de video avanzada, realidad aumentada o integración profunda con funciones de hardware muy nuevas. También es común en empresas grandes que ya tienen equipos separados de iOS y Android.

Para la mayoría de las startups y los negocios, ir a nativo significa pagar dos veces el mismo producto.

## Cuándo conviene React Native

Para la gran mayoría de los productos que construimos, React Native es el punto justo. Tenés apps reales en las dos tiendas, acceso a la cámara, el GPS, las notificaciones y el almacenamiento offline, y un solo equipo escribiendo un solo código. Eso suele significar entre un 30 y un 40 por ciento menos de costo que ir a nativo.

[Ushuaia360](/cases/ushuaia360) es un buen ejemplo: una app de senderismo con trazas GPS, fotos 360° y navegación offline completa, hecha con React Native y Expo, publicada en App Store y Google Play. Si una app puede funcionar sin señal en el fin del mundo, la tecnología no es el límite. Lo mismo vale para apps que la gente abre todas las semanas, como una [app de reserva de canchas](/blog/sports-field-booking-app), donde las notificaciones y tener el pago guardado hacen la diferencia.

## Cuándo conviene una PWA (o una web app)

Una PWA es ideal cuando la gente va a usar el producto de vez en cuando y no querés obligarla a descargar nada. Pensá en pedir en un local, reservar un servicio puntual o consultar un estado.

En [Nubapay](/cases/nubapay), la gente en eventos masivos escanea un QR, pide y paga desde el navegador del celular sin instalar nada. En un festival con una fila de gente, "primero descargá nuestra app" es una venta perdida. Elegir la web ahí fue una decisión de producto, no de presupuesto.

## Preguntas para decidir

1. **¿La gente lo va a usar todas las semanas?** Si sí, una app en las tiendas se gana su lugar en la pantalla. Si no, probablemente alcance con la web.
2. **¿Necesitás notificaciones push en iPhone?** Si son centrales para el negocio, andá por React Native.
3. **¿Tiene que funcionar sin señal?** Un modo offline completo apunta a React Native o nativo.
4. **¿Qué tan seguro estás de la idea?** Si todavía estás validando, empezá por la web y pasá a apps cuando sepas que la gente vuelve.

## Nuestra recomendación

Para un producto nuevo: **web o PWA para validar, React Native para crecer**, y nativo solo si hay una razón técnica concreta. Elijas lo que elijas, mantené el backend separado de la app para poder sumar un canal nuevo más adelante sin rehacer todo.

Si no tenés claro cuál te sirve, [te ayudamos a decidir](/contact). Suele ser una charla de media hora. También podés ver [cuánto cuesta una app](/blog/how-much-does-it-cost-to-build-an-app) con cada enfoque.
`,
      faq: [
        {
          question: "¿React Native es tan bueno como una app nativa?",
          answer:
            "Para la mayoría de las apps de negocio, los usuarios no notan la diferencia. La nativa sigue ganando en gráficos muy exigentes, video avanzado o funciones de hardware muy nuevas.",
        },
        {
          question: "¿Se puede publicar una PWA en la App Store?",
          answer:
            "No directamente. Una PWA se instala desde el navegador. Google Play acepta PWAs empaquetadas, pero la App Store de Apple exige una app real, y ahí entra React Native.",
        },
        {
          question: "¿Puedo empezar con una PWA y pasar a una app después?",
          answer:
            "Sí, y es un camino común. Si el backend está hecho como una API separada, la misma lógica de negocio puede servir a la web y a una futura app en React Native.",
        },
      ],
    },
  },
};

export default post;
