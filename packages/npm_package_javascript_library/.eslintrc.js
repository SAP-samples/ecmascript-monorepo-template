/**
 * A new eslint configuration is need for this sub-package as the common config at the
 * root of the mono-repo is only suitable for TypeScript sources.
 */
module.exports = {
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    // same as `"target": "es2017"`
    ecmaVersion: 2017,
  },
  env: {
    commonjs: true,
    mocha: true,
  },
};
