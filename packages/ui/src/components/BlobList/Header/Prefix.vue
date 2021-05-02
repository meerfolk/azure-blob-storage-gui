<template>
  <div class="main">
    <b-form-input
      v-model="currentPrefix"
      placeholder="Prefix"
      v-on:keyup="onKeyUp"
    />
    <b-button @click="change" variant="success" :disabled="isSamePrefix">
      apply
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const blobListStore = namespace('blobList');

@Component({
  name: 'blob-prefix',
})
export default class Prefix extends Vue {
  @blobListStore.State
  private prefix: string;

  @blobListStore.Action
  public changePrefix: (val: string) => void;

  private currentPrefix: string = '';

  public get isSamePrefix(): boolean {
    return this.prefix === this.currentPrefix;
  }

  public change(): void {
    this.changePrefix(this.currentPrefix);
  }

  public onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.change();
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}
</style>
