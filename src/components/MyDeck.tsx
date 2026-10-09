import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/fantasyData';
import {
  Layers,
  Trash2,
  ArrowRight,
  Download,
  Copy,
  Check,
  Heart,
  Zap,
  Sword,
  Sparkles,
} from 'lucide-react';

interface MyDeckProps {
  deck: FantasyCharacter[];
  activeCardId: string;
  onSelectCard: (char: FantasyCharacter) => void;
  onRemoveCard: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  activeCardId,
  onSelectCard,
  onRemoveCard,
  onClearDeck,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyDeck = () => {
    if (deck.length === 0) return;
    const text = deck
      .map(
        (c, i) =>
          `[Card #${i + 1}] ${c.name} (${c.title}) - ${c.race} ${c.characterClass}\n  Stats: Health: ${c.health || c.hp} | Mana: ${c.mana} | Strength: ${c.strength || c.abilities.strength}\n  Weapon: ${c.equipment.weapon}\n  Origin: "${c.backstory}"`
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    if (deck.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `my_player_deck_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="rounded-2xl bg-stone-950/90 border border-amber-900/50 p-6 shadow-2xl backdrop-blur relative overflow-hidden">
      {/* Decorative top metallic card edge */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-900/30 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-cinzel font-bold text-amber-100 flex items-center gap-2">
              <span>My Deck</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40 font-mono">
                {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              Saved collection of favorite fantasy hero cards
            </p>
          </div>
        </div>

        {deck.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDeck}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-amber-900/40 rounded-lg transition-colors cursor-pointer"
              title="Copy deck summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-amber-900/40 rounded-lg transition-colors cursor-pointer"
              title="Export deck as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={onClearDeck}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
              title="Clear all cards from My Deck"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {deck.length === 0 ? (
        <div className="py-10 text-center text-stone-500 text-sm space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-stone-900 border border-amber-900/30 flex items-center justify-center text-amber-500/40">
            <Layers className="w-6 h-6" />
          </div>
          <p className="font-medium text-stone-400">Your deck is currently empty.</p>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Click <strong className="text-amber-300">"Save to Deck"</strong> on any generated character card to build your personalized card deck.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {deck.map((card, idx) => {
            const classDef = CLASS_DEFINITIONS[card.characterClass];
            const isActive = card.id === activeCardId;

            return (
              <div
                key={card.id}
                onClick={() => onSelectCard(card)}
                className={`group relative p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-stone-900/95 border-amber-500/70 shadow-lg ring-1 ring-amber-500/30'
                    : 'bg-stone-950/60 border-amber-900/30 hover:bg-stone-900/60 hover:border-amber-700/50'
                }`}
              >
                {/* Card Number Watermark */}
                <span className="absolute top-2 right-2 text-[10px] font-mono text-stone-600 group-hover:text-amber-500/60">
                  #{idx + 1}
                </span>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel font-bold text-sm text-amber-100 truncate">
                        {card.name}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                      <span className={classDef.color.text}>{card.characterClass}</span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span>{card.race}</span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span className="text-stone-500">Lv. {card.level}</span>
                    </div>

                    {/* Stats Triad on Card: Health, Mana, Strength */}
                    <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center text-[11px] font-semibold tabular-nums">
                      <div className="px-2 py-1 rounded-md bg-rose-950/30 border border-rose-800/30 text-rose-300 flex items-center justify-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400 shrink-0" />
                        <span>{card.health || card.hp}</span>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-indigo-950/30 border border-indigo-800/30 text-indigo-300 flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>{card.mana}</span>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-amber-950/30 border border-amber-800/30 text-amber-300 flex items-center justify-center gap-1">
                        <Sword className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{card.strength || card.abilities.strength}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between self-stretch shrink-0 pt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCard(card.id);
                      }}
                      className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                      title="Remove card from deck"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-stone-600 group-hover:text-amber-400 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
