"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import { Code, Palette, Smartphone } from "lucide-react";
import { works } from "@/data/works";

const AnimatedTextLine = ({ words, className = "" }: { words: string[]; className?: string }) => {
  // Crear suficientes repeticiones para un bucle infinito suave
  const repeatedWords = [...words, ...words, ...words, ...words, ...words, ...words];
  const totalWidth = words.length * 150; // Aproximado del ancho total de una repetición
  
  return (
    <div className={`overflow-hidden py-2 md:py-3 2xl:py-5 ${className}`}>
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
          <span key={index} className="text-xs md:text-sm 2xl:text-base font-bold uppercase tracking-wider text-black">
            {word}
            <span className="mx-2 md:mx-3">-</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};


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
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 26,
    damping: 14,
    mass: 1.1,
  });


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

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      <main className="relative flex flex-col">
        <section ref={heroRef} className="relative min-h-[50vh] sm:min-h-[70vh] flex flex-col md:flex-row items-start bg-white overflow-hidden">
          <div className="flex-1 p-6 sm:p-10 md:p-16 pt-24 sm:pt-32 flex flex-col justify-start md:justify-between min-h-0 relative z-10">
            <div className="mt-6 sm:mt-10 md:mt-16 2xl:mt-20">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[24vw] sm:text-[28vw] md:text-[180px] 2xl:text-[210px] font-bold text-black leading-none tracking-tight"
              >
                nuba
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[24vw] sm:text-[28vw] md:text-[180px] 2xl:text-[210px] font-bold text-black leading-none tracking-tight"
              >
                studio
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 sm:mt-3 md:mt-auto mb-20 sm:mb-24 md:mb-0 pb-0 md:pb-16 max-w-3xl"
            >
              <p className="mt-6 sm:mt-8 2xl:mt-20 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-black leading-relaxed uppercase tracking-[0.08em]">
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
                  WE BELIEVE MAGIC HAPPENS WHEN IDEAS MEET PEOPLE WHO CARE. WRITE US. LET&apos;S SEE
                  WHAT SPARKS.
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
                  let&apos;s work together
                </motion.a>
              </div>
            </div>
            
          </div>
        </footer>

      </main>
    </div>
  );
}
