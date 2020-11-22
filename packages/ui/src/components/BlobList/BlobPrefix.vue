<template>
  <div class="main">
    <b-form-input v-model="prefix" placeholder="Prefix" v-on:keyup="onKeyUp" />
    <b-button @click="changePrefix" variant="success" :disabled="isSamePrefix">
      apply
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { BButton, BFormInput } from 'bootstrap-vue';

export default Vue.extend({
  components: {
    'b-button': BButton,
    'b-form-input': BFormInput,
  },
  name: 'blob-prefix',
  data() {
    return {
      prefix: '',
    };
  },
  computed: {
    isSamePrefix(): boolean {
      return this.$store.state.prefix === this.$data.prefix;
    },
  },
  methods: {
    changePrefix() {
      this.$store.dispatch('changePrefix', this.$data.prefix);
    },
    onKeyUp(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        this.changePrefix();
      }
    },
  },
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}
</style>
