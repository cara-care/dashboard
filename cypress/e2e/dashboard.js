import _ from 'lodash';
import {
  EXPORT_TOKEN_INVALID,
  TRACKING_OVERVIEW_DATEPICKER,
  LANGUAGE_MENU_BUTTON,
} from '../../src/utils/test-helpers';

describe('dashboard', () => {
  it('shows an error if token is invalid', () => {
    cy.visit('/export/invalid-token');
    cy.findByTestId(EXPORT_TOKEN_INVALID).should('be.visible');
  });

  it('shows data in tracking overview', () => {
    cy.visit('/export/pPEbU07DVOpWNBRMMuA0fyMWgwzppHfEZ');
    // open datepicker
    cy.findByTestId(TRACKING_OVERVIEW_DATEPICKER).click();
    // change year to 2020
    cy.findByText(new Date().getFullYear().toString()).click();
    cy.get('.MuiPickersYearSelection-container').findByText(/2020/i).click();
    // change month to June
    const month = new Date().getMonth() + 1;
    const TARGET_MONTH = 6;
    if (month !== TARGET_MONTH) {
      if (month < TARGET_MONTH) {
        // click ">" button until it's June
        _.times(TARGET_MONTH - month, async () => {
          cy.get(
            '.MuiPickersCalendarHeader-switchHeader > :nth-child(3) > .MuiIconButton-label > .MuiSvgIcon-root'
          )
            .first()
            .click();
        });
      } else {
        // click "<" button until it's June
        _.times(month - TARGET_MONTH, async () => {
          cy.get(
            '.MuiPickersCalendarHeader-switchHeader > :nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root'
          )
            .first()
            .click();
        });
      }
    }
    // change date to 12th
    cy.findByText(/12/i).click();
    cy.get('.MuiChip-label').should('have.text', 'Beer');

    // change language to German
    cy.findByTestId(LANGUAGE_MENU_BUTTON).click();
    cy.findByText(/deutsch/i).click();
    cy.get('.MuiChip-label').should('have.text', 'Bier');
    // make sure the locale is persisted in localStorage

    // TODO: Rewrite test in TypeScript and import the constant for this
    // the time should match the timeout in `src/index.tsx`
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3500).then(() => {
      expect(localStorage.getItem('locale')).to.eq('de');
    });
  });
});
