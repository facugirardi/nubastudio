"use client";

import { useEffect, useRef, useState } from "react";
import Link from "./LocaleLink";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import LogoMark from "./LogoMark";
import { getLenis } from "./SmoothScroll";
import { useLanguage, type Lang } from "../lib/i18n";
import { getUiText } from "../lib/uiText";
import { CONTACT } from "../lib/seo";
import Arrow from "./Arrow";

const NAV_IDS = ["home", "work", "services", "about", "contact"] as const;
const LANGS: Lang[] = ["en", "es"];
const PHONE_LABEL = "+54 9 351 347 1844";

function useCordobaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Argentina/Cordoba",
      }).format(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la hora depende del cliente
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navbar({
  visible,
  view,
  setView = () => {},
  showToggle = true,
  webglAvailable = true,
}: {
  visible: boolean;
  view: "spiral" | "list";
  setView?: (v: "spiral" | "list") => void;
  showToggle?: boolean;
  webglAvailable?: boolean;
}) {
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, lp } = useLanguage();
  const t = getUiText(lang);
  const time = useCordobaTime();

  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, delay: 0.6, ease: "power2.out" });
  }, [visible]);

  // Panel: baja como una cortina; los links suben en cascada.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!open && !wasOpen.current) return;
    wasOpen.current = open;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = panel.querySelectorAll("[data-menu-in]");
    const lenis = getLenis();

    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.set(panel, { visibility: "visible" });
      if (reduce) {
        gsap.set(panel, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(items, { yPercent: 0, opacity: 1 });
      } else {
        gsap.fromTo(panel, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "power4.inOut", overwrite: true });
        gsap.fromTo(items, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, delay: 0.3, ease: "power3.out", overwrite: true });
      }
      firstLinkRef.current?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      const hide = () => gsap.set(panel, { visibility: "hidden" });
      if (reduce) hide();
      else gsap.to(panel, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut", overwrite: true, onComplete: hide });
      menuBtnRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const chooseView = (next: "spiral" | "list") => {
    if (next === "spiral" && !webglAvailable) return;
    setView(next);
  };

  const go = (id: (typeof NAV_IDS)[number]) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (id === "home") {
      window.location.href = lp("/");
      return;
    }
    if (id !== "work") {
      window.location.href = lp(`/${id}`);
      return;
    }
    if (pathname !== lp("/works")) {
      window.location.href = lp("/works?view=list");
      return;
    }
    if (view === "spiral") {
      setView("list");
      setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <>
      <style>{`
        .nb {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1002;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          padding: 1.4rem clamp(1.25rem, 3vw, 2.5rem);
          opacity: 0;
          transition: color 0.4s, background 0.4s;
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .nb a, .nb button { color: inherit; }
        .nb-logo { justify-self: start; display: flex; align-items: center; }
        .nb-center { justify-self: center; display: flex; gap: 0.5rem; align-items: center; }
        .nb-right { justify-self: end; display: flex; align-items: center; gap: clamp(1.2rem, 3vw, 2.4rem); }
        .nb-sep { opacity: 0.4; }
        .nb-btn {
          all: unset;
          cursor: pointer;
          position: relative;
          padding-block: 0.3rem;
          opacity: 0.45;
          transition: opacity 0.3s;
        }
        .nb-btn:hover { opacity: 1; }
        .nb-btn[aria-pressed="true"] { opacity: 1; }
        .nb-btn::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.45s cubic-bezier(0.7, 0, 0.2, 1);
        }
        .nb-btn[aria-pressed="true"]::after { transform: scaleX(1); transform-origin: left; }
        .nb-btn:disabled { cursor: not-allowed; opacity: 0.2; }
        .nb-btn:focus-visible, .nb-menu:focus-visible, .mp a:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }
        .nb-menu {
          all: unset;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding-block: 0.3rem;
        }
        .nb-plus {
          position: relative;
          width: 9px;
          height: 9px;
          transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1);
        }
        .nb-plus::before, .nb-plus::after {
          content: "";
          position: absolute;
          background: currentColor;
        }
        .nb-plus::before { left: 0; right: 0; top: 4px; height: 1px; }
        .nb-plus::after { top: 0; bottom: 0; left: 4px; width: 1px; }
        .nb-menu[aria-expanded="true"] .nb-plus { transform: rotate(45deg); }

        .mp {
          position: fixed;
          inset: 0;
          z-index: 1001;
          visibility: hidden;
          clip-path: inset(0 0 100% 0);
          background: #000;
          color: #f3f2ee;
          display: grid;
          grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
          grid-template-rows: 1fr auto;
          gap: 2rem clamp(1.5rem, 4vw, 4rem);
          padding: clamp(6rem, 14vh, 9rem) clamp(1.25rem, 3vw, 2.5rem) 1.6rem;
        }
        .mp-links { display: flex; flex-direction: column; justify-content: center; gap: 0.2rem; }
        .mp-link {
          display: flex;
          align-items: baseline;
          gap: 1.2rem;
          overflow: hidden;
          text-decoration: none;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(2.6rem, min(7vw, 10.5vh), 6.6rem);
          font-weight: 300;
          letter-spacing: -0.045em;
          line-height: 1.04;
          padding-bottom: 0.14em;
          margin-bottom: -0.14em;
          transition: opacity 0.35s, font-weight 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .mp-link > span { display: inline-flex; align-items: baseline; gap: 1.2rem; }
        .mp-n {
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          font-weight: 400;
          opacity: 0.5;
          transform: translateY(-1.6em);
        }
        @media (hover: hover) and (pointer: fine) {
          .mp-links:has(.mp-link:hover) .mp-link:not(:hover) { opacity: 0.3; }
          .mp-link:hover { font-weight: 700; }
        }
        .mp-side {
          align-self: center;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .mp-side > div { overflow: hidden; display: flex; flex-direction: column; gap: 0.45rem; }
        .mp-side dt, .mp-k { opacity: 0.45; }
        .mp-side a { text-decoration: none; width: fit-content; background: linear-gradient(currentColor, currentColor) 0 100% / 0% 1px no-repeat; transition: background-size 0.45s cubic-bezier(0.7, 0, 0.2, 1); padding-bottom: 0.15rem; }
        .mp-side a:hover { background-size: 100% 1px; }
        .mp .arrow { display: inline-block; width: 0.85em; height: 0.85em; margin-left: 0.3em; vertical-align: -0.05em; }
        .mp-foot {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(243, 242, 238, 0.18);
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.6;
        }
        @media (max-width: 767px) {
          .nb { grid-template-columns: 1fr auto; }
          .nb-center { display: none; }
          .mp { grid-template-columns: 1fr; grid-template-rows: auto auto auto; align-content: start; }
          .mp-side { align-self: start; }
          .mp-n { display: none; }
        }
      `}</style>

      <nav
        ref={navRef}
        className="nb"
        aria-label="Nuba Studio"
        style={{ color: open ? "#f3f2ee" : "var(--nav-fg, #fff)", background: open ? "transparent" : "var(--nav-bg, transparent)" }}
      >
        <Link href="/" aria-label="Nuba Studio, inicio" className="nb-logo">
          <LogoMark play={visible} />
        </Link>

        {showToggle ? (
          <div className="nb-center" role="group" aria-label="View">
            {(["spiral", "list"] as const).map((opt, i) => (
              <span key={opt} style={{ display: "contents" }}>
                {i > 0 && <span className="nb-sep" aria-hidden>/</span>}
                <button
                  type="button"
                  className="nb-btn"
                  aria-pressed={view === opt}
                  disabled={opt === "spiral" && !webglAvailable}
                  onClick={() => chooseView(opt)}
                >
                  {opt === "spiral" ? t.nav.viewSpiral : t.nav.viewList}
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="nb-center" aria-hidden />
        )}

        <div className="nb-right">
          <div role="group" aria-label={t.nav.langToggleLabel} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {LANGS.map((code, i) => (
              <span key={code} style={{ display: "contents" }}>
                {i > 0 && <span className="nb-sep" aria-hidden>/</span>}
                <button type="button" className="nb-btn" aria-pressed={lang === code} onClick={() => setLang(code)}>
                  {code}
                </button>
              </span>
            ))}
          </div>
          <button
            ref={menuBtnRef}
            type="button"
            className="nb-menu"
            aria-expanded={open}
            aria-controls="nuba-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.nav.close : t.nav.menuWord}
            <i className="nb-plus" aria-hidden />
          </button>
        </div>
      </nav>

      <div ref={panelRef} id="nuba-menu" className="mp" role="dialog" aria-modal="true" aria-label={t.nav.menuWord} aria-hidden={!open}>
        <nav className="mp-links">
          {NAV_IDS.map((id, i) => (
            <a
              key={id}
              ref={i === 0 ? firstLinkRef : undefined}
              href={lp(id === "home" ? "/" : id === "work" ? "/works" : `/${id}`)}
              className="mp-link"
              tabIndex={open ? 0 : -1}
              onClick={go(id)}
            >
              <span data-menu-in>
                <span className="mp-n">({String(i + 1).padStart(2, "0")})</span>
                {t.nav[id]}
              </span>
            </a>
          ))}
        </nav>

        <dl className="mp-side">
          <div>
            <dt data-menu-in>Córdoba, AR</dt>
            <dd data-menu-in style={{ margin: 0 }}>{time || "--:--"}</dd>
          </div>
          <div>
            <dt data-menu-in>{t.nav.contact}</dt>
            <dd data-menu-in style={{ margin: 0 }}>
              <a href={`tel:${CONTACT.phone}`} tabIndex={open ? 0 : -1}>{PHONE_LABEL}</a>
            </dd>
          </div>
          <div>
            <dt data-menu-in className="mp-k">Social</dt>
            <dd data-menu-in style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>WhatsApp <Arrow /></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>LinkedIn <Arrow /></a>
            </dd>
          </div>
        </dl>

        <div className="mp-foot">
          <span>© 2026 Nuba Studio</span>
          <span>{t.landing.hero.discipline}</span>
        </div>
      </div>
    </>
  );
}
