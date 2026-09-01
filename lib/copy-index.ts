import { copy, type RecordEntry } from "@/content/copy";

/**
 * A flat index of every editable string in content/copy.ts, each with the
 * path needed to write it back and a plain-English location, so an editor
 * never has to quote the text to say which one they mean.
 *
 * Three rules govern this file:
 *
 * 1. Order is the order a reader meets the words. Pages come first, in nav
 *    order, then the chrome that repeats on every page. Inside a page,
 *    sections run top to bottom, and inside a section, fields run top to
 *    bottom. Where content/copy.ts stores keys in a different order from the
 *    one the component renders them in, `fields` restates the page order.
 *    Nothing here is inferred from the shape of the object tree.
 *
 * 2. A section is named for what it is, not for its current heading, because
 *    the heading is itself editable. The heading rides along as `sectionHint`
 *    so a section is still findable by its words.
 *
 * 3. Anything an editor would never retype is left out: hrefs, slugs, tiers,
 *    ids, and image alt text.
 *
 * Used only by the dev-only /edit route.
 */

export type CopyEntry = {
  /** e.g. record.themes[5].entries[2].claim */
  path: string;
  value: string;
  page: string;
  pageOrder: number;
  section: string;
  /** the section's current heading, shown as a finding aid. Editable above. */
  sectionHint: string;
  sectionOrder: number;
  role: string;
};

/** Structure and alt text. Never shown in the editor. */
const SKIP = new Set([
  "href",
  "slug",
  "sourceHref",
  "tier",
  "kind",
  "id",
  "imageAlt",
  "logoAlt",
]);

type Rule = {
  match: RegExp;
  page: string;
  pageOrder: number;
  section: string | ((m: RegExpMatchArray) => string);
  sectionOrder: number | ((m: RegExpMatchArray) => number);
  hint?: string | ((m: RegExpMatchArray) => string);
  /**
   * Field order within the section, for the sections whose keys are stored in
   * a different order from the one the page renders them in. First match wins.
   * Anything unlisted sorts after the listed fields, in file order.
   */
  fields?: RegExp[];
  /** Per-field sort key, for sections whose order is computed rather than listed. */
  field?: (path: string, m: RegExpMatchArray) => number;
  /** Per-field label override. Returning undefined falls back to describeRole. */
  role?: (path: string, m: RegExpMatchArray) => string | undefined;
};

const themes = copy.record.themes;

/**
 * RecordGrid renders a section's entries as lead, then standards, then the
 * minor strip, never in array order. The editor has to agree with the page,
 * or "Item 3" in here is not the third thing a reader sees, which is exactly
 * how a claim ends up typed against someone else's figure and label.
 */
const gridOrder = (entries: readonly RecordEntry[]) => {
  const byTier = (t: string) =>
    entries.map((e, i) => [e, i] as const).filter(([e]) => e.tier === t);
  return [...byTier("lead"), ...byTier("standard"), ...byTier("minor")].map(
    ([, i]) => i,
  );
};

/** field and role for a section rendered through RecordGrid. */
const grid = (
  entriesOf: (m: RegExpMatchArray) => readonly RecordEntry[],
  before: RegExp[],
) => ({
  field: (path: string, m: RegExpMatchArray) => {
    const e = path.match(/[Ee]ntries\[(\d+)\]/);
    if (!e) {
      const i = before.findIndex((re) => re.test(path));
      return i === -1 ? before.length : i;
    }
    const seat = gridOrder(entriesOf(m)).indexOf(Number(e[1]));
    return before.length + (seat === -1 ? 999 : seat);
  },
  role: (path: string, m: RegExpMatchArray) => {
    const e = path.match(/[Ee]ntries\[(\d+)\]\.(\w+)$/);
    if (!e) return undefined;
    const seat = gridOrder(entriesOf(m)).indexOf(Number(e[1]));
    return `Item ${seat + 1} ${e[2]}`;
  },
});

/** First match wins. This array is the order the editor shows. */
const RULES: Rule[] = [
  /* ------------------------------------------------------------------ home */
  {
    match: /^home\.hero\./,
    page: "Home",
    pageOrder: 1,
    section: "Hero",
    sectionOrder: 1,
    hint: copy.home.hero.headlineLines[0],
  },
  {
    match: /^home\.join\./,
    page: "Home",
    pageOrder: 1,
    section: "Sign-up block",
    sectionOrder: 2,
    hint: copy.home.join.heading,
  },
  {
    match: /^home\.donate\./,
    page: "Home",
    pageOrder: 1,
    section: "Chip in block",
    sectionOrder: 3,
    hint: copy.home.donate.heading,
    // the amount buttons render before the Contribute button
    fields: [
      /donate\.eyebrow$/,
      /donate\.heading$/,
      /donate\.body$/,
      /donate\.levels\[\d+\]\.note$/,
      /donate\.otherLabel$/,
      /donate\.otherFieldLabel$/,
      /donate\.submit$/,
      /donate\.processorUrl$/,
    ],
  },
  {
    match: /^home\.proof\./,
    page: "Home",
    pageOrder: 1,
    section: "Experience block",
    sectionOrder: 4,
    hint: copy.home.proof.heading,
    // heading, then the grid in the order it renders, then the button
    ...grid(() => copy.home.proof.entries, [/proof\.heading$/]),
  },
  {
    match: /^home\.explore\./,
    page: "Home",
    pageOrder: 1,
    section: "Explore block",
    sectionOrder: 5,
    hint: copy.home.explore.heading,
    // the link text sits at the foot of each card
    fields: [
      /explore\.heading$/,
      /explore\.body$/,
      /explore\.items\[/,
      /explore\.linkLabel$/,
    ],
  },

  /* -------------------------------------------------------------- meet tom */
  {
    match: /^meetTom\.hero\./,
    page: "Meet Tom",
    pageOrder: 2,
    section: "Hero",
    sectionOrder: 1,
    hint: copy.meetTom.hero.heading,
  },
  {
    match: /^meetTom\.bio\./,
    page: "Meet Tom",
    pageOrder: 2,
    section: "Biography",
    sectionOrder: 2,
    hint: copy.meetTom.bio.heading,
  },
  {
    // service and serviceEntries are one section on the page
    match: /^meetTom\.(service\.|serviceEntries)/,
    page: "Meet Tom",
    pageOrder: 2,
    section: "Service block",
    sectionOrder: 3,
    hint: copy.meetTom.service.heading,
    ...grid(
      () => copy.meetTom.serviceEntries,
      [/service\.heading$/, /service\.lead$/],
    ),
  },
  {
    match: /^meetTom\.roots\./,
    page: "Meet Tom",
    pageOrder: 2,
    section: "Roots block",
    sectionOrder: 4,
    hint: copy.meetTom.roots.heading,
  },
  {
    match: /^meetTom\.close\./,
    page: "Meet Tom",
    pageOrder: 2,
    section: "Closing block",
    sectionOrder: 5,
    hint: copy.meetTom.close.heading,
  },
  {
    match: /^meetTom\.meta\./,
    page: "Meet Tom",
    pageOrder: 2,
    section: "Browser tab and Google listing (not on the page)",
    sectionOrder: 99,
  },

  /* ------------------------------------------------------------ the record */
  {
    match: /^record\.hero\./,
    page: "The Record",
    pageOrder: 3,
    section: "Hero",
    sectionOrder: 1,
    hint: copy.record.hero.heading,
  },
  {
    match: /^record\.(jumpNavHeading|themeEyebrow)/,
    page: "The Record",
    pageOrder: 3,
    section: "Jump links and repeated labels",
    sectionOrder: 2,
  },
  {
    match: /^record\.themes\[(\d+)\]/,
    page: "The Record",
    pageOrder: 3,
    section: (m) => `Theme ${Number(m[1]) + 1}`,
    sectionOrder: (m) => 10 + Number(m[1]),
    hint: (m) => themes[Number(m[1])]?.heading ?? "",
    ...grid(
      (m) => themes[Number(m[1])].entries,
      [/\.navLabel$/, /\.heading$/, /\.intro$/],
    ),
  },
  {
    match: /^record\.close\./,
    page: "The Record",
    pageOrder: 3,
    section: "Closing block",
    sectionOrder: 91,
    hint: copy.record.close.heading,
  },
  {
    match: /^record\.meta\./,
    page: "The Record",
    pageOrder: 3,
    section: "Browser tab and Google listing (not on the page)",
    sectionOrder: 99,
  },

  /* ------------------------------------------------------------- join page */
  {
    match: /^joinPage\.(eyebrow|heading|lead)$/,
    page: "Join the Team page",
    pageOrder: 4,
    section: "Header",
    sectionOrder: 1,
    hint: copy.joinPage.heading,
    fields: [/\.eyebrow$/, /\.heading$/, /\.lead$/],
  },
  {
    match: /^joinPage\.disclosure$/,
    page: "Join the Team page",
    pageOrder: 4,
    section: "Legal note under the amounts",
    sectionOrder: 2,
  },
  {
    match: /^joinPage\.aside/,
    page: "Join the Team page",
    pageOrder: 4,
    section: "Sign-up block",
    sectionOrder: 3,
    hint: copy.joinPage.asideHeading,
  },
  {
    match: /^joinPage\.meta\./,
    page: "Join the Team page",
    pageOrder: 4,
    section: "Browser tab and Google listing (not on the page)",
    sectionOrder: 99,
  },

  /* ----------------------------------------------------------- donate page */
  {
    match: /^donatePage\.(eyebrow|heading|lead)$/,
    page: "Donate page",
    pageOrder: 5,
    section: "Header",
    sectionOrder: 1,
    hint: copy.donatePage.heading,
    fields: [/\.eyebrow$/, /\.heading$/, /\.lead$/],
  },
  {
    match: /^donatePage\.(aside|disclosure)/,
    page: "Donate page",
    pageOrder: 5,
    section: "Where it goes",
    sectionOrder: 2,
    hint: copy.donatePage.asideHeading,
    fields: [/\.asideHeading$/, /\.asideBody$/, /\.disclosure$/],
  },
  {
    match: /^donatePage\.meta\./,
    page: "Donate page",
    pageOrder: 5,
    section: "Browser tab and Google listing (not on the page)",
    sectionOrder: 99,
  },

  /* ------------------------------------------------------------ every page */
  {
    match: /^global\.(electionDayLabel|electionDate)$/,
    page: "Every page",
    pageOrder: 6,
    section: "Red banner at the top",
    sectionOrder: 1,
    fields: [/electionDayLabel$/, /electionDate$/],
  },
  {
    match: /^nav\.(items|donate)/,
    page: "Every page",
    pageOrder: 6,
    section: "Menu",
    sectionOrder: 2,
    fields: [/nav\.items\[/, /nav\.donate$/],
  },
  {
    match: /^forms\.join\./,
    page: "Every page",
    pageOrder: 6,
    section: "Sign-up form",
    sectionOrder: 3,
    hint: copy.forms.join.heading,
    // submit and consent are stored above the fields but render below them
    fields: [
      /join\.heading$/,
      /join\.body$/,
      /join\.fields\./,
      /join\.involvementLegend$/,
      /join\.involvement\[/,
      /join\.submit$/,
      /join\.consent$/,
    ],
  },
  {
    match: /^forms\./,
    page: "Every page",
    pageOrder: 6,
    section: "Messages after someone submits the form",
    sectionOrder: 4,
    fields: [/^forms\.success\./, /^forms\.error\./, /^forms\.validation\./],
  },
  {
    match: /^footer\.tagline$/,
    page: "Every page",
    pageOrder: 6,
    section: "Footer",
    sectionOrder: 5,
  },
  {
    match: /^social\[/,
    page: "Every page",
    pageOrder: 6,
    section: "Footer",
    sectionOrder: 5,
  },
  {
    match: /^global\.(email|emailLabel)$/,
    page: "Every page",
    pageOrder: 6,
    section: "Footer",
    sectionOrder: 5,
  },
  {
    match: /^footer\.columns\[/,
    page: "Every page",
    pageOrder: 6,
    section: "Footer",
    sectionOrder: 5,
  },
  {
    match: /^global\.committeeName$/,
    page: "Every page",
    pageOrder: 6,
    section: "Footer",
    sectionOrder: 5,
  },
  {
    match: /^footer\.copyright$/,
    page: "Every page",
    pageOrder: 6,
    section: "Footer",
    sectionOrder: 5,
  },

  /* --------------------------------------------------------------- the 404 */
  {
    match: /^notFound\./,
    page: "404 page",
    pageOrder: 7,
    section: "Page-not-found message",
    sectionOrder: 1,
    hint: copy.notFound.heading,
  },

  /* ------------------------------------------------------- behind the scenes */
  {
    match: /^meta\./,
    page: "Behind the scenes",
    pageOrder: 8,
    section: "Browser tab and Google listing, whole site",
    sectionOrder: 1,
  },
  {
    match: /^global\.(candidateName|office|tenureStart)$/,
    page: "Behind the scenes",
    pageOrder: 8,
    section: "Names and dates reused across the site",
    sectionOrder: 2,
  },
  {
    match: /^(global\.skipToContent|nav\.)/,
    page: "Behind the scenes",
    pageOrder: 8,
    section: "Screen-reader labels (never visible)",
    sectionOrder: 3,
  },
];

/** The Footer rules above are one section; keep their file order within it. */
const FOOTER_FIELD_ORDER = [
  /^footer\.tagline$/,
  /^social\[/,
  /^global\.emailLabel$/,
  /^global\.email$/,
  /^footer\.columns\[/,
  /^global\.committeeName$/,
  /^footer\.copyright$/,
];

const ROLE_NAMES: Record<string, string> = {
  heading: "Heading",
  subheading: "Subheading",
  eyebrow: "Eyebrow (small label above the heading)",
  lead: "Lead paragraph",
  body: "Body text",
  intro: "Intro paragraph",
  claim: "Claim",
  figure: "Figure",
  label: "Label",
  title: "Title",
  description: "Search description",
  navLabel: "Jump-link chip",
  cta: "Button",
  primaryCta: "Button",
  secondaryCta: "Button",
  donateCta: "Button",
  submit: "Button",
  retry: "Button",
  linkLabel: "Link text",
  note: "Note",
  consent: "Consent text",
  disclosure: "Disclosure",
  tagline: "Tagline",
  copyright: "Copyright",
  asideHeading: "Side heading",
  asideBody: "Side body text",
  otherLabel: "Other-amount button",
  otherFieldLabel: "Other-amount field label",
  processorUrl: "Donation processor link",
  involvementLegend: "Checklist heading",
  jumpNavHeading: "Jump-links heading",
  themeEyebrow: "Small label above every theme",
  code: "Big number",
  electionDayLabel: "Banner label",
  electionDate: "Banner date",
  committeeName: "Committee name (legally required)",
  emailLabel: "Email shown in the footer",
  donate: "Donate button",
  ogTitle: "Social-share title",
  ogDescription: "Social-share description",
  siteTitle: "Site title",
  titleTemplate: "Title pattern for every other page",
  skipToContent: "Skip link",
  ariaLabel: "Main menu label",
  mobileAriaLabel: "Phone menu label",
  homeLabel: "Logo link label",
  menuOpen: "Open-menu button",
  menuClose: "Close-menu button",
  candidateName: "Candidate name",
  office: "Office sought",
  tenureStart: "Year first elected",
  email: "Email address it links to",
};

const titleCase = (k: string) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

/** Numbered roles, so repeated fields are told apart at a glance. */
function describeRole(path: string): string {
  const pairs: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/[Ee]ntries\[(\d+)\]\.(\w+)$/, (m) => `Item ${+m[1] + 1} ${m[2]}`],
    [/paragraphs\[(\d+)\]$/, (m) => `Paragraph ${+m[1] + 1}`],
    [/headlineLines\[(\d+)\]$/, (m) => `Headline line ${+m[1] + 1}`],
    [/levels\[(\d+)\]\.note$/, (m) => `Amount ${+m[1] + 1} note`],
    [/^nav\.items\[(\d+)\]\.label$/, (m) => `Menu item ${+m[1] + 1}`],
    [/^social\[(\d+)\]\.label$/, (m) => `Social link ${+m[1] + 1} name`],
    [/involvement\[(\d+)\]\.label$/, (m) => `Checkbox ${+m[1] + 1}`],
    [
      /columns\[(\d+)\]\.links\[(\d+)\]\.label$/,
      (m) => `Column ${+m[1] + 1}, link ${+m[2] + 1}`,
    ],
    [/columns\[(\d+)\]\.heading$/, (m) => `Column ${+m[1] + 1} heading`],
    [
      /^forms\.join\.fields\.phoneOptional$/,
      () => "Field label: Mobile, the optional note",
    ],
    [/^forms\.join\.fields\.(\w+)$/, (m) => `Field label: ${titleCase(m[1])}`],
    [/^forms\.validation\.(\w+)$/, (m) => `Error message: ${titleCase(m[1])}`],
    [/items\[(\d+)\]\.(\w+)$/, (m) => `Card ${+m[1] + 1} ${m[2]}`],
  ];
  for (const [re, fn] of pairs) {
    const m = path.match(re);
    if (m) return fn(m);
  }
  const key = path
    .split(".")
    .pop()!
    .replace(/\[\d+\]$/, "");
  return ROLE_NAMES[key] ?? titleCase(key);
}

const rank = (patterns: RegExp[] | undefined, path: string) => {
  if (!patterns) return 0;
  const i = patterns.findIndex((re) => re.test(path));
  return i === -1 ? 999 : i;
};

export function buildCopyIndex(): CopyEntry[] {
  const flat: { path: string; value: string }[] = [];
  const walk = (node: unknown, path: string) => {
    if (typeof node === "string") return void flat.push({ path, value: node });
    if (Array.isArray(node))
      return node.forEach((v, i) => walk(v, `${path}[${i}]`));
    if (node && typeof node === "object")
      for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
        if (SKIP.has(k)) continue;
        walk(v, path ? `${path}.${k}` : k);
      }
  };
  walk(copy, "");

  const out = flat.map(({ path, value }, walkOrder) => {
    const r = RULES.find((rule) => rule.match.test(path));
    const m = r ? path.match(r.match)! : null;
    if (!r || !m) {
      // unreachable while every top-level block of copy.ts has a rule; if one
      // grows a new block it lands here rather than vanishing
      return {
        path,
        value,
        page: "Unsorted",
        pageOrder: 99,
        section: path.split(".")[0],
        sectionHint: "",
        sectionOrder: 99,
        fieldOrder: 0,
        walkOrder,
        role: describeRole(path),
      };
    }
    const section = typeof r.section === "function" ? r.section(m) : r.section;
    const hint = typeof r.hint === "function" ? r.hint(m) : (r.hint ?? "");
    return {
      path,
      value,
      page: r.page,
      pageOrder: r.pageOrder,
      section,
      sectionHint: hint === section ? "" : hint,
      sectionOrder:
        typeof r.sectionOrder === "function"
          ? r.sectionOrder(m)
          : r.sectionOrder,
      fieldOrder: r.field
        ? r.field(path, m)
        : section === "Footer"
          ? rank(FOOTER_FIELD_ORDER, path)
          : rank(r.fields, path),
      walkOrder,
      role: r.role?.(path, m) ?? describeRole(path),
    };
  });

  out.sort(
    (a, b) =>
      a.pageOrder - b.pageOrder ||
      a.sectionOrder - b.sectionOrder ||
      a.fieldOrder - b.fieldOrder ||
      a.walkOrder - b.walkOrder,
  );

  // fieldOrder and walkOrder are sort keys only; they do not cross the wire
  return out.map((e) => ({
    path: e.path,
    value: e.value,
    page: e.page,
    pageOrder: e.pageOrder,
    section: e.section,
    sectionHint: e.sectionHint,
    sectionOrder: e.sectionOrder,
    role: e.role,
  }));
}
