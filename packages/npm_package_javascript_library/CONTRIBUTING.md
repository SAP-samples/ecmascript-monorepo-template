# Contribution Guide

Please see the top-level [Contribution Guide](../../CONTRIBUTING.md).

## Public Library TypeScript API Definitions

Even though this is a library implemented using **JavaScript**
The **exported APIs** of this library are defined in a **TypeScript** definitions file `*.d.ts`

- [./api.d.ts](./api.d.ts).

Note that at **runtime** the library's actual exported object should match the **design time** definitions.
This alignment is **not automatically** validated and must be ensured **manually** by the developers of the library.

## Type Checking JavaScript Code

This sub-package utilizes the TypeScript compiler to inspect JavaScript source files.

- Note the [usage of JSDocs](./lib/multiply.js) in the JavaScript sources to **link** the implementation
  with the TypeScript definitions.

See the [official documentation on JS + TS](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) for more info.
