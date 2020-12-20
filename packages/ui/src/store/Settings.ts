import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';

import { saveSettings, ISettings } from '../business/settings';

@Module({ namespaced: true })
export default class Settings extends VuexModule {
    public settings: ISettings | null = null;

    @Mutation
    public setSettings(settings: ISettings): void {
        this.settings = settings;
    }

    @Action
    public saveSettings(settings: ISettings): void {
        saveSettings(settings);

        this.context.commit('setSettings', settings);
    }
}
