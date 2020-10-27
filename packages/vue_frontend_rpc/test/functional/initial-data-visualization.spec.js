import { expect } from "chai";
import { mount } from "@vue/test-utils";
const getPort = require("get-port");

import PersonForm from "@/components/person-form.vue";
import { BackendMock } from "../../local-dev/backend-mock";

describe("The Person Form", () => {
  describe("initial data visualization flow", () => {
    let backendMock;
    let port;

    before(async () => {
      port = await getPort({ port: getPort.makeRange(9000, 10000) });
      // Start an in-memory websocket backend mock for this test.
      backendMock = new BackendMock({
        port: port,
        onFrontendReady: async () => {
          return {
            firstName: "Jane",
            lastName: "Doe",
            country: "HappyLand",
            city: "Dis",
          };
        },
      });
    });

    it("renders the initial data on `onFrontendReady`", async () => {
      const wrapper = await mount(PersonForm);
      // We are invoking the rpc setup logic directly so we can:
      // - Use a custom port.
      // - Enable awaiting for the initialization logic as it seems
      //   we cannot "await" for Vue life-cycle methods (e.g created) in tests.
      await wrapper.vm.setupWsRPC(port);

      // Inspect the frontend successfully invoked `onFrontendReady` and received the expected data back.
      // - Note this is an (almost) productive functional flow, not a pure unit test.
      //   We have a real frontend and backend communicating with RPC over a websocket.
      const firstNameInput = wrapper.find("#firstName");
      expect(firstNameInput.element.value).to.eql("Jane");
      const lastNameInput = wrapper.find("#lastName");
      expect(lastNameInput.element.value).to.eql("Doe");
      const countryInput = wrapper.find("#country");
      expect(countryInput.element.value).to.eql("HappyLand");
      const cityNameInput = wrapper.find("#city");
      expect(cityNameInput.element.value).to.eql("Dis");
    });

    after(() => {
      backendMock.shutdown();
    });
  });
});
