/** Site copy and naming — safe to import from server or client. */
export const siteConfig = {
  name: "Nuba Studio",
  titleTemplate: "%s | Nuba Studio",
  description:
    "Nuba Studio is a creative agency: branding, UX/UI, web and mobile development. We build digital products people remember.",
  locale: "en",
} as const;

/** Canonical production origin (no trailing slash). */
export const siteOrigin = "https://nuba.studio" as const;

export function getSiteUrl(): string {
  return siteOrigin;
}
