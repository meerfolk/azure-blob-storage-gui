<template>
  <b-card class="col-12 m-2 p-0" v-bind:class="{ active: isLoaded }">
    <div class="row">
      <div class="col-10 text-left">
        <b>AccountName:</b>
      </div>
      <div class="col-2" v-if="isActive && !isLoaded">
        <b-icon icon="check" />
      </div>
      <div class="col-2" v-if="isLoaded">
        <b-icon icon="check-all" variant="success" />
      </div>
    </div>
    <div class="col-12 text-left">
      {{ account }}
    </div>

    <hr />

    <div class="col-12 text-left">
      <b>ContainerName:</b>
    </div>
    <div class="col-12 text-left">
      {{ container }}
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { BIcon } from 'bootstrap-vue';

export default Vue.extend({
  props: {
    account: String,
    container: String,
    isActive: Boolean,
    isLoaded: Boolean,
  },
  components: {
    'b-icon': BIcon,
  },
});
</script>

<style scoped>
.active {
  background-color: #c4f2b5;
}
</style>
