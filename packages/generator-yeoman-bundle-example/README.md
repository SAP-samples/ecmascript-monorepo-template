# generator-yeoman-bundle-example

This package demonstrates bundling of a Yeoman generator.
This can be useful if the generator installation performance is important.

## Tools used

- [ESBuild](https://esbuild.github.io/)
- [Patch Package](https://github.com/ds300/patch-package)
- [Yarn's nohoist](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/)

## Highlights

1. Entry point ([index_unbundled.js]()) of the un-bundled generator.
2. `esbuild` bundling [script](https://github.com/SAP-samples/ecmascript-monorepo-template/blob/a44d932196d619ff05f0100c12236f962ba32d38/packages/generator-yeoman-bundle-example/package.json#L26).
3. dependencies patching [script](https://github.com/SAP-samples/ecmascript-monorepo-template/blob/a44d932196d619ff05f0100c12236f962ba32d38/packages/generator-yeoman-bundle-example/package.json#L25).
   - [patches directory](https://github.com/SAP-samples/ecmascript-monorepo-template/tree/main/packages/generator-yeoman-bundle-example/patches)
4. `yarn` nohoist [config](https://github.com/SAP-samples/ecmascript-monorepo-template/blob/a44d932196d619ff05f0100c12236f962ba32d38/package.json#L8-L11)
5. [local run script](https://github.com/SAP-samples/ecmascript-monorepo-template/blob/a44d932196d619ff05f0100c12236f962ba32d38/packages/generator-yeoman-bundle-example/package.json#L27) for manual testing / debugging

## Notes

1. The `dependencies` section has been merged into `devDependencies` to avoid any redundant packages installations
   by consumers as everything is **bundled**.

2. Different npm clients (npm v6 / npm v8 / yarn / pnpm) handle peer dependencies differently.
   This is why the `yeoman-environment` which is a peerDependency of `yeoman-generator`
   is excluded as "external" in the esbuild command.
   As we expect `yeoman-environment` to be provided by the **global** yeoman package.

3. Different npm clients also behave differently in terms of hoisting dependencies in a monorepo.
   Which can break the patching of dependencies which depend on a **pre-known relative** path.
   This is why the `yarn` nohoist config is used to disable all hoisting in this sub-package,
   otherwise the path to the transitive `shelljs` package (which needs to be patched) will not
   be deterministic.
