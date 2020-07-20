<template>
  <b-card class="col-12 m-2 p-0">
    <div class="col-12 text-left">
      <b>AccountName:</b>
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
import Vue from 'vue'

export default Vue.extend({
  props: {
    account: String,
    container: String,
  }  
})
</script>
