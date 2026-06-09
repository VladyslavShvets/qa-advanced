const { test, expect } = require("@playwright/test")

const GaragePage = require("../pages/GaragePage")
const HomePage = require("../pages/HomePage")
const LoginModal = require("../pages/LoginModal")

const storageState = "playwright/.auth/user.json"

const requiredEnv = (name) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const user = {
  name: requiredEnv("QAUTO_USER_NAME"),
  lastName: requiredEnv("QAUTO_USER_LAST_NAME"),
  email: requiredEnv("QAUTO_USER_EMAIL"),
  password: requiredEnv("QAUTO_USER_PASSWORD"),
}

const openLoginModal = async (page) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Sign In" }).click()

  const loginModal = new LoginModal(page)
  await loginModal.expectOpened()

  return loginModal
}

test("authenticate user and save storage state", async ({ page }) => {
  const loginModal = await openLoginModal(page)

  await loginModal.login(user.email, user.password)

  const loggedIn = await page
    .waitForURL(/\/panel\/garage/, { timeout: 3000 })
    .then(() => true)
    .catch(() => false)

  if (!loggedIn) {
    const registrationModal = await new HomePage(page).openRegistrationModal()

    await registrationModal.fill(user)
    await registrationModal.expectRegisterButtonEnabled()
    await registrationModal.submit()
  }

  const garagePage = new GaragePage(page)

  await garagePage.expectOpened()
  await expect(page.getByRole("button", { name: "Add car" })).toBeVisible()
  await page.context().storageState({ path: storageState })
})
