import { EXPORT_TOKEN_INVALID } from '../../src/utils/test-helpers';

describe('dashboard', () => {
  it('shows an error if token is invalid', () => {
    cy.visit('/export/1234');
    cy.findByTestId(EXPORT_TOKEN_INVALID).should('be.visible');
  });
});
