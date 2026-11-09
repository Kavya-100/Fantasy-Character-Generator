import { CharacterClass, CharacterPortrait } from '../types/character';

export function createRandomPortrait(
  characterClass: CharacterClass,
  existingPortrait?: CharacterPortrait | null,
  forceStyle?: 'videogame' | 'cartoon'
): CharacterPortrait {
  const currentSeed = existingPortrait?.seed || 0;
  // Ensure new seed is different so regeneration is visibly distinct
  let newSeed = Math.floor(Math.random() * 100000) + 1;
  if (newSeed === currentSeed) newSeed += 1;

  const style = forceStyle || existingPortrait?.style || (Math.random() > 0.4 ? 'videogame' : 'cartoon');
  const paletteIndex = Math.floor(Math.random() * 3);
  const expressionIndex = Math.floor(Math.random() * 4);
  const headgearIndex = Math.floor(Math.random() * 3);
  const accessoryIndex = Math.floor(Math.random() * 3);
  const auraIntensity = Math.floor(Math.random() * 3) + 1; // 1 to 3

  return {
    seed: newSeed,
    style,
    paletteIndex,
    expressionIndex,
    headgearIndex,
    accessoryIndex,
    auraIntensity,
    generatedAt: Date.now(),
  };
}
