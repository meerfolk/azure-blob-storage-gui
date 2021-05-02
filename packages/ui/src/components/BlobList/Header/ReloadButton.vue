<template>
  <b-button @click="reload" :disabled="isReloading">
    <b-icon icon="arrow-clockwise" :animation="animation" />
  </b-button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const blobListStore = namespace('blobList');

@Component({
  name: 'reload-button',
})
export default class ReloadButton extends Vue {
  @blobListStore.State
  public isReloading: boolean;

  @blobListStore.Action
  public reload: () => void;

  public get animation(): string | null {
    return this.isReloading ? 'spin' : null;
  }
}
</script>
