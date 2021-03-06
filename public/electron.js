const electron = require("electron");
const mkdirp = require('mkdirp');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require("path");

const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        backgroundColor: '#171e24',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.on("closed", () => (mainWindow = null));
}

app.allowRendererProcessReuse = false;
app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

