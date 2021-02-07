<template>
  <div class="header">
    <reload-button />
    <blob-prefix />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BlobPrefix from './Prefix';
import ReloadButton from './ReloadButton';

@Component({
  name: 'blob-list-header',
  components: {
    BlobPrefix,
    ReloadButton,
  },
})
export default class BlobListHeader extends Vue {}
</script>

<style scoped>
.header {
  display: flex;
}
</style>
