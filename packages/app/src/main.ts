import { app, BrowserWindow } from 'electron';
import { join } from 'path';

import { Menu } from './menu';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(join(__dirname, './ui/index.html'));

  app.setName('AZBlobs');
  new Menu(app, mainWindow.webContents).create();
}

app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
