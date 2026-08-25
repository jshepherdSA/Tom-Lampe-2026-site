"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Put the reader at the top of the page after a cross-page navigation.
 *
 * Next scrolls the changed route segment into view rather than the document
 * top. Because the election-day banner and the header sit above <main>, that
 * lands every page change 145px down, part-way through the masthead.
 *
 * Two behaviours are deliberately left alone:
 *
 * - Back and forward. The browser's own scroll restoration already returns
 *   the reader to where they were, which is what they expect. A popstate
 *   records the path it landed on; if the effect then runs for that same
 *   path, the navigation was a restore and we do not touch the scroll.
 *   Comparing paths rather than setting a flag means a hash-only history
 *   entry, which fires popstate without changing the path, cannot leave a
 *   flag set and swallow the next real navigation.
 *
 * - Hash links. A fragment never changes the pathname, so the record page's
 *   jump nav never reaches this effect at all. The hash check covers the
 *   other case: arriving at /record#parks from another page should land on
 *   the section, not the top.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const poppedTo = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      poppedTo.current = window.location.pathname;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const restoring = poppedTo.current === pathname;
    poppedTo.current = null;
    if (restoring) return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
