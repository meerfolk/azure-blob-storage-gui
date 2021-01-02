<template>
  <b-card
    class="col-12 m-2 p-0"
    v-bind:class="{
      loaded: isActive && isLoaded,
      active: isActive,
      failed: isFailed,
    }"
  >
    <b-icon
      v-b-tooltip.hover
      :title="errorMessage"
      class="failed-info"
      icon="info-circle-fill"
      variant="danger"
      v-if="isFailed"
    ></b-icon>
    <div class="main-header">
      <div class="account-name text-left">
        <b>{{ connection.accountName }}</b>
      </div>
      <connection-menu v-bind:connectionId="connectionId" />
    </div>

    <hr />

    <div class="row">
      <div class="col-12 text-left">
        <b>ContainerName:</b>
      </div>
      <div class="col-12 text-left">
        {{ connection.containerName }}
      </div>
    </div>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { ConnectionModel } from '../../business/connection';

import Menu from './Menu.vue';

const connectionsStore = namespace('connections');

@Component({
  name: 'connection-item',
  components: {
    'connection-menu': Menu,
  },
})
export default class ConnectionItem extends Vue {
  @Prop({ required: true, default: false }) readonly isActive: boolean;
  @Prop({ required: true, default: false }) readonly isLoaded: boolean;
  @Prop({ required: true }) readonly connection: ConnectionModel;

  @connectionsStore.State
  private errorMessage: string | null;

  private get connectionId(): void {
    return this.connection.id;
  }

  private get isFailed(): boolean {
    return this.isActive && Boolean(this.errorMessage);
  }
}
</script>

<style scoped>
.loaded {
  background-color: #c4f2b5;
}
.active {
  border-width: 2px;
  border-color: green;
}
.failed {
  border-color: red;
}
.main-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.account-name {
  display: flex;
  align-items: center;
}
.failed-info {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
