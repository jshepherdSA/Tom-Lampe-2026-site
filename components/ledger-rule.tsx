import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { LedgerEntry } from "@/content/copy";

/**
 * The Ledger Rule — the site's single signature device.
 * Spec: docs/brand-guidelines.md §6.
 *
 * A claim cell and a fixed-width evidence cell divided by a 1px rule in
 * `--ledger-rule-color`. The evidence cell does not flex, so figures align
 * down the page — that is the whole point of the device.
 *
 * Behaviours required by the spec and implemented here:
 * - >=1024px: rule is vertical, full row height; row divider is inset to the
 *   claim cell so the figure column reads as continuous.
 * - <1024px:  the rule rotates to horizontal, the evidence cell moves above
 *   the claim (CSS `order`), and the figure sets flush left.
 * - Empty figure: the rule still draws. An empty evidence cell is information
 *   — it says this claim is not quantified.
 * - A `sourceHref` turns the label into a link; the rule is what signals
 *   "this has a receipt".
 *
 * Geometry lives in `.ledger-*` (app/globals.css) so no measurement is
 * hardcoded in this file.
 */

export function LedgerRow({
  entry,
  tone = "light",
  delay = 0,
  className,
}: {
  entry: LedgerEntry;
  /** `dark` = sitting on an inverse band. */
  tone?: "light" | "dark";
  /** Stagger offset, so a sheet reveals row by row rather than as a block. */
  delay?: number;
  className?: string;
}) {
  const { claim, figure, label, sourceHref } = entry;
  const hasFigure = figure.trim().length > 0;

  return (
    <Reveal
      as="li"
      delay={delay}
      className={cn("ledger-row", className)}
      data-tone={tone}
    >
      <div
        className={cn(
          "ledger-claim measure",
          tone === "dark" ? "text-on-inverse" : "text-body",
        )}
      >
        {claim}
      </div>

      <div className="ledger-evidence">
        {hasFigure ? (
          <p
            className={cn(
              "t-ledger-figure",
              tone === "dark" ? "text-marker" : "text-heading",
            )}
          >
            {figure}
          </p>
        ) : (
          /* Empty-evidence case: no figure, rule still drawn by
             .ledger-evidence. Marked so the absence is not silent. */
          <p
            className={cn(
              "t-small",
              tone === "dark" ? "text-muted-on-inverse" : "text-ink-muted",
            )}
            data-empty-evidence="true"
          >
            &mdash;
          </p>
        )}

        {sourceHref ? (
          <Link
            href={sourceHref}
            className={cn(
              "t-label mt-s2 inline-block underline underline-offset-4",
              tone === "dark" ? "text-on-inverse" : "text-link",
            )}
          >
            {label}
          </Link>
        ) : (
          <p
            className={cn(
              "t-label mt-s2",
              tone === "dark" ? "text-muted-on-inverse" : "text-ink-muted",
            )}
          >
            {label}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function LedgerList({
  entries,
  tone = "light",
  className,
  "aria-label": ariaLabel,
}: {
  entries: readonly LedgerEntry[];
  tone?: "light" | "dark";
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <ul
      className={cn("ledger-sheet list-none", className)}
      aria-label={ariaLabel}
    >
      {entries.map((entry, i) => (
        <LedgerRow
          key={`${entry.label}-${i}`}
          entry={entry}
          tone={tone}
          delay={i * 70}
        />
      ))}
    </ul>
  );
}
