import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LedgerList } from "@/components/ledger-rule";
import { copy } from "@/content/copy";
import { HALF_IMAGE_SIZES, HERO_IMAGE_SIZES } from "@/lib/tokens";

const M = copy.meetTom;

export const metadata: Metadata = {
  title: M.meta.title,
  description: M.meta.description,
};

export default function MeetTomPage() {
  return (
    <>
      {/* page header — copy left, the right half of the section is the photo */}
      <section
        aria-labelledby="meet-h"
        className="relative flex flex-col overflow-hidden bg-inverse lg:flex-row lg:items-center"
      >
        <div className="container-page relative z-10 w-full shrink-0 py-s7">
          <div className="lg:w-[52%] lg:pr-s6">
            <p className="t-label text-on-inverse">{M.hero.eyebrow}</p>
            <h1 id="meet-h" className="t-h1 mt-s3 text-on-inverse">
              {M.hero.heading}
            </h1>
            <p className="t-lead measure mt-s5 text-muted-on-inverse">
              {M.hero.lead}
            </p>
          </div>
        </div>

        <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[44%] lg:[clip-path:polygon(0_0,100%_0,100%_100%,14%_100%)]">
          <Image
            src="/tom-lampe-headshot.webp"
            alt={M.hero.imageAlt}
            fill
            priority
            sizes={HERO_IMAGE_SIZES}
            className="object-cover object-[52%_28%]"
          />
        </div>
      </section>

      {/* biography */}
      <section aria-labelledby="bio-h" className="section-y bg-page">
        <div className="container-page">
          <h2 id="bio-h" className="t-h2 measure text-heading">
            {M.bio.heading}
          </h2>
          <div className="mt-s5 flex flex-col gap-s4">
            {M.bio.paragraphs.map((para) => (
              <p key={para} className="measure text-body">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* service — the Ledger Rule, credential against duration */}
      <section aria-labelledby="service-h" className="bg-inverse-deep">
        <div className="container-page py-s8">
          <h2 id="service-h" className="t-h2 measure text-on-inverse">
            {M.service.heading}
          </h2>
          <p className="measure mt-s3 text-muted-on-inverse">
            {M.service.lead}
          </p>
          <LedgerList
            entries={M.serviceEntries}
            tone="dark"
            className="mt-s6"
            aria-label={M.service.heading}
          />
        </div>
      </section>

      {/* roots */}
      <section aria-labelledby="roots-h" className="section-y bg-band">
        <div className="container-page grid items-center gap-s7 lg:grid-cols-2 lg:gap-s8">
          <div>
            <p className="t-label text-link">{M.roots.eyebrow}</p>
            <h2 id="roots-h" className="t-h2 mt-s3 text-heading">
              {M.roots.heading}
            </h2>
            <p className="measure mt-s5 text-body">{M.roots.body}</p>
          </div>
          <Image
            src="/tom-lampe-family.webp"
            alt={M.roots.imageAlt}
            width={1264}
            height={1055}
            sizes={HALF_IMAGE_SIZES}
            className="h-auto w-full border-b-4 border-rule"
          />
        </div>
      </section>

      {/* close */}
      <section aria-labelledby="meet-close-h" className="section-y bg-page">
        <div className="container-page">
          <h2 id="meet-close-h" className="t-h2 measure text-heading">
            {M.close.heading}
          </h2>
          <p className="measure mt-s4 text-body">{M.close.body}</p>
          <div className="mt-s6 flex flex-wrap gap-s3">
            <Button
              variant="primary"
              size="cta-lg"
              render={<Link href="/record" />}
            >
              {M.close.cta}
            </Button>
            <Button
              variant="donate"
              size="cta-lg"
              render={<Link href="/donate" />}
            >
              {M.close.secondaryCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
