<template>
  <b-container>
    <create-connection-dialog />

    <b-row>
      <b-button @click="$bvModal.show('create-connection-dialog')" class="m-3">
        Add connection
      </b-button>
    </b-row>

    <b-row v-for="item in items" :key="item.accountName">
      <connection-item
        v-bind:connection="item"
        v-bind:isActive="isActive(item.id)"
        v-bind:isLoaded="isLoaded"
      />
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

import CreateConnectionDialog from './CreateConnectionDialog.vue';
import ConnectionItem from './ConnectionItem.vue';

import store from '../../store';
import { ConnectionModel } from '../../business/localStorage/connection';

export default Vue.extend({
  store,
  components: {
    'create-connection-dialog': CreateConnectionDialog,
    ConnectionItem,
  },
  computed: {
    items() {
      return this.$store.state.connectionList;
    },
    isLoaded() {
      return this.$store.state.blobList !== null;
    },
  },
  methods: {
    isActive(id: string) {
      return this.$store.state.currentConnection.id === id;
    },
  },
  mounted() {
    this.$store.dispatch('getConnectionList');
  },
});
</script>
