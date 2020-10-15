// A separate config & execution is needed to avoid conflicts with @eslint-typescript setup.
module.exports = {
  parser: "vue-eslint-parser",
  // Using the smaller vue rule subset (essential) to avoid including formatting rules
  // as formatting as handled by prettier **directly**.
  extends: ["plugin:vue/vue3-essential"],
  parserOptions: {
    // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
    parser: "@typescript-eslint/parser",
  },
};
