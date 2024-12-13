<h1 style="display: flex; align-items: center; gap: 10px;">
  Cypress Automation e2e Testing Project with JavaScript
  <img src="https://github.com/user-attachments/assets/b76af16e-090e-4712-8e69-b95fb71ea4d1" alt="Image" style="height: 2em;">
</h1>
 <img src="https://github.com/user-attachments/assets/b1b63203-4c6b-4624-b007-5e624e780e65" alt="Image 3" style="width: 60%;">






## 📝 Brief Description

This project implements automated testing for ServeRest (https://serverest.dev), a REST API simulator for testing and learning. The test suite includes both UI and API tests, focusing on user authentication, registration, and management functionalities. Built with Cypress, the project follows best practices such as Page Object Model, custom commands, and parallel test execution.

### Key Features at a Glance:
- 🌐 Complete UI test coverage for user flows
- 🔑 API integration tests
- 📊 Automated test reports
- 📹 Video recording of test executions
- 📸 Automatic screenshots on test failures
- ⚡ Parallel test execution support
- 🎯 Custom commands for common operations



This project contains automated tests for both UI and API testing using Cypress. It includes tests for user registration, login, and API endpoints validation.

## 🚀 Features

- UI Testing
  - User Registration
  - Login Validation
  - Form Validation
  - Error Handling
- API Testing
  - Authentication
  - User Management
  - Custom Commands
- Test Reports
- Parallel Test Execution
- Video Recording
- Screenshot Capture
- Custom Commands
- Page Objects Pattern

## 🔧 Prerequisites

- VSCode or other IDE
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- JavaScript
<div style="display: flex; justify-content: space-between; align-items: center; gap: 5px;">
    <img src="https://github.com/user-attachments/assets/46082666-c4dd-4cbc-85fe-4712f75aaedd" width="30%">
    <img src="https://github.com/user-attachments/assets/99822fe2-279f-4831-8b5d-6673309333b2" width="40%">
</div>

## 💻 Installation Guide

### Step 1: Prerequisites
Before installing, make sure you have the following installed on your machine:
- Node.js (v14 or higher) - [Download Node.js](https://nodejs.org/)
- npm (v6 or higher, comes with Node.js)
- Git - [Download Git](https://git-scm.com/downloads)

### Step 2: Clone the Repository
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
2. Navigate to the project directory:
```bash
   cd your-repo-name
```
3. Install Dependencies
Install all required packages:
```bash
npm install
```
4. Configure Environment
- Create a cypress.env.json file in the root directory.
- Add the following configuration:
```bash
{
  "EMAIL": "Check on Env file setup",
  "PASSWORD": "Check on Env file setup",
  "TOKEN": "Bearer your-token-here",
  "apiUrl": "https://serverest.dev",
  "webUrl": "https://front.serverest.dev/login"
}
```
5. Verify Installation
Open Cypress Test Runner
```bash
npm run cypress:open
```
Or run tests in headless mode:
```bash
npm run test
```
## 📁 Project Structure
```bash
cypress/
├── e2e/
│   ├── UI_test/
│   │   ├── login_ui.cy.js
│   │   └── cadastrar_usuarios.cy.js
│   └── API_test/
│       └── api_tests.cy.js
├── fixtures/
│   └── testData.json
├── support/
│   ├── commands.js
│   ├── api_commands.js
│   └── e2e.js
└── page_objects/
    ├── loginPage.js
    └── cadastroUsuarioPage.js
```

## 🏃‍♂️ Running Tests
```bash
npm run test
```
Run tests in parallel
```bash
npm run test:parallel
```
Run specific test file
```bash
npm run test -- --spec "cypress/e2e/UI_test/login_ui.cy.js"
```
Run on UI mode
```bash
npm cypress open
```

| API Test Execution | UI Test Execution |
|:-------------:|:------------:|
| ![Test Results](https://github.com/user-attachments/assets/acaf4cc6-d47f-4920-9468-d63db38fde72 )  | ![Test Execution](https://github.com/user-attachments/assets/6357425a-7b10-4fdb-bf2b-0d8b25be3e3e) 
| ![Test Results](https://github.com/user-attachments/assets/5ff1bb81-ded7-409e-adb9-d45eaf94c6bc)   | ![Test Results](https://github.com/user-attachments/assets/e1d8a50e-f852-4810-bf6d-19a5067f86f3)

<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/24023408-6d57-4628-b6c8-0aaa3e7aedd9" alt="Image 1" style="width: 100%;"/>
</div>




















## 🔍 Test Categories

### UI Tests (@ui)
- Login functionality
- User registration
- Form validation
- Error messages
- Special characters handling

### API Tests (@api)
- Authentication
- User CRUD operations
- Token validation
- Error responses

## 📊 Test Reports

Reports are generated after each test run and can be found in:
- `cypress/reports` - Mochawesome reports
- `cypress/videos` - Test execution videos
- `cypress/screenshots` - Failure screenshots

## 🛠️ Custom Commands

### API Commands
- `cy.apiLogin()` - Performs API login
- `cy.apiRequest()` - Makes authenticated API requests

### UI Commands
- Custom login commands
- Form filling helpers
- Validation helpers

## 🔐 Security

- Environment variables are used for sensitive data
- Tokens are managed securely
- Passwords are not exposed in logs

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Test Cases

### UI Test Cases
- Login with valid credentials
- Login with invalid credentials
- Register new user
- Register admin user
- Validate form fields
- Handle special characters
- Error message validation

### API Test Cases
- Authentication flow
- User creation
- User update
- User deletion
- Error handling
- Token validation

## 🔧 Tools & Technologies

- Cypress
- JavaScript
- Node.js
- Mochawesome Reporter
- Faker.js
- ESLint
- Prettier

## ⚠️ Important Notes

### Test User Requirements

Before running the tests, ensure that the test user exists in the application. The application database is periodically cleaned, which might delete the test user.

1. Test User Credentials (must exist in the application):
Email: `Cypress.env('EMAIL')`
Password: `Cypress.env('PASSWORD')`

2. If the user doesn't exist, create it manually through:
   - Access: https://front.serverest.dev/login
   - Click on "Cadastre-se"
   - Register with the credentials above
   - Make sure to check "Cadastrar como administrador"

### Why is this important?
- The application (ServeRest) performs periodic database cleanup
- Test user might be deleted during this cleanup
- Tests will fail if the user doesn't exist
- All tests depend on successful authentication

### Handling User Deletion
If tests start failing with authentication errors:
1. Check if the test user still exists
2. If not, recreate the user with the exact credentials
3. Update the token in `cypress.env.json` if necessary

## 📫 Support

For support, DM me on my github account or linkedin and open an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
