<template>
  <b-container>
    <create-connection-dialog />

    <b-row>
      <b-button @click="$bvModal.show('create-connection-dialog')" class="m-3">Add connection</b-button>
    </b-row>

    <b-row v-for="item in items" :key="item.accountName">
      <connection-item v-bind:account="item.accountName" v-bind:container="item.containerName" />
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
    'connection-item': ConnectionItem,
  },
  data() {
    return {
      connections: Array<ConnectionModel>(),
    }
  },
  computed: {
    items() {
      return this.$store.state.connectionList;
    }
  },
  mounted() {
    this.$store.dispatch('getConnectionList');
  }
});
</script>
