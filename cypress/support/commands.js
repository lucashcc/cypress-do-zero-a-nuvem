// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => { 
    cy.get('#firstName')
    .should('be.visible')
    .type(user.firstName)
    .as('nome')
    cy.get('@nome').
    should('have.value', user.firstName)

    cy.get('#lastName')
    .should('be.visible')
    .type(user.lastName)
    .as('sobrenome')
    cy.get('@sobrenome').
    should('have.value', user.lastName)

    cy.get('#email')
    .should('be.visible')
    .type(user.email)
    .as('email')
    cy.get('@email').
    should('have.value', user.email)

    cy.get('#open-text-area')
    .should('be.visible')
    .type(user.text)
    .as('caixaDeTexto')
    cy.get('@caixaDeTexto').
    should('have.value', user.text)

    cy.get('button[type="submit')
    .should('be.visible')
    .click()
    
    cy.get('.success')
    .should('be.visible')
})