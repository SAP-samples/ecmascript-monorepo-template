import { expect } from "chai";
import { mount } from "@vue/test-utils";
const pDefer = require("p-defer");
const getPort = require("get-port");
import PersonForm from "@/components/person-form.vue";
import { BackendMock } from "../../local-dev/backend-mock";

describe("The Person Form", () => {
  describe("saving new data flow", () => {
    let backendMock;
    let port;
    // Our backend and frontend both run under the same node.js process in this test.
    // However as they communicate with RPC over websockets they don't share the same "promise chains".
    // We use a deferred promise to resolve async waiting during the tests.
    // Other approaches are documented here: https://vue-test-utils.vuejs.org/guides/#testing-asynchronous-behavior
    let saveDeferred = pDefer();

    before(async () => {
      port = await getPort({ port: getPort.makeRange(9000, 10000) });
      backendMock = new BackendMock({
        port: port,
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
    });

    it("passes new data to be saved on button click", async () => {
      const wrapper = await mount(PersonForm);
      // We are invoking the rpc setup logic directly so we can:
      // - Use a custom port.
      // - Enable awaiting for the initialization logic as it seems
      //   we cannot "await" for Vue life-cycle methods (e.g created) in tests.
      await wrapper.vm.setupWsRPC(port);
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

    after(() => {
      backendMock.shutdown();
    });
  });
});
