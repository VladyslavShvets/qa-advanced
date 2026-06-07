class GaragePage {
  visit() {
    cy.visitQAutoPage("/panel/garage")
    cy.contains("h1", "Garage").should("be.visible")
  }

  openAddCarModal() {
    cy.contains("button", "Add car").click()
    cy.contains(".modal-title", "Add a car").should("be.visible")
  }

  addCar({ brand, model, mileage }) {
    this.openAddCarModal()
    cy.get("#addCarBrand").should("be.enabled").select(brand)
    cy.get("#addCarModel").should("be.enabled").select(model)
    cy.get("#addCarMileage").clear().type(String(mileage))
    cy.contains(".modal-footer button", "Add").should("be.enabled").click()
    cy.contains(".car_name", `${brand} ${model}`).should("be.visible")
  }

  openFuelExpenses() {
    cy.contains("a", "Fuel expenses").click()
    cy.contains("h1", "Fuel expenses").should("be.visible")
  }
}

module.exports = GaragePage
