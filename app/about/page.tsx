import type { Metadata } from "next";
import About from "../components/About";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import { JsonLd, breadcrumbJsonLd } from "../lib/jsonLd";
import { SITE_NAME } from "../lib/seo";

const description =
  "Meet Nuba Studio: a small, senior team from Córdoba, Argentina that turns ideas into digital products. Our philosophy, our process and the people behind the work.";

export const metadata: Metadata = {
  title: "About the studio",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: `About ${SITE_NAME}`,
    description,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <SmoothScroll>
        <Navbar visible={true} view="spiral" showToggle={false} />
        <main>
          <About />
        </main>
      </SmoothScroll>
    </>
  );
}
