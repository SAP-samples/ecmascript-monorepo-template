/**
 * This file is responsible for collecting and exporting all the public APIs.
 * The interface of the exported object should match the APIs defined in `../api.d.ts`
 * TypeScript definitions.
 */
const { subtract } = require("./subtract");
const { multiply } = require("./multiply");

module.exports = {
  subtract,
  multiply,
};
