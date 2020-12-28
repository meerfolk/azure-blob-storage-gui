import Vuex from 'vuex';
import { action } from '@storybook/addon-actions';

import Prefix from './Prefix.vue';

export default {
	title: 'BlobList/Prefix',
	component: Prefix,
};

const Template = () => ({
	components: { 'blob-prefix': Prefix },
	template: '<blob-prefix />',
	store: new Vuex.Store({
		modules: {
			blobList: {
				namespaced: true,
				state: {
					prefix: 'test',
				},
				actions: {
					changePrefix: ({ state }, prefix) => {
						state.prefix = prefix;
						action('Prefix changed')(prefix);
					},
				},
			},
		},
	})
});

export const Default = Template.bind({});