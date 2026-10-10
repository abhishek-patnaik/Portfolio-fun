# Abhishek — The Interactive 3D Portfolio World

A portfolio you drive through. The home page is a futuristic island city; every
district is a section of the portfolio and every landmark opens its content.
The same content is also available as ordinary, indexable web pages, so nobody
has to drive to read a resume.

- **Immersive mode** (`/`): start the engine, drive, press `E` at a landmark.
- **Classic mode** (`/about`, `/projects`, `/blog`, …): normal pages, no WebGL.

## What is real and what is generated

Two reference **images** were supplied: a multi-view sheet of a silver JDM
coupe and a set of city views. No 3D model files were supplied, so:

| Asset | Status |
| --- | --- |
| Car | **Generated approximation.** Modelled in code from the reference sheet: a lofted body, wheel arches, lamps, hoop spoiler, five-spoke wheels and a right-hand-drive cockpit. It is a real 3D object, not an image, but it is not a scan or an artist-made mesh of the reference. Manufacturer badges and logos are deliberately not reproduced. |
| City | **Generated approximation.** Layout, landmarks, bridges, harbour, stadium and hills are built procedurally to follow the reference composition and mood. It is not a reconstruction of the rendered image. |
| Textures | Generated at load time on 2D canvases (signs, billboards, paving, water normals). |
| Audio | Synthesised with the Web Audio API (engine, tyres, wind, impacts, interface sounds). There are no audio files. |
| Fonts | Chakra Petch and Geist, self-hosted in `app/fonts`. |

See [Replacing the car](#replacing-the-car-with-a-real-model) and
[Replacing the city](#replacing-or-extending-the-city) to bring in real models.

## Technology

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Three.js · React Three Fiber · Drei · @react-three/postprocessing · Zustand ·
Vitest · Testing Library · Playwright.

Physics is a small custom arcade vehicle model on a fixed 120 Hz step
(`lib/game/physics.ts`) rather than a general rigid-body engine. A bicycle model
with explicit grip, speed-sensitive steering and circle-versus-box collision is
easier to make approachable, is deterministic, and is unit-tested. Drifting is
part of the same model (see [Drifting](#drifting)).

## Prerequisites

- Node.js 20.9 or newer (developed on Node 22)
- npm 10 or newer
- A browser with WebGL 2

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see Environment variables
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | Browser tests (Playwright); builds and serves the app first |
| `npm run check` | Type check, lint, unit tests and build in one go |

## Environment variables

There is one, and it is optional. Copy `.env.example` to `.env.local`.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Open Graph, sitemap. Set this to the deployed origin. |

There are no secrets: the site is fully static, and contact is a plain email
link, so nothing needs a server-side key.

## Controls

| Input | Action |
| --- | --- |
| `W` / `↑` | Accelerate |
| `S` / `↓` | Brake, then reverse once stopped |
| `A` `D` / `←` `→` | Steer |
| `Space` | Handbrake. Hold while steering at speed to start a drift |
| `Shift` | Boost. At full lock it kicks the tail out |
| `E` | Interact with the nearby landmark |
| `C` / `V` | Cycle cameras / toggle cockpit and chase |
| `M` | City map |
| `R` | Recover to the last safe road position |
| `I` | Start or stop the engine |
| `N` | Mute |
| `H` | Controls guide |
| `Esc` | Close the open interface, or pause |
| Drag | Look around |

Touch devices get an on-screen steering pad, hold-to-drive pedals, handbrake,
boost, camera, recovery and a contextual interact button. A gamepad works too
(left stick, triggers, `A` to interact).

### Drifting

1. Build some speed (above about 30 km/h), turn in and tap the handbrake.
2. Stay on the throttle and keep steering to hold the slide. More lock gives
   more angle.
3. Steer the other way to swing into the opposite drift. Ease off the throttle
   and steering to straighten up.

Shift (boost) at full lock also breaks the rear loose. The big roundabout in
the centre and the wide boulevard are good places to practise.

Angle, speed and time build a score; long drifts raise a multiplier up to ×5.
The run is banked when the slide ends and lost if the car touches anything.
The best score is remembered in the browser. Sliding leaves skid marks and
tyre smoke and the chase camera swings out to show the angle.

The handling lives in `stepVehicle` in `lib/game/physics.ts` and is tuned by the
`drift*` fields of `DEFAULT_TUNING`:

| Field | Effect |
| --- | --- |
| `driftGrip` | Lateral grip while sliding. Lower slides longer and loses less speed. |
| `driftYaw` | How hard the steering rotates the car in a slide. Higher gives more angle. |
| `driftAlign` | How strongly the car straightens itself. Higher is tamer. |
| `driftMaxAngle` | Angle beyond which the car resists spinning. |
| `driftMinSpeed` | Slowest speed at which a drift can start. |
| `driftBuild` / `driftRelease` | How quickly the rear lets go and recovers. |

Scoring rules are in `lib/game/drift.ts`; smoke and skid marks are in
`components/vehicle/DriftEffects.tsx` (two draw calls in total).

## Editing portfolio content

Everything the site says about its owner lives in `lib/data`. No text is
duplicated in scene code; landmarks refer to records by id.

| File | Content |
| --- | --- |
| `portfolio.ts` | Name, title, tagline, intro, about, location, email, social links, resume file, number plate text, navigation |
| `experience.ts` | Roles |
| `education.ts` | Degrees, and certifications (empty for now, so that section is hidden) |
| `projects.ts` | Projects, their headline figures, charts and case studies |
| `creative.ts` | Creative works |
| `skills.ts` | Skill groups |
| `blog.ts` | Articles (takeaways plus structured blocks: paragraphs, headings, lists, quotes, code) |
| `landmarks.ts` | Which landmark opens which section or record, and the hidden discoveries |

### Where the content came from

In October 2026 the content was imported from the owner's résumé and from
abhishekpatnaik.in:

- **Profile, experience, education, skills**: from the résumé, with the extra
  detail published on the site (for example the two extra role bullets).
- **Projects**: the six project cards from the site, plus this website itself.
- **Case studies**: the four from the site. A case study is a project with a
  `caseStudy` block; they are listed at `/case-studies`, from the "Case studies
  only" toggle on the projects page and at the Case Study Library in the
  Knowledge District. The two work case studies are also linked from their
  roles on the experience page.
- **Blog**: the eight posts, word for word, with their key takeaways.
- **Charts**: copied from the public project repositories (MIT licensed, same
  author) into `public/images/projects/`.
- **Resume**: `public/resume/Abhishek_Patnaik_Resume.pdf`. Note that the PDF
  itself contains the phone number; the site's pages do not show it.
- **Contact**: the email address only, by request. There is no form.

Paragraph and list text in articles and case studies supports two inline marks:
`**bold**` and `[label](https://url)`.

### Content status

Every record has a `status`: `verified`, `draft` (awaiting review) or
`placeholder` (sample content). Everything imported above is `verified`.

**Still sample content:** most of `creative.ts`. Neither source lists creative
work, so six of the nine entries in the Creative District are placeholders and
carry a "Placeholder" badge. Replace or delete them, then set
`site.showStatusBadges` to `false`.

Things worth adding:

- **Blog and project cover images**: article `cover` and project `thumbnail`
  are `null`, so generated covers are drawn. The original blog image file names
  are noted beside each article in `blog.ts`; copy them into
  `public/images/blog/` and set `cover`.
- **Certifications**: add entries to `certifications` in `education.ts`.
- **Reading times** are computed from the word count (about two minutes each),
  not copied from the old site.

Adding a project, article or role updates the pages, the panels, the map and the
landmark signs together. The city has fixed slots for item landmarks: the first
three roles, five featured projects, three featured creative works and three
articles get their own building. Everything else is still reachable from its
district's main landmark and from the menu.

## Project structure

```
app/                     Routes: the world (/), classic pages, API, SEO files
components/
  game/                  Canvas host, HUD, map, menu, settings, touch controls
  portfolio/             Section content, shared by panels and pages
  site/                  Layout for the classic pages
  ui/                    Buttons, dialog, icons, badges, generated covers
  vehicle/               Car model (model/), vehicle loop, drift effects, camera rig, showroom
  world/                 City scene, landmarks, environment, shaders, textures
lib/
  data/                  All portfolio content
  game/                  Physics, drift scoring, collision, navigation, input, audio, store
  world/                 Layout, footprints, city generation (no three.js)
  utils/                 Device detection, quality profiles
tests/                   unit/, component/, e2e/
```

Two rules keep it maintainable:

1. **`lib/world/layout.ts` is the single description of the city.** Rendering,
   physics, the map, route finding and the tests all read it.
2. **High-frequency state stays out of React.** The vehicle, camera and guidance
   live in `lib/game/runtime.ts` and are mutated in the frame loop; the HUD reads
   them through refs. Only slow facts (district, nearby landmark) are in the
   Zustand store.

## Replacing the car with a real model

The game talks to the car through the `CarModel` interface in
`components/vehicle/model/car.ts`:

```ts
interface CarModel {
  root: THREE.Group;          // origin on the ground, midway between the axles; +Z forward
  body: THREE.Group;          // sprung mass, tilted for suspension
  wheels: { pivot, spinner, front, side }[];
  steeringWheel: THREE.Group;
  tachNeedle, speedNeedle: THREE.Object3D;
  lamps: { head, tail, brake, reverse, dash };
  paint: THREE.MeshStandardMaterial;
  eye: THREE.Vector3;         // driver eye point for the cockpit camera
  headlampPositions: THREE.Vector3[];
  dispose(): void;
}
```

To use a GLB:

1. Export the model with separate wheel nodes, 1 unit = 1 metre, ground at
   `y = 0`. Compress it (Draco or Meshopt) and place it in `public/models/car/`.
2. Write a loader that returns a `CarModel`: load with `GLTFLoader`, rotate the
   scene so the nose points along **+Z**, centre it between the axles, and wrap
   each wheel as `pivot > spinner > mesh` so steering and spin stay independent.
   If the model has no interior, keep `addCockpit` from the procedural car.
3. Set `eye` to the driver's eye position and match the wheelbase
   (`DEFAULT_TUNING.wheelBase`) and collision circles in `lib/game/physics.ts`.
4. Call your loader instead of `buildCar` in
   `components/game/useWorldAssets.ts` (the "vehicle" stage) and in
   `components/vehicle/CarShowcase.tsx`. The loading screen already reports that
   stage, and a failure there is shown on the error screen with a retry.

This adapter is not included because no model was available to build and test
it against.

### What to supply for better graphics

The biggest visual gains, in order:

| Asset | What to provide | Why |
| --- | --- | --- |
| Car model | One `.glb`, 60k–150k triangles, real-world scale, with the four wheels (and ideally brake discs and steering wheel) as separate nodes, an interior if the cockpit view should use it, and PBR materials with paint, glass and lamps as separate materials. Under about 8 MB after Draco or Meshopt compression. | The car is on screen all the time; this is the single biggest upgrade. |
| HDRI sky | One or two equirectangular `.hdr`/`.exr` files (2k is enough): golden hour and night. | Real reflections on the paint and glass. The sky is currently a shader baked into the environment map. |
| Road and ground textures | Tileable PBR sets (colour, normal, roughness) at 1k–2k: asphalt, concrete paving, kerb. | The ground fills half of every frame and is currently flat colour with generated detail. |
| Landmark buildings | `.glb` files for the hero buildings first: the central tower, stadium, university, pavilion. 5k–30k triangles each, one or two materials. | The generic skyline can stay procedural; landmarks are what people look at. |
| Props | Low-poly `.glb` street furniture: lamps, trees, benches, signs (a few hundred triangles each; they are instanced). | Replaces the simple generated shapes. |

Whatever is supplied needs a licence that allows use on a public website (your
own work, CC0, or a purchased licence that permits web distribution). A model
of a real production car is the usual sticking point: marketplace licences
often restrict that, and manufacturer badges should be left off.

Performance budget to stay within: about 15 MB of downloads in total for the
3D scene, textures in KTX2/Basis where possible, and the low quality profile
should still run on a phone.

## Replacing or extending the city

- **Layout** (`lib/world/layout.ts`): island bounds, road lines, the roundabout,
  bridges, districts and overhead signs. Blocks, the road graph and colliders
  are derived from these. Run `npm test` after changes; the tests check that
  roads are clear and every destination is reachable.
- **Destinations** (`lib/data/landmarks.ts`): position, interaction radius and
  access point of each landmark. **Footprints** (`lib/world/footprints.ts`)
  define what each one reserves and collides with.
- **Landmark geometry** (`components/world/geometry/landmarks.ts`): one function
  per landmark type. To use a modelled building, load its GLB inside that
  function, add it to the builder's group and keep the footprint in step.
- **Generic skyline** (`lib/world/cityGen.ts`): heights, styles and tints per
  district. Buildings are instanced boxes with windows drawn by the shader in
  `components/world/facadeMaterial.ts`.

A full city mesh can replace the generated one, but the physics needs matching
colliders and a ground-height function (`PhysicsWorld` in
`lib/game/physics.ts`).

## Accessibility and alternative navigation

- Every section is a normal page; the home page ships a text overview, a skip
  link and a no-JavaScript fallback.
- The Portfolio menu, the map's destination list and its "Go there" action
  reach everything without driving.
- Dialogs are labelled, trap focus, close on `Esc` and return focus.
- `prefers-reduced-motion` skips the fly-in and holds decorative animation.
- Audio starts only after the Start button and can be muted (`N`).
- If WebGL 2 is missing or the context is lost, an error screen offers a retry
  and links to the classic site.

## Performance

Three quality profiles (`lib/utils/performance.ts`) change real renderer work:

| | Low | Medium | High |
| --- | --- | --- | --- |
| Pixel ratio cap | 1 | 1.5 | 2 |
| Sun shadows | off | 1024 | 2048 |
| Bloom and vignette | off | on | on |
| Draw distance | 900 m | 1500 m | 2400 m |
| Decoration density | 40% | 75% | 100% |
| Headlamp beam, clear coat | off | on | on |

The default is chosen from the device (`lib/utils/deviceCapabilities.ts`) and
can be changed in Settings, which also shows live fps, draw calls and triangles.
Append `?q=low`, `?q=medium` or `?q=high` to force a profile.

The scene is roughly 300 draw calls and 220k triangles on Low. Generic
buildings, street lights, trees, markings, containers and beacons are instanced.

Troubleshooting:

- **Low frame rate**: switch to Low. Check the renderer in `chrome://gpu`; if it
  says SwiftShader the browser is rendering in software.
- **Blurry on a phone**: Low caps the pixel ratio at 1. Try Medium.
- **Stutter when shadows appear**: Medium uses a smaller shadow map and range.

No frame rate is guaranteed; it depends on the device.

## Testing

```bash
npm test          # 98 unit and component tests
npm run test:e2e  # 35 browser tests, desktop and phone
```

- **Unit** (`tests/unit`): vehicle physics including frame-rate independence,
  collisions and recovery; drift handling (entry, hold, transition, recovery,
  no spins) and drift scoring; layout, road graph and route finding; city
  generation (nothing on a road, every destination reachable); content
  integrity, including that the imported content is present and that every
  referenced chart and the resume file exist; store and input manager.
- **Component** (`tests/component`): every portfolio section, case studies,
  the email-only contact panel and the dialog's focus handling.
- **End to end** (`tests/e2e`): the driving journey (load, drive, brake, reverse,
  steer, cameras, recovery, map, panels, prompts, routing, collisions, a drift
  with smoke, marks and score, settings), the classic pages, the WebGL-missing
  fallback, reduced motion, and the phone layout with touch controls.

The browser tests render WebGL in software by default so they behave the same
everywhere. Set `E2E_GPU=1` to use the real GPU. Playwright needs its browser
once: `npx playwright install chromium`.

`window.__world` exposes the runtime, store and input manager in the browser
console for debugging and is what the tests read. For screenshots, set
`__world.runtime.cameraOverride = { position: [x, y, z], target: [x, y, z] }`.

## Deployment

The app is a standard Next.js project. On Vercel:

1. Import the repository.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
3. Deploy. No other configuration is required.

Any Node host works with `npm run build && npm run start`. Every route is
prerendered at build time and there is no API route or server-side secret.
Security headers are set in `next.config.ts`.

## Known limits

- The car and city are code-built approximations of the references (see above).
- Elevated walkways and the skyline are scenery; the drivable network is the
  street grid, the roundabout and three bridges. There is no traffic.
- Most creative works are still sample content (see Content status).
- Development and automated checks ran in a software renderer. Appearance and
  behaviour were verified there; frame rate on real GPUs and the sound mix were
  not measured.
"# Portfolio-fun" 
