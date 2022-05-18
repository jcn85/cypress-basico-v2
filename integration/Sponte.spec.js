///<reference types="Cypress" />

describe('Educacional - Cadastro', function() {
    beforeEach(function(){
        cy.visit ('https://stonepagarme.sponte-demo.com.br/admin/financeiro/vendas/contas-a-receber')
    })      

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Educacional')
        })

    it('acessa tela de cadastro de Contas a Receber', function() {
        cy.get('#email').type('julimar@sponte.com.br')
        cy.get('#senha').type('123Senha4!')
        cy.get('[data-testid="submitButton"]').click()
        })
    
    it('Adiciona Contas a Receber', function(){
        cy.get('[data-testid="create"] > .sc-gqjmRU').click()
        cy.get('#client-imput').select('Cliente Juro')
        
    })
  
})