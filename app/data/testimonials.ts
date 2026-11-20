import type { Lang } from "../lib/lang";

export type Testimonial = {
  /** Slug del caso en works.ts: da la imagen y el link. */
  caseSlug: string;
  name: string;
  role: Record<Lang, string>;
  quote: Record<Lang, string>;
  /**
   * Texto sin aprobar por el cliente: se ve en desarrollo y nunca en producción.
   * Sacarlo recién cuando la persona haya aprobado la cita tal cual está.
   */
  draft?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    caseSlug: "bausing",
    name: "Andrés",
    role: { en: "Owner, Bausing", es: "Dueño de Bausing" },
    quote: {
      en: "They always delivered everything on time and as agreed, and ended up exceeding all our expectations.",
      es: "Siempre cumplieron con todo en tiempo y forma, y terminaron superando todas nuestras expectativas.",
    },
    draft: true,
  },
];

export const publishedTestimonials = testimonials.filter(
  (t) => !t.draft || process.env.NODE_ENV !== "production"
);
