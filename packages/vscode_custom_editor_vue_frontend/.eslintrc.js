/**
 * A different eslint configuration is need for this sub-package as the common config at the
 * root of the mono-repo is only suitable for TypeScript sources.
 */
module.exports = {
  parser: "vue-eslint-parser",
  // Using the smaller vue rule subset (essential) to avoid including formatting rules
  // as formatting as handled by prettier **directly**.
  extends: ["eslint:recommended", "plugin:vue/essential", "prettier"],
  parserOptions: {
    // The `ecmaVersion` should align to the supported features of our target runtimes (browsers / nodejs / others)
    // Consult with: https://kangax.github.io/compat-table/es2016plus/
    // This package is targeted towards only modern nodejs versions.
    ecmaVersion: 2018,
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
