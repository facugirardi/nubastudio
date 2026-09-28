import type { Lang } from "./i18n";

/**
 * Diccionario de todo el copy visible del sitio (fuera de los case studies,
 * que viven en works.ts + works.es.ts). "en" es la fuente original; "es" debe
 * mantener la misma forma.
 */
const dict = {
  en: {
    nav: {
      work: "Works",
      about: "About",
      services: "Services",
      contact: "Contact",
      menuWord: "menu",
      close: "close",
      langToggleLabel: "Switch to Spanish",
      viewSpiral: "spiral",
      viewList: "list",
    },
    works: {
      heading: "Selected Works",
      grid: "Grid",
      list: "List",
      feed: "Feed",
      scrollToExplore: "scroll to explore",
      viewMore: "View more",
    },
    about: {
      lead1: "We turn",
      lead2: "into experiences",
      lead3: "that move people.",
      rotatingWords: ["branding", "interaction", "code"],
      sub: "Three disciplines, one process. Nothing is handed off, so every experience holds together, and every detail earns its place.",
      origin: [
        "Nuba started from a simple conviction: the best products come from teams that never hand the work off. One table, three disciplines, the same conversation from first sketch to last deploy.",
        "We design and build sites, apps, marketplaces and platforms. The scope changes with every project. The way we work doesn't.",
      ],
      theStudio: "The studio",
      basedIn: "Based in",
      since: "Since",
      projectsShipped: "Projects shipped",
      thePeople: "The people",
      roles: { Design: "Design", Development: "Development", Strategy: "Strategy" },
      getInTouch: "Get in touch",
      ctaHeadingPre: "Let's build something",
      ctaHeadingAccent: "great",
      footerLeft: "Design & Development",
    },
    services: {
      intro: "We design and build digital products end to end, from the first idea to the moment they ship.",
      introAccent: "products",
      list: [
        { title: "Web Development", desc: "Sites and platforms that load fast, feel alive and turn visitors into clients." },
        { title: "Mobile Apps", desc: "Native-feeling iOS & Android products people actually want to open." },
        { title: "Marketplaces & Platforms", desc: "Two-sided products with payments, dashboards and infrastructure built to scale." },
        { title: "Branding & Identity", desc: "Visual systems that make you unmistakable across every touchpoint." },
        { title: "Product Strategy & MVP", desc: "From raw idea to a shipped MVP, validated, scoped and built to grow." },
      ],
      relatedWork: "Related work",
      process: [
        { title: "Discovery", desc: "We dig into your goals, your users and the constraints that shape the work." },
        { title: "Design", desc: "From wireframes to polished UI, iterated fast and in the open." },
        { title: "Build", desc: "Clean, scalable code shipped in tight loops, no black boxes." },
        { title: "Launch & Iterate", desc: "We ship, measure what matters and keep improving after go-live." },
      ],
      howWeWorkPre: "How we",
      howWeWorkAccent: "work",
      faqHeadingPre: "Frequently",
      faqHeadingAccent: "asked",
      ctaLabel: "Have a project in mind?",
      ctaTitleLine1: "Let's build",
      ctaTitleLine2Pre: "something",
      ctaTitleAccent: "real",
    },
    faq: [
      {
        question: "How long does a project take?",
        answer:
          "It depends on scope, but most projects run between two and four months from kickoff to launch. A focused site lands at the shorter end; a marketplace or an app with a backend behind it sits at the longer one. We give you a real range once we understand what you are building, not before.",
      },
      {
        question: "Do you handle both design and development?",
        answer:
          "Both, and that is the point. Design, interaction and code happen at the same table, so nothing gets handed off between teams and lost along the way. You do not need to bring your own designer or your own developers.",
      },
      {
        question: "Do you work with clients outside Argentina?",
        answer:
          "Yes. The studio is based in Córdoba and works remotely with clients across Latin America and beyond. We work in English or Spanish, whichever suits your team.",
      },
      {
        question: "Do you offer maintenance after launch?",
        answer:
          "Yes. Launch is rarely the end of a product. We stay on for maintenance and continuous improvement when you want us to: for Kennedy's Group we are the ongoing full-stack team, still shipping features long after the first release.",
      },
      {
        question: "How do you structure contracts?",
        answer:
          "Per project. We scope the work upfront and agree on what is included before anything starts, so you know what you are getting and what it covers.",
      },
      {
        question: "What technologies do you work with?",
        answer:
          "Next.js, React and TypeScript on the web; React Native and Expo for iOS and Android; Node and Python on the backend, usually with PostgreSQL. We pick the stack that fits the product, not the other way around.",
      },
    ],
    contact: {
      headline: "Let's build something together.",
      sub: "Write what you need, however rough. We'll tidy it into a proper message and open it in WhatsApp.",
      placeholder: "A website for my coffee shop, with online booking. Ready before December.",
      seeds: [
        { label: "a website", text: "I need a website for " },
        { label: "a mobile app", text: "I need a mobile app for " },
        { label: "a marketplace", text: "I want to build a marketplace for " },
        { label: "not sure yet", text: "I have an idea but I'm not sure where to start. " },
      ],
      polishing: "Writing your draft",
      error: "AI unavailable",
      undo: "Undo",
      polish: "Polish with AI",
      polishBusy: "Polishing",
      send: "Send",
      recentWork: "Recent work",
      place: "Córdoba, Argentina",
    },
    caseStudy: {
      home: "Home",
      scroll: "scroll",
      liveSite: "Live site",
      iosApp: "iOS App",
      androidApp: "Android App",
      behance: "Behance",
      challenge: "The Challenge",
      solution: "The Solution",
      process: "The Process",
      keyFeatures: "Key features",
      theResult: "The Result",
      nextProject: "Next project",
    },
    notFound: {
      errorLabel: "Error 404",
      heading: "This page doesn't exist.",
      body: "The link may be broken or the page may have moved. Everything we've built is still one click away.",
      backHome: "Back home",
      services: "Services",
      contact: "Contact",
    },
  },
  es: {
    nav: {
      work: "Trabajos",
      about: "Nosotros",
      services: "Servicios",
      contact: "Contacto",
      menuWord: "menú",
      close: "cerrar",
      langToggleLabel: "Cambiar a inglés",
      viewSpiral: "spiral",
      viewList: "lista",
    },
    works: {
      heading: "Trabajos seleccionados",
      grid: "Grilla",
      list: "Lista",
      feed: "Feed",
      scrollToExplore: "scrollea para explorar",
      viewMore: "Ver más",
    },
    about: {
      lead1: "Convertimos",
      lead2: "en experiencias",
      lead3: "que mueven a la gente.",
      rotatingWords: ["marca", "interacción", "código"],
      sub: "Tres disciplinas, un solo proceso. Nada se delega a otro equipo, así cada experiencia se sostiene y cada detalle tiene su lugar.",
      origin: [
        "Nuba nació de una convicción simple: los mejores productos salen de equipos que nunca delegan el trabajo. Una sola mesa, tres disciplinas, la misma conversación desde el primer boceto hasta el último deploy.",
        "Diseñamos y construimos sitios, apps, marketplaces y plataformas. El alcance cambia en cada proyecto. La forma de trabajar, no.",
      ],
      theStudio: "El estudio",
      basedIn: "Ubicados en",
      since: "Desde",
      projectsShipped: "Proyectos lanzados",
      thePeople: "El equipo",
      roles: { Design: "Diseño", Development: "Desarrollo", Strategy: "Estrategia" },
      getInTouch: "Hablemos",
      ctaHeadingPre: "Construyamos algo",
      ctaHeadingAccent: "grande",
      footerLeft: "Diseño y Desarrollo",
    },
    services: {
      intro: "Diseñamos y construimos productos digitales de punta a punta, desde la primera idea hasta el lanzamiento.",
      introAccent: "productos",
      list: [
        { title: "Desarrollo Web", desc: "Sitios y plataformas que cargan rápido, se sienten vivos y convierten visitantes en clientes." },
        { title: "Apps Móviles", desc: "Productos iOS y Android con sensación nativa que la gente realmente quiere abrir." },
        { title: "Marketplaces y Plataformas", desc: "Productos de dos lados con pagos, dashboards e infraestructura construida para escalar." },
        { title: "Branding e Identidad", desc: "Sistemas visuales que te hacen inconfundible en cada punto de contacto." },
        { title: "Estrategia de Producto y MVP", desc: "De una idea en bruto a un MVP lanzado, validado, definido y construido para crecer." },
      ],
      relatedWork: "Trabajo relacionado",
      process: [
        { title: "Descubrimiento", desc: "Nos metemos en tus objetivos, tus usuarios y las restricciones que definen el trabajo." },
        { title: "Diseño", desc: "De wireframes a una UI pulida, iterando rápido y de forma transparente." },
        { title: "Construcción", desc: "Código limpio y escalable, entregado en ciclos cortos, sin cajas negras." },
        { title: "Lanzamiento e Iteración", desc: "Lanzamos, medimos lo que importa y seguimos mejorando después del go-live." },
      ],
      howWeWorkPre: "Cómo",
      howWeWorkAccent: "trabajamos",
      faqHeadingPre: "Preguntas",
      faqHeadingAccent: "frecuentes",
      ctaLabel: "¿Tenés un proyecto en mente?",
      ctaTitleLine1: "Construyamos",
      ctaTitleLine2Pre: "algo",
      ctaTitleAccent: "real",
    },
    faq: [
      {
        question: "¿Cuánto dura un proyecto?",
        answer:
          "Depende del alcance, pero la mayoría de los proyectos duran entre dos y cuatro meses desde el arranque hasta el lanzamiento. Un sitio acotado queda en la punta más corta; un marketplace o una app con backend detrás, en la más larga. Te damos un rango real una vez que entendemos qué estás construyendo, no antes.",
      },
      {
        question: "¿Se encargan del diseño y del desarrollo?",
        answer:
          "Los dos, y ese es el punto. Diseño, interacción y código pasan por la misma mesa, así nada se pierde al pasar de un equipo a otro. No necesitás traer tu propio diseñador ni tus propios desarrolladores.",
      },
      {
        question: "¿Trabajan con clientes fuera de Argentina?",
        answer:
          "Sí. El estudio está en Córdoba y trabaja de forma remota con clientes en toda Latinoamérica y más allá. Trabajamos en inglés o en español, según lo que le quede mejor a tu equipo.",
      },
      {
        question: "¿Ofrecen mantenimiento después del lanzamiento?",
        answer:
          "Sí. El lanzamiento casi nunca es el final de un producto. Seguimos con mantenimiento y mejora continua cuando lo necesitás: para Kennedy's Group somos el equipo full-stack permanente, todavía entregando funcionalidades mucho después del primer release.",
      },
      {
        question: "¿Cómo estructuran los contratos?",
        answer:
          "Por proyecto. Definimos el alcance de antemano y acordamos qué está incluido antes de arrancar, así sabés exactamente qué recibís y qué cubre.",
      },
      {
        question: "¿Con qué tecnologías trabajan?",
        answer:
          "Next.js, React y TypeScript en la web; React Native y Expo para iOS y Android; Node y Python en el backend, generalmente con PostgreSQL. Elegimos el stack que le queda al producto, no al revés.",
      },
    ],
    contact: {
      headline: "Construyamos algo juntos.",
      sub: "Escribí lo que necesitás, aunque sea en borrador. Lo prolijamos en un mensaje claro y lo abrimos en WhatsApp.",
      placeholder: "Un sitio web para mi cafetería, con reservas online. Listo antes de diciembre.",
      seeds: [
        { label: "un sitio web", text: "Necesito un sitio web para " },
        { label: "una app móvil", text: "Necesito una app móvil para " },
        { label: "un marketplace", text: "Quiero construir un marketplace para " },
        { label: "todavía no sé", text: "Tengo una idea pero no estoy seguro de por dónde empezar. " },
      ],
      polishing: "Escribiendo tu borrador",
      error: "IA no disponible",
      undo: "Deshacer",
      polish: "Mejorar con IA",
      polishBusy: "Mejorando",
      send: "Enviar",
      recentWork: "Trabajo reciente",
      place: "Córdoba, Argentina",
    },
    caseStudy: {
      home: "Inicio",
      scroll: "scroll",
      liveSite: "Sitio en vivo",
      iosApp: "App iOS",
      androidApp: "App Android",
      behance: "Behance",
      challenge: "El Desafío",
      solution: "La Solución",
      process: "El Proceso",
      keyFeatures: "Funcionalidades clave",
      theResult: "El Resultado",
      nextProject: "Próximo proyecto",
    },
    notFound: {
      errorLabel: "Error 404",
      heading: "Esta página no existe.",
      body: "El link puede estar roto o la página puede haberse movido. Todo lo que construimos sigue a un click de distancia.",
      backHome: "Volver al inicio",
      services: "Servicios",
      contact: "Contacto",
    },
  },
} satisfies Record<Lang, unknown>;

export type UiText = typeof dict.en;

export function getUiText(lang: Lang): UiText {
  return dict[lang] as UiText;
}
