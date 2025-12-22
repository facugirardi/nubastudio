"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const isCasePage = pathname?.startsWith("/cases");

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isCasePage) {
      // Si estamos en una página de caso, navegar a la página principal con el anchor
      e.preventDefault();
      window.location.href = `/${href}`;
    } else {
      // Si estamos en home, usar el scroll suave
      handleNavClick(e, href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isCasePage) {
      // Si estamos en una página de caso, navegar a la página principal
      window.location.href = "/";
    } else {
      // Si estamos en home, hacer scroll al inicio (hero)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 right-0 z-50 flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6">
      {/* Logo Circle */}
      <button
        type="button"
        onClick={handleLogoClick}
        className="bg-white rounded-full w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center border border-black flex-shrink-0 relative z-[60] cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Go to home"
      >
        <Image
          src="/Nuba logo.svg"
          alt="Nuba Logo"
          width={25}
          height={18}
          className="w-5 h-auto sm:w-5 md:w-6"
        />
      </button>
      
      <nav className="bg-white rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 flex items-center gap-3 sm:gap-4 md:gap-6 border border-black">
        <a
          href={isCasePage ? "/#about" : "#about"}
          onClick={(e) => handleLinkClick(e, "#about")}
          className="text-black font-medium hover:opacity-70 transition-opacity text-xs sm:text-sm md:text-base"
        >
          About
        </a>
        <a
          href={isCasePage ? "/#works" : "#works"}
          onClick={(e) => handleLinkClick(e, "#works")}
          className="text-black font-medium hover:opacity-70 transition-opacity text-xs sm:text-sm md:text-base"
        >
          Work
        </a>
        <a
          href={isCasePage ? "/#services" : "#services"}
          onClick={(e) => handleLinkClick(e, "#services")}
          className="text-black font-medium hover:opacity-70 transition-opacity text-xs sm:text-sm md:text-base"
        >
          Services
        </a>
      </nav>

      <a
        href="https://calendly.com/facugirardi22/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#BAF038] cursor-pointer text-black font-medium px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full hover:bg-[#a8d832] transition-colors inline-block text-xs sm:text-sm md:text-base whitespace-nowrap"
      >
        Contact
      </a>
    </header>
  );
}

