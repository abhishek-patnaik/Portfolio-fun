import type { Article } from "@/types/portfolio";

/**
 * Articles, imported from the blog on abhishekpatnaik.in (October 2026).
 *
 * Paragraph and list text supports two inline marks, rendered by ArticleView:
 * **bold** and [label](https://url).
 *
 * `cover` is null, so each article shows a generated cover. To use the original
 * artwork, copy the image into /public/images/blog/ and set `cover` to its path;
 * the original file name is noted beside each entry.
 */
export const articles: Article[] = [
  {
    id: "post-8",
    slug: "sometimes-the-right-answer-is-to-spend-less",
    title: "Sometimes the Right Answer Is to Spend Less",
    author: "Abhishek Patnaik",
    date: "2026-10-08",
    category: "Customer Value",
    cover: null, // original: blog_spend_less.webp
    coverSeed: 8,
    summary:
      "I built a lifetime value model for a UK wholesaler and asked where a £50,000 retention budget should go. The honest answer was: mostly nowhere.",
    takeaways: [
      "Revenue is usually carried by a small group of customers. Find them first.",
      "Check how a trend was counted before you believe it.",
      "Stop spending where the next pound brings back less than a pound.",
    ],
    body: [
      {
        type: "p",
        text: "The Customer Value Engine started with a simple question. Which customers come back, what are they worth over the next six months, and where should a retention budget go?",
      },
      { type: "h2", text: "Half the revenue, 273 accounts" },
      {
        type: "p",
        text: "The data is two years of real transactions from a UK online wholesaler: over a million invoice lines and 5,839 customers. Half of all revenue came from 273 accounts, just 4.7% of customers. That shapes everything that follows.",
      },
      { type: "h2", text: "A scary trend that was not real" },
      {
        type: "p",
        text: "A plain count said new customers had almost halved, from 2,094 to 1,132. But the data only starts in December 2009, so in 2010 anyone returning after a long gap looked new. Counting both years the same way gave 2,094 and 2,155. No collapse. Just a counting problem.",
      },
      { type: "h2", text: "The model, and its miss" },
      {
        type: "p",
        text: "I wrote the BG/NBD and Gamma-Gamma models myself and ran them on a seasonal clock, since a week in November is worth about two weeks in January for this business. Backtested, the model was off by 5% in the busy half of the year and 51% in the quiet half. I kept that result in and planned on the low end of the range.",
      },
      { type: "h2", text: "The budget answer" },
      {
        type: "p",
        text: "Placing spend where each next pound earns the most margin, only the first £6,315 of the £50,000 pays back. That money, on 394 accounts, should bring back about £18,756 of margin. Spending the full budget turns a gain of £12,441 into a loss of £12,583.",
      },
      {
        type: "p",
        text: "It is not the answer people expect from a project called \"retention budgeting\". But telling a business to spend less, and showing exactly why, is one of the most useful things an analyst can do.",
      },
      {
        type: "p",
        text: "The code and the Power BI report are on [GitHub](https://github.com/abhishek-patnaik/customer-value-engine).",
      },
    ],
    tags: ["CLV & Budgeting", "Power BI", "Python"],
    references: [{ label: "Customer Value Engine on GitHub", url: "https://github.com/abhishek-patnaik/customer-value-engine" }],
    status: "verified",
  },
  {
    id: "post-7",
    slug: "check-the-tracking-before-you-trust-the-funnel",
    title: "Check the Tracking Before You Trust the Funnel",
    author: "Abhishek Patnaik",
    date: "2026-10-05",
    category: "Analytics & SQL",
    cover: null, // original: blog_ga4_audit.jpg
    coverSeed: 7,
    summary:
      "On Google's public GA4 sample, 41% of purchase sessions had no add to cart event. That one check changed every number that came after it.",
    takeaways: [
      "Audit the events before you build the funnel.",
      "Compute each step only from sessions that reached both steps.",
      "Size every fix as a range and attach the test that would prove it.",
    ],
    body: [
      {
        type: "p",
        text: "Funnel analysis looks simple. Count sessions at each step, divide, find the biggest drop. I did exactly that on three months of the Google Merchandise Store GA4 export in BigQuery, and the first answer was wrong.",
      },
      { type: "h2", text: "The data" },
      {
        type: "p",
        text: "November 2020 to January 2021: 4,295,584 events, 360,129 sessions, and 1.35% of sessions ending in a purchase.",
      },
      { type: "h2", text: "The hole" },
      {
        type: "p",
        text: "41.3% of purchase sessions had no add_to_cart event. A real shopper cannot buy without adding to cart, so this is missing tracking, not a shortcut. A strict step by step funnel would have thrown those buyers away and made the cart step look far worse than it is.",
      },
      { type: "p", text: "So every step rate in the project is computed only from sessions that reached both steps." },
      { type: "h2", text: "Where it really leaks" },
      {
        type: "p",
        text: "The steepest step is view item to add to cart: only 19.7% get through. The biggest fixable gap is at checkout, where new visitors complete it 29.8% of the time against 59.7% for everyone else. Part of that is people buying later rather than not at all, since only half of buyers order in their first session.",
      },
      { type: "h2", text: "Spotting buyers early" },
      {
        type: "p",
        text: "A model scored at a visitor's fifth interaction, tuned on December and tested on January, reached ROC-AUC 0.76. My first version looked much better than that, which was the clue that something was wrong. Very short sessions were leaking the answer. Fixing it made the number lower and honest.",
      },
      { type: "h2", text: "What to fix first" },
      {
        type: "p",
        text: "Using 20,000 simulations, new visitor checkout came out first at about $18,704 a month, with a 90% range of $17,517 to $19,930. An A/B test would need about 14 days to confirm it.",
      },
      {
        type: "p",
        text: "The full project is on [GitHub](https://github.com/abhishek-patnaik/ga4-funnel-intelligence).",
      },
    ],
    tags: ["Google BigQuery", "GA4", "SQL"],
    references: [{ label: "Funnel Intelligence on GitHub", url: "https://github.com/abhishek-patnaik/ga4-funnel-intelligence" }],
    status: "verified",
  },
  {
    id: "post-6",
    slug: "reading-41000-reviews-with-a-free-model",
    title: "Reading 41,000 Reviews with a Free Model on My Own GPU",
    author: "Abhishek Patnaik",
    date: "2026-09-24",
    category: "AI & NLP",
    cover: null, // original: blog_local_llm.webp
    coverSeed: 6,
    summary:
      "I wanted to know what customers actually complain about, without paying for an API or sending their reviews anywhere. Here is what worked, and what I had to measure before I trusted it.",
    takeaways: [
      "A small open model is good enough for structured tagging if you constrain its answers.",
      "Write the labelling rules down before you judge the model.",
      "Check the model against data it never saw, like delivery records.",
    ],
    body: [
      {
        type: "p",
        text: "For my Review Intelligence project I took about 41,000 written reviews from Olist, a Brazilian marketplace, and tagged each one with the complaints it contained: not delivered, late, missing items, wrong item, damaged and so on. Twelve themes in total.",
      },
      { type: "h2", text: "Why a local model" },
      {
        type: "p",
        text: "I ran Qwen 2.5 7B on my own GPU through Ollama. It costs nothing to run, anyone can reproduce it, and no review text leaves the machine. The catch is that a small model makes mistakes, so measuring how often it is right became part of the project.",
      },
      { type: "h2", text: "Forcing a fixed format" },
      {
        type: "p",
        text: "The model can only answer with a JSON list drawn from the twelve theme names. Anything outside the list is dropped. This one decision removed most of the weird answers you get when you let a model reply freely.",
      },
      { type: "h2", text: "Rules before scores" },
      {
        type: "p",
        text: "My first labels showed that one line definitions leave a lot open. Is a customer still waiting after the deadline \"late\" or \"not delivered\"? Is \"ordered two, got one\" a missing item or a delivery problem? I wrote these rules into a labelling guide and put the same rules in the prompt. On a 150 review dev set, micro F1 went from 0.78 to 0.81 just from that.",
      },
      { type: "h2", text: "The check I like most" },
      {
        type: "p",
        text: "Olist has delivery records. For reviews the model tagged as late, the order really was delivered after the promised date 37% of the time, against 4% for reviews with no complaint. That needs no labels at all, which makes it a nice independent check.",
      },
      { type: "h2", text: "What came out of it" },
      {
        type: "p",
        text: "41% of written reviews contained a complaint. Not delivered was the biggest theme, with 4,597 reviews on about R$730,000 of orders. And the worst 10% of sellers drew complaints on 67% of their reviews against 39% for everyone else. That gives a business a short, ranked list of where to start.",
      },
      {
        type: "p",
        text: "The code is on [GitHub](https://github.com/abhishek-patnaik/review-intelligence). Next on my list is scoring the held out test set once, at the end, so the headline accuracy is not flattered by tuning.",
      },
    ],
    tags: ["Local LLMs", "Ollama", "Python"],
    references: [{ label: "Review Intelligence on GitHub", url: "https://github.com/abhishek-patnaik/review-intelligence" }],
    status: "verified",
  },
  {
    id: "post-5",
    slug: "before-you-build-a-churn-model",
    title: "Before You Build a Churn Model, Ask What You Will Do With It",
    author: "Abhishek Patnaik",
    date: "2026-09-09",
    category: "Customer Analytics",
    cover: null, // original: blog_churn_question.webp
    coverSeed: 5,
    summary:
      "At a broadband provider, the biggest win from segmenting customers was not predicting who would leave. It was finding who would happily move to a longer plan.",
    takeaways: [
      "A model is only useful if there is an action attached to each score.",
      "Look for the customers who are easy to help, not just the ones about to leave.",
      "Measure the campaign, not the model.",
    ],
    body: [
      {
        type: "p",
        text: "Churn models are one of the first things people learn in analytics, and one of the most misused. It is easy to build one, get a decent score, and then realise nobody knows what to do with the list.",
      },
      { type: "h2", text: "The setup" },
      {
        type: "p",
        text: "At Ubixe Infotech I worked on the subscriber data of a residential broadband provider that serves housing societies. A lot of subscribers paid month to month. The team wanted to reduce churn and grow sales.",
      },
      {
        type: "p",
        text: "I segmented around 2,000 customers by plan, spending, payment behaviour and tenure, and used logistic regression and K-means to find high value groups and groups at risk of leaving.",
      },
      { type: "h2", text: "What actually moved the numbers" },
      {
        type: "p",
        text: "The most useful output was not a ranked list of people about to cancel. It was a clear group of steady monthly payers who were good candidates for a quarterly or yearly plan. Offering them a longer plan was simple, cheap and welcome.",
      },
      {
        type: "p",
        text: "The campaigns built on these segments grew sales by 15%, mostly from that move to longer plans, plus new customers within the same societies. Churn related inquiries fell by 12%.",
      },
      { type: "h2", text: "Questions I ask now before modelling" },
      {
        type: "ul",
        items: [
          "If the model says a customer is high risk, what exactly will we do?",
          "Is there a group we can help more easily than the one we are worried about?",
          "How will we know the campaign worked, and not just the model?",
        ],
      },
      { type: "h2", text: "The lesson" },
      {
        type: "p",
        text: "A model that ranks customers well but leads to no action is a report nobody reads. Start from the actions the business can take, then build the analysis that tells you who to take them with.",
      },
    ],
    tags: ["Segmentation", "Churn", "Python"],
    references: [],
    status: "verified",
  },
  {
    id: "post-4",
    slug: "ai-can-write-the-query",
    title: "AI Can Write the Query. It Can't Tell You the Data Is Wrong.",
    author: "Abhishek Patnaik",
    date: "2026-08-27",
    category: "AI & Analytics",
    cover: null, // original: blog_ai_sql.webp
    coverSeed: 4,
    summary:
      "AI assistants now write decent SQL and build charts on request. That makes the part of the job they cannot do more valuable, not less.",
    takeaways: [
      "Writing the query was never the hard part of analysis.",
      "AI answers the question you asked, on the data you gave it, even if both are wrong.",
      "The analyst's job is to check the data and pick the right question.",
    ],
    body: [
      {
        type: "p",
        text: "Every BI tool and data warehouse now has some kind of AI assistant. You type a question, it writes the SQL, runs it and draws a chart. I use these tools, and they save time. But I keep seeing people talk as if this means analysts are done. I do not think so, and here is why.",
      },
      { type: "h2", text: "The query was never the hard part" },
      {
        type: "p",
        text: "If you have done this work for a while, you know that writing the SQL is maybe a fifth of the job. The rest is figuring out whether the data means what it seems to mean, and whether the question being asked is the one that matters.",
      },
      { type: "h2", text: "An example" },
      {
        type: "p",
        text: "Imagine an online store asks why so many people abandon after adding to cart. An assistant will happily calculate a funnel. But what if a chunk of purchases never fired an add to cart event in the first place, because of a tracking bug? The funnel will look broken in a place where nothing is broken, and the AI will explain the drop with total confidence.",
      },
      {
        type: "p",
        text: "A tool that answers the question you asked, on the data you gave it, cannot tell you the data has a hole in it. Someone has to go and look.",
      },
      { type: "h2", text: "What I think the job becomes" },
      {
        type: "ul",
        items: [
          "**Checking first.** Before any chart, ask whether the events, rows and totals make sense.",
          "**Choosing the question.** \"What is our conversion rate\" is easy. \"Which fix is worth the most money\" is the useful one.",
          "**Saying how sure we are.** A number with a range and a stated assumption is worth more than a confident single number.",
          "**Proving it.** Designing the test that shows whether the recommendation actually worked.",
        ],
      },
      { type: "h2", text: "How I use AI tools" },
      {
        type: "p",
        text: "I let them draft queries, boilerplate code and first versions of charts. Then I read every line, because I am the one who has to defend the number in the meeting. That is the part I want to get better at, and it is the part I do not see going away.",
      },
    ],
    tags: ["AI Tools", "SQL", "Analytics"],
    references: [],
    status: "verified",
  },
  {
    id: "post-3",
    slug: "india-dpdp-rules-read-by-an-analyst",
    title: "India's DPDP Rules, Read by an Analyst",
    author: "Abhishek Patnaik",
    date: "2026-08-11",
    category: "Data & Privacy",
    cover: null, // original: blog_dpdp.webp
    coverSeed: 3,
    summary:
      "The Digital Personal Data Protection Rules were notified in November 2025, with obligations phasing in over 18 months. Most write-ups are for lawyers. This one is about what changes for people who work with customer data every day.",
    takeaways: [
      "Collect less personal data, and know why you hold each field.",
      "Analysis rarely needs names and phone numbers. Use IDs.",
      "Deletion and retention need to be built into pipelines, not remembered.",
    ],
    body: [
      {
        type: "p",
        text: "A quick note first: I am not a lawyer, and this is not legal advice. I am a data analyst who has spent most of my career working with customer records, and I wanted to understand what India's new data protection rules mean for that work.",
      },
      { type: "h2", text: "The timeline in one paragraph" },
      {
        type: "p",
        text: "The Digital Personal Data Protection Act was passed in 2023. The Rules that make it workable were notified on 14 November 2025, with an 18 month phase in. Some parts, like the framework for consent managers, come in earlier. The bulk of the obligations on businesses apply from around May 2027. So right now companies are in the window where they are expected to get ready.",
      },
      { type: "h2", text: "What this means for analysts" },
      {
        type: "p",
        text: "**Purpose matters.** Personal data is meant to be used for the purpose the person agreed to. If a customer gave their number to get a broadband connection, that does not automatically make it fair game for every campaign idea. Analysts are often the ones who find new uses for old data, so this lands on us.",
      },
      {
        type: "p",
        text: "**Most analysis does not need identity.** When I segmented broadband subscribers by plan, spending, payment behaviour and tenure, none of that needed a name or a phone number. A customer ID was enough. The fewer personal fields that flow into your analysis tables, the less there is to protect.",
      },
      {
        type: "p",
        text: "**Deletion has to be a process.** If data must be erased when it is no longer needed, that cannot depend on someone remembering to clean a folder. It has to be a step in the pipeline, the same way cleaning is.",
      },
      {
        type: "p",
        text: "**Consent should be data too.** If a campaign list is built from customer data, there should be a field that says whether that customer agreed to be contacted for it. Filtering on that field should be as normal as filtering on city.",
      },
      { type: "h2", text: "A small checklist I would use" },
      {
        type: "ul",
        items: [
          "List every table with personal data and why it exists.",
          "Replace names, phones and emails with IDs in analysis tables.",
          "Keep a consent flag next to anything used for outreach.",
          "Decide how long each kind of data is kept, and automate the deletion.",
          "Know who to call if data leaks, before it happens.",
        ],
      },
      { type: "h2", text: "Why I think this is good news" },
      {
        type: "p",
        text: "Cleaner, smaller datasets with a clear purpose are easier to analyse anyway. Rules like these push teams towards habits good analysts should have had already.",
      },
    ],
    tags: ["DPDP Rules", "Privacy", "Data Governance"],
    references: [],
    status: "verified",
  },
  {
    id: "post-2",
    slug: "excel-is-not-the-problem",
    title: "Excel Is Not the Problem. Unchecked Excel Is.",
    author: "Abhishek Patnaik",
    date: "2026-07-22",
    category: "Data Quality",
    cover: null, // original: blog_excel_sql.webp
    coverSeed: 2,
    summary:
      "Moving reports from Excel to SQL is not about the tool. It is about having one place where you can check the data before anyone uses it.",
    takeaways: [
      "Excel is fine for exploring. It is risky as the only copy of the truth.",
      "Start with three checks: row counts, duplicates and totals that should match.",
      "Write down every check so the next person can run it without you.",
    ],
    body: [
      {
        type: "p",
        text: "People love to say Excel is the problem. I do not think it is. Excel is great for looking at data quickly, and most businesses in India still run on it. The problem is when five people each keep their own version of the same sheet and nobody checks whether they agree.",
      },
      { type: "h2", text: "What usually goes wrong" },
      {
        type: "ul",
        items: [
          "The same customer or machine appears twice with slightly different names.",
          "Someone pastes new rows below an old total and the total stops including them.",
          "Dates are stored as text in one file and as dates in another.",
          "A column gets renamed and a lookup silently returns blanks.",
        ],
      },
      {
        type: "p",
        text: "Each of these is small. Together they are why two people walk into a meeting with two different revenue numbers.",
      },
      { type: "h2", text: "Why SQL helps" },
      {
        type: "p",
        text: "Putting the data in a database does not fix it by magic. What it gives you is one place where checks can run every time, the same way. At my last job I moved Excel based datasets into SQL and wrote validation checks across more than five sources. Reporting errors dropped by about 30%. The database was not the clever part. The checks were.",
      },
      { type: "h2", text: "Three checks to start with" },
      {
        type: "p",
        text: "**Row counts.** If a source had 1,200 rows last week and 400 this week, stop and ask why before you report anything.",
      },
      { type: "p", text: "**Duplicates.** Count rows per ID. Anything above one needs a reason." },
      {
        type: "p",
        text: "**Totals that should match.** If billing says one number and sales says another for the same month, the report should show the gap, not pick one.",
      },
      { type: "h2", text: "Keep Excel where it is good" },
      {
        type: "p",
        text: "I still use Excel every week for quick pivots and for sharing small tables with people who do not want a dashboard. The rule I follow now is simple: Excel can be where you look at data, but it should not be the only place the data lives.",
      },
    ],
    tags: ["SQL & Excel", "Data Validation", "Reporting"],
    references: [],
    status: "verified",
  },
  {
    id: "post-1",
    slug: "what-six-months-of-sales-reporting-taught-me",
    title: "What Six Months of Sales Reporting Taught Me",
    author: "Abhishek Patnaik",
    date: "2026-07-06",
    category: "Career",
    cover: null, // original: blog_leaving_lessons.webp
    coverSeed: 1,
    summary:
      "I wrapped up my role at Iris Waves in June. Before the details fade, here are the lessons I want to carry into whatever comes next.",
    takeaways: [
      "Check the data before you build anything on top of it.",
      "A total that nobody owns hides problems. Split it by the person who has to act.",
      "Tracking exceptions early is boring work that saves the project.",
    ],
    body: [
      {
        type: "p",
        text: "My last day as Sales Excellence Executive at Iris Waves was in June. It was a short stint, December to June, but it was dense. I want to write down what I learned while it is still fresh, mostly for myself.",
      },
      { type: "h2", text: "1. The dashboard is the easy part" },
      {
        type: "p",
        text: "I built four Power BI dashboards for three people in leadership: machine base, client allocation and three year revenue per machine. Everyone sees the dashboards. Nobody sees the week before them, where I moved Excel files from more than five sources into a SQL database and wrote checks to catch the same figure showing up differently in two places.",
      },
      {
        type: "p",
        text: "That second part is what cut reporting errors by about 30%. Without it, the dashboards would have been pretty charts of wrong numbers, and people would have stopped opening them within a month.",
      },
      { type: "h2", text: "2. Ask who acts on a number" },
      {
        type: "p",
        text: "The brief asked for totals. I added state, area and national views because each person in that meeting owned a different slice. A national number is interesting. A number for your own area is something you can do something about.",
      },
      {
        type: "p",
        text: "The same habit found the most useful result of the job. Overall revenue looked fine. Broken down by segment, one product segment was down 15%. That turned into a recovery plan for that segment. If I had stopped at the total, nobody would have known.",
      },
      { type: "h2", text: "3. Exceptions are where projects go wrong" },
      {
        type: "p",
        text: "We had a rollout of more than 1,300 PCs. I kept a running list of everything that looked like it might slip, and it caught over 40 delivery risks before they turned into delays. We finished at 98% on time. None of that was clever analysis. It was keeping a list and chasing it every day.",
      },
      { type: "h2", text: "4. Write for the person reading on their phone" },
      {
        type: "p",
        text: "Most of the people I reported to read things between meetings. A one line headline that says what changed and what to do beats a perfect chart they have to zoom into.",
      },
      { type: "h2", text: "What I am taking forward" },
      {
        type: "p",
        text: "I want my next role to be closer to the analysis itself: SQL, Python, experiments, and a team that cares whether a number is right before it cares whether it looks good. In the meantime I am building projects that let me practise exactly that, and I will write about them here.",
      },
    ],
    tags: ["Career", "Power BI", "Reporting"],
    references: [],
    status: "verified",
  },
];

/** Removes the inline marks so text can be counted or searched as plain words. */
export function plainText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, "$1");
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug || a.id === slug);
}

export function articleCategories(): string[] {
  return Array.from(new Set(articles.map((a) => a.category)));
}

export function readingTime(article: Article): number {
  let words = 0;
  for (const block of article.body) {
    if (block.type === "ul") words += plainText(block.items.join(" ")).split(/\s+/).length;
    else if (block.type === "code") words += block.code.split(/\s+/).length;
    else words += plainText(block.text).split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 200));
}

export function relatedArticles(article: Article, limit = 2): Article[] {
  return articles
    .filter((a) => a.id !== article.id)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => article.tags.includes(t)).length + (a.category === article.category ? 1 : 0),
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.article);
}

export function searchArticles(query: string, category: string): Article[] {
  const q = query.trim().toLowerCase();
  return articles.filter((a) => {
    if (category !== "All" && a.category !== category) return false;
    if (!q) return true;
    return [a.title, a.summary, a.category, ...a.tags].some((s) => s.toLowerCase().includes(q));
  });
}
