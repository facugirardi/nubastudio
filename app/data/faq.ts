/**
 * Fuente unica de las FAQ: alimenta la seccion visible de /services y el
 * FAQPage del JSON-LD. Google exige que el schema refleje lo que se ve, asi
 * que ambos leen de aca y no pueden desincronizarse.
 */
export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: "How long does a project take?",
    answer:
      "It depends on scope, but most projects run between two and four months from kickoff to launch. A focused site lands at the shorter end; a marketplace or an app with a backend behind it sits at the longer one. We give you a real range once we understand what you are building, not before.",
  },
  {
    question: "Do you handle both design and development?",
    answer:
      "Both, and that is the point. Design, interaction and code happen at the same table, so nothing gets handed off between teams and lost along the way. You do not need to bring your own designer or your own developers.",
  },
  {
    question: "Do you work with clients outside Argentina?",
    answer:
      "Yes. The studio is based in Córdoba and works remotely with clients across Latin America and beyond. We work in English or Spanish, whichever suits your team.",
  },
  {
    question: "Do you offer maintenance after launch?",
    answer:
      "Yes. Launch is rarely the end of a product. We stay on for maintenance and continuous improvement when you want us to: for Kennedy's Group we are the ongoing full-stack team, still shipping features long after the first release.",
  },
  {
    question: "How do you structure contracts?",
    answer:
      "Per project. We scope the work upfront and agree on what is included before anything starts, so you know what you are getting and what it covers.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Next.js, React and TypeScript on the web; React Native and Expo for iOS and Android; Node and Python on the backend, usually with PostgreSQL. We pick the stack that fits the product, not the other way around.",
  },
];
