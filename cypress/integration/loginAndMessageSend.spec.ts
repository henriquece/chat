import routesPath from '../../src/constants/routesPath'

const testEmail = 'test@test.com'
const testPassword = '123'

const test2UserName = 'Test2'

it('login and message send', () => {
  cy.visit('/')

  cy.get('input[alt=E-MAIL]').type(testEmail)

  cy.get('input[alt=PASSWORD]').type(testPassword)

  cy.contains('Login').click()

  cy.url().should('include', routesPath.chat)

  cy.contains(test2UserName, { timeout: 10000 }).click()

  const randomMessage = Math.random().toString()

  cy.get('input[placeholder=Message]').type(randomMessage)

  cy.get('button[data-testid=send-message-button]').type(randomMessage)

  cy.contains(randomMessage).should('be.visible')
})
