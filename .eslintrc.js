module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "prettier",
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
};
