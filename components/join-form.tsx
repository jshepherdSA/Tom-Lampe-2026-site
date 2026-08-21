"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

const F = copy.forms.join;
const V = copy.forms.validation;

/**
 * `inline`: hero row. `compact`: card. `full`: adds name + involvement.
 * Submission is client-side only; wire to the campaign's provider before launch.
 */
export function JoinForm({
  variant = "compact",
  tone = "dark",
}: {
  variant?: "inline" | "compact" | "full";
  tone?: "dark" | "light";
}) {
  const uid = useId();
  const [submitted, setSubmitted] = useState(false);

  const labelClass = cn(
    "t-label",
    tone === "dark" ? "text-on-inverse" : "text-heading",
  );
  const fieldClass =
    "min-h-11 rounded-none border-hairline bg-surface px-s4 text-body";
  const fineClass = cn(
    "t-small",
    tone === "dark" ? "text-muted-on-inverse" : "text-ink-muted",
  );

  if (submitted) {
    return (
      <div
        role="status"
        className={cn(
          "border-l-4 border-marker p-s5",
          tone === "dark"
            ? "bg-white/5 text-on-inverse"
            : "bg-band text-heading",
        )}
      >
        <p className="t-h3">{copy.forms.success.heading}</p>
        <p className={cn("mt-s2", fineClass)}>{copy.forms.success.body}</p>
      </div>
    );
  }

  const field = (
    key: "firstName" | "lastName" | "email" | "phone" | "zip",
    type: string,
    autoComplete: string,
    required: boolean,
    extra?: React.ComponentProps<typeof Input>,
  ) => (
    <div className="flex flex-col gap-s2">
      <Label htmlFor={`${uid}-${key}`} className={labelClass}>
        {F.fields[key]}
        {key === "phone" && (
          <span className={cn("ml-s1 font-normal", fineClass)}>
            {F.fields.phoneOptional}
          </span>
        )}
      </Label>
      <Input
        id={`${uid}-${key}`}
        name={key}
        type={type}
        autoComplete={autoComplete}
        required={required}
        spellCheck={false}
        className={fieldClass}
        onInvalid={(e) => {
          const el = e.currentTarget;
          el.setCustomValidity(
            el.validity.valueMissing
              ? V.required
              : key === "email"
                ? V.email
                : key === "zip"
                  ? V.zip
                  : key === "phone"
                    ? V.phone
                    : V.required,
          );
        }}
        onInput={(e) => e.currentTarget.setCustomValidity("")}
        {...extra}
      />
    </div>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-s4"
    >
      {variant === "inline" ? (
        /* Two-up grid at every width. The constraint is the card, not the
           viewport, so a viewport breakpoint cannot be used here. */
        <div className="grid gap-s3 sm:grid-cols-2">
          <div className="min-w-0 sm:col-span-2">
            {field("email", "email", "email", true)}
          </div>
          <div className="min-w-0">{field("phone", "tel", "tel", false)}</div>
          <div className="min-w-0">
            {field("zip", "text", "postal-code", true, {
              inputMode: "numeric",
              pattern: "[0-9]{5}",
              maxLength: 5,
            })}
          </div>
          <Button
            type="submit"
            variant={tone === "dark" ? "primaryInverse" : "primary"}
            size="cta"
            className="w-full sm:col-span-2"
          >
            {F.submit}
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-s4 sm:grid-cols-2">
            {field("firstName", "text", "given-name", true)}
            {variant === "full" &&
              field("lastName", "text", "family-name", true)}
            {field("email", "email", "email", true)}
            {field("zip", "text", "postal-code", true, {
              inputMode: "numeric",
              pattern: "[0-9]{5}",
              maxLength: 5,
            })}
            {field("phone", "tel", "tel", false)}
          </div>

          {variant === "full" && (
            <fieldset className="pt-s3">
              <legend
                className={cn(
                  "t-label mb-s3",
                  tone === "dark" ? "text-on-inverse" : "text-link",
                )}
              >
                {F.involvementLegend}
              </legend>
              <div className="grid gap-x-s6 gap-y-s3 sm:grid-cols-2">
                {F.involvement.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex min-h-11 items-center gap-s3"
                  >
                    <Checkbox
                      id={`${uid}-${opt.id}`}
                      name="involvement"
                      value={opt.id}
                    />
                    <Label
                      htmlFor={`${uid}-${opt.id}`}
                      className={cn(
                        "font-normal",
                        tone === "dark" ? "text-on-inverse" : "text-body",
                      )}
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </div>
            </fieldset>
          )}

          <Button
            type="submit"
            variant={tone === "dark" ? "primaryInverse" : "primary"}
            size={variant === "full" ? "cta-lg" : "cta"}
            className="w-full self-start sm:w-auto"
          >
            {F.submit}
          </Button>
        </>
      )}

      <p className={cn(fineClass, "measure")}>{F.consent}</p>
    </form>
  );
}
