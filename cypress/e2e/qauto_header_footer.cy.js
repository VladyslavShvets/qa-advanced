describe("QAuto home page header and footer", () => {
  beforeEach(() => {
    cy.visitQAutoHomePage()
  })

  it("finds all header navigation links and buttons", () => {
    cy.get("app-header").within(() => {
      cy.get(".header_logo").should("be.visible").and("have.attr", "href", "/")

      cy.contains(".header-link", "Home")
        .should("be.visible")
        .and("have.attr", "href", "/")

      cy.contains("button.header-link", "About").should("be.visible")
      cy.contains("button.header-link", "Contacts").should("be.visible")
      cy.contains("button.header-link", "Guest log in").should("be.visible")
      cy.contains("button.header_signin", "Sign In").should("be.visible")
    })
  })

  it("finds all contact social links", () => {
    const socialLinks = [
      {
        iconClass: "icon-facebook",
        href: "https://www.facebook.com/Hillel.IT.School",
      },
      {
        iconClass: "icon-telegram",
        href: "https://t.me/ithillel_kyiv",
      },
      {
        iconClass: "icon-youtube",
        href: "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1",
      },
      {
        iconClass: "icon-instagram",
        href: "https://www.instagram.com/hillel_itschool/",
      },
      {
        iconClass: "icon-linkedin",
        href: "https://www.linkedin.com/school/ithillel/",
      },
    ]

    cy.get("#contactsSection .socials_link")
      .should("have.length", socialLinks.length)
      .each(($link, index) => {
        cy.wrap($link)
          .should("be.visible")
          .and("have.attr", "href", socialLinks[index].href)
          .and("have.attr", "target", "_blank")
          .and("have.attr", "rel", "nofollow")

        cy.wrap($link)
          .find(`.socials_icon.${socialLinks[index].iconClass}`)
          .should("exist")
      })
  })

  it("finds contact website and email links", () => {
    cy.get("#contactsSection").within(() => {
      cy.contains("h2", "Contacts").should("be.visible")

      cy.contains("a.contacts_link", "ithillel.ua")
        .should("be.visible")
        .and("have.attr", "href", "https://ithillel.ua")
        .and("have.attr", "target", "_blank")
        .and("have.attr", "rel", "nofollow")

      cy.contains("a.contacts_link", "support@ithillel.ua")
        .should("be.visible")
        .and("have.attr", "href", "mailto:developer@ithillel.ua")
    })
  })

  it("finds footer text and logo link", () => {
    cy.get("app-footer").within(() => {
      cy.contains("© 2021 Hillel IT school").should("be.visible")
      cy.contains(
        "Hillel auto developed in Hillel IT school for educational purposes of QA courses."
      ).should("be.visible")

      cy.get(".footer_logo").should("be.visible").and("have.attr", "href", "/")
      cy.get(".footer_logo svg").should("be.visible")
    })
  })
})
