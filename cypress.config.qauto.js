const { defineConfig } = require("cypress")
const baseConfig = require("./cypress.config")

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto.forstudy.space",
    env: {
      userEmail: "vladyslav.shvets.hw21.qauto.1780870000001@gmail.com",
      userPassword: "Password1",
    },
  },
})
