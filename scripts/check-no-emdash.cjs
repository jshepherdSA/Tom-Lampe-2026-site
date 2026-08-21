#!/usr/bin/env node
/**
 * Hard rule (docs/brand-guidelines.md §0.4): zero em dashes on this site.
 * Scans source for U+2014 and its HTML entities. Exits 1 on any hit.
 *
 * The Ledger Rule's empty-evidence marker is an EN dash (U+2013) and is
 * deliberately not matched here.
 */
const fs = require("fs");
const path = require("path");

const ROOTS = ["app", "components", "content", "lib"];
const EXT = new Set([".ts", ".tsx", ".css", ".svg", ".json", ".md"]);
const PATTERNS = [
  { re: /—/g, name: "em dash (U+2014)" },
  { re: /&mdash;/gi, name: "&mdash;" },
  { re: /&#8212;/g, name: "&#8212;" },
  { re: /&#x2014;/gi, name: "&#x2014;" },
];

const hits = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (EXT.has(path.extname(e.name))) {
      fs.readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        for (const { re, name } of PATTERNS) {
          re.lastIndex = 0;
          if (re.test(line)) hits.push({ file: p, line: i + 1, name, text: line.trim().slice(0, 90) });
        }
      });
    }
  }
};

for (const r of ROOTS) if (fs.existsSync(r)) walk(r);

if (hits.length) {
  console.error(`\n✖ ${hits.length} em dash${hits.length > 1 ? "es" : ""} found. This site allows zero.\n`);
  for (const h of hits) console.error(`  ${h.file}:${h.line}  ${h.name}\n    ${h.text}`);
  console.error("\nRewrite the sentence: comma for an aside, colon to introduce,");
  console.error("semicolon to join, or a full stop to split. Do not substitute an en dash.\n");
  process.exit(1);
}
console.log("✓ no em dashes");
