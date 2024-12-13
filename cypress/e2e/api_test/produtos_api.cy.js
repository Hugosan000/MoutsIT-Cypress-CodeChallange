const { faker } = require('@faker-js/faker');
const { pt_BR } = require('@faker-js/faker');
// Configurando o faker para usar localização em português do Brasil
faker.locale = 'pt_BR';

describe('Testes de API - Produtos ServeRest @api @produtos', () => {
  let productId;
  let testData = {};

  beforeEach(() => {
    // Usando o custom command apiLogin
    cy.apiLogin()
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('authorization');
        Cypress.env('TOKEN', response.body.authorization);
      });

    testData = {};
  });

  it('Deve cadastrar um novo produto com sucesso @smoke @crud @post @positivo', () => {
    // Gerando nome de arquivo de imagem aleatório com extensão válida
    const extensoes = ['jpg', 'png', 'gif'];
    const extensaoAleatoria = faker.helpers.arrayElement(extensoes);
    const nomeImagem = `C:\\fakepath\\${faker.string.numeric(10)}.${extensaoAleatoria}`;

    // Criando dados do novo produto com informações aleatórias
    const novoProduto = {
      nome: `Produto ${faker.commerce.productName()}`,
      preco: parseInt(faker.commerce.price(), 10),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
      imagem: nomeImagem
    };

    testData.novoProduto = novoProduto;

    // Enviando requisição POST para criar novo produto
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      },
      body: novoProduto
    }).then((response) => {
      // Armazenando resposta para possível uso posterior
      testData.response = {
        status: response.status,
        body: response.body
      };

      // Logando informações do produto criado para debug
      console.log('Produto Criado:', response.body);
      cy.log('**Produto Criado**');
      cy.log(`Nome: ${novoProduto.nome}`);
      cy.log(`Preço: ${novoProduto.preco}`);
      cy.log(`Descrição: ${novoProduto.descricao}`);
      cy.log(`Quantidade: ${novoProduto.quantidade}`);
      cy.log(`Imagem: ${novoProduto.imagem}`);
      cy.log(`ID: ${response.body._id}`);

      // Validando resposta da API
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
      productId = response.body._id;
    });
  });

  it('Deve listar todos os produtos @crud @get', () => {
    // Enviando requisição GET para listar todos os produtos
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      }
    }).then((response) => {
      console.log('Lista de Produtos:', response.body);
      expect(response.status).to.equal(200);
      expect(response.body.produtos).to.be.an('array');
    });
  });

  it('Deve buscar produto por ID @crud @get', () => {
    // Enviando requisição GET para buscar produto específico pelo ID
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${productId}`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      }
    }).then((response) => {
      // Logando informações do produto encontrado
      console.log('Produto por ID:', response.body);
      cy.log('**Produto Buscado**');
      cy.log(`Nome: ${response.body.nome}`);
      cy.log(`Preço: ${response.body.preco}`);
      cy.log(`Descrição: ${response.body.descricao}`);
      cy.log(`Quantidade: ${response.body.quantidade}`);
      cy.log(`ID: ${response.body._id}`);

      // Validando resposta e propriedades esperadas
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('nome');
      expect(response.body).to.have.property('preco');
    });
  });

  it('Deve editar um produto existente @crud @put', () => {
    // Gerando novo nome de arquivo de imagem aleatório
    const extensoes = ['jpg', 'png', 'gif'];
    const extensaoAleatoria = faker.helpers.arrayElement(extensoes);
    const nomeImagem = `C:\\fakepath\\${faker.string.numeric(10)}.${extensaoAleatoria}`;

    // Criando dados atualizados para o produto
    const produtoEditado = {
      nome: `Produto Editado ${faker.commerce.productName()}`,
      preco: parseInt(faker.commerce.price(), 10),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
      imagem: nomeImagem
    };

    // Enviando requisição PUT para atualizar o produto
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/produtos/${productId}`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      },
      body: produtoEditado
    }).then((response) => {
      // Logando informações do produto atualizado
      console.log('Produto Editado:', response.body);
      cy.log('**Produto Editado**');
      cy.log(`Nome: ${produtoEditado.nome}`);
      cy.log(`Preço: ${produtoEditado.preco}`);
      cy.log(`Descrição: ${produtoEditado.descricao}`);
      cy.log(`Quantidade: ${produtoEditado.quantidade}`);
      cy.log(`Imagem: ${produtoEditado.imagem}`);
      cy.log(`ID: ${productId}`);

      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Registro alterado com sucesso');
    });
  });

  it('Deve excluir um produto @crud @delete', () => {
    // Enviando requisição DELETE para remover o produto
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/produtos/${productId}`,
      headers: {
        Authorization: Cypress.env('TOKEN')
      }
    }).then((response) => {
      // Logando informações da exclusão
      console.log('Produto Excluído:', response.body);
      cy.log('**Produto Excluído**');
      cy.log(`ID: ${productId}`);

      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Registro excluído com sucesso');
    });
  });
});