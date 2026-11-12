import "../globals.css";
import { RootShell, baseMetadata, rootViewport } from "../lib/rootShell";

export const metadata = baseMetadata("en");
export const viewport = rootViewport;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
