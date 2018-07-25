<template>
  <v-app>
    <v-toolbar app class="title-toolbar">
      <v-toolbar-title class="white--text" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Home from "./views/Home.vue";
import Component from "vue-class-component";
import Vue from 'vue';

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {
  title: string = "Ticketer Naming Tool";
}
</script>
<style scoped>
  .title-toolbar {
    background-color: #133158;
  }
</style>

