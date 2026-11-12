import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import CaseTransitionProvider from "../components/caseTransition";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "./jsonLd";
import { LanguageProvider } from "./i18n";
import type { Lang } from "./locale";
import { SITE_COPY, SITE_NAME, SITE_URL } from "./seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const fontClassName = `${outfit.variable} ${instrumentSerif.variable} antialiased`;

/**
 * Metadata base de cada layout raíz. Sin canonical ni openGraph/twitter:
 * cada página declara los suyos (buildMetadata), y así el 404 no hereda un
 * canonical a la home.
 */
export function baseMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${SITE_COPY[lang].tagline}`,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_COPY[lang].description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    manifest: "/manifest.webmanifest",
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
  };
}

export const rootViewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd(lang)]} />
      </head>
      <body className={fontClassName}>
        <LanguageProvider lang={lang}>
          {children}
          <CaseTransitionProvider />
        </LanguageProvider>
      </body>
    </html>
  );
}
