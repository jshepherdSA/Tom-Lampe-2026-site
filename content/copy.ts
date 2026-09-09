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

/**
 * Hierarchy is authored here, never computed at render time.
 * - lead     at most one per section; the section's single strongest fact
 * - standard carries a figure worth comparing against the other standards
 * - minor    real but small; no figure. If it needs a number, it is not minor
 */
export type EntryTier = "lead" | "standard" | "minor";

export type RecordEntry = {
  /** Prose claim. Must not restate the label. */
  claim: string;
  /** Figure. Empty for a minor entry. */
  figure: string;
  /**
   * The figure slot normally holds a quantity, set at display size. Set this
   * when it holds a phrase instead, so words are typeset at heading size and
   * do not run to four lines. Same idea as `kind: "designation"`, which drops
   * a named distinction one step for the same reason.
   */
  figureSize?: "phrase";
  /** Short noun phrase naming the metric. */
  label: string;
  tier: EntryTier;
  /**
   * A designation is a named distinction, not a quantity. It sits in a
   * standard slot but takes a quieter rule and heading-coloured type at
   * --size-h3, so it never reads as comparable to a dollar figure beside it.
   * Only StormReady and the HUD SEMAP rating qualify.
   */
  kind?: "designation";
  /** Optional public source. Renders the label as a link when present. */
  sourceHref?: string;
};

export type RecordTheme = {
  /** URL fragment. Structure, not copy. */
  slug: string;
  heading: string;
  /** Short label for the jump nav. Falls back to `heading`. */
  navLabel?: string;
  intro: string;
  entries: RecordEntry[];
};

export const copy = {
  /* ---------------------------------------------------------------- global */
  meta: {
    siteTitle: "Tom Lampe for Campbell County Commissioner",
    titleTemplate: "%s | Tom Lampe for Campbell County Commissioner",
    description:
      "Tom Lampe has lived in Campbell County his whole life. He watches how the county spends your money. Tax rates are down every year since 2020. The county saved more than $2 million for taxpayers and built up its emergency services.",
    ogTitle: "Proven Results. Taxpayer Accountability. Campbell County First.",
    ogDescription:
      "Tom brings experience. He would rather you judge him on results.",
  },

  global: {
    candidateName: "Tom Lampe",
    office: "Campbell County Commissioner",
    logoAlt: "Tom Lampe for County Commissioner",
    skipToContent: "Skip to main content",
    electionDayLabel: "Election Day",
    electionDate: "November 3, 2026",
    /** PRE-LAUNCH VERIFY: low confidence. Single source of truth. */
    tenureStart: "2014",
    /** KRS 121.190. Name only. Never below 14px, never reduced opacity. */
    committeeName: "Lampe for County Commissioner",
  },

  nav: {
    ariaLabel: "Primary",
    mobileAriaLabel: "Mobile",
    homeLabel: "Tom Lampe for Campbell County Commissioner, home",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    items: [
      { href: "/meet-tom", label: "Meet Tom" },
      { href: "/record", label: "The Record" },
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
      /** One phrase per line. Rendered as three <span className="block">. */
      headlineLines: [
        "Proven Results.",
        "Taxpayer Accountability.",
        "Campbell County First.",
      ],
      lead: "A vote for Tom Lampe means a Campbell County where families feel safe, roads and bridges are dependable, taxes are kept under control and essential services work, no matter where you live.",
      primaryCta: "Join the Team",
      secondaryCta: "Donate",
      imageAlt:
        "Tom Lampe marches in a Campbell County parade. He waves an American flag next to a woman in a red campaign shirt. Tom Lampe yard signs and neighbors line the street.",
    },
    join: {
      heading: "Join the team",
      body: "Add your name and we will keep you posted between now and November 3.",
    },
    donate: {
      eyebrow: "Chip in",
      heading: "Funded by neighbors.",
      body: "Let’s keep Campbell County moving forward. Support Tom Lampe with a donation today and your vote on November 3.",
      otherLabel: "Other Amount",
      /** amount is structure; note is copy. */
      levels: [
        { amount: 50, note: "Puts yard signs on a neighborhood block." },
        { amount: 100, note: "Covers a week of mailings to undecided voters." },
        {
          amount: 250,
          note: "Funds a digital ad run across the river cities.",
        },
      ],
      /**
       * WinRed takes the contribution. Every amount button links here with
       * `amount` and `sc` appended, so no card or donor detail is ever typed
       * on this site. Changing this changes where the money goes: it is the
       * campaign's own WinRed page and should not be edited casually.
       */
      processorUrl:
        "https://secure.winred.com/lampe-for-county-commissioner/donate-today",
      /** NEW COPY, needs the campaign's approval. Says where a donor lands. */
      processorNote:
        "Contributions are processed securely by WinRed. You will finish your donation there.",
    },
    proof: {
      heading: "Experience, measured by results",
      cta: "See the full record",
      entries: [
        {
          claim:
            "Tom Lampe has governed as a taxpayer hawk: cutting tax rates, eliminating unnecessary fees, demanding more efficient services and protecting the essential investments that keep Campbell County safe, strong and growing.",
          figure: "17.80 → 15.30",
          label: "Property-tax rate, cents per $100",
          tier: "lead",
        },
        {
          claim:
            "Built a new emergency radio system with Kenton and Boone Counties. The county did not have to grow to do it.",
          figure: "$3.4M",
          label: "Saved for taxpayers",
          tier: "standard",
        },
        {
          claim:
            "Creating a county environment for businesses to succeed. Eliminated the Net Profits Tax for Campbell County Businesses and Sole Proprietors.",
          figure: "$0",
          label: "Net Profits Tax",
          tier: "standard",
        },
        {
          claim:
            "Tom has supported funding for the Northern Kentucky Drug Strike Force while supporting treatment, recovery, police social workers and crisis intervention contributing to a drop in overdose deaths.",
          figure: "54 → 10",
          label: "Fatal overdoses per year, 2020 to 2024",
          tier: "standard",
        },
      ] as RecordEntry[],
    },
    explore: {
      heading: "No Community Left Behind In Campbell County",
      body: "From Newport and Bellevue to Fort Thomas and Alexandria, and throughout rural southern Campbell County, Tom has worked to ensure every community benefits from Campbell County’s progress. Clean water, reliable internet, responsive public safety and essential services should reach everyone.",
      linkLabel: "Read more",
      items: [
        {
          href: "/meet-tom",
          title: "Meet Tom",
          body: "He has lived here his whole life. He watches the budget.",
        },
        {
          href: "/record",
          title: "The Record",
          body: "Lower tax rates, millions saved, stronger first responders and better roads.",
        },
      ],
    },
  },

  /* -------------------------------------------------------------- meet tom */
  meetTom: {
    meta: {
      title: "Meet Tom",
      description:
        "Tom Lampe has lived in Campbell County his whole life. He watches how the county spends. Six terms on Fort Thomas City Council. More than 30 years in business. A record of results on the Fiscal Court.",
    },
    hero: {
      eyebrow: "Meet Tom",
      /** One phrase per line. Rendered as <span className="block">. */
      headlineLines: ["A Neighbor.", "A Leader.", "A Proven Public Servant."],
      lead: "Campbell County has always been home for Tom. A lifelong resident with deep roots in the community, Tom’s commitment to family, faith and service has shaped both the life he’s built here and his approach to serving his neighbors.",
      imageAlt: "Tom Lampe at home with his wife and their three sons.",
    },
    /** Long-form biography. Each paragraph traces to the messaging documents. */
    bio: {
      heading: "Building a Stronger Campbell County for the Next Generation",
      paragraphs: [
        "Tom Lampe believes Campbell County should be a place where families can put down roots, businesses can grow, and residents can enjoy a high quality of life without being burdened by higher taxes or unnecessary government. His approach is grounded in conservative values, fiscal responsibility, limited government, and making practical investments that deliver results for the people he serves.",
        "As Commissioner, Tom has focused on the things that affect residents every day: safe communities, dependable infrastructure, strong parks and public spaces, economic opportunity, and responsible management of taxpayer dollars. He believes progress and fiscal discipline can go hand in hand: improving Campbell County today while protecting the character, affordability, and quality of life that make it a great place to call home.",
      ],
    },
    roots: {
      eyebrow: "Home",
      heading: "Campbell County, all of it.",
      body: "Tom has lived in Campbell County his whole life. He belongs to St. Thomas Parish in Ft. Thomas and volunteers there. He has worked to make sure every part of the county shares in its progress, from Newport and Bellevue to Fort Thomas and Alexandria and south into the country.",
      imageAlt:
        "Tom Lampe stands with neighbors, parents and children in Tom Lampe T-shirts. They are next to a Keep Tom Lampe sign at a Campbell County parade.",
    },
    close: {
      heading: "View Tom’s Records",
      body: "Everyone can say they are a fiscal conservative who wants to improve the quality of life. Tom has a proven track record of doing so.",
      cta: "See the full record",
      secondaryCta: "Donate",
    },
  },

  /* ---------------------------------------------------------------- record */
  record: {
    meta: {
      title: "The Record",
      description:
        "What Tom Lampe has done as county commissioner. Tax rates down every year since 2020. More than $2 million saved on emergency radios. Fatal overdoses down from 54 a year to 10. Work delivered in every community.",
    },
    hero: {
      eyebrow: "The Record",
      /** One phrase per line. Rendered as <span className="block">. */
      headlineLines: [
        "Lower Taxes.",
        "Better Services.",
        "A Stronger Campbell County.",
      ],
      lead: "Tom Lampe has proven that improving quality of life doesn’t have to mean asking taxpayers for more. While tax rates and fees have declined, Tom has helped deliver major investments in roads, high-speed internet, clean water, public safety, parks and economic development. His approach is simple: spend taxpayer dollars responsibly, invest in the services that matter most, and keep Campbell County a safe, affordable and thriving place to live, work and raise a family.",
      imageAlt:
        "Tom Lampe in a charcoal suit and patterned tie, photographed in 2026.",
    },
    jumpNavHeading: "On this page",
    themeEyebrow: "A vote for Tom means",
    close: {
      heading: "Donate today.",
      body: "Let’s keep Campbell County moving forward. Support Tom Lampe with a donation today and your vote on November 3.",
      donateCta: "Donate",
    },
    themes: [
      {
        slug: "taxes",
        navLabel: "Taxpayers",
        heading: "Respect for the Taxpayers of Campbell County",
        intro:
          "Tom believes the government should take no more from taxpayers than it needs. Families and businesses should keep more of what they earn.",
        entries: [
          {
            claim:
              "Eliminated the Net Profits Tax for Campbell County Businesses and Sole Proprietors.",
            figure: "$0",
            label: "Net Profits Tax",
            tier: "lead",
          },
          {
            claim:
              "Tom has voted to lower property tax rates since he has been in office.",
            figure: "17.80 → 15.30",
            label: "Property-tax rate, cents per $100",
            tier: "standard",
          },
          {
            claim:
              "Saved the county $103,000 annually by voting to restructure the HR and Payroll Departments.",
            figure: "",
            label: "Saved annually",
            tier: "minor",
          },
          {
            claim:
              "Tom voted to partner with Kenton and Boone Counties on a new emergency radio system saving the county over $2 million and improving overall public safety.",
            figure: "$2M+",
            label: "Saved for taxpayers",
            tier: "standard",
          },
          {
            claim:
              "Voted to eliminate the county dog license fee and moved registration online.",
            figure: "",
            label: "Fee eliminated",
            tier: "minor",
          },
          {
            claim: "Eliminated park pass and horse trail fees.",
            figure: "",
            label: "Fees eliminated",
            tier: "minor",
          },
        ],
      },
      {
        slug: "efficient-government",
        navLabel: "Efficient Government",
        heading: "Smaller, More Efficient and Modern Government",
        intro:
          "When the county needed to do more, Tom looked for a partner or a better system first. A bigger budget came last.",
        entries: [
          {
            claim:
              "Invested in online tax filing and payment making it easier for residents and businesses to pay their taxes.",
            figure: "Invested in Online Tax Filing Software",
            figureSize: "phrase",
            label: "",
            tier: "lead",
          },
          {
            claim:
              "Voted to restructure the county’s human resources and payroll department, saving $103,000 annually.",
            figure: "$103,000",
            label: "Saved annually",
            tier: "standard",
          },
          {
            claim:
              "Extended county animal-control services at no additional charge to 10 participating cities.",
            figure: "10 cities",
            label: "Served at no charge",
            tier: "standard",
          },
        ],
      },
      {
        slug: "public-safety",
        navLabel: "First Responders",
        heading: "Strong First Responders. Safer Families.",
        intro:
          "Tom has worked to give Campbell County’s first responders the equipment, facilities and coordination they need to protect every community.",
        entries: [
          {
            claim:
              "Tom helped modernize emergency communications so police, fire and EMS can coordinate across community lines, improving public safety while saving Campbell County taxpayers millions.",
            figure: "$2M+",
            label: "Saved while modernizing emergency communications software",
            tier: "lead",
          },
          {
            claim:
              "Tom voted to expand the police social-worker services throughout the county. Four social workers now work with officers to help families facing addiction, mental-health emergencies and other complex crises.",
            figure: "$210,000",
            label: "New ambulance",
            tier: "standard",
          },
          {
            claim:
              "Started the police social worker program with three social workers and a supervisor. Now an officer sent to a mental health or family crisis brings trained help along.",
            figure: "4",
            label: "Police social-worker program",
            tier: "standard",
          },
          {
            claim:
              "Support for fire and emergency medical response. Tom has consistently voted to support firefighters, EMTs and emergency personnel through regional training, emergency equipment and coordinated response systems.",
            figure: "",
            label: "Public-safety facility",
            tier: "minor",
          },
          {
            claim:
              "Tom voted to consolidate police, dispatch, emergency crews and the coroner into one centralized building to improve coordination and response.",
            figure: "",
            label: "Fire and EMS",
            tier: "minor",
          },
          {
            claim:
              "Tom supported bringing police, dispatch, emergency management and the coroner together in a modern public-safety facility designed to improve coordination and prepare Campbell County for the next generation of emergencies.",
            figure: "Prepared the County for Emergencies",
            label: "National Weather Service designation",
            tier: "standard",
            kind: "designation",
          },
        ],
      },
      {
        slug: "opioid-response",
        navLabel: "Opioid Response",
        heading: "Turning the Corner on the Opioid Epidemic",
        intro:
          "Tom has made combating the opioid crisis a priority, supporting investments in law enforcement, crisis intervention, treatment and recovery. As a result, fatal overdoses fell from 54 in 2020 to just 10 in 2024. Real progress, more lives saved and fewer Campbell County families devastated by addiction.",
        entries: [
          {
            claim: "Fewer people in the county died of an overdose.",
            figure: "54 → 10",
            label: "Fatal overdoses per year, 2020 to 2024",
            tier: "lead",
          },
          {
            claim:
              "Kentucky named Campbell County its first Recovery Ready Community.",
            figure: "1st",
            label: "In the state",
            tier: "standard",
          },
          {
            claim:
              "Paid for the Northern Kentucky Drug Strike Force to go after dealers.",
            figure: "$100,000",
            label: "Drug Strike Force",
            tier: "standard",
          },
          {
            claim:
              "Tom was recognized by the Northern Kentucky Hates Heroin task force for his work fighting the epidemic in Campbell County.",
            figure: "",
            label: "Treatment and recovery",
            tier: "minor",
          },
          {
            claim:
              "Tom voted to provide more social workers in our police departments to deal with the root cause of addiction.",
            figure: "",
            label: "Recognition",
            tier: "minor",
          },
        ],
      },
      {
        slug: "roads",
        navLabel: "Roads & Bridges",
        heading: "Safe Roads. Connected Communities. Shared Prosperity.",
        intro:
          "Tom has worked to deliver safer roads, dependable bridges and responsible infrastructure investment throughout Campbell County.",
        entries: [
          {
            claim:
              "Tom has worked with local, regional and state partners to support the new Fourth Street Bridge connecting Newport and Covington, one of Northern Kentucky’s most important infrastructure investments.",
            figure: "$90 Million",
            label: "Bridge Investment",
            tier: "lead",
          },
          {
            claim:
              "Rebuilt Deer Run Road. Repaved Upper and Lower Tug Fork, Tippenhauer and Heck roads.",
            figure: "",
            label: "Rural roads",
            tier: "minor",
          },
          {
            claim:
              "Brought in state money to fix Upper and Lower Tug Fork Roads.",
            figure: "$200,311",
            label: "State funding",
            tier: "standard",
          },
          {
            claim:
              "Joined Kentucky’s 80/20 Bridge program, which pays most of the cost, to fix the bridges at Ten Mile and Daniels Road.",
            figure: "80%",
            label: "Covered by the state",
            tier: "standard",
          },
          {
            claim:
              "Takes care of Route 536. Supports the fast track completion of 536 connector. That means drainage, potholes, snow plowing and hillsides that slip.",
            figure: "300",
            label: "Lane miles maintained",
            tier: "standard",
          },
          {
            claim:
              "Voted to maintain more than 300 miles of roads and 124 bridges, along with culverts, drainage, pothole repairs, snow removal, and hillside stabilization.",
            figure: "",
            label: "",
            tier: "standard",
          },
          {
            claim:
              "Tom has supported Campbell County’s award-winning public-works team ensuring our roads and infrastructure are properly maintained.",
            figure: "",
            label: "Award-winning",
            tier: "minor",
          },
        ],
      },
      {
        slug: "every-community",
        navLabel: "Every Community",
        heading: "No Community Left Behind in Campbell County",
        intro:
          "Clean water. Working internet. Fast help in an emergency. Every part of the county should have them, from the river cities south into the farmland.",
        entries: [
          {
            claim:
              "Backed countywide parks, recovery resources and professional services that smaller communities could not efficiently provide alone.",
            figure: "",
            label: "Fiber to every address point",
            tier: "minor",
          },
          {
            claim:
              "Tom supported a partnership with the Federal and State Governments to provide county water to nearly all rural families in Campbell County.",
            figure: "$5.5M",
            label: "Water partnership",
            tier: "lead",
          },
          {
            claim:
              "Ran new water lines into rural Campbell County and reached 91 more homes.",
            figure: "6.5 miles",
            label: "Water main extended",
            tier: "standard",
          },
          {
            claim:
              "Almost everyone in Campbell County can now get clean public water.",
            figure: "98%",
            label: "With public water access",
            tier: "standard",
          },
          {
            claim:
              "Tom voted to bring high-speed internet access to all of Campbell County by partnering with the private sector, not creating another government utility.",
            figure: "100%",
            label: "Of Campbell County has High Speed Internet Access",
            tier: "standard",
          },
          {
            claim:
              "Tom supported interim solutions for families who remain beyond public water lines by opening a third public-water fill station to serve 270 unserved households.",
            figure: "",
            label: "Across city lines",
            tier: "minor",
          },
        ],
      },
      {
        slug: "housing",
        navLabel: "Housing",
        heading: "Innovative Solutions for Affordable Housing",
        intro:
          "A vote for Tom means more opportunities to rent, own or remain in a home in Campbell County, whether you are starting a family, caring for an aging parent or hoping to stay in the community you already love.",
        entries: [
          {
            claim:
              "Tom supported this rehabilitation program that helps first-time and lower-income buyers own homes rather than creating permanent county-run housing.",
            figure: "",
            label: "Promoted attainable homeownership",
            tier: "minor",
          },
          {
            claim:
              "Tom supported $1M in Community Block Grant Funding to rehabilitate neglected properties for private homeownership while limiting the cost to county taxpayers.",
            figure: "$1M",
            label: "Sought in CDBG funding",
            tier: "standard",
          },
          {
            claim:
              "Tom supported accessory dwelling units on qualifying large lots, giving families more options for aging parents, adult children and caregivers while respecting property rights.",
            figure: "",
            label: "Expanded Housing Choices",
            tier: "standard",
          },
          {
            claim:
              "Tom supported reviewing parking, setback and zoning rules that can unnecessarily increase housing costs.",
            figure: "",
            label: "Reduced costly housing barriers",
            tier: "minor",
          },
          {
            claim:
              "Runs the federal Housing Choice Voucher program, which helps families pay rent. HUD gives it the top rating.",
            figure: "High Performer",
            label: "HUD SEMAP rating",
            tier: "standard",
            kind: "designation",
          },
        ],
      },
      {
        slug: "parks",
        navLabel: "Parks & Trails",
        heading: "Better Parks, More Trails, Stronger Connections",
        intro:
          "Tom is protecting Campbell County’s parks while creating more ways for residents to walk, bike, play and enjoy the outdoors.",
        entries: [
          {
            claim:
              "Tom has supported major investments to preserve and improve A.J. Jolly Park, nearly 1,000 acres of lake, trails, campgrounds and green space available to every Campbell County family.",
            figure: "$10M",
            label: "A.J. Jolly investment",
            tier: "lead",
          },
          {
            claim:
              "Protected the park’s lake, trails, campground and open space for the next generation.",
            figure: "~1,000 acres",
            label: "Public green space",
            tier: "standard",
          },
          {
            claim:
              "Tom supported a professional assessment to improve and expand A.J. Jolly’s hiking and off-road biking network, with the $25,000 planning cost reimbursed through outside funding.",
            figure: "$25,000",
            label: "Reimbursed by outside funding",
            tier: "standard",
          },
          {
            claim:
              "Tom voted to advance Riverfront Commons, a planned 20-mile pedestrian and bicycle corridor connecting Northern Kentucky’s river cities and extending toward Pendery Park.",
            figure: "20 miles",
            label: "of Riverfront Greenspace",
            tier: "standard",
          },
          {
            claim:
              "Turned the closed Boyd Road Bridge into a walking bridge. Reopening it to cars would have cost far more.",
            figure: "",
            label: "Boyd Road Bridge",
            tier: "minor",
          },
          {
            claim:
              "Tom has pursued state, federal and regional funding for trails, playgrounds and park improvements, expanding recreational opportunities without placing the full cost on county taxpayers.",
            figure: "",
            label: "Golf course",
            tier: "minor",
          },
          {
            claim:
              "Tom has consistently supported services that help Campbell County seniors stay active, connected and independent. The Campbell County Senior Center is the most utilized center in Kentucky.",
            figure: "#1",
            label: "In Kentucky",
            tier: "standard",
          },
        ],
      },
      {
        slug: "open-government",
        navLabel: "Open Government",
        heading: "Open Government. Accountable Leadership.",
        intro:
          "A vote for Tom means a county government you can see, understand and hold accountable.",
        entries: [
          {
            claim:
              "The county posts agendas, minutes, ordinances, budgets and audits online. It also posts how each commissioner voted.",
            figure: "",
            label: "Public record",
            tier: "minor",
          },
          {
            claim:
              "An outside auditor checks the county’s books every year, and the county posts the result.",
            figure: "",
            label: "Independent audits",
            tier: "minor",
          },
          {
            claim:
              "All Fiscal Court meetings are announced in advance, streamed live, and saved for citizen review.",
            figure: "",
            label: "All Meetings Are Online",
            tier: "standard",
          },
          /**
           * PRE-LAUNCH VERIFY: open government has no figure of its own.
           * Ask the campaign for ONE countable fact from this list and fill
           * all three fields:
           *   - Fiscal Court meetings livestreamed and archived to date
           *   - Years of budgets published online
           *   - Independent audits posted online
           * Until then this entry renders as a visible placeholder rather
           * than quietly disappearing.
           */
          {
            claim:
              "All of the County’s expenses, vendor payments, revenues, etc. can be reviewed on the County’s website.",
            /* Short on purpose: a figure slot is 36px display type, and a long
               unbreakable placeholder overflows the grid track. */
            figure: "",
            label: "Transparent Financials",
            tier: "standard",
          },
        ],
      },
    ] as RecordTheme[],
  },

  /* ----------------------------------------------------------------- forms */
  /* ------------------------------------------------------------ donate */
  /** Both pages ask for a contribution. Only the framing differs: /donate
      leads with where the money goes, /join leads with who is behind it.
      The amounts themselves live once, in home.donate.levels. */
  donatePage: {
    meta: {
      title: "Donate",
      description:
        "Campbell County neighbors pay for this campaign. Every dollar goes to talking with voters between now and November 3.",
    },
    eyebrow: "Chip in",
    heading: "Funded by neighbors.",
    lead: "No corporate machine. No money from out of state. Every dollar goes to talking with Campbell County voters between now and November 3.",
    asideHeading: "Where it goes",
    asideBody:
      "Door hangers, yard signs, mailings and digital ads. That is the whole list. This is a county race, and it is won by talking to people.",
    /** PRE-LAUNCH VERIFY: Kentucky contribution disclosure, lawyer to supply. */
    disclosure:
      "Contributions to Tom Lampe’s campaign are subject to Kentucky campaign finance law. An individual may contribute up to $3,500 per election. Contributions from corporations, LLCs, LLPs, and partnerships are prohibited. Contributions are not tax deductible.",
  },

  joinPage: {
    meta: {
      title: "Join the Team",
      description:
        "Back Tom Lampe for Campbell County Commissioner. Small gifts from neighbors pay for this campaign.",
    },
    eyebrow: "Join the team",
    heading: "The team is the people who pay for it.",
    lead: "This campaign runs on small gifts from Campbell County neighbors. Chip in and you are on the team.",
    asideHeading: "Not ready to give?",
    asideBody:
      "Add your name instead. We will keep you posted between now and Election Day, and let you know when we need help.",
    /** PRE-LAUNCH VERIFY: Kentucky contribution disclosure, lawyer to supply. */
    disclosure:
      "Contributions to Tom Lampe’s campaign are subject to Kentucky campaign finance law. An individual may contribute up to $3,500 per election. Contributions from corporations, LLCs, LLPs, and partnerships are prohibited. Contributions are not tax deductible.",
  },

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
      body: "Thanks for signing up. Watch your inbox. The campaign will be in touch about yard signs, events and ways to help between now and Election Day.",
    },
    validation: {
      required: "Please fill this in.",
      email: "Enter an email address like name@example.com.",
      zip: "Enter a 5-digit ZIP code.",
      phone: "Enter a mobile number like 859-555-0100.",
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
      "Results you can check. Your money watched closely. Campbell County first, in every town from the river to the county line.",
    columns: [
      {
        heading: "Campaign",
        links: [
          { href: "/meet-tom", label: "Meet Tom" },
          { href: "/record", label: "The Record" },
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
