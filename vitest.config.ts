import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      reporter: ["json", "html"],
      include: ["src"],
      all: true,
    },
    // typecheck: {
    //   enabled: true,
    //   exclude: ["**/!(*.test.*)", "**/node_modules/**"],
    //   include: ["**/src/*.test.*"],
    // },
    exclude: ["lib", "node_modules"],
  },
});
