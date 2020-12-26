<template>
  <b-card
    class="col-12 m-2 p-0"
    v-bind:class="{ loaded: isActive && isLoaded, active: isActive }"
  >
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

    <div class="row mt-2">
      <div class="col-6" v-if="!isActive">
        <b-button @click="activate()" variant="success">
          Activate
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { ConnectionModel } from '../../business/localStorage/connection';

import ConnectionMenu from './ConnectionMenu.vue';

const connectionsStore = namespace('connections');

@Component({
  name: 'connection-item',
  components: {
    ConnectionMenu,
  },
})
export default class ConnectionItem extends Vue {
  @Prop({ required: true, default: false }) readonly isActive: boolean;
  @Prop({ required: true, default: false }) readonly isLoaded: boolean;
  @Prop({ required: true }) readonly connection: ConnectionModel;

  @connectionsStore.State
  public errorMessage: string | null;

  get connectionId(): void {
    return this.connection.id;
  }

  public activate(): void {
    this.$store.dispatch('changeCurrentConnection', this.connection.id);
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
.main-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.account-name {
  display: flex;
  align-items: center;
}
</style>
