import { EXPORT_TOKEN_INVALID } from '../../src/utils/test-helpers';

describe('dashboard', () => {
  const EXPORT_TOKEN = 'pPEbU07DVOpWNBRMMuA0fyMWgwzppHfEZ';

  it('shows an error if token is invalid', () => {
    cy.visit('/export/invalid-token');
    cy.findByTestId(EXPORT_TOKEN_INVALID).should('be.visible');
  });

  it('shows data in tracking overview', () => {
    cy.visit(`/export/${EXPORT_TOKEN}`);
    cy.openTrackingOverviewDatePicker();
    cy.setDatePickerDateTo({ year: 2020, month: 6, day: 12 });
    cy.get('.MuiChip-label').should('have.text', 'Beer');
  });
});
