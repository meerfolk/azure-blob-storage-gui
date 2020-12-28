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
            blobList: {
                namespaced: true,
                state: {
                    isReloading: false,
                    list: [],
                    prefix: null,
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

export const Default = Template.bind({});