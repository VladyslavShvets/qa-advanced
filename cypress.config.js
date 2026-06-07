const { defineConfig } = require("cypress")

module.exports = defineConfig({
  allowCypressEnv: false,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    env: {
      userEmail: "vladyslav.shvets.hw21.qauto.1780870000001@gmail.com",
      userPassword: "Password1",
    },
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotOnRunFailure: true,
  },
})
