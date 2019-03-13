import faker from 'faker'

describe('Signup', () => {
  it('Visits the signup url', () => {
    cy.visit('/signup')
    cy.setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Signup')
  })
  it('Displays errors when user already exists', () => {
    cy.get('input[name=name]')
      .clear()
      .type('Another User')
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com')
    cy.get('input[name=password]')
      .clear()
      .type('12345')
    cy.get('input[name=confirmPassword]')
      .clear()
      .type('12345{enter}')

    cy.get('div.error')
      .should('be.visible')
      .and('contain', 'E-mail already exists')

    // and still be on the same URL
    cy.url().should('include', '/signup')
  })
  it('Signup', () => {
    cy.get('input[name=name]')
      .clear()
      .type('Another User')
    cy.get('input[name=email]')
      .clear()
      .type(faker.internet.email())
    cy.get('input[name=password]')
      .clear()
      .type('12345')
    cy.get('input[name=confirmPassword]')
      .clear()
      .type('12345{enter}')

    // url should be home
    cy.url().should('include', '/home')

    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Protected Home')

    // Accept to verify account
    cy.get('div.dlgVerifyAccount').and(
      'contain',
      'IMPORTANT: Verify your account'
    )

    // Close dialog
    cy.get('button.btnClose')
      .should('be.visible')
      .click()

    // Logout
    cy.get('button.btnLogout')
      .should('be.visible')
      .click()

    // url should be login
    cy.url().should('include', '/login')

    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Login')
  })
})
