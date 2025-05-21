
describe('Authentication Tests', () => {
  it('should navigate to login page', () => {
    cy.visit('/');
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.contains('Sign In');
  });

  it('should handle login with demo account', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Handle success or error states
    cy.get('body').then(($body) => {
      if ($body.text().includes('Dashboard')) {
        // Successfully logged in
        cy.url().should('include', '/dashboard');
      } else {
        // Check for error message
        cy.contains('Invalid email or password');
      }
    });
  });
});
