"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toLocaleString(),
  duration = 1.1,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false });
  const prev = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;
    const controls = animate(prev.current, value, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent = format(v);
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, inView, duration, format]);

  return <span ref={ref}>{format(0)}</span>;
}
