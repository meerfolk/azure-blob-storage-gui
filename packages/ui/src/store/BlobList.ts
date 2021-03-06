import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { BlobModel, getBlobList, uploadBlob } from '../business/azureBlobStorage';
import { getErrorMessage } from '../business/azureBlobStorage/error-messages';

import { RootState } from '.';

@Module({ namespaced: true })
export default class BlobList extends VuexModule<any, RootState> {
    public reloadIntervalId: number | null = null;
    public isReloading: boolean = false;
    public list: Array<BlobModel> | null = null;
    public prefix: string = '';
    public isUploadDialogOpen: boolean = false;
    public isUploading: boolean = false;

    @Mutation
    private setReloadIntervalId(value: number | null): void {
        this.reloadIntervalId = value;
    }

    @Mutation
    private setIsReloading(value: boolean): void {
        this.isReloading = value;
    }

    @Mutation
    private setPrefix(value: string): void {
        this.prefix = value;
    }

    @Mutation
    public setList(value: Array<BlobModel> | null) {
        this.list = value;
    }

    @Mutation
    public setIsUploadDialogOpen(value: boolean) {
        this.isUploadDialogOpen = value;
    }

    @Mutation
    public setIsUploading(value: boolean) {
        this.isUploading = value;
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
        const connection = this.context.rootState.connections?.current;

        if (!connection) {
            return;
        }
        this.context.commit('setIsReloading', true);

        getBlobList(connection, this.prefix)
            .then((blobs) => {
                this.context.commit('setList', blobs);
            })
            .catch((error) => {
                const errorMessage = getErrorMessage(error);

                this.context.commit('connections/setErrorMessage', errorMessage, { root: true });
            })
            .finally(() => {
                this.context.commit('setIsReloading', false);
            });
    }

    @Action
    public changePrefix(prefix: string): void {
        if (prefix === this.prefix) {
            return;
        }

        this.context.commit('setPrefix', prefix);

        this.context.dispatch('reload');
    }

    @Action
    public uploadBlob(data: { name: string, file: File }): void {
        const { name, file } = data;
        const connection = this.context.rootState.connections?.current;

        if (!connection) {
            return;
        }

        this.context.commit('setIsUploading', true);

        uploadBlob(connection, file, name)
            .then(() => {
                this.context.commit('setIsUploading', false);
                this.context.commit('setIsUploadDialogOpen', false);
                return this.context.dispatch('reload');
            })
    }

    @Action
    public openUploadDialog(): void {
        this.context.commit('setIsUploadDialogOpen', true);
    }

    @Action
    public closeUploadDialog(): void {
        this.context.commit('setIsUploadDialogOpen', false);
    }
}