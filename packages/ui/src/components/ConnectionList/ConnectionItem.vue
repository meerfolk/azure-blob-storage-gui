<template>
  <b-card
    class="col-12 m-2 p-0"
    v-bind:class="{ active: isActive && isLoaded }"
  >
    <div class="row">
      <div class="col-8 text-left">
        <b>AccountName:</b>
      </div>
      <div class="col-1" v-if="isActive && !isLoaded">
        <b-icon icon="check" />
      </div>
      <div class="col-1" v-if="isActive && isLoaded">
        <b-icon icon="check-all" variant="success" />
      </div>
      <div class="col-2">
        <connection-menu v-bind:connectionId="connectionId" />
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
import { BCard, BIcon } from 'bootstrap-vue';

import { ConnectionModel } from '../../business/localStorage/connection';

import ConnectionMenu from './ConnectionMenu.vue';

export default Vue.extend({
  name: 'connection-item',
  props: {
    connection: ConnectionModel,
    isActive: Boolean,
    isLoaded: Boolean,
  },
  components: {
    'b-icon': BIcon,
    'b-card': BCard,
    ConnectionMenu,
  },
  computed: {
    connectionId() {
      return this.$props.connection.id;
    },
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
