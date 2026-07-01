"use client";

import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";

export default function ContactPage() {
  return (
    <SmoothScroll>
      <Navbar visible={true} view="spiral" setView={() => {}} showToggle={false} />
      <Contact />
    </SmoothScroll>
  );
}
