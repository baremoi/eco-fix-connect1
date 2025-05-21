
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in a user
     * @example cy.login('email@example.com', 'password')
     */
    login(email: string, password: string): Chainable<void>
  }
}
