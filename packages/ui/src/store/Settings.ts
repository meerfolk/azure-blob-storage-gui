import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';

import { saveSettings, ISettings, loadSettings } from '../business/settings';

@Module({ namespaced: true })
export default class Settings extends VuexModule {
    public isDialogOpen: boolean = false;
    public settings: ISettings | null = null;

    @Mutation
    public setSettings(settings: ISettings): void {
        this.settings = settings;
    }

    @Mutation
    public setIsDialogOpen(value: boolean): void {
        this.isDialogOpen = value;
    }

    @Action
    public saveSettings(settings: ISettings): void {
        saveSettings(settings);

        this.context.commit('setSettings', settings);
    }

    @Action
    public loadSettings(): void {
        const settings = loadSettings();

        this.context.commit('setSettings', settings);
    }

    @Action
    public openDialog(): void {
        this.context.commit('setIsDialogOpen', true);
    }

    @Action
    public closeDialog(): void {
        this.context.commit('setIsDialogOpen', false);
    }
}
