<template>
  <b-modal
    :visible="isDialogOpen"
    :title="title"
    :ok-disabled="isOkDisabled"
    centered
    @ok="handler"
    @hide="closeDialog"
    @show="onShow"
  >
    <div role="group">
      <label for="input-account-name">Account name:</label>
      <b-form-input
        id="input-account-name"
        v-model="account"
        trim
      ></b-form-input>
    </div>

    <div role="group">
      <label for="input-container-name">Container name:</label>
      <b-form-input
        id="input-account-name"
        v-model="container"
        trim
      ></b-form-input>
    </div>

    <div role="group">
      <label for="input-sas-token">SAS token:</label>
      <b-form-input id="input-sas-token" v-model="sas" trim></b-form-input>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { validate, ValidationError } from 'class-validator';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { ConnectionModel } from '../../business/connection';

const connectionsStore = namespace('connections');
const EDIT_TITLE = 'Edit connection';
const CREATE_TITLE = 'Create connection';

@Component({
  name: 'connection-dialog',
})
export default class Dialog extends Vue {
  @connectionsStore.State
  public isDialogOpen: boolean;

  @connectionsStore.Action
  public create: (model: ConnectionModel) => void;

  @connectionsStore.Action
  public edit: (model: ConnectionModel) => void;

  @connectionsStore.Action
  public openDialog: () => void;

  @connectionsStore.Action
  public closeDialog: () => void;

  private account: string = '';
  private container: string = '';
  private sas: string = '';
  private title: string = '';

  private get toEditModel(): ConnectionModel | null {
    return this.$store.state.connections.toEdit;
  }

  private get isNewConnection(): boolean {
    return Boolean(connectionsStore.State.toEdit);
  }

  private get isOkDisabled(): boolean {
    const toEditModel = this.toEditModel;

    const account = toEditModel?.accountName || '';
    const container = toEditModel?.containerName || '';
    const sas = toEditModel?.sas || '';

    return (
      this.account === account &&
      this.container === container &&
      this.sas === sas
    );
  }

  private init(): void {
    this.account = '';
    this.container = '';
    this.sas = '';
  }

  private onShow(): void {
    this.init();

    const toEditModel = this.toEditModel;
    this.title = Boolean(toEditModel) ? EDIT_TITLE : CREATE_TITLE;

    if (!toEditModel) {
      return;
    }

    this.account = toEditModel.accountName;
    this.container = toEditModel.containerName;
    this.sas = toEditModel.sas;
  }

  private async handler(): void {
    const toEditModel = this.toEditModel;

    const connection = ConnectionModel.createConnectionModel(
        this.account,
        this.container,
        this.sas,
      );

    const errors = await validate(connection);

    if (errors.length > 0) {
      const errorMesssages = errors.reduce(
        (memo: object, error: ValidationError): { [type: string]: string } => ({
          ...memo,
          ...error.constraints,
        }),
        {},
      );
      // TODO: add notification here
      console.error(errorMesssages);
      return;
    }

    if (toEditModel) {
      try {
        this.edit(connection);
      } catch (e) {
        // TODO: add notification here
        console.error(e);
      }
      return;
    }

    try {
      this.create(connection);
    } catch (e) {
      // TODO: add notification here
      console.error(e);
    }
  }
}
</script>
