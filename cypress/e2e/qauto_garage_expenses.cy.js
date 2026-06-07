const GaragePage = require("../pages/GaragePage")
const ExpensesPage = require("../pages/ExpensesPage")

const getCurrentUtcDate = () => {
  const date = new Date()
  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const year = date.getUTCFullYear()

  return `${day}.${month}.${year}`
}

describe("Garage and fuel expenses", () => {
  const garagePage = new GaragePage()
  const expensesPage = new ExpensesPage()

  it("adds a car and a fuel expense for the created car", () => {
    const uniqueMileage = 100 + (Math.floor(Date.now() / 1000) % 100000)
    const car = {
      brand: "Audi",
      model: "TT",
      mileage: uniqueMileage,
    }
    const expense = {
      vehicle: `${car.brand} ${car.model}`,
      reportedAt: getCurrentUtcDate(),
      mileage: uniqueMileage + 50,
      liters: 25,
      totalCost: 50,
    }

    cy.env(["userEmail", "userPassword"]).then(
      ({ userEmail, userPassword }) => {
        cy.login(userEmail, userPassword)
      }
    )

    garagePage.visit()
    garagePage.addCar(car)
    garagePage.openFuelExpenses()

    expensesPage.addExpense(expense)
    expensesPage.assertExpenseIsVisible(expense)
  })
})
