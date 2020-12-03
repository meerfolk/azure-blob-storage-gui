import Vuex from 'vuex';
import { range } from 'ramda';

import ViewBlobDialog from './ViewBlobDialog.vue';

export default {
    title: 'ViewBlobDialog',
    component: ViewBlobDialog,
};

const Template = (args, data) => {
    return {
        components: { ViewBlobDialog },
        template: `
            <div>
                <button @click="show">show</button>
                <view-blob-dialog />
            </div>
        `,
        store: new Vuex.Store({
            state: {
                currentBlobContent: args.text,
                blobName: 'Test blob',
            },
        }),
        methods: {
            show() {
                this.$bvModal.show('view-blob-dialog');
            },
        },
    }
};

export const Json = Template.bind({});
Json.args = {
    text: JSON.stringify({
        "test": "verylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstring",
    }),
};

export const LongJson = Template.bind({});
LongJson.args = {
    text: JSON.stringify(
        range(0, 100)
            .reduce((memo, item) => ({
                ...memo,
                [`test${item}`]: `test${item}`,
            }),
            {}
        ),
    ),
};

export const Text = Template.bind({});
Text.args = {
    text: "verylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstringverylongstring",
};
