"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Works from "./components/Works";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  const [view, setView] = useState<"spiral" | "list">("spiral");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "list") {
      setView("list");
    }
  }, []);
  return (
    <SmoothScroll infinite>
      <Navbar visible={true} view={view} setView={setView} />
      <main>
        <Works view={view} setView={setView} />
      </main>
    </SmoothScroll>
  );
}
