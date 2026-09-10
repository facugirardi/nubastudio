import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
        Error 404
      </p>
      <h1 style={{ fontSize: "clamp(2.2rem, 7vw, 5rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
        This page doesn&apos;t exist.
      </h1>
      <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "44ch" }}>
        The link may be broken or the page may have moved. Everything we&apos;ve built is still one click away.
      </p>
      <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
        <Link href="/" style={{ color: "var(--accent)" }}>Back home</Link>
        <Link href="/services" style={{ color: "var(--accent)" }}>Services</Link>
        <Link href="/contact" style={{ color: "var(--accent)" }}>Contact</Link>
      </nav>
    </main>
  );
}
