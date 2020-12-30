import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';

// @ts-ignore
import ConnectionList from './ConnectionList.vue';

export default {
    title: 'Connection/ConnectionList',
    component:ConnectionList,
};

const currentConnection = {
    id: 'test',
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
                    list: [
                        currentConnection,
                        {
                            id: 'test 2',
                            sas: 'test sas 2',
                            accountName: 'test account name 2',
                            containerName: 'test container name 2',
                        }
                    ],
                    current: currentConnection,
                },
                actions: {
                    remove: (_, id) => action('remove')(id),
                    create: (_, model) => action('create')(JSON.stringify(model)),
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
