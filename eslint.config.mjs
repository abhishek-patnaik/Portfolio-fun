import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The 3D scene is imperative by design: three.js objects are created once
    // and mutated every frame inside useFrame. The React Compiler rule that
    // forbids mutating values after render does not fit that model, so it is
    // turned off for scene code only. Interface code keeps the full rule set.
    files: ["components/world/**/*.{ts,tsx}", "components/vehicle/**/*.{ts,tsx}", "components/game/Effects.tsx", "components/game/GameCanvas.tsx"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "test-results/**"]),
]);

export default eslintConfig;
