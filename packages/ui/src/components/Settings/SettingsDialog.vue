<template>
  <b-modal
    id="settings-dialog"
    centered
    ok-title="Save"
    v-bind:ok-only="true"
    :visible="isDialogOpen"
    :ok-disabled="isSaveDisabled"
    @ok="save"
    @hide="closeDialog"
  >
    <label for="reload-time-input">Reload time</label>
    <b-form-input
      id="reload-time-input"
      v-model="reloadTime"
      :state="reloadTimeState"
    />
    <b-form-invalid-feedback id="reload-time-input-feedback"
      >Reload Time should be number</b-form-invalid-feedback
    >
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { ISettings } from '../../business/settings';

const settingsStore = namespace('settings');

@Component({
  name: 'settings-dialog',
})
export default class SettingsDialog extends Vue {
  @settingsStore.State
  public settings: ISettings | null;

  @settingsStore.State
  public isDialogOpen: boolean;

  @settingsStore.Action
  public saveSettings: (settings: ISettings) => void;

  @settingsStore.Action
  public loadSettings: () => void;

  @settingsStore.Action
  public closeDialog: () => void;

  public reloadTime: string = '0';

  get isSameReloadTime(): boolean {
    return (this.settings?.reloadTime?.toString() ?? '0') === this.reloadTime;
  }

  get reloadTimeState(): boolean | null {
    return this.isSameReloadTime
      ? null
      : isNaN(Number(this.reloadTime))
      ? false
      : true;
  }

  get isSaveDisabled(): boolean {
    return this.isSameReloadTime;
  }

  public save(): void {
    this.saveSettings({
      reloadTime: Number(this.reloadTime),
    });
  }

  public mounted(): void {
    this.loadSettings();

    this.reloadTime = this.settings?.reloadTime?.toString() ?? '0';
  }
}
</script>
