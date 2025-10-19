// Modèle TypeScript pour les données d'une fiche joueur (PlayerCard)

export interface PlayerCardData {
  name: string;
  race: string;
  class: string;
  level: number;
  xp: number;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  languages: string[];
  skills: string[];
  spells: string[];
  equipment: string[];
  magicItems: string[];
  history: string;
}

// Exemple d'objet conforme à ce modèle :
export const examplePlayerCard: PlayerCardData = {
  name: "Eldan",
  race: "elf",
  class: "wizard",
  level: 3,
  xp: 950,
  abilityScores: {
    strength: 8,
    dexterity: 14,
    constitution: 12,
    intelligence: 18,
    wisdom: 13,
    charisma: 10,
  },
  languages: ["elfique", "commun"],
  skills: ["arcana", "perception"],
  spells: ["fireball", "mage armor"],
  equipment: ["bâton", "robe"],
  magicItems: ["anneau de protection"],
  history: "Jeune mage parti à l'aventure pour découvrir les secrets du monde."
};
