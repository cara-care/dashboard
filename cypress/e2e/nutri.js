describe('nutri', () => {
  it('should login an existing nutri user', () => {
    cy.login({
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    })
      .url()
      .should('eq', `${Cypress.config().baseUrl}/nutri/select-patient`);
  });
});
