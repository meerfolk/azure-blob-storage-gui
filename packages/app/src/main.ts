import { app, BrowserWindow } from 'electron';
import { join } from 'path';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
  });

  mainWindow.loadFile(join(__dirname, '../../ui/dist/index.html'));

  mainWindow.webContents.openDevTools();
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
