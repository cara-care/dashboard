import { EXPORT_TOKEN_INVALID } from '../../src/utils/test-helpers';

describe('dashboard', () => {
  const EXPORT_TOKEN = 'pPEbU07DVOpWNBRMMuA0fyMWgwzppHfEZ';

  it('shows an error if token is invalid', () => {
    cy.visit('/export/invalid-token');
    cy.findByTestId(EXPORT_TOKEN_INVALID).should('be.visible');
  });

  it('shows data in tracking overview', () => {
    const LANGUAGE_CODE = 'de';
    cy.visit(`/export/${EXPORT_TOKEN}`);
    cy.openTrackingOverviewDatePicker();
    cy.setDatePickerDateTo({ year: 2020, month: 6, day: 12 });
    cy.get('.MuiChip-label').should('have.text', 'Beer');
    // make sure the locale is persisted in localStorage after changing the language
    // TODO: Rewrite test in TypeScript and import the constant for this
    // the time should match the timeout in `src/index.tsx`
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3500).then(() => {
      expect(localStorage.getItem('locale')).to.eq(LANGUAGE_CODE);
    });
  });
});
