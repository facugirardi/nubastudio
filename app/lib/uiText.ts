import type { Lang } from "./lang";

/**
 * Diccionario de todo el copy visible del sitio (fuera de los case studies,
 * que viven en works.ts + works.es.ts). "en" es la fuente original; "es" debe
 * mantener la misma forma.
 */
const dict = {
  en: {
    nav: {
      home: "Home",
      work: "Works",
      about: "About",
      services: "Services",
      contact: "Contact",
      menuWord: "menu",
      close: "close",
      langToggleLabel: "Language",
      homeLabel: "Nuba Studio, home",
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
      hero: {
        title: "A small *studio* from *Córdoba* where *design,* *code* and *strategy* share the same *table.*",
        lead: "We design and build sites, apps, marketplaces and platforms. The scope changes with every project. The way we work doesn't.",
        cta: "Start a project",
      },
      strip: { label: "Recent work" },
      studio: {
        label: "(01) Studio",
        title: "One table, three disciplines.",
        body: [
          "Nuba started from a simple conviction: the best products come from teams that never hand the work off. Design, interaction and code happen in the same conversation, from the first sketch to the last deploy.",
          "We work remotely with clients across Latin America and beyond, in Spanish or English, and we stay on after launch when the product needs us.",
        ],
        facts: {
          basedIn: "Based in",
          basedInValue: "Córdoba, Argentina",
          since: "Since",
          shipped: "Projects shipped",
          languages: "Languages",
          languagesValue: "Spanish · English",
        },
      },
      principles: {
        label: "(02) Principles",
        title: "How we like to work.",
        items: [
          { title: "One table", desc: "Design, interaction and code in the same team. Nothing gets handed off, so nothing gets lost along the way." },
          { title: "No black boxes", desc: "You see the work while it moves: short loops, decisions made in the open." },
          { title: "The right tool", desc: "We pick the stack for what the product needs to do, not the other way around." },
          { title: "After launch", desc: "Shipping is the start. We measure, iterate and stay on when you need us." },
        ],
      },
      team: {
        label: "(03) Team",
        title: "The people at the table.",
        roles: { Design: "Design", Development: "Development", Strategy: "Strategy" },
      },
      record: {
        label: "(04) Record",
        title: "What we shipped, year by year.",
        view: "View case",
      },
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
    landing: {
      hero: {
        manifesto: "*Nuba* is a *studio* that *designs* and *builds* websites, apps, *marketplaces* and *more*",
        index: "Nuba Studio",
        since: "Since 2024",
        discipline: "Design + development",
        fine: "Fine",
        bold: "Bold",
        cta: "Start a project",
      },
      studio: {
        label: "(01) Studio",
        text: "There are studios that design and studios that write code. *Nuba* does both, at the same table, from the first sketch to the last deploy.",
        link: "About the studio",
      },
      works: {
        label: "(02) Selected work",
        all: "All work",
        view: "View case",
      },
      services: {
        label: "(03) Services",
        title: "Everything a digital product needs.",
        all: "All services",
      },
      process: {
        label: "(04) Process",
        title: "Four steps. No black boxes.",
      },
      faq: {
        label: "(05) Questions",
        title: "What people usually ask.",
      },
      contact: {
        phone: "Phone",
        social: "Social",
        location: "Córdoba, AR",
        index: "Index",
        rights: "© 2026 Nuba Studio",
        top: "Back to top",
      },
    },
    servicesPage: {
      hero: {
        title: "Five ways we help: *websites,* *apps,* *marketplaces,* *brands* and the *strategy* behind them.",
        cta: "Start a project",
      },
      capabilities: {
        label: "(01) Capabilities",
        title: "What happens at the table.",
        groups: [
          { name: "Design", items: ["UX/UI design", "Design systems", "Prototyping", "Brand identity", "Motion"] },
          { name: "Development", items: ["Websites in Next.js", "iOS & Android apps", "Backends & APIs", "Payments & dashboards", "CMS"] },
          { name: "Product", items: ["Discovery", "MVP scoping", "Roadmaps", "Launch", "Maintenance"] },
        ],
      },
      list: {
        label: "(02) Services",
        title: "What we do, in detail.",
        cases: "Related work",
      },
      process: {
        label: "(03) Process",
        title: "Four steps. No black boxes.",
        deliverablesLabel: "Deliverables",
        deliverables: [
          ["Kickoff workshop", "User and market research", "Scope and priorities"],
          ["Wireframes", "UI design and design system", "Clickable prototype"],
          ["Front-end and back-end", "Integrations and payments", "QA on real devices"],
          ["Deploy and monitoring", "Analytics", "Iterations after launch"],
        ],
      },
      stack: {
        label: "(04) Stack",
        title: "The tools we pick, and why.",
        note: "We choose the stack that fits the product, not the other way around.",
        groups: [
          { name: "Web", items: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Three.js"] },
          { name: "Mobile", items: ["React Native", "Expo", "iOS", "Android"] },
          { name: "Backend", items: ["Node", "Python", "PostgreSQL", "APIs"] },
          { name: "Design", items: ["Figma", "Framer", "Design systems"] },
        ],
      },
      faq: {
        label: "(05) Questions",
        title: "What people usually ask.",
        items: [
          {
            question: "Can you work with our existing team or codebase?",
            answer:
              "Yes. We can join a product that already exists: we review the code first and pick it up from there. That is how we work with Kennedy's Group, where we are the ongoing full-stack team.",
          },
          {
            question: "Do you build MVPs?",
            answer:
              "Yes. We help you define the smallest version worth launching, then design and build it, so you can test it with real users before investing more.",
          },
          {
            question: "Can you redesign something that already exists?",
            answer:
              "Yes. We can redesign a site or an app and rebuild only what needs it. We start by reviewing what works today, so nothing useful gets thrown away.",
          },
          {
            question: "Do you build for both iOS and Android?",
            answer:
              "Yes. We use React Native and Expo, which lets us ship to both platforms from a single codebase while the app still feels native.",
          },
          {
            question: "Can you handle payments and dashboards?",
            answer:
              "Yes. We integrate payment providers such as Mercado Pago and build the admin dashboards, authentication and APIs behind them. Nubapay is an example: QR orders, mobile payments and a live dashboard for organizers.",
          },
          {
            question: "Do you also design the brand?",
            answer:
              "Yes. We design visual identities and design systems, on their own or together with the product, so the brand and the interface speak the same language.",
          },
        ],
      },
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
          "We adapt. We are not tied to a single stack: we look for the right technology for each project, based on what it needs to do, how it has to grow and who will maintain it. We often end up with Next.js, React Native, Node or Python, but if your product calls for something else, or already runs on something else, we work with that.",
      },
    ],
    contact: {
      title: "Tell us what you *want* to *build.*",
      cta: "Write your message",
      sub: "Write what you need, however rough. We'll tidy it into a proper message and open it in WhatsApp.",
      messageLabel: "(01) Message",
      startWith: "Start with",
      fieldLabel: "Your message",
      fieldHint: "Rough is fine",
      sendLong: "Send via WhatsApp",
      directLabel: "(02) Direct",
      directTitle: "Or reach us straight away.",
      channels: { whatsapp: "WhatsApp", phone: "Phone", linkedin: "LinkedIn" },
      faqLabel: "(03) Questions",
      faqTitle: "Before you write.",
      faqItems: [
        {
          question: "What should I include in my first message?",
          answer:
            "What you want to build, who it is for and when you would like it ready. If you have a budget, links or references, add them too. It does not need to be polished: rough notes are enough to start the conversation.",
        },
        {
          question: "I only have an idea. Is that enough?",
          answer:
            "Yes. Many projects start that way. We help you turn the idea into something concrete: what the first version needs to do, what can wait and what it will take to build it.",
        },
        {
          question: "What happens after I send it?",
          answer:
            "We read it and reply to understand what you need. Once the project is clear, we scope the work and agree on what is included before anything starts, so you know exactly what you are getting.",
        },
        {
          question: "What does \"Polish with AI\" do with my text?",
          answer:
            "It rewrites your notes into a clearer message in the language you are browsing in. Nothing reaches us until you press send, and you can undo the change if you prefer your own words.",
        },
        {
          question: "I don't use WhatsApp. How else can I reach you?",
          answer:
            "You can call us at +54 9 351 347 1844 or write to us on LinkedIn. Both are listed in the section above.",
        },
      ],
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
      caseByline: "case study by Nuba Studio",
      screenWord: "screen",
      breadcrumb: "Breadcrumb",
      overview: "Overview",
      year: "Year",
      discipline: "Discipline",
      stack: "Stack",
      visit: "Visit",
      allWork: "All work",
    },
    notFound: {
      errorLabel: "Error 404",
      heading: "This page *drifted* off into the *cloud.*",
      body: "The link may be broken or the page may have moved. Everything we've built is still one click away.",
      backHome: "Back home",
      index: "Index",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      work: "Trabajos",
      about: "Nosotros",
      services: "Servicios",
      contact: "Contacto",
      menuWord: "menú",
      close: "cerrar",
      langToggleLabel: "Idioma",
      homeLabel: "Nuba Studio, inicio",
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
      hero: {
        title: "Un *estudio* chico de *Córdoba* donde *diseño,* *código* y *estrategia* comparten la misma *mesa.*",
        lead: "Diseñamos y construimos sitios, apps, marketplaces y plataformas. El alcance cambia en cada proyecto. La forma de trabajar, no.",
        cta: "Empezar un proyecto",
      },
      strip: { label: "Trabajo reciente" },
      studio: {
        label: "(01) Estudio",
        title: "Una mesa, tres disciplinas.",
        body: [
          "Nuba nació de una convicción simple: los mejores productos salen de equipos que nunca delegan el trabajo. Diseño, interacción y código pasan por la misma conversación, del primer boceto al último deploy.",
          "Trabajamos de forma remota con clientes en toda Latinoamérica y más allá, en español o en inglés, y seguimos después del lanzamiento cuando el producto nos necesita.",
        ],
        facts: {
          basedIn: "Ubicados en",
          basedInValue: "Córdoba, Argentina",
          since: "Desde",
          shipped: "Proyectos lanzados",
          languages: "Idiomas",
          languagesValue: "Español · Inglés",
        },
      },
      principles: {
        label: "(02) Principios",
        title: "Cómo nos gusta trabajar.",
        items: [
          { title: "Una sola mesa", desc: "Diseño, interacción y código en el mismo equipo. Nada se delega, así nada se pierde en el camino." },
          { title: "Sin cajas negras", desc: "Ves el trabajo mientras avanza: ciclos cortos y decisiones a la vista." },
          { title: "La herramienta justa", desc: "Elegimos el stack según lo que el producto tiene que hacer, no al revés." },
          { title: "Después del lanzamiento", desc: "Lanzar es el comienzo. Medimos, iteramos y seguimos cuando nos necesitás." },
        ],
      },
      team: {
        label: "(03) Equipo",
        title: "Las personas en la mesa.",
        roles: { Design: "Diseño", Development: "Desarrollo", Strategy: "Estrategia" },
      },
      record: {
        label: "(04) Trayectoria",
        title: "Lo que lanzamos, año por año.",
        view: "Ver caso",
      },
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
    landing: {
      hero: {
        manifesto: "*Nuba* es un *estudio* que *diseña* y *construye* webs, apps, *marketplaces* y *más*",
        index: "Nuba Studio",
        since: "Desde 2024",
        discipline: "Diseño + desarrollo",
        fine: "Fine",
        bold: "Bold",
        cta: "Empezar un proyecto",
      },
      studio: {
        label: "(01) Estudio",
        text: "Hay estudios que diseñan y estudios que programan. En *Nuba* hacemos las dos cosas, en la misma mesa, del primer boceto al último deploy.",
        link: "Conocé el estudio",
      },
      works: {
        label: "(02) Trabajos",
        all: "Todos los trabajos",
        view: "Ver caso",
      },
      services: {
        label: "(03) Servicios",
        title: "Todo lo que un producto digital necesita.",
        all: "Todos los servicios",
      },
      process: {
        label: "(04) Proceso",
        title: "Cuatro pasos. Sin cajas negras.",
      },
      faq: {
        label: "(05) Preguntas",
        title: "Lo que nos suelen preguntar.",
      },
      contact: {
        phone: "Teléfono",
        social: "Redes",
        location: "Córdoba, AR",
        index: "Índice",
        rights: "© 2026 Nuba Studio",
        top: "Volver arriba",
      },
    },
    servicesPage: {
      hero: {
        title: "Cinco formas de ayudarte: *webs,* *apps,* *marketplaces,* *marcas* y la *estrategia* detrás.",
        cta: "Empezar un proyecto",
      },
      capabilities: {
        label: "(01) Capacidades",
        title: "Lo que pasa en la mesa.",
        groups: [
          { name: "Diseño", items: ["Diseño UX/UI", "Sistemas de diseño", "Prototipado", "Identidad de marca", "Motion"] },
          { name: "Desarrollo", items: ["Webs en Next.js", "Apps iOS y Android", "Backends y APIs", "Pagos y dashboards", "CMS"] },
          { name: "Producto", items: ["Discovery", "Alcance de MVP", "Roadmaps", "Lanzamiento", "Mantenimiento"] },
        ],
      },
      list: {
        label: "(02) Servicios",
        title: "Qué hacemos, en detalle.",
        cases: "Trabajos relacionados",
      },
      process: {
        label: "(03) Proceso",
        title: "Cuatro pasos. Sin cajas negras.",
        deliverablesLabel: "Entregables",
        deliverables: [
          ["Workshop de arranque", "Investigación de usuarios y mercado", "Alcance y prioridades"],
          ["Wireframes", "Diseño UI y sistema de diseño", "Prototipo navegable"],
          ["Front-end y back-end", "Integraciones y pagos", "QA en dispositivos reales"],
          ["Deploy y monitoreo", "Analítica", "Iteraciones después del lanzamiento"],
        ],
      },
      stack: {
        label: "(04) Stack",
        title: "Las herramientas que elegimos, y por qué.",
        note: "Elegimos el stack que le sirve al producto, no al revés.",
        groups: [
          { name: "Web", items: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Three.js"] },
          { name: "Mobile", items: ["React Native", "Expo", "iOS", "Android"] },
          { name: "Backend", items: ["Node", "Python", "PostgreSQL", "APIs"] },
          { name: "Diseño", items: ["Figma", "Framer", "Sistemas de diseño"] },
        ],
      },
      faq: {
        label: "(05) Preguntas",
        title: "Lo que nos suelen preguntar.",
        items: [
          {
            question: "¿Pueden trabajar con nuestro equipo o código existente?",
            answer:
              "Sí. Podemos sumarnos a un producto que ya existe: primero revisamos el código y seguimos desde ahí. Así trabajamos con Kennedy's Group, donde somos el equipo full-stack permanente.",
          },
          {
            question: "¿Hacen MVPs?",
            answer:
              "Sí. Te ayudamos a definir la versión más chica que vale la pena lanzar, la diseñamos y la construimos, para que la pruebes con usuarios reales antes de invertir más.",
          },
          {
            question: "¿Pueden rediseñar algo que ya existe?",
            answer:
              "Sí. Podemos rediseñar un sitio o una app y reconstruir solo lo que hace falta. Empezamos revisando lo que hoy funciona, para no tirar nada útil.",
          },
          {
            question: "¿Desarrollan para iOS y Android?",
            answer:
              "Sí. Usamos React Native y Expo, que nos permite publicar en las dos plataformas desde un mismo código sin que la app deje de sentirse nativa.",
          },
          {
            question: "¿Pueden integrar pagos y dashboards?",
            answer:
              "Sí. Integramos proveedores de pago como Mercado Pago y construimos los dashboards de administración, la autenticación y las APIs detrás. Nubapay es un ejemplo: pedidos por QR, pagos desde el celular y un dashboard en vivo para los organizadores.",
          },
          {
            question: "¿También diseñan la marca?",
            answer:
              "Sí. Diseñamos identidades visuales y sistemas de diseño, solos o junto con el producto, para que la marca y la interfaz hablen el mismo idioma.",
          },
        ],
      },
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
          "Nos adaptamos. No estamos atados a un único stack: buscamos la tecnología adecuada para cada proyecto, según lo que tiene que hacer, cómo tiene que crecer y quién lo va a mantener. Muchas veces terminamos en Next.js, React Native, Node o Python, pero si tu producto pide otra cosa, o ya corre sobre otra cosa, trabajamos con eso.",
      },
    ],
    contact: {
      title: "Contanos qué *querés* *construir.*",
      cta: "Escribir tu mensaje",
      sub: "Escribí lo que necesitás, aunque sea en borrador. Lo prolijamos en un mensaje claro y lo abrimos en WhatsApp.",
      messageLabel: "(01) Mensaje",
      startWith: "Empezá con",
      fieldLabel: "Tu mensaje",
      fieldHint: "Vale en borrador",
      sendLong: "Enviar por WhatsApp",
      directLabel: "(02) Directo",
      directTitle: "O escribinos directo.",
      channels: { whatsapp: "WhatsApp", phone: "Teléfono", linkedin: "LinkedIn" },
      faqLabel: "(03) Preguntas",
      faqTitle: "Antes de escribirnos.",
      faqItems: [
        {
          question: "¿Qué pongo en el primer mensaje?",
          answer:
            "Qué querés construir, para quién y para cuándo lo necesitás. Si tenés un presupuesto, links o referencias, sumalos también. No hace falta que esté prolijo: con unas notas en borrador alcanza para arrancar la conversación.",
        },
        {
          question: "Solo tengo una idea. ¿Alcanza?",
          answer:
            "Sí. Muchos proyectos arrancan así. Te ayudamos a bajar la idea a algo concreto: qué tiene que hacer la primera versión, qué puede esperar y qué hace falta para construirla.",
        },
        {
          question: "¿Qué pasa después de que lo envío?",
          answer:
            "Lo leemos y te respondemos para entender qué necesitás. Cuando el proyecto está claro, definimos el alcance y acordamos qué está incluido antes de arrancar, así sabés exactamente qué recibís.",
        },
        {
          question: "¿Qué hace \"Mejorar con IA\" con mi texto?",
          answer:
            "Reescribe tus notas como un mensaje más claro, en el idioma en el que estás navegando. Nada nos llega hasta que tocás enviar, y podés deshacer el cambio si preferís tus propias palabras.",
        },
        {
          question: "No uso WhatsApp. ¿Cómo más los contacto?",
          answer:
            "Podés llamarnos al +54 9 351 347 1844 o escribirnos por LinkedIn. Los dos están en la sección de arriba.",
        },
      ],
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
      caseByline: "caso de estudio de Nuba Studio",
      screenWord: "pantalla",
      breadcrumb: "Ruta de navegación",
      overview: "Resumen",
      year: "Año",
      discipline: "Disciplina",
      stack: "Stack",
      visit: "Visitar",
      allWork: "Todos los trabajos",
    },
    notFound: {
      errorLabel: "Error 404",
      heading: "Esta página se *fue* a las *nubes.*",
      body: "El link puede estar roto o la página puede haberse movido. Todo lo que construimos sigue a un click de distancia.",
      backHome: "Volver al inicio",
      index: "Índice",
    },
  },
} satisfies Record<Lang, unknown>;

export type UiText = typeof dict.en;

export function getUiText(lang: Lang): UiText {
  return dict[lang] as UiText;
}
