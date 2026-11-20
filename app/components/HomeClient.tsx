"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";
import HomeWork from "./home/HomeWork";
import HomeTestimonial from "./home/HomeTestimonial";
import HomeServices from "./home/HomeServices";
import HomeProcess from "./home/HomeProcess";
import HomeCta from "./home/HomeCta";
import Footer from "./home/Footer";
import GridBeams from "./home/GridBeams";

export default function HomeClient({ seoFallback }: { seoFallback?: React.ReactNode }) {
  return (
    <>
      <Loader />
      <SmoothScroll infinite={false}>
        <Navbar />
        <GridBeams />
        <main id="main" tabIndex={-1} className="outline-none">
          {seoFallback}
          <Hero />
          <HomeWork />
          <HomeTestimonial />
          <HomeServices />
          <HomeProcess />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
