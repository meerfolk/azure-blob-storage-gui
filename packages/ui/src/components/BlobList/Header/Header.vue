<template>
  <div class="header">
    <upload-button />
    <reload-button />
    <blob-prefix />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BlobPrefix from './Prefix';
import ReloadButton from './ReloadButton';
import UploadButton from './UploadButton';

@Component({
  name: 'blob-list-header',
  components: {
    BlobPrefix,
    ReloadButton,
    UploadButton,
  },
})
export default class BlobListHeader extends Vue {}
</script>

<style scoped>
.header {
  display: flex;
}
</style>
