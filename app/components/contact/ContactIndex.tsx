"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { openCase } from "../home/WorkCard";
import { prefetchCase } from "../caseTransition";
import { ArrowRight, ArrowUpRight } from "../icons";
import { getWork } from "../../data/works";
import { localizeWork } from "../../lib/localizeWork";
import { CONTACT } from "../../lib/seo";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";

const RECENT_WORK = ["nubapay", "nuddo", "ushuaia360"];
const MAX_CHARS = 2000;
const PHONE_LABEL = "+54 9 351 347 1844";

type Status = "idle" | "polishing" | "polished" | "error";

const noopSubscribe = () => () => {};

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5 9.3 6.2 14 7.5 9.3 8.8 8 13.5 6.7 8.8 2 7.5 6.7 6.2 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5 4 2 7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 7H10a3.5 3.5 0 0 1 0 7H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function useCordobaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Cordoba",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function ContactIndex() {
  const { lang, path } = useLanguage();
  const ui = getUiText(lang);
  const t = ui.contact;
  const p = ui.contactPage;
  const time = useCordobaTime();
  const modKey = useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/i.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl"
  );

  const rootRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [beforePolish, setBeforePolish] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const filled = text.trim().length > 0;
  const nearLimit = text.length > MAX_CHARS * 0.6;
  const busy = status === "polishing";

  const recent = RECENT_WORK.map((slug) => getWork(slug))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .map((w) => localizeWork(w, lang));

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-word]", { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.05, ease: "expo.out", delay: 0.1 });
      gsap.fromTo(
        "[data-intro]",
        { opacity: 0, y: 18, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.07, ease: "expo.out", delay: 0.4, clearProps: "filter" }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  async function polish() {
    const value = text.trim();
    if (!value || busy) return;
    setStatus("polishing");
    try {
      const res = await fetch("/api/draft-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });
      const data = await res.json();
      if (!res.ok || !data?.message) throw new Error(data?.error ?? "failed");
      setBeforePolish(value);
      setText(data.message);
      setStatus("polished");
    } catch {
      setStatus("error");
    }
  }

  function undoPolish() {
    if (beforePolish === null) return;
    setText(beforePolish);
    setBeforePolish(null);
    setStatus("idle");
  }

  function applySeed(seed: string) {
    setText(seed);
    setBeforePolish(null);
    setStatus("idle");
    const el = textareaRef.current;
    if (el) {
      el.focus();
      requestAnimationFrame(() => el.setSelectionRange(seed.length, seed.length));
    }
  }

  function send() {
    const value = text.trim();
    if (!value) return;
    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(value)}`, "_blank", "noopener,noreferrer");
  }

  const channels = [
    { label: "WhatsApp", value: PHONE_LABEL, href: CONTACT.whatsapp, external: true },
    { label: "LinkedIn", value: "/company/nubastudio", href: CONTACT.linkedin, external: true },
    { label: "Instagram", value: CONTACT.instagramHandle, href: CONTACT.instagram, external: true },
  ];

  return (
    <section ref={rootRef} className="relative bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[1400px] border-x border-white/[0.07]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col px-5 pb-12 pt-32 sm:px-8 lg:border-r lg:border-white/[0.07] lg:px-10 lg:pb-16 lg:pt-40">
            <p data-intro className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
              <span className="text-white/25">[ES · EN]</span> {p.label}
            </p>
            <h1 className="mt-6 max-w-[11ch] text-[clamp(2.75rem,6vw,5.5rem)] font-[450] leading-[1] tracking-[-0.055em]">
              {t.headline.split(" ").map((word, i, arr) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-top -mb-[0.1em]">
                  <span data-word className="inline-block">
                    {word}
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                </span>
              ))}
            </h1>
            <p data-intro className="mt-8 max-w-[40ch] text-[16px] leading-[1.6] text-white/55 lg:text-[17px]">
              {t.sub}
            </p>

            <div data-intro className="mt-auto pt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">{p.channels}</p>
              <ul className="mt-4 border-t border-white/[0.08]">
                {channels.map((c) => (
                  <li key={c.label} className="border-b border-white/[0.08]">
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group/ch flex items-center gap-4 py-4"
                    >
                      <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">{c.label}</span>
                      <span className="min-w-0 flex-1 truncate text-[16px] text-white/70 transition-colors duration-200 group-hover/ch:text-[#EDEDED]">
                        {c.value}
                      </span>
                      <span className="text-white/30 transition-[transform,color] duration-300 group-hover/ch:-translate-y-0.5 group-hover/ch:translate-x-0.5 group-hover/ch:text-[#EDEDED]">
                        <ArrowUpRight />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
                <span>{t.place}</span>
                <span className="tabular-nums">
                  {p.localTime} <span className="text-[#EDEDED]">{time ?? "--:--"}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/[0.07] px-5 py-12 sm:px-8 lg:border-t-0 lg:px-10 lg:pb-16 lg:pt-40">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent_80%)]"
            />
            <div data-intro className="relative">
              <div className={`rounded-[18px] p-px transition-colors duration-500 ${busy ? "composer-busy" : "bg-white/[0.1] focus-within:bg-white/[0.22]"}`}>
                <div className="rounded-[17px] bg-[#070707]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-3.5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">{p.composer}</span>
                    <span aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.08em]">
                      {status === "polishing" ? (
                        <span className="text-[#C6FF00]">{t.polishing}…</span>
                      ) : status === "error" ? (
                        <span className="text-[#ff8a7a]">{t.error}</span>
                      ) : nearLimit ? (
                        <span className="tabular-nums text-white/40">
                          {text.length}/{MAX_CHARS}
                        </span>
                      ) : null}
                    </span>
                  </div>

                  <label htmlFor="contact-message" className="sr-only">
                    {p.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    ref={textareaRef}
                    value={text}
                    maxLength={MAX_CHARS}
                    disabled={busy}
                    placeholder={t.placeholder}
                    onChange={(e) => {
                      setText(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    className="block min-h-[260px] w-full resize-none bg-transparent px-5 py-5 text-[18px] leading-[1.55] tracking-[-0.01em] text-[#EDEDED] outline-none placeholder:text-white/25 disabled:opacity-60 lg:min-h-[320px] lg:text-[20px]"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3">
                    <div className="flex items-center gap-2">
                      {status === "polished" && beforePolish !== null ? (
                        <button
                          type="button"
                          onClick={undoPolish}
                          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.12] px-3.5 text-[14px] text-white/70 transition-colors hover:border-white/25 hover:text-[#EDEDED]"
                        >
                          <UndoIcon />
                          {t.undo}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={polish}
                          disabled={!filled || busy}
                          className="group/ai inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.12] px-3.5 text-[14px] text-white/70 transition-colors hover:border-[#C6FF00]/50 hover:text-[#C6FF00] disabled:pointer-events-none disabled:opacity-35"
                        >
                          <span className={busy ? "animate-spin" : "transition-transform duration-500 group-hover/ai:rotate-90"}>
                            <SparkIcon />
                          </span>
                          {busy ? t.polishBusy : t.polish}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/30 sm:inline">
                        <kbd className="rounded border border-white/[0.12] px-1.5 py-0.5 font-mono">{modKey} Enter</kbd> {p.shortcut}
                      </span>
                      <button
                        type="button"
                        onClick={send}
                        disabled={!filled || busy}
                        className="group/send inline-flex h-10 items-center gap-2 rounded-full bg-[#EDEDED] pl-4 pr-3.5 text-[14.5px] font-medium text-black transition-[background-color,opacity] duration-150 hover:bg-white disabled:opacity-35"
                      >
                        {t.send}
                        <ArrowRight className="transition-transform duration-200 group-hover/send:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-right font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/30">{p.hint}</p>

              <div className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">{p.startWith}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.seeds.map((seed) => (
                    <button
                      key={seed.label}
                      type="button"
                      onClick={() => applySeed(seed.text)}
                      disabled={busy}
                      className="rounded-full border border-white/[0.1] bg-white/[0.02] px-3.5 py-2 text-[14px] text-white/65 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:text-[#EDEDED] disabled:opacity-40"
                    >
                      {seed.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav aria-label={t.recentWork} className="border-t border-white/[0.07]">
          <p className="px-5 pt-10 font-mono text-[11px] uppercase tracking-[0.08em] text-white/35 sm:px-8 lg:px-10">{t.recentWork}</p>
          <ul className="mt-5 grid grid-cols-1 gap-px border-t border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
            {recent.map((work) => (
              <li key={work.slug} className="bg-black">
                <a
                  href={path(`/cases/${work.slug}`)}
                  onClick={openCase(work)}
                  onPointerEnter={() => prefetchCase(work.slug)}
                  className="group/rw flex items-center gap-4 px-5 py-5 sm:px-8 lg:px-10"
                >
                  <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-white/[0.08]">
                    <Image src={work.image} alt="" fill sizes="80px" className="object-cover transition-transform duration-500 group-hover/rw:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[16px] text-[#EDEDED]">{work.title}</span>
                    <span className="block truncate text-[13px] text-white/40">{work.subtitle}</span>
                  </span>
                  <span className="text-white/30 transition-[transform,color] duration-300 group-hover/rw:-translate-y-0.5 group-hover/rw:translate-x-0.5 group-hover/rw:text-[#EDEDED]">
                    <ArrowUpRight />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
