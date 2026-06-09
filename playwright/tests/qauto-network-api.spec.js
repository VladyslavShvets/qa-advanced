const { test, expect, request } = require("@playwright/test")

const ProfilePage = require("../pages/ProfilePage")

const storageState = "playwright/.auth/user.json"

const requiredEnv = (name) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const apiConfig = {
  baseURL: requiredEnv("QAUTO_BASE_URL"),
  httpCredentials: {
    username: requiredEnv("QAUTO_AUTH_USERNAME"),
    password: requiredEnv("QAUTO_AUTH_PASSWORD"),
  },
  storageState,
}

const createApiContext = async () => request.newContext(apiConfig)

const uniqueMileage = () => 1000 + (Math.floor(Date.now() / 1000) % 100000)

test.describe("QAuto network mocking", () => {
  test.use({ storageState })

  test("shows mocked user profile data from intercepted response", async ({
    page,
  }) => {
    const profilePage = new ProfilePage(page)
    const mockedProfile = {
      status: "ok",
      data: {
        userId: 1,
        photoFilename: "default-user.png",
        name: "Stanislav",
        lastName: "Taran",
      },
    }

    await page.route("**/api/users/profile", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockedProfile),
      })
    })

    await profilePage.open()
    await profilePage.expectOpened()
    await profilePage.expectFullName("Stanislav Taran")
  })
})

test.describe("QAuto cars API", () => {
  let apiContext

  test.beforeEach(async () => {
    apiContext = await createApiContext()
  })

  test.afterEach(async () => {
    await apiContext.dispose()
  })

  test("creates a car with valid data", async () => {
    const car = {
      carBrandId: 1,
      carModelId: 1,
      mileage: uniqueMileage(),
    }

    const response = await apiContext.post("/api/cars", { data: car })
    const body = await response.json()

    expect(response.status()).toBe(201)
    expect(body.status).toBe("ok")
    expect(body.data).toEqual(
      expect.objectContaining({
        carBrandId: car.carBrandId,
        carModelId: car.carModelId,
        initialMileage: car.mileage,
        mileage: car.mileage,
        brand: "Audi",
        model: "TT",
      })
    )

    const deleteResponse = await apiContext.delete(`/api/cars/${body.data.id}`)

    expect(deleteResponse.status()).toBe(200)
  })

  test("does not create a car without mileage", async () => {
    const response = await apiContext.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
      },
    })
    const body = await response.json()

    expect(response.status()).toBe(400)
    expect(body).toEqual({
      status: "error",
      message: "Mileage is required",
    })
  })

  test("does not create a car with unknown brand", async () => {
    const response = await apiContext.post("/api/cars", {
      data: {
        carBrandId: 999,
        carModelId: 1,
        mileage: uniqueMileage(),
      },
    })
    const body = await response.json()

    expect(response.status()).toBe(404)
    expect(body).toEqual({
      status: "error",
      message: "Brand not found",
    })
  })
})
