import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JoinForm } from "@/components/join-form";
import { LedgerList } from "@/components/ledger-rule";
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
      {/* page header — copy left, photograph as the right half */}
      <section
        aria-labelledby="record-h"
        className="relative flex flex-col overflow-hidden bg-inverse lg:flex-row lg:items-center"
      >
        <div className="container-page relative z-10 w-full shrink-0 py-s7">
          <div className="lg:w-[52%] lg:pr-s6">
            <p className="t-label text-on-inverse">{R.hero.eyebrow}</p>
            <h1 id="record-h" className="t-h1 mt-s3 text-on-inverse">
              {R.hero.heading}
            </h1>
            <p className="t-lead measure mt-s5 text-muted-on-inverse">
              {R.hero.lead}
            </p>
          </div>
        </div>

        <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[44%] lg:[clip-path:polygon(0_0,100%_0,100%_100%,14%_100%)]">
          <Image
            src="/tom-lampe-portrait.webp"
            alt={R.hero.imageAlt}
            fill
            priority
            sizes={HERO_IMAGE_SIZES}
            className="object-cover object-[42%_35%]"
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
                  {t.heading}
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
              <p className="t-h3 mt-s4 text-link">{theme.promise}</p>
            </header>
            <p className="t-lead measure mt-s5 text-body">{theme.intro}</p>
            <LedgerList
              entries={theme.entries}
              className="mt-s5"
              aria-label={theme.heading}
            />
          </div>
        </section>
      ))}

      {/* provenance */}
      <section aria-labelledby="verify-h" className="bg-inverse-deep">
        <div className="container-page py-s6">
          <h2 id="verify-h" className="t-label text-on-inverse">
            {R.verify.heading}
          </h2>
          <p className="measure mt-s3 text-on-inverse">{R.verify.body}</p>
          <a
            href={R.verify.href}
            className="t-label mt-s3 inline-flex min-h-11 items-center text-on-inverse underline underline-offset-4"
          >
            {R.verify.href}
          </a>
        </div>
      </section>

      {/* close */}
      <section aria-labelledby="close-h" className="section-y bg-page">
        <div className="container-page grid items-start gap-s7 lg:grid-cols-2 lg:gap-s8">
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
              <Button
                variant="outline2"
                size="cta-lg"
                render={<Link href="/communities" />}
              >
                {R.close.secondaryCta}
              </Button>
            </div>
          </div>
          <div className="border-2 border-inverse bg-surface p-s5">
            <h3 className="t-h3 text-heading">{copy.forms.join.heading}</h3>
            <p className="t-small mt-s2 mb-s5 text-ink-muted">
              {copy.forms.join.body}
            </p>
            <JoinForm variant="compact" tone="light" />
          </div>
        </div>
      </section>
    </>
  );
}
