describe('template spec', () => {
  it('passes', () => {
    // login command (is defined in cypress/support/commands.js)
    cy.login('cypresstest@gmail.com', 'cypresstest');

    // --------------------------------
    // Testing the Ziekmelden flow
    // Test is complete when the bot makes a sick report
    // --------------------------------

    cy.get('[data-testid="homepage-title"]').should('exist');
    
    // bot gaat naar ziekmelding aanvraag pagina
    cy.get('[data-testid="ziekmelding-aanvraag-button"]').click();
    
    // bot is op ziekmelding aanvraag pagina
    cy.get('[data-testid="ziekmelding-title"]').should('exist');

    //bot heeft zich ziekgemeld voor vandaag
    cy.get('[data-testid="ziekmelding-button"]').click();
  })
})