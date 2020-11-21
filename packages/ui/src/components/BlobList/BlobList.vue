<template>
  <div>
    <view-blob-dialog />

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

import ViewBlobDialog from './ViewBlobDialog.vue';

import store from '../../store';

export default Vue.extend({
  name: 'blob-list',
  store,
  components: {
    'b-icon': BIcon,
    'view-blob-dialog': ViewBlobDialog,
  },
  computed: {
    items() {
      return this.$store.state.blobList;
    },
    totalRows() {
      return this.$store.state.blobList?.length;
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