import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';

import BlobList from './BlobList.vue';

export default {
    title: 'BlobList/List',
    component: BlobList,
};

const Template = () => ({
    components: { BlobList },
    template: '<blob-list />',
    store: new Vuex.Store({
        modules: {
            blobListModule: {
                state: {
                    isReloading: false,
                },
                actions: {
                    reload: () => {
                        action('reload');
                    },
                },
            },
        },
        state: {
            prefix: null,
            blobList: [],
        },
    }),
});

export const Default = Template.bind({});