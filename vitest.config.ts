import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      reporter: ["json", "html"],
      include: ["src"],
      all: true,
    },
    exclude: ["lib", "node_modules"],
  },
});
