const { test, expect } = require("@playwright/test")

test.describe("QAuto home page", () => {
  test("shows header navigation and footer contacts", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("app-header")).toBeVisible()
    await expect(page.locator(".header_logo")).toBeVisible()
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible()
    await expect(page.getByRole("button", { name: "About" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Contacts" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible()

    await expect(page.locator("#contactsSection")).toContainText("Contacts")
    await expect(
      page.getByRole("link", { name: "ithillel.ua", exact: true })
    ).toHaveAttribute("href", "https://ithillel.ua")
    await expect(
      page.getByRole("link", { name: "support@ithillel.ua" })
    ).toHaveAttribute("href", "mailto:developer@ithillel.ua")

    await expect(page.locator("app-footer")).toContainText(
      "2021 Hillel IT school"
    )
  })
})
