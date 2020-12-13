import {
    Menu as EMenu,
    App,
    MenuItem,
    MenuItemConstructorOptions,
    WebContents,
} from 'electron';

import { SETTINGS_OPEN } from './messages';

export class Menu {
    private readonly isMac: boolean = false;
    private readonly baseSubMenus: MenuItemConstructorOptions[] = [
        {
            label: 'Settings',
            click: () => {
                this.content.send(SETTINGS_OPEN);
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

    public create(): void {
        const template = this.isMac
            ? [ this.nameMenu() ]
            : [ this.fileMenu() ];

        const menu = EMenu.buildFromTemplate(template);

        EMenu.setApplicationMenu(menu);
    }
}