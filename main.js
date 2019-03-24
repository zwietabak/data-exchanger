const electron = require("electron");
const express = require('express');
const bonjour = require('bonjour')();
const ip = require('ip');
const bodyParser = require('body-parser');
const path = require('path');
const appConfig = require('./config/appConfig.js');
const formidable = require('formidable');
const GlobalsManager = require('./globals.js');

const electronApp = electron.app;
const BrowserWindow = electron.BrowserWindow;

const apiApp = express();

// import routes here
const imageUpload = require('./routes/imageUpload.route');

// define root-routes here
apiApp.use('/imageUpload', imageUpload);
// interface ServiceOptions {
//     name: string;
//     host?: string;
//     port: number;
//     type: string;
//     subtypes?: string[];
//     protocol?: 'udp'|'tcp';
//     txt?: Object;
// }
const bonjourService = bonjour.publish({
    name:   "imageService",
    host:   ip.address(),
    type:   "http",
    port:   appConfig.apiPort
});
bonjourService.start();

// let mainWindow;

createWindow = () => {
    GlobalsManager.mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    // load index.html
    GlobalsManager.mainWindow.loadURL(`file://${__dirname}/view/index.html`);

    // this will open the dev-tools
    GlobalsManager.mainWindow.webContents.openDevTools();

    // emit when window is closed
    GlobalsManager.mainWindow.on('close', () => {
        mainWindow = null;
    });

    GlobalsManager.mainWindow.webContents.on('did-finish-load', () => {

    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electronApp.on('ready', createWindow);

// quit when all windows are closed
electronApp.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electronApp.quit();
    }
});

electronApp.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

bonjourService.on('up', () => {
    console.log('service is published and started');
});

apiApp.listen(appConfig.apiPort, ip.address(), () => {
    console.log(`API running on port ${appConfig.apiPort}`)
});
