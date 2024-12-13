class LoginPage {
  // Seletores
  get emailInput() {
    return cy.get('[data-testid="email"]');
  }

  get senhaInput() {
    return cy.get('[data-testid="senha"]');
  }

  get entrarButton() {
    return cy.get('[data-testid="entrar"]');
  }

  get alertMessage() {
    return cy.get('.alert');
  }

  // Métodos
  visit(url) {
    cy.visit(url);
  }

  fillEmail(email) {
    this.emailInput.type(email);
  }

  fillSenha(senha) {
    this.senhaInput.type(senha);
  }

  clickEntrar() {
    this.entrarButton.click();
  }
}

export default new LoginPage(); 