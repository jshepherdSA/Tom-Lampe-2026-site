import type { Metadata } from "next";
import { DonateModule } from "@/components/donate-module";
import { copy } from "@/content/copy";

const D = copy.donatePage;

export const metadata: Metadata = {
  title: D.meta.title,
  description: D.meta.description,
};

export default function DonatePage() {
  return (
    <>
      <section aria-labelledby="donate-h" className="bg-inverse-deep">
        <div className="container-page py-s8">
          <p className="t-label text-on-inverse">{D.eyebrow}</p>
          <h1 id="donate-h" className="t-h1 mt-s3 text-on-inverse">
            {D.heading}
          </h1>
          <p className="t-lead t-lead-tight measure mt-s5 text-muted-on-inverse">
            {D.lead}
          </p>
        </div>
      </section>

      <section aria-labelledby="amount-h" className="section-y bg-page">
        <div className="container-page grid items-start gap-s7 lg:grid-cols-[var(--split-donate)] lg:gap-s8">
          <div>
            <h2 id="amount-h" className="t-h3 text-heading">
              {D.asideHeading}
            </h2>
            <p className="measure mt-s3 text-body">{D.asideBody}</p>
            <p className="t-legal measure mt-s6 text-ink-muted">
              {D.disclosure}
            </p>
          </div>
          <DonateModule tone="light" />
        </div>
      </section>
    </>
  );
}
