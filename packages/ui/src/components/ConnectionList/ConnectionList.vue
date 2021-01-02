<template>
  <b-container>
    <connection-dialog />

    <b-row>
      <b-button @click="openDialog" class="m-3">
        Add connection
      </b-button>
    </b-row>

    <b-row v-for="item in list" :key="item.accountName">
      <connection-item
        v-bind:connection="item"
        v-bind:isActive="isActive(item.id)"
        v-bind:isLoaded="isLoaded"
      />
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import Dialog from './Dialog.vue';
import ConnectionItem from './ConnectionItem.vue';

import { ConnectionModel } from '../../business/connection';

const connectionsStore = namespace('connections');
const blobListStore = namespace('blobList');

@Component({
  name: 'connection-list',
  components: {
    ConnectionItem,
    'connection-dialog': Dialog,
  },
})
export default class ConnectionList extends Vue {
  @connectionsStore.State
  public list: Array<ConnectionModel> | null;
  @connectionsStore.State
  public current: ConnectionModel | null;

  @connectionsStore.Action
  public openDialog: () => void;

  public get isLoaded(): boolean {
    return blobListStore.State.list !== null;
  }

  public isActive(id: string): boolean {
    return this.current?.id === id;
  }
}
</script>
