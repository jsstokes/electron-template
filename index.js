const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', ({}) => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`);
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    // mainWindow.webContents.toggleDevTools();
});

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() { app.quit(); }
            }
        ]
    }
];

/*
 * Compensate for MACOS menu behavior
 */
if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({label: 'Empty'});
}

/*
 * Add developer tools in test env
 */
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I': "Ctrl+Alt+I",
                click(item, focusedWindow) {
                    focusedWindow.webContents.toggleDevTools();
                }
            }
        ]
    });
}