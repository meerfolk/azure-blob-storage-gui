<template>
  <b-dropdown size="sm" variant="link">
    <template #button-content>
      <b-icon icon="gear" size="20" />
    </template>
    <b-dropdown-item @click="remove()" variant="danger">Delete</b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { BIcon, BDropdown, BDropdownItem } from 'bootstrap-vue';

export default Vue.extend({
  name: 'connection-menu',
  components: {
    'b-icon': BIcon,
    'b-dropdown': BDropdown,
    'b-dropdown-item': BDropdownItem,
  },
  props: {
    connectionId: String,
  },
  methods: {
    remove() {
      this.$store.dispatch('connections/remove', this.$props.connectionId);
    },
  },
});
</script>
