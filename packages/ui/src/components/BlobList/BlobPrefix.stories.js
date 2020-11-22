import Vuex from 'vuex';
import { action } from '@storybook/addon-actions';

import BlobPrefix from './BlobPrefix.vue';

export default {
	title: 'BlobPrefix',
	component: BlobPrefix,
};

const Template = () => ({
	components: { BlobPrefix },
	template: '<blob-prefix />',
	store: new Vuex.Store({
		state: {
			prefix: 'test',
		},
		actions: {
			async changePrefix({ state }, prefix) {
				state.prefix = prefix;
				action('Prefix changed')(prefix);
			},
		},
	})
});

export const Default = Template.bind({});