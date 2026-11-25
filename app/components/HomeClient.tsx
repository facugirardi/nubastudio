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
import type { WorkSummary } from "../data/works";

export default function HomeClient({ works, seoFallback }: { works: WorkSummary[]; seoFallback?: React.ReactNode }) {
  return (
    <>
      <Loader />
      <SmoothScroll infinite={false}>
        <Navbar />
        <GridBeams />
        <main id="main" tabIndex={-1} className="outline-none">
          {seoFallback}
          <Hero works={works} />
          <HomeWork works={works} />
          <HomeTestimonial works={works} />
          <HomeServices />
          <HomeProcess />
          <HomeCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
