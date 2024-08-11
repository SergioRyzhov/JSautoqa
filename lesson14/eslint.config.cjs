const globals = require("globals");
const js = require("@eslint/js");
const ts = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const jestPlugin = require("eslint-plugin-jest");

module.exports = [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.jest,  // Add Jest globals here
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      jest: jestPlugin,  // Add the Jest plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,  // Add Jest recommended rules
      semi: ["warn", "always"],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-require-imports": "error",  // Enforce no require in TS
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    ignores: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/temp.js",
        "config/*",
        "*.js",
        "*.cjs"
    ],
  },
];