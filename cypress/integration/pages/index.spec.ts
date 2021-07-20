describe('Home page', () => {
  it('works', () => {
    cy.visit('/')

    cy.contains('PASSWORD').should('be.visible')
  })
})
