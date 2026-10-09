import { CharacterClass, CharacterRace, Alignment, FantasyCharacter, AbilityScores, Equipment } from '../types/character';

export interface ClassDefinition {
  name: CharacterClass;
  tagline: string;
  role: string;
  primaryStat: keyof AbilityScores;
  hitDie: number;
  armorType: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    accent: string;
  };
  signatureSkills: string[];
  weapons: string[];
  armors: string[];
}

export const CLASS_DEFINITIONS: Record<CharacterClass, ClassDefinition> = {
  Warrior: {
    name: 'Warrior',
    tagline: 'Master of arms, iron discipline, and relentless martial prowess',
    role: 'Frontline Vanguard',
    primaryStat: 'strength',
    hitDie: 10,
    armorType: 'Heavy Plate & Chainmail',
    color: {
      bg: 'bg-amber-950/20',
      border: 'border-amber-700/40',
      text: 'text-amber-300',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      accent: 'from-amber-600 to-amber-800',
    },
    signatureSkills: [
      'Colossus Cleave',
      'Shield Bash & Vanguard Rally',
      'Whirlwind of Tempered Iron',
      'Battle Trance & Unyielding Will',
    ],
    weapons: [
      'Reforged Greatsword of Ironridge',
      'Double-Edged Battleaxe & Pavise',
      'Runed Bastard Sword & Round Shield',
      'Twin Damascus Steel Longswords',
    ],
    armors: [
      'Heavy Steel Cuirass & Greaves',
      'Reinforced Crested Plate Armor',
      'Black Iron Hauberk',
      'Dragonscale Studded Mail',
    ],
  },
  Mage: {
    name: 'Mage',
    tagline: 'Wielder of arcane matrices, planar energy, and elemental cataclysms',
    role: 'Arcane Blaster / Battlefield Controller',
    primaryStat: 'intelligence',
    hitDie: 6,
    armorType: 'Enchanted Vestments',
    color: {
      bg: 'bg-indigo-950/20',
      border: 'border-indigo-700/40',
      text: 'text-indigo-300',
      badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      accent: 'from-indigo-600 to-indigo-800',
    },
    signatureSkills: [
      'Cascading Astral Cascade',
      'Pyroclastic Nova',
      'Chrono-Shift Ward',
      'Frostfall Singularity',
    ],
    weapons: [
      'Starlight Focus Staff with Lucent Core',
      'Bound Eldritch Spell Grimoire',
      'Crystalline Wand of the Spire',
      'Orb of Astral Luminescence',
    ],
    armors: [
      'Silkweave Robes of the Archmage',
      'Embroidered Runecarved Mantle',
      'Velvet Vestments of Nether Whispers',
      'Star-Gilded Scholar Cassock',
    ],
  },
  Rogue: {
    name: 'Rogue',
    tagline: 'Lethal opportunist navigating unseen shadows with razor precision',
    role: 'Stealth Infiltrator & Skirmisher',
    primaryStat: 'dexterity',
    hitDie: 8,
    armorType: 'Supple Leather & Hood',
    color: {
      bg: 'bg-emerald-950/20',
      border: 'border-emerald-700/40',
      text: 'text-emerald-300',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      accent: 'from-emerald-600 to-emerald-800',
    },
    signatureSkills: [
      'Shadowstep Ambush',
      'Venomous Flurry',
      'Smoke Veil & Phantom Escape',
      'Vital Point Precision Strike',
    ],
    weapons: [
      'Twin Serpentine Daggers',
      'Concealed Wrist Crossbow & Stiletto',
      'Shadow-Tempered Shortsword',
      'Weighted Throwing Needles & Rapier',
    ],
    armors: [
      'Muffled Shadowsilk Tunic',
      'Oiled Boiled-Leather Jerkin',
      'Nocturnal Scavenger Cloak',
      'Reinforced Gambeson of the Night',
    ],
  },
  Paladin: {
    name: 'Paladin',
    tagline: 'Anointed guardian sworn to sacred oaths, beacon of righteous fury',
    role: 'Holy Defender & Protector',
    primaryStat: 'strength',
    hitDie: 10,
    armorType: 'Sacred Full Plate',
    color: {
      bg: 'bg-yellow-950/20',
      border: 'border-yellow-700/40',
      text: 'text-yellow-300',
      badge: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
      accent: 'from-yellow-600 to-yellow-800',
    },
    signatureSkills: [
      'Radiant Smite of the Sunborn',
      'Aura of Absolute Sanctuary',
      'Lay on Hands & Beacon of Hope',
      'Judgement of the Silver Flame',
    ],
    weapons: [
      'Sun-Forged Flanged Mace & Kite Shield',
      'Consecrated Two-Handed Claymore',
      'Gilded War Pick of the Dawn',
      'Luminous Glaive of the Order',
    ],
    armors: [
      'Sanctified Silvered Plate Armor',
      'Gold-Inlaid Heraldic Full Harness',
      'Mirror-Polished Templar Breastplate',
      'Aegis of the Morningstar Mail',
    ],
  },
  Ranger: {
    name: 'Ranger',
    tagline: 'Wilderness stalker, peerless marksman, and bonded ally of the beast',
    role: 'Ranged Striker & Tracker',
    primaryStat: 'dexterity',
    hitDie: 10,
    armorType: 'Hardened Studded Leather',
    color: {
      bg: 'bg-teal-950/20',
      border: 'border-teal-700/40',
      text: 'text-teal-300',
      badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
      accent: 'from-teal-600 to-teal-800',
    },
    signatureSkills: [
      'Volley of the Gale Winds',
      'Hunter’s Quarry Mark',
      'Predator Pounce & Camouflage',
      'Bramble Snare & Arrow Barrage',
    ],
    weapons: [
      'Yew Recurve Greatbow with Quiver',
      'Composite Elven Longbow & Hunting Knife',
      'Twin Dual-Wielded Scimitars',
      'Heavy Heavy Crossbow with Broadhead Bolts',
    ],
    armors: [
      'Forester’s Camouflage Garb',
      'Hardened Boar-Hide Vest',
      'Pelt-Lined Tracking Coat',
      'Ironwood Splint Jerkin',
    ],
  },
  Cleric: {
    name: 'Cleric',
    tagline: 'Mortal vessel of divine miracle, warding grace, and necrotic warding',
    role: 'Divine Healer & Buffer',
    primaryStat: 'wisdom',
    hitDie: 8,
    armorType: 'Relic Scale Mail & Crest',
    color: {
      bg: 'bg-sky-950/20',
      border: 'border-sky-700/40',
      text: 'text-sky-300',
      badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      accent: 'from-sky-600 to-sky-800',
    },
    signatureSkills: [
      'Benediction of Restoration',
      'Turn Undead & Spectral Ward',
      'Pillar of Heavenly Light',
      'Sanctified Grace of Renewal',
    ],
    weapons: [
      'Iconic Heavy Warhammer & Censer',
      'Hallowed Morningstar & Reliquary Shield',
      'Alabaster Scepter of Grace',
      'Runed Heavy Quarterstaff',
    ],
    armors: [
      'Vestments of the High Temple over Chain',
      'Sanctified Scale Cuirass',
      'Blessed Crusader Hauberk',
      'Sun-Etched Steel Brigandine',
    ],
  },
  Bard: {
    name: 'Bard',
    tagline: 'Weaver of legendary saga, hypnotic melodies, and cutting mockery',
    role: 'Inspirational Support & Jack-of-all-Trades',
    primaryStat: 'charisma',
    hitDie: 8,
    armorType: 'Ornate Leather & Plumed Hat',
    color: {
      bg: 'bg-rose-950/20',
      border: 'border-rose-700/40',
      text: 'text-rose-300',
      badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      accent: 'from-rose-600 to-rose-800',
    },
    signatureSkills: [
      'Anthem of Valor & Haste',
      'Dissonant Cacophony',
      'Vicious Mockery & Bewilderment',
      'Song of Rest & Harmonious Recovery',
    ],
    weapons: [
      'Silver-Stringed Masterwork Lute & Rapier',
      'Engraved Rosewood Mandolin & Dagger',
      'Ornate Courtier Foil & Hand Flute',
      'Songblade with Resonating Bell',
    ],
    armors: [
      'Tailored Embroidered Velvet Doublet',
      'Gilded Leather Surcoat',
      'Courtier’s Silk and Buff Coat',
      'Feather-Accented Traveling Mantle',
    ],
  },
  Druid: {
    name: 'Druid',
    tagline: 'Caretaker of ancient groves, shapechanger, and warden of primeval wilds',
    role: 'Shapeshifter & Nature Controller',
    primaryStat: 'wisdom',
    hitDie: 8,
    armorType: 'Living Bark & Beast Hide',
    color: {
      bg: 'bg-green-950/20',
      border: 'border-green-700/40',
      text: 'text-green-300',
      badge: 'bg-green-500/15 text-green-300 border-green-500/30',
      accent: 'from-green-600 to-green-800',
    },
    signatureSkills: [
      'Dire Bear Wild Shape',
      'Call Lightning & Stormwrack',
      'Entangling Roots & Thornburst',
      'Communion of the Ancient Oak',
    ],
    weapons: [
      'Ironwood Staff with Amber Sap Gem',
      'Obsidian-Tipped Sickle & Sprig',
      'Carved Bone Spear & Totem',
      'Yew Club Inlaid with Verdant Moss',
    ],
    armors: [
      'Living Barkweave Tunic',
      'Bear-Pelt Shoulder Mantle',
      'Hardened Leather Studded with Seeds',
      'Woven Willow Armor of the Grove',
    ],
  },
  Warlock: {
    name: 'Warlock',
    tagline: 'Pact-bound seeker of forbidden knowledge and eldritch secrets',
    role: 'Hexer & Eldritch Striker',
    primaryStat: 'charisma',
    hitDie: 8,
    armorType: 'Dark Padded Gambeson',
    color: {
      bg: 'bg-purple-950/20',
      border: 'border-purple-700/40',
      text: 'text-purple-300',
      badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      accent: 'from-purple-600 to-purple-800',
    },
    signatureSkills: [
      'Agonizing Eldritch Blast',
      'Curse of the Nether Abyss',
      'Summon Otherworldly Tentacles',
      'Soul Cage Siphon',
    ],
    weapons: [
      'Abyssal Pact Blade of Voidglass',
      'Whispering Skull Focus & Athame',
      'Charred Bone Wand of the Fiend',
      'Rod of the Astral Depths',
    ],
    armors: [
      'Shadow-Tethered Occult Robes',
      'Runed Leather Coat of the Pacted',
      'Gargoyle-Embossed Hide Vest',
      'Grim Shroud of the Old Gods',
    ],
  },
  Monk: {
    name: 'Monk',
    tagline: 'Disciplined ascetic channeling inner ki into devastating speed and strikes',
    role: 'Agile Martial Artist & Stunner',
    primaryStat: 'dexterity',
    hitDie: 8,
    armorType: 'Unarmored / Ki Wraps',
    color: {
      bg: 'bg-cyan-950/20',
      border: 'border-cyan-700/40',
      text: 'text-cyan-300',
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      accent: 'from-cyan-600 to-cyan-800',
    },
    signatureSkills: [
      'Flurry of Ki Blows',
      'Stunning Meridian Strike',
      'Step of the Wind & Deflect Missiles',
      'Empty Palm Wave',
    ],
    weapons: [
      'Ash-Wood Quarterstaff of the Monastery',
      'Brass Weighted Knuckledusters',
      'Tempered Steel Nunchaku',
      'Ceremonial Bo Staff with Iron Ferrules',
    ],
    armors: [
      'Flowing Linen Ki Wraps & Sashes',
      'Monastery Training Vestments',
      'Silk Bandages & Reinforced Sandals',
      'Woven Bamboo Practice Tunic',
    ],
  },
};

export const FIRST_NAMES: string[] = [
  'Aeloria', 'Thorin', 'Vespera', 'Kaelen', 'Morgran', 'Lyra', 'Gideon',
  'Sylas', 'Rowan', 'Baelor', 'Faelyn', 'Cassian', 'Zephyr', 'Iseult',
  'Thalric', 'Elowen', 'Corvus', 'Seraphina', 'Drakon', 'Valeria', 'Kaelith',
  'Bram', 'Orion', 'Theron', 'Mira', 'Astrid', 'Finnian', 'Morrigan',
  'Ronan', 'Althea', 'Ignis', 'Darien', 'Caelum', 'Nyx', 'Halvard',
  'Eldrin', 'Bronn', 'Solas', 'Vael', 'Rhiannon', 'Thalor', 'Briony'
];

export const SURNAMES: string[] = [
  'Stormcaller', 'Ironbreaker', 'Shadowfang', 'Silverhand', 'Moonwhisper',
  'Duskblade', 'Oakenshield', 'Sunstrider', 'Winterborne', 'Emberfall',
  'Ravenshadow', 'Frostguard', 'Bloodhound', 'Starweaver', 'Grimstone',
  'Windwalker', 'Blackwood', 'Brighthelm', 'Highspire', 'Stonecleaver',
  'Ironthorne', 'Dawnseeker', 'Nightbreeze', 'Hearthwarden', 'Deepdelver'
];

export const TITLES: string[] = [
  'the Dauntless', 'the Swift', 'the Unseen', 'of the Silver Citadel',
  'the Wanderer', 'the Ash-Born', 'the Wise', 'the Shield of Dawn',
  'the Spell-Bound', 'the Silent', 'the Lionheart', 'the Oathkeeper',
  'the Redoubtable', 'the Ghost of Thornwood', 'the Star-Eyed',
  'the Ironclad', 'the Tempest-Walker', 'of the High Hollows'
];

export const RACES: CharacterRace[] = [
  'Human',
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Halfling',
  'Dragonborn',
  'Tiefling',
  'Half-Orc',
  'Gnome',
  'Aasimar',
];

export const ALIGNMENTS: Alignment[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
];

export const TRINKETS: string[] = [
  'Ancient copper coin that always lands on heads',
  'Locket carrying ash from a burnt sacred tree',
  'Carved ivory wolf whistle that animals heed',
  'Small obsidian dice with glowing faint runes',
  'Sealed silver vial of shimmering moonlight water',
  'Bent iron key to a fortress that no longer stands',
  'Torn map fragment showing an island that floats',
  'Smooth sea glass stone warm to the touch',
  'Woven friendship braid scented with mountain pine',
  'Brass compass that points toward the nearest campfire',
];

export const BACKSTORIES: string[] = [
  'Banished from the High Spire after uncovering a suppressed astrological prophecy, now seeking redemption across foreign taverns.',
  'Sole survivor of the Iron Redoubt siege; vowed an oath to never turn their back on a companion in peril.',
  'Apprenticed to an eccentric alchemist whose final formula dissolved half the township archives.',
  'Grew up as a street urchin in the port city of Oakhaven before saving an emissary from a guild contract.',
  'Once a champion of the grand arena who refused a rigged match and fled under cover of a moonless night.',
  'Guided lost pilgrimages through the Perilous Crags for a decade before feeling the call to seek forgotten artifacts.',
  'Carries an ancestral blade that hums in low harmony whenever unholy magic lingers within fifty paces.',
  'A former royal cartographer dismissed for charting mysterious cavern networks the crown denied existed.',
  'Raised inside a secluded cloister high above the cloudline, venturing into the lowlands to catalog mortal courage.',
];

/**
 * Rolls 4d6, drops the lowest, returning a score between 3 and 18.
 */
function rollAbilityScore(isPrimary: boolean): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  // drop lowest (index 0)
  const sum = rolls[1] + rolls[2] + rolls[3];
  // If primary stat, ensure at least a solid heroic floor (14-18)
  if (isPrimary) {
    return Math.max(sum, Math.floor(Math.random() * 4) + 14);
  }
  return sum;
}

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateCharacter(options?: {
  forcedClass?: CharacterClass;
  forcedRace?: CharacterRace;
  forcedName?: string;
}): FantasyCharacter {
  const characterClass = options?.forcedClass || getRandomItem(Object.keys(CLASS_DEFINITIONS) as CharacterClass[]);
  const classDef = CLASS_DEFINITIONS[characterClass];
  const race = options?.forcedRace || getRandomItem(RACES);
  
  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(SURNAMES);
  const title = getRandomItem(TITLES);
  const fullName = options?.forcedName || `${firstName} ${surname}`;

  const primaryStat = classDef.primaryStat;

  const abilities: AbilityScores = {
    strength: rollAbilityScore(primaryStat === 'strength'),
    dexterity: rollAbilityScore(primaryStat === 'dexterity'),
    constitution: rollAbilityScore(primaryStat === 'constitution'),
    intelligence: rollAbilityScore(primaryStat === 'intelligence'),
    wisdom: rollAbilityScore(primaryStat === 'wisdom'),
    charisma: rollAbilityScore(primaryStat === 'charisma'),
  };

  // Adjust for race minor fantasy bonuses
  if (race === 'Mountain Dwarf') abilities.constitution += 2;
  if (race === 'High Elf') abilities.intelligence += 2;
  if (race === 'Wood Elf') abilities.dexterity += 2;
  if (race === 'Half-Orc') abilities.strength += 2;
  if (race === 'Tiefling' || race === 'Aasimar') abilities.charisma += 2;
  if (race === 'Gnome') abilities.intelligence += 1;
  if (race === 'Halfling') abilities.dexterity += 1;

  const conMod = Math.floor((abilities.constitution - 10) / 2);
  const dexMod = Math.floor((abilities.dexterity - 10) / 2);
  const intMod = Math.floor((abilities.intelligence - 10) / 2);
  const wisMod = Math.floor((abilities.wisdom - 10) / 2);
  const chaMod = Math.floor((abilities.charisma - 10) / 2);

  const level = 1;
  const healthBonus = characterClass === 'Warrior' || characterClass === 'Paladin' ? 30 : characterClass === 'Rogue' || characterClass === 'Monk' ? 15 : 5;
  const health = Math.floor(Math.random() * 25) + 75 + healthBonus + Math.max(0, conMod * 3);
  const hp = health;

  const manaBonus = characterClass === 'Mage' || characterClass === 'Warlock' ? 35 : characterClass === 'Cleric' || characterClass === 'Druid' ? 25 : 10;
  const mana = Math.floor(Math.random() * 20) + 45 + manaBonus + Math.max(0, Math.max(intMod, wisMod, chaMod) * 3);
  const strength = abilities.strength;

  const armorClass = 10 + dexMod + (characterClass === 'Warrior' || characterClass === 'Paladin' ? 6 : characterClass === 'Cleric' ? 4 : 2);

  const weapon = getRandomItem(classDef.weapons);
  const armor = getRandomItem(classDef.armors);
  const trinket = getRandomItem(TRINKETS);
  const signatureSkill = getRandomItem(classDef.signatureSkills);
  const alignment = getRandomItem(ALIGNMENTS);
  const backstory = generateUniqueBackstory({
    name: fullName,
    characterClass,
    race,
    alignment,
    equipment: { weapon, armor, trinket },
    signatureSkill,
  });

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: fullName,
    title,
    characterClass,
    race,
    alignment,
    level,
    health,
    hp,
    mana,
    strength,
    armorClass,
    abilities,
    equipment: {
      weapon,
      armor,
      trinket,
    },
    signatureSkill,
    backstory,
    createdAt: Date.now(),
  };
}

export function getStatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function generateUniqueBackstory(char: {
  name: string;
  characterClass: CharacterClass;
  race: CharacterRace;
  alignment: Alignment;
  equipment: Equipment;
  signatureSkill: string;
}): string {
  const { name, characterClass, race, alignment, equipment, signatureSkill } = char;

  const templates: Record<CharacterClass, string[]> = {
    Warrior: [
      `Born of ${race} lineage and hardened in the siege of Ironridge, ${name} took up their ${equipment.weapon} after a legendary stand against an encroaching vanguard. Now wandering as a ${alignment} mercenary, they live by their deadly ${signatureSkill} and an unbreakable martial oath.`,
      `Once the honored champion of an imperial garrison, ${name} refused an order to raze a defenseless village and fled into the wild frontier. Armed with their trusted ${equipment.weapon}, they now sell their sword only to causes worthy of true honor.`,
      `The sole survivor of an ambushed caravan in the Dragon's Teeth pass, ${name} carved their way out using sheer grit and their ${equipment.weapon}. Driven by the memory of fallen comrades, they march fearlessly into battle with their ${signatureSkill}.`,
      `Trained from youth in the brutal sparring pits of the northern steppes, ${name} mastered the devastating ${signatureSkill} before winning their freedom. With their ${equipment.weapon} in hand, they seek glorious battle against horrors spoken of only in legend.`,
    ],
    Mage: [
      `A prodigy of the Astral Academy, ${name} was cast out when their forbidden research into ${signatureSkill} shattered the spire's crystal meridian. Wandering the realm with their ${equipment.weapon}, they seek to unravel cosmic mysteries that orthodox scholars fear to touch.`,
      `While investigating an ancient runic monolith buried deep beneath their ancestral lands, ${name} absorbed raw leylines that forever awakened their mind. Channeling this surge through their ${equipment.weapon}, they now venture into forgotten dungeons in pursuit of lost arcane manuscripts.`,
      `Raised in a secluded hermitage where celestial portents guide every waking hour, ${name} foresaw a great planar convergence that will shake the mortal realm. Relying on their ${signatureSkill} and trusty ${equipment.weapon}, they seek heroic allies before the stars align.`,
      `An alchemical experiment gone awry bound ${name}'s spirit to primordial aether, granting them the catastrophic power of ${signatureSkill}. Clad in enchanted robes and bearing their ${equipment.weapon}, they walk a perilous line between genius and cataclysm.`,
    ],
    Rogue: [
      `Raised in the fog-drenched alleys of the pirate haven of Bilgewater, ${name} stole a priceless guild ledger marked with royal blood. Surviving by the razor edge of their ${equipment.weapon}, they strike from the dark with their signature ${signatureSkill}.`,
      `Formerly the chief infiltrator for a deposed noble house, ${name} slipped through castle parapets unnoticed until a treacherous betrayal cost them everything. Now an independent ${alignment} rogue, they wield their ${equipment.weapon} to settle old scores on their own terms.`,
      `Orphaned early and taken in by a syndicate of phantom acrobats, ${name} turned stealth and evasion into high art. Armed with their concealed ${equipment.weapon}, few marks ever see their ${signatureSkill} coming before it is too late.`,
      `After escaping an inescapable subterranean penal colony using a stolen lockpick and uncanny speed, ${name} took to the open road. With their trusty ${equipment.weapon} at their side, they take only jobs that promise legendary renown and boundless coin.`,
    ],
    Paladin: [
      `Consecrated at the Silver Altar beneath a blood moon, ${name} swore a solemn oath to stand between innocent lives and encroaching darkness. Raising their sanctified ${equipment.weapon}, they channel radiant fury through their ${signatureSkill}.`,
      `A former temple knight who witnessed holy corruption rotting the high council from within, ${name} chose the true righteous path of an errant champion. Guided by divine providence and their ${equipment.weapon}, they bring righteous judgment wherever darkness festers.`,
      `Blessed from birth with a burning celestial calling, ${name} was saved from a demonic raid by an angelic apparition that left an indelible mark upon their soul. Bearing their consecrated ${equipment.weapon}, they inspire hope across war-torn provinces with their ${signatureSkill}.`,
      `Sworn to protect a sacred covenant older than the kingdoms themselves, ${name} defends pilgrims navigating the haunted borderlands. With unyielding faith and their heavy ${equipment.weapon}, they fear no evil under the sun.`,
    ],
    Ranger: [
      `A solitary scout of the Whispering Weald, ${name} spent a decade patrolling treacherous frontiers where few civilized men dare tread. Honing their lethal ${signatureSkill}, they track perilous quarry with their trusty ${equipment.weapon}.`,
      `When a corrupted blight began withering their ancestral forest, ${name} ventured beyond the tree line to hunt down the source of the unnatural plague. Guided by forest instincts and their ${equipment.weapon}, they never lose a trail once scented.`,
      `Raised among nomadic wolf-tamers along the craggy tundra, ${name} learned to read the wind and strike before prey could register the sound. In combat, their mastery of ${signatureSkill} and precision with the ${equipment.weapon} make them a dreaded skirmisher.`,
      `A veteran guide who led royal expeditions through uncharted jungles, ${name} survived where entire companies vanished into treacherous swamps. Clad in camouflaged gear with their ${equipment.weapon}, they remain the ultimate survivalist.`,
    ],
    Cleric: [
      `Chosen by a miraculous divine manifestation during an incurable plague, ${name} was granted sacred healing grace that halted the pestilence. Wielding their ${equipment.weapon}, they walk the realm as a ${alignment} conduit of celestial restoration and judgment.`,
      `A humble acolyte who single-handedly defended a mountain shrine from marauding fiends through the miraculous power of ${signatureSkill}. Bearing the holy relic and their ${equipment.weapon}, they now travel abroad to rekindle faith across dark lands.`,
      `After surviving a shipwreck that claimed a holy fleet, ${name} washed ashore with an unbreakable conviction that their deity preserved them for an apocalyptic trial. With their consecrated ${equipment.weapon}, they offer solace to the weary and smite the unholy.`,
      `Anointed by the High Priests after translating an oracle carved in glowing celestial script, ${name} brings the light of truth to shadowed kingdoms. Channeling divine favor through their ${signatureSkill}, they wield their ${equipment.weapon} with unwavering serenity.`,
    ],
    Bard: [
      `Exiled from the royal court for singing a biting satirical ballad that exposed an archduke's treason, ${name} found that truth is best spread on the road. Armed with their quick wit and ${equipment.weapon}, they weave legends with their captivating ${signatureSkill}.`,
      `Trained at the clandestine College of Whispers, ${name} discovered that song could bend minds and shatter stone as easily as swords pierce mail. Strumming their tunes and brandishing their ${equipment.weapon}, they seek out heroic deeds to immortalize in saga.`,
      `A charismatic traveler who won a masterwork instrument in a high-stakes dice game against a crossroads fey, ${name} dances between danger and delight. In battle, they rally companions with their ${signatureSkill} and defend themselves with their ${equipment.weapon}.`,
      `Once an apprentice historian who found dry scrolls too lifeless, ${name} set out to live the grand adventures that others merely read about. With their flamboyant swagger and ${equipment.weapon}, they turn every skirmish into a breathtaking performance.`,
    ],
    Druid: [
      `Awakened in the heart of an primordial circle where ancient roots hum with primal magic, ${name} was tasked with defending nature against urban expansion. Unleashing the raw fury of ${signatureSkill}, they protect the wilds with their ${equipment.weapon}.`,
      `Surviving an elemental cataclysm by taking refuge within the hollow of a sacred elder tree, ${name} emerged bonded directly to the spirits of storm and beast. Clad in living bark with their ${equipment.weapon}, they bring balance to fractured ecosystems.`,
      `A warden of the foggy fenlands who communes with ravens and serpents, ${name} senses a foreign disturbance corrupting subterranean leylines. Channeling ${signatureSkill} through their ${equipment.weapon}, they unleash primeval wrath upon all who poison the earth.`,
      `Raised in a reclusive clan of shapechangers hidden high among craggy cloud peaks, ${name} answers the summons of the great migration. Wielding an organic ${equipment.weapon}, they fight with the untamed instinct of the primal wild.`,
    ],
    Warlock: [
      `Pact-bound after bargaining for survival amidst a cursed shipwreck in the Abyssal Depths, ${name} surrendered a portion of their destiny to an otherworldly patron. Channeling the harrowing power of ${signatureSkill}, they brandish their ${equipment.weapon} while paying a debt in secret.`,
      `An ambitious occult seeker who unsealed a forbidden sarcophagus beneath forgotten dunes, ${name} forged an accord with an ancient entity of shadows. Armed with their ${equipment.weapon}, they seek lost relics to satisfy their patron's cryptic demands.`,
      `Haunted since youth by eldritch whispers emanating from their keepsake trinket, ${name} embraced the unnatural arcane gifts that orthodox wizards dread. When provoked, they unleash ${signatureSkill} with their eerie ${equipment.weapon}.`,
      `Once a doomed scholar suffering a fatal curse, ${name} traded their service to a fiendish court in exchange for dark immortality and eldritch sorcery. With their pact-forged ${equipment.weapon}, they navigate the mortal world as a dangerous harbinger of forbidden lore.`,
    ],
    Monk: [
      `Trained atop the gale-swept peaks of the Iron Lotus Monastery, ${name} spent two decades refining the sacred flow of inner ki into a living weapon. Striking with the ferocity of ${signatureSkill}, they defend the innocent with their disciplined ${equipment.weapon}.`,
      `Having achieved inner awakening through profound silence and meditation under frozen waterfalls, ${name} descended from the high cliffs to test their spirit against worldly temptations. Armed with focus and their ${equipment.weapon}, their speed defies mortal comprehension.`,
      `A former soldier who renounced warfare and bloodlust to walk the ascetic path of self-mastery, ${name} now channels physical energy to neutralize foes without needless cruelty. In combat, their mastery of ${signatureSkill} and ${equipment.weapon} is mesmerizing.`,
      `The sole inheritor of an ancient martial discipline whose temple was burned by tyrannical warlords, ${name} carries the legacy of a hundred masters within their strikes. With disciplined resolve and their ${equipment.weapon}, they seek to restore peace to a chaotic realm.`,
    ],
  };

  const classList = templates[characterClass] || templates['Warrior'];
  return classList[Math.floor(Math.random() * classList.length)];
}

