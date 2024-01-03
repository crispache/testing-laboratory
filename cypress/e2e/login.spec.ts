
describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should name input has the focus when it clicks on it', () => {
    // Arrange
    // Act
    cy.visit('/');
    cy.findByRole('textbox').click();

    // Assert
    cy.findByRole('textbox').should('have.focus');
  });

  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const userName = 'example';
    const password = '1234';

    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userName');
    cy.findByLabelText(/Contraseña/i).as('password');

    cy.get('@userName').type(userName);
    cy.get('@password').type(password);
    cy.findByRole('button', { name: 'Login'} ).click();
    cy.findByTestId('spinner-test').as('spinner');

    // Assert
    cy.get('@spinner').should('be.visible');
    cy.get('@userName').should('have.value', userName);
    cy.get('@password').should('have.value', password);

    cy.findByRole('alert').as('alert');
    cy.get('@alert').should('have.text', 'Usuario y/o password no válidos');
    cy.get('@alert').invoke('attr', 'class').should('contain', 'error');
    cy.get('@alert').should('have.css','background-color', 'rgb(198, 40, 40)');
  });

  it("should navigate to submodule-list url when type valid credentials", () => {
    // Arrange
    const userName = 'admin';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userName');
    cy.findByLabelText(/Contraseña/i).as('password');

    cy.get('@userName').type(userName);
    cy.get('@password').type(password);
    cy.findByRole('button', { name: 'Login'}).click();
    cy.findByTestId('spinner-test').as('spinner');

    // Assert
    cy.get('@spinner').should('be.visible');
    cy.url().should("equal",'http://localhost:8080/#/submodule-list')
  });

  it("should display the Lock icon and title as 'Login'", () => {
    // Arrange
    // Act
    cy.visit('/');
    cy.findByTestId('LockOutlinedIcon').as('icon');
    cy.findByRole('heading', { level: 1 }).as('title');

    // Assert
    cy.get('@icon').should('be.visible');
    cy.get('@title').should('have.text', 'Login');
  });

  it("should show warning message for required fields when click on input, not write nothing and click outside input'", () => {
    // Arrange
    // Act
    cy.visit('/');
    cy.findByRole('textbox').click();
    cy.findByRole('heading', { level: 1 }).as('title');
    cy.get('@title').click();

    // Assert
    cy.get('p').should('have.text', 'Debe informar el campo');
    cy.get('p').invoke('attr', 'class').should('contain', 'error');
    cy.get('p').should('have.css','color', 'rgb(211, 47, 48)');
  });

  it("should make login request when fill in the form and press 'Enter' ", () => {
    // Arrange
    const userName = 'admin';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userName');
    cy.findByLabelText(/Contraseña/i).as('password');

    cy.get('@userName').type(userName);
    cy.get('@password').type(password).type('{enter}')
    cy.findByTestId('spinner-test').as('spinner');

    // Assert
    cy.get('@spinner').should('be.visible');
    cy.url().should("equal",'http://localhost:8080/#/submodule-list');
  });

});
