import React from 'react';
import { CharacterClass } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/fantasyData';
import { Sparkles, Dices } from 'lucide-react';

interface ClassOverviewProps {
  selectedClass?: CharacterClass | null;
  onSelectAndRoll: (cls: CharacterClass) => void;
}

export const ClassOverview: React.FC<ClassOverviewProps> = ({
  selectedClass,
  onSelectAndRoll,
}) => {
  const classes = Object.keys(CLASS_DEFINITIONS) as CharacterClass[];

  return (
    <section className="rounded-2xl bg-stone-950/90 border border-amber-900/40 p-6 shadow-2xl backdrop-blur relative">
      <div className="flex items-center justify-between border-b border-amber-900/30 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-cinzel font-bold text-amber-100">
              Fantasy Class Archetypes
            </h2>
            <p className="text-xs text-stone-400">
              Click any class to instantly forge a specialized hero
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
        {classes.map((cls) => {
          const def = CLASS_DEFINITIONS[cls];
          const isSelected = selectedClass === cls;

          return (
            <button
              key={cls}
              onClick={() => onSelectAndRoll(cls)}
              className={`text-left p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-stone-900 border-amber-500/70 ring-1 ring-amber-500/30 shadow-md'
                  : 'bg-stone-950/50 border-amber-900/30 hover:bg-stone-900/60 hover:border-amber-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${def.color.text}`}>
                  {def.name}
                </span>
                <Dices className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-300" />
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                {def.role}
              </div>
              <div className="text-[10px] text-stone-500 mt-1 uppercase font-semibold">
                Die: d{def.hitDie} · {def.primaryStat.slice(0, 3).toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
