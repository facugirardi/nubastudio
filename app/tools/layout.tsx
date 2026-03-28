import type { Metadata } from "next";

/** Internal utilities: exclude from indexing; main marketing SEO lives elsewhere. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
