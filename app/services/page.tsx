import type { Metadata } from "next";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, servicesJsonLd } from "../lib/jsonLd";
import { FAQ } from "../data/faq";
import { SITE_NAME } from "../lib/seo";

const description =
  "Web development, iOS & Android apps, marketplaces and platforms, branding and product strategy. Nuba Studio designs and builds digital products end to end.";

const SERVICES = [
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
];

export const metadata: Metadata = {
  title: "Services — web, apps, marketplaces & product design",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: `Services — ${SITE_NAME}`,
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          servicesJsonLd(SERVICES),
          faqJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <SmoothScroll>
        <Navbar visible={true} view="spiral" showToggle={false} />
        <main>
          <Services />
        </main>
      </SmoothScroll>
    </>
  );
}
