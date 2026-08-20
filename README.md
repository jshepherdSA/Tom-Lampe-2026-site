# Tom Lampe for Campbell County Commissioner — campaign site

Next.js (App Router) · TypeScript · Tailwind v4 · shadcn/ui.
Election Day: Tuesday, November 3, 2026.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| Path                         | Purpose                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `content/copy.ts`            | **All site copy, single file.** Remaining `{{PLACEHOLDER}}` slots are unwritten. Nothing outside this file contains user-facing text. |
| `assets/design-tokens.json`  | Hand-authored tokens — primitive → semantic → component. Source of truth.                                                             |
| `assets/design-tokens.css`   | The same tokens as CSS custom properties.                                                                                             |
| `app/globals.css`            | Maps tokens onto Tailwind utilities and the Ledger Rule geometry.                                                                     |
| `components/ledger-rule.tsx` | The site's signature device (claim ↔ evidence ↔ provenance).                                                                          |
| `public/brand/`              | Vector lockups: `logo-dark.svg` (light grounds), `logo-light.svg` (dark grounds).                                                     |
| `fonts/`                     | Self-hosted variable woff2, latin subset.                                                                                             |

## Rules this codebase enforces

- **No hardcoded values.** Colors, spacing, type and radii come from tokens.
  Verify with:
  `node <design-system-skill>/scripts/validate-tokens.cjs --dir app` (also `components`, `lib`, `content`).
  Two values that CSS variables cannot reach — `<meta name="theme-color">` and
  `next/image` `sizes` — are imported from the token JSON via `lib/tokens.ts`.
- **Token names must not collide with shadcn's** (`--muted`, `--accent`,
  `--border`, `--input`, `--ring`, `--primary`, …). The bridge block in
  `app/globals.css` assigns those in the same `:root` and will silently win.
- **Signal Red is not a text color** below 24px. It is a fill, a border, or a
  display figure. See the contrast table in the brand guidelines.
- **Copy lives in `content/copy.ts`.** Do not inline strings in components.

## Status

Built: `/` and `/record`.
Not built: `/meet-tom`, `/communities`, `/join`, `/donate`, `/privacy`, `/terms`.

Forms are client-side only — no CRM or ESP is connected and nothing is stored.
The donation button and several URLs are placeholders.

## Fonts

Archivo and Source Serif 4, both SIL Open Font License 1.1.
See `fonts/OFL-NOTICE.md`.
