export type WorkItem = {
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  task?: string;
  solutions?: string;
  // Case-specific information
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
    subtitle: "Web & Mobile App Development, UX/UI Design",
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
      "Multi-platform support (Web, iOS, Android)"
    ],
    technologies: ["Python", "JavaScript", "React Native", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
    images: [
      "/images/cases/nuddo/frame2.webp",
      "/images/cases/nuddo/frame3.webp",
      "/images/cases/nuddo/frame4.webp",
      "/images/cases/nuddo/nuddo4.webp",
      "/images/cases/nuddo/nuddo_mobile_1.png",
      "/images/cases/nuddo/nuddo_mobile_3.png"
    ],
    links: {
      web: "https://www.nuddo.com.ar",
      ios: "https://apps.apple.com/ar/app/nuddo/id6753880733",
      android: "https://play.google.com/store/apps/details?id=com.nuddo.app"
    }
  },
  {
    title: "Kennedy's Group",
    subtitle: "Frontend Development",
    image: "/images/cases/kennedys/ken1.webp",
    slug: "kennedys-group",
    task: "We were outsourced to develop the frontend for the company's institutional website. Create a professional, modern interface that includes property visualization, events display, and clear information about their services and values. This was a frontend-only project, focusing on building a responsive and visually appealing user interface with interactive property browsing and event showcases.",
    solutions: "We crafted a clean, professional institutional website that effectively communicates the company's brand identity. As a frontend-only development team, we focused on creating an exceptional user experience with a responsive design, featuring interactive property visualization and events display. The website allows visitors to easily explore the vast array of ultra-luxury villas and bespoke concierge services offered by Kennedy's Group.",
    description: "Kennedy's Group is an Enthusiastic Team of like-minded hospitality experts, whose main goal is to bring your dream holidays to life. Displaying a vast array of ultra-luxury villas and bespoke concierge services, we focus on matching each one of our selective guests with his/her ideal home-away-from-home, accompanied by all the amenities and services of a 7* exclusive resort. We are at our elite clientele's disposal 24/7, making sure that nothing is left to chance.",
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
      "Service showcase"
    ],
    technologies: ["JavaScript", "Next.js", "Node.js"],
    images: [
      "/images/cases/kennedys/ken1.webp",
      "/images/cases/kennedys/ken2.webp",
      "/images/cases/kennedys/ken3.webp",
      "/images/cases/kennedys/ken4.webp",
      "/images/cases/kennedys/ken5.webp",
      "/images/cases/kennedys/ken6.webp"
    ],
    links: {}
  },
  {
    title: "CheckRTO",
    subtitle: "Web Development, UX/UI Design",
    image: "/images/cases/checkrto/check4.webp",
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
      "Compliance tracking"
    ],
    technologies: ["Python", "JavaScript", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
    images: [
      "/images/cases/checkrto/check1.webp",
      "/images/cases/checkrto/2check.webp",
      "/images/cases/checkrto/check3.webp",
      "/images/cases/checkrto/check4.webp",
      "/images/cases/checkrto/check_5.webp",
      "/images/cases/checkrto/check6.webp"
    ],
    links: {
      web: "https://www.checkrto.com"
    }
  },
  {
    title: "Bausing",
    subtitle: "Web Development, UX/UI Design",
    image: "/images/cases/bausing/desktop1-bausing.webp",
    slug: "bausing",
    task: "Develop a comprehensive e-commerce platform for a company based in Córdoba, Argentina that primarily sells mattresses and bed bases, with secondary products including home appliances. The platform needed to serve customers throughout Argentina, requiring a robust catalog system, location-based pricing, secure payment integration with MercadoPago, and a complete shopping experience from browsing to checkout.",
    solutions: "We built a full-featured e-commerce platform with a sophisticated product catalog system supporting categories, variants, and location-based pricing. The platform includes an intuitive shopping experience with detailed product information, secure checkout with MercadoPago integration, cart management, order tracking, and a comprehensive admin panel for managing products, inventory, and orders. We implemented a locality detection system to automatically adjust prices based on the customer's location, ensuring accurate pricing across all of Argentina.",
    description: "Bausing is an e-commerce platform for a Córdoba-based company specializing in mattresses and bed bases, with a secondary focus on home appliances. The platform serves customers throughout Argentina, offering a seamless online shopping experience with location-based pricing, secure payments, and comprehensive product management.",
    process: "We developed a full-stack solution using Flask for the backend and Next.js for the frontend. The development process involved creating a flexible catalog system with categories and subcategories, implementing product variants with stock management, building a location-based pricing system, integrating MercadoPago for secure payments, and creating an admin panel for complete business management. We also implemented features like product reviews, blog functionality, and a digital wallet system.",
    result: "Bausing is now live and successfully serving customers across Argentina. The platform provides a seamless shopping experience with accurate location-based pricing, secure payment processing, and comprehensive product information. The admin panel enables efficient management of the entire catalog, orders, and business operations.",
    features: [
      "Comprehensive product catalog with categories and variants",
      "Location-based pricing for all of Argentina",
      "MercadoPago secure payment integration",
      "Shopping cart and checkout flow",
      "Order tracking and management",
      "Product reviews and ratings",
      "Blog functionality",
      "Digital wallet system",
      "Admin panel for business management",
      "Mobile-responsive design"
    ],
    technologies: ["Python", "PostgreSQL", "JavaScript", "Next.js", "TypeScript", "MercadoPago API"],
    images: [
      "/images/cases/bausing/desktop1-bausing.webp",
      "/images/cases/bausing/desktop2-bausing.webp",
      "/images/cases/bausing/desktop3-bausing.webp",
      "/images/cases/bausing/desktop4-bausing.webp",
      "/images/cases/bausing/foto5.webp",
      "/images/cases/bausing/foto6.webp"
    ],
    links: {}
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
      "User-friendly interface"
    ],
    technologies: ["Figma", "User Research", "Wireframing", "Prototyping", "User Testing"],
    images: [
      "/images/cases/partidosya/py1-min.webp",
      "/images/cases/partidosya/py2.webp",
      "/images/cases/partidosya/py3-min.webp",
      "/images/cases/partidosya/py4.webp",
      "/images/cases/partidosya/py5-min.webp",
      "/images/cases/partidosya/py6.webp"
    ],
    links: {
      behance: "https://www.behance.net/gallery/226945829/Mobile-App-Design-UIUX"
    }
  },
  {
    title: "Provia Consulting",
    subtitle: "Web Development, UX/UI Design",
    image: "/images/cases/provia/desktop1-provia.webp",
    slug: "provia-consulting",
    task: "Develop an institutional website for Provia Consulting, a strategic consulting firm specialized in road safety, vehicle technical inspection, and business development strategies. The website needed to communicate the company's expertise in working with companies, organizations, and municipalities, showcasing their services in process modernization, efficiency optimization, and sustainable growth.",
    solutions: "We built a modern, professional institutional website using Astro framework that effectively presents Provia Consulting's services and expertise. The site features clear service descriptions, company information, and a professional design that reflects the consulting firm's credibility. The static site architecture ensures fast loading times and excellent performance, while maintaining a clean and professional aesthetic that builds trust with potential clients.",
    description: "Provia Consulting is a comprehensive consulting firm specialized in road safety education, vehicle technical inspection, and business development strategies. The institutional website showcases their expertise in working with companies, organizations, and municipalities, helping them modernize processes, optimize operations, and achieve sustainable growth.",
    process: "We developed a static website using Astro framework, focusing on creating a professional and informative institutional presence. The development process involved designing a clean layout that effectively communicates the company's services, creating responsive components for different sections, and ensuring optimal performance with Astro's static site generation capabilities.",
    result: "The Provia Consulting website successfully presents the company as a trusted consulting partner. The site provides clear information about their services, expertise, and value proposition, helping potential clients understand how Provia can help modernize their operations and achieve their business goals.",
    features: [
      "Professional institutional design",
      "Service showcase sections",
      "Company information and expertise",
      "Contact and inquiry forms",
      "Responsive design",
      "Fast static site performance",
      "SEO optimized",
      "Clean and professional aesthetic"
    ],
    technologies: ["Astro", "TypeScript", "Tailwind CSS"],
    images: [
      "/images/cases/provia/desktop1-provia.webp",
      "/images/cases/provia/desktop2-provia.webp",
      "/images/cases/provia/desktop3-provia.webp",
      "/images/cases/provia/provia-4dekstop.webp",
      "/images/cases/provia/desktop5.webp",
      "/images/cases/provia/desktop6.webp"
    ],
    links: {
      web: "https://proviaconsulting.com"
    }
  },
];
