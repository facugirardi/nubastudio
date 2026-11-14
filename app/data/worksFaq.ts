import type { Lang } from "../lib/lang";

export type WorkFaq = { question: string; answer: string };

/**
 * Preguntas frecuentes de cada case study, por idioma. Se muestran al final del
 * caso y salen como FAQPage en el JSON-LD. Todo lo que dicen tiene que estar
 * respaldado por el caso en works.ts / works.es.ts.
 */
const WORKS_FAQ: Record<string, Record<Lang, WorkFaq[]>> = {
  nubapay: {
    en: [
      {
        question: "Do attendees need to download an app to use Nubapay?",
        answer:
          "No. Nubapay is web-first: attendees scan a QR or open a link, browse the digital menu and pay from their phone's browser, with nothing to install.",
      },
      {
        question: "How does Nubapay prevent fraud at pickup?",
        answer:
          "Every order gets a unique, single-use pickup QR with antifraud validation. Tickets are also hashed and recorded on Solana Mainnet through unickeys, so a QR cannot be reused or faked.",
      },
      {
        question: "What kind of events can use Nubapay?",
        answer:
          "The same system serves festivals, clubs, stadiums, private parties, fairs and food trucks. An event can go live in under 20 minutes, with no fixed costs and no extra hardware.",
      },
      {
        question: "Which technologies power Nubapay?",
        answer:
          "Next.js and TypeScript on the front end, a Python and Flask API with PostgreSQL, Mercado Pago for payments and Solana for verifiable tickets.",
      },
    ],
    es: [
      {
        question: "¿Los asistentes tienen que descargar una app para usar Nubapay?",
        answer:
          "No. Nubapay es web-first: los asistentes escanean un QR o abren un link, miran el menú digital y pagan desde el navegador del celular, sin instalar nada.",
      },
      {
        question: "¿Cómo evita Nubapay el fraude en el retiro?",
        answer:
          "Cada pedido recibe un QR de retiro único, de un solo uso y con validación antifraude. Además, los tickets se registran en Solana Mainnet a través de unickeys, así un QR no se puede reutilizar ni falsificar.",
      },
      {
        question: "¿Qué tipo de eventos pueden usar Nubapay?",
        answer:
          "El mismo sistema sirve para festivales, boliches, estadios, fiestas privadas, ferias y food trucks. Un evento puede estar funcionando en menos de 20 minutos, sin costos fijos ni hardware extra.",
      },
      {
        question: "¿Con qué tecnologías está hecho Nubapay?",
        answer:
          "Next.js y TypeScript en el frontend, una API en Python y Flask con PostgreSQL, Mercado Pago para los pagos y Solana para los tickets verificables.",
      },
    ],
  },
  kennedys: {
    en: [
      {
        question: "What did Nuba Studio build for Kennedy's Group?",
        answer:
          "We work as Kennedy's Group's ongoing full-stack team across three products: the public Next.js website, the Node.js and PostgreSQL API, and Loggia, the internal backoffice their team uses every day.",
      },
      {
        question: "What does the Loggia backoffice manage?",
        answer:
          "Loggia covers 14 product categories, booking management, shared itineraries with an inline booking flow and an owner report generator with PDF export.",
      },
      {
        question: "How does the property search work?",
        answer:
          "Guests search with filters that match the data, a sticky search and map on listings, and currency and sqm/sqft toggles. Every property resolves its country, region and area automatically through server-side reverse geocoding.",
      },
    ],
    es: [
      {
        question: "¿Qué desarrolló Nuba Studio para Kennedy's Group?",
        answer:
          "Somos el equipo full-stack continuo de Kennedy's Group en tres productos: el sitio público en Next.js, la API en Node.js y PostgreSQL, y Loggia, el backoffice interno que su equipo usa todos los días.",
      },
      {
        question: "¿Qué se gestiona desde el backoffice Loggia?",
        answer:
          "Loggia cubre 14 categorías de productos, la gestión de reservas, itinerarios compartidos con reserva integrada y un generador de reportes para propietarios con exportación a PDF.",
      },
      {
        question: "¿Cómo funciona la búsqueda de propiedades?",
        answer:
          "Los huéspedes buscan con filtros que coinciden con los datos, una búsqueda y un mapa fijos en el listado, y cambio de moneda y de m²/ft². Cada propiedad resuelve su país, región y zona automáticamente con geocodificación inversa en el servidor.",
      },
    ],
  },
  bausing: {
    en: [
      {
        question: "What is Bausing?",
        answer:
          "Bausing is a mattress e-commerce platform with a built-in digital wallet for Argentine pesos. The store and the wallet share one account and one session.",
      },
      {
        question: "How does the Bausing wallet work?",
        answer:
          "Customers hold a peso balance, watch it move and spend it at checkout without leaving for a payment provider, so paying with the wallet is part of the purchase instead of a separate errand.",
      },
      {
        question: "How do customers compare mattresses?",
        answer:
          "Every mattress carries the same structured specifications (size, firmness and materials), so models can be compared side by side and search and filters work on those attributes.",
      },
    ],
    es: [
      {
        question: "¿Qué es Bausing?",
        answer:
          "Bausing es un e-commerce de colchones con una billetera digital en pesos argentinos integrada. La tienda y la billetera comparten una misma cuenta y una misma sesión.",
      },
      {
        question: "¿Cómo funciona la billetera de Bausing?",
        answer:
          "Los clientes tienen un saldo en pesos, ven sus movimientos y lo usan en el checkout sin salir hacia un proveedor de pagos, así pagar con la billetera es parte de la compra y no un trámite aparte.",
      },
      {
        question: "¿Cómo comparan colchones los clientes?",
        answer:
          "Cada colchón tiene las mismas especificaciones estructuradas (medida, firmeza y materiales), así los modelos se comparan lado a lado y la búsqueda y los filtros funcionan sobre esos atributos.",
      },
    ],
  },
  nuddo: {
    en: [
      {
        question: "On which platforms is Nuddo available?",
        answer:
          "Nuddo is live on the web, the App Store and Google Play. All three run against a single Flask API, so listings, payments and shipping labels behave the same everywhere.",
      },
      {
        question: "How are payments protected on Nuddo?",
        answer:
          "Payments run through Mercado Pago with protection on both sides, so neither the buyer nor the seller has to trust a stranger on their own.",
      },
      {
        question: "How does shipping work?",
        answer:
          "Door-to-door shipping is part of the transaction, with standard or economical options depending on what the garment is worth, so buyers and sellers do not have to arrange the handoff themselves.",
      },
      {
        question: "Can brands sell on Nuddo?",
        answer:
          "Yes. Local fashion brands have their own space to show new collections alongside second-hand listings, in the same catalog.",
      },
    ],
    es: [
      {
        question: "¿En qué plataformas está disponible Nuddo?",
        answer:
          "Nuddo funciona en la web, App Store y Google Play. Las tres usan una misma API en Flask, así las publicaciones, los pagos y las etiquetas de envío se comportan igual en todos lados.",
      },
      {
        question: "¿Cómo se protegen los pagos en Nuddo?",
        answer:
          "Los pagos funcionan con Mercado Pago y protección para ambas partes, así ni el comprador ni el vendedor tienen que confiar solos en un desconocido.",
      },
      {
        question: "¿Cómo funcionan los envíos?",
        answer:
          "El envío puerta a puerta es parte de la operación, con opciones estándar o económicas según lo que vale la prenda, así compradores y vendedores no tienen que coordinar la entrega por su cuenta.",
      },
      {
        question: "¿Las marcas pueden vender en Nuddo?",
        answer:
          "Sí. Las marcas de moda locales tienen su propio espacio para mostrar colecciones nuevas junto a las prendas de segunda mano, en el mismo catálogo.",
      },
    ],
  },
  tivvu: {
    en: [
      {
        question: "What does Tivvu include?",
        answer:
          "Properties for sales and rentals, a client CRM, offers sent as a link with open tracking, bookings and availability, reports and owner statements, and a public website for each agency, all in one dashboard.",
      },
      {
        question: "Can an agency import its existing listings?",
        answer:
          "Yes. Tivvu includes a bulk importer for spreadsheets and portal feeds, so moving over takes an afternoon instead of a project.",
      },
      {
        question: "Can agencies edit their own website?",
        answer:
          "Yes. Every agency gets a public site with an editor to choose the layout, colors, fonts and content blocks, with no developer involved.",
      },
      {
        question: "In which languages does Tivvu work?",
        answer:
          "Eight languages across the app, the public site and the emails, with each email sent in the reader's language.",
      },
    ],
    es: [
      {
        question: "¿Qué incluye Tivvu?",
        answer:
          "Propiedades en venta y alquiler, un CRM de clientes, ofertas enviadas por link con seguimiento de aperturas, reservas y disponibilidad, reportes y estados de cuenta del propietario, y un sitio público para cada inmobiliaria, todo en un solo panel.",
      },
      {
        question: "¿Una inmobiliaria puede importar sus propiedades?",
        answer:
          "Sí. Tivvu incluye un importador masivo de planillas y feeds de portales, así la mudanza lleva una tarde y no un proyecto.",
      },
      {
        question: "¿Las inmobiliarias pueden editar su propio sitio?",
        answer:
          "Sí. Cada inmobiliaria tiene un sitio público con un editor para elegir el diseño, los colores, las tipografías y los bloques de contenido, sin necesidad de un desarrollador.",
      },
      {
        question: "¿En qué idiomas funciona Tivvu?",
        answer:
          "En ocho idiomas en la app, el sitio público y los emails, y cada email se envía en el idioma de quien lo lee.",
      },
    ],
  },
  ushuaia360: {
    en: [
      {
        question: "Does Ushuaia360 work without signal?",
        answer:
          "Yes. Navigation is 100% offline: you download the map, the GPS trace, the trail information and the 360° photos before leaving town, and then walk with no signal.",
      },
      {
        question: "What information does each trail include?",
        answer:
          "GPS traces, waypoints, distance, elevation and difficulty for every stretch, plus immersive 360° views of key points and nearby tourist places.",
      },
      {
        question: "Where can I download Ushuaia360?",
        answer:
          "The app is available on the App Store and Google Play, with a public hub at ushuaia360.com.",
      },
      {
        question: "How was Ushuaia360 built?",
        answer:
          "An Expo and React Native app for iOS and Android, a backend that stores routes, segments, waypoints and media, and a web admin to manage trails, GPS traces, panoramic photos and points of interest.",
      },
    ],
    es: [
      {
        question: "¿Ushuaia360 funciona sin señal?",
        answer:
          "Sí. La navegación es 100% offline: descargás el mapa, la traza GPS, la información del sendero y las fotos 360° antes de salir de la ciudad, y después caminás sin señal.",
      },
      {
        question: "¿Qué información tiene cada sendero?",
        answer:
          "Trazas GPS, puntos de referencia, distancia, desnivel y dificultad de cada tramo, más vistas 360° inmersivas de los puntos clave y de los lugares turísticos cercanos.",
      },
      {
        question: "¿Dónde se descarga Ushuaia360?",
        answer:
          "La app está disponible en App Store y Google Play, con un sitio público en ushuaia360.com.",
      },
      {
        question: "¿Cómo se desarrolló Ushuaia360?",
        answer:
          "Una app en Expo y React Native para iOS y Android, un backend que guarda rutas, tramos, puntos de referencia y contenido multimedia, y un panel web para gestionar senderos, trazas GPS, fotos panorámicas y puntos de interés.",
      },
    ],
  },
  checkrto: {
    en: [
      {
        question: "What does CheckRTO do?",
        answer:
          "CheckRTO digitizes mandatory vehicle technical inspections: it carries each inspection from intake to issued certificate as a single record, instead of paper forms and re-typed reports.",
      },
      {
        question: "How are reports and certificates generated?",
        answer:
          "Inspectors record each review against a structured checklist, and the report generates itself from what was entered. Certificates are issued digitally from that same record, so the document and the inspection always match.",
      },
      {
        question: "Can vehicle owners check the status of an inspection?",
        answer:
          "Yes. Owners have their own dashboard to follow a vehicle's status and history without calling anyone, while inspectors work from a queue.",
      },
    ],
    es: [
      {
        question: "¿Qué hace CheckRTO?",
        answer:
          "CheckRTO digitaliza la revisión técnica vehicular obligatoria: lleva cada inspección desde el ingreso hasta el certificado emitido como un único registro, en lugar de formularios en papel e informes que se vuelven a tipear.",
      },
      {
        question: "¿Cómo se generan los informes y los certificados?",
        answer:
          "Los inspectores cargan cada revisión en una lista de verificación estructurada y el informe se genera solo a partir de lo cargado. Los certificados se emiten en forma digital desde ese mismo registro, así el documento y la inspección siempre coinciden.",
      },
      {
        question: "¿Los dueños de los vehículos pueden ver el estado de la inspección?",
        answer:
          "Sí. Los propietarios tienen su propio panel para seguir el estado y el historial de un vehículo sin llamar a nadie, mientras los inspectores trabajan desde una cola de tareas.",
      },
    ],
  },
  "provia-consulting": {
    en: [
      {
        question: "Why was the Provia Consulting site built with Astro?",
        answer:
          "The site has no dynamic behavior that would justify shipping a framework to every visitor, so Astro publishes it as plain static HTML: it loads immediately, has no CMS or server to maintain and costs almost nothing to keep online.",
      },
      {
        question: "Who is the site written for?",
        answer:
          "Three audiences that read differently: private companies, organizations and municipalities. Each practice area explains the kind of work it involves and who it is for, so every visitor finds their own case.",
      },
      {
        question: "Where do inquiries come from?",
        answer:
          "Inquiry forms sit at the end of each service instead of on a single contact page, so every inquiry arrives from the service that prompted it.",
      },
    ],
    es: [
      {
        question: "¿Por qué el sitio de Provia Consulting está hecho con Astro?",
        answer:
          "El sitio no tiene comportamiento dinámico que justifique mandarle un framework a cada visitante, así que Astro lo publica como HTML estático: carga al instante, no tiene CMS ni servidor que mantener y cuesta casi nada tenerlo online.",
      },
      {
        question: "¿Para quién está escrito el sitio?",
        answer:
          "Para tres públicos que leen distinto: empresas privadas, organizaciones y municipios. Cada área de práctica explica el tipo de trabajo que implica y para quién es, así cada visitante encuentra su caso.",
      },
      {
        question: "¿Desde dónde llegan las consultas?",
        answer:
          "Los formularios de consulta están al final de cada servicio en lugar de en una sola página de contacto, así cada consulta llega desde el servicio que la motivó.",
      },
    ],
  },
  mes: {
    en: [
      {
        question: "Which products does the Més Capital site explain?",
        answer:
          "Leasing, pledge loans and surety insurance, in plain language and with the assets and guarantees each one covers, plus sector pages for agribusiness, wine, metalworking, construction and logistics.",
      },
      {
        question: "Who is the Més Capital website for?",
        answer:
          "Two audiences at once: productive companies looking for financing, and financial entities and vendors looking for origination.",
      },
      {
        question: "How does the contact flow work?",
        answer:
          "A consultation form collects the operation details, including product and province, so the team can return a first reading: which product fits and what information they will need.",
      },
    ],
    es: [
      {
        question: "¿Qué productos explica el sitio de Més Capital?",
        answer:
          "Leasing, prendarios y seguros de caución, en lenguaje simple y con los bienes y garantías que cubre cada uno, más páginas por sector para agro, vitivinicultura, metalmecánica, construcción y logística.",
      },
      {
        question: "¿Para quién es el sitio de Més Capital?",
        answer:
          "Para dos públicos a la vez: empresas productivas que buscan financiamiento y entidades financieras y proveedores que buscan originación.",
      },
      {
        question: "¿Cómo funciona el flujo de contacto?",
        answer:
          "Un formulario de consulta pide los datos de la operación, como el producto y la provincia, para que el equipo devuelva una primera lectura: qué producto encaja y qué información va a hacer falta.",
      },
    ],
  },
};

export function getWorkFaq(slug: string, lang: Lang): WorkFaq[] {
  return WORKS_FAQ[slug]?.[lang] ?? [];
}
