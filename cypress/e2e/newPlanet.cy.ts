// https://on.cypress.io/api

describe('New Planet', () => {
    it('Visit the newplanet and fill a new planet', () => {
      cy.visit('/planet/new')
      cy.get('#name').type('planetNameText')
      cy.get('#population').type('46536345')

      //  Verify that the value has been updated
      cy.get('#name').should('have.value', 'planetNameText')
      cy.get('#population').should('have.value', '046536345')

      cy.get('#createp').click()
      
      cy.url().should('include', '/planet/')
      cy.contains('h2', 'planetNameText')
      cy.contains('.population', '46536345')
    })
  })
  