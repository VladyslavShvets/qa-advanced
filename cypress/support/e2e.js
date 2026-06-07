Cypress.Commands.add("visitQAutoHomePage", () => {
  cy.visit("/", {
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
  })
})
