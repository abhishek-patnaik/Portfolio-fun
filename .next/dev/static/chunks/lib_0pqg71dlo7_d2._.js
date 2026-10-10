(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/data/blog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "articleCategories",
    ()=>articleCategories,
    "articles",
    ()=>articles,
    "getArticle",
    ()=>getArticle,
    "plainText",
    ()=>plainText,
    "readingTime",
    ()=>readingTime,
    "relatedArticles",
    ()=>relatedArticles,
    "searchArticles",
    ()=>searchArticles
]);
const articles = [
    {
        id: "post-8",
        slug: "sometimes-the-right-answer-is-to-spend-less",
        title: "Sometimes the Right Answer Is to Spend Less",
        author: "Abhishek Patnaik",
        date: "2026-10-08",
        category: "Customer Value",
        cover: null,
        coverSeed: 8,
        summary: "I built a lifetime value model for a UK wholesaler and asked where a £50,000 retention budget should go. The honest answer was: mostly nowhere.",
        takeaways: [
            "Revenue is usually carried by a small group of customers. Find them first.",
            "Check how a trend was counted before you believe it.",
            "Stop spending where the next pound brings back less than a pound."
        ],
        body: [
            {
                type: "p",
                text: "The Customer Value Engine started with a simple question. Which customers come back, what are they worth over the next six months, and where should a retention budget go?"
            },
            {
                type: "h2",
                text: "Half the revenue, 273 accounts"
            },
            {
                type: "p",
                text: "The data is two years of real transactions from a UK online wholesaler: over a million invoice lines and 5,839 customers. Half of all revenue came from 273 accounts, just 4.7% of customers. That shapes everything that follows."
            },
            {
                type: "h2",
                text: "A scary trend that was not real"
            },
            {
                type: "p",
                text: "A plain count said new customers had almost halved, from 2,094 to 1,132. But the data only starts in December 2009, so in 2010 anyone returning after a long gap looked new. Counting both years the same way gave 2,094 and 2,155. No collapse. Just a counting problem."
            },
            {
                type: "h2",
                text: "The model, and its miss"
            },
            {
                type: "p",
                text: "I wrote the BG/NBD and Gamma-Gamma models myself and ran them on a seasonal clock, since a week in November is worth about two weeks in January for this business. Backtested, the model was off by 5% in the busy half of the year and 51% in the quiet half. I kept that result in and planned on the low end of the range."
            },
            {
                type: "h2",
                text: "The budget answer"
            },
            {
                type: "p",
                text: "Placing spend where each next pound earns the most margin, only the first £6,315 of the £50,000 pays back. That money, on 394 accounts, should bring back about £18,756 of margin. Spending the full budget turns a gain of £12,441 into a loss of £12,583."
            },
            {
                type: "p",
                text: "It is not the answer people expect from a project called \"retention budgeting\". But telling a business to spend less, and showing exactly why, is one of the most useful things an analyst can do."
            },
            {
                type: "p",
                text: "The code and the Power BI report are on [GitHub](https://github.com/abhishek-patnaik/customer-value-engine)."
            }
        ],
        tags: [
            "CLV & Budgeting",
            "Power BI",
            "Python"
        ],
        references: [
            {
                label: "Customer Value Engine on GitHub",
                url: "https://github.com/abhishek-patnaik/customer-value-engine"
            }
        ],
        status: "verified"
    },
    {
        id: "post-7",
        slug: "check-the-tracking-before-you-trust-the-funnel",
        title: "Check the Tracking Before You Trust the Funnel",
        author: "Abhishek Patnaik",
        date: "2026-10-05",
        category: "Analytics & SQL",
        cover: null,
        coverSeed: 7,
        summary: "On Google's public GA4 sample, 41% of purchase sessions had no add to cart event. That one check changed every number that came after it.",
        takeaways: [
            "Audit the events before you build the funnel.",
            "Compute each step only from sessions that reached both steps.",
            "Size every fix as a range and attach the test that would prove it."
        ],
        body: [
            {
                type: "p",
                text: "Funnel analysis looks simple. Count sessions at each step, divide, find the biggest drop. I did exactly that on three months of the Google Merchandise Store GA4 export in BigQuery, and the first answer was wrong."
            },
            {
                type: "h2",
                text: "The data"
            },
            {
                type: "p",
                text: "November 2020 to January 2021: 4,295,584 events, 360,129 sessions, and 1.35% of sessions ending in a purchase."
            },
            {
                type: "h2",
                text: "The hole"
            },
            {
                type: "p",
                text: "41.3% of purchase sessions had no add_to_cart event. A real shopper cannot buy without adding to cart, so this is missing tracking, not a shortcut. A strict step by step funnel would have thrown those buyers away and made the cart step look far worse than it is."
            },
            {
                type: "p",
                text: "So every step rate in the project is computed only from sessions that reached both steps."
            },
            {
                type: "h2",
                text: "Where it really leaks"
            },
            {
                type: "p",
                text: "The steepest step is view item to add to cart: only 19.7% get through. The biggest fixable gap is at checkout, where new visitors complete it 29.8% of the time against 59.7% for everyone else. Part of that is people buying later rather than not at all, since only half of buyers order in their first session."
            },
            {
                type: "h2",
                text: "Spotting buyers early"
            },
            {
                type: "p",
                text: "A model scored at a visitor's fifth interaction, tuned on December and tested on January, reached ROC-AUC 0.76. My first version looked much better than that, which was the clue that something was wrong. Very short sessions were leaking the answer. Fixing it made the number lower and honest."
            },
            {
                type: "h2",
                text: "What to fix first"
            },
            {
                type: "p",
                text: "Using 20,000 simulations, new visitor checkout came out first at about $18,704 a month, with a 90% range of $17,517 to $19,930. An A/B test would need about 14 days to confirm it."
            },
            {
                type: "p",
                text: "The full project is on [GitHub](https://github.com/abhishek-patnaik/ga4-funnel-intelligence)."
            }
        ],
        tags: [
            "Google BigQuery",
            "GA4",
            "SQL"
        ],
        references: [
            {
                label: "Funnel Intelligence on GitHub",
                url: "https://github.com/abhishek-patnaik/ga4-funnel-intelligence"
            }
        ],
        status: "verified"
    },
    {
        id: "post-6",
        slug: "reading-41000-reviews-with-a-free-model",
        title: "Reading 41,000 Reviews with a Free Model on My Own GPU",
        author: "Abhishek Patnaik",
        date: "2026-09-24",
        category: "AI & NLP",
        cover: null,
        coverSeed: 6,
        summary: "I wanted to know what customers actually complain about, without paying for an API or sending their reviews anywhere. Here is what worked, and what I had to measure before I trusted it.",
        takeaways: [
            "A small open model is good enough for structured tagging if you constrain its answers.",
            "Write the labelling rules down before you judge the model.",
            "Check the model against data it never saw, like delivery records."
        ],
        body: [
            {
                type: "p",
                text: "For my Review Intelligence project I took about 41,000 written reviews from Olist, a Brazilian marketplace, and tagged each one with the complaints it contained: not delivered, late, missing items, wrong item, damaged and so on. Twelve themes in total."
            },
            {
                type: "h2",
                text: "Why a local model"
            },
            {
                type: "p",
                text: "I ran Qwen 2.5 7B on my own GPU through Ollama. It costs nothing to run, anyone can reproduce it, and no review text leaves the machine. The catch is that a small model makes mistakes, so measuring how often it is right became part of the project."
            },
            {
                type: "h2",
                text: "Forcing a fixed format"
            },
            {
                type: "p",
                text: "The model can only answer with a JSON list drawn from the twelve theme names. Anything outside the list is dropped. This one decision removed most of the weird answers you get when you let a model reply freely."
            },
            {
                type: "h2",
                text: "Rules before scores"
            },
            {
                type: "p",
                text: "My first labels showed that one line definitions leave a lot open. Is a customer still waiting after the deadline \"late\" or \"not delivered\"? Is \"ordered two, got one\" a missing item or a delivery problem? I wrote these rules into a labelling guide and put the same rules in the prompt. On a 150 review dev set, micro F1 went from 0.78 to 0.81 just from that."
            },
            {
                type: "h2",
                text: "The check I like most"
            },
            {
                type: "p",
                text: "Olist has delivery records. For reviews the model tagged as late, the order really was delivered after the promised date 37% of the time, against 4% for reviews with no complaint. That needs no labels at all, which makes it a nice independent check."
            },
            {
                type: "h2",
                text: "What came out of it"
            },
            {
                type: "p",
                text: "41% of written reviews contained a complaint. Not delivered was the biggest theme, with 4,597 reviews on about R$730,000 of orders. And the worst 10% of sellers drew complaints on 67% of their reviews against 39% for everyone else. That gives a business a short, ranked list of where to start."
            },
            {
                type: "p",
                text: "The code is on [GitHub](https://github.com/abhishek-patnaik/review-intelligence). Next on my list is scoring the held out test set once, at the end, so the headline accuracy is not flattered by tuning."
            }
        ],
        tags: [
            "Local LLMs",
            "Ollama",
            "Python"
        ],
        references: [
            {
                label: "Review Intelligence on GitHub",
                url: "https://github.com/abhishek-patnaik/review-intelligence"
            }
        ],
        status: "verified"
    },
    {
        id: "post-5",
        slug: "before-you-build-a-churn-model",
        title: "Before You Build a Churn Model, Ask What You Will Do With It",
        author: "Abhishek Patnaik",
        date: "2026-09-09",
        category: "Customer Analytics",
        cover: null,
        coverSeed: 5,
        summary: "At a broadband provider, the biggest win from segmenting customers was not predicting who would leave. It was finding who would happily move to a longer plan.",
        takeaways: [
            "A model is only useful if there is an action attached to each score.",
            "Look for the customers who are easy to help, not just the ones about to leave.",
            "Measure the campaign, not the model."
        ],
        body: [
            {
                type: "p",
                text: "Churn models are one of the first things people learn in analytics, and one of the most misused. It is easy to build one, get a decent score, and then realise nobody knows what to do with the list."
            },
            {
                type: "h2",
                text: "The setup"
            },
            {
                type: "p",
                text: "At Ubixe Infotech I worked on the subscriber data of a residential broadband provider that serves housing societies. A lot of subscribers paid month to month. The team wanted to reduce churn and grow sales."
            },
            {
                type: "p",
                text: "I segmented around 2,000 customers by plan, spending, payment behaviour and tenure, and used logistic regression and K-means to find high value groups and groups at risk of leaving."
            },
            {
                type: "h2",
                text: "What actually moved the numbers"
            },
            {
                type: "p",
                text: "The most useful output was not a ranked list of people about to cancel. It was a clear group of steady monthly payers who were good candidates for a quarterly or yearly plan. Offering them a longer plan was simple, cheap and welcome."
            },
            {
                type: "p",
                text: "The campaigns built on these segments grew sales by 15%, mostly from that move to longer plans, plus new customers within the same societies. Churn related inquiries fell by 12%."
            },
            {
                type: "h2",
                text: "Questions I ask now before modelling"
            },
            {
                type: "ul",
                items: [
                    "If the model says a customer is high risk, what exactly will we do?",
                    "Is there a group we can help more easily than the one we are worried about?",
                    "How will we know the campaign worked, and not just the model?"
                ]
            },
            {
                type: "h2",
                text: "The lesson"
            },
            {
                type: "p",
                text: "A model that ranks customers well but leads to no action is a report nobody reads. Start from the actions the business can take, then build the analysis that tells you who to take them with."
            }
        ],
        tags: [
            "Segmentation",
            "Churn",
            "Python"
        ],
        references: [],
        status: "verified"
    },
    {
        id: "post-4",
        slug: "ai-can-write-the-query",
        title: "AI Can Write the Query. It Can't Tell You the Data Is Wrong.",
        author: "Abhishek Patnaik",
        date: "2026-08-27",
        category: "AI & Analytics",
        cover: null,
        coverSeed: 4,
        summary: "AI assistants now write decent SQL and build charts on request. That makes the part of the job they cannot do more valuable, not less.",
        takeaways: [
            "Writing the query was never the hard part of analysis.",
            "AI answers the question you asked, on the data you gave it, even if both are wrong.",
            "The analyst's job is to check the data and pick the right question."
        ],
        body: [
            {
                type: "p",
                text: "Every BI tool and data warehouse now has some kind of AI assistant. You type a question, it writes the SQL, runs it and draws a chart. I use these tools, and they save time. But I keep seeing people talk as if this means analysts are done. I do not think so, and here is why."
            },
            {
                type: "h2",
                text: "The query was never the hard part"
            },
            {
                type: "p",
                text: "If you have done this work for a while, you know that writing the SQL is maybe a fifth of the job. The rest is figuring out whether the data means what it seems to mean, and whether the question being asked is the one that matters."
            },
            {
                type: "h2",
                text: "An example"
            },
            {
                type: "p",
                text: "Imagine an online store asks why so many people abandon after adding to cart. An assistant will happily calculate a funnel. But what if a chunk of purchases never fired an add to cart event in the first place, because of a tracking bug? The funnel will look broken in a place where nothing is broken, and the AI will explain the drop with total confidence."
            },
            {
                type: "p",
                text: "A tool that answers the question you asked, on the data you gave it, cannot tell you the data has a hole in it. Someone has to go and look."
            },
            {
                type: "h2",
                text: "What I think the job becomes"
            },
            {
                type: "ul",
                items: [
                    "**Checking first.** Before any chart, ask whether the events, rows and totals make sense.",
                    "**Choosing the question.** \"What is our conversion rate\" is easy. \"Which fix is worth the most money\" is the useful one.",
                    "**Saying how sure we are.** A number with a range and a stated assumption is worth more than a confident single number.",
                    "**Proving it.** Designing the test that shows whether the recommendation actually worked."
                ]
            },
            {
                type: "h2",
                text: "How I use AI tools"
            },
            {
                type: "p",
                text: "I let them draft queries, boilerplate code and first versions of charts. Then I read every line, because I am the one who has to defend the number in the meeting. That is the part I want to get better at, and it is the part I do not see going away."
            }
        ],
        tags: [
            "AI Tools",
            "SQL",
            "Analytics"
        ],
        references: [],
        status: "verified"
    },
    {
        id: "post-3",
        slug: "india-dpdp-rules-read-by-an-analyst",
        title: "India's DPDP Rules, Read by an Analyst",
        author: "Abhishek Patnaik",
        date: "2026-08-11",
        category: "Data & Privacy",
        cover: null,
        coverSeed: 3,
        summary: "The Digital Personal Data Protection Rules were notified in November 2025, with obligations phasing in over 18 months. Most write-ups are for lawyers. This one is about what changes for people who work with customer data every day.",
        takeaways: [
            "Collect less personal data, and know why you hold each field.",
            "Analysis rarely needs names and phone numbers. Use IDs.",
            "Deletion and retention need to be built into pipelines, not remembered."
        ],
        body: [
            {
                type: "p",
                text: "A quick note first: I am not a lawyer, and this is not legal advice. I am a data analyst who has spent most of my career working with customer records, and I wanted to understand what India's new data protection rules mean for that work."
            },
            {
                type: "h2",
                text: "The timeline in one paragraph"
            },
            {
                type: "p",
                text: "The Digital Personal Data Protection Act was passed in 2023. The Rules that make it workable were notified on 14 November 2025, with an 18 month phase in. Some parts, like the framework for consent managers, come in earlier. The bulk of the obligations on businesses apply from around May 2027. So right now companies are in the window where they are expected to get ready."
            },
            {
                type: "h2",
                text: "What this means for analysts"
            },
            {
                type: "p",
                text: "**Purpose matters.** Personal data is meant to be used for the purpose the person agreed to. If a customer gave their number to get a broadband connection, that does not automatically make it fair game for every campaign idea. Analysts are often the ones who find new uses for old data, so this lands on us."
            },
            {
                type: "p",
                text: "**Most analysis does not need identity.** When I segmented broadband subscribers by plan, spending, payment behaviour and tenure, none of that needed a name or a phone number. A customer ID was enough. The fewer personal fields that flow into your analysis tables, the less there is to protect."
            },
            {
                type: "p",
                text: "**Deletion has to be a process.** If data must be erased when it is no longer needed, that cannot depend on someone remembering to clean a folder. It has to be a step in the pipeline, the same way cleaning is."
            },
            {
                type: "p",
                text: "**Consent should be data too.** If a campaign list is built from customer data, there should be a field that says whether that customer agreed to be contacted for it. Filtering on that field should be as normal as filtering on city."
            },
            {
                type: "h2",
                text: "A small checklist I would use"
            },
            {
                type: "ul",
                items: [
                    "List every table with personal data and why it exists.",
                    "Replace names, phones and emails with IDs in analysis tables.",
                    "Keep a consent flag next to anything used for outreach.",
                    "Decide how long each kind of data is kept, and automate the deletion.",
                    "Know who to call if data leaks, before it happens."
                ]
            },
            {
                type: "h2",
                text: "Why I think this is good news"
            },
            {
                type: "p",
                text: "Cleaner, smaller datasets with a clear purpose are easier to analyse anyway. Rules like these push teams towards habits good analysts should have had already."
            }
        ],
        tags: [
            "DPDP Rules",
            "Privacy",
            "Data Governance"
        ],
        references: [],
        status: "verified"
    },
    {
        id: "post-2",
        slug: "excel-is-not-the-problem",
        title: "Excel Is Not the Problem. Unchecked Excel Is.",
        author: "Abhishek Patnaik",
        date: "2026-07-22",
        category: "Data Quality",
        cover: null,
        coverSeed: 2,
        summary: "Moving reports from Excel to SQL is not about the tool. It is about having one place where you can check the data before anyone uses it.",
        takeaways: [
            "Excel is fine for exploring. It is risky as the only copy of the truth.",
            "Start with three checks: row counts, duplicates and totals that should match.",
            "Write down every check so the next person can run it without you."
        ],
        body: [
            {
                type: "p",
                text: "People love to say Excel is the problem. I do not think it is. Excel is great for looking at data quickly, and most businesses in India still run on it. The problem is when five people each keep their own version of the same sheet and nobody checks whether they agree."
            },
            {
                type: "h2",
                text: "What usually goes wrong"
            },
            {
                type: "ul",
                items: [
                    "The same customer or machine appears twice with slightly different names.",
                    "Someone pastes new rows below an old total and the total stops including them.",
                    "Dates are stored as text in one file and as dates in another.",
                    "A column gets renamed and a lookup silently returns blanks."
                ]
            },
            {
                type: "p",
                text: "Each of these is small. Together they are why two people walk into a meeting with two different revenue numbers."
            },
            {
                type: "h2",
                text: "Why SQL helps"
            },
            {
                type: "p",
                text: "Putting the data in a database does not fix it by magic. What it gives you is one place where checks can run every time, the same way. At my last job I moved Excel based datasets into SQL and wrote validation checks across more than five sources. Reporting errors dropped by about 30%. The database was not the clever part. The checks were."
            },
            {
                type: "h2",
                text: "Three checks to start with"
            },
            {
                type: "p",
                text: "**Row counts.** If a source had 1,200 rows last week and 400 this week, stop and ask why before you report anything."
            },
            {
                type: "p",
                text: "**Duplicates.** Count rows per ID. Anything above one needs a reason."
            },
            {
                type: "p",
                text: "**Totals that should match.** If billing says one number and sales says another for the same month, the report should show the gap, not pick one."
            },
            {
                type: "h2",
                text: "Keep Excel where it is good"
            },
            {
                type: "p",
                text: "I still use Excel every week for quick pivots and for sharing small tables with people who do not want a dashboard. The rule I follow now is simple: Excel can be where you look at data, but it should not be the only place the data lives."
            }
        ],
        tags: [
            "SQL & Excel",
            "Data Validation",
            "Reporting"
        ],
        references: [],
        status: "verified"
    },
    {
        id: "post-1",
        slug: "what-six-months-of-sales-reporting-taught-me",
        title: "What Six Months of Sales Reporting Taught Me",
        author: "Abhishek Patnaik",
        date: "2026-07-06",
        category: "Career",
        cover: null,
        coverSeed: 1,
        summary: "I wrapped up my role at Iris Waves in June. Before the details fade, here are the lessons I want to carry into whatever comes next.",
        takeaways: [
            "Check the data before you build anything on top of it.",
            "A total that nobody owns hides problems. Split it by the person who has to act.",
            "Tracking exceptions early is boring work that saves the project."
        ],
        body: [
            {
                type: "p",
                text: "My last day as Sales Excellence Executive at Iris Waves was in June. It was a short stint, December to June, but it was dense. I want to write down what I learned while it is still fresh, mostly for myself."
            },
            {
                type: "h2",
                text: "1. The dashboard is the easy part"
            },
            {
                type: "p",
                text: "I built four Power BI dashboards for three people in leadership: machine base, client allocation and three year revenue per machine. Everyone sees the dashboards. Nobody sees the week before them, where I moved Excel files from more than five sources into a SQL database and wrote checks to catch the same figure showing up differently in two places."
            },
            {
                type: "p",
                text: "That second part is what cut reporting errors by about 30%. Without it, the dashboards would have been pretty charts of wrong numbers, and people would have stopped opening them within a month."
            },
            {
                type: "h2",
                text: "2. Ask who acts on a number"
            },
            {
                type: "p",
                text: "The brief asked for totals. I added state, area and national views because each person in that meeting owned a different slice. A national number is interesting. A number for your own area is something you can do something about."
            },
            {
                type: "p",
                text: "The same habit found the most useful result of the job. Overall revenue looked fine. Broken down by segment, one product segment was down 15%. That turned into a recovery plan for that segment. If I had stopped at the total, nobody would have known."
            },
            {
                type: "h2",
                text: "3. Exceptions are where projects go wrong"
            },
            {
                type: "p",
                text: "We had a rollout of more than 1,300 PCs. I kept a running list of everything that looked like it might slip, and it caught over 40 delivery risks before they turned into delays. We finished at 98% on time. None of that was clever analysis. It was keeping a list and chasing it every day."
            },
            {
                type: "h2",
                text: "4. Write for the person reading on their phone"
            },
            {
                type: "p",
                text: "Most of the people I reported to read things between meetings. A one line headline that says what changed and what to do beats a perfect chart they have to zoom into."
            },
            {
                type: "h2",
                text: "What I am taking forward"
            },
            {
                type: "p",
                text: "I want my next role to be closer to the analysis itself: SQL, Python, experiments, and a team that cares whether a number is right before it cares whether it looks good. In the meantime I am building projects that let me practise exactly that, and I will write about them here."
            }
        ],
        tags: [
            "Career",
            "Power BI",
            "Reporting"
        ],
        references: [],
        status: "verified"
    }
];
function plainText(text) {
    return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, "$1");
}
function getArticle(slug) {
    return articles.find((a)=>a.slug === slug || a.id === slug);
}
function articleCategories() {
    return Array.from(new Set(articles.map((a)=>a.category)));
}
function readingTime(article) {
    let words = 0;
    for (const block of article.body){
        if (block.type === "ul") words += plainText(block.items.join(" ")).split(/\s+/).length;
        else if (block.type === "code") words += block.code.split(/\s+/).length;
        else words += plainText(block.text).split(/\s+/).length;
    }
    return Math.max(1, Math.round(words / 200));
}
function relatedArticles(article, limit = 2) {
    return articles.filter((a)=>a.id !== article.id).map((a)=>({
            article: a,
            score: a.tags.filter((t)=>article.tags.includes(t)).length + (a.category === article.category ? 1 : 0)
        })).sort((x, y)=>y.score - x.score).slice(0, limit).map((x)=>x.article);
}
function searchArticles(query, category) {
    const q = query.trim().toLowerCase();
    return articles.filter((a)=>{
        if (category !== "All" && a.category !== category) return false;
        if (!q) return true;
        return [
            a.title,
            a.summary,
            a.category,
            ...a.tags
        ].some((s)=>s.toLowerCase().includes(q));
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/creative.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "creativeCategories",
    ()=>creativeCategories,
    "creativeWorks",
    ()=>creativeWorks,
    "featuredCreative",
    ()=>featuredCreative,
    "getCreativeWork",
    ()=>getCreativeWork
]);
const creativeCategories = [
    "Website Design",
    "Brand Identity",
    "Graphic Design",
    "AI Imagery",
    "AI Video",
    "Motion Graphics",
    "Marketing Creative",
    "Product Visualization",
    "3D Experiments"
];
const creativeWorks = [
    {
        id: "city-world",
        title: "Portfolio City",
        category: "3D Experiments",
        description: "The procedurally generated city you can drive through on the home page: districts, bridges, harbour and skyline.",
        tools: [
            "Three.js",
            "React Three Fiber",
            "GLSL"
        ],
        image: null,
        coverSeed: 11,
        caseStudy: "/projects/interactive-3d-portfolio-world",
        url: "/",
        featured: true,
        status: "verified"
    },
    {
        id: "jdm-coupe",
        title: "JDM Coupe, Modelled in Code",
        category: "3D Experiments",
        description: "A silver nineties-style Japanese sports coupe built entirely from code: lofted body, wheels, lights and cockpit.",
        tools: [
            "Three.js",
            "TypeScript"
        ],
        image: null,
        coverSeed: 23,
        caseStudy: null,
        url: "/garage",
        featured: true,
        status: "verified"
    },
    {
        id: "studio-client-websites",
        title: "Client Websites",
        category: "Website Design",
        description: "Production websites designed and built for clients through Creative Moonlight Studios.",
        tools: [
            "Next.js",
            "Tailwind CSS",
            "Figma"
        ],
        image: null,
        coverSeed: 37,
        caseStudy: null,
        url: "https://creativemoonlightstudio.com",
        featured: true,
        status: "draft"
    },
    {
        id: "ai-brand-visuals",
        title: "AI-Assisted Brand Visuals",
        category: "AI Imagery",
        description: "Sample entry for AI-generated imagery produced for brand and product storytelling.",
        tools: [
            "Image generation models",
            "Photoshop"
        ],
        image: null,
        coverSeed: 41,
        caseStudy: null,
        url: null,
        featured: false,
        status: "placeholder"
    },
    {
        id: "ai-product-reels",
        title: "AI Product Reels",
        category: "AI Video",
        description: "Sample entry for short-form AI video content created for social channels.",
        tools: [
            "Video generation models",
            "Video editing"
        ],
        image: null,
        coverSeed: 53,
        caseStudy: null,
        url: null,
        featured: false,
        status: "placeholder"
    },
    {
        id: "brand-identity-sample",
        title: "Brand Identity System",
        category: "Brand Identity",
        description: "Sample entry for a logo, colour and typography system.",
        tools: [
            "Illustrator",
            "Figma"
        ],
        image: null,
        coverSeed: 67,
        caseStudy: null,
        url: null,
        featured: false,
        status: "placeholder"
    },
    {
        id: "motion-sample",
        title: "Motion Graphics Reel",
        category: "Motion Graphics",
        description: "Sample entry for animated explainers and logo stings.",
        tools: [
            "After Effects"
        ],
        image: null,
        coverSeed: 71,
        caseStudy: null,
        url: null,
        featured: false,
        status: "placeholder"
    },
    {
        id: "campaign-sample",
        title: "Campaign Creative",
        category: "Marketing Creative",
        description: "Sample entry for a launch campaign across social and web.",
        tools: [
            "Figma",
            "Canva"
        ],
        image: null,
        coverSeed: 83,
        caseStudy: null,
        url: null,
        featured: false,
        status: "placeholder"
    },
    {
        id: "product-viz-sample",
        title: "Product Visualisation",
        category: "Product Visualization",
        description: "Sample entry for rendered product shots and interactive viewers.",
        tools: [
            "Blender",
            "Three.js"
        ],
        image: null,
        coverSeed: 97,
        caseStudy: null,
        url: null,
        featured: false,
        status: "placeholder"
    }
];
function getCreativeWork(id) {
    return creativeWorks.find((c)=>c.id === id);
}
function featuredCreative() {
    return creativeWorks.filter((c)=>c.featured);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/education.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "certifications",
    ()=>certifications,
    "education",
    ()=>education,
    "getEducation",
    ()=>getEducation
]);
const education = [
    {
        id: "mca-jain-university",
        institution: "Jain University, Bangalore",
        degree: "Master of Computer Applications (MCA)",
        specialization: null,
        start: "2022",
        end: "2024",
        description: "Postgraduate degree in computer applications.",
        subjects: [],
        projects: [],
        achievements: [
            "GPA 9.1 / 10"
        ],
        status: "verified"
    },
    {
        id: "bca-maharaja-surajmal",
        institution: "Maharaja Surajmal Institute, Delhi",
        degree: "Bachelor of Computer Applications (BCA)",
        specialization: null,
        start: "2019",
        end: "2022",
        description: "Undergraduate degree in computer applications.",
        subjects: [],
        projects: [],
        achievements: [
            "GPA 8.9 / 10"
        ],
        status: "verified"
    }
];
const certifications = [];
function getEducation(id) {
    return education.find((e)=>e.id === id);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/experience.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "experience",
    ()=>experience,
    "getExperience",
    ()=>getExperience
]);
const experience = [
    {
        id: "iris-waves",
        organization: "Iris Waves",
        title: "Sales Excellence Executive (Data & Analytics)",
        start: "Dec 2025",
        end: "Jun 2026",
        employmentType: "Full-time · MPS Business Unit",
        location: "Delhi, India",
        companyDescription: null,
        summary: "Leadership reporting in Power BI, company data moved from Excel into SQL with validation checks, and exception tracking for a 1,300+ PC rollout.",
        responsibilities: [
            "Built 4 Power BI dashboards on machine base, client allocation and 3-year revenue per machine for 3 leadership stakeholders, adding state, area and national KPIs beyond the brief.",
            "Moved Excel-based company datasets into a SQL database and designed validation checks across 5+ sources, cutting reporting errors by ~30%.",
            "Found a 15% revenue decline in one product segment through segment-level variance analysis, prompting a targeted recovery plan for that segment.",
            "Ran exception tracking for a 1,300+ PC rollout, surfacing 40+ delivery risks early and helping reach 98% on-time delivery.",
            "Partnered with marketing and IT to launch the Iris Global and Iris Waves corporate sites, owning content structure, analytics-tag integration, and go-live QA."
        ],
        technologies: [
            "Power BI",
            "DAX",
            "SQL",
            "Excel"
        ],
        highlights: [],
        metrics: [
            {
                label: "On-time delivery rate",
                value: "98%"
            },
            {
                label: "Reporting errors cut",
                value: "~30%"
            },
            {
                label: "Revenue decline found",
                value: "15%"
            },
            {
                label: "PCs tracked in rollout",
                value: "1,300+"
            }
        ],
        caseStudySlug: "iris-waves-reporting",
        website: null,
        logo: null,
        status: "verified"
    },
    {
        id: "the-creative-cosmos",
        organization: "The Creative Cosmos",
        title: "Product Strategist and Social Media Manager",
        start: "Jan 2025",
        end: "Apr 2025",
        employmentType: "Freelance",
        location: "",
        companyDescription: "A handmade jewellery brand.",
        summary: "Product strategy and organic Instagram for a handmade jewellery brand, plus an analytics web app for the brand.",
        responsibilities: [
            "Ran product strategy and organic Instagram for a handmade jewellery brand, no paid ads (150 followers at start, 500+ today).",
            "Built an analytics web app for the brand; both Instagram and market-stall sales grew over the engagement."
        ],
        technologies: [],
        highlights: [],
        metrics: [
            {
                label: "Instagram followers, organic",
                value: "150 → 500+"
            },
            {
                label: "Paid ads",
                value: "None"
            }
        ],
        caseStudySlug: null,
        website: null,
        logo: null,
        status: "verified"
    },
    {
        id: "ubixe-infotech",
        organization: "Ubixe Infotech Pvt. Ltd.",
        title: "Business Analyst",
        start: "Jan 2023",
        end: "Dec 2024",
        employmentType: "Full-time · Analytics & Strategy",
        location: "Gurgaon, India",
        companyDescription: null,
        summary: "Subscriber analytics for a residential broadband provider: segmentation, logistic regression and K-means, campaign dashboards and automated data cleaning.",
        responsibilities: [
            "Analysed the subscriber database of a residential broadband provider using SQL and Python (pandas), segmenting 2K+ customers by plan, spending, payment behaviour and tenure.",
            "Built logistic regression and K-means models to find high-value and at-risk segments, then ran campaigns that grew sales by 15%, mainly by moving monthly subscribers to quarterly and yearly plans, and cut churn-related inquiries by 12%.",
            "Built the Power BI dashboards marketing used to plan and track campaigns, and automated weekly data cleaning in Python (~6 hours to under 1 hour per cycle).",
            "Delivered 40+ weekly and monthly performance reports to senior management, distilling complex behavioural patterns into 1-page executive summaries with clear action items."
        ],
        technologies: [
            "SQL",
            "Python",
            "pandas",
            "scikit-learn",
            "Power BI"
        ],
        highlights: [],
        metrics: [
            {
                label: "Sales growth",
                value: "+15%"
            },
            {
                label: "Churn inquiries reduced",
                value: "12%"
            },
            {
                label: "Analyst time saved per month",
                value: "20+ hrs"
            },
            {
                label: "Executive reports delivered",
                value: "40+"
            }
        ],
        caseStudySlug: "ubixe-subscriber-segmentation",
        website: null,
        logo: null,
        status: "verified"
    }
];
function getExperience(id) {
    return experience.find((e)=>e.id === id);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/landmarks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Portfolio destinations: the physical places in the city and the content they open.
 *
 * Buildings never carry their own copy of portfolio text. Each destination points
 * at a section (and optionally a record id) and the interface resolves the text
 * from the content files, so changing a project title updates the sign, the
 * prompt, the map and the panel together.
 */ __turbopack_context__.s([
    "destinationForSection",
    ()=>destinationForSection,
    "destinations",
    ()=>destinations,
    "discoveries",
    ()=>discoveries,
    "getDestination",
    ()=>getDestination,
    "getDiscovery",
    ()=>getDiscovery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$creative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/creative.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$experience$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/experience.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/projects.ts [app-client] (ecmascript)");
;
;
;
;
;
;
const N = Math.PI;
const E = Math.PI / 2;
const S = 0;
const W = -Math.PI / 2;
const AVENUE_LANE = 6;
const zCampus = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROADS_Z"][1].z;
const zAvenue = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROADS_Z"][2].z;
const zNorthQuay = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROADS_Z"][3].z;
const zSouthQuay = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROADS_Z"][4].z;
const zMarina = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROADS_Z"][5].z;
const color = (d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDistrict"])(d).color;
function sectionDestinations() {
    return [
        {
            id: "home",
            kind: "section",
            section: "home",
            name: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].shortName} Tower`,
            category: "Introduction",
            description: "Who I am, what I do and how to explore the city",
            district: "central",
            position: [
                0,
                -20
            ],
            radius: 80,
            access: {
                x: -__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"] - 1,
                z: 57,
                heading: N
            },
            landmark: "centralTower",
            rotation: 0,
            color: color("central")
        },
        {
            id: "resume",
            kind: "section",
            section: "resume",
            name: "Profile Vault",
            category: "Resume",
            description: "Professional summary and resume download",
            district: "central",
            position: [
                -66,
                62
            ],
            radius: 70,
            access: {
                x: -AVENUE_LANE,
                z: 62,
                heading: N
            },
            landmark: "gatewayPavilion",
            rotation: E,
            color: "#9fd6ff",
            variant: 0
        },
        {
            id: "skills",
            kind: "section",
            section: "skills",
            name: "Skills Atrium",
            category: "Skills & Technologies",
            description: "Tools and methods, grouped by discipline",
            district: "central",
            position: [
                66,
                62
            ],
            radius: 70,
            access: {
                x: AVENUE_LANE,
                z: 62,
                heading: S
            },
            landmark: "gatewayPavilion",
            rotation: W,
            color: "#c7b6ff",
            variant: 1
        },
        {
            id: "experience",
            kind: "section",
            section: "experience",
            name: "Career Plaza",
            category: "Work Experience",
            description: "Roles, responsibilities and professional journey",
            district: "career",
            position: [
                315,
                -268
            ],
            radius: 80,
            access: {
                x: 315,
                z: zCampus - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: E
            },
            landmark: "corporateTwin",
            rotation: 0,
            color: color("career")
        },
        {
            id: "education",
            kind: "section",
            section: "education",
            name: "University Hall",
            category: "Education",
            description: "Degrees, subjects and academic work",
            district: "knowledge",
            position: [
                -315,
                -272
            ],
            radius: 84,
            access: {
                x: -315,
                z: zCampus - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: E
            },
            landmark: "university",
            rotation: 0,
            color: color("knowledge")
        },
        {
            id: "case-studies",
            kind: "item",
            section: "projects",
            itemId: "case-studies",
            name: "Case Study Library",
            category: "Case Studies",
            description: "In-depth teardowns of analytics work",
            district: "knowledge",
            position: [
                -106,
                -240
            ],
            radius: 52,
            access: {
                x: -106,
                z: zCampus - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: E
            },
            landmark: "library",
            rotation: 0,
            color: "#a8f0d0"
        },
        {
            id: "projects",
            kind: "section",
            section: "projects",
            name: "Project Lab",
            category: "Technical Projects",
            description: "Analytics, engineering and AI projects",
            district: "projects",
            position: [
                315,
                -96
            ],
            radius: 78,
            access: {
                x: 315,
                z: zAvenue - AVENUE_LANE,
                heading: E
            },
            landmark: "researchLab",
            rotation: 0,
            color: color("projects")
        },
        {
            id: "creative",
            kind: "section",
            section: "creative",
            name: "Creative Studio",
            category: "Creative Work",
            description: "Design, AI media and 3D experiments",
            district: "creative",
            position: [
                -315,
                -96
            ],
            radius: 78,
            access: {
                x: -315,
                z: zAvenue - AVENUE_LANE,
                heading: E
            },
            landmark: "creativeStudio",
            rotation: 0,
            color: color("creative")
        },
        {
            id: "blog",
            kind: "section",
            section: "blog",
            name: "Media Tower",
            category: "Blog & Insights",
            description: "Articles, tutorials and technical writing",
            district: "media",
            position: [
                315,
                304
            ],
            radius: 78,
            access: {
                x: 315,
                z: zSouthQuay + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: W
            },
            landmark: "mediaTower",
            rotation: N,
            color: color("media")
        },
        {
            id: "contact",
            kind: "section",
            section: "contact",
            name: "Connection Pavilion",
            category: "Contact & Collaboration",
            description: "Reach me by email",
            district: "contact",
            position: [
                -315,
                304
            ],
            radius: 80,
            access: {
                x: -315,
                z: zSouthQuay + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: W
            },
            landmark: "contactPavilion",
            rotation: N,
            color: color("contact")
        }
    ];
}
function itemDestinations() {
    const out = [];
    const officeSlots = [
        52,
        112,
        172
    ];
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$experience$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["experience"].slice(0, officeSlots.length).forEach((entry, i)=>{
        out.push({
            id: `experience-${entry.id}`,
            kind: "item",
            section: "experience",
            itemId: entry.id,
            name: entry.organization,
            category: entry.title,
            description: `${entry.start} – ${entry.end ?? "Present"}`,
            district: "career",
            position: [
                officeSlots[i],
                -240
            ],
            radius: 52,
            access: {
                x: officeSlots[i],
                z: zCampus - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: E
            },
            landmark: "officeTower",
            rotation: 0,
            color: color("career"),
            variant: i
        });
    });
    const podSlots = [
        {
            x: 258,
            z: 28,
            front: "avenue"
        },
        {
            x: 315,
            z: 28,
            front: "avenue"
        },
        {
            x: 372,
            z: 28,
            front: "avenue"
        },
        {
            x: 286,
            z: 74,
            front: "quay"
        },
        {
            x: 344,
            z: 74,
            front: "quay"
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featuredProjects"])().slice(0, podSlots.length).forEach((project, i)=>{
        const slot = podSlots[i];
        const avenue = slot.front === "avenue";
        out.push({
            id: `project-${project.slug}`,
            kind: "item",
            section: "projects",
            itemId: project.slug,
            name: project.title,
            category: project.category,
            description: project.summary,
            district: "projects",
            position: [
                slot.x,
                slot.z
            ],
            radius: avenue ? 48 : 38,
            access: avenue ? {
                x: slot.x,
                z: zAvenue + AVENUE_LANE,
                heading: W
            } : {
                x: slot.x,
                z: zNorthQuay - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: E
            },
            landmark: "projectPod",
            rotation: avenue ? N : 0,
            color: color("projects"),
            variant: i
        });
    });
    const gallerySlots = [
        -372,
        -315,
        -258
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$creative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featuredCreative"])().slice(0, gallerySlots.length).forEach((work, i)=>{
        out.push({
            id: `creative-${work.id}`,
            kind: "item",
            section: "creative",
            itemId: work.id,
            name: work.title,
            category: work.category,
            description: work.description,
            district: "creative",
            position: [
                gallerySlots[i],
                28
            ],
            radius: 48,
            access: {
                x: gallerySlots[i],
                z: zAvenue + AVENUE_LANE,
                heading: W
            },
            landmark: "galleryPavilion",
            rotation: N,
            color: color("creative"),
            variant: i
        });
    });
    const kioskSlots = [
        {
            x: 240,
            z: 250,
            rot: N,
            ax: 240,
            az: zSouthQuay + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
            h: W
        },
        {
            x: 392,
            z: 250,
            rot: N,
            ax: 392,
            az: zSouthQuay + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
            h: W
        },
        {
            x: 240,
            z: 352,
            rot: 0,
            ax: 240,
            az: zMarina - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
            h: E
        }
    ];
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["articles"].slice(0, kioskSlots.length).forEach((article, i)=>{
        const slot = kioskSlots[i];
        out.push({
            id: `article-${article.slug}`,
            kind: "item",
            section: "blog",
            itemId: article.slug,
            name: article.title,
            category: `Article · ${article.category}`,
            description: article.summary,
            district: "media",
            position: [
                slot.x,
                slot.z
            ],
            radius: 19,
            access: {
                x: slot.ax,
                z: slot.az,
                heading: slot.h
            },
            landmark: "kiosk",
            rotation: slot.rot,
            color: color("media"),
            variant: i
        });
    });
    return out;
}
function easterEggs() {
    return [
        {
            id: "arena",
            kind: "easter-egg",
            section: "discovery",
            itemId: "arena",
            name: "Data Dome Arena",
            category: "Hidden display",
            description: "A stadium with a secret on the scoreboard",
            district: "waterfront",
            position: [
                106,
                302
            ],
            radius: 76,
            access: {
                x: 106,
                z: zSouthQuay + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: W
            },
            landmark: "stadium",
            rotation: N,
            color: color("waterfront")
        },
        {
            id: "sunset-pier",
            kind: "easter-egg",
            section: "discovery",
            itemId: "sunset-pier",
            name: "Sunset Pier",
            category: "Scenic overlook",
            description: "The best view of the skyline",
            district: "waterfront",
            position: [
                -106,
                215.5
            ],
            radius: 17,
            access: {
                x: -106,
                z: zSouthQuay - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: E
            },
            landmark: "lookout",
            rotation: N,
            color: "#ffb38a",
            action: "cinematic"
        },
        {
            id: "dev-terminal",
            kind: "easter-egg",
            section: "discovery",
            itemId: "dev-terminal",
            name: "Harbor Dev Terminal",
            category: "Developer terminal",
            description: "How this world was built",
            district: "projects",
            position: [
                452,
                40
            ],
            radius: 42,
            access: {
                x: 420 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                z: 40,
                heading: N
            },
            landmark: "terminal",
            rotation: W,
            color: "#5effa1"
        },
        {
            id: "garage",
            kind: "easter-egg",
            section: "discovery",
            itemId: "garage",
            name: "The Garage",
            category: "Vehicle showcase",
            description: "Take a closer look at the car",
            district: "waterfront",
            position: [
                -44,
                404
            ],
            radius: 36,
            access: {
                x: -44,
                z: zMarina + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
                heading: W
            },
            landmark: "garage",
            rotation: N,
            color: "#d7dde6"
        }
    ];
}
const destinations = [
    ...sectionDestinations(),
    ...itemDestinations(),
    ...easterEggs()
];
const BY_ID = new Map(destinations.map((d)=>[
        d.id,
        d
    ]));
function getDestination(id) {
    return BY_ID.get(id);
}
function destinationForSection(section) {
    if (section === "about") return BY_ID.get("home");
    return destinations.find((d)=>d.kind === "section" && d.section === section);
}
const discoveries = [
    {
        id: "arena",
        title: "Data Dome Arena",
        kicker: "Hidden display",
        body: [
            "You found the arena. Tonight's fixture: the city itself.",
            "Everything you have driven past is generated at load time from a few hundred lines of layout data. No models are downloaded."
        ],
        facts: [
            {
                label: "City blocks",
                value: "30"
            },
            {
                label: "Bridges",
                value: "3"
            },
            {
                label: "Districts",
                value: "8"
            }
        ],
        action: {
            label: "Read how it was built",
            href: "/projects/interactive-3d-portfolio-world"
        }
    },
    {
        id: "sunset-pier",
        title: "Sunset Pier",
        kicker: "Scenic overlook",
        body: [
            "The quiet end of the south quay, facing the skyline across the channel.",
            "Take the cinematic camera for a slow orbit of the car against the towers."
        ],
        facts: [],
        action: {
            label: "Start cinematic camera",
            cinematic: true
        }
    },
    {
        id: "dev-terminal",
        title: "Harbor Dev Terminal",
        kicker: "abhishek@world:~$ cat build.log",
        body: [
            "Stack: Next.js, TypeScript, React Three Fiber, Three.js, Zustand, Tailwind CSS.",
            "Physics: custom arcade vehicle model on a fixed 120 Hz step.",
            "Assets: zero binary models. City, car and audio are generated in code."
        ],
        facts: [
            {
                label: "Physics step",
                value: "120 Hz"
            },
            {
                label: "Camera modes",
                value: "3"
            },
            {
                label: "Quality profiles",
                value: "3"
            }
        ],
        action: {
            label: "Read the blog",
            section: "blog"
        }
    },
    {
        id: "garage",
        title: "The Garage",
        kicker: "Vehicle showcase",
        body: [
            "A silver nineties-style Japanese sports coupe, modelled in code from a reference sheet: lofted body, hoop spoiler, five-spoke wheels and a right-hand-drive cockpit.",
            "Open the showroom to see it on a turntable from every angle."
        ],
        facts: [
            {
                label: "Layout",
                value: "Front engine, rear drive"
            },
            {
                label: "Driving position",
                value: "Right-hand drive"
            }
        ],
        action: {
            label: "Open the showroom",
            href: "/garage"
        }
    }
];
function getDiscovery(id) {
    return discoveries.find((d)=>d.id === id);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/projects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "caseStudies",
    ()=>caseStudies,
    "featuredProjects",
    ()=>featuredProjects,
    "getProject",
    ()=>getProject,
    "projectCategories",
    ()=>projectCategories,
    "projects",
    ()=>projects,
    "searchProjects",
    ()=>searchProjects
]);
const projectCategories = [
    "Data Science",
    "Machine Learning",
    "Data Analytics",
    "Business Intelligence",
    "Software Engineering",
    "AI Applications",
    "Web Development",
    "Experimental Technology"
];
const GITHUB = "https://github.com/abhishek-patnaik";
const projects = [
    {
        id: "funnel-intelligence",
        slug: "funnel-intelligence",
        title: "Funnel Intelligence: GA4 E-Commerce Analytics",
        category: "Data Analytics",
        summary: "Diagnose, predict and decide on 4.3M real GA4 events from the Google Merchandise Store.",
        problem: "Funnel charts show people leaving, but a team needs more: is the drop real or a tracking bug, which segment leaks, can buyers be spotted early, which fix pays back first, and how long a test must run.",
        objective: null,
        approach: [
            "Ran a tracking audit first, then computed step rates only from sessions that reached both steps.",
            "Tested segments with Holm correction.",
            "Built a purchase model scored at the 5th interaction and tested on January after tuning on December.",
            "Sized fixes with 20,000 simulations."
        ],
        technologies: [
            "Google BigQuery",
            "SQL",
            "Python",
            "pandas",
            "scikit-learn",
            "SciPy",
            "DuckDB",
            "pytest"
        ],
        kpis: [
            {
                value: "41%",
                label: "Purchases missing add_to_cart"
            },
            {
                value: "0.76",
                label: "ROC-AUC on an unseen month"
            },
            {
                value: "$18.7K",
                label: "Top fix, per month"
            }
        ],
        insights: [
            "1.35% of 360,129 sessions convert.",
            "41.3% of purchase sessions have no add_to_cart event.",
            "New visitors complete checkout at 29.8% vs 59.7% for everyone else.",
            "The top 10% of scored sessions hold 43% of buyers."
        ],
        results: [
            "A ranked fix list: new-visitor checkout first at about $18,704 a month (90% range $17,517 to $19,930), with an A/B test plan needing about 14 days.",
            "The model beat a rule-based baseline 2.3x on PR-AUC."
        ],
        learnings: "My first model leaked the answer through short sessions. Catching and fixing that taught me to judge a model the way it would actually be used.",
        quote: "Check the tracking before you trust the funnel.",
        thumbnail: null,
        gallery: [
            {
                src: "/images/projects/funnel-intelligence/funnel.webp",
                alt: "Funnel chart of step-to-step conversion rates",
                width: 1292,
                height: 641,
                caption: "The funnel, step by step"
            },
            {
                src: "/images/projects/funnel-intelligence/segment-gaps.webp",
                alt: "Chart of conversion gaps between visitor segments",
                width: 1556,
                height: 1045,
                caption: "Where segments differ"
            },
            {
                src: "/images/projects/funnel-intelligence/model-deciles.webp",
                alt: "Chart of buyers captured by model score decile",
                width: 1214,
                height: 673,
                caption: "Buyers by model score decile"
            },
            {
                src: "/images/projects/funnel-intelligence/backlog.webp",
                alt: "Prioritised backlog of fixes with monthly value and 90% range",
                width: 1600,
                height: 891,
                caption: "Fixes ranked by money"
            }
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
            tagline: "Three months of real GA4 data from the Google Merchandise Store, worked through in three layers: diagnose the leak, predict who will buy, and decide which fix pays back first.",
            facts: [
                {
                    label: "Domain",
                    value: "E-commerce · Product analytics"
                },
                {
                    label: "Role",
                    value: "Solo project, end to end"
                },
                {
                    label: "Data",
                    value: "4.3M GA4 events, 360K sessions (Nov 2020 to Jan 2021)"
                },
                {
                    label: "Stack",
                    value: "BigQuery SQL · Python · scikit-learn · pytest"
                }
            ],
            stepsTitle: "How the project is built",
            steps: [
                {
                    title: "Tracking audit",
                    text: "Check the events can be trusted before building any funnel"
                },
                {
                    title: "Diagnose",
                    text: "Step rates, segment tests with Holm correction, weak product pages"
                },
                {
                    title: "Predict",
                    text: "Purchase model scored at the 5th click, tested on an unseen month"
                },
                {
                    title: "Decide",
                    text: "Fixes sized in money with 20,000 simulations, plus an A/B test plan"
                }
            ],
            sections: [
                {
                    heading: "The problem",
                    paragraphs: [
                        "Most funnel analyses stop at a chart that shows people leaving. The harder questions come after it: is the drop real or a tracking bug, which segment is leaking, can we spot buyers early enough to help them, which fix pays back first, and how long would a test need to run before anyone believes the result. I answered all of them on Google's public GA4 BigQuery sample."
                    ]
                },
                {
                    heading: "Checking the data first",
                    paragraphs: [
                        "41.3% of purchase sessions had no add_to_cart event, which a real journey cannot skip. A strict step-by-step funnel would have thrown away 41% of real buyers, so every step rate in the project is computed only from sessions that reached both steps."
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
FROM sessions;`
                    }
                },
                {
                    heading: "What the data says",
                    paragraphs: [
                        "1.35% of 360,129 sessions end in a purchase. The steepest step is view item to add to cart: only 19.7% get through.",
                        "New visitors lose at checkout: 29.8% complete checkout against 59.7% for everyone else (Holm-adjusted p < 0.001). Part of this is delayed buying, since only 50% of buyers order in their first session.",
                        "95 product pages lose shoppers far more than the rest of their category.",
                        "Buyers are visible early: scored at the 5th interaction, the model reaches ROC-AUC 0.76 on January, a month it never saw. The top 10% of sessions hold 43% of buyers (4.3x the average), and the model beats a hand-written rule by 2.3x on PR-AUC."
                    ],
                    table: {
                        caption: "Fix list, ranked by money",
                        columns: [
                            "Fix",
                            "Worth per month",
                            "90% range",
                            "What to test"
                        ],
                        rows: [
                            [
                                "New-visitor checkout",
                                "$18,704",
                                "$17,517 to $19,930",
                                "Show shipping cost early, guest checkout, saved carts. About 14 days to prove."
                            ],
                            [
                                "Checkout after landing on Home",
                                "$9,049",
                                "$7,705 to $10,442",
                                "Wallet payments, address autofill, fewer required fields"
                            ],
                            [
                                "95 weak product pages",
                                "$5,236",
                                "$5,097 to $5,377",
                                "Photos, price, stock and size info, page by page"
                            ]
                        ]
                    }
                },
                {
                    heading: "What I learned",
                    paragraphs: [
                        "A leakage bug, caught and fixed: my first model looked too good because short sessions leaked the answer. The fix and the reasoning are written up in the project's decisions log.",
                        "Revenue is a range, not a hopeful number: every opportunity is sized from 20,000 draws, and the assumptions sit in one config file where they can be argued with.",
                        "Tested end to end: the SQL is checked against a simulated GA4 export with problems planted on purpose."
                    ]
                }
            ]
        }
    },
    {
        id: "customer-value-engine",
        slug: "customer-value-engine",
        title: "Customer Value Engine: CLV and Retention Budgeting",
        category: "Data Science",
        summary: "Who comes back, what they are worth over 26 weeks, and where a retention budget should go.",
        problem: "A UK online wholesaler with 1M+ invoice lines and 5,839 customers needs to know which customers return, what each is worth, and how much retention spend actually pays back.",
        objective: null,
        approach: [
            "Matched cancellations to the orders they reverse.",
            "Measured retention with cohorts and Kaplan-Meier.",
            "Wrote BG/NBD and Gamma-Gamma from the papers on a seasonal clock, backtested in both halves of the year.",
            "Optimised a £50,000 budget across 2,000 assumption scenarios."
        ],
        technologies: [
            "Python",
            "pandas",
            "NumPy",
            "SciPy",
            "BG/NBD",
            "Gamma-Gamma",
            "Power BI",
            "DAX",
            "pytest"
        ],
        kpis: [
            {
                value: "4.7%",
                label: "Accounts driving half of revenue"
            },
            {
                value: "60%+",
                label: "Revenue held by top 10% predicted"
            },
            {
                value: "£6.3K",
                label: "Of a £50K budget that pays back"
            }
        ],
        insights: [
            "273 accounts carry half the revenue.",
            "An apparent halving of new customers was a counting artefact (2,094 vs 2,155 like for like).",
            "Customers found in autumn are Christmas buyers."
        ],
        results: [
            "Only the first £6,315 of a £50,000 budget earns its keep, bringing back about £18,756 of margin from 394 accounts. Spending all of it turns a gain into a loss.",
            "Delivered as a Power BI report on a star-schema data model with 35 DAX measures."
        ],
        learnings: "The model missed by +51% in the quiet season. Reporting that miss, explaining it and planning on the low end is more useful than hiding it.",
        quote: "Sometimes the right answer is to spend less.",
        thumbnail: null,
        gallery: [
            {
                src: "/images/projects/customer-value-engine/report-overview.webp",
                alt: "Power BI overview page with revenue, customers and forecast",
                width: 1522,
                height: 880,
                caption: "Power BI report: overview"
            },
            {
                src: "/images/projects/customer-value-engine/report-budget-plan.webp",
                alt: "Power BI budget plan page",
                width: 1522,
                height: 880,
                caption: "Power BI report: budget plan"
            },
            {
                src: "/images/projects/customer-value-engine/concentration.webp",
                alt: "Chart of revenue concentration across customers",
                width: 1109,
                height: 823,
                caption: "Revenue concentration"
            },
            {
                src: "/images/projects/customer-value-engine/budget-curve.webp",
                alt: "Chart of margin returned as retention spend increases",
                width: 1262,
                height: 724,
                caption: "Where spend stops paying back"
            }
        ],
        videoUrl: null,
        githubUrl: `${GITHUB}/customer-value-engine`,
        liveDemoUrl: null,
        featured: true,
        year: "2026",
        status: "verified",
        caseStudy: null
    },
    {
        id: "review-intelligence",
        slug: "review-intelligence",
        title: "Review Intelligence: LLM Complaint Classification",
        category: "AI Applications",
        summary: "What customers actually complain about, how often a free local LLM gets it right, and which complaints cost the most.",
        problem: "An ecommerce marketplace has tens of thousands of written reviews but no structured view of what goes wrong, how often, and what it costs.",
        objective: null,
        approach: [
            "Ran an open 7B model locally through Ollama with answers forced into a fixed JSON schema of 12 themes.",
            "Wrote labelling rules and tuned the prompt on a dev set.",
            "Linked every theme to order value, rating and repeat purchase."
        ],
        technologies: [
            "Python",
            "Ollama",
            "Qwen 2.5 7B",
            "pandas",
            "NLP",
            "Model evaluation",
            "pytest"
        ],
        kpis: [
            {
                value: "40,950",
                label: "Reviews classified"
            },
            {
                value: "0.81",
                label: "Micro F1 after prompt rules"
            },
            {
                value: "37% vs 4%",
                label: "Late tags matching late orders"
            }
        ],
        insights: [
            "41% of written reviews contain a complaint.",
            "Not delivered is the biggest theme (4,597 reviews).",
            "The worst 10% of sellers draw complaints on 67% of their reviews against 39% for the rest."
        ],
        results: [
            "A fix list ranked by money at stake, led by undelivered parcels on R$730K of orders, then missing items and seller support.",
            "Micro F1 raised from 0.78 to 0.81 with explicit labelling rules."
        ],
        learnings: "Validating the classifier against delivery records gave independent evidence without any labels: late tags matched late orders 37% of the time vs 4%.",
        quote: "Measure how often the model is right before using any of its answers.",
        thumbnail: null,
        gallery: [
            {
                src: "/images/projects/review-intelligence/themes.webp",
                alt: "Chart of complaint themes by number of reviews",
                width: 1419,
                height: 693,
                caption: "Complaint themes"
            },
            {
                src: "/images/projects/review-intelligence/delivery-check.webp",
                alt: "Chart comparing late tags with delivery records",
                width: 1174,
                height: 416,
                caption: "Checked against delivery records"
            },
            {
                src: "/images/projects/review-intelligence/fix-list.webp",
                alt: "Fix list ranked by order value at stake",
                width: 1245,
                height: 601,
                caption: "Fix list by money at stake"
            }
        ],
        videoUrl: null,
        githubUrl: `${GITHUB}/review-intelligence`,
        liveDemoUrl: null,
        featured: true,
        year: "2026",
        status: "verified",
        caseStudy: null
    },
    {
        id: "taxbridge-ai",
        slug: "taxbridge-ai",
        title: "TaxBridge AI: Pre-ITR Workflow MVP",
        category: "Software Engineering",
        summary: "A pre-filing workflow for CA firms: collect Form 16, AIS and Form 26AS, flag mismatches, and produce a filing-readiness report.",
        problem: "Before ITR season, a CA firm collects documents from many salaried clients and checks by hand that Form 16, AIS and Form 26AS agree. A mismatch caught late means rework for the firm and the client.",
        objective: null,
        approach: [
            "Built a CA workspace with client records (PAN, assessment year) and login-free upload links for clients.",
            "Wrote parsers for Form 16 (pdfplumber) and for AIS and 26AS files.",
            "Added a mismatch and risk engine, a readiness score, a clarification checklist and a downloadable PDF report."
        ],
        technologies: [
            "Python",
            "FastAPI",
            "SQLAlchemy",
            "pdfplumber",
            "ReportLab",
            "cryptography (Fernet)",
            "pytest",
            "Docker"
        ],
        kpis: [
            {
                value: "3",
                label: "Tax documents cross-checked"
            },
            {
                value: "PDF",
                label: "Filing-readiness report"
            },
            {
                value: "Encrypted",
                label: "Client file storage"
            }
        ],
        insights: [
            "The scope deliberately leaves out direct filing, portal scraping and tax advice.",
            "The narrow wedge is the cross-document check that firms still do by hand."
        ],
        results: [
            "A working MVP with demo data, encrypted file storage with SHA-256 hashes, an audit log and automated tests."
        ],
        learnings: "For tax figures, deterministic rules with an audit trail are easier for an accountant to trust than a model that might guess a number.",
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
            tagline: "An MVP that collects Form 16, AIS and Form 26AS from clients, checks them against each other, and tells the CA what to fix before filing.",
            facts: [
                {
                    label: "Type",
                    value: "Side project, working MVP"
                },
                {
                    label: "Users",
                    value: "CA firms and their salaried clients"
                },
                {
                    label: "Scope",
                    value: "Pre-filing checks, not filing"
                },
                {
                    label: "Stack",
                    value: "FastAPI · SQLAlchemy · pdfplumber · ReportLab"
                }
            ],
            stepsTitle: "How a client file moves through TaxBridge",
            steps: [
                {
                    title: "Invite",
                    text: "CA creates the client (PAN, assessment year) and shares a login-free upload link"
                },
                {
                    title: "Upload",
                    text: "Form 16, AIS, 26AS, salary slips and proofs, stored encrypted with SHA-256 hashes"
                },
                {
                    title: "Parse",
                    text: "pdfplumber for Form 16, CSV, JSON and PDF text for AIS and 26AS"
                },
                {
                    title: "Check",
                    text: "Mismatch rules, readiness score, checklist and PDF report"
                }
            ],
            sections: [
                {
                    heading: "The problem",
                    paragraphs: [
                        "Before ITR season, a CA firm collects documents from many salaried clients and checks by hand that Form 16, AIS and Form 26AS tell the same story. When TDS or salary figures disagree and nobody notices, the return goes in wrong and the work has to be redone."
                    ]
                },
                {
                    heading: "The checks",
                    paragraphs: [
                        "The engine is rule based on purpose. It flags missing documents, PAN mismatches, TDS differences between Form 16 and Form 26AS or AIS above ₹100, salary differences above 1% or ₹1,000, multiple employers, non-salary income and capital gains in AIS, old-regime deductions on a new-regime Form 16, and income that may exceed the ITR-1 limit.",
                        "Each finding has a severity, and the readiness score starts at 100 and drops with each one, so a CA can see at a glance which client files are ready."
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
    ))`
                    }
                },
                {
                    heading: "What it deliberately leaves out",
                    paragraphs: [
                        "It does not file returns, scrape government portals, submit AIS feedback or give tax advice. Keeping the scope to the cross-document check made the MVP small enough to build properly and test."
                    ],
                    table: {
                        caption: "What works today",
                        columns: [
                            "Part",
                            "Detail"
                        ],
                        rows: [
                            [
                                "CA workspace",
                                "Login, dashboard with client statuses, client records"
                            ],
                            [
                                "Client intake",
                                "Secure invite links, encrypted storage, audit log"
                            ],
                            [
                                "Checks",
                                "Mismatch and risk rules, readiness score, clarification checklist"
                            ],
                            [
                                "Output",
                                "Downloadable PDF filing-readiness report"
                            ],
                            [
                                "Quality",
                                "Seed demo data and pytest tests"
                            ]
                        ]
                    }
                },
                {
                    heading: "What I took from it",
                    paragraphs: [
                        "For tax figures, a deterministic rule with a clear message is easier for an accountant to trust than a model that might guess a number. The code is on GitHub."
                    ]
                }
            ]
        }
    },
    {
        id: "algoquest-ai",
        slug: "algoquest-ai",
        title: "AlgoQuest AI: DSA Learning Workspace",
        category: "Web Development",
        summary: "A Duolingo-style platform for learning data structures and algorithms through a skill tree of missions.",
        problem: "DSA practice platforms can feel like a long, flat list of problems, which makes it hard for learners to see progress and stay with it.",
        objective: null,
        approach: [
            "Built a skill tree where missions unlock in order, a Monaco code workspace, topic mastery tracking, gamification and a leaderboard.",
            "Put code execution and the AI tutor behind provider abstractions so either can be swapped."
        ],
        technologies: [
            "Next.js (App Router)",
            "TypeScript",
            "Prisma ORM",
            "PostgreSQL",
            "Monaco Editor",
            "Tailwind CSS",
            "Vitest"
        ],
        kpis: [
            {
                value: "Skill tree",
                label: "Guided mission progression"
            },
            {
                value: "Monaco",
                label: "In-browser code workspace"
            },
            {
                value: "Vitest",
                label: "Tests on unlocks, mastery, gamification"
            }
        ],
        insights: [
            "Untrusted user code must never run on the web server, so execution goes through an external sandbox provider."
        ],
        results: [
            "A full codebase with original mission content, seed data, admin tools, tests and deployment docs."
        ],
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
        caseStudy: null
    },
    {
        id: "job-tracker-extension",
        slug: "job-tracker-extension",
        title: "Job Tracker Chrome Extension",
        category: "Software Engineering",
        summary: "A browser extension that logs job applications automatically when you click Apply on 10+ Indian and global job portals.",
        problem: "Applying across Naukri, LinkedIn, Indeed and other portals makes it easy to lose track of where you applied and what happened next.",
        objective: null,
        approach: [
            "A Chrome extension that detects Apply clicks, reads the company and role from the page, and saves the entry in local browser storage.",
            "A popup ledger, status tracking and a manual log for mobile applications."
        ],
        technologies: [
            "JavaScript",
            "Chrome Extension API",
            "DOM parsing",
            "HTML",
            "CSS"
        ],
        kpis: [
            {
                value: "10+",
                label: "Job portals auto-tracked"
            },
            {
                value: "5",
                label: "Status stages, applied to offer"
            },
            {
                value: "Local",
                label: "Data stays in your browser"
            }
        ],
        insights: [
            "Portals change their page structure often, so every entry can be edited and there is always a manual fallback."
        ],
        results: [
            "Tracks Naukri, Monster, Indeed, LinkedIn, Shine, Foundit, Instahyre, TimesJobs, Glassdoor, Wellfound, Internshala, Hirist and IIMJobs, skips same-day duplicates, and shows a response rate."
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
        caseStudy: null
    },
    {
        id: "iris-waves-reporting",
        slug: "iris-waves-reporting",
        title: "Iris Waves: Reporting Leadership Could Trust",
        category: "Business Intelligence",
        summary: "4 Power BI dashboards for leadership, Excel data moved into SQL with validation checks, a 15% segment decline found, and a 1,300+ PC rollout tracked.",
        problem: "At Iris Waves, reporting lived in Excel files from 5+ sources with no shared checks.",
        objective: null,
        approach: [
            "4 Power BI dashboards for 3 leadership stakeholders.",
            "Excel datasets moved into a SQL database with validation checks.",
            "Segment-level variance analysis.",
            "Exception tracking for a 1,300+ PC rollout."
        ],
        technologies: [
            "Power BI",
            "DAX",
            "SQL",
            "Excel"
        ],
        kpis: [
            {
                value: "15%",
                label: "Segment decline found"
            },
            {
                value: "98%",
                label: "On-time delivery, 1,300+ PCs"
            },
            {
                value: "~30%",
                label: "Fewer reporting errors"
            }
        ],
        insights: [
            "Found a 15% revenue decline in one product segment that the overall revenue figure hid."
        ],
        results: [
            "Reporting errors down ~30%.",
            "98% on-time delivery for a 1,300+ PC rollout, with 40+ delivery risks flagged early."
        ],
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
            tagline: "Four Power BI dashboards for leadership, company data moved from Excel into SQL with validation checks, and exception tracking for a 1,300+ PC rollout.",
            facts: [
                {
                    label: "Organization",
                    value: "Iris Waves, Delhi"
                },
                {
                    label: "Role",
                    value: "Sales Excellence Executive (Data & Analytics)"
                },
                {
                    label: "Period",
                    value: "Dec 2025 – Jun 2026"
                },
                {
                    label: "Stack",
                    value: "Power BI · DAX · SQL · Excel"
                }
            ],
            stepsTitle: "How the reporting was rebuilt",
            steps: [
                {
                    title: "Collect",
                    text: "Excel datasets from 5+ sources"
                },
                {
                    title: "Move to SQL",
                    text: "One SQL database instead of scattered files"
                },
                {
                    title: "Validate",
                    text: "Checks across sources before data reaches a report"
                },
                {
                    title: "Report",
                    text: "4 Power BI dashboards for 3 leadership stakeholders"
                }
            ],
            sections: [
                {
                    heading: "The starting point",
                    paragraphs: [
                        "Company reporting lived in Excel files that came from 5+ different sources. The same figure could differ from one file to the next, and nothing checked the data before it reached a report, so leadership reviews spent time arguing about numbers instead of acting on them."
                    ]
                },
                {
                    heading: "The dashboards",
                    paragraphs: [
                        "I built 4 Power BI dashboards on machine base, client allocation and 3-year revenue per machine for 3 leadership stakeholders. The brief asked for totals; I added KPIs at state, area and national level so each leader could see their own slice without asking for a new report.",
                        "Behind them, I moved the Excel-based company datasets into a SQL database and designed validation checks across the 5+ sources. That cut reporting errors by about 30%."
                    ]
                },
                {
                    heading: "Finding the 15% decline",
                    paragraphs: [
                        "Overall revenue hid a problem. Segment-level variance analysis showed a 15% revenue decline in one product segment, which led to a targeted recovery plan for that segment."
                    ]
                },
                {
                    heading: "The 1,300+ PC rollout",
                    paragraphs: [
                        "I ran exception tracking for a 1,300+ PC rollout, surfacing 40+ delivery risks early so they could be fixed before they caused delays. The rollout reached 98% on-time delivery."
                    ],
                    table: {
                        caption: "Results",
                        columns: [
                            "Area",
                            "What I did",
                            "Result"
                        ],
                        rows: [
                            [
                                "Leadership reporting",
                                "4 Power BI dashboards with state, area and national KPIs",
                                "Used by 3 leadership stakeholders"
                            ],
                            [
                                "Data quality",
                                "Excel to SQL, validation checks across 5+ sources",
                                "~30% fewer reporting errors"
                            ],
                            [
                                "Revenue analysis",
                                "Segment-level variance analysis",
                                "15% segment decline found"
                            ],
                            [
                                "PC rollout",
                                "Exception tracking on 1,300+ PCs",
                                "40+ risks flagged early, 98% on time"
                            ]
                        ]
                    }
                },
                {
                    heading: "What I took from it",
                    paragraphs: [
                        "The dashboards were the visible part, but the validation checks underneath are what made people trust them. Company data stays confidential, so this page describes the work without sharing it."
                    ]
                }
            ]
        }
    },
    {
        id: "ubixe-subscriber-segmentation",
        slug: "ubixe-subscriber-segmentation",
        title: "Ubixe Infotech: Subscriber Segmentation",
        category: "Machine Learning",
        summary: "SQL and Python segmentation of 2K+ broadband subscribers, logistic regression and K-means to find high-value and at-risk groups, and campaigns that moved customers to longer plans.",
        problem: "At Ubixe Infotech, a residential broadband provider had a subscriber base it could not yet segment by value or risk.",
        objective: null,
        approach: [
            "SQL and Python segmentation of 2K+ subscribers.",
            "Logistic regression and K-means to find high-value and at-risk segments.",
            "Campaign dashboards in Power BI."
        ],
        technologies: [
            "SQL",
            "Python",
            "pandas",
            "scikit-learn",
            "K-means",
            "Logistic regression",
            "Power BI"
        ],
        kpis: [
            {
                value: "+15%",
                label: "Sales growth"
            },
            {
                value: "12%",
                label: "Fewer churn-related inquiries"
            },
            {
                value: "~6 h → <1 h",
                label: "Weekly data prep"
            }
        ],
        insights: [
            "The biggest sales lever was moving monthly subscribers to quarterly and yearly plans."
        ],
        results: [
            "Sales up 15% and churn-related inquiries down 12%.",
            "Weekly data cleaning automated in Python, from about 6 hours to under 1 hour per cycle."
        ],
        learnings: "The most useful output was not the model score but the plain answer it led to: which customers to offer a longer plan first.",
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
            tagline: "SQL and Python analysis of a residential broadband provider's subscribers, models to find high-value and at-risk segments, and campaigns that moved customers to longer plans.",
            facts: [
                {
                    label: "Organization",
                    value: "Ubixe Infotech Pvt. Ltd., Gurgaon (remote)"
                },
                {
                    label: "Role",
                    value: "Business Analyst"
                },
                {
                    label: "Period",
                    value: "Jan 2023 – Dec 2024"
                },
                {
                    label: "Stack",
                    value: "SQL · Python · scikit-learn · Power BI"
                }
            ],
            stepsTitle: "From subscriber data to campaigns",
            steps: [
                {
                    title: "Query",
                    text: "SQL on the subscriber database"
                },
                {
                    title: "Segment",
                    text: "2K+ customers by plan, spend, payment behaviour, tenure"
                },
                {
                    title: "Model",
                    text: "Logistic regression and K-means"
                },
                {
                    title: "Act",
                    text: "Campaigns tracked in Power BI"
                }
            ],
            sections: [
                {
                    heading: "The business",
                    paragraphs: [
                        "Ubixe's client is a broadband provider serving housing societies. Most subscribers paid month to month, and the team had no clear view of which customers were most valuable, which were likely to leave, or who would move to a longer plan."
                    ]
                },
                {
                    heading: "Segmenting the customers",
                    paragraphs: [
                        "Using SQL and Python (pandas), I segmented 2K+ customers by plan, spending, payment behaviour and tenure. I then used logistic regression and K-means to find the high-value segments and the segments at risk of leaving."
                    ]
                },
                {
                    heading: "What the campaigns did",
                    paragraphs: [
                        "The segments shaped the campaigns. The biggest lever was moving monthly subscribers to quarterly and yearly plans, along with winning new customers inside the same housing societies. The campaigns grew sales by 15% and cut churn-related inquiries by 12%.",
                        "Marketing planned and tracked these campaigns on Power BI dashboards I built around subscription lifecycle and payment behaviour."
                    ]
                },
                {
                    heading: "Saving analyst time",
                    paragraphs: [
                        "Weekly data cleaning was manual. I automated it in Python, taking it from about 6 hours to under 1 hour per cycle. I also delivered 40+ weekly and monthly reports to senior management as one-page summaries with clear actions."
                    ],
                    table: {
                        caption: "Results",
                        columns: [
                            "Area",
                            "What I did",
                            "Result"
                        ],
                        rows: [
                            [
                                "Sales",
                                "Segment-led campaigns to move customers to longer plans",
                                "+15% sales"
                            ],
                            [
                                "Retention",
                                "At-risk segments targeted early",
                                "12% fewer churn-related inquiries"
                            ],
                            [
                                "Data prep",
                                "Weekly cleaning automated in Python",
                                "~6 hours to under 1 hour per cycle"
                            ],
                            [
                                "Reporting",
                                "One-page summaries for senior management",
                                "40+ reports delivered"
                            ]
                        ]
                    }
                },
                {
                    heading: "What I took from it",
                    paragraphs: [
                        "The most useful output was not the model score but the plain answer it led to: which customers to offer a longer plan first. Client data stays confidential, so this page describes the work without sharing it."
                    ]
                }
            ]
        }
    },
    {
        id: "interactive-3d-portfolio-world",
        slug: "interactive-3d-portfolio-world",
        title: "The Interactive 3D Portfolio World",
        category: "Web Development",
        summary: "This website: a drivable futuristic city where every district is a section of the portfolio, built with Next.js and React Three Fiber.",
        problem: "Conventional portfolios list work; they rarely show how someone thinks about systems, data and experience together.",
        objective: "Make the portfolio itself the demonstration: a navigable world that stays fast, accessible and easy to maintain.",
        approach: [
            "Procedurally generated city from one typed layout module that also drives physics, the map and route finding.",
            "Arcade vehicle model on a fixed 120 Hz timestep, so handling is identical at any frame rate.",
            "The car is modelled in code from the reference sheet: a lofted body, wheels, lights and a cockpit.",
            "Every portfolio section is also a normal web page, so nothing depends on driving."
        ],
        technologies: [
            "Next.js",
            "TypeScript",
            "React Three Fiber",
            "Three.js",
            "Zustand",
            "Tailwind CSS"
        ],
        kpis: [],
        insights: [],
        results: [
            "All content is driven by typed data files.",
            "Three quality profiles that change real renderer settings.",
            "Unit, component and end-to-end test suites."
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
        caseStudy: null
    }
];
function getProject(slug) {
    return projects.find((p)=>p.slug === slug || p.id === slug);
}
function featuredProjects() {
    return projects.filter((p)=>p.featured);
}
function caseStudies() {
    return projects.filter((p)=>p.caseStudy !== null);
}
function searchProjects(query, category, caseStudiesOnly = false) {
    const q = query.trim().toLowerCase();
    return projects.filter((p)=>{
        if (caseStudiesOnly && !p.caseStudy) return false;
        if (category !== "All" && p.category !== category) return false;
        if (!q) return true;
        return [
            p.title,
            p.summary,
            p.category,
            ...p.technologies
        ].some((s)=>s.toLowerCase().includes(q));
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/skills.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "skillGroups",
    ()=>skillGroups
]);
const skillGroups = [
    {
        id: "languages",
        name: "Languages",
        description: "The two languages behind almost every analysis.",
        skills: [
            {
                name: "SQL",
                note: "CTEs, window functions"
            },
            {
                name: "Python",
                note: "pandas, NumPy, scikit-learn"
            }
        ],
        status: "verified"
    },
    {
        id: "analytics-bi",
        name: "Analytics & BI",
        description: "Dashboards, models and KPIs that people act on.",
        skills: [
            {
                name: "Power BI",
                note: "DAX, data modelling"
            },
            {
                name: "Excel",
                note: "Pivot tables, advanced formulas"
            },
            {
                name: "GA4"
            },
            {
                name: "KPI design"
            },
            {
                name: "Tableau"
            },
            {
                name: "Looker Studio"
            }
        ],
        status: "verified"
    },
    {
        id: "statistics",
        name: "Statistics",
        description: "Sizing a finding, and designing the test that proves it.",
        skills: [
            {
                name: "A/B testing and power analysis"
            },
            {
                name: "Hypothesis testing"
            },
            {
                name: "Funnel and cohort analysis"
            },
            {
                name: "Survival analysis"
            },
            {
                name: "Monte Carlo simulation"
            }
        ],
        status: "verified"
    },
    {
        id: "ml-ai",
        name: "ML & AI",
        description: "Models used where they lead to an action.",
        skills: [
            {
                name: "Logistic regression"
            },
            {
                name: "Random Forest"
            },
            {
                name: "K-means"
            },
            {
                name: "CLV modelling",
                note: "BG/NBD"
            },
            {
                name: "LLM classification and evaluation",
                note: "Ollama"
            }
        ],
        status: "verified"
    },
    {
        id: "data-cloud",
        name: "Data & Cloud",
        description: "Where the data lives and how it is versioned.",
        skills: [
            {
                name: "BigQuery",
                note: "Partitioning, scheduled queries"
            },
            {
                name: "MySQL"
            },
            {
                name: "DuckDB"
            },
            {
                name: "Git"
            }
        ],
        status: "verified"
    },
    {
        id: "web",
        name: "Web & Full Stack",
        description: "Building the products around the analysis.",
        skills: [
            {
                name: "React & Next.js"
            },
            {
                name: "TypeScript & JavaScript"
            },
            {
                name: "FastAPI"
            },
            {
                name: "Prisma ORM"
            },
            {
                name: "Chrome Extension API"
            },
            {
                name: "HTML & CSS"
            }
        ],
        status: "verified"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bindGameState",
    ()=>bindGameState,
    "clearRoute",
    ()=>clearRoute,
    "fastTravelTo",
    ()=>fastTravelTo,
    "handleAction",
    ()=>handleAction,
    "openDestination",
    ()=>openDestination,
    "recoverVehicle",
    ()=>recoverVehicle,
    "setRouteTo",
    ()=>setRouteTo,
    "startCinematic",
    ()=>startCinematic,
    "startExperience",
    ()=>startExperience,
    "toggleEngine",
    ()=>toggleEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/audio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/input.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function startExperience() {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
    void __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].start().then(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].setVolume(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().volume);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].setMuted(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().muted);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].ignition();
    });
    store.startDriving();
}
function toggleEngine() {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
    const next = !store.engineOn;
    store.setEngine(next);
    if (next) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].ignition();
    store.showToast(next ? "Engine started" : "Engine off");
}
function recoverVehicle() {
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingRecover = true;
}
function openDestination(id) {
    const dest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(id);
    if (!dest) return;
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
    store.markDiscovered(dest.id);
    store.openPanel(dest.section, dest.itemId);
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].blip("open");
}
function setRouteTo(id) {
    const dest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(id);
    if (!dest) return;
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
    const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findRoute"])([
        v.x,
        v.z
    ], [
        dest.access.x,
        dest.access.z
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion++;
    store.setRouteTarget(dest.id);
    store.closeOverlay();
    store.showToast(`Route set to ${dest.name}`);
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].blip("select");
}
function clearRoute() {
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].guidance = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion++;
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().setRouteTarget(null);
}
function fastTravelTo(id) {
    const dest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(id);
    if (!dest) return;
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
    clearRoute();
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingTeleport = {
        x: dest.access.x,
        z: dest.access.z,
        heading: dest.access.heading
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].preferredDestination = dest.id;
    store.closeOverlay();
    store.showToast(`Moved to ${dest.name}`);
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].blip("arrive");
}
function startCinematic() {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
    store.setCameraMode("cinematic");
    store.closeOverlay();
}
function handleAction(action) {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
    if (store.phase === "loading" || store.phase === "error") return;
    if (action === "escape") {
        if (store.overlay !== "none") {
            store.closeOverlay();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].blip("close");
        } else if (store.phase === "driving") {
            store.openOverlay("settings");
        }
        return;
    }
    if (action === "mute") {
        store.setMuted(!store.muted);
        return;
    }
    if (store.phase !== "driving") return;
    if (action === "map") {
        store.toggleOverlay("map");
        return;
    }
    if (action === "controls") {
        store.toggleOverlay("controls");
        return;
    }
    // The remaining actions only make sense while actually driving.
    if (store.overlay !== "none") return;
    switch(action){
        case "interact":
            if (store.nearbyId) openDestination(store.nearbyId);
            break;
        case "camera":
            store.cycleCamera();
            break;
        case "cockpit":
            store.toggleCockpitChase();
            break;
        case "recover":
            recoverVehicle();
            break;
        case "engine":
            toggleEngine();
            break;
    }
}
function bindGameState() {
    const apply = (s)=>{
        const driving = s.phase === "driving" && s.overlay === "none";
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].driving !== driving) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].driving = driving;
            // Whatever was held is released, so the car never moves on its own when
            // an interface closes.
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].releaseAll();
            if (!driving) {
                // Bring the car to rest where it is; position and heading are kept.
                const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
                v.vx = 0;
                v.vz = 0;
                v.speed = 0;
                v.slip = 0;
                v.yawRate = 0;
                v.accel = 0;
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].setMuted(s.muted);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].setVolume(s.volume);
        if (s.phase === "driving" && s.overlay !== "none") __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].suspend();
        else if (s.phase === "driving") __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].resume();
    };
    apply(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState());
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].subscribe(apply);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/audio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Fully synthesised audio: engine, tyres, wind, city ambience, impacts and UI
 * blips are generated with the Web Audio API, so there are no audio files to
 * load or to go missing. The context is created on the first user gesture, as
 * browsers require.
 */ __turbopack_context__.s([
    "AudioEngine",
    ()=>AudioEngine,
    "audio",
    ()=>audio
]);
function noiseBuffer(ctx, seconds) {
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for(let i = 0; i < data.length; i++){
        // Slightly pink noise sounds less harsh than white noise.
        const white = Math.random() * 2 - 1;
        last = (last + 0.04 * white) / 1.04;
        data[i] = white * 0.35 + last * 9;
    }
    return buffer;
}
class AudioEngine {
    ctx = null;
    master = null;
    engineGain = null;
    engineFilter = null;
    oscA = null;
    oscB = null;
    oscC = null;
    tyreGain = null;
    tyreFilter = null;
    windGain = null;
    windFilter = null;
    ambienceGain = null;
    volume = 0.7;
    muted = false;
    lastImpact = 0;
    available = true;
    /** Must be called from a user gesture (click, key press, touch). */ async start() {
        if (this.ctx) {
            if (this.ctx.state === "suspended") await this.ctx.resume().catch(()=>undefined);
            return;
        }
        const Ctor = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.AudioContext ?? window.webkitAudioContext;
        if (!Ctor) {
            this.available = false;
            return;
        }
        try {
            const ctx = new Ctor();
            this.ctx = ctx;
            const master = ctx.createGain();
            master.gain.value = this.muted ? 0 : this.volume;
            const limiter = ctx.createDynamicsCompressor();
            limiter.threshold.value = -10;
            limiter.ratio.value = 8;
            master.connect(limiter).connect(ctx.destination);
            this.master = master;
            // Engine: three detuned oscillators through a low-pass that opens with revs.
            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = 300;
            filter.Q.value = 1.2;
            const gain = ctx.createGain();
            gain.gain.value = 0;
            const mk = (type, level)=>{
                const osc = ctx.createOscillator();
                osc.type = type;
                osc.frequency.value = 40;
                const g = ctx.createGain();
                g.gain.value = level;
                osc.connect(g).connect(filter);
                osc.start();
                return osc;
            };
            this.oscA = mk("sawtooth", 0.5);
            this.oscB = mk("square", 0.22);
            this.oscC = mk("triangle", 0.6);
            filter.connect(gain).connect(master);
            this.engineFilter = filter;
            this.engineGain = gain;
            const noise = noiseBuffer(ctx, 2);
            const loop = (filterType, freq, q)=>{
                const src = ctx.createBufferSource();
                src.buffer = noise;
                src.loop = true;
                const f = ctx.createBiquadFilter();
                f.type = filterType;
                f.frequency.value = freq;
                f.Q.value = q;
                const g = ctx.createGain();
                g.gain.value = 0;
                src.connect(f).connect(g).connect(master);
                src.start();
                return {
                    f,
                    g
                };
            };
            const tyre = loop("bandpass", 1900, 2.2);
            this.tyreGain = tyre.g;
            this.tyreFilter = tyre.f;
            const wind = loop("lowpass", 500, 0.4);
            this.windGain = wind.g;
            this.windFilter = wind.f;
            const ambience = loop("lowpass", 220, 0.3);
            this.ambienceGain = ambience.g;
            ambience.g.gain.value = 0.05;
        } catch  {
            this.available = false;
            this.ctx = null;
        }
    }
    setVolume(volume) {
        this.volume = volume;
        this.applyMaster();
    }
    setMuted(muted) {
        this.muted = muted;
        this.applyMaster();
    }
    applyMaster() {
        if (!this.ctx || !this.master) return;
        this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    suspend() {
        if (this.ctx && this.ctx.state === "running") void this.ctx.suspend().catch(()=>undefined);
    }
    resume() {
        if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume().catch(()=>undefined);
    }
    /** Called every frame while driving. */ update(s, throttle, braking) {
        const ctx = this.ctx;
        if (!ctx || !this.engineGain || !this.engineFilter) return;
        const t = ctx.currentTime;
        const rpm = s.engineOn ? s.rpm : 0;
        const base = 34 + rpm * 150;
        this.oscA?.frequency.setTargetAtTime(base, t, 0.03);
        this.oscB?.frequency.setTargetAtTime(base * 0.5, t, 0.03);
        this.oscC?.frequency.setTargetAtTime(base * 1.5 + 2, t, 0.03);
        this.engineFilter.frequency.setTargetAtTime(240 + rpm * 1700 + throttle * 900, t, 0.05);
        const level = s.engineOn ? 0.07 + rpm * 0.08 + throttle * 0.07 + (s.boosting ? 0.04 : 0) : 0;
        this.engineGain.gain.setTargetAtTime(level, t, 0.06);
        const speed = Math.abs(s.speed);
        const lock = braking && speed > 14 ? 0.25 : 0;
        this.tyreGain?.gain.setTargetAtTime(Math.min(0.26, s.tyreSlip * 0.26 + lock * 0.12), t, 0.05);
        // The squeal rises with speed and with how far sideways the car is.
        this.tyreFilter?.frequency.setTargetAtTime(1500 + speed * 16 + Math.abs(s.slipAngle) * 700, t, 0.08);
        this.windGain?.gain.setTargetAtTime(Math.min(0.2, speed / 60 * 0.2), t, 0.1);
        this.windFilter?.frequency.setTargetAtTime(350 + speed * 22, t, 0.1);
        if (s.impact > 2.5 && s.sinceCollision < 0.05 && t - this.lastImpact > 0.25) {
            this.lastImpact = t;
            this.thud(Math.min(1, s.impact / 18));
        }
    }
    thud(strength) {
        const ctx = this.ctx;
        if (!ctx || !this.master) return;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.exponentialRampToValueAtTime(38, t + 0.18);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.5 * strength + 0.1, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(g).connect(this.master);
        osc.start(t);
        osc.stop(t + 0.25);
    }
    /** Short interface sound. `kind` picks the pitch contour. */ blip(kind = "select") {
        const ctx = this.ctx;
        if (!ctx || !this.master) return;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        osc.type = "sine";
        const [f0, f1] = kind === "open" ? [
            520,
            880
        ] : kind === "close" ? [
            700,
            420
        ] : kind === "arrive" ? [
            660,
            1320
        ] : [
            760,
            760
        ];
        osc.frequency.setValueAtTime(f0, t);
        osc.frequency.exponentialRampToValueAtTime(f1, t + 0.09);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.12, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (kind === "arrive" ? 0.4 : 0.14));
        osc.connect(g).connect(this.master);
        osc.start(t);
        osc.stop(t + 0.45);
    }
    /** Starter motor followed by the engine catching. */ ignition() {
        const ctx = this.ctx;
        if (!ctx || !this.master) return;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(70, t);
        osc.frequency.linearRampToValueAtTime(120, t + 0.45);
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 17;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.06;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.09, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
        lfo.connect(lfoGain).connect(g.gain);
        osc.connect(g).connect(this.master);
        osc.start(t);
        lfo.start(t);
        osc.stop(t + 0.6);
        lfo.stop(t + 0.6);
    }
    dispose() {
        void this.ctx?.close().catch(()=>undefined);
        this.ctx = null;
    }
}
const audio = new AudioEngine();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/collision.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Broad-phase spatial hash and narrow-phase circle tests for the driving physics.
 * The car is approximated by a few circles along its length; the world is made of
 * axis-aligned boxes and circles.
 */ __turbopack_context__.s([
    "ColliderIndex",
    ()=>ColliderIndex,
    "circleContact",
    ()=>circleContact,
    "pointBlocked",
    ()=>pointBlocked
]);
class ColliderIndex {
    cells = new Map();
    size;
    count;
    constructor(colliders, cellSize = 32){
        this.size = cellSize;
        this.count = colliders.length;
        for (const c of colliders){
            const x0 = c.type === "box" ? c.x0 : c.x - c.r;
            const x1 = c.type === "box" ? c.x1 : c.x + c.r;
            const z0 = c.type === "box" ? c.z0 : c.z - c.r;
            const z1 = c.type === "box" ? c.z1 : c.z + c.r;
            const i0 = Math.floor(x0 / cellSize);
            const i1 = Math.floor(x1 / cellSize);
            const j0 = Math.floor(z0 / cellSize);
            const j1 = Math.floor(z1 / cellSize);
            for(let i = i0; i <= i1; i++){
                for(let j = j0; j <= j1; j++){
                    const key = this.key(i, j);
                    const list = this.cells.get(key);
                    if (list) list.push(c);
                    else this.cells.set(key, [
                        c
                    ]);
                }
            }
        }
    }
    key(i, j) {
        return (i + 512) * 4096 + (j + 512);
    }
    /** Calls `visit` for every collider whose cell overlaps the query circle. */ query(x, z, r, visit) {
        const i0 = Math.floor((x - r) / this.size);
        const i1 = Math.floor((x + r) / this.size);
        const j0 = Math.floor((z - r) / this.size);
        const j1 = Math.floor((z + r) / this.size);
        for(let i = i0; i <= i1; i++){
            for(let j = j0; j <= j1; j++){
                const list = this.cells.get(this.key(i, j));
                if (!list) continue;
                for (const c of list)visit(c);
            }
        }
    }
}
function circleContact(x, z, r, c) {
    if (c.type === "circle") {
        const dx = x - c.x;
        const dz = z - c.z;
        const dist = Math.hypot(dx, dz);
        const depth = r + c.r - dist;
        if (depth <= 0) return null;
        if (dist < 1e-6) return {
            nx: 1,
            nz: 0,
            depth
        };
        return {
            nx: dx / dist,
            nz: dz / dist,
            depth
        };
    }
    const px = Math.min(c.x1, Math.max(c.x0, x));
    const pz = Math.min(c.z1, Math.max(c.z0, z));
    const dx = x - px;
    const dz = z - pz;
    const distSq = dx * dx + dz * dz;
    if (distSq > r * r) return null;
    if (distSq > 1e-10) {
        const dist = Math.sqrt(distSq);
        return {
            nx: dx / dist,
            nz: dz / dist,
            depth: r - dist
        };
    }
    // Centre is inside the box: push out through the nearest face.
    const left = x - c.x0;
    const right = c.x1 - x;
    const top = z - c.z0;
    const bottom = c.z1 - z;
    const m = Math.min(left, right, top, bottom);
    if (m === left) return {
        nx: -1,
        nz: 0,
        depth: left + r
    };
    if (m === right) return {
        nx: 1,
        nz: 0,
        depth: right + r
    };
    if (m === top) return {
        nx: 0,
        nz: -1,
        depth: top + r
    };
    return {
        nx: 0,
        nz: 1,
        depth: bottom + r
    };
}
function pointBlocked(index, x, z, r) {
    let hit = false;
    index.query(x, z, r, (c)=>{
        if (!hit && circleContact(x, z, r, c)) hit = true;
    });
    return hit;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/destinations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nearestDestination",
    ()=>nearestDestination
]);
function nearestDestination(destinations, x, z, preferredId = null) {
    let best = null;
    let bestScore = Infinity;
    for (const d of destinations){
        const dist = Math.hypot(x - d.position[0], z - d.position[1]);
        if (dist > d.radius) continue;
        if (d.id === preferredId) return d;
        const score = dist / d.radius;
        if (score < bestScore) {
            bestScore = score;
            best = d;
        }
    }
    return best;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/drift.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Drift scoring. Pure functions over a small state object so the rules can be
 * unit-tested without a renderer.
 *
 * A drift counts while the car is sliding at a real angle and a real speed.
 * Points build with angle, speed and time held; a short grace period lets the
 * car swing from one direction to the other without ending the run. Touching
 * anything loses the points that have not been banked yet.
 */ __turbopack_context__.s([
    "DRIFT_GRACE",
    ()=>DRIFT_GRACE,
    "DRIFT_MAX_MULTIPLIER",
    ()=>DRIFT_MAX_MULTIPLIER,
    "DRIFT_MIN_ANGLE",
    ()=>DRIFT_MIN_ANGLE,
    "DRIFT_MIN_SPEED",
    ()=>DRIFT_MIN_SPEED,
    "createDriftRun",
    ()=>createDriftRun,
    "driftMultiplier",
    ()=>driftMultiplier,
    "updateDriftRun",
    ()=>updateDriftRun
]);
const DRIFT_MIN_ANGLE = 0.2; // ~11.5 degrees
const DRIFT_MIN_SPEED = 7.5; // m/s, 27 km/h
const DRIFT_GRACE = 0.7; // seconds below the threshold before a run ends
const DRIFT_MAX_MULTIPLIER = 5;
function createDriftRun(best = 0) {
    return {
        active: false,
        sliding: false,
        points: 0,
        time: 0,
        multiplier: 1,
        angle: 0,
        gap: 0,
        lastPoints: 0,
        lastLost: false,
        sinceEnd: 99,
        best,
        version: 0
    };
}
function driftMultiplier(time) {
    return Math.min(DRIFT_MAX_MULTIPLIER, 1 + Math.floor(time / 2) * 0.5);
}
function updateDriftRun(run, v, dt) {
    const angle = Math.abs(v.slipAngle);
    run.angle = angle * 180 / Math.PI;
    run.sinceEnd += dt;
    const hit = v.sinceCollision < 0.15;
    run.sliding = !hit && v.speed >= DRIFT_MIN_SPEED && angle >= DRIFT_MIN_ANGLE;
    if (run.active && hit) {
        end(run, true);
        return "lost";
    }
    if (run.sliding) {
        const started = !run.active;
        run.active = true;
        run.gap = 0;
        run.time += dt;
        run.multiplier = driftMultiplier(run.time);
        // About 60 points a second at 70 km/h and 30 degrees, before the multiplier.
        run.points += v.speed * Math.min(run.angle, 60) * 0.1 * run.multiplier * dt;
        return started ? "start" : "none";
    }
    if (run.active) {
        run.gap += dt;
        if (run.gap > DRIFT_GRACE) {
            // Very short slides are not worth announcing.
            if (run.points < 25) {
                reset(run);
                return "none";
            }
            end(run, false);
            return "bank";
        }
    }
    return "none";
}
function reset(run) {
    run.active = false;
    run.sliding = false;
    run.points = 0;
    run.time = 0;
    run.multiplier = 1;
    run.gap = 0;
}
function end(run, lost) {
    run.lastPoints = Math.round(run.points);
    run.lastLost = lost;
    run.sinceEnd = 0;
    run.version++;
    if (!lost && run.lastPoints > run.best) run.best = run.lastPoints;
    reset(run);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/input.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Input manager: merges keyboard, touch and gamepad into one VehicleInput and
 * raises discrete actions (interact, camera, map…).
 *
 * It holds no React state. Components attach it once and the render loop calls
 * `read()` each frame.
 */ __turbopack_context__.s([
    "InputManager",
    ()=>InputManager,
    "input",
    ()=>input,
    "isTextTarget",
    ()=>isTextTarget
]);
const DRIVE_KEYS = new Set([
    "KeyW",
    "KeyA",
    "KeyS",
    "KeyD",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Space",
    "ShiftLeft",
    "ShiftRight"
]);
const ACTION_KEYS = {
    KeyE: "interact",
    Enter: "interact",
    KeyC: "camera",
    KeyV: "cockpit",
    KeyM: "map",
    KeyH: "controls",
    Escape: "escape",
    KeyR: "recover",
    KeyI: "engine",
    KeyN: "mute"
};
function isTextTarget(target) {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}
function deadzone(v, zone = 0.14) {
    if (Math.abs(v) < zone) return 0;
    return Math.sign(v) * (Math.abs(v) - zone) / (1 - zone);
}
class InputManager {
    keys = new Set();
    actionListeners = new Set();
    sourceListeners = new Set();
    padButtons = [];
    lastSource = "keyboard";
    /** Set by the on-screen controls. */ touch = {
        steer: 0,
        throttle: 0,
        brake: 0,
        handbrake: false,
        boost: false
    };
    /** When false, driving keys are ignored and not swallowed (an interface is open). */ driving = false;
    onAction(listener) {
        this.actionListeners.add(listener);
        return ()=>this.actionListeners.delete(listener);
    }
    onSource(listener) {
        this.sourceListeners.add(listener);
        return ()=>this.sourceListeners.delete(listener);
    }
    emit(action) {
        this.actionListeners.forEach((l)=>l(action));
    }
    setSource(source) {
        if (source === this.lastSource) return;
        this.lastSource = source;
        this.sourceListeners.forEach((l)=>l(source));
    }
    noteTouch() {
        this.setSource("touch");
    }
    /** Clears everything that is held. Called when focus is lost or an interface opens. */ releaseAll() {
        this.keys.clear();
        this.touch.steer = 0;
        this.touch.throttle = 0;
        this.touch.brake = 0;
        this.touch.handbrake = false;
        this.touch.boost = false;
    }
    handleKeyDown = (e)=>{
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (isTextTarget(e.target)) return;
        this.setSource("keyboard");
        const action = ACTION_KEYS[e.code];
        if (action) {
            // Enter must keep activating focused buttons and links.
            if (e.code === "Enter" && e.target instanceof HTMLElement && e.target !== document.body) return;
            if (!e.repeat) this.emit(action);
            if (e.code !== "Escape") e.preventDefault();
            return;
        }
        if (!DRIVE_KEYS.has(e.code)) return;
        if (!this.driving) return;
        // Stop the page scrolling on arrows and space while driving.
        e.preventDefault();
        // A key that was already held when driving resumed does not count:
        // the visitor has to press it again, so the car never lurches forward.
        if (e.repeat && !this.keys.has(e.code)) return;
        this.keys.add(e.code);
    };
    handleKeyUp = (e)=>{
        this.keys.delete(e.code);
    };
    attach(target) {
        const release = ()=>this.releaseAll();
        const visibility = ()=>{
            if (document.hidden) this.releaseAll();
        };
        target.addEventListener("keydown", this.handleKeyDown);
        target.addEventListener("keyup", this.handleKeyUp);
        target.addEventListener("blur", release);
        document.addEventListener("visibilitychange", visibility);
        return ()=>{
            target.removeEventListener("keydown", this.handleKeyDown);
            target.removeEventListener("keyup", this.handleKeyUp);
            target.removeEventListener("blur", release);
            document.removeEventListener("visibilitychange", visibility);
            this.releaseAll();
        };
    }
    pollGamepad(out) {
        if (typeof navigator === "undefined" || !navigator.getGamepads) return;
        let pad = null;
        for (const p of navigator.getGamepads()){
            if (p && p.connected) {
                pad = p;
                break;
            }
        }
        if (!pad) return;
        const steer = deadzone(pad.axes[0] ?? 0);
        const throttle = pad.buttons[7]?.value ?? 0;
        const brake = pad.buttons[6]?.value ?? 0;
        if (steer !== 0 || throttle > 0.05 || brake > 0.05) this.setSource("gamepad");
        if (this.driving) {
            if (Math.abs(steer) > Math.abs(out.steer)) out.steer = steer;
            out.throttle = Math.max(out.throttle, throttle);
            out.brake = Math.max(out.brake, brake);
            if (pad.buttons[1]?.pressed) out.handbrake = true;
            if (pad.buttons[2]?.pressed) out.boost = true;
        }
        const map = [
            [
                0,
                "interact"
            ],
            [
                3,
                "camera"
            ],
            [
                8,
                "map"
            ],
            [
                9,
                "escape"
            ],
            [
                5,
                "recover"
            ]
        ];
        for (const [index, action] of map){
            const pressed = pad.buttons[index]?.pressed ?? false;
            if (pressed && !this.padButtons[index]) {
                this.setSource("gamepad");
                this.emit(action);
            }
            this.padButtons[index] = pressed;
        }
    }
    /** Writes the current combined input into `out` and returns it. */ read(out) {
        out.throttle = 0;
        out.brake = 0;
        out.steer = 0;
        out.handbrake = false;
        out.boost = false;
        if (this.driving) {
            const k = this.keys;
            if (k.has("KeyW") || k.has("ArrowUp")) out.throttle = 1;
            if (k.has("KeyS") || k.has("ArrowDown")) out.brake = 1;
            if (k.has("KeyA") || k.has("ArrowLeft")) out.steer -= 1;
            if (k.has("KeyD") || k.has("ArrowRight")) out.steer += 1;
            if (k.has("Space")) out.handbrake = true;
            if (k.has("ShiftLeft") || k.has("ShiftRight")) out.boost = true;
            const t = this.touch;
            if (Math.abs(t.steer) > Math.abs(out.steer)) out.steer = t.steer;
            out.throttle = Math.max(out.throttle, t.throttle);
            out.brake = Math.max(out.brake, t.brake);
            out.handbrake = out.handbrake || t.handbrake;
            out.boost = out.boost || t.boost;
        }
        this.pollGamepad(out);
        return out;
    }
    /** Test helper: is a drive key currently registered as held? */ isHeld(code) {
        return this.keys.has(code);
    }
}
const input = new InputManager();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/navigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Route finding over the road graph.
 *
 * Routes follow real roads: both endpoints are projected onto their nearest road
 * edge and Dijkstra runs over the graph with those two temporary nodes added, so
 * a route never cuts through buildings or across the water.
 */ __turbopack_context__.s([
    "findRoute",
    ()=>findRoute,
    "formatDistance",
    ()=>formatDistance,
    "guidance",
    ()=>guidance,
    "nearestRoadPose",
    ()=>nearestRoadPose,
    "projectToRoad",
    ()=>projectToRoad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
;
function polylineLength(points) {
    let total = 0;
    for(let i = 1; i < points.length; i++){
        total += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    }
    return total;
}
function projectToRoad(x, z) {
    let best = null;
    for (const edge of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROAD_EDGES"]){
        let walked = 0;
        for(let i = 1; i < edge.points.length; i++){
            const [ax, az] = edge.points[i - 1];
            const [bx, bz] = edge.points[i];
            const dx = bx - ax;
            const dz = bz - az;
            const len = Math.hypot(dx, dz);
            const t = len === 0 ? 0 : Math.min(1, Math.max(0, ((x - ax) * dx + (z - az) * dz) / (len * len)));
            const px = ax + dx * t;
            const pz = az + dz * t;
            const distance = Math.hypot(x - px, z - pz);
            if (!best || distance < best.distance) {
                best = {
                    edge,
                    along: walked + len * t,
                    point: [
                        px,
                        pz
                    ],
                    distance,
                    dir: [
                        dx / (len || 1),
                        dz / (len || 1)
                    ]
                };
            }
            walked += len;
        }
    }
    if (!best) throw new Error("Road graph is empty");
    return best;
}
/** Points of an edge between two distances along it, in travel order. */ function slicePolyline(points, from, to) {
    const reverse = from > to;
    const lo = Math.min(from, to);
    const hi = Math.max(from, to);
    const out = [];
    let walked = 0;
    const at = (i, d)=>{
        const [ax, az] = points[i - 1];
        const [bx, bz] = points[i];
        const len = Math.hypot(bx - ax, bz - az) || 1;
        const t = (d - walked) / len;
        return [
            ax + (bx - ax) * t,
            az + (bz - az) * t
        ];
    };
    for(let i = 1; i < points.length; i++){
        const len = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
        const segStart = walked;
        const segEnd = walked + len;
        if (segEnd >= lo && segStart <= hi) {
            if (out.length === 0) out.push(at(i, Math.max(lo, segStart)));
            out.push(at(i, Math.min(hi, segEnd)));
        }
        walked = segEnd;
    }
    return reverse ? out.reverse() : out;
}
function baseAdjacency() {
    const adj = new Map();
    for (const n of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROAD_NODES"])adj.set(n.id, []);
    for (const e of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROAD_EDGES"]){
        adj.get(e.a)?.push({
            to: e.b,
            cost: e.length,
            points: [
                ...e.points
            ]
        });
        adj.get(e.b)?.push({
            to: e.a,
            cost: e.length,
            points: [
                ...e.points
            ].reverse()
        });
    }
    return adj;
}
const BASE = baseAdjacency();
function findRoute(from, to) {
    const start = projectToRoad(from[0], from[1]);
    const goal = projectToRoad(to[0], to[1]);
    const START = "__start";
    const GOAL = "__goal";
    const adj = new Map();
    for (const [k, v] of BASE)adj.set(k, [
        ...v
    ]);
    adj.set(START, []);
    adj.set(GOAL, []);
    const attach = (id, p, outgoing)=>{
        const pts = p.edge.points;
        const total = polylineLength(pts);
        const toA = slicePolyline(pts, p.along, 0);
        const toB = slicePolyline(pts, p.along, total);
        if (outgoing) {
            adj.get(id)?.push({
                to: p.edge.a,
                cost: p.along,
                points: toA
            });
            adj.get(id)?.push({
                to: p.edge.b,
                cost: total - p.along,
                points: toB
            });
        } else {
            adj.get(p.edge.a)?.push({
                to: id,
                cost: p.along,
                points: [
                    ...toA
                ].reverse()
            });
            adj.get(p.edge.b)?.push({
                to: id,
                cost: total - p.along,
                points: [
                    ...toB
                ].reverse()
            });
        }
    };
    attach(START, start, true);
    attach(GOAL, goal, false);
    if (start.edge.id === goal.edge.id) {
        adj.get(START)?.push({
            to: GOAL,
            cost: Math.abs(goal.along - start.along),
            points: slicePolyline(start.edge.points, start.along, goal.along)
        });
    }
    const dist = new Map([
        [
            START,
            0
        ]
    ]);
    const prev = new Map();
    const open = new Set([
        START
    ]);
    const done = new Set();
    while(open.size > 0){
        let current = "";
        let bestCost = Infinity;
        for (const id of open){
            const d = dist.get(id) ?? Infinity;
            if (d < bestCost) {
                bestCost = d;
                current = id;
            }
        }
        if (current === GOAL) break;
        open.delete(current);
        done.add(current);
        for (const link of adj.get(current) ?? []){
            if (done.has(link.to)) continue;
            const cost = bestCost + link.cost;
            if (cost < (dist.get(link.to) ?? Infinity)) {
                dist.set(link.to, cost);
                prev.set(link.to, {
                    from: current,
                    link
                });
                open.add(link.to);
            }
        }
    }
    const legs = [];
    let cursor = GOAL;
    while(cursor !== START){
        const step = prev.get(cursor);
        if (!step) return {
            points: [
                start.point,
                goal.point
            ],
            length: Infinity
        };
        legs.push(step.link.points);
        cursor = step.from;
    }
    legs.reverse();
    const points = [];
    for (const leg of legs){
        for (const p of leg){
            const last = points[points.length - 1];
            if (!last || Math.hypot(last[0] - p[0], last[1] - p[1]) > 0.01) points.push(p);
        }
    }
    if (points.length < 2) points.push(goal.point);
    return {
        points,
        length: dist.get(GOAL) ?? polylineLength(points)
    };
}
function guidance(route, x, z, heading) {
    const pts = route.points;
    let bestSeg = 0;
    let bestDist = Infinity;
    let bestT = 0;
    for(let i = 1; i < pts.length; i++){
        const [ax, az] = pts[i - 1];
        const [bx, bz] = pts[i];
        const dx = bx - ax;
        const dz = bz - az;
        const lenSq = dx * dx + dz * dz || 1;
        const t = Math.min(1, Math.max(0, ((x - ax) * dx + (z - az) * dz) / lenSq));
        const d = Math.hypot(x - (ax + dx * t), z - (az + dz * t));
        if (d < bestDist) {
            bestDist = d;
            bestSeg = i - 1;
            bestT = t;
        }
    }
    const segLen = (i)=>Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    let remaining = segLen(bestSeg) * (1 - bestT);
    for(let i = bestSeg + 1; i < pts.length - 1; i++)remaining += segLen(i);
    // Look for the next change of direction of more than ~35°.
    let distanceToTurn = segLen(bestSeg) * (1 - bestT);
    let instruction = "arrive";
    let turnFound = false;
    const startDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vectorToHeading"])(pts[bestSeg + 1][0] - pts[bestSeg][0], pts[bestSeg + 1][1] - pts[bestSeg][1]);
    for(let i = bestSeg + 1; i < pts.length - 1; i++){
        const dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vectorToHeading"])(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
        const turn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(dir - startDir);
        if (Math.abs(turn) > 0.6) {
            // A heading that decreases is a right turn in this coordinate system.
            instruction = turn < 0 ? "right" : "left";
            turnFound = true;
            break;
        }
        distanceToTurn += segLen(i);
    }
    if (!turnFound) {
        distanceToTurn = remaining;
        instruction = remaining < 25 ? "arrive" : "straight";
    }
    // Aim at a point a little way ahead on the route for the direction arrow.
    let look = 28;
    let ax = pts[bestSeg][0] + (pts[bestSeg + 1][0] - pts[bestSeg][0]) * bestT;
    let az = pts[bestSeg][1] + (pts[bestSeg + 1][1] - pts[bestSeg][1]) * bestT;
    for(let i = bestSeg; i < pts.length - 1 && look > 0; i++){
        const ex = pts[i + 1][0];
        const ez = pts[i + 1][1];
        const d = Math.hypot(ex - ax, ez - az);
        if (d >= look) {
            ax += (ex - ax) / d * look;
            az += (ez - az) / d * look;
            look = 0;
        } else {
            ax = ex;
            az = ez;
            look -= d;
        }
    }
    const bearing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vectorToHeading"])(ax - x, az - z);
    // Heading decreases to the right, so flip the sign to make right positive.
    const relativeBearing = -(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(bearing - heading);
    if (turnFound === false && Math.abs(relativeBearing) > 2.2 && remaining > 25) instruction = "u-turn";
    return {
        remaining,
        relativeBearing,
        instruction,
        distanceToTurn,
        segment: bestSeg
    };
}
function nearestRoadPose(x, z, heading) {
    const p = projectToRoad(x, z);
    let dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vectorToHeading"])(p.dir[0], p.dir[1]);
    if (Math.abs((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(dir - heading)) > Math.PI / 2) dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(dir + Math.PI);
    // Left of travel is (cos h, -sin h).
    return {
        x: p.point[0] + Math.cos(dir) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
        z: p.point[1] - Math.sin(dir) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"],
        heading: dir
    };
}
function formatDistance(metres) {
    if (!Number.isFinite(metres)) return "–";
    if (metres >= 1000) return `${(metres / 1000).toFixed(1)} km`;
    return `${Math.max(0, Math.round(metres / 10) * 10)} m`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/physics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Arcade vehicle model.
 *
 * `stepVehicle` is a pure function of (state, input, dt, world). It is always
 * called with the same fixed dt, so handling does not depend on the display
 * refresh rate. `advanceVehicle` is the accumulator that maps variable frame
 * times onto fixed steps.
 */ __turbopack_context__.s([
    "DEFAULT_TUNING",
    ()=>DEFAULT_TUNING,
    "FIXED_STEP",
    ()=>FIXED_STEP,
    "MAX_FRAME_TIME",
    ()=>MAX_FRAME_TIME,
    "NEUTRAL_INPUT",
    ()=>NEUTRAL_INPUT,
    "WHEEL_RADIUS",
    ()=>WHEEL_RADIUS,
    "advanceVehicle",
    ()=>advanceVehicle,
    "createVehicleState",
    ()=>createVehicleState,
    "gearLabel",
    ()=>gearLabel,
    "placeVehicle",
    ()=>placeVehicle,
    "speedKmh",
    ()=>speedKmh,
    "steerLimit",
    ()=>steerLimit,
    "stepVehicle",
    ()=>stepVehicle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/collision.ts [app-client] (ecmascript)");
;
;
const FIXED_STEP = 1 / 120;
const MAX_FRAME_TIME = 0.1;
const WHEEL_RADIUS = 0.33;
const DEFAULT_TUNING = {
    wheelBase: 2.55,
    maxSpeed: 52,
    maxReverseSpeed: 11,
    boostSpeed: 68,
    engineAccel: 9.5,
    boostAccel: 15,
    brakeDecel: 23,
    reverseAccel: 5.5,
    rollingResistance: 0.35,
    drag: 0.0009,
    engineBrake: 1.3,
    maxSteerLow: 0.58,
    maxSteerHigh: 0.035,
    steerRate: 2.4,
    steerReturnRate: 4.2,
    grip: 9,
    handbrakeGrip: 1.7,
    handbrakeDecel: 6.5,
    driftGrip: 1.5,
    driftMinSpeed: 8,
    driftYaw: 1.3,
    driftAlign: 1.9,
    driftMaxAngle: 0.95,
    driftBuild: 5,
    driftRelease: 1.5,
    restitution: 0.22,
    collisionRadius: 0.95,
    collisionOffsets: [
        1.3,
        0,
        -1.3
    ]
};
/** Peak cornering acceleration the tyres allow, m/s². Shapes speed-sensitive steering. */ const MAX_LATERAL_ACCEL = 12.5;
const GEAR_TOP_SPEEDS = [
    0,
    13,
    23,
    34,
    45,
    72
];
const IDLE_RPM = 0.14;
const NEUTRAL_INPUT = {
    throttle: 0,
    brake: 0,
    steer: 0,
    handbrake: false,
    boost: false
};
function createVehicleState(pose) {
    return {
        x: pose.x,
        z: pose.z,
        y: 0,
        heading: pose.heading,
        vx: 0,
        vz: 0,
        speed: 0,
        slip: 0,
        steerAngle: 0,
        steerSmooth: 0,
        steerVisual: 0,
        drift: 0,
        slipAngle: 0,
        tyreSlip: 0,
        pitch: 0,
        wheelSpin: 0,
        rpm: 0,
        gear: 0,
        boost: 1,
        boosting: false,
        engineOn: false,
        reversing: false,
        sinceCollision: 10,
        impact: 0,
        accel: 0,
        yawRate: 0,
        odometer: 0
    };
}
function steerLimit(speed, tuning = DEFAULT_TUNING) {
    const v = Math.abs(speed);
    if (v < 1) return tuning.maxSteerLow;
    const limit = Math.atan(tuning.wheelBase * MAX_LATERAL_ACCEL / (v * v));
    return Math.min(tuning.maxSteerLow, Math.max(tuning.maxSteerHigh, limit));
}
function approach(current, target, maxDelta) {
    if (current < target) return Math.min(target, current + maxDelta);
    return Math.max(target, current - maxDelta);
}
function clamp01(v) {
    return Math.min(1, Math.max(0, v));
}
function stepVehicle(s, input, dt, world, tuning = DEFAULT_TUNING) {
    const sinH = Math.sin(s.heading);
    const cosH = Math.cos(s.heading);
    // Forward is (sinH, cosH); right is (-cosH, sinH).
    let vF = s.vx * sinH + s.vz * cosH;
    let vL = -s.vx * cosH + s.vz * sinH;
    const vFBefore = vF;
    const throttle = s.engineOn ? clamp01(input.throttle) : 0;
    const brake = clamp01(input.brake);
    const steerIn = Math.min(1, Math.max(-1, input.steer));
    // Boost energy.
    s.boosting = input.boost && throttle > 0.1 && s.boost > 0.02 && vF > 1;
    if (s.boosting) s.boost = Math.max(0, s.boost - dt / 4.5);
    else s.boost = Math.min(1, s.boost + dt / 12);
    // Longitudinal forces.
    s.reversing = false;
    if (throttle > 0) {
        if (vF < -0.4) {
            vF = Math.min(0, vF + tuning.brakeDecel * throttle * dt);
        } else {
            const top = s.boosting ? tuning.boostSpeed : tuning.maxSpeed;
            const power = s.boosting ? tuning.boostAccel : tuning.engineAccel;
            const fade = Math.max(0, 1 - Math.pow(Math.max(0, vF) / top, 1.7));
            vF += power * throttle * fade * dt;
        }
    }
    if (brake > 0) {
        if (vF > 0.4) {
            vF = Math.max(0, vF - tuning.brakeDecel * brake * dt);
        } else if (throttle === 0 && s.engineOn) {
            s.reversing = true;
            const fade = Math.max(0, 1 - Math.abs(Math.min(0, vF)) / tuning.maxReverseSpeed);
            vF -= tuning.reverseAccel * brake * fade * dt;
        } else if (vF > 0) {
            vF = Math.max(0, vF - tuning.brakeDecel * brake * dt);
        }
    }
    // Passive resistance never reverses the direction of travel.
    const coasting = throttle === 0 && !s.reversing;
    let resist = tuning.rollingResistance + tuning.drag * vF * vF + (coasting ? tuning.engineBrake : 0);
    if (input.handbrake) resist += tuning.handbrakeDecel;
    if (vF > 0) vF = Math.max(0, vF - resist * dt);
    else if (vF < 0) vF = Math.min(0, vF + resist * dt);
    // Drift state. The rear lets go when the handbrake is pulled while steering
    // at speed, or under boost at full lock. Once it is sliding, throttle and
    // steering hold the slide; easing off either lets the tyres grip again.
    const travel = Math.hypot(vF, vL);
    const beta = travel > 2 && vF > 0 ? Math.atan2(vL, vF) : 0;
    const absBeta = Math.abs(beta);
    s.steerSmooth = approach(s.steerSmooth, steerIn, 5 * dt);
    let loose = 0;
    if (vF > tuning.driftMinSpeed) {
        if (input.handbrake && (Math.abs(steerIn) > 0.15 || absBeta > 0.08)) loose = 1;
        else if (s.boosting && Math.abs(steerIn) > 0.8 && vF < 42) loose = 0.85;
        if (s.drift > 0.25 && throttle > 0.2) {
            const held = clamp01((absBeta - 0.05) / 0.2);
            const steered = Math.abs(steerIn) > 0.5 ? 0.6 : 0;
            loose = Math.max(loose, held, steered);
        }
    }
    s.drift = approach(s.drift, loose, (loose > s.drift ? tuning.driftBuild : tuning.driftRelease) * dt);
    // Lateral grip: sideways speed bleeds off quickly unless the rear is loose.
    let grip = tuning.grip + (tuning.driftGrip - tuning.grip) * s.drift;
    if (input.handbrake) grip = Math.min(grip, tuning.handbrakeGrip);
    vL *= Math.exp(-grip * dt);
    // Steering with a speed-dependent limit and a faster return to centre.
    const target = steerIn * steerLimit(vF, tuning);
    const returning = Math.abs(target) < Math.abs(s.steerAngle) || Math.sign(target) !== Math.sign(s.steerAngle);
    s.steerAngle = approach(s.steerAngle, target, (returning ? tuning.steerReturnRate : tuning.steerRate) * dt);
    // Bicycle-model yaw. Positive steer turns right, which decreases the heading.
    let yawRate = -vF / tuning.wheelBase * Math.tan(s.steerAngle);
    if (input.handbrake) yawRate *= 1.25;
    if (s.drift > 0.001 && vF > 2) {
        // Sliding rear tyres let the steering rotate the car past the grip limit,
        // while the slide itself pulls the nose back toward the direction of travel.
        // The balance of the two is the drift angle, so more lock means more angle
        // and opposite lock straightens the car.
        yawRate -= s.steerSmooth * tuning.driftYaw * s.drift * Math.min(1, vF / 14);
        yawRate -= beta * tuning.driftAlign * s.drift;
    }
    // Past the maximum angle the car fights the spin, whatever the inputs.
    if (absBeta > tuning.driftMaxAngle) yawRate -= Math.sign(beta) * (absBeta - tuning.driftMaxAngle) * 9;
    s.yawRate = yawRate;
    // Velocity stays in world space; the heading turns underneath it, which is
    // what produces a little slip in corners and a lot under the handbrake.
    s.vx = sinH * vF - cosH * vL;
    s.vz = cosH * vF + sinH * vL;
    s.heading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(s.heading + yawRate * dt);
    s.x += s.vx * dt;
    s.z += s.vz * dt;
    resolveCollisions(s, dt, world, tuning);
    // Follow the ground: sample under both axles for height and pitch.
    const fx = Math.sin(s.heading);
    const fz = Math.cos(s.heading);
    const front = world.groundHeight(s.x + fx * 1.33, s.z + fz * 1.33);
    const rear = world.groundHeight(s.x - fx * 1.22, s.z - fz * 1.22);
    const k = 1 - Math.exp(-22 * dt);
    s.y += ((front + rear) / 2 - s.y) * k;
    s.pitch += (Math.atan2(front - rear, tuning.wheelBase) - s.pitch) * k;
    // Derived quantities for rendering, audio and the HUD.
    s.speed = s.vx * fx + s.vz * fz;
    s.slip = -s.vx * fz + s.vz * fx;
    s.slipAngle = s.speed > 2 ? Math.atan2(s.slip, s.speed) : 0;
    const sliding = clamp01((Math.abs(s.slip) - 1.8) / 5) * clamp01(Math.abs(s.speed) / 6);
    const locked = input.handbrake && Math.abs(s.speed) > 5 ? 0.55 : 0;
    s.tyreSlip += (Math.max(sliding, locked) - s.tyreSlip) * (1 - Math.exp(-10 * dt));
    const lock = steerLimit(s.speed, tuning);
    const shown = s.steerAngle + (s.steerSmooth * Math.max(lock, 0.5) - s.steerAngle) * s.drift;
    s.steerVisual = approach(s.steerVisual, shown, 3.5 * dt);
    s.accel = (s.speed - vFBefore) / dt;
    s.wheelSpin += s.speed * dt / WHEEL_RADIUS;
    s.odometer += Math.abs(s.speed) * dt;
    s.sinceCollision += dt;
    s.impact *= Math.exp(-4 * dt);
    updateDrivetrain(s, throttle, dt, tuning);
    if (!Number.isFinite(s.x) || !Number.isFinite(s.z) || !Number.isFinite(s.heading)) {
        s.x = 0;
        s.z = 0;
        s.heading = Math.PI;
        s.vx = 0;
        s.vz = 0;
    }
    s.x = Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_BOUNDS"].x1, Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_BOUNDS"].x0, s.x));
    s.z = Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_BOUNDS"].z1, Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_BOUNDS"].z0, s.z));
}
function resolveCollisions(s, dt, world, tuning) {
    const r = tuning.collisionRadius;
    let touched = false;
    for(let pass = 0; pass < 2; pass++){
        const fx = Math.sin(s.heading);
        const fz = Math.cos(s.heading);
        for (const offset of tuning.collisionOffsets){
            const cx = s.x + fx * offset;
            const cz = s.z + fz * offset;
            world.colliders.query(cx, cz, r, (c)=>{
                const contact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["circleContact"])(s.x + fx * offset, s.z + fz * offset, r, c);
                if (!contact) return;
                touched = true;
                s.x += contact.nx * contact.depth;
                s.z += contact.nz * contact.depth;
                const vn = s.vx * contact.nx + s.vz * contact.nz;
                if (vn < 0) {
                    s.vx -= (1 + tuning.restitution) * vn * contact.nx;
                    s.vz -= (1 + tuning.restitution) * vn * contact.nz;
                    // Scrubbing along the obstacle costs a little speed, more for harder hits.
                    const scrub = 1 - Math.min(0.35, -vn * 0.02);
                    s.vx *= scrub;
                    s.vz *= scrub;
                    if (-vn > s.impact) s.impact = -vn;
                }
            });
        }
    }
    if (!touched) return;
    s.sinceCollision = 0;
    // Ease the nose along the direction of travel so the car glances off walls
    // instead of grinding into them. This is a bounded correction, never a spin.
    const speed = Math.hypot(s.vx, s.vz);
    if (speed > 2) {
        const forward = s.vx * Math.sin(s.heading) + s.vz * Math.cos(s.heading);
        const travel = forward >= 0 ? Math.atan2(s.vx, s.vz) : Math.atan2(-s.vx, -s.vz);
        const diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(travel - s.heading);
        if (Math.abs(diff) < 1.1) s.heading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(s.heading + diff * Math.min(1, 3.5 * dt));
    }
}
function updateDrivetrain(s, throttle, dt, tuning) {
    let target = 0;
    if (!s.engineOn) {
        s.gear = 0;
    } else if (s.speed < -0.3 || s.reversing) {
        s.gear = -1;
        target = IDLE_RPM + Math.abs(s.speed) / tuning.maxReverseSpeed * 0.5;
    } else {
        const v = Math.max(0, s.speed);
        let gear = Math.max(1, s.gear);
        // Hysteresis keeps the gearbox from hunting around a shift point.
        while(gear < 5 && v > GEAR_TOP_SPEEDS[gear] * 0.96)gear++;
        while(gear > 1 && v < GEAR_TOP_SPEEDS[gear - 1] * 0.78)gear--;
        s.gear = v < 0.3 && throttle === 0 ? 0 : gear;
        const lo = GEAR_TOP_SPEEDS[gear - 1] * 0.55;
        const hi = GEAR_TOP_SPEEDS[gear];
        const band = clamp01((v - lo) / (hi - lo));
        target = IDLE_RPM + band * 0.78 + throttle * 0.08;
        if (v < 1) target = Math.max(target, IDLE_RPM + throttle * 0.3);
    }
    s.rpm += (target - s.rpm) * (1 - Math.exp(-(target > s.rpm ? 7 : 4) * dt));
}
function advanceVehicle(s, input, frameDt, accumulator, world, tuning = DEFAULT_TUNING) {
    let acc = accumulator + Math.min(Math.max(frameDt, 0), MAX_FRAME_TIME);
    while(acc >= FIXED_STEP){
        stepVehicle(s, input, FIXED_STEP, world, tuning);
        acc -= FIXED_STEP;
    }
    return acc;
}
function placeVehicle(s, pose, world) {
    s.x = pose.x;
    s.z = pose.z;
    s.heading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(pose.heading);
    s.vx = 0;
    s.vz = 0;
    s.speed = 0;
    s.slip = 0;
    s.steerAngle = 0;
    s.steerSmooth = 0;
    s.steerVisual = 0;
    s.drift = 0;
    s.slipAngle = 0;
    s.tyreSlip = 0;
    s.yawRate = 0;
    s.accel = 0;
    s.impact = 0;
    s.sinceCollision = 10;
    s.reversing = false;
    if (world) {
        s.y = world.groundHeight(pose.x, pose.z);
        s.pitch = 0;
    }
}
function speedKmh(s) {
    return Math.abs(s.speed) * 3.6;
}
function gearLabel(s) {
    if (!s.engineOn) return "P";
    if (s.gear < 0) return "R";
    if (s.gear === 0) return "N";
    return String(s.gear);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/rng.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Small deterministic PRNG (mulberry32) so the city is identical on every load. */ __turbopack_context__.s([
    "createRng",
    ()=>createRng,
    "hashString",
    ()=>hashString
]);
function createRng(seed) {
    let a = seed >>> 0;
    const next = ()=>{
        a = a + 0x6d2b79f5 >>> 0;
        let t = a;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    return {
        next,
        range: (min, max)=>min + (max - min) * next(),
        int: (min, max)=>Math.floor(min + (max - min + 1) * next()),
        pick: (items)=>items[Math.floor(next() * items.length)],
        chance: (p)=>next() < p
    };
}
function hashString(s) {
    let h = 2166136261;
    for(let i = 0; i < s.length; i++){
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/runtime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mutable, non-React state that changes every frame.
 *
 * Vehicle motion, the camera and guidance are updated inside the render loop
 * and read directly by the HUD through refs, so driving never triggers React
 * re-renders. Only slow-changing facts (district, nearby landmark…) go into the
 * zustand store.
 */ __turbopack_context__.s([
    "resetRuntime",
    ()=>resetRuntime,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$drift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/drift.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/physics.ts [app-client] (ecmascript)");
;
;
;
const runtime = {
    vehicle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createVehicleState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN"]),
    world: null,
    lastSafe: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN"]
    },
    route: null,
    routeVersion: 0,
    guidance: null,
    look: {
        yaw: 0,
        pitch: 0,
        idle: 0
    },
    pendingTeleport: null,
    pendingRecover: false,
    preferredDestination: null,
    stats: {
        fps: 0,
        calls: 0,
        triangles: 0,
        frameMs: 0,
        skidMarks: 0,
        smoke: false
    },
    stuckTimer: 0,
    drift: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$drift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDriftRun"])(),
    cameraOverride: null
};
function resetRuntime() {
    runtime.vehicle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createVehicleState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN"]);
    runtime.lastSafe = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN"]
    };
    runtime.route = null;
    runtime.routeVersion++;
    runtime.guidance = null;
    runtime.look = {
        yaw: 0,
        pitch: 0,
        idle: 0
    };
    runtime.pendingTeleport = null;
    runtime.pendingRecover = false;
    runtime.preferredDestination = null;
    runtime.stuckTimer = 0;
    runtime.drift = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$drift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDriftRun"])(runtime.drift.best);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOADING_STAGES",
    ()=>LOADING_STAGES,
    "isDrivingActive",
    ()=>isDrivingActive,
    "useGameStore",
    ()=>useGameStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
"use client";
;
;
const LOADING_STAGES = [
    {
        id: "app",
        label: "Initializing application"
    },
    {
        id: "vehicle",
        label: "Loading vehicle assets"
    },
    {
        id: "city",
        label: "Preparing the city"
    },
    {
        id: "environment",
        label: "Loading environment textures"
    },
    {
        id: "controls",
        label: "Initializing controls"
    },
    {
        id: "experience",
        label: "Preparing the experience"
    }
];
const CAMERA_ORDER = [
    "cockpit",
    "chase",
    "cinematic"
];
const initialStages = ()=>({
        app: "active",
        vehicle: "pending",
        city: "pending",
        environment: "pending",
        controls: "pending",
        experience: "pending"
    });
let toastId = 0;
const useGameStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        phase: "loading",
        overlay: "none",
        panel: null,
        stages: initialStages(),
        error: null,
        cameraMode: "cockpit",
        quality: "medium",
        qualityAuto: true,
        timeOfDay: "golden",
        muted: false,
        volume: 0.7,
        introSeen: false,
        bestDrift: 0,
        discovered: [],
        engineOn: false,
        nearbyId: null,
        district: "waterfront",
        routeTargetId: null,
        inputMode: "keyboard",
        reducedMotion: false,
        touchDevice: false,
        stuck: false,
        toast: null,
        flyoverNonce: 0,
        setStage: (id, status)=>set((s)=>({
                    stages: {
                        ...s.stages,
                        [id]: status
                    }
                })),
        fail: (message)=>set({
                phase: "error",
                error: message
            }),
        setPhase: (phase)=>set({
                phase
            }),
        startDriving: ()=>set((s)=>({
                    phase: "driving",
                    overlay: "none",
                    panel: null,
                    engineOn: true,
                    flyoverNonce: s.introSeen || s.reducedMotion ? s.flyoverNonce : s.flyoverNonce + 1,
                    introSeen: true
                })),
        returnToIntro: ()=>set({
                phase: "intro",
                overlay: "none",
                panel: null
            }),
        openPanel: (section, itemId)=>set({
                overlay: "panel",
                panel: {
                    section,
                    itemId
                }
            }),
        openOverlay: (overlay)=>set({
                overlay,
                panel: null
            }),
        toggleOverlay: (overlay)=>set((s)=>s.overlay === overlay ? {
                    overlay: "none"
                } : {
                    overlay,
                    panel: null
                }),
        closeOverlay: ()=>set({
                overlay: "none",
                panel: null
            }),
        setCameraMode: (cameraMode)=>set({
                cameraMode: CAMERA_ORDER.includes(cameraMode) ? cameraMode : "chase"
            }),
        cycleCamera: ()=>{
            const i = CAMERA_ORDER.indexOf(get().cameraMode);
            set({
                cameraMode: CAMERA_ORDER[(i + 1) % CAMERA_ORDER.length]
            });
        },
        toggleCockpitChase: ()=>set((s)=>({
                    cameraMode: s.cameraMode === "cockpit" ? "chase" : "cockpit"
                })),
        setQuality: (quality, auto = false)=>set({
                quality,
                qualityAuto: auto
            }),
        setTimeOfDay: (timeOfDay)=>set({
                timeOfDay
            }),
        setMuted: (muted)=>set({
                muted
            }),
        setVolume: (volume)=>set({
                volume: Math.min(1, Math.max(0, volume))
            }),
        setBestDrift: (points)=>set((s)=>({
                    bestDrift: Math.max(s.bestDrift, Math.round(points))
                })),
        setEngine: (engineOn)=>set({
                engineOn
            }),
        setNearby: (nearbyId)=>{
            if (get().nearbyId !== nearbyId) set({
                nearbyId
            });
        },
        setDistrict: (district)=>{
            if (get().district !== district) set({
                district
            });
        },
        setRouteTarget: (routeTargetId)=>set({
                routeTargetId
            }),
        markDiscovered: (id)=>{
            if (!get().discovered.includes(id)) set((s)=>({
                    discovered: [
                        ...s.discovered,
                        id
                    ]
                }));
        },
        setInputMode: (inputMode)=>{
            if (get().inputMode !== inputMode) set({
                inputMode
            });
        },
        setDevice: ({ reducedMotion, touch })=>set((s)=>({
                    reducedMotion,
                    touchDevice: touch,
                    inputMode: touch ? "touch" : s.inputMode
                })),
        setStuck: (stuck)=>{
            if (get().stuck !== stuck) set({
                stuck
            });
        },
        showToast: (text)=>set({
                toast: {
                    id: ++toastId,
                    text
                }
            }),
        clearToast: (id)=>{
            if (get().toast?.id === id) set({
                toast: null
            });
        }
    }), {
    name: "abhishek-world-settings",
    version: 1,
    partialize: (s)=>({
            cameraMode: s.cameraMode,
            quality: s.quality,
            qualityAuto: s.qualityAuto,
            timeOfDay: s.timeOfDay,
            muted: s.muted,
            volume: s.volume,
            introSeen: s.introSeen,
            bestDrift: s.bestDrift,
            discovered: s.discovered
        })
}));
function isDrivingActive(s) {
    return s.phase === "driving" && s.overlay === "none";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/three/merge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Merger",
    ()=>Merger,
    "disposeObject",
    ()=>disposeObject,
    "mat4",
    ()=>mat4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js [app-client] (ecmascript)");
;
;
function mat4(p, r = [
    0,
    0,
    0
], s = [
    1,
    1,
    1
]) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().compose(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...p), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromEuler(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](...r)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...s));
}
class Merger {
    sets = new Map();
    add(geometry, material, matrix) {
        let g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
        geometry.dispose();
        if (!g.getAttribute("normal")) g.computeVertexNormals();
        if (!g.getAttribute("uv")) {
            g.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(g.getAttribute("position").count * 2), 2));
        }
        for (const name of Object.keys(g.attributes)){
            if (name !== "position" && name !== "normal" && name !== "uv") g.deleteAttribute(name);
        }
        g.clearGroups();
        if (matrix) g = g.applyMatrix4(matrix);
        const list = this.sets.get(material);
        if (list) list.push(g);
        else this.sets.set(material, [
            g
        ]);
    }
    box(material, w, h, d, x, y, z, rotY = 0) {
        this.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](w, h, d), material, mat4([
            x,
            y + h / 2,
            z
        ], [
            0,
            rotY,
            0
        ]));
    }
    build(parent, options = {}) {
        const meshes = [];
        for (const [material, list] of this.sets){
            const merged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeGeometries"])(list, false);
            list.forEach((g)=>g.dispose());
            if (!merged) continue;
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](merged, material);
            mesh.castShadow = options.castShadow ?? false;
            mesh.receiveShadow = options.receiveShadow ?? false;
            parent.add(mesh);
            meshes.push(mesh);
        }
        this.sets.clear();
        return meshes;
    }
}
function disposeObject(root) {
    const materials = new Set();
    root.traverse((obj)=>{
        const mesh = obj;
        mesh.geometry?.dispose();
        const m = mesh.material;
        if (Array.isArray(m)) m.forEach((x)=>materials.add(x));
        else if (m) materials.add(m);
    });
    materials.forEach((m)=>{
        // Textures flagged as shared belong to the world texture set and are freed there.
        if (!m.userData.sharedMap) m.map?.dispose();
        m.dispose();
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/deviceCapabilities.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectDevice",
    ()=>detectDevice
]);
function detectDevice() {
    const nav = typeof navigator === "undefined" ? undefined : navigator;
    const touch = !!nav && (nav.maxTouchPoints > 0 || "ontouchstart" in window);
    const ua = nav?.userAgent ?? "";
    const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || touch && Math.min(window.innerWidth, window.innerHeight) < 820;
    const reducedMotion = ("TURBOPACK compile-time value", "object") !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    let webgl = false;
    let renderer = "";
    try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        if (gl) {
            webgl = true;
            const info = gl.getExtension("WEBGL_debug_renderer_info");
            renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
    } catch  {
        webgl = false;
    }
    const softwareRenderer = /swiftshader|llvmpipe|software|basic render/i.test(renderer);
    const memory = nav?.deviceMemory ?? 8;
    const cores = nav?.hardwareConcurrency ?? 4;
    const integrated = /intel|uhd|iris|mali|adreno|powervr|apple gpu/i.test(renderer) && !/rtx|gtx|radeon rx|arc a/i.test(renderer);
    let recommended = "high";
    if (softwareRenderer || memory <= 2 || cores <= 2) recommended = "low";
    else if (mobile) recommended = memory >= 6 && cores >= 8 ? "medium" : "low";
    else if (integrated || memory <= 4 || cores <= 4) recommended = "medium";
    return {
        webgl,
        touch,
        mobile,
        softwareRenderer,
        renderer,
        recommended,
        reducedMotion
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/performance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QUALITY",
    ()=>QUALITY,
    "QUALITY_LEVELS",
    ()=>QUALITY_LEVELS
]);
const QUALITY = {
    low: {
        label: "Low",
        description: "Best for phones and older laptops",
        maxDpr: 1,
        shadows: false,
        shadowMapSize: 512,
        shadowRange: 60,
        bloom: false,
        vignette: false,
        antialias: false,
        drawDistance: 900,
        propDensity: 0.4,
        decorativeLights: false,
        headlightBeam: false,
        richMaterials: false
    },
    medium: {
        label: "Medium",
        description: "Balanced detail and frame rate",
        maxDpr: 1.5,
        shadows: true,
        shadowMapSize: 1024,
        shadowRange: 90,
        bloom: true,
        vignette: true,
        antialias: true,
        drawDistance: 1500,
        propDensity: 0.75,
        decorativeLights: true,
        headlightBeam: true,
        richMaterials: true
    },
    high: {
        label: "High",
        description: "Full detail for dedicated graphics",
        maxDpr: 2,
        shadows: true,
        shadowMapSize: 2048,
        shadowRange: 130,
        bloom: true,
        vignette: true,
        antialias: true,
        drawDistance: 2400,
        propDensity: 1,
        decorativeLights: true,
        headlightBeam: true,
        richMaterials: true
    }
};
const QUALITY_LEVELS = [
    "low",
    "medium",
    "high"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/world/cityGen.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Deterministic procedural city generation.
 *
 * Produces plain data (boxes, prop points and colliders) from the layout. The
 * renderer turns it into instanced meshes; the physics uses the colliders.
 * Nothing here touches three.js, so it runs in unit tests as well.
 */ __turbopack_context__.s([
    "generateCity",
    ()=>generateCity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/rng.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$footprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/footprints.ts [app-client] (ecmascript)");
;
;
;
function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [
        (n >> 16 & 255) / 255,
        (n >> 8 & 255) / 255,
        (n & 255) / 255
    ];
}
const GLASS_TINTS = [
    [
        0.26,
        0.38,
        0.54
    ],
    [
        0.16,
        0.22,
        0.32
    ],
    [
        0.34,
        0.48,
        0.6
    ],
    [
        0.14,
        0.2,
        0.28
    ],
    [
        0.44,
        0.54,
        0.64
    ],
    [
        0.2,
        0.36,
        0.44
    ],
    [
        0.3,
        0.32,
        0.46
    ]
];
const STONE_TINTS = [
    [
        0.62,
        0.57,
        0.5
    ],
    [
        0.5,
        0.48,
        0.46
    ],
    [
        0.7,
        0.66,
        0.6
    ],
    [
        0.4,
        0.38,
        0.38
    ],
    [
        0.6,
        0.5,
        0.42
    ],
    [
        0.46,
        0.5,
        0.56
    ]
];
const CREATIVE_TINTS = [
    [
        0.7,
        0.36,
        0.46
    ],
    [
        0.38,
        0.32,
        0.58
    ],
    [
        0.78,
        0.58,
        0.34
    ],
    [
        0.26,
        0.5,
        0.54
    ],
    [
        0.72,
        0.7,
        0.68
    ],
    [
        0.24,
        0.26,
        0.36
    ]
];
const CONTAINER_TINTS = [
    [
        0.72,
        0.16,
        0.12
    ],
    [
        0.12,
        0.32,
        0.55
    ],
    [
        0.85,
        0.52,
        0.1
    ],
    [
        0.16,
        0.45,
        0.32
    ],
    [
        0.75,
        0.75,
        0.72
    ],
    [
        0.3,
        0.32,
        0.36
    ]
];
const PROFILES = {
    central: {
        minH: 80,
        maxH: 215,
        styles: [
            0,
            0,
            3,
            1
        ],
        tints: GLASS_TINTS,
        maxLot: 48,
        park: 0.06,
        lit: [
            0.35,
            0.7
        ]
    },
    career: {
        minH: 55,
        maxH: 165,
        styles: [
            1,
            0,
            0,
            3
        ],
        tints: [
            ...GLASS_TINTS,
            ...STONE_TINTS.slice(0, 3)
        ],
        maxLot: 46,
        park: 0.05,
        lit: [
            0.3,
            0.65
        ]
    },
    projects: {
        minH: 24,
        maxH: 100,
        styles: [
            4,
            1,
            0,
            3
        ],
        tints: [
            ...GLASS_TINTS,
            [
                0.7,
                0.72,
                0.76
            ]
        ],
        maxLot: 46,
        park: 0.08,
        lit: [
            0.2,
            0.5
        ]
    },
    creative: {
        minH: 20,
        maxH: 86,
        styles: [
            2,
            1,
            3,
            0
        ],
        tints: CREATIVE_TINTS,
        maxLot: 40,
        park: 0.1,
        lit: [
            0.3,
            0.6
        ]
    },
    knowledge: {
        minH: 16,
        maxH: 56,
        styles: [
            2,
            1,
            1
        ],
        tints: STONE_TINTS,
        maxLot: 40,
        park: 0.16,
        lit: [
            0.25,
            0.5
        ]
    },
    media: {
        minH: 34,
        maxH: 125,
        styles: [
            0,
            3,
            1
        ],
        tints: GLASS_TINTS,
        maxLot: 44,
        park: 0.06,
        lit: [
            0.35,
            0.7
        ]
    },
    contact: {
        minH: 18,
        maxH: 66,
        styles: [
            2,
            1,
            0
        ],
        tints: [
            ...STONE_TINTS,
            ...GLASS_TINTS
        ],
        maxLot: 40,
        park: 0.14,
        lit: [
            0.3,
            0.6
        ]
    },
    waterfront: {
        minH: 14,
        maxH: 50,
        styles: [
            2,
            2,
            1,
            0
        ],
        tints: [
            ...STONE_TINTS,
            ...GLASS_TINTS.slice(0, 2)
        ],
        maxLot: 40,
        park: 0.18,
        lit: [
            0.35,
            0.65
        ]
    }
};
function splitLots(rect, maxLot, rng, out) {
    const w = rect.x1 - rect.x0;
    const d = rect.z1 - rect.z0;
    if (w <= maxLot && d <= maxLot) {
        out.push(rect);
        return;
    }
    const alongX = w === d ? rng.chance(0.5) : w > d;
    const t = rng.range(0.42, 0.58);
    if (alongX) {
        const m = rect.x0 + w * t;
        splitLots({
            ...rect,
            x1: m
        }, maxLot, rng, out);
        splitLots({
            ...rect,
            x0: m
        }, maxLot, rng, out);
    } else {
        const m = rect.z0 + d * t;
        splitLots({
            ...rect,
            z1: m
        }, maxLot, rng, out);
        splitLots({
            ...rect,
            z0: m
        }, maxLot, rng, out);
    }
}
function distToRect(r, x, z) {
    const dx = Math.max(r.x0 - x, 0, x - r.x1);
    const dz = Math.max(r.z0 - z, 0, z - r.z1);
    return Math.hypot(dx, dz);
}
function inset(r, m) {
    return {
        x0: r.x0 + m,
        z0: r.z0 + m,
        x1: r.x1 - m,
        z1: r.z1 - m
    };
}
function addPark(ctx, lot) {
    const { rng } = ctx;
    const area = inset(lot, 3);
    ctx.parks.push(area);
    const count = Math.round((area.x1 - area.x0) * (area.z1 - area.z0) / 150);
    for(let i = 0; i < count; i++){
        const x = rng.range(area.x0 + 2, area.x1 - 2);
        const z = rng.range(area.z0 + 2, area.z1 - 2);
        ctx.trees.push({
            x,
            z,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
            rot: rng.range(0, Math.PI * 2),
            scale: rng.range(0.8, 1.5)
        });
        ctx.colliders.push({
            type: "circle",
            x,
            z,
            r: 0.45
        });
    }
}
function addBuilding(ctx, lot, district, heightScale) {
    const { rng } = ctx;
    const p = PROFILES[district];
    const gap = rng.range(2.5, 5);
    const f = inset(lot, gap);
    const fw = f.x1 - f.x0;
    const fd = f.z1 - f.z0;
    if (fw < 12 || fd < 12) return;
    const cx = (f.x0 + f.x1) / 2;
    const cz = (f.z0 + f.z1) / 2;
    const dCenter = Math.hypot(cx - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x, cz - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z);
    const falloff = Math.min(1, Math.max(0.35, 1.15 - dCenter / 560));
    const h = Math.round((p.minH + (p.maxH - p.minH) * Math.pow(rng.next(), 1.6)) * falloff * heightScale);
    const style = rng.pick(p.styles);
    const tint = rng.pick(p.tints);
    const accent = hexToRgb((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDistrict"])(district).color);
    const lit = rng.range(p.lit[0], p.lit[1]);
    const seed = rng.int(1, 999);
    const hasAccent = rng.chance(style === 3 || style === 4 ? 0.9 : 0.4);
    const acc = hasAccent ? accent : [
        0,
        0,
        0
    ];
    const base = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"];
    ctx.colliders.push({
        type: "box",
        x0: f.x0,
        x1: f.x1,
        z0: f.z0,
        z1: f.z1
    });
    if (h < 36) {
        ctx.buildings.push({
            x: cx,
            z: cz,
            y: base,
            w: fw,
            d: fd,
            h,
            style,
            seed,
            tint,
            accent: acc,
            lit
        });
        if (rng.chance(0.6)) {
            ctx.roofProps.push({
                x: cx + rng.range(-fw * 0.2, fw * 0.2),
                z: cz + rng.range(-fd * 0.2, fd * 0.2),
                y: base + h,
                w: rng.range(4, 8),
                d: rng.range(4, 8),
                h: rng.range(2, 4),
                style: 6,
                seed,
                tint: [
                    0.3,
                    0.31,
                    0.33
                ],
                accent: [
                    0,
                    0,
                    0
                ],
                lit: 0
            });
        }
        return;
    }
    // Podium with a lit ground floor, then a tower that steps in once or twice.
    const podiumH = rng.range(8, 14);
    ctx.buildings.push({
        x: cx,
        z: cz,
        y: base,
        w: fw,
        d: fd,
        h: podiumH,
        style: 5,
        seed,
        tint,
        accent: [
            0,
            0,
            0
        ],
        lit: 0.9
    });
    const tw = fw * rng.range(0.62, 0.86);
    const td = fd * rng.range(0.62, 0.86);
    const tx = cx + rng.range(-1, 1) * (fw - tw) * 0.4;
    const tz = cz + rng.range(-1, 1) * (fd - td) * 0.4;
    const stepped = h > 95 && rng.chance(0.7);
    const lowerH = stepped ? h * rng.range(0.62, 0.78) : h;
    ctx.buildings.push({
        x: tx,
        z: tz,
        y: base + podiumH,
        w: tw,
        d: td,
        h: lowerH - podiumH,
        style,
        seed,
        tint,
        accent: acc,
        lit
    });
    let topW = tw;
    let topD = td;
    let topY = base + lowerH;
    if (stepped) {
        topW = tw * rng.range(0.6, 0.8);
        topD = td * rng.range(0.6, 0.8);
        ctx.buildings.push({
            x: tx,
            z: tz,
            y: topY,
            w: topW,
            d: topD,
            h: h - lowerH,
            style,
            seed: seed + 3,
            tint,
            accent: acc,
            lit
        });
        topY = base + h;
    }
    // Roof plant and, on the tallest towers, a spire with an aviation light.
    ctx.roofProps.push({
        x: tx,
        z: tz,
        y: topY,
        w: topW * 0.55,
        d: topD * 0.55,
        h: rng.range(3, 6),
        style: 6,
        seed,
        tint: [
            0.26,
            0.27,
            0.3
        ],
        accent: [
            0,
            0,
            0
        ],
        lit: 0
    });
    if (h > 120 && rng.chance(0.7)) {
        ctx.roofProps.push({
            x: tx,
            z: tz,
            y: topY + 4,
            w: 1.2,
            d: 1.2,
            h: rng.range(16, 34),
            style: 7,
            seed,
            tint: [
                0.6,
                0.62,
                0.66
            ],
            accent,
            lit: 1
        });
    }
    // Large LED screens on towers that face a main road.
    if (h > 60 && (district === "central" || district === "media" || district === "creative") && rng.chance(0.45)) {
        const faces = [
            {
                x: tx + tw / 2 + 0.5,
                z: tz,
                rot: Math.PI / 2,
                width: td,
                dist: 0
            },
            {
                x: tx - tw / 2 - 0.5,
                z: tz,
                rot: -Math.PI / 2,
                width: td,
                dist: 0
            },
            {
                x: tx,
                z: tz + td / 2 + 0.5,
                rot: 0,
                width: tw,
                dist: 0
            },
            {
                x: tx,
                z: tz - td / 2 - 0.5,
                rot: Math.PI,
                width: tw,
                dist: 0
            }
        ];
        for (const face of faces)face.dist = Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pavementDistance"])(face.x, face.z) * -1);
        faces.sort((a, b)=>a.dist - b.dist);
        const face = faces[0];
        const bw = Math.min(face.width * 0.7, 15);
        const bh = bw * rng.range(1.2, 1.7);
        const by = base + podiumH + rng.range(8, Math.max(9, Math.min(34, lowerH - podiumH - bh - 6))) + bh / 2;
        ctx.billboards.push({
            x: face.x,
            y: by,
            z: face.z,
            rot: face.rot,
            w: bw,
            h: bh,
            variant: ctx.billboards.length
        });
    }
}
function generateBlock(ctx, block, reserves) {
    const { rng } = ctx;
    const profile = PROFILES[block.district];
    const inner = inset(block.rect, 8);
    const lots = [];
    splitLots(inner, profile.maxLot, rng, lots);
    for (const lot of lots){
        if (reserves.some((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectsOverlap"])(lot, r, 2))) continue;
        if (distToRect(lot, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z) < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rOuter + 10) {
            continue;
        }
        if (rng.chance(profile.park)) addPark(ctx, lot);
        else addBuilding(ctx, lot, block.district, 1);
    }
}
function generatePerimeter(ctx, block, reserves) {
    const { rng } = ctx;
    const r = inset(block.rect, 6);
    const horizontal = r.x1 - r.x0 > r.z1 - r.z0;
    const length = horizontal ? r.x1 - r.x0 : r.z1 - r.z0;
    let pos = 0;
    while(pos < length - 14){
        const size = rng.range(18, 40);
        const end = Math.min(length, pos + size);
        const lot = horizontal ? {
            x0: r.x0 + pos,
            x1: r.x0 + end,
            z0: r.z0,
            z1: r.z1
        } : {
            x0: r.x0,
            x1: r.x1,
            z0: r.z0 + pos,
            z1: r.z0 + end
        };
        pos = end + rng.range(4, 16);
        if (reserves.some((res)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectsOverlap"])(lot, res, 3))) continue;
        if (rng.chance(0.35)) {
            addPark(ctx, lot);
            continue;
        }
        const f = inset(lot, 2);
        if (f.x1 - f.x0 < 10 || f.z1 - f.z0 < 10) continue;
        const h = rng.range(7, 20);
        const tint = rng.pick([
            ...STONE_TINTS,
            ...CREATIVE_TINTS.slice(3)
        ]);
        ctx.buildings.push({
            x: (f.x0 + f.x1) / 2,
            z: (f.z0 + f.z1) / 2,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
            w: f.x1 - f.x0,
            d: f.z1 - f.z0,
            h,
            style: rng.pick([
                2,
                1,
                5
            ]),
            seed: rng.int(1, 999),
            tint,
            accent: [
                0,
                0,
                0
            ],
            lit: rng.range(0.3, 0.6)
        });
        ctx.colliders.push({
            type: "box",
            ...f
        });
    }
}
function generateHarbor(ctx, block, reserves, containers, cranes) {
    const { rng } = ctx;
    const r = block.rect;
    const north = block.id === "harbor-n";
    // Container yard near the channel mouth, warehouses further away.
    const yard = north ? {
        x0: r.x0 + 34,
        x1: r.x1 - 6,
        z0: -110,
        z1: r.z1 - 22
    } : {
        x0: r.x0 + 34,
        x1: r.x1 - 6,
        z0: r.z0 + 22,
        z1: r.z1 - 60
    };
    const cw = 2.6;
    const cl = 12.2;
    const ch = 2.7;
    let col = 0;
    for(let x = yard.x0; x + cw < yard.x1; x += cw + 0.5, col++){
        if (col % 5 === 4) {
            x += 6;
            continue;
        }
        let row = 0;
        for(let z = yard.z0; z + cl < yard.z1; z += cl + 1.2, row++){
            if (row % 3 === 2) {
                z += 7;
            }
            const cell = {
                x0: x,
                x1: x + cw,
                z0: z,
                z1: z + cl
            };
            if (reserves.some((res)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectsOverlap"])(cell, res, 6))) continue;
            const stack = rng.chance(0.18) ? 0 : rng.int(1, 4);
            for(let k = 0; k < stack; k++){
                containers.push({
                    x: x + cw / 2,
                    z: z + cl / 2,
                    y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"] + k * ch,
                    w: cw,
                    d: cl,
                    h: ch - 0.08,
                    style: 0,
                    seed: rng.next(),
                    tint: rng.pick(CONTAINER_TINTS),
                    accent: [
                        0,
                        0,
                        0
                    ],
                    lit: 0
                });
            }
            if (stack > 0) ctx.colliders.push({
                type: "box",
                ...cell
            });
        }
    }
    // Gantry cranes on the quay edge.
    const craneZ = north ? r.z1 + 4 : r.z0 - 4;
    for (const cx of [
        r.x0 + 30,
        r.x0 + 76
    ]){
        cranes.push({
            x: cx,
            z: craneZ,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
            rot: north ? 0 : Math.PI,
            scale: 1
        });
        for (const sx of [
            -11,
            11
        ]){
            ctx.colliders.push({
                type: "box",
                x0: cx + sx - 1.2,
                x1: cx + sx + 1.2,
                z0: craneZ - 7,
                z1: craneZ + 7
            });
        }
    }
    // Warehouses.
    const sheds = north ? [
        {
            x0: r.x0 + 14,
            x1: r.x1 - 10,
            z0: r.z0 + 10,
            z1: r.z0 + 70
        },
        {
            x0: r.x0 + 14,
            x1: r.x1 - 10,
            z0: r.z0 + 86,
            z1: r.z0 + 150
        },
        {
            x0: r.x0 + 14,
            x1: r.x1 - 10,
            z0: r.z0 + 166,
            z1: -124
        }
    ] : [
        {
            x0: r.x0 + 14,
            x1: r.x1 - 10,
            z0: r.z1 - 50,
            z1: r.z1 - 8
        }
    ];
    for (const shed of sheds){
        if (reserves.some((res)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectsOverlap"])(shed, res, 3))) continue;
        ctx.buildings.push({
            x: (shed.x0 + shed.x1) / 2,
            z: (shed.z0 + shed.z1) / 2,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
            w: shed.x1 - shed.x0,
            d: shed.z1 - shed.z0,
            h: rng.range(11, 17),
            style: 4,
            seed: rng.int(1, 999),
            tint: rng.pick([
                [
                    0.62,
                    0.64,
                    0.66
                ],
                [
                    0.34,
                    0.38,
                    0.44
                ],
                [
                    0.7,
                    0.66,
                    0.6
                ]
            ]),
            accent: hexToRgb("#5ee6ff"),
            lit: 0.2
        });
        ctx.colliders.push({
            type: "box",
            ...shed
        });
    }
}
function streetFurniture(ctx, lamps, palms, reserveColliders) {
    const blocked = (x, z, margin)=>{
        for (const c of reserveColliders){
            if (c.type === "circle") {
                if (Math.hypot(x - c.x, z - c.z) < c.r + margin) return true;
            } else if (x > c.x0 - margin && x < c.x1 + margin && z > c.z0 - margin && z < c.z1 + margin) return true;
        }
        return false;
    };
    const onPavement = (x, z)=>x > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 2 && x < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - 2 && z > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 + 2 && z < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1 - 2 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pavementDistance"])(x, z) < -1.2;
    for (const line of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROAD_LINES"]){
        if (line.kind === "bridge") continue;
        const avenue = line.kind === "avenue";
        const spacing = 40;
        const length = line.to - line.from;
        for (const side of [
            -1,
            1
        ]){
            const lampOff = line.halfWidth + 2;
            const treeOff = line.halfWidth + 3.4;
            for(let s = side === 1 ? 10 : 30; s < length; s += spacing){
                const along = line.from + s;
                const lx = line.axis === "x" ? line.at + side * lampOff : along;
                const lz = line.axis === "x" ? along : line.at + side * lampOff;
                if (onPavement(lx, lz) && !blocked(lx, lz, 1)) {
                    const rot = line.axis === "x" ? side === 1 ? Math.PI : 0 : side === 1 ? Math.PI / 2 : -Math.PI / 2;
                    lamps.push({
                        x: lx,
                        z: lz,
                        y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
                        rot,
                        scale: 1
                    });
                    ctx.colliders.push({
                        type: "circle",
                        x: lx,
                        z: lz,
                        r: 0.28
                    });
                }
                for (const extra of avenue ? [
                    13,
                    27
                ] : [
                    20
                ]){
                    const a2 = along + extra;
                    if (a2 > line.to - 4) continue;
                    const tx = line.axis === "x" ? line.at + side * treeOff : a2;
                    const tz = line.axis === "x" ? a2 : line.at + side * treeOff;
                    if (!onPavement(tx, tz) || blocked(tx, tz, 1.5)) continue;
                    const point = {
                        x: tx,
                        z: tz,
                        y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
                        rot: ctx.rng.range(0, Math.PI * 2),
                        scale: ctx.rng.range(0.85, 1.2)
                    };
                    if (avenue) palms.push(point);
                    else ctx.trees.push(point);
                    ctx.colliders.push({
                        type: "circle",
                        x: tx,
                        z: tz,
                        r: 0.4
                    });
                }
            }
        }
    }
    // A ring of lamps on the roundabout island and palms around its outer edge.
    for(let i = 0; i < 12; i++){
        const a = i / 12 * Math.PI * 2 + 0.26;
        const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x + Math.cos(a) * (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rInner - 2.6);
        const z = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z + Math.sin(a) * (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rInner - 2.6);
        lamps.push({
            x,
            z,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
            rot: -a,
            scale: 0.9
        });
        ctx.colliders.push({
            type: "circle",
            x,
            z,
            r: 0.28
        });
    }
    for(let i = 0; i < 40; i++){
        const a = i / 40 * Math.PI * 2;
        const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x + Math.cos(a) * (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rOuter + 4.5);
        const z = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z + Math.sin(a) * (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rOuter + 4.5);
        if (!onPavement(x, z) || blocked(x, z, 1.5)) continue;
        palms.push({
            x,
            z,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
            rot: ctx.rng.range(0, Math.PI * 2),
            scale: ctx.rng.range(0.9, 1.25)
        });
        ctx.colliders.push({
            type: "circle",
            x,
            z,
            r: 0.4
        });
    }
    // Promenade lamps on both quays and lamps along the bridge parapets.
    for (const z of [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0 - 2.6,
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 + 2.6
    ]){
        for(let x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 14; x < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - 10; x += 32){
            if (!onPavement(x, z) || blocked(x, z, 1)) continue;
            lamps.push({
                x,
                z,
                y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"],
                rot: z < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0 ? -Math.PI / 2 : Math.PI / 2,
                scale: 0.8
            });
            ctx.colliders.push({
                type: "circle",
                x,
                z,
                r: 0.28
            });
        }
    }
    for (const b of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGES"]){
        for(let z = b.z0 + 9; z < b.z1 - 4; z += 17){
            for (const side of [
                -1,
                1
            ]){
                lamps.push({
                    x: b.x + side * (b.halfWidth + 0.65),
                    z,
                    y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z),
                    rot: side === 1 ? Math.PI : 0,
                    scale: 0.85
                });
            }
        }
    }
}
function makeSkybridges(colliders) {
    const list = [
        {
            x: 0,
            z: 80,
            axis: "x",
            span: 33,
            height: 11
        },
        {
            x: 0,
            z: -132,
            axis: "x",
            span: 33,
            height: 12.5
        },
        {
            x: -134,
            z: -20,
            axis: "z",
            span: 33,
            height: 11.5
        },
        {
            x: 134,
            z: -20,
            axis: "z",
            span: 33,
            height: 11.5
        }
    ];
    for (const s of list){
        for (const side of [
            -1,
            1
        ]){
            const x = s.axis === "x" ? s.x + side * s.span / 2 : s.x;
            const z = s.axis === "x" ? s.z : s.z + side * s.span / 2;
            colliders.push({
                type: "circle",
                x,
                z,
                r: 1.4
            });
        }
    }
    return list;
}
function generateCity(destinations, seed = 20261009) {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(seed);
    const ctx = {
        rng,
        buildings: [],
        roofProps: [],
        trees: [],
        colliders: [],
        parks: [],
        billboards: []
    };
    const lamps = [];
    const palms = [];
    const containers = [];
    const cranes = [];
    const reserves = destinations.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$footprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["landmarkReserve"]).filter((r)=>r.x1 - r.x0 > 0);
    const landmarkShapes = destinations.flatMap(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$footprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["landmarkColliders"]);
    ctx.colliders.push(...landmarkShapes);
    const skybridges = makeSkybridges(ctx.colliders);
    for (const g of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GANTRIES"]){
        for (const side of [
            -1,
            1
        ]){
            const off = side * (g.halfWidth + 1.7);
            ctx.colliders.push({
                type: "circle",
                x: g.axis === "x" ? g.x + off : g.x,
                z: g.axis === "x" ? g.z : g.z + off,
                r: 0.45
            });
        }
    }
    const skybridgePylons = ctx.colliders.slice(landmarkShapes.length);
    for (const block of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKS"]){
        if (block.kind === "city") generateBlock(ctx, block, reserves);
        else if (block.kind === "perimeter") generatePerimeter(ctx, block, reserves);
        else if (block.kind === "harbor") generateHarbor(ctx, block, reserves, containers, cranes);
    }
    streetFurniture(ctx, lamps, palms, [
        ...landmarkShapes,
        ...skybridgePylons
    ]);
    return {
        buildings: ctx.buildings,
        roofProps: ctx.roofProps,
        containers,
        cranes,
        trees: ctx.trees,
        palms,
        lamps,
        billboards: ctx.billboards,
        skybridges,
        parks: ctx.parks,
        colliders: ctx.colliders
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/world/footprints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Ground footprints of the landmark buildings: the area they reserve in a block
 * (so generic buildings are not generated there) and their collision shapes.
 * Landmark rotations are always quarter turns, so boxes stay axis-aligned.
 */ __turbopack_context__.s([
    "FOOTPRINTS",
    ()=>FOOTPRINTS,
    "contactPlanters",
    ()=>contactPlanters,
    "landmarkColliders",
    ()=>landmarkColliders,
    "landmarkReserve",
    ()=>landmarkReserve,
    "localToWorld",
    ()=>localToWorld
]);
function contactPlanters() {
    const out = [];
    for(let i = 0; i < 10; i++){
        const a = i / 10 * Math.PI * 2 + 0.3;
        const z = 4 + Math.sin(a) * 30;
        if (z < -14) continue;
        out.push({
            x: Math.cos(a) * 30,
            z
        });
    }
    return out;
}
const FOOTPRINTS = {
    centralTower: {
        reserve: [
            0,
            0
        ],
        shapes: [
            {
                type: "circle",
                cx: 0,
                cz: 0,
                r: 23
            }
        ]
    },
    gatewayPavilion: {
        reserve: [
            64,
            64
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -6,
                w: 34,
                d: 26
            }
        ]
    },
    corporateTwin: {
        reserve: [
            124,
            92
        ],
        shapes: [
            {
                type: "box",
                cx: -30,
                cz: -8,
                w: 30,
                d: 30
            },
            {
                type: "box",
                cx: 30,
                cz: -8,
                w: 30,
                d: 30
            }
        ]
    },
    officeTower: {
        reserve: [
            46,
            46
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -4,
                w: 28,
                d: 28
            }
        ]
    },
    university: {
        reserve: [
            144,
            104
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -24,
                w: 80,
                d: 28
            },
            {
                type: "box",
                cx: -48,
                cz: 4,
                w: 20,
                d: 44
            },
            {
                type: "box",
                cx: 48,
                cz: 4,
                w: 20,
                d: 44
            }
        ]
    },
    library: {
        reserve: [
            70,
            56
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -6,
                w: 44,
                d: 28
            }
        ]
    },
    researchLab: {
        reserve: [
            134,
            94
        ],
        shapes: [
            {
                type: "circle",
                cx: -30,
                cz: -4,
                r: 22
            },
            {
                type: "box",
                cx: 32,
                cz: -10,
                w: 26,
                d: 26
            }
        ]
    },
    projectPod: {
        reserve: [
            42,
            42
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -4,
                w: 22,
                d: 22
            }
        ]
    },
    creativeStudio: {
        reserve: [
            110,
            90
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -8,
                w: 44,
                d: 44
            }
        ]
    },
    galleryPavilion: {
        reserve: [
            42,
            42
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -4,
                w: 24,
                d: 20
            }
        ]
    },
    mediaTower: {
        reserve: [
            114,
            94
        ],
        shapes: [
            {
                type: "circle",
                cx: 0,
                cz: -6,
                r: 19
            }
        ]
    },
    kiosk: {
        reserve: [
            14,
            14
        ],
        shapes: [
            {
                type: "circle",
                cx: 0,
                cz: 0,
                r: 2.2
            }
        ]
    },
    contactPavilion: {
        reserve: [
            134,
            104
        ],
        shapes: [
            {
                type: "circle",
                cx: 0,
                cz: 6,
                r: 10
            },
            {
                type: "box",
                cx: 0,
                cz: -32,
                w: 52,
                d: 18
            },
            ...contactPlanters().map((p)=>({
                    type: "circle",
                    cx: p.x,
                    cz: p.z,
                    r: 2.3
                }))
        ]
    },
    stadium: {
        reserve: [
            126,
            122
        ],
        shapes: [
            {
                type: "circle",
                cx: 0,
                cz: 0,
                r: 54
            }
        ]
    },
    terminal: {
        reserve: [
            18,
            18
        ],
        shapes: [
            {
                type: "circle",
                cx: 0,
                cz: 0,
                r: 2.4
            }
        ]
    },
    lookout: {
        reserve: [
            16,
            10
        ],
        shapes: [
            {
                type: "circle",
                cx: 0,
                cz: 0,
                r: 1.6
            }
        ]
    },
    garage: {
        reserve: [
            44,
            34
        ],
        shapes: [
            {
                type: "box",
                cx: 0,
                cz: -5,
                w: 32,
                d: 16
            }
        ]
    }
};
function localToWorld(position, rotation, lx, lz) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    return [
        position[0] + lx * c + lz * s,
        position[1] - lx * s + lz * c
    ];
}
function rotatedBox(position, rotation, cx, cz, w, d) {
    const a = localToWorld(position, rotation, cx - w / 2, cz - d / 2);
    const b = localToWorld(position, rotation, cx + w / 2, cz + d / 2);
    return {
        x0: Math.min(a[0], b[0]),
        x1: Math.max(a[0], b[0]),
        z0: Math.min(a[1], b[1]),
        z1: Math.max(a[1], b[1])
    };
}
function landmarkReserve(dest) {
    const [w, d] = FOOTPRINTS[dest.landmark].reserve;
    return rotatedBox(dest.position, dest.rotation, 0, 0, w, d);
}
function landmarkColliders(dest) {
    return FOOTPRINTS[dest.landmark].shapes.map((shape)=>{
        if (shape.type === "circle") {
            const [x, z] = localToWorld(dest.position, dest.rotation, shape.cx, shape.cz);
            return {
                type: "circle",
                x,
                z,
                r: shape.r
            };
        }
        return {
            type: "box",
            ...rotatedBox(dest.position, dest.rotation, shape.cx, shape.cz, shape.w, shape.d)
        };
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/world/layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * World layout: the single source of truth for where everything in the city is.
 *
 * This module is pure TypeScript (no three.js) so the same data drives rendering,
 * vehicle physics, the map, route finding and the unit tests.
 *
 * Coordinate system: metres, +X east, +Z south, +Y up. A heading `h` points
 * along (sin h, cos h), so north is h = π and east is h = π/2.
 */ __turbopack_context__.s([
    "BLOCKS",
    ()=>BLOCKS,
    "BRIDGES",
    ()=>BRIDGES,
    "CHANNEL",
    ()=>CHANNEL,
    "CURB",
    ()=>CURB,
    "DISTRICTS",
    ()=>DISTRICTS,
    "GANTRIES",
    ()=>GANTRIES,
    "ISLAND",
    ()=>ISLAND,
    "LANE_OFFSET",
    ()=>LANE_OFFSET,
    "QUAY_DEPTH",
    ()=>QUAY_DEPTH,
    "ROADS_X",
    ()=>ROADS_X,
    "ROADS_Z",
    ()=>ROADS_Z,
    "ROAD_EDGES",
    ()=>ROAD_EDGES,
    "ROAD_LINES",
    ()=>ROAD_LINES,
    "ROAD_NODES",
    ()=>ROAD_NODES,
    "ROUNDABOUT",
    ()=>ROUNDABOUT,
    "SPAWN",
    ()=>SPAWN,
    "STATIC_COLLIDERS",
    ()=>STATIC_COLLIDERS,
    "WORLD_BOUNDS",
    ()=>WORLD_BOUNDS,
    "bridgeAt",
    ()=>bridgeAt,
    "bridgeHeight",
    ()=>bridgeHeight,
    "districtAt",
    ()=>districtAt,
    "getDistrict",
    ()=>getDistrict,
    "groundHeight",
    ()=>groundHeight,
    "headingToVector",
    ()=>headingToVector,
    "inRect",
    ()=>inRect,
    "isOnRoad",
    ()=>isOnRoad,
    "pavementDistance",
    ()=>pavementDistance,
    "rectCenter",
    ()=>rectCenter,
    "rectsOverlap",
    ()=>rectsOverlap,
    "sdRoundRect",
    ()=>sdRoundRect,
    "surfaceAt",
    ()=>surfaceAt,
    "vectorToHeading",
    ()=>vectorToHeading,
    "wrapAngle",
    ()=>wrapAngle
]);
const ISLAND = {
    x0: -480,
    z0: -410,
    x1: 540,
    z1: 430
};
const CHANNEL = {
    z0: 130,
    z1: 210
};
const QUAY_DEPTH = 11;
const CURB = 0.14;
const LANE_OFFSET = 4.5;
const ROADS_X = [
    {
        x: -420,
        hw: 9,
        name: "West Shore Drive"
    },
    {
        x: -210,
        hw: 9,
        name: "Studio Street"
    },
    {
        x: 0,
        hw: 12,
        name: "Innovation Boulevard"
    },
    {
        x: 210,
        hw: 9,
        name: "Foundry Street"
    },
    {
        x: 420,
        hw: 9,
        name: "Harbor Drive"
    }
];
const ROADS_Z = [
    {
        z: -360,
        hw: 9,
        name: "Hillside Road"
    },
    {
        z: -190,
        hw: 9,
        name: "Campus Way"
    },
    {
        z: -20,
        hw: 12,
        name: "Central Avenue"
    },
    {
        z: 110,
        hw: 9,
        name: "North Quay"
    },
    {
        z: 230,
        hw: 9,
        name: "South Quay"
    },
    {
        z: 370,
        hw: 9,
        name: "Marina Road"
    }
];
const ROUNDABOUT = {
    x: 0,
    z: -20,
    rInner: 44,
    rOuter: 70,
    rMid: 57
};
const BRIDGE_COLUMNS = [
    1,
    2,
    3
];
const BRIDGE_NAMES = [
    "Studio Bridge",
    "Gateway Bridge",
    "Foundry Bridge"
];
const BRIDGES = BRIDGE_COLUMNS.map(_c = (col, i)=>({
        id: `bridge-${i}`,
        x: ROADS_X[col].x,
        halfWidth: ROADS_X[col].hw,
        z0: ROADS_Z[3].z + ROADS_Z[3].hw,
        z1: ROADS_Z[4].z - ROADS_Z[4].hw,
        height: col === 2 ? 4.2 : 3.4,
        name: BRIDGE_NAMES[i]
    }));
_c1 = BRIDGES;
const SPAWN = {
    x: -LANE_OFFSET - 1,
    z: 318,
    heading: Math.PI
};
const DISTRICTS = [
    {
        id: "central",
        name: "Central Innovation District",
        purpose: "Introduction and professional identity",
        color: "#7cc4ff",
        rects: [
            {
                x0: -210,
                z0: -190,
                x1: 210,
                z1: 120
            }
        ],
        labelAt: [
            0,
            -110
        ]
    },
    {
        id: "career",
        name: "Career District",
        purpose: "Work experience and professional journey",
        color: "#ffb86b",
        rects: [
            {
                x0: 0,
                z0: -410,
                x1: 540,
                z1: -190
            }
        ],
        labelAt: [
            250,
            -330
        ]
    },
    {
        id: "knowledge",
        name: "Knowledge District",
        purpose: "Education and in-depth case studies",
        color: "#8be9c0",
        rects: [
            {
                x0: -480,
                z0: -410,
                x1: 0,
                z1: -190
            }
        ],
        labelAt: [
            -250,
            -330
        ]
    },
    {
        id: "projects",
        name: "Project District",
        purpose: "Technical projects and engineering work",
        color: "#5ee6ff",
        rects: [
            {
                x0: 210,
                z0: -190,
                x1: 540,
                z1: 120
            }
        ],
        labelAt: [
            330,
            -150
        ]
    },
    {
        id: "creative",
        name: "Creative District",
        purpose: "Design, branding and creative work",
        color: "#ff7ad9",
        rects: [
            {
                x0: -480,
                z0: -190,
                x1: -210,
                z1: 120
            }
        ],
        labelAt: [
            -330,
            -150
        ]
    },
    {
        id: "media",
        name: "Media District",
        purpose: "Articles, technical writing and insights",
        color: "#b79bff",
        rects: [
            {
                x0: 210,
                z0: 220,
                x1: 540,
                z1: 430
            }
        ],
        labelAt: [
            330,
            400
        ]
    },
    {
        id: "contact",
        name: "Contact & Community District",
        purpose: "Contact, profiles and collaboration",
        color: "#ffd166",
        rects: [
            {
                x0: -480,
                z0: 220,
                x1: -210,
                z1: 430
            }
        ],
        labelAt: [
            -330,
            400
        ]
    },
    {
        id: "waterfront",
        name: "Waterfront & Leisure District",
        purpose: "Promenades, marina and scenic drives",
        color: "#6fd3c7",
        rects: [
            {
                x0: -480,
                z0: 120,
                x1: 540,
                z1: 220
            },
            {
                x0: -210,
                z0: 220,
                x1: 210,
                z1: 430
            }
        ],
        labelAt: [
            0,
            400
        ]
    }
];
const DISTRICT_BY_ID = new Map(DISTRICTS.map((d)=>[
        d.id,
        d
    ]));
function getDistrict(id) {
    const d = DISTRICT_BY_ID.get(id);
    if (!d) throw new Error(`Unknown district ${id}`);
    return d;
}
function inRect(r, x, z) {
    return x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1;
}
function districtAt(x, z) {
    for (const d of DISTRICTS){
        for (const r of d.rects)if (inRect(r, x, z)) return d.id;
    }
    return "waterfront";
}
/* ------------------------------------------------------------------ */ /* Blocks (raised pavement slabs between the roads)                    */ /* ------------------------------------------------------------------ */ function makeBlocks() {
    const blocks = [];
    const push = (id, kind, rect, cornerRadius)=>{
        const cx = (rect.x0 + rect.x1) / 2;
        const cz = (rect.z0 + rect.z1) / 2;
        blocks.push({
            id,
            kind,
            rect,
            cornerRadius,
            district: districtAt(cx, cz)
        });
    };
    for(let i = 0; i < ROADS_X.length - 1; i++){
        for (const j of [
            0,
            1,
            2,
            4
        ]){
            push(`block-${i}-${j}`, "city", {
                x0: ROADS_X[i].x + ROADS_X[i].hw,
                x1: ROADS_X[i + 1].x - ROADS_X[i + 1].hw,
                z0: ROADS_Z[j].z + ROADS_Z[j].hw,
                z1: ROADS_Z[j + 1].z - ROADS_Z[j + 1].hw
            }, 6);
        }
    }
    // Quays on both banks of the channel, interrupted by the bridge approaches.
    const northQuay = {
        z0: CHANNEL.z0 - QUAY_DEPTH,
        z1: CHANNEL.z0
    };
    const southQuay = {
        z0: CHANNEL.z1,
        z1: CHANNEL.z1 + QUAY_DEPTH
    };
    const cuts = BRIDGES.map((b)=>[
            b.x - b.halfWidth,
            b.x + b.halfWidth
        ]);
    let start = ISLAND.x0;
    const spans = [];
    for (const [a, b] of cuts){
        spans.push([
            start,
            a
        ]);
        start = b;
    }
    spans.push([
        start,
        ISLAND.x1
    ]);
    spans.forEach(([x0, x1], i)=>{
        push(`quay-n-${i}`, "quay", {
            x0,
            x1,
            ...northQuay
        }, 0);
        push(`quay-s-${i}`, "quay", {
            x0,
            x1,
            ...southQuay
        }, 0);
    });
    const west = ROADS_X[0].x - ROADS_X[0].hw;
    const east = ROADS_X[4].x + ROADS_X[4].hw;
    const north = ROADS_Z[0].z - ROADS_Z[0].hw;
    const south = ROADS_Z[5].z + ROADS_Z[5].hw;
    push("perimeter-n", "perimeter", {
        x0: ISLAND.x0,
        x1: ISLAND.x1,
        z0: ISLAND.z0,
        z1: north
    }, 0);
    push("perimeter-s", "perimeter", {
        x0: ISLAND.x0,
        x1: ISLAND.x1,
        z0: south,
        z1: ISLAND.z1
    }, 0);
    push("perimeter-wn", "perimeter", {
        x0: ISLAND.x0,
        x1: west,
        z0: north,
        z1: northQuay.z0
    }, 0);
    push("perimeter-ws", "perimeter", {
        x0: ISLAND.x0,
        x1: west,
        z0: southQuay.z1,
        z1: south
    }, 0);
    push("harbor-n", "harbor", {
        x0: east,
        x1: ISLAND.x1,
        z0: north,
        z1: northQuay.z0
    }, 0);
    push("harbor-s", "harbor", {
        x0: east,
        x1: ISLAND.x1,
        z0: southQuay.z1,
        z1: south
    }, 0);
    return blocks;
}
const BLOCKS = makeBlocks();
function sdRoundRect(px, pz, r, radius) {
    const cx = (r.x0 + r.x1) / 2;
    const cz = (r.z0 + r.z1) / 2;
    const hx = (r.x1 - r.x0) / 2 - radius;
    const hz = (r.z1 - r.z0) / 2 - radius;
    const dx = Math.abs(px - cx) - hx;
    const dz = Math.abs(pz - cz) - hz;
    return Math.hypot(Math.max(dx, 0), Math.max(dz, 0)) + Math.min(Math.max(dx, dz), 0) - radius;
}
function smoothstep(e0, e1, v) {
    const t = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
}
function bridgeAt(x, z) {
    for (const b of BRIDGES){
        if (z >= b.z0 && z <= b.z1 && Math.abs(x - b.x) <= b.halfWidth + 1.3) return b;
    }
    return null;
}
function bridgeHeight(b, z) {
    const t = Math.min(1, Math.max(0, (z - b.z0) / (b.z1 - b.z0)));
    return b.height * (1 - Math.cos(2 * Math.PI * t)) / 2;
}
function pavementDistance(x, z) {
    const dRing = Math.hypot(x - ROUNDABOUT.x, z - ROUNDABOUT.z);
    let best = dRing - ROUNDABOUT.rInner;
    const carve = ROUNDABOUT.rOuter - dRing;
    for (const b of BLOCKS){
        const r = b.rect;
        // Cheap reject: more than 2 m outside the rectangle.
        if (x < r.x0 - 2 || x > r.x1 + 2 || z < r.z0 - 2 || z > r.z1 + 2) continue;
        const sd = Math.max(sdRoundRect(x, z, r, b.cornerRadius), carve);
        if (sd < best) best = sd;
    }
    return best;
}
function surfaceAt(x, z) {
    if (!inRect(ISLAND, x, z)) return "outside";
    if (bridgeAt(x, z)) return "bridge";
    if (z > CHANNEL.z0 && z < CHANNEL.z1) return "water";
    return pavementDistance(x, z) < 0 ? "pavement" : "road";
}
function groundHeight(x, z) {
    const b = bridgeAt(x, z);
    if (b) return bridgeHeight(b, z);
    return CURB * smoothstep(0, 0.35, -pavementDistance(x, z));
}
function isOnRoad(x, z) {
    const s = surfaceAt(x, z);
    return s === "road" || s === "bridge";
}
/* ------------------------------------------------------------------ */ /* Roads                                                               */ /* ------------------------------------------------------------------ */ function makeRoadLines() {
    const lines = [];
    const zNorthEnd = ROADS_Z[0].z;
    const zQuayN = ROADS_Z[3].z;
    const zQuayS = ROADS_Z[4].z;
    const zSouthEnd = ROADS_Z[5].z;
    ROADS_X.forEach((r, i)=>{
        const kind = r.hw > 10 ? "avenue" : "street";
        lines.push({
            id: `x${i}-n`,
            axis: "x",
            at: r.x,
            from: zNorthEnd,
            to: zQuayN,
            halfWidth: r.hw,
            kind,
            name: r.name
        });
        lines.push({
            id: `x${i}-s`,
            axis: "x",
            at: r.x,
            from: zQuayS,
            to: zSouthEnd,
            halfWidth: r.hw,
            kind,
            name: r.name
        });
    });
    BRIDGES.forEach((b)=>{
        lines.push({
            id: b.id,
            axis: "x",
            at: b.x,
            from: zQuayN,
            to: zQuayS,
            halfWidth: b.halfWidth,
            kind: "bridge",
            name: b.name
        });
    });
    ROADS_Z.forEach((r, j)=>{
        lines.push({
            id: `z${j}`,
            axis: "z",
            at: r.z,
            from: ROADS_X[0].x,
            to: ROADS_X[4].x,
            halfWidth: r.hw,
            kind: r.hw > 10 ? "avenue" : "street",
            name: r.name
        });
    });
    return lines;
}
const ROAD_LINES = makeRoadLines();
function nodeId(i, j) {
    return `n-${i}-${j}`;
}
function makeGraph() {
    const nodes = [];
    const edges = [];
    for(let i = 0; i < ROADS_X.length; i++){
        for(let j = 0; j < ROADS_Z.length; j++){
            if (i === 2 && j === 2) continue; // replaced by the roundabout
            nodes.push({
                id: nodeId(i, j),
                x: ROADS_X[i].x,
                z: ROADS_Z[j].z
            });
        }
    }
    const { x: cx, z: cz, rMid } = ROUNDABOUT;
    const ring = {
        n: {
            id: "ring-n",
            x: cx,
            z: cz - rMid
        },
        e: {
            id: "ring-e",
            x: cx + rMid,
            z: cz
        },
        s: {
            id: "ring-s",
            x: cx,
            z: cz + rMid
        },
        w: {
            id: "ring-w",
            x: cx - rMid,
            z: cz
        }
    };
    nodes.push(ring.n, ring.e, ring.s, ring.w);
    const byId = new Map(nodes.map((n)=>[
            n.id,
            n
        ]));
    const straight = (a, b)=>{
        const na = byId.get(a);
        const nb = byId.get(b);
        if (!na || !nb) throw new Error(`Missing node for edge ${a}-${b}`);
        edges.push({
            id: `${a}|${b}`,
            a,
            b,
            length: Math.hypot(nb.x - na.x, nb.z - na.z),
            points: [
                [
                    na.x,
                    na.z
                ],
                [
                    nb.x,
                    nb.z
                ]
            ]
        });
    };
    const bridgeCols = new Set(BRIDGE_COLUMNS);
    for(let i = 0; i < ROADS_X.length; i++){
        for(let j = 0; j < ROADS_Z.length - 1; j++){
            if (j === 3 && !bridgeCols.has(i)) continue; // no bridge on the outer roads
            if (i === 2 && j === 1) straight(nodeId(2, 1), "ring-n");
            else if (i === 2 && j === 2) straight("ring-s", nodeId(2, 3));
            else straight(nodeId(i, j), nodeId(i, j + 1));
        }
    }
    for(let j = 0; j < ROADS_Z.length; j++){
        for(let i = 0; i < ROADS_X.length - 1; i++){
            if (j === 2 && i === 1) straight(nodeId(1, 2), "ring-w");
            else if (j === 2 && i === 2) straight("ring-e", nodeId(3, 2));
            else straight(nodeId(i, j), nodeId(i + 1, j));
        }
    }
    const arc = (from, to, a0, a1)=>{
        const points = [];
        const steps = 10;
        for(let s = 0; s <= steps; s++){
            const a = a0 + (a1 - a0) * s / steps;
            points.push([
                cx + Math.cos(a) * rMid,
                cz + Math.sin(a) * rMid
            ]);
        }
        edges.push({
            id: `${from.id}|${to.id}`,
            a: from.id,
            b: to.id,
            length: Math.PI / 2 * rMid,
            points
        });
    };
    // Angles measured from +X towards +Z.
    arc(ring.e, ring.s, 0, Math.PI / 2);
    arc(ring.s, ring.w, Math.PI / 2, Math.PI);
    arc(ring.w, ring.n, Math.PI, Math.PI * 1.5);
    arc(ring.n, ring.e, Math.PI * 1.5, Math.PI * 2);
    return {
        nodes,
        edges
    };
}
const GRAPH = makeGraph();
const ROAD_NODES = GRAPH.nodes;
const ROAD_EDGES = GRAPH.edges;
/* ------------------------------------------------------------------ */ /* Static colliders: sea walls, channel walls and bridge parapets      */ /* ------------------------------------------------------------------ */ function makeStaticColliders() {
    const c = [];
    const t = 8;
    c.push({
        type: "box",
        x0: ISLAND.x0 - t,
        x1: ISLAND.x1 + t,
        z0: ISLAND.z0 - t,
        z1: ISLAND.z0 + 1
    });
    c.push({
        type: "box",
        x0: ISLAND.x0 - t,
        x1: ISLAND.x1 + t,
        z0: ISLAND.z1 - 1,
        z1: ISLAND.z1 + t
    });
    c.push({
        type: "box",
        x0: ISLAND.x0 - t,
        x1: ISLAND.x0 + 1,
        z0: ISLAND.z0 - t,
        z1: ISLAND.z1 + t
    });
    c.push({
        type: "box",
        x0: ISLAND.x1 - 1,
        x1: ISLAND.x1 + t,
        z0: ISLAND.z0 - t,
        z1: ISLAND.z1 + t
    });
    const rail = 1.2;
    let start = ISLAND.x0 - t;
    const gaps = BRIDGES.map((b)=>[
            b.x - b.halfWidth - rail,
            b.x + b.halfWidth + rail
        ]);
    const spans = [];
    for (const [a, b] of gaps){
        spans.push([
            start,
            a
        ]);
        start = b;
    }
    spans.push([
        start,
        ISLAND.x1 + t
    ]);
    for (const [x0, x1] of spans){
        c.push({
            type: "box",
            x0,
            x1,
            z0: CHANNEL.z0 - 1,
            z1: CHANNEL.z0 + 1.5
        });
        c.push({
            type: "box",
            x0,
            x1,
            z0: CHANNEL.z1 - 1.5,
            z1: CHANNEL.z1 + 1
        });
    }
    for (const b of BRIDGES){
        const z0 = CHANNEL.z0 - 1;
        const z1 = CHANNEL.z1 + 1;
        c.push({
            type: "box",
            x0: b.x - b.halfWidth - rail,
            x1: b.x - b.halfWidth - 0.1,
            z0,
            z1
        });
        c.push({
            type: "box",
            x0: b.x + b.halfWidth + 0.1,
            x1: b.x + b.halfWidth + rail,
            z0,
            z1
        });
    }
    return c;
}
const STATIC_COLLIDERS = makeStaticColliders();
function headingToVector(h) {
    return [
        Math.sin(h),
        Math.cos(h)
    ];
}
function vectorToHeading(x, z) {
    return Math.atan2(x, z);
}
function wrapAngle(a) {
    let r = a % (Math.PI * 2);
    if (r > Math.PI) r -= Math.PI * 2;
    if (r < -Math.PI) r += Math.PI * 2;
    return r;
}
function rectCenter(r) {
    return [
        (r.x0 + r.x1) / 2,
        (r.z0 + r.z1) / 2
    ];
}
function rectsOverlap(a, b, margin = 0) {
    return a.x0 < b.x1 + margin && a.x1 > b.x0 - margin && a.z0 < b.z1 + margin && a.z1 > b.z0 - margin;
}
const GANTRIES = [
    {
        id: "gantry-gateway",
        x: 0,
        z: 262,
        axis: "x",
        facing: Math.PI,
        halfWidth: 12,
        entries: [
            {
                label: "Contact Plaza",
                arrow: "left"
            },
            {
                label: "Central District",
                arrow: "up"
            },
            {
                label: "Media District",
                arrow: "right"
            }
        ]
    },
    {
        id: "gantry-avenue-east",
        x: 150,
        z: -20,
        axis: "z",
        facing: Math.PI / 2,
        halfWidth: 12,
        entries: [
            {
                label: "Career District",
                arrow: "left"
            },
            {
                label: "Project District",
                arrow: "up"
            },
            {
                label: "Harbor",
                arrow: "up"
            }
        ]
    },
    {
        id: "gantry-avenue-west",
        x: -150,
        z: -20,
        axis: "z",
        facing: -Math.PI / 2,
        halfWidth: 12,
        entries: [
            {
                label: "Creative District",
                arrow: "up"
            },
            {
                label: "Knowledge District",
                arrow: "right"
            },
            {
                label: "Waterfront",
                arrow: "left"
            }
        ]
    },
    {
        id: "gantry-north",
        x: 0,
        z: -156,
        axis: "x",
        facing: 0,
        halfWidth: 12,
        entries: [
            {
                label: "Knowledge District",
                arrow: "right"
            },
            {
                label: "Central District",
                arrow: "up"
            },
            {
                label: "Career District",
                arrow: "left"
            }
        ]
    }
];
const WORLD_BOUNDS = {
    x0: ISLAND.x0 - 40,
    z0: ISLAND.z0 - 40,
    x1: ISLAND.x1 + 40,
    z1: ISLAND.z1 + 40
};
var _c, _c1;
__turbopack_context__.k.register(_c, "BRIDGES$BRIDGE_COLUMNS.map");
__turbopack_context__.k.register(_c1, "BRIDGES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=lib_0pqg71dlo7_d2._.js.map