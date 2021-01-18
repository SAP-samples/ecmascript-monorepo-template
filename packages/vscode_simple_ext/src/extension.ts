import { ExtensionContext, window } from "vscode";
// Using **sibling** libraries from our monorepo.
import { multiply } from "@ecmascript_monorepo_template/npm_package_javascript_library";
import { add } from "@ecmascript_monorepo_template/npm_package_typescript_library";
import {getLogger, initLogger} from "./logger";

export async function activate(context: ExtensionContext): void {
  await initLogger(context);
  getLogger().info("begin extension activation!");
  try {
    const channel = window.createOutputChannel("vscode-simple_ext");
    channel.appendLine("Hello Cruel World");
    channel.appendLine(`two multiplied by three equals: ${multiply(2, 3)}`);
    channel.appendLine(`two plus three equals: ${add(2, 3)}`);
  }
  catch (e) {
    getLogger().error("failed extension activation", { err: e})
    throw e;
  }
  getLogger().info("end extension activation!");
}
