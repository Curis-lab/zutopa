describe("Login Form Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Red Notification Appear on Email Box", () => {
    cy.get('[dataTest="formfield-email"]');
    cy.get('[data-test="submit-button"]').click().pause();
  });
  it("Fundamental Testing Title", () => {
    cy.get('[data-test="fundamental-header"]').should(
      "contain.text",
      "Zutopia"
    );
  });
  it("should should validation errors when leaving all blanks", () => {});
  it("Data Collected Test", () => {});
});
