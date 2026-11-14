export default function SectionHeading({
  index,
  label,
  heading,
  children,
}: {
  index: string;
  label: string;
  heading: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 px-5 pb-12 pt-24 sm:px-8 lg:grid-cols-2 lg:items-end lg:px-10 lg:pb-16 lg:pt-32">
      <div>
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
          <span className="text-white/25">[{index}]</span> {label}
        </p>
        <h2
          data-reveal
          className="mt-5 max-w-[16ch] text-[clamp(2.25rem,4.2vw,3.75rem)] font-[450] leading-[1.02] tracking-[-0.05em] text-[#EDEDED]"
        >
          {heading}
        </h2>
      </div>
      {children ? (
        <div data-reveal className="lg:justify-self-end">
          {children}
        </div>
      ) : null}
    </div>
  );
}
