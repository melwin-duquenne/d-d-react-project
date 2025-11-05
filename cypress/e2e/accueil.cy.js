describe('Accueil - La Taverne du Héros', () => {
  it('affiche le titre et le bouton d\'aventure', () => {
    cy.visit('/');
    cy.contains('La Taverne du Héros').should('be.visible');
    cy.contains('Débutez votre aventure').should('be.visible');
  });

  it('affiche le texte d\'accueil', () => {
    cy.visit('/');
    cy.contains('Bienvenue, aventurier').should('be.visible');
    cy.contains('Maître du Jeu').should('be.visible');
    cy.contains('bestiaire complet').should('be.visible');
  });

  it('le bouton d\'aventure existe et est cliquable', () => {
    cy.visit('/');
    cy.get('button').contains('Débutez votre aventure').should('be.enabled');
  });
});
