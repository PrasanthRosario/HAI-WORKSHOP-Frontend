// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Frameworks to be used for testing
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    // List of plugins required for test execution
    plugins: [
      require('karma-jasmine'),              // Jasmine testing framework integration
      require('karma-chrome-launcher'),       // Chrome browser launcher
      require('karma-jasmine-html-reporter'), // Generates HTML test results
      require('karma-coverage'),              // Code coverage reporter
      require('@angular-devkit/build-angular/plugins/karma') // Angular build integration
    ],

    // Client configuration
    client: {
      jasmine: {
        // Configuration options for Jasmine
        // See: https://jasmine.github.io/api/edge/Configuration.html
        // Examples:
        // random: false - Disable random test execution
        // seed: 4321 - Set specific random seed
      },
      clearContext: false // Keeps Jasmine Spec Runner output visible in browser
    },

    // Configuration for the HTML reporter
    jasmineHtmlReporter: {
      suppressAll: true // Removes duplicate stack traces
    },

    // Configuration for code coverage reporting
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/frontend'), // Output directory
      subdir: '.',
      reporters: [
        { type: 'html' },      // Generates HTML coverage report
        { type: 'text-summary' } // Generates console summary
      ]
    },

    // Test results reporters to use
    reporters: ['progress', 'kjhtml'],

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging
    logLevel: config.LOG_INFO,

    // Enable / disable watching files and executing tests on file changes
    autoWatch: true,

    // Browsers to launch and capture
    browsers: ['Chrome'],

    // Continuous Integration mode
    // If true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Restart tests on file changes
    restartOnFileChange: true
  });
};