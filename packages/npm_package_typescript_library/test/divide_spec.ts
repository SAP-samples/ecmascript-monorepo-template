import { expect } from "chai";
import { divide } from "../src/api";

describe("The Amazing Calculator Library", () => {
  it("can can divide two numbers", () => {
    expect(divide(8, 2)).to.eql(4);
  });
});
