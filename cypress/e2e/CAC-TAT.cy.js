
describe('Central de Atendimento ao Cliente TAT', () => {
  const user = {}
  beforeEach(() => {
    cy.visit('../../src/index.html');

    user.firstName = 'Lucas'
    user.lastName = 'Cabral'
    user.email = 'email@teste.com'
    user.text = 'Teste'
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Lucas')
      .as('nome')
    cy.get('@nome')
      .should('have.value', 'Lucas')

    cy.get('#lastName')
      .should('be.visible')
      .type('Cabral')
      .as('sobrenome')
    cy.get('@sobrenome')
      .should('have.value', 'Cabral')

    cy.get('#email')
      .should('be.visible')
      .type('email@teste.com')
      .as('email')
    cy.get('@email')
      .should('have.value', 'email@teste.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Teste longo para validação do comando "delay" como objeto do tipo type. Vamos ver se funciona', {delay: 5})
      .as('caixaDeTexto')
    cy.get('@caixaDeTexto')
      .should('have.value', 'Teste longo para validação do comando "delay" como objeto do tipo type. Vamos ver se funciona')

    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()
    
    cy.get('.success')
      .should('be.visible')
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Lucas')
      .as('nome')
    cy.get('@nome')
      .should('have.value', 'Lucas')

    cy.get('#lastName')
      .should('be.visible')
      .type('Cabral')
      .as('sobrenome')
    cy.get('@sobrenome')
      .should('have.value', 'Cabral')

    cy.get('#email')
      .should('be.visible')
      .type('emailteste.com')
      .as('email')
    cy.get('@email')
      .should('have.value', 'emailteste.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Teste longo para validação do comando "delay" como objeto do tipo type. Vamos ver se funciona')
      .as('caixaDeTexto')
    cy.get('@caixaDeTexto')
      .should('have.value', 'Teste longo para validação do comando "delay" como objeto do tipo type. Vamos ver se funciona')

    cy.get('button[type="submit')
      .should('be.visible')
      .click()
    
    cy.get('.error')
      .should('be.visible')
  });

  it('validar se campo telefone apenas aceita números', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Lucas')
      .as('nome')
    cy.get('@nome')
      .should('have.value', 'Lucas')

    cy.get('#lastName')
      .should('be.visible')
      .type('Cabral')
      .as('sobrenome')
    cy.get('@sobrenome')
      .should('have.value', 'Cabral')

    cy.get('#email')
      .should('be.visible')
      .type('emailteste.com')
      .as('email')
    cy.get('@email')
      .should('have.value', 'emailteste.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Teste')
      .as('caixaDeTexto')
    cy.get('@caixaDeTexto')
      .should('have.value', 'Teste')

    cy.get('#phone-checkbox')
      .check()

    cy.get('button[type="submit')
      .should('be.visible')
      .click()

    cy.get('.error')
      .should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Lucas')
      .as('nome')
    cy.get('@nome')
      .should('have.value', 'Lucas')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .should('be.visible')
      .type('Cabral')
      .as('sobrenome')
    cy.get('@sobrenome')
      .should('have.value', 'Cabral')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .should('be.visible')
      .type('emailteste.com')
      .as('email')
    cy.get('@email')
      .should('have.value', 'emailteste.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .should('be.visible')
      .type('11987654321')
      .as('telefone')
    cy.get('@telefone')
      .should('have.value', '11987654321')
      .clear()
      .should('have.value', '')
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit')
      .should('be.visible')
      .click()

    cy.get('.error')
      .should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit(user)
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') 
      .should('have.value', 'youtube')
    });

  it('seleciona um produto (Mentoria) por seu valor', () => {
      cy.get('#product')
        .select('mentoria') 
        .should('have.value', 'mentoria')
      });

  it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
        .select(1) 
        .should('have.value', 'blog')
      });
  
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
    .each(diferentesRadios => {
      cy.wrap(diferentesRadios)
      .check()
      .should('be.checked')
    })
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]')
    .each(allChecks => {
      cy.wrap(allChecks)
      .check()
      .should('be.checked')
    })
    cy.get('[type="checkbox"]').last()
    .uncheck()
    .should('not.be.checked')
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exemplo')
    cy.get('#file-upload')
    .selectFile('@exemplo')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr',  'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
    
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  });

})







