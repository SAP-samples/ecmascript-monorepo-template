const { expect } = require("chai");
const { subtract } = require("../");

describe("The Amazing Calculator Library", () => {
  it("can can subtract two numbers", () => {
    expect(subtract(5, 2)).to.eql(3);
  });
});
