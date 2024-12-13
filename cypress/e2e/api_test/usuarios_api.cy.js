const { faker } = require("@faker-js/faker");
const { pt_BR } = require("@faker-js/faker");
// Configurando o faker para usar localização em português do Brasil
faker.locale = "pt_BR";

describe("Testes de API - Usuários ServeRest @APITest", () => {
  let userId;
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

  it("Deve cadastrar um novo usuário com sucesso @smoke @crud @post", () => {
    // Gerando valor aleatório para definir se usuário será admin
    const isAdmin = Math.random() < 0.5;
    // Gerando dados fake para nome e email
    const fakerName = faker.person.fullName();
    const fakerEmail = faker.internet.email();

    // Criando objeto com dados do novo usuário
    const novoUsuario = {
      nome: `automatedcypress+${fakerName}`,
      email: `automatedcypress+${fakerEmail}`,
      password: Cypress.env("PASSWORD"),
      administrador: isAdmin ? "true" : "false",
    };

    testData.novoUsuario = novoUsuario;

    // Enviando requisição POST para criar novo usuário
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/usuarios`,
      headers: {
        Authorization: Cypress.env("TOKEN"),
      },
      body: novoUsuario,
    }).then((response) => {
      // Armazenando resposta para possível uso posterior
      testData.response = {
        status: response.status,
        body: response.body,
      };

      // Logando informações do usuário criado
      cy.log("**Dados do Usuário Criado**");
      cy.log(`Nome: ${novoUsuario.nome}`);
      cy.log(`Email: ${novoUsuario.email}`);
      cy.log(`Administrador: ${novoUsuario.administrador}`);
      cy.log(`ID: ${response.body._id}`);

      // Validando resposta da API
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
      userId = response.body._id;
    });
  });

  it("Deve listar todos os usuários @smoke @crud @get", () => {
    // Enviando requisição GET para listar todos os usuários
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/usuarios`,
      headers: {
        Authorization: Cypress.env("TOKEN"),
      },
    }).then((response) => {
      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body.usuarios).to.be.an("array");
    });
  });

  it("Deve buscar usuário por ID @crud @get", () => {
    // Enviando requisição GET para buscar usuário específico
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/usuarios/${userId}`,
      headers: {
        Authorization: Cypress.env("TOKEN"),
      },
    }).then((response) => {
      // Logando resposta para debug
      console.log("Resposta do GET por ID:", response.body);
      // Validando resposta e propriedades esperadas
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("nome");
      expect(response.body).to.have.property("email");
    });
  });

  it("Deve editar um usuário existente @crud @put", () => {
    // Criando dados atualizados para o usuário
    const usuarioEditado = {
      nome: `automatedcypress+${faker.person.fullName()}`,
      email: `automatedcypress+${faker.internet.email()}`,
      password: Cypress.env("PASSWORD"),
      administrador: "true",
    };

    // Enviando requisição PUT para atualizar o usuário
    cy.request({
      method: "PUT",
      url: `${Cypress.env("apiUrl")}/usuarios/${userId}`,
      headers: {
        Authorization: Cypress.env("TOKEN"),
      },
      body: usuarioEditado,
    }).then((response) => {
      // Logando resposta para debug
      console.log("Resposta do PUT:", response.body);
      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Registro alterado com sucesso");
    });
  });

  it("Deve excluir um usuário @crud @delete", () => {
    // Enviando requisição DELETE para remover o usuário
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("apiUrl")}/usuarios/${userId}`,
      headers: {
        Authorization: Cypress.env("TOKEN"),
      },
    }).then((response) => {
      // Logando resposta para debug
      console.log("Resposta do DELETE:", response.body);
      // Validando resposta da API
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Registro excluído com sucesso");
    });
  });
});
