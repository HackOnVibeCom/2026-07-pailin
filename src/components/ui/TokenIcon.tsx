import type { Token } from "@/sdk/types";
import { cn } from "@/lib/utils";

/** Round token glyph with the token's brand gradient. */
export function TokenIcon({
  token,
  size = 40,
  className,
}: {
  token: Token;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-inner",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: `radial-gradient(120% 120% at 30% 20%, ${token.color}, ${token.color2 ?? token.color} 90%)`,
        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.35), 0 6px 16px -6px ${token.color}aa`,
      }}
    >
      <span className="drop-shadow-sm">{token.glyph}</span>
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.45), transparent 45%)" }}
      />
    </span>
  );
}
