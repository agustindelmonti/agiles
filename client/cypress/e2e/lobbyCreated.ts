// Import Cucumber prefix
import { Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
// Import additional layer for reusing command

Given('go to wordle page', () => {
    cy.visit('https://wordle-dev-client.herokuapp.com/')
});

When('click play button', () => {
    cy.get('button').click()
});

Then('the lobby should be created', () => {
    cy.get('h1').should('have.text','Lobby')
})


