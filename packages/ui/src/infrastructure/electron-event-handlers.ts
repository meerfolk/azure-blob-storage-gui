import { messages } from '@az-blobs/common';
import { IpcRenderer } from 'electron';

interface MyWindow extends Window {
    electronEventBus: IpcRenderer;
}

export class ElectronEventHandler {
    constructor(private readonly onSettingsOpen: () => void) {}

    public init() {
        (window as unknown as MyWindow).electronEventBus.on(
            messages.SETTINGS_OPEN,
            this.onSettingsOpen,
        );
    }
}