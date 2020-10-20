const baseNycConfig = require("../../nyc.config");

module.exports = {
  ...baseNycConfig,
  exclude: ["test/**", "local-dev/**"],
  // https://github.com/vuejs/vue-cli/issues/1363#issuecomment-609913867
  extension: [".js", ".vue"],
  instrument: false,
  sourceMap: false,
};
