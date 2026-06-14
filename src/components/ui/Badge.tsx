import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  dot = false,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur",
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuse-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuse-400" />
        </span>
      )}
      {children}
    </span>
  );
}
