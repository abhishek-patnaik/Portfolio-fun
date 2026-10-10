module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/game/GameLoader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-ssr] (ecmascript)");
;
"use client";
;
;
;
;
;
/** Shown while the 3D bundle downloads; matches the first loading stage. */ function Shell() {
    // On a slow or failing connection, offer the classic site instead of an endless wait.
    const [slow, setSlow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = window.setTimeout(()=>setSlow(true), 9000);
        return ()=>window.clearTimeout(id);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink px-6",
        role: "status",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "hud-label text-sky",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["site"].disciplines.join(" · ")
                }, void 0, false, {
                    fileName: "[project]/components/game/GameLoader.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "display mt-3 text-4xl font-semibold tracking-[0.12em] text-fg sm:text-5xl",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["site"].shortName
                }, void 0, false, {
                    fileName: "[project]/components/game/GameLoader.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-muted",
                    children: "The interactive portfolio world"
                }, void 0, false, {
                    fileName: "[project]/components/game/GameLoader.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mt-10 h-[3px] w-full overflow-hidden rounded-full bg-white/10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameLoader.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/game/GameLoader.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-sm text-fg",
                    children: "Initializing application…"
                }, void 0, false, {
                    fileName: "[project]/components/game/GameLoader.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                slow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-5 text-sm text-muted",
                    "data-testid": "slow-load",
                    children: [
                        "This is taking longer than usual.",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/about",
                            className: "text-sky underline underline-offset-4",
                            children: "Open the classic portfolio"
                        }, void 0, false, {
                            fileName: "[project]/components/game/GameLoader.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this),
                        " ",
                        "while the city loads."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/GameLoader.tsx",
                    lineNumber: 27,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/GameLoader.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/GameLoader.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
const GameRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/game/GameRoot.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: Shell
});
function GameLoader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GameRoot, {}, void 0, false, {
        fileName: "[project]/components/game/GameLoader.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
}),
"[project]/lib/data/portfolio.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "absoluteUrl",
    ()=>absoluteUrl,
    "navigation",
    ()=>navigation,
    "site",
    ()=>site,
    "socialLinks",
    ()=>socialLinks
]);
const site = {
    name: "Abhishek Patnaik",
    shortName: "ABHISHEK",
    title: "Data Analyst",
    disciplines: [
        "Analyze",
        "Build",
        "Solve",
        "Repeat"
    ],
    tagline: "Data for a more human tomorrow.",
    intro: "I'm a Data Analyst with 2.5 years of experience. I turn messy data into decisions a team can act on, using SQL, Python, Power BI and BigQuery, and I size every recommendation in money.",
    summary: "Data Analyst with 2.5 years across broadband subscriptions and B2B sales operations, turning raw data into ranked, money-sized decisions with SQL, Python and Power BI. Recent work includes showing that only £6.3K of a £50K retention budget pays back, and finding a tracking gap affecting 41% of purchases in GA4 data. Validates the data before trusting it, states uncertainty plainly, and designs the test that proves each recommendation.",
    about: [
        "I'm a data analyst who thinks like a builder. I can't leave a weird number alone: when something looks off in the metrics, I keep pulling the thread until I find the real reason behind it, not just a plausible one. Then I do the part most people skip: I automate the manual pipeline around it, so the answer holds up every month.",
        "Outside of analytics, I co-run Creative Moonlight Studios, a boutique creative and engineering studio building websites, web apps, and AI workflows for real clients. Running it taught me to move fast, own the business outcome, and always design for whoever is on the other side of the screen.",
        "This city is the portfolio. Every district is a part of my work, and every landmark opens the details. Drive around, or use the menu to jump straight to what you need."
    ],
    location: "New Delhi, India",
    email: "abhiishek.patnaik@gmail.com",
    resumeFile: "/resume/Abhishek_Patnaik_Resume.pdf",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    socials: [
        {
            id: "linkedin",
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/abhiishek-patnaik",
            handle: "in/abhiishek-patnaik"
        },
        {
            id: "github",
            label: "GitHub",
            url: "https://github.com/abhishek-patnaik",
            handle: "abhishek-patnaik"
        },
        {
            id: "studio",
            label: "Creative Moonlight Studios",
            url: "https://creativemoonlightstudio.com",
            handle: "creativemoonlightstudio.com"
        }
    ],
    interests: [
        "Funnel and product analytics",
        "Customer value and retention",
        "Data quality and validation",
        "Local LLMs for analysis",
        "Building web products"
    ],
    primarySkills: [
        "SQL",
        "Python",
        "Power BI",
        "BigQuery",
        "Excel",
        "GA4"
    ],
    quickFacts: [
        {
            label: "Based in",
            value: "New Delhi, India"
        },
        {
            label: "Experience",
            value: "2.5 years"
        },
        {
            label: "Availability",
            value: "Available to join immediately"
        },
        {
            label: "Open to",
            value: "Full-time Data Analyst and Web Developer roles, BI consulting, agency collaborations"
        },
        {
            label: "Also",
            value: "Co-runs Creative Moonlight Studios"
        }
    ],
    plate: "ABHISHEK",
    status: "verified",
    showStatusBadges: true,
    copyrightYear: 2026
};
const navigation = [
    {
        section: "home",
        label: "Home",
        href: "/",
        description: "Enter the city"
    },
    {
        section: "about",
        label: "About",
        href: "/about",
        description: "Who I am and how I work"
    },
    {
        section: "experience",
        label: "Experience",
        href: "/experience",
        description: "Roles and professional journey"
    },
    {
        section: "education",
        label: "Education",
        href: "/education",
        description: "Degrees and academic background"
    },
    {
        section: "projects",
        label: "Projects",
        href: "/projects",
        description: "Projects and case studies"
    },
    {
        section: "creative",
        label: "Creative Work",
        href: "/creative",
        description: "Design, AI media and 3D"
    },
    {
        section: "skills",
        label: "Skills",
        href: "/skills",
        description: "Tools and methods"
    },
    {
        section: "blog",
        label: "Blog",
        href: "/blog",
        description: "Articles and insights"
    },
    {
        section: "resume",
        label: "Resume",
        href: "/resume",
        description: "Profile summary and download"
    },
    {
        section: "contact",
        label: "Contact",
        href: "/contact",
        description: "Get in touch"
    }
];
function socialLinks() {
    return site.socials.filter((s)=>typeof s.url === "string" && s.url.length > 0);
}
function absoluteUrl(path) {
    return new URL(path, site.siteUrl).toString();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1abbj3ne3tkdl._.js.map