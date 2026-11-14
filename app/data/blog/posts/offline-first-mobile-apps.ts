import type { Post } from "../types";

const post: Post = {
  slug: "offline-first-mobile-apps",
  date: "2026-11-18",
  category: "industry",
  cases: ["ushuaia360"],
  content: {
    en: {
      title: "Offline-first apps: how to design an app that works without signal",
      seoTitle: "Offline-first apps: designing for no signal",
      description:
        "How to design and build a mobile app that works with no internet connection: downloads, maps, sync and UX decisions, from building a hiking app for Tierra del Fuego.",
      excerpt:
        "Tourism, field work, logistics, rural areas: many apps are used exactly where the signal dies. What changes when you design for offline from the start.",
      body: `
Most apps assume a connection. They load data when you open a screen, save when you tap a button and show a spinner while they wait. That works in a city. It fails on a mountain trail, in a warehouse basement, on a farm, in a subway or anywhere coverage is weak.

An **offline-first** app is designed the other way around: it works with the data it already has on the device and syncs with the server when there is a connection. The difference is not a feature you add at the end, it is an architecture decision.

## Who needs an offline-first app

- **Tourism and outdoors:** trails, parks, routes and guides.
- **Field work:** inspections, surveys, maintenance, sales visits.
- **Logistics:** deliveries, warehouses, drivers.
- **Agriculture and rural areas:** where coverage is the exception.
- **Events:** where thousands of people saturate the network at the same time.

## A real case: trails at the end of the world

[Ushuaia360](/cases/ushuaia360) is an app for exploring Tierra del Fuego, at the southern tip of Argentina: GPS-mapped trails, 360° views of key points and tourist places. Ushuaia is the end of the world, and that is exactly where the signal dies. The core mechanic had to be offline: download the map, the trace, the information and the 360 photos, then walk with no signal.

## Design decisions that change

### Decide what is downloadable

Not everything has to work offline. Define the unit the user downloads: a trail, a route, a work order, a catalog. In Ushuaia360, each trail includes its GPS trace, waypoints, distance, elevation, difficulty and media, and it is downloaded as a whole before leaving town.

### Make the state visible

Users need to know what is available without a connection. Clear labels such as "downloaded", "available offline" or "will sync when you are online" avoid the worst experience: discovering on the trail that something is missing.

### Download before you need it

Offer the download at the moment the user is still connected and planning: when they open a trail's detail, when they save it, when they start a shift. Show the size, because mobile data and storage matter.

### Maps and media are the heavy part

Text weighs nothing; maps and photos weigh a lot. Offline maps need tiles or vector data for the area, and 360° photos need careful compression. Balancing quality and download size is a big part of the work.

### Writing offline: queues and conflicts

If users also create data offline (an inspection, an order, a note), the app has to store it locally, queue it and send it when the connection comes back. You also need a rule for conflicts: what happens if the same record changed on the server in the meantime.

## The technical side, simply explained

- **Local storage:** the device keeps a database with what the user downloaded.
- **Sync:** when there is a connection, the app updates its data and sends what is pending.
- **Native location:** GPS works without internet, so navigation on a downloaded trace works with no signal at all.
- **An admin to manage content:** in Ushuaia360, a web admin manages trails, GPS traces, panoramic photos, waypoints and places, and the app downloads the latest version.

We built Ushuaia360 with React Native and Expo for iOS and Android, a Python backend and a Next.js web hub. Cross-platform technology was not a limitation for offline: we explain why in [native vs. React Native vs. PWA](/blog/native-vs-react-native-vs-pwa).

## What it adds to cost

Offline-first adds work: local storage, sync logic, download management and more testing. It is one of the factors we mention in [how much it costs to build an app](/blog/how-much-does-it-cost-to-build-an-app). But if your users work without signal, it is not optional: an app that fails exactly when it is needed will not be used twice.

## Testing in real conditions

Offline apps have to be tested in airplane mode, with weak signal, with a connection that drops in the middle of a sync and with a full phone. The bugs that matter appear in those conditions, not on the office Wi-Fi.

If your users work in the field, on the road or in places without coverage, [let's talk about your app](/contact).
`,
      faq: [
        {
          question: "Can a React Native app work offline?",
          answer:
            "Yes. React Native apps can store data locally, use GPS without a connection, show downloaded maps and media, and sync when the connection returns.",
        },
        {
          question: "Does GPS work without internet?",
          answer:
            "Yes. GPS positioning does not need a data connection. What needs to be downloaded in advance is the map and the route information.",
        },
        {
          question: "Can a web app work offline?",
          answer:
            "Partially. Progressive web apps can cache content, but storage limits and browser restrictions, especially on iPhone, make native or React Native apps more reliable for heavy offline use.",
        },
      ],
    },
    es: {
      title: "Apps offline: cómo diseñar una app que funcione sin señal",
      seoTitle: "Apps offline: cómo diseñar una app sin señal",
      description:
        "Cómo diseñar una app que funcione sin internet: descargas, mapas, sincronización y decisiones de UX, a partir de una app de senderismo en Tierra del Fuego.",
      excerpt:
        "Turismo, trabajo de campo, logística, zonas rurales: muchas apps se usan justo donde se corta la señal. Qué cambia cuando diseñás para offline desde el principio.",
      body: `
La mayoría de las apps dan por sentada una conexión. Cargan datos cuando abrís una pantalla, guardan cuando tocás un botón y muestran una ruedita mientras esperan. Eso funciona en una ciudad. Falla en un sendero de montaña, en el subsuelo de un depósito, en un campo, en el subte o en cualquier lugar con poca cobertura.

Una app **offline-first** está pensada al revés: funciona con los datos que ya tiene en el dispositivo y se sincroniza con el servidor cuando hay conexión. La diferencia no es una función que se agrega al final, es una decisión de arquitectura.

## Quién necesita una app offline-first

- **Turismo y aire libre:** senderos, parques, rutas y guías.
- **Trabajo de campo:** inspecciones, relevamientos, mantenimiento, visitas comerciales.
- **Logística:** repartos, depósitos, choferes.
- **Agro y zonas rurales:** donde la cobertura es la excepción.
- **Eventos:** donde miles de personas saturan la red al mismo tiempo.

## Un caso real: senderos en el fin del mundo

[Ushuaia360](/cases/ushuaia360) es una app para recorrer Tierra del Fuego: senderos mapeados con GPS, vistas 360° de los puntos clave y lugares turísticos. Ushuaia es el fin del mundo, y ahí es justamente donde se corta la señal. La mecánica central tenía que ser offline: descargar el mapa, la traza, la información y las fotos 360, y después caminar sin señal.

## Las decisiones de diseño que cambian

### Definí qué se puede descargar

No todo tiene que funcionar offline. Definí la unidad que descarga el usuario: un sendero, una ruta, una orden de trabajo, un catálogo. En Ushuaia360, cada sendero incluye su traza GPS, puntos de referencia, distancia, desnivel, dificultad y contenido multimedia, y se descarga completo antes de salir de la ciudad.

### Hacé visible el estado

El usuario necesita saber qué tiene disponible sin conexión. Etiquetas claras como "descargado", "disponible offline" o "se sincroniza cuando tengas conexión" evitan la peor experiencia: descubrir en pleno sendero que falta algo.

### Descargá antes de necesitarlo

Ofrecé la descarga cuando el usuario todavía está conectado y planificando: cuando abre el detalle de un sendero, cuando lo guarda, cuando empieza un turno. Mostrá el tamaño, porque los datos móviles y el espacio importan.

### Los mapas y las fotos son lo pesado

El texto no pesa nada; los mapas y las fotos pesan mucho. Los mapas offline necesitan los datos de la zona, y las fotos 360° necesitan una compresión cuidadosa. Equilibrar calidad y tamaño de descarga es una parte importante del trabajo.

### Escribir offline: colas y conflictos

Si el usuario también crea datos sin conexión (una inspección, un pedido, una nota), la app tiene que guardarlos localmente, ponerlos en cola y enviarlos cuando vuelve la señal. También hace falta una regla para los conflictos: qué pasa si el mismo registro cambió en el servidor mientras tanto.

## La parte técnica, explicada simple

- **Almacenamiento local:** el dispositivo guarda una base de datos con lo que el usuario descargó.
- **Sincronización:** cuando hay conexión, la app actualiza sus datos y manda lo pendiente.
- **Ubicación nativa:** el GPS funciona sin internet, así que la navegación sobre una traza descargada funciona sin nada de señal.
- **Un panel para gestionar el contenido:** en Ushuaia360, un panel web gestiona senderos, trazas GPS, fotos panorámicas, puntos de referencia y lugares, y la app descarga la última versión.

Desarrollamos Ushuaia360 con React Native y Expo para iOS y Android, un backend en Python y un sitio web en Next.js. La tecnología multiplataforma no fue un límite para el modo offline: explicamos por qué en [app nativa vs. React Native vs. PWA](/blog/native-vs-react-native-vs-pwa).

## Lo que suma al costo

El enfoque offline-first suma trabajo: almacenamiento local, lógica de sincronización, gestión de descargas y más pruebas. Es uno de los factores que mencionamos en [cuánto cuesta desarrollar una app](/blog/how-much-does-it-cost-to-build-an-app). Pero si tus usuarios trabajan sin señal, no es opcional: una app que falla justo cuando se la necesita no se usa dos veces.

## Probar en condiciones reales

Las apps offline se prueban en modo avión, con señal débil, con una conexión que se corta en medio de una sincronización y con el celular lleno. Los errores que importan aparecen en esas condiciones, no en el Wi-Fi de la oficina.

Si tus usuarios trabajan en el campo, en la ruta o en lugares sin cobertura, [hablemos de tu app](/contact).
`,
      faq: [
        {
          question: "¿Una app en React Native puede funcionar offline?",
          answer:
            "Sí. Las apps en React Native pueden guardar datos localmente, usar el GPS sin conexión, mostrar mapas y contenido descargados y sincronizar cuando vuelve la conexión.",
        },
        {
          question: "¿El GPS funciona sin internet?",
          answer:
            "Sí. El posicionamiento GPS no necesita conexión de datos. Lo que hay que descargar con anticipación es el mapa y la información de la ruta.",
        },
        {
          question: "¿Una web app puede funcionar offline?",
          answer:
            "En parte. Las web apps progresivas pueden guardar contenido en caché, pero los límites de almacenamiento y las restricciones de los navegadores, sobre todo en iPhone, hacen que las apps nativas o en React Native sean más confiables para un uso offline intensivo.",
        },
      ],
    },
  },
};

export default post;
