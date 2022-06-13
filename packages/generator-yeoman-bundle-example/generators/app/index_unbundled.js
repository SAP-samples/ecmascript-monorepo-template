"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Welcome to the exquisite ${chalk.red(
          "generator-yeoman-bundle-example"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "shouldCopy",
        message: "Would you like to copy the `dummyfile.txt?",
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    if (this.props.shouldCopy === true) {
      this.fs.copy(
        this.templatePath("dummyfile.txt"),
        this.destinationPath("dummyfile.txt")
      );
    }
  }
};
