import { expect } from "chai";
import { add } from "../src/api";

describe("The Amazing Calculator Library", () => {
  it("can can add two numbers", () => {
    expect(add(5, 2)).to.eql(7);
  });
});
