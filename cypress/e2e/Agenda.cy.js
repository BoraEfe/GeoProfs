describe('template spec', () => {
    it('passes', () => {
      // login command (is defined in cypress/support/commands.js)
      cy.login('cypresstest@gmail.com', 'cypresstest');
  
      // --------------------------------
      // Testing the Agenda of hij tussen de maanden kan switchen
      // --------------------------------
  
      //bot is op homepage
      cy.get('[data-testid="homepage-title"]').should('exist');
  
      //bot klikt op agenda buttons
      cy.get('[data-testid="next-month-button"]').click();
      cy.wait(3000);
      cy.get('[data-testid="last-month-button"]').click();
      cy.wait(2000);
      cy.get('[data-testid="last-month-button"]').click();
  
      
    })
  })