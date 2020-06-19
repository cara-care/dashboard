import { NOT_FOUND_TEXT_ID } from '../../src/utils/test-helpers';

describe('smoke test', () => {
  it("doesn't crash on open 🔥", () => {
    cy.visit('/');
    cy.findByTestId(NOT_FOUND_TEXT_ID).should('be.visible');
  });
});
