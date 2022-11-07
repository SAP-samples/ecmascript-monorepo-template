import { expect } from "chai";
import { mount } from "@vue/test-utils";
const pDefer = require("p-defer");
import PersonForm from "@/components/person-form.vue";
import { backendMock } from "../backend-mock";
import flushPromises from "flush-promises";

describe("The Person Form", () => {
  describe("saving new data flow", () => {
    let mockInvokeObject;
    let mountOptions;
    // Our backend and frontend both run under the same node.js process in this test.
    // However as they communicate with RPC over websockets they don't share the same "promise chains".
    // We use a deferred promise to resolve async waiting during the tests.
    // Other approaches are documented here: https://vue-test-utils.vuejs.org/guides/#testing-asynchronous-behavior
    let saveDeferred = pDefer();

    before(async () => {
      mockInvokeObject = backendMock({
        async onFrontendReady() {
          return {
            firstName: "Jane",
            lastName: "Doe",
            country: "HappyLand",
            city: "Dis",
          };
        },
        async save(newData) {
          try {
            expect(newData).to.deep.equal({
              firstName: "Jane",
              lastName: "Doe",
              country: "SadLand",
              city: "Dis",
            });
            saveDeferred.resolve();
          } catch (e) {
            saveDeferred.reject(e);
          }
        },
      });

      mountOptions = {
        mocks: {
          rpc: {
            invoke: mockInvokeObject,
          },
        },
      };
    });

    it("passes new data to be saved on button click", async () => {
      const wrapper = await mount(PersonForm, mountOptions);
      await flushPromises();

      const countryInput = wrapper.find("#country");
      expect(countryInput.element.value).to.eql("HappyLand");

      await countryInput.setValue("SadLand");
      const saveButton = wrapper.find("#saveButton");
      saveButton.trigger("click");
      //   Inspect the backend successfully received the expected data on `save` rpc call.
      // - Note this is an (almost) productive functional flow, not a pure unit test.
      //   We have a real frontend and backend communicating with RPC over a websocket.
      await saveDeferred.promise;
    });
  });
});
