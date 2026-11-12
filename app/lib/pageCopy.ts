import type { Lang } from "./locale";

type PageKey = "home" | "works" | "about" | "services" | "contact";

type PageCopy = {
  title: string;
  description: string;
  breadcrumb: string;
  og: { title: string; accent: string; subtitle: string; footer: string; alt: string };
};

export const PAGE_COPY: Record<Lang, Record<PageKey, PageCopy>> = {
  en: {
    home: {
      title: "Nuba Studio — Web & App Development in Córdoba, Argentina",
      description:
        "Nuba Studio designs and builds websites, mobile apps, marketplaces and custom software from Córdoba, Argentina. Strategy, design and code, end to end.",
      breadcrumb: "Home",
      og: {
        title: "We turn ideas into",
        accent: "digital products",
        subtitle: "Websites, mobile apps, marketplaces and custom software, designed and built in Córdoba, Argentina.",
        footer: "Web · Apps · Marketplaces",
        alt: "Nuba Studio — Web & app development studio",
      },
    },
    works: {
      title: "Portfolio — Websites, apps & platforms we built",
      description:
        "Case studies of websites, iOS and Android apps, marketplaces and platforms designed and built by Nuba Studio for clients in Argentina and abroad.",
      breadcrumb: "Work",
      og: {
        title: "Selected",
        accent: "work",
        subtitle: "Websites, apps, marketplaces and platforms designed and built by Nuba Studio.",
        footer: "Portfolio",
        alt: "Nuba Studio portfolio",
      },
    },
    about: {
      title: "About — A design & development studio in Córdoba",
      description:
        "Nuba Studio is a small team from Córdoba, Argentina where design, code and strategy share one table. Meet the people and see what we've shipped.",
      breadcrumb: "About",
      og: {
        title: "We turn ideas into",
        accent: "digital products",
        subtitle: "A small, senior team from Córdoba, Argentina. Three disciplines, one process, nothing handed off.",
        footer: "About the studio",
        alt: "About Nuba Studio",
      },
    },
    services: {
      title: "Services — Web, app & marketplace development",
      description:
        "Web development, iOS & Android apps, marketplaces and platforms, branding and product strategy. Nuba Studio designs and builds digital products end to end.",
      breadcrumb: "Services",
      og: {
        title: "We design and build",
        accent: "digital products",
        subtitle: "Web development · Mobile apps · Marketplaces & platforms · Branding · Product strategy and MVP.",
        footer: "Services",
        alt: "Services — Nuba Studio",
      },
    },
    contact: {
      title: "Contact — Start your web or app project",
      description:
        "Tell us about your project. Nuba Studio builds websites, apps and marketplaces from Córdoba, Argentina. Reach us on WhatsApp, phone or LinkedIn.",
      breadcrumb: "Contact",
      og: {
        title: "Let's build",
        accent: "something real",
        subtitle: "Tell us about your project. We build websites, apps and marketplaces from Córdoba, Argentina.",
        footer: "Contact",
        alt: "Contact Nuba Studio",
      },
    },
  },
  es: {
    home: {
      title: "Nuba Studio — Desarrollo web y de apps en Córdoba, Argentina",
      description:
        "Nuba Studio diseña y desarrolla sitios web, apps móviles, marketplaces y software a medida desde Córdoba, Argentina. Estrategia, diseño y código.",
      breadcrumb: "Inicio",
      og: {
        title: "Convertimos ideas en",
        accent: "productos digitales",
        subtitle: "Sitios web, apps móviles, marketplaces y software a medida, diseñados y desarrollados en Córdoba, Argentina.",
        footer: "Web · Apps · Marketplaces",
        alt: "Nuba Studio — Estudio de desarrollo web y apps",
      },
    },
    works: {
      title: "Portfolio — Webs, apps y plataformas",
      description:
        "Casos de estudio de sitios web, apps iOS y Android, marketplaces y plataformas que Nuba Studio diseñó y desarrolló para clientes de Argentina y el mundo.",
      breadcrumb: "Trabajos",
      og: {
        title: "Trabajos",
        accent: "seleccionados",
        subtitle: "Webs, apps, marketplaces y plataformas diseñadas y desarrolladas por Nuba Studio.",
        footer: "Portfolio",
        alt: "Portfolio de Nuba Studio",
      },
    },
    about: {
      title: "Nosotros — Estudio de diseño y desarrollo",
      description:
        "Nuba Studio es un equipo chico de Córdoba, Argentina, donde diseño, código y estrategia comparten la misma mesa. Conocé al equipo y lo que lanzamos.",
      breadcrumb: "Nosotros",
      og: {
        title: "Convertimos ideas en",
        accent: "productos digitales",
        subtitle: "Un equipo chico y senior de Córdoba, Argentina. Tres disciplinas, un proceso, nada se pierde en el camino.",
        footer: "Sobre el estudio",
        alt: "Sobre Nuba Studio",
      },
    },
    services: {
      title: "Servicios — Desarrollo web, apps y marketplaces",
      description:
        "Desarrollo web, apps iOS y Android, marketplaces y plataformas, branding y estrategia de producto. Nuba Studio diseña y desarrolla productos digitales.",
      breadcrumb: "Servicios",
      og: {
        title: "Diseñamos y desarrollamos",
        accent: "productos digitales",
        subtitle: "Desarrollo web · Apps móviles · Marketplaces y plataformas · Branding · Estrategia de producto y MVP.",
        footer: "Servicios",
        alt: "Servicios — Nuba Studio",
      },
    },
    contact: {
      title: "Contacto — Empezá tu proyecto web o app",
      description:
        "Contanos tu proyecto. Nuba Studio desarrolla webs, apps y marketplaces desde Córdoba, Argentina. Escribinos por WhatsApp, teléfono o LinkedIn.",
      breadcrumb: "Contacto",
      og: {
        title: "Construyamos",
        accent: "algo real",
        subtitle: "Contanos tu proyecto. Desarrollamos webs, apps y marketplaces desde Córdoba, Argentina.",
        footer: "Contacto",
        alt: "Contacto — Nuba Studio",
      },
    },
  },
};
