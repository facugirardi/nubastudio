export type FaqItem = { question: string; answer: string };

export default function FaqList({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={`border-t border-white/[0.08] ${className}`}>
      {items.map((item) => (
        <details key={item.question} className="group/faq border-b border-white/[0.08]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] tracking-[-0.015em] text-[#EDEDED] [&::-webkit-details-marker]:hidden">
            {item.question}
            <span aria-hidden className="mt-1 font-mono text-[14px] text-white/55 transition-transform duration-200 group-open/faq:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 text-[16px] leading-[1.7] text-white/60">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
