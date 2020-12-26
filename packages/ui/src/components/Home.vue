<template>
  <div class="row">
    <settings-dialog />
    <div class="col-3">
      <connection-list />
    </div>
    <div class="col-9">
      <blob-list />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import BlobList from './BlobList/BlobList.vue';
import ConnectionList from './ConnectionList/ConnectionList.vue';
import SettingsDialog from './Settings/SettingsDialog.vue';

export default Vue.extend({
  components: {
    'blob-list': BlobList,
    'connection-list': ConnectionList,
    SettingsDialog,
  },
});
</script>
