(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buttonClass",
    ()=>buttonClass,
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const VARIANT = {
    primary: "bg-sky text-ink hover:bg-white font-semibold",
    ghost: "text-muted hover:text-fg hover:bg-white/8",
    outline: "border border-line-strong text-fg hover:bg-white/8",
    danger: "border border-danger/50 text-danger hover:bg-danger/10"
};
const SIZE = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-4 text-sm",
    lg: "h-13 px-6 text-sm"
};
function buttonClass(variant = "outline", size = "md", extra = "") {
    return `display inline-flex shrink-0 items-center justify-center gap-2 rounded-xl uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-45 ${VARIANT[variant]} ${SIZE[size]} ${extra}`;
}
function Button({ variant = "outline", size = "md", className = "", type = "button", children, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        className: buttonClass(variant, size, className),
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Button.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Chip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chip",
    ()=>Chip,
    "FilterBar",
    ()=>FilterBar,
    "SearchField",
    ()=>SearchField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Chip({ children, tone = "default" }) {
    const cls = tone === "accent" ? "border-sky/35 bg-sky/10 text-sky" : "border-line bg-white/4 text-muted";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center rounded-lg border px-2.5 py-1 text-xs ${cls}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Chip.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
_c = Chip;
function FilterBar({ options, value, onChange, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "group",
        "aria-label": label,
        className: "no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 py-1",
        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-pressed": option === value,
                onClick: ()=>onChange(option),
                className: `display h-9 shrink-0 rounded-lg border px-3 text-xs uppercase tracking-[0.12em] transition ${option === value ? "border-sky/60 bg-sky/15 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"}`,
                children: option
            }, option, false, {
                fileName: "[project]/components/ui/Chip.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/ui/Chip.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c1 = FilterBar;
function SearchField({ value, onChange, label, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "relative block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/ui/Chip.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": true,
                viewBox: "0 0 24 24",
                className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dim",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm4.4 10.4L20 20"
                }, void 0, false, {
                    fileName: "[project]/components/ui/Chip.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/Chip.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "search",
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: "h-11 w-full rounded-xl border border-line bg-white/4 pl-9 pr-3 text-sm text-fg placeholder:text-dim focus:border-sky/60 focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/components/ui/Chip.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Chip.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c2 = SearchField;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Chip");
__turbopack_context__.k.register(_c1, "FilterBar");
__turbopack_context__.k.register(_c2, "SearchField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/GeneratedCover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneratedCover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/rng.ts [app-client] (ecmascript)");
;
;
const PALETTES = [
    [
        "#1b2a6b",
        "#7cc4ff",
        "#b79bff"
    ],
    [
        "#3b1456",
        "#ff7ad9",
        "#ffb86b"
    ],
    [
        "#0d3b3a",
        "#8be9c0",
        "#7cc4ff"
    ],
    [
        "#2a1a5e",
        "#b79bff",
        "#5ee6ff"
    ],
    [
        "#43210f",
        "#ffb86b",
        "#ffd166"
    ],
    [
        "#0e2b4d",
        "#5ee6ff",
        "#8be9c0"
    ]
];
function GeneratedCover({ seed, label, className = "" }) {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(seed * 7919 + 13);
    const [bg, a, b] = PALETTES[seed % PALETTES.length];
    const kind = seed % 4;
    const id = `cover-${seed}`;
    const bars = Array.from({
        length: 9
    }, ()=>20 + rng.next() * 70);
    const points = Array.from({
        length: 10
    }, (_, i)=>`${20 + i * 40},${150 - rng.next() * 90 - i * 3}`).join(" ");
    const dots = Array.from({
        length: 26
    }, ()=>({
            x: 20 + rng.next() * 360,
            y: 30 + rng.next() * 180,
            r: 2 + rng.next() * 7
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 400 240",
        preserveAspectRatio: "xMidYMid slice",
        className: className,
        role: "img",
        "aria-label": label ? `Generated cover for ${label}` : "Generated cover",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: `${id}-g`,
                        x1: "0",
                        y1: "0",
                        x2: "1",
                        y2: "1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0",
                                stopColor: bg
                            }, void 0, false, {
                                fileName: "[project]/components/ui/GeneratedCover.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: "#070912"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/GeneratedCover.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/GeneratedCover.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: `${id}-s`,
                        x1: "0",
                        y1: "0",
                        x2: "1",
                        y2: "0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0",
                                stopColor: a
                            }, void 0, false, {
                                fileName: "[project]/components/ui/GeneratedCover.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: b
                            }, void 0, false, {
                                fileName: "[project]/components/ui/GeneratedCover.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/GeneratedCover.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/GeneratedCover.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "400",
                height: "240",
                fill: `url(#${id}-g)`
            }, void 0, false, {
                fileName: "[project]/components/ui/GeneratedCover.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                opacity: "0.14",
                stroke: "#ffffff",
                strokeWidth: "1",
                children: [
                    Array.from({
                        length: 9
                    }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: i * 50,
                            y1: "0",
                            x2: i * 50,
                            y2: "240"
                        }, `v${i}`, false, {
                            fileName: "[project]/components/ui/GeneratedCover.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)),
                    Array.from({
                        length: 5
                    }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "0",
                            y1: i * 60,
                            x2: "400",
                            y2: i * 60
                        }, `h${i}`, false, {
                            fileName: "[project]/components/ui/GeneratedCover.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/GeneratedCover.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            kind === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: bars.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 30 + i * 39,
                        y: 210 - h * 1.7,
                        width: "26",
                        height: h * 1.7,
                        rx: "3",
                        fill: i % 2 === 0 ? a : b,
                        opacity: "0.9"
                    }, i, false, {
                        fileName: "[project]/components/ui/GeneratedCover.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ui/GeneratedCover.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this) : null,
            kind === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                fill: "none",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                        points: points,
                        stroke: `url(#${id}-s)`,
                        strokeWidth: "5"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/GeneratedCover.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                        points: points,
                        stroke: a,
                        strokeWidth: "14",
                        opacity: "0.15"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/GeneratedCover.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/GeneratedCover.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this) : null,
            kind === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: dots.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: d.x,
                        cy: d.y,
                        r: d.r,
                        fill: i % 3 === 0 ? b : a,
                        opacity: 0.35 + i % 5 * 0.12
                    }, i, false, {
                        fileName: "[project]/components/ui/GeneratedCover.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ui/GeneratedCover.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this) : null,
            kind === 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                fill: "none",
                stroke: `url(#${id}-s)`,
                strokeWidth: "3",
                children: [
                    [
                        30,
                        55,
                        80,
                        105
                    ].map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "280",
                            cy: "130",
                            r: r,
                            opacity: 1 - i * 0.2,
                            strokeDasharray: `${r * 2.2} ${r * 0.9}`
                        }, r, false, {
                            fileName: "[project]/components/ui/GeneratedCover.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M40 190 L120 110 L170 150 L230 70",
                        strokeWidth: "5",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/GeneratedCover.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/GeneratedCover.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/GeneratedCover.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = GeneratedCover;
var _c;
__turbopack_context__.k.register(_c, "GeneratedCover");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Icon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const PATHS = {
    menu: "M4 7h16M4 12h16M4 17h16",
    map: "M9 4 3.5 6.5v13L9 17l6 2.5 5.5-2.5v-13L15 6.5 9 4Zm0 0v13m6-10.5v13",
    volume: "M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Zm11.5-1a5 5 0 0 1 0 7m2.6-9.6a8.6 8.6 0 0 1 0 12.2",
    mute: "M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Zm12 0 5 5m0-5-5 5",
    settings: "M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm8 3.4-1.9-.6a6.4 6.4 0 0 0-.6-1.5l.9-1.8-1.5-1.5-1.8.9c-.5-.3-1-.5-1.5-.6L13 5h-2l-.6 1.9c-.5.1-1 .3-1.5.6l-1.8-.9-1.5 1.5.9 1.8c-.3.5-.5 1-.6 1.5L4 12v2l1.9.6c.1.5.3 1 .6 1.5l-.9 1.8 1.5 1.5 1.8-.9c.5.3 1 .5 1.5.6L11 21h2l.6-1.9c.5-.1 1-.3 1.5-.6l1.8.9 1.5-1.5-.9-1.8c.3-.5.5-1 .6-1.5L20 14v-2Z",
    camera: "M4 8h3l1.5-2h7L17 8h3v11H4V8Zm8 2.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z",
    recover: "M5 12a7 7 0 1 1 2.2 5.1M5 12V7m0 5h5",
    help: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-2.4 6.3a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2 1-1.2 1.9m0 2.6v.1",
    close: "M6 6l12 12M18 6 6 18",
    arrowRight: "M5 12h14m-5-5 5 5-5 5",
    arrowLeft: "M19 12H5m5-5-5 5 5 5",
    arrowUp: "M12 19V5m-5 5 5-5 5 5",
    turnLeft: "M18 19v-7a3 3 0 0 0-3-3H6m4-4-4 4 4 4",
    turnRight: "M6 19v-7a3 3 0 0 1 3-3h9m-4-4 4 4-4 4",
    uTurn: "M7 19V9.5a4.5 4.5 0 0 1 9 0V15m-3-3 3 3 3-3",
    flag: "M6 21V4m0 0h11l-2 4 2 4H6",
    external: "M14 5h5v5m0-5-8 8M10 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4",
    download: "M12 4v11m-4-4 4 4 4-4M5 19h14",
    mail: "M4 6.5h16v11H4v-11Zm0 .5 8 6 8-6",
    pin: "M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    play: "M8 5.5v13l10-6.5-10-6.5Z",
    pause: "M8 5v14M16 5v14",
    power: "M12 4v8m5.2-5.2a7.4 7.4 0 1 1-10.4 0",
    search: "M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm4.4 10.4L20 20",
    chevronDown: "M6 9.5l6 6 6-6",
    chevronRight: "M9.5 6l6 6-6 6",
    wheel: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 6.2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6ZM3.6 11h6.2m4.4 0h6.2M12 14.3v6.2",
    layers: "m12 4 8.5 4.5L12 13 3.5 8.5 12 4Zm-8.5 8 8.5 4.5 8.5-4.5M3.5 15.5 12 20l8.5-4.5",
    sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4",
    check: "m5 12.5 4.5 4.5L19 7.5",
    alert: "M12 4 2.8 19.5h18.4L12 4Zm0 6v4.5m0 2.6v.1",
    home: "M4 11.5 12 4.5l8 7V20h-5.5v-5.5h-5V20H4v-8.5Z",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7.5 8.5a7.5 7.5 0 0 1 15 0",
    briefcase: "M4 8h16v11H4V8Zm5 0V5.5h6V8M4 13h16",
    cap: "m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5Zm4 2.2V16c1.4 1.3 3.3 2 5.5 2s4.1-.7 5.5-2v-4.3M21.5 9.5V15",
    code: "m8.5 7-5 5 5 5m7-10 5 5-5 5M13.5 5l-3 14",
    palette: "M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.9-1 1.5-2.1-.5-1.3.3-2.4 1.7-2.4H17a3.5 3.5 0 0 0 3.5-3.5c0-5-3.8-9-8.5-9ZM7.5 12.5v.1m2-4.6v.1m5-.1v.1",
    spark: "M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14l-6.7-2 6.7-2L12 3.5Z",
    book: "M5 5.5h6a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 0 11 16.5H5v-11Zm14 0h-3a2.5 2.5 0 0 0-2.5 2.5v11a2.5 2.5 0 0 1 2.5-2.5h3v-11Z",
    file: "M7 3.5h7l4 4V20.5H7v-17Zm7 0v4h4M9.5 12h6m-6 3.5h6",
    github: "M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.6c-2.4.5-2.9-1-2.9-1-.4-1-.9-1.2-.9-1.2-.8-.5 0-.5 0-.5.8.1 1.3.9 1.3.9.7 1.3 2 .9 2.5.7.1-.5.3-.9.5-1.1-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.2-2 4-3.9 4.2.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A8.5 8.5 0 0 0 12 3.5Z",
    linkedin: "M5 9.5h3v10H5v-10Zm1.5-5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4ZM10.5 9.5h2.9v1.4c.5-.9 1.6-1.7 3.2-1.7 3 0 3.4 2 3.4 4.4v5.9h-3v-5.2c0-1.3-.2-2.4-1.6-2.4-1.4 0-1.9 1-1.9 2.4v5.2h-3v-10Z",
    globe: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-8.5 8.5h17M12 3.5c2.3 2.3 3.5 5.1 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.1-3.5-8.5S9.7 5.8 12 3.5Z",
    gamepad: "M7 8h10a4 4 0 0 1 4 4.5l-.6 3.8a2 2 0 0 1-3.5 1L15 15H9l-1.9 2.3a2 2 0 0 1-3.5-1L3 12.5A4 4 0 0 1 7 8Zm1 2.5v3m-1.5-1.5h3m5.5-.5v.1m2 1.4v.1",
    eye: "M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Zm9.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    terminal: "M4 5.5h16v13H4v-13Zm3.5 4 3 2.5-3 2.5m5 .5h4"
};
function Icon({ name, size = 18, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        focusable: "false",
        ...rest,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: PATHS[name]
        }, void 0, false, {
            fileName: "[project]/components/ui/Icon.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/Icon.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_c = Icon;
var _c;
__turbopack_context__.k.register(_c, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const SIZES = {
    md: "sm:max-w-lg",
    lg: "sm:max-w-3xl",
    xl: "sm:max-w-5xl",
    full: "sm:max-w-6xl"
};
function Modal({ title, kicker, accent = "#7cc4ff", onClose, children, size = "lg", actions, testId, bodyClassName, fill }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onCloseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onClose);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            onCloseRef.current = onClose;
        }
    }["Modal.useEffect"], [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            const node = ref.current;
            node?.focus({
                preventScroll: true
            });
            const onKey = {
                "Modal.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") {
                        e.stopPropagation();
                        onCloseRef.current();
                        return;
                    }
                    if (e.key !== "Tab" || !node) return;
                    const items = Array.from(node.querySelectorAll(FOCUSABLE)).filter({
                        "Modal.useEffect.onKey.items": (el)=>el.offsetParent !== null || el === document.activeElement
                    }["Modal.useEffect.onKey.items"]);
                    if (items.length === 0) {
                        e.preventDefault();
                        return;
                    }
                    const first = items[0];
                    const last = items[items.length - 1];
                    const active = document.activeElement;
                    if (e.shiftKey && (active === first || active === node)) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && active === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }["Modal.useEffect.onKey"];
            node?.addEventListener("keydown", onKey);
            return ({
                "Modal.useEffect": ()=>{
                    node?.removeEventListener("keydown", onKey);
                    if (previous && document.contains(previous)) previous.focus({
                        preventScroll: true
                    });
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade absolute inset-0 z-40 flex items-stretch justify-center sm:items-center sm:p-6",
        "data-testid": testId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-ink/70 backdrop-blur-sm",
                onClick: onClose,
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/ui/Modal.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                role: "dialog",
                "aria-modal": "true",
                "aria-label": title,
                tabIndex: -1,
                className: `glass-solid selectable animate-rise relative flex max-h-full w-full flex-col overflow-hidden outline-none sm:max-h-[min(88dvh,60rem)] sm:rounded-2xl ${SIZES[size]} ${fill ? "h-full sm:h-[min(88dvh,60rem)]" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-full shrink-0",
                        style: {
                            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`
                        },
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Modal.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    kicker ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hud-label truncate",
                                        style: {
                                            color: accent
                                        },
                                        children: kicker
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Modal.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "display mt-0.5 truncate text-xl font-semibold text-fg sm:text-2xl",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Modal.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/Modal.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex shrink-0 items-center gap-2",
                                children: [
                                    actions,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onClose,
                                        className: "flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition hover:bg-white/8 hover:text-fg",
                                        "aria-label": "Close",
                                        "data-testid": "modal-close",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            name: "close"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/Modal.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Modal.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/Modal.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/Modal.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `thin-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6 ${bodyClassName ?? ""}`,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Modal.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Modal.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Modal.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(Modal, "p3G52uRLiAFfzPBeJ08XG4tIF24=");
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/RichText.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RichText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:[^)\s]+)\)/g;
function RichText({ text }) {
    const out = [];
    let last = 0;
    for (const match of text.matchAll(TOKEN)){
        const index = match.index ?? 0;
        if (index > last) out.push(text.slice(last, index));
        if (match[1] !== undefined) {
            out.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                className: "font-semibold text-fg",
                children: match[1]
            }, index, false, {
                fileName: "[project]/components/ui/RichText.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this));
        } else {
            out.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: match[3],
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-sky underline underline-offset-2 hover:no-underline",
                children: match[2]
            }, index, false, {
                fileName: "[project]/components/ui/RichText.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this));
        }
        last = index + match[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: out
    }, void 0, false, {
        fileName: "[project]/components/ui/RichText.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
_c = RichText;
var _c;
__turbopack_context__.k.register(_c, "RichText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/StatusBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
;
;
const LABEL = {
    verified: "",
    draft: "Draft",
    placeholder: "Placeholder"
};
const TITLE = {
    verified: "",
    draft: "Imported from the résumé draft. Details are awaiting final review.",
    placeholder: "Sample content. Replace it in lib/data before publishing."
};
function StatusBadge({ status, className = "" }) {
    if (status === "verified" || !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].showStatusBadges) return null;
    const tone = status === "placeholder" ? "border-amber/40 text-amber" : "border-line-strong text-muted";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        title: TITLE[status],
        className: `display inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 text-[0.625rem] uppercase tracking-[0.16em] ${tone} ${className}`,
        children: [
            LABEL[status],
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: [
                    ": ",
                    TITLE[status]
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/StatusBadge.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/StatusBadge.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=components_ui_1v-l05p4hsctk._.js.map