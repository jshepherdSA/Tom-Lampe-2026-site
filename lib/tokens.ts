import tokens from "@/assets/design-tokens.json";

/**
 * Typed access to the token file for the few places a value must reach
 * JavaScript rather than CSS, chiefly `next/image` `sizes`, which is a
 * resource hint the browser reads before any stylesheet applies and therefore
 * cannot use a CSS custom property.
 *
 * The breakpoint here MUST stay equal to the ledger rotation breakpoint, which
 * is why it is read from the same token rather than written twice.
 */
export const LEDGER_ROTATE_BP =
  tokens.primitive.breakpoint["ledger-rotate"].$value;

/** Hero photo occupies the right 44% of the section at and above the breakpoint. */
export const HERO_IMAGE_SIZES = `(min-width: ${LEDGER_ROTATE_BP}) 44vw, 100vw`;

/** A photo occupying roughly half the section at and above the breakpoint. */
export const HALF_IMAGE_SIZES = `(min-width: ${LEDGER_ROTATE_BP}) 46vw, 100vw`;

/** Browser chrome colour. `<meta>` cannot take a CSS custom property. */
export const THEME_COLOR = tokens.primitive.color["lampe-indigo"].$value;

/**
 * Stat-tile aspect ratio as a number, parsed from the same token the CSS
 * uses. `InfoDisplay` needs it to work out how tall a tile will be before
 * the browser lays it out, and CSS cannot hand a value back to JavaScript.
 */
export const TILE_ASPECT = (() => {
  const [w, h] = tokens.component.layout["tile-aspect"].$value
    .split("/")
    .map((n) => Number(n.trim()));
  return w / h;
})();
