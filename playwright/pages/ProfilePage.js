const { expect } = require("@playwright/test")

class ProfilePage {
  constructor(page) {
    this.page = page
    this.title = page.getByRole("heading", { name: "Profile" })
  }

  async open() {
    await this.page.goto("/panel/profile")
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/panel\/profile/)
    await expect(this.title).toBeVisible()
  }

  async expectFullName(fullName) {
    await expect(this.page.getByText(fullName, { exact: true })).toBeVisible()
  }
}

module.exports = ProfilePage
