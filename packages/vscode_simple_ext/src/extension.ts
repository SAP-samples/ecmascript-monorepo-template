import { window } from "vscode";
// Using **sibling** libraries from our monorepo.
import { multiply } from "@ecmascript_monorepo_template/npm_package_javascript_library";
import { add } from "@ecmascript_monorepo_template/npm_package_typescript_library";

export async function activate(): Promise<void> {
  const channel = window.createOutputChannel("vscode-simple_ext");
  channel.appendLine("Hello Cruel World");
  channel.appendLine(`two multiplied by three equals: ${multiply(2, 3)}`);
  channel.appendLine(`two plus three equals: ${add(2, 3)}`);
}
