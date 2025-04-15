const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000' // 개발용: React dev 서버
      : `file://${path.join(__dirname, 'build/index.html')}` // 배포용: 빌드된 파일
  );

}

app.whenReady().then(createWindow);