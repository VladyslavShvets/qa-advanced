const RegistrationModal = require("./RegistrationModal")

class HomePage {
  constructor(page) {
    this.page = page
    this.signUpButton = page.getByRole("button", { name: "Sign up" })
  }

  async open() {
    await this.page.goto("/")
  }

  async openRegistrationModal() {
    await this.open()
    await this.signUpButton.click()

    const registrationModal = new RegistrationModal(this.page)
    await registrationModal.expectOpened()

    return registrationModal
  }
}

module.exports = HomePage
