import React from 'react';
import { FantasyCharacter } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/fantasyData';
import { Users, Trash2, ArrowRight, Download, Copy, Check } from 'lucide-react';

interface PartyRosterProps {
  roster: FantasyCharacter[];
  activeCharacterId: string;
  onSelectCharacter: (char: FantasyCharacter) => void;
  onRemoveCharacter: (id: string) => void;
  onClearRoster: () => void;
}

export const PartyRoster: React.FC<PartyRosterProps> = ({
  roster,
  activeCharacterId,
  onSelectCharacter,
  onRemoveCharacter,
  onClearRoster,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyRoster = () => {
    if (roster.length === 0) return;
    const text = roster
      .map(
        (c, i) =>
          `${i + 1}. ${c.name} (${c.title}) - ${c.race} ${c.characterClass} | HP: ${c.hp} | AC: ${c.armorClass} | Weapon: ${c.equipment.weapon}`
      )
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    if (roster.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roster, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fantasy_party_roster_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="rounded-2xl bg-stone-950/90 border border-amber-900/40 p-6 shadow-2xl backdrop-blur relative">
      <div className="flex items-center justify-between border-b border-amber-900/30 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-cinzel font-bold text-amber-100">
              Adventuring Party Roster
            </h2>
            <p className="text-xs text-stone-400">
              {roster.length} {roster.length === 1 ? 'hero assembled' : 'heroes assembled'}
            </p>
          </div>
        </div>

        {roster.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyRoster}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-amber-900/40 rounded-lg transition-colors"
              title="Copy party summary to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-amber-900/40 rounded-lg transition-colors"
              title="Export party as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={onClearRoster}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors"
              title="Dismiss all party members"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {roster.length === 0 ? (
        <div className="py-8 text-center text-stone-500 text-sm">
          <p>No adventurers in your party yet.</p>
          <p className="text-xs text-stone-600 mt-1">
            Click "Save to Party" above to recruit your generated heroes into the roster.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {roster.map((char) => {
            const classDef = CLASS_DEFINITIONS[char.characterClass];
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className={`group flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? 'bg-stone-900/95 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-stone-950/60 border-amber-900/30 hover:bg-stone-900/50 hover:border-amber-800/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 text-xs font-bold ${classDef.color.badge}`}>
                    {char.portrait ? (
                      <span className="text-[10px] tracking-tighter uppercase font-mono">ART</span>
                    ) : (
                      char.characterClass.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white truncate">
                        {char.name}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span className={classDef.color.text}>{char.characterClass}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{char.race}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="tabular-nums font-mono text-slate-500">{char.hp} HP</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCharacter(char.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors opacity-80 group-hover:opacity-100"
                    title="Remove from party"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-slate-600 group-hover:text-slate-400 pl-1">
                    <ArrowRight className="w-4 h-4" />
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
