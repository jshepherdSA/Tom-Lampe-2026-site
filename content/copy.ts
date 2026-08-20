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
  /** Short label for the jump nav. Falls back to `heading`. */
  navLabel?: string;
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

  /* -------------------------------------------------------------- meet tom */
  meetTom: {
    meta: {
      title: "Meet Tom",
      description:
        "Tom Lampe is a lifelong Campbell County resident, local businessman and fiscal conservative — six terms on Fort Thomas City Council, more than 30 years in the private sector, and a record of results on the Fiscal Court.",
    },
    hero: {
      eyebrow: "Meet Tom",
      heading: "A lifelong neighbor who measures experience by results.",
      lead: "Tom Lampe is a lifelong Campbell County resident, local businessman and fiscal conservative who believes government must earn the public’s trust.",
      imageAlt: "Portrait of Tom Lampe.",
    },
    /** Long-form biography. Each paragraph traces to the messaging documents. */
    bio: {
      heading: "Thirty years reading budgets before he ever voted on one.",
      paragraphs: [
        "Before public office, Tom spent more than 30 years in the private sector, where evaluating budgets and reading financial statements was the job. That is the lens he brought to the Fiscal Court, and it is why he treats a county budget as somebody else’s money rather than the county’s.",
        "He has governed as a taxpayer hawk — cutting tax rates, eliminating unnecessary fees, demanding more efficient services, and protecting the essential investments that keep Campbell County safe, strong and growing. He believes government should take no more from taxpayers than it needs, and that families and businesses should keep more of what they earn.",
        "That approach shows up in how problems get solved. When the county needed modern emergency communications, he worked with Kenton and Boone Counties rather than building something alone. When rural families needed water and internet, he backed partnerships that brought federal, state and private dollars in rather than standing up a new county utility.",
      ],
    },
    service: {
      heading: "Service",
      lead: "Elected office, board service and the work that came before it.",
    },
    /** figure "" renders the empty-evidence case — the rule still draws. */
    serviceEntries: [
      {
        claim: "Campbell County Commissioner, serving on the Fiscal Court.",
        figure: "Since 2014",
        label: "County Commissioner",
      },
      {
        claim:
          "Served the citizens of Fort Thomas on City Council before joining the Fiscal Court.",
        figure: "6 terms",
        label: "Fort Thomas City Council",
      },
      {
        claim:
          "Private-sector experience evaluating budgets and reviewing financial statements.",
        figure: "30+ years",
        label: "Before public office",
      },
      {
        claim: "Long-time member of the St. Elizabeth Foundation Board.",
        figure: "",
        label: "St. Elizabeth Foundation",
      },
      {
        claim:
          "Member of the Northern Kentucky Area Development District Board.",
        figure: "",
        label: "NKY Area Development District",
      },
      {
        claim:
          "Recognized by the Northern Kentucky Hates Heroin task force for his work against the opioid epidemic in Campbell County.",
        figure: "",
        label: "Recognition",
      },
    ] as LedgerEntry[],
    roots: {
      eyebrow: "Home",
      heading: "Campbell County, all of it.",
      body: "Tom is a lifelong resident of Campbell County and an active member and volunteer at St. Catherine of Siena Parish in Fort Thomas. From Newport and Bellevue to Fort Thomas and Alexandria — and throughout rural southern Campbell County — he has worked to make sure every community benefits from the county’s progress.",
      imageAlt: "Tom Lampe with his family.",
    },
    close: {
      heading: "See what that adds up to.",
      body: "Lower tax rates every year since 2020, more than $2 million saved on emergency communications, and fatal overdoses down from 54 to 10.",
      cta: "See the full record",
      secondaryCta: "Donate",
    },
  },

  /* ---------------------------------------------------------------- record */
  record: {
    meta: {
      title: "The Record",
      description:
        "Tom Lampe’s record as Campbell County Commissioner: lower tax rates every year since 2020, more than $2 million saved on emergency communications, fatal overdoses down from 54 to 10, and infrastructure delivered in every community.",
    },
    hero: {
      eyebrow: "The Record",
      heading: "Experience, measured by results.",
      lead: "Tom Lampe has governed as a taxpayer hawk — cutting tax rates, eliminating unnecessary fees, demanding more efficient services and protecting the essential investments that keep Campbell County safe, strong and growing. Here is the record, theme by theme.",
      imageAlt:
        "Tom Lampe in the Campbell County Fiscal Court chambers, before the county seal and the American and Kentucky flags.",
    },
    jumpNavHeading: "On this page",
    themeEyebrow: "A vote for Tom means",
    verify: {
      heading: "Check it yourself",
      body: "Campbell County publishes agendas, minutes, ordinances, budgets, audits and commissioners’ voting records online. Every claim on this page can be checked against the county’s own published record.",
      /** PRE-LAUNCH VERIFY — county records URL. */
      href: "{{RECORD_VERIFY_URL}}",
    },
    close: {
      heading: "Like the record? Help protect it.",
      body: "This campaign is funded and staffed by Campbell County neighbors. Add your name, or chip in to keep talking with voters between now and November 3.",
      donateCta: "Donate",
      secondaryCta: "What this means where you live",
    },
    themes: [
      {
        slug: "taxes",
        navLabel: "Taxpayers",
        heading: "Respect for the Taxpayers of Campbell County",
        promise: "Lower taxes. Efficient government. Responsible investment.",
        intro:
          "Tom believes the government should take no more from taxpayers than it needs — and families and businesses should keep more of what they earn.",
        entries: [
          {
            claim:
              "Eliminated the Net Profits Tax for Campbell County businesses and sole proprietors.",
            figure: "$0",
            label: "Net Profits Tax",
          },
          {
            claim:
              "Reduced the county property-tax rate every year since 2020, while services expanded rather than shrank.",
            figure: "17.80 → 15.30",
            label: "County property-tax rate",
          },
          {
            claim:
              "Restructured the county’s human resources and payroll department.",
            figure: "$103,000",
            label: "Saved annually",
          },
          {
            claim:
              "Developed a modern emergency-radio system with Kenton and Boone Counties.",
            figure: "$2M+",
            label: "Saved for taxpayers",
          },
          {
            claim: "Eliminated dog-license fees and moved registration online.",
            figure: "",
            label: "Fee eliminated",
          },
          {
            claim: "Eliminated park-pass and horse-trail fees.",
            figure: "",
            label: "Fees eliminated",
          },
        ],
      },
      {
        slug: "efficient-government",
        navLabel: "Efficient Government",
        heading: "Smaller, More Efficient and Modern Government",
        promise: "Better service without a bigger county payroll.",
        intro:
          "When Campbell County needed more capability, Tom looked for a partner or a better system before he looked for a bigger budget.",
        entries: [
          {
            claim:
              "Invested in online tax filing and payment software, so residents and businesses can pay online instead of standing in line or mailing checks.",
            figure: "$500,000",
            label: "Invested",
          },
          {
            claim:
              "Restructured human resources and payroll rather than adding headcount.",
            figure: "$103,000",
            label: "Saved annually",
          },
          {
            claim:
              "Partnered with neighboring counties on emergency radio instead of expanding county government.",
            figure: "$2M+",
            label: "Saved for taxpayers",
          },
          {
            claim:
              "Added Animal Control Officers and extended the service at no additional charge to participating cities.",
            figure: "10 cities",
            label: "Served at no charge",
          },
          {
            claim:
              "Moved dog registration online while eliminating the accompanying fee.",
            figure: "",
            label: "Online now",
          },
        ],
      },
      {
        slug: "public-safety",
        navLabel: "First Responders",
        heading: "Strong First Responders. Safer Families.",
        promise:
          "Equipped, connected first responders who arrive when seconds count.",
        intro:
          "Tom has worked to give Campbell County’s first responders the equipment, facilities and coordination they need to protect every community.",
        entries: [
          {
            claim:
              "Modernized emergency communications so police, fire and EMS coordinate across community lines.",
            figure: "$2M+",
            label: "Saved while improving response",
          },
          {
            claim:
              "Backed a new ambulance, plus annual support for the Fire Protection Association.",
            figure: "$210,000",
            label: "New ambulance",
          },
          {
            claim:
              "Built the police social-worker program, so officers called to a mental-health or domestic crisis have trained help on hand.",
            figure: "3 + 1",
            label: "Social workers and a supervisor",
          },
          {
            claim:
              "Supported bringing police, dispatch, emergency management and the coroner into one modern public-safety facility.",
            figure: "",
            label: "Public-safety facility",
          },
          {
            claim:
              "Backed regional training, equipment and coordinated response systems for fire and EMS.",
            figure: "",
            label: "Fire and EMS",
          },
          {
            claim:
              "Supported the county’s Office of Emergency Management and regional severe-weather preparation.",
            figure: "StormReady",
            label: "National Weather Service designation",
          },
        ],
      },
      {
        slug: "opioid-response",
        navLabel: "Opioid Response",
        heading: "Turning the Corner on the Opioid Epidemic",
        promise: "Fewer families burying someone.",
        intro:
          "This may be the single biggest daily-life impact of Tom’s tenure, even though people do not always connect it to county government. The approach pairs enforcement against traffickers with real treatment and recovery support.",
        entries: [
          {
            claim: "Fatal overdoses fell across the county.",
            figure: "54 → 10",
            label: "2020 to 2024",
          },
          {
            claim:
              "Campbell County became the first Recovery Ready Community in Kentucky.",
            figure: "1st",
            label: "In the state",
          },
          {
            claim:
              "Funded the Northern Kentucky Drug Strike Force to hold traffickers accountable.",
            figure: "$100,000",
            label: "Drug Strike Force",
          },
          {
            claim:
              "Paired enforcement with treatment, recovery, police social workers and crisis intervention.",
            figure: "",
            label: "Treatment and recovery",
          },
          {
            claim:
              "Recognized by the Northern Kentucky Hates Heroin task force for his work on the epidemic.",
            figure: "",
            label: "Recognition",
          },
        ],
      },
      {
        slug: "roads",
        navLabel: "Roads & Bridges",
        heading: "Safe Roads. Connected Communities. Shared Prosperity.",
        promise:
          "Dependable roads and bridges — paid for with outside dollars where possible.",
        intro:
          "Tom has worked to deliver safer roads, dependable bridges and responsible infrastructure investment throughout Campbell County, bringing state transportation dollars home so local taxpayers do not carry the entire cost.",
        entries: [
          {
            claim:
              "Resurfacing county roads every year — the stuff people notice on every commute.",
            figure: "10 miles",
            label: "Resurfaced annually",
          },
          {
            claim:
              "Rebuilt Deer Run Road, and resurfaced Upper and Lower Tug Fork, Tippenhauer and Heck roads.",
            figure: "",
            label: "Rural roads",
          },
          {
            claim:
              "Secured state funding to improve Upper and Lower Tug Fork Roads.",
            figure: "$200,311",
            label: "State funding",
          },
          {
            claim:
              "Joined Kentucky’s 80/20 Bridge program to fund bridges at Ten Mile and Daniels Road.",
            figure: "80%",
            label: "Covered by the state",
          },
          {
            claim:
              "Maintained county roads and bridges, plus culverts, drainage, pothole repairs, snow removal and hillside stabilization.",
            figure: "300 / 124",
            label: "Lane miles / bridges",
          },
          {
            claim:
              "Backed a state-recognized public-works team that stabilizes hillsides and keeps the network open.",
            figure: "",
            label: "Award-winning",
          },
        ],
      },
      {
        slug: "every-community",
        navLabel: "Every Community",
        heading: "No Community Left Behind in Campbell County",
        promise:
          "Clean water, reliable internet and real services in every ZIP code.",
        intro:
          "From Newport and Bellevue to Fort Thomas and Alexandria — and throughout rural southern Campbell County — clean water, reliable internet, responsive public safety and essential services should reach everyone.",
        entries: [
          {
            claim:
              "Voted to bring high-speed internet to all of Campbell County by partnering with the private sector, not creating another government utility.",
            figure: "",
            label: "Fiber to every address point",
          },
          {
            claim:
              "Supported a partnership that extended public water to rural families, leveraging federal and state funding.",
            figure: "$5.5M",
            label: "Water partnership",
          },
          {
            claim: "Extended water mains into rural Campbell County.",
            figure: "6.5 miles",
            label: "91 additional households",
          },
          {
            claim:
              "Nearly all of Campbell County can now reach clean public water, without expanding county government.",
            figure: "98%",
            label: "With public water access",
          },
          {
            claim:
              "Opened a third public-water fill station for households still beyond the lines.",
            figure: "270",
            label: "Households served",
          },
          {
            claim:
              "Extended shared emergency communications and police social-worker services across municipal boundaries.",
            figure: "",
            label: "Across city lines",
          },
        ],
      },
      {
        slug: "housing",
        navLabel: "Housing",
        heading: "Innovative Solutions on Housing",
        promise:
          "More ways to rent, own or stay in the community you already love.",
        intro:
          "It will not fix the regional housing shortage overnight, but it is the groundwork for more affordable options — without a larger county bureaucracy.",
        entries: [
          {
            claim:
              "Allowed accessory dwelling units on qualifying large lots, for aging parents, adult children and caregivers.",
            figure: "",
            label: "ADUs allowed",
          },
          {
            claim:
              "Supported seeking Community Development Block Grant funding to rehabilitate neglected properties for private homeownership.",
            figure: "$1M",
            label: "Sought in CDBG funding",
          },
          {
            claim:
              "Funded training for local Planning Commissions and Boards of Adjustment.",
            figure: "$20,000",
            label: "Planning training",
          },
          {
            claim:
              "Worked with cities to review parking, setback and zoning rules that unnecessarily raise housing costs.",
            figure: "",
            label: "Barriers reviewed",
          },
          {
            claim:
              "Runs the federal Housing Choice Voucher program at HUD’s top assessment rating.",
            figure: "High Performer",
            label: "HUD SEMAP rating",
          },
        ],
      },
      {
        slug: "parks",
        navLabel: "Parks & Trails",
        heading: "Better Parks, More Trails, Stronger Connections",
        promise:
          "More ways to walk, bike, play and enjoy the county you live in.",
        intro:
          "Tom is protecting Campbell County’s parks while creating more ways for residents to get outdoors — from A.J. Jolly Park to Riverfront Commons.",
        entries: [
          {
            claim:
              "Invested in A.J. Jolly Park, including the spillway and lake dredging — safety work, not cosmetic spending.",
            figure: "$10M",
            label: "A.J. Jolly investment",
          },
          {
            claim:
              "Protected the park’s lake, trails, campground and green space for the next generation.",
            figure: "~1,000 acres",
            label: "Public green space",
          },
          {
            claim:
              "Funded a professional assessment to improve and expand hiking and off-road biking trails.",
            figure: "$25,000",
            label: "Reimbursed by outside funding",
          },
          {
            claim:
              "Voted to advance Riverfront Commons, connecting Northern Kentucky’s river cities.",
            figure: "20 miles",
            label: "Planned corridor",
          },
          {
            claim:
              "Converted the closed Boyd Road Bridge into a pedestrian connection at a fraction of the cost of reopening it to vehicles.",
            figure: "",
            label: "Boyd Road Bridge",
          },
          {
            claim:
              "Returned the county golf course to profitability while continuing to improve it.",
            figure: "",
            label: "Golf course",
          },
          {
            claim:
              "Campbell County’s senior center is the most utilized in Kentucky.",
            figure: "#1",
            label: "In Kentucky",
          },
        ],
      },
      {
        slug: "economic-development",
        navLabel: "Jobs",
        heading: "Jobs Close to Home",
        promise: "Work in Campbell County, not a commute out of it.",
        intro:
          "Growing the county’s employment base means residents can work near where they live rather than commuting to Cincinnati or to Northern Kentucky’s other counties.",
        entries: [
          {
            claim: "Expanded the Southern Campbell County Industrial Park.",
            figure: "",
            label: "Industrial park",
          },
          {
            claim:
              "Landed jobs growth with Castellini, Jolly Enterprises, Legion Logistics, New Riff, Nexigen, PCA Architecture, PL Marketing and RWI.",
            figure: "8",
            label: "Employers",
          },
          {
            claim:
              "Kept the focus on employers that put work close to home, so families spend less of the day commuting.",
            figure: "",
            label: "Jobs near home",
          },
        ],
      },
      {
        slug: "open-government",
        navLabel: "Open Government",
        heading: "Open Government. Accountable Leadership.",
        promise:
          "A county government you can see, understand and hold accountable.",
        intro:
          "A vote for Tom means a county government you can examine — including his own record.",
        entries: [
          {
            claim:
              "Campbell County launched OpenGov, putting revenues, expenses and vendor payments online.",
            figure: "",
            label: "OpenGov",
          },
          {
            claim:
              "Agendas, minutes, ordinances, budgets, audits and commissioners’ voting records are published online.",
            figure: "",
            label: "Public record",
          },
          {
            claim:
              "Fiscal Court meetings are publicly announced, livestreamed and archived to watch anytime.",
            figure: "",
            label: "Meetings",
          },
          {
            claim:
              "The county publishes annual independent audits of how public money is managed.",
            figure: "",
            label: "Independent audits",
          },
          {
            claim:
              "Restructuring human resources and payroll delivered measurable savings.",
            figure: "$103,000",
            label: "Saved annually",
          },
          {
            claim:
              "A regional partnership on emergency radio saved taxpayers money while improving communications.",
            figure: "$2M+",
            label: "Saved for taxpayers",
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
