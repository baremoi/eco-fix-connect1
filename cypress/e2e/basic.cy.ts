
describe('Basic Application Tests', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.contains('Find Trusted Tradespeople');
    cy.get('form').should('exist');
  });

  it('should navigate to trades page', () => {
    cy.visit('/');
    cy.get('a[href="/trades"]').first().click();
    cy.url().should('include', '/trades');
    cy.contains('Find Eco-Conscious Tradespeople');
  });

  it('should search for trades', () => {
    cy.visit('/trades');
    cy.get('input[name="trade"]').type('Plumber');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'trade=Plumber');
  });
});
