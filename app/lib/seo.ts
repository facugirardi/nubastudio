export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://nuba.studio";

export const SITE_NAME = "Nuba Studio";

export const SITE_TAGLINE = "Digital product studio";

export const SITE_DESCRIPTION =
  "Nuba Studio is a digital product studio from Córdoba, Argentina. We design and build websites, mobile apps, marketplaces and digital products end to end.";

export const TWITTER_HANDLE = "@nubastudio";

export const CONTACT = {
  phone: "+5493513471844",
  whatsapp: "https://wa.me/5493513471844",
  linkedin: "https://linkedin.com/company/nubastudio",
  city: "Córdoba",
  region: "Córdoba",
  country: "AR",
};

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const KEYWORDS = [
  "digital product studio",
  "web design agency",
  "web development studio",
  "mobile app development",
  "marketplace development",
  "product design",
  "Next.js development",
  "React Native development",
  "UI UX design studio",
  "agencia digital Córdoba",
  "desarrollo web Argentina",
  "diseño de productos digitales",
];
