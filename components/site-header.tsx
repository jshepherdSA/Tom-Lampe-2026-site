"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand-mark";
import { SocialLinks } from "@/components/social-links";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-s2 focus:left-s2 focus:z-[60] focus:bg-signal-deep focus:px-s4 focus:py-s3 focus:text-on-signal"
      >
        {copy.global.skipToContent}
      </a>

      <div className="bg-inverse-deep text-on-inverse">
        <div className="container-page flex min-h-11 items-center justify-between gap-s4">
          <p className="t-legal">
            <span
              aria-hidden="true"
              className="mr-s2 inline-block h-s2 w-s2 bg-marker align-middle"
            />
            <span className="text-on-inverse">
              {copy.global.electionDayLabel}
            </span>{" "}
            <span className="text-muted-on-inverse">
              {copy.global.electionDate}
            </span>
          </p>
          <SocialLinks tone="dark" />
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-hairline bg-surface">
        <div className="container-page flex items-center justify-between gap-s5 py-s3">
          <BrandMark
            tone="dark"
            className="w-[150px] shrink-0 sm:w-[190px]"
            priority
          />

          <nav aria-label={copy.nav.ariaLabel} className="hidden lg:block">
            <ul className="flex items-center gap-s1">
              {copy.nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "t-small flex min-h-11 items-center px-s3 font-semibold transition-colors",
                      isActive(item.href)
                        ? "text-heading underline decoration-2 underline-offset-8"
                        : "text-ink-muted hover:text-heading",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-s2">
            <Button
              variant="donate"
              size="cta"
              render={<Link href="/donate" />}
            >
              {copy.nav.donate}
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex size-11 items-center justify-center border-2 border-inverse text-heading lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5 fill-current"
              >
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              </svg>
              <span className="sr-only">
                {open ? copy.nav.menuClose : copy.nav.menuOpen}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-[55] flex flex-col overscroll-contain bg-inverse text-on-inverse lg:hidden"
      >
        <div className="container-page flex shrink-0 items-center justify-between py-s3">
          <BrandMark tone="light" className="w-[150px]" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-11 items-center justify-center border-2 border-on-inverse text-on-inverse"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5 fill-current"
            >
              <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4l-6.3 6.3-1.41-1.41L9.17 12l-6.3-6.29L4.3 4.3l6.29 6.3 6.3-6.3z" />
            </svg>
            <span className="sr-only">{copy.nav.menuClose}</span>
          </button>
        </div>
        <nav
          aria-label={copy.nav.mobileAriaLabel}
          className="container-page flex-1 overflow-y-auto pb-s7"
        >
          <ul className="border-t border-white/20">
            {copy.nav.items.map((item) => (
              <li key={item.href} className="border-b border-white/20">
                <Link
                  href={item.href}
                  className="t-h3 block py-s5 text-on-inverse"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            variant="donate"
            size="cta-lg"
            className="mt-s6 w-full"
            render={<Link href="/donate" />}
          >
            {copy.nav.donate}
          </Button>
          <SocialLinks tone="dark" className="mt-s6 justify-center" />
        </nav>
      </div>
    </>
  );
}
