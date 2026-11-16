import type { Lang } from "../../lib/lang";
import { getUiText } from "../../lib/uiText";
import FaqList from "../FaqList";

export default function ContactFaq({ lang }: { lang: Lang }) {
  const t = getUiText(lang).contact;

  return (
    <section aria-labelledby="contact-faq" className="border-t border-white/[0.07] bg-black font-display text-[#EDEDED]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20 lg:px-10 lg:py-28">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">{t.faqLabel}</p>
          <h2 id="contact-faq" className="mt-5 max-w-[16ch] text-[clamp(2rem,3.6vw,3rem)] font-[450] leading-[1.02] tracking-[-0.05em]">
            {t.faqHeading}
          </h2>
        </div>
        <FaqList items={t.faq} />
      </div>
    </section>
  );
}
