import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';

import {
    ConnectionModel,
    getConnectionList,
    getCurrentConnectionId,
    saveConnections,
    saveCurrentConnectionId,
} from '../business/connection';

interface IListSplit {
    pre: Array<ConnectionModel>;
    rest: Array<ConnectionModel>;
};

@Module({ namespaced: true })
export default class Connections extends VuexModule {
    public errorMessage: string | null = null;
    public current: ConnectionModel | null = null;
    public list: Array<ConnectionModel> = [];
    public isDialogOpen: boolean = false;
    public toEdit: ConnectionModel | null = null;

    @Mutation
    public setErrorMessage(value: string): void {
        this.errorMessage = value;
    }

    @Mutation 
    private setList(value: Array<ConnectionModel>): void {
        this.list = value;
    }

    @Mutation
    private setCurrent(value: ConnectionModel): void {
        this.current = value;
    }

    @Mutation
    private setIsDialogOpen(value: boolean): void {
        this.isDialogOpen = value;
    }

    @Mutation
    private setToEdit(value: ConnectionModel | null): void {
        this.toEdit = value;
    }

    @Action
    public loadList(): void {
        const connections = getConnectionList();

        this.context.commit('setList', connections);
        this.context.dispatch('changeCurrent', getCurrentConnectionId());
    }

    private splitListById(id: string): IListSplit | null {
        const index = this.list.findIndex((connection) => connection.id === id);

        if (index < 0) {
            return null;
        }

        return {
            pre: this.list.slice(0, index),
            rest: this.list.slice(index + 1),
        };
    }

    @Action
    public create(model: ConnectionModel): void {
        const newList = [...this.list, model];

        saveConnections(newList);

        this.context.commit('setList', newList);

        this.context.dispatch('changeCurrent', model.id);
    }

    @Action
    public edit(model: ConnectionModel): void {
        const index = this.list.findIndex((connection) => connection.id === model.id);

        if (index < 0) {
            return;
        }

        const newList = [...this.list.slice(0, index), model, ...this.list.slice(index + 1)];

        saveConnections(newList);
        this.context.commit('setList', newList);

        if (model.id === this.current?.id) {
            this.context.dispatch('changeCurrent', model.id);
        }
    }

    @Action
    public remove(id: string): void {
        const index = this.list.findIndex((connection) => connection.id === id);

        if (index < 0) {
            return;
        }

        const newList = [...this.list.slice(0, index), ...this.list.slice(index + 1)];

        saveConnections(newList);
        this.context.commit('setList', newList);

        if (id === this.current?.id) {
            this.context.dispatch('changeCurrent');
        }
    }

    @Action
    public changeCurrent(id: string): void {
        const defaultConnection = this.list[0] || null;
        const currentConnection = this.list.find((connection) => connection.id === id);

        this.context.commit('setCurrent', currentConnection || defaultConnection);

        if (this.current) {
            saveCurrentConnectionId(this.current.id);
        }

        this.context.dispatch('changeCurrentConnection', null, { root: true });
    }

    @Action
    public openDialog(): void {
        this.context.commit('setIsDialogOpen', true);
    }

    @Action
    public openDialogToEdit(id: string): void {
        const connection = this.list.find((connection) => connection.id === id);
        
        if (!connection) {
            throw new Error('Connection not found');
        }

        this.context.commit('setToEdit', connection);
        this.context.commit('setIsDialogOpen', true);
    }

    @Action
    public closeDialog(): void {
        this.context.commit('setIsDialogOpen', false);
        this.context.commit('setToEdit', null);
    }
}