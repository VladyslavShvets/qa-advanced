const { defineConfig } = require("cypress")
const baseConfig = require("./cypress.config")

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto2.forstudy.space",
    env: {
      userEmail: "vladyslav.shvets.hw21.qauto2.1780870000002@gmail.com",
      userPassword: "Password1",
    },
  },
})
