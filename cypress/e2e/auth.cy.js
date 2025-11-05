describe('Authentification - La Taverne du Héros', () => {
  it('connexion avec email et mot de passe valides', () => {
  cy.visit('/fr/login');
  cy.get('input[type=email]').type(Cypress.env('ENV_MAIL_TEST'));
  cy.get('input[type=password]').first().type(Cypress.env('ENV_MDP_TEST'));
  cy.get('#validate').click();
  cy.contains('Connexion réussie').should('be.visible');
  cy.contains('Se déconnecter').should('be.visible');
  });

  it('déconnexion après connexion', () => {
    cy.visit('/fr/login');
    cy.get('input[type=email]').type(Cypress.env('ENV_MAIL_TEST'));
    cy.get('input[type=password]').first().type(Cypress.env('ENV_MDP_TEST'));
    cy.get('#validate').click();
    cy.contains('Connexion réussie').should('be.visible');
    cy.wait(2000); // attendre la redirection
    cy.get('#logout').click();
    cy.contains('Se connecter').should('be.visible');
  });
});
