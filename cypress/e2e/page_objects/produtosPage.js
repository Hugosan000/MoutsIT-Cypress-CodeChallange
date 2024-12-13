class ProdutosPage {
    // Elementos da página
    get nomeProdutoInput() { return cy.get('[data-testid="nome"]') }
    get descricaoInput() { return cy.get('[data-testid="descricao"]') }
    get precoInput() { return cy.get('[data-testid="preco"]') }
    get quantidadeInput() { return cy.get('[data-testid="quantity"]') }
    get salvarButton() { return cy.get('[data-testid="cadastarProdutos"]') }
    get alertMessage() { return cy.get('.alert') }
    get menuCadastrarProdutos() { return cy.get('[data-testid="cadastrarProdutos"]') }
    get inputImagem() { return cy.get('[data-testid="imagem"]') }

    // Ações
    visit(url) {
        cy.visit(url + '/admin/cadastrarprodutos');
    }
   
    preencherFormulario(nome, descricao, preco, quantidade, imagem) {
        if (nome) this.nomeProdutoInput.type(nome);
        if (descricao) this.descricaoInput.type(descricao);
        if (preco) this.precoInput.type(preco);
        if (quantidade) this.quantidadeInput.type(quantidade);
        if (imagem) {
            if (imagem === 'invalido') {
                this.uploadImagemInvalida();
            } else {
                this.uploadImagemValida();
            }
        }
    }

    clickSalvar() {
        this.salvarButton.click();
    }

    uploadImagemValida() {
        // Simula o upload do arquivo válido
        this.inputImagem.selectFile('cypress/fixtures/produto.jpg', {
            force: true
        });
    }

    uploadImagemInvalida() {
        // Simula o upload do arquivo inválido
        this.inputImagem.selectFile('cypress/fixtures/arquivo_invalido.txt', {
            force: true
        });
    }
}

export default new ProdutosPage(); 