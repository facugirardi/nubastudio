"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import SmoothScroll from "./SmoothScroll";
import HomeWork from "./home/HomeWork";
import HomeServices from "./home/HomeServices";
import HomeProcess from "./home/HomeProcess";
import HomeCta from "./home/HomeCta";
import Footer from "./home/Footer";

export default function HomeClient({ seoFallback }: { seoFallback?: React.ReactNode }) {
  return (
    <>
      <SmoothScroll infinite={false}>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {seoFallback}
          <Hero />
          <HomeWork />
          <HomeServices />
          <HomeProcess />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
