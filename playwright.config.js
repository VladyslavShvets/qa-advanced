const { defineConfig, devices } = require("@playwright/test")

module.exports = defineConfig({
  testDir: "./playwright/tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "https://qauto.forstudy.space",
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
