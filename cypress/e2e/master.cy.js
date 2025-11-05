describe('créer une party - La Taverne du Héros', () => {
    it('connexion, création de party, édition du scénario et ajout d\'un monstre', () => {
    cy.visit('/fr/login');
    cy.get('input[type=email]').type(Cypress.env('ENV_MAIL_TEST'));
    cy.get('input[type=password]').first().type(Cypress.env('ENV_MDP_TEST'));
    cy.get('#validate').click();
    cy.contains('Connexion réussie').should('be.visible');
    cy.contains('Parties').click();
    const partyName = 'Party Cypress ' + Date.now();
    cy.get('input[placeholder="Nom de la partie"]').type(partyName);
    cy.get('button').contains('Créer').click();
    cy.contains('li', partyName)
        .find('a')
        .contains('Accéder')
        .click();
    cy.url().should('include', '/fr/master/');
    cy.wait(2000);
    cy.contains('Aboleth').should('be.visible');
        // Écrire dans le SlateEditor et enregistrer
        const texteTest = 'Ceci est un test Cypress';
        cy.get('.slate-editor [contenteditable=true], [contenteditable="true"]').first().clear().type(texteTest);
        cy.contains(texteTest).should('be.visible');

        // Cliquer sur le bouton + du monstre Aboleth et vérifier l'insertion dans le SlateEditor
        cy.contains('li', 'Aboleth')
            .find('button')
            .click();
        cy.contains('[Aboleth]').should('be.visible');

    cy.visit('/fr/partyList');
    cy.contains('li', partyName)
        .find('button')
        .contains('Supprimer')
        .click();
    cy.contains(partyName).should('not.exist');
    });
});