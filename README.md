[![CircleCI](https://circleci.com/gh/SAP-Samples/ecmascript-monorepo-template.svg?style=svg)](https://circleci.com/gh/SAP-Samples/ecmascript-monorepo-template)
[![Coverage Status](https://coveralls.io/repos/github/SAP-Samples/ecmascript-monorepo-template/badge.svg?branch=main)](https://coveralls.io/github/SAP-Samples/ecmascript-monorepo-template?branch=main)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![DependentBot](https://api.dependabot.com/badges/status?host=github&repo=SAP-Samples/ecmascript-monorepo-template)](https://dependabot.com/)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-Samples/ecmascript-monorepo-template)](https://api.reuse.software/info/github.com/SAP-Samples/ecmascript-monorepo-template)

# ECMAScript Monorepo Template

## Description

An **opinionated** template for [Monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
and best practices for ECMAScript eco-system technologies and projects.

This repo contains several [sub-packages](./packages) each demonstrating
best practices in different ECMAScript related technology / scenario.

## Sub-packages

- [NPM JavaScript Library](./packages/npm_package_javascript_library)
- [NPM TypeScript Library](./packages/npm_package_typescript_library)
- [VSCode Simple Extension](./packages/vscode_simple_ext)
- [Vue Frontend with RPC calls](./packages/vue_frontend_rpc)

## Requirements

- [Yarn 1](https://classic.yarnpkg.com/lang/en/)
- [A Long Term Support version of node.js](https://nodejs.org/en/about/releases/)

## How to use this repository

This repository is meant to be used as a starting point when creating a new monorepo project.
The consumption process is currently a **manual** step by step guide.

### Common Modifications

1. Clone/Copy/[Download][download] this repo.

1. Choose which of the [sub-packages](./packages) templates are relevant to you, and delete the others.
   - Note that some sub-packages depend on other sub-packages.
1. Change the `name` fields of the remaining `packages/*/package.json` files to fit your new project.

1. Delete the **contents** of the README.md files in both the root and the sub-packages.

1. Reset the `version` field in the [lerna.json](./lerna.json) to your project's **initial** version number.

   - Normally `0.1.0` or `0.0.1`.

1. Adjust **coverage thresholds** in the [nyc.config.js](./nyc.config.js).
   - By default, these are set to **100%**.
1. Adjust [CONTRIBUTING.md code coverage section](./CONTRIBUTING.md#code-coverage).
   - To align with the **coverage thresholds** defined in the [nyc.config.js](./nyc.config.js).
   - Modify the `cla-assistant` link in the [CONTRIBUTING.md legal section](./CONTRIBUTING.md#legal).
1. Update the Legal Related files (copyrights/notices/disclaimer).
   - [./.reuse/dep5](./.reuse/dep5)
   - [./LICENSES](./LICENSES)
   - [./LICENSE](./LICENSE)

[download]: https://github.com/SAP-samples/ecmascript-monorepo-template/archive/main.zip

### Modifications dependent on selected sub-packages.

1. If you kept VSCode extension templates, also adjust the `displayName` and `publisher` fields
   in their `package.json` files to fit your new project.
1. If you have not kept any VSCode extensions in your monorepo, remove the [root vscode webpack config](./webpack.config.vscode.base.js).

1. Adjust the [circle-ci config.yml](./.circleci/config.yml).
   There are three possible sections that may need to be removed (and their references):

   - `deploy-npm` --> if your project should not deploy any npm library to npmjs.com.
   - `prepare-vsix` and `deploy-gh-releases` --> if your project does not include VSCode extensions.

1. Adjust the [.eslintrc.js](./.eslintrc.js) configuration.

   - Remove `overrides` sections for no longer relevant file types:
     - `["*.ts"]` --> if your monorepo does not contain any TypeScript projects.
     - `["*.vue"]` --> if your monorepo does not contain any vue frontend projects.
   - Remove `dev-depedencies` from the [root package.json](./package.json)
     - `@typescript-eslint/*` --> if your monorepo does not contain any TypeScript projects.
     - `eslint-plugin-vue` --> if your monorepo does not contain any vue frontend projects.

1. Adjust root TypeScript configurations.

   - Remove sub-project references that no longer exist from [root ./tsconfig.json](./tsconfig.json).
   - If there are no references left in this file, and you do not plan on adding TypeScript projects
     to your monorepo:
     - Delete the [root ./tsconfig.json](./tsconfig.json).
     - Delete the [root ./tsconfig.base.json](./tsconfig.base.json).
     - Remove the `compile` and `compile:watch` scripts from the [root package.json](./packages).

1. Adjust lint-staged configurations.
   - Look for the `lint-staged` field and its keys in the [root package.json](./package.json).
   - Remove file patterns that your repo no longer contains (or is expected to contain).
     - For example if your monorepo does not contain a Vue frontend sub-package, you may remove the `vue` suffixes.

### Final steps and testing dev flows.

In your terminal, navigate to root of the monorepo and:

1. execute `yarn` to update the [yarn.lock](./yarn.lock) file.
1. execute `yarn run ci` to test the full build flow.

You may now commit/push your new mono-repo template project to your new git repo and start coding.

## How to obtain support

Please open an [issue](https://github.com/SAP-samples/ecmascript-monorepo-template/issues) on Github.

## Contributing

Contributions are most welcome.

- Please see the [Contributing Guide](./CONTRIBUTING.md) for docs about development flows.
- Before implementing a major contribution please open an issue to discuss your contribution first.
- Last but not least, please consider how your changes would affect **both** the:
  - Root level dev flows (e.g needed adjustment for linting/formatting).
  - Root level [usage/consumption instructions](./README.md#how-to-use-this-repository).

## License

Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
