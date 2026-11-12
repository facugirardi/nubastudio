import "./globals.css";
import type { Metadata } from "next";
import NotFoundContent from "./components/NotFoundContent";
import { LanguageProvider } from "./lib/i18n";
import { fontClassName, rootViewport } from "./lib/rootShell";
import { SITE_NAME, SITE_URL } from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Page not found — ${SITE_NAME}`,
  description: "The page you were looking for doesn't exist.",
};

export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontClassName}>
        <LanguageProvider>
          <NotFoundContent />
        </LanguageProvider>
      </body>
    </html>
  );
}
