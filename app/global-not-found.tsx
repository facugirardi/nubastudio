import type { Metadata } from "next";
import { headers } from "next/headers";
import { Outfit } from "next/font/google";
import "./globals.css";
import NotFoundContent from "./components/NotFoundContent";
import { LanguageProvider } from "./lib/i18n";
import { isLang, type Lang } from "./lib/lang";
import { seoText } from "./lib/seoText";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Mismo nombre que LANG_HEADER en proxy.ts (el proxy no se puede importar desde acá).
async function requestLang(): Promise<Lang> {
  const value = (await headers()).get("x-site-lang");
  return isLang(value) ? value : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const text = seoText[await requestLang()].notFound;
  return { title: text.title, description: text.description, robots: { index: false, follow: true } };
}

/**
 * El 404 de las URLs que ninguna ruta atiende. Como el layout raíz depende del
 * idioma, trae su propio documento, con el <html lang> del idioma de la URL.
 */
export default async function GlobalNotFound() {
  const lang = await requestLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <LanguageProvider lang={lang}>
          <NotFoundContent />
        </LanguageProvider>
      </body>
    </html>
  );
}
