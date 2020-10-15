const WebSocket = require("ws");
const {
  RpcExtensionWebSockets,
} = require("@sap-devx/webview-rpc/out.ext/rpc-extension-ws");
const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const editorFilePath = resolve(__dirname, "./person-details.json");
const editorFileText = readFileSync(editorFilePath, "utf-8");
let editorFileObject = JSON.parse(editorFileText);

let rpc;
const port = 8081;
const wss = new WebSocket.Server({ port: port }, () => {
  console.log("started websocket server");
});

wss.on("listening", () => {
  console.log(`listening to websocket on port ${port}`);
});

wss.on("error", (error) => {
  console.error(error);
});

wss.on("connection", (ws, req) => {
  const remoteAddress = req.socket.remoteAddress;
  console.log(`new ws connection from: ${remoteAddress}`);
  rpc = new RpcExtensionWebSockets(ws);

  rpc.registerMethod({
    name: "onFrontendReady",
    func: async () => {
      console.log(`Frontend is ready!`);
      return editorFileObject;
    },
    thisArg: null,
  });

  rpc.registerMethod({
    name: "save",
    func: async (newEditorFileObject) => {
      console.log(`Saving updated contents to file!`);
      writeFileSync(
        editorFilePath,
        JSON.stringify(newEditorFileObject, null, 2),
        "utf-8"
      );
      editorFileObject = newEditorFileObject;
    },
    thisArg: null,
  });
});
