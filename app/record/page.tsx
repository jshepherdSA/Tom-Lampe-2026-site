import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RecordGrid } from "@/components/record-grid";
import { copy } from "@/content/copy";
import { HERO_IMAGE_SIZES } from "@/lib/tokens";

const R = copy.record;

export const metadata: Metadata = {
  title: R.meta.title,
  description: R.meta.description,
};

export default function RecordPage() {
  return (
    <>
      {/* page header: copy left, photograph as the right half */}
      <section
        aria-labelledby="record-h"
        className="relative flex flex-col overflow-hidden bg-inverse lg:flex-row lg:items-center"
      >
        <div className="container-page relative z-10 w-full shrink-0 py-s7">
          <div className="fit-container lg:w-[var(--hero-copy-width)] lg:pr-s6">
            <p className="t-label text-on-inverse">{R.hero.eyebrow}</p>
            <h1 id="record-h" className="t-h1 t-h1-fit mt-s3 text-on-inverse">
              {R.hero.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="t-lead measure mt-s5 text-muted-on-inverse">
              {R.hero.lead}
            </p>
          </div>
        </div>

        <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[var(--hero-image-width)] lg:[clip-path:var(--hero-clip)]">
          <Image
            src="/tom-lampe-record.webp"
            alt={R.hero.imageAlt}
            fill
            priority
            sizes={HERO_IMAGE_SIZES}
            className="object-cover object-[var(--pos-hero-record)]"
          />
        </div>
      </section>

      {/* jump nav */}
      <nav
        aria-label={R.jumpNavHeading}
        className="border-b border-hairline bg-band"
      >
        <div className="container-page py-s4">
          <h2 className="t-label text-link">{R.jumpNavHeading}</h2>
          <ul className="mt-s3 flex flex-wrap gap-s2">
            {R.themes.map((t) => (
              <li key={t.slug}>
                <a
                  href={`#${t.slug}`}
                  className="t-small flex min-h-11 items-center border border-hairline bg-surface px-s3 font-semibold text-heading transition-colors hover:border-inverse"
                >
                  {t.navLabel ?? t.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* the record, theme by theme */}
      {R.themes.map((theme, i) => (
        <section
          key={theme.slug}
          id={theme.slug}
          aria-labelledby={`${theme.slug}-h`}
          className={
            i % 2 === 0
              ? "scroll-mt-24 bg-page py-s7"
              : "scroll-mt-24 bg-band py-s7"
          }
        >
          <div className="container-page">
            <header>
              <p className="t-label text-link">{R.themeEyebrow}</p>
              <h2 id={`${theme.slug}-h`} className="t-h2 mt-s2 text-heading">
                {theme.heading}
              </h2>
            </header>
            <p className="t-lead measure mt-s5 text-body">{theme.intro}</p>
            <RecordGrid
              entries={theme.entries}
              className="mt-s6"
              aria-label={theme.heading}
            />
          </div>
        </section>
      ))}

      {/* close */}
      <section aria-labelledby="close-h" className="section-y bg-page">
        <div className="container-page">
          <div>
            <h2 id="close-h" className="t-h2 text-heading">
              {R.close.heading}
            </h2>
            <p className="measure mt-s5 text-body">{R.close.body}</p>
            <div className="mt-s6 flex flex-wrap gap-s3">
              <Button
                variant="donate"
                size="cta-lg"
                render={<Link href="/donate" />}
              >
                {R.close.donateCta}
              </Button>
            </div>
          </div>        </div>
      </section>
    </>
  );
}
