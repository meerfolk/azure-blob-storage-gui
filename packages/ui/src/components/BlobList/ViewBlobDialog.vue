<template>
  <b-modal id="view-blob-dialog" centered size="lg" :title="blobName">
    <vue-json-pretty :data="content"> </vue-json-pretty>
  </b-modal>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import Vue from 'vue';
import VueJsonPretty from 'vue-json-pretty';

import 'vue-json-pretty/lib/styles.css';

export default Vue.extend({
  name: 'view-blob-dialog',
  components: {
    VueJsonPretty,
  },
  computed: {
    ...mapState(['blobName']),
    content() {
      const content = this.$store.state.currentBlobContent;
      try {
        return JSON.parse(content);
      } catch (error) {
        return content;
      }
    },
  },
});
</script>

<style>
#view-blob-dialog {
  word-wrap: break-word;
}

#view-blob-dialog .modal-body {
  height: 500px;
  overflow-y: auto;
}
</style>
