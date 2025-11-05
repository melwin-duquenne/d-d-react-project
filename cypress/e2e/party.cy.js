describe('créer une party - La Taverne du Héros', () => {
it('connexion puis création de party', () => {
  cy.visit('/fr/login');
  cy.get('input[type=email]').type(Cypress.env('ENV_MAIL_TEST'));
  cy.get('input[type=password]').first().type(Cypress.env('ENV_MDP_TEST'));
  cy.get('#validate').click();
  cy.contains('Connexion réussie').should('be.visible');
  cy.contains('Se déconnecter').should('be.visible');
  cy.contains('Parties').click();
  cy.contains('Mes parties').should('be.visible');
  const partyName = 'Party Cypress ' + Date.now();
  cy.get('input[placeholder="Nom de la partie"]').type(partyName);
  cy.get('button').contains('Créer').click();
  cy.contains(partyName).should('be.visible');
  cy.contains('li', partyName)
    .find('a')
    .contains('Accéder')
    .click();
  cy.url().should('include', '/fr/master/');
  cy.visit('/fr/partyList');
  cy.contains('li', partyName)
    .find('button')
    .contains('Supprimer')
    .click();
  cy.contains(partyName).should('not.exist');
});
});