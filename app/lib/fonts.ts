import { DM_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const satoshi = localFont({
  variable: "--font-satoshi",
  src: "../fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${dmSans.variable} ${satoshi.variable} ${geistMono.variable}`;
