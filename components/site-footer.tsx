import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { SocialLinks } from "@/components/social-links";
import { copy } from "@/content/copy";

export function SiteFooter() {
  return (
    <footer className="bg-inverse-deep text-muted-on-inverse">
      <div className="container-page py-s8">
        <div className="grid gap-s7 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <BrandMark tone="light" className="w-[190px]" />
            <p className="measure mt-s5 text-on-inverse">
              {copy.footer.tagline}
            </p>
            <SocialLinks tone="dark" className="mt-s4" />
            <a
              href={`mailto:${copy.global.email}`}
              className="t-small mt-s4 inline-flex min-h-11 items-center text-muted-on-inverse underline underline-offset-4"
            >
              {copy.global.emailLabel}
            </a>
          </div>

          {copy.footer.columns.map((col) => (
            <div key={col.heading}>
              <h2 className="t-label text-on-inverse">{col.heading}</h2>
              <ul className="mt-s4">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="t-small flex min-h-11 items-center text-muted-on-inverse hover:text-on-inverse"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="mt-s7 border-0 border-t border-rule" />

        <div className="mt-s5 flex flex-col gap-s4 md:flex-row md:items-center md:justify-between">
          {/* KRS 121.190 — candidate committee: name only. Clear and
              conspicuous: never below --size-legal, never reduced opacity. */}
          <p className="t-legal text-on-inverse">
            Paid for by <span translate="no">{copy.global.committeeName}</span>
          </p>
          <p className="t-legal text-muted-on-inverse">
            {copy.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
