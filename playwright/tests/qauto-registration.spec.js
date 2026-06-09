const { test, expect } = require("@playwright/test")

const validUser = () => {
  const timestamp = Date.now()

  return {
    name: "Vlad",
    lastName: "Shvets",
    email: `aqa-playwright-${timestamp}@test.com`,
    password: "Password1",
  }
}

const openRegistrationModal = async (page) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Sign up" }).click()
  await expect(page.locator(".modal-title")).toHaveText("Registration")
}

const fillRegistrationForm = async (
  page,
  { name, lastName, email, password, repeatPassword = password }
) => {
  await page.locator("#signupName").fill(name)
  await page.locator("#signupLastName").fill(lastName)
  await page.locator("#signupEmail").fill(email)
  await page.locator("#signupPassword").fill(password)
  await page.locator("#signupRepeatPassword").fill(repeatPassword)
}

const expectFieldError = async (page, selector, message) => {
  const field = page.locator(selector)
  const group = field.locator(
    "xpath=ancestor::*[contains(@class, 'form-group')]"
  )

  await expect(field).toHaveClass(/is-invalid/)
  await expect(group.locator(".invalid-feedback")).toContainText(message)
}

test.describe("QAuto registration", () => {
  test.beforeEach(async ({ page }) => {
    await openRegistrationModal(page)
  })

  test("shows the registration form with all required controls", async ({
    page,
  }) => {
    await expect(page.locator(".modal-content")).toBeVisible()
    await expect(page.locator("#signupName")).toBeVisible()
    await expect(page.locator("#signupLastName")).toBeVisible()
    await expect(page.locator("#signupEmail")).toBeVisible()
    await expect(page.locator("#signupPassword")).toBeVisible()
    await expect(page.locator("#signupRepeatPassword")).toBeVisible()
    await expect(
      page.locator(".modal-footer").getByRole("button", { name: "Register" })
    ).toBeDisabled()
  })

  test("registers a user with valid data and unique prefixed email", async ({
    page,
  }) => {
    const user = validUser()

    await fillRegistrationForm(page, user)
    await expect(
      page.locator(".modal-footer").getByRole("button", { name: "Register" })
    ).toBeEnabled()
    await page
      .locator(".modal-footer")
      .getByRole("button", { name: "Register" })
      .click()

    await expect(page).toHaveURL(/\/panel\/garage/)
    await expect(page.getByRole("button", { name: "Add car" })).toBeVisible()
  })

  test("shows required errors for empty mandatory fields", async ({ page }) => {
    const fields = [
      ["#signupName", "Name required"],
      ["#signupLastName", "Last name required"],
      ["#signupEmail", "Email required"],
      ["#signupPassword", "Password required"],
      ["#signupRepeatPassword", "Re-enter password required"],
    ]

    for (const [selector] of fields) {
      await page.locator(selector).focus()
      await page.locator(selector).blur()
    }

    for (const [selector, message] of fields) {
      await expectFieldError(page, selector, message)
    }

    await expect(
      page.locator(".modal-footer").getByRole("button", { name: "Register" })
    ).toBeDisabled()
  })

  test("validates name length and symbols", async ({ page }) => {
    await page.locator("#signupName").fill("A")
    await page.locator("#signupName").blur()
    await expectFieldError(
      page,
      "#signupName",
      "Name has to be from 2 to 20 characters long"
    )

    await page.locator("#signupName").fill("John1")
    await page.locator("#signupName").blur()
    await expectFieldError(page, "#signupName", "Name is invalid")
  })

  test("validates last name length and symbols", async ({ page }) => {
    await page.locator("#signupLastName").fill("B")
    await page.locator("#signupLastName").blur()
    await expectFieldError(
      page,
      "#signupLastName",
      "Last name has to be from 2 to 20 characters long"
    )

    await page.locator("#signupLastName").fill("Doe1")
    await page.locator("#signupLastName").blur()
    await expectFieldError(page, "#signupLastName", "Last name is invalid")
  })

  test("validates incorrect email format", async ({ page }) => {
    await page.locator("#signupEmail").fill("wrong-email")
    await page.locator("#signupEmail").blur()

    await expectFieldError(page, "#signupEmail", "Email is incorrect")
  })

  test("validates password complexity", async ({ page }) => {
    await page.locator("#signupPassword").fill("password")
    await page.locator("#signupPassword").blur()

    await expectFieldError(
      page,
      "#signupPassword",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    )
  })

  test("validates password confirmation mismatch", async ({ page }) => {
    const user = validUser()

    await fillRegistrationForm(page, {
      ...user,
      repeatPassword: "Password2",
    })
    await page.locator("#signupRepeatPassword").blur()

    await expectFieldError(
      page,
      "#signupRepeatPassword",
      "Passwords do not match"
    )
    await expect(
      page.locator(".modal-footer").getByRole("button", { name: "Register" })
    ).toBeDisabled()
  })
})
