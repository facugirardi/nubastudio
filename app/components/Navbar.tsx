"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useLenis } from "./SmoothScroll";
import { useLanguage } from "../lib/i18n";
import { LANGS, localePath, stripLocale, type Lang } from "../lib/lang";
import { getUiText } from "../lib/uiText";
import NubaMark from "./NubaMark";
import { ArrowUpRight, ChevronDown } from "./icons";

const NAV_IDS = ["work", "services", "about", "contact"] as const;
type NavId = (typeof NAV_IDS)[number];

const LANG_NAMES: Record<Lang, string> = { en: "English", es: "Español" };

function LangMenu({
  lang,
  label,
  hrefFor,
  placement = "down",
}: {
  lang: Lang;
  label: string;
  hrefFor: (code: Lang) => string;
  placement?: "down" | "up";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const up = placement === "up";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${label}: ${LANG_NAMES[lang]}`}
        className={`flex h-8 items-center gap-1 rounded-full border px-2.5 text-[13.5px] font-medium uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00] ${
          open ? "border-white/25 bg-white/[0.08] text-[#EDEDED]" : "border-white/[0.1] text-white/60 hover:border-white/20 hover:text-[#EDEDED]"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.5 3.9 2.5 6.25S9.7 12.45 8 14.25C6.3 12.45 5.5 10.35 5.5 8S6.3 3.55 8 1.75Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        {lang}
        <ChevronDown className={`transition-transform duration-200 ${open !== up ? "rotate-180" : ""}`} />
      </button>

      <div
        role="menu"
        aria-label={label}
        className={`absolute z-10 min-w-[168px] rounded-xl border border-white/[0.1] bg-[#0a0a0a]/95 p-1 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          up ? "bottom-full left-0 mb-2 origin-bottom-left" : "right-0 top-full mt-2 origin-top-right"
        } ${open ? "visible scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"}`}
      >
        {LANGS.map((code) => (
          <a
            key={code}
            role="menuitemradio"
            aria-checked={lang === code}
            href={hrefFor(code)}
            hrefLang={code}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors duration-150 hover:bg-white/[0.06] ${
              lang === code ? "text-[#EDEDED]" : "text-white/55 hover:text-[#EDEDED]"
            }`}
          >
            <span className="w-5 font-mono text-[10px] uppercase text-white/35">{code}</span>
            <span className="flex-1">{LANG_NAMES[code]}</span>
            {lang === code && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="text-[#C6FF00]">
                <path d="M2.5 6.2 4.8 8.5 9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

const PHONE = { label: "+54 9 351 347 1844", href: "tel:+5493513471844" };

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/nubastudio" },
  { label: "Instagram", href: "https://instagram.com/nubastudio.ar" },
  { label: "WhatsApp", href: "https://wa.me/5493513471844" },
];


export default function Navbar() {
  const pathname = usePathname();
  const { lang, path } = useLanguage();
  const t = getUiText(lang);
  const lenis = useLenis();
  const current = stripLocale(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<{ left: number; width: number } | null>(null);

  const barRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const hrefFor = (id: NavId) => path(id === "work" ? "/works" : `/${id}`);
  const isActive = (id: NavId) => current.startsWith(id === "work" ? "/works" : `/${id}`);
  const langHref = (code: Lang) => localePath(code, current);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(bar, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "expo.out" });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const items = menu.querySelectorAll<HTMLElement>("[data-menu-item]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.set(menu, { visibility: "visible" });
      if (reduce) {
        gsap.set(menu, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut", overwrite: true });
        gsap.fromTo(items, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, delay: 0.25, ease: "expo.out", overwrite: true });
      }
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      gsap.to(menu, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduce ? 0 : 0.5,
        ease: "expo.inOut",
        overwrite: true,
        onComplete: () => {
          gsap.set(menu, { visibility: "hidden" });
        },
      });
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const onNavClick = () => setOpen(false);

  const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    setHover({ left: el.offsetLeft, width: el.offsetWidth });
  };

  const solid = scrolled || open;

  return (
    <>
      <header
        ref={barRef}
        className={`fixed inset-x-0 top-0 z-[100] font-display transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? "border-b border-white/[0.08] bg-black/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-8 px-5 sm:px-8 lg:px-10">
          <a
            href={path("/")}
            aria-label={t.nav.homeLabel}
            className="group/logo flex shrink-0 items-center gap-2.5 rounded-md text-[#EDEDED] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00]"
          >
            <NubaMark className="h-[26px] w-[26px] transition-transform duration-300 ease-out group-hover/logo:rotate-[-8deg] group-hover/logo:scale-105" />
            <span className="text-[17px] font-semibold tracking-[-0.04em]">Nuba Studio</span>
          </a>

          <nav aria-label="Main" className="relative hidden md:block" onMouseLeave={() => setHover(null)}>
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-white/[0.07] transition-[left,width,opacity] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ left: hover?.left ?? 0, width: hover?.width ?? 0, opacity: hover ? 1 : 0 }}
            />
            <ul className="relative flex items-center">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={hrefFor(id)}
                    onClick={onNavClick}
                    onMouseEnter={onLinkEnter}
                    onFocus={(e) => setHover({ left: e.currentTarget.offsetLeft, width: e.currentTarget.offsetWidth })}
                    aria-current={isActive(id) ? "page" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-[14px] transition-colors duration-150 focus-visible:outline-none ${
                      isActive(id) ? "text-[#EDEDED]" : "text-white/55 hover:text-[#EDEDED] focus-visible:text-[#EDEDED]"
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden sm:block">
              <LangMenu lang={lang} label={t.nav.langToggleLabel} hrefFor={langHref} />
            </div>

            <a
              href={path("/contact")}
              className="hidden h-8 items-center rounded-full bg-[#EDEDED] px-3.5 text-[13.5px] font-medium text-black transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF00] md:inline-flex"
            >
              {t.about.getInTouch}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menuWord}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] text-[#EDEDED] transition-colors hover:bg-white/[0.06] md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  open ? "rotate-45" : "-translate-y-[3.5px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  open ? "-rotate-45" : "translate-y-[3.5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-0 z-[99] flex flex-col bg-black px-5 pb-8 pt-24 font-display text-[#EDEDED] [clip-path:inset(0_0_100%_0)] sm:px-8 md:hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(198,255,0,0.06),transparent_70%)]"
        />
        <nav aria-label="Mobile" className="relative">
          <ul className="flex flex-col border-t border-white/[0.08]">
            {NAV_IDS.map((id, i) => (
              <li key={id} data-menu-item className="border-b border-white/[0.08]">
                <a
                  href={hrefFor(id)}
                  onClick={onNavClick}
                  aria-current={isActive(id) ? "page" : undefined}
                  className="group/m flex items-baseline justify-between py-4 text-[40px] font-[450] leading-none tracking-[-0.05em]"
                >
                  <span className="transition-transform duration-300 ease-out group-active/m:translate-x-1">{t.nav[id]}</span>
                  <span className="font-mono text-[11px] tracking-normal text-white/35">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative mt-auto flex flex-col gap-6">
          <div data-menu-item>
            <LangMenu lang={lang} label={t.nav.langToggleLabel} hrefFor={langHref} placement="up" />
          </div>
          <a data-menu-item href={PHONE.href} className="text-[17px] tracking-[-0.02em] text-white/80">
            {PHONE.label}
          </a>
          <div data-menu-item className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#EDEDED]">
                {s.label}
                <ArrowUpRight size={9} />
              </a>
            ))}
          </div>
          <a
            data-menu-item
            href={path("/contact")}
            onClick={() => setOpen(false)}
            className="flex h-12 items-center justify-center rounded-full bg-[#EDEDED] text-[15px] font-medium text-black"
          >
            {t.hero.primaryCta}
          </a>
        </div>
      </div>
    </>
  );
}
