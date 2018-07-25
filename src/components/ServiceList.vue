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
                <v-layout justify-space-between>
                <span class="headline">
                  Services
                </span>
                  <v-btn class="align-end" color="error" @click="clearServices">Clear All</v-btn>
                </v-layout>
              </v-card-text>
             
              <v-card-text v-for="(serviceGroup, key) in groupedServices" :key="key">
                <span class="title">{{serviceGroup[0].discriminator.longName}}</span>
                <v-flex v-for="s in serviceGroup" :key="s.name">
                  <v-layout>
                    <v-icon class="delete-icon pr-1" @click="removeService(s)">mdi-delete</v-icon>
                    <span class="subheading">{{s.name}}</span>
                  </v-layout>
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
import { Component, Lifecycle, Watch } from "av-ts";
import ServiceName from "./ServiceName.vue";
import { Service } from "../services/service";
import groupBy from "lodash-es/groupBy";
import ServiceTypes from "../services/service-types";

@Component({
  components: {
    ServiceName
  }
})
export default class ServiceList extends Vue {
  @Lifecycle
  mounted() {
    var url = new URL(window.location.href);
    var c = url.searchParams.get("s");
    if (!c) return;
    var decoded = JSON.parse(atob(c));
    this.services.splice(0);
    for (var service of decoded as Service[]) {
      this.services.push(
        new Service(service.area, service.noun, service.discriminator)
      );
    }
  }

  services: Service[] = [];

  clearServices() {
    this.services.splice(0);
    this.updateUrl();
  }

  removeService(serviceToRemove: Service) {
    this.services = this.services.filter(s => s !== serviceToRemove);
  }

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

    var newUrl = `${window.location.pathname}?s=${base64}`;
    window.history.pushState(null, undefined, newUrl);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

.delete-icon:hover {
  color: #E53935;
}
</style>
