"use client";

import { CONSENT_STORAGE_KEY } from "../AnalyticsConsent";

export default function CookieChoiceButton({ label }: { label: string }) {
  const reset = () => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {}
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={reset}
      className="rounded-full border border-white/25 px-5 py-2 font-display text-[14px] font-medium text-white transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {label}
    </button>
  );
}
