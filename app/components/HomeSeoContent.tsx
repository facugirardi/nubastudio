import Link from "next/link";
import { works } from "../data/works";

export default function HomeSeoContent() {
  return (
    <section className="sr-only" aria-label="About Nuba Studio and selected work">
      <h1>Nuba Studio — digital product studio in Córdoba, Argentina</h1>
      <p>
        Nuba Studio is a digital product studio based in Córdoba, Argentina. We design
        and build websites, mobile apps, marketplaces and digital products end to end —
        from strategy and product design to development and launch. We work with
        founders and companies across Argentina, Latin America and the rest of the
        world.
      </p>
      <p>
        Our services include web design and development, iOS and Android app
        development, marketplace and platform engineering, product and UI/UX design,
        and brand identity for digital products. We build with Next.js, React, React
        Native, TypeScript, Python and Node.
      </p>

      <h2>Selected work</h2>
      <ul>
        {works.map((work) => (
          <li key={work.slug}>
            <Link href={`/cases/${work.slug}`}>
              {work.title} — {work.seoTitle ?? work.subtitle}
              {work.year ? ` (${work.year})` : ""}
            </Link>
            {work.seoDescription ?? work.description ? (
              <p>{work.seoDescription ?? work.description}</p>
            ) : null}
          </li>
        ))}
      </ul>

      <h2>Explore Nuba Studio</h2>
      <ul>
        <li>
          <Link href="/about">About the studio and the team</Link>
        </li>
        <li>
          <Link href="/services">Services: web, apps, marketplaces and product design</Link>
        </li>
        <li>
          <Link href="/contact">Contact Nuba Studio</Link>
        </li>
      </ul>
    </section>
  );
}
