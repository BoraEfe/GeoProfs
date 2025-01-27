describe('template spec', () => {
  it('passes', () => {
    // --------------------------------
    // Testing the login flow
    // Test is complete when the bot fails to login and stays on the login page
    // --------------------------------

    //visiting the page
    cy.visit('http://localhost:5173/');

    //checking if the title is correct and the input fields are present on login page
    cy.get('[data-testid="login-title"]').should('exist');
    cy.get('[data-testid="login-input-email"]').type('cypresstest@gmail.com');
    cy.get('[data-testid="login-input-password"]').type('cypresstest2'); //wrong password

    //submitting the form with the correct credentials
    cy.get('[data-testid="login-input-submit"]').click();

    //checking if is still on the login page
    cy.get('[data-testid="login-title"]').should('exist');

    //end of test
  })
})