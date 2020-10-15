const { expect } = require("chai");
const { multiply } = require("../");

describe("The Amazing Calculator Library", () => {
  it("can can multiple two numbers", () => {
    expect(multiply(2, 8)).to.eql(16);
  });
});
