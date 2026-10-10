(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
(()=>{"use strict";return[
"[project]/components/game/ControlsGuide.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ControlsGuide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const KEYBOARD = [
    [
        "W / ↑",
        "Accelerate"
    ],
    [
        "S / ↓",
        "Brake, then reverse once stopped"
    ],
    [
        "A D / ← →",
        "Steer"
    ],
    [
        "Space",
        "Handbrake; hold while steering to start a drift"
    ],
    [
        "Shift",
        "Boost; at full lock it kicks the tail out"
    ],
    [
        "E",
        "Interact with the nearby landmark"
    ],
    [
        "C",
        "Cycle cameras"
    ],
    [
        "V",
        "Cockpit / chase camera"
    ],
    [
        "M",
        "World map"
    ],
    [
        "R",
        "Recover to the last safe road position"
    ],
    [
        "I",
        "Start or stop the engine"
    ],
    [
        "N",
        "Mute sound"
    ],
    [
        "H",
        "Show or hide this guide"
    ],
    [
        "Esc",
        "Close the open interface, or pause"
    ],
    [
        "Drag",
        "Look around"
    ]
];
const TOUCH = [
    [
        "Steering pad",
        "Drag left or right; release to centre"
    ],
    [
        "Gas",
        "Hold to accelerate"
    ],
    [
        "Brake",
        "Hold to brake, then reverse"
    ],
    [
        "Hand / Boost",
        "Hold for the handbrake or a burst of speed"
    ],
    [
        "Drift",
        "Hold Hand while steering, then keep on the gas"
    ],
    [
        "Arrow button",
        "Appears near a landmark; tap to open it"
    ],
    [
        "Drag the view",
        "Look around"
    ]
];
const GAMEPAD = [
    [
        "Left stick",
        "Steer"
    ],
    [
        "RT / LT",
        "Accelerate / brake and reverse"
    ],
    [
        "A",
        "Interact"
    ],
    [
        "B / X",
        "Handbrake (drift) / boost"
    ],
    [
        "Y",
        "Cycle cameras"
    ],
    [
        "RB",
        "Recover"
    ],
    [
        "Back / Start",
        "Map / pause"
    ]
];
function Table({ title, rows }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "hud-label text-sky",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/game/ControlsGuide.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "mt-2 divide-y divide-line rounded-xl border border-line bg-white/3",
                children: rows.map(([key, action])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-4 px-3.5 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                    className: "whitespace-nowrap rounded-md border border-line-strong bg-white/6 px-2 py-1 font-mono text-xs text-fg",
                                    children: key
                                }, void 0, false, {
                                    fileName: "[project]/components/game/ControlsGuide.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/game/ControlsGuide.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "text-right text-sm text-muted",
                                children: action
                            }, void 0, false, {
                                fileName: "[project]/components/game/ControlsGuide.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/components/game/ControlsGuide.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/game/ControlsGuide.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/ControlsGuide.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = Table;
function ControlsGuide({ onClose }) {
    _s();
    const inputMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "ControlsGuide.useGameStore[inputMode]": (s)=>s.inputMode
    }["ControlsGuide.useGameStore[inputMode]"]);
    const order = inputMode === "touch" ? [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Touch",
            rows: TOUCH
        }, "t", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Keyboard",
            rows: KEYBOARD
        }, "k", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 66,
            columnNumber: 56
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Gamepad",
            rows: GAMEPAD
        }, "g", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 66,
            columnNumber: 108
        }, this)
    ] : inputMode === "gamepad" ? [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Gamepad",
            rows: GAMEPAD
        }, "g", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 68,
            columnNumber: 12
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Keyboard",
            rows: KEYBOARD
        }, "k", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 68,
            columnNumber: 62
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Touch",
            rows: TOUCH
        }, "t", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 68,
            columnNumber: 114
        }, this)
    ] : [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Keyboard",
            rows: KEYBOARD
        }, "k", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 69,
            columnNumber: 12
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Gamepad",
            rows: GAMEPAD
        }, "g", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 69,
            columnNumber: 64
        }, this),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Table, {
            title: "Touch",
            rows: TOUCH
        }, "t", false, {
            fileName: "[project]/components/game/ControlsGuide.tsx",
            lineNumber: 69,
            columnNumber: 114
        }, this)
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: "Controls",
        kicker: "How to drive",
        onClose: onClose,
        size: "lg",
        testId: "controls-guide",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: order[0]
                    }, void 0, false, {
                        fileName: "[project]/components/game/ControlsGuide.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            order[1],
                            order[2]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/ControlsGuide.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/ControlsGuide.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 rounded-xl border border-line bg-white/3 p-4",
                "aria-labelledby": "drift-help",
                "data-testid": "drift-help",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "drift-help",
                        className: "hud-label text-amber",
                        children: "Drifting"
                    }, void 0, false, {
                        fileName: "[project]/components/game/ControlsGuide.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Build some speed, turn in and tap the handbrake to break the rear loose."
                            }, void 0, false, {
                                fileName: "[project]/components/game/ControlsGuide.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Stay on the throttle and keep steering to hold the slide. More lock means more angle."
                            }, void 0, false, {
                                fileName: "[project]/components/game/ControlsGuide.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Steer the other way to swing into the opposite drift; ease off the throttle and steering to straighten up."
                            }, void 0, false, {
                                fileName: "[project]/components/game/ControlsGuide.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Angle, speed and time build the score, and long drifts raise the multiplier. Touching anything loses the run."
                            }, void 0, false, {
                                fileName: "[project]/components/game/ControlsGuide.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/ControlsGuide.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/ControlsGuide.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-6 text-sm text-muted",
                children: "Prefer not to drive? Every section is one click away in the Portfolio menu, and the map can take you straight to any landmark."
            }, void 0, false, {
                fileName: "[project]/components/game/ControlsGuide.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/ControlsGuide.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(ControlsGuide, "haZHhhzGGA8AdDAw3CSUDA2Vhsg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c1 = ControlsGuide;
var _c, _c1;
__turbopack_context__.k.register(_c, "Table");
__turbopack_context__.k.register(_c1, "ControlsGuide");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/DriftMeter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DriftMeter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/useHud.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const format = (n)=>Math.round(n).toLocaleString("en-US");
function DriftMeter() {
    _s();
    const best = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "DriftMeter.useGameStore[best]": (s)=>s.bestDrift
    }["DriftMeter.useGameStore[best]"]);
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const detail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const live = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const last = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        state: "idle",
        points: -1,
        detail: "",
        version: -1
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"])({
        "DriftMeter.useFrameLoop": ()=>{
            const run = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].drift;
            const l = last.current;
            const state = run.active ? "active" : run.sinceEnd < 2.4 && run.lastPoints > 0 ? run.lastLost ? "lost" : "banked" : "idle";
            if (state !== l.state && root.current) {
                l.state = state;
                root.current.dataset.state = state;
            }
            if (state === "idle") return;
            const shown = state === "active" ? Math.round(run.points) : run.lastPoints;
            if (shown !== l.points && points.current) {
                l.points = shown;
                points.current.textContent = state === "banked" ? `+${format(shown)}` : format(shown);
            }
            const text = state === "active" ? `×${run.multiplier.toFixed(1)} · ${Math.round(run.angle)}°` : state === "banked" ? "Banked" : "Lost on contact";
            if (text !== l.detail && detail.current) {
                l.detail = text;
                detail.current.textContent = text;
            }
            // Announce finished runs once, not every frame.
            if (run.version !== l.version && live.current) {
                l.version = run.version;
                if (run.version > 0) live.current.textContent = run.lastLost ? "Drift lost" : `Drift banked: ${format(run.lastPoints)} points`;
            }
        }
    }["DriftMeter.useFrameLoop"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: root,
        "data-state": "idle",
        "data-testid": "drift-meter",
        className: "group pointer-events-none mx-auto mb-2 flex w-max items-center gap-3 rounded-2xl border border-amber/40 bg-ink/65 px-4 py-2 opacity-0 backdrop-blur-md transition-opacity duration-200 data-[state=active]:opacity-100 data-[state=banked]:border-mint/50 data-[state=banked]:opacity-100 data-[state=lost]:border-danger/50 data-[state=lost]:opacity-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "display text-xs font-semibold uppercase tracking-[0.2em] text-amber group-data-[state=banked]:text-mint group-data-[state=lost]:text-danger",
                children: "Drift"
            }, void 0, false, {
                fileName: "[project]/components/game/DriftMeter.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: points,
                className: "display min-w-[3ch] text-right text-2xl font-semibold tabular-nums text-fg group-data-[state=lost]:line-through group-data-[state=lost]:opacity-60",
                children: "0"
            }, void 0, false, {
                fileName: "[project]/components/game/DriftMeter.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex flex-col text-[0.6875rem] leading-tight text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: detail,
                        className: "font-mono tabular-nums text-fg/90"
                    }, void 0, false, {
                        fileName: "[project]/components/game/DriftMeter.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Best ",
                            format(best)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/DriftMeter.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/DriftMeter.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                ref: live,
                className: "sr-only",
                role: "status",
                "aria-live": "polite"
            }, void 0, false, {
                fileName: "[project]/components/game/DriftMeter.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/DriftMeter.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(DriftMeter, "arJbvH42/IB3q0r7wTUg5InLZQM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"]
    ];
});
_c = DriftMeter;
var _c;
__turbopack_context__.k.register(_c, "DriftMeter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/Effects.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Effects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postprocessing/build/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/performance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/sky.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function Effects() {
    _s();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Effects.useGameStore[quality]": (s)=>s.quality
    }["Effects.useGameStore[quality]"]);
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Effects.useGameStore[timeOfDay]": (s)=>s.timeOfDay
    }["Effects.useGameStore[timeOfDay]"]);
    const profile = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality];
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"][timeOfDay];
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "Effects.useThree[gl]": (s)=>s.gl
    }["Effects.useThree[gl]"]);
    const enabled = profile.bloom || profile.vignette;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Effects.useEffect": ()=>{
            gl.toneMapping = enabled ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoToneMapping"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
        }
    }["Effects.useEffect"], [
        gl,
        enabled
    ]);
    if (!enabled) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
        multisampling: profile.antialias ? quality === "high" ? 4 : 2 : 0,
        enableNormalPass: false,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bloom"], {
                intensity: preset.bloom,
                luminanceThreshold: 1.0,
                luminanceSmoothing: 0.25,
                mipmapBlur: true,
                radius: 0.72
            }, void 0, false, {
                fileName: "[project]/components/game/Effects.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vignette"], {
                offset: 0.28,
                darkness: profile.vignette ? 0.5 : 0
            }, void 0, false, {
                fileName: "[project]/components/game/Effects.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToneMapping"], {
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToneMappingMode"].ACES_FILMIC
            }, void 0, false, {
                fileName: "[project]/components/game/Effects.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/Effects.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(Effects, "1ZBlZK+VVuwt8VAWrBU3/Bg9Now=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"]
    ];
});
_c = Effects;
var _c;
__turbopack_context__.k.register(_c, "Effects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/ErrorScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ErrorScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ErrorScreen({ onRetry }) {
    _s();
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "ErrorScreen.useGameStore[error]": (s)=>s.error
    }["ErrorScreen.useGameStore[error]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "selectable absolute inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink p-6",
        role: "alert",
        "data-testid": "error-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: "alert",
                    size: 30,
                    className: "text-amber"
                }, void 0, false, {
                    fileName: "[project]/components/game/ErrorScreen.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "display mt-4 text-3xl font-semibold text-fg",
                    children: "The 3D city could not start"
                }, void 0, false, {
                    fileName: "[project]/components/game/ErrorScreen.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-muted",
                    children: error ?? "Something went wrong while preparing the world."
                }, void 0, false, {
                    fileName: "[project]/components/game/ErrorScreen.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-muted",
                    children: [
                        "Nothing is lost: all of ",
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].name.split(" ")[0],
                        "'s work is available as normal pages."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/ErrorScreen.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex flex-wrap gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onRetry,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("primary"),
                            "data-testid": "error-retry",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "recover"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/ErrorScreen.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this),
                                " Try again"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/ErrorScreen.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/about",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("outline"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "layers"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/ErrorScreen.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                " Open the classic site"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/ErrorScreen.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/ErrorScreen.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "mt-8 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigation"].filter((n)=>n.section !== "home").map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: n.href,
                                className: "text-sky underline-offset-4 hover:underline",
                                children: n.label
                            }, void 0, false, {
                                fileName: "[project]/components/game/ErrorScreen.tsx",
                                lineNumber: 34,
                                columnNumber: 17
                            }, this)
                        }, n.section, false, {
                            fileName: "[project]/components/game/ErrorScreen.tsx",
                            lineNumber: 33,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/game/ErrorScreen.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/ErrorScreen.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/ErrorScreen.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(ErrorScreen, "q0kzj9f+kQ5V/kb2z9WwCPRrXf4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = ErrorScreen;
var _c;
__turbopack_context__.k.register(_c, "ErrorScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/GameCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/performance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$CameraRig$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/vehicle/CameraRig.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$DriftEffects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/vehicle/DriftEffects.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$Vehicle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/vehicle/Vehicle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$CityScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/CityScene.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$Environment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/Environment.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$Landmarks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/Landmarks.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$RouteGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/RouteGuide.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$Effects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/Effects.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/** Compiles shaders up front, then reports the first rendered frame. */ function ReadySignal({ onReady }) {
    _s();
    const { gl, scene, camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const frames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReadySignal.useEffect": ()=>{
            void gl.compileAsync(scene, camera).catch({
                "ReadySignal.useEffect": ()=>undefined
            }["ReadySignal.useEffect"]);
        }
    }["ReadySignal.useEffect"], [
        gl,
        scene,
        camera
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "ReadySignal.useFrame": ()=>{
            if (done.current) return;
            frames.current++;
            if (frames.current >= 3) {
                done.current = true;
                onReady();
            }
        }
    }["ReadySignal.useFrame"]);
    return null;
}
_s(ReadySignal, "PtB0M5l4ME2g6HQ7N+Gg9xBE8os=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ReadySignal;
/** Samples renderer statistics once a second for the settings panel and tests. */ function PerfProbe() {
    _s1();
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "PerfProbe.useThree[gl]": (s)=>s.gl
    }["PerfProbe.useThree[gl]"]);
    const acc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        time: 0,
        frames: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "PerfProbe.useFrame": (_, dt)=>{
            const a = acc.current;
            a.time += dt;
            a.frames++;
            if (a.time >= 1) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stats.fps = Math.round(a.frames / a.time);
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stats.frameMs = Math.round(a.time / a.frames * 1000);
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stats.calls = gl.info.render.calls;
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stats.triangles = gl.info.render.triangles;
                a.time = 0;
                a.frames = 0;
            }
        }
    }["PerfProbe.useFrame"]);
    return null;
}
_s1(PerfProbe, "vDqfNXFPLxoy/kCG/bBRxuG3600=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = PerfProbe;
function GameCanvas({ assets, onReady, onContextLost }) {
    _s2();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameCanvas.useGameStore[quality]": (s)=>s.quality
    }["GameCanvas.useGameStore[quality]"]);
    const overlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameCanvas.useGameStore[overlay]": (s)=>s.overlay
    }["GameCanvas.useGameStore[overlay]"]);
    const phase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameCanvas.useGameStore[phase]": (s)=>s.phase
    }["GameCanvas.useGameStore[phase]"]);
    const profile = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality];
    // Nothing moves behind an open interface, so stop rendering continuously.
    // Settings stays live so quality and lighting changes are visible at once.
    const idle = phase === "driving" && overlay !== "none" && overlay !== "settings";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        className: "!absolute inset-0",
        "data-testid": "world-canvas",
        dpr: [
            1,
            profile.maxDpr
        ],
        shadows: profile.shadows ? "percentage" : false,
        frameloop: idle ? "demand" : "always",
        gl: {
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            alpha: false
        },
        camera: {
            fov: 50,
            near: 0.3,
            far: 3000,
            position: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN"].x - 5,
                2,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN"].z + 9
            ]
        },
        onCreated: ({ gl })=>{
            gl.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            gl.domElement.addEventListener("webglcontextlost", (e)=>{
                e.preventDefault();
                onContextLost();
            });
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$Environment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$CityScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                city: assets.city,
                textures: assets.textures,
                fontFamily: assets.fontFamily
            }, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$Landmarks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                textures: assets.textures,
                fontFamily: assets.fontFamily
            }, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$Vehicle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                car: assets.car,
                textures: assets.textures
            }, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$DriftEffects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$RouteGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                textures: assets.textures
            }, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$CameraRig$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                car: assets.car
            }, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$Effects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PerfProbe, {}, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadySignal, {
                onReady: onReady
            }, void 0, false, {
                fileName: "[project]/components/game/GameCanvas.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/GameCanvas.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s2(GameCanvas, "2e5LMX+5vmBc5MNKU9bjRJ8IGWI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c2 = GameCanvas;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ReadySignal");
__turbopack_context__.k.register(_c1, "PerfProbe");
__turbopack_context__.k.register(_c2, "GameCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/GameHUD.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameHUD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$DriftMeter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/DriftMeter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$Speedometer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/Speedometer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$WorldMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/WorldMap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/useHud.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const CAMERA_LABEL = {
    cockpit: "Cockpit",
    chase: "Chase",
    cinematic: "Cinematic"
};
function HudButton({ icon, label, onClick, active, testId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        "aria-label": label,
        title: label,
        "aria-pressed": active,
        "data-testid": testId,
        className: `glass flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white/12 ${active ? "text-sky" : "text-fg"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            name: icon,
            size: 20
        }, void 0, false, {
            fileName: "[project]/components/game/GameHUD.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/GameHUD.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = HudButton;
const TURN_ICON = {
    straight: "arrowUp",
    left: "turnLeft",
    right: "turnRight",
    "u-turn": "uTurn",
    arrive: "flag"
};
function instructionText(g) {
    switch(g.instruction){
        case "left":
            return `Turn left in ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistance"])(g.distanceToTurn)}`;
        case "right":
            return `Turn right in ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistance"])(g.distanceToTurn)}`;
        case "u-turn":
            return "Turn around when you can";
        case "arrive":
            return "Destination ahead";
        default:
            return `Continue for ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistance"])(g.distanceToTurn)}`;
    }
}
/** Turn-by-turn guidance for the selected destination. */ function GuidanceCard() {
    _s();
    const routeTargetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GuidanceCard.useGameStore[routeTargetId]": (s)=>s.routeTargetId
    }["GuidanceCard.useGameStore[routeTargetId]"]);
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"])({
        "GuidanceCard.usePolled[g]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].guidance
    }["GuidanceCard.usePolled[g]"], 250);
    const target = routeTargetId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(routeTargetId) : undefined;
    if (!target) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass flex items-center gap-3 rounded-2xl py-2.5 pl-3 pr-2",
        "data-testid": "guidance",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky/15 text-sky",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: g ? TURN_ICON[g.instruction] : "flag",
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/components/game/GameHUD.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-sm font-medium text-fg",
                        children: g ? instructionText(g) : "Calculating route…"
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-xs text-muted",
                        children: [
                            target.name,
                            g ? ` · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistance"])(g.remaining)}` : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearRoute"],
                "aria-label": "Cancel route",
                title: "Cancel route",
                className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-fg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: "close",
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/components/game/GameHUD.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/GameHUD.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(GuidanceCard, "HdyniM6p46KEovY1TrPKkPRhJZ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"]
    ];
});
_c1 = GuidanceCard;
function GameHUD({ touch }) {
    _s1();
    const district = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[district]": (s)=>s.district
    }["GameHUD.useGameStore[district]"]);
    const muted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[muted]": (s)=>s.muted
    }["GameHUD.useGameStore[muted]"]);
    const cameraMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[cameraMode]": (s)=>s.cameraMode
    }["GameHUD.useGameStore[cameraMode]"]);
    const stuck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[stuck]": (s)=>s.stuck
    }["GameHUD.useGameStore[stuck]"]);
    const engineOn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[engineOn]": (s)=>s.engineOn
    }["GameHUD.useGameStore[engineOn]"]);
    const setMuted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[setMuted]": (s)=>s.setMuted
    }["GameHUD.useGameStore[setMuted]"]);
    const openOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[openOverlay]": (s)=>s.openOverlay
    }["GameHUD.useGameStore[openOverlay]"]);
    const cycleCamera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[cycleCamera]": (s)=>s.cycleCamera
    }["GameHUD.useGameStore[cycleCamera]"]);
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDistrict"])(district);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 z-20 p-[var(--hud-pad)]",
        "data-testid": "hud",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-[var(--hud-pad)] top-[var(--hud-pad)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "display text-lg font-semibold tracking-[0.2em] text-fg drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].shortName
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    touch ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hud-label hidden drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:block",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].disciplines.join(" · ")
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 108,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                "aria-label": "Game controls",
                className: "pointer-events-auto absolute right-[var(--hud-pad)] top-[var(--hud-pad)] flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HudButton, {
                        icon: "map",
                        label: "World map (M)",
                        onClick: ()=>openOverlay("map"),
                        testId: "hud-map"
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HudButton, {
                        icon: muted ? "mute" : "volume",
                        label: muted ? "Unmute sound (N)" : "Mute sound (N)",
                        onClick: ()=>setMuted(!muted),
                        active: muted,
                        testId: "hud-mute"
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HudButton, {
                        icon: "settings",
                        label: "Pause and settings (Esc)",
                        onClick: ()=>openOverlay("settings"),
                        testId: "hud-settings"
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>openOverlay("menu"),
                        className: "glass display flex h-11 items-center gap-2 rounded-xl px-3.5 text-xs uppercase tracking-[0.16em] text-fg transition hover:bg-white/12",
                        "data-testid": "hud-menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "menu",
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Portfolio"
                            }, void 0, false, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 122,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only sm:hidden",
                                children: "Portfolio menu"
                            }, void 0, false, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `pointer-events-auto absolute left-[var(--hud-pad)] flex max-w-[min(22rem,calc(100vw-2*var(--hud-pad)))] flex-col gap-2 ${touch ? "portrait:top-[calc(var(--hud-pad)+8.25rem)] landscape:top-[calc(var(--hud-pad)+3.75rem)]" : "bottom-[var(--hud-pad)]"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GuidanceCard, {}, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-2",
                        children: [
                            touch ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden lg:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$WorldMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniMap"], {}, void 0, false, {
                                    fileName: "[project]/components/game/GameHUD.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `glass rounded-2xl ${touch ? "px-3 py-1.5" : "px-4 py-2.5"}`,
                                "data-testid": "district",
                                "data-district": district,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: touch ? "sr-only" : "hud-label",
                                        children: "Current district"
                                    }, void 0, false, {
                                        fileName: "[project]/components/game/GameHUD.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "display mt-0.5 flex items-center gap-2 text-sm font-semibold text-fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 w-2 rounded-full",
                                                style: {
                                                    background: d.color
                                                },
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/game/GameHUD.tsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            d.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/game/GameHUD.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute left-1/2 -translate-x-1/2 ${touch ? "origin-top scale-[0.78] portrait:top-[calc(var(--hud-pad)+3.5rem)] landscape:top-[calc(var(--hud-pad)-0.25rem)]" : "bottom-[var(--hud-pad)]"}`,
                children: [
                    touch ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$DriftMeter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 155,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$Speedometer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    touch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$DriftMeter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/components/game/GameHUD.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this) : null,
                    !engineOn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-center text-xs text-amber drop-shadow",
                        children: [
                            "Engine off",
                            touch ? "" : " · press I to start"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 162,
                        columnNumber: 22
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            touch ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto absolute bottom-[var(--hud-pad)] right-[var(--hud-pad)] flex items-end gap-2",
                children: [
                    stuck ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverVehicle"],
                        className: "glass animate-rise display flex h-11 items-center gap-2 rounded-xl border-amber/50 px-3 text-xs uppercase tracking-[0.14em] text-amber",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "recover"
                            }, void 0, false, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 174,
                                columnNumber: 15
                            }, this),
                            " Stuck? Recover (R)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 169,
                        columnNumber: 13
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: cycleCamera,
                        className: "glass display flex h-11 items-center gap-2 rounded-xl px-3 text-xs uppercase tracking-[0.14em] text-fg transition hover:bg-white/12",
                        "aria-label": `Camera: ${CAMERA_LABEL[cameraMode]}. Switch camera (C)`,
                        title: "Switch camera (C)",
                        "data-testid": "hud-camera",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "camera",
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden md:inline",
                                children: CAMERA_LABEL[cameraMode]
                            }, void 0, false, {
                                fileName: "[project]/components/game/GameHUD.tsx",
                                lineNumber: 185,
                                columnNumber: 46
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HudButton, {
                        icon: "recover",
                        label: "Recover to road (R)",
                        onClick: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverVehicle"],
                        testId: "hud-recover"
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HudButton, {
                        icon: "help",
                        label: "Controls (H)",
                        onClick: ()=>openOverlay("controls"),
                        testId: "hud-help"
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameHUD.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/GameHUD.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/GameHUD.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s1(GameHUD, "nqBdG8SN23NK0ma6ZmQk++uWJ/0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c2 = GameHUD;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HudButton");
__turbopack_context__.k.register(_c1, "GuidanceCard");
__turbopack_context__.k.register(_c2, "GameHUD");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/GameRoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/audio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/input.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$ControlsGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/ControlsGuide.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$ErrorScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/ErrorScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/GameCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$GameHUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/GameHUD.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$InteractionPrompt$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/InteractionPrompt.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$IntroScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/IntroScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$LoadingScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/LoadingScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$LookSurface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/LookSurface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$MainMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/MainMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$PortfolioPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/PortfolioPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/SettingsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$TouchControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/TouchControls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$WorldMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/WorldMap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useWorldAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/useWorldAssets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function GameRoot() {
    _s();
    const [attempt, setAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const assets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useWorldAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorldAssets"])(attempt);
    const phase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameRoot.useGameStore[phase]": (s)=>s.phase
    }["GameRoot.useGameStore[phase]"]);
    const overlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameRoot.useGameStore[overlay]": (s)=>s.overlay
    }["GameRoot.useGameStore[overlay]"]);
    const panel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameRoot.useGameStore[panel]": (s)=>s.panel
    }["GameRoot.useGameStore[panel]"]);
    const inputMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameRoot.useGameStore[inputMode]": (s)=>s.inputMode
    }["GameRoot.useGameStore[inputMode]"]);
    const touchDevice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameRoot.useGameStore[touchDevice]": (s)=>s.touchDevice
    }["GameRoot.useGameStore[touchDevice]"]);
    const closeOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameRoot.useGameStore[closeOverlay]": (s)=>s.closeOverlay
    }["GameRoot.useGameStore[closeOverlay]"]);
    const showTouch = touchDevice && inputMode !== "keyboard" && inputMode !== "gamepad";
    const onReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameRoot.useCallback[onReady]": ()=>{
            const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
            store.setStage("experience", "done");
            if (store.phase !== "loading") return;
            store.setPhase("intro");
            if (new URLSearchParams(window.location.search).has("autostart")) store.startDriving();
        }
    }["GameRoot.useCallback[onReady]"], []);
    const onContextLost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameRoot.useCallback[onContextLost]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().fail("The graphics context was lost. This can happen when the device is low on memory.");
        }
    }["GameRoot.useCallback[onContextLost]"], []);
    const retry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameRoot.useCallback[retry]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].setState({
                phase: "loading",
                error: null,
                overlay: "none",
                panel: null,
                stages: {
                    app: "active",
                    vehicle: "pending",
                    city: "pending",
                    environment: "pending",
                    controls: "pending",
                    experience: "pending"
                }
            });
            setAttempt({
                "GameRoot.useCallback[retry]": (a)=>a + 1
            }["GameRoot.useCallback[retry]"]);
        }
    }["GameRoot.useCallback[retry]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameRoot.useEffect": ()=>{
            const detach = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].attach(window);
            const offAction = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].onAction(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleAction"]);
            const offSource = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].onSource({
                "GameRoot.useEffect.offSource": (source)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().setInputMode(source)
            }["GameRoot.useEffect.offSource"]);
            const unbind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bindGameState"])();
            const onVisibility = {
                "GameRoot.useEffect.onVisibility": ()=>{
                    if (document.hidden) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].suspend();
                    else if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().phase === "driving" && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().overlay === "none") __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].resume();
                }
            }["GameRoot.useEffect.onVisibility"];
            document.addEventListener("visibilitychange", onVisibility);
            return ({
                "GameRoot.useEffect": ()=>{
                    detach();
                    offAction();
                    offSource();
                    unbind();
                    document.removeEventListener("visibilitychange", onVisibility);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].suspend();
                }
            })["GameRoot.useEffect"];
        }
    }["GameRoot.useEffect"], []);
    // Read-only handle for automated tests and debugging in the console.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameRoot.useEffect": ()=>{
            const w = window;
            w.__world = {
                runtime: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
                store: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
                input: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"],
                destinations: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"]
            };
            return ({
                "GameRoot.useEffect": ()=>{
                    delete w.__world;
                }
            })["GameRoot.useEffect"];
        }
    }["GameRoot.useEffect"], []);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameRoot.useCallback[close]": ()=>{
            closeOverlay();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].blip("close");
        }
    }["GameRoot.useCallback[close]"], [
        closeOverlay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "game-root",
        "data-phase": phase,
        "data-overlay": overlay,
        "data-testid": "game-root",
        children: [
            assets && phase !== "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                assets: assets,
                onReady: onReady,
                onContextLost: onContextLost
            }, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 100,
                columnNumber: 38
            }, this) : null,
            phase === "driving" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$LookSurface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/game/GameRoot.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$GameHUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        touch: showTouch
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameRoot.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    overlay === "none" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$InteractionPrompt$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        touch: showTouch
                    }, void 0, false, {
                        fileName: "[project]/components/game/GameRoot.tsx",
                        lineNumber: 106,
                        columnNumber: 33
                    }, this) : null,
                    showTouch && overlay === "none" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$TouchControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/game/GameRoot.tsx",
                        lineNumber: 107,
                        columnNumber: 46
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this) : null,
            phase === "intro" && overlay === "none" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$IntroScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 110,
                columnNumber: 50
            }, this) : null,
            phase !== "loading" && phase !== "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 111,
                columnNumber: 51
            }, this) : null,
            overlay === "panel" && panel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$PortfolioPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                panel: panel,
                onClose: close
            }, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 113,
                columnNumber: 39
            }, this) : null,
            overlay === "map" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$WorldMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: close
            }, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 114,
                columnNumber: 28
            }, this) : null,
            overlay === "menu" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$MainMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: close
            }, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 115,
                columnNumber: 29
            }, this) : null,
            overlay === "settings" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: close
            }, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 116,
                columnNumber: 33
            }, this) : null,
            overlay === "controls" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$ControlsGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: close
            }, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 117,
                columnNumber: 33
            }, this) : null,
            phase === "loading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$LoadingScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 119,
                columnNumber: 30
            }, this) : null,
            phase === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$ErrorScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onRetry: retry
            }, void 0, false, {
                fileName: "[project]/components/game/GameRoot.tsx",
                lineNumber: 120,
                columnNumber: 28
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/GameRoot.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(GameRoot, "usNcqvRpM2fgfPBIqmngvybKysE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useWorldAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorldAssets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = GameRoot;
var _c;
__turbopack_context__.k.register(_c, "GameRoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/InteractionPrompt.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InteractionPrompt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const VERB = {
    section: "to enter",
    item: "to open",
    "easter-egg": "to look"
};
function InteractionPrompt({ touch = false }) {
    _s();
    const nearbyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "InteractionPrompt.useGameStore[nearbyId]": (s)=>s.nearbyId
    }["InteractionPrompt.useGameStore[nearbyId]"]);
    const inputMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "InteractionPrompt.useGameStore[inputMode]": (s)=>s.inputMode
    }["InteractionPrompt.useGameStore[inputMode]"]);
    const dest = nearbyId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(nearbyId) : undefined;
    if (!dest) return null;
    const key = inputMode === "gamepad" ? "A" : inputMode === "touch" ? "Tap" : "E";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `pointer-events-none absolute inset-x-0 z-20 flex justify-center px-4 ${touch ? "portrait:bottom-[15.5rem] landscape:bottom-[var(--hud-pad)]" : "top-[calc(var(--hud-pad)+4.25rem)]"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDestination"])(dest.id),
            className: `glass animate-rise pointer-events-auto flex items-center gap-4 rounded-2xl py-3 pl-4 pr-3 text-left transition hover:bg-white/10 ${touch ? "max-w-[min(22rem,100%)] landscape:max-w-[19rem]" : "max-w-md"}`,
            "data-testid": "interaction-prompt",
            "data-destination": dest.id,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "h-10 w-1 shrink-0 rounded-full",
                    style: {
                        background: dest.color
                    },
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/components/game/InteractionPrompt.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hud-label block truncate",
                            style: {
                                color: dest.color
                            },
                            children: dest.category
                        }, void 0, false, {
                            fileName: "[project]/components/game/InteractionPrompt.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "display block truncate text-lg font-semibold leading-tight text-fg",
                            children: dest.name
                        }, void 0, false, {
                            fileName: "[project]/components/game/InteractionPrompt.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        touch ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block truncate text-xs text-muted",
                            children: dest.description
                        }, void 0, false, {
                            fileName: "[project]/components/game/InteractionPrompt.tsx",
                            lineNumber: 43,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/InteractionPrompt.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex shrink-0 flex-col items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            className: "display animate-pulse-ring flex h-10 min-w-10 items-center justify-center rounded-xl border border-sky/60 bg-sky/15 px-2 text-sm font-semibold text-fg",
                            children: key
                        }, void 0, false, {
                            fileName: "[project]/components/game/InteractionPrompt.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[0.625rem] uppercase tracking-[0.12em] text-muted",
                            children: VERB[dest.kind]
                        }, void 0, false, {
                            fileName: "[project]/components/game/InteractionPrompt.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/InteractionPrompt.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, dest.id, true, {
            fileName: "[project]/components/game/InteractionPrompt.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/InteractionPrompt.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(InteractionPrompt, "dd7iU5Mw7yP68Tj/LMJxBEVf02o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = InteractionPrompt;
var _c;
__turbopack_context__.k.register(_c, "InteractionPrompt");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/IntroScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IntroScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function IntroScreen() {
    _s();
    const introSeen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "IntroScreen.useGameStore[introSeen]": (s)=>s.introSeen
    }["IntroScreen.useGameStore[introSeen]"]);
    const touchDevice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "IntroScreen.useGameStore[touchDevice]": (s)=>s.touchDevice
    }["IntroScreen.useGameStore[touchDevice]"]);
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "IntroScreen.useGameStore[reducedMotion]": (s)=>s.reducedMotion
    }["IntroScreen.useGameStore[reducedMotion]"]);
    const openPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "IntroScreen.useGameStore[openPanel]": (s)=>s.openPanel
    }["IntroScreen.useGameStore[openPanel]"]);
    const openOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "IntroScreen.useGameStore[openOverlay]": (s)=>s.openOverlay
    }["IntroScreen.useGameStore[openOverlay]"]);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntroScreen.useEffect": ()=>{
            start.current?.focus({
                preventScroll: true
            });
        }
    }["IntroScreen.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-30 flex items-end bg-gradient-to-t from-ink via-ink/80 to-ink/10 sm:items-center sm:bg-gradient-to-r sm:via-ink/55 sm:to-transparent",
        "data-testid": "intro-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "animate-rise selectable w-full max-w-xl p-6 sm:p-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "hud-label text-sky",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].disciplines.join(" · ")
                }, void 0, false, {
                    fileName: "[project]/components/game/IntroScreen.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "display mt-3 text-5xl font-semibold leading-none tracking-[0.06em] text-fg sm:text-6xl",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].name
                }, void 0, false, {
                    fileName: "[project]/components/game/IntroScreen.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-lg leading-relaxed text-fg/90",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].tagline
                }, void 0, false, {
                    fileName: "[project]/components/game/IntroScreen.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm leading-relaxed text-muted",
                    children: introSeen ? "Welcome back. The car is where you left the keys." : "This portfolio is a city. Each district is part of my work, and every landmark opens the details."
                }, void 0, false, {
                    fileName: "[project]/components/game/IntroScreen.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-7 flex flex-wrap gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            ref: start,
                            type: "button",
                            onClick: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startExperience"],
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("primary", "lg"),
                            "data-testid": "start-driving",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "power"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                " ",
                                introSeen ? "Continue driving" : "Start the engine"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>openPanel("home"),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("outline", "lg"),
                            "data-testid": "view-portfolio",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "layers"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                " View portfolio without driving"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/IntroScreen.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>openPanel("resume"),
                            className: "inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "file",
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this),
                                " Resume"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>openPanel("projects"),
                            className: "inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "code",
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                " Projects"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>openPanel("contact"),
                            className: "inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "mail",
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                " Contact"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>openOverlay("settings"),
                            className: "inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "settings",
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                " Settings"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/IntroScreen.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-dim",
                    children: [
                        touchDevice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "On-screen wheel and pedals · Hand + steer to drift · drag to look around"
                        }, void 0, false, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                            className: "rounded border border-line px-1.5 py-0.5 font-mono text-muted",
                                            children: "W A S D"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/IntroScreen.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this),
                                        " drive"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                            className: "rounded border border-line px-1.5 py-0.5 font-mono text-muted",
                                            children: "Space"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/IntroScreen.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this),
                                        " + turn to drift"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                            className: "rounded border border-line px-1.5 py-0.5 font-mono text-muted",
                                            children: "E"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/IntroScreen.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        " interact"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                            className: "rounded border border-line px-1.5 py-0.5 font-mono text-muted",
                                            children: "M"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/IntroScreen.tsx",
                                            lineNumber: 77,
                                            columnNumber: 17
                                        }, this),
                                        " map"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                            className: "rounded border border-line px-1.5 py-0.5 font-mono text-muted",
                                            children: "C"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/IntroScreen.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this),
                                        " camera"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/IntroScreen.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        reducedMotion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Reduced motion is on: camera fly-ins are skipped."
                        }, void 0, false, {
                            fileName: "[project]/components/game/IntroScreen.tsx",
                            lineNumber: 84,
                            columnNumber: 28
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/IntroScreen.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/IntroScreen.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/IntroScreen.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(IntroScreen, "TjAZPYEwwV7Ypvn/H0+AcJBkMHs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = IntroScreen;
var _c;
__turbopack_context__.k.register(_c, "IntroScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/LoadingScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoadingScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LoadingScreen() {
    _s();
    const stages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "LoadingScreen.useGameStore[stages]": (s)=>s.stages
    }["LoadingScreen.useGameStore[stages]"]);
    const done = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOADING_STAGES"].filter((s)=>stages[s.id] === "done").length;
    const active = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOADING_STAGES"].find((s)=>stages[s.id] === "active") ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOADING_STAGES"][__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOADING_STAGES"].length - 1];
    const percent = Math.round(done / __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOADING_STAGES"].length * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-ink px-6",
        role: "status",
        "aria-live": "polite",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "hud-label text-sky",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].disciplines.join(" · ")
                }, void 0, false, {
                    fileName: "[project]/components/game/LoadingScreen.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "display mt-3 text-4xl font-semibold tracking-[0.12em] text-fg sm:text-5xl",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].shortName
                }, void 0, false, {
                    fileName: "[project]/components/game/LoadingScreen.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-muted",
                    children: "The interactive portfolio world"
                }, void 0, false, {
                    fileName: "[project]/components/game/LoadingScreen.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mt-10 h-[3px] w-full overflow-hidden rounded-full bg-white/10",
                    role: "progressbar",
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-valuenow": percent,
                    "aria-label": "Loading progress",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full bg-sky transition-[width] duration-300 ease-out",
                            style: {
                                width: `${percent}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/game/LoadingScreen.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/components/game/LoadingScreen.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/LoadingScreen.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex items-baseline justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-fg",
                            "data-testid": "loading-stage",
                            children: [
                                active.label,
                                "…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/LoadingScreen.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-xs tabular-nums text-muted",
                            children: [
                                done,
                                "/",
                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOADING_STAGES"].length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/LoadingScreen.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/LoadingScreen.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    className: "mt-6 space-y-1.5",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOADING_STAGES"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2.5 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": true,
                                    className: `h-1.5 w-1.5 rounded-full ${stages[s.id] === "done" ? "bg-mint" : stages[s.id] === "active" ? "animate-pulse bg-sky" : "bg-white/15"}`
                                }, void 0, false, {
                                    fileName: "[project]/components/game/LoadingScreen.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: stages[s.id] === "pending" ? "text-dim" : "text-muted",
                                    children: s.label
                                }, void 0, false, {
                                    fileName: "[project]/components/game/LoadingScreen.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/components/game/LoadingScreen.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/game/LoadingScreen.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/LoadingScreen.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/LoadingScreen.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(LoadingScreen, "t7qLtM/EI6EY1RmJ72EtP/cK2GE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = LoadingScreen;
var _c;
__turbopack_context__.k.register(_c, "LoadingScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/LookSurface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LookSurface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/input.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function LookSurface() {
    _s();
    const drag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-10 cursor-grab touch-none active:cursor-grabbing",
        "aria-hidden": "true",
        "data-testid": "look-surface",
        onPointerDown: (e)=>{
            if (e.pointerType === "touch") __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].noteTouch();
            drag.current = {
                id: e.pointerId,
                x: e.clientX,
                y: e.clientY
            };
            try {
                e.currentTarget.setPointerCapture(e.pointerId);
            } catch  {
            // Capture is a convenience; dragging still works without it.
            }
        },
        onPointerMove: (e)=>{
            const d = drag.current;
            if (!d || d.id !== e.pointerId) return;
            const sensitivity = e.pointerType === "touch" ? 0.006 : 0.004;
            // Grab-style: dragging the view to the right turns the camera to the left.
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look.yaw += (e.clientX - d.x) * sensitivity;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look.pitch += (e.clientY - d.y) * sensitivity * 0.6;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look.yaw = Math.max(-3, Math.min(3, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look.yaw));
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look.pitch = Math.max(-0.6, Math.min(0.6, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look.pitch));
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look.idle = 0;
            d.x = e.clientX;
            d.y = e.clientY;
        },
        onPointerUp: (e)=>{
            if (drag.current?.id === e.pointerId) drag.current = null;
        },
        onPointerCancel: ()=>{
            drag.current = null;
        }
    }, void 0, false, {
        fileName: "[project]/components/game/LookSurface.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(LookSurface, "gIddYogjP+VVdD1QmmHwmANJEG4=");
_c = LookSurface;
var _c;
__turbopack_context__.k.register(_c, "LookSurface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/MainMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$IntroductionPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/IntroductionPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/nav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function MainMenu({ onClose }) {
    _s();
    const openPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "MainMenu.useGameStore[openPanel]": (s)=>s.openPanel
    }["MainMenu.useGameStore[openPanel]"]);
    const openOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "MainMenu.useGameStore[openOverlay]": (s)=>s.openOverlay
    }["MainMenu.useGameStore[openOverlay]"]);
    const returnToIntro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "MainMenu.useGameStore[returnToIntro]": (s)=>s.returnToIntro
    }["MainMenu.useGameStore[returnToIntro]"]);
    const phase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "MainMenu.useGameStore[phase]": (s)=>s.phase
    }["MainMenu.useGameStore[phase]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: "Portfolio",
        kicker: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].name,
        onClose: onClose,
        size: "md",
        testId: "main-menu",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                "aria-label": "Portfolio sections",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-1",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigation"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionHref"])(item.section),
                                onClick: (e)=>{
                                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                                    e.preventDefault();
                                    if (item.section === "home" && phase === "driving") returnToIntro();
                                    else openPanel(item.section);
                                },
                                className: "group flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition hover:bg-white/8",
                                "data-testid": `menu-${item.section}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/6 text-sky",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            name: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$IntroductionPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_ICONS"][item.section],
                                            size: 19
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/MainMenu.tsx",
                                            lineNumber: 37,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/game/MainMenu.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "display block text-sm font-semibold uppercase tracking-[0.14em] text-fg",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/game/MainMenu.tsx",
                                                lineNumber: 40,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block truncate text-xs text-muted",
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/game/MainMenu.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/game/MainMenu.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        name: "chevronRight",
                                        size: 16,
                                        className: "text-dim transition group-hover:translate-x-0.5 group-hover:text-sky"
                                    }, void 0, false, {
                                        fileName: "[project]/components/game/MainMenu.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/game/MainMenu.tsx",
                                lineNumber: 25,
                                columnNumber: 15
                            }, this)
                        }, item.section, false, {
                            fileName: "[project]/components/game/MainMenu.tsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/game/MainMenu.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/game/MainMenu.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4",
                children: [
                    phase === "driving" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>openOverlay("map"),
                        className: "flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-fg transition hover:bg-white/8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "map",
                                size: 17
                            }, void 0, false, {
                                fileName: "[project]/components/game/MainMenu.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            " City map"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/MainMenu.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>openOverlay("settings"),
                        className: "flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-fg transition hover:bg-white/8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "settings",
                                size: 17
                            }, void 0, false, {
                                fileName: "[project]/components/game/MainMenu.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            " Settings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/MainMenu.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/about",
                        className: "col-span-2 flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-muted transition hover:bg-white/8 hover:text-fg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "external",
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/game/MainMenu.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            " Open the classic site (no 3D)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/MainMenu.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/MainMenu.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/MainMenu.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(MainMenu, "PtuaOjLp6w1iyQeY+sRV3KXueQY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = MainMenu;
var _c;
__turbopack_context__.k.register(_c, "MainMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/PortfolioPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortfolioPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/projects.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$AboutPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/AboutPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$BlogPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/BlogPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ContactPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/ContactPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$CreativeWorkPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/CreativeWorkPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$DiscoveryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/DiscoveryPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$EducationPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/EducationPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ExperiencePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/ExperiencePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$IntroductionPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/IntroductionPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ProjectsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/ProjectsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ResumePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/ResumePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$SkillsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/SkillsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portfolio/nav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const META = {
    home: {
        title: "Welcome",
        kicker: "Central Innovation District",
        accent: "#7cc4ff",
        size: "xl"
    },
    about: {
        title: "About",
        kicker: "Central Innovation District",
        accent: "#7cc4ff",
        size: "xl"
    },
    experience: {
        title: "Work Experience",
        kicker: "Career District",
        accent: "#ffb86b",
        size: "xl"
    },
    education: {
        title: "Education",
        kicker: "Knowledge District",
        accent: "#8be9c0",
        size: "xl"
    },
    projects: {
        title: "Projects",
        kicker: "Project District",
        accent: "#5ee6ff",
        size: "full"
    },
    creative: {
        title: "Creative Work",
        kicker: "Creative District",
        accent: "#ff7ad9",
        size: "full"
    },
    skills: {
        title: "Skills & Technologies",
        kicker: "Skills Atrium",
        accent: "#c7b6ff",
        size: "xl"
    },
    blog: {
        title: "Blog & Insights",
        kicker: "Media District",
        accent: "#b79bff",
        size: "full"
    },
    resume: {
        title: "Resume & Profile",
        kicker: "Profile Vault",
        accent: "#9fd6ff",
        size: "xl"
    },
    contact: {
        title: "Contact",
        kicker: "Contact & Community District",
        accent: "#ffd166",
        size: "xl"
    },
    discovery: {
        title: "Discovery",
        kicker: "Hidden in the city",
        accent: "#6fd3c7",
        size: "lg"
    }
};
function titleFor(panel) {
    if (panel.section === "projects" && panel.itemId === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CASE_STUDIES"]) return "Case Studies";
    if (panel.section === "projects" && panel.itemId) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProject"])(panel.itemId)?.title ?? META.projects.title;
    if (panel.section === "blog" && panel.itemId) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getArticle"])(panel.itemId)?.title ?? META.blog.title;
    if (panel.section === "discovery" && panel.itemId) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDiscovery"])(panel.itemId)?.title ?? META.discovery.title;
    return META[panel.section].title;
}
function Body({ panel }) {
    switch(panel.section){
        case "home":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$IntroductionPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 50,
                columnNumber: 14
            }, this);
        case "about":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$AboutPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 52,
                columnNumber: 14
            }, this);
        case "experience":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ExperiencePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                itemId: panel.itemId
            }, panel.itemId, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 54,
                columnNumber: 14
            }, this);
        case "education":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$EducationPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                itemId: panel.itemId
            }, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 56,
                columnNumber: 14
            }, this);
        case "projects":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ProjectsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                itemId: panel.itemId
            }, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 58,
                columnNumber: 14
            }, this);
        case "creative":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$CreativeWorkPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                itemId: panel.itemId
            }, panel.itemId, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 60,
                columnNumber: 14
            }, this);
        case "skills":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$SkillsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 62,
                columnNumber: 14
            }, this);
        case "blog":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$BlogPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                itemId: panel.itemId
            }, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 64,
                columnNumber: 14
            }, this);
        case "resume":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ResumePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 66,
                columnNumber: 14
            }, this);
        case "contact":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$ContactPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 68,
                columnNumber: 14
            }, this);
        case "discovery":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$DiscoveryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                itemId: panel.itemId,
                onCinematic: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startCinematic"]
            }, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 70,
                columnNumber: 14
            }, this);
    }
}
_c = Body;
function PortfolioPanel({ panel, onClose }) {
    _s();
    const openPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "PortfolioPanel.useGameStore[openPanel]": (s)=>s.openPanel
    }["PortfolioPanel.useGameStore[openPanel]"]);
    const meta = META[panel.section];
    const kicker = panel.section === "discovery" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDiscovery"])(panel.itemId ?? "")?.kicker ?? meta.kicker : panel.section === "projects" && panel.itemId === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CASE_STUDIES"] ? "Knowledge District" : meta.kicker;
    const href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionHref"])(panel.section, panel.itemId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: titleFor(panel),
        kicker: kicker,
        accent: meta.accent,
        onClose: onClose,
        size: meta.size,
        testId: "portfolio-panel",
        actions: panel.section !== "discovery" && panel.section !== "home" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: "hidden h-10 items-center gap-2 rounded-xl border border-line px-3 text-xs text-muted transition hover:bg-white/8 hover:text-fg sm:flex",
            title: "Open this section as a normal page",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: "external",
                    size: 15
                }, void 0, false, {
                    fileName: "[project]/components/game/PortfolioPanel.tsx",
                    lineNumber: 104,
                    columnNumber: 13
                }, this),
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "display uppercase tracking-[0.14em]",
                    children: "Page"
                }, void 0, false, {
                    fileName: "[project]/components/game/PortfolioPanel.tsx",
                    lineNumber: 104,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/PortfolioPanel.tsx",
            lineNumber: 99,
            columnNumber: 11
        }, this) : null,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portfolio$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PortfolioNavProvider"], {
            mode: "panel",
            go: openPanel,
            close: onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-section": panel.section,
                "data-item": panel.itemId ?? "",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                    panel: panel
                }, void 0, false, {
                    fileName: "[project]/components/game/PortfolioPanel.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/game/PortfolioPanel.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/game/PortfolioPanel.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/PortfolioPanel.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(PortfolioPanel, "+jqioMcchOEYqGfPyjVRZCMqi2A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c1 = PortfolioPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Body");
__turbopack_context__.k.register(_c1, "PortfolioPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/SettingsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/performance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/sky.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/useHud.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function Segmented({ label, options, value, onChange, testId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
        "data-testid": testId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                className: "hud-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/game/SettingsPanel.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 grid gap-1.5",
                style: {
                    gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`
                },
                children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: `cursor-pointer rounded-xl border px-3 py-2.5 text-center transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sky ${o.value === value ? "border-sky/60 bg-sky/15" : "border-line hover:border-line-strong"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "radio",
                                name: label,
                                value: o.value,
                                checked: o.value === value,
                                onChange: ()=>onChange(o.value),
                                className: "sr-only"
                            }, void 0, false, {
                                fileName: "[project]/components/game/SettingsPanel.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "display block text-sm font-semibold uppercase tracking-[0.12em] text-fg",
                                children: o.label
                            }, void 0, false, {
                                fileName: "[project]/components/game/SettingsPanel.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this),
                            o.hint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-0.5 block text-[0.6875rem] leading-tight text-muted",
                                children: o.hint
                            }, void 0, false, {
                                fileName: "[project]/components/game/SettingsPanel.tsx",
                                lineNumber: 28,
                                columnNumber: 23
                            }, this) : null
                        ]
                    }, o.value, true, {
                        fileName: "[project]/components/game/SettingsPanel.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/game/SettingsPanel.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/SettingsPanel.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Segmented;
function SettingsPanel({ onClose }) {
    _s();
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])();
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"])({
        "SettingsPanel.usePolled[stats]": ()=>({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stats
            })
    }["SettingsPanel.usePolled[stats]"], 1000);
    const driving = s.phase === "driving";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: driving ? "Paused" : "Settings",
        kicker: "Settings",
        onClose: onClose,
        size: "lg",
        testId: "settings-panel",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                driving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "primary",
                            onClick: onClose,
                            "data-testid": "settings-resume",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "play"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/SettingsPanel.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this),
                                " Resume driving"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/SettingsPanel.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>{
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverVehicle"])();
                                onClose();
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "recover"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/SettingsPanel.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this),
                                " Reset vehicle position"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/SettingsPanel.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleEngine"],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "power"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/SettingsPanel.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                " ",
                                s.engineOn ? "Stop engine" : "Start engine"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/SettingsPanel.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>s.openOverlay("controls"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "help"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/SettingsPanel.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this),
                                " Controls"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/SettingsPanel.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "ghost",
                            onClick: s.returnToIntro,
                            "data-testid": "settings-intro",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "home"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/SettingsPanel.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this),
                                " Return to the introduction"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/SettingsPanel.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/SettingsPanel.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Segmented, {
                    label: "Camera",
                    testId: "settings-camera",
                    value: s.cameraMode,
                    onChange: s.setCameraMode,
                    options: [
                        {
                            value: "cockpit",
                            label: "Cockpit",
                            hint: "Driver's seat"
                        },
                        {
                            value: "chase",
                            label: "Chase",
                            hint: "Behind the car"
                        },
                        {
                            value: "cinematic",
                            label: "Cinematic",
                            hint: "Slow orbit"
                        }
                    ]
                }, void 0, false, {
                    fileName: "[project]/components/game/SettingsPanel.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Segmented, {
                    label: "Graphics quality",
                    testId: "settings-quality",
                    value: s.quality,
                    onChange: (q)=>s.setQuality(q, false),
                    options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY_LEVELS"].map((q)=>({
                            value: q,
                            label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][q].label,
                            hint: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][q].description
                        }))
                }, void 0, false, {
                    fileName: "[project]/components/game/SettingsPanel.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "-mt-3 font-mono text-xs text-dim",
                    "data-testid": "settings-stats",
                    children: [
                        stats.fps > 0 ? `${stats.fps} fps · ${stats.calls} draw calls · ${Math.round(stats.triangles / 1000)}k triangles` : "Measuring performance…",
                        s.qualityAuto ? " · chosen automatically for this device" : ""
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/SettingsPanel.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Segmented, {
                    label: "Time of day",
                    testId: "settings-time",
                    value: s.timeOfDay,
                    onChange: s.setTimeOfDay,
                    options: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"]).map((t)=>({
                            value: t,
                            label: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"][t].label
                        }))
                }, void 0, false, {
                    fileName: "[project]/components/game/SettingsPanel.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                            className: "hud-label",
                            children: "Sound"
                        }, void 0, false, {
                            fileName: "[project]/components/game/SettingsPanel.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex items-center gap-3 rounded-xl border border-line px-3.5 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>s.setMuted(!s.muted),
                                    "aria-pressed": s.muted,
                                    "aria-label": s.muted ? "Unmute sound" : "Mute sound",
                                    className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${s.muted ? "border-amber/50 text-amber" : "border-line text-fg hover:bg-white/8"}`,
                                    "data-testid": "settings-mute",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        name: s.muted ? "mute" : "volume"
                                    }, void 0, false, {
                                        fileName: "[project]/components/game/SettingsPanel.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/game/SettingsPanel.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex flex-1 items-center gap-3 text-sm text-muted",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0",
                                            children: "Volume"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/SettingsPanel.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "range",
                                            min: 0,
                                            max: 1,
                                            step: 0.05,
                                            value: s.volume,
                                            onChange: (e)=>s.setVolume(Number(e.target.value)),
                                            disabled: s.muted,
                                            className: "h-1.5 w-full cursor-pointer accent-sky disabled:opacity-40",
                                            "data-testid": "settings-volume"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/SettingsPanel.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-9 shrink-0 text-right font-mono text-xs tabular-nums text-fg",
                                            children: Math.round(s.volume * 100)
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/SettingsPanel.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/SettingsPanel.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/SettingsPanel.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/SettingsPanel.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                s.reducedMotion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "rounded-xl border border-line bg-white/3 px-3.5 py-3 text-sm text-muted",
                    children: "Your device asks for reduced motion, so camera fly-ins, the cinematic orbit and decorative animation are held still."
                }, void 0, false, {
                    fileName: "[project]/components/game/SettingsPanel.tsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/SettingsPanel.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/SettingsPanel.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(SettingsPanel, "2ttpydoLItDIz//5sXeGEp2/ESo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"]
    ];
});
_c1 = SettingsPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Segmented");
__turbopack_context__.k.register(_c1, "SettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/Speedometer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Speedometer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/physics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/useHud.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Speedometer() {
    _s();
    const speed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rpm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const boost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const last = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        speed: -1,
        gear: "",
        rpm: -1,
        boost: -1,
        boosting: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"])({
        "Speedometer.useFrameLoop": ()=>{
            const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
            const l = last.current;
            const kmh = Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["speedKmh"])(v));
            if (kmh !== l.speed && speed.current) {
                l.speed = kmh;
                speed.current.textContent = String(kmh);
            }
            const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gearLabel"])(v);
            if (g !== l.gear && gear.current) {
                l.gear = g;
                gear.current.textContent = g;
            }
            const r = Math.round(v.rpm * 100);
            if (r !== l.rpm && rpm.current) {
                l.rpm = r;
                rpm.current.style.transform = `scaleX(${Math.min(1, v.rpm)})`;
                rpm.current.style.backgroundColor = v.rpm > 0.86 ? "#ff6b6b" : "#7cc4ff";
            }
            const b = Math.round(v.boost * 100);
            if (b !== l.boost && boost.current) {
                l.boost = b;
                boost.current.style.transform = `scaleX(${v.boost})`;
            }
            if (v.boosting !== l.boosting && root.current) {
                l.boosting = v.boosting;
                root.current.dataset.boosting = String(v.boosting);
            }
        }
    }["Speedometer.useFrameLoop"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: root,
        className: "glass group flex items-end gap-4 rounded-2xl px-5 py-3",
        "data-testid": "speedometer",
        "data-boosting": "false",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hud-label",
                        children: "Gear"
                    }, void 0, false, {
                        fileName: "[project]/components/game/Speedometer.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: gear,
                        className: "display block text-2xl font-semibold leading-none text-fg",
                        "data-testid": "gear",
                        children: "P"
                    }, void 0, false, {
                        fileName: "[project]/components/game/Speedometer.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/Speedometer.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-[7.5rem]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline justify-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                ref: speed,
                                className: "font-mono text-5xl font-medium leading-none tabular-nums text-fg",
                                "data-testid": "speed",
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/components/game/Speedometer.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hud-label",
                                children: "km/h"
                            }, void 0, false, {
                                fileName: "[project]/components/game/Speedometer.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/Speedometer.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-1 overflow-hidden rounded-full bg-white/10",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: rpm,
                            className: "h-full origin-left rounded-full bg-sky transition-colors",
                            style: {
                                transform: "scaleX(0)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/game/Speedometer.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/game/Speedometer.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/Speedometer.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hud-label group-data-[boosting=true]:text-amber",
                        children: "Boost"
                    }, void 0, false, {
                        fileName: "[project]/components/game/Speedometer.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-1 overflow-hidden rounded-full bg-white/10",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: boost,
                            className: "h-full origin-left rounded-full bg-amber",
                            style: {
                                transform: "scaleX(1)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/game/Speedometer.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/game/Speedometer.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/Speedometer.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/Speedometer.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(Speedometer, "UPppL6Tu7EfFFnIDpe87zCPV224=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"]
    ];
});
_c = Speedometer;
var _c;
__turbopack_context__.k.register(_c, "Speedometer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toast() {
    _s();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Toast.useGameStore[toast]": (s)=>s.toast
    }["Toast.useGameStore[toast]"]);
    const clearToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Toast.useGameStore[clearToast]": (s)=>s.clearToast
    }["Toast.useGameStore[clearToast]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            if (!toast) return;
            const id = window.setTimeout({
                "Toast.useEffect.id": ()=>clearToast(toast.id)
            }["Toast.useEffect.id"], 2600);
            return ({
                "Toast.useEffect": ()=>window.clearTimeout(id)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        toast,
        clearToast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-x-0 top-[calc(var(--hud-pad)+10rem)] z-30 flex justify-center px-4 portrait:top-[36%]",
        role: "status",
        "aria-live": "polite",
        children: toast ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "glass animate-rise rounded-xl px-4 py-2.5 text-sm text-fg",
            "data-testid": "toast",
            children: toast.text
        }, toast.id, false, {
            fileName: "[project]/components/game/Toast.tsx",
            lineNumber: 17,
            columnNumber: 9
        }, this) : null
    }, void 0, false, {
        fileName: "[project]/components/game/Toast.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(Toast, "Ku4iYYU6pdetlqu0c9tr8EIyvDI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/TouchControls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TouchControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/input.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
/** Pointer capture keeps a hold alive when the thumb slides off; it is optional. */ function capture(el, pointerId) {
    try {
        el.setPointerCapture(pointerId);
    } catch  {
    // The pointer is already gone or cannot be captured; the hold still works.
    }
}
/** A button that stays active for as long as it is held. */ function HoldButton({ label, onChange, className, children, testId }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const set = (held, e)=>{
        e.preventDefault();
        if (held) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].noteTouch();
            capture(e.currentTarget, e.pointerId);
        }
        if (ref.current) ref.current.dataset.held = String(held);
        onChange(held);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        type: "button",
        "aria-label": label,
        "data-testid": testId,
        "data-held": "false",
        onPointerDown: (e)=>set(true, e),
        onPointerUp: (e)=>set(false, e),
        onPointerCancel: (e)=>set(false, e),
        onLostPointerCapture: ()=>{
            if (ref.current) ref.current.dataset.held = "false";
            onChange(false);
        },
        onContextMenu: (e)=>e.preventDefault(),
        className: `glass pointer-events-auto touch-none select-none transition data-[held=true]:scale-95 data-[held=true]:border-sky/70 data-[held=true]:bg-sky/25 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/game/TouchControls.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(HoldButton, "QMBuJFIdzLIeqBcFwhMf246mjOM=");
_c = HoldButton;
/** Horizontal steering pad: drag left or right, release to centre. */ function SteeringPad() {
    _s1();
    const knob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const update = (clientX)=>{
        const el = pad.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const half = rect.width / 2;
        const raw = (clientX - (rect.left + half)) / (half * 0.72);
        const value = Math.max(-1, Math.min(1, raw));
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].touch.steer = value;
        if (knob.current) knob.current.style.transform = `translateX(${value * half * 0.62}px)`;
    };
    const release = ()=>{
        active.current = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].touch.steer = 0;
        if (knob.current) knob.current.style.transform = "translateX(0px)";
        if (pad.current) pad.current.dataset.held = "false";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: pad,
        role: "slider",
        "aria-label": "Steering",
        "aria-valuemin": -1,
        "aria-valuemax": 1,
        "aria-valuenow": 0,
        tabIndex: -1,
        "data-testid": "touch-steer",
        "data-held": "false",
        onPointerDown: (e)=>{
            e.preventDefault();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].noteTouch();
            active.current = e.pointerId;
            capture(e.currentTarget, e.pointerId);
            e.currentTarget.dataset.held = "true";
            update(e.clientX);
        },
        onPointerMove: (e)=>{
            if (active.current === e.pointerId) update(e.clientX);
        },
        onPointerUp: release,
        onPointerCancel: release,
        onLostPointerCapture: release,
        className: "glass pointer-events-auto relative flex h-20 w-[min(46vw,15rem)] touch-none select-none items-center justify-center rounded-full data-[held=true]:border-sky/60",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                name: "arrowLeft",
                size: 18,
                className: "absolute left-4 text-dim"
            }, void 0, false, {
                fileName: "[project]/components/game/TouchControls.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                name: "arrowRight",
                size: 18,
                className: "absolute right-4 text-dim"
            }, void 0, false, {
                fileName: "[project]/components/game/TouchControls.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: knob,
                className: "flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-white/15 text-fg transition-transform duration-75",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: "wheel",
                    size: 26
                }, void 0, false, {
                    fileName: "[project]/components/game/TouchControls.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/game/TouchControls.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/TouchControls.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s1(SteeringPad, "zh+vzUsDoztIlo9vTz3ZzNKFhkA=");
_c1 = SteeringPad;
function TapButton({ icon, label, onClick, testId, accent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        "aria-label": label,
        "data-testid": testId,
        onClick: ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].noteTouch();
            onClick();
        },
        className: `glass pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl active:scale-95 ${accent ? "border-sky/60 bg-sky/20 text-fg" : "text-fg"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            name: icon,
            size: 22
        }, void 0, false, {
            fileName: "[project]/components/game/TouchControls.tsx",
            lineNumber: 133,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/TouchControls.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_c2 = TapButton;
function TouchControls() {
    _s2();
    const nearbyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "TouchControls.useGameStore[nearbyId]": (s)=>s.nearbyId
    }["TouchControls.useGameStore[nearbyId]"]);
    const openOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "TouchControls.useGameStore[openOverlay]": (s)=>s.openOverlay
    }["TouchControls.useGameStore[openOverlay]"]);
    const cycleCamera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "TouchControls.useGameStore[cycleCamera]": (s)=>s.cycleCamera
    }["TouchControls.useGameStore[cycleCamera]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 px-[var(--hud-pad)] pb-[calc(var(--hud-pad)+env(safe-area-inset-bottom,0px))]",
        "data-testid": "touch-controls",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-start gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TapButton, {
                                icon: "camera",
                                label: "Switch camera",
                                onClick: cycleCamera,
                                testId: "touch-camera"
                            }, void 0, false, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TapButton, {
                                icon: "recover",
                                label: "Recover to road",
                                onClick: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverVehicle"],
                                testId: "touch-recover"
                            }, void 0, false, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TapButton, {
                                icon: "help",
                                label: "Controls",
                                onClick: ()=>openOverlay("controls")
                            }, void 0, false, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/TouchControls.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SteeringPad, {}, void 0, false, {
                        fileName: "[project]/components/game/TouchControls.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/TouchControls.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-end gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            nearbyId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TapButton, {
                                icon: "arrowRight",
                                label: "Interact with nearby landmark",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleAction"])("interact"),
                                testId: "touch-interact",
                                accent: true
                            }, void 0, false, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 162,
                                columnNumber: 23
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HoldButton, {
                                label: "Handbrake",
                                onChange: (held)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].touch.handbrake = held,
                                className: "display flex h-12 w-12 items-center justify-center rounded-2xl text-[0.625rem] uppercase tracking-[0.1em] text-fg",
                                testId: "touch-handbrake",
                                children: "Hand"
                            }, void 0, false, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HoldButton, {
                                label: "Boost",
                                onChange: (held)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].touch.boost = held,
                                className: "display flex h-12 w-12 items-center justify-center rounded-2xl text-[0.625rem] uppercase tracking-[0.1em] text-amber",
                                testId: "touch-boost",
                                children: "Boost"
                            }, void 0, false, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/TouchControls.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HoldButton, {
                                label: "Brake and reverse",
                                onChange: (held)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].touch.brake = held ? 1 : 0,
                                className: "display flex h-20 w-[4.5rem] flex-col items-center justify-center rounded-3xl text-xs uppercase tracking-[0.12em] text-fg",
                                testId: "touch-brake",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        name: "arrowUp",
                                        size: 20,
                                        className: "rotate-180"
                                    }, void 0, false, {
                                        fileName: "[project]/components/game/TouchControls.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this),
                                    "Brake"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HoldButton, {
                                label: "Accelerate",
                                onChange: (held)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].touch.throttle = held ? 1 : 0,
                                className: "display flex h-28 w-[4.5rem] flex-col items-center justify-center rounded-3xl text-xs uppercase tracking-[0.12em] text-sky",
                                testId: "touch-gas",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        name: "arrowUp",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/game/TouchControls.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    "Gas"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/game/TouchControls.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/game/TouchControls.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/game/TouchControls.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/TouchControls.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s2(TouchControls, "ocEvST0R/HP66VzOprm9c0DHrO8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c3 = TouchControls;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "HoldButton");
__turbopack_context__.k.register(_c1, "SteeringPad");
__turbopack_context__.k.register(_c2, "TapButton");
__turbopack_context__.k.register(_c3, "TouchControls");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/WorldMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapBase",
    ()=>MapBase,
    "MiniMap",
    ()=>MiniMap,
    "default",
    ()=>WorldMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/useHud.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const VIEW = {
    x: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - 40,
    y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 110,
    w: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 80,
    h: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 + 150
};
const MapBase = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function MapBase({ labels }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: VIEW.x - 400,
                y: VIEW.y - 400,
                width: VIEW.w + 800,
                height: VIEW.h + 800,
                fill: "#081220"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: `M${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0} ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0} C ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 60} ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 120}, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 380} ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 130}, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 520} ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 60} S ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - 80} ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 110}, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1} ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0} Z`,
                fill: "#16302a"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0,
                y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0,
                rx: 10,
                fill: "#1a2230"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRICTS"].map((d)=>d.rects.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: r.x0,
                        y: r.z0,
                        width: r.x1 - r.x0,
                        height: r.z1 - r.z0,
                        fill: d.color,
                        opacity: 0.1
                    }, `${d.id}-${i}`, false, {
                        fileName: "[project]/components/game/WorldMap.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this))),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROAD_LINES"].filter((l)=>l.kind !== "bridge").map((l)=>l.axis === "x" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: l.at - l.halfWidth,
                    y: l.from - 9,
                    width: l.halfWidth * 2,
                    height: l.to - l.from + 18,
                    fill: "#39455a"
                }, l.id, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: l.from - 9,
                    y: l.at - l.halfWidth,
                    width: l.to - l.from + 18,
                    height: l.halfWidth * 2,
                    fill: "#39455a"
                }, l.id, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKS"].map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: b.rect.x0,
                    y: b.rect.z0,
                    width: b.rect.x1 - b.rect.x0,
                    height: b.rect.z1 - b.rect.z0,
                    rx: b.cornerRadius,
                    fill: b.kind === "harbor" ? "#232b38" : b.kind === "quay" ? "#2c3442" : "#202a3a"
                }, b.id, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - 400,
                y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 800,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0,
                fill: "#0c2740"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGES"].map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: b.x - b.halfWidth,
                    y: b.z0,
                    width: b.halfWidth * 2,
                    height: b.z1 - b.z0,
                    fill: "#56657d"
                }, b.id, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x,
                cy: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z,
                r: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rOuter,
                fill: "#39455a"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x,
                cy: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z,
                r: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rInner,
                fill: "#202a3a"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            labels ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRICTS"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: d.labelAt[0],
                    y: d.labelAt[1],
                    textAnchor: "middle",
                    fontSize: 17,
                    fill: d.color,
                    opacity: 0.85,
                    style: {
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase"
                    },
                    children: d.name.replace(" District", "").replace(" & Community", "").replace(" & Leisure", "")
                }, d.id, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 60,
                    columnNumber: 13
                }, this)) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/WorldMap.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
});
_c = MapBase;
function carRotation(heading) {
    return 180 - heading * 180 / Math.PI;
}
function CarMarker({ scale = 1 }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"])({
        "CarMarker.useFrameLoop": ()=>{
            const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
            ref.current?.setAttribute("transform", `translate(${v.x.toFixed(1)} ${v.z.toFixed(1)}) rotate(${carRotation(v.heading).toFixed(1)}) scale(${scale})`);
        }
    }["CarMarker.useFrameLoop"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        ref: ref,
        "data-testid": "map-car",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                r: 17,
                fill: "#7cc4ff",
                opacity: 0.18
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M0 -15 L10 11 L0 5 L-10 11 Z",
                fill: "#ffffff",
                stroke: "#0b1220",
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/WorldMap.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(CarMarker, "zAeaYoqI8hMnQyrAIIGoLawZ95A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"]
    ];
});
_c1 = CarMarker;
function RouteLine() {
    _s1();
    const version = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"])({
        "RouteLine.usePolled[version]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion
    }["RouteLine.usePolled[version]"], 300);
    const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RouteLine.useMemo[points]": ()=>{
            void version;
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route.points.map({
                "RouteLine.useMemo[points]": ([x, z])=>`${x.toFixed(1)},${z.toFixed(1)}`
            }["RouteLine.useMemo[points]"]).join(" ") : "";
        }
    }["RouteLine.useMemo[points]"], [
        version
    ]);
    if (!points) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: points,
                stroke: "#7cc4ff",
                strokeWidth: 11,
                opacity: 0.25
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: points,
                stroke: "#bfe6ff",
                strokeWidth: 4,
                strokeDasharray: "2 10"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/WorldMap.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s1(RouteLine, "WjLkZnAEpiuSYf7wO00yr64vI3w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"]
    ];
});
_c2 = RouteLine;
function MiniMap() {
    _s2();
    const svg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const routeTargetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "MiniMap.useGameStore[routeTargetId]": (s)=>s.routeTargetId
    }["MiniMap.useGameStore[routeTargetId]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"])({
        "MiniMap.useFrameLoop": ()=>{
            const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
            svg.current?.setAttribute("viewBox", `${(v.x - 150).toFixed(0)} ${(v.z - 150).toFixed(0)} 300 300`);
        }
    }["MiniMap.useFrameLoop"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass h-36 w-36 overflow-hidden rounded-2xl p-0",
        "aria-hidden": "true",
        "data-testid": "minimap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ref: svg,
            viewBox: "-150 150 300 300",
            className: "h-full w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapBase, {
                    labels: false
                }, void 0, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RouteLine, {}, void 0, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"].filter((d)=>d.kind === "section" || d.id === routeTargetId).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: d.position[0],
                        cy: d.position[1],
                        r: d.id === routeTargetId ? 13 : 9,
                        fill: d.color,
                        stroke: "#0b1220",
                        strokeWidth: 2
                    }, d.id, false, {
                        fileName: "[project]/components/game/WorldMap.tsx",
                        lineNumber: 127,
                        columnNumber: 13
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarMarker, {
                    scale: 1.1
                }, void 0, false, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/WorldMap.tsx",
            lineNumber: 121,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/WorldMap.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_s2(MiniMap, "ySTeDNTG00l7hCrqdaOn8je1nvU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFrameLoop"]
    ];
});
_c3 = MiniMap;
function Marker({ d, selected, known, onSelect }) {
    const r = d.kind === "section" ? 15 : 9;
    const label = known || d.kind !== "easter-egg" ? `${d.name}, ${d.category}` : "Undiscovered location";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        role: "button",
        tabIndex: 0,
        "aria-label": label,
        "aria-pressed": selected,
        transform: `translate(${d.position[0]} ${d.position[1]})`,
        onClick: ()=>onSelect(d.id),
        onKeyDown: (e)=>{
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(d.id);
            }
        },
        className: "cursor-pointer outline-none [&:focus-visible>circle:first-child]:opacity-100",
        "data-testid": `map-marker-${d.id}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                r: r + 9,
                fill: "none",
                stroke: "#ffffff",
                strokeWidth: 2.5,
                opacity: selected ? 1 : 0
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            d.kind === "easter-egg" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: -r,
                y: -r,
                width: r * 2,
                height: r * 2,
                rx: 3,
                transform: "rotate(45)",
                fill: known ? d.color : "#5b6678",
                stroke: "#0b1220",
                strokeWidth: 2.5
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                r: r,
                fill: d.color,
                stroke: "#0b1220",
                strokeWidth: 2.5
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this),
            d.kind === "section" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                r: 5,
                fill: "#0b1220"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 161,
                columnNumber: 31
            }, this) : null,
            d.kind === "easter-egg" && !known ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                y: 5,
                textAnchor: "middle",
                fontSize: 15,
                fill: "#0b1220",
                fontWeight: 700,
                children: "?"
            }, void 0, false, {
                fileName: "[project]/components/game/WorldMap.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/game/WorldMap.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_c4 = Marker;
function WorldMap({ onClose }) {
    _s3();
    const discovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "WorldMap.useGameStore[discovered]": (s)=>s.discovered
    }["WorldMap.useGameStore[discovered]"]);
    const routeTargetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "WorldMap.useGameStore[routeTargetId]": (s)=>s.routeTargetId
    }["WorldMap.useGameStore[routeTargetId]"]);
    const nearbyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "WorldMap.useGameStore[nearbyId]": (s)=>s.nearbyId
    }["WorldMap.useGameStore[nearbyId]"]);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(routeTargetId ?? nearbyId ?? "home");
    const selected = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"].find((d)=>d.id === selectedId) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"][0];
    const known = (d)=>d.kind !== "easter-egg" || discovered.includes(d.id);
    const distance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"])({
        "WorldMap.usePolled[distance]": ()=>Math.hypot(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle.x - selected.access.x, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle.z - selected.access.z)
    }["WorldMap.usePolled[distance]"], 500);
    const grouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WorldMap.useMemo[grouped]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRICTS"].map({
                "WorldMap.useMemo[grouped]": (district)=>({
                        district,
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"].filter({
                            "WorldMap.useMemo[grouped]": (d)=>d.district === district.id
                        }["WorldMap.useMemo[grouped]"])
                    })
            }["WorldMap.useMemo[grouped]"]).filter({
                "WorldMap.useMemo[grouped]": (g)=>g.items.length > 0
            }["WorldMap.useMemo[grouped]"])
    }["WorldMap.useMemo[grouped]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: "City Map",
        kicker: "Navigation",
        onClose: onClose,
        size: "full",
        fill: true,
        testId: "world-map",
        bodyClassName: "!p-0 !overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-full min-h-0 grid-rows-[minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-cols-[1fr_22rem] lg:grid-rows-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative min-h-0 bg-[#081220]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: `${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`,
                            className: "absolute inset-0 h-full w-full",
                            role: "group",
                            "aria-label": "Map of the city with portfolio destinations",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapBase, {
                                    labels: true
                                }, void 0, false, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RouteLine, {}, void 0, false, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Marker, {
                                        d: d,
                                        selected: d.id === selected.id,
                                        known: known(d),
                                        onSelect: setSelectedId
                                    }, d.id, false, {
                                        fileName: "[project]/components/game/WorldMap.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarMarker, {
                                    scale: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/WorldMap.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute left-3 top-3 flex flex-wrap gap-x-4 gap-y-1 rounded-lg bg-ink/70 px-3 py-2 text-[0.6875rem] text-muted",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2.5 w-2.5 rounded-full bg-sky ring-2 ring-ink"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this),
                                        " Section"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rounded-full bg-muted"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this),
                                        " Item"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rotate-45 bg-muted"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this),
                                        " Discovery"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-fg",
                                            children: "▲"
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 212,
                                            columnNumber: 15
                                        }, this),
                                        " You"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/WorldMap.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-0 flex-col border-t border-line lg:border-l lg:border-t-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "shrink-0 border-b border-line p-4",
                            "data-testid": "map-selection",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "hud-label",
                                    style: {
                                        color: selected.color
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDistrict"])(selected.district).name
                                }, void 0, false, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "display mt-1 text-xl font-semibold leading-snug text-fg",
                                    children: known(selected) ? selected.name : "Undiscovered location"
                                }, void 0, false, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 text-sm text-muted",
                                    children: known(selected) ? selected.category : "Drive there to find out what it is."
                                }, void 0, false, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                known(selected) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 line-clamp-3 text-sm leading-relaxed text-muted",
                                    children: selected.description
                                }, void 0, false, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 224,
                                    columnNumber: 32
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 font-mono text-xs text-dim",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistance"])(distance),
                                        " away"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 grid grid-cols-2 gap-2",
                                    children: [
                                        known(selected) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("primary", "sm", "col-span-2"),
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDestination"])(selected.id),
                                            "data-testid": "map-open",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    name: "arrowRight",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/game/WorldMap.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this),
                                                " Open"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 228,
                                            columnNumber: 17
                                        }, this) : null,
                                        routeTargetId === selected.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("outline", "sm"),
                                            onClick: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearRoute"],
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    name: "close",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/game/WorldMap.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, this),
                                                " Clear route"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("outline", "sm"),
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRouteTo"])(selected.id),
                                            "data-testid": "map-route",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    name: "flag",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/game/WorldMap.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this),
                                                " Set route"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonClass"])("outline", "sm"),
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fastTravelTo"])(selected.id),
                                            "data-testid": "map-travel",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    name: "pin",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/game/WorldMap.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this),
                                                " Go there"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/game/WorldMap.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            "aria-label": "Destinations",
                            className: "thin-scroll min-h-0 flex-1 overflow-y-auto p-2",
                            children: grouped.map(({ district, items })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "hud-label px-2 py-1.5",
                                            style: {
                                                color: district.color
                                            },
                                            children: district.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            children: items.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setSelectedId(d.id),
                                                        "aria-current": d.id === selected.id,
                                                        className: `flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm transition ${d.id === selected.id ? "bg-white/10 text-fg" : "text-muted hover:bg-white/5 hover:text-fg"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `h-2 w-2 shrink-0 ${d.kind === "easter-egg" ? "rotate-45" : "rounded-full"}`,
                                                                style: {
                                                                    background: known(d) ? d.color : "#5b6678"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/game/WorldMap.tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "min-w-0 flex-1 truncate",
                                                                children: known(d) ? d.name : "Undiscovered location"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/game/WorldMap.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 25
                                                            }, this),
                                                            discovered.includes(d.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                name: "check",
                                                                size: 14,
                                                                className: "shrink-0 text-mint"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/game/WorldMap.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 54
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/game/WorldMap.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 23
                                                    }, this)
                                                }, d.id, false, {
                                                    fileName: "[project]/components/game/WorldMap.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/game/WorldMap.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, district.id, true, {
                                    fileName: "[project]/components/game/WorldMap.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/game/WorldMap.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/game/WorldMap.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/game/WorldMap.tsx",
            lineNumber: 191,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/game/WorldMap.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
_s3(WorldMap, "N5vLPoQwgISwjFgEnk093MSdahw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$useHud$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePolled"]
    ];
});
_c5 = WorldMap;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "MapBase");
__turbopack_context__.k.register(_c1, "CarMarker");
__turbopack_context__.k.register(_c2, "RouteLine");
__turbopack_context__.k.register(_c3, "MiniMap");
__turbopack_context__.k.register(_c4, "Marker");
__turbopack_context__.k.register(_c5, "WorldMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/useHud.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFrameLoop",
    ()=>useFrameLoop,
    "usePolled",
    ()=>usePolled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
function useFrameLoop(callback) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(callback);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFrameLoop.useEffect": ()=>{
            ref.current = callback;
        }
    }["useFrameLoop.useEffect"], [
        callback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFrameLoop.useEffect": ()=>{
            let id = 0;
            const tick = {
                "useFrameLoop.useEffect.tick": ()=>{
                    ref.current();
                    id = requestAnimationFrame(tick);
                }
            }["useFrameLoop.useEffect.tick"];
            id = requestAnimationFrame(tick);
            return ({
                "useFrameLoop.useEffect": ()=>cancelAnimationFrame(id)
            })["useFrameLoop.useEffect"];
        }
    }["useFrameLoop.useEffect"], []);
}
_s(useFrameLoop, "lq1tzM4DdcBd9rchfALtCTAkzkA=");
function usePolled(read, intervalMs = 250) {
    _s1();
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(read);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(read);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePolled.useEffect": ()=>{
            ref.current = read;
        }
    }["usePolled.useEffect"], [
        read
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePolled.useEffect": ()=>{
            const id = window.setInterval({
                "usePolled.useEffect.id": ()=>setValue(ref.current())
            }["usePolled.useEffect.id"], intervalMs);
            return ({
                "usePolled.useEffect": ()=>window.clearInterval(id)
            })["usePolled.useEffect"];
        }
    }["usePolled.useEffect"], [
        intervalMs
    ]);
    return value;
}
_s1(usePolled, "vsfBI/aDrrk58+bhnZEXoFXOVuM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/useWorldAssets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebGLUnavailableError",
    ()=>WebGLUnavailableError,
    "useWorldAssets",
    ()=>useWorldAssets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/fonts.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$displayfont_3acbbec$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__displayFont$3e$__ = __turbopack_context__.i("[project]/app/displayfont_3acbbec.js [app-client] (ecmascript) <export default as displayFont>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/collision.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$cityGen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/cityGen.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$deviceCapabilities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/deviceCapabilities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$car$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/vehicle/model/car.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/textures.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
/** Lets the browser paint the loading screen between heavy steps. */ function breathe() {
    return new Promise((resolve)=>{
        const timer = window.setTimeout(resolve, 60);
        requestAnimationFrame(()=>{
            window.clearTimeout(timer);
            window.setTimeout(resolve, 0);
        });
    });
}
class WebGLUnavailableError extends Error {
    constructor(){
        super("This browser or device cannot run WebGL 2, which the 3D city needs.");
        this.name = "WebGLUnavailableError";
    }
}
function useWorldAssets(attempt) {
    _s();
    const [assets, setAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorldAssets.useEffect": ()=>{
            let cancelled = false;
            const built = {};
            const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
            const stage = store.setStage;
            const run = {
                "useWorldAssets.useEffect.run": async ()=>{
                    const device = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$deviceCapabilities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectDevice"])();
                    store.setDevice({
                        reducedMotion: device.reducedMotion,
                        touch: device.touch
                    });
                    if (!device.webgl) throw new WebGLUnavailableError();
                    const params = new URLSearchParams(window.location.search);
                    const forced = params.get("q");
                    if (forced === "low" || forced === "medium" || forced === "high") store.setQuality(forced, false);
                    else if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().qualityAuto) store.setQuality(device.recommended, true);
                    // On a first visit from a phone, the chase camera shows far more of the road.
                    if (device.mobile && !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().introSeen) store.setCameraMode("chase");
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetRuntime"])();
                    stage("app", "done");
                    stage("vehicle", "active");
                    await breathe();
                    if (cancelled) return;
                    const fontFamily = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$displayfont_3acbbec$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__displayFont$3e$__["displayFont"].style.fontFamily;
                    await Promise.all([
                        document.fonts.load(`600 48px ${fontFamily}`).catch({
                            "useWorldAssets.useEffect.run": ()=>undefined
                        }["useWorldAssets.useEffect.run"]),
                        document.fonts.load(`700 48px ${fontFamily}`).catch({
                            "useWorldAssets.useEffect.run": ()=>undefined
                        }["useWorldAssets.useEffect.run"])
                    ]);
                    if (cancelled) return;
                    built.car = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$car$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCar"])({
                        physical: true,
                        plateText: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].plate,
                        fontFamily
                    });
                    stage("vehicle", "done");
                    stage("city", "active");
                    await breathe();
                    if (cancelled) return;
                    built.city = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$cityGen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCity"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].world = {
                        colliders: new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColliderIndex"]([
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATIC_COLLIDERS"],
                            ...built.city.colliders
                        ]),
                        groundHeight: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groundHeight"]
                    };
                    stage("city", "done");
                    stage("environment", "active");
                    await breathe();
                    if (cancelled) return;
                    const words = [
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].shortName,
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].disciplines,
                        "Analytics",
                        "Insight",
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["articles"].map({
                            "useWorldAssets.useEffect.run": (a)=>a.category
                        }["useWorldAssets.useEffect.run"])
                    ];
                    built.textures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWorldTextures"])(fontFamily, words);
                    stage("environment", "done");
                    stage("controls", "active");
                    await breathe();
                    if (cancelled) return;
                    stage("controls", "done");
                    stage("experience", "active");
                    setAssets({
                        car: built.car,
                        city: built.city,
                        textures: built.textures,
                        fontFamily
                    });
                }
            }["useWorldAssets.useEffect.run"];
            run().catch({
                "useWorldAssets.useEffect": (error)=>{
                    if (cancelled) return;
                    console.error("World failed to initialise", error);
                    store.fail(error instanceof Error ? error.message : "The 3D world could not be prepared.");
                }
            }["useWorldAssets.useEffect"]);
            return ({
                "useWorldAssets.useEffect": ()=>{
                    cancelled = true;
                    built.car?.dispose();
                    built.textures?.dispose();
                    setAssets(null);
                }
            })["useWorldAssets.useEffect"];
        }
    }["useWorldAssets.useEffect"], [
        attempt
    ]);
    return assets;
}
_s(useWorldAssets, "jUgRbXqRLbwR/uOk4Qd9Iz+8mC8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]})(),
"[project]/components/game/GameRoot.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/game/GameRoot.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_game_15uc_w0npqi3b._.js.map