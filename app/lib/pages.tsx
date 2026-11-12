import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingClient from "../components/landing/LandingClient";
import AboutClient from "../components/about/AboutClient";
import ServicesClient from "../components/services/ServicesClient";
import ContactClient from "../components/contact/ContactClient";
import HomeClient from "../components/HomeClient";
import HomeSeoContent from "../components/HomeSeoContent";
import SmoothScroll from "../components/SmoothScroll";
import CaseStudy from "../components/CaseStudy";
import { getNextWork, getWork, visibleWorks, works } from "../data/works";
import {
  JsonLd,
  breadcrumbJsonLd,
  caseStudyJsonLd,
  faqJsonLd,
  servicesJsonLd,
  webPageJsonLd,
  worksCollectionJsonLd,
} from "./jsonLd";
import { localizeWork } from "./localizeWork";
import type { Lang } from "./locale";
import { buildMetadata } from "./metadata";
import { PAGE_COPY } from "./pageCopy";
import { SITE_NAME } from "./seo";
import { getUiText } from "./uiText";

/* Cada página existe en /ruta (en) y /es/ruta (es). Los archivos de app/(en)
   y app/(es) solo llaman a estas funciones con su idioma. */

const crumbs = (lang: Lang) => PAGE_COPY[lang];

/* ───────── Home ───────── */

export function homeMetadata(lang: Lang): Metadata {
  const c = PAGE_COPY[lang].home;
  return buildMetadata({ lang, path: "/", title: c.title, description: c.description, absoluteTitle: true });
}

export function HomePage({ lang }: { lang: Lang }) {
  const c = PAGE_COPY[lang].home;
  return (
    <>
      <JsonLd data={webPageJsonLd({ lang, path: "/", name: c.title, description: c.description })} />
      <LandingClient />
    </>
  );
}

/* ───────── Works ───────── */

export function worksMetadata(lang: Lang): Metadata {
  const c = PAGE_COPY[lang].works;
  return buildMetadata({ lang, path: "/works", title: c.title, description: c.description });
}

export function WorksPage({ lang }: { lang: Lang }) {
  const c = PAGE_COPY[lang].works;
  const b = crumbs(lang);
  return (
    <>
      <JsonLd
        data={[
          worksCollectionJsonLd(
            lang,
            visibleWorks.map((w) => localizeWork(w, lang)),
            { name: `${c.title} — ${SITE_NAME}`, description: c.description }
          ),
          breadcrumbJsonLd(lang, [
            { name: b.home.breadcrumb, path: "/" },
            { name: b.works.breadcrumb, path: "/works" },
          ]),
        ]}
      />
      <HomeClient seoFallback={<HomeSeoContent lang={lang} />} />
    </>
  );
}

/* ───────── About ───────── */

export function aboutMetadata(lang: Lang): Metadata {
  const c = PAGE_COPY[lang].about;
  return buildMetadata({ lang, path: "/about", title: c.title, description: c.description });
}

export function AboutPage({ lang }: { lang: Lang }) {
  const c = PAGE_COPY[lang].about;
  const b = crumbs(lang);
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ lang, path: "/about", name: c.title, description: c.description, type: "AboutPage" }),
          breadcrumbJsonLd(lang, [
            { name: b.home.breadcrumb, path: "/" },
            { name: b.about.breadcrumb, path: "/about" },
          ]),
        ]}
      />
      <AboutClient />
    </>
  );
}

/* ───────── Services ───────── */

export function servicesMetadata(lang: Lang): Metadata {
  const c = PAGE_COPY[lang].services;
  return buildMetadata({ lang, path: "/services", title: c.title, description: c.description });
}

export function ServicesPage({ lang }: { lang: Lang }) {
  const c = PAGE_COPY[lang].services;
  const b = crumbs(lang);
  const ui = getUiText(lang);
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ lang, path: "/services", name: c.title, description: c.description }),
          servicesJsonLd(
            lang,
            `${c.title} — ${SITE_NAME}`,
            ui.services.list.map((s) => ({ name: s.title, description: s.desc }))
          ),
          faqJsonLd(ui.servicesPage.faq.items),
          breadcrumbJsonLd(lang, [
            { name: b.home.breadcrumb, path: "/" },
            { name: b.services.breadcrumb, path: "/services" },
          ]),
        ]}
      />
      <ServicesClient />
    </>
  );
}

/* ───────── Contact ───────── */

export function contactMetadata(lang: Lang): Metadata {
  const c = PAGE_COPY[lang].contact;
  return buildMetadata({ lang, path: "/contact", title: c.title, description: c.description });
}

export function ContactPage({ lang }: { lang: Lang }) {
  const c = PAGE_COPY[lang].contact;
  const b = crumbs(lang);
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ lang, path: "/contact", name: c.title, description: c.description, type: "ContactPage" }),
          breadcrumbJsonLd(lang, [
            { name: b.home.breadcrumb, path: "/" },
            { name: b.contact.breadcrumb, path: "/contact" },
          ]),
        ]}
      />
      <ContactClient />
    </>
  );
}

/* ───────── Case studies ───────── */

export function caseStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export function caseMetadata(lang: Lang, slug: string): Metadata {
  const raw = getWork(slug);
  if (!raw) return { title: lang === "es" ? "Caso no encontrado" : "Case not found" };
  const work = localizeWork(raw, lang);
  const description =
    work.seoDescription ?? work.description ?? `${work.title} — ${work.subtitle} by ${SITE_NAME}.`;
  return {
    ...buildMetadata({
      lang,
      path: `/cases/${work.slug}`,
      title: `${work.title} — ${work.seoTitle ?? work.subtitle}`,
      description,
      type: "article",
      // Los casos ocultos siguen accesibles por URL directa (Behance, links
      // viejos) pero fuera del índice: no están enlazados ni en el sitemap.
      noindex: Boolean(work.hidden),
    }),
  };
}

export function CasePage({ lang, slug }: { lang: Lang; slug: string }) {
  const raw = getWork(slug);
  if (!raw) notFound();
  const work = localizeWork(raw, lang);
  const b = crumbs(lang);
  return (
    <>
      <JsonLd
        data={[
          caseStudyJsonLd(lang, work),
          breadcrumbJsonLd(lang, [
            { name: b.home.breadcrumb, path: "/" },
            { name: b.works.breadcrumb, path: "/works" },
            { name: work.title, path: `/cases/${work.slug}` },
          ]),
        ]}
      />
      <SmoothScroll>
        <main>
          <CaseStudy work={raw} next={getNextWork(slug)} />
        </main>
      </SmoothScroll>
    </>
  );
}
