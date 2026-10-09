export type CharacterClass =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Bard'
  | 'Druid'
  | 'Warlock'
  | 'Monk';

export type CharacterRace =
  | 'Human'
  | 'High Elf'
  | 'Wood Elf'
  | 'Mountain Dwarf'
  | 'Halfling'
  | 'Dragonborn'
  | 'Tiefling'
  | 'Half-Orc'
  | 'Gnome'
  | 'Aasimar';

export type Alignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Equipment {
  weapon: string;
  armor: string;
  trinket: string;
}

export interface CharacterPortrait {
  seed: number;
  style: 'videogame' | 'cartoon';
  paletteIndex: number;
  expressionIndex: number;
  headgearIndex: number;
  accessoryIndex: number;
  auraIntensity: number;
  generatedAt: number;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  race: CharacterRace;
  alignment: Alignment;
  level: number;
  health: number;
  hp: number;
  mana: number;
  strength: number;
  armorClass: number;
  abilities: AbilityScores;
  equipment: Equipment;
  signatureSkill: string;
  backstory: string;
  portrait?: CharacterPortrait | null;
  createdAt: number;
}
