import { cn } from "@/lib/utils";

/**
 * FUSE fusion mark — recreated in SVG so it renders crisp on the dark theme.
 * Inspired by the supplied logo: a fusion core with neon-green energy arcs.
 */
export function FuseMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="fuseGreen" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4dfca0" />
          <stop offset="1" stopColor="#12c869" />
        </linearGradient>
        <radialGradient id="fuseCore" cx="0.5" cy="0.45" r="0.6">
          <stop stopColor="#eafff3" />
          <stop offset="0.4" stopColor="#23e27e" />
          <stop offset="1" stopColor="#08a455" />
        </radialGradient>
      </defs>

      {/* outer shell arcs */}
      <path
        d="M12 20a24 24 0 0 0 -2 12a24 24 0 0 0 8 18"
        stroke="#e9edf5"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M52 20a24 24 0 0 1 2 12a24 24 0 0 1 -8 18"
        stroke="#e9edf5"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* upper petals */}
      <path
        d="M22 8c-3 3-5 7-5 12"
        stroke="#e9edf5"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M42 8c3 3 5 7 5 12"
        stroke="#e9edf5"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* inner green energy strands meeting at the core */}
      <path
        d="M24 14c-1 9 2 14 8 18"
        stroke="url(#fuseGreen)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M40 14c1 9 -2 14 -8 18"
        stroke="url(#fuseGreen)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* core */}
      <circle cx="32" cy="36" r="8" fill="url(#fuseCore)" />
      <circle cx="32" cy="36" r="8" fill="none" stroke="#23e27e" strokeOpacity="0.5" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <FuseMark size={30} />
      {showWordmark && (
        <span className="text-[19px] font-bold tracking-[0.22em] text-white">FUSE</span>
      )}
    </span>
  );
}
