import type { ServiceId } from "../data/services/slugs";
import type { Lang } from "./lang";

/**
 * Todo el texto de SEO por idioma: título y descripción de cada página, Open
 * Graph, JSON-LD y llms.txt. Cada idioma tiene su propio texto (no es una
 * traducción palabra por palabra): lo que importa es cómo busca la gente en cada uno.
 * Los case studies llevan el suyo en works.ts / works.es.ts (seoTitle, seoDescription).
 */
export type SeoText = {
  /** locale de Open Graph. */
  ogLocale: string;
  tagline: string;
  slogan: string;
  siteDescription: string;
  keywords: string[];
  home: { title: string; description: string; ogTitle: string };
  about: { title: string; description: string; ogTitle: string };
  services: { title: string; description: string; ogTitle: string };
  contact: { title: string; description: string; ogTitle: string };
  privacy: { title: string; description: string; ogTitle: string };
  works: { title: string; description: string; ogTitle: string };
  blog: { title: string; description: string; ogTitle: string; name: string };
  /** Migas de pan del JSON-LD. */
  crumbs: { home: string; about: string; services: string; contact: string; works: string; blog: string; privacy: string };
  /** Servicios del JSON-LD de /services (`service`: la landing que lo desarrolla). */
  serviceItems: { name: string; description: string; service?: ServiceId }[];
  worksCollection: { name: string; description: string };
  servicesListName: string;
  contactPageName: string;
  /** Imágenes para compartir (Open Graph). */
  og: {
    home: { title: string; accent: string; footer: string };
    about: { title: string; accent: string; subtitle: string; footer: string };
    services: { title: string; accent: string; subtitle: string; footer: string };
    contact: { title: string; accent: string; subtitle: string; footer: string };
    works: { title: string; accent: string; subtitle: string; footer: string };
    blog: { title: string; accent: string; subtitle: string; footer: string };
    caseLabel: string;
  };
  /** Texto del contenido que lee Google en la home sin tener que usar la espiral. */
  homeContent: {
    ariaLabel: string;
    h1: string;
    intro: string[];
    selectedWork: string;
    explore: string;
    links: { about: string; services: string; contact: string };
  };
  notFound: { title: string; description: string };
};

export const seoText: Record<Lang, SeoText> = {
  en: {
    ogLocale: "en_US",
    tagline: "Custom software & app development",
    slogan: "Custom software and apps, designed and built end to end",
    siteDescription:
      "Nuba Studio is a custom software and app development company in Argentina, based in Córdoba. We design and build business systems, web platforms, mobile apps and marketplaces end to end for companies and startups across Argentina, from Buenos Aires to Ushuaia, and abroad.",
    keywords: [
      "custom software development",
      "build custom software for my business",
      "who can build my app",
      "hire a team to build an app",
      "build an app for my business",
      "build a marketplace",
      "build a booking platform",
      "custom business management software",
      "app development company",
      "mobile app development",
      "web platform development",
      "MVP development for startups",
      "Next.js development",
      "React Native development",
      "software development company Argentina",
      "nearshore software development Argentina",
    ],
    home: {
      title: "Nuba Studio | Custom Software & App Development",
      description:
        "Want to build software or an app for your business? Nuba Studio is a custom software and app development company in Argentina that designs and builds it end to end.",
      ogTitle: "Nuba Studio | Custom Software & App Development",
    },
    about: {
      title: "About - Software development company in Argentina",
      description:
        "Nuba Studio is a senior software development team in Argentina, based in Córdoba, where design, code and strategy share one table. Meet the people and see what we've shipped.",
      ogTitle: "About Nuba Studio",
    },
    services: {
      title: "Services - Web, app & marketplace development",
      description:
        "Custom software, web development, iOS & Android apps, marketplaces and product strategy. Nuba Studio designs and builds digital products end to end.",
      ogTitle: "Services - Nuba Studio",
    },
    contact: {
      title: "Contact - Start your web or app project",
      description:
        "Tell us about your project. Nuba Studio builds custom software, websites and apps for companies across Argentina. Reach us on WhatsApp, phone or LinkedIn.",
      ogTitle: "Contact Nuba Studio",
    },
    privacy: {
      title: "Privacy policy and cookies",
      description:
        "How Nuba Studio handles your data: what we measure on this site, which cookies we use only with your consent, and how to contact us.",
      ogTitle: "Privacy policy - Nuba Studio",
    },
    works: {
      title: "Portfolio - Websites, apps & platforms we built",
      description:
        "Case studies of websites, iOS and Android apps, marketplaces and platforms designed and built by Nuba Studio for clients in Argentina and abroad.",
      ogTitle: "Portfolio - Nuba Studio",
    },
    blog: {
      title: "Blog - app, web and marketplace development guides",
      description:
        "Guides on what it costs to build an app or marketplace, how to scope an MVP and how to choose a development partner, from the Nuba Studio team.",
      ogTitle: "Blog - Nuba Studio",
      name: "Nuba Studio Blog",
    },
    crumbs: { home: "Home", about: "About", services: "Services", contact: "Contact", works: "Work", blog: "Blog", privacy: "Privacy" },
    serviceItems: [
      {
        name: "Custom Software Development",
        service: "custom",
        description:
          "Business systems, web platforms, backoffices and integrations designed and built around how your company works.",
      },
      {
        name: "Web Development",
        service: "web",
        description:
          "Sites and platforms that load fast, feel alive and turn visitors into clients. Built with Next.js, React and a CMS when you need one.",
      },
      {
        name: "Mobile Apps",
        service: "mobile",
        description:
          "Native-feeling iOS and Android products people actually want to open, built with React Native and Expo.",
      },
      {
        name: "Marketplaces & Platforms",
        service: "marketplaces",
        description:
          "Two-sided products with payments, dashboards, authentication and APIs, built to scale.",
      },
      {
        name: "Branding & Identity",
        description:
          "Visual systems, art direction and design systems that make you unmistakable across every touchpoint.",
      },
      {
        name: "Product Strategy & MVP",
        service: "mvp",
        description:
          "From raw idea to a shipped MVP: discovery, prototyping and a roadmap validated and scoped to grow.",
      },
    ],
    worksCollection: {
      name: "Selected work - Nuba Studio",
      description:
        "Case studies of websites, apps and digital products designed and built by Nuba Studio.",
    },
    servicesListName: "Services - Nuba Studio",
    contactPageName: "Contact Nuba Studio",
    og: {
      home: { title: "We build your", accent: "software and apps", footer: "Custom software · Apps · Marketplaces" },
      about: {
        title: "Custom software",
        accent: "and apps, end to end",
        subtitle:
          "A senior software team in Argentina. Three disciplines, one process, nothing handed off.",
        footer: "About the studio",
      },
      services: {
        title: "We design and build",
        accent: "software and apps",
        subtitle:
          "Custom software · Web development · Mobile apps · Marketplaces & platforms · Product strategy and MVP.",
        footer: "Services",
      },
      contact: {
        title: "Let's build",
        accent: "something real",
        subtitle:
          "Tell us about your project. We build software, websites and apps for companies across Argentina.",
        footer: "Contact",
      },
      works: {
        title: "Selected",
        accent: "work",
        subtitle: "Websites, apps, marketplaces and platforms designed and built by Nuba Studio.",
        footer: "Portfolio",
      },
      blog: {
        title: "Notes on building",
        accent: "software and apps",
        subtitle: "Costs, MVPs, marketplaces and the tech behind them, from a studio that ships them.",
        footer: "Blog",
      },
      caseLabel: "Case study by Nuba Studio",
    },
    homeContent: {
      ariaLabel: "About Nuba Studio and selected work",
      h1: "Nuba Studio - custom software and app development company in Argentina",
      intro: [
        "Nuba Studio is a custom software and app development company in Argentina, based in Córdoba. Our senior team designs and builds business systems, websites, mobile apps and marketplaces end to end - from strategy and product design to development, launch and ongoing support. We work with companies and founders across Argentina, with clients in Buenos Aires, Córdoba and Ushuaia, and abroad in Greece.",
        "Our services include custom software development, web design and development, iOS and Android app development, marketplace and platform engineering, product and UI/UX design. We build with Next.js, React, React Native, TypeScript, Python and Node.",
        "If you want to build software for your company, an app for your business or a marketplace for your idea and are looking for who to talk to, that is what we do: we scope it with you, give you a closed estimate, then design, build and launch it, and stay on for support.",
      ],
      selectedWork: "Selected work",
      explore: "Explore Nuba Studio",
      links: {
        about: "About the studio and the team",
        services: "Services: web, apps, marketplaces and product design",
        contact: "Contact Nuba Studio",
      },
    },
    notFound: { title: "Page not found", description: "The page you were looking for doesn't exist." },
  },
  es: {
    ogLocale: "es_AR",
    tagline: "Desarrollo de software a medida y apps",
    slogan: "Software a medida y apps, diseñados y desarrollados de punta a punta",
    siteDescription:
      "Nuba Studio es una empresa argentina de desarrollo de software a medida y apps, con base en Córdoba. Diseñamos y desarrollamos sistemas, plataformas web, apps móviles y marketplaces de punta a punta para empresas y startups de todo el país, de Buenos Aires a Ushuaia.",
    keywords: [
      "desarrollo de software a medida",
      "quiero desarrollar un software",
      "quiero desarrollar una app",
      "quién me puede hacer una app",
      "desarrollar un software para mi empresa",
      "desarrollar una app para mi negocio",
      "hacer un sistema de gestión a medida",
      "crear un marketplace",
      "desarrollar una plataforma de reservas",
      "contratar desarrolladores de apps",
      "empresa de desarrollo de apps",
      "desarrollo de aplicaciones móviles",
      "desarrollo web a medida",
      "desarrollo de MVP para startups",
      "empresa de desarrollo de software Argentina",
      "software factory Córdoba",
      "desarrollo React Native",
      "desarrollo Next.js",
    ],
    home: {
      title: "Nuba Studio | Desarrollo de Software a Medida y Apps en Argentina",
      description:
        "¿Querés desarrollar un software o una app para tu negocio? Nuba Studio es una empresa argentina de desarrollo a medida: lo diseñamos y desarrollamos de punta a punta.",
      ogTitle: "Nuba Studio | Desarrollo de Software a Medida y Apps en Argentina",
    },
    about: {
      title: "Nosotros - Empresa de desarrollo de software en Argentina",
      description:
        "Nuba Studio es un equipo senior de desarrollo de software en Argentina, con base en Córdoba, donde diseño, código y estrategia comparten la misma mesa. Conocé al equipo y lo que lanzamos.",
      ogTitle: "Sobre Nuba Studio",
    },
    services: {
      title: "Servicios - Software a medida, apps y marketplaces",
      description:
        "Software a medida, desarrollo web, apps iOS y Android, marketplaces y estrategia de producto. Nuba Studio diseña y desarrolla productos digitales.",
      ogTitle: "Servicios - Nuba Studio",
    },
    contact: {
      title: "Contacto - Empezá tu proyecto web o app",
      description:
        "Contanos tu proyecto. Nuba Studio desarrolla software a medida, webs y apps para empresas de toda Argentina. Escribinos por WhatsApp, teléfono o LinkedIn.",
      ogTitle: "Contactá a Nuba Studio",
    },
    privacy: {
      title: "Política de privacidad y cookies",
      description:
        "Cómo trata Nuba Studio tus datos: qué medimos en este sitio, qué cookies usamos solo con tu consentimiento y cómo contactarnos.",
      ogTitle: "Política de privacidad - Nuba Studio",
    },
    works: {
      title: "Portfolio - Webs, apps y plataformas",
      description:
        "Casos de estudio de sitios web, apps iOS y Android, marketplaces y plataformas que Nuba Studio diseñó y desarrolló para clientes de Argentina y el mundo.",
      ogTitle: "Portfolio - Nuba Studio",
    },
    blog: {
      title: "Blog: guías para desarrollar apps y marketplaces",
      description:
        "Guías sobre cuánto cuesta desarrollar una app o un marketplace, cómo definir un MVP y cómo elegir con quién desarrollarlo, del equipo de Nuba Studio.",
      ogTitle: "Blog - Nuba Studio",
      name: "Blog de Nuba Studio",
    },
    crumbs: { home: "Inicio", about: "Nosotros", services: "Servicios", contact: "Contacto", works: "Trabajos", blog: "Blog", privacy: "Privacidad" },
    serviceItems: [
      {
        name: "Desarrollo de software a medida",
        service: "custom",
        description:
          "Sistemas de gestión, plataformas web, backoffices e integraciones diseñados y desarrollados alrededor de cómo trabaja tu empresa.",
      },
      {
        name: "Desarrollo web",
        service: "web",
        description:
          "Sitios y plataformas que cargan rápido, se sienten vivos y convierten visitantes en clientes. Hechos con Next.js, React y un CMS cuando lo necesitás.",
      },
      {
        name: "Apps móviles",
        service: "mobile",
        description:
          "Productos iOS y Android con sensación nativa que la gente quiere abrir, hechos con React Native y Expo.",
      },
      {
        name: "Marketplaces y plataformas",
        service: "marketplaces",
        description:
          "Productos de dos lados con pagos, dashboards, autenticación y APIs, pensados para escalar.",
      },
      {
        name: "Branding e identidad",
        description:
          "Sistemas visuales, dirección de arte y sistemas de diseño que te hacen inconfundible en cada punto de contacto.",
      },
      {
        name: "Estrategia de producto y MVP",
        service: "mvp",
        description:
          "De la idea cruda a un MVP en producción: descubrimiento, prototipado y una hoja de ruta validada y dimensionada para crecer.",
      },
    ],
    worksCollection: {
      name: "Trabajos seleccionados - Nuba Studio",
      description:
        "Casos de estudio de sitios web, apps y productos digitales diseñados y desarrollados por Nuba Studio.",
    },
    servicesListName: "Servicios - Nuba Studio",
    contactPageName: "Contactá a Nuba Studio",
    og: {
      home: { title: "Desarrollamos tu", accent: "software y tu app", footer: "Software a medida · Apps · Marketplaces" },
      about: {
        title: "Software a medida",
        accent: "y apps, de punta a punta",
        subtitle:
          "Un equipo senior de desarrollo de software en Argentina. Tres disciplinas, un solo proceso, nada se delega.",
        footer: "Sobre el estudio",
      },
      services: {
        title: "Diseñamos y desarrollamos",
        accent: "software y apps",
        subtitle:
          "Software a medida · Desarrollo web · Apps móviles · Marketplaces y plataformas · Estrategia de producto y MVP.",
        footer: "Servicios",
      },
      contact: {
        title: "Construyamos",
        accent: "algo real",
        subtitle:
          "Contanos sobre tu proyecto. Desarrollamos software, webs y apps para empresas de toda Argentina.",
        footer: "Contacto",
      },
      works: {
        title: "Trabajos",
        accent: "seleccionados",
        subtitle: "Webs, apps, marketplaces y plataformas diseñadas y desarrolladas por Nuba Studio.",
        footer: "Portfolio",
      },
      blog: {
        title: "Notas sobre cómo construir",
        accent: "software y apps",
        subtitle: "Costos, MVPs, marketplaces y la tecnología detrás, de un estudio que los lanza.",
        footer: "Blog",
      },
      caseLabel: "Caso de estudio de Nuba Studio",
    },
    homeContent: {
      ariaLabel: "Sobre Nuba Studio y trabajos seleccionados",
      h1: "Nuba Studio - empresa de desarrollo de software a medida y apps en Argentina",
      intro: [
        "Nuba Studio es una empresa argentina de desarrollo de software a medida y apps, con base en Córdoba. Nuestro equipo senior diseña y desarrolla sistemas, sitios web, apps móviles y marketplaces de punta a punta - desde la estrategia y el diseño de producto hasta el desarrollo, el lanzamiento y el soporte. Trabajamos con empresas y emprendedores de toda Argentina, con clientes en Buenos Aires, Córdoba y Ushuaia, y en el exterior en Grecia.",
        "Nuestros servicios incluyen desarrollo de software a medida, diseño y desarrollo web, desarrollo de apps iOS y Android, ingeniería de marketplaces y plataformas, diseño de producto y UI/UX. Construimos con Next.js, React, React Native, TypeScript, Python y Node.",
        "Si querés desarrollar un software para tu empresa, una app para tu negocio o un marketplace para tu idea y buscás con quién hablar, eso es lo que hacemos: definimos el alcance con vos, te pasamos un presupuesto cerrado, lo diseñamos, lo desarrollamos, lo lanzamos y seguimos con el soporte.",
      ],
      selectedWork: "Trabajos seleccionados",
      explore: "Explorá Nuba Studio",
      links: {
        about: "Sobre el estudio y el equipo",
        services: "Servicios: web, apps, marketplaces y diseño de producto",
        contact: "Contactá a Nuba Studio",
      },
    },
    notFound: { title: "Página no encontrada", description: "La página que buscabas no existe." },
  },
};
