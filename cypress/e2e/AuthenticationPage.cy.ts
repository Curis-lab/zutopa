describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Contains correct text on login form", () => {
    cy.getDataTest("header").should("contain.text", "Zutopia");
  });
});
