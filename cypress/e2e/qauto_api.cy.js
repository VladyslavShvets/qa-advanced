const GaragePage = require("../pages/GaragePage")
const ExpensesPage = require("../pages/ExpensesPage")

const getCurrentUtcDate = () => {
  const date = new Date()

  return date.toISOString().split("T")[0]
}

describe("QAuto API testing with Cypress", () => {
  const garagePage = new GaragePage()
  const expensesPage = new ExpensesPage()

  it("creates a car through UI and validates it through API", () => {
    const mileage = 1000 + (Math.floor(Date.now() / 1000) % 100000)
    const car = {
      brand: "Audi",
      model: "TT",
      mileage,
    }

    cy.login(Cypress.env("userEmail"), Cypress.env("userPassword"))

    cy.intercept("POST", "**/api/cars").as("createCar")

    garagePage.visit()
    garagePage.addCar(car)

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201)
      expect(response.body.status).to.eq("ok")

      const createdCar = response.body.data

      expect(createdCar).to.include({
        brand: car.brand,
        model: car.model,
        initialMileage: car.mileage,
      })

      cy.wrap(createdCar.id).as("createdCarId")
    })

    cy.get("@createdCarId").then((createdCarId) => {
      cy.request({
        method: "GET",
        url: "/api/cars",
        auth: {
          username: "guest",
          password: "welcome2qauto",
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.status).to.eq("ok")

        const cars = response.body.data
        const createdCar = cars.find((carItem) => carItem.id === createdCarId)

        expect(createdCar).to.exist
        expect(createdCar).to.include({
          id: createdCarId,
          brand: car.brand,
          model: car.model,
          initialMileage: car.mileage,
        })
      })
    })
  })

  it("creates a fuel expense through API and validates it through UI", () => {
    const mileage = 2000 + (Math.floor(Date.now() / 1000) % 100000)
    const car = {
      brand: "Audi",
      model: "TT",
      mileage,
    }

    cy.login(Cypress.env("userEmail"), Cypress.env("userPassword"))

    cy.intercept("POST", "**/api/cars").as("createCar")

    garagePage.visit()
    garagePage.addCar(car)

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201)

      const carId = response.body.data.id
      const expense = {
        carId,
        reportedAt: getCurrentUtcDate(),
        mileage: car.mileage + 50,
        liters: 30,
        totalCost: 75,
      }

      cy.createExpense(expense).as("createdExpense")
    })

    garagePage.openFuelExpenses()
    expensesPage.assertExpenseIsVisible({
      mileage: car.mileage + 50,
      liters: 30,
    })

    cy.get("@createdExpense").then((expense) => {
      expect(expense).to.include({
        mileage: car.mileage + 50,
        liters: 30,
        totalCost: 75,
      })
    })
  })
})
