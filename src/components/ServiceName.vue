<template>
    <v-card>
        <v-form>
            <v-container>
                <v-layout row justify-space-around align-center>
                    <v-flex xs12 md4>
                        <v-text-field browser-autocomplete="off" v-model="area" required label="Area (e.g dev/test/live)">
                        </v-text-field>
                    </v-flex>

                    <v-flex xs12 md4>
                        <v-combobox
                                v-model="selectedDiscriminator"
                                :items="serviceTypes"
                                label="Select a service type"
                                item-text="longName">
                        </v-combobox>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field browser-autocomplete="off" v-model="noun" required label="Noun/purpose">
                        </v-text-field>
                    </v-flex>
                    <v-btn @click="add()" :disabled="!canAdd()" color="info">Add</v-btn>

                </v-layout>
            </v-container>
        </v-form>
        <v-layout justify-center align-center pb-3>
            <span class="title"> tktr-{{area}}-{{(discriminator||{}).shortName}}-{{noun}}</span>
        </v-layout>
    </v-card>

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "av-ts";
import ServiceTypes, { ServiceType } from "../services/service-types";
import { Service } from "../services/service";

@Component
export default class ServiceName extends Vue {
  area: string = "";
  discriminator: ServiceType = null;
  noun: string = "";
  selectedDiscriminator: ServiceTypes = null;

  @Watch("selectedDiscriminator")
  handler(newVal) {
      if(!newVal) return;
    if (newVal.shortName) this.discriminator = newVal;
    else this.discriminator = {longName: newVal, shortName: newVal};
  }

  get serviceTypes() {
    return ServiceTypes;
  }

  canAdd() {
    return this.area !== "" && !!this.discriminator && this.noun !== "";
  }

  add() {
    this.$emit(
      "serviceAdded",
      new Service(this.area, this.noun, this.discriminator)
    );
    this.area = "";
    this.noun = "";
    this.discriminator = null;
    this.selectedDiscriminator = null;
  }
}
</script>
