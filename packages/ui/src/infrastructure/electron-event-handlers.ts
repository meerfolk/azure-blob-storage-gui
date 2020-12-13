import { SETTINGS_OPEN } from '@az-blobs/app/src/messages';
import { IpcRenderer } from 'electron';

interface MyWindow extends Window {
    electronEventBus: IpcRenderer;
}

export class ElectronEventHandler {
    constructor(private readonly onSettingsOpen: () => void) {}

    public init() {
        (window as unknown as MyWindow).electronEventBus.on(SETTINGS_OPEN, this.onSettingsOpen);
    }
}