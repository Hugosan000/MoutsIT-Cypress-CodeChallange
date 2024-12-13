import LoginPage from '../page_objects/loginPage';

describe('Login - UI Tests', () => {
  // Definindo variáveis de teste
  const urlLogin = Cypress.env('webUrl');
  const emailValido = Cypress.env('EMAIL');
  const senhaValida = Cypress.env('PASSWORD');
  const emailInvalido = 'email_invalido@teste.com';
  const senhaInvalida = 'senha_invalida';

  beforeEach(() => {
    LoginPage.visit(urlLogin);
  });

  it('deve exibir a página de login corretamente @ui @smoke', () => {
    LoginPage.emailInput.should('be.visible');
    LoginPage.senhaInput.should('be.visible');
    LoginPage.entrarButton.should('be.visible');
  });

  it('deve fazer login com sucesso @ui @login', () => {
    LoginPage.fillEmail(emailValido);
    LoginPage.fillSenha(senhaValida);
    LoginPage.clickEntrar();
    
    // Verificar se redirecionou para home após login
    cy.url().should('include', '/admin/home');
  });

  it('deve exibir mensagem de erro ao tentar login com credenciais inválidas @ui @login @error', () => {
    // Tentativa com email e senha inválidos
    LoginPage.fillEmail(emailInvalido);
    LoginPage.fillSenha(senhaInvalida);
    LoginPage.clickEntrar();

    // Verifica se a mensagem de erro aparece
    LoginPage.alertMessage.should('be.visible')
      .and('contain', 'Email e/ou senha inválidos');
    
    // Verifica se permanece na página de login
    cy.url().should('include', '/login');

    // Verifica se os valores permanecem nos campos
    LoginPage.emailInput.should('have.value', emailInvalido);
    LoginPage.senhaInput.should('have.value', senhaInvalida);
  });

  it('deve exibir mensagem de erro ao tentar login com campos vazios @ui @login @error', () => {
    LoginPage.clickEntrar();

    // Verifica mensagens de validação
    LoginPage.alertMessage
      .should('be.visible')
      .and('contain', 'Email é obrigatório')
      .and('contain', 'Password é obrigatório');
  });

  it('deve reproduzir bug: mensagem incorreta ao corrigir email após tentativa falha @ui @login @error @bug', () => {
    // Primeira tentativa com email incorreto e senha correta
    LoginPage.fillEmail('email_incorreto@teste.com');
    LoginPage.fillSenha(senhaValida);
    LoginPage.clickEntrar();

    // Verifica primeira mensagem de erro
    LoginPage.alertMessage.should('be.visible')
      .and('contain', 'Email e/ou senha inválidos');

    // Limpa e corrige o email
    LoginPage.emailInput.clear().type(emailValido);
    LoginPage.clickEntrar();

    // Bug: Verifica que aparece mensagem incorreta
    LoginPage.alertMessage.should('be.visible')
      .and('contain', 'Password é obrigatório');
  });
});
