"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

const D = copy.home.donate;

export function DonateModule({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [selected, setSelected] = useState<number | "other">(
    D.levels[1].amount,
  );
  const [other, setOther] = useState("");

  const amount = selected === "other" ? Number(other) || 0 : selected;
  const note =
    selected === "other"
      ? ""
      : D.levels.find((l) => l.amount === selected)?.note;

  const chip = (active: boolean) =>
    cn(
      "t-h3 flex min-h-11 items-center justify-center border-2 px-s2 py-s3 whitespace-nowrap transition-colors",
      active
        ? "border-signal-deep bg-signal-deep text-on-signal"
        : tone === "dark"
          ? "border-rule text-on-inverse hover:border-marker"
          : "border-hairline bg-surface text-heading hover:border-inverse",
    );

  return (
    <div className="flex flex-col gap-s5">
      <div
        role="group"
        aria-label={D.heading}
        className="grid grid-cols-3 gap-s2 sm:grid-cols-4 xl:grid-cols-7"
      >
        {D.levels.map((level) => (
          <button
            key={level.amount}
            type="button"
            aria-pressed={selected === level.amount}
            onClick={() => setSelected(level.amount)}
            className={chip(selected === level.amount)}
          >
            ${level.amount.toLocaleString()}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={selected === "other"}
          onClick={() => setSelected("other")}
          className={chip(selected === "other")}
        >
          {D.otherLabel}
        </button>
      </div>

      {selected === "other" && (
        <div className="flex max-w-xs flex-col gap-s2">
          <Label
            htmlFor="other-amount"
            className={cn(
              "t-label",
              tone === "dark" ? "text-on-inverse" : "text-heading",
            )}
          >
            {D.otherFieldLabel}
          </Label>
          <Input
            id="other-amount"
            inputMode="decimal"
            value={other}
            onChange={(e) => setOther(e.target.value.replace(/[^0-9.]/g, ""))}
            className="min-h-11 rounded-none border-hairline bg-surface text-body"
            spellCheck={false}
            aria-describedby="other-amount-hint"
          />
          <p id="other-amount-hint" className="t-small text-ink-muted">
            {copy.forms.validation.amount}
          </p>
        </div>
      )}

      <p
        aria-live="polite"
        className={cn(
          "min-h-s5",
          tone === "dark" ? "text-muted-on-inverse" : "text-ink-muted",
        )}
      >
        {note}
      </p>

      <Button
        variant="donate"
        size="cta-lg"
        className="self-start"
        render={<a href={D.processorUrl} />}
      >
        {D.submit}
        {amount > 0 ? ` $${amount.toLocaleString()}` : ""}
      </Button>
    </div>
  );
}
