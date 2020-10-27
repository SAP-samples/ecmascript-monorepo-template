module.exports = {
  // Common settings for JS Files.
  extends: [
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    // Disables all formatting related rules as formatting is handled by prettier, not eslint.
    "prettier",
  ],
  parserOptions: {
    // The `ecmaVersion` should align to the supported features of our target runtimes (browsers / nodejs / others)
    // Consult with: https://kangax.github.io/compat-table/es2016plus/
    ecmaVersion: 2017,
  },
  env: {
    commonjs: true,
    mocha: true,
    node: true,
  },
  rules: {
    "eslint-comments/require-description": ["error", { ignore: [] }],
  },
  overrides: [
    {
      // For pure-java script sub-packages and general scripts (in any package).
      files: ["*.js"],
    },
    {
      // For sub-packages using TypeScript (libraries/VSCode Exts) && TypeScript definitions (d.ts)
      files: ["*.ts"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "@typescript-eslint/no-use-before-define": [
          "error",
          // These can be safely used before they are defined due to function hoisting in EcmaScript
          { functions: false, classes: false },
        ],
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            // We only allow ts-expect-error comments to enforce removal
            // of outdated suppression comments when the underlying issue has been resolved.
            // https://devblogs.microsoft.com/typescript/announcing-typescript-3-9/#what-about-ts-ignore
            "ts-expect-error": "allow-with-description",
            "ts-ignore": true,
            "ts-nocheck": true,
            "ts-check": true,
          },
        ],
      },
    },
    {
      // For Vue frontend sub-packages.
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      // Using the smaller vue rule subset (essential) to avoid including formatting rules
      // as formatting as handled by prettier **directly**.
      extends: ["plugin:vue/essential"],
    },
  ],
};
