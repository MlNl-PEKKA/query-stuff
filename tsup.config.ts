import { defineConfig } from "tsup";

export default defineConfig({
  bundle: false,
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  outDir: "lib",
  sourcemap: true,
  minify: true,
});
