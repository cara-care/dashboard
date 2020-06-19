// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import _ from 'lodash';
import {
  LANGUAGE_MENU_BUTTON,
  TRACKING_OVERVIEW_DATEPICKER,
} from '../../src/utils/test-helpers';

Cypress.Commands.add('changeLanguage', (locale = 'de') => {
  cy.findByTestId(LANGUAGE_MENU_BUTTON).click();
  if (locale === 'de') {
    cy.findByText(/deutsch/i).click();
  } else {
    cy.findByText(/english/i).click();
  }
});

Cypress.Commands.add('openTrackingOverviewDatePicker', () => {
  cy.findByTestId(TRACKING_OVERVIEW_DATEPICKER).click();
});

/**
 * Set currently open datepicker date to a specified date
 * @param {Object} date - The date to which the datepicker should be set to.
 * @param {number} date.year - The target year.
 * @param {number} date.month - The target month (1-12).
 * @param {number} date.date - The target day.
 */
Cypress.Commands.add('setDatePickerDateTo', ({ year, month, day }) => {
  // change the year
  cy.findByText(new Date().getFullYear().toString()).click();
  cy.get('.MuiPickersYearSelection-container')
    .findByText(new RegExp(year, 'i'))
    .click();
  // change the month
  const currentMonth = new Date().getMonth() + 1;
  if (currentMonth !== month) {
    if (currentMonth < month) {
      // click ">" button until it's the target month
      _.times(month - currentMonth, async () => {
        cy.get(
          '.MuiPickersCalendarHeader-switchHeader > :nth-child(3) > .MuiIconButton-label > .MuiSvgIcon-root'
        )
          .first()
          .click();
      });
    } else {
      // click "<" button until it's the target month
      _.times(currentMonth - month, async () => {
        cy.get(
          '.MuiPickersCalendarHeader-switchHeader > :nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root'
        )
          .first()
          .click();
      });
    }
  }
  // change the day
  cy.findByText(new RegExp(day, 'i')).click();
});
