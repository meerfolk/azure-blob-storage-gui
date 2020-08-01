<template>
  <b-modal id="view-blob-dialog" centered size="lg">
    {{content}}
  </b-modal>
</template>

<script lang="ts">
  import Vue from 'vue';

  import store from '../../store';

  export default Vue.extend({
    store,
    computed: {
      content() {
        return this.$store.state.currentBlobContent;
      }
    }
  });
</script>