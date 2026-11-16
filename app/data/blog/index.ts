import type { Lang } from "../../lib/lang";
import { TEAM_MEMBERS } from "../../lib/seo";
import { blogPath, blogSlug, enBlogSlug } from "./slugs";
import type { BlogCategory, Post } from "./types";
import appCost from "./posts/how-much-does-it-cost-to-build-an-app";
import marketplaceCost from "./posts/how-much-does-it-cost-to-build-a-marketplace";
import nativeVsCross from "./posts/native-vs-react-native-vs-pwa";
import customVsSaas from "./posts/custom-software-vs-saas";
import chooseAgency from "./posts/how-to-choose-a-software-development-agency";
import argentinaCompanies from "./posts/software-development-companies-argentina";
import freelancerVsAgency from "./posts/freelancer-vs-in-house-vs-agency";
import whatIsMvp from "./posts/what-is-an-mvp";
import ourProcess from "./posts/from-idea-to-launch-our-process";
import validateIdea from "./posts/how-to-validate-an-app-idea";
import chickenEgg from "./posts/marketplace-chicken-and-egg-problem";
import villaRental from "./posts/how-to-build-a-luxury-villa-rental-platform";
import fashionMarketplace from "./posts/how-to-build-a-second-hand-fashion-marketplace";
import offlineApps from "./posts/offline-first-mobile-apps";
import eventPayments from "./posts/cashless-event-payments-qr-ordering";
import advisoryWebsites from "./posts/websites-for-consulting-and-financial-firms";
import realEstate from "./posts/real-estate-agency-software";
import fieldBooking from "./posts/sports-field-booking-app";
import blockchainCerts from "./posts/blockchain-certificates-use-cases";
import webVitals from "./posts/core-web-vitals-for-business";
import nextSeo from "./posts/nextjs-seo-checklist";
import aiSearch from "./posts/optimize-website-for-ai-search";
import wantAnApp from "./posts/want-to-build-an-app-where-to-start";
import customForBusiness from "./posts/how-to-build-custom-software-for-your-business";

export type { BlogCategory, Post, PostContent } from "./types";
export { blogPath, blogSlug, translateBlogPath } from "./slugs";

export const posts: Post[] = [
  appCost,
  marketplaceCost,
  whatIsMvp,
  chooseAgency,
  argentinaCompanies,
  nativeVsCross,
  customVsSaas,
  freelancerVsAgency,
  ourProcess,
  validateIdea,
  chickenEgg,
  villaRental,
  fashionMarketplace,
  offlineApps,
  eventPayments,
  advisoryWebsites,
  realEstate,
  fieldBooking,
  blockchainCerts,
  webVitals,
  nextSeo,
  aiSearch,
  wantAnApp,
  customForBusiness,
];

export const BLOG_CATEGORIES: BlogCategory[] = ["costs", "product", "industry", "tech"];

/**
 * Un artículo se publica a la medianoche de Argentina del día de su `date`.
 * Las páginas del blog se revalidan cada hora, así aparece solo sin redeploy.
 */
export function isPublished(post: Post, now = new Date()): boolean {
  return new Date(`${post.date}T00:00:00-03:00`) <= now;
}

export function publishedPosts(now = new Date()): Post[] {
  return posts.filter((p) => isPublished(p, now));
}

/** El artículo cuyo slug es `slug` en el idioma `lang` (publicado o no). */
export function getPost(slug: string, lang: Lang = "en"): Post | undefined {
  const en = enBlogSlug(slug, lang);
  return posts.find((p) => p.slug === en);
}

export function postPath(post: Post, lang: Lang): string {
  return blogPath(post.slug, lang);
}

export function postSlug(post: Post, lang: Lang): string {
  return blogSlug(post.slug, lang);
}

export function postsByCategory(category: BlogCategory): Post[] {
  return publishedPosts().filter((p) => p.category === category);
}

/** Otros artículos para leer después: primero los de la misma categoría. */
export function relatedPosts(post: Post, count = 3): Post[] {
  const live = publishedPosts().filter((p) => p.slug !== post.slug);
  const same = live.filter((p) => p.category === post.category);
  const rest = live.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}

/** Artículos publicados que recomiendan un caso: se muestran al final del caso. */
export function postsForCase(caseSlug: string): Post[] {
  return publishedPosts().filter((p) => p.cases?.includes(caseSlug));
}

const CATEGORY_AUTHOR: Record<BlogCategory, string> = {
  costs: "Ángel Vaquero",
  product: "Ángel Vaquero",
  industry: "Alejo Vaquero",
  tech: "Facundo Girardi",
};

export function postAuthor(post: Post): (typeof TEAM_MEMBERS)[number] {
  const name = post.author ?? CATEGORY_AUTHOR[post.category];
  return TEAM_MEMBERS.find((m) => m.name === name) ?? TEAM_MEMBERS[0];
}

export function readingMinutes(post: Post, lang: Lang): number {
  const words = post.content[lang].body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function lastModified(post: Post): string {
  return post.updated ?? post.date;
}
