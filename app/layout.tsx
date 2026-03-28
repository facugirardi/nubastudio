import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { defaultOpenGraphImages } from "@/lib/seo";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    images: defaultOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  // TODO(SEO): add google / yandex verification tokens from Search Console when domain is live:
  // verification: { google: "…" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
