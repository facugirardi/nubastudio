"use client";

import Services from "../components/Services";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Navbar visible={true} view="spiral" setView={() => {}} showToggle={false} />
      <Services />
    </SmoothScroll>
  );
}
