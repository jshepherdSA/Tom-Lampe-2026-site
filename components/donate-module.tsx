import { buttonVariants } from "@/components/ui/button";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

const D = copy.home.donate;

/**
 * WinRed's source code. It tells the campaign a contribution came from the
 * website rather than a mailer, a text or a door knock, so it is a constant
 * of this component rather than editable copy.
 */
const SOURCE_CODE = "website";

/**
 * A preset amount, or the base page when the amount is left to the donor.
 * Order matters: WinRed's own links read `?amount=50&sc=website`.
 */
function donateHref(amount?: number) {
  const params = new URLSearchParams();
  if (amount) params.set("amount", String(amount));
  params.set("sc", SOURCE_CODE);
  return `${D.processorUrl}?${params.toString()}`;
}

/**
 * Amounts, as links out to WinRed.
 *
 * The campaign does not process contributions. Every control here is a plain
 * anchor to WinRed's own form, so no card number, address or donor name is
 * ever typed on this site, and there is nothing here to submit, validate or
 * store. That is also why this is a server component with no state: the whole
 * module ships as markup and no JavaScript.
 *
 * These borrow `buttonVariants` rather than the `Button` component. Button is
 * Base UI's, which stamps role="button" on whatever it renders, and a control
 * that navigates to another site is a link. Sharing the variants keeps the
 * fill, size, radius, focus ring and touch target identical to every other
 * campaign button while the semantics stay honest.
 *
 * The variants must go through `cn`. Its tailwind-merge drops the base
 * `border border-transparent` when a variant sets a border colour; without it
 * the transparent rule wins on stylesheet order and an outline button renders
 * with no visible outline at all. `Button` does the same thing internally.
 *
 * Links open in the same tab. A donor sent to a payment form in a new window
 * loses the trail back, and the note below says where they are going before
 * they get there.
 *
 * `tone` changes colour only, for the module sitting on an inverse band.
 */
export function DonateModule({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const onDark = tone === "dark";
  const quiet = onDark ? "text-muted-on-inverse" : "text-ink-muted";

  return (
    <div className="flex flex-col gap-s5">
      <ul aria-label={D.heading} className="grid gap-s4 sm:grid-cols-3">
        {D.levels.map((level) => (
          <li key={level.amount} className="flex flex-col gap-s2">
            <a
              href={donateHref(level.amount)}
              aria-label={`Donate $${level.amount.toLocaleString()}`}
              className={cn(
                buttonVariants({ variant: "donate", size: "cta-lg" }),
                "w-full",
              )}
            >
              ${level.amount.toLocaleString()}
            </a>
            <p className={cn("t-small", quiet)}>{level.note}</p>
          </li>
        ))}
      </ul>

      <a
        href={donateHref()}
        className={cn(
          buttonVariants({
            variant: onDark ? "outlineInverse" : "outline2",
            size: "cta-lg",
          }),
          "self-start",
        )}
      >
        {D.otherLabel}
      </a>

      <p className={cn("t-small measure", quiet)}>{D.processorNote}</p>
    </div>
  );
}
