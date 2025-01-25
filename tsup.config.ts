import { defineConfig } from "tsup";

export default defineConfig({
  bundle: false,
  clean: true,
  dts: true,
  entry: ["src/*.ts", "!src/*.test.{ts,tsx}", "!src/fixtures.ts"],
  format: ["cjs", "esm"],
  outDir: "lib",
  sourcemap: true,
});
