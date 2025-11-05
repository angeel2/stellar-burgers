declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    addBunToConstructor(): Chainable<void>;
    addIngredientToConstructor(): Chainable<void>;
    createOrder(): Chainable<void>;
    clearAuth(): Chainable<void>;
  }
}

Cypress.Commands.add('login', () => {
  cy.setCookie(
    'accessToken',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM'
  );
  window.localStorage.setItem(
    'refreshToken',
    '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556'
  );
});

Cypress.Commands.add('clearAuth', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('addBunToConstructor', () => {
  cy.get('[data-cy="ingredient-item"]')
    .first()
    .within(() => {
      cy.get('[data-cy="add-ingredient-button"]').click();
    });
});

Cypress.Commands.add('addIngredientToConstructor', () => {
  cy.get('[data-cy="ingredient-item"]')
    .eq(2)
    .within(() => {
      cy.get('[data-cy="add-ingredient-button"]').click();
    });
});

Cypress.Commands.add('createOrder', () => {
  cy.get('[data-cy="order-button"]').click();
});
