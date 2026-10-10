(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/world/CityScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CityScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/performance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/three/merge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$facadeMaterial$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/facadeMaterial.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$instancing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/instancing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$ground$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/geometry/ground.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/geometry/props.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/sky.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/textures.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
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
/** Keeps every `step`-th item, used to thin decoration on lower quality levels. */ function thin(items, density) {
    if (density >= 1) return [
        ...items
    ];
    const out = [];
    let acc = 0;
    for (const item of items){
        acc += density;
        if (acc >= 1) {
            acc -= 1;
            out.push(item);
        }
    }
    return out;
}
/** Roads, pavements, walls, bridges and painted markings. */ function Ground({ textures, city }) {
    _s();
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Ground.useMemo[group]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "ground";
            const ground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$ground$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildGround"])();
            const share = {
                "Ground.useMemo[group].share": (m)=>{
                    m.userData.sharedMap = true;
                    return m;
                }
            }["Ground.useMemo[group].share"];
            const asphalt = share(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#23262c",
                roughness: 0.62,
                roughnessMap: textures.asphalt,
                metalness: 0.02,
                envMapIntensity: 0.9
            }));
            const add = {
                "Ground.useMemo[group].add": (geometry, material, cast = false)=>{
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
                    mesh.receiveShadow = true;
                    mesh.castShadow = cast;
                    root.add(mesh);
                    return mesh;
                }
            }["Ground.useMemo[group].add"];
            add(ground.road, asphalt);
            add(ground.pavement, share(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#c9cdd3",
                map: textures.pavement,
                roughness: 0.86
            })));
            add(ground.plaza, share(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#d6d2c9",
                map: textures.plaza,
                roughness: 0.8
            })));
            add(ground.harbor, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#7c8087",
                roughness: 0.92
            }));
            add(ground.walls, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#8d9096",
                roughness: 0.9
            }), true);
            const bridges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$ground$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBridges"])();
            add(bridges.deck, asphalt);
            add(bridges.structure, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#e4e7ea",
                roughness: 0.55,
                metalness: 0.1
            }), true);
            root.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegments"](bridges.cables, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: "#eef2f5",
                transparent: true,
                opacity: 0.85
            })));
            const paint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#ffffff",
                roughness: 0.7,
                polygonOffset: true,
                polygonOffsetFactor: -2,
                polygonOffsetUnits: -2
            });
            const markings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$ground$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markingsToMesh"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$ground$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMarkings"])(), paint);
            markings.receiveShadow = true;
            root.add(markings);
            add((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$ground$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRoundaboutRings"])(), paint);
            // Lawns for the generated parks.
            if (city.parks.length > 0) {
                const lawn = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1, 1).rotateX(-Math.PI / 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: "#4b8a50",
                    roughness: 1
                }), city.parks.length);
                const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
                city.parks.forEach({
                    "Ground.useMemo[group]": (r, i)=>{
                        m.makeScale(r.x1 - r.x0, 1, r.z1 - r.z0).setPosition((r.x0 + r.x1) / 2, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"] + 0.03, (r.z0 + r.z1) / 2);
                        lawn.setMatrixAt(i, m);
                    }
                }["Ground.useMemo[group]"]);
                lawn.receiveShadow = true;
                root.add(lawn);
            }
            return root;
        }
    }["Ground.useMemo[group]"], [
        textures,
        city
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Ground.useEffect": ()=>({
                "Ground.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(group)
            })["Ground.useEffect"]
    }["Ground.useEffect"], [
        group
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: group
    }, void 0, false, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 114,
        columnNumber: 10
    }, this);
}
_s(Ground, "uBqGtoxzXh+SONlIsf/4LniHD3Q=");
_c = Ground;
/** All generic buildings as two instanced meshes sharing the facade shader. */ function Buildings({ city }) {
    _s1();
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Buildings.useMemo[group]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "buildings";
            const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$facadeMaterial$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFacadeMaterial"])();
            root.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$instancing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instancedBoxes"])(city.buildings, material, true));
            root.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$instancing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instancedBoxes"])(city.roofProps, material, true));
            return root;
        }
    }["Buildings.useMemo[group]"], [
        city
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Buildings.useEffect": ()=>({
                "Buildings.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(group)
            })["Buildings.useEffect"]
    }["Buildings.useEffect"], [
        group
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: group
    }, void 0, false, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 128,
        columnNumber: 10
    }, this);
}
_s1(Buildings, "uBqGtoxzXh+SONlIsf/4LniHD3Q=");
_c1 = Buildings;
function StreetProps({ city, textures }) {
    _s2();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "StreetProps.useGameStore[quality]": (s)=>s.quality
    }["StreetProps.useGameStore[quality]"]);
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "StreetProps.useGameStore[timeOfDay]": (s)=>s.timeOfDay
    }["StreetProps.useGameStore[timeOfDay]"]);
    const profile = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality];
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"][timeOfDay];
    const built = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StreetProps.useMemo[built]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "street-props";
            let glowMaterial = null;
            const density = profile.propDensity;
            const vertex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                vertexColors: true,
                roughness: 0.85
            });
            const foliage = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                vertexColors: true,
                roughness: 0.9,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
            });
            const lamps = thin(city.lamps, Math.max(0.6, density));
            const poles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lampPoleGeometry"])(), vertex, lamps.length);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInstances"])(poles, lamps);
            poles.castShadow = false;
            root.add(poles);
            const heads = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: "#ffe2b0",
                toneMapped: false
            });
            const headMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lampHeadGeometry"])(), heads, lamps.length);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInstances"])(headMesh, lamps);
            root.add(headMesh);
            if (profile.decorativeLights) {
                const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    map: textures.glow,
                    color: "#ffc98a",
                    transparent: true,
                    opacity: 0,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                    depthWrite: false,
                    polygonOffset: true,
                    polygonOffsetFactor: -4,
                    polygonOffsetUnits: -4
                });
                glow.userData.sharedMap = true;
                glowMaterial = glow;
                const pools = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1, 1).rotateX(-Math.PI / 2), glow, lamps.length);
                const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
                lamps.forEach({
                    "StreetProps.useMemo[built]": (l, i)=>{
                        const reach = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAMP_REACH"] * l.scale;
                        m.makeScale(17, 1, 17).setPosition(l.x + Math.cos(l.rot) * reach, l.y + 0.05 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"] * 0.5, l.z - Math.sin(l.rot) * reach);
                        pools.setMatrixAt(i, m);
                    }
                }["StreetProps.useMemo[built]"]);
                pools.instanceMatrix.needsUpdate = true;
                pools.frustumCulled = false;
                pools.renderOrder = 2;
                root.add(pools);
            }
            const trees = thin(city.trees, density);
            const treeMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["treeGeometry"])(), vertex, trees.length);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInstances"])(treeMesh, trees);
            treeMesh.castShadow = true;
            root.add(treeMesh);
            const palms = thin(city.palms, Math.max(0.5, density));
            const palmMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palmGeometry"])(), foliage, palms.length);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInstances"])(palmMesh, palms);
            palmMesh.castShadow = true;
            root.add(palmMesh);
            return {
                root,
                heads,
                glow: glowMaterial
            };
        }
    }["StreetProps.useMemo[built]"], [
        city,
        textures,
        profile.propDensity,
        profile.decorativeLights
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StreetProps.useEffect": ()=>{
            built.heads.color.set("#ffe2b0").multiplyScalar(0.25 + preset.lampGlow * 1.9);
            if (built.glow) built.glow.opacity = preset.lampGlow * 0.42;
        }
    }["StreetProps.useEffect"], [
        preset,
        built
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StreetProps.useEffect": ()=>({
                "StreetProps.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(built.root)
            })["StreetProps.useEffect"]
    }["StreetProps.useEffect"], [
        built
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: built.root
    }, void 0, false, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 200,
        columnNumber: 10
    }, this);
}
_s2(StreetProps, "rIPLoYHWlwlOHTmMFPe+qs5ignk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c2 = StreetProps;
/** Skybridges, overhead signs and the LED screens mounted on towers. */ function Structures({ city, textures, fontFamily }) {
    _s3();
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Structures.useGameStore[timeOfDay]": (s)=>s.timeOfDay
    }["Structures.useGameStore[timeOfDay]"]);
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"][timeOfDay];
    const built = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Structures.useMemo[built]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "structures";
            const vertex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                vertexColors: true,
                roughness: 0.55,
                metalness: 0.15
            });
            const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#9fd4ff").multiplyScalar(1.5),
                toneMapped: false
            });
            for (const s of city.skybridges){
                const holder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                holder.position.set(s.x, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"], s.z);
                holder.rotation.y = s.axis === "x" ? 0 : Math.PI / 2;
                const bridge = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skybridgeGeometry"])(s.span, s.height), vertex);
                bridge.castShadow = true;
                holder.add(bridge, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skybridgeGlowGeometry"])(s.span, s.height), glow));
                root.add(holder);
            }
            const steel = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#8d949c",
                roughness: 0.4,
                metalness: 0.8
            });
            for (const g of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GANTRIES"]){
                const holder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                holder.position.set(g.x, 0, g.z);
                holder.rotation.y = g.facing + Math.PI;
                const span = (g.halfWidth + 1.7) * 2;
                for (const side of [
                    -1,
                    1
                ]){
                    const post = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.22, 0.28, 8.4, 10), steel);
                    post.position.set(side * span / 2, 4.2 + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"], 0);
                    holder.add(post);
                }
                const beam = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](span, 0.5, 0.5), steel);
                beam.position.set(0, 8.2, 0);
                holder.add(beam);
                const sign = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](span * 0.8, span * 0.2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    map: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeGantryTexture"])(fontFamily, g.entries),
                    toneMapped: false
                }));
                sign.position.set(0, 7.2, 0.3);
                holder.add(sign);
                const back = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](span * 0.8, span * 0.2, 0.12), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: "#2b3036",
                    roughness: 0.7
                }));
                back.position.set(0, 7.2, 0.22);
                holder.add(back);
                root.add(holder);
            }
            const screens = textures.billboards.map({
                "Structures.useMemo[built].screens": (map)=>{
                    const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        map,
                        toneMapped: false
                    });
                    m.userData.sharedMap = true;
                    return m;
                }
            }["Structures.useMemo[built].screens"]);
            const frame = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#14161b",
                roughness: 0.6,
                metalness: 0.5
            });
            for (const b of city.billboards){
                const holder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                holder.position.set(b.x, b.y, b.z);
                holder.rotation.y = b.rot;
                const face = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](b.w, b.h), screens[b.variant % screens.length]);
                face.position.z = 0.16;
                holder.add(face, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](b.w + 0.6, b.h + 0.6, 0.3), frame));
                root.add(holder);
            }
            return {
                root,
                screens
            };
        }
    }["Structures.useMemo[built]"], [
        city,
        textures,
        fontFamily
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Structures.useEffect": ()=>{
            for (const m of built.screens)m.color.setScalar(0.75 + preset.emissive * 0.45);
        }
    }["Structures.useEffect"], [
        preset,
        built
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Structures.useEffect": ()=>({
                "Structures.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(built.root)
            })["Structures.useEffect"]
    }["Structures.useEffect"], [
        built
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: built.root
    }, void 0, false, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 270,
        columnNumber: 10
    }, this);
}
_s3(Structures, "YHTgTkriN5ACmME9UxInMequcW0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c3 = Structures;
function Harbor({ city }) {
    _s4();
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Harbor.useMemo[group]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "harbor";
            const containers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$instancing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instancedBoxes"])(city.containers, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                roughness: 0.72,
                metalness: 0.25
            }), false);
            root.add(containers);
            const cranes = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["craneGeometry"])(), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                vertexColors: true,
                roughness: 0.6,
                metalness: 0.3
            }), city.cranes.length);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInstances"])(cranes, city.cranes);
            cranes.castShadow = true;
            root.add(cranes);
            // A container ship waiting off the east shore.
            const hullMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#1f2f45",
                roughness: 0.6
            });
            const hull = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](28, 12, 170), hullMat);
            hull.position.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + 70, 2.5, 80);
            root.add(hull);
            const deck = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](22, 14, 16), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#eceff1",
                roughness: 0.6
            }));
            deck.position.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + 70, 15, 150);
            root.add(deck);
            const cargo = city.containers.slice(0, 220).map({
                "Harbor.useMemo[group].cargo": (c, i)=>({
                        ...c,
                        x: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + 60 + i % 7 * 3.1,
                        y: 8.5 + Math.floor(i / 7) % 4 * 2.7,
                        z: 6 + Math.floor(i / 28) * 13.4
                    })
            }["Harbor.useMemo[group].cargo"]);
            root.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$instancing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instancedBoxes"])(cargo, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                roughness: 0.72,
                metalness: 0.25
            }), false));
            return root;
        }
    }["Harbor.useMemo[group]"], [
        city
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Harbor.useEffect": ()=>({
                "Harbor.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(group)
            })["Harbor.useEffect"]
    }["Harbor.useEffect"], [
        group
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: group
    }, void 0, false, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 302,
        columnNumber: 10
    }, this);
}
_s4(Harbor, "uBqGtoxzXh+SONlIsf/4LniHD3Q=");
_c4 = Harbor;
/** Sea and channel, moored and moving boats, and the marina piers. */ function Water({ textures }) {
    _s5();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Water.useGameStore[quality]": (s)=>s.quality
    }["Water.useGameStore[quality]"]);
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Water.useGameStore[reducedMotion]": (s)=>s.reducedMotion
    }["Water.useGameStore[reducedMotion]"]);
    const rich = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality].richMaterials;
    const built = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Water.useMemo[built]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "water";
            const normal = textures.waterNormal.clone();
            normal.wrapS = normal.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            normal.repeat.set(320, 320);
            normal.needsUpdate = true;
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#1b4c66",
                roughness: rich ? 0.1 : 0.25,
                metalness: 0.75,
                normalMap: normal,
                normalScale: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.38, 0.38),
                envMapIntensity: 1.35
            });
            const sea = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](7000, 7000).rotateX(-Math.PI / 2), material);
            sea.position.y = -1.3;
            sea.receiveShadow = false;
            root.add(sea);
            const boatMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boatGeometry"])(), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                vertexColors: true,
                roughness: 0.45,
                metalness: 0.1
            }), 14);
            boatMesh.castShadow = true;
            root.add(boatMesh);
            // Marina piers reaching out from the south quay.
            const pier = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#8a7a66",
                roughness: 0.95
            });
            for(let i = 0; i < 6; i++){
                const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](2.2, 0.5, 16), pier);
                p.position.set(-186 + i * 26, -0.55, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 - 8);
                root.add(p);
            }
            return {
                root,
                normal,
                boats: boatMesh
            };
        }
    }["Water.useMemo[built]"], [
        textures,
        rich
    ]);
    const moving = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Water.useMemo[moving]": ()=>[
                {
                    z: 160,
                    speed: 4.2,
                    phase: 0,
                    dir: 1
                },
                {
                    z: 176,
                    speed: 3.1,
                    phase: 300,
                    dir: -1
                },
                {
                    z: 150,
                    speed: 5.0,
                    phase: 620,
                    dir: 1
                },
                {
                    z: 188,
                    speed: 2.6,
                    phase: 120,
                    dir: -1
                }
            ]
    }["Water.useMemo[moving]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Water.useFrame": ({ clock })=>{
            const t = reducedMotion ? 0 : clock.elapsedTime;
            if (rich) built.normal.offset.set(t * 0.006, t * 0.004);
            const mesh = built.boats;
            const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
            const span = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + 500;
            moving.forEach({
                "Water.useFrame": (b, i)=>{
                    const along = ((b.phase + t * b.speed) % span + span) % span;
                    const x = b.dir > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - 250 + along : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + 250 - along;
                    // Boats pass under the bridges, so keep them low in the water.
                    m.copy((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
                        x,
                        -1.25 + Math.sin(t * 0.8 + i) * 0.06,
                        b.z
                    ], [
                        0,
                        b.dir > 0 ? Math.PI / 2 : -Math.PI / 2,
                        0
                    ], [
                        0.8,
                        0.8,
                        0.8
                    ]));
                    mesh.setMatrixAt(i, m);
                }
            }["Water.useFrame"]);
            for(let i = 0; i < 10; i++){
                const pierIndex = Math.floor(i / 2);
                const side = i % 2 === 0 ? -1 : 1;
                m.copy((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
                    -186 + pierIndex * 26 + side * 4.4,
                    -1.2 + Math.sin(t * 0.7 + i * 1.3) * 0.05,
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 - 9
                ], [
                    0,
                    0,
                    0
                ], [
                    0.62,
                    0.62,
                    0.62
                ]));
                mesh.setMatrixAt(moving.length + i, m);
            }
            mesh.instanceMatrix.needsUpdate = true;
        }
    }["Water.useFrame"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Water.useEffect": ()=>({
                "Water.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(built.root);
                    built.normal.dispose();
                }
            })["Water.useEffect"]
    }["Water.useEffect"], [
        built
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: built.root
    }, void 0, false, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 382,
        columnNumber: 10
    }, this);
}
_s5(Water, "Zb1G7lP0S22Uf9EWYxyxfPcCioc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c5 = Water;
/** Hills, pines, the radio mast, wind turbines and the hilltop pagoda. */ function Backdrop() {
    _s6();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Backdrop.useGameStore[quality]": (s)=>s.quality
    }["Backdrop.useGameStore[quality]"]);
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Backdrop.useGameStore[reducedMotion]": (s)=>s.reducedMotion
    }["Backdrop.useGameStore[reducedMotion]"]);
    const density = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality].propDensity;
    const built = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Backdrop.useMemo[built]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "backdrop";
            const rotors = [];
            const { geometry, heightAt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hillsGeometry"])();
            const vertex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                vertexColors: true,
                roughness: 0.95
            });
            const hills = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, vertex);
            hills.receiveShadow = true;
            root.add(hills);
            const pines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hillTreePoints"])(heightAt, Math.round(520 * density));
            const pineMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pineGeometry"])(), vertex, pines.length);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInstances"])(pineMesh, pines);
            root.add(pineMesh);
            const place = {
                "Backdrop.useMemo[built].place": (geo, x, z, scale = 1)=>{
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, vertex);
                    mesh.position.set(x, heightAt(x, z) - 0.5, z);
                    mesh.scale.setScalar(scale);
                    root.add(mesh);
                    return mesh;
                }
            }["Backdrop.useMemo[built].place"];
            const mast = place((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radioMastGeometry"])(), -300, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 150);
            const beacon = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.9, 8, 6), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ff3b30").multiplyScalar(2),
                toneMapped: false
            }));
            beacon.position.set(0, 79, 0);
            mast.add(beacon);
            place((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pagodaGeometry"])(), -120, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 118, 1.3);
            const rotorGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["turbineRotorGeometry"])();
            const towerGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$props$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["turbineTowerGeometry"])();
            for (const [x, dz] of [
                [
                    120,
                    130
                ],
                [
                    200,
                    150
                ],
                [
                    285,
                    120
                ],
                [
                    370,
                    140
                ],
                [
                    450,
                    110
                ]
            ]){
                const tower = place(towerGeo, x, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - dz);
                const rotor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](rotorGeo, vertex);
                rotor.position.set(0, 38.4, 2.4);
                rotor.rotation.z = x;
                tower.add(rotor);
                rotors.push(rotor);
            }
            return {
                root,
                rotors
            };
        }
    }["Backdrop.useMemo[built]"], [
        density
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Backdrop.useFrame": (_, dt)=>{
            if (reducedMotion) return;
            for (const r of built.rotors)r.rotation.z += dt * 0.9;
        }
    }["Backdrop.useFrame"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Backdrop.useEffect": ()=>({
                "Backdrop.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(built.root)
            })["Backdrop.useEffect"]
    }["Backdrop.useEffect"], [
        built
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: built.root
    }, void 0, false, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 441,
        columnNumber: 10
    }, this);
}
_s6(Backdrop, "PlPYxyUXruZBDcYU27+k3MJAiJ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c6 = Backdrop;
/** Updates the shared facade uniforms when the time of day changes. */ function FacadeClock() {
    _s7();
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "FacadeClock.useGameStore[timeOfDay]": (s)=>s.timeOfDay
    }["FacadeClock.useGameStore[timeOfDay]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FacadeClock.useEffect": ()=>{
            const preset = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"][timeOfDay];
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$facadeMaterial$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["facadeUniforms"].uWindowLit.value = preset.windowLit;
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$facadeMaterial$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["facadeUniforms"].uEmissive.value = preset.emissive;
        }
    }["FacadeClock.useEffect"], [
        timeOfDay
    ]);
    return null;
}
_s7(FacadeClock, "JDSLphRKbmbHwVyODz1hftlusRA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c7 = FacadeClock;
function CityScene(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        name: "city",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FacadeClock, {}, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 458,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ground, {
                textures: props.textures,
                city: props.city
            }, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Buildings, {
                city: props.city
            }, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 460,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StreetProps, {
                city: props.city,
                textures: props.textures
            }, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Structures, {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Harbor, {
                city: props.city
            }, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Water, {
                textures: props.textures
            }, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 464,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Backdrop, {}, void 0, false, {
                fileName: "[project]/components/world/CityScene.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/world/CityScene.tsx",
        lineNumber: 457,
        columnNumber: 5
    }, this);
}
_c8 = CityScene;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "Ground");
__turbopack_context__.k.register(_c1, "Buildings");
__turbopack_context__.k.register(_c2, "StreetProps");
__turbopack_context__.k.register(_c3, "Structures");
__turbopack_context__.k.register(_c4, "Harbor");
__turbopack_context__.k.register(_c5, "Water");
__turbopack_context__.k.register(_c6, "Backdrop");
__turbopack_context__.k.register(_c7, "FacadeClock");
__turbopack_context__.k.register(_c8, "CityScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/Environment.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorldEnvironment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
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
function WorldEnvironment() {
    _s();
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "WorldEnvironment.useGameStore[timeOfDay]": (s)=>s.timeOfDay
    }["WorldEnvironment.useGameStore[timeOfDay]"]);
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "WorldEnvironment.useGameStore[quality]": (s)=>s.quality
    }["WorldEnvironment.useGameStore[quality]"]);
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "WorldEnvironment.useGameStore[reducedMotion]": (s)=>s.reducedMotion
    }["WorldEnvironment.useGameStore[reducedMotion]"]);
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"][timeOfDay];
    const profile = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality];
    const { gl, scene, camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const dome = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WorldEnvironment.useMemo[material]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSkyMaterial"])()
    }["WorldEnvironment.useMemo[material]"], []);
    const sunDirection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WorldEnvironment.useMemo[sunDirection]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    }["WorldEnvironment.useMemo[sunDirection]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorldEnvironment.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applySkyPreset"])(material, preset);
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bakeEnvironment"])(gl, preset);
            scene.environment = target.texture;
            scene.environmentIntensity = preset.envIntensity;
            gl.toneMappingExposure = preset.exposure;
            sunDirection.set(...preset.sunDirection).normalize();
            return ({
                "WorldEnvironment.useEffect": ()=>{
                    scene.environment = null;
                    target.dispose();
                }
            })["WorldEnvironment.useEffect"];
        }
    }["WorldEnvironment.useEffect"], [
        gl,
        scene,
        material,
        preset,
        sunDirection
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorldEnvironment.useEffect": ()=>{
            const fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fog"](preset.fog, profile.drawDistance * preset.fogRange[0], profile.drawDistance * preset.fogRange[1]);
            scene.fog = fog;
            const cam = camera;
            cam.far = profile.drawDistance * 1.25;
            cam.updateProjectionMatrix();
            return ({
                "WorldEnvironment.useEffect": ()=>{
                    scene.fog = null;
                }
            })["WorldEnvironment.useEffect"];
        }
    }["WorldEnvironment.useEffect"], [
        scene,
        camera,
        preset,
        profile.drawDistance
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorldEnvironment.useEffect": ()=>({
                "WorldEnvironment.useEffect": ()=>material.dispose()
            })["WorldEnvironment.useEffect"]
    }["WorldEnvironment.useEffect"], [
        material
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "WorldEnvironment.useFrame": ({ clock })=>{
            if (dome.current) dome.current.position.copy(camera.position);
            if (!reducedMotion) material.uniforms.uTime.value = clock.elapsedTime;
            const light = sun.current;
            if (light) {
                // The shadow frustum follows the car so a modest map stays sharp.
                const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
                light.target.position.set(v.x, 0, v.z);
                light.position.set(v.x + sunDirection.x * 320, sunDirection.y * 320, v.z + sunDirection.z * 320);
                light.target.updateMatrixWorld();
            }
        }
    }["WorldEnvironment.useFrame"]);
    const range = profile.shadowRange;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: dome,
                material: material,
                renderOrder: -10,
                frustumCulled: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                    args: [
                        20,
                        32,
                        16
                    ]
                }, void 0, false, {
                    fileName: "[project]/components/world/Environment.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/world/Environment.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                args: [
                    preset.hemiSky,
                    preset.hemiGround,
                    preset.hemiIntensity
                ]
            }, void 0, false, {
                fileName: "[project]/components/world/Environment.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                ref: sun,
                color: preset.sunColor,
                intensity: preset.sunIntensity,
                castShadow: profile.shadows,
                "shadow-mapSize": [
                    profile.shadowMapSize,
                    profile.shadowMapSize
                ],
                "shadow-bias": -0.0006,
                "shadow-normalBias": 0.5,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("orthographicCamera", {
                    attach: "shadow-camera",
                    args: [
                        -range,
                        range,
                        range,
                        -range,
                        20,
                        900
                    ]
                }, void 0, false, {
                    fileName: "[project]/components/world/Environment.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/world/Environment.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/world/Environment.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(WorldEnvironment, "Wn76Esr6qZ/pYyoEFKBwYvWQAkM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = WorldEnvironment;
var _c;
__turbopack_context__.k.register(_c, "WorldEnvironment");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/Landmarks.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "beaconPosition",
    ()=>beaconPosition,
    "default",
    ()=>Landmarks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/three/merge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$facadeMaterial$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/facadeMaterial.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/geometry/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$instancing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/instancing.ts [app-client] (ecmascript)");
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
function beaconPosition(d) {
    const small = d.landmark === "kiosk" || d.landmark === "terminal" || d.landmark === "lookout";
    const t = small ? 0 : 0.62;
    const x = d.position[0] + (d.access.x - d.position[0]) * t;
    const z = d.position[1] + (d.access.z - d.position[1]) * t;
    return [
        x,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groundHeight"])(x, z),
        z
    ];
}
/**
 * Floating markers above every destination. Three instanced meshes (ground
 * ring, diamond and light beam) cover all of them.
 */ function Beacons() {
    _s();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Beacons.useGameStore[reducedMotion]": (s)=>s.reducedMotion
    }["Beacons.useGameStore[reducedMotion]"]);
    const discovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Beacons.useGameStore[discovered]": (s)=>s.discovered
    }["Beacons.useGameStore[discovered]"]);
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Beacons.useMemo[layout]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"].map({
                "Beacons.useMemo[layout]": (d)=>{
                    const [x, y, z] = beaconPosition(d);
                    const small = d.landmark === "kiosk" || d.landmark === "terminal" || d.landmark === "lookout";
                    return {
                        id: d.id,
                        x,
                        y,
                        z,
                        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](d.color),
                        scale: d.kind === "section" ? 1 : 0.62,
                        height: small ? 8.5 : d.kind === "section" ? 7 : 5.5
                    };
                }
            }["Beacons.useMemo[layout]"])
    }["Beacons.useMemo[layout]"], []);
    const built = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Beacons.useMemo[built]": ()=>{
            const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            root.name = "beacons";
            const n = layout.length;
            const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
            const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RingGeometry"](2.7, 3.3, 40).rotateX(-Math.PI / 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                transparent: true,
                opacity: 0.85,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false,
                toneMapped: false,
                polygonOffset: true,
                polygonOffsetFactor: -4,
                polygonOffsetUnits: -4
            }), n);
            const beam = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0.9, 1, 12, 1, true).translate(0, 0.5, 0), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                transparent: true,
                opacity: 0.045,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                toneMapped: false
            }), n);
            const diamond = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](1.25), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                toneMapped: false
            }), n);
            layout.forEach({
                "Beacons.useMemo[built]": (b, i)=>{
                    m.makeScale(b.scale, 1, b.scale).setPosition(b.x, b.y + 0.06, b.z);
                    ring.setMatrixAt(i, m);
                    ring.setColorAt(i, b.color);
                    m.makeScale(b.scale, 46 * b.scale, b.scale).setPosition(b.x, b.y, b.z);
                    beam.setMatrixAt(i, m);
                    beam.setColorAt(i, b.color);
                    diamond.setColorAt(i, b.color.clone().multiplyScalar(1.5));
                }
            }["Beacons.useMemo[built]"]);
            for (const mesh of [
                ring,
                beam,
                diamond
            ]){
                mesh.frustumCulled = false;
                if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
                mesh.instanceMatrix.needsUpdate = true;
            }
            ring.renderOrder = 3;
            beam.renderOrder = 3;
            root.add(ring, beam, diamond);
            return {
                root,
                diamond
            };
        }
    }["Beacons.useMemo[built]"], [
        layout
    ]);
    const matrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Beacons.useMemo[matrix]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]()
    }["Beacons.useMemo[matrix]"], []);
    const quat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Beacons.useMemo[quat]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]()
    }["Beacons.useMemo[quat]"], []);
    const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Beacons.useMemo[pos]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    }["Beacons.useMemo[pos]"], []);
    const scl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Beacons.useMemo[scl]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    }["Beacons.useMemo[scl]"], []);
    const axis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Beacons.useMemo[axis]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)
    }["Beacons.useMemo[axis]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Beacons.useFrame": ({ clock })=>{
            const mesh = built.diamond;
            const t = reducedMotion ? 0 : clock.elapsedTime;
            layout.forEach({
                "Beacons.useFrame": (b, i)=>{
                    const seen = discovered.includes(b.id);
                    quat.setFromAxisAngle(axis, t * 0.9 + i);
                    pos.set(b.x, b.y + b.height + Math.sin(t * 1.6 + i * 0.7) * 0.35, b.z);
                    const s = b.scale * (seen ? 0.7 : 1);
                    scl.set(s, s * 1.5, s);
                    matrix.compose(pos, quat, scl);
                    mesh.setMatrixAt(i, matrix);
                }
            }["Beacons.useFrame"]);
            mesh.instanceMatrix.needsUpdate = true;
        }
    }["Beacons.useFrame"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Beacons.useEffect": ()=>({
                "Beacons.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(built.root)
            })["Beacons.useEffect"]
    }["Beacons.useEffect"], [
        built
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: built.root
    }, void 0, false, {
        fileName: "[project]/components/world/Landmarks.tsx",
        lineNumber: 103,
        columnNumber: 10
    }, this);
}
_s(Beacons, "xB+GWjU85zrDdYwrIhx/MdumIDs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Beacons;
function Landmarks({ textures, fontFamily }) {
    _s1();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Landmarks.useGameStore[reducedMotion]": (s)=>s.reducedMotion
    }["Landmarks.useGameStore[reducedMotion]"]);
    const built = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Landmarks.useMemo[built]": ()=>{
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$geometry$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildLandmarks"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"], {
                fontFamily,
                billboards: textures.billboards,
                ownerName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].shortName,
                disciplines: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].disciplines
            });
            // Landmark volumes with windows share the skyline's facade shader.
            result.group.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$instancing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instancedBoxes"])(result.facades, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$facadeMaterial$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFacadeMaterial"])(), true));
            return result;
        }
    }["Landmarks.useMemo[built]"], [
        textures,
        fontFamily
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Landmarks.useFrame": ({ clock }, dt)=>{
            if (reducedMotion) return;
            const t = clock.elapsedTime;
            for (const s of built.spinners){
                s.object.rotation.y += s.speed * dt;
                if (s.bob && s.baseY !== undefined) s.object.position.y = s.baseY + Math.sin(t * 1.2 + s.baseY) * s.bob;
            }
        }
    }["Landmarks.useFrame"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Landmarks.useEffect": ()=>({
                "Landmarks.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposeObject"])(built.group)
            })["Landmarks.useEffect"]
    }["Landmarks.useEffect"], [
        built
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: built.group
            }, void 0, false, {
                fileName: "[project]/components/world/Landmarks.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Beacons, {}, void 0, false, {
                fileName: "[project]/components/world/Landmarks.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/world/Landmarks.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s1(Landmarks, "AbGGMJQKb0Q4LaPZSO+3bdZEJ3o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = Landmarks;
var _c, _c1;
__turbopack_context__.k.register(_c, "Beacons");
__turbopack_context__.k.register(_c1, "Landmarks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/RouteGuide.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RouteGuide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
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
/** Builds a ribbon along the route, shifted into the left-hand driving lane. */ function ribbonGeometry(points) {
    const dense = [];
    for(let i = 1; i < points.length; i++){
        const [ax, az] = points[i - 1];
        const [bx, bz] = points[i];
        const len = Math.hypot(bx - ax, bz - az);
        const steps = Math.max(1, Math.ceil(len / 3));
        for(let s = i === 1 ? 0 : 1; s <= steps; s++)dense.push([
            ax + (bx - ax) * s / steps,
            az + (bz - az) * s / steps
        ]);
    }
    const pos = [];
    const uv = [];
    const idx = [];
    const half = 1.1;
    let walked = 0;
    for(let i = 0; i < dense.length; i++){
        const prev = dense[Math.max(0, i - 1)];
        const next = dense[Math.min(dense.length - 1, i + 1)];
        let dx = next[0] - prev[0];
        let dz = next[1] - prev[1];
        const len = Math.hypot(dx, dz) || 1;
        dx /= len;
        dz /= len;
        // Left of travel is (dz, -dx) in this coordinate system.
        const cx = dense[i][0] + dz * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"];
        const cz = dense[i][1] - dx * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANE_OFFSET"];
        if (i > 0) walked += Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]);
        for (const side of [
            -1,
            1
        ]){
            const x = cx + dz * half * side;
            const z = cz - dx * half * side;
            pos.push(x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groundHeight"])(x, z) + 0.07, z);
            uv.push(side < 0 ? 0 : 1, walked / 5);
        }
        if (i > 0) {
            const o = (i - 1) * 2;
            idx.push(o, o + 1, o + 2, o + 1, o + 3, o + 2);
        }
    }
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](pos, 3));
    g.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uv, 2));
    g.setIndex(idx);
    return g;
}
function RouteGuide({ textures }) {
    _s();
    const targetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "RouteGuide.useGameStore[targetId]": (s)=>s.routeTargetId
    }["RouteGuide.useGameStore[targetId]"]);
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "RouteGuide.useGameStore[reducedMotion]": (s)=>s.reducedMotion
    }["RouteGuide.useGameStore[reducedMotion]"]);
    const [version, setVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const seen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(-1);
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RouteGuide.useMemo[material]": ()=>{
            const map = textures.routeArrow.clone();
            map.wrapS = map.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            map.needsUpdate = true;
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map,
                transparent: true,
                depthWrite: false,
                toneMapped: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                polygonOffset: true,
                polygonOffsetFactor: -6,
                polygonOffsetUnits: -6
            });
        }
    }["RouteGuide.useMemo[material]"], [
        textures
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RouteGuide.useEffect": ()=>({
                "RouteGuide.useEffect": ()=>{
                    material.map?.dispose();
                    material.dispose();
                }
            })["RouteGuide.useEffect"]
    }["RouteGuide.useEffect"], [
        material
    ]);
    // The route itself lives in the runtime; watch its version to rebuild the ribbon.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "RouteGuide.useFrame": (_, dt)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion !== seen.current) {
                seen.current = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion;
                setVersion(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion);
            }
            if (material.map && !reducedMotion) material.map.offset.y -= dt * 0.9;
            if (marker.current && !reducedMotion) marker.current.rotation.y += dt * 0.8;
        }
    }["RouteGuide.useFrame"]);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RouteGuide.useMemo[geometry]": ()=>{
            void version;
            const route = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route;
            if (!route || !targetId || route.points.length < 2) return null;
            return ribbonGeometry(route.points);
        }
    }["RouteGuide.useMemo[geometry]"], [
        version,
        targetId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RouteGuide.useEffect": ()=>({
                "RouteGuide.useEffect": ()=>geometry?.dispose()
            })["RouteGuide.useEffect"]
    }["RouteGuide.useEffect"], [
        geometry
    ]);
    const target = targetId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(targetId) : undefined;
    if (!geometry || !target) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        name: "route-guide",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: geometry,
                material: material,
                renderOrder: 4,
                frustumCulled: false
            }, void 0, false, {
                fileName: "[project]/components/world/RouteGuide.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: marker,
                position: [
                    target.access.x,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groundHeight"])(target.access.x, target.access.z),
                    target.access.z
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            30,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.5,
                                    2.2,
                                    60,
                                    16,
                                    1,
                                    true
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/world/RouteGuide.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: "#9fd8ff",
                                transparent: true,
                                opacity: 0.22,
                                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                                depthWrite: false,
                                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                                toneMapped: false
                            }, void 0, false, {
                                fileName: "[project]/components/world/RouteGuide.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/world/RouteGuide.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        rotation: [
                            -Math.PI / 2,
                            0,
                            0
                        ],
                        position: [
                            0,
                            0.08,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                                args: [
                                    3.4,
                                    4.2,
                                    6
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/world/RouteGuide.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: "#bfe6ff",
                                transparent: true,
                                opacity: 0.9,
                                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                                depthWrite: false,
                                toneMapped: false
                            }, void 0, false, {
                                fileName: "[project]/components/world/RouteGuide.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/world/RouteGuide.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/world/RouteGuide.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/world/RouteGuide.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(RouteGuide, "J3knKRse4j1yxdA+UljdE/0rF6I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = RouteGuide;
var _c;
__turbopack_context__.k.register(_c, "RouteGuide");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/facadeMaterial.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createFacadeMaterial",
    ()=>createFacadeMaterial,
    "facadeUniforms",
    ()=>facadeUniforms
]);
/**
 * Procedural building facades.
 *
 * Every generic building is one instanced box. Windows, mullions, lit rooms,
 * shopfronts and neon edge strips are drawn in the fragment shader from the
 * box's own size and a per-building seed, so a forty-storey tower costs the
 * same as a kiosk and needs no textures.
 *
 * The shader extends MeshStandardMaterial, so buildings still receive sun,
 * shadows, fog and environment reflections like everything else.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const facadeUniforms = {
    uWindowLit: {
        value: 0.5
    },
    uEmissive: {
        value: 1
    },
    uTime: {
        value: 0
    }
};
const VERTEX_DECL = /* glsl */ `
attribute vec4 aStyle;
attribute vec3 aAccent;
varying vec3 vBPos;
varying vec3 vBNrm;
// Per-building constants are passed flat: interpolating them introduces
// last-bit differences per pixel, which the hash would turn into static.
flat varying vec3 vBSize;
flat varying vec4 vStyle;
flat varying vec3 vAccent;
`;
const VERTEX_BODY = /* glsl */ `
#ifdef USE_INSTANCING
  vec3 bSize = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
#else
  vec3 bSize = vec3(1.0);
#endif
vBSize = bSize;
vBPos = position * bSize;
vBNrm = normal;
vStyle = aStyle;
vAccent = aAccent;
`;
const FRAGMENT_DECL = /* glsl */ `
varying vec3 vBPos;
varying vec3 vBNrm;
flat varying vec3 vBSize;
flat varying vec4 vStyle;
flat varying vec3 vAccent;
uniform float uWindowLit;
uniform float uEmissive;
float fHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float fWin = 0.0;
float fLit = 0.0;
float fAccent = 0.0;
vec3 fLightColor = vec3(1.0);
`;
const FRAGMENT_COLOR = /* glsl */ `
{
  float style = vStyle.x;
  float seed = floor(vStyle.y + 0.5);
  bool roof = abs(vBNrm.y) > 0.5;
  vec2 fuv;
  float faceId;
  float halfW;
  if (abs(vBNrm.x) > 0.5) {
    fuv = vec2(vBPos.z, vBPos.y);
    faceId = 1.0 + sign(vBNrm.x);
    halfW = vBSize.z * 0.5;
  } else {
    fuv = vec2(vBPos.x, vBPos.y);
    faceId = 5.0 + sign(vBNrm.z);
    halfW = vBSize.x * 0.5;
  }
  float floorH = 3.6;
  float bay = 3.2;
  vec2 margin = vec2(0.14, 0.24);
  vec3 glass = vec3(0.26, 0.4, 0.56);
  float glassMix = 0.55;
  if (style < 0.5) { floorH = 3.9; bay = 1.95; margin = vec2(0.04, 0.07); glass = vec3(0.28, 0.46, 0.66); glassMix = 0.35; }
  else if (style < 1.5) { floorH = 3.6; bay = 3.2; margin = vec2(0.14, 0.25); }
  else if (style < 2.5) { floorH = 3.1; bay = 2.5; margin = vec2(0.24, 0.3); glass = vec3(0.22, 0.3, 0.4); }
  else if (style < 3.5) { floorH = 3.9; bay = 1.35; margin = vec2(0.26, 0.04); glass = vec3(0.24, 0.4, 0.6); glassMix = 0.4; }
  else if (style < 4.5) { floorH = 5.2; bay = 7.5; margin = vec2(0.4, 0.42); glass = vec3(0.2, 0.3, 0.4); }
  else if (style < 5.5) { floorH = max(4.5, vBSize.y * 0.5); bay = 5.5; margin = vec2(0.06, 0.14); glass = vec3(0.32, 0.38, 0.42); }

  vec2 g = vec2(fuv.x / bay + 0.5, fuv.y / floorH);
  vec2 cell = floor(g);
  vec2 f = fract(g);
  vec2 fw = fwidth(g) * 0.75;
  float wx = smoothstep(margin.x - fw.x, margin.x + fw.x, f.x) * (1.0 - smoothstep(1.0 - margin.x - fw.x, 1.0 - margin.x + fw.x, f.x));
  float wy = smoothstep(margin.y - fw.y, margin.y + fw.y, f.y) * (1.0 - smoothstep(1.0 - margin.y - fw.y, 1.0 - margin.y + fw.y, f.y));
  float win = wx * wy;
  // Far away the grid is finer than a pixel: fade to its average coverage instead of shimmering.
  float fade = clamp(1.0 - (max(fw.x, fw.y) - 0.1) * 4.0, 0.0, 1.0);
  float cover = (1.0 - 2.0 * margin.x) * (1.0 - 2.0 * margin.y);
  win = mix(cover, win, fade);

  float rnd = fHash(cell + vec2(seed * 0.173, faceId * 3.7));
  float share = clamp(vStyle.z * uWindowLit, 0.0, 1.0);
  if (style > 4.5 && style < 5.5) share = clamp(0.35 + uWindowLit * 0.6, 0.0, 1.0);
  float lit = mix(share, step(1.0 - share, rnd), fade);
  // Plain styles (roof plant, spires) and roofs have no windows.
  if (roof || style > 5.5) { win = 0.0; lit = 0.0; }

  vec3 wall = diffuseColor.rgb;
  if (roof) wall *= 0.55;
  vec3 glassCol = mix(glass, wall, glassMix * 0.4);
  diffuseColor.rgb = mix(wall, glassCol, win);
  fWin = win;
  fLit = lit * win;
  float warm = fHash(cell * 1.7 + seed * 0.31);
  fLightColor = mix(vec3(1.0, 0.74, 0.44), vec3(0.6, 0.78, 1.0), step(0.82, warm)) * (0.4 + 0.6 * fHash(cell + 9.1));
  if (style > 4.5 && style < 5.5) fLightColor = vec3(1.0, 0.78, 0.5) * 0.6;

  // Neon: vertical strips at the corners and a crown band at the top.
  float hasAccent = step(0.01, dot(vAccent, vAccent));
  if (!roof && hasAccent > 0.5) {
    float edge = smoothstep(halfW - 0.55, halfW - 0.3, abs(fuv.x));
    float crown = smoothstep(vBSize.y - 1.4, vBSize.y - 1.0, vBPos.y);
    fAccent = max(edge, crown);
    if (style > 6.5) fAccent = 0.35 + 0.65 * smoothstep(vBSize.y - 3.0, vBSize.y, vBPos.y);
    diffuseColor.rgb = mix(diffuseColor.rgb, vAccent * 0.3, fAccent);
  }
}
`;
const FRAGMENT_EMISSIVE = /* glsl */ `
totalEmissiveRadiance += fLit * fLightColor * uEmissive * 0.85;
totalEmissiveRadiance += fAccent * vAccent * (0.35 + uEmissive * 0.6);
`;
function createFacadeMaterial() {
    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: "#ffffff",
        roughness: 0.82,
        metalness: 0,
        envMapIntensity: 0.85
    });
    material.onBeforeCompile = (shader)=>{
        shader.uniforms.uWindowLit = facadeUniforms.uWindowLit;
        shader.uniforms.uEmissive = facadeUniforms.uEmissive;
        shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>\n${VERTEX_DECL}`).replace("#include <begin_vertex>", `#include <begin_vertex>\n${VERTEX_BODY}`);
        shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>\n${FRAGMENT_DECL}`).replace("#include <color_fragment>", `#include <color_fragment>\n${FRAGMENT_COLOR}`).replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.07, fWin);`).replace("#include <metalnessmap_fragment>", `#include <metalnessmap_fragment>\nmetalnessFactor = mix(metalnessFactor, 0.92, fWin * (1.0 - fLit * 0.6));`).replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>\n${FRAGMENT_EMISSIVE}`);
    };
    material.customProgramCacheKey = ()=>"facade-v3";
    return material;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/geometry/ground.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildBridges",
    ()=>buildBridges,
    "buildGround",
    ()=>buildGround,
    "buildMarkings",
    ()=>buildMarkings,
    "buildRoundaboutRings",
    ()=>buildRoundaboutRings,
    "markingsToMesh",
    ()=>markingsToMesh
]);
/**
 * Ground geometry built from the layout: pavement slabs, the road surface,
 * retaining walls, bridges and painted road markings.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
;
;
;
function roundedRect(r, radius) {
    const pts = [];
    if (radius <= 0) {
        return [
            [
                r.x0,
                r.z0
            ],
            [
                r.x1,
                r.z0
            ],
            [
                r.x1,
                r.z1
            ],
            [
                r.x0,
                r.z1
            ]
        ];
    }
    const corners = [
        [
            r.x1 - radius,
            r.z0 + radius,
            -Math.PI / 2
        ],
        [
            r.x1 - radius,
            r.z1 - radius,
            0
        ],
        [
            r.x0 + radius,
            r.z1 - radius,
            Math.PI / 2
        ],
        [
            r.x0 + radius,
            r.z0 + radius,
            Math.PI
        ]
    ];
    for (const [cx, cz, start] of corners){
        for(let i = 0; i <= 5; i++){
            const a = start + i / 5 * (Math.PI / 2);
            pts.push([
                cx + Math.cos(a) * radius,
                cz + Math.sin(a) * radius
            ]);
        }
    }
    return pts;
}
/** Removes the part of a polygon inside a circle and closes it with an arc. */ function carveCircle(polygon, cx, cz, radius) {
    // Densify so that the entry and exit points are found accurately.
    const dense = [];
    for(let i = 0; i < polygon.length; i++){
        const a = polygon[i];
        const b = polygon[(i + 1) % polygon.length];
        const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2));
        for(let s = 0; s < steps; s++)dense.push([
            a[0] + (b[0] - a[0]) * s / steps,
            a[1] + (b[1] - a[1]) * s / steps
        ]);
    }
    const inside = dense.map(([x, z])=>Math.hypot(x - cx, z - cz) < radius);
    if (!inside.some(Boolean)) return polygon;
    const n = dense.length;
    let start = -1;
    for(let i = 0; i < n; i++){
        if (inside[i] && !inside[(i - 1 + n) % n]) {
            start = i;
            break;
        }
    }
    if (start < 0) return polygon;
    let end = start;
    while(inside[(end + 1) % n])end = (end + 1) % n;
    const cross = (out, inn)=>{
        let lo = 0;
        let hi = 1;
        for(let k = 0; k < 24; k++){
            const mid = (lo + hi) / 2;
            const x = out[0] + (inn[0] - out[0]) * mid;
            const z = out[1] + (inn[1] - out[1]) * mid;
            if (Math.hypot(x - cx, z - cz) < radius) hi = mid;
            else lo = mid;
        }
        return [
            out[0] + (inn[0] - out[0]) * lo,
            out[1] + (inn[1] - out[1]) * lo
        ];
    };
    const entry = cross(dense[(start - 1 + n) % n], dense[start]);
    const exit = cross(dense[(end + 1) % n], dense[end]);
    const a0 = Math.atan2(entry[1] - cz, entry[0] - cx);
    let delta = Math.atan2(exit[1] - cz, exit[0] - cx) - a0;
    while(delta > Math.PI)delta -= Math.PI * 2;
    while(delta < -Math.PI)delta += Math.PI * 2;
    const out = [];
    for(let i = (end + 1) % n; i !== start; i = (i + 1) % n)out.push(dense[i]);
    const arcSteps = Math.max(4, Math.ceil(Math.abs(delta) * radius / 3));
    for(let s = 0; s <= arcSteps; s++){
        const a = a0 + delta * s / arcSteps;
        out.push([
            cx + Math.cos(a) * radius,
            cz + Math.sin(a) * radius
        ]);
    }
    return out;
}
function slab(points, height) {
    // Shape lives in XY; rotating by -90° about X maps shape Y to world -Z.
    const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"](points.map(([x, z])=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](x, -z)));
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtrudeGeometry"](shape, {
        depth: height,
        bevelEnabled: false,
        curveSegments: 1
    });
    g.rotateX(-Math.PI / 2);
    return g;
}
function blockOutline(block) {
    const base = roundedRect(block.rect, block.cornerRadius);
    return carveCircle(base, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rOuter);
}
/** Merges geometries after normalising them to non-indexed position/normal/uv. */ function merged(list) {
    const normalised = list.map((source)=>{
        const g = source.index ? source.toNonIndexed() : source;
        if (g !== source) source.dispose();
        if (!g.getAttribute("normal")) g.computeVertexNormals();
        if (!g.getAttribute("uv")) {
            g.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(g.getAttribute("position").count * 2), 2));
        }
        for (const name of Object.keys(g.attributes)){
            if (name !== "position" && name !== "normal" && name !== "uv") g.deleteAttribute(name);
        }
        g.clearGroups();
        return g;
    });
    const out = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeGeometries"])(normalised, false) ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    normalised.forEach((x)=>x.dispose());
    return out;
}
function box(x0, x1, y0, y1, z0, z1) {
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](x1 - x0, y1 - y0, z1 - z0);
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    return g;
}
function buildGround() {
    const pavement = [];
    const plaza = [];
    const harbor = [];
    for (const block of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKS"]){
        const g = slab(blockOutline(block), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"]);
        if (block.kind === "quay") plaza.push(g);
        else if (block.kind === "harbor") harbor.push(g);
        else pavement.push(g);
    }
    const island = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rInner, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rInner, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"], 64);
    island.translate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"] / 2, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z);
    // Give the island top the same world-space UVs as the extruded slabs.
    const uv = island.getAttribute("uv");
    const pos = island.getAttribute("position");
    for(let i = 0; i < uv.count; i++)uv.setXY(i, pos.getX(i), -pos.getZ(i));
    plaza.push(island);
    const roadPlane = (z0, z1)=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0, z1 - z0);
        g.rotateX(-Math.PI / 2);
        g.translate((__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1) / 2, 0, (z0 + z1) / 2);
        const u = g.getAttribute("uv");
        const p = g.getAttribute("position");
        for(let i = 0; i < u.count; i++)u.setXY(i, p.getX(i) / 12, p.getZ(i) / 12);
        return g;
    };
    const road = merged([
        roadPlane(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0),
        roadPlane(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1)
    ]);
    // Retaining walls: the island edge and both channel banks, with a low parapet.
    const walls = [];
    const depth = -4;
    const parapet = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"] + 0.85;
    const t = 0.7;
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - t, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + t, depth, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - t, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0));
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - t, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + t, depth, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1 + t));
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - t, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0, depth, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0));
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - t, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0, depth, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1));
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + t, depth, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0));
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + t, depth, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z1));
    // Channel banks below deck level run the full width; the parapet stops at bridges.
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1, depth, 0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0 - 0.1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0 + t));
    walls.push(box(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1, depth, 0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 - t, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 + 0.1));
    let start = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0;
    const spans = [];
    for (const b of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGES"]){
        spans.push([
            start,
            b.x - b.halfWidth - 1.2
        ]);
        start = b.x + b.halfWidth + 1.2;
    }
    spans.push([
        start,
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1
    ]);
    for (const [x0, x1] of spans){
        walls.push(box(x0, x1, 0, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0 - 0.1, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z0 + 0.5));
        walls.push(box(x0, x1, 0, parapet, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 - 0.5, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHANNEL"].z1 + 0.1));
    }
    return {
        pavement: merged(pavement),
        plaza: merged(plaza),
        harbor: merged(harbor),
        road,
        walls: merged(walls)
    };
}
function buildBridges() {
    const decks = [];
    const structure = [];
    const cablePoints = [];
    const segs = 48;
    for (const b of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGES"]){
        const half = b.halfWidth + 1.3;
        const length = b.z1 - b.z0;
        // Deck top.
        const deck = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](half * 2, length, 1, segs);
        deck.rotateX(-Math.PI / 2);
        deck.translate(b.x, 0, (b.z0 + b.z1) / 2);
        const p = deck.getAttribute("position");
        const u = deck.getAttribute("uv");
        for(let i = 0; i < p.count; i++){
            p.setY(i, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, p.getZ(i)) + 0.001);
            u.setXY(i, p.getX(i) / 12, p.getZ(i) / 12);
        }
        deck.computeVertexNormals();
        decks.push(deck);
        // Girder below the deck and parapets along both edges, following the arch.
        const strip = (xa, xb, below, above)=>{
            const pos = [];
            const idx = [];
            for(let i = 0; i <= segs; i++){
                const z = b.z0 + length * i / segs;
                const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z);
                // Four corners of the cross-section at this station.
                pos.push(xa, y + below, z, xb, y + below, z, xb, y + above, z, xa, y + above, z);
            }
            for(let i = 0; i < segs; i++){
                const o = i * 4;
                const n = o + 4;
                for (const [a, c] of [
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        0
                    ]
                ]){
                    idx.push(o + a, n + a, o + c, o + c, n + a, n + c);
                }
            }
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](pos, 3));
            g.setIndex(idx);
            const flat = g.toNonIndexed();
            g.dispose();
            flat.computeVertexNormals();
            flat.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(flat.getAttribute("position").count * 2), 2));
            return flat;
        };
        structure.push(strip(b.x - half, b.x + half, -1.1, -0.02));
        structure.push(strip(b.x - half, b.x - half + 0.35, 0, 1.0));
        structure.push(strip(b.x + half - 0.35, b.x + half, 0, 1.0));
        // Piers in the water.
        for (const f of [
            0.3,
            0.7
        ]){
            const z = b.z0 + length * f;
            const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z);
            structure.push(box(b.x - half + 1, b.x + half - 1, -4, y - 1, z - 1.6, z + 1.6));
        }
        // The boulevard bridge is a suspension bridge; the others carry simple arches.
        const main = b.halfWidth > 10;
        const towerH = main ? 30 : 0;
        for (const side of [
            -1,
            1
        ]){
            const x = b.x + side * (half + 0.5);
            if (main) {
                const zA = b.z0 + length * 0.3;
                const zB = b.z0 + length * 0.7;
                for (const z of [
                    zA,
                    zB
                ]){
                    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z);
                    structure.push(box(x - 0.9, x + 0.9, -4, base + towerH, z - 1.2, z + 1.2));
                }
                const top = (z)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z) + towerH - 0.5;
                const sag = (z0, y0, z1, y1, drop)=>{
                    const n = 16;
                    for(let i = 0; i < n; i++){
                        const t0 = i / n;
                        const t1 = (i + 1) / n;
                        const y = (tt)=>y0 + (y1 - y0) * tt - drop * 4 * tt * (1 - tt);
                        cablePoints.push(x, y(t0), z0 + (z1 - z0) * t0, x, y(t1), z0 + (z1 - z0) * t1);
                        if (i > 0) {
                            const zz = z0 + (z1 - z0) * t0;
                            cablePoints.push(x, y(t0), zz, x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, zz) + 1, zz);
                        }
                    }
                };
                sag(b.z0 + 1, 1.2, zA, top(zA), 2);
                sag(zA, top(zA), zB, top(zB), towerH * 0.62);
                sag(zB, top(zB), b.z1 - 1, 1.2, 2);
            } else {
                // A tied arch on each side.
                const n = 24;
                const rise = 11;
                const pos = [];
                const idx = [];
                for(let i = 0; i <= n; i++){
                    const tt = i / n;
                    const z = b.z0 + 6 + (length - 12) * tt;
                    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z) + 0.6 + rise * 4 * tt * (1 - tt);
                    pos.push(x - 0.3, y - 0.35, z, x + 0.3, y - 0.35, z, x + 0.3, y + 0.35, z, x - 0.3, y + 0.35, z);
                    if (i > 0 && i < n && i % 2 === 0) cablePoints.push(x, y, z, x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z) + 1, z);
                }
                for(let i = 0; i < n; i++){
                    const o = i * 4;
                    const m = o + 4;
                    for (const [a, c] of [
                        [
                            0,
                            1
                        ],
                        [
                            1,
                            2
                        ],
                        [
                            2,
                            3
                        ],
                        [
                            3,
                            0
                        ]
                    ]){
                        idx.push(o + a, m + a, o + c, o + c, m + a, m + c);
                    }
                }
                const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
                g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](pos, 3));
                g.setIndex(idx);
                const flat = g.toNonIndexed();
                g.dispose();
                flat.computeVertexNormals();
                flat.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(flat.getAttribute("position").count * 2), 2));
                structure.push(flat);
            }
        }
        if (main) {
            // Cross beams tying each pair of towers together.
            for (const f of [
                0.3,
                0.7
            ]){
                const z = b.z0 + length * f;
                const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(b, z) + towerH;
                structure.push(box(b.x - half - 1.4, b.x + half + 1.4, y - 2.2, y - 0.6, z - 0.9, z + 0.9));
                structure.push(box(b.x - half - 1.4, b.x + half + 1.4, y - 12, y - 11, z - 0.7, z + 0.7));
            }
        }
    }
    const cables = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    cables.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](cablePoints, 3));
    return {
        deck: merged(decks),
        structure: merged(structure),
        cables
    };
}
const WHITE = 0xe9edf2;
const YELLOW = 0xf0c04a;
function buildMarkings() {
    const out = [];
    const y = 0.02;
    const inRing = (x, z, margin)=>Math.hypot(x - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x, z - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z) < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rOuter + margin;
    for (const line of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROAD_LINES"]){
        const isX = line.axis === "x";
        const rot = isX ? 0 : Math.PI / 2;
        const bridge = line.kind === "bridge" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGES"].find((b)=>b.id === line.id) : undefined;
        const crossings = (isX ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROADS_Z"].map((r)=>({
                at: r.z,
                hw: r.hw
            })) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROADS_X"].map((r)=>({
                at: r.x,
                hw: r.hw
            }))).filter((c)=>c.at >= line.from - 1 && c.at <= line.to + 1);
        // Clear stretches between junction boxes.
        const gaps = [];
        let cursor = line.from;
        for (const c of crossings){
            const a = c.at - c.hw - 6.5;
            const b = c.at + c.hw + 6.5;
            if (a > cursor) gaps.push([
                cursor,
                a
            ]);
            cursor = Math.max(cursor, b);
        }
        if (cursor < line.to) gaps.push([
            cursor,
            line.to
        ]);
        const place = (along, offset, width, length, color)=>{
            const x = isX ? line.at + offset : along;
            const z = isX ? along : line.at + offset;
            if (inRing(x, z, 5)) return;
            let py = y;
            let pitch = 0;
            if (bridge) {
                py = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(bridge, z) + y;
                pitch = Math.atan2((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(bridge, z + 0.5) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeHeight"])(bridge, z - 0.5), 1);
            }
            out.push({
                x,
                y: py,
                z,
                width,
                length,
                rot,
                pitch,
                color
            });
        };
        for (const [a, b] of gaps){
            const len = b - a;
            if (len < 4) continue;
            const pieces = bridge ? Math.ceil(len / 4) : 1;
            for(let k = 0; k < pieces; k++){
                const mid = a + len * (k + 0.5) / pieces;
                const l = len / pieces;
                // Double yellow centre line and solid white edge lines.
                place(mid, -0.22, 0.16, l, YELLOW);
                place(mid, 0.22, 0.16, l, YELLOW);
                place(mid, -(line.halfWidth - 0.45), 0.14, l, WHITE);
                place(mid, line.halfWidth - 0.45, 0.14, l, WHITE);
            }
            // Lane dashes.
            for(let s = a + 3; s < b - 3; s += 9){
                place(s + 1.5, -line.halfWidth / 2, 0.14, 3, WHITE);
                place(s + 1.5, line.halfWidth / 2, 0.14, 3, WHITE);
            }
            // Zebra crossings and stop lines at each end that meets a junction.
            for (const end of [
                a,
                b
            ]){
                const atJunction = crossings.some((c)=>Math.abs(Math.abs(end - c.at) - c.hw - 6.5) < 0.01);
                if (!atJunction) continue;
                const dir = end === a ? -1 : 1;
                const zebraAt = end + dir * 3.2;
                for(let o = -line.halfWidth + 1; o <= line.halfWidth - 1; o += 1.1)place(zebraAt, o, 0.55, 3.4, WHITE);
                // Left-hand traffic: the approaching lane is on the left of its direction of travel.
                const laneSide = isX ? dir : -dir;
                place(end - dir * 0.6, laneSide * line.halfWidth / 2, line.halfWidth - 0.9, 0.4, WHITE);
            }
        }
    }
    // Roundabout: dashed lane divider on the mid radius.
    const dashes = 44;
    for(let i = 0; i < dashes; i++){
        const a = i / dashes * Math.PI * 2;
        out.push({
            x: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x + Math.cos(a) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rMid,
            y,
            z: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z + Math.sin(a) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rMid,
            width: 0.16,
            length: 3.6,
            rot: -a,
            pitch: 0,
            color: WHITE
        });
    }
    return out;
}
function buildRoundaboutRings() {
    const rings = [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rInner + 0.7,
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].rOuter - 0.7
    ].map((r)=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RingGeometry"](r, r + 0.16, 96, 1);
        g.rotateX(-Math.PI / 2);
        g.translate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].x, 0.02, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUNDABOUT"].z);
        return g;
    });
    return merged(rings);
}
function markingsToMesh(markings, material) {
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1, 1);
    geometry.rotateX(-Math.PI / 2);
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](geometry, material, markings.length);
    const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    const e = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0, 0, 0, "YXZ");
    const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const s = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
    markings.forEach((mk, i)=>{
        e.set(-mk.pitch, mk.rot, 0);
        q.setFromEuler(e);
        p.set(mk.x, mk.y, mk.z);
        s.set(mk.width, 1, mk.length);
        m.compose(p, q, s);
        mesh.setMatrixAt(i, m);
        mesh.setColorAt(i, c.setHex(mk.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.frustumCulled = false;
    return mesh;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/geometry/landmarks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildLandmarks",
    ()=>buildLandmarks
]);
/**
 * Landmark buildings. Each portfolio destination gets a distinct silhouette so
 * it can be recognised from a distance. Footprints match lib/world/footprints.ts,
 * which is what the physics collides with.
 *
 * Local space for every landmark: origin on the pavement at the destination
 * position, +Z towards its access road (the "front").
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$footprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/footprints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/three/merge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/world/textures.ts [app-client] (ecmascript)");
;
;
;
;
;
const GLASS_BLUE = [
    0.3,
    0.44,
    0.6
];
const GLASS_DEEP = [
    0.16,
    0.22,
    0.32
];
const GLASS_PALE = [
    0.5,
    0.6,
    0.7
];
const STONE = [
    0.7,
    0.64,
    0.56
];
const WHITE = [
    0.82,
    0.84,
    0.86
];
function rgb(hex) {
    const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](hex);
    return [
        c.r,
        c.g,
        c.b
    ];
}
function palette() {
    const std = (p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"](p);
    const grid = (seed, base)=>{
        const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeGlassGridTexture"])(seed, base, "#ffd9a0");
        return std({
            color: "#ffffff",
            map,
            emissive: "#ffffff",
            emissiveMap: map,
            emissiveIntensity: 0.55,
            metalness: 0.75,
            roughness: 0.16,
            envMapIntensity: 1.2
        });
    };
    return {
        gridDark: grid(11, "#12233a"),
        gridBlue: grid(29, "#1d4168"),
        glassDark: std({
            color: "#3a5676",
            metalness: 0.85,
            roughness: 0.1,
            envMapIntensity: 1.3
        }),
        glassBlue: std({
            color: "#5d86ad",
            metalness: 0.9,
            roughness: 0.1,
            envMapIntensity: 1.3
        }),
        glassClear: std({
            color: "#9cc4e4",
            metalness: 0.6,
            roughness: 0.08,
            transparent: true,
            opacity: 0.42,
            envMapIntensity: 1.5
        }),
        white: std({
            color: "#e8ecef",
            roughness: 0.55
        }),
        concrete: std({
            color: "#b9b3a8",
            roughness: 0.88
        }),
        stone: std({
            color: "#c9bfae",
            roughness: 0.9
        }),
        steel: std({
            color: "#8d949c",
            metalness: 0.85,
            roughness: 0.32
        }),
        dark: std({
            color: "#1a1d23",
            roughness: 0.6,
            metalness: 0.4
        }),
        grass: std({
            color: "#3f7a45",
            roughness: 1
        }),
        water: std({
            color: "#2b6f8f",
            roughness: 0.05,
            metalness: 0.7
        }),
        warm: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#ffd39a").multiplyScalar(1.5),
            toneMapped: false
        }),
        red: std({
            color: "#b3261e",
            roughness: 0.6
        })
    };
}
class Builder {
    dest;
    ctx;
    p;
    group;
    merger;
    spinners;
    facades;
    accents;
    constructor(dest, ctx, p){
        this.dest = dest;
        this.ctx = ctx;
        this.p = p;
        this.group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        this.merger = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Merger"]();
        this.spinners = [];
        this.facades = [];
        this.accents = new Map();
    }
    /** Bright unlit material for neon strips; picked up by the bloom pass. */ accent(color = this.dest.color, intensity = 1.7) {
        const key = `${color}:${intensity}`;
        let m = this.accents.get(key);
        if (!m) {
            m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](color).multiplyScalar(intensity),
                toneMapped: false
            });
            this.accents.set(key, m);
        }
        return m;
    }
    box(material, w, h, d, x, y, z, rotY = 0) {
        this.merger.box(material, w, h, d, x, y, z, rotY);
    }
    cyl(material, rTop, rBottom, h, x, y, z, sides = 24) {
        this.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](rTop, rBottom, h, sides), material, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            y + h / 2,
            z
        ]));
    }
    /** A round tower clad in the tiling glass-grid texture. */ gridCyl(material, rTop, rBottom, h, x, y, z, sides = 24) {
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](rTop, rBottom, h, sides, 1, true);
        const uv = g.getAttribute("uv");
        const around = Math.max(1, Math.round(Math.PI * (rTop + rBottom) / 34));
        const up = Math.max(1, Math.round(h / 58));
        for(let i = 0; i < uv.count; i++)uv.setXY(i, uv.getX(i) * around, uv.getY(i) * up);
        this.merger.add(g, material, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            y + h / 2,
            z
        ]));
    }
    /**
   * A box volume with procedural windows. It is drawn by the instanced facade
   * shader together with the rest of the skyline, so it is added in world space.
   */ facade(style, w, h, d, x, y, z, tint, options = {}) {
        const [wx, wz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$footprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localToWorld"])(this.dest.position, this.dest.rotation, x, z);
        const turned = Math.abs(Math.sin(this.dest.rotation)) > 0.5;
        this.facades.push({
            x: wx,
            z: wz,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"] + y,
            w: turned ? d : w,
            d: turned ? w : d,
            h,
            style,
            seed: 1 + (this.facades.length * 37 + Math.round(Math.abs(wx) + Math.abs(wz))) % 997,
            tint,
            accent: options.accent ? rgb(this.dest.color) : [
                0,
                0,
                0
            ],
            lit: options.lit ?? 0.5
        });
    }
    sign(title, subtitle, w, h, x, y, z, rotY = 0, color = this.dest.color) {
        const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeLabelTexture"])(this.ctx.fontFamily, title, subtitle, color, {
            width: 1024,
            height: Math.max(128, Math.round(1024 * h / w / 32) * 32),
            background: "rgba(6,9,16,0.86)"
        });
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](w, h), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: texture,
            transparent: true,
            toneMapped: false
        }));
        mesh.position.set(x, y, z);
        mesh.rotation.y = rotY;
        this.group.add(mesh);
    }
    screen(variant, w, h, x, y, z, rotY = 0) {
        const map = this.ctx.billboards[variant % this.ctx.billboards.length];
        const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map,
            toneMapped: false
        });
        material.color.multiplyScalar(1.25);
        material.userData.sharedMap = true;
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](w, h), material);
        mesh.position.set(x, y, z);
        mesh.rotation.y = rotY;
        this.group.add(mesh);
    }
    spinner(object, speed, bob = 0) {
        this.group.add(object);
        this.spinners.push({
            object,
            speed,
            bob,
            baseY: object.position.y
        });
    }
    finish() {
        this.merger.build(this.group, {
            castShadow: true,
            receiveShadow: true
        });
        this.group.position.set(this.dest.position[0], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURB"], this.dest.position[1]);
        this.group.rotation.y = this.dest.rotation;
        this.group.name = `landmark-${this.dest.id}`;
        return {
            group: this.group,
            spinners: this.spinners,
            facades: this.facades
        };
    }
}
function centralTower(b) {
    const { p } = b;
    const cyan = b.accent("#7cc4ff", 1.8);
    const violet = b.accent("#b79bff", 1.8);
    // Stepped plaza and podium.
    b.cyl(p.concrete, 30, 31, 0.6, 0, 0, 0, 48);
    b.gridCyl(p.gridBlue, 21, 23, 11, 0, 0.6, 0, 32);
    b.cyl(p.white, 24.5, 24.5, 0.7, 0, 11.6, 0, 48);
    b.cyl(cyan, 24.7, 24.7, 0.18, 0, 11.3, 0, 48);
    // Shaft: three tapering tiers.
    b.gridCyl(p.gridBlue, 13.5, 16.5, 78, 0, 12.3, 0, 8);
    b.gridCyl(p.gridDark, 11, 13, 64, 0, 90.3, 0, 8);
    b.gridCyl(p.gridBlue, 7.5, 10.5, 48, 0, 154.3, 0, 8);
    b.cyl(p.white, 14.2, 14.2, 1.2, 0, 89.4, 0, 8);
    b.cyl(p.white, 11.6, 11.6, 1.2, 0, 153.4, 0, 8);
    // Crown and spire.
    b.cyl(p.steel, 3, 7.5, 16, 0, 202.3, 0, 8);
    b.cyl(p.steel, 0.25, 1.1, 46, 0, 218.3, 0, 8);
    b.cyl(b.accent("#ff7ad9", 2.2), 0.7, 0.7, 1.4, 0, 264, 0, 8);
    // Vertical light fins up the four faces.
    for(let i = 0; i < 4; i++){
        const a = i / 4 * Math.PI * 2 + Math.PI / 4;
        const fin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.5, 188, 0.9);
        const tilt = Math.atan2(16.2 - 7.8, 188);
        const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationY(-a).multiply((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            12.4,
            12.3 + 94,
            0
        ], [
            0,
            0,
            tilt
        ]));
        b.merger.add(fin, i % 2 === 0 ? cyan : violet, m);
    }
    // Halo rings.
    for (const [y, r, mat] of [
        [
            70,
            19,
            cyan
        ],
        [
            140,
            15.5,
            violet
        ]
    ]){
        const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](r, 0.32, 8, 72), mat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;
        b.spinner(ring, 0);
    }
    // Name signs on all four sides, readable from every approach.
    for(let i = 0; i < 4; i++){
        const a = i / 4 * Math.PI * 2;
        const x = Math.sin(a) * 23.6;
        const z = Math.cos(a) * 23.6;
        b.sign(b.ctx.ownerName, b.ctx.disciplines.join("  ·  "), 30, 7.5, x, 6.6, z, a, "#7cc4ff");
    }
}
function gatewayPavilion(b) {
    const { p, dest } = b;
    const acc = b.accent();
    b.box(p.concrete, 44, 0.5, 40, 0, 0, 2);
    b.facade(5, 34, 11, 26, 0, 0.5, -6, GLASS_PALE, {
        lit: 0.8
    });
    b.box(p.white, 40, 0.9, 34, 0, 11.5, -4);
    b.box(acc, 40.2, 0.2, 34.2, 0, 11.2, -4);
    for (const x of [
        -17,
        17
    ])b.box(p.white, 1, 11, 1, x, 0.5, 9);
    // Tall pylon carrying the name.
    b.box(p.dark, 5, 26, 1.4, -19, 0.5, 14);
    b.box(acc, 0.3, 26, 1.5, -21.6, 0.5, 14);
    b.sign(dest.name, dest.category, 16, 4, 0, 8.2, 7.2);
    b.sign(dest.category, "", 12, 2.6, -19, 22, 14.75, 0);
    const holo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](dest.variant === 1 ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](2.4) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](2.3, 0), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](dest.color).multiplyScalar(1.4),
        wireframe: true,
        toneMapped: false
    }));
    holo.position.set(0, 17, -4);
    b.spinner(holo, 0.5, 0.5);
}
function corporateTwin(b) {
    const { p, dest } = b;
    const acc = b.accent();
    b.box(p.concrete, 112, 0.5, 78, 0, 0, -2);
    b.facade(5, 100, 9, 36, 0, 0.5, -8, GLASS_DEEP, {
        lit: 0.9
    });
    b.box(p.white, 104, 0.8, 40, 0, 9.5, -8);
    for (const [x, h] of [
        [
            -30,
            148
        ],
        [
            30,
            126
        ]
    ]){
        b.facade(0, 28, h, 28, x, 10.3, -8, x < 0 ? GLASS_BLUE : GLASS_DEEP, {
            lit: 0.6
        });
        b.box(p.white, 30, 1.5, 30, x, 10.3 + h, -8);
        b.box(p.glassDark, 18, 12, 18, x, 11.8 + h, -8);
        for (const fx of [
            -14.3,
            14.3
        ])b.box(p.white, 0.6, h, 1.2, x + fx, 10.3, 6.2);
        b.box(acc, 28.4, 0.5, 28.4, x, 10.3 + h - 4, -8);
        b.cyl(p.steel, 0.2, 0.5, 22, x, 23.8 + h, -8, 6);
    }
    // Skybridge between the towers.
    b.box(p.glassBlue, 32, 6, 9, 0, 72, -8);
    b.box(acc, 32, 0.3, 9.2, 0, 71.6, -8);
    b.sign(dest.name, dest.category, 34, 7, 0, 5.4, 10.2);
}
function officeTower(b) {
    const { p, dest } = b;
    const v = dest.variant ?? 0;
    const h = 58 + v * 16;
    const acc = b.accent();
    b.box(p.concrete, 40, 0.4, 40, 0, 0, 0);
    b.facade(5, 28, 8, 28, 0, 0.4, -4, GLASS_DEEP, {
        lit: 0.9
    });
    b.facade([
        0,
        3,
        1
    ][v % 3], 24, h, 24, 0, 8.4, -4, v % 2 === 0 ? GLASS_BLUE : GLASS_DEEP, {
        lit: 0.6
    });
    for(let y = 16; y < h; y += 12)b.box(p.white, 24.6, 0.5, 24.6, 0, 8.4 + y, -4);
    b.box(p.white, 26, 1.2, 26, 0, 8.4 + h, -4);
    b.box(acc, 0.4, h, 0.4, 12.2, 8.4, 8.2);
    b.box(acc, 0.4, h, 0.4, -12.2, 8.4, 8.2);
    b.sign(dest.name, dest.category, 24, 5, 0, 5, 10.2);
    b.sign(dest.name, "", 20, 3.6, 0, 8.4 + h - 5, 8.2);
}
function university(b) {
    const { p, dest } = b;
    b.box(p.grass, 60, 0.12, 34, 0, 0, 14);
    b.box(p.concrete, 8, 0.16, 40, 0, 0, 16);
    // Main hall with a colonnade and pediment.
    b.facade(2, 80, 18, 28, 0, 0, -24, STONE, {
        lit: 0.55
    });
    b.box(p.white, 84, 1.4, 32, 0, 18, -24);
    for(let i = 0; i < 10; i++)b.cyl(p.white, 1, 1.15, 15, -31.5 + i * 7, 1.5, -8.2, 12);
    b.box(p.stone, 70, 1.5, 6, 0, 0, -8.6);
    b.box(p.white, 70, 1.6, 6, 0, 16.5, -8.6);
    const gable = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]([
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](-36, 0),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](36, 0),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0, 7)
    ]);
    b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtrudeGeometry"](gable, {
        depth: 6,
        bevelEnabled: false
    }), p.stone, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        18.1,
        -11.6
    ]));
    // Dome.
    b.cyl(p.white, 11.5, 11.5, 5, 0, 19.4, -24, 24);
    b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](11, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), p.glassBlue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        24.4,
        -24
    ]));
    b.cyl(b.accent("#ffe2a8", 1.6), 1.2, 1.2, 3, 0, 35.2, -24, 10);
    // Wings and clock tower.
    for (const x of [
        -48,
        48
    ]){
        b.facade(2, 20, 14, 44, x, 0, 4, STONE, {
            lit: 0.5
        });
        b.box(p.white, 22, 1, 46, x, 14, 4);
    }
    b.box(p.stone, 9, 44, 9, -48, 0, -24);
    b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](7.2, 12, 4), p.dark, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        -48,
        50,
        -24
    ], [
        0,
        Math.PI / 4,
        0
    ]));
    for (const rot of [
        0,
        Math.PI / 2,
        Math.PI,
        -Math.PI / 2
    ]){
        const face = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](3, 24);
        b.merger.add(face, b.accent("#fff1cf", 1.3), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            -48 + Math.sin(rot) * 4.56,
            36,
            -24 + Math.cos(rot) * 4.56
        ], [
            0,
            rot,
            0
        ]));
    }
    b.sign(dest.name, dest.category, 30, 6, 0, 12.4, -5.4);
}
function library(b) {
    const { p, dest } = b;
    b.box(p.concrete, 60, 0.4, 46, 0, 0, 0);
    b.facade(1, 44, 15, 28, 0, 0.4, -6, STONE, {
        lit: 0.6
    });
    b.box(p.white, 47, 1.2, 31, 0, 15.4, -6);
    b.box(p.glassBlue, 30, 5, 16, 0, 16.6, -6);
    // Tall lit window bays, like book spines.
    for(let i = 0; i < 9; i++)b.box(i % 3 === 1 ? b.accent("#ffd39a", 1.25) : p.glassDark, 2.6, 10.5, 0.3, -17.6 + i * 4.4, 3, 8.1);
    b.sign(dest.name, dest.category, 26, 5.2, 0, 19, 2.2);
}
function researchLab(b) {
    const { p, dest } = b;
    const acc = b.accent();
    b.box(p.concrete, 122, 0.4, 84, 0, 0, 0);
    // Geodesic dome with a glowing core.
    const dome = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](22, 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: "#8fd3ff",
        metalness: 0.7,
        roughness: 0.1,
        transparent: true,
        opacity: 0.5,
        flatShading: true,
        envMapIntensity: 1.6
    }));
    dome.position.set(-30, 0, -4);
    b.group.add(dome);
    const frame = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegments"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WireframeGeometry"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](22.1, 2)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
        color: "#e9f6ff",
        transparent: true,
        opacity: 0.5
    }));
    frame.position.copy(dome.position);
    b.group.add(frame);
    const core = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](5.5, 1), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](dest.color).multiplyScalar(1.5),
        wireframe: true,
        toneMapped: false
    }));
    core.position.set(-30, 9, -4);
    b.spinner(core, 0.35, 0.8);
    b.cyl(p.dark, 24, 24.5, 1.2, -30, 0.4, -4, 40);
    // Research tower with a dish and a ring gantry.
    b.facade(3, 26, 66, 26, 32, 0.4, -10, GLASS_BLUE, {
        accent: true,
        lit: 0.55
    });
    b.box(p.white, 28, 1.2, 28, 32, 66.4, -10);
    b.box(p.glassBlue, 16, 14, 16, 32, 67.6, -10);
    b.cyl(p.steel, 0.2, 0.6, 26, 32, 81.6, -10, 6);
    b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](4.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), p.white, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        40,
        70.5,
        -4
    ], [
        Math.PI * 0.82,
        0.5,
        0
    ]));
    // Covered walkway joining the two.
    b.box(p.glassClear, 30, 4, 5, 2, 5, -6);
    b.box(p.white, 30, 0.4, 5.4, 2, 9, -6);
    // Low data hall.
    b.facade(4, 30, 7, 14, 32, 0.4, 24, GLASS_DEEP, {
        accent: true,
        lit: 0.3
    });
    for(let i = 0; i < 6; i++)b.box(acc, 0.3, 5, 0.2, 20 + i * 4.8, 1.4, 31.1);
    b.sign(dest.name, dest.category, 28, 5.6, -30, 5, 20.2);
}
function projectPod(b) {
    const { p, dest } = b;
    const v = dest.variant ?? 0;
    const h = 9 + v % 3 * 3;
    const acc = b.accent();
    b.box(p.concrete, 34, 0.3, 34, 0, 0, 0);
    b.facade(v % 2 === 0 ? 0 : 4, 22, h, 22, 0, 0.3, -4, v % 2 === 0 ? GLASS_DEEP : WHITE, {
        lit: 0.7
    });
    b.box(p.dark, 24, 0.8, 24, 0, 0.3 + h, -4);
    b.box(acc, 24.2, 0.25, 24.2, 0, h - 0.2, -4);
    b.box(p.glassBlue, 12, h * 0.55, 0.4, 0, 0.3, 7.1);
    const shapes = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](4, 4, 4),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](3),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](2.6, 0.5, 8, 24),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TetrahedronGeometry"](3.4),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DodecahedronGeometry"](2.8)
    ];
    const holo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](shapes[v % shapes.length], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](dest.color).multiplyScalar(1.5),
        wireframe: true,
        toneMapped: false
    }));
    holo.position.set(0, h + 7, -4);
    b.spinner(holo, 0.6, 0.6);
    b.cyl(acc, 0.12, 0.12, 4.5, 0, h + 1, -4, 6);
    b.sign(dest.name, dest.category, 20, 4.2, 0, h * 0.5 + 3.4, 7.4);
}
function creativeStudio(b) {
    const { p, dest } = b;
    const colors = [
        "#ff7ad9",
        "#b79bff",
        "#ffb86b",
        "#5ee6ff"
    ];
    b.box(p.concrete, 98, 0.4, 80, 0, 0, 0);
    // Twisting stack of studio floors.
    let y = 0.4;
    for(let i = 0; i < 5; i++){
        const size = 44 - i * 4;
        const h = 13;
        const rot = i * 0.21;
        b.box(i % 2 === 0 ? p.white : p.glassDark, size, h, size, 0, y, -8, rot);
        b.box(b.accent(colors[i % colors.length], 1.6), size + 0.5, 0.45, size + 0.5, 0, y + h - 0.6, -8, rot);
        y += h;
    }
    const knot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusKnotGeometry"](5, 1.1, 96, 12), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: dest.color,
        metalness: 0.9,
        roughness: 0.15,
        emissive: dest.color,
        emissiveIntensity: 0.35
    }));
    knot.position.set(0, y + 9, -8);
    b.spinner(knot, 0.3, 0.6);
    // Street-facing LED wall and freestanding colour frames.
    b.screen(2, 20, 30, -34, 17, 14.2);
    b.box(p.dark, 21, 31.5, 1, -34, 1.2, 13.4);
    for(let i = 0; i < 3; i++){
        const m = b.accent(colors[i], 1.5);
        const x = 22 + i * 9;
        b.box(m, 0.5, 9 + i * 2, 0.5, x - 3, 0.4, 24);
        b.box(m, 0.5, 9 + i * 2, 0.5, x + 3, 0.4, 24);
        b.box(m, 6.5, 0.5, 0.5, x, 9.4 + i * 2, 24);
    }
    b.sign(dest.name, dest.category, 30, 6, 0, 6, 14.6);
}
function galleryPavilion(b) {
    const { p, dest } = b;
    const v = dest.variant ?? 0;
    b.box(p.concrete, 34, 0.3, 34, 0, 0, 0);
    b.box(p.white, 24, 10, 20, 0, 0.3, -4);
    b.box(p.dark, 26, 0.6, 22, 0, 10.3, -4);
    b.box(b.accent(), 26.2, 0.2, 22.2, 0, 10.1, -4);
    b.screen(v + 3, 9, 7.2, -5.5, 5.4, 6.12);
    b.box(p.glassBlue, 7, 7.5, 0.3, 6.5, 0.3, 6.05);
    b.sign(dest.name, dest.category, 20, 4, 0, 13.4, 6.2);
}
function mediaTower(b) {
    const { p, dest } = b;
    const acc = b.accent();
    b.cyl(p.concrete, 40, 40, 0.4, 0, 0, -2, 48);
    b.gridCyl(p.gridDark, 19, 19, 12, 0, 0.4, -6, 36);
    b.cyl(p.white, 21, 21, 0.9, 0, 12.4, -6, 36);
    b.gridCyl(p.gridBlue, 12.5, 13.5, 92, 0, 13.3, -6, 28);
    // Wrap-around LED bands.
    for (const y of [
        34,
        58,
        82
    ]){
        b.cyl(acc, 14.2, 14.2, 2.2, 0, y, -6, 36);
        b.cyl(p.dark, 14, 14, 3.4, 0, y - 0.6, -6, 36);
    }
    b.cyl(p.white, 15.5, 12.5, 6, 0, 105.3, -6, 28);
    b.cyl(p.steel, 0.3, 1.2, 44, 0, 111.3, -6, 8);
    for (const [a, y] of [
        [
            0.4,
            122
        ],
        [
            2.5,
            128
        ],
        [
            4.4,
            134
        ]
    ]){
        b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](2.6, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), p.white, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            Math.cos(a) * 2.6,
            y,
            -6 + Math.sin(a) * 2.6
        ], [
            Math.PI / 2,
            0,
            a - Math.PI / 2
        ]));
    }
    b.cyl(b.accent("#ff5a5a", 2), 0.6, 0.6, 1.2, 0, 155.3, -6, 8);
    b.screen(1, 22, 14, 0, 22, 14.4);
    b.box(p.dark, 23.5, 15.5, 0.8, 0, 14.2, 13.8);
    for (const x of [
        -9,
        9
    ])b.box(p.steel, 0.8, 14, 0.8, x, 0.4, 13.6);
    b.sign(dest.name, dest.category, 24, 4.8, 0, 7.6, 14.6);
}
function kiosk(b) {
    const { p, dest } = b;
    const acc = b.accent();
    b.cyl(p.dark, 2.6, 2.8, 0.3, 0, 0, 0, 20);
    b.cyl(p.steel, 0.35, 0.5, 2.2, 0, 0.3, 0, 10);
    b.box(p.dark, 4.6, 3, 0.3, 0, 2.2, 0);
    b.cyl(acc, 2.7, 2.7, 0.08, 0, 0.32, 0, 24);
    b.sign(dest.name, dest.category, 4.3, 2.7, 0, 3.7, 0.17);
    b.sign(dest.name, dest.category, 4.3, 2.7, 0, 3.7, -0.17, Math.PI);
    b.box(p.white, 5.4, 0.2, 2.4, 0, 5.6, 0);
}
function contactPavilion(b) {
    const { p, dest } = b;
    const acc = b.accent();
    b.cyl(p.concrete, 48, 48, 0.3, 0, 0, 2, 56);
    // Fountain basin and the ring sculpture.
    b.cyl(p.white, 10, 10.6, 0.9, 0, 0.3, 6, 40);
    b.cyl(p.water, 9.3, 9.3, 0.1, 0, 1.15, 6, 40);
    const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](8.6, 1.05, 16, 64), p.steel);
    ring.position.set(0, 10.4, 6);
    ring.rotation.y = Math.PI / 5;
    ring.castShadow = true;
    b.group.add(ring);
    const inner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](7.5, 0.16, 8, 64), acc);
    inner.position.copy(ring.position);
    inner.rotation.copy(ring.rotation);
    b.group.add(inner);
    const orb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](1.6, 1), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](dest.color).multiplyScalar(1.6),
        wireframe: true,
        toneMapped: false
    }));
    orb.position.set(0, 10.4, 6);
    b.spinner(orb, 0.7, 0.4);
    // Pavilion at the back.
    b.facade(5, 52, 9, 18, 0, 0.3, -32, GLASS_PALE, {
        lit: 0.85
    });
    b.box(p.white, 60, 0.8, 26, 0, 9.3, -30);
    b.box(acc, 60.2, 0.2, 26.2, 0, 9.05, -30);
    for (const x of [
        -27,
        -9,
        9,
        27
    ])b.box(p.white, 0.8, 9, 0.8, x, 0.3, -19);
    for(let i = 0; i < 5; i++){
        b.cyl(p.steel, 0.12, 0.12, 13, -28 + i * 14, 0.3, 34, 6);
        b.box(i % 2 === 0 ? acc : p.white, 3.2, 1.9, 0.08, -26.3 + i * 14, 11, 34);
    }
    // Planters around the plaza.
    for (const { x, z } of (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$footprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contactPlanters"])()){
        b.cyl(p.white, 2.2, 1.9, 0.9, x, 0.3, z, 12);
        b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](2.3, 1), p.grass, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            3.4,
            z
        ], [
            0,
            0,
            0
        ], [
            1,
            0.85,
            1
        ]));
        b.cyl(p.dark, 0.16, 0.2, 2, x, 1.2, z, 6);
    }
    b.sign(dest.name, dest.category, 30, 6, 0, 13.6, -17.8);
}
function stadium(b) {
    const { p, dest } = b;
    const acc = b.accent();
    const profile = [
        [
            34,
            0
        ],
        [
            36,
            2
        ],
        [
            50,
            20
        ],
        [
            54,
            22
        ],
        [
            54.5,
            16
        ],
        [
            53,
            0
        ]
    ].map(([x, y])=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](x, y));
    b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LatheGeometry"](profile, 56), p.white, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0,
        0
    ], [
        0,
        0,
        0
    ], [
        1,
        1,
        0.92
    ]));
    b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](34, 34, 0.3, 48), p.grass, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.3,
        0
    ], [
        0,
        0,
        0
    ], [
        1,
        1,
        0.92
    ]));
    const roof = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](45, 5.5, 10, 64);
    b.merger.add(roof, p.steel, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        24.5,
        0
    ], [
        Math.PI / 2,
        0,
        0
    ], [
        1,
        0.92,
        0.32
    ]));
    const rim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](51.5, 0.4, 6, 72);
    b.merger.add(rim, acc, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        23,
        0
    ], [
        Math.PI / 2,
        0,
        0
    ], [
        1,
        0.92,
        1
    ]));
    for(let i = 0; i < 4; i++){
        const a = i / 4 * Math.PI * 2 + Math.PI / 4;
        b.cyl(p.steel, 0.5, 0.9, 40, Math.cos(a) * 56, 0, Math.sin(a) * 52, 8);
        b.box(b.accent("#fff3d6", 2), 6, 3, 1, Math.cos(a) * 56, 40, Math.sin(a) * 52, -a + Math.PI / 2);
    }
    b.screen(0, 16, 10, 0, 30, 49.9);
    b.sign(dest.name, dest.category, 28, 5.6, 0, 8, 50.6);
}
function terminal(b) {
    const { p, dest } = b;
    b.cyl(p.dark, 2.4, 2.6, 0.4, 0, 0, 0, 16);
    b.box(p.dark, 2.2, 2.4, 1.2, 0, 0.4, 0);
    b.box(p.dark, 3.4, 2.4, 0.3, 0, 2.9, 0.1);
    b.sign("> build.log", "press to read", 3.1, 2.1, 0, 4.1, 0.27, 0, dest.color);
    b.cyl(p.steel, 0.05, 0.05, 5, 1.4, 2.9, -0.3, 6);
    b.cyl(b.accent(dest.color, 2), 0.18, 0.18, 0.25, 1.4, 7.9, -0.3, 8);
}
function lookout(b) {
    const { p, dest } = b;
    b.cyl(p.white, 5, 5, 0.25, 0, 0, 0, 6);
    for(let i = 0; i < 6; i++){
        const a = i / 6 * Math.PI * 2;
        b.cyl(p.white, 0.14, 0.14, 3.6, Math.cos(a) * 4.3, 0.25, Math.sin(a) * 4.3, 8);
    }
    b.merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](5.6, 2.2, 6), p.red, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        4.95,
        0
    ]));
    b.cyl(b.accent(dest.color, 1.8), 0.2, 0.2, 0.5, 0, 6.1, 0, 8);
    b.cyl(p.steel, 0.1, 0.14, 1.3, 0, 0.25, 0, 8);
    b.box(p.steel, 0.5, 0.3, 0.9, 0, 1.55, 0);
}
function garage(b) {
    const { p, dest } = b;
    const acc = b.accent("#ff5a36", 1.8);
    b.box(p.concrete, 40, 0.2, 26, 0, 0, 2);
    b.box(p.dark, 32, 8, 16, 0, 0.2, -5);
    b.box(p.white, 33, 0.6, 17, 0, 8.2, -5);
    for (const x of [
        -10.4,
        0,
        10.4
    ]){
        b.box(p.steel, 8.4, 5.2, 0.3, x, 0.2, 3.05);
        for(let k = 1; k < 6; k++)b.box(p.dark, 8.4, 0.06, 0.34, x, 0.2 + k * 0.86, 3.05);
    }
    b.box(acc, 32.2, 0.2, 0.3, 0, 6, 3.1);
    b.sign(dest.name, "JDM · code-built", 16, 3.4, 0, 11, 3.2, 0, "#ff8a6a");
}
const BUILDERS = {
    centralTower,
    gatewayPavilion,
    corporateTwin,
    officeTower,
    university,
    library,
    researchLab,
    projectPod,
    creativeStudio,
    galleryPavilion,
    mediaTower,
    kiosk,
    contactPavilion,
    stadium,
    terminal,
    lookout,
    garage
};
function buildLandmarks(destinations, ctx) {
    const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    root.name = "landmarks";
    const spinners = [];
    const facades = [];
    const p = palette();
    for (const dest of destinations){
        const builder = new Builder(dest, ctx, p);
        BUILDERS[dest.landmark](builder);
        const built = builder.finish();
        root.add(built.group);
        spinners.push(...built.spinners);
        facades.push(...built.facades);
    }
    return {
        group: root,
        spinners,
        facades
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/geometry/props.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAMP_HEIGHT",
    ()=>LAMP_HEIGHT,
    "LAMP_REACH",
    ()=>LAMP_REACH,
    "boatGeometry",
    ()=>boatGeometry,
    "craneGeometry",
    ()=>craneGeometry,
    "hillTreePoints",
    ()=>hillTreePoints,
    "hillsGeometry",
    ()=>hillsGeometry,
    "lampHeadGeometry",
    ()=>lampHeadGeometry,
    "lampPoleGeometry",
    ()=>lampPoleGeometry,
    "pagodaGeometry",
    ()=>pagodaGeometry,
    "palmGeometry",
    ()=>palmGeometry,
    "pineGeometry",
    ()=>pineGeometry,
    "radioMastGeometry",
    ()=>radioMastGeometry,
    "setInstances",
    ()=>setInstances,
    "skybridgeGeometry",
    ()=>skybridgeGeometry,
    "skybridgeGlowGeometry",
    ()=>skybridgeGlowGeometry,
    "treeGeometry",
    ()=>treeGeometry,
    "turbineRotorGeometry",
    ()=>turbineRotorGeometry,
    "turbineTowerGeometry",
    ()=>turbineTowerGeometry
]);
/**
 * Small repeated objects (street lights, trees, palms, cranes, boats) and the
 * decorative backdrop (hills, wind turbines, radio mast). Each is one merged
 * geometry with vertex colours so it can be drawn as a single instanced mesh.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/rng.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/three/merge.ts [app-client] (ecmascript)");
;
;
;
;
;
function colored(geometry, color, matrix) {
    const g = geometry.index ? geometry.toNonIndexed() : geometry;
    if (geometry.index) geometry.dispose();
    if (matrix) g.applyMatrix4(matrix);
    const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](color);
    const count = g.getAttribute("position").count;
    const colors = new Float32Array(count * 3);
    for(let i = 0; i < count; i++)colors.set([
        c.r,
        c.g,
        c.b
    ], i * 3);
    g.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
    if (!g.getAttribute("uv")) g.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(count * 2), 2));
    return g;
}
function merge(parts) {
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeGeometries"])(parts, false) ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    parts.forEach((p)=>p.dispose());
    return g;
}
const LAMP_HEIGHT = 8.4;
const LAMP_REACH = 2.3;
function lampPoleGeometry() {
    return merge([
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.07, 0.11, LAMP_HEIGHT, 8), "#2a2d33", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            LAMP_HEIGHT / 2,
            0
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](LAMP_REACH + 0.3, 0.1, 0.14), "#2a2d33", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            LAMP_REACH / 2,
            LAMP_HEIGHT - 0.05,
            0
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.9, 0.12, 0.34), "#3a3e45", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            LAMP_REACH,
            LAMP_HEIGHT - 0.1,
            0
        ]))
    ]);
}
function lampHeadGeometry() {
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.8, 0.06, 0.28);
    g.translate(LAMP_REACH, LAMP_HEIGHT - 0.19, 0);
    return g;
}
function treeGeometry() {
    const canopy = (r, x, y, z, color)=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](r, 1);
        return colored(g, color, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            y,
            z
        ], [
            0,
            0,
            0
        ], [
            1,
            0.82,
            1
        ]));
    };
    return merge([
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.14, 0.22, 3, 6), "#4b3a2c", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            1.5,
            0
        ])),
        canopy(2.1, 0, 4.3, 0, "#3e7d48"),
        canopy(1.5, 1.0, 3.7, 0.5, "#346e40"),
        canopy(1.4, -0.9, 3.9, -0.6, "#4a8d52")
    ]);
}
function palmGeometry() {
    const parts = [];
    const height = 9.5;
    // A gently leaning trunk built from short tapered sections.
    const sections = 6;
    for(let i = 0; i < sections; i++){
        const t = i / sections;
        const lean = Math.sin(t * 1.2) * 0.5;
        parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2 - t * 0.07, 0.24 - t * 0.07, height / sections + 0.05, 7), i % 2 === 0 ? "#6b5a45" : "#5d4e3c", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            lean,
            (t + 0.5 / sections) * height,
            0
        ], [
            0,
            0,
            -0.06
        ])));
    }
    const top = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.sin(1.2) * 0.5, height, 0);
    // Fronds arch up and out of the crown, then droop under their own weight.
    const fronds = 11;
    for(let i = 0; i < fronds; i++){
        const a = i / fronds * Math.PI * 2;
        const length = 4.4 + i % 3 * 0.5;
        const lift = i % 2 === 0 ? 1.5 : 0.8;
        const frond = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1.1, 1, 2, 7);
        const pos = frond.getAttribute("position");
        for(let v = 0; v < pos.count; v++){
            const t = pos.getY(v) + 0.5; // 0 at the crown, 1 at the tip
            const across = pos.getX(v);
            const width = Math.sin(Math.min(1, t * 1.15) * Math.PI) * 0.9 + 0.12;
            pos.setXYZ(v, across * width, lift * Math.sin(t * 2.4) - 2.6 * t * t - Math.abs(across) * 0.35, t * length);
        }
        frond.computeVertexNormals();
        parts.push(colored(frond, i % 2 === 0 ? "#3f8a4a" : "#2f7340", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeTranslation(top.x, top.y, top.z).multiply(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationY(a))));
    }
    parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.42, 8, 6), "#4d4032", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        top.x,
        top.y - 0.1,
        top.z
    ])));
    return merge(parts);
}
function craneGeometry() {
    const red = "#c0392b";
    const parts = [];
    const box = (w, h, d, x, y, z, color = red)=>parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](w, h, d), color, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            y,
            z
        ])));
    for (const x of [
        -11,
        11
    ]){
        for (const z of [
            -6,
            6
        ])box(1.2, 30, 1.2, x, 15, z);
        box(1.4, 1.4, 13.4, x, 30, 0);
        box(1.4, 1.2, 13.4, x, 12, 0);
        box(2.4, 1.6, 14, x, 0.8, 0, "#30343a");
    }
    box(23.4, 1.6, 1.4, 0, 30, -6);
    box(23.4, 1.6, 1.4, 0, 30, 6);
    // Boom and back reach.
    box(2.4, 1.8, 62, 0, 32, -14);
    box(1, 12, 1, 0, 38, 4);
    box(0.4, 0.4, 26, 0, 39, -9, "#e8e8e8");
    // Machinery house and trolley.
    box(6, 4.5, 9, 0, 35, 9, "#e6e6e3");
    box(3.2, 1.6, 4, 0, 30.4, -20, "#f1c40f");
    box(0.25, 14, 0.25, 0, 23, -20, "#2c3038");
    return merge(parts);
}
function boatGeometry() {
    const hull = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](4.6, 1.6, 15, 1, 1, 4);
    const pos = hull.getAttribute("position");
    for(let i = 0; i < pos.count; i++){
        const z = pos.getZ(i);
        const t = Math.max(0, (z - 2) / 5.5);
        pos.setX(i, pos.getX(i) * (1 - t * t * 0.95) * (pos.getY(i) < 0 ? 0.72 : 1));
        if (z > 2) pos.setY(i, pos.getY(i) + t * 0.5);
    }
    hull.computeVertexNormals();
    return merge([
        colored(hull, "#f2f4f6", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            0.5,
            0
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](3.6, 1.3, 6.5), "#e3e7eb", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            1.9,
            -1.5
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](3.7, 0.5, 6.6), "#1d2a3a", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            2.0,
            -1.5
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](2.8, 0.9, 3.6), "#eef0f2", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            3,
            -2.2
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](4.7, 0.16, 15.1), "#16365a", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            0.1,
            0
        ]))
    ]);
}
function skybridgeGeometry(span, height) {
    const parts = [];
    parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](span + 3, 0.5, 4.2), "#d9dde2", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        height,
        0
    ])));
    parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](span + 3, 0.35, 4.6), "#eef1f4", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        height + 3.4,
        0
    ])));
    for (const z of [
        -2,
        2
    ])parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](span + 3, 2.7, 0.12), "#6d9cc4", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        height + 1.85,
        z
    ])));
    for(let x = -span / 2; x <= span / 2 + 0.01; x += span / 8){
        for (const z of [
            -2.05,
            2.05
        ])parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.22, 3.2, 0.22), "#f3f5f7", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            height + 1.85,
            z
        ])));
    }
    for (const side of [
        -1,
        1
    ]){
        parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.9, 1.15, height, 12), "#c9ced5", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            side * span / 2,
            height / 2,
            0
        ])));
        parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](3.4, 0.6, 5), "#c9ced5", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            side * span / 2,
            height - 0.5,
            0
        ])));
    }
    return merge(parts);
}
function skybridgeGlowGeometry(span, height) {
    const strips = [
        -2.32,
        2.32
    ].map((z)=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](span + 3, 0.14, 0.08);
        g.translate(0, height - 0.1, z);
        return g;
    });
    return merge(strips.map((g)=>colored(g, "#ffffff")));
}
function hillsGeometry() {
    const x0 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - 60;
    const x1 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + 60;
    const z1 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 0.5;
    const z0 = z1 - 260;
    const nx = 96;
    const nz = 36;
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(4242);
    const bumps = Array.from({
        length: 16
    }, ()=>({
            x: rng.range(x0 + 40, x1 - 40),
            z: rng.range(z0 + 30, z1 - 70),
            r: rng.range(50, 130),
            h: rng.range(18, 62)
        }));
    // The tallest ground is in the north-west, as in the reference.
    bumps.push({
        x: -300,
        z: z1 - 150,
        r: 150,
        h: 92
    }, {
        x: -120,
        z: z1 - 120,
        r: 110,
        h: 60
    }, {
        x: 180,
        z: z1 - 140,
        r: 130,
        h: 46
    });
    const smooth = (t)=>{
        const c = Math.min(1, Math.max(0, t));
        return c * c * (3 - 2 * c);
    };
    const heightAt = (x, z)=>{
        let h = 6;
        for (const b of bumps){
            const d = Math.hypot(x - b.x, z - b.z) / b.r;
            if (d < 1) h += b.h * (1 - d * d) * (1 - d * d);
        }
        // Level with the pavement where the hills meet the city, sinking below the
        // water on the seaward sides.
        const landward = smooth((z1 - z) / 55);
        const seaward = smooth((z - z0) / 60) * smooth((x - x0) / 80) * smooth((x1 - x) / 80);
        return (0.5 + (h - 0.5) * landward) * seaward - 4 * (1 - seaward);
    };
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](x1 - x0, z1 - z0, nx, nz);
    g.rotateX(-Math.PI / 2);
    g.translate((x0 + x1) / 2, 0, (z0 + z1) / 2);
    const pos = g.getAttribute("position");
    const colors = new Float32Array(pos.count * 3);
    const low = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#4e8a55");
    const high = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#7d8f6e");
    const rock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#8a8778");
    const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
    for(let i = 0; i < pos.count; i++){
        const h = heightAt(pos.getX(i), pos.getZ(i));
        pos.setY(i, h);
        c.copy(low).lerp(high, Math.min(1, h / 55));
        if (h > 62) c.lerp(rock, Math.min(1, (h - 62) / 30));
        colors.set([
            c.r,
            c.g,
            c.b
        ], i * 3);
    }
    g.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
    g.computeVertexNormals();
    return {
        geometry: g,
        heightAt
    };
}
function hillTreePoints(heightAt, count) {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(8118);
    const pts = [];
    let guard = 0;
    while(pts.length < count && guard++ < count * 20){
        const x = rng.range(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x0 - 40, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].x1 + 40);
        const z = rng.range(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 240, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISLAND"].z0 - 6);
        const y = heightAt(x, z);
        if (y < 1.5 || y > 70) continue;
        pts.push({
            x,
            z,
            y: y - 0.3,
            rot: rng.range(0, 6.28),
            scale: rng.range(1.1, 2.4)
        });
    }
    return pts;
}
function pineGeometry() {
    return merge([
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.12, 0.18, 1.4, 5), "#4b3a2c", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            0.7,
            0
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](1.5, 3.2, 6), "#2f6b3e", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            2.6,
            0
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](1.1, 2.6, 6), "#357545", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            4.2,
            0
        ]))
    ]);
}
function radioMastGeometry() {
    const parts = [];
    const levels = 7;
    const total = 64;
    for(let i = 0; i < levels; i++){
        const h = total / levels;
        const r0 = 5.5 * (1 - i / levels) + 0.5;
        const r1 = 5.5 * (1 - (i + 1) / levels) + 0.5;
        parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](r1, r0, h, 4, 1, true), i % 2 === 0 ? "#d8392b" : "#f0f0ee", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            h * (i + 0.5),
            0
        ], [
            0,
            Math.PI / 4,
            0
        ])));
    }
    parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.15, 0.3, 14, 5), "#f0f0ee", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        total + 7,
        0
    ])));
    parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](3.6, 3.6, 2.4, 10), "#e9e9e6", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        total * 0.62,
        0
    ])));
    return merge(parts);
}
function turbineTowerGeometry() {
    return merge([
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.5, 1.1, 38, 10), "#f2f4f5", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            19,
            0
        ])),
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1.4, 1.5, 3.6), "#f2f4f5", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            38.4,
            0.4
        ]))
    ]);
}
function turbineRotorGeometry() {
    const parts = [
        colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.9, 10, 8), "#f2f4f5")
    ];
    for(let i = 0; i < 3; i++){
        const blade = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.9, 15, 0.16);
        const pos = blade.getAttribute("position");
        for(let v = 0; v < pos.count; v++){
            const t = (pos.getY(v) + 7.5) / 15;
            pos.setX(v, pos.getX(v) * (1 - t * 0.75));
        }
        blade.translate(0, 8, 0);
        parts.push(colored(blade, "#f7f8f9", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationZ(i / 3 * Math.PI * 2)));
    }
    return merge(parts);
}
function pagodaGeometry() {
    const parts = [];
    let y = 0;
    for(let i = 0; i < 4; i++){
        const w = 9 - i * 1.6;
        parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](w, 3.4, w), "#b04a2f", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            y + 1.7,
            0
        ])));
        parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](w * 0.95, 1.8, 4), "#3a4a52", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            y + 4.3,
            0
        ], [
            0,
            Math.PI / 4,
            0
        ])));
        y += 4.6;
    }
    parts.push(colored(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.1, 0.2, 5, 5), "#d9b44a", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        y + 2.5,
        0
    ])));
    return merge(parts);
}
function setInstances(mesh, points, scaleY = 1) {
    const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    const up = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
    const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const s = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    points.forEach((pt, i)=>{
        q.setFromAxisAngle(up, pt.rot);
        p.set(pt.x, pt.y, pt.z);
        s.set(pt.scale, pt.scale * scaleY, pt.scale);
        m.compose(p, q, s);
        mesh.setMatrixAt(i, m);
    });
    mesh.count = points.length;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/instancing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instancedBoxes",
    ()=>instancedBoxes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
function instancedBoxes(boxes, material, facade) {
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1);
    geometry.translate(0, 0.5, 0);
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](geometry, material, Math.max(1, boxes.length));
    mesh.count = boxes.length;
    const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
    const style = new Float32Array(Math.max(1, boxes.length) * 4);
    const accent = new Float32Array(Math.max(1, boxes.length) * 3);
    boxes.forEach((b, i)=>{
        m.makeScale(b.w, b.h, b.d).setPosition(b.x, b.y, b.z);
        mesh.setMatrixAt(i, m);
        mesh.setColorAt(i, c.setRGB(b.tint[0], b.tint[1], b.tint[2]));
        style.set([
            b.style,
            b.seed,
            b.lit,
            0
        ], i * 4);
        accent.set(b.accent, i * 3);
    });
    if (facade) {
        geometry.setAttribute("aStyle", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedBufferAttribute"](style, 4));
        geometry.setAttribute("aAccent", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedBufferAttribute"](accent, 3));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (boxes.length > 0) mesh.computeBoundingSphere();
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/sky.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SKY_PRESETS",
    ()=>SKY_PRESETS,
    "applySkyPreset",
    ()=>applySkyPreset,
    "bakeEnvironment",
    ()=>bakeEnvironment,
    "createSkyMaterial",
    ()=>createSkyMaterial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
const SKY_PRESETS = {
    golden: {
        label: "Golden hour",
        sunDirection: [
            -0.62,
            0.3,
            0.72
        ],
        sunColor: "#ffd0a0",
        sunIntensity: 3.0,
        hemiSky: "#9db8f5",
        hemiGround: "#4c4046",
        hemiIntensity: 0.8,
        zenith: "#2f66c4",
        mid: "#8fb6ea",
        horizon: "#ffc9a0",
        fog: "#b3b4d2",
        fogRange: [
            0.42,
            1.1
        ],
        windowLit: 0.34,
        emissive: 0.8,
        lampGlow: 0.45,
        envIntensity: 1.0,
        exposure: 0.92,
        stars: 0,
        clouds: 0.75,
        bloom: 0.55,
        headlights: 0.5
    },
    day: {
        label: "Day",
        sunDirection: [
            -0.4,
            0.78,
            0.48
        ],
        sunColor: "#fff6e6",
        sunIntensity: 3.4,
        hemiSky: "#bcd8ff",
        hemiGround: "#63605a",
        hemiIntensity: 1.1,
        zenith: "#2b6fd6",
        mid: "#7fb3ee",
        horizon: "#d7ebff",
        fog: "#bcd3ee",
        fogRange: [
            0.45,
            1.1
        ],
        windowLit: 0.07,
        emissive: 0.4,
        lampGlow: 0,
        envIntensity: 1.05,
        exposure: 0.88,
        stars: 0,
        clouds: 0.9,
        bloom: 0.3,
        headlights: 0
    },
    night: {
        label: "Night",
        sunDirection: [
            0.35,
            0.62,
            -0.5
        ],
        sunColor: "#9db8ff",
        sunIntensity: 0.55,
        hemiSky: "#3a4c8f",
        hemiGround: "#14131f",
        hemiIntensity: 0.7,
        zenith: "#050814",
        mid: "#101a44",
        horizon: "#3a2a6a",
        fog: "#141a3c",
        fogRange: [
            0.3,
            1.05
        ],
        windowLit: 0.8,
        emissive: 1.25,
        lampGlow: 1,
        envIntensity: 0.55,
        exposure: 1.05,
        stars: 1,
        clouds: 0.3,
        bloom: 0.95,
        headlights: 1
    }
};
const VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_Position.z = gl_Position.w; // always at the far plane
}`;
const FRAG = /* glsl */ `
precision highp float;
varying vec3 vDir;
uniform vec3 uZenith;
uniform vec3 uMid;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uStars;
uniform float uClouds;
uniform float uTime;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += noise(p) * a;
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = clamp(dir.y, -0.2, 1.0);
  vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.22, h));
  col = mix(col, uZenith, smoothstep(0.18, 0.75, h));
  // Below the horizon fade to a hazy ground colour.
  col = mix(col, uHorizon * 0.55, smoothstep(0.0, -0.18, dir.y));

  float sun = max(dot(dir, normalize(uSunDir)), 0.0);
  col += uSunColor * pow(sun, 6.0) * 0.22;
  col += uSunColor * pow(sun, 60.0) * 0.5;
  col += uSunColor * smoothstep(0.99955, 0.9998, sun) * 6.0;

  if (dir.y > 0.02 && uClouds > 0.0) {
    vec2 uv = dir.xz / (dir.y + 0.18) * 1.6 + uTime * 0.004;
    float c = smoothstep(0.52, 0.86, fbm(uv));
    float lit = 0.75 + 0.5 * pow(sun, 3.0);
    vec3 cloudCol = mix(uHorizon, vec3(1.0), 0.55) * lit;
    col = mix(col, cloudCol, c * uClouds * smoothstep(0.02, 0.2, dir.y) * 0.8);
  }

  if (uStars > 0.0 && dir.y > 0.0) {
    vec2 sp = dir.xz / (dir.y + 0.4) * 260.0;
    vec2 cell = floor(sp);
    float present = step(0.985, hash(cell));
    // A soft dot inside the cell rather than the whole cell.
    vec2 offset = fract(sp) - 0.5 - (vec2(hash(cell + 3.1), hash(cell + 7.7)) - 0.5) * 0.6;
    float dot_ = smoothstep(0.16, 0.02, length(offset));
    col += vec3(0.85, 0.9, 1.0) * present * dot_ * (0.4 + 0.6 * hash(cell + 1.3)) * uStars * smoothstep(0.05, 0.4, dir.y);
  }
  gl_FragColor = vec4(col, 1.0);
}`;
function createSkyMaterial() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
        vertexShader: VERT,
        fragmentShader: FRAG,
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"],
        depthWrite: false,
        depthTest: true,
        fog: false,
        toneMapped: false,
        uniforms: {
            uZenith: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]()
            },
            uMid: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]()
            },
            uHorizon: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]()
            },
            uSunDir: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)
            },
            uSunColor: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]()
            },
            uStars: {
                value: 0
            },
            uClouds: {
                value: 0
            },
            uTime: {
                value: 0
            }
        }
    });
}
function applySkyPreset(material, preset) {
    const u = material.uniforms;
    u.uZenith.value.set(preset.zenith);
    u.uMid.value.set(preset.mid);
    u.uHorizon.value.set(preset.horizon);
    u.uSunDir.value.set(...preset.sunDirection).normalize();
    u.uSunColor.value.set(preset.sunColor);
    u.uStars.value = preset.stars;
    u.uClouds.value = preset.clouds;
}
function bakeEnvironment(renderer, preset) {
    const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
    const material = createSkyMaterial();
    applySkyPreset(material, preset);
    material.uniforms.uClouds.value = preset.clouds * 0.6;
    const dome = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](50, 32, 16), material);
    scene.add(dome);
    const panelGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1, 1);
    const colors = [
        "#ffd9a8",
        "#8fd0ff",
        "#c9a8ff",
        "#ffb0de"
    ];
    const panels = [];
    for(let i = 0; i < 14; i++){
        const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: colors[i % colors.length]
        });
        m.color.multiplyScalar(0.5 + preset.emissive * 0.9);
        panels.push(m);
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](panelGeo, m);
        const a = i / 14 * Math.PI * 2;
        mesh.position.set(Math.cos(a) * 30, 3 + i % 3 * 4, Math.sin(a) * 30);
        mesh.scale.set(5, 3 + i % 4 * 3, 1);
        mesh.lookAt(0, 4, 0);
        scene.add(mesh);
    }
    const ground = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](60, 24), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](preset.hemiGround).multiplyScalar(0.6)
    }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);
    const pmrem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](renderer);
    const target = pmrem.fromScene(scene, 0.02, 0.1, 200);
    pmrem.dispose();
    dome.geometry.dispose();
    material.dispose();
    panelGeo.dispose();
    panels.forEach((m)=>m.dispose());
    ground.geometry.dispose();
    ground.material.dispose();
    return target;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/world/textures.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createWorldTextures",
    ()=>createWorldTextures,
    "makeGantryTexture",
    ()=>makeGantryTexture,
    "makeGlassGridTexture",
    ()=>makeGlassGridTexture,
    "makeLabelTexture",
    ()=>makeLabelTexture
]);
/**
 * Every texture in the world is drawn at load time on a 2D canvas, so the city
 * needs no image downloads. Text uses the site's own display font.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/rng.ts [app-client] (ecmascript)");
;
;
function make(width, height, draw) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) draw(ctx, width, height);
    const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
    texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    texture.anisotropy = 4;
    return texture;
}
function repeating(texture, rx, ry) {
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    texture.repeat.set(rx, ry);
    return texture;
}
/** Tileable value noise, used for the asphalt grain and the water normal map. */ function tileNoise(size, cells, seed) {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(seed);
    const lattice = new Float32Array(cells * cells);
    for(let i = 0; i < lattice.length; i++)lattice[i] = rng.next();
    const out = new Float32Array(size * size);
    const smooth = (t)=>t * t * (3 - 2 * t);
    for(let y = 0; y < size; y++){
        for(let x = 0; x < size; x++){
            const fx = x / size * cells;
            const fy = y / size * cells;
            const x0 = Math.floor(fx);
            const y0 = Math.floor(fy);
            const tx = smooth(fx - x0);
            const ty = smooth(fy - y0);
            const a = lattice[y0 % cells * cells + x0 % cells];
            const b = lattice[y0 % cells * cells + (x0 + 1) % cells];
            const c = lattice[(y0 + 1) % cells * cells + x0 % cells];
            const d = lattice[(y0 + 1) % cells * cells + (x0 + 1) % cells];
            out[y * size + x] = a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
        }
    }
    return out;
}
function fbm(size, seed) {
    const out = new Float32Array(size * size);
    let amp = 0.5;
    let cells = 4;
    for(let o = 0; o < 5; o++){
        const n = tileNoise(size, cells, seed + o * 17);
        for(let i = 0; i < out.length; i++)out[i] += n[i] * amp;
        amp *= 0.5;
        cells *= 2;
    }
    return out;
}
function makeLabelTexture(fontFamily, title, subtitle, color, options = {}) {
    const width = options.width ?? 1024;
    const height = options.height ?? 256;
    return make(width, height, (ctx, w, h)=>{
        ctx.clearRect(0, 0, w, h);
        if (options.background) {
            ctx.fillStyle = options.background;
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.6;
            ctx.lineWidth = Math.max(3, h * 0.02);
            ctx.strokeRect(ctx.lineWidth, ctx.lineWidth, w - ctx.lineWidth * 2, h - ctx.lineWidth * 2);
            ctx.globalAlpha = 1;
        }
        const align = options.align ?? "center";
        const x = align === "center" ? w / 2 : h * 0.18;
        ctx.textAlign = align;
        ctx.textBaseline = "middle";
        const upper = title.toUpperCase();
        let size = h * (subtitle ? 0.4 : 0.52);
        ctx.font = `700 ${size}px ${fontFamily}`;
        const max = w * 0.9;
        const measured = ctx.measureText(upper).width;
        if (measured > max) {
            size *= max / measured;
            ctx.font = `700 ${size}px ${fontFamily}`;
        }
        ctx.shadowColor = color;
        ctx.shadowBlur = h * 0.12;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(upper, x, subtitle ? h * 0.4 : h * 0.52);
        ctx.shadowBlur = 0;
        if (subtitle) {
            ctx.fillStyle = color;
            let sub = h * 0.16;
            ctx.font = `600 ${sub}px ${fontFamily}`;
            const sm = ctx.measureText(subtitle.toUpperCase()).width;
            if (sm > max) {
                sub *= max / sm;
                ctx.font = `600 ${sub}px ${fontFamily}`;
            }
            ctx.fillText(subtitle.toUpperCase(), x, h * 0.76);
        }
    });
}
function makeGlassGridTexture(seed, base, lit) {
    const texture = make(256, 256, (ctx, w, h)=>{
        const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(seed);
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, w, h);
        const cols = 16;
        const rows = 16;
        const cw = w / cols;
        const ch = h / rows;
        for(let r = 0; r < rows; r++){
            for(let c = 0; c < cols; c++){
                const roll = rng.next();
                if (roll > 0.72) {
                    ctx.globalAlpha = 0.35 + rng.next() * 0.65;
                    ctx.fillStyle = roll > 0.93 ? "#cfe8ff" : lit;
                    ctx.fillRect(c * cw + 1.5, r * ch + 2.5, cw - 3, ch - 5);
                } else {
                    ctx.globalAlpha = 0.12 + rng.next() * 0.1;
                    ctx.fillStyle = "#9fc6ee";
                    ctx.fillRect(c * cw + 1.5, r * ch + 2.5, cw - 3, ch - 5);
                }
            }
        }
        ctx.globalAlpha = 1;
    });
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    return texture;
}
function makeGantryTexture(fontFamily, entries) {
    return make(1024, 256, (ctx, w, h)=>{
        ctx.fillStyle = "#0e3b2e";
        ctx.fillRect(0, 0, w, h);
        const cell = w / entries.length;
        entries.forEach((entry, i)=>{
            const x0 = i * cell;
            ctx.strokeStyle = "#e8f2ee";
            ctx.lineWidth = 6;
            ctx.strokeRect(x0 + 10, 10, cell - 20, h - 20);
            ctx.fillStyle = "#f3faf7";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `600 ${h * 0.2}px ${fontFamily}`;
            ctx.fillText(entry.label, x0 + cell / 2, h * 0.34, cell - 50);
            // Arrow.
            ctx.save();
            ctx.translate(x0 + cell / 2, h * 0.7);
            ctx.rotate(entry.arrow === "up" ? 0 : entry.arrow === "right" ? Math.PI / 2 : -Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(0, -h * 0.17);
            ctx.lineTo(h * 0.13, 0);
            ctx.lineTo(h * 0.045, 0);
            ctx.lineTo(h * 0.045, h * 0.15);
            ctx.lineTo(-h * 0.045, h * 0.15);
            ctx.lineTo(-h * 0.045, 0);
            ctx.lineTo(-h * 0.13, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
    });
}
function billboard(fontFamily, variant, words) {
    const palettes = [
        [
            "#6a2be0",
            "#ff7fe0",
            "#aee0ff"
        ],
        [
            "#1463c9",
            "#7ff0ff",
            "#e0d2ff"
        ],
        [
            "#c2338f",
            "#ffd9a0",
            "#ffffff"
        ],
        [
            "#0f8f8a",
            "#c8ffe6",
            "#bfe4ff"
        ],
        [
            "#4b36d6",
            "#e0d2ff",
            "#ffe08a"
        ],
        [
            "#d2456e",
            "#ffe1f3",
            "#a6f1ff"
        ]
    ];
    const [bg, a, b] = palettes[variant % palettes.length];
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(900 + variant * 31);
    return make(256, 384, (ctx, w, h)=>{
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, bg);
        g.addColorStop(1, "#160a33");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 0.9;
        const kind = variant % 3;
        if (kind === 0) {
            // Bar chart.
            const bars = 7;
            for(let i = 0; i < bars; i++){
                const bh = (0.2 + rng.next() * 0.5) * h * 0.55;
                ctx.fillStyle = i % 2 === 0 ? a : b;
                ctx.fillRect(24 + i * ((w - 48) / bars), h * 0.9 - bh, (w - 48) / bars - 8, bh);
            }
        } else if (kind === 1) {
            // Line chart over a faint grid.
            ctx.strokeStyle = "rgba(255,255,255,0.12)";
            ctx.lineWidth = 1;
            for(let i = 1; i < 6; i++){
                ctx.beginPath();
                ctx.moveTo(20, h * 0.4 + i * h * 0.5 / 6);
                ctx.lineTo(w - 20, h * 0.4 + i * h * 0.5 / 6);
                ctx.stroke();
            }
            for (const [col, base] of [
                [
                    a,
                    0.72
                ],
                [
                    b,
                    0.8
                ]
            ]){
                ctx.strokeStyle = col;
                ctx.lineWidth = 5;
                ctx.beginPath();
                let y = h * base;
                ctx.moveTo(20, y);
                for(let x = 20; x <= w - 20; x += 24){
                    y -= (rng.next() - 0.36) * 26;
                    ctx.lineTo(x, Math.max(h * 0.42, Math.min(h * 0.9, y)));
                }
                ctx.stroke();
            }
        } else {
            // Concentric rings.
            for(let i = 5; i > 0; i--){
                ctx.strokeStyle = i % 2 === 0 ? a : b;
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.arc(w / 2, h * 0.66, i * 20, rng.next() * 3, rng.next() * 3 + 4);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.shadowColor = a;
        ctx.shadowBlur = 14;
        ctx.font = `700 46px ${fontFamily}`;
        ctx.fillText(words[variant % words.length].toUpperCase(), 22, 26, w - 44);
        ctx.shadowBlur = 0;
        ctx.fillStyle = a;
        ctx.font = `600 18px ${fontFamily}`;
        ctx.fillText(words[(variant + 2) % words.length].toUpperCase(), 24, 82, w - 44);
    });
}
function createWorldTextures(fontFamily, words) {
    const glow = make(128, 128, (ctx, w, h)=>{
        const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.25, "rgba(255,255,255,0.5)");
        g.addColorStop(0.6, "rgba(255,255,255,0.12)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
    });
    const pavement = repeating(make(256, 256, (ctx, w, h)=>{
        ctx.fillStyle = "#8a8f96";
        ctx.fillRect(0, 0, w, h);
        const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(77);
        const n = 4;
        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                const v = 128 + Math.floor(rng.next() * 22);
                ctx.fillStyle = `rgb(${v},${v + 2},${v + 6})`;
                ctx.fillRect(i * (w / n) + 1.5, j * (h / n) + 1.5, w / n - 3, h / n - 3);
            }
        }
    }), 0.125, 0.125);
    const plaza = repeating(make(256, 256, (ctx, w, h)=>{
        ctx.fillStyle = "#70757d";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "#9aa1ab";
        ctx.lineWidth = 3;
        for(let i = 0; i <= 2; i++){
            ctx.beginPath();
            ctx.moveTo(i * w / 2, 0);
            ctx.lineTo(i * w / 2, h);
            ctx.moveTo(0, i * h / 2);
            ctx.lineTo(w, i * h / 2);
            ctx.stroke();
        }
        ctx.strokeStyle = "#5d626a";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, h);
        ctx.moveTo(w, 0);
        ctx.lineTo(0, h);
        ctx.stroke();
    }), 0.1, 0.1);
    const grain = fbm(256, 5);
    const asphalt = repeating(make(256, 256, (ctx, w, h)=>{
        const img = ctx.createImageData(w, h);
        const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRng"])(9);
        for(let i = 0; i < w * h; i++){
            const v = 150 + (grain[i] - 0.5) * 90 + (rng.next() - 0.5) * 40;
            img.data[i * 4] = v;
            img.data[i * 4 + 1] = v;
            img.data[i * 4 + 2] = v;
            img.data[i * 4 + 3] = 255;
        }
        ctx.putImageData(img, 0, 0);
    }), 1, 1);
    asphalt.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"];
    const heights = fbm(256, 23);
    const waterNormal = repeating(make(256, 256, (ctx, w, h)=>{
        const img = ctx.createImageData(w, h);
        const at = (x, y)=>heights[(y + h) % h * w + (x + w) % w];
        for(let y = 0; y < h; y++){
            for(let x = 0; x < w; x++){
                const dx = (at(x + 1, y) - at(x - 1, y)) * 6;
                const dy = (at(x, y + 1) - at(x, y - 1)) * 6;
                const len = Math.hypot(dx, dy, 1);
                const i = (y * w + x) * 4;
                img.data[i] = -dx / len * 127 + 128;
                img.data[i + 1] = -dy / len * 127 + 128;
                img.data[i + 2] = 1 / len * 127 + 128;
                img.data[i + 3] = 255;
            }
        }
        ctx.putImageData(img, 0, 0);
    }), 1, 1);
    waterNormal.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"];
    const routeArrow = repeating(make(64, 128, (ctx, w, h)=>{
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(124,196,255,0.22)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#bfe4ff";
        ctx.beginPath();
        ctx.moveTo(w / 2, h * 0.2);
        ctx.lineTo(w * 0.86, h * 0.62);
        ctx.lineTo(w * 0.66, h * 0.62);
        ctx.lineTo(w / 2, h * 0.44);
        ctx.lineTo(w * 0.34, h * 0.62);
        ctx.lineTo(w * 0.14, h * 0.62);
        ctx.closePath();
        ctx.fill();
    }), 1, 1);
    const billboards = Array.from({
        length: 6
    }, (_, i)=>billboard(fontFamily, i, words));
    const all = [
        glow,
        pavement,
        plaza,
        asphalt,
        waterNormal,
        routeArrow,
        ...billboards
    ];
    return {
        glow,
        pavement,
        plaza,
        asphalt,
        waterNormal,
        billboards,
        routeArrow,
        dispose: ()=>all.forEach((t)=>t.dispose())
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=components_world_17zn6m8quyav5._.js.map