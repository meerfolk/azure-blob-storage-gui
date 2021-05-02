<template>
  <div>
    <view-blob-dialog />
    <upload-blob-dialog />

    <blob-list-header />
    <b-table
      id="blobListTable"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      striped
      hover
    >
      <template v-slot:cell(viewButton)="data">
        <b-icon
          icon="eye"
          cursor="pointer"
          title="View blob"
          :animation="isBlobDownloading ? 'fade' : null"
          v-b-tooltip:hover
          @click="downloadBlob(data.item.name)"
        />
      </template>
    </b-table>

    <b-pagination
      v-if="totalRows"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      aria-controls="blobListTable"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BIcon } from 'bootstrap-vue';

import ViewBlobDialog from './ViewBlobDialog';
import UploadBlobDialog from './UploadDialog';
import BlobListHeader from './Header/Header';

export default Vue.extend({
  name: 'blob-list',
  components: {
    'b-icon': BIcon,
    'view-blob-dialog': ViewBlobDialog,
    BlobListHeader,
    UploadBlobDialog,
  },
  computed: {
    items() {
      return this.$store.state.blobList?.list;
    },
    totalRows() {
      return this.$store.state.blobList?.list?.length;
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      fields: [
        {
          key: 'name',
          label: 'Name',
          class: 'text-left',
        },
        {
          key: 'updatedAt',
          label: 'Last Modified',
          sortable: true,
          class: 'text-left',
        },
        {
          key: 'viewButton',
          label: '',
        },
      ],
      isBlobDownloading: false,
    };
  },
  methods: {
    downloadBlob(blobName: string) {
      if (this.$data.isBlobDownloading) {
        return;
      }

      this.$data.isBlobDownloading = true;

      this.$store.dispatch('getBlobContent', blobName).then(() => {
        this.$data.isBlobDownloading = false;
        this.$bvModal.show('view-blob-dialog');
      });
    },
  },
});
</script>

<style scoped>
.header {
  display: flex;
}
</style>
