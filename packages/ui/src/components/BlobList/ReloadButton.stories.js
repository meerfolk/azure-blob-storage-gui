import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';

import ReloadButton from './ReloadButton';

export default {
    title: 'BlobList/ReloadButton',
    component: ReloadButton,
};

const Template = ({ isReloading }) => ({
    components: { ReloadButton },
    template: '<reload-button />',
    store: new Vuex.Store({
        modules: {
            blobListModule: {
                namespaced: true,
                state: {
                    isReloading,
                },

                actions: {
                    reload: () => {
                        action('reload');
                    },
                },
            },
        },
    }),
});

export const Loaded = Template.bind({});
Loaded.args = {
    isReloading: false,
};

export const Loading = Template.bind({});
Loading.args = {
    isReloading: true,
};
