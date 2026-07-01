export type WorkItem = {
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  task?: string;
  solutions?: string;
  description?: string;
  process?: string;
  result?: string;
  features?: string[];
  technologies?: string[];
  images?: string[];
  links?: {
    web?: string;
    ios?: string;
    android?: string;
    behance?: string;
    other?: { label: string; url: string };
  };
};

export const works: WorkItem[] = [
  {
    title: "Nuddo",
    subtitle: "Web & Mobile Development",
    image: "/images/cases/nuddo/frame2.webp",
    slug: "nuddo",
    task: "Develop a comprehensive circular fashion marketplace that connects people to buy and sell second-hand clothing with ease, security, and trust. Build both web application and mobile apps for iOS and Android, creating a seamless experience across all platforms. The platform needed to support not only second-hand sales but also provide a space for local fashion brands to showcase new clothing.",
    solutions: "We created a full-featured marketplace platform that goes beyond traditional e-commerce—it's a community. The platform enables users to easily publish and sell items in just a few steps, with integrated door-to-door shipping logistics for comfort, speed, and security. We implemented Mercado Pago payment system with buyer and seller protection mechanisms, ensuring trust and safety. The solution includes user reputation systems, accessible pricing with standard or economical shipping options, and a seamless transaction flow. Available on web, iOS, and Android platforms, Nuddo represents a movement towards more conscious consumption that connects people, empowers local brands, and generates positive impact on society and the environment.",
    description: "Nuddo is an innovative application that connects people who want to sell and buy second-hand clothing with ease, security, and trust. Our goal is to give new life to unused garments while offering an accessible and sustainable alternative to traditional consumption. Unlike other buy-sell spaces, Nuddo is not just a marketplace: it's a community where each garment has a story to tell.",
    process: "We developed both the web application and mobile apps for iOS and Android, ensuring a seamless experience across all devices. The development process focused on creating an intuitive user interface, implementing secure payment systems, and building a robust backend that supports complex marketplace operations including shipping logistics, user reputation, and transaction management.",
    result: "Nuddo is now live and available on web, iOS, and Android platforms. The platform successfully connects buyers and sellers in a circular fashion economy, with integrated shipping, secure payments, and a thriving community of users. The app represents a movement towards more conscious consumption that connects people, empowers local brands, and generates positive impact.",
    features: [
      "Easy item publishing and selling",
      "Door-to-door shipping integration",
      "Mercado Pago secure payments",
      "User reputation system",
      "Local brand showcase space",
      "Multi-platform support (Web, iOS, Android)",
    ],
    technologies: ["Python", "Flask", "JavaScript", "React Native", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
    images: [
      "/images/cases/nuddo/frame2.webp",
      "/images/cases/nuddo/frame3.webp",
      "/images/cases/nuddo/frame4.webp",
      "/images/cases/nuddo/nuddo4.webp",
      "/images/cases/nuddo/nuddo_mobile_1.png",
      "/images/cases/nuddo/nuddo_mobile_3.png",
    ],
    links: {
      web: "https://www.nuddo.com.ar",
      ios: "https://apps.apple.com/ar/app/nuddo/id6753880733",
      android: "https://play.google.com/store/apps/details?id=com.nuddo.app",
    },
  },
  {
    title: "Kennedy's Group",
    subtitle: "Frontend Development",
    image: "/images/cases/kennedys/ken1.webp",
    slug: "kennedys",
    task: "We were outsourced to develop the frontend for the company's institutional website. Create a professional, modern interface that includes property visualization, events display, and clear information about their services and values. This was a frontend-only project, focusing on building a responsive and visually appealing user interface with interactive property browsing and event showcases.",
    solutions: "We crafted a clean, professional institutional website that effectively communicates the company's brand identity. As a frontend-only development team, we focused on creating an exceptional user experience with a responsive design, featuring interactive property visualization and events display. The website allows visitors to easily explore the vast array of ultra-luxury villas and bespoke concierge services offered by Kennedy's Group.",
    description: "Kennedy's Group is an enthusiastic team of like-minded hospitality experts, whose main goal is to bring your dream holidays to life. Displaying a vast array of ultra-luxury villas and bespoke concierge services, we focus on matching each one of our selective guests with his/her ideal home-away-from-home, accompanied by all the amenities and services of a 7* exclusive resort.",
    process: "As an outsourced frontend development team, we focused exclusively on frontend development, creating a responsive and visually appealing website. The process involved understanding the company's brand identity, developing a clean and modern interface, and ensuring the site provides clear navigation that showcases the luxury villas and concierge services effectively.",
    result: "The Kennedy's Group website successfully represents the company's professional image and luxury brand positioning while providing an intuitive user experience that helps visitors understand the company's ultra-luxury villa offerings and exclusive concierge services.",
    features: [
      "Property visualization",
      "Events display",
      "Responsive design",
      "Modern UI/UX",
      "Brand-focused design",
      "Clear information architecture",
      "Professional presentation",
      "Service showcase",
    ],
    technologies: ["JavaScript", "Next.js", "Node.js"],
    images: [
      "/images/cases/kennedys/ken1.webp",
      "/images/cases/kennedys/ken2.webp",
      "/images/cases/kennedys/ken3.webp",
      "/images/cases/kennedys/ken4.webp",
      "/images/cases/kennedys/ken5.webp",
      "/images/cases/kennedys/ken6.webp",
    ],
    links: {},
  },
  {
    title: "FFMates",
    subtitle: "UX/UI Design",
    image: "/images/cases/ffmates/ffmatesmock1.webp",
    slug: "ffmates",
    task: "Design an e-commerce platform with a focus on navigability, product visualization, and purchase flow. Create an intuitive shopping experience that guides users seamlessly from browsing to checkout.",
    solutions: "We designed an e-commerce platform centered on exceptional user experience. The design prioritizes easy navigation, clear product visualization, and a streamlined purchase flow, making online shopping intuitive and enjoyable for customers.",
    description: "FFMates is an e-commerce platform designed with a strong focus on user experience. The project required a design that prioritizes navigability, effective product visualization, and a smooth purchase flow that guides users naturally from product discovery to checkout completion.",
    process: "Our design process focused on creating an intuitive shopping experience. We conducted user research, developed wireframes, and created high-fidelity designs that emphasize easy navigation, clear product presentation, and a streamlined checkout process. Every design decision was made with the user journey in mind.",
    result: "The FFMates design successfully creates an engaging and intuitive e-commerce experience. The design emphasizes user-friendly navigation, effective product visualization, and a purchase flow that reduces friction and encourages conversions.",
    features: [
      "Intuitive navigation system",
      "Enhanced product visualization",
      "Streamlined checkout flow",
      "User-centered design",
      "Mobile-responsive layouts",
      "Conversion-optimized UX",
    ],
    technologies: ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design"],
    images: [
      "/images/cases/ffmates/ffmatesmock1.webp",
      "/images/cases/ffmates/ffmatesmock2.webp",
      "/images/cases/ffmates/ffmatesmock3.webp",
      "/images/cases/ffmates/ffmatesm4.webp",
      "/images/cases/ffmates/ffmatz5.webp",
      "/images/cases/ffmates/ffmatesmock6.webp",
    ],
    links: {
      behance: "https://www.behance.net/gallery/225646897/E-commerce-Design-UIUX",
    },
  },
  {
    title: "CheckRTO",
    subtitle: "Web Development",
    image: "/images/cases/checkrto/check1.webp",
    slug: "checkrto",
    task: "Build a comprehensive vehicle inspection platform that manages reviews, reports, certificates, and technical workflows. Create an intuitive system for inspectors and vehicle owners to track and manage inspection processes.",
    solutions: "We developed a robust platform that streamlines the entire vehicle inspection process. The system handles inspection reviews, generates detailed reports, issues certificates, and manages complex technical workflows, making vehicle inspections more efficient and transparent.",
    description: "CheckRTO is a comprehensive vehicle inspection platform designed to manage the entire inspection lifecycle. The system enables inspectors to conduct thorough vehicle reviews, generate detailed reports, issue certificates, and manage complex technical workflows all in one integrated platform.",
    process: "We built a full-stack web application with a focus on usability for both inspectors and vehicle owners. The development process involved creating intuitive dashboards, implementing document generation systems, and building workflow management tools that ensure compliance with inspection regulations.",
    result: "CheckRTO successfully digitizes the vehicle inspection process, making it more efficient, transparent, and accessible for all stakeholders involved in the inspection ecosystem.",
    features: [
      "Inspection review management",
      "Automated report generation",
      "Digital certificate issuance",
      "Technical workflow management",
      "Inspector and owner dashboards",
      "Compliance tracking",
    ],
    technologies: ["Python", "Flask", "JavaScript", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
    images: [
      "/images/cases/checkrto/check1.webp",
      "/images/cases/checkrto/2check.webp",
      "/images/cases/checkrto/check3.webp",
      "/images/cases/checkrto/check4.webp",
      "/images/cases/checkrto/check_5.webp",
      "/images/cases/checkrto/check6.webp",
    ],
    links: {
      web: "https://www.checkrto.com",
    },
  },
  {
    title: "Bausing",
    subtitle: "Web Development",
    image: "/images/cases/bausing/desktop1-bausing.webp",
    slug: "bausing",
    task: "Develop a comprehensive e-commerce platform for mattresses and a digital wallet for Argentine pesos (Bausing wallet). Create an intuitive online store that allows customers to browse, compare, and purchase mattresses with ease, along with a digital wallet system that enables users to manage their pesos digitally.",
    solutions: "We developed a full-featured e-commerce platform specifically designed for mattress sales, along with a digital wallet system for Argentine pesos. The platform includes detailed product catalogs, easy navigation, secure checkout processes, and an intuitive shopping experience. Additionally, we built a digital wallet (Bausing wallet) that allows users to manage, transfer, and use pesos digitally within the platform.",
    description: "Bausing is an e-commerce platform specializing in mattress sales, featuring a comprehensive online shopping experience with detailed product information, easy browsing, and secure purchasing options. Bausing also includes a digital wallet system for Argentine pesos, allowing users to manage their money digitally within the platform.",
    process: "We built a full-stack web application with a focus on creating an exceptional shopping experience for mattress buyers and implementing a digital wallet system. The development process involved creating intuitive product browsing, implementing secure payment systems, building the digital wallet functionality for pesos, and developing user-friendly interfaces for both the e-commerce and wallet features.",
    result: "Bausing successfully provides customers with a seamless online shopping experience for mattresses, along with a fully functional digital wallet for Argentine pesos. The platform enables customers to easily browse, compare, and purchase mattresses, while also managing their pesos digitally through the integrated wallet system.",
    features: [
      "Product catalog and browsing",
      "Detailed product specifications",
      "Secure checkout process",
      "Digital wallet for Argentine pesos",
      "User-friendly interface",
      "Mobile-responsive design",
      "Product search and filtering",
      "Wallet balance management",
    ],
    technologies: ["Python", "Flask", "JavaScript", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
    images: [
      "/images/cases/bausing/desktop1-bausing.webp",
      "/images/cases/bausing/desktop2-bausing.webp",
      "/images/cases/bausing/desktop3-bausing.webp",
      "/images/cases/bausing/desktop4-bausing.webp",
      "/images/cases/bausing/foto5.webp",
      "/images/cases/bausing/foto6.webp",
    ],
    links: {},
  },
  {
    title: "PartidosYa",
    subtitle: "UX/UI Design",
    image: "/images/cases/partidosya/py1-min.webp",
    slug: "partidosya",
    task: "Create a mobile application for booking sports fields with a focus on simplicity and speed. Design intuitive screens and interactions that allow users to quickly find and reserve available fields.",
    solutions: "We designed a mobile-first application that simplifies the process of booking sports fields. The design emphasizes speed and simplicity, with intuitive screen layouts and smooth interactions that enable users to make reservations in just a few taps.",
    description: "PartidosYa is a mobile application designed to simplify the process of booking sports fields. The project required a design that prioritizes simplicity and speed, allowing users to quickly find available fields and make reservations with minimal friction.",
    process: "We designed a mobile-first experience with a focus on simplicity and rapid interactions. The design process involved creating intuitive screen layouts, smooth transitions, and a booking flow that can be completed in just a few taps. Every interaction was optimized for speed and ease of use.",
    result: "The PartidosYa design successfully creates a fast and intuitive booking experience. Users can quickly browse available fields, view details, and complete reservations with minimal effort, making the entire process seamless and enjoyable.",
    features: [
      "Quick field search and discovery",
      "Simple reservation flow",
      "Intuitive screen layouts",
      "Fast interactions",
      "Mobile-optimized design",
      "User-friendly interface",
    ],
    technologies: ["Figma", "User Research", "Wireframing", "Prototyping", "User Testing"],
    images: [
      "/images/cases/partidosya/py1-min.webp",
      "/images/cases/partidosya/py2.webp",
      "/images/cases/partidosya/py3-min.webp",
      "/images/cases/partidosya/py4.webp",
      "/images/cases/partidosya/py5-min.webp",
      "/images/cases/partidosya/py6.webp",
    ],
    links: {
      behance: "https://www.behance.net/gallery/226945829/Mobile-App-Design-UIUX",
    },
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return works.find((w) => w.slug === slug);
}

export function getNextWork(slug: string): WorkItem {
  const i = works.findIndex((w) => w.slug === slug);
  return works[(i + 1) % works.length];
}
