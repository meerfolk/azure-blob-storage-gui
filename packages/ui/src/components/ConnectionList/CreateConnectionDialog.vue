<template>
  <b-modal id="create-connection-dialog" centered @ok="createNewConnection">
    <div role="group">
      <label for="input-account-name">Account name:</label>
      <b-form-input id="input-account-name" v-model="accountName" trim></b-form-input>
    </div>

    <div role="group">
      <label for="input-container-name">Container name:</label>
      <b-form-input id="input-account-name" v-model="containerName" trim></b-form-input>
    </div>

    <div role="group">
      <label for="input-sas-token">SAS token:</label>
      <b-form-input id="input-sas-token" v-model="sasToken" trim></b-form-input>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { validate, ValidationError } from 'class-validator';

import store from '../../store';

import { ConnectionModel } from '../../business/localStorage/connection';

export default Vue.extend({
  store,
  data() {
    return {
      accountName: '',
      containerName: '',
      sasToken: '',
      errorMesssages: {},
    };
  },
  methods: {
    async createNewConnection() {
      const connection = new ConnectionModel(this.accountName, this.containerName, this.sasToken);

      const errors = await validate(connection);

      if (errors.length > 0) {
        this.errorMesssages = errors.reduce(
          (memo: object, error: ValidationError): { [type: string]: string } => ({ ...memo, ...error.constraints }),
          {},
        );
        console.error(this.errorMesssages);
      } else {
        this.$store.dispatch('createNewConnection', connection);
      }
    },
  },
});
</script>
