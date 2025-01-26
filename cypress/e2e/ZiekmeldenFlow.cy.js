describe('template spec', () => {
  it('passes', () => {
    // login command (is defined in cypress/support/commands.js)
    cy.login('cypresstest@gmail.com', 'cypresstest');

    // --------------------------------
    // Testing the Ziekmelden flow
    // Test is complete when the bot makes a sick report
    // --------------------------------

    cy.get('[data-testid="homepage-title"]').should('exist');

  })
})