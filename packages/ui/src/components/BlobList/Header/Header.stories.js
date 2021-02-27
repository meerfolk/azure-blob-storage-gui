import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';

import BlobListHeader from './Header';

export default {
    title: 'BlobList/Header',
    component: BlobListHeader,
};

const Template = () => ({
    components: { BlobListHeader },
    template: '<blob-list-header />',
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
                    reload: () => action('reload')(),
                    changePrefix: (_, prefix) => action('changePrefix')(prefix),
                    openUploadDialog: () => action('openUploadDialog')(),
                },
            },
        },
    }),
});

export const Default = Template.bind({});