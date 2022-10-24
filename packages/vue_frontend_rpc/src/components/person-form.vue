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
        <input id="city" name="city" v-model="city" class="form-input" />
      </div>
      <button
        id="saveButton"
        class="btn btn-primary btn-block"
        @click="saveDoc"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script>
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
    await this.updateInitialData();
  },

  methods: {
    async updateInitialData() {
      const initialData = await this.rpc.invoke("onFrontendReady", []);
      this.firstName = initialData.firstName;
      this.lastName = initialData.lastName;
      this.country = initialData.country;
      this.city = initialData.city;
    },

    async saveDoc() {
      const dataObj = {
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.country,
        city: this.city,
      };
      console.log(JSON.stringify(dataObj, null, 2));
      await this.rpc.invoke("save", [dataObj]);
    },
  },
};
</script>
