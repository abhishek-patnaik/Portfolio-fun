import type { Project, ProjectCategory } from "@/types/portfolio";

export const projectCategories: ProjectCategory[] = [
  "Data Science",
  "Machine Learning",
  "Data Analytics",
  "Business Intelligence",
  "Software Engineering",
  "AI Applications",
  "Web Development",
  "Experimental Technology",
];

const GITHUB = "https://github.com/abhishek-patnaik";

/**
 * Projects and case studies.
 *
 * Imported from abhishekpatnaik.in (project cards and case studies) and the
 * résumé, October 2026. Charts come from the public project repositories.
 * The first five `featured` projects get a pod in the Project District.
 */
export const projects: Project[] = [
  {
    id: "funnel-intelligence",
    slug: "funnel-intelligence",
    title: "Funnel Intelligence: GA4 E-Commerce Analytics",
    category: "Data Analytics",
    summary: "Diagnose, predict and decide on 4.3M real GA4 events from the Google Merchandise Store.",
    problem:
      "Funnel charts show people leaving, but a team needs more: is the drop real or a tracking bug, which segment leaks, can buyers be spotted early, which fix pays back first, and how long a test must run.",
    objective: null,
    approach: [
      "Ran a tracking audit first, then computed step rates only from sessions that reached both steps.",
      "Tested segments with Holm correction.",
      "Built a purchase model scored at the 5th interaction and tested on January after tuning on December.",
      "Sized fixes with 20,000 simulations.",
    ],
    technologies: ["Google BigQuery", "SQL", "Python", "pandas", "scikit-learn", "SciPy", "DuckDB", "pytest"],
    kpis: [
      { value: "41%", label: "Purchases missing add_to_cart" },
      { value: "0.76", label: "ROC-AUC on an unseen month" },
      { value: "$18.7K", label: "Top fix, per month" },
    ],
    insights: [
      "1.35% of 360,129 sessions convert.",
      "41.3% of purchase sessions have no add_to_cart event.",
      "New visitors complete checkout at 29.8% vs 59.7% for everyone else.",
      "The top 10% of scored sessions hold 43% of buyers.",
    ],
    results: [
      "A ranked fix list: new-visitor checkout first at about $18,704 a month (90% range $17,517 to $19,930), with an A/B test plan needing about 14 days.",
      "The model beat a rule-based baseline 2.3x on PR-AUC.",
    ],
    learnings:
      "My first model leaked the answer through short sessions. Catching and fixing that taught me to judge a model the way it would actually be used.",
    quote: "Check the tracking before you trust the funnel.",
    thumbnail: null,
    gallery: [
      { src: "/images/projects/funnel-intelligence/funnel.webp", alt: "Funnel chart of step-to-step conversion rates", width: 1292, height: 641, caption: "The funnel, step by step" },
      { src: "/images/projects/funnel-intelligence/segment-gaps.webp", alt: "Chart of conversion gaps between visitor segments", width: 1556, height: 1045, caption: "Where segments differ" },
      { src: "/images/projects/funnel-intelligence/model-deciles.webp", alt: "Chart of buyers captured by model score decile", width: 1214, height: 673, caption: "Buyers by model score decile" },
      { src: "/images/projects/funnel-intelligence/backlog.webp", alt: "Prioritised backlog of fixes with monthly value and 90% range", width: 1600, height: 891, caption: "Fixes ranked by money" },
    ],
    videoUrl: null,
    githubUrl: `${GITHUB}/ga4-funnel-intelligence`,
    liveDemoUrl: null,
    featured: true,
    year: "2026",
    status: "verified",
    caseStudy: {
      label: "Case study 01",
      title: "Funnel Intelligence: from \"where do shoppers drop out?\" to \"what do we fix first?\"",
      tagline:
        "Three months of real GA4 data from the Google Merchandise Store, worked through in three layers: diagnose the leak, predict who will buy, and decide which fix pays back first.",
      facts: [
        { label: "Domain", value: "E-commerce · Product analytics" },
        { label: "Role", value: "Solo project, end to end" },
        { label: "Data", value: "4.3M GA4 events, 360K sessions (Nov 2020 to Jan 2021)" },
        { label: "Stack", value: "BigQuery SQL · Python · scikit-learn · pytest" },
      ],
      stepsTitle: "How the project is built",
      steps: [
        { title: "Tracking audit", text: "Check the events can be trusted before building any funnel" },
        { title: "Diagnose", text: "Step rates, segment tests with Holm correction, weak product pages" },
        { title: "Predict", text: "Purchase model scored at the 5th click, tested on an unseen month" },
        { title: "Decide", text: "Fixes sized in money with 20,000 simulations, plus an A/B test plan" },
      ],
      sections: [
        {
          heading: "The problem",
          paragraphs: [
            "Most funnel analyses stop at a chart that shows people leaving. The harder questions come after it: is the drop real or a tracking bug, which segment is leaking, can we spot buyers early enough to help them, which fix pays back first, and how long would a test need to run before anyone believes the result. I answered all of them on Google's public GA4 BigQuery sample.",
          ],
        },
        {
          heading: "Checking the data first",
          paragraphs: [
            "41.3% of purchase sessions had no add_to_cart event, which a real journey cannot skip. A strict step-by-step funnel would have thrown away 41% of real buyers, so every step rate in the project is computed only from sessions that reached both steps.",
          ],
          code: {
            language: "sql",
            code: `-- Purchase sessions that never fired add_to_cart (tracking audit)
WITH sessions AS (
  SELECT
    user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id,
    LOGICAL_OR(event_name = 'add_to_cart') AS has_cart,
    LOGICAL_OR(event_name = 'purchase') AS has_purchase
  FROM \`bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*\`
  GROUP BY 1, 2
)
SELECT
  COUNTIF(has_purchase) AS purchase_sessions,
  ROUND(COUNTIF(has_purchase AND NOT has_cart) / COUNTIF(has_purchase), 3) AS share_missing_cart
FROM sessions;`,
          },
        },
        {
          heading: "What the data says",
          paragraphs: [
            "1.35% of 360,129 sessions end in a purchase. The steepest step is view item to add to cart: only 19.7% get through.",
            "New visitors lose at checkout: 29.8% complete checkout against 59.7% for everyone else (Holm-adjusted p < 0.001). Part of this is delayed buying, since only 50% of buyers order in their first session.",
            "95 product pages lose shoppers far more than the rest of their category.",
            "Buyers are visible early: scored at the 5th interaction, the model reaches ROC-AUC 0.76 on January, a month it never saw. The top 10% of sessions hold 43% of buyers (4.3x the average), and the model beats a hand-written rule by 2.3x on PR-AUC.",
          ],
          table: {
            caption: "Fix list, ranked by money",
            columns: ["Fix", "Worth per month", "90% range", "What to test"],
            rows: [
              ["New-visitor checkout", "$18,704", "$17,517 to $19,930", "Show shipping cost early, guest checkout, saved carts. About 14 days to prove."],
              ["Checkout after landing on Home", "$9,049", "$7,705 to $10,442", "Wallet payments, address autofill, fewer required fields"],
              ["95 weak product pages", "$5,236", "$5,097 to $5,377", "Photos, price, stock and size info, page by page"],
            ],
          },
        },
        {
          heading: "What I learned",
          paragraphs: [
            "A leakage bug, caught and fixed: my first model looked too good because short sessions leaked the answer. The fix and the reasoning are written up in the project's decisions log.",
            "Revenue is a range, not a hopeful number: every opportunity is sized from 20,000 draws, and the assumptions sit in one config file where they can be argued with.",
            "Tested end to end: the SQL is checked against a simulated GA4 export with problems planted on purpose.",
          ],
        },
      ],
    },
  },
  {
    id: "customer-value-engine",
    slug: "customer-value-engine",
    title: "Customer Value Engine: CLV and Retention Budgeting",
    category: "Data Science",
    summary: "Who comes back, what they are worth over 26 weeks, and where a retention budget should go.",
    problem:
      "A UK online wholesaler with 1M+ invoice lines and 5,839 customers needs to know which customers return, what each is worth, and how much retention spend actually pays back.",
    objective: null,
    approach: [
      "Matched cancellations to the orders they reverse.",
      "Measured retention with cohorts and Kaplan-Meier.",
      "Wrote BG/NBD and Gamma-Gamma from the papers on a seasonal clock, backtested in both halves of the year.",
      "Optimised a £50,000 budget across 2,000 assumption scenarios.",
    ],
    technologies: ["Python", "pandas", "NumPy", "SciPy", "BG/NBD", "Gamma-Gamma", "Power BI", "DAX", "pytest"],
    kpis: [
      { value: "4.7%", label: "Accounts driving half of revenue" },
      { value: "60%+", label: "Revenue held by top 10% predicted" },
      { value: "£6.3K", label: "Of a £50K budget that pays back" },
    ],
    insights: [
      "273 accounts carry half the revenue.",
      "An apparent halving of new customers was a counting artefact (2,094 vs 2,155 like for like).",
      "Customers found in autumn are Christmas buyers.",
    ],
    results: [
      "Only the first £6,315 of a £50,000 budget earns its keep, bringing back about £18,756 of margin from 394 accounts. Spending all of it turns a gain into a loss.",
      "Delivered as a Power BI report on a star-schema data model with 35 DAX measures.",
    ],
    learnings:
      "The model missed by +51% in the quiet season. Reporting that miss, explaining it and planning on the low end is more useful than hiding it.",
    quote: "Sometimes the right answer is to spend less.",
    thumbnail: null,
    gallery: [
      { src: "/images/projects/customer-value-engine/report-overview.webp", alt: "Power BI overview page with revenue, customers and forecast", width: 1522, height: 880, caption: "Power BI report: overview" },
      { src: "/images/projects/customer-value-engine/report-budget-plan.webp", alt: "Power BI budget plan page", width: 1522, height: 880, caption: "Power BI report: budget plan" },
      { src: "/images/projects/customer-value-engine/concentration.webp", alt: "Chart of revenue concentration across customers", width: 1109, height: 823, caption: "Revenue concentration" },
      { src: "/images/projects/customer-value-engine/budget-curve.webp", alt: "Chart of margin returned as retention spend increases", width: 1262, height: 724, caption: "Where spend stops paying back" },
    ],
    videoUrl: null,
    githubUrl: `${GITHUB}/customer-value-engine`,
    liveDemoUrl: null,
    featured: true,
    year: "2026",
    status: "verified",
    caseStudy: null,
  },
  {
    id: "review-intelligence",
    slug: "review-intelligence",
    title: "Review Intelligence: LLM Complaint Classification",
    category: "AI Applications",
    summary:
      "What customers actually complain about, how often a free local LLM gets it right, and which complaints cost the most.",
    problem:
      "An ecommerce marketplace has tens of thousands of written reviews but no structured view of what goes wrong, how often, and what it costs.",
    objective: null,
    approach: [
      "Ran an open 7B model locally through Ollama with answers forced into a fixed JSON schema of 12 themes.",
      "Wrote labelling rules and tuned the prompt on a dev set.",
      "Linked every theme to order value, rating and repeat purchase.",
    ],
    technologies: ["Python", "Ollama", "Qwen 2.5 7B", "pandas", "NLP", "Model evaluation", "pytest"],
    kpis: [
      { value: "40,950", label: "Reviews classified" },
      { value: "0.81", label: "Micro F1 after prompt rules" },
      { value: "37% vs 4%", label: "Late tags matching late orders" },
    ],
    insights: [
      "41% of written reviews contain a complaint.",
      "Not delivered is the biggest theme (4,597 reviews).",
      "The worst 10% of sellers draw complaints on 67% of their reviews against 39% for the rest.",
    ],
    results: [
      "A fix list ranked by money at stake, led by undelivered parcels on R$730K of orders, then missing items and seller support.",
      "Micro F1 raised from 0.78 to 0.81 with explicit labelling rules.",
    ],
    learnings:
      "Validating the classifier against delivery records gave independent evidence without any labels: late tags matched late orders 37% of the time vs 4%.",
    quote: "Measure how often the model is right before using any of its answers.",
    thumbnail: null,
    gallery: [
      { src: "/images/projects/review-intelligence/themes.webp", alt: "Chart of complaint themes by number of reviews", width: 1419, height: 693, caption: "Complaint themes" },
      { src: "/images/projects/review-intelligence/delivery-check.webp", alt: "Chart comparing late tags with delivery records", width: 1174, height: 416, caption: "Checked against delivery records" },
      { src: "/images/projects/review-intelligence/fix-list.webp", alt: "Fix list ranked by order value at stake", width: 1245, height: 601, caption: "Fix list by money at stake" },
    ],
    videoUrl: null,
    githubUrl: `${GITHUB}/review-intelligence`,
    liveDemoUrl: null,
    featured: true,
    year: "2026",
    status: "verified",
    caseStudy: null,
  },
  {
    id: "taxbridge-ai",
    slug: "taxbridge-ai",
    title: "TaxBridge AI: Pre-ITR Workflow MVP",
    category: "Software Engineering",
    summary:
      "A pre-filing workflow for CA firms: collect Form 16, AIS and Form 26AS, flag mismatches, and produce a filing-readiness report.",
    problem:
      "Before ITR season, a CA firm collects documents from many salaried clients and checks by hand that Form 16, AIS and Form 26AS agree. A mismatch caught late means rework for the firm and the client.",
    objective: null,
    approach: [
      "Built a CA workspace with client records (PAN, assessment year) and login-free upload links for clients.",
      "Wrote parsers for Form 16 (pdfplumber) and for AIS and 26AS files.",
      "Added a mismatch and risk engine, a readiness score, a clarification checklist and a downloadable PDF report.",
    ],
    technologies: ["Python", "FastAPI", "SQLAlchemy", "pdfplumber", "ReportLab", "cryptography (Fernet)", "pytest", "Docker"],
    kpis: [
      { value: "3", label: "Tax documents cross-checked" },
      { value: "PDF", label: "Filing-readiness report" },
      { value: "Encrypted", label: "Client file storage" },
    ],
    insights: [
      "The scope deliberately leaves out direct filing, portal scraping and tax advice.",
      "The narrow wedge is the cross-document check that firms still do by hand.",
    ],
    results: ["A working MVP with demo data, encrypted file storage with SHA-256 hashes, an audit log and automated tests."],
    learnings:
      "For tax figures, deterministic rules with an audit trail are easier for an accountant to trust than a model that might guess a number.",
    quote: "Narrow on purpose: the mismatch check, not the whole filing.",
    thumbnail: null,
    gallery: [],
    videoUrl: null,
    githubUrl: `${GITHUB}/taxbridge-ai`,
    liveDemoUrl: null,
    featured: true,
    year: null,
    status: "verified",
    caseStudy: {
      label: "Case study 04",
      title: "TaxBridge AI: A Pre-ITR Mismatch Checker for CA Firms",
      tagline:
        "An MVP that collects Form 16, AIS and Form 26AS from clients, checks them against each other, and tells the CA what to fix before filing.",
      facts: [
        { label: "Type", value: "Side project, working MVP" },
        { label: "Users", value: "CA firms and their salaried clients" },
        { label: "Scope", value: "Pre-filing checks, not filing" },
        { label: "Stack", value: "FastAPI · SQLAlchemy · pdfplumber · ReportLab" },
      ],
      stepsTitle: "How a client file moves through TaxBridge",
      steps: [
        { title: "Invite", text: "CA creates the client (PAN, assessment year) and shares a login-free upload link" },
        { title: "Upload", text: "Form 16, AIS, 26AS, salary slips and proofs, stored encrypted with SHA-256 hashes" },
        { title: "Parse", text: "pdfplumber for Form 16, CSV, JSON and PDF text for AIS and 26AS" },
        { title: "Check", text: "Mismatch rules, readiness score, checklist and PDF report" },
      ],
      sections: [
        {
          heading: "The problem",
          paragraphs: [
            "Before ITR season, a CA firm collects documents from many salaried clients and checks by hand that Form 16, AIS and Form 26AS tell the same story. When TDS or salary figures disagree and nobody notices, the return goes in wrong and the work has to be redone.",
          ],
        },
        {
          heading: "The checks",
          paragraphs: [
            "The engine is rule based on purpose. It flags missing documents, PAN mismatches, TDS differences between Form 16 and Form 26AS or AIS above ₹100, salary differences above 1% or ₹1,000, multiple employers, non-salary income and capital gains in AIS, old-regime deductions on a new-regime Form 16, and income that may exceed the ITR-1 limit.",
            "Each finding has a severity, and the readiness score starts at 100 and drops with each one, so a CA can see at a glance which client files are ready.",
          ],
          code: {
            language: "python",
            code: `# app/services/mismatch_engine.py (excerpt)
if form16_tds and f26_tds and abs(form16_tds - f26_tds) > THRESHOLD_RUPEES:
    delta = form16_tds - f26_tds
    findings.append(FindingDraft(
        code="TDS_FORM16_26AS_MISMATCH",
        severity="high",
        title="TDS in Form 16 does not match Form 26AS",
        source="Form 16 vs Form 26AS",
        amount_delta=delta,
    ))`,
          },
        },
        {
          heading: "What it deliberately leaves out",
          paragraphs: [
            "It does not file returns, scrape government portals, submit AIS feedback or give tax advice. Keeping the scope to the cross-document check made the MVP small enough to build properly and test.",
          ],
          table: {
            caption: "What works today",
            columns: ["Part", "Detail"],
            rows: [
              ["CA workspace", "Login, dashboard with client statuses, client records"],
              ["Client intake", "Secure invite links, encrypted storage, audit log"],
              ["Checks", "Mismatch and risk rules, readiness score, clarification checklist"],
              ["Output", "Downloadable PDF filing-readiness report"],
              ["Quality", "Seed demo data and pytest tests"],
            ],
          },
        },
        {
          heading: "What I took from it",
          paragraphs: [
            "For tax figures, a deterministic rule with a clear message is easier for an accountant to trust than a model that might guess a number. The code is on GitHub.",
          ],
        },
      ],
    },
  },
  {
    id: "algoquest-ai",
    slug: "algoquest-ai",
    title: "AlgoQuest AI: DSA Learning Workspace",
    category: "Web Development",
    summary:
      "A Duolingo-style platform for learning data structures and algorithms through a skill tree of missions.",
    problem:
      "DSA practice platforms can feel like a long, flat list of problems, which makes it hard for learners to see progress and stay with it.",
    objective: null,
    approach: [
      "Built a skill tree where missions unlock in order, a Monaco code workspace, topic mastery tracking, gamification and a leaderboard.",
      "Put code execution and the AI tutor behind provider abstractions so either can be swapped.",
    ],
    technologies: ["Next.js (App Router)", "TypeScript", "Prisma ORM", "PostgreSQL", "Monaco Editor", "Tailwind CSS", "Vitest"],
    kpis: [
      { value: "Skill tree", label: "Guided mission progression" },
      { value: "Monaco", label: "In-browser code workspace" },
      { value: "Vitest", label: "Tests on unlocks, mastery, gamification" },
    ],
    insights: ["Untrusted user code must never run on the web server, so execution goes through an external sandbox provider."],
    results: ["A full codebase with original mission content, seed data, admin tools, tests and deployment docs."],
    learnings: "Putting execution and the AI tutor behind interfaces kept the product testable with mock providers.",
    quote: "Practice feels lighter when progress is visible.",
    thumbnail: null,
    gallery: [],
    videoUrl: null,
    githubUrl: `${GITHUB}/algoquest-ai`,
    liveDemoUrl: null,
    featured: true,
    year: null,
    status: "verified",
    caseStudy: null,
  },
  {
    id: "job-tracker-extension",
    slug: "job-tracker-extension",
    title: "Job Tracker Chrome Extension",
    category: "Software Engineering",
    summary:
      "A browser extension that logs job applications automatically when you click Apply on 10+ Indian and global job portals.",
    problem:
      "Applying across Naukri, LinkedIn, Indeed and other portals makes it easy to lose track of where you applied and what happened next.",
    objective: null,
    approach: [
      "A Chrome extension that detects Apply clicks, reads the company and role from the page, and saves the entry in local browser storage.",
      "A popup ledger, status tracking and a manual log for mobile applications.",
    ],
    technologies: ["JavaScript", "Chrome Extension API", "DOM parsing", "HTML", "CSS"],
    kpis: [
      { value: "10+", label: "Job portals auto-tracked" },
      { value: "5", label: "Status stages, applied to offer" },
      { value: "Local", label: "Data stays in your browser" },
    ],
    insights: ["Portals change their page structure often, so every entry can be edited and there is always a manual fallback."],
    results: [
      "Tracks Naukri, Monster, Indeed, LinkedIn, Shine, Foundit, Instahyre, TimesJobs, Glassdoor, Wellfound, Internshala, Hirist and IIMJobs, skips same-day duplicates, and shows a response rate.",
    ],
    learnings: "A tool that fails quietly is worse than one that tells you to log by hand.",
    quote: "Solving my own job-search pain with a small tool.",
    thumbnail: null,
    gallery: [],
    videoUrl: null,
    githubUrl: `${GITHUB}/job-tracker-extension`,
    liveDemoUrl: null,
    featured: false,
    year: null,
    status: "verified",
    caseStudy: null,
  },
  {
    id: "iris-waves-reporting",
    slug: "iris-waves-reporting",
    title: "Iris Waves: Reporting Leadership Could Trust",
    category: "Business Intelligence",
    summary:
      "4 Power BI dashboards for leadership, Excel data moved into SQL with validation checks, a 15% segment decline found, and a 1,300+ PC rollout tracked.",
    problem: "At Iris Waves, reporting lived in Excel files from 5+ sources with no shared checks.",
    objective: null,
    approach: [
      "4 Power BI dashboards for 3 leadership stakeholders.",
      "Excel datasets moved into a SQL database with validation checks.",
      "Segment-level variance analysis.",
      "Exception tracking for a 1,300+ PC rollout.",
    ],
    technologies: ["Power BI", "DAX", "SQL", "Excel"],
    kpis: [
      { value: "15%", label: "Segment decline found" },
      { value: "98%", label: "On-time delivery, 1,300+ PCs" },
      { value: "~30%", label: "Fewer reporting errors" },
    ],
    insights: ["Found a 15% revenue decline in one product segment that the overall revenue figure hid."],
    results: ["Reporting errors down ~30%.", "98% on-time delivery for a 1,300+ PC rollout, with 40+ delivery risks flagged early."],
    learnings: "Checking the data before building the dashboard saved more time than any chart did.",
    quote: "Messy company data, turned into decisions people act on.",
    thumbnail: null,
    gallery: [],
    videoUrl: null,
    githubUrl: null,
    liveDemoUrl: null,
    featured: false,
    year: "2025 – 2026",
    status: "verified",
    caseStudy: {
      label: "Case study 02",
      title: "Iris Waves: Reporting Leadership Could Trust, and a 15% Segment Decline",
      tagline:
        "Four Power BI dashboards for leadership, company data moved from Excel into SQL with validation checks, and exception tracking for a 1,300+ PC rollout.",
      facts: [
        { label: "Organization", value: "Iris Waves, Delhi" },
        { label: "Role", value: "Sales Excellence Executive (Data & Analytics)" },
        { label: "Period", value: "Dec 2025 – Jun 2026" },
        { label: "Stack", value: "Power BI · DAX · SQL · Excel" },
      ],
      stepsTitle: "How the reporting was rebuilt",
      steps: [
        { title: "Collect", text: "Excel datasets from 5+ sources" },
        { title: "Move to SQL", text: "One SQL database instead of scattered files" },
        { title: "Validate", text: "Checks across sources before data reaches a report" },
        { title: "Report", text: "4 Power BI dashboards for 3 leadership stakeholders" },
      ],
      sections: [
        {
          heading: "The starting point",
          paragraphs: [
            "Company reporting lived in Excel files that came from 5+ different sources. The same figure could differ from one file to the next, and nothing checked the data before it reached a report, so leadership reviews spent time arguing about numbers instead of acting on them.",
          ],
        },
        {
          heading: "The dashboards",
          paragraphs: [
            "I built 4 Power BI dashboards on machine base, client allocation and 3-year revenue per machine for 3 leadership stakeholders. The brief asked for totals; I added KPIs at state, area and national level so each leader could see their own slice without asking for a new report.",
            "Behind them, I moved the Excel-based company datasets into a SQL database and designed validation checks across the 5+ sources. That cut reporting errors by about 30%.",
          ],
        },
        {
          heading: "Finding the 15% decline",
          paragraphs: [
            "Overall revenue hid a problem. Segment-level variance analysis showed a 15% revenue decline in one product segment, which led to a targeted recovery plan for that segment.",
          ],
        },
        {
          heading: "The 1,300+ PC rollout",
          paragraphs: [
            "I ran exception tracking for a 1,300+ PC rollout, surfacing 40+ delivery risks early so they could be fixed before they caused delays. The rollout reached 98% on-time delivery.",
          ],
          table: {
            caption: "Results",
            columns: ["Area", "What I did", "Result"],
            rows: [
              ["Leadership reporting", "4 Power BI dashboards with state, area and national KPIs", "Used by 3 leadership stakeholders"],
              ["Data quality", "Excel to SQL, validation checks across 5+ sources", "~30% fewer reporting errors"],
              ["Revenue analysis", "Segment-level variance analysis", "15% segment decline found"],
              ["PC rollout", "Exception tracking on 1,300+ PCs", "40+ risks flagged early, 98% on time"],
            ],
          },
        },
        {
          heading: "What I took from it",
          paragraphs: [
            "The dashboards were the visible part, but the validation checks underneath are what made people trust them. Company data stays confidential, so this page describes the work without sharing it.",
          ],
        },
      ],
    },
  },
  {
    id: "ubixe-subscriber-segmentation",
    slug: "ubixe-subscriber-segmentation",
    title: "Ubixe Infotech: Subscriber Segmentation",
    category: "Machine Learning",
    summary:
      "SQL and Python segmentation of 2K+ broadband subscribers, logistic regression and K-means to find high-value and at-risk groups, and campaigns that moved customers to longer plans.",
    problem:
      "At Ubixe Infotech, a residential broadband provider had a subscriber base it could not yet segment by value or risk.",
    objective: null,
    approach: [
      "SQL and Python segmentation of 2K+ subscribers.",
      "Logistic regression and K-means to find high-value and at-risk segments.",
      "Campaign dashboards in Power BI.",
    ],
    technologies: ["SQL", "Python", "pandas", "scikit-learn", "K-means", "Logistic regression", "Power BI"],
    kpis: [
      { value: "+15%", label: "Sales growth" },
      { value: "12%", label: "Fewer churn-related inquiries" },
      { value: "~6 h → <1 h", label: "Weekly data prep" },
    ],
    insights: ["The biggest sales lever was moving monthly subscribers to quarterly and yearly plans."],
    results: ["Sales up 15% and churn-related inquiries down 12%.", "Weekly data cleaning automated in Python, from about 6 hours to under 1 hour per cycle."],
    learnings:
      "The most useful output was not the model score but the plain answer it led to: which customers to offer a longer plan first.",
    quote: null,
    thumbnail: null,
    gallery: [],
    videoUrl: null,
    githubUrl: null,
    liveDemoUrl: null,
    featured: false,
    year: "2023 – 2024",
    status: "verified",
    caseStudy: {
      label: "Case study 03",
      title: "Ubixe Infotech: Segmenting 2K+ Broadband Subscribers to Grow Sales 15%",
      tagline:
        "SQL and Python analysis of a residential broadband provider's subscribers, models to find high-value and at-risk segments, and campaigns that moved customers to longer plans.",
      facts: [
        { label: "Organization", value: "Ubixe Infotech Pvt. Ltd., Gurgaon (remote)" },
        { label: "Role", value: "Business Analyst" },
        { label: "Period", value: "Jan 2023 – Dec 2024" },
        { label: "Stack", value: "SQL · Python · scikit-learn · Power BI" },
      ],
      stepsTitle: "From subscriber data to campaigns",
      steps: [
        { title: "Query", text: "SQL on the subscriber database" },
        { title: "Segment", text: "2K+ customers by plan, spend, payment behaviour, tenure" },
        { title: "Model", text: "Logistic regression and K-means" },
        { title: "Act", text: "Campaigns tracked in Power BI" },
      ],
      sections: [
        {
          heading: "The business",
          paragraphs: [
            "Ubixe's client is a broadband provider serving housing societies. Most subscribers paid month to month, and the team had no clear view of which customers were most valuable, which were likely to leave, or who would move to a longer plan.",
          ],
        },
        {
          heading: "Segmenting the customers",
          paragraphs: [
            "Using SQL and Python (pandas), I segmented 2K+ customers by plan, spending, payment behaviour and tenure. I then used logistic regression and K-means to find the high-value segments and the segments at risk of leaving.",
          ],
        },
        {
          heading: "What the campaigns did",
          paragraphs: [
            "The segments shaped the campaigns. The biggest lever was moving monthly subscribers to quarterly and yearly plans, along with winning new customers inside the same housing societies. The campaigns grew sales by 15% and cut churn-related inquiries by 12%.",
            "Marketing planned and tracked these campaigns on Power BI dashboards I built around subscription lifecycle and payment behaviour.",
          ],
        },
        {
          heading: "Saving analyst time",
          paragraphs: [
            "Weekly data cleaning was manual. I automated it in Python, taking it from about 6 hours to under 1 hour per cycle. I also delivered 40+ weekly and monthly reports to senior management as one-page summaries with clear actions.",
          ],
          table: {
            caption: "Results",
            columns: ["Area", "What I did", "Result"],
            rows: [
              ["Sales", "Segment-led campaigns to move customers to longer plans", "+15% sales"],
              ["Retention", "At-risk segments targeted early", "12% fewer churn-related inquiries"],
              ["Data prep", "Weekly cleaning automated in Python", "~6 hours to under 1 hour per cycle"],
              ["Reporting", "One-page summaries for senior management", "40+ reports delivered"],
            ],
          },
        },
        {
          heading: "What I took from it",
          paragraphs: [
            "The most useful output was not the model score but the plain answer it led to: which customers to offer a longer plan first. Client data stays confidential, so this page describes the work without sharing it.",
          ],
        },
      ],
    },
  },
  {
    id: "interactive-3d-portfolio-world",
    slug: "interactive-3d-portfolio-world",
    title: "The Interactive 3D Portfolio World",
    category: "Web Development",
    summary:
      "This website: a drivable futuristic city where every district is a section of the portfolio, built with Next.js and React Three Fiber.",
    problem: "Conventional portfolios list work; they rarely show how someone thinks about systems, data and experience together.",
    objective: "Make the portfolio itself the demonstration: a navigable world that stays fast, accessible and easy to maintain.",
    approach: [
      "Procedurally generated city from one typed layout module that also drives physics, the map and route finding.",
      "Arcade vehicle model on a fixed 120 Hz timestep, so handling is identical at any frame rate.",
      "The car is modelled in code from the reference sheet: a lofted body, wheels, lights and a cockpit.",
      "Every portfolio section is also a normal web page, so nothing depends on driving.",
    ],
    technologies: ["Next.js", "TypeScript", "React Three Fiber", "Three.js", "Zustand", "Tailwind CSS"],
    kpis: [],
    insights: [],
    results: [
      "All content is driven by typed data files.",
      "Three quality profiles that change real renderer settings.",
      "Unit, component and end-to-end test suites.",
    ],
    learnings: null,
    quote: null,
    thumbnail: null,
    gallery: [],
    videoUrl: null,
    githubUrl: null,
    liveDemoUrl: "/",
    featured: false,
    year: "2026",
    status: "verified",
    caseStudy: null,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug);
}

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function caseStudies(): Project[] {
  return projects.filter((p) => p.caseStudy !== null);
}

export function searchProjects(query: string, category: ProjectCategory | "All", caseStudiesOnly = false): Project[] {
  const q = query.trim().toLowerCase();
  return projects.filter((p) => {
    if (caseStudiesOnly && !p.caseStudy) return false;
    if (category !== "All" && p.category !== category) return false;
    if (!q) return true;
    return [p.title, p.summary, p.category, ...p.technologies].some((s) => s.toLowerCase().includes(q));
  });
}
