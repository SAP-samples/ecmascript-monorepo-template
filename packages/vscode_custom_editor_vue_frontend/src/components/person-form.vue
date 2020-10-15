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

<script lang="ts">

import { defineComponent } from 'vue';
// @ts-expect-error
import { RpcBrowser } from "@sap-devx/webview-rpc/out.browser/rpc-browser";
// @ts-expect-error
import { RpcBrowserWebSockets } from "@sap-devx/webview-rpc/out.browser/rpc-browser-ws";
import { IRpc } from "@sap-devx/webview-rpc/out.ext/rpc-common"

type PersonDetails = {
  firstName: string,
  lastName: string,
  country: string,
  city: string,
}

let rpc:IRpc

export default defineComponent({
  name: "app",
  data():PersonDetails & {rpc: IRpc} {
    return {
      // @ts-expect-error
      rpc: null,
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
      // @ts-expect-error
      if (typeof window["acquireVsCodeApi"] !== "undefined") {
        // @ts-expect-error
        // eslint-disable-next-line
        window.vscode = acquireVsCodeApi();
        // @ts-expect-error
        this.rpc = new RpcBrowser(window, window.vscode);
      } else {
        const ws = new WebSocket("ws://127.0.0.1:8081");
        ws.onopen = async () => {
          this.rpc = new RpcBrowserWebSockets(ws);
          const apiFunctions = [
            "updateData",
          ];
          for (const methodName of apiFunctions) {
            this.rpc.registerMethod({
              // @ts-expect-error
              func: this[methodName],
              thisArg: this,
              name: methodName
            });
          }

          const initialData = await this.rpc.invoke("onFrontendReady", []);
          await this.updateData(initialData as unknown as PersonDetails);
        };
      }
    },

    async updateData(newData:PersonDetails):Promise<void> {
      this.firstName = newData.firstName;
      this.lastName = newData.lastName
      this.country = newData.country
      this.city = newData.city
    },

    saveDoc():void {
      const dataObj = {
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.country,
        city: this.city,
      }
      console.log(JSON.stringify(dataObj, null, 2));
      this.rpc.invoke("save", [dataObj])
    },
  },
});
</script>