/**
 * Post-launch SEO checklist (manual / third-party). Not executed by the app.
 *
 * Canonical URL is fixed in lib/site.ts (siteOrigin).
 *
 * TODO: Verify favicon + apple-touch-icon + og:image assets match brand (replace default OG image in lib/seo.ts if needed).
 * TODO: Register property in Google Search Console + submit sitemap (/sitemap.xml).
 * TODO: Optional: Bing Webmaster Tools, Google Business Profile if applicable.
 * TODO: Add real social @handle to root metadata (twitter.site / creators) when accounts exist.
 * TODO: Fill organizationJsonLd sameAs with LinkedIn, Instagram, Behance URLs.
 * TODO: After content changes, run Lighthouse / PageSpeed and fix LCP, CLS, and accessibility on key routes.
 * TODO: If you add blog or many pages, extend sitemap (changeFrequency / priority) in app/sitemap.ts.
 */

export const SEO_TODO_CHECKLIST = [
  "Google Search Console + sitemap",
  "OG image + sameAs links",
  "Twitter handle in metadata",
  "Lighthouse pass on / and /cases/*",
] as const;
