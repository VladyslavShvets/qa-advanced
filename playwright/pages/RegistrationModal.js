const { expect } = require("@playwright/test")

class RegistrationModal {
  constructor(page) {
    this.page = page
    this.modal = page.locator(".modal-content")
    this.title = page.locator(".modal-title")
    this.nameInput = page.locator("#signupName")
    this.lastNameInput = page.locator("#signupLastName")
    this.emailInput = page.locator("#signupEmail")
    this.passwordInput = page.locator("#signupPassword")
    this.repeatPasswordInput = page.locator("#signupRepeatPassword")
    this.registerButton = page
      .locator(".modal-footer")
      .getByRole("button", { name: "Register" })
    this.fields = {
      name: this.nameInput,
      lastName: this.lastNameInput,
      email: this.emailInput,
      password: this.passwordInput,
      repeatPassword: this.repeatPasswordInput,
    }
  }

  async expectOpened() {
    await expect(this.title).toHaveText("Registration")
  }

  async expectRequiredControlsVisible() {
    await expect(this.modal).toBeVisible()
    await expect(this.nameInput).toBeVisible()
    await expect(this.lastNameInput).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.repeatPasswordInput).toBeVisible()
  }

  async fill({ name, lastName, email, password, repeatPassword = password }) {
    await this.nameInput.fill(name)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.repeatPasswordInput.fill(repeatPassword)
  }

  async fillField(fieldName, value) {
    await this.fields[fieldName].fill(value)
  }

  async blurField(fieldName) {
    await this.fields[fieldName].blur()
  }

  async focusAndBlurField(fieldName) {
    await this.fields[fieldName].focus()
    await this.fields[fieldName].blur()
  }

  async submit() {
    await this.registerButton.click()
  }

  async expectRegisterButtonEnabled() {
    await expect(this.registerButton).toBeEnabled()
  }

  async expectRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled()
  }

  async expectFieldError(fieldName, message) {
    const field = this.fields[fieldName]
    const group = field.locator(
      "xpath=ancestor::*[contains(@class, 'form-group')]"
    )

    await expect(field).toHaveClass(/is-invalid/)
    await expect(group.locator(".invalid-feedback")).toContainText(message)
  }
}

module.exports = RegistrationModal
