import Vuex, { Store } from 'vuex';
import { action } from '@storybook/addon-actions';

import UploadDialog from './UploadDialog.vue';

export default {
    title: 'BlobList/UploadDialog',
    component: UploadDialog,
};

const Template = () => {
    const store = new Vuex.Store({
        modules: {
            blobList: {
                namespaced: true,
                state: {
                    isUploadDialogOpen: true,
                },
                mutations: {
                    setIsDialogOpen: (state, value) => {
                        state.isUploadDialogOpen = value;
                    },
                },
                actions: {
                    openUploadDialog: ({ commit }) => {
                        commit('setIsDialogOpen', true);
                    },
                    closeUploadDialog: () => action('closeUploadDialog')(),
                    upload: (_, name, file) => action('upload')(name, file),
                },
            },
        },
    });

    return {
        components: { 'upload-blob-dialog': UploadDialog },
        template: `
            <div>
                <button @click="show">show</button>
                <upload-blob-dialog />
            </div>
        `,
        store,
        methods: {
            show() {
                store.dispatch('blobList/openUploadDialog');
            },
        },
    }
}

export const Default = Template.bind({});
