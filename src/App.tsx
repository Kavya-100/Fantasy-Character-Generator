/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { FantasyCharacter, CharacterClass, CharacterRace } from './types/character';
import { generateCharacter, generateUniqueBackstory, CLASS_DEFINITIONS, RACES } from './data/fantasyData';
import { createRandomPortrait } from './utils/portraitGenerator';
import { CharacterCard } from './components/CharacterCard';
import { MyDeck } from './components/MyDeck';
import { ClassOverview } from './components/ClassOverview';
import { soundEngine } from './utils/sound';
import {
  Dices,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Sparkles,
  Scroll,
  RefreshCw,
  Feather,
  Layers,
} from 'lucide-react';

const STORAGE_KEY_DECK = 'fantasy_player_deck_v1';

export default function App() {
  // Primary character state
  const [character, setCharacter] = useState<FantasyCharacter>(() => {
    const initChar = generateCharacter();
    // Pre-populate with initial stylized portrait matching their class
    initChar.portrait = createRandomPortrait(initChar.characterClass);
    return initChar;
  });
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState<boolean>(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState<boolean>(false);

  // Optional locks for users who want to focus roll
  const [lockedClass, setLockedClass] = useState<CharacterClass | null>(null);
  const [lockedRace, setLockedRace] = useState<CharacterRace | null>(null);

  // Saved player cards deck
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DECK);
      if (saved) return JSON.parse(saved);
    } catch {
      // LocalStorage error fallback
    }
    return [];
  });

  // UI state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copiedSheet, setCopiedSheet] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'card' | 'deck' | 'classes'>('card');

  // Sync soundEngine
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  // Persist deck
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DECK, JSON.stringify(deck));
    } catch {
      // Ignore storage quota errors
    }
  }, [deck]);

  /**
   * Generates a new random character with random Name and Class and core stats (Health, Mana, Strength)
   */
  const handleGenerateCharacter = useCallback((forcedClass?: CharacterClass) => {
    soundEngine.playDiceRoll();
    setIsRolling(true);

    setTimeout(() => {
      const targetClass = forcedClass || (lockedClass ?? undefined);
      const newChar = generateCharacter({
        forcedClass: targetClass,
        forcedRace: lockedRace ?? undefined,
      });

      // Automatically generate matched portrait for the new class
      newChar.portrait = createRandomPortrait(newChar.characterClass);

      setCharacter(newChar);
      setIsRolling(false);
    }, 220);
  }, [lockedClass, lockedRace]);

  /**
   * Generates or Regenerates a cartoon or video-game-style portrait matching the character's class
   */
  const handleGeneratePortrait = useCallback(() => {
    soundEngine.playDiceRoll();
    setIsGeneratingPortrait(true);

    setTimeout(() => {
      const newPortrait = createRandomPortrait(character.characterClass, null);
      setCharacter((prev) => {
        const updated = { ...prev, portrait: newPortrait };
        // If in deck, keep in sync
        setDeck((curr) =>
          curr.map((item) => (item.id === prev.id ? { ...item, portrait: newPortrait } : item))
        );
        return updated;
      });
      setIsGeneratingPortrait(false);
    }, 260);
  }, [character.characterClass]);

  const handleRegeneratePortrait = useCallback(() => {
    soundEngine.playDiceRoll();
    setIsGeneratingPortrait(true);

    setTimeout(() => {
      const newPortrait = createRandomPortrait(character.characterClass, character.portrait);
      setCharacter((prev) => {
        const updated = { ...prev, portrait: newPortrait };
        setDeck((curr) =>
          curr.map((item) => (item.id === prev.id ? { ...item, portrait: newPortrait } : item))
        );
        return updated;
      });
      setIsGeneratingPortrait(false);
    }, 260);
  }, [character.characterClass, character.portrait]);

  const handleChangePortraitStyle = useCallback((style: 'videogame' | 'cartoon') => {
    soundEngine.playClick();
    const newPortrait = createRandomPortrait(character.characterClass, character.portrait, style);
    setCharacter((prev) => {
      const updated = { ...prev, portrait: newPortrait };
      setDeck((curr) =>
        curr.map((item) => (item.id === prev.id ? { ...item, portrait: newPortrait } : item))
      );
      return updated;
    });
  }, [character.characterClass, character.portrait]);

  /**
   * Generates a unique 1-to-2 sentence origin story for the current character
   */
  const handleGenerateBackstory = useCallback(() => {
    soundEngine.playClick();
    setIsGeneratingBackstory(true);

    setTimeout(() => {
      const newBackstory = generateUniqueBackstory(character);
      setCharacter((prev) => {
        const updated = { ...prev, backstory: newBackstory };
        setDeck((curr) =>
          curr.map((item) => (item.id === prev.id ? { ...item, backstory: newBackstory } : item))
        );
        return updated;
      });
      setIsGeneratingBackstory(false);
    }, 200);
  }, [character]);

  // Save to Deck toggle handler
  const isSavedToDeck = deck.some((c) => c.id === character.id);
  const handleToggleSaveToDeck = () => {
    soundEngine.playClick();
    if (isSavedToDeck) {
      setDeck((prev) => prev.filter((c) => c.id !== character.id));
    } else {
      setDeck((prev) => [character, ...prev]);
    }
  };

  // Copy markdown player card sheet
  const handleCopyCardSheet = () => {
    soundEngine.playClick();
    const sheet = [
      `# ${character.name}`,
      `*${character.title}*`,
      ``,
      `**Class:** ${character.characterClass} | **Race:** ${character.race} | **Level:** ${character.level} | **Alignment:** ${character.alignment}`,
      `**Player Card Vitals:** Health: ${character.health || character.hp} HP | Mana: ${character.mana} MP | Strength: ${character.strength || character.abilities.strength} STR | AC: ${character.armorClass}`,
      `**Portrait Art:** ${character.portrait ? `${character.portrait.style.toUpperCase()} (${character.characterClass} Regalia)` : 'None'}`,
      ``,
      `### Ability Scores`,
      `- STR: ${character.abilities.strength}`,
      `- DEX: ${character.abilities.dexterity}`,
      `- CON: ${character.abilities.constitution}`,
      `- INT: ${character.abilities.intelligence}`,
      `- WIS: ${character.abilities.wisdom}`,
      `- CHA: ${character.abilities.charisma}`,
      ``,
      `### Equipment & Technique`,
      `- Weapon: ${character.equipment.weapon}`,
      `- Armor: ${character.equipment.armor}`,
      `- Trinket: ${character.equipment.trinket}`,
      `- Signature Technique: ${character.signatureSkill}`,
      ``,
      `### Origin Lore`,
      `"${character.backstory}"`,
    ].join('\n');

    navigator.clipboard.writeText(sheet);
    setCopiedSheet(true);
    setTimeout(() => setCopiedSheet(false), 2000);
  };

  return (
    <div className="min-h-screen workbench-bg text-stone-100 flex flex-col relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient Ancient Alchemist Glow Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-black/60" />

      {/* Top Bar Contract: 3-zone layout separated by gap-8 */}
      <header className="relative z-40 border-b border-amber-900/40 bg-stone-950/90 backdrop-blur sticky top-0 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, one line in display face */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-inner">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-tight text-amber-100">
              Fantasy Character Generator
            </span>
          </div>

          {/* Zone 2: Navigation views */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-400">
            <button
              onClick={() => setActiveTab('card')}
              className={`hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'card' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Player Card
            </button>
            <button
              onClick={() => setActiveTab('deck')}
              className={`hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'deck' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              <span>My Deck</span>
              {deck.length > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-stone-800 text-amber-300 border border-amber-900/50 rounded font-mono">
                  {deck.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'classes' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Class Compendium
            </button>
          </nav>

          {/* Zone 3: Primary action button and sound control */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSoundEnabled((v) => !v)}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-900 rounded-lg transition-colors border border-transparent hover:border-amber-900/40 cursor-pointer"
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              title={soundEnabled ? 'Mute dice audio' : 'Unmute dice audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-600" />}
            </button>

            <button
              onClick={() => handleGenerateCharacter()}
              disabled={isRolling}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 rounded-lg shadow-lg shadow-amber-950/50 transition-all whitespace-nowrap shrink-0 disabled:opacity-60 cursor-pointer"
            >
              <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>Generate Character</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Generator Controls Bar */}
        <section className="mb-8 rounded-2xl bg-stone-950/90 border border-amber-900/40 p-4 sm:p-5 shadow-2xl backdrop-blur relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Quick Generator Trigger, Portrait Buttons, Save to Deck & Status */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleGenerateCharacter()}
                disabled={isRolling}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                <span>Generate Character</span>
              </button>

              {/* Two Explicit Portrait Buttons */}
              <button
                onClick={handleGeneratePortrait}
                disabled={isGeneratingPortrait}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-950 bg-amber-300 hover:bg-amber-200 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Portrait</span>
              </button>

              <button
                onClick={handleRegeneratePortrait}
                disabled={isGeneratingPortrait}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-200 bg-stone-900 hover:bg-stone-800 active:scale-95 border border-amber-800/50 rounded-xl transition-all cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                <span>Regenerate Portrait</span>
              </button>

              {/* Generate Backstory Button */}
              <button
                onClick={handleGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-200 bg-stone-900 hover:bg-stone-800 active:scale-95 border border-amber-800/60 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                <Feather className={`w-3.5 h-3.5 ${isGeneratingBackstory ? 'animate-bounce' : ''}`} />
                <span>Generate Backstory</span>
              </button>

              {/* Requested "Save to Deck" Button */}
              <button
                onClick={handleToggleSaveToDeck}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                  isSavedToDeck
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-stone-900 hover:bg-stone-800 border-amber-700/60 hover:border-amber-500 text-stone-200'
                }`}
                title={isSavedToDeck ? 'In My Deck' : 'Save to Deck'}
              >
                {isSavedToDeck ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-400" />
                    <span>In My Deck</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-amber-400" />
                    <span>Save to Deck</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyCardSheet}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-stone-900/80 hover:bg-stone-800/80 border border-amber-900/40 text-stone-200 transition-all cursor-pointer"
              >
                {copiedSheet ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Card Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>Copy Card</span>
                  </>
                )}
              </button>
            </div>

            {/* Optional Class & Race Locks */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="text-amber-500/80 font-medium">Pin Attribute:</span>

              {/* Class Lock */}
              <div className="inline-flex items-center rounded-lg bg-stone-950 border border-amber-900/40 px-2.5 py-1.5 gap-1.5">
                <span className="text-stone-400 font-semibold">Class:</span>
                <select
                  value={lockedClass || ''}
                  onChange={(e) => setLockedClass(e.target.value ? (e.target.value as CharacterClass) : null)}
                  className="bg-transparent text-amber-300 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-stone-900 text-stone-300">Any Class</option>
                  {(Object.keys(CLASS_DEFINITIONS) as CharacterClass[]).map((cls) => (
                    <option key={cls} value={cls} className="bg-stone-900 text-white">
                      {cls}
                    </option>
                  ))}
                </select>
                {lockedClass ? (
                  <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                ) : (
                  <Unlock className="w-3 h-3 text-stone-600 shrink-0" />
                )}
              </div>

              {/* Race Lock */}
              <div className="inline-flex items-center rounded-lg bg-stone-950 border border-amber-900/40 px-2.5 py-1.5 gap-1.5">
                <span className="text-stone-400 font-semibold">Race:</span>
                <select
                  value={lockedRace || ''}
                  onChange={(e) => setLockedRace(e.target.value ? (e.target.value as CharacterRace) : null)}
                  className="bg-transparent text-amber-300 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-stone-900 text-stone-300">Any Race</option>
                  {RACES.map((race) => (
                    <option key={race} value={race} className="bg-stone-900 text-white">
                      {race}
                    </option>
                  ))}
                </select>
                {lockedRace ? (
                  <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                ) : (
                  <Unlock className="w-3 h-3 text-stone-600 shrink-0" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Split / Tab View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column: Bordered Player Card (7 cols on desktop) */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <CharacterCard
              character={character}
              isRolling={isRolling}
              isGeneratingPortrait={isGeneratingPortrait}
              isGeneratingBackstory={isGeneratingBackstory}
              isSavedToDeck={isSavedToDeck}
              onGeneratePortrait={handleGeneratePortrait}
              onRegeneratePortrait={handleRegeneratePortrait}
              onChangePortraitStyle={handleChangePortraitStyle}
              onGenerateBackstory={handleGenerateBackstory}
              onToggleSaveToDeck={handleToggleSaveToDeck}
            />
          </section>

          {/* Side Column: "My Deck" Card List & Class Compendium (5 cols on desktop) */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* "My Deck" Saved List */}
            <MyDeck
              deck={deck}
              activeCardId={character.id}
              onSelectCard={(card) => {
                soundEngine.playClick();
                setCharacter(card);
              }}
              onRemoveCard={(id) => {
                soundEngine.playClick();
                setDeck((prev) => prev.filter((c) => c.id !== id));
              }}
              onClearDeck={() => {
                soundEngine.playClick();
                setDeck([]);
              }}
            />

            {/* Class Compendium */}
            <ClassOverview
              selectedClass={character.characterClass}
              onSelectAndRoll={(cls) => {
                handleGenerateCharacter(cls);
              }}
            />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-900/30 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Scroll className="w-4 h-4 text-amber-500/80" />
            <span>Bordered Fantasy Player Card Generator · Tabletop RPG Collectible Deck System</span>
          </div>
          <div className="text-stone-500">
            Build your deck with "Save to Deck" or forge new cards with "Generate Character"
          </div>
        </div>
      </footer>
    </div>
  );
}
