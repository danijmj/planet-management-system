// https://on.cypress.io/api

describe('Init Page', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Star Wars')
  })
})
