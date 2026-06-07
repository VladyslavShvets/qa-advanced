Cypress.Commands.add("visitQAutoHomePage", () => {
  cy.visit("/", {
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
  })
})

Cypress.Commands.add("openRegistrationModal", () => {
  cy.visitQAutoHomePage()
  cy.contains("button", "Sign up").click()
  cy.contains(".modal-title", "Registration").should("be.visible")
})

Cypress.Commands.add("login", (email, password) => {
  cy.visitQAutoHomePage()
  cy.contains("button", "Sign In").click()
  cy.contains(".modal-title", "Log in").should("be.visible")

  cy.get("#signinEmail").type(email)
  cy.get("#signinPassword").type(password, { sensitive: true })
  cy.contains(".modal-footer button", "Login").click()

  cy.url().should("include", "/panel/garage")
  cy.contains("button", "Add car").should("be.visible")
})

Cypress.Commands.overwrite(
  "type",
  (originalFn, element, text, options = {}) => {
    if (options.sensitive) {
      options.log = false

      Cypress.log({
        $el: element,
        name: "type",
        message: "*".repeat(text.length),
      })
    }

    return originalFn(element, text, options)
  }
)
