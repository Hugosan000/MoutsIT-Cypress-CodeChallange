const { defineConfig } = require("cypress");
const fs = require('fs-extra')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      on('task', {
        deleteFolder(folderName) {
          if (fs.existsSync(folderName)) {
            fs.removeSync(folderName);
          }
          return null;
        }
      })
      return {
        ...config,
        viewportWidth: 1920,
        viewportHeight: 1080,
        video: false,
        screenshotOnRunFailure: false,
      };
    },
    env: {
      EMAIL: 'fct94@live.com',
      PASSWORD: 'FcT1994!',
      TOKEN: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZjdDk0QGxpdmUuY29tIiwicGFzc3dvcmQiOiJGY1QxOTk0ISIsImlhdCI6MTczMzk1MDI3NSwiZXhwIjoxNzMzOTUwODc1fQ.PGcj-o6FK68Ic0NVcs_KKmTga3gGF4ig6yTLmHNUZuY',
      apiUrl: 'https://serverest.dev',
      webUrl: 'https://front.serverest.dev/login'
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  },
});
