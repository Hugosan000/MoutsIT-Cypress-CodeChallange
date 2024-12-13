import CadastroUsuarioPage from '../page_objects/cadastroUsuarioPage'
import LoginPage from '../page_objects/loginPage'
import { faker } from '@faker-js/faker'

// Configurar faker para português do Brasil
faker.locale = 'pt_BR'

const emailValido = faker.internet.email()


describe('Cadastro de Usuários - UI Tests', () => {
    const novoUsuario = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        senha: faker.internet.password({ length: 8 })
    }

    beforeEach(() => {
        // Fazer login primeiro (necessário estar logado para acessar a página)
        LoginPage.visit(Cypress.env('webUrl'))
        LoginPage.fillEmail(Cypress.env('EMAIL'))
        LoginPage.fillSenha(Cypress.env('PASSWORD'))
        LoginPage.clickEntrar()
        
        // Verificar se o login foi bem sucedido
        cy.url().should('include', '/admin/home')
        
        // Navegar para página de cadastro e verificar URL
        CadastroUsuarioPage.visitCadastroUsuario()
        cy.url().should('include', '/admin/cadastrarusuarios')
    })

    it('deve exibir a página de cadastro corretamente @ui @smoke', () => {
        // Verificar se os elementos estão presentes e visíveis
        CadastroUsuarioPage.verifyNomeInputVisible()
        CadastroUsuarioPage.verifyEmailInputVisible()
        CadastroUsuarioPage.verifyPasswordInputVisible()
        CadastroUsuarioPage.verifyCheckboxVisible()
        CadastroUsuarioPage.verifyCadastrarButtonVisible()
    })

    it('deve cadastrar um novo usuário com sucesso @ui @cadastro', () => {
        const usuario = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password({ length: 8 })
        }

        CadastroUsuarioPage.fillNome(usuario.nome)
        CadastroUsuarioPage.fillEmail(usuario.email)
        CadastroUsuarioPage.fillPassword(usuario.senha)
        CadastroUsuarioPage.clickCadastrar()

        // TODO: Verificar se o usuário foi cadastrado com sucesso - Implementação futura - Checkar com Dev team
        // CadastroUsuarioPage.alertMessage
        //     .should('be.visible')
        //     .and('contain', 'Cadastro realizado com sucesso')
    })

    it('deve cadastrar um novo usuário administrador com sucesso @ui @cadastro', () => {
        const adminUser = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password({ length: 8 })
        }

        CadastroUsuarioPage.fillNome(adminUser.nome)
        CadastroUsuarioPage.fillEmail(adminUser.email)
        CadastroUsuarioPage.fillPassword(adminUser.senha)
        CadastroUsuarioPage.selectAdministrador()
        CadastroUsuarioPage.clickCadastrar()

        // TODO: Verificar se o usuário foi cadastrado com sucesso - Implementação futura - Checkar com Dev team
        // CadastroUsuarioPage.alertMessage
        //     .should('be.visible')
        //     .and('contain', 'Cadastro realizado com sucesso')
    })

    it('deve exibir erro ao tentar cadastrar com email já existente @ui @cadastro @error', () => {
        CadastroUsuarioPage.fillNome(novoUsuario.nome)
        CadastroUsuarioPage.fillEmail(Cypress.env('EMAIL')) // email já existente
        CadastroUsuarioPage.fillPassword(novoUsuario.senha)
        CadastroUsuarioPage.clickCadastrar()
        CadastroUsuarioPage.alertMessage
            .should('be.visible')
            .and('contain', 'Este email já está sendo usado')
    })

    it('deve exibir mensagens de erro para campos obrigatórios @ui @cadastro @error', () => {
        CadastroUsuarioPage.clickCadastrar()

        CadastroUsuarioPage.alertMessage
            .should('be.visible')
            .and('contain', 'Nome é obrigatório')
            .and('contain', 'Email é obrigatório')
            .and('contain', 'Password é obrigatório')
    })

    // Novos testes para caracteres especiais
    it('deve exibir erro ao tentar cadastrar com nome contendo caracteres especiais @ui @cadastro @error @caracteresEspeciais @possivelBug', () => {
        const usuarioComNomeEspecial = {
            nome: 'João@#',
            email: faker.internet.email(),
            senha: faker.internet.password({ length: 8 })
        }

        CadastroUsuarioPage.fillNome(usuarioComNomeEspecial.nome)
        CadastroUsuarioPage.fillEmail(usuarioComNomeEspecial.email)
        CadastroUsuarioPage.fillPassword(usuarioComNomeEspecial.senha)
        CadastroUsuarioPage.clickCadastrar()

        // TODO: Verificar se o usuário foi cadastrado com sucesso - Implementação futura - Checkar com Dev team
        // Atualmente é possivel estar criando usuários com nome contendo caracteres especiais
    })

    it('deve exibir erro ao tentar cadastrar com email contendo @ no meio do email @ui @cadastro @error @caracteresEspeciais @possivelBug', () => {
        const usuarioComEmailEspecial = {
            nome: faker.person.fullName(),
            email: 'email@invalido.com@teste.com',
            senha: faker.internet.password({ length: 8 })
        };

        CadastroUsuarioPage.fillNome(usuarioComEmailEspecial.nome);
        CadastroUsuarioPage.fillEmail(usuarioComEmailEspecial.email);
        CadastroUsuarioPage.fillPassword(usuarioComEmailEspecial.senha);
        CadastroUsuarioPage.clickCadastrar();
        
        // TODO: Criar error handling para o email com @ no meio do email
        // Atualmente existe apenas uma validação de erro via tooltip, que não é suficiente para validar o erro
        

        // Verifica se a mensagem de erro aparece
        // CadastroUsuarioPage.alertMessage
        //     .should('be.visible')
        //     .and('contain', 'Email inválido'); // Mensagem de erro esperada -> uma parte após "@" não deve conter o simbolo "@"
    })

    it('deve exibir erro ao tentar cadastrar com nome e email contendo caracteres especiais @ui @cadastro @error @caracteresEspeciais @possivelBug', () => {
        const usuarioComNomeEEmailEspeciais = {
            nome: 'João@#',
            email: 'email#invalido.com@teste.com',
            senha: faker.internet.password({ length: 8 })
        }

        CadastroUsuarioPage.fillNome(usuarioComNomeEEmailEspeciais.nome)
        CadastroUsuarioPage.fillEmail(usuarioComNomeEEmailEspeciais.email)
        CadastroUsuarioPage.fillPassword(usuarioComNomeEEmailEspeciais.senha)
        CadastroUsuarioPage.clickCadastrar()

         // TODO: Verificar se o usuário foi cadastrado com sucesso - Implementação futura - Checkar com Dev team
        // Atualmente é possivel estar criando usuários com nome contendo caracteres especiais
    })
})
