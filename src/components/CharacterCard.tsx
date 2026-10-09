import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { CLASS_DEFINITIONS, getStatModifier } from '../data/fantasyData';
import {
  Shield,
  Heart,
  Zap,
  Sword,
  Sparkles,
  Award,
  Scroll,
  RefreshCw,
  Type,
  Feather,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { CharacterPortrait } from './CharacterPortrait';
import { MagicalParticles } from './MagicalParticles';

interface CharacterCardProps {
  character: FantasyCharacter;
  isRolling: boolean;
  isGeneratingPortrait?: boolean;
  isGeneratingBackstory?: boolean;
  isSavedToDeck?: boolean;
  onGeneratePortrait?: () => void;
  onRegeneratePortrait?: () => void;
  onChangePortraitStyle?: (style: 'videogame' | 'cartoon') => void;
  onGenerateBackstory?: () => void;
  onToggleSaveToDeck?: () => void;
  onRerollField?: (field: 'name' | 'class' | 'stats' | 'equipment') => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isRolling,
  isGeneratingPortrait = false,
  isGeneratingBackstory = false,
  isSavedToDeck = false,
  onGeneratePortrait,
  onRegeneratePortrait,
  onChangePortraitStyle,
  onGenerateBackstory,
  onToggleSaveToDeck,
}) => {
  const classDef = CLASS_DEFINITIONS[character.characterClass];
  // Toggle between Uncial Antiqua and Cinzel Decorative
  const [nameFont, setNameFont] = useState<'uncial' | 'cinzel-decorative'>('uncial');

  // Random stats requested: Health, Mana, and Strength
  const healthStat = character.health || character.hp;
  const manaStat = character.mana;
  const strengthStat = character.strength || character.abilities.strength;

  const secondaryStats = [
    { label: 'DEX', full: 'Dexterity', val: character.abilities.dexterity },
    { label: 'CON', full: 'Constitution', val: character.abilities.constitution },
    { label: 'INT', full: 'Intelligence', val: character.abilities.intelligence },
    { label: 'WIS', full: 'Wisdom', val: character.abilities.wisdom },
    { label: 'CHA', full: 'Charisma', val: character.abilities.charisma },
  ];

  return (
    /* Outer Bordered Player Card Shell */
    <div
      className={`relative w-full rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-amber-700/60 via-amber-900/50 to-stone-950 border-4 border-amber-600/70 shadow-2xl transition-all duration-300 ${
        isRolling ? 'opacity-60 scale-[0.99] filter blur-[0.5px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Corner Gilded Inlay Studs */}
      <div className="absolute top-1.5 left-2 text-xs font-mono text-amber-300 select-none pointer-events-none">
        ✦ ᚱ
      </div>
      <div className="absolute top-1.5 right-2 text-xs font-mono text-amber-300 select-none pointer-events-none">
        ᛏ ✦
      </div>
      <div className="absolute bottom-1.5 left-2 text-xs font-mono text-amber-300/80 select-none pointer-events-none">
        ✧ ᚨ
      </div>
      <div className="absolute bottom-1.5 right-2 text-xs font-mono text-amber-300/80 select-none pointer-events-none">
        ᛋ ✧
      </div>

      {/* Inner Card Matte Surface with Double Inset Border */}
      <article className="relative w-full rounded-2xl bg-gradient-to-b from-stone-950 via-stone-900/95 to-stone-950 border-2 border-amber-500/50 p-5 sm:p-7 shadow-inner overflow-hidden magical-glow-border">
        {/* Subtle Ambient Magical Particles */}
        <MagicalParticles active={!isRolling} />

        {/* Top Header Card Banner */}
        <header className="relative z-10 border-b border-amber-900/40 pb-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              {/* Card Badge & Lineage */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-300/80">
                <span className={classDef.color.text}>{character.characterClass}</span>
                <span aria-hidden="true" className="text-amber-700">·</span>
                <span>{character.race}</span>
                <span aria-hidden="true" className="text-amber-700">·</span>
                <span>Player Card Lv. {character.level}</span>
                <span aria-hidden="true" className="text-amber-700">·</span>
                <span className="text-stone-400">{character.alignment}</span>
              </div>

              {/* Character Name in Fantasy Font */}
              <div className="flex items-center gap-3 pt-1">
                <h1
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-amber-50 text-balance drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] ${
                    nameFont === 'uncial' ? 'font-uncial' : 'font-cinzel-decorative'
                  }`}
                >
                  {character.name}
                </h1>

                {/* Font Toggle */}
                <button
                  onClick={() => setNameFont((prev) => (prev === 'uncial' ? 'cinzel-decorative' : 'uncial'))}
                  className="opacity-60 hover:opacity-100 text-amber-400 hover:text-amber-200 p-1 rounded-md transition-opacity cursor-pointer"
                  title={`Switch font: ${nameFont === 'uncial' ? 'Uncial Antiqua' : 'Cinzel Decorative'}`}
                  aria-label="Toggle fantasy name font"
                >
                  <Type className="w-4 h-4" />
                </button>
              </div>

              {/* Epithet / Title */}
              <p className="text-sm sm:text-base font-cinzel italic text-amber-400/90 tracking-wide">
                {character.title}
              </p>
            </div>

            {/* Class Seal & Primary Save to Deck Button */}
            <div className="shrink-0 flex items-center md:flex-col md:items-end gap-2.5">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 text-sm font-bold tracking-wide shadow-md ${classDef.color.badge}`}>
                <Sparkles className="w-4 h-4" />
                <span>{character.characterClass}</span>
              </div>
              <span className="text-xs text-amber-300/80 font-medium">
                {classDef.role}
              </span>

              {/* Save to Deck Button on Card */}
              {onToggleSaveToDeck && (
                <button
                  onClick={onToggleSaveToDeck}
                  className={`mt-1 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer shadow-md active:scale-95 whitespace-nowrap ${
                    isSavedToDeck
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-stone-900 hover:bg-stone-800 border-amber-700/60 hover:border-amber-500 text-stone-200 hover:text-white'
                  }`}
                  title={isSavedToDeck ? 'Card is in My Deck' : 'Save card to My Deck'}
                >
                  {isSavedToDeck ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      <span>Saved in My Deck</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-amber-400/80" />
                      <span>Save to Deck</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Card Artwork Window: Character Portrait */}
        <section className="relative z-10 mb-6" aria-label="Hero Card Artwork">
          {onGeneratePortrait && onRegeneratePortrait && (
            <CharacterPortrait
              characterClass={character.characterClass}
              characterName={character.name}
              portrait={character.portrait}
              isGenerating={isGeneratingPortrait}
              onGenerate={onGeneratePortrait}
              onRegenerate={onRegeneratePortrait}
              onChangeStyle={onChangePortraitStyle}
            />
          )}
        </section>

        {/* Primary Random Stats Triad: Health, Mana, and Strength */}
        <section className="relative z-10 mb-6" aria-label="Core Player Card Stats">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-cinzel">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Core Card Vitals</span>
            </h2>
            <span className="text-[11px] text-stone-400 font-medium">Random Player Stats</span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {/* Health Stat */}
            <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-stone-950 to-stone-900 border-2 border-rose-800/50 shadow-md flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 shrink-0">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">Health</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tabular-nums">
                  {healthStat} <span className="text-xs font-normal text-rose-300/70">HP</span>
                </div>
              </div>
            </div>

            {/* Mana Stat */}
            <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-stone-950 to-stone-900 border-2 border-indigo-800/50 shadow-md flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Mana</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tabular-nums">
                  {manaStat} <span className="text-xs font-normal text-indigo-300/70">MP</span>
                </div>
              </div>
            </div>

            {/* Strength Stat */}
            <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-stone-950 to-stone-900 border-2 border-amber-600/60 shadow-md flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                <Sword className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Strength</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tabular-nums">
                  {strengthStat} <span className="text-xs font-bold text-amber-400">{getStatModifier(strengthStat)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Ability Scores Block */}
        <section className="relative z-10 mb-6" aria-label="Secondary Ability Scores">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {secondaryStats.map((s) => {
              const mod = getStatModifier(s.val);
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-950/70 border border-amber-900/30 text-center"
                >
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {s.label}
                  </span>
                  <span className="text-lg font-bold text-white tabular-nums my-0.5">
                    {s.val}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 tabular-nums">
                    {mod}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gear & Technique Panel */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Technique */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-amber-900/40">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Signature Skill</span>
            </div>
            <div className="font-cinzel text-base font-bold text-amber-200">
              {character.signatureSkill}
            </div>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Special technique of the {character.characterClass} discipline.
            </p>
          </div>

          {/* Gear */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-amber-900/40">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Equipped Loadout</span>
            </div>
            <div className="text-xs text-stone-300 space-y-1">
              <div className="truncate"><span className="text-stone-500 font-semibold">Weapon:</span> {character.equipment.weapon}</div>
              <div className="truncate"><span className="text-stone-500 font-semibold">Armor:</span> {character.equipment.armor}</div>
              <div className="truncate"><span className="text-stone-500 font-semibold">Trinket:</span> <span className="text-amber-300 italic">{character.equipment.trinket}</span></div>
            </div>
          </div>
        </div>

        {/* Flavor Text Box: Origin Chronicle */}
        <section className="relative z-10 p-4 rounded-xl bg-stone-950/80 border border-amber-900/50">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Scroll className="w-4 h-4 text-amber-400" />
              <span>Player Card Origin Lore</span>
            </div>

            {onGenerateBackstory && (
              <button
                onClick={onGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-stone-900 hover:bg-stone-800 border border-amber-800/60 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap active:scale-95"
                title="Generate a unique one-to-two-sentence origin story"
              >
                <Feather className={`w-3.5 h-3.5 ${isGeneratingBackstory ? 'animate-bounce' : ''}`} />
                <span>Generate Backstory</span>
              </button>
            )}
          </div>

          <p className={`text-sm text-stone-200 italic leading-relaxed transition-opacity duration-200 ${isGeneratingBackstory ? 'opacity-40' : 'opacity-100'}`}>
            "{character.backstory}"
          </p>
        </section>

        {/* Bordered Player Card Footer Rim */}
        <footer className="relative z-10 mt-5 pt-3 border-t border-amber-900/30 flex items-center justify-between text-[11px] text-stone-500">
          <span>Collectible Player Card · Series I</span>
          <span>Armor Class: {character.armorClass} AC</span>
        </footer>
      </article>
    </div>
  );
};
