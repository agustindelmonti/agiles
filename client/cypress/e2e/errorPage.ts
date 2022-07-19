// Import Cucumber prefix
import { Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
// Import additional layer for reusing command

Given('go to wrong link', () => {
    cy.visit('https://wordle-dev-client.herokuapp.com/estapaginanoexiste')
});

Then('not found page is displayed', () => {
    cy.get('#root > div').should('have.text','404')
})

