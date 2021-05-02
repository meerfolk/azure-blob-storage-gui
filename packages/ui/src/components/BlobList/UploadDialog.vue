<template>
    <b-modal
        id="upload-dialog"
        title="Upload blob"
        ok-title="Upload"
        :visible="isUploadDialogOpen"
        :ok-disabled="isUploadDisabled"
        @ok="onOkClick"
    >
        <b-form-file
            v-model="file"
            :state="Boolean(file)"

        />
        <b-form-input
            v-model="fileName"
            :state="Boolean(fileName)"
        />
    </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const blobListStore = namespace('blobList');

@Component({
    name: 'upload-blob-dialog',
})
export default class UploadDialog extends Vue {
    @blobListStore.State
    public isUploadDialogOpen: boolean;

    @blobListStore.Action
    public closeUploadDialog: () => void;

    @blobListStore.Action
    public uploadBlob: (name: string, file: File) => void;

    public file: File = null;
    public fileName: string = '';

    public get isUploadDisabled(): boolean {
        return !(Boolean(this.file) && Boolean(this.fileName));
    } 

    public onOkClick(event: Event): void {
        event.preventDefault();
        this.uploadBlob({
            file: this.file,
            name: this.fileName,
        });
    }
}
</script>