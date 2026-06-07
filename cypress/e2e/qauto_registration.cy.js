const getUniqueUser = () => {
  const timestamp = Date.now()

  return {
    name: "Vlad",
    lastName: "Shvets",
    email: `vladyslav.shvets.${timestamp}@gmail.com`,
    password: "Password1",
  }
}

const fillRegistrationForm = ({
  name,
  lastName,
  email,
  password,
  repeatPassword = password,
}) => {
  cy.get("#signupName").clear().type(name)
  cy.get("#signupLastName").clear().type(lastName)
  cy.get("#signupEmail").clear().type(email)
  cy.get("#signupPassword").clear().type(password, { sensitive: true })
  cy.get("#signupRepeatPassword")
    .clear()
    .type(repeatPassword, { sensitive: true })
}

const expectFieldError = (selector, message) => {
  cy.get(selector)
    .should("have.class", "is-invalid")
    .parents(".form-group")
    .find(".invalid-feedback")
    .should("contain.text", message)
}

describe("QAuto registration", () => {
  beforeEach(() => {
    cy.openRegistrationModal()
  })

  it("shows the registration form with all required controls", () => {
    cy.get(".modal-content").within(() => {
      cy.contains(".modal-title", "Registration").should("be.visible")
      cy.get("#signupName").should("be.visible")
      cy.get("#signupLastName").should("be.visible")
      cy.get("#signupEmail").should("be.visible")
      cy.get("#signupPassword").should("be.visible")
      cy.get("#signupRepeatPassword").should("be.visible")
      cy.contains(".modal-footer button", "Register").should("be.disabled")
    })
  })

  it("shows required validation errors for empty mandatory fields", () => {
    cy.get("#signupName").focus().blur()
    cy.get("#signupLastName").focus().blur()
    cy.get("#signupEmail").focus().blur()
    cy.get("#signupPassword").focus().blur()
    cy.get("#signupRepeatPassword").focus().blur()

    expectFieldError("#signupName", "Name required")
    expectFieldError("#signupLastName", "Last name required")
    expectFieldError("#signupEmail", "Email required")
    expectFieldError("#signupPassword", "Password required")
    expectFieldError("#signupRepeatPassword", "Re-enter password required")
    cy.contains(".modal-footer button", "Register").should("be.disabled")
  })

  it("shows validation errors for invalid registration data", () => {
    cy.get("#signupName").type("A").blur()
    expectFieldError(
      "#signupName",
      "Name has to be from 2 to 20 characters long"
    )

    cy.get("#signupName").clear().type("John1").blur()
    expectFieldError("#signupName", "Name is invalid")

    cy.get("#signupLastName").type("B").blur()
    expectFieldError(
      "#signupLastName",
      "Last name has to be from 2 to 20 characters long"
    )

    cy.get("#signupLastName").clear().type("Doe1").blur()
    expectFieldError("#signupLastName", "Last name is invalid")

    cy.get("#signupEmail").type("wrong-email").blur()
    expectFieldError("#signupEmail", "Email is incorrect")

    cy.get("#signupPassword").type("password", { sensitive: true }).blur()
    expectFieldError(
      "#signupPassword",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    )

    cy.get("#signupRepeatPassword")
      .type("Password2", { sensitive: true })
      .blur()
    expectFieldError("#signupRepeatPassword", "Passwords do not match")
    cy.contains(".modal-footer button", "Register").should("be.disabled")
  })

  it("registers a unique user and logs in with the custom login command", () => {
    const user = getUniqueUser()

    fillRegistrationForm(user)
    cy.contains(".modal-footer button", "Register").should("be.enabled").click()
    cy.url().should("include", "/panel/garage")
    cy.contains("button", "Add car").should("be.visible")

    cy.clearCookies()
    cy.clearLocalStorage()
    cy.login(user.email, user.password)
  })
})
