"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-fuse-400 text-ink-950 font-semibold hover:bg-fuse-300 shadow-[0_10px_30px_-8px_rgba(35,226,126,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(35,226,126,0.8)]",
  white:
    "bg-white text-ink-950 font-semibold hover:bg-zinc-100 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)]",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/5",
  outline: "border border-white/15 text-white hover:bg-white/5 hover:border-white/30",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-13 px-7 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
