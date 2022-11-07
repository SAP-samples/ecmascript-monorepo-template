const WebSocket = require("ws");
const { defaults } = require("lodash");
const {
  RpcExtensionWebSockets,
} = require("@sap-devx/webview-rpc/out.ext/rpc-extension-ws");

const ASYNC_NOOP = async () => {};
// List of function names that represent backend APIs.
const backendFuncNames = ["onFrontendReady", "save"];

/**
 * A Backend mock using WebSockets.
 * Note that this class does not include the RPC end points logic.
 * Those can be passed via the constructors `opts` to implement different types of backend mocks, e.g:
 * - In Memory mock for testing.
 * - Mock using a real (hard-coded path) file for local "playground".
 */
class BackendMock {
  /**
   * @param [opts] {object}
   * @param [opts.port] {number}
   * @param [opts.save] {Function}
   * @param [opts.onFrontendReady] {Function}
   */
  constructor(opts) {
    const initObject = {
      port: 8081,
    };
    backendFuncNames.forEach((funcName) => {
      initObject[funcName] = ASYNC_NOOP;
    });
    const actualOpts = defaults(opts, initObject);

    let rpc;
    this.wss = new WebSocket.Server({ port: actualOpts.port }, () => {
      console.log("started websocket server");
    });

    this.wss.on("listening", () => {
      console.log(`listening to websocket on port ${actualOpts.port}`);
    });

    this.wss.on("error", (error) => {
      console.error(error);
    });

    this.wss.on("connection", (ws, req) => {
      const remoteAddress = req.socket.remoteAddress;
      console.log(`new ws connection from: ${remoteAddress}`);
      rpc = new RpcExtensionWebSockets(ws);
      backendFuncNames.forEach((funcName) => {
        rpc.registerMethod({
          func: actualOpts[funcName],
          thisArg: null,
        });
      });
    });
  }

  shutdown() {
    this.wss.close();
  }
}

module.exports = {
  BackendMock,
};
