import Link from "next/link";
import { visibleWorks } from "../data/works";
import { localizeWork } from "../lib/localizeWork";
import { localePath, type Lang } from "../lib/locale";

const COPY = {
  en: {
    label: "About Nuba Studio and selected work",
    h1: "Nuba Studio portfolio — websites, apps and platforms built in Córdoba, Argentina",
    p1: "Nuba Studio is a digital product studio based in Córdoba, Argentina. We design and build websites, mobile apps, marketplaces and custom software end to end, from strategy and product design to development and launch. We work with founders and companies across Argentina, Latin America and the rest of the world.",
    p2: "Our services include web design and development, iOS and Android app development, marketplace and platform engineering, product and UI/UX design, and brand identity for digital products. We build with Next.js, React, React Native, TypeScript, Python and Node.",
    work: "Selected work",
    explore: "Explore Nuba Studio",
    about: "About the studio and the team",
    services: "Services: web, apps, marketplaces and product design",
    contact: "Contact Nuba Studio",
  },
  es: {
    label: "Sobre Nuba Studio y trabajos seleccionados",
    h1: "Portfolio de Nuba Studio — webs, apps y plataformas hechas en Córdoba, Argentina",
    p1: "Nuba Studio es un estudio de productos digitales de Córdoba, Argentina. Diseñamos y desarrollamos sitios web, apps móviles, marketplaces y software a medida de punta a punta, desde la estrategia y el diseño de producto hasta el desarrollo y el lanzamiento. Trabajamos con founders y empresas de Argentina, Latinoamérica y el resto del mundo.",
    p2: "Nuestros servicios incluyen diseño y desarrollo web, desarrollo de apps iOS y Android, marketplaces y plataformas, diseño de producto y UX/UI, e identidad de marca para productos digitales. Trabajamos con Next.js, React, React Native, TypeScript, Python y Node.",
    work: "Trabajos seleccionados",
    explore: "Conocé Nuba Studio",
    about: "Sobre el estudio y el equipo",
    services: "Servicios: webs, apps, marketplaces y diseño de producto",
    contact: "Contacto con Nuba Studio",
  },
} as const;

/** Texto para crawlers y lectores de pantalla; la vista de /works es WebGL. */
export default function HomeSeoContent({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const lp = (p: string) => localePath(p, lang);
  return (
    <section className="sr-only" aria-label={t.label}>
      <h1>{t.h1}</h1>
      <p>{t.p1}</p>
      <p>{t.p2}</p>

      <h2>{t.work}</h2>
      <ul>
        {visibleWorks.map((raw) => {
          const work = localizeWork(raw, lang);
          const desc = work.seoDescription ?? work.description;
          return (
            <li key={work.slug}>
              <Link href={lp(`/cases/${work.slug}`)}>
                {work.title} — {work.seoTitle ?? work.subtitle}
                {work.year ? ` (${work.year})` : ""}
              </Link>
              {desc ? <p>{desc}</p> : null}
            </li>
          );
        })}
      </ul>

      <h2>{t.explore}</h2>
      <ul>
        <li>
          <Link href={lp("/about")}>{t.about}</Link>
        </li>
        <li>
          <Link href={lp("/services")}>{t.services}</Link>
        </li>
        <li>
          <Link href={lp("/contact")}>{t.contact}</Link>
        </li>
      </ul>
    </section>
  );
}
