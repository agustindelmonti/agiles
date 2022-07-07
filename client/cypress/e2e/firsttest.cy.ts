describe('4 tests for wordle', () => {
  beforeEach('visist the site', () => {
    cy.visit('https://wordle-dev-client.herokuapp.com/')
  })

  it('iniciar partida', () => {
    cy.get('button').click()
    cy.get('#username').type('javier')
    cy.get('form > button').click()
  })
  it('jugar lobby', () => {
    cy.get('button').click()
    cy.get('#username').type('javier')
    cy.get('form > button').click()
    cy.get('#word').type('hiajs').type('{enter}')
    cy.get('#word').type('hiajs').type('{enter}')
    cy.get('#word').type('hiajs').type('{enter}')
    cy.get('#word').type('hiajs').type('{enter}')
    cy.get('#word').type('hiajs').type('{enter}')
    cy.get('#word').type('hiajs').type('{enter}')
  })
  it('lobby creado', () => {
    cy.get('button').click()
    cy.get('h1').should('have.text','Lobby')
  })
  it('asdasd', () => {
    cy.visit('https://wordle-dev-client.herokuapp.com/estapaginanoexiste')
    cy.get('#root > div').should('have.text','404')
  })
})