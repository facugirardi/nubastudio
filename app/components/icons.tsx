type IconProps = { size?: number; className?: string };

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

export function ArrowRight({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" {...stroke} />
    </svg>
  );
}

export function ArrowUpRight({ size = 12, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M3 9 9 3M4 3h5v5" {...stroke} />
    </svg>
  );
}

export function ArrowUp({ size = 12, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M6 9.5v-7M2.5 6 6 2.5 9.5 6" {...stroke} />
    </svg>
  );
}

export function ChevronDown({ size = 9, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden className={className}>
      <path d="M2 3.5 5 6.5l3-3" {...stroke} />
    </svg>
  );
}
