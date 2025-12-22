"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useSpring as useSpringMotion,
  AnimatePresence,
} from "framer-motion";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import { Code, Palette, Smartphone } from "lucide-react";

const AnimatedTextLine = ({ words, className = "" }: { words: string[]; className?: string }) => {
  // Crear suficientes repeticiones para un bucle infinito suave
  const repeatedWords = [...words, ...words, ...words, ...words, ...words, ...words];
  const totalWidth = words.length * 150; // Aproximado del ancho total de una repetición
  
  return (
    <div className={`overflow-hidden py-2 md:py-3 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -totalWidth],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {repeatedWords.map((word, index) => (
          <span key={index} className="text-xs md:text-sm font-bold uppercase tracking-wider text-black">
            {word}
            <span className="mx-2 md:mx-3">-</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

type WorkItem = {
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
      "Multi-platform support (Web, iOS, Android)"
    ],
    technologies: ["Python", "Flask", "JavaScript", "React Native", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
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
    subtitle: "Web Development",
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
    technologies: ["Python", "Flask", "JavaScript", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
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
  // {
  //   title: "Bausing",
  //   subtitle: "Web Development",
  //   image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&h=600&fit=crop",
  //   slug: "bausing",
  //   task: "Develop a comprehensive e-commerce platform for mattresses and a digital wallet for Argentine pesos (Bausing wallet). Create an intuitive online store that allows customers to browse, compare, and purchase mattresses with ease, along with a digital wallet system that enables users to manage their pesos digitally. Build user-friendly interfaces for both the e-commerce platform and the wallet functionality.",
  //   solutions: "We developed a full-featured e-commerce platform specifically designed for mattress sales, along with a digital wallet system for Argentine pesos. The platform includes detailed product catalogs, easy navigation, secure checkout processes, and an intuitive shopping experience. Additionally, we built a digital wallet (Bausing wallet) that allows users to manage, transfer, and use pesos digitally within the platform.",
  //   description: "Bausing is an e-commerce platform specializing in mattress sales, featuring a comprehensive online shopping experience with detailed product information, easy browsing, and secure purchasing options. Additionally, Bausing includes a digital wallet system for Argentine pesos, allowing users to manage their money digitally within the platform.",
  //   process: "We built a full-stack web application with a focus on creating an exceptional shopping experience for mattress buyers and implementing a digital wallet system. The development process involved creating intuitive product browsing, implementing secure payment systems, building the digital wallet functionality for pesos, and developing user-friendly interfaces for both the e-commerce and wallet features.",
  //   result: "Bausing successfully provides customers with a seamless online shopping experience for mattresses, along with a fully functional digital wallet for Argentine pesos. The platform is now live and enables customers to easily browse, compare, and purchase mattresses, while also managing their pesos digitally through the integrated wallet system.",
  //   features: [
  //     "Product catalog and browsing",
  //     "Detailed product specifications",
  //     "Secure checkout process",
  //     "Digital wallet for Argentine pesos (Bausing wallet)",
  //     "User-friendly interface",
  //     "Mobile-responsive design",
  //     "Product search and filtering",
  //     "Wallet balance management"
  //   ],
  //   technologies: ["Python", "Flask", "JavaScript", "Next.js", "Figma", "User Research", "Wireframing", "Prototyping"],
  //   links: {}
  // },
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
    title: "FAMates",
    subtitle: "UX/UI Design",
    image: "/images/cases/ffmates/ffmatesmock1.webp",
    slug: "famates",
    task: "Design an e-commerce platform with a focus on navigability, product visualization, and purchase flow. Create an intuitive shopping experience that guides users seamlessly from browsing to checkout.",
    solutions: "We designed an e-commerce platform centered on exceptional user experience. The design prioritizes easy navigation, clear product visualization, and a streamlined purchase flow, making online shopping intuitive and enjoyable for customers.",
    description: "FAMates is an e-commerce platform designed with a strong focus on user experience. The project required a design that prioritizes navigability, effective product visualization, and a smooth purchase flow that guides users naturally from product discovery to checkout completion.",
    process: "Our design process focused on creating an intuitive shopping experience. We conducted user research, developed wireframes, and created high-fidelity designs that emphasize easy navigation, clear product presentation, and a streamlined checkout process. Every design decision was made with the user journey in mind.",
    result: "The FAMates design successfully creates an engaging and intuitive e-commerce experience. The design emphasizes user-friendly navigation, effective product visualization, and a purchase flow that reduces friction and encourages conversions.",
    features: [
      "Intuitive navigation system",
      "Enhanced product visualization",
      "Streamlined checkout flow",
      "User-centered design",
      "Mobile-responsive layouts",
      "Conversion-optimized UX"
    ],
    technologies: ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design"],
    images: [
      "/images/cases/ffmates/ffmatesmock1.webp",
      "/images/cases/ffmates/ffmatesmock2.webp",
      "/images/cases/ffmates/ffmatesmock3.webp",
      "/images/cases/ffmates/ffmatesm4.webp",
      "/images/cases/ffmates/ffmatz5.webp",
      "/images/cases/ffmates/ffmatesmock6.webp"
    ],
    links: {
      behance: "https://www.behance.net/gallery/225646897/E-commerce-Design-UIUX"
    }
  },
];

export default function Home() {
  const [paintProgress, setPaintProgress] = useState(0);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const introRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start 0.5", "end 0.5"],
  });
  const heroScrollProgress = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 26,
    damping: 14,
    mass: 1.1,
  });

  // Cursor position for hover image
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const introWords = useMemo(
    () =>
      [
        "We",
        "merge",
        "branding,",
        "interaction,",
        "and",
        "code",
        "to",
        "build",
        "experiences",
        "that",
        "resonate",
        "deeply",
        "and",
        "inspire",
        "action.",
      ] as const,
    []
  );

  const wordRanges = useMemo(() => {
    const total = introWords.length;
    const perWord = 0.75 / total; // even slower painting - more scroll per word
    const span = perWord * 3; // paint ~3 words at a time
    const lead = perWord * 0.2; // smaller head start
    return introWords.map((_, index) => {
      const start = Math.max(0, index * perWord - lead);
      const end = Math.min(0.9, start + span); // finish painting later in scroll
      return { start, end };
    });
  }, [introWords]);

  const paintedOpacity = useTransform(
    smoothProgress,
    [0, 0.04, 1],
    [0.8, 0.94, 1]
  );

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setPaintProgress(latest);
  });

  // Get overall page scroll progress
  const { scrollYProgress: pageScrollProgress } = useScroll();
  const scrollProgressWidth = useTransform(pageScrollProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      <main className="relative flex flex-col">
        <section ref={heroRef} className="relative min-h-[50vh] sm:min-h-[70vh] flex flex-col md:flex-row items-start bg-white overflow-hidden">
          <div className="flex-1 p-6 sm:p-10 md:p-16 pt-24 sm:pt-32 flex flex-col justify-start md:justify-between min-h-0 relative z-10">
            <div className="mt-6 sm:mt-10 md:mt-16">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[24vw] sm:text-[28vw] md:text-[180px] font-bold text-black leading-none tracking-tight"
              >
                nuba
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[24vw] sm:text-[28vw] md:text-[180px] font-bold text-black leading-none tracking-tight"
              >
                studio
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 sm:mt-6 md:mt-auto mb-20 sm:mb-24 md:mb-0 pb-0 md:pb-16 max-w-3xl"
            >
              <p className="mt-20  text-sm sm:text-base md:text-lg lg:text-xl text-black leading-relaxed uppercase tracking-[0.08em]">
                WE CREATE{" "}
                <span className="relative inline-block">
                  SOLUTIONS
                  <motion.svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-[#BAF038]"
                    viewBox="0 0 200 15"
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <motion.path
                      d="M 0 10 Q 50 2, 100 8 T 200 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>{" "}
                PEOPLE REMEMBER. <br className="hidden sm:block" />
                <span className="sm:inline">NOT JUST SCROLL PAST.</span>
              </p>
            </motion.div>
          </div>
          
          {/* Animated Text Line in Hero */}
          <div className="absolute bottom-0 left-0 right-0">
            <AnimatedTextLine 
              words={["ESSENTIAL", "HARD WORK", "EMPATHY", "BRUTALISM", "ESSENCE", "BEYOND", "PASSION", "BRILLIANT", "EXPERIMENT", "BRAND", "ENERGY"]}
              className=""
            />
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#BAF038] opacity-5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-black opacity-3 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
          
        </section>

        <section
          id="about"
          ref={introRef}
          className="relative bg-white overflow-hidden"
        >
          <div className="relative px-6 sm:px-8 md:px-16">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 py-12 sm:py-14 md:py-20">
              <div className="flex items-center gap-2 sm:gap-3 uppercase tracking-wide text-xs sm:text-sm font-semibold text-black">
                <span className="h-[1px] w-8 sm:w-10 bg-black" />
                About
              </div>

              <div className="relative text-center max-w-[95vw] sm:max-w-[90vw] mx-auto">
                <motion.p
                  style={{ opacity: paintedOpacity }}
                  className={`${styles.revealText} text-sm sm:text-base md:text-lg`}
                >
                  {introWords.map((word, index) => {
                    const { start, end } = wordRanges[index];
                  const range = Math.max(0.0001, end - start);
                    const t = Math.min(
                      1,
                      Math.max(0, (paintProgress - start) / range)
                    );
                    const eased = t * t * (4 - 2 * t); // smoothstep
                    const base = 215;
                    const channel = Math.round(base * (1 - eased));
                    const color = `rgb(${channel}, ${channel}, ${channel})`;

                    return (
                      <span
                        key={`${word}-${index}`}
                        style={{ color }}
                        className="inline-block mr-[0.12em]"
                      >
                        {word}
                      </span>
                    );
                  })}
                </motion.p>
              </div>

              <p className="max-w-4xl text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed px-2 sm:px-0">
                Each project is a lab: we prototype, animate, and refine until
                the interface breathes. Strategy, design, and code come together
                to push products, brands, and launches to the next level.
              </p>
            </div>
          </div>
        </section>

        <section
          id="works"
          className="relative bg-white overflow-hidden"
        >
          <div className="relative px-6 sm:px-8 md:px-16">
            <div className="sticky top-[-24px] md:top-[-10px] max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 py-12 sm:py-14 md:py-20">
              <div className="flex items-center gap-2 sm:gap-3 uppercase tracking-wide text-xs sm:text-sm font-semibold text-black">
                <span className="h-[1px] w-8 sm:w-10 bg-black" />
                Our Works
              </div>

              <div className={styles.projectList}>
                {(showAllWorks ? works : works.slice(0, 4)).map((work, index) => (
                  <Link
                    key={index}
                    href={`/cases/${work.slug}`}
                    onMouseEnter={() => setHoveredWork(index)}
                    onMouseLeave={() => setHoveredWork(null)}
                    onTouchStart={() => setHoveredWork(null)}
                    className="relative block"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 md:gap-12 py-4 sm:py-6 border-b border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-colors tracking-tight ${
                          hoveredWork === index ? 'text-black' : 'text-neutral-400'
                        }`}>
                          {work.title}
                        </h3>
                      </div>
                      <span className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">
                        {work.subtitle}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {works.length > 4 && !showAllWorks && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setShowAllWorks(true)}
                  className="mt-12 cursor-pointer relative inline-block"
                >
                  <span className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wider relative">
                    View More
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#BAF038]"
                      viewBox="0 0 200 20"
                      preserveAspectRatio="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <motion.path
                        d="M 0 15 Q 50 5, 100 10 T 200 12"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              )}
              
              {works.length > 4 && showAllWorks && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setShowAllWorks(false)}
                  className="mt-12 cursor-pointer relative inline-block"
                >
                  <span className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wider relative">
                    View Less
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#BAF038]"
                      viewBox="0 0 200 20"
                      preserveAspectRatio="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <motion.path
                        d="M 0 15 Q 50 5, 100 10 T 200 12"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Hover Image that follows cursor - Hidden on mobile */}
          <AnimatePresence>
            {hoveredWork !== null && (
              <motion.div
                key={hoveredWork}
                className="hidden md:block fixed w-60 h-60 overflow-hidden pointer-events-none z-50 shadow-2xl will-change-transform"
                style={{
                  left: cursorPos.x,
                  top: cursorPos.y,
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  key={works[hoveredWork].image}
                  src={works[hoveredWork].image}
                  alt={works[hoveredWork].title}
                  className="w-full h-full object-cover"
                  style={{ willChange: "transform" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="relative bg-neutral-50 py-20 md:py-32 overflow-hidden"
        >

          <div className="relative px-6 sm:px-8 md:px-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 sm:mb-12 md:mb-16"
              >
                <div className="flex items-center gap-2 sm:gap-3 uppercase tracking-wide text-xs sm:text-sm font-semibold mb-6 sm:mb-8 text-black">
                  <span className="h-[1px] w-8 sm:w-10 bg-black" />
                  Services
                </div>
                <h2 className="text-[16vw] sm:text-[14vw] md:text-[100px] lg:text-[120px] font-bold text-black leading-none tracking-tight mb-6 sm:mb-8">
                  what we do
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                {/* Service 1 - Web Development */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 text-[#BAF038]">
                    <Code size={64} strokeWidth={1.5} className="w-full h-full" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-black">
                    Web{" "}
                    <span className="relative inline-block">
                      Development
                      <motion.svg
                        className="absolute -bottom-1 left-0 w-full h-2 text-[#BAF038]"
                        viewBox="0 0 200 15"
                        preserveAspectRatio="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      >
                        <motion.path
                          d="M 0 10 Q 50 2, 100 8 T 200 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    We build custom web applications with modern technologies, optimized for exceptional performance and user experience.
                  </p>
                </motion.div>

                {/* Service 2 - UX UI Design */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 text-[#BAF038]">
                    <Palette size={64} strokeWidth={1.5} className="w-full h-full" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-black">
                    UX UI{" "}
                    <span className="relative inline-block">
                      Design
                      <motion.svg
                        className="absolute -bottom-1 left-0 w-full h-2 text-[#BAF038]"
                        viewBox="0 0 200 15"
                        preserveAspectRatio="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                      >
                        <motion.path
                          d="M 0 10 Q 50 2, 100 8 T 200 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    We design intuitive and attractive interfaces that combine visual aesthetics with functionality to create memorable experiences.
                  </p>
                </motion.div>

                {/* Service 3 - Mobile Development */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 text-[#BAF038]">
                    <Smartphone size={64} strokeWidth={1.5} className="w-full h-full" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-black">
                    Mobile{" "}
                    <span className="relative inline-block">
                      Development
                      <motion.svg
                        className="absolute -bottom-1 left-0 w-full h-2 text-[#BAF038]"
                        viewBox="0 0 200 15"
                        preserveAspectRatio="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <motion.path
                          d="M 0 10 Q 50 2, 100 8 T 200 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    We develop native and cross-platform mobile applications for iOS and Android, creating seamless experiences that leverage the full potential of mobile devices.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-neutral-100 py-12 sm:py-16 md:py-20 lg:py-32 px-6 sm:px-8 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 mb-12 sm:mb-16">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-4 sm:mb-6"
                >
                  Bored of playing safe?{" "}
                  <span className="relative inline-block">
                    Write us!
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#BAF038]"
                      viewBox="0 0 200 20"
                      preserveAspectRatio="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <motion.path
                        d="M 0 15 Q 50 5, 100 10 T 200 12"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>
                </motion.h2>
              </div>
              
              <div className="flex flex-col justify-start md:justify-end">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-6 sm:mb-8"
                >
                  WE BELIEVE MAGIC HAPPENS WHEN IDEAS MEET PEOPLE WHO CARE. WRITE US. LET'S SEE WHAT SPARKS.
                </motion.p>
                
                <motion.a
                  href="https://calendly.com/facugirardi22/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#BAF038] text-black font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#a8d832] transition-colors inline-block w-fit text-sm sm:text-base"
                >
                  let's work together
                </motion.a>
              </div>
            </div>
            
          </div>
        </footer>

      </main>
    </div>
  );
}
