/**
 * This file manages the logger's state.
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { ok } from "assert";
import { ExtensionContext, window, workspace } from "vscode";
import { IChildLogger, IVSCodeExtLogger } from "@vscode-logging/types";
import { configureLogger, NOOP_LOGGER } from "@vscode-logging/wrapper";
import { LOGGING_LEVEL_PROP, SOURCE_LOCATION_PROP} from "./constants"

// On file load we initialize our logger to `NOOP_LOGGER`
// this is done because the "real" logger cannot be initialized during file load.
// only once the `activate` function has been called in extension.ts
// as the `ExtensionContext` argument to `activate` contains the required `logPath`
let loggerImpel: IVSCodeExtLogger = NOOP_LOGGER;

export function getLogger(): IChildLogger {
  return loggerImpel;
}

function setLogger(newLogger: IVSCodeExtLogger): void {
  loggerImpel = newLogger;
}

export function initLogger(context: ExtensionContext): void {
  const meta = JSON.parse(
    readFileSync(resolve(context.extensionPath, "package.json"), "utf8")
  );

  const extLogger = configureLogger({
    extName: meta.displayName,
    logPath: context.logPath,
    logOutputChannel: window.createOutputChannel(meta.displayName),
    // set to `true` if you also want your VSCode extension to log to the console.
    logConsole: false,
    loggingLevelProp: LOGGING_LEVEL_PROP,
    sourceLocationProp: SOURCE_LOCATION_PROP,
    subscriptions: context.subscriptions,
    onDidChangeConfiguration: workspace.onDidChangeConfiguration,
    getConfiguration: workspace.getConfiguration
  });

  setLogger(extLogger);
}
