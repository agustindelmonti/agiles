/// <reference types='cypress' />
// Above line needed as indicator for Cypress

// Import Cucumber prefix
import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
// Import additional layer for reusing command

Given('go to wordle page', () => {
    cy.visit('https://wordle-dev-client.herokuapp.com/')
});

When('click button to fill username', () => {
    cy.get('button').click()
});
When('fill username with "javier"', () => {
    cy.get('#username').type('javier')
});
When('click play button', () => {
    cy.get('form > button').click()
});

// Then('redirected to game page', () => {
//     cy.url.
// })


