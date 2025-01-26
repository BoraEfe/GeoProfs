describe('template spec', () => {
  it('passes', () => {
    // login command (is defined in cypress/support/commands.js)
    cy.login('cypresstest@gmail.com', 'cypresstest');

    // --------------------------------
    // Testing the logout flow
    // Test is complete when the bot has logged out
    // --------------------------------

    // bot is op homepage
    cy.get('[data-testid="homepage-title"]').should('exist');

    //click logout button
    cy.get('[data-testid="logout-button"]').click();

    //bot is terug op login pagina
    cy.get('[data-testid="login-title"]').should('exist');
  })
})