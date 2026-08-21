import { Reveal } from "@/components/reveal";
import type { LedgerEntry } from "@/content/copy";
import { TILE_ASPECT } from "@/lib/tokens";
import { cn } from "@/lib/utils";

/**
 * Info display: the one layout every claim-and-figure section on the site
 * uses. Claims set as a marked list on one side, the quantified ones
 * repeated as stat tiles on the other.
 *
 * The two columns size independently: `.info-display` is `align-items:
 * start`, the claim gap is one spacing token that never varies, and a tile
 * takes its height from `--tile-aspect`. Whichever column is shorter simply
 * ends; the leftover space is left empty rather than distributed.
 *
 * The shape of the tile array is not fixed. `chooseShape` picks the number
 * of tile columns, and whether the claims split into two, by estimating both
 * columns' heights and taking the arrangement that balances them without
 * leaving holes in the grid or stretching a tile taller than it is wide.
 * Two figures against six claims used to give one tile stretched to 456px
 * inside a 270px-wide box; it now gives two wide tiles instead.
 *
 * `tone` changes colour only. The tile carries no fill of its own: it is a
 * ruled box on whatever band the section sits on, so the figure reads as
 * Signal Red on that band rather than on a card.
 */

/** Reference geometry measured at 1440. Only the ratios matter here. */
const REF = {
  /** one claim, wrapping to about two lines, plus the gap under it */
  claimHeight: 76,
  tileGap: 16,
  /** content width of each column, by which side takes the wider share */
  column: {
    tilesWide: { claims: 435, tiles: 653 },
    claimsWide: { claims: 653, tiles: 435 },
  },
  tilePadding: 48,
  /** below this, a claim column is too narrow to set two columns of text */
  minClaimColumn: 260,
  /** a tile narrower than this cannot carry a figure at a readable size */
  minTileWidth: 220,
  /** width of one figure character as a fraction of the font size, rounded up */
  figureCharWidth: 0.62,
  /** the smallest figure size, from --size-tile-figure-min */
  minFigureSize: 28,
  /** splitting fewer claims than this into two columns just looks arbitrary */
  minClaimsToSplit: 6,
};

function chooseShape(claims: number, tiles: number, longestFigure: number) {
  let best = { tileCols: tiles > 3 ? 2 : 1, claimCols: 1 };
  let bestScore = Infinity;

  // the tile has to be wide enough for its longest figure at the floor size
  const figureFloor =
    REF.minFigureSize * REF.figureCharWidth * longestFigure;

  for (const claimCols of [1, 2]) {
    const width =
      claimCols === 1 ? REF.column.tilesWide : REF.column.claimsWide;
    if (claimCols > 1 && claims < REF.minClaimsToSplit) continue;
    if (claimCols > 1 && width.claims / claimCols < REF.minClaimColumn) continue;

    for (const tileCols of [1, 2]) {
      if (tileCols > tiles) continue;
      const rows = Math.ceil(tiles / tileCols);
      const holes = rows * tileCols - tiles;
      const claimsHeight = Math.ceil(claims / claimCols) * REF.claimHeight;
      // a tile's height now comes from its own width and --tile-aspect, not
      // from whatever the other column left over
      const tileBox = (width.tiles - REF.tileGap * (tileCols - 1)) / tileCols;
      const tileWidth = tileBox - REF.tilePadding;
      const tilesHeight =
        rows * (tileBox / TILE_ASPECT) + (rows - 1) * REF.tileGap;
      if (tileWidth < Math.max(REF.minTileWidth, figureFloor)) continue;

      const score = Math.abs(claimsHeight - tilesHeight) + holes * 100;

      if (score < bestScore) {
        bestScore = score;
        best = { tileCols, claimCols };
      }
    }
  }
  return best;
}

/**
 * Figure size band. The figure is sized against its own tile in `cqi`, so a
 * band only has to say how much of the tile a string of this length may
 * take. Longer strings take a smaller share so nothing wraps: the widest
 * figure in the copy, "High Performer", is 7.4x its own font size.
 */
function figureBand(figure: string) {
  const n = figure.length;
  if (n <= 3) return "fig-1";
  if (n <= 5) return "fig-2";
  if (n <= 7) return "fig-3";
  if (n <= 10) return "fig-4";
  if (n <= 13) return "fig-5";
  return "fig-6";
}

export function InfoDisplay({
  entries,
  tone = "light",
  className,
  "aria-label": ariaLabel,
}: {
  entries: LedgerEntry[];
  tone?: "light" | "dark";
  className?: string;
  "aria-label"?: string;
}) {
  const stats = entries.filter((e) => e.figure);
  const { tileCols, claimCols } = chooseShape(
    entries.length,
    stats.length,
    stats.reduce((n, e) => Math.max(n, e.figure.length), 0),
  );

  return (
    <div className={cn("info-display", className)} data-tone={tone}>
      <ul className="info-claims" data-cols={claimCols} aria-label={ariaLabel}>
        {entries.map((entry, i) => (
          <Reveal as="li" key={entry.label} delay={i * 70}>
            {entry.claim}
          </Reveal>
        ))}
      </ul>

      {stats.length > 0 && (
        <ul className="info-tiles" data-cols={tileCols}>
          {stats.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.label}
              delay={i * 70}
              className={cn("info-tile", figureBand(entry.figure))}
            >
              <p className="t-tile-figure info-figure">{entry.figure}</p>
              <p className="t-tile-label info-label">{entry.label}</p>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
