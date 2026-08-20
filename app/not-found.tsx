import Link from "next/link";
import { Button } from "@/components/ui/button";
import { copy } from "@/content/copy";

export default function NotFound() {
  return (
    <section className="section-y bg-page">
      <div className="container-page measure">
        <p className="t-label text-link">{copy.notFound.code}</p>
        <h1 className="t-h1 mt-s3 text-heading">{copy.notFound.heading}</h1>
        <p className="mt-s5 text-ink-muted">{copy.notFound.body}</p>
        <Button
          variant="primary"
          size="cta"
          className="mt-s6"
          render={<Link href="/" />}
        >
          {copy.notFound.cta}
        </Button>
      </div>
    </section>
  );
}
