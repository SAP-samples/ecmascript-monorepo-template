<template>
  <div>
    <img alt="Vue logo" height="350" src="./assets/kitty.jpg"/>
    <PersonForm />
  </div>
</template>

<script >
import PersonForm from './components/person-form.vue';

export default {
  name: 'App',
  components: {
    PersonForm
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
