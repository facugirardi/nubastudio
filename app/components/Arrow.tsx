const PATHS = {
  "up-right": "M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5",
  up: "M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5",
  down: "M7 2V12M7 12L2.5 7.5M7 12L11.5 7.5",
  right: "M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5",
} as const;

/** Flecha en SVG que toma el color y el tamaño del texto que la rodea. */
export default function Arrow({
  dir = "up-right",
  className = "",
}: {
  dir?: keyof typeof PATHS;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`.trim()}
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path d={PATHS[dir]} stroke="currentColor" strokeWidth={1.4} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
