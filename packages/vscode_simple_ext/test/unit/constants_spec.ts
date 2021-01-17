import { resolve } from "path";
import { readFileSync } from "fs";
import { expect } from "chai";
import { LOGGING_LEVEL_PROP, SOURCE_LOCATION_PROP } from "../../src/constants";

describe("The simple VSCode Ext constants", () => {
  context("vscode contribution metadata", () => {
    let meta: Record<string, any>;

    before(() => {
      // this file will be complied to `./dist/test/unit` folder so an extra ".." is needed.
      const pkgJsonPath = resolve(__dirname, "..", "..", "..", "package.json");
      meta = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
    });

    it("exposes a vscode configuration **key** with `LOGGING_LEVEL_PROP`'s value  ", () => {
      const configProps = meta?.contributes?.configuration?.properties;
      expect(configProps).to.have.members([LOGGING_LEVEL_PROP]);
    });

    it("exposes a vscode configuration **key** with `SOURCE_LOCATION_PROP`'s value  ", () => {
      const configProps = meta?.contributes?.configuration?.properties;
      expect(configProps).to.have.members([SOURCE_LOCATION_PROP]);
    });
  });
});
