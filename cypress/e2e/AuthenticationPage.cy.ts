describe('template spec', () => {
  it('Contains correct text on login form', () => {
    cy.visit('/');
    cy.get('[data-test="header"]').should('contain.text','Zutopia');
  })
  it('InputField work correctly',()=>{
    cy.visit('/');  
  })
})