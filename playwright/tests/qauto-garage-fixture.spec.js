const { test } = require("../fixtures/userGaragePage")

test.describe("QAuto authenticated garage", () => {
  test("opens garage page with saved user storage state", async ({
    userGaragePage,
  }) => {
    await userGaragePage.expectOpened()
  })
})
