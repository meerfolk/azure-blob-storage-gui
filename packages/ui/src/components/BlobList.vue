<template>
  <b-table :items="items" :fields="fields" striped hover></b-table>
</template>

<script lang="ts">
import Vue from 'vue';

import store from '../store';

export default Vue.extend({
  name: 'blob-list',
  computed: {
    items() {
      return this.$store.state.blobList;
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
          class: 'text-left',
        },
      ],
    };
  },
  store,
});
</script>
