const { expect } = require("@playwright/test")

class GaragePage {
  constructor(page) {
    this.page = page
    this.addCarButton = page.getByRole("button", { name: "Add car" })
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/panel\/garage/)
    await expect(this.addCarButton).toBeVisible()
  }
}

module.exports = GaragePage
