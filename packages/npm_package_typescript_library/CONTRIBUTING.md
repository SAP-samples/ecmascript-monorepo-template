# Contribution Guide

Please see the top-level [Contribution Guide](../../CONTRIBUTING.md).

## Avoiding automatic generation of the public API definitions

Even though the TypeScript compilation process automagically generates TypeScript definitions files (`\*.d.ts).
This package enforces managing **"by hand"** of the **public APIs**.

- see the [./api.d.ts](./api.d.ts) file.

This **separation of concerns** (API vs implementation) is done to:

- Force **explicitly** managing the life-cycle of the library, every change in [./api.d.ts](./api.d.ts)
  should force evaluation if there is an API change (possible minor/major change under semantic versioning).
- Promote higher quality standards for the public API versus the internal implementation.

## Automated Checks the public APIs match the runtime implementation

The TypeScript compiler is used to ensure the declared **public API** definitions,
and the actual implementation are **fully aligned** (bi-directional).

This is achieved by leveraging TypeScripts [structured type system](https://www.typescriptlang.org/docs/handbook/type-compatibility.html),
generic constraints and tuple types.

- See [./test/implementation-matches-public-api.ts](./test/implementation-matches-public-api.ts) for the actual source code.
