import { expect } from "chai";
import { mount } from "@vue/test-utils";
import PersonForm from "@/components/person-form.vue";
import { backendMock } from "../backend-mock";
import flushPromises from "flush-promises";

describe("The Person Form", () => {
  describe("initial data visualization flow", () => {
    let mockInvokeObject;
    let mountOptions;

    before(async () => {
      mockInvokeObject = backendMock({
        onFrontendReady: async () => {
          return {
            firstName: "Jane",
            lastName: "Doe",
            country: "HappyLand",
            city: "Dis",
          };
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

    it("renders the initial data on `onFrontendReady`", async () => {
      const wrapper = await mount(PersonForm, mountOptions);
      await flushPromises();

      // Inspect the frontend successfully invoked `onFrontendReady` and received the expected data back.
      const firstNameInput = wrapper.find("#firstName");
      expect(firstNameInput.element.value).to.eql("Jane");
      const lastNameInput = wrapper.find("#lastName");
      expect(lastNameInput.element.value).to.eql("Doe");
      const countryInput = wrapper.find("#country");
      expect(countryInput.element.value).to.eql("HappyLand");
      const cityNameInput = wrapper.find("#city");
      expect(cityNameInput.element.value).to.eql("Dis");
    });
  });
});
