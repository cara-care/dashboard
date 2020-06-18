describe('smoke test', () => {
  it("doesn't catch crash on open 🔥", () => {
    cy.visit('https://localhost:3000/')
      .get('.NotFound-root-20 > .MuiTypography-root')
      .should(
        'have.text',
        "Oops, it looks like this is not a valid link. To get a valid link, go to the Cara app and request sharing access via Cara's desktop web interface."
      );
  });
});
