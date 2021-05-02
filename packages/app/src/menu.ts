import {
    Menu as EMenu,
    App,
    MenuItem,
    MenuItemConstructorOptions,
    WebContents,
} from 'electron';

import { messages } from '@az-blobs/common';

export class Menu {
    private readonly isMac: boolean = false;
    private readonly baseSubMenus: MenuItemConstructorOptions[] = [
        {
            label: 'Settings',
            click: () => {
                this.content.send(messages.SETTINGS_OPEN);
            },
        },
        { type: 'separator' },
        { role: 'quit' },
    ];

    constructor(private readonly app: App, private readonly content: WebContents) {
        this.isMac = process.platform === 'darwin';
    }

    private nameMenu(): MenuItem {
        return new MenuItem({
            label: this.app.name,
            submenu: this.baseSubMenus,
        });
    }

    private fileMenu(): MenuItem {
        return new MenuItem({
            label: 'File',
            submenu: this.baseSubMenus,
        });
    }
    
    private editMenu(): MenuItem {
        return new MenuItem({
            label: 'Edit',
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", role: 'undo' },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: 'redo' },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectAll" }
            ],
        });
    }

    public create(): void {
        const template = this.isMac
            ? [ this.nameMenu(), this.editMenu() ]
            : [ this.fileMenu(), this.editMenu() ];

        const menu = EMenu.buildFromTemplate(template);

        EMenu.setApplicationMenu(menu);
    }
}