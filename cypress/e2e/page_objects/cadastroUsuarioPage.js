class CadastroUsuarioPage {
    // Elements
    get nomeInput() { return cy.get('[data-testid="nome"]') }
    get emailInput() { return cy.get('[data-testid="email"]') }
    get passwordInput() { return cy.get('[data-testid="password"]') }
    get administradorRadio() { return cy.get('[data-testid="checkbox"]') }
    get cadastrarButton() { return cy.get('[data-testid="cadastrarUsuario"]') }
    get alertMessage() { return cy.get('.alert') }
    get checkbox() { return cy.get('[data-testid="checkbox"]') }

    // Actions
    fillNome(nome) {
        this.nomeInput.type(nome)
    }

    fillEmail(email) {
        this.emailInput.type(email)
    }

    fillPassword(password) {
        this.passwordInput.type(password)
    }

    selectAdministrador() {
        this.administradorRadio.click()
    }

    clickCadastrar() {
        this.cadastrarButton.click()
    }

    visitCadastroUsuario() {
        cy.visit('https://front.serverest.dev/admin/cadastrarusuarios')
    }

    // Novos métodos para verificar visibilidade dos elementos
    verifyNomeInputVisible() {
        this.nomeInput.should('be.visible');
    }

    verifyEmailInputVisible() {
        this.emailInput.should('be.visible');
    }

    verifyPasswordInputVisible() {
        this.passwordInput.should('be.visible');
    }

    verifyCheckboxVisible() {
        this.checkbox.should('be.visible');
    }

    verifyCadastrarButtonVisible() {
        this.cadastrarButton.should('be.visible');
    }
}

export default new CadastroUsuarioPage() 