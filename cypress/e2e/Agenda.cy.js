describe('template spec', () => {
    it('passes', () => {
      // login command (is defined in cypress/support/commands.js)
      cy.login('cypresstest@gmail.com', 'cypresstest');
  
      // --------------------------------
      // Testing the Alle verlof aanvragen flow
      // Test is complete when the bot reaches the alle verlof aanvragen page
      // --------------------------------
  
      //bot is op homepage
      cy.get('[data-testid="homepage-title"]').should('exist');
  
      //bot klikt op alle aanvragen button
      cy.get('[data-testid="next-month-button"]').click();
      cy.get('[data-testid="last-month-button"]').click();
      cy.get('[data-testid="last-month-button"]').click();
  
      
    })
  })