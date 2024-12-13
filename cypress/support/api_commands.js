// Comando para API requests comuns
Cypress.Commands.add('apiLogin', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: {
      email: Cypress.env('EMAIL'),
      password: Cypress.env('PASSWORD')
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    window.localStorage.setItem('token', response.body.authorization)
  })
})

// Comando para requisições autenticadas
Cypress.Commands.add('apiRequest', (method, path, body = null) => {
  const token = window.localStorage.getItem('token') || Cypress.env('TOKEN')
  
  return cy.request({
    method: method,
    url: `${Cypress.env('apiUrl')}${path}`,
    body: body,
    headers: {
      'Authorization': token
    }
  })
}) 