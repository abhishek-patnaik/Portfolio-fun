module.exports = [
(()=>{"use strict";return[
"[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
;
;
const imageModule = {
    alt: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["alt"],
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contentType"],
    size: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["size"]
};
async function __TURBOPACK__default__export__(props) {
    const { __metadata_id__: _, ...params } = await props.params;
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("/", params, "opengraph-image", false);
    function getImageMetadata(imageMetadata, idParam) {
        const data = {
            alt: imageMetadata.alt,
            type: imageMetadata.contentType || 'image/png',
            url: imageUrl + (idParam ? '/' + idParam : '') + '?' + "be377b3cba4cbaf7"
        };
        const { size } = imageMetadata;
        if (size) {
            data.width = size.width;
            data.height = size.height;
        }
        return data;
    }
    return [
        getImageMetadata(imageModule, '')
    ];
}
}),
"[project]/app/opengraph-image.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alt",
    ()=>alt,
    "contentType",
    ()=>contentType,
    "default",
    ()=>OpengraphImage,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/og.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-rsc] (ecmascript)");
;
;
;
const alt = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].name}: an interactive 3D portfolio world`;
const size = {
    width: 1200,
    height: 630
};
const contentType = "image/png";
function OpengraphImage() {
    const towers = [
        120,
        210,
        150,
        330,
        260,
        430,
        300,
        180,
        240,
        140,
        200,
        110
    ];
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ImageResponse"](/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 72,
            background: "linear-gradient(160deg, #101a3f 0%, #05070c 55%, #1a0d2e 100%)",
            color: "#e9eef5",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 440,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    gap: 14,
                    paddingRight: 60,
                    opacity: 0.55
                },
                children: towers.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 46,
                            height: h,
                            display: "flex",
                            background: i % 3 === 0 ? "linear-gradient(180deg, #7cc4ff, #1c3b66)" : i % 3 === 1 ? "linear-gradient(180deg, #b79bff, #2a1f52)" : "linear-gradient(180deg, #3d5a80, #142033)",
                            borderRadius: 4
                        }
                    }, i, false, {
                        fileName: "[project]/app/opengraph-image.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/opengraph-image.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    fontSize: 26,
                    letterSpacing: 8,
                    color: "#7cc4ff",
                    textTransform: "uppercase"
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].disciplines.join("  ·  ")
            }, void 0, false, {
                fileName: "[project]/app/opengraph-image.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            fontSize: 96,
                            fontWeight: 700,
                            letterSpacing: 4,
                            lineHeight: 1
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].name
                    }, void 0, false, {
                        fileName: "[project]/app/opengraph-image.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            fontSize: 34,
                            marginTop: 22,
                            color: "#9ba7b8",
                            maxWidth: 780
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].tagline
                    }, void 0, false, {
                        fileName: "[project]/app/opengraph-image.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            fontSize: 24,
                            marginTop: 34,
                            color: "#b79bff",
                            letterSpacing: 6,
                            textTransform: "uppercase"
                        },
                        children: "The interactive 3D portfolio world"
                    }, void 0, false, {
                        fileName: "[project]/app/opengraph-image.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/opengraph-image.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/opengraph-image.tsx",
        lineNumber: 13,
        columnNumber: 7
    }, this), size);
}
}),
"[project]/lib/data/portfolio.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
]})(),
"[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=_195u_sb4f8e98._.js.map