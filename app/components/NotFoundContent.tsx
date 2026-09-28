"use client";

import Link from "next/link";
import { useLanguage } from "../lib/i18n";
import { getUiText } from "../lib/uiText";

export default function NotFoundContent() {
  const { lang } = useLanguage();
  const t = getUiText(lang);
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
        {t.notFound.errorLabel}
      </p>
      <h1 style={{ fontSize: "clamp(2.2rem, 7vw, 5rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
        {t.notFound.heading}
      </h1>
      <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "44ch" }}>
        {t.notFound.body}
      </p>
      <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
        <Link href="/" style={{ color: "var(--accent)" }}>{t.notFound.backHome}</Link>
        <Link href="/services" style={{ color: "var(--accent)" }}>{t.notFound.services}</Link>
        <Link href="/contact" style={{ color: "var(--accent)" }}>{t.notFound.contact}</Link>
      </nav>
    </main>
  );
}
