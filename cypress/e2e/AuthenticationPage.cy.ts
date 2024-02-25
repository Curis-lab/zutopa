describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Contains correct text on login form", () => {
    cy.getDataTest("header").should("contain.text", "Zutopia");
    cy.get("#user-ssn").should("have.value", "123-45-883");
  });
});
