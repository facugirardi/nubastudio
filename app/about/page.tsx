"use client";

import About from "../components/About";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Navbar visible={true} view="spiral" setView={() => {}} showToggle={false} />
      <About />
    </SmoothScroll>
  );
}
