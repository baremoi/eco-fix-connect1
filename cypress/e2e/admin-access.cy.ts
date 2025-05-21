
describe('Admin Dashboard Access', () => {
  it('allows admins to access the dashboard', () => {
    // Login as admin
    cy.visit('/login');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Check for admin dashboard link
    cy.contains('Access Admin Dashboard').should('exist');
    
    // Click on admin dashboard link
    cy.contains('Access Admin Dashboard').click();
    
    // Verify we're on the admin dashboard page
    cy.url().should('include', '/admin/dashboard');
    cy.contains('Admin Dashboard').should('exist');
  });

  it('does not show admin dashboard link for regular users', () => {
    // Login as regular user
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Verify admin dashboard link does not exist
    cy.contains('Access Admin Dashboard').should('not.exist');
  });
});
