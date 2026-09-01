"use client";

import { useMemo, useState } from "react";
import type { CopyEntry } from "@/lib/copy-index";

/** The site's hard copy rules, checked as you type. */
function problems(text: string) {
  const found: string[] = [];
  // escaped so this file does not itself trip scripts/check-no-emdash.cjs
  if (text.includes("\u2014")) found.push("em dash");
  if (text.includes(";")) found.push("semicolon");
  if (text.includes("!")) found.push("exclamation mark");
  if (/'/.test(text)) found.push("straight apostrophe");
  return found;
}

export function Editor({ entries }: { entries: CopyEntry[] }) {
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("");

  const changed = Object.keys(edits).length;

  const groups = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const rows = q
      ? entries.filter(
          (e) =>
            e.value.toLowerCase().includes(q) ||
            e.section.toLowerCase().includes(q) ||
            e.page.toLowerCase().includes(q),
        )
      : entries;
    const byPage = new Map<string, Map<string, CopyEntry[]>>();
    for (const e of rows) {
      if (!byPage.has(e.page)) byPage.set(e.page, new Map());
      const secs = byPage.get(e.page)!;
      if (!secs.has(e.section)) secs.set(e.section, []);
      secs.get(e.section)!.push(e);
    }
    return byPage;
  }, [entries, filter]);

  const save = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/copy-edits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edits }),
      });
      const json = await res.json();
      setSaved(json.count ?? 0);
    } finally {
      setBusy(false);
    }
  };

  return (
    /* A fixed full-viewport surface so the site's own sticky header and
       footer cannot overlap the toolbar. Nothing in the production layout
       needs to know this route exists. */
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflowY: "auto",
        background: "#fff",
      }}
    >
      <div style={{ padding: "0 32px 96px", maxWidth: 980, margin: "0 auto" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#fff",
            borderBottom: "2px solid #292f70",
            padding: "16px 0",
            marginBottom: 24,
          }}
        >
          <h1
            style={{ font: "700 22px system-ui", margin: 0, color: "#16172e" }}
          >
            Copy editor
          </h1>
          <p
            style={{
              font: "14px system-ui",
              color: "#55586f",
              margin: "6px 0 12px",
            }}
          >
            {entries.length} boxes, in the order they appear on the site. Edit
            any of them. Nothing changes on the site until you hit Save and
            Claude applies them. Section names in blue are labels for finding
            your place, not content. Every heading on the site is an editable
            box, listed first inside its own section.
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by text, section or page"
              style={{
                flex: 1,
                font: "15px system-ui",
                padding: "9px 12px",
                border: "1px solid #dddee8",
              }}
            />
            <button
              onClick={save}
              disabled={!changed || busy}
              style={{
                font: "600 15px system-ui",
                padding: "10px 18px",
                border: 0,
                color: "#fff",
                background: changed ? "#c2151c" : "#aeb6e4",
                cursor: changed ? "pointer" : "default",
              }}
            >
              {busy
                ? "Saving..."
                : `Save ${changed} change${changed === 1 ? "" : "s"}`}
            </button>
          </div>
          {saved !== null && (
            <p
              style={{
                font: "600 14px system-ui",
                color: "#0a7",
                margin: "12px 0 0",
              }}
            >
              Saved {saved} change{saved === 1 ? "" : "s"} to
              content/copy-edits.json. Tell Claude to apply them.
            </p>
          )}
        </header>

        {[...groups.entries()].map(([page, sections]) => (
          <section key={page} style={{ marginBottom: 40 }}>
            <h2
              style={{
                font: "700 17px system-ui",
                color: "#fff",
                background: "#292f70",
                padding: "8px 12px",
                margin: "0 0 4px",
              }}
            >
              {page}
            </h2>
            {[...sections.entries()].map(([section, rows]) => (
              <div key={section} style={{ margin: "18px 0 26px" }}>
                <h3
                  style={{
                    font: "600 14px system-ui",
                    color: "#384f9b",
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    margin: "0 0 10px",
                  }}
                >
                  {section}
                  {rows[0]?.sectionHint ? (
                    <span
                      style={{
                        font: "400 13px system-ui",
                        color: "#8a8da3",
                        textTransform: "none",
                        letterSpacing: 0,
                        marginLeft: 10,
                      }}
                    >
                      {rows[0].sectionHint}
                    </span>
                  ) : null}
                </h3>
                {rows.map((e) => {
                  const value = edits[e.path] ?? e.value;
                  const dirty = e.path in edits && edits[e.path] !== e.value;
                  const warn = problems(value);
                  return (
                    <div key={e.path} style={{ margin: "0 0 14px" }}>
                      <label
                        style={{
                          font: "600 12px system-ui",
                          color: dirty ? "#c2151c" : "#55586f",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {e.role}
                        {dirty ? " (edited)" : ""}
                        <span
                          style={{
                            font: "400 11px ui-monospace, monospace",
                            color: "#8a8da3",
                            marginLeft: 8,
                          }}
                        >
                          {e.path}
                        </span>
                      </label>
                      <textarea
                        value={value}
                        rows={Math.max(1, Math.ceil(value.length / 95))}
                        onChange={(ev) => {
                          const next = { ...edits };
                          if (ev.target.value === e.value) delete next[e.path];
                          else next[e.path] = ev.target.value;
                          setEdits(next);
                        }}
                        style={{
                          width: "100%",
                          font: "15px/1.5 system-ui",
                          padding: "8px 10px",
                          border: `1px solid ${dirty ? "#c2151c" : "#dddee8"}`,
                          background: dirty ? "#fff7f7" : "#fff",
                          resize: "vertical",
                        }}
                      />
                      {warn.length > 0 && (
                        <p
                          style={{
                            font: "600 12px system-ui",
                            color: "#c2151c",
                            margin: "4px 0 0",
                          }}
                        >
                          Not allowed on this site: {warn.join(", ")}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
