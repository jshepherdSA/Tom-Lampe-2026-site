import { Reveal } from "@/components/reveal";
import type { RecordEntry } from "@/content/copy";
import { cn } from "@/lib/utils";

/**
 * RecordGrid: the single layout for every claim-and-figure section on the
 * site. Spec: docs/info-display-spec.md.
 *
 * Hierarchy is authored, not computed. Each entry carries a `tier` in
 * copy.ts and this component only sorts by it: lead, then standards, then
 * the minor strip. Nothing here measures a height, counts a string or picks
 * an arrangement. The grid is three columns at >=1100, two at >=640, one
 * below, in every section without exception.
 *
 * A figure's size comes from its tier and nothing else, so every standard
 * figure in a section renders at one size and can be compared against its
 * neighbours.
 *
 * `tone` changes colour only.
 */
export function RecordGrid({
  entries,
  tone = "light",
  className,
  "aria-label": ariaLabel,
}: {
  entries: RecordEntry[];
  tone?: "light" | "dark";
  className?: string;
  "aria-label"?: string;
}) {
  const lead = entries.find((e) => e.tier === "lead");
  const standards = entries.filter((e) => e.tier === "standard");
  const minors = entries.filter((e) => e.tier === "minor");

  return (
    <ul
      className={cn("record-grid", className)}
      data-tone={tone}
      aria-label={ariaLabel}
    >
      {lead && (
        <Reveal as="li" className="record-lead">
          <div>
            <p className="record-lead-figure">{lead.figure}</p>
            <p className="t-label record-lead-label">{lead.label}</p>
          </div>
          <p className="record-lead-claim">{lead.claim}</p>
        </Reveal>
      )}

      {standards.map((entry, i) => (
        <Reveal
          as="li"
          key={entry.label}
          delay={i * 70}
          className="record-standard"
          data-kind={entry.kind}
        >
          <p className="record-figure">{entry.figure}</p>
          <p className="t-label record-label">{entry.label}</p>
          <p className="record-claim">{entry.claim}</p>
        </Reveal>
      ))}

      {minors.length > 0 && (
        <li className="record-strip">
          <ul className="contents">
            {minors.map((entry, i) => (
              <Reveal
                as="li"
                key={entry.label}
                delay={i * 70}
                className="record-minor"
              >
                {entry.claim}
              </Reveal>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
}
