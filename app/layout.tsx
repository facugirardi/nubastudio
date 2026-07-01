import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CaseTransitionProvider from "./components/caseTransition";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nuba Studio",
  description: "Nuba Studio",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        {children}
        <CaseTransitionProvider />
      </body>
    </html>
  );
}
