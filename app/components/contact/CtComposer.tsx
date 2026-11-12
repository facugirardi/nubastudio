"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../../lib/i18n";
import { getUiText } from "../../lib/uiText";
import { CONTACT } from "../../lib/seo";
import { useReveal } from "../landing/useReveal";
import { useNavTone } from "../landing/useNavTone";
import Arrow from "../Arrow";

const MAX_CHARS = 2000;

type Status = "idle" | "polishing" | "polished" | "error";

/** Redactor: el texto se puede pulir con IA y se envía como mensaje de WhatsApp. */
export default function CtComposer() {
  const { lang } = useLanguage();
  const t = getUiText(lang).contact;
  const ref = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [beforePolish, setBeforePolish] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  useReveal(ref);
  useNavTone(ref, "#0b0b0a", "#ffffff");

  const filled = text.trim().length > 0;

  // El área crece con el texto en vez de mostrar scroll interno.
  useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  async function polish() {
    const value = text.trim();
    if (!value || status === "polishing") return;
    setStatus("polishing");
    try {
      const res = await fetch("/api/draft-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value, lang }),
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
    const el = areaRef.current;
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

  return (
    <section ref={ref} id="message" className="lx-sec ct-msg">
      <span className="lx-label" data-reveal>
        {t.messageLabel}
      </span>

      <div className="ct-body">
        <div className="ct-seeds" data-reveal>
          <span className="lx-label">{t.startWith}</span>
          {t.seeds.map((seed) => (
            <button key={seed.label} type="button" className="lx-ul ct-seed" onClick={() => applySeed(seed.text)}>
              {seed.label}
            </button>
          ))}
        </div>

        <div className="ct-field" data-reveal onClick={() => areaRef.current?.focus()}>
          <label htmlFor="ct-area" className="ct-field-k">
            <span>{t.fieldLabel}</span>
            <span>
              {text.length}/{MAX_CHARS}
            </span>
          </label>
          <textarea
            id="ct-area"
            ref={areaRef}
            className="ct-area"
            rows={3}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder={t.placeholder}
            maxLength={MAX_CHARS}
          />

        <div className="ct-bar" onClick={(e) => e.stopPropagation()}>
          <span className="ct-meta" aria-live="polite">
            {status === "polishing" ? (
              <span className="ct-status is-busy">{t.polishing}</span>
            ) : status === "error" ? (
              <span className="ct-status">{t.error}</span>
            ) : status === "polished" && beforePolish !== null ? (
              <button type="button" className="lx-ul" onClick={undoPolish}>
                {t.undo}
              </button>
            ) : (
              <span>{t.fieldHint}</span>
            )}
          </span>

          <button type="button" className="lx-ul ct-polish" onClick={polish} disabled={!filled || status === "polishing"}>
            {status === "polishing" ? t.polishBusy : t.polish}
          </button>

          <button type="button" className="ct-send" onClick={send} disabled={!filled}>
            <span>{t.sendLong}</span>
            <Arrow />
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
