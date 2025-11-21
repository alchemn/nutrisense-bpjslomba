
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { // Override for eslint.config.js itself - must be at the beginning
    files: ["eslint.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
    // Ensure this file is not parsed with typescript-eslint's parserOptions.project
    languageOptions: {
      parser: tseslint.parser, // Still setting parser, but no project for it
      parserOptions: {
        // No project config here to avoid the parsing error
      }
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        console: "readonly", // explicitly add console as a global
        // process: "readonly", // process is usually available in node environment
      },
      // Removed parserOptions.project from here to avoid conflicts with non-TS files
    },
    files: ["**/*.{js,mjs,cjs,ts}", "!eslint.config.js"], // Exclude eslint.config.js
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, // This will apply parserOptions.project to relevant TS files
  {
    files: ["src/generated/**/*.{js,mjs,cjs,ts}"], // Target generated files
    languageOptions: {
      parser: tseslint.parser, // Explicitly set parser, though rules are turned off
      parserOptions: {
        project: null, // Still trying to disable project services.
      }
    },
    rules: {
      // Turn off all rules for generated files
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-useless-escape": "off",
      "no-empty": "off",
      "no-redeclare": "off",
      "no-cond-assign": "off",
      "no-prototype-builtins": "off",
      "no-unused-private-class-members": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-unsafe-finally": "off",
      "getter-return": "off",
      "no-constant-binary-expression": "off",
      "no-control-regex": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off", // New: Disable this rule
    }
  }
];
