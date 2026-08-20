import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DonateModule } from "@/components/donate-module";
import { JoinForm } from "@/components/join-form";
import { LedgerList } from "@/components/ledger-rule";
import { Reveal } from "@/components/reveal";
import { copy } from "@/content/copy";
import { HERO_IMAGE_SIZES } from "@/lib/tokens";

const H = copy.home;

export default function HomePage() {
  return (
    <>
      {/* hero — copy left, photograph as the right half of the section */}
      <section className="relative flex flex-col overflow-hidden bg-inverse-deep lg:min-h-[68svh] lg:flex-row lg:items-center">
        <div className="container-page relative z-10 w-full shrink-0 py-s6">
          <div className="lg:w-[52%] lg:pr-s6">
            <p className="t-label text-on-inverse">{H.hero.eyebrow}</p>
            <h1 className="t-display mt-s3 text-on-inverse">
              {H.hero.headline}
            </h1>
            <p className="t-lead measure mt-s5 text-muted-on-inverse">
              {H.hero.lead}
            </p>

            <div className="mt-s6 flex flex-wrap gap-s3 lg:hidden">
              <Button
                variant="primary"
                size="cta-lg"
                render={<a href="#join" />}
              >
                {H.hero.primaryCta}
              </Button>
              <Button
                variant="outlineInverse"
                size="cta-lg"
                render={<Link href="/donate" />}
              >
                {H.hero.secondaryCta}
              </Button>
            </div>

            <div className="mt-s5 hidden max-w-2xl border border-rule bg-inverse p-s5 lg:block">
              <h2 className="t-h3 text-on-inverse">{H.join.heading}</h2>
              <p className="t-small mt-s2 mb-s4 text-muted-on-inverse">
                {H.join.body}
              </p>
              <JoinForm variant="inline" tone="dark" />
            </div>
          </div>
        </div>

        <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[44%] lg:[clip-path:polygon(0_0,100%_0,100%_100%,14%_100%)]">
          <Image
            src="/tom-lampe-parade.webp"
            alt={H.hero.imageAlt}
            fill
            priority
            sizes={HERO_IMAGE_SIZES}
            className="object-cover object-[50%_42%]"
          />
        </div>
      </section>

      {/* mobile home for the hero form */}
      <section
        id="join"
        aria-labelledby="join-h"
        className="scroll-mt-24 bg-inverse py-s7 lg:hidden"
      >
        <div className="container-page">
          <h2 id="join-h" className="t-h3 text-on-inverse">
            {H.join.heading}
          </h2>
          <p className="t-small mt-s2 mb-s5 text-muted-on-inverse">
            {H.join.body}
          </p>
          <JoinForm variant="inline" tone="dark" />
        </div>
      </section>

      {/* donate */}
      <section aria-labelledby="donate-h" className="bg-band">
        <div className="container-page grid gap-s6 py-s7 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-s8">
          <div>
            <p className="t-label text-link">{H.donate.eyebrow}</p>
            <h2 id="donate-h" className="t-h2 mt-s2 text-heading">
              {H.donate.heading}
            </h2>
            <p className="measure mt-s3 text-ink-muted">{H.donate.body}</p>
          </div>
          <DonateModule tone="light" />
        </div>
      </section>

      {/* proof — the Ledger Rule */}
      <section aria-labelledby="proof-h" className="bg-inverse-deep">
        <div className="container-page py-s7">
          <h2 id="proof-h" className="t-label text-on-inverse">
            {H.proof.heading}
          </h2>
          <Reveal className="mt-s5">
            <LedgerList
              entries={H.proof.entries}
              tone="dark"
              aria-label={H.proof.heading}
            />
          </Reveal>
          <Button
            variant="outlineInverse"
            size="cta"
            className="mt-s6"
            render={<Link href="/record" />}
          >
            {H.proof.cta}
          </Button>
        </div>
      </section>

      {/* signposts */}
      <section aria-labelledby="explore-h" className="section-y bg-page">
        <div className="container-page">
          <div className="measure">
            <h2 id="explore-h" className="t-h2 text-heading">
              {H.explore.heading}
            </h2>
            <p className="mt-s4 text-ink-muted">{H.explore.body}</p>
          </div>
          <ul className="mt-s6 grid gap-s5 md:grid-cols-3">
            {H.explore.items.map((item, i) => (
              <Reveal as="li" key={item.href} delay={i * 70}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col border-t-2 border-rule bg-surface p-s5 transition-colors hover:border-inverse"
                >
                  <h3 className="t-h3 text-heading">{item.title}</h3>
                  <p className="mt-s3 flex-1 text-ink-muted">{item.body}</p>
                  <span className="t-label mt-s4 text-link">
                    {H.explore.linkLabel}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
