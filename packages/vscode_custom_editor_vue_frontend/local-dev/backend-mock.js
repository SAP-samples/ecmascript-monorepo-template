const WebSocket = require("ws");
const { defaults } = require("lodash");
const {
  RpcExtensionWebSockets,
} = require("@sap-devx/webview-rpc/out.ext/rpc-extension-ws");

const ASYNC_NOOP = async () => {};

class BackendMock {
  /**
   * @param [opts] {object}
   * @param [opts.port] {number}
   * @param [opts.save] {Function}
   * @param [opts.onFrontendReady] {Function}
   */
  constructor(opts) {
    const actualOpts = defaults(opts, {
      port: 8081,
      save: ASYNC_NOOP,
      onFrontendReady: ASYNC_NOOP,
    });

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

      rpc.registerMethod({
        name: "onFrontendReady",
        func: async () => {
          console.log(`Frontend is ready!`);
          return actualOpts.onFrontendReady();
        },
        thisArg: null,
      });

      rpc.registerMethod({
        name: "save",
        func: async (newEditorFileObject) => {
          console.log(`Saving updated contents!`);
          return actualOpts.save(newEditorFileObject);
        },
        thisArg: null,
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
