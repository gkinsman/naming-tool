<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-container>
        <v-layout column justify-center>
          <ServiceName @serviceAdded="addService"></ServiceName>
        </v-layout>
        <v-layout mt-4 column justify-center>
          <v-flex>
            <v-card>
              <v-card-text>
                <span class="headline">
                  Services
                </span>
              </v-card-text>
              <v-card-text v-for="(serviceGroup, key) in groupedServices" :key="key">
                <span class="title">{{serviceGroup[0].discriminator.longName}}</span>
                <v-flex v-for="s in serviceGroup">
                  <span class="subheading">{{s.name}}</span>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Lifecycle, Watch} from "av-ts";
import ServiceName from "./ServiceName.vue";
import { Service } from "../services/service";
import groupBy from "lodash-es/groupBy";
import ServiceTypes from "../services/service-types";

@Component({
  components: {
    ServiceName
  }
})
export default class HelloWorld extends Vue {
  @Lifecycle
    mounted() {
      var url = new URL(window.location.href);
      var c = url.searchParams.get("s");
      if(!c) return;
      console.log(c);
      var decoded = JSON.parse(atob(c));
      console.log(decoded);
      this.services = <Service[]>decoded;
  }

  services: Service[] = [
    new Service("test", "report", ServiceTypes[2]),
    new Service("test", "report", ServiceTypes[2]),
    new Service("test", "report", ServiceTypes[1]),
    new Service("test", "report", ServiceTypes[10])
  ];

  addService(service: Service) {
    this.services.push(service);
    this.updateUrl();
  }

  get groupedServices() {
    var r = groupBy(this.services, s => s.discriminator.shortName);
    return r;
  }

  updateUrl() {
    var str = JSON.stringify(this.services);
    var base64 = btoa(str);
    window.location.search = `s=${base64}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
