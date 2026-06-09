const { expect } = require("@playwright/test")

class LoginModal {
  constructor(page) {
    this.page = page
    this.title = page.locator(".modal-title")
    this.emailInput = page.locator("#signinEmail")
    this.passwordInput = page.locator("#signinPassword")
    this.loginButton = page
      .locator(".modal-footer")
      .getByRole("button", { name: "Login" })
  }

  async expectOpened() {
    await expect(this.title).toHaveText("Log in")
  }

  async login(email, password) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}

module.exports = LoginModal
