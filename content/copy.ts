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
  promise: string;
  intro: string;
  entries: RecordEntry[];
};

export const copy = {
  /* ---------------------------------------------------------------- global */
  meta: {
    siteTitle: "Tom Lampe for Campbell County Commissioner",
    titleTemplate: "%s | Tom Lampe for Campbell County Commissioner",
    description:
      "Tom Lampe has lived in Campbell County his whole life. He runs a local business and watches how the county spends your money. Tax rates are down every year since 2020. The county saved more than $2 million for taxpayers and built up its emergency services.",
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
    committeeName: "{{COMMITTEE_NAME}}",
    email: "{{CONTACT_EMAIL}}",
    emailLabel: "{{CONTACT_EMAIL_LABEL}}",
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
      lead: "Tom Lampe has lived in Campbell County his whole life. He runs a local business and believes the county has to earn your trust. He has the experience, and he would rather you judge him on results.",
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
      body: "No corporate machine. No money from out of state. Every dollar goes to talking with Campbell County voters between now and November 3.",
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
      /** PRE-LAUNCH VERIFY: processor URL. */
      processorUrl: "{{DONATE_PROCESSOR_URL}}",
    },
    proof: {
      heading: "Experience, measured by results",
      cta: "See the full record",
      entries: [
        {
          claim:
            "Down every year since 2020. Services grew in that time. They did not shrink.",
          figure: "17.80 → 15.30",
          label: "Property-tax rate, cents per $100",
          tier: "lead",
        },
        {
          claim:
            "Built a new emergency radio system with Kenton and Boone Counties. The county did not have to grow to do it.",
          figure: "$2M+",
          label: "Saved for taxpayers",
          tier: "standard",
        },
        {
          claim:
            "Got rid of the county’s Net Profits Tax, the tax on business profits. Small businesses and people who work for themselves no longer pay it.",
          figure: "$0",
          label: "Net Profits Tax",
          tier: "standard",
        },
        {
          claim:
            "Paid for treatment, recovery and the Drug Strike Force. Campbell County was the first county in Kentucky to be named a Recovery Ready Community.",
          figure: "54 → 10",
          label: "Fatal overdoses per year, 2020 to 2024",
          tier: "standard",
        },
      ] as RecordEntry[],
    },
    explore: {
      heading: "A county that is safer, costs less and stays connected.",
      body: "Maybe you live along the river. Maybe you live in a suburb or out on a country road. This is for all of Campbell County, from Newport and Bellevue to Fort Thomas and Alexandria, and south into the farmland.",
      linkLabel: "Read more",
      items: [
        {
          href: "/meet-tom",
          title: "Meet Tom",
          body: "He has lived here his whole life. He runs a local business and watches the budget.",
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
        "Tom Lampe has lived in Campbell County his whole life. He runs a local business and watches how the county spends. Six terms on Fort Thomas City Council. More than 30 years in business. A record of results on the Fiscal Court.",
    },
    hero: {
      eyebrow: "Meet Tom",
      heading: "A neighbor who would rather you judge him on results.",
      lead: "Tom Lampe has lived in Campbell County his whole life. He runs a local business and believes the county has to earn your trust.",
      imageAlt: "Tom Lampe at home with his wife and their three sons.",
    },
    /** Long-form biography. Each paragraph traces to the messaging documents. */
    bio: {
      heading: "Thirty years reading budgets before he ever voted on one.",
      paragraphs: [
        "Before he ran for office, Tom spent more than 30 years in business. Reading budgets and financial statements was his job. He brought that habit to the Fiscal Court. He treats the county budget as your money, not the county’s.",
        "He watches every dollar. He has cut tax rates, dropped fees the county did not need, pushed for services that cost less to run, and protected the things that keep Campbell County safe and growing. He thinks the county should take no more than it needs, so families and businesses keep more of what they earn.",
        "You can see that in how he solves problems. The county needed new emergency radios. He worked with Kenton and Boone Counties instead of building our own. Rural families needed water and internet. He backed partnerships that brought in federal, state and private money, so the county did not have to start a new utility.",
      ],
    },
    service: {
      heading: "Service",
      lead: "Elected office, board service and the work he did before that.",
    },
    /** figure "" renders the empty-evidence case: the rule still draws. */
    serviceEntries: [
      {
        claim:
          "He sits on the Fiscal Court, the group that runs county government.",
        figure: "Since 2014",
        label: "County Commissioner",
        tier: "lead",
      },
      {
        claim:
          "He served Fort Thomas on City Council before he joined the Fiscal Court.",
        figure: "6 terms",
        label: "Fort Thomas City Council",
        tier: "standard",
      },
      {
        claim: "He read budgets and company financial statements for a living.",
        figure: "30+ years",
        label: "Before public office",
        tier: "standard",
      },
      {
        claim: "He has served on the St. Elizabeth Foundation Board for years.",
        figure: "",
        label: "St. Elizabeth Foundation",
        tier: "minor",
      },
      {
        claim:
          "He sits on the board of the Northern Kentucky Area Development District.",
        figure: "",
        label: "NKY Area Development District",
        tier: "minor",
      },
      {
        claim:
          "Northern Kentucky Hates Heroin honored him for his work on the opioid crisis.",
        figure: "",
        label: "Recognition",
        tier: "minor",
      },
    ] as RecordEntry[],
    roots: {
      eyebrow: "Home",
      heading: "Campbell County, all of it.",
      body: "Tom has lived in Campbell County his whole life. He belongs to St. Catherine of Siena Parish in Fort Thomas and volunteers there. He has worked to make sure every part of the county shares in its progress, from Newport and Bellevue to Fort Thomas and Alexandria and south into the country.",
      imageAlt:
        "Tom Lampe stands with neighbors, parents and children in Tom Lampe T-shirts. They are next to a Keep Tom Lampe sign at a Campbell County parade.",
    },
    close: {
      heading: "See what that adds up to.",
      body: "Tax rates down every year since 2020. More than $2 million saved on emergency radios. Fatal overdoses down from 54 a year to 10.",
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
      heading: "Experience, measured by results.",
      lead: "Tom Lampe watches every dollar. He has cut tax rates, dropped fees the county did not need, pushed for services that cost less to run, and protected the things that keep Campbell County safe and growing. Here is the record, one subject at a time.",
      imageAlt:
        "Tom Lampe in a charcoal suit and patterned tie, photographed in 2026.",
    },
    jumpNavHeading: "On this page",
    themeEyebrow: "A vote for Tom means",
    verify: {
      heading: "Check it yourself",
      body: "The county posts its agendas, minutes, budgets, audits and votes online. You can check every claim on this page against the county’s own records.",
      /** PRE-LAUNCH VERIFY: county records URL. */
      href: "{{RECORD_VERIFY_URL}}",
    },
    close: {
      heading: "Like the record? Help protect it.",
      body: "Campbell County neighbors pay for and run this campaign. Add your name, or chip in so we can keep talking with voters between now and November 3.",
      donateCta: "Donate",
    },
    themes: [
      {
        slug: "taxes",
        navLabel: "Taxpayers",
        heading: "Respect for the Taxpayers of Campbell County",
        promise: "Lower taxes. Efficient government. Responsible investment.",
        intro:
          "Tom thinks the county should take no more than it needs. Families and businesses should keep more of what they earn.",
        entries: [
          {
            claim:
              "Got rid of the county’s Net Profits Tax, the tax on business profits. Small businesses and people who work for themselves no longer pay it.",
            figure: "$0",
            label: "Net Profits Tax",
            tier: "lead",
          },
          {
            claim:
              "Down every year since 2020. Services grew in that time. They did not shrink.",
            figure: "17.80 → 15.30",
            label: "Property-tax rate, cents per $100",
            tier: "standard",
          },
          {
            claim: "Reorganized how the county handles hiring and paychecks.",
            figure: "",
            label: "Saved annually",
            tier: "minor",
          },
          {
            claim:
              "Built a new emergency radio system with Kenton and Boone Counties.",
            figure: "$2M+",
            label: "Saved for taxpayers",
            tier: "standard",
          },
          {
            claim: "Dropped the dog license fee and moved sign-up online.",
            figure: "",
            label: "Fee eliminated",
            tier: "minor",
          },
          {
            claim: "Dropped the fees for park passes and horse trails.",
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
        promise: "Better service without a bigger county payroll.",
        intro:
          "When the county needed to do more, Tom looked for a partner or a better system first. A bigger budget came last.",
        entries: [
          {
            claim:
              "Paid for software that lets people file and pay county taxes online. No more standing in line or mailing a check.",
            figure: "$500,000",
            label: "Invested",
            tier: "lead",
          },
          {
            claim:
              "Changed how the county handles hiring and paychecks instead of hiring more staff.",
            figure: "$103,000",
            label: "Saved annually",
            tier: "standard",
          },
          {
            claim:
              "Teamed up with nearby counties on emergency radios. The county did not have to grow to do it.",
            figure: "",
            label: "Saved for taxpayers",
            tier: "minor",
          },
          {
            claim:
              "Hired animal control officers. Nearby cities can use them at no extra cost.",
            figure: "10 cities",
            label: "Served at no charge",
            tier: "standard",
          },
          {
            claim:
              "Moved dog registration online and dropped the fee that came with it.",
            figure: "",
            label: "Online now",
            tier: "minor",
          },
        ],
      },
      {
        slug: "public-safety",
        navLabel: "First Responders",
        heading: "Strong First Responders. Safer Families.",
        promise: "First responders with the right gear, who get there fast.",
        intro:
          "Tom has worked to give first responders the gear, buildings and radios they need. Every part of the county counts.",
        entries: [
          {
            claim:
              "Replaced the old emergency radios. Now police, firefighters and paramedics can talk to each other.",
            figure: "$2M+",
            label: "Saved while improving response",
            tier: "lead",
          },
          {
            claim:
              "Backed a new ambulance. Also backs the Fire Protection Association every year.",
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
              "Backed a plan for one new building. It would hold police, dispatch, emergency crews and the coroner.",
            figure: "",
            label: "Public-safety facility",
            tier: "minor",
          },
          {
            claim:
              "Backed training, gear and shared plans for fire and paramedic crews.",
            figure: "",
            label: "Fire and EMS",
            tier: "minor",
          },
          {
            claim:
              "Backed the county’s emergency management office. Also backs storm planning with nearby counties.",
            figure: "StormReady",
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
        promise: "Fewer families burying someone.",
        intro:
          "This may be the biggest change in daily life during Tom’s time in office. Most people do not connect it to county government. The county goes after traffickers and pays for real treatment and recovery at the same time.",
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
              "Went after dealers. Paid for treatment, recovery, police social workers and crisis teams at the same time.",
            figure: "",
            label: "Treatment and recovery",
            tier: "minor",
          },
          {
            claim:
              "Northern Kentucky Hates Heroin honored him for his work on the crisis.",
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
        promise:
          "Roads and bridges you can count on, paid for with outside money where we can.",
        intro:
          "Tom has worked for safer roads and bridges across Campbell County. He brings state road money home so local taxpayers do not pay the whole bill.",
        entries: [
          {
            claim: "New pavement every year on the roads people drive to work.",
            figure: "10 miles",
            label: "Resurfaced annually",
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
              "Takes care of the county’s roads. That means drainage, potholes, snow plowing and hillsides that slip.",
            figure: "300",
            label: "Lane miles maintained",
            tier: "standard",
          },
          {
            claim: "Keeps up the county’s bridges.",
            figure: "124",
            label: "Bridges maintained",
            tier: "standard",
          },
          {
            claim:
              "Backed a public works crew the state has honored. They shore up hillsides and keep roads open.",
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
        promise:
          "Clean water, working internet and real services in every ZIP code.",
        intro:
          "Clean water. Working internet. Fast help in an emergency. Every part of the county should have them, from the river cities south into the farmland.",
        entries: [
          {
            claim:
              "Voted to bring high-speed internet to every address in the county. Private companies do the work, so the county did not have to build it.",
            figure: "",
            label: "Fiber to every address point",
            tier: "minor",
          },
          {
            claim:
              "Backed a partnership that ran public water to rural families. Federal and state money paid for it.",
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
              "Almost everyone in Campbell County can now get clean public water. The county did not have to grow to do it.",
            figure: "98%",
            label: "With public water access",
            tier: "standard",
          },
          {
            claim:
              "Opened a third fill station for homes the water lines still do not reach.",
            figure: "270",
            label: "Households served",
            tier: "standard",
          },
          {
            claim:
              "Let nearby cities use the county’s emergency radios and police social workers.",
            figure: "",
            label: "Across city lines",
            tier: "minor",
          },
        ],
      },
      {
        slug: "housing",
        navLabel: "Housing",
        heading: "Innovative Solutions on Housing",
        promise: "More ways to rent, own or stay in the town you already love.",
        intro:
          "This will not fix the housing shortage overnight. It lays the groundwork for homes people can afford, and it does not take a bigger county payroll.",
        entries: [
          {
            claim:
              "Let people build a small second home on a large lot, for a parent, a grown child or a caregiver.",
            figure: "",
            label: "ADUs allowed",
            tier: "minor",
          },
          {
            claim:
              "Backed asking for a federal Community Development Block Grant. That money fixes up run-down homes so families can buy them.",
            figure: "$1M",
            label: "Sought in CDBG funding",
            tier: "standard",
          },
          {
            claim:
              "Paid to train the local boards that decide what gets built.",
            figure: "$20,000",
            label: "Planning training",
            tier: "standard",
          },
          {
            claim:
              "Worked with cities to look at parking, setback and zoning rules that push up the cost of a home.",
            figure: "",
            label: "Barriers reviewed",
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
        promise:
          "More ways to walk, bike, play and enjoy the county you live in.",
        intro:
          "Tom is protecting the county’s parks and adding more ways to get outside, from A.J. Jolly Park to Riverfront Commons.",
        entries: [
          {
            claim:
              "Put money into A.J. Jolly Park, including the spillway and dredging the lake. That is safety work, not decoration.",
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
              "Paid an expert to plan better hiking and mountain bike trails.",
            figure: "$25,000",
            label: "Reimbursed by outside funding",
            tier: "standard",
          },
          {
            claim:
              "Voted to move Riverfront Commons forward. It will link the river cities.",
            figure: "20 miles",
            label: "Planned corridor",
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
              "Made the county golf course pay for itself and kept improving it.",
            figure: "",
            label: "Golf course",
            tier: "minor",
          },
          {
            claim:
              "More people use Campbell County’s senior center than any other in the state.",
            figure: "#1",
            label: "In Kentucky",
            tier: "standard",
          },
        ],
      },
      {
        slug: "economic-development",
        navLabel: "Jobs",
        heading: "Jobs Close to Home",
        promise: "Work in Campbell County, not a commute out of it.",
        intro:
          "More jobs here means people can work near home. They do not have to drive to Cincinnati or another county.",
        entries: [
          {
            claim: "Grew the industrial park in southern Campbell County.",
            figure: "",
            label: "Industrial park",
            tier: "minor",
          },
          {
            claim:
              "Helped bring new jobs to Campbell County. New and expanding employers include Castellini, Jolly Enterprises, Legion Logistics, New Riff, Nexigen, PCA Architecture, PL Marketing and RWI.",
            figure: "8",
            label: "Employers",
            tier: "lead",
          },
          {
            claim:
              "Went after employers that keep work close to home, so families spend less time driving.",
            figure: "",
            label: "Jobs near home",
            tier: "minor",
          },
        ],
      },
      {
        slug: "open-government",
        navLabel: "Open Government",
        heading: "Open Government. Accountable Leadership.",
        promise:
          "A county government you can watch, understand and hold accountable.",
        intro:
          "A vote for Tom means a county government you can look into, including his own record.",
        entries: [
          {
            claim:
              "The county put its income, spending and payments to vendors online through OpenGov.",
            figure: "",
            label: "OpenGov",
            tier: "minor",
          },
          {
            claim:
              "The county posts agendas, minutes, ordinances, budgets and audits online. It also posts how each commissioner voted.",
            figure: "",
            label: "Public record",
            tier: "minor",
          },
          {
            claim:
              "Fiscal Court meetings are announced ahead of time, streamed live and saved so you can watch later.",
            figure: "",
            label: "Meetings",
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
              "Changing how the county handles hiring and paychecks saved real money.",
            figure: "$103,000",
            label: "Saved annually",
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
            claim: "{{OPEN_GOV_CLAIM}}",
            /* Short on purpose: a figure slot is 36px display type, and a long
               unbreakable placeholder overflows the grid track. */
            figure: "{{TBD}}",
            label: "{{OPEN_GOV_LABEL}}",
            tier: "standard",
          },
          {
            claim:
              "The county shares emergency radios with nearby counties. That saved money and made them work better.",
            figure: "",
            label: "Saved for taxpayers",
            tier: "minor",
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
    asideBody: "Door hangers, yard signs, mailings and digital ads. That is the whole list. This is a county race, and it is won by talking to people.",
    /** PRE-LAUNCH VERIFY: Kentucky contribution disclosure, lawyer to supply. */
    disclosure: "{{CONTRIBUTION_DISCLOSURE}}",
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
    asideBody: "Add your name instead. We will keep you posted between now and Election Day, and let you know when we need help.",
    /** PRE-LAUNCH VERIFY: Kentucky contribution disclosure, lawyer to supply. */
    disclosure: "{{CONTRIBUTION_DISCLOSURE}}",
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
