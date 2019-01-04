const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', ({}) => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`);
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
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

if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({label: 'Empyt'});
}