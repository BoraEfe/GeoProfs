describe('template spec', () => {
  it('passes', () => {

    // --------------------------------
    // Testing the login flow
    // Test is complete when the bot reaches the homepage
    // --------------------------------

    //visiting the page
    cy.visit('http://localhost:5173/');

    //checking if the title is correct and the input fields are present on login page
    cy.get('[data-testid="login-title"]').should('exist');
    cy.get('[data-testid="login-input-email"]').type('cypresstest@gmail.com');
    cy.get('[data-testid="login-input-password"]').type('cypresstest');

    //submitting the form with the correct credentials
    cy.get('[data-testid="login-input-submit"]').click();

    //checking if the bot reached the homepage
    cy.get('[data-testid="homepage-title"]').should('exist');

    //end of test
  
  })
})