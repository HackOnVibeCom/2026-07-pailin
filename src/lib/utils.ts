import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(value: number, opts: { compact?: boolean } = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: opts.compact ? "compact" : "standard",
    maximumFractionDigits: value < 1 && value > 0 ? 4 : 2,
  }).format(value);
}

export function formatToken(value: number) {
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (value < 0.01) return value.toFixed(6);
  return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export function shortAddress(addr: string, chars = 4) {
  if (addr.length <= chars * 2 + 2) return addr;
  return `${addr.slice(0, chars + 2)}…${addr.slice(-chars)}`;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
