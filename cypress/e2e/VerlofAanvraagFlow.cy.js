describe('template spec', () => {
  it('passes', () => {
    // login command (is defined in cypress/support/commands.js)
    cy.login('cypresstest@gmail.com', 'cypresstest');

    // --------------------------------
    // Testing the Verlofaanvraag flow
    // Test is complete when the bot makes a verlof aanvraag
    // --------------------------------
    
    // bot is op homepage
    cy.get('[data-testid="homepage-title"]').should('exist');
    
    // bot gaat naar verlof aanvraag pagina
    cy.get('[data-testid="verlof-aanvraag-button"]').click();

    // bot is op verlof aanvraag pagina
    cy.get('[data-testid="verlof-aanvraag-title"]').should('exist');

    // verlof-aanvraag-date-from: vul de datum van vandaag in (YYYY-MM-DD format)
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // YYYY-MM-DD
    cy.get('[data-testid="verlof-aanvraag-date-from"]').type(formattedToday);

    // verlof-aanvraag-date-to: vul de datum van morgen in (YYYY-MM-DD format)
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
    cy.get('[data-testid="verlof-aanvraag-date-to"]').type(formattedTomorrow);

    // verlof-aanvraag-reason: selecteer de derde optie ('Persoonlijk verlof')
    cy.get('[data-testid="verlof-aanvraag-reason"]')
      .select(3) // Selecteer de derde optie (index begint bij 0)
      .should('have.value', 'Persoonlijk verlof'); // Controleer of de waarde correct is (pas dit aan als nodig)

    // verlof-aanvraag-textarea: vul 'cypress test verlof aanvraag' in
    cy.get('[data-testid="verlof-aanvraag-textarea"]').type('cypress test verlof aanvraag');

    // Eventueel: voeg een assertion toe om te checken of de aanvraag succesvol is ingediend
    cy.get('[data-testid="submit-verlof-aanvraag"]').click();
  });
});
