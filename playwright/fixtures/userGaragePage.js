const { test: base, expect } = require("@playwright/test")

const GaragePage = require("../pages/GaragePage")

const storageState = "playwright/.auth/user.json"

const test = base.extend({
  userGaragePage: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext({
      baseURL,
      storageState,
    })
    const page = await context.newPage()
    const garagePage = new GaragePage(page)

    await page.goto("/panel/garage")
    await garagePage.expectOpened()

    await use(garagePage)
    await context.close()
  },
})

module.exports = { test, expect }
