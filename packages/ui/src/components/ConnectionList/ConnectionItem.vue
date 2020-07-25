<template>
  <b-card class="col-12 m-2 p-0" v-bind:class="{ active: isActive && isLoaded }">
    <div class="row">
      <div class="col-10 text-left">
        <b>AccountName:</b>
      </div>
      <div class="col-2" v-if="isActive && !isLoaded">
        <b-icon icon="check" />
      </div>
      <div class="col-2" v-if="isActive && isLoaded">
        <b-icon icon="check-all" variant="success" />
      </div>
      <div class="col-12 text-left">
        {{ connection.accountName }}
      </div>
    </div>

    <hr />

    <div class="row">
      <div class="col-12 text-left">
        <b>ContainerName:</b>
      </div>
      <div class="col-12 text-left">
        {{ connection.containerName }}
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-6" v-if="!isActive">
        <b-button @click="activate()" variant="success">
          Activate
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { BIcon } from 'bootstrap-vue';

import { ConnectionModel } from '../../business/localStorage/connection';

import store from '../../store';

export default Vue.extend({
  store,
  props: {
    connection: ConnectionModel,
    account: String,
    container: String,
    isActive: Boolean,
    isLoaded: Boolean,
  },
  components: {
    'b-icon': BIcon,
  },
  methods: {
    activate() {
      this.$store.dispatch('changeCurrentConnection', this.connection.id);
    },
  },
});
</script>

<style scoped>
.active {
  background-color: #c4f2b5;
}
</style>
