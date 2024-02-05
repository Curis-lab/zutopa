describe('Login Form Test',()=>{
    it('Red Notification Appear',()=>{
        cy.visit('/');
          
    })
    it('Fundamental Testing Title',()=>{
        cy.visit('/');
        cy.get('[data-test="fundamental-header"]').should('contain.text','Zutopia');
    })
    it('Data Collected Test',()=>{})
})