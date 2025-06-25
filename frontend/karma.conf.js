// Karma configuration file
process.env.CHROME_BIN = '/usr/bin/chromium';
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--headless',
          '--disable-software-rasterizer',
          '--remote-debugging-port=9222'
        ]
      }
    },
    singleRun: true, // Cambiado a true para CI
    restartOnFileChange: false, // No reiniciar en CI
    browserDisconnectTimeout: 120000, // 2 minutos
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 240000, // 4 minutos
    captureTimeout: 240000 // 4 minutos
  });
};
