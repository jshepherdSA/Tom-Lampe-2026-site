import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

/**
 * Marks are drawn inline and keyed by label, not by position, so removing or
 * reordering an entry in content/copy.ts `social` can never pair a link with
 * another network's logo. A label with no mark renders nothing.
 */
const marks: Record<string, string> = {
  Facebook:
    "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z",
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 3.97a5.87 5.87 0 1 0 0 11.74 5.87 5.87 0 0 0 0-11.74Zm0 9.68a3.81 3.81 0 1 1 0-7.62 3.81 3.81 0 0 1 0 7.62Zm7.47-9.91a1.37 1.37 0 1 1-2.74 0 1.37 1.37 0 0 1 2.74 0Z",
  X: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.67l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.11z",
};

export function SocialLinks({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <ul className={cn("flex items-center gap-s4", className)}>
      {copy.social.map((s) =>
        marks[s.label] ? (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "flex size-11 items-center justify-center transition-opacity hover:opacity-70",
                tone === "dark" ? "text-muted-on-inverse" : "text-ink-muted",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5 fill-current"
              >
                <path d={marks[s.label]} />
              </svg>
              <span className="sr-only">{s.label}</span>
            </a>
          </li>
        ) : null,
      )}
    </ul>
  );
}
