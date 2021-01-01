<template>
  <b-dropdown size="sm" variant="link">
    <template #button-content>
      <b-icon icon="gear" size="20" />
    </template>
    <b-dropdown-item v-if="isNotActive" @click="changeCurrent(connectionId)"
      >Activate</b-dropdown-item
    >
    <b-dropdown-item @click="remove(connectionId)" variant="danger"
      >Delete</b-dropdown-item
    >
  </b-dropdown>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { ConnectionModel } from '../../business/connection';

const connectionsStore = namespace('connections');

@Component({
  name: 'connection-menu',
})
export default class ConnectionMenu extends Vue {
  @connectionsStore.Action
  public remove: (id: string) => void;

  @connectionsStore.Action
  public changeCurrent: (id: string) => void;

  @connectionsStore.State
  public current: ConnectionModel | null;

  @Prop({ required: true }) public connectionId: string;

  private get isNotActive(): boolean {
    return this.current?.id !== this.connectionId;
  }
}
</script>
