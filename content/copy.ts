/**
 * SINGLE SOURCE OF ALL SITE COPY.
 *
 * Every string the site renders lives here. Replace each {{PLACEHOLDER}} with
 * final copy. Nothing outside this file contains user-facing text.
 *
 * Rules:
 * - Structure (slug, href, order, count) is code. Text is yours.
 * - Add or remove array entries freely; the pages iterate whatever is here.
 * - `tenureStart` is the ONLY place the year appears. Never render a computed
 *   "X years in office" figure from it.
 * - `committeeName` fills the KRS 121.190 disclaimer. Name only.
 */

export type LedgerEntry = {
  /** Prose claim. Left cell. */
  claim: string;
  /** Figure. Right cell. Empty string renders the empty-evidence case. */
  figure: string;
  /** Label under the figure. */
  label: string;
  /** Optional public source. Renders the label as a link when present. */
  sourceHref?: string;
};

export type RecordTheme = {
  /** URL fragment. Structure, not copy. */
  slug: string;
  heading: string;
  promise: string;
  intro: string;
  entries: LedgerEntry[];
};

export const copy = {
  /* ---------------------------------------------------------------- global */
  meta: {
    siteTitle: "Tom Lampe for Campbell County Commissioner",
    titleTemplate: "%s | Tom Lampe for Campbell County Commissioner",
    description:
      "Tom Lampe is a lifelong Campbell County resident, local businessman and fiscal conservative. Lower tax rates every year since 2020, more than $2 million saved for taxpayers, and stronger emergency services.",
    ogTitle: "Proven Results. Taxpayer Accountability. Campbell County First.",
    ogDescription:
      "Tom brings experience — but he measures that experience by results.",
  },

  global: {
    candidateName: "Tom Lampe",
    office: "Campbell County Commissioner",
    logoAlt: "Tom Lampe for County Commissioner",
    skipToContent: "Skip to main content",
    electionDayLabel: "Election Day",
    electionDate: "November 3, 2026",
    /** PRE-LAUNCH VERIFY — low confidence. Single source of truth. */
    tenureStart: "2014",
    /** KRS 121.190. Name only. Never below 14px, never reduced opacity. */
    committeeName: "{{COMMITTEE_NAME}}",
    email: "{{CONTACT_EMAIL}}",
    emailLabel: "{{CONTACT_EMAIL_LABEL}}",
  },

  nav: {
    ariaLabel: "Primary",
    mobileAriaLabel: "Mobile",
    homeLabel: "Tom Lampe for Campbell County Commissioner — home",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    items: [
      { href: "/meet-tom", label: "Meet Tom" },
      { href: "/record", label: "The Record" },
      { href: "/communities", label: "Your Community" },
      { href: "/join", label: "Join the Team" },
    ],
    donate: "Donate",
  },

  social: [
    { label: "Facebook", href: "{{SOCIAL_1_URL}}" },
    { label: "Instagram", href: "{{SOCIAL_2_URL}}" },
    { label: "X", href: "{{SOCIAL_3_URL}}" },
  ],

  /* ------------------------------------------------------------------ home */
  home: {
    hero: {
      eyebrow: "Campbell County Commissioner",
      headline:
        "Proven Results. Taxpayer Accountability. Campbell County First.",
      lead: "Tom Lampe is a lifelong Campbell County resident, local businessman and fiscal conservative who believes government must earn the public’s trust. He brings experience — but he measures that experience by results.",
      primaryCta: "Join the Team",
      secondaryCta: "Donate",
      imageAlt:
        "Tom Lampe marching in a Campbell County parade, waving an American flag beside a woman in a red campaign shirt, with Tom Lampe yard signs and neighbors lining the street.",
    },
    join: {
      heading: "Join the team",
      body: "Add your name and we’ll keep you posted between now and November 3.",
    },
    donate: {
      eyebrow: "Chip in",
      heading: "Funded by neighbors.",
      body: "No corporate machine, no out-of-state money. Every dollar goes to talking with Campbell County voters between now and November 3.",
      submit: "Contribute",
      otherLabel: "Other",
      otherFieldLabel: "Enter an amount",
      /** amount is structure; note is copy. */
      levels: [
        {
          amount: 25,
          note: "Prints a stack of door hangers for one precinct.",
        },
        { amount: 50, note: "Puts yard signs on a neighborhood block." },
        { amount: 100, note: "Covers a week of mailings to undecided voters." },
        {
          amount: 250,
          note: "Funds a digital ad run across the river cities.",
        },
        { amount: 500, note: "Underwrites a countywide literature drop." },
        { amount: 1000, note: "Backs a full week of voter contact." },
      ],
      /** PRE-LAUNCH VERIFY — processor URL. */
      processorUrl: "{{DONATE_PROCESSOR_URL}}",
    },
    proof: {
      heading: "Experience, measured by results",
      cta: "See the full record",
      entries: [
        {
          claim:
            "Reduced the county property-tax rate every year since 2020, while services expanded rather than shrank.",
          figure: "17.80 → 15.30",
          label: "County property-tax rate",
        },
        {
          claim:
            "Built a modern emergency-radio system with Kenton and Boone Counties instead of expanding county government.",
          figure: "$2M+",
          label: "Saved for taxpayers",
        },
        {
          claim:
            "Eliminated the Net Profits Tax for Campbell County businesses and sole proprietors.",
          figure: "$0",
          label: "Net Profits Tax",
        },
        {
          claim:
            "Funded treatment, recovery and the Drug Strike Force as Campbell County became Kentucky’s first Recovery Ready Community.",
          figure: "54 → 10",
          label: "Fatal overdoses, 2020 to 2024",
        },
      ] as LedgerEntry[],
    },
    explore: {
      heading: "A safer, more affordable and better-connected Campbell County.",
      body: "Whether you live along the river, in a suburban neighborhood or on a rural road — from Newport and Bellevue to Fort Thomas and Alexandria, and throughout rural southern Campbell County.",
      linkLabel: "Read more",
      items: [
        {
          href: "/meet-tom",
          title: "Meet Tom",
          body: "A lifelong Campbell County resident, local businessman and fiscal conservative.",
        },
        {
          href: "/record",
          title: "The Record",
          body: "Lower tax rates, millions saved, stronger first responders and better roads.",
        },
        {
          href: "/communities",
          title: "Your Community",
          body: "What Tom’s record means where you live — from the river cities to the rural south.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- record */
  record: {
    meta: {
      title: "{{RECORD_PAGE_TITLE}}",
      description: "{{RECORD_META_DESCRIPTION}}",
    },
    hero: {
      eyebrow: "{{RECORD_EYEBROW}}",
      heading: "{{RECORD_HEADING}}",
      lead: "{{RECORD_LEAD}}",
      imageAlt: "{{RECORD_IMAGE_ALT}}",
    },
    jumpNavHeading: "{{RECORD_JUMPNAV_HEADING}}",
    themeEyebrow: "{{RECORD_THEME_EYEBROW}}",
    verify: {
      heading: "{{RECORD_VERIFY_HEADING}}",
      body: "{{RECORD_VERIFY_BODY}}",
      /** PRE-LAUNCH VERIFY — county records URL. */
      href: "{{RECORD_VERIFY_URL}}",
    },
    close: {
      heading: "{{RECORD_CLOSE_HEADING}}",
      body: "{{RECORD_CLOSE_BODY}}",
      donateCta: "{{RECORD_CLOSE_DONATE_CTA}}",
      secondaryCta: "{{RECORD_CLOSE_SECONDARY_CTA}}",
    },
    /**
     * One entry per theme. Add or remove themes and entries freely.
     * `figure: ""` renders the empty-evidence case — the rule still draws.
     */
    themes: [
      {
        slug: "theme-1",
        heading: "{{RECORD_T1_HEADING}}",
        promise: "{{RECORD_T1_PROMISE}}",
        intro: "{{RECORD_T1_INTRO}}",
        entries: [
          {
            claim: "{{RECORD_T1_E1_CLAIM}}",
            figure: "{{RECORD_T1_E1_FIGURE}}",
            label: "{{RECORD_T1_E1_LABEL}}",
          },
          {
            claim: "{{RECORD_T1_E2_CLAIM}}",
            figure: "{{RECORD_T1_E2_FIGURE}}",
            label: "{{RECORD_T1_E2_LABEL}}",
          },
          {
            claim: "{{RECORD_T1_E3_CLAIM}}",
            figure: "",
            label: "{{RECORD_T1_E3_LABEL}}",
          },
        ],
      },
      {
        slug: "theme-2",
        heading: "{{RECORD_T2_HEADING}}",
        promise: "{{RECORD_T2_PROMISE}}",
        intro: "{{RECORD_T2_INTRO}}",
        entries: [
          {
            claim: "{{RECORD_T2_E1_CLAIM}}",
            figure: "{{RECORD_T2_E1_FIGURE}}",
            label: "{{RECORD_T2_E1_LABEL}}",
          },
          {
            claim: "{{RECORD_T2_E2_CLAIM}}",
            figure: "{{RECORD_T2_E2_FIGURE}}",
            label: "{{RECORD_T2_E2_LABEL}}",
          },
        ],
      },
      {
        slug: "theme-3",
        heading: "{{RECORD_T3_HEADING}}",
        promise: "{{RECORD_T3_PROMISE}}",
        intro: "{{RECORD_T3_INTRO}}",
        entries: [
          {
            claim: "{{RECORD_T3_E1_CLAIM}}",
            figure: "{{RECORD_T3_E1_FIGURE}}",
            label: "{{RECORD_T3_E1_LABEL}}",
          },
          {
            claim: "{{RECORD_T3_E2_CLAIM}}",
            figure: "{{RECORD_T3_E2_FIGURE}}",
            label: "{{RECORD_T3_E2_LABEL}}",
          },
        ],
      },
    ] as RecordTheme[],
  },

  /* ----------------------------------------------------------------- forms */
  forms: {
    join: {
      heading: "Join the team",
      body: "Add your name and we’ll keep you posted.",
      submit: "Join the Team",
      consent:
        "By submitting this form and providing your mobile number, you consent to receive voter contact, donation asks and informational messages from the campaign. Msg & data rates may apply. Msg frequency varies. Reply STOP to unsubscribe, HELP for help.",
      fields: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Mobile",
        phoneOptional: "(optional)",
        zip: "ZIP",
      },
      involvementLegend: "I’d like to help by",
      involvement: [
        { id: "opt-1", label: "Putting a yard sign in my yard" },
        { id: "opt-2", label: "Volunteering or knocking doors" },
        { id: "opt-3", label: "Hosting a meet-and-greet" },
        { id: "opt-4", label: "Adding my name as a public supporter" },
        { id: "opt-5", label: "Making calls or sending texts" },
        { id: "opt-6", label: "Contributing to the campaign" },
      ],
    },
    success: {
      heading: "You’re on the team.",
      body: "Thanks for signing up. Watch your inbox — the campaign will be in touch about yard signs, events and ways to help between now and Election Day.",
    },
    validation: {
      required: "Please fill this in.",
      email: "Enter an email address like name@example.com.",
      zip: "Enter a 5-digit ZIP code.",
      phone: "Enter a mobile number like 859-555-0100.",
      amount: "Enter a dollar amount, numbers only.",
    },
    error: {
      heading: "That didn’t go through.",
      body: "Something went wrong on our end. Your details were not saved.",
      retry: "Try again",
    },
  },

  /* ---------------------------------------------------------------- footer */
  footer: {
    tagline:
      "Proven results, taxpayer accountability and Campbell County first — in every community, from the river to the county line.",
    columns: [
      {
        heading: "Campaign",
        links: [
          { href: "/meet-tom", label: "Meet Tom" },
          { href: "/record", label: "The Record" },
          { href: "/communities", label: "Your Community" },
          { href: "/join", label: "Join the Team" },
          { href: "/donate", label: "Donate" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms" },
        ],
      },
    ],
    copyright: "© 2026 Tom Lampe for Campbell County Commissioner.",
  },

  /* ------------------------------------------------------------- not found */
  notFound: {
    code: "404",
    heading: "We couldn’t find that page.",
    body: "The link may be out of date. Head back to the homepage and try again.",
    cta: "Back to the homepage",
  },
} as const;

export type Copy = typeof copy;
