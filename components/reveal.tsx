"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * One-shot scroll reveal. Distance and duration come from the motion
 * tokens in .reveal (app/globals.css); this file holds behaviour only.
 * Reduced-motion users get the opacity change only (handled in globals.css),
 * and anything that never intersects still ends up visible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  "data-kind": dataKind,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  /** Forwarded so callers can style a variant from CSS alone. */
  "data-kind"?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // Legacy fallback: reveal by writing the attribute directly rather than
      // through state. Nothing re-renders on this path, so the DOM write
      // sticks, and it keeps the effect a pure external-system sync.
      node.dataset.shown = "true";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      data-shown={shown}
      data-kind={dataKind}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
