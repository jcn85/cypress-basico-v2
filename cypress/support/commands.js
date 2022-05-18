Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() { //Adicionar comando
    cy.get('#firstName').type('Julimar') 
    cy.get('#lastName').type('Cagnini') 
    cy.get('#email').type('julimarpr@hotmail.com')
    cy.get('#open-text-area').type('Teste') 
    cy.contains('button', 'Enviar').click()
}) 