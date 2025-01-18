import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import tseslint from "typescript-eslint";
import type { Config } from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/*.snap", "coverage", "lib", "node_modules", "pnpm-lock.yaml"],
  },
  eslint.configs.recommended,
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ["*.config.*s"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    extends: [vitest.configs.recommended],
    files: ["**/*.test.*"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
) satisfies Config;
