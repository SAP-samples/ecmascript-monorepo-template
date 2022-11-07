import Vue from "vue";
import App from "./App.vue";

import { RpcBrowser } from "@sap-devx/webview-rpc/out.browser/rpc-browser";
import { RpcBrowserWebSockets } from "@sap-devx/webview-rpc/out.browser/rpc-browser-ws";

Vue.config.productionTip = false;

function isInVsCode() {
  // @ts-expect-error: acquireVsCodeApi API will exist when running in webview in VSCode
  return typeof acquireVsCodeApi !== "undefined";
}

async function setupVSCodeRpc() {
  // `acquireVsCodeApi()` can only be invoked once, so we are "saving" it's result
  // on the `window` object in case we will need it again.
  window.vscode = acquireVsCodeApi();
  Vue.prototype.rpc = new RpcBrowser(window, window.vscode);
}

/**
 * This method may be called directly from tests with a **custom** port.
 */
export async function setupWsRPC(port) {
  const ws = new window.WebSocket(`ws://127.0.0.1:${port}`);
  return new Promise((resolve, reject) => {
    ws.onopen = async () => {
      try {
        Vue.prototype.rpc = new RpcBrowserWebSockets(ws);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
  });
}

async function setupRpc() {
  if (isInVsCode()) {
    await setupVSCodeRpc();
  }
  // For development of VueJS project only without VSCode Extension as 'backend':
  else {
    // Local Development Flow
    // Assumes a WS server is already up and waiting.
    await setupWsRPC(8081);
  }
}

async function startup() {
  await setupRpc();
  new Vue({
    render: (h) => h(App),
  }).$mount("#app");
}
startup();
