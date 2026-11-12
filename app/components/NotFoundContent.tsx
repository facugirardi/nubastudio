"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "./LocaleLink";
import LogoMark from "./LogoMark";
import Arrow from "./Arrow";
import { useLanguage } from "../lib/i18n";
import { getUiText } from "../lib/uiText";
import { useProximityWeight } from "./landing/useProximityWeight";
import "./notFound.css";

const DIGITS = ["4", "0", "4"];
const INDEX = [
  { key: "work", href: "/works" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

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

export default function NotFoundContent() {
  const { lang } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.notFound;
  const time = useCordobaTime();
  const [requested, setRequested] = useState("");
  const rootRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<number>(300);

  useProximityWeight(rootRef, wordRef, baseRef);

  // "*palabra*" va en grotesca; el resto en serif (igual que el hero).
  const words = useMemo(
    () =>
      t.heading.split(" ").map((raw) => {
        const g = raw.startsWith("*") && raw.endsWith("*");
        return { text: g ? raw.slice(1, -1) : raw, g };
      }),
    [t.heading]
  );

  useEffect(() => {
    let p = window.location.pathname;
    try {
      p = decodeURIComponent(p);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la URL solo se conoce en el cliente
    setRequested(p);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ins = root.querySelectorAll("[data-nf-in]");
    const ws = root.querySelectorAll("[data-nf-word]");
    const digits = root.querySelectorAll<HTMLElement>("[data-nf-digit]");

    if (reduce) {
      gsap.set([...ins, ...ws], { opacity: 1, y: 0 });
      gsap.set(digits, { yPercent: 0 });
      return;
    }

    const tl = gsap
      .timeline({ delay: 0.15 })
      .to(ins, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 })
      .to(ws, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.045 }, 0.1)
      .to(digits, { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.09 }, 0.2);

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => void tl.kill();

    // Parallax leve: cada dígito sigue al cursor con otra profundidad.
    const depth = [-18, 12, -26];
    const movers = Array.from(digits).map((el) => ({
      x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
    }));
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      movers.forEach((m, i) => {
        m.x(nx * depth[i]);
        m.y(ny * depth[i] * 0.6);
      });
    };
    root.addEventListener("pointermove", onMove);
    return () => {
      tl.kill();
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <main ref={rootRef} className="nf">
      <header className="nf-meta" data-nf-in>
        <Link href="/" className="nf-home" aria-label={t.backHome}>
          <LogoMark size={26} />
          <span>Nuba Studio</span>
        </Link>
        <span className="nf-req">
          {t.errorLabel}
          {requested && (
            <>
              <span aria-hidden> — </span>
              <code>{requested}</code>
            </>
          )}
        </span>
        <span className="nf-clock">
          Córdoba <b>{time || "--:--"}</b>
        </span>
      </header>

      <section className="nf-body">
        <span className="nf-label" data-nf-in>
          ({t.errorLabel})
        </span>
        <div className="nf-main">
          <h1 className="nf-h1">
            {words.map((w, i) => (
              <span key={`${w.text}-${i}`}>
                <span className={`nf-w ${w.g ? "nf-g" : "nf-s"}`} data-nf-word>
                  {i === 0 && <i className="nf-dot" aria-hidden />}
                  {w.text}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="nf-copy" data-nf-in>
            {t.body}
          </p>
          <nav className="nf-links" data-nf-in aria-label={t.index}>
            <Link href="/" className="nf-ul">
              {t.backHome}
              <Arrow />
            </Link>
            {INDEX.map((item) => (
              <Link key={item.key} href={item.href} className="nf-ul">
                {ui.nav[item.key]}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div ref={wordRef} className="nf-word" aria-hidden>
        {DIGITS.map((d, i) => (
          <span key={i} className="nf-digit">
            <span data-g data-nf-digit>
              {d}
            </span>
          </span>
        ))}
      </div>
    </main>
  );
}
