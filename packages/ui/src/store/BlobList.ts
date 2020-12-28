import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { getBlobList } from '../business/azureBlobStorage/blob';
import { getErrorMessage } from '../business/azureBlobStorage/error-messages';

import { RootState } from '.';

@Module({ namespaced: true })
export default class BlobList extends VuexModule<any, RootState> {
    public reloadIntervalId: number | null = null;
    public isReloading: boolean = false;

    @Mutation
    private setReloadIntervalId(value: number | null): void {
        this.reloadIntervalId = value;
    }

    @Mutation
    private setIsReloading(value: boolean): void {
        this.isReloading = value;
    }

    @Action
    public startReload(reloadTime: number): void {
        if (this.reloadIntervalId) {
            this.stopReload();
        }

        const intervalId = setInterval(() => this.context.dispatch('reload'), reloadTime * 1000);

        this.context.commit('setReloadIntervalId', intervalId);
    }

    @Action
    public stopReload(): void {
        if (!this.reloadIntervalId) {
            return;
        }

        clearInterval(this.reloadIntervalId);

        this.context.commit('setReloadIntervalId', null);
    }

    @Action
    public reload() {
        const connection = this.context.rootState.currentConnection;
        const prefix = this.context.rootState.prefix;

        if (!connection) {
            return;
        }
        this.context.commit('setIsReloading', true);

        getBlobList(connection, prefix)
            .then((blobs) => {
                this.context.commit('setBlobList', blobs, { root: true });
            })
            .catch((error) => {
                const errorMessage = getErrorMessage(error);

                this.context.commit('connections/setErrorMessage', errorMessage, { root: true });
            })
            .finally(() => {
                this.context.commit('setIsReloading', false);
            });
    }
}