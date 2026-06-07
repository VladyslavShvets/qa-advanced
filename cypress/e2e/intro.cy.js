describe("Intro to Cypress", () => {
  it("adds a new todo item on the Cypress example app", () => {
    cy.visit("/todo")

    cy.get(".todo-list li").should("have.length", 2)
    cy.get("[data-test=new-todo]").type("Learn Cypress basics{enter}")
    cy.get(".todo-list li").should("have.length", 3)
    cy.get(".todo-list li")
      .last()
      .should("contain.text", "Learn Cypress basics")
  })
})
