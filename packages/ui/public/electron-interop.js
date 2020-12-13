const ipc = require('electron').ipcRenderer;

// @ts-ignore
window.electronEventBus = ipc;