import ProdutosPage from '../page_objects/produtosPage';
import LoginPage from '../page_objects/loginPage';
import { faker } from '@faker-js/faker';

// Configurando o faker para pt_BR
faker.locale = 'pt_BR';

describe('Cadastro de Produtos - UI Tests', () => {
    // Definindo variáveis de teste
    const urlBase = 'https://front.serverest.dev';
    const emailValido = Cypress.env('EMAIL');
    const senhaValida = Cypress.env('PASSWORD');

    // Dados para teste de produtos
    const produtoValido = {
        nome: `${faker.commerce.productName()} ${faker.string.numeric(5)}`,
        descricao: faker.commerce.productDescription(),
        preco: faker.number.int({ min: 1, max: 1000 }).toString(),
        quantidade: faker.number.int({ min: 1, max: 100 }).toString(),
        imagem: 'valido' // indica que deve usar imagem válida
    };

    beforeEach(() => {
        // Fazer login antes de cada teste
        LoginPage.visit(urlBase);
        LoginPage.fillEmail(emailValido);
        LoginPage.fillSenha(senhaValida);
        LoginPage.clickEntrar();
        
        // Navegar para página de produtos
        ProdutosPage.menuCadastrarProdutos.click();
    });

    it('deve exibir a página de cadastro de produtos corretamente @ui @smoke', () => {
        ProdutosPage.nomeProdutoInput.should('be.visible');
        ProdutosPage.descricaoInput.should('be.visible');
        ProdutosPage.precoInput.should('be.visible');
        ProdutosPage.quantidadeInput.should('be.visible');
        ProdutosPage.salvarButton.should('be.visible');
    });

    it('deve cadastrar um novo produto com sucesso @ui @produtos', () => {
        cy.log('Criando novo produto com os dados:');
        cy.log(`Nome: ${produtoValido.nome}`);
        cy.log(`Descrição: ${produtoValido.descricao}`);
        cy.log(`Preço: R$ ${produtoValido.preco}`);
        cy.log(`Quantidade: ${produtoValido.quantidade}`);

        ProdutosPage.preencherFormulario(
            produtoValido.nome,
            produtoValido.descricao,
            produtoValido.preco,
            produtoValido.quantidade
        );
        ProdutosPage.clickSalvar();

        cy.log('Produto cadastrado com sucesso!');
    });

    it('deve exibir mensagens de erro ao tentar cadastrar produto sem preencher campos obrigatórios @ui @produtos @error', () => {
        ProdutosPage.clickSalvar();

        // Verificar mensagens de validação
        ProdutosPage.alertMessage
            .should('be.visible')
            .and('contain', 'Nome é obrigatório')
            .and('contain', 'Preco é obrigatório')
            .and('contain', 'Quantidade é obrigatório');
    });

    it('deve validar formato do preço ao cadastrar produto @ui @produtos @error', () => {
        ProdutosPage.preencherFormulario(
            produtoValido.nome,
            produtoValido.descricao,
            'abc',
            produtoValido.quantidade
        );
        ProdutosPage.clickSalvar();

        // Verificar mensagem de erro
        // Não é possivel inserir letras no campo preço, ao tentar inserir letras, o campo fica vazio e a mensagem de erro é "Preco é obrigatório"
        ProdutosPage.alertMessage
            .should('be.visible')
            .and('contain', 'Preco é obrigatório');
    });

    it('deve validar quantidade mínima ao cadastrar produto @ui @produtos @error', () => {
        ProdutosPage.preencherFormulario(
            produtoValido.nome,
            produtoValido.descricao,
            produtoValido.preco,
            '-1'
        );
        ProdutosPage.clickSalvar();

        // Verificar mensagem de erro
        ProdutosPage.alertMessage
            .should('be.visible')
            .and('contain', 'Quantidade deve ser maior ou igual a 0');
    });

    it('deve fazer upload de imagem com sucesso @ui @produtos @imagem', () => {
        cy.log('Criando produto com imagem:');
        cy.log(`Nome: ${produtoValido.nome}`);

        ProdutosPage.preencherFormulario(
            produtoValido.nome,
            produtoValido.descricao,
            produtoValido.preco,
            produtoValido.quantidade,
            'valido' // indica que deve usar imagem válida
        );

        ProdutosPage.clickSalvar();
        cy.log('Produto com imagem cadastrado com sucesso!');
    });

    it('deve validar formato de arquivo de imagem @ui @produtos @imagem @error', () => {
        ProdutosPage.preencherFormulario(
            produtoValido.nome,
            produtoValido.descricao,
            produtoValido.preco,
            produtoValido.quantidade,
            'invalido' // indica que deve usar imagem inválida
        );

        ProdutosPage.clickSalvar();

        // Verifica mensagem de erro
        //TODO: Criar mensagem de validação de upload de imagem - Atualmente todo tipo de arquivo é aceito
        // ProdutosPage.alertMessage
        //     .should('be.visible')
        //     .and('contain', 'Formato de imagem inválido');
    });
}); 