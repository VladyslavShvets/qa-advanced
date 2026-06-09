const { test } = require("@playwright/test")

const GaragePage = require("../pages/GaragePage")
const HomePage = require("../pages/HomePage")

const validUser = () => {
  const timestamp = Date.now()

  return {
    name: "Vlad",
    lastName: "Shvets",
    email: `aqa-playwright-${timestamp}@test.com`,
    password: "Password1",
  }
}

test.describe("QAuto registration", () => {
  let registrationModal

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)

    registrationModal = await homePage.openRegistrationModal()
  })

  test("shows the registration form with all required controls", async () => {
    await registrationModal.expectRequiredControlsVisible()
    await registrationModal.expectRegisterButtonDisabled()
  })

  test("registers a user with valid data and unique prefixed email", async ({
    page,
  }) => {
    const user = validUser()
    const garagePage = new GaragePage(page)

    await registrationModal.fill(user)
    await registrationModal.expectRegisterButtonEnabled()
    await registrationModal.submit()

    await garagePage.expectOpened()
  })

  test("shows required errors for empty mandatory fields", async () => {
    const fields = [
      ["name", "Name required"],
      ["lastName", "Last name required"],
      ["email", "Email required"],
      ["password", "Password required"],
      ["repeatPassword", "Re-enter password required"],
    ]

    for (const [fieldName] of fields) {
      await registrationModal.focusAndBlurField(fieldName)
    }

    for (const [fieldName, message] of fields) {
      await registrationModal.expectFieldError(fieldName, message)
    }

    await registrationModal.expectRegisterButtonDisabled()
  })

  test("validates name length and symbols", async () => {
    await registrationModal.fillField("name", "A")
    await registrationModal.blurField("name")
    await registrationModal.expectFieldError(
      "name",
      "Name has to be from 2 to 20 characters long"
    )

    await registrationModal.fillField("name", "John1")
    await registrationModal.blurField("name")
    await registrationModal.expectFieldError("name", "Name is invalid")
  })

  test("validates last name length and symbols", async () => {
    await registrationModal.fillField("lastName", "B")
    await registrationModal.blurField("lastName")
    await registrationModal.expectFieldError(
      "lastName",
      "Last name has to be from 2 to 20 characters long"
    )

    await registrationModal.fillField("lastName", "Doe1")
    await registrationModal.blurField("lastName")
    await registrationModal.expectFieldError("lastName", "Last name is invalid")
  })

  test("validates incorrect email format", async () => {
    await registrationModal.fillField("email", "wrong-email")
    await registrationModal.blurField("email")

    await registrationModal.expectFieldError("email", "Email is incorrect")
  })

  test("validates password complexity", async () => {
    await registrationModal.fillField("password", "password")
    await registrationModal.blurField("password")

    await registrationModal.expectFieldError(
      "password",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    )
  })

  test("validates password confirmation mismatch", async () => {
    const user = validUser()

    await registrationModal.fill({
      ...user,
      repeatPassword: "Password2",
    })
    await registrationModal.blurField("repeatPassword")

    await registrationModal.expectFieldError(
      "repeatPassword",
      "Passwords do not match"
    )
    await registrationModal.expectRegisterButtonDisabled()
  })
})
