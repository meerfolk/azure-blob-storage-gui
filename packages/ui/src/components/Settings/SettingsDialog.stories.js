import Vuex from 'vuex';
import { action } from '@storybook/addon-actions';

import SettingsDialog from './SettingsDialog.vue';

export default {
    title: 'Settings/SettingsDialog',
    component: SettingsDialog,
};

const createStore = (args) => new Vuex.Store({
    modules: {
        settings: {
            namespaced: true,
            state: {
                isDialogOpen: false,
                settings: args.settings,
            },
            mutations: {
                setIsDialogOpen: (state, value) => {
                    state.isDialogOpen = value;
                },
            },
            actions: {
                saveSettings: (_, settings) => {
                    action('Save')(JSON.stringify(settings));
                },
                closeDialog: ({ commit }) => {
                    commit('setIsDialogOpen', false);
                },
                openDialog: ({ commit }) => {
                    commit('setIsDialogOpen', true);
                },
            },
        },
    },
});

const Template = (args) => {
    const store = createStore(args);

    return {
        components: { SettingsDialog },
        template: `
            <div>
                <button @click="show">show</button>
                <settings-dialog />
            </div>
        `,
        store,
        methods: {
            show() {
                store.dispatch('settings/openDialog');
            },
        },
    }
};

export const Default = Template.bind({});
Default.args = {
    settings: {
        reloadTime: 2000,
    },
};

export const Empty = Template.bind({});
Empty.args = {
    settings: null,
};