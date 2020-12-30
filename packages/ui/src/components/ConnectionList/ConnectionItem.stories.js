import Vuex from 'vuex';
import { action } from '@storybook/addon-actions';

// @ts-ignore
import ConnectionItem from './ConnectionItem.vue';
import { ConnectionModel } from '../../business/connection';

export default {
    title: 'Connection/ConnectionItem',
    component: ConnectionItem,
};

const Template = (args) => ({
    components: { ConnectionItem },
    data() {
        return {
            connection: new ConnectionModel(
                'test',
                'test account name',
                'test container name',
                'test sas',
            ),
            isActive: args.isActive,
            isLoaded: args.isLoaded,
        };
    },
    template: `
        <div class="col-3">
            <connection-item
                v-bind:connection="connection"
                v-bind:isActive="isActive"
                v-bind:isLoaded="isLoaded"
            />
        </div>
    `,
    store: new Vuex.Store({
        modules: {
            connections: {
                namespaced: true,
                state: {
                    errorMessage: args.errorMessage,
                },
            },
        },
        actions: {
            removeConnection({}, id) {
                action('removeConnection')(id);
            },
            changeCurrentConnection({}, id) {
                action('changeCurrentConnection')(id);
            }
        },
    }),
})

export const Loaded = Template.bind({});
Loaded.args = {
    isActive: true,
    isLoaded: true,
};

export const Failed = Template.bind({});
Failed.args = {
    isLoaded: false,
    isActive: true,
    errorMessage: 'TEST',
};

export const Active = Template.bind({});
Active.args = {
    isActive: true,
    isLoaded: false,
};

export const Default = Template.bind({});
Default.args = {
    isActive: false,
    isLoaded: false,
    errorMessage: 'TEST',
};
