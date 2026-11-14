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
  works: { title: string; description: string; ogTitle: string };
  services: { title: string; description: string; ogTitle: string };
  contact: { title: string; description: string; ogTitle: string };
  /** Migas de pan del JSON-LD. */
  crumbs: { home: string; about: string; services: string; contact: string; works: string };
  /** Servicios del JSON-LD de /services. */
  serviceItems: { name: string; description: string }[];
  worksCollection: { name: string; description: string };
  servicesListName: string;
  contactPageName: string;
  /** Imágenes para compartir (Open Graph). */
  og: {
    home: { title: string; accent: string; footer: string };
    about: { title: string; accent: string; subtitle: string; footer: string };
    works: { title: string; accent: string; subtitle: string; footer: string };
    services: { title: string; accent: string; subtitle: string; footer: string };
    contact: { title: string; accent: string; subtitle: string; footer: string };
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
    tagline: "Digital product studio",
    slogan: "We turn ideas into digital products",
    siteDescription:
      "Nuba Studio is a digital product studio from Córdoba, Argentina. We design and build websites, mobile apps, marketplaces and digital products end to end.",
    keywords: [
      "digital product studio",
      "custom software development",
      "web design agency",
      "web development studio",
      "mobile app development",
      "marketplace development",
      "product design",
      "Next.js development",
      "React Native development",
      "UI UX design studio",
      "software development Córdoba Argentina",
    ],
    home: {
      title: "Nuba Studio | Custom Software & App Development",
      description:
        "We build custom software, web platforms, and mobile applications for businesses and startups. Explore our work and start your project.",
      ogTitle: "Nuba Studio | Custom Software & App Development",
    },
    about: {
      title: "About the studio",
      description:
        "Meet Nuba Studio: a small, senior team from Córdoba, Argentina that turns ideas into digital products. Our philosophy, our process and the people behind the work.",
      ogTitle: "About Nuba Studio",
    },
    works: {
      title: "Work - case studies in web, apps and marketplaces",
      description:
        "Case studies from Nuba Studio: websites, mobile apps, marketplaces and digital platforms designed and built end to end for clients in Argentina and worldwide.",
      ogTitle: "Work - Nuba Studio",
    },
    services: {
      title: "Services - web, apps, marketplaces & product design",
      description:
        "Web development, iOS & Android apps, marketplaces and platforms, branding and product strategy. Nuba Studio designs and builds digital products end to end.",
      ogTitle: "Services - Nuba Studio",
    },
    contact: {
      title: "Contact",
      description:
        "Tell us about your project. Nuba Studio builds websites, apps and marketplaces from Córdoba, Argentina - reach us on WhatsApp or LinkedIn and we'll get back to you.",
      ogTitle: "Contact Nuba Studio",
    },
    crumbs: { home: "Home", about: "About", services: "Services", contact: "Contact", works: "Work" },
    serviceItems: [
      {
        name: "Web Development",
        description:
          "Sites and platforms that load fast, feel alive and turn visitors into clients. Built with Next.js, React and a CMS when you need one.",
      },
      {
        name: "Mobile Apps",
        description:
          "Native-feeling iOS and Android products people actually want to open, built with React Native and Expo.",
      },
      {
        name: "Marketplaces & Platforms",
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
      home: { title: "We turn ideas into", accent: "digital products", footer: "Web · Apps · Marketplaces" },
      works: {
        title: "Products we designed,",
        accent: "built and shipped",
        subtitle: "Websites, mobile apps, marketplaces and platforms, built end to end.",
        footer: "Work",
      },
      about: {
        title: "We turn ideas into",
        accent: "digital products",
        subtitle:
          "A small, senior team from Córdoba, Argentina. Three disciplines, one process, nothing handed off.",
        footer: "About the studio",
      },
      services: {
        title: "We design and build",
        accent: "digital products",
        subtitle:
          "Web development · Mobile apps · Marketplaces & platforms · Branding · Product strategy and MVP.",
        footer: "Services",
      },
      contact: {
        title: "Let's build",
        accent: "something real",
        subtitle:
          "Tell us about your project. We build websites, apps and marketplaces from Córdoba, Argentina.",
        footer: "Contact",
      },
      caseLabel: "Case study by Nuba Studio",
    },
    homeContent: {
      ariaLabel: "About Nuba Studio and selected work",
      h1: "Nuba Studio - custom software and app development studio in Córdoba, Argentina",
      intro: [
        "Nuba Studio is a digital product studio based in Córdoba, Argentina. We design and build websites, mobile apps, marketplaces and digital products end to end - from strategy and product design to development and launch. We work with founders and companies across Argentina, Latin America and the rest of the world.",
        "Our services include web design and development, iOS and Android app development, marketplace and platform engineering, product and UI/UX design, and brand identity for digital products. We build with Next.js, React, React Native, TypeScript, Python and Node.",
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
    tagline: "Estudio de producto digital",
    slogan: "Convertimos ideas en productos digitales",
    siteDescription:
      "Nuba Studio es un estudio de producto digital de Córdoba, Argentina. Diseñamos y desarrollamos sitios web, apps móviles, marketplaces y productos digitales de punta a punta.",
    keywords: [
      "estudio de producto digital",
      "desarrollo de software a medida",
      "desarrollo de aplicaciones móviles",
      "desarrollo web",
      "agencia digital Córdoba",
      "desarrollo de marketplaces",
      "diseño de productos digitales",
      "desarrollo Next.js",
      "desarrollo React Native",
      "diseño UI UX",
      "desarrollo de software Argentina",
    ],
    home: {
      title: "Nuba Studio | Desarrollo de Software a Medida y Apps",
      description:
        "Desarrollamos software a medida, aplicaciones web y móviles para empresas y startups. Conocé nuestros proyectos y cotizá tu idea.",
      ogTitle: "Nuba Studio | Desarrollo de Software a Medida y Apps",
    },
    about: {
      title: "Sobre el estudio",
      description:
        "Conocé Nuba Studio: un equipo chico y senior de Córdoba, Argentina que convierte ideas en productos digitales. Nuestra filosofía, nuestro proceso y las personas detrás del trabajo.",
      ogTitle: "Sobre Nuba Studio",
    },
    works: {
      title: "Trabajos - casos de estudio de web, apps y marketplaces",
      description:
        "Casos de estudio de Nuba Studio: sitios web, apps móviles, marketplaces y plataformas digitales diseñados y desarrollados de punta a punta para clientes de Argentina y del mundo.",
      ogTitle: "Trabajos - Nuba Studio",
    },
    services: {
      title: "Servicios - web, apps, marketplaces y diseño de producto",
      description:
        "Desarrollo web, apps iOS y Android, marketplaces y plataformas, branding y estrategia de producto. Nuba Studio diseña y desarrolla productos digitales de punta a punta.",
      ogTitle: "Servicios - Nuba Studio",
    },
    contact: {
      title: "Contacto",
      description:
        "Contanos sobre tu proyecto. Nuba Studio desarrolla sitios web, apps y marketplaces desde Córdoba, Argentina - escribinos por WhatsApp o LinkedIn y te respondemos.",
      ogTitle: "Contactá a Nuba Studio",
    },
    crumbs: { home: "Inicio", about: "Nosotros", services: "Servicios", contact: "Contacto", works: "Trabajos" },
    serviceItems: [
      {
        name: "Desarrollo web",
        description:
          "Sitios y plataformas que cargan rápido, se sienten vivos y convierten visitantes en clientes. Hechos con Next.js, React y un CMS cuando lo necesitás.",
      },
      {
        name: "Apps móviles",
        description:
          "Productos iOS y Android con sensación nativa que la gente quiere abrir, hechos con React Native y Expo.",
      },
      {
        name: "Marketplaces y plataformas",
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
      home: { title: "Convertimos ideas en", accent: "productos digitales", footer: "Web · Apps · Marketplaces" },
      works: {
        title: "Productos que diseñamos,",
        accent: "construimos y lanzamos",
        subtitle: "Sitios web, apps móviles, marketplaces y plataformas, de punta a punta.",
        footer: "Trabajos",
      },
      about: {
        title: "Convertimos ideas en",
        accent: "productos digitales",
        subtitle:
          "Un equipo chico y senior de Córdoba, Argentina. Tres disciplinas, un solo proceso, nada se delega.",
        footer: "Sobre el estudio",
      },
      services: {
        title: "Diseñamos y desarrollamos",
        accent: "productos digitales",
        subtitle:
          "Desarrollo web · Apps móviles · Marketplaces y plataformas · Branding · Estrategia de producto y MVP.",
        footer: "Servicios",
      },
      contact: {
        title: "Construyamos",
        accent: "algo real",
        subtitle:
          "Contanos sobre tu proyecto. Desarrollamos sitios web, apps y marketplaces desde Córdoba, Argentina.",
        footer: "Contacto",
      },
      caseLabel: "Caso de estudio de Nuba Studio",
    },
    homeContent: {
      ariaLabel: "Sobre Nuba Studio y trabajos seleccionados",
      h1: "Nuba Studio - estudio de desarrollo de software a medida y apps en Córdoba, Argentina",
      intro: [
        "Nuba Studio es un estudio de producto digital con base en Córdoba, Argentina. Diseñamos y desarrollamos sitios web, apps móviles, marketplaces y productos digitales de punta a punta - desde la estrategia y el diseño de producto hasta el desarrollo y el lanzamiento. Trabajamos con emprendedores y empresas de Argentina, Latinoamérica y el resto del mundo.",
        "Nuestros servicios incluyen diseño y desarrollo web, desarrollo de apps iOS y Android, ingeniería de marketplaces y plataformas, diseño de producto y UI/UX, e identidad de marca para productos digitales. Construimos con Next.js, React, React Native, TypeScript, Python y Node.",
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
