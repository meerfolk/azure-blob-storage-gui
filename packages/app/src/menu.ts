import { Menu as EMenu, App, MenuItem, MenuItemConstructorOptions } from 'electron';

export class Menu {
    private readonly isMac: boolean = false;
    private readonly baseSubMenus: MenuItemConstructorOptions[] = [
        { type: 'separator' },
        { role: 'quit' },
    ];

    constructor(private readonly app: App) {
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