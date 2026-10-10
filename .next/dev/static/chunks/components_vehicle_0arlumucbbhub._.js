(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/vehicle/CameraRig.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CameraRig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/collision.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const UP = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
const ease = (t)=>t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const TRANSITION = 0.7;
const FLYOVER = 5.5;
function lookAtQuaternion(out, from, to, scratch) {
    scratch.lookAt(from, to, UP);
    out.setFromRotationMatrix(scratch);
}
function CameraRig({ car }) {
    _s();
    const { camera, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const flyoverNonce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "CameraRig.useGameStore[flyoverNonce]": (s)=>s.flyoverNonce
    }["CameraRig.useGameStore[flyoverNonce]"]);
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        mode: "showcase",
        blend: 1,
        chaseHeading: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN"].heading,
        chaseDistance: 6.4,
        cinematicAngle: 0.6,
        cinematicLift: 0,
        flyover: -1,
        ready: false
    });
    const scratch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CameraRig.useMemo[scratch]": ()=>({
                desired: {
                    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                    quaternion: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
                    fov: 60,
                    near: 0.3
                },
                from: {
                    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                    quaternion: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
                    fov: 60,
                    near: 0.3
                },
                fly: {
                    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                    quaternion: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
                    fov: 50,
                    near: 0.3
                },
                target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                eye: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                bodyQuat: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
                lookQuat: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
                euler: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0, 0, 0, "YXZ"),
                matrix: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](),
                v: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
            })
    }["CameraRig.useMemo[scratch]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraRig.useEffect": ()=>{
            if (flyoverNonce > 0) s.current.flyover = 0;
        }
    }["CameraRig.useEffect"], [
        flyoverNonce
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "CameraRig.useFrame": ({ clock }, dt)=>{
            const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
            const st = s.current;
            const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
            const cam = camera;
            const d = scratch.desired;
            const reduced = store.reducedMotion;
            const speed = Math.abs(v.speed);
            const look = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].look;
            const mode = store.phase === "driving" ? store.cameraMode : "showcase";
            // Free look eases back to centre once the visitor lets go and is moving.
            look.idle += dt;
            if (look.idle > 1.4 && (speed > 2 || mode === "cinematic")) {
                const k = Math.exp(-2.5 * dt);
                look.yaw *= k;
                look.pitch *= k;
            }
            if (mode !== st.mode) {
                scratch.from.position.copy(cam.position);
                scratch.from.quaternion.copy(cam.quaternion);
                scratch.from.fov = cam.fov;
                st.blend = st.ready ? 0 : 1;
                st.mode = mode;
                look.yaw = 0;
                look.pitch = 0;
            }
            car.root.updateWorldMatrix(true, true);
            const portrait = size.width / size.height < 1 ? 1 + (1 - size.width / size.height) * 0.45 : 1;
            if (mode === "cockpit") {
                scratch.eye.copy(car.eye);
                car.body.localToWorld(scratch.eye);
                car.body.getWorldQuaternion(scratch.bodyQuat);
                const yaw = Math.max(-2.5, Math.min(2.5, look.yaw));
                const pitch = Math.max(-0.5, Math.min(0.45, look.pitch));
                // The camera looks down -Z while the car drives along +Z, hence the half turn.
                // In portrait, tilt up a little so the tall frame shows road rather than dashboard.
                scratch.euler.set(-0.02 + (portrait - 1) * 0.5 + pitch, Math.PI + yaw, 0);
                scratch.lookQuat.setFromEuler(scratch.euler);
                d.position.copy(scratch.eye);
                d.quaternion.copy(scratch.bodyQuat).multiply(scratch.lookQuat);
                d.fov = (70 + Math.min(8, speed * 0.16)) * portrait;
                d.near = 0.07;
            } else if (mode === "chase") {
                const rate = 1 - Math.exp(-4.2 * dt);
                // In a slide the camera settles between the nose and the direction of
                // travel, so the car is seen at an angle instead of always from behind.
                const follow = v.heading - v.slipAngle * 0.6 * v.drift;
                st.chaseHeading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(st.chaseHeading + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAngle"])(follow - st.chaseHeading) * rate);
                const h = st.chaseHeading + look.yaw;
                const wanted = 6.6 + speed * 0.04;
                const height = 2.75 + speed * 0.008 - look.pitch * 4;
                // Pull the camera in if a building is in the way.
                let allowed = wanted;
                const world = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].world;
                if (world) {
                    for (const f of [
                        1,
                        0.82,
                        0.64,
                        0.48,
                        0.34
                    ]){
                        allowed = wanted * f;
                        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointBlocked"])(world.colliders, v.x - Math.sin(h) * allowed, v.z - Math.cos(h) * allowed, 0.8)) break;
                    }
                }
                st.chaseDistance += (allowed - st.chaseDistance) * (1 - Math.exp(-(allowed < st.chaseDistance ? 12 : 3) * dt));
                d.position.set(v.x - Math.sin(h) * st.chaseDistance, v.y + Math.max(0.9, height), v.z - Math.cos(h) * st.chaseDistance);
                // Aim low and ahead so the car sits above the speedometer, not behind it.
                scratch.target.set(v.x + Math.sin(follow) * 3.2, v.y + 0.1, v.z + Math.cos(follow) * 3.2);
                lookAtQuaternion(d.quaternion, d.position, scratch.target, scratch.matrix);
                d.fov = (58 + Math.min(10, speed * 0.2)) * portrait;
                d.near = 0.3;
            } else {
                // Cinematic orbit while driving; a slow three-quarter shot on the start screen.
                const t = clock.elapsedTime;
                const showcase = mode === "showcase";
                if (!reduced) st.cinematicAngle += dt * (showcase ? 0.05 : 0.2);
                const a = (showcase ? v.heading + Math.PI - 0.55 + Math.sin(st.cinematicAngle) * 0.35 : st.cinematicAngle) + look.yaw;
                const radius = showcase ? 8.2 : 10.5 + Math.sin(t * 0.13) * 2.5;
                const baseHeight = showcase ? 1.55 : 2.4 + (0.5 + 0.5 * Math.sin(t * 0.17)) * 3.2;
                const px = v.x + Math.sin(a) * radius;
                const pz = v.z + Math.cos(a) * radius;
                const world = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].world;
                const blocked = world ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointBlocked"])(world.colliders, px, pz, 1) : false;
                st.cinematicLift += ((blocked ? 16 : 0) - st.cinematicLift) * (1 - Math.exp(-2 * dt));
                d.position.set(px, v.y + baseHeight + st.cinematicLift - look.pitch * 4, pz);
                scratch.target.set(v.x, v.y + (showcase ? 1.6 : 0.8), v.z);
                lookAtQuaternion(d.quaternion, d.position, scratch.target, scratch.matrix);
                d.fov = (showcase ? 46 : 44) * portrait;
                d.near = 0.3;
            }
            // Blend from the previous pose after a mode change.
            if (st.blend < 1) {
                st.blend = Math.min(1, st.blend + dt / TRANSITION);
                const k = ease(st.blend);
                cam.position.lerpVectors(scratch.from.position, d.position, k);
                cam.quaternion.slerpQuaternions(scratch.from.quaternion, d.quaternion, k);
                cam.fov = scratch.from.fov + (d.fov - scratch.from.fov) * k;
            } else {
                cam.position.copy(d.position);
                cam.quaternion.copy(d.quaternion);
                cam.fov = d.fov;
            }
            // First visit: descend from above the island to the driving view.
            if (st.flyover >= 0) {
                st.flyover += dt / FLYOVER;
                if (st.flyover >= 1 || reduced || speed > 3) st.flyover = -1;
                else {
                    const k = ease(st.flyover);
                    const f = scratch.fly;
                    f.position.set(v.x - 210 + Math.sin(k * 1.2) * 60, 250, v.z + 330);
                    scratch.target.set(0, 60, -20);
                    lookAtQuaternion(f.quaternion, f.position, scratch.target, scratch.matrix);
                    cam.position.lerpVectors(f.position, cam.position.clone(), k);
                    cam.quaternion.slerpQuaternions(f.quaternion, cam.quaternion.clone(), k);
                    cam.fov = 48 + (cam.fov - 48) * k;
                }
            }
            const override = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].cameraOverride;
            if (override) {
                cam.position.set(...override.position);
                scratch.target.set(...override.target);
                lookAtQuaternion(cam.quaternion, cam.position, scratch.target, scratch.matrix);
                cam.fov = override.fov ?? 50;
                d.near = 0.5;
            }
            if (!Number.isFinite(cam.position.x + cam.position.y + cam.position.z)) {
                cam.position.set(v.x, v.y + 3, v.z + 8);
                cam.lookAt(v.x, v.y + 1, v.z);
            }
            if (Math.abs(cam.near - d.near) > 1e-4) cam.near = d.near;
            cam.updateProjectionMatrix();
            st.ready = true;
        }
    }["CameraRig.useFrame"]);
    return null;
}
_s(CameraRig, "j2XFqdLmo1Q0aeMaaTpWkkQQ9vw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = CameraRig;
var _c;
__turbopack_context__.k.register(_c, "CameraRig");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/vehicle/DriftEffects.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DriftEffects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/performance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/vehicle/model/body.ts [app-client] (ecmascript)");
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
/** Quads kept in the skid-mark ribbon before the oldest are overwritten. */ const MAX_MARKS = 1600;
const MARK_HALF_WIDTH = 0.125;
const MARK_STEP = 0.3;
const MARK_LIFT = 0.035;
const newTrack = ()=>({
        active: false,
        x: 0,
        z: 0,
        lx: 0,
        ly: 0,
        lz: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        alpha: 0
    });
const SMOKE_VERTEX = /* glsl */ `
  attribute vec3 aState; // x: age 0..1, y: size in metres, z: opacity
  uniform float uScale;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min(aState.y * uScale / max(0.1, -mv.z), uScale * 0.45);
    float life = clamp(aState.x, 0.0, 1.0);
    // Fade in, fade out, and thin out right in front of the lens so smoke
    // never fills the screen in the chase view.
    vAlpha = aState.z * smoothstep(0.0, 0.08, life) * pow(1.0 - life, 1.6) * smoothstep(1.2, 7.0, -mv.z);
  }
`;
const SMOKE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.15, d) * vAlpha;
    if (a < 0.003) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;
function DriftEffects() {
    _s();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "DriftEffects.useGameStore[quality]": (s)=>s.quality
    }["DriftEffects.useGameStore[quality]"]);
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "DriftEffects.useGameStore[timeOfDay]": (s)=>s.timeOfDay
    }["DriftEffects.useGameStore[timeOfDay]"]);
    const profile = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality];
    const smokeCount = quality === "low" ? 70 : quality === "medium" ? 150 : 240;
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "DriftEffects.useThree[size]": (s)=>s.size
    }["DriftEffects.useThree[size]"]);
    const camera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "DriftEffects.useThree[camera]": (s)=>s.camera
    }["DriftEffects.useThree[camera]"]);
    const marks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DriftEffects.useMemo[marks]": ()=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(MAX_MARKS * 4 * 3), 3);
            const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(MAX_MARKS * 4 * 4), 4);
            position.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            color.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            const index = new Uint16Array(MAX_MARKS * 6);
            for(let i = 0; i < MAX_MARKS; i++){
                const v = i * 4;
                index.set([
                    v,
                    v + 1,
                    v + 2,
                    v + 2,
                    v + 1,
                    v + 3
                ], i * 6);
            }
            geometry.setAttribute("position", position);
            geometry.setAttribute("color", color);
            geometry.setIndex(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](index, 1));
            geometry.setDrawRange(0, 0);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: "#ffffff",
                vertexColors: true,
                transparent: true,
                // The ribbon's winding follows the direction of travel, so draw both faces.
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                depthWrite: false,
                polygonOffset: true,
                polygonOffsetFactor: -2,
                polygonOffsetUnits: -2,
                fog: true
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.frustumCulled = false;
            mesh.renderOrder = 1;
            mesh.name = "skid-marks";
            return {
                mesh,
                geometry,
                material,
                position,
                color
            };
        }
    }["DriftEffects.useMemo[marks]"], []);
    const smoke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DriftEffects.useMemo[smoke]": ()=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(smokeCount * 3), 3);
            const state = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(smokeCount * 3), 3);
            position.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            state.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            // Start every particle dead (age 1) so nothing is drawn until it is spawned.
            for(let i = 0; i < smokeCount; i++)state.setXYZ(i, 1, 0, 0);
            geometry.setAttribute("position", position);
            geometry.setAttribute("aState", state);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: SMOKE_VERTEX,
                fragmentShader: SMOKE_FRAGMENT,
                uniforms: {
                    uScale: {
                        value: 600
                    },
                    uColor: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#c9ced4")
                    }
                },
                transparent: true,
                depthWrite: false
            });
            const points = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](geometry, material);
            points.frustumCulled = false;
            points.renderOrder = 3;
            points.name = "tyre-smoke";
            return {
                points,
                geometry,
                material,
                position,
                state,
                velocity: new Float32Array(smokeCount * 3),
                life: new Float32Array(smokeCount).fill(1),
                grow: new Float32Array(smokeCount),
                count: smokeCount
            };
        }
    }["DriftEffects.useMemo[smoke]"], [
        smokeCount
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriftEffects.useEffect": ()=>({
                "DriftEffects.useEffect": ()=>{
                    marks.geometry.dispose();
                    marks.material.dispose();
                }
            })["DriftEffects.useEffect"]
    }["DriftEffects.useEffect"], [
        marks
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriftEffects.useEffect": ()=>({
                "DriftEffects.useEffect": ()=>{
                    smoke.geometry.dispose();
                    smoke.material.dispose();
                }
            })["DriftEffects.useEffect"]
    }["DriftEffects.useEffect"], [
        smoke
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriftEffects.useEffect": ()=>{
            smoke.material.uniforms.uColor.value.set(timeOfDay === "night" ? "#6f7785" : timeOfDay === "golden" ? "#cdbfb6" : "#c9ced4");
        }
    }["DriftEffects.useEffect"], [
        smoke,
        timeOfDay
    ]);
    const st = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        tracks: [
            newTrack(),
            newTrack()
        ],
        cursor: 0,
        used: 0,
        next: 0,
        emit: 0,
        alive: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "DriftEffects.useFrame": (_, frameDt)=>{
            const world = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].world;
            if (!world) return;
            const s = st.current;
            const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
            const dt = Math.min(frameDt, 0.05);
            const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDrivingActive"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState());
            const slip = active ? v.tyreSlip : 0;
            const fx = Math.sin(v.heading);
            const fz = Math.cos(v.heading);
            // Skid marks: extend each rear wheel's ribbon while the tyre is scrubbing.
            let marksDirty = false;
            for(let side = 0; side < 2; side++){
                const track = s.tracks[side];
                const lateral = side === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].trackHalf : -__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].trackHalf;
                const wx = v.x + fx * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].rearAxleZ - fz * lateral;
                const wz = v.z + fz * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].rearAxleZ + fx * lateral;
                if (slip < 0.22) {
                    track.active = false;
                    continue;
                }
                const alpha = Math.min(0.78, 0.25 + slip * 0.55);
                if (!track.active) {
                    track.active = true;
                    track.x = wx;
                    track.z = wz;
                    track.alpha = 0;
                    // Zero-width start; the first quad fans out from this point.
                    const y = world.groundHeight(wx, wz) + MARK_LIFT;
                    track.lx = track.rx = wx;
                    track.ly = track.ry = y;
                    track.lz = track.rz = wz;
                    continue;
                }
                const dx = wx - track.x;
                const dz = wz - track.z;
                const dist = Math.hypot(dx, dz);
                if (dist < MARK_STEP) continue;
                if (dist > 4) {
                    // Teleport or recovery: never draw a streak across the map.
                    track.active = false;
                    continue;
                }
                const nx = -dz / dist * MARK_HALF_WIDTH;
                const nz = dx / dist * MARK_HALF_WIDTH;
                const y = world.groundHeight(wx, wz) + MARK_LIFT;
                const base = s.cursor * 4;
                marks.position.setXYZ(base, track.lx, track.ly, track.lz);
                marks.position.setXYZ(base + 1, track.rx, track.ry, track.rz);
                marks.position.setXYZ(base + 2, wx + nx, y, wz + nz);
                marks.position.setXYZ(base + 3, wx - nx, y, wz - nz);
                marks.color.setXYZW(base, 0.03, 0.03, 0.035, track.alpha);
                marks.color.setXYZW(base + 1, 0.03, 0.03, 0.035, track.alpha);
                marks.color.setXYZW(base + 2, 0.03, 0.03, 0.035, alpha);
                marks.color.setXYZW(base + 3, 0.03, 0.03, 0.035, alpha);
                track.x = wx;
                track.z = wz;
                track.lx = wx + nx;
                track.ly = y;
                track.lz = wz + nz;
                track.rx = wx - nx;
                track.ry = y;
                track.rz = wz - nz;
                track.alpha = alpha;
                s.cursor = (s.cursor + 1) % MAX_MARKS;
                s.used = Math.min(MAX_MARKS, s.used + 1);
                marksDirty = true;
            }
            if (marksDirty) {
                marks.position.needsUpdate = true;
                marks.color.needsUpdate = true;
                marks.geometry.setDrawRange(0, s.used * 6);
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stats.skidMarks = s.used;
            }
            // Smoke: spawn at the rear contact patches, then drift, rise and fade.
            const rate = slip > 0.3 ? (profile.richMaterials ? 70 : 34) * slip : 0;
            s.emit += rate * dt;
            while(s.emit >= 1){
                s.emit -= 1;
                const i = s.next;
                s.next = (s.next + 1) % smoke.count;
                const lateral = (Math.random() < 0.5 ? 1 : -1) * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].trackHalf;
                const back = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].rearAxleZ - 0.25 - Math.random() * 0.3;
                const px = v.x + fx * back - fz * lateral;
                const pz = v.z + fz * back + fx * lateral;
                smoke.position.setXYZ(i, px + (Math.random() - 0.5) * 0.3, world.groundHeight(px, pz) + 0.18, pz + (Math.random() - 0.5) * 0.3);
                smoke.velocity[i * 3] = v.vx * 0.22 + (Math.random() - 0.5) * 1.6;
                smoke.velocity[i * 3 + 1] = 0.5 + Math.random() * 0.9;
                smoke.velocity[i * 3 + 2] = v.vz * 0.22 + (Math.random() - 0.5) * 1.6;
                smoke.life[i] = 1.1 + Math.random() * 0.9;
                smoke.grow[i] = 1.4 + Math.random() * 1.2;
                smoke.state.setXYZ(i, 0, 0.7 + Math.random() * 0.4, Math.min(0.34, 0.1 + slip * 0.24));
                s.alive = Math.max(s.alive, 2.2);
            }
            if (s.alive > 0) {
                s.alive -= dt;
                const pos = smoke.position.array;
                const state = smoke.state.array;
                const drag = Math.exp(-1.6 * dt);
                for(let i = 0; i < smoke.count; i++){
                    const age = state[i * 3];
                    if (age >= 1) continue;
                    state[i * 3] = Math.min(1, age + dt / smoke.life[i]);
                    state[i * 3 + 1] += smoke.grow[i] * dt;
                    smoke.velocity[i * 3] *= drag;
                    smoke.velocity[i * 3 + 2] *= drag;
                    pos[i * 3] += smoke.velocity[i * 3] * dt;
                    pos[i * 3 + 1] += smoke.velocity[i * 3 + 1] * dt;
                    pos[i * 3 + 2] += smoke.velocity[i * 3 + 2] * dt;
                }
                smoke.position.needsUpdate = true;
                smoke.state.needsUpdate = true;
            }
            smoke.points.visible = s.alive > 0;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stats.smoke = s.alive > 0;
            // Point size in pixels for a given world size at distance 1.
            const fov = camera.fov ?? 60;
            smoke.material.uniforms.uScale.value = size.height * 0.5 / Math.tan(fov * Math.PI / 360);
        }
    }["DriftEffects.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: marks.mesh
            }, void 0, false, {
                fileName: "[project]/components/vehicle/DriftEffects.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: smoke.points
            }, void 0, false, {
                fileName: "[project]/components/vehicle/DriftEffects.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/vehicle/DriftEffects.tsx",
        lineNumber: 286,
        columnNumber: 5
    }, this);
}
_s(DriftEffects, "RAgx5wgKwU+Lxb2B4v0jDAyZsEQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = DriftEffects;
var _c;
__turbopack_context__.k.register(_c, "DriftEffects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/vehicle/Vehicle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Vehicle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/landmarks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/audio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/collision.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$destinations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/destinations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$drift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/drift.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/input.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/physics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/world/layout.ts [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
const SLOW_TICK = 0.15;
function Vehicle({ car, textures }) {
    _s();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Vehicle.useGameStore[quality]": (s)=>s.quality
    }["Vehicle.useGameStore[quality]"]);
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "Vehicle.useGameStore[timeOfDay]": (s)=>s.timeOfDay
    }["Vehicle.useGameStore[timeOfDay]"]);
    const profile = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY"][quality];
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$world$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKY_PRESETS"][timeOfDay];
    const holder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const beam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const beamTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Vehicle.useMemo[beamTarget]": ()=>{
            const o = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
            o.position.set(0, -0.4, 26);
            return o;
        }
    }["Vehicle.useMemo[beamTarget]"], []);
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        acc: 0,
        slow: 0,
        safe: 0,
        roll: 0,
        squat: 0,
        rearSpin: 0,
        wasActive: false
    });
    const frameInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEUTRAL_INPUT"]
    });
    const shadow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Vehicle.useMemo[shadow]": ()=>{
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: "#000000",
                map: textures.glow,
                transparent: true,
                opacity: 0.6,
                depthWrite: false,
                polygonOffset: true,
                polygonOffsetFactor: -3,
                polygonOffsetUnits: -3
            });
            material.userData.sharedMap = true;
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](3.4, 6.6).rotateX(-Math.PI / 2), material);
            mesh.position.y = 0.03;
            mesh.renderOrder = 1;
            return mesh;
        }
    }["Vehicle.useMemo[shadow]"], [
        textures
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Vehicle.useEffect": ()=>{
            car.root.add(beamTarget);
            return ({
                "Vehicle.useEffect": ()=>{
                    car.root.remove(beamTarget);
                }
            })["Vehicle.useEffect"];
        }
    }["Vehicle.useEffect"], [
        car,
        beamTarget
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Vehicle.useEffect": ()=>{
            // Clear-coat is the expensive part of the paint; drop it on the low profile.
            if (car.paint instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                car.paint.clearcoat = profile.richMaterials ? 1 : 0;
                car.paint.needsUpdate = true;
            }
        }
    }["Vehicle.useEffect"], [
        car,
        profile.richMaterials
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Vehicle.useEffect": ()=>{
            car.lamps.head.emissiveIntensity = 1.4 + preset.headlights * 2.4;
            car.lamps.tail.emissiveIntensity = 0.7 + preset.headlights * 1.1;
        }
    }["Vehicle.useEffect"], [
        car,
        preset
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Vehicle.useFrame": (_, dt)=>{
            const world = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].world;
            const group = holder.current;
            if (!world || !group) return;
            const store = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState();
            const v = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].vehicle;
            const s = state.current;
            const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDrivingActive"])(store);
            v.engineOn = store.engineOn;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingTeleport) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["placeVehicle"])(v, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingTeleport, world);
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].lastSafe = {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingTeleport
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingTeleport = null;
                s.acc = 0;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingRecover) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].pendingRecover = false;
                let pose = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].lastSafe;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointBlocked"])(world.colliders, pose.x, pose.z, 2) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnRoad"])(pose.x, pose.z)) pose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nearestRoadPose"])(v.x, v.z, v.heading);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["placeVehicle"])(v, pose, world);
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stuckTimer = 0;
                s.acc = 0;
                store.setStuck(false);
                store.showToast("Back on the road");
            }
            const inp = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"].read(frameInput.current);
            if (active) {
                s.acc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["advanceVehicle"])(v, inp, dt, s.acc, world);
            } else if (s.wasActive) {
                // An interface just opened: bring the car to rest where it is.
                v.vx = 0;
                v.vz = 0;
                v.speed = 0;
                v.slip = 0;
                v.slipAngle = 0;
                v.drift = 0;
                v.tyreSlip = 0;
                v.yawRate = 0;
                v.accel = 0;
                s.acc = 0;
            }
            s.wasActive = active;
            // Drift scoring: bank a run when it ends cleanly, lose it on contact.
            if (active) {
                const run = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].drift;
                if (run.best < store.bestDrift) run.best = store.bestDrift;
                // Score on simulated time, which is capped per frame exactly like the physics.
                const event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$drift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDriftRun"])(run, v, Math.min(dt, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_FRAME_TIME"]));
                if (event === "bank" && run.lastPoints > store.bestDrift) {
                    const first = store.bestDrift === 0;
                    store.setBestDrift(run.lastPoints);
                    if (!first) store.showToast(`New best drift: ${run.lastPoints.toLocaleString("en-US")}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].blip("arrive");
                }
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].update(v, active ? inp.throttle : 0, active && inp.brake > 0 && v.speed > 1);
            // Model transform. YXZ order: heading first, then the road gradient.
            group.position.set(v.x, v.y, v.z);
            group.rotation.set(-v.pitch, v.heading, 0, "YXZ");
            const k = 1 - Math.exp(-7 * dt);
            const lateral = Math.max(-9, Math.min(9, v.speed * v.yawRate));
            s.roll += (lateral * 0.0058 - s.roll) * k;
            s.squat += (Math.max(-12, Math.min(12, v.accel)) * -0.0026 - s.squat) * k;
            car.body.rotation.set(s.squat, 0, s.roll);
            // Rear wheels spin up under power while they are sliding.
            if (active) s.rearSpin += v.drift * inp.throttle * 26 * dt;
            for (const w of car.wheels){
                w.spinner.rotation.x = w.front ? v.wheelSpin : v.wheelSpin + s.rearSpin;
                if (w.front) w.pivot.rotation.y = -v.steerVisual;
            }
            car.steeringWheel.rotation.z = v.steerVisual * 5.2;
            car.tachNeedle.rotation.z = -(1.25 * Math.PI + 1.5 * Math.PI * Math.min(1, v.rpm * 8.3 / 9));
            car.speedNeedle.rotation.z = -(1.25 * Math.PI + 1.5 * Math.PI * Math.min(1, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["speedKmh"])(v) / 280));
            const braking = active && inp.brake > 0 && !v.reversing;
            car.lamps.brake.emissiveIntensity = braking ? 3.4 : 0.9 + preset.headlights * 0.8;
            car.lamps.reverse.emissiveIntensity = v.gear < 0 ? 2.6 : 0;
            if (beam.current) beam.current.intensity = v.engineOn ? preset.headlights * 520 : 0;
            // Remember the last good road position for recovery.
            s.safe += dt;
            if (s.safe > 0.5) {
                s.safe = 0;
                if (Math.abs(v.speed) > 3 && v.sinceCollision > 1.2 && Math.abs(v.slip) < 2.5 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnRoad"])(v.x, v.z)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].lastSafe = {
                        x: v.x,
                        z: v.z,
                        heading: v.speed >= 0 ? v.heading : v.heading + Math.PI
                    };
                }
            }
            s.slow += dt;
            if (s.slow < SLOW_TICK) return;
            const tick = s.slow;
            s.slow = 0;
            store.setDistrict((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["districtAt"])(v.x, v.z));
            const preferred = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].preferredDestination ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].preferredDestination) : undefined;
            if (preferred && Math.hypot(v.x - preferred.position[0], v.z - preferred.position[1]) > preferred.radius) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].preferredDestination = null;
            }
            const near = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$destinations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nearestDestination"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destinations"], v.x, v.z, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].preferredDestination);
            store.setNearby(near ? near.id : null);
            if (near) store.markDiscovered(near.id);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route && store.routeTargetId) {
                let g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidance"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route, v.x, v.z, v.heading);
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$landmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDestination"])(store.routeTargetId);
                if (target) {
                    const direct = Math.hypot(v.x - target.access.x, v.z - target.access.z);
                    if (direct < 16 || g.remaining < 10) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route = null;
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].guidance = null;
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion++;
                        store.setRouteTarget(null);
                        store.showToast(`Arrived at ${target.name}`);
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audio"].blip("arrive");
                        return;
                    }
                    // Wandered off the route: plan again from here.
                    const offRoute = Math.hypot(v.x - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route.points[g.segment][0], v.z - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route.points[g.segment][1]);
                    const segLen = Math.hypot(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route.points[g.segment + 1][0] - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route.points[g.segment][0], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route.points[g.segment + 1][1] - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route.points[g.segment][1]);
                    if (offRoute > segLen + 45) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findRoute"])([
                            v.x,
                            v.z
                        ], [
                            target.access.x,
                            target.access.z
                        ]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].routeVersion++;
                        g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidance"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].route, v.x, v.z, v.heading);
                    }
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].guidance = g;
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].guidance) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].guidance = null;
            }
            if (active && (inp.throttle > 0.5 || inp.brake > 0.5) && Math.abs(v.speed) < 0.5 && v.engineOn) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stuckTimer += tick;
            else __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stuckTimer = 0;
            store.setStuck(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].stuckTimer > 2.2);
        }
    }["Vehicle.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: holder,
        name: "vehicle",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: car.root
            }, void 0, false, {
                fileName: "[project]/components/vehicle/Vehicle.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: shadow
            }, void 0, false, {
                fileName: "[project]/components/vehicle/Vehicle.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            profile.headlightBeam && preset.headlights > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                ref: beam,
                position: [
                    0,
                    0.72,
                    1.9
                ],
                target: beamTarget,
                color: "#fff0d8",
                angle: 0.62,
                penumbra: 0.7,
                distance: 95,
                decay: 1.6,
                intensity: 0
            }, void 0, false, {
                fileName: "[project]/components/vehicle/Vehicle.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/vehicle/Vehicle.tsx",
        lineNumber: 231,
        columnNumber: 5
    }, this);
}
_s(Vehicle, "a5X7bXdtvozMH8m0lcirOG+RCeE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Vehicle;
var _c;
__turbopack_context__.k.register(_c, "Vehicle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/vehicle/model/body.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BODY_MATERIAL_ORDER",
    ()=>BODY_MATERIAL_ORDER,
    "CAR",
    ()=>CAR,
    "buildCarBody",
    ()=>buildCarBody,
    "halfSection",
    ()=>halfSection
]);
/**
 * Procedural body shell for the JDM coupe.
 *
 * Only reference images were supplied for the car (no mesh), so the body is
 * reconstructed here: cross-sections are defined at stations along the car and
 * lofted into one smooth surface. Faces are then sorted into material groups
 * (paint, glass, trim, lights…) by where they sit on the body, and the wheel
 * arches are cut by snapping vertices onto the arch circles.
 *
 * Car space: +Z forward, +Y up. Because the system is right-handed the
 * driver's right-hand side is -X.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const CAR = {
    length: 4.52,
    halfLength: 2.26,
    width: 1.81,
    wheelBase: 2.55,
    frontAxleZ: 1.33,
    rearAxleZ: -1.22,
    trackHalf: 0.765,
    wheelRadius: 0.33,
    archRadius: 0.405
};
const STATIONS = [
    [
        -2.26,
        0.6,
        0.37,
        0.74,
        0.58,
        0.7,
        0.79,
        0.54,
        0.85,
        0.865
    ],
    [
        -2.2,
        0.7,
        0.31,
        0.83,
        0.56,
        0.785,
        0.835,
        0.6,
        0.895,
        0.912
    ],
    [
        -2.05,
        0.77,
        0.26,
        0.885,
        0.57,
        0.835,
        0.88,
        0.645,
        0.938,
        0.955
    ],
    [
        -1.8,
        0.8,
        0.22,
        0.9,
        0.59,
        0.85,
        0.92,
        0.66,
        0.972,
        0.987
    ],
    [
        -1.5,
        0.82,
        0.19,
        0.905,
        0.61,
        0.845,
        0.945,
        0.655,
        1.0,
        1.012
    ],
    [
        -1.22,
        0.82,
        0.18,
        0.905,
        0.62,
        0.825,
        0.95,
        0.63,
        1.075,
        1.1
    ],
    [
        -0.9,
        0.82,
        0.17,
        0.895,
        0.62,
        0.8,
        0.94,
        0.61,
        1.165,
        1.195
    ],
    [
        -0.55,
        0.82,
        0.17,
        0.885,
        0.61,
        0.79,
        0.93,
        0.6,
        1.222,
        1.255
    ],
    [
        -0.15,
        0.82,
        0.17,
        0.88,
        0.6,
        0.79,
        0.925,
        0.595,
        1.243,
        1.275
    ],
    [
        0.2,
        0.82,
        0.17,
        0.88,
        0.6,
        0.79,
        0.918,
        0.6,
        1.215,
        1.245
    ],
    [
        0.5,
        0.82,
        0.17,
        0.882,
        0.6,
        0.8,
        0.91,
        0.655,
        1.085,
        1.115
    ],
    [
        0.85,
        0.82,
        0.17,
        0.885,
        0.6,
        0.825,
        0.9,
        0.71,
        0.925,
        0.945
    ],
    [
        1.1,
        0.815,
        0.175,
        0.89,
        0.6,
        0.84,
        0.885,
        0.67,
        0.905,
        0.925
    ],
    [
        1.33,
        0.81,
        0.18,
        0.895,
        0.6,
        0.845,
        0.86,
        0.645,
        0.875,
        0.895
    ],
    [
        1.65,
        0.8,
        0.19,
        0.885,
        0.56,
        0.83,
        0.8,
        0.62,
        0.812,
        0.835
    ],
    [
        1.95,
        0.78,
        0.2,
        0.862,
        0.52,
        0.8,
        0.705,
        0.59,
        0.722,
        0.75
    ],
    [
        2.12,
        0.73,
        0.21,
        0.81,
        0.48,
        0.735,
        0.635,
        0.53,
        0.652,
        0.678
    ],
    [
        2.22,
        0.64,
        0.235,
        0.72,
        0.44,
        0.64,
        0.57,
        0.45,
        0.588,
        0.61
    ],
    [
        2.26,
        0.54,
        0.27,
        0.61,
        0.42,
        0.53,
        0.52,
        0.36,
        0.54,
        0.556
    ]
];
/** Subdivisions of each ring span (c0→c1 … c6→c7). Denser where the arches are cut. */ const SPAN_DIVS = [
    3,
    3,
    10,
    8,
    6,
    4,
    4
];
const HALF = SPAN_DIVS.reduce(_c = (a, b)=>a + b, 0);
_c1 = HALF;
const RING = HALF * 2;
const BODY_MATERIAL_ORDER = [
    "paint",
    "glass",
    "tint",
    "trim",
    "well",
    "under"
];
/** Monotone cubic (Fritsch–Carlson) interpolation: smooth, with no overshoot. */ function pchip(xs, ys) {
    const n = xs.length;
    const h = [];
    const d = [];
    for(let i = 0; i < n - 1; i++){
        h.push(xs[i + 1] - xs[i]);
        d.push((ys[i + 1] - ys[i]) / h[i]);
    }
    const m = new Array(n).fill(0);
    m[0] = d[0];
    m[n - 1] = d[n - 2];
    for(let i = 1; i < n - 1; i++){
        if (d[i - 1] * d[i] <= 0) m[i] = 0;
        else {
            const w1 = 2 * h[i] + h[i - 1];
            const w2 = h[i] + 2 * h[i - 1];
            m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
        }
    }
    return (x)=>{
        let i = 0;
        while(i < n - 2 && x > xs[i + 1])i++;
        const t = Math.min(1, Math.max(0, (x - xs[i]) / h[i]));
        const t2 = t * t;
        const t3 = t2 * t;
        return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h[i] * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h[i] * m[i + 1];
    };
}
const zs = STATIONS.map((s)=>s[0]);
const PARAMS = Array.from({
    length: 9
}, (_, k)=>pchip(zs, STATIONS.map((s)=>s[k + 1])));
function catmull(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
function halfSection(z) {
    const [wB, yB, wM, yM, wS, yS, wT, yT, yC] = PARAMS.map((f)=>f(z));
    const c = [
        {
            x: 0,
            y: yB
        },
        {
            x: wB * 0.55,
            y: yB
        },
        {
            x: wB,
            y: yB + 0.03
        },
        {
            x: wM,
            y: yM
        },
        {
            x: wS,
            y: yS
        },
        {
            x: wT,
            y: yT
        },
        {
            x: wT * 0.5,
            y: yT + (yC - yT) * 0.8
        },
        {
            x: 0,
            y: yC
        }
    ];
    const ghostStart = {
        x: -c[1].x,
        y: c[1].y
    };
    const ghostEnd = {
        x: -c[6].x,
        y: c[6].y
    };
    const pts = [];
    for(let s = 0; s < 7; s++){
        const p0 = s === 0 ? ghostStart : c[s - 1];
        const p1 = c[s];
        const p2 = c[s + 1];
        const p3 = s === 6 ? ghostEnd : c[s + 2];
        const div = SPAN_DIVS[s];
        for(let k = 0; k < div; k++){
            const t = k / div;
            pts.push({
                x: Math.max(0, catmull(p0.x, p1.x, p2.x, p3.x, t)),
                y: catmull(p0.y, p1.y, p2.y, p3.y, t)
            });
        }
    }
    pts.push({
        x: 0,
        y: c[7].y
    });
    pts[0].x = 0;
    return pts;
}
/** Which span and subdivision a half-ring segment index belongs to. */ function spanOf(seg) {
    let acc = 0;
    for(let s = 0; s < SPAN_DIVS.length; s++){
        if (seg < acc + SPAN_DIVS[s]) return {
            span: s,
            sub: seg - acc,
            div: SPAN_DIVS[s]
        };
        acc += SPAN_DIVS[s];
    }
    return {
        span: 6,
        sub: SPAN_DIVS[6] - 1,
        div: SPAN_DIVS[6]
    };
}
function ringStations() {
    const out = [];
    const step = 0.035;
    const n = Math.round(CAR.length / step);
    // Rounded closures: a few shrinking rings beyond each end instead of a flat cap.
    const closure = [
        [
            0.5,
            0.05
        ],
        [
            0.76,
            0.04
        ],
        [
            0.9,
            0.026
        ],
        [
            0.97,
            0.012
        ]
    ];
    for (const [scale, dz] of closure)out.push({
        base: -CAR.halfLength,
        z: -CAR.halfLength - dz,
        scale
    });
    for(let i = 0; i <= n; i++){
        const z = -CAR.halfLength + CAR.length * i / n;
        out.push({
            base: z,
            z,
            scale: 1
        });
    }
    for (const [scale, dz] of [
        ...closure
    ].reverse())out.push({
        base: CAR.halfLength,
        z: CAR.halfLength + dz,
        scale
    });
    return out;
}
function buildCarBody() {
    const rings = ringStations();
    const nr = rings.length;
    // The vertex set is stored twice. Wheel-well faces use the second copy so the
    // arch lips keep a crisp edge instead of sharing smoothed normals with the wings.
    const vertexCount = nr * RING + 2;
    const positions = new Float32Array(vertexCount * 2 * 3);
    // 0 = normal, 1 = arch lip, 2 = inside a wheel well.
    const flag = new Uint8Array(nr * RING);
    const wheels = [
        CAR.frontAxleZ,
        CAR.rearAxleZ
    ];
    const sideStart = SPAN_DIVS[0] + 1;
    const sideEnd = SPAN_DIVS[0] + SPAN_DIVS[1] + SPAN_DIVS[2] + SPAN_DIVS[3];
    // Undistorted copy of the surface, used only to derive clean shading normals.
    const smooth = new Float32Array(vertexCount * 3);
    const sectionAt = (spec)=>{
        const half = halfSection(spec.base);
        if (spec.scale === 1) return half;
        const mid = (half[0].y + half[HALF].y) / 2;
        return half.map((p)=>({
                x: p.x * spec.scale,
                y: mid + (p.y - mid) * spec.scale
            }));
    };
    for(let i = 0; i < nr; i++){
        const z = rings[i].z;
        const half = sectionAt(rings[i]);
        const wellX = Math.max(...half.map((p)=>p.x)) - 0.35;
        for(let j = 0; j < RING; j++){
            const mirrored = j > HALF;
            const h = mirrored ? RING - j : j;
            const p = half[h];
            let x = p.x;
            let y = p.y;
            let pz = z;
            smooth.set([
                mirrored ? -p.x : p.x,
                p.y,
                z
            ], (i * RING + j) * 3);
            if (h >= sideStart && h <= sideEnd) {
                for (const wz of wheels){
                    const dz = z - wz;
                    const dy = y - CAR.wheelRadius;
                    const d = Math.hypot(dz, dy);
                    if (d < CAR.archRadius - 0.05) {
                        x = Math.min(x, wellX);
                        flag[i * RING + j] = 2;
                    } else if (d < CAR.archRadius + 0.022) {
                        const k = CAR.archRadius / (d || 1);
                        pz = wz + dz * k;
                        y = CAR.wheelRadius + dy * k;
                        x += 0.012;
                        flag[i * RING + j] = 1;
                    }
                }
            }
            const o = (i * RING + j) * 3;
            positions[o] = mirrored ? -x : x;
            positions[o + 1] = y;
            positions[o + 2] = pz;
        }
    }
    // End caps.
    const rearCentre = nr * RING;
    const frontCentre = rearCentre + 1;
    const capY = (ring)=>{
        const half = sectionAt(rings[ring]);
        return (half[0].y + half[HALF].y) / 2;
    };
    positions.set([
        0,
        capY(0),
        rings[0].z - 0.008
    ], rearCentre * 3);
    positions.set([
        0,
        capY(nr - 1),
        rings[nr - 1].z + 0.008
    ], frontCentre * 3);
    smooth.set([
        0,
        capY(0),
        rings[0].z - 0.008
    ], rearCentre * 3);
    smooth.set([
        0,
        capY(nr - 1),
        rings[nr - 1].z + 0.008
    ], frontCentre * 3);
    positions.copyWithin(vertexCount * 3, 0, vertexCount * 3);
    const buckets = {
        paint: [],
        glass: [],
        tint: [],
        trim: [],
        well: [],
        under: []
    };
    const interiorIndex = [];
    const va = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const vb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const vc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const vd = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const e1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const e2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const nrm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const read = (v, idx)=>v.fromArray(positions, idx * 3);
    const classify = (seg, y, z, n, well)=>{
        const { span, sub, div } = spanOf(seg);
        if (well) return "well";
        if (span === 4) {
            if (z > -0.98 && z < 0.66 && sub < div - 1) return z > -0.37 && z < -0.3 ? "trim" : "tint";
            return "paint";
        }
        if (span >= 5) {
            const edge = span === 5 && sub === 0;
            if (z > 0.22 && z < 0.83) return edge ? "paint" : "glass";
            if (z >= 0.83 && z < 0.9) return "trim";
            if (z > -1.4 && z < -0.58) return edge ? "paint" : "tint";
            return "paint";
        }
        if (y < 0.215) return "under";
        if (n.z > 0.45 && z > 1.85 && y < 0.25) return "under";
        return "paint";
    };
    for(let i = 0; i < nr - 1; i++){
        for(let j = 0; j < RING; j++){
            const j1 = (j + 1) % RING;
            const a = i * RING + j;
            const b = i * RING + j1;
            const c = (i + 1) * RING + j1;
            const d = (i + 1) * RING + j;
            read(va, a);
            read(vb, b);
            read(vc, c);
            read(vd, d);
            const cy = (va.y + vb.y + vc.y + vd.y) / 4;
            const cz = (va.z + vb.z + vc.z + vd.z) / 4;
            e1.subVectors(vb, va);
            e2.subVectors(vd, va);
            nrm.crossVectors(e1, e2).normalize();
            const seg = j < HALF ? j : RING - 1 - j;
            const well = flag[a] > 0 && flag[b] > 0 && flag[c] > 0 && flag[d] > 0 && (flag[a] | flag[b] | flag[c] | flag[d]) >= 2;
            const key = classify(seg, cy, cz, nrm, well);
            const o = key === "well" ? vertexCount : 0;
            buckets[key].push(a + o, b + o, d + o, b + o, c + o, d + o);
            if (key !== "glass" && key !== "tint") interiorIndex.push(a, b, d, b, c, d);
        }
    }
    for(let j = 0; j < RING; j++){
        const j1 = (j + 1) % RING;
        buckets.paint.push(rearCentre, j1, j);
        buckets.paint.push(frontCentre, (nr - 1) * RING + j, (nr - 1) * RING + j1);
    }
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    const posAttr = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3);
    geometry.setAttribute("position", posAttr);
    const index = [];
    BODY_MATERIAL_ORDER.forEach((key, materialIndex)=>{
        const list = buckets[key];
        geometry.addGroup(index.length, list.length, materialIndex);
        for (const v of list)index.push(v);
    });
    geometry.setIndex(index);
    geometry.computeVertexNormals();
    // Replace the normals of the painted surface with those of the undistorted
    // loft, so cutting the arches does not leave ripples in the reflections.
    const clean = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    clean.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](smooth, 3));
    clean.setIndex(index.map((v)=>v >= vertexCount ? v - vertexCount : v));
    clean.computeVertexNormals();
    const normals = geometry.getAttribute("normal");
    normals.array.set(clean.getAttribute("normal").array.subarray(0, vertexCount * 3), 0);
    normals.needsUpdate = true;
    clean.dispose();
    geometry.computeBoundingSphere();
    geometry.computeBoundingBox();
    const interior = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    interior.setAttribute("position", posAttr);
    interior.setAttribute("normal", geometry.getAttribute("normal"));
    interior.setIndex(interiorIndex);
    interior.computeBoundingSphere();
    const probe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
    }));
    const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
    const project = (origin, direction)=>{
        raycaster.set(origin, direction.clone().normalize());
        const hit = raycaster.intersectObject(probe, false)[0];
        if (!hit || !hit.face) return null;
        const normal = hit.face.normal.clone();
        if (normal.dot(direction) > 0) normal.negate();
        return {
            point: hit.point.clone(),
            normal
        };
    };
    const noseOutline = [];
    for(let i = 0; i < nr; i++){
        if (rings[i].z < 1.5 || rings[i].scale < 1) continue;
        const half = halfSection(rings[i].base);
        const corner = half[SPAN_DIVS[0] + SPAN_DIVS[1]];
        noseOutline.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](corner.x, corner.y, rings[i].z));
    }
    return {
        geometry,
        interior,
        project,
        noseOutline
    };
}
var _c, _c1;
__turbopack_context__.k.register(_c, "HALF$SPAN_DIVS.reduce");
__turbopack_context__.k.register(_c1, "HALF");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/vehicle/model/car.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildCar",
    ()=>buildCar
]);
/**
 * Assembles the complete car: body shell, wheels, lights, hoop spoiler, mirrors
 * and a right-hand-drive cockpit. Everything is generated geometry; see
 * body.ts for why. Static parts that share a material are merged so the whole
 * car costs only a few dozen draw calls.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/three/merge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/vehicle/model/body.ts [app-client] (ecmascript)");
;
;
;
;
;
const DRIVER_X = -0.37;
function canvasTexture(width, height, draw) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) draw(ctx);
    const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
    texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    texture.anisotropy = 4;
    return texture;
}
function createMaterials(options) {
    const paintColor = options.paintColor ?? "#b3b9c1";
    const paint = options.physical ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
        color: paintColor,
        metalness: 0.88,
        roughness: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.2
    }) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: paintColor,
        metalness: 0.8,
        roughness: 0.34,
        envMapIntensity: 1.1
    });
    const std = (params)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"](params);
    const emissive = (color, intensity)=>std({
            color: "#111111",
            emissive: color,
            emissiveIntensity: intensity,
            roughness: 0.4
        });
    const plate = canvasTexture(512, 128, (ctx)=>{
        ctx.fillStyle = "#0a0b0d";
        ctx.fillRect(0, 0, 512, 128);
        ctx.strokeStyle = "#8d949c";
        ctx.lineWidth = 6;
        ctx.strokeRect(6, 6, 500, 116);
        ctx.fillStyle = "#f2f4f6";
        ctx.font = `600 70px ${options.fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(options.plateText.toUpperCase().slice(0, 9), 256, 68, 460);
    });
    const gauges = canvasTexture(768, 256, (ctx)=>{
        ctx.fillStyle = "#050506";
        ctx.fillRect(0, 0, 768, 256);
        const dial = (cx, cy, r, max, step, label, redFrom)=>{
            ctx.strokeStyle = "#2a2d33";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
            for(let v = 0; v <= max; v += step){
                const a = Math.PI * 0.75 + v / max * Math.PI * 1.5;
                const major = Math.round(v / step) % 2 === 0;
                ctx.strokeStyle = v >= redFrom ? "#ff3b30" : "#e9edf2";
                ctx.lineWidth = major ? 4 : 2;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(a) * (r - 6), cy + Math.sin(a) * (r - 6));
                ctx.lineTo(cx + Math.cos(a) * (r - (major ? 22 : 14)), cy + Math.sin(a) * (r - (major ? 22 : 14)));
                ctx.stroke();
                if (major && r > 70) {
                    ctx.fillStyle = v >= redFrom ? "#ff6a5f" : "#cfd5dc";
                    ctx.font = `600 ${Math.round(r * 0.17)}px ${options.fontFamily}`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(String(v), cx + Math.cos(a) * (r - 38), cy + Math.sin(a) * (r - 38));
                }
            }
            ctx.fillStyle = "#7f8791";
            ctx.font = `500 ${Math.round(r * 0.13)}px ${options.fontFamily}`;
            ctx.textAlign = "center";
            ctx.fillText(label, cx, cy + r * 0.52);
        };
        dial(384, 128, 118, 9, 0.5, "x1000 r/min", 7);
        dial(630, 138, 96, 280, 20, "km/h", 999);
        dial(138, 138, 96, 8, 1, "BOOST", 7);
    });
    const screen = canvasTexture(256, 160, (ctx)=>{
        const g = ctx.createLinearGradient(0, 0, 256, 160);
        g.addColorStop(0, "#07131f");
        g.addColorStop(1, "#151033");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 160);
        ctx.strokeStyle = "rgba(124,196,255,0.5)";
        ctx.lineWidth = 2;
        for(let i = 0; i < 6; i++){
            ctx.beginPath();
            ctx.moveTo(20 + i * 42, 150);
            ctx.lineTo(128 + (i - 2.5) * 8, 70);
            ctx.stroke();
        }
        ctx.fillStyle = "#7cc4ff";
        ctx.font = `600 22px ${options.fontFamily}`;
        ctx.textAlign = "center";
        ctx.fillText(options.plateText.toUpperCase(), 128, 34);
        ctx.fillStyle = "#b79bff";
        ctx.font = `500 13px ${options.fontFamily}`;
        ctx.fillText("PORTFOLIO NAVIGATION", 128, 54);
    });
    const body = {
        paint,
        glass: std({
            color: "#0a1016",
            metalness: 0.3,
            roughness: 0.04,
            transparent: true,
            opacity: 0.34,
            depthWrite: false,
            envMapIntensity: 1.8
        }),
        tint: std({
            color: "#05070a",
            metalness: 0.4,
            roughness: 0.05,
            transparent: true,
            opacity: 0.86,
            depthWrite: false,
            envMapIntensity: 1.8
        }),
        trim: std({
            color: "#0c0d0f",
            roughness: 0.5,
            metalness: 0.25
        }),
        well: std({
            color: "#040405",
            roughness: 1
        }),
        under: std({
            color: "#0b0b0c",
            roughness: 0.85,
            metalness: 0.1
        })
    };
    const gaugeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        map: gauges,
        toneMapped: false
    });
    gaugeMaterial.color.setScalar(1.7);
    return {
        body,
        paint,
        trim: body.trim,
        well: body.well,
        grille: std({
            color: "#050607",
            roughness: 0.6,
            metalness: 0.4
        }),
        headlight: std({
            color: "#191c21",
            roughness: 0.1,
            metalness: 1,
            envMapIntensity: 1.7
        }),
        taillight: std({
            color: "#240408",
            roughness: 0.16,
            metalness: 0.5,
            envMapIntensity: 1.5
        }),
        interior: std({
            color: "#0f1013",
            roughness: 0.92,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
        }),
        dash: std({
            color: "#121316",
            roughness: 0.78
        }),
        dashSoft: std({
            color: "#191a1e",
            roughness: 0.9
        }),
        seat: std({
            color: "#15161a",
            roughness: 0.86
        }),
        seatAccent: std({
            color: "#6d0d13",
            roughness: 0.8
        }),
        rubber: std({
            color: "#0a0a0b",
            roughness: 0.93
        }),
        rim: std({
            color: "#2b2d31",
            roughness: 0.36,
            metalness: 0.9,
            envMapIntensity: 1.2
        }),
        rimBarrel: std({
            color: "#1c1d20",
            roughness: 0.5,
            metalness: 0.8,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        }),
        chrome: std({
            color: "#dcdfe3",
            roughness: 0.1,
            metalness: 1,
            envMapIntensity: 1.5
        }),
        disc: std({
            color: "#73767a",
            roughness: 0.42,
            metalness: 0.9
        }),
        caliper: std({
            color: "#c1121f",
            roughness: 0.45,
            metalness: 0.2
        }),
        mirror: std({
            color: "#10151b",
            roughness: 0.2,
            metalness: 1,
            envMapIntensity: 0.7
        }),
        head: emissive("#fff1d0", 2.2),
        tail: emissive("#ff1420", 1.1),
        brake: emissive("#ff1420", 0.9),
        amber: emissive("#ff8a00", 0.7),
        reverse: emissive("#ffffff", 0),
        needle: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: "#ff5a36",
            toneMapped: false
        }),
        plate: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: plate
        }),
        gauges: gaugeMaterial,
        screen: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: screen,
            toneMapped: false
        }),
        seam: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: "#1b1d20",
            transparent: true,
            opacity: 0.75
        }),
        textures: [
            plate,
            gauges,
            screen
        ]
    };
}
/** Sweeps a rectangular section along a curve lying roughly in the XY plane. */ function sweepBlade(points, chord, thickness, samples = 48) {
    const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](points, false, "centripetal");
    const pos = [];
    const sections = [];
    const zAxis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1);
    for(let i = 0; i <= samples; i++){
        const t = i / samples;
        const p = curve.getPoint(t);
        const tangent = curve.getTangent(t);
        const side = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(tangent, zAxis).normalize();
        const c = chord(t) / 2;
        const h = thickness / 2;
        sections.push([
            p.clone().addScaledVector(zAxis, c).addScaledVector(side, h),
            p.clone().addScaledVector(zAxis, c * 0.2).addScaledVector(side, h * 1.5),
            p.clone().addScaledVector(zAxis, -c).addScaledVector(side, h * 0.5),
            p.clone().addScaledVector(zAxis, -c).addScaledVector(side, -h * 0.5),
            p.clone().addScaledVector(zAxis, c * 0.2).addScaledVector(side, -h * 1.5),
            p.clone().addScaledVector(zAxis, c).addScaledVector(side, -h)
        ]);
    }
    const n = sections[0].length;
    const quad = (a, b, c, d)=>{
        pos.push(a.x, a.y, a.z, b.x, b.y, b.z, d.x, d.y, d.z, b.x, b.y, b.z, c.x, c.y, c.z, d.x, d.y, d.z);
    };
    for(let i = 0; i < samples; i++){
        for(let k = 0; k < n; k++){
            const k1 = (k + 1) % n;
            quad(sections[i][k], sections[i][k1], sections[i + 1][k1], sections[i + 1][k]);
        }
    }
    const flat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    flat.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](pos, 3));
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeVertices"])(flat, 1e-5);
    flat.dispose();
    g.computeVertexNormals();
    return g;
}
/**
 * A patch that hugs the body: a rounded shape is projected onto the shell point
 * by point, so lamp housings and intakes follow the curvature exactly.
 */ function projectedPatch(body, o) {
    const [nu, nv] = o.grid ?? [
        14,
        8
    ];
    const pos = new Float32Array((nu + 1) * (nv + 1) * 3);
    const ok = new Uint8Array((nu + 1) * (nv + 1));
    const origin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    for(let j = 0; j <= nv; j++){
        for(let i = 0; i <= nu; i++){
            const s = i / nu * 2 - 1;
            const t = j / nv * 2 - 1;
            const m = Math.max(Math.abs(s), Math.abs(t));
            const r = Math.pow(Math.pow(Math.abs(s), o.exponent) + Math.pow(Math.abs(t), o.exponent), 1 / o.exponent) || 1;
            const k = m / r;
            origin.copy(o.origin).addScaledVector(o.u, s * k * o.halfU).addScaledVector(o.v, t * k * o.halfV);
            const hit = body.project(origin, o.dir);
            const idx = j * (nu + 1) + i;
            if (!hit) continue;
            ok[idx] = 1;
            hit.point.addScaledVector(hit.normal, o.offset).toArray(pos, idx * 3);
        }
    }
    const index = [];
    for(let j = 0; j < nv; j++){
        for(let i = 0; i < nu; i++){
            const a = j * (nu + 1) + i;
            const b = a + 1;
            const c = a + nu + 1;
            const d = c + 1;
            if (ok[a] && ok[b] && ok[c] && ok[d]) index.push(a, b, c, b, d, c);
        }
    }
    if (index.length === 0) return null;
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](pos, 3));
    g.setIndex(index);
    g.computeVertexNormals();
    // Make sure the patch faces the projector, whatever the axis handedness.
    const n = g.getAttribute("normal");
    let facing = 0;
    for(let i = 0; i < n.count; i++)facing += n.getX(i) * o.dir.x + n.getY(i) * o.dir.y + n.getZ(i) * o.dir.z;
    if (facing > 0) {
        for(let i = 0; i < index.length; i += 3){
            const tmp = index[i + 1];
            index[i + 1] = index[i + 2];
            index[i + 2] = tmp;
        }
        g.setIndex(index);
        g.computeVertexNormals();
    }
    return g;
}
function buildWheel(m, side, front) {
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const pivot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const spinner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const oriented = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    group.add(pivot);
    pivot.add(spinner);
    spinner.add(oriented);
    if (side === -1) oriented.rotation.y = Math.PI;
    const r = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].wheelRadius;
    const rimR = 0.218;
    const halfW = 0.128;
    // Lathe profiles are (radius, axial position); the axis is then turned onto X.
    const toAxisX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationZ(-Math.PI / 2);
    const tyreProfile = [
        [
            rimR,
            -halfW + 0.012
        ],
        [
            0.265,
            -halfW
        ],
        [
            0.312,
            -halfW + 0.006
        ],
        [
            r,
            -halfW + 0.034
        ],
        [
            r,
            halfW - 0.034
        ],
        [
            0.312,
            halfW - 0.006
        ],
        [
            0.265,
            halfW
        ],
        [
            rimR,
            halfW - 0.012
        ]
    ].map(([x, y])=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](x, y));
    const merger = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Merger"]();
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LatheGeometry"](tyreProfile, 36), m.rubber, toAxisX);
    const barrelProfile = [
        [
            rimR + 0.004,
            -halfW + 0.012
        ],
        [
            rimR - 0.012,
            -halfW + 0.03
        ],
        [
            rimR - 0.02,
            0
        ],
        [
            rimR - 0.012,
            halfW - 0.03
        ],
        [
            rimR + 0.004,
            halfW - 0.012
        ]
    ].map(([x, y])=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](x, y));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LatheGeometry"](barrelProfile, 36), m.rimBarrel, toAxisX);
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](rimR - 0.004, 0.011, 8, 40), m.rim, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        halfW - 0.014,
        0,
        0
    ], [
        0,
        Math.PI / 2,
        0
    ]));
    // Five twin-edged spokes, dished slightly towards the hub.
    const spokes = 5;
    for(let i = 0; i < spokes; i++){
        const a = i / spokes * Math.PI * 2;
        const len = rimR - 0.05;
        const spoke = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.03, len, 0.05);
        const pos = spoke.getAttribute("position");
        for(let v = 0; v < pos.count; v++){
            const y = pos.getY(v);
            const t = y / len + 0.5;
            pos.setZ(v, pos.getZ(v) * (1.25 - t * 0.55));
            pos.setX(v, pos.getX(v) + (1 - t) * -0.028);
        }
        spoke.computeVertexNormals();
        const mtx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationX(a).multiply((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            halfW - 0.035,
            0.045 + len / 2,
            0
        ]));
        merger.add(spoke, m.rim, mtx);
    }
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.06, 0.07, 0.05, 20), m.rim, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        halfW - 0.07,
        0,
        0
    ], [
        0,
        0,
        -Math.PI / 2
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.028, 0.028, 0.012, 16), m.chrome, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        halfW - 0.04,
        0,
        0
    ], [
        0,
        0,
        -Math.PI / 2
    ]));
    merger.build(oriented, {
        castShadow: true
    });
    // Brake disc and caliper stay with the hub: they steer but do not spin.
    const brake = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    if (side === -1) brake.rotation.y = Math.PI;
    pivot.add(brake);
    const brakeMerger = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Merger"]();
    brakeMerger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.168, 0.168, 0.022, 28), m.disc, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0.03,
        0,
        0
    ], [
        0,
        0,
        -Math.PI / 2
    ]));
    const caliper = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.07, 0.085, 0.15, 2, 0.015);
    brakeMerger.add(caliper, m.caliper, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0.035,
        0.105,
        front ? -0.1 : 0.1
    ], [
        front ? 0.75 : -0.75,
        0,
        0
    ]));
    brakeMerger.build(brake);
    return {
        wheel: {
            pivot,
            spinner,
            front,
            side
        },
        group
    };
}
function addExteriorDetails(body, m, merger, parent, headlamps) {
    const up = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
    const disc = (radius, depth, material, hit, proud = 0.004)=>{
        const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromUnitVectors(up, hit.normal);
        const p = hit.point.clone().addScaledVector(hit.normal, proud);
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](radius, radius * 0.92, depth, 20), material, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().compose(p, q, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1)));
    };
    for (const side of [
        1,
        -1
    ]){
        // Tail lamps: four round units per side in a dark housing.
        const back = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1);
        const housing = projectedPatch(body, {
            origin: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 0.54, 0.748, -3),
            u: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0),
            v: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
            dir: back,
            halfU: 0.275,
            halfV: 0.078,
            exponent: 3.2,
            offset: 0.004,
            grid: [
                18,
                8
            ]
        });
        if (housing) merger.add(housing, m.taillight);
        const tailX = [
            0.345,
            0.475,
            0.605,
            0.73
        ];
        const tailMat = [
            m.reverse,
            m.brake,
            m.tail,
            m.amber
        ];
        tailX.forEach((x, i)=>{
            const hit = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * x, 0.748, -3), back);
            if (!hit) return;
            const facing = hit.normal.clone().lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1), 0.5).normalize();
            disc(0.05, 0.028, tailMat[i], {
                point: hit.point,
                normal: facing
            }, 0.012);
            const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromUnitVectors(up, facing);
            const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](0.054, 0.006, 6, 24);
            ring.rotateX(Math.PI / 2);
            merger.add(ring, m.chrome, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().compose(hit.point.clone().addScaledVector(facing, 0.018), q, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1)));
        });
        // Headlamps: three projectors under a smoked lens on each front corner.
        const lampDir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -0.62, -0.785).normalize();
        const lampU = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0);
        const lampV = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.785, -0.62).normalize();
        const lampOrigin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 0.6, 0.69, 1.93).addScaledVector(lampDir, -2);
        const lens = projectedPatch(body, {
            origin: lampOrigin,
            u: lampU,
            v: lampV,
            dir: lampDir,
            halfU: 0.215,
            halfV: 0.095,
            exponent: 2.5,
            offset: 0.005,
            grid: [
                18,
                10
            ]
        });
        if (lens) merger.add(lens, m.headlight);
        [
            -0.128,
            0,
            0.128
        ].forEach((du, i)=>{
            const hit = body.project(lampOrigin.clone().addScaledVector(lampU, side * du), lampDir);
            if (!hit) return;
            const facing = hit.normal.clone().lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.2, 1), 0.6).normalize();
            disc(i === 1 ? 0.05 : 0.043, 0.02, m.head, {
                point: hit.point,
                normal: facing
            }, 0.012);
            if (i === 1) headlamps.push(hit.point.clone().add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.02, 0.06)));
        });
        // Outer intake with the indicator inside it.
        const front = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1);
        const intake = projectedPatch(body, {
            origin: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 0.63, 0.355, 3.2),
            u: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0),
            v: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
            dir: front,
            halfU: 0.125,
            halfV: 0.062,
            exponent: 3.5,
            offset: 0.004,
            grid: [
                10,
                6
            ]
        });
        if (intake) merger.add(intake, m.grille);
        const indicator = projectedPatch(body, {
            origin: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 0.65, 0.375, 3.2),
            u: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0),
            v: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
            dir: front,
            halfU: 0.075,
            halfV: 0.022,
            exponent: 4,
            offset: 0.009,
            grid: [
                8,
                3
            ]
        });
        if (indicator) merger.add(indicator, m.amber);
        const marker = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 2, 0.62, 1.86), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-side, 0, 0));
        if (marker) {
            merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.012, 0.03, 0.09, 2, 0.005), m.amber, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
                marker.point.x,
                marker.point.y,
                marker.point.z
            ]));
        }
        const rearMarker = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 2, 0.6, -1.95), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-side, 0, 0));
        if (rearMarker) {
            merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.012, 0.03, 0.08, 2, 0.005), m.tail, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
                rearMarker.point.x,
                rearMarker.point.y,
                rearMarker.point.z
            ]));
        }
        // Door handle.
        const handle = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 2, 0.8, -0.3), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-side, 0, 0));
        if (handle) {
            merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.02, 0.028, 0.15, 2, 0.008), m.paint, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
                handle.point.x + side * 0.004,
                handle.point.y,
                handle.point.z
            ]));
        }
        // Wing mirror on a short stalk.
        const mirrorBase = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 2, 0.945, 0.6), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-side, 0, 0));
        const mx = (mirrorBase?.point.x ?? side * 0.8) + side * 0.1;
        const shell = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1, 20, 14);
        merger.add(shell, m.paint, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            mx,
            0.99,
            0.61
        ], [
            0,
            side * 0.2,
            0
        ], [
            0.105,
            0.062,
            0.04
        ]));
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.12, 0.022, 0.05), m.trim, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            mx - side * 0.08,
            0.95,
            0.61
        ], [
            0,
            0,
            side * -0.35
        ]));
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](1, 20), m.mirror, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            mx,
            0.99,
            0.578
        ], [
            0,
            Math.PI + side * 0.2,
            0
        ], [
            0.085,
            0.048,
            1
        ]));
        // Door shut lines and the bonnet edge, traced on the surface.
        const trace = (points)=>{
            if (points.length < 2) return;
            const line = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points), m.seam);
            parent.add(line);
        };
        for (const z of [
            0.73,
            -0.44
        ]){
            const pts = [];
            for(let y = 0.27; y <= 0.9; y += 0.045){
                const hit = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * 2, y, z + (z > 0 ? (0.9 - y) * -0.04 : 0)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-side, 0, 0));
                if (hit) pts.push(hit.point.addScaledVector(hit.normal, 0.003));
            }
            trace(pts);
        }
        const bonnet = [];
        for(let z = 0.9; z <= 1.72; z += 0.06){
            const hit = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](side * (0.69 - (z - 0.9) * 0.05), 2, z), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -1, 0));
            if (hit) bonnet.push(hit.point.addScaledVector(hit.normal, 0.003));
        }
        trace(bonnet);
    }
    // High-level brake light, number plate, exhaust.
    const third = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 2, -1.47), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -1, 0));
    if (third) merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.42, 0.016, 0.03, 2, 0.006), m.brake, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        third.point.y + 0.006,
        third.point.z
    ]));
    const plate = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.52, -3), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1));
    if (plate) {
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.56, 0.17, 0.012), m.trim, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            plate.point.y,
            plate.point.z - 0.004
        ]));
        const face = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.5, 0.125), m.plate);
        face.position.set(0, plate.point.y, plate.point.z - 0.012);
        face.rotation.y = Math.PI;
        parent.add(face);
    }
    const diffuser = projectedPatch(body, {
        origin: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.335, -3),
        u: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0),
        v: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
        dir: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1),
        halfU: 0.6,
        halfV: 0.07,
        exponent: 5,
        offset: 0.004,
        grid: [
            22,
            5
        ]
    });
    if (diffuser) merger.add(diffuser, m.grille);
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.058, 0.058, 0.24, 20, 1, true), m.chrome, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0.43,
        0.3,
        -2.17
    ], [
        Math.PI / 2,
        0,
        0
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](0.056, 20), m.well, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0.43,
        0.3,
        -2.2
    ], [
        0,
        Math.PI,
        0
    ]));
    // Hoop spoiler: one continuous blade rising from the rear wings.
    const hoop = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.73, 0.92, -1.93),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.79, 1.06, -1.98),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.8, 1.2, -2.04),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.7, 1.305, -2.08),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.35, 1.335, -2.1),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1.342, -2.1),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.35, 1.335, -2.1),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.7, 1.305, -2.08),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.8, 1.2, -2.04),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.79, 1.06, -1.98),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.73, 0.92, -1.93)
    ];
    merger.add(sweepBlade(hoop, (t)=>0.15 + Math.pow(Math.abs(t - 0.5) * 2, 2) * 0.09, 0.024, 72), m.paint);
    // Front splitter following the nose.
    const outline = body.noseOutline;
    const lip = [];
    const ring = [
        ...outline.map((p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](p.x, p.y, p.z)),
        ...[
            ...outline
        ].reverse().map((p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-p.x, p.y, p.z))
    ];
    for(let i = 0; i < ring.length - 1; i++){
        const a = ring[i];
        const b = ring[i + 1];
        const out = (p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](p.x * 1.035, 0.165, p.z + 0.03 * Math.max(0, 1 - Math.abs(p.x) / 0.9));
        const inn = (p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](p.x * 0.8, 0.165, p.z - 0.12);
        const ao = out(a);
        const bo = out(b);
        const ai = inn(a);
        const bi = inn(b);
        // Top face, bottom face and the outer edge.
        lip.push(ao.x, ao.y, ao.z, ai.x, ai.y, ai.z, bo.x, bo.y, bo.z, bo.x, bo.y, bo.z, ai.x, ai.y, ai.z, bi.x, bi.y, bi.z);
        lip.push(ao.x, 0.14, ao.z, bo.x, 0.14, bo.z, ai.x, 0.14, ai.z, bo.x, 0.14, bo.z, bi.x, 0.14, bi.z, ai.x, 0.14, ai.z);
        lip.push(ao.x, 0.14, ao.z, ao.x, 0.165, ao.z, bo.x, 0.14, bo.z, bo.x, 0.14, bo.z, ao.x, 0.165, ao.z, bo.x, 0.165, bo.z);
    }
    const lipGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    lipGeo.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](lip, 3));
    lipGeo.computeVertexNormals();
    const lipMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](lipGeo, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: "#0a0a0b",
        roughness: 0.6,
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
    }));
    lipMesh.castShadow = false;
    parent.add(lipMesh);
    // Centre intake with slats.
    const mouth = projectedPatch(body, {
        origin: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.335, 3.2),
        u: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0),
        v: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
        dir: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1),
        halfU: 0.4,
        halfV: 0.088,
        exponent: 4,
        offset: 0.004,
        grid: [
            20,
            6
        ]
    });
    if (mouth) merger.add(mouth, m.grille);
    for(let i = 0; i < 3; i++){
        const y = 0.29 + i * 0.045;
        const hit = body.project(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, y, 3.2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1));
        if (hit) merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.7, 0.01, 0.012), m.trim, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0,
            y,
            hit.point.z + 0.008
        ]));
    }
}
function addCockpit(m, merger, parent) {
    // Dashboard: a profile in the ZY plane extruded across the cabin.
    const profile = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]();
    const pts = [
        [
            0.97,
            0.56
        ],
        [
            0.97,
            0.905
        ],
        [
            0.74,
            0.895
        ],
        [
            0.6,
            0.865
        ],
        [
            0.545,
            0.8
        ],
        [
            0.555,
            0.66
        ],
        [
            0.61,
            0.56
        ]
    ];
    profile.moveTo(pts[0][0], pts[0][1]);
    for(let i = 1; i < pts.length; i++)profile.lineTo(pts[i][0], pts[i][1]);
    profile.closePath();
    const dashWidth = 1.5;
    const dash = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtrudeGeometry"](profile, {
        depth: dashWidth,
        bevelEnabled: false
    });
    merger.add(dash, m.dash, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeTranslation(dashWidth / 2, 0, 0).multiply(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationY(-Math.PI / 2)));
    // Instrument binnacle in front of the driver.
    const hood = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.176, 0.176, 0.22, 24, 1, true, 0, Math.PI);
    merger.add(hood, m.dashSoft, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        DRIVER_X,
        0.79,
        0.63
    ], [
        Math.PI / 2,
        Math.PI / 2,
        0
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](0.174, 24, 0, Math.PI), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        DRIVER_X,
        0.79,
        0.6
    ], [
        0,
        Math.PI,
        0
    ]));
    const gaugeFace = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.3, 0.1), m.gauges);
    gaugeFace.position.set(DRIVER_X, 0.882, 0.556);
    gaugeFace.rotation.set(0.2, Math.PI, 0);
    parent.add(gaugeFace);
    // Needles pivot around the dial centres on the gauge texture.
    const makeNeedle = (offsetX, length)=>{
        const pivot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        const needle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.0035, length, 0.002), m.needle);
        needle.position.y = length / 2 - 0.004;
        pivot.add(needle);
        const holder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        holder.position.copy(gaugeFace.position);
        holder.rotation.copy(gaugeFace.rotation);
        pivot.position.set(offsetX, 0, 0.003);
        holder.add(pivot);
        parent.add(holder);
        return pivot;
    };
    const tachNeedle = makeNeedle(0, 0.041);
    // The gauge plane faces the driver, so its local +X points to car -X.
    const speedNeedle = makeNeedle(0.096, 0.033);
    // Steering wheel and column.
    const steering = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    steering.position.set(DRIVER_X, 0.795, 0.4);
    steering.rotation.x = -0.36;
    const wheel = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    steering.add(wheel);
    const wheelMerger = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Merger"]();
    wheelMerger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](0.172, 0.0165, 10, 40), m.dashSoft);
    wheelMerger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.05, 0.055, 0.04, 18), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0,
        0.01
    ], [
        Math.PI / 2,
        0,
        0
    ]));
    for (const a of [
        Math.PI / 2 + 1.25,
        Math.PI / 2 - 1.25,
        -Math.PI / 2
    ]){
        wheelMerger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.03, 0.014), m.dash, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationZ(a).multiply((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            0.105,
            0,
            0.004
        ])));
    }
    wheelMerger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](0.022, 16), m.chrome, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0,
        -0.012
    ], [
        0,
        Math.PI,
        0
    ]));
    wheelMerger.build(wheel);
    parent.add(steering);
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.028, 0.034, 0.3, 12), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        DRIVER_X,
        0.74,
        0.545
    ], [
        Math.PI / 2 - 0.36,
        0,
        0
    ]));
    // Centre stack with a small display, transmission tunnel and gear lever.
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.3, 0.34, 0.2, 2, 0.02), m.dashSoft, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.7,
        0.5
    ], [
        -0.25,
        0,
        0
    ]));
    const display = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.2, 0.12), m.screen);
    display.position.set(0, 0.765, 0.385);
    display.rotation.set(0.25, Math.PI, 0);
    parent.add(display);
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.26, 0.24, 1.25, 2, 0.03), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.31,
        -0.12
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.009, 0.012, 0.16, 8), m.chrome, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.5,
        0.1
    ], [
        0.15,
        0,
        0
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.027, 14, 10), m.dashSoft, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.585,
        0.112
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.05, 0.1, 0.2, 2, 0.015), m.dashSoft, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.46,
        -0.28
    ], [
        0.25,
        0,
        0
    ]));
    // Bucket seats.
    for (const x of [
        DRIVER_X,
        -DRIVER_X
    ]){
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.5, 0.14, 0.5, 3, 0.045), m.seat, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            0.3,
            -0.22
        ], [
            0.06,
            0,
            0
        ]));
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.48, 0.64, 0.13, 3, 0.05), m.seat, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            0.66,
            -0.56
        ], [
            -0.2,
            0,
            0
        ]));
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.24, 0.17, 0.1, 3, 0.04), m.seat, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            1.03,
            -0.66
        ], [
            -0.2,
            0,
            0
        ]));
        for (const s of [
            -1,
            1
        ]){
            merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.07, 0.5, 0.16, 2, 0.03), m.seat, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
                x + s * 0.235,
                0.62,
                -0.52
            ], [
                -0.2,
                0,
                0
            ]));
            merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.07, 0.1, 0.44, 2, 0.03), m.seat, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
                x + s * 0.235,
                0.345,
                -0.22
            ], [
                0.06,
                0,
                0
            ]));
        }
        merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.2, 0.5, 0.012, 2, 0.005), m.seatAccent, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
            x,
            0.68,
            -0.492
        ], [
            -0.2,
            0,
            0
        ]));
    }
    // Rear bench and parcel shelf.
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](1.2, 0.3, 0.4, 2, 0.05), m.seat, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.36,
        -1.0
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](1.2, 0.36, 0.12, 2, 0.04), m.seat, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.6,
        -1.2
    ], [
        -0.3,
        0,
        0
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1.4, 0.02, 0.5), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.86,
        -1.42
    ], [
        0.12,
        0,
        0
    ]));
    // Firewall, so nothing shows through beneath the dashboard.
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1.56, 0.5, 0.02), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        0.42,
        0.97
    ]));
    // Interior mirror.
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](0.2, 0.055, 0.02, 2, 0.008), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        1.165,
        0.3
    ], [
        0.1,
        0,
        0
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.185, 0.042), m.mirror, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        1.165,
        0.288
    ], [
        0.1 + Math.PI,
        0,
        Math.PI
    ]));
    merger.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.008, 0.008, 0.06, 6), m.dash, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mat4"])([
        0,
        1.2,
        0.31
    ]));
    return {
        steeringWheel: wheel,
        tachNeedle,
        speedNeedle
    };
}
function buildCar(options) {
    const m = createMaterials(options);
    const shell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCarBody"])();
    const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    root.name = "jdm-coupe";
    const body = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    root.add(body);
    const shellMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](shell.geometry, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BODY_MATERIAL_ORDER"].map((key)=>m.body[key]));
    shellMesh.castShadow = true;
    shellMesh.receiveShadow = false;
    body.add(shellMesh);
    const lining = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](shell.interior, m.interior);
    body.add(lining);
    const merger = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Merger"]();
    const headlampPositions = [];
    addExteriorDetails(shell, m, merger, body, headlampPositions);
    merger.build(body, {
        castShadow: true
    });
    const cockpitMerger = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2f$merge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Merger"]();
    const cockpit = addCockpit(m, cockpitMerger, body);
    cockpitMerger.build(body);
    const wheels = [];
    for (const front of [
        true,
        false
    ]){
        for (const side of [
            1,
            -1
        ]){
            const { wheel, group } = buildWheel(m, side, front);
            group.position.set(side * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].trackHalf, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].wheelRadius, front ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].frontAxleZ : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$vehicle$2f$model$2f$body$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAR"].rearAxleZ);
            root.add(group);
            wheels.push(wheel);
        }
    }
    const dispose = ()=>{
        root.traverse((obj)=>{
            const mesh = obj;
            if (mesh.geometry) mesh.geometry.dispose();
        });
        const seen = new Set();
        root.traverse((obj)=>{
            const material = obj.material;
            const list = Array.isArray(material) ? material : material ? [
                material
            ] : [];
            for (const mm of list)seen.add(mm);
        });
        seen.forEach((mm)=>mm.dispose());
        m.textures.forEach((t)=>t.dispose());
    };
    return {
        root,
        body,
        wheels,
        steeringWheel: cockpit.steeringWheel,
        paint: m.paint,
        tachNeedle: cockpit.tachNeedle,
        speedNeedle: cockpit.speedNeedle,
        lamps: {
            head: m.head,
            tail: m.tail,
            brake: m.brake,
            reverse: m.reverse,
            dash: m.gauges
        },
        eye: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](DRIVER_X, 1.095, -0.16),
        headlampPositions,
        dispose
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=components_vehicle_0arlumucbbhub._.js.map