import { action } from '@storybook/addon-actions';
import { v4 as uuid } from 'uuid';
import Vuex from 'vuex';

// @ts-ignore
import ConnectionList from './ConnectionList.vue';

export default {
    title: 'Connection/ConnectionList',
    component:ConnectionList,
};

const currentConnection = {
    id: uuid(),
    sas: 'test sas',
    accountName: 'test account name',
    containerName: 'test container name',
}

const Template = () => ({
    components: { ConnectionList },
    template: `
        <div class="row">
            <div class="col-3">
                <connection-list class />
            </div>
        </div>
    `,
    store: new Vuex.Store({
        modules: {
            connections: {
                namespaced: true,
                state: {
                    isDialogOpen: false,
                    list: [
                        currentConnection,
                        {
                            id: uuid(),
                            sas: 'test sas 2',
                            accountName: 'test account name 2',
                            containerName: 'test container name 2',
                        }
                    ],
                    current: currentConnection,
                    toEdit: null,
                },
                mutations: {
                    setIsDialogOpen(state, value) {
                        state.isDialogOpen = value;
                    },
                    setToEdit(state, value) {
                        state.toEdit = value;
                    }
                },
                actions: {
                    openDialog: ({ commit }) => commit('setIsDialogOpen', true),
                    openDialogToEdit: ({ state, commit }, id) => {
                        const connection = state.list.find(c => c.id === id);

                        commit('setToEdit', connection);
                        commit('setIsDialogOpen', true);
                    },
                    closeDialog: ({ commit }) => {
                        commit('setToEdit', null);
                        commit('setIsDialogOpen', false);
                    },
                    remove: (_, id) => action('remove')(id),
                    edit: (_, model) => action('edit')(model),
                    create: (_, model) => action('create')(model),
                    changeCurrent: (_, id) => action('changeCurrent')(id),
                }
            },
            blobList: {
                namespaced: true,
                state: {
                    list: [],
                },
            },
        },
    })
});

export const Default = Template.bind({});
