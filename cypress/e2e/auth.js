describe('auth', () => {
  it('redirects from "/nutri" route if not authenticated', () => {
    cy.visit('/nutri')
      .url()
      .should('eq', `${Cypress.config().baseUrl}/nutri/login`);
  });

  it('redirects from "/nutri/select-patient" if not authenticated', () => {
    cy.visit('/nutri/select-patient')
      .url()
      .should('eq', `${Cypress.config().baseUrl}/nutri/login`);
  });

  it('redirects from "/nutri/questionnaires" if not authenticated', () => {
    cy.visit('/nutri/questionnaires')
      .url()
      .should('eq', `${Cypress.config().baseUrl}/nutri/login`);
  });

  it('redirects from "/nutri/questionnaires/:id" if not authenticated', () => {
    cy.visit('/nutri/questionnaires/1')
      .url()
      .should('eq', `${Cypress.config().baseUrl}/nutri/login`);
  });

  it('redirects from "/nutri/programs" if not authenticated', () => {
    cy.visit('/nutri/programs')
      .url()
      .should('eq', `${Cypress.config().baseUrl}/nutri/login`);
  });
});
