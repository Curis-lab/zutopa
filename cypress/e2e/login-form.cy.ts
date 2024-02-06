describe("Login Form Test", () => {
  it("Red Notification Appear on Email Box", () => {
    cy.visit("/");
    cy.get('[dataTest="formfield-email"]');
    cy.get('[data-test="submit-button"]').click().pause();
  });
  it("Fundamental Testing Title", () => {
    cy.visit("/");
    cy.get('[data-test="fundamental-header"]').should(
      "contain.text",
      "Zutopia"
    );
  });
  it("Data Collected Test", () => {});
});