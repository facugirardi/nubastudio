import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Nuba Studio - Creative Agency",
  description: "Nuba Studio, is a creative agency that helps businesses grow and succeed. We are a team of designers, developers, and marketers who are passionate about creating beautiful and functional websites and apps.",
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
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
