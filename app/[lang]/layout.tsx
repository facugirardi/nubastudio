import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import CaseTransitionProvider from "../components/caseTransition";
import PageTransition from "../components/PageTransition";
import EasterEggs from "../components/EasterEggs";
import AnalyticsConsent from "../components/AnalyticsConsent";
import { fontVariables } from "../lib/fonts";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "../lib/jsonLd";
import { LanguageProvider } from "../lib/i18n";
import { LANGS, isLang } from "../lib/lang";
import { seoText } from "../lib/seoText";
import { SITE_NAME, SITE_URL } from "../lib/seo";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// Solo existen /en (la raíz) y /es: cualquier otro valor es un 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const text = seoText[lang];

  return {
    metadataBase: new URL(SITE_URL),
    // Las páginas fijan su propio title; este es el de relleno y el sufijo del resto.
    title: { default: text.home.title, template: `%s - ${SITE_NAME}` },
    description: text.home.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    openGraph: {
      type: "website",
      locale: text.ogLocale,
      siteName: SITE_NAME,
      title: text.home.ogTitle,
      description: text.home.description,
    },
    twitter: {
      card: "summary_large_image",
      title: text.home.ogTitle,
      description: text.home.description,
    },
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

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <JsonLd data={[organizationJsonLd(lang), webSiteJsonLd(lang)]} />
      </head>
      <body className={`${fontVariables} antialiased`}>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-[#C6FF00] px-4 py-2 font-display text-[14px] font-medium text-black transition-transform focus:translate-y-0 focus:outline-none"
        >
          {lang === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <LanguageProvider lang={lang}>
          {children}
          <CaseTransitionProvider />
          <PageTransition />
          <EasterEggs />
          <AnalyticsConsent />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
