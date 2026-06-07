const { defineConfig } = require("cypress")

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotOnRunFailure: true,
  },
})
