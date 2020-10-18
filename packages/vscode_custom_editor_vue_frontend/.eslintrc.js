/**
 * A different eslint configuration is need for this sub-package as the common config at the
 * root of the mono-repo is only suitable for TypeScript sources.
 */
module.exports = {
  parser: "vue-eslint-parser",
  // Using the smaller vue rule subset (essential) to avoid including formatting rules
  // as formatting as handled by prettier **directly**.
  extends: ["eslint:recommended", "plugin:vue/vue3-essential", "prettier"],
  parserOptions: {
    // TODO: which ecmaVersion matches the babel preset?
    //       -- perhaps align with the typescript target to keep the set of ECMAScript features
    //          standard throughout this mono-repo?
    ecmaVersion: 2017,
  },
  env: {
    mocha: true,
    node: true,
    commonjs: true,
  },
  globals: {
    acquireVsCodeApi: true,
  },
};
