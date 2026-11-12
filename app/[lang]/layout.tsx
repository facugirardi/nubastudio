import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Instrument_Serif, Outfit } from "next/font/google";
import "../globals.css";
import CaseTransitionProvider from "../components/caseTransition";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "../lib/jsonLd";
import { LanguageProvider } from "../lib/i18n";
import { LANGS, isLang } from "../lib/lang";
import { seoText } from "../lib/seoText";
import { SITE_NAME, SITE_URL } from "../lib/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  // Variable completa: el rediseño anima el peso entre 300 y 700.
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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
      <body className={`${outfit.variable} ${instrumentSerif.variable} antialiased`}>
        <LanguageProvider lang={lang}>
          {children}
          <CaseTransitionProvider />
        </LanguageProvider>
      </body>
    </html>
  );
}
