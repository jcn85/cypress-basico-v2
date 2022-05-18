/// <reference types="Cypress" />

describe('CAC-TAT', function() {
    beforeEach(function(){
        cy.visit ('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios', function() { ///nome do teste
        const longText = 'Teste, teste, teste, teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,'
         cy.get('#firstName').type('Julimar') /// preenche o campo Nome
         cy.get('#lastName').type('Cagnini') ///preenche a Sobrenome
         cy.get('#email').type('julimarpr@hotmail.com')
         cy.get('#open-text-area').type(longText) /// insere texto longo no campo texto e diminui o delay(tempo da execução do teste)
         cy.contains('button', 'Enviar').click() /// Contains: contém 'Button' botão com o texto 'Enviar'

         cy.get('.success').should('be.visible') ///em caso de mensagem apresentada com sucesso
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {    
         cy.get('#firstName').type('Julimar') /// preenche o campo Nome
         cy.get('#lastName').type('Cagnini') ///preenche a Sobrenome
         cy.get('#email').type('julimarpr@hotmail,com')
         cy.get('#open-text-area').type('Teste') /// insere texto longo no campo texto e diminui o delay(tempo da execução do teste)
         cy.contains('button', 'Enviar').click()

         cy.get('.error').should('be.visible') ///
    })
    it('validar número do telefone', function() {    
        cy.get('#phone')
        .type('asfasdfasdf')
        .should('have.value', '')
        
    })
   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {    
    cy.get('#firstName').type('Julimar') /// preenche o campo Nome
    cy.get('#lastName').type('Cagnini') ///preenche a Sobrenome
    cy.get('#email').type('julimarpr@hotmail,com')
    cy.get('#check > [for="phone"]').click()
    cy.get('#open-text-area').type('Teste') /// insere texto longo no campo texto e diminui o delay(tempo da execução do teste)
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible') ///
    })

    it('exibe mensagem de erro ao submeter quando o telefone se torna obrigatório mas não é preenchido', function() {    
        cy.get('#firstName').type('Julimar') 
        cy.get('#lastName').type('Cagnini') 
        cy.get('#email').type('julimarpr@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible') 
    })

    it('Seleciona produto Youtube por seu Texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
          cy.contains('button', 'Enviar').click()
        
    })
    it('Seleciona produto Mentoria por seu Texto', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
          cy.contains('button', 'Enviar').click()
        
    })
    it('Seleciona produto Blog por seu Texto', function() { ///
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
          cy.contains('button', 'Enviar').click()
        
    })
    it('Marca o tipo de atendimento Feedback', function(){  ///MARCANDO UMA OPÇÃO TIPO RADIO
        cy.get('input[type="radio"][value="feedback"]').check()
          .check()
          .should('have.value', 'feedback')

    })
    it('marca e verifica cada tipo de atendimento', function(){ ///MARCANDO E VERIFICANDO TODAS AS OPÇÕES DO TIPO RADIO
        cy.get('input[type="radio"]') /// SELECIONA TODOS OS BOTÕES DO TIPO RADIO
        .should('have.length', 3)  /// VERIFICA QUE TEM 3 OPÇÕES DO TIPO RADIO MESMO
        .each(function($radio){ ///RECEBENDO UMA FUNÇÃO DE CALLBACK QUE RECEBE COMO ARGUMENTO CADA UM DOS ELEMENTOS QUE FORAM SELECIONADOS
            cy.wrap($radio).check()  ///wrap: empacota separadamente cada uma das opções RADIO
            cy.wrap($radio).should('be.checked')  ///Verificou separadamente que todos eles foram marcados
    }) 
    
    })
    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')  ///seleciona botão tipo checkbox
          .check()                        ///checa se os 2 existem(2 botões conforme resultado pesquisa)
          .last()                         ///seleciona o último
          .uncheck()                      ///desmarca o último registro
          .should('not.be.checked')       ///
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {    
        cy.get('#firstName').type('Julimar') 
        cy.get('#lastName').type('Cagnini') 
        cy.get('#email').type('julimarpr@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible') 
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Julimar')
          .should('have.value', 'Julimar')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Cagnini')
          .should('have.value', 'Cagnini')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('julimarpr@hotmail.com')
          .should('have.value', 'julimarpr@hotmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('12345679')
          .should('have.value', '12345679')
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
          .type('test')
          .should('have.value', 'test')
          .clear()
          .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')     ///verifica que não tem nenhum arquivo selecionado.
        .selectFile('./cypress/fixtures/example.json')   ///seleciona o anexo desejado informando o caminho
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')  ///verifica que o nome do primeiro input é example.json

        })
    })
    it('arrasta um arquivo da pasta fixtures - drag-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')     ///verifica que não tem nenhum arquivo selecionado.
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})   ///seleciona o anexo e inclui uma segunda função a action "drag-drop" 
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')  ///verifica que o nome do primeiro input é example.json

        })
    })
    it('Seleciona um arquivo utilizando fixture para a qual foi dad um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input) {
              expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('verifica que a politica de privacidade abre em outra aba sem a necessidado de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank') 
    })
    it('Acessa a página da politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

})
