describe("Login Form Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Fundamental Testing Title", () => {
    cy.get('[data-test="fundamental-header"]').should(
      "contain.text",
      "Zutopia"
    );
  });

  it("should should validation errors when leaving all blanks", () => {
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="email-error"]').should("exist");
    cy.get('[data-cy="password-error"]').should("exist");
  });

  it("shold redirect the user to a success page when filling the forms and clicking submit", () => {
    cy.get('[data-cy="email-input"]').type("nyanlin@gmail.com");
    cy.get('[data-cy="password-input"]').type("nyanlin");
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match',/\/home$/);
  });
});
