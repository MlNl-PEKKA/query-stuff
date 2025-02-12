import { defineConfig } from "tsup";

export default defineConfig({
  bundle: false,
  clean: true,
  dts: true,
  sourcemap: true,
  entry: ["src/*.ts", "!src/*.test.{ts,tsx}", "!src/fixtures.ts"],
  format: "esm",
  outDir: "lib",
});
