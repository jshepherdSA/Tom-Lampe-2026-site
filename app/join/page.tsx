import type { Metadata } from "next";
import { DonateModule } from "@/components/donate-module";
import { JoinForm } from "@/components/join-form";
import { copy } from "@/content/copy";

const J = copy.joinPage;

export const metadata: Metadata = {
  title: J.meta.title,
  description: J.meta.description,
};

export default function JoinPage() {
  return (
    <>
      <section aria-labelledby="join-h" className="bg-inverse-deep">
        <div className="container-page py-s8">
          <p className="t-label text-on-inverse">{J.eyebrow}</p>
          <h1 id="join-h" className="t-h1 mt-s3 text-on-inverse">
            {J.heading}
          </h1>
          <p className="t-lead t-lead-tight measure mt-s5 text-muted-on-inverse">
            {J.lead}
          </p>
        </div>
      </section>

      <section aria-labelledby="amount-h" className="section-y bg-page">
        <div className="container-page">
          <h2 id="amount-h" className="sr-only">
            {copy.home.donate.heading}
          </h2>
          <DonateModule tone="light" />
          <p className="t-legal measure mt-s6 text-ink-muted">
            {J.disclosure}
          </p>
        </div>
      </section>

      {/* the secondary path: give a name instead of money */}
      <section aria-labelledby="signup-h" className="section-y bg-band">
        <div className="container-page grid items-start gap-s7 lg:grid-cols-2 lg:gap-s8">
          <div>
            <h2 id="signup-h" className="t-h2 text-heading">
              {J.asideHeading}
            </h2>
            <p className="measure mt-s3 text-body">{J.asideBody}</p>
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
