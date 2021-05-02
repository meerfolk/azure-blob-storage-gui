<template>
    <b-button @click="openUploadDialog">
        Upload
    </b-button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const blobListStore = namespace('blobList');

@Component({
    name: 'upload-button',
})
export default class UploadButton extends Vue {
    @blobListStore.Action
    public openUploadDialog: () => void
}
</script>