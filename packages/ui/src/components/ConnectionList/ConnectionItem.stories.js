import Vuex from 'vuex';
import { action } from '@storybook/addon-actions';

import ConnectionItem from './ConnectionItem.vue';
import { ConnectionModel } from '../../business/localStorage/connection';

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
        actions: {
            removeConnection({}, id) {
                action('removeConnection')(id);
            },
        },
    }),
})

export const Loaded = Template.bind({});
Loaded.args = {
    isActive: true,
    isLoaded: true,
};

export const Default = Template.bind({});
Default.args = {
    isActive: false,
    isLoaded: false,
};
