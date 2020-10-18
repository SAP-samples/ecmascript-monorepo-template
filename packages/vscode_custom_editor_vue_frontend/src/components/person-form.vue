<template>
  <div id="app">
    <form class="login-form">
      <h2>Person Details</h2>
      <div class="form-group">
        <label class="form-label">firstName</label>
        <input
            id="firstName"
            name="firstName"
            v-model="firstName"
            class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">lastName</label>
        <input
            id="lastName"
            name="lastName"
            v-model="lastName"
            class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">country</label>
        <input
            id="country"
            name="country"
            v-model="country"
            class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">city</label>
        <input
            id="city"
            name="city"
            v-model="city"
            class="form-input"
        />
      </div>
      <button class="btn btn-primary btn-block" v-on:click="saveDoc">Save</button>
    </form>
  </div>
</template>

<script>

import { RpcBrowser } from "@sap-devx/webview-rpc/out.browser/rpc-browser";
import { RpcBrowserWebSockets } from "@sap-devx/webview-rpc/out.browser/rpc-browser-ws";

let rpc

export default {
  name: "PersonForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
    };
  },

  async created() {
    this.setupRpc();
  },

  methods: {
    setupRpc() {
      if (typeof window["acquireVsCodeApi"] !== "undefined") {
        // eslint-disable-next-line
        // TODO: comment `acquireVsCodeApi` can only be called once.
        window.vscode = acquireVsCodeApi();
        // TODO: why does this constructor needs to be passed the window object?
        rpc = new RpcBrowser(window, window.vscode);
      } else {
        const ws = new WebSocket("ws://127.0.0.1:8081");
        ws.onopen = async () => {
          rpc = new RpcBrowserWebSockets(ws);
          const apiFunctions = [
            "updateData",
          ];
          for (const methodName of apiFunctions) {
            rpc.registerMethod({
              func: this[methodName],
              thisArg: this,
              name: methodName
            });
          }

          const initialData = await rpc.invoke("onFrontendReady", []);
          await this.updateData(initialData);
        };
      }
    },

    async updateData(newData) {
      this.firstName = newData.firstName;
      this.lastName = newData.lastName
      this.country = newData.country
      this.city = newData.city
    },

    saveDoc() {
      const dataObj = {
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.country,
        city: this.city,
      }
      console.log(JSON.stringify(dataObj, null, 2));
      rpc.invoke("save", [dataObj])
    }
  }
}
</script>