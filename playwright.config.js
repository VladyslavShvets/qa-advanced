const { defineConfig, devices } = require("@playwright/test")
require("dotenv").config({ quiet: true })

const requiredEnv = (name) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const baseURL = requiredEnv("QAUTO_BASE_URL")
const username = requiredEnv("QAUTO_AUTH_USERNAME")
const password = requiredEnv("QAUTO_AUTH_PASSWORD")

module.exports = defineConfig({
  testDir: "./playwright/tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    httpCredentials: {
      username,
      password,
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
