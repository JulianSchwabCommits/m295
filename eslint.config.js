import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: {
      curly: ["error", "all"],

      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "warn",
      "no-debugger": "error",

      "eqeqeq": ["error", "always"], 
      "no-var": "error",
      "prefer-const": "error",

      "object-shorthand": "error",
      "arrow-body-style": ["error", "as-needed"],
      "consistent-return": "error",

      "require-await": "warn",
      "no-return-await": "error",

      "no-duplicate-imports": "error",

      "no-process-exit": "error",
    }
  },
  tseslint.configs.recommended,
]);
