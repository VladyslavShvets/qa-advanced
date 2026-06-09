class ExpensesPage {
  openAddExpenseModal() {
    cy.contains("button", "Add an expense").click()
    cy.contains(".modal-title", "Add an expense").should("be.visible")
  }

  addExpense({
    vehicle,
    useCurrentVehicle = false,
    reportedAt,
    mileage,
    liters,
    totalCost,
  }) {
    this.openAddExpenseModal()

    if (!useCurrentVehicle) {
      cy.get("#addExpenseCar")
        .should("be.enabled")
        .find("option")
        .filter((_, option) => option.innerText.trim() === vehicle)
        .last()
        .invoke("val")
        .then((vehicleValue) => {
          cy.get("#addExpenseCar").select(vehicleValue)
        })
    }

    cy.get("#addExpenseDate").clear().type(reportedAt)
    cy.get("#addExpenseMileage").clear().type(String(mileage))
    cy.get("#addExpenseLiters").clear().type(String(liters))
    cy.get("#addExpenseTotalCost").clear().type(String(totalCost))
    cy.contains(".modal-footer button", "Add").should("be.enabled").click()
  }

  assertExpenseIsVisible({ mileage, liters }) {
    cy.contains("td", String(mileage)).should("be.visible")
    cy.contains("td", `${liters}L`).should("be.visible")
  }
}

module.exports = ExpensesPage
