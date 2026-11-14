"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NubaMark from "../NubaMark";
import { useLenis } from "../SmoothScroll";
import { CONTACT } from "../../lib/seo";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { ArrowUp, ArrowUpRight } from "../icons";

gsap.registerPlugin(ScrollTrigger);

const WORDMARK = "Nuba Studio";

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group/fl inline-flex items-center gap-1 text-[14px] text-white/55 transition-colors duration-150 hover:text-[#EDEDED]"
    >
      {children}
      {external ? (
        <ArrowUpRight size={10} className="text-white/30 transition-transform duration-200 group-hover/fl:-translate-y-px group-hover/fl:translate-x-px" />
      ) : null}
    </a>
  );
}

export default function Footer() {
  const { lang, path } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.home;
  const lenis = useLenis();
  const wordRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const word = wordRef.current;
    if (!word || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        word.querySelectorAll("[data-char]"),
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.035,
          ease: "expo.out",
          scrollTrigger: { trigger: word, start: "top 98%", once: true },
        }
      );
    }, word);
    return () => ctx.revert();
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = [
    {
      title: t.footerStudio,
      links: [
        { label: ui.nav.work, href: path("/works") },
        { label: ui.nav.services, href: path("/services") },
        { label: ui.nav.about, href: path("/about") },
        { label: ui.nav.contact, href: path("/contact") },
      ],
    },
    {
      title: t.footerServices,
      links: ui.services.list.map((s) => ({ label: s.title, href: path("/services") })),
    },
    {
      title: t.footerContact,
      links: [
        { label: "WhatsApp", href: CONTACT.whatsapp, external: true },
        { label: "LinkedIn", href: CONTACT.linkedin, external: true },
        { label: "Instagram", href: CONTACT.instagram, external: true },
        { label: "+54 9 351 347 1844", href: `tel:${CONTACT.phone}` },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/[0.07] bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8 lg:px-10 lg:py-20">
          <div className="col-span-2 lg:col-span-1">
            <a href={path("/")} className="inline-flex items-center gap-2.5" aria-label={ui.nav.homeLabel}>
              <NubaMark className="h-7 w-7" />
              <span className="text-[18px] font-semibold tracking-[-0.04em]">Nuba Studio</span>
            </a>
            <p className="mt-5 max-w-[30ch] text-[14px] leading-[1.6] text-white/45">{t.footerTagline}</p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[14px] font-medium text-[#EDEDED]">{col.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} external={"external" in link ? link.external : false}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40 sm:px-8 lg:px-10">
          <p>
            © {new Date().getFullYear()} Nuba Studio · {CONTACT.city}, {CONTACT.country} · {t.footerRights}
          </p>
          <button
            type="button"
            onClick={toTop}
            className="group/top inline-flex items-center gap-2 uppercase transition-colors duration-150 hover:text-[#EDEDED]"
          >
            {t.backToTop}
            <ArrowUp size={11} className="transition-transform duration-300 ease-out group-hover/top:-translate-y-0.5" />
          </button>
        </div>

        <div className="overflow-hidden border-t border-white/[0.07] px-3 pt-6 sm:px-6">
          <p
            ref={wordRef}
            aria-hidden
            className="flex translate-y-[14%] justify-center whitespace-pre text-[clamp(3.5rem,17.2vw,16rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-transparent"
          >
            {WORDMARK.split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span data-char className="inline-block bg-gradient-to-b from-white/[0.18] to-white/[0.02] bg-clip-text">
                  {ch}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
