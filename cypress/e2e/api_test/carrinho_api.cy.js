const { faker } = require('@faker-js/faker');
const { pt_BR } = require('@faker-js/faker');
// Configurando o faker para usar localização em português do Brasil
faker.locale = 'pt_BR';

describe('Testes de API - Carrinhos ServeRest @APITest', () => {
  let cartId;
  let productId;
  let testData = {};

  before(() => {
    // Inicializando objeto de dados de teste
    testData = {};
  });

  beforeEach(() => {
    // Usando o custom command apiLogin
    cy.apiLogin()
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('authorization');
        Cypress.env('TOKEN', response.body.authorization);
      });
  });

  it('Deve criar produto para testes @setup', () => {
    // Gerando nome de arquivo de imagem aleatório com extensão válida
    const extensoes = ['jpg', 'png', 'gif'];
    const extensaoAleatoria = faker.helpers.arrayElement(extensoes);
    const nomeImagem = `C:\\fakepath\\${faker.string.uuid()}.${extensaoAleatoria}`;

    // Criando dados do produto de teste
    const novoProduto = {
      nome: `Produto ${faker.commerce.productName()}`,
      preco: parseInt(faker.commerce.price(), 10),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 10, max: 100 }),
      imagem: nomeImagem
    };

    // Enviando requisição POST para criar produto de teste
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      },
      body: novoProduto
    }).then((response) => {
      // Logando informações do produto criado
      console.log('Produto de Teste Criado:', response.body);
      cy.log('**Produto de Teste Criado**');
      cy.log(`Nome: ${novoProduto.nome}`);
      cy.log(`Preço: ${novoProduto.preco}`);
      cy.log(`Descrição: ${novoProduto.descricao}`);
      cy.log(`Quantidade: ${novoProduto.quantidade}`);
      cy.log(`Imagem: ${novoProduto.imagem}`);
      cy.log(`ID: ${response.body._id}`);

      // Validando resposta da API e armazenando ID do produto
      expect(response.status).to.equal(201);
      productId = response.body._id;
    });
  });

  it('Deve cadastrar um novo carrinho com sucesso @crud @post', () => {
    // Criando dados do novo carrinho com quantidade aleatória do produto
    const novoCarrinho = {
      produtos: [{
        idProduto: productId,
        quantidade: faker.number.int({ min: 1, max: 5 })
      }]
    };

    testData.novoCarrinho = novoCarrinho;

    // Enviando requisição POST para criar novo carrinho
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/carrinhos`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      },
      body: novoCarrinho
    }).then((response) => {
      // Armazenando resposta para possível uso posterior
      testData.response = {
        status: response.status,
        body: response.body
      };

      // Logando informações do carrinho criado
      console.log('Carrinho Criado:', response.body);
      cy.log('**Carrinho Criado**');
      cy.log(`ID do Carrinho: ${response.body._id}`);
      cy.log(`Quantidade de Produtos: ${novoCarrinho.produtos.length}`);
      cy.log(`ID do Produto: ${novoCarrinho.produtos[0].idProduto}`);
      cy.log(`Quantidade do Produto: ${novoCarrinho.produtos[0].quantidade}`);

      // Validando resposta da API
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
      cartId = response.body._id;
    });
  });

  it('Deve listar todos os carrinhos @crud @get', () => {
    // Enviando requisição GET para listar todos os carrinhos
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/carrinhos`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      }
    }).then((response) => {
      // Logando informações da lista de carrinhos
      console.log('Lista de Carrinhos:', response.body);
      cy.log('**Lista de Carrinhos**');
      cy.log(`Total de Carrinhos: ${response.body.carrinhos.length}`);

      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body.carrinhos).to.be.an('array');
    });
  });

  it('Deve buscar carrinho por ID @crud @get', () => {
    // Enviando requisição GET para buscar carrinho específico
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/carrinhos/${cartId}`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      }
    }).then((response) => {
      // Logando informações do carrinho encontrado
      console.log('Carrinho por ID:', response.body);
      cy.log('**Carrinho Buscado**');
      cy.log(`ID do Carrinho: ${response.body._id}`);
      cy.log(`Produtos no Carrinho: ${response.body.produtos.length}`);

      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('produtos');
    });
  });

  it('Deve concluir a compra do carrinho @crud @delete', () => {
    // Enviando requisição DELETE para concluir a compra
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/carrinhos/concluir-compra`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      }
    }).then((response) => {
      // Logando informações da conclusão da compra
      console.log('Compra Concluída:', response.body);
      cy.log('**Compra Concluída**');
      cy.log(`Mensagem: ${response.body.message}`);

      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Registro excluído com sucesso');
    });
  });

  it('Deve cancelar a compra do carrinho @crud @delete', () => {
    // Criando novo carrinho para teste de cancelamento
    const novoCarrinho = {
      produtos: [{
        idProduto: productId,
        quantidade: faker.number.int({ min: 1, max: 5 })
      }]
    };

    // Enviando requisição POST para criar carrinho que será cancelado
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/carrinhos`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      },
      body: novoCarrinho
    }).then((responseCarrinho) => {
      // Logando informações do carrinho criado
      console.log('Carrinho Criado para Cancelamento:', responseCarrinho.body);
      cy.log('**Carrinho Criado para Cancelamento**');
      cy.log(`ID do Carrinho: ${responseCarrinho.body._id}`);
      
      // Enviando requisição DELETE para cancelar a compra
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/carrinhos/cancelar-compra`,
        headers: {
          Authorization: Cypress.env('TOKEN')
        }
      }).then((response) => {
        // Logando informações do cancelamento
        console.log('Compra Cancelada:', response.body);
        cy.log('**Compra Cancelada**');
        cy.log(`Mensagem: ${response.body.message}`);

        // Validando resposta da API
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Registro excluído com sucesso. Estoque dos produtos reabastecido');
      });
    });
  });

  it('Deve tentar cancelar a compra do carrinho de um usuário que não tem carrinho @crud @delete', () => {
    // Enviando requisição DELETE para tentar cancelar compra sem carrinho
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/carrinhos/cancelar-compra`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      }
    }).then((response) => {
      // Logando informações da tentativa de cancelamento
      console.log('Compra Cancelada:', response.body);
      cy.log('**Compra Cancelada**');
      cy.log(`Mensagem: ${response.body.message}`);

      // Validando resposta da API para cenário de erro
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Não foi encontrado carrinho para esse usuário');
    });
  });
});
