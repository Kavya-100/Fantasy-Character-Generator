import React, { useRef, useState } from 'react';
import { CharacterClass, CharacterPortrait as PortraitData } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/fantasyData';
import {
  Sparkles,
  RefreshCw,
  Download,
  Palette,
  Image as ImageIcon,
} from 'lucide-react';

interface CharacterPortraitProps {
  characterClass: CharacterClass;
  characterName: string;
  portrait: PortraitData | null | undefined;
  isGenerating?: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
  onChangeStyle?: (style: 'videogame' | 'cartoon') => void;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterClass,
  characterName,
  portrait,
  isGenerating = false,
  onGenerate,
  onRegenerate,
  onChangeStyle,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const classDef = CLASS_DEFINITIONS[characterClass];

  const handleDownload = () => {
    if (!svgRef.current) return;
    const svgEl = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${characterName.toLowerCase().replace(/\s+/g, '_')}_${characterClass.toLowerCase()}_portrait.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    };
    img.src = url;
  };

  // Render class-specific cartoon or video game elements
  const renderClassVisuals = (p: PortraitData) => {
    const isCartoon = p.style === 'cartoon';
    const variant = p.headgearIndex % 3;
    const accVariant = p.accessoryIndex % 3;

    switch (characterClass) {
      case 'Warrior':
        return (
          <g>
            {/* Background Battle Aura */}
            <circle cx="200" cy="180" r="140" fill="url(#warriorAura)" opacity="0.65" />
            <path d="M120 70 L280 290 M280 70 L120 290" stroke="#f59e0b" strokeWidth="6" strokeDasharray="12 8" opacity="0.3" />

            {/* Armor Pauldrons */}
            <path d="M70 330 C90 280 140 270 200 280 C260 270 310 280 330 330 L360 400 L40 400 Z" fill="#334155" stroke="#1e293b" strokeWidth="4" />
            <path d="M90 285 C110 260 160 255 200 260 C240 255 290 260 310 285 L320 340 L80 340 Z" fill="#475569" />
            {/* Golden plate gorget */}
            <path d="M140 275 C170 305 230 305 260 275 L200 320 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" />

            {/* Head & Face */}
            <ellipse cx="200" cy="190" rx={isCartoon ? 68 : 62} ry={isCartoon ? 74 : 70} fill="#fbcfe8" />
            <path d="M140 190 C140 250 260 250 260 190" fill="#fbcfe8" />
            {/* Battle Scar */}
            <path d="M165 170 L180 205 M170 185 L176 190" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />

            {/* Eyes */}
            {isCartoon ? (
              <g>
                <ellipse cx="175" cy="185" rx="10" ry="14" fill="#0f172a" />
                <ellipse cx="225" cy="185" rx="10" ry="14" fill="#0f172a" />
                <circle cx="178" cy="180" r="4" fill="#ffffff" />
                <circle cx="228" cy="180" r="4" fill="#ffffff" />
              </g>
            ) : (
              <g>
                <path d="M162 180 Q176 174 188 182" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M212 182 Q224 174 238 180" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="176" cy="184" r="5" fill="#f59e0b" />
                <circle cx="224" cy="184" r="5" fill="#f59e0b" />
              </g>
            )}

            {/* Determined mouth */}
            <path d="M185 225 Q200 228 215 223" stroke="#991b1b" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Warrior Helm/Hair Variations */}
            {variant === 0 ? (
              // Crested Greathelm
              <g>
                <path d="M130 180 C125 110 160 80 200 80 C240 80 275 110 270 180 L260 195 L140 195 Z" fill="#64748b" stroke="#334155" strokeWidth="4" />
                {/* Golden Crest */}
                <path d="M192 40 Q200 75 200 90 Q208 75 208 40 Q200 25 192 40 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                {/* Visor Slit */}
                <path d="M150 165 L250 165 L245 175 L155 175 Z" fill="#0f172a" />
                <line x1="200" y1="165" x2="200" y2="195" stroke="#f59e0b" strokeWidth="3" />
              </g>
            ) : variant === 1 ? (
              // Horned Barbarian Barbute
              <g>
                <path d="M135 150 C130 90 270 90 265 150 L255 185 L145 185 Z" fill="#475569" stroke="#1e293b" strokeWidth="4" />
                {/* Horns */}
                <path d="M135 130 C100 110 85 70 95 50 C110 75 130 100 145 115" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
                <path d="M265 130 C300 110 315 70 305 50 C290 75 270 100 255 115" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
                <path d="M170 95 L200 70 L230 95 Z" fill="#f59e0b" />
              </g>
            ) : (
              // Braided Viking/Knight Hair with Steel Circlet
              <g>
                <path d="M130 160 C120 70 280 70 270 160 C260 100 140 100 130 160" fill="#b45309" />
                <path d="M125 160 L115 250 L135 240 L138 180" fill="#92400e" />
                <path d="M275 160 L285 250 L265 240 L262 180" fill="#92400e" />
                {/* Iron Circlet */}
                <rect x="135" y="140" width="130" height="14" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                <circle cx="200" cy="147" r="5" fill="#ef4444" />
              </g>
            )}

            {/* Ember Sparks */}
            <circle cx="100" cy="220" r="3" fill="#f59e0b" className="animate-ping" />
            <circle cx="290" cy="130" r="3" fill="#ef4444" className="animate-ping" />
          </g>
        );

      case 'Mage':
        return (
          <g>
            {/* Arcane Rune Ring */}
            <circle cx="200" cy="200" r="145" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeDasharray="16 10" opacity="0.6" />
            <circle cx="200" cy="200" r="125" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
            <circle cx="200" cy="190" r="130" fill="url(#mageAura)" opacity="0.5" />

            {/* Robe & Mantle */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#312e81" stroke="#1e1b4b" strokeWidth="4" />
            <path d="M120 280 C150 330 250 330 280 280 L290 390 L110 390 Z" fill="#4338ca" />
            {/* Glowing Rune Medallion */}
            <circle cx="200" cy="315" r="16" fill="#818cf8" stroke="#e0e7ff" strokeWidth="2" />
            <path d="M194 315 L206 315 M200 309 L200 321" stroke="#ffffff" strokeWidth="2.5" />

            {/* Head & Face */}
            <ellipse cx="200" cy="195" rx={isCartoon ? 65 : 60} ry={isCartoon ? 72 : 68} fill="#fed7aa" />

            {/* Glowing Arcane Eyes */}
            <ellipse cx="176" cy="190" rx="9" ry="12" fill="#38bdf8" />
            <ellipse cx="224" cy="190" rx="9" ry="12" fill="#38bdf8" />
            <circle cx="176" cy="190" r="4" fill="#ffffff" />
            <circle cx="224" cy="190" r="4" fill="#ffffff" />
            <path d="M165 178 Q176 172 188 178" stroke="#6366f1" strokeWidth="3" fill="none" />
            <path d="M212 178 Q224 172 235 178" stroke="#6366f1" strokeWidth="3" fill="none" />

            {/* Subtle Arcane Forehead Mark */}
            <circle cx="200" cy="165" r="4" fill="#a855f7" />

            {/* Mouth */}
            <path d="M188 230 Q200 234 212 230" stroke="#831843" strokeWidth="2.5" fill="none" />

            {/* Mage Headwear / Hair */}
            {variant === 0 ? (
              // Tall Archmage Wizard Hat
              <g>
                {/* Hair beneath */}
                <path d="M135 180 C120 230 130 260 140 270 M265 180 C280 230 270 260 260 270" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                {/* Hat Brim */}
                <ellipse cx="200" cy="145" rx="100" ry="24" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                {/* Hat Cone */}
                <path d="M135 140 Q175 60 230 30 Q225 80 265 140 Z" fill="#312e81" stroke="#4f46e5" strokeWidth="3" />
                {/* Gold Hatband */}
                <path d="M142 135 Q195 155 258 135" stroke="#fbbf24" strokeWidth="8" fill="none" />
                <polygon points="200,132 205,142 195,142" fill="#fbbf24" />
              </g>
            ) : variant === 1 ? (
              // Arcane Cowl & Shadow Veil
              <g>
                <path d="M130 190 C110 110 160 70 200 70 C240 70 290 110 270 190 C250 140 150 140 130 190 Z" fill="#4338ca" stroke="#6366f1" strokeWidth="3" />
                <path d="M125 180 L110 270 L150 250" fill="#312e81" />
                <path d="M275 180 L290 270 L250 250" fill="#312e81" />
                <circle cx="200" cy="100" r="8" fill="#a855f7" stroke="#e9d5ff" strokeWidth="2" />
              </g>
            ) : (
              // Floating Starlight Circlet & Mystic Long Silver Hair
              <g>
                <path d="M135 180 C120 100 280 100 265 180 C290 270 270 320 250 340 M135 180 C110 270 130 320 150 340" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="4" />
                <ellipse cx="200" cy="120" rx="60" ry="16" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="12 6" />
                <polygon points="200,105 207,118 193,118" fill="#38bdf8" />
              </g>
            )}

            {/* Floating Arcane Sparkles */}
            <circle cx="110" cy="130" r="4" fill="#c084fc" className="animate-pulse" />
            <circle cx="290" cy="150" r="4" fill="#38bdf8" className="animate-pulse" />
          </g>
        );

      case 'Rogue':
        return (
          <g>
            {/* Shadow Veil Mist */}
            <circle cx="200" cy="190" r="140" fill="url(#rogueAura)" opacity="0.6" />
            <path d="M80 180 Q140 240 200 160 Q260 240 320 180" stroke="#10b981" strokeWidth="2" strokeDasharray="8 6" opacity="0.4" />

            {/* Leather Jerkin & Cloak */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#064e3b" stroke="#022c22" strokeWidth="4" />
            <path d="M120 290 L200 370 L280 290" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            {/* Bandolier with throwing daggers */}
            <line x1="120" y1="290" x2="280" y2="380" stroke="#78350f" strokeWidth="12" />
            <rect x="180" y="320" width="8" height="24" rx="2" fill="#94a3b8" />
            <rect x="210" y="335" width="8" height="24" rx="2" fill="#94a3b8" />

            {/* Head & Mask */}
            <ellipse cx="200" cy="190" rx={isCartoon ? 65 : 60} ry={isCartoon ? 72 : 68} fill="#fde047" opacity="0.8" />
            
            {/* Deep Shadow Hood */}
            <path d="M120 180 C110 80 290 80 280 180 C290 270 270 290 250 290 L150 290 C130 290 110 270 120 180 Z" fill="#0f172a" stroke="#065f46" strokeWidth="4" />
            <path d="M140 180 C150 130 250 130 260 180 C250 220 150 220 140 180 Z" fill="#022c22" />

            {/* Piercing Emerald Eyes in Darkness */}
            <ellipse cx="174" cy="182" rx="9" ry="6" fill="#10b981" />
            <ellipse cx="226" cy="182" rx="9" ry="6" fill="#10b981" />
            <circle cx="174" cy="182" r="2.5" fill="#ecfdf5" />
            <circle cx="226" cy="182" r="2.5" fill="#ecfdf5" />

            {/* Rogue Stealth Face Mask */}
            <path d="M150 195 Q200 215 250 195 L245 250 Q200 265 155 250 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />

            {/* Dagger or smoke detail */}
            <circle cx="95" cy="190" r="3" fill="#34d399" className="animate-ping" />
            <circle cx="305" cy="210" r="3" fill="#34d399" className="animate-ping" />
          </g>
        );

      case 'Paladin':
        return (
          <g>
            {/* Solar Glory Halo */}
            <circle cx="200" cy="160" r="110" fill="url(#paladinAura)" opacity="0.6" />
            <polygon points="200,30 205,60 195,60" fill="#facc15" />
            <polygon points="290,120 260,125 260,115" fill="#facc15" />
            <polygon points="110,120 140,125 140,115" fill="#facc15" />

            {/* Polished Silver Armor */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="4" />
            <path d="M140 280 L200 370 L260 280 Z" fill="#e2e8f0" stroke="#ca8a04" strokeWidth="3" />
            <path d="M190 300 L210 300 M200 290 L200 330" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />

            {/* Head */}
            <ellipse cx="200" cy="190" rx="62" ry="70" fill="#fef08a" />
            
            {/* Golden Winged Helm */}
            <path d="M130 180 C120 100 280 100 270 180 L260 190 L140 190 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
            {/* Golden Wings */}
            <path d="M130 140 C100 120 80 80 90 50 C110 80 130 110 140 130" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
            <path d="M270 140 C300 120 320 80 310 50 C290 80 270 110 260 130" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
            
            {/* Noble eyes */}
            <ellipse cx="176" cy="185" rx="8" ry="10" fill="#0284c7" />
            <ellipse cx="224" cy="185" rx="8" ry="10" fill="#0284c7" />
            <circle cx="178" cy="182" r="3" fill="#ffffff" />
            <circle cx="226" cy="182" r="3" fill="#ffffff" />

            {/* Resolute Smile */}
            <path d="M188 225 Q200 232 212 225" stroke="#854d0e" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'Ranger':
        return (
          <g>
            {/* Green Wilderness Aura */}
            <circle cx="200" cy="190" r="135" fill="url(#rangerAura)" opacity="0.6" />
            <path d="M140 70 Q200 110 260 70" stroke="#22c55e" strokeWidth="3" fill="none" strokeDasharray="6 6" />

            {/* Forest Leather Jerkin */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#14532d" stroke="#052e16" strokeWidth="4" />
            <line x1="100" y1="290" x2="270" y2="390" stroke="#78350f" strokeWidth="8" />

            {/* Head & Forester Hood */}
            <ellipse cx="200" cy="190" rx="62" ry="70" fill="#fde68a" />
            <path d="M125 180 C110 90 290 90 275 180 L260 260 L140 260 Z" fill="#166534" stroke="#14532d" strokeWidth="4" />
            {/* Archer Feather */}
            <path d="M265 130 C295 100 310 70 320 40 C300 65 280 95 260 120" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />

            {/* Keen Hawk Eyes */}
            <ellipse cx="174" cy="182" rx="8" ry="11" fill="#15803d" />
            <ellipse cx="226" cy="182" rx="8" ry="11" fill="#15803d" />
            <circle cx="174" cy="180" r="3" fill="#ffffff" />
            <circle cx="226" cy="180" r="3" fill="#ffffff" />
            {/* Hunter Focus Markings */}
            <path d="M160 195 L170 205 M240 195 L230 205" stroke="#15803d" strokeWidth="2" />
          </g>
        );

      case 'Cleric':
        return (
          <g>
            {/* Sacred Sun Halo */}
            <circle cx="200" cy="160" r="120" fill="url(#clericAura)" opacity="0.65" />
            <circle cx="200" cy="160" r="95" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="10 8" />

            {/* High Priest Vestments over Mail */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#0c4a6e" stroke="#082f49" strokeWidth="4" />
            <path d="M150 280 L200 380 L250 280 Z" fill="#f8fafc" stroke="#38bdf8" strokeWidth="3" />
            <circle cx="200" cy="320" r="10" fill="#f59e0b" />

            {/* Face */}
            <ellipse cx="200" cy="190" rx="60" ry="68" fill="#fef3c7" />

            {/* Mitre / Circlet */}
            <path d="M135 150 C125 100 275 100 265 150 L250 170 L150 170 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
            <polygon points="200,90 215,130 185,130" fill="#f59e0b" />

            {/* Serene eyes */}
            <ellipse cx="176" cy="185" rx="8" ry="11" fill="#0284c7" />
            <ellipse cx="224" cy="185" rx="8" ry="11" fill="#0284c7" />
            <circle cx="176" cy="183" r="3" fill="#ffffff" />
            <circle cx="224" cy="183" r="3" fill="#ffffff" />
            <path d="M188 224 Q200 228 212 224" stroke="#0369a1" strokeWidth="2.5" fill="none" />
          </g>
        );

      case 'Bard':
        return (
          <g>
            {/* Musical Aura */}
            <circle cx="200" cy="190" r="130" fill="url(#bardAura)" opacity="0.6" />
            <text x="100" y="140" fill="#f43f5e" fontSize="24" fontFamily="sans-serif">♪</text>
            <text x="290" y="130" fill="#f43f5e" fontSize="28" fontFamily="sans-serif">♫</text>

            {/* Fancy Doublet */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#881337" stroke="#4c0519" strokeWidth="4" />
            <path d="M160 280 L200 320 L240 280 Z" fill="#fff1f2" />

            {/* Face */}
            <ellipse cx="200" cy="190" rx="60" ry="68" fill="#ffe4e6" />

            {/* Dashing Plumed Cap */}
            <path d="M130 160 C120 110 280 110 270 160 L280 180 L120 180 Z" fill="#be123c" stroke="#e11d48" strokeWidth="3" />
            {/* Extravagant Feather */}
            <path d="M260 140 C290 80 320 60 340 30 C310 60 280 100 250 135" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />

            {/* Charismatic Eyes & Wink */}
            <ellipse cx="176" cy="185" rx="8" ry="11" fill="#9f1239" />
            <circle cx="176" cy="183" r="3" fill="#ffffff" />
            <path d="M218 185 Q228 178 236 185" stroke="#9f1239" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Confident Grin */}
            <path d="M185 220 Q205 235 220 220" stroke="#be123c" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'Druid':
        return (
          <g>
            {/* Living Nature Aura */}
            <circle cx="200" cy="190" r="140" fill="url(#druidAura)" opacity="0.6" />

            {/* Living Bark Mantle */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#14532d" stroke="#052e16" strokeWidth="4" />
            <circle cx="200" cy="300" r="8" fill="#22c55e" />

            {/* Face */}
            <ellipse cx="200" cy="190" rx="62" ry="70" fill="#fef08a" />

            {/* Stag Antlers or Leaf Crown */}
            <path d="M140 140 C110 100 80 80 70 40 M90 70 C70 65 60 80 50 75" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
            <path d="M260 140 C290 100 320 80 330 40 M310 70 C330 65 340 80 350 75" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
            {/* Leaf circlet */}
            <ellipse cx="200" cy="150" rx="65" ry="16" fill="none" stroke="#22c55e" strokeWidth="6" strokeDasharray="14 8" />

            {/* Nature Eyes */}
            <ellipse cx="174" cy="185" rx="8" ry="11" fill="#15803d" />
            <ellipse cx="226" cy="185" rx="8" ry="11" fill="#15803d" />
            <circle cx="174" cy="183" r="3" fill="#ffffff" />
            <circle cx="226" cy="183" r="3" fill="#ffffff" />
          </g>
        );

      case 'Warlock':
        return (
          <g>
            {/* Eldritch Void Portal Aura */}
            <circle cx="200" cy="190" r="140" fill="url(#warlockAura)" opacity="0.65" />
            <path d="M100 100 Q200 180 120 280 M300 100 Q200 180 280 280" stroke="#a855f7" strokeWidth="3" strokeDasharray="8 6" opacity="0.4" />

            {/* Occult Robes */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#3b0764" stroke="#1e0538" strokeWidth="4" />
            <polygon points="200,285 210,310 190,310" fill="#a855f7" />

            {/* Face */}
            <ellipse cx="200" cy="190" rx="60" ry="68" fill="#e9d5ff" />

            {/* Curved Demon Horns */}
            <path d="M140 145 C115 110 110 60 135 30 C135 60 145 90 155 125" fill="#1e1b4b" stroke="#7e22ce" strokeWidth="3" />
            <path d="M260 145 C285 110 290 60 265 30 C265 60 255 90 245 125" fill="#1e1b4b" stroke="#7e22ce" strokeWidth="3" />

            {/* Void Eyes (Glowing Purple Sclera) */}
            <ellipse cx="174" cy="185" rx="9" ry="11" fill="#6b21a8" />
            <ellipse cx="226" cy="185" rx="9" ry="11" fill="#6b21a8" />
            <circle cx="174" cy="185" r="4" fill="#c084fc" />
            <circle cx="226" cy="185" r="4" fill="#c084fc" />

            {/* Knowing smirk */}
            <path d="M188 225 Q205 233 218 220" stroke="#581c87" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'Monk':
        return (
          <g>
            {/* Ki Energy Ripple Aura */}
            <circle cx="200" cy="190" r="140" fill="url(#monkAura)" opacity="0.6" />
            <circle cx="200" cy="190" r="110" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="12 10" />

            {/* Monk Training Wraps */}
            <path d="M70 330 C100 280 150 270 200 280 C250 270 300 280 330 330 L360 400 L40 400 Z" fill="#083344" stroke="#0e7490" strokeWidth="4" />
            <line x1="120" y1="280" x2="280" y2="390" stroke="#f59e0b" strokeWidth="8" />

            {/* Face */}
            <ellipse cx="200" cy="190" rx="62" ry="70" fill="#fed7aa" />

            {/* Shaved head with meditation dots */}
            <circle cx="190" cy="140" r="2.5" fill="#c2410c" />
            <circle cx="200" cy="140" r="2.5" fill="#c2410c" />
            <circle cx="210" cy="140" r="2.5" fill="#c2410c" />

            {/* Focused Martial Eyes */}
            <ellipse cx="175" cy="185" rx="8" ry="10" fill="#0284c7" />
            <ellipse cx="225" cy="185" rx="8" ry="10" fill="#0284c7" />
            <circle cx="175" cy="183" r="3" fill="#ffffff" />
            <circle cx="225" cy="183" r="3" fill="#ffffff" />

            {/* Zen Calm */}
            <path d="M190 225 L210 225" stroke="#9a3412" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <section className="rounded-2xl bg-stone-950/90 border border-amber-900/40 p-5 shadow-xl backdrop-blur relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-900/30 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/20">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-cinzel font-bold text-amber-100">
              Character Hero Portrait
            </h3>
            <span className="text-[11px] text-stone-400">
              Stylized art tailored for {characterClass}
            </span>
          </div>
        </div>

        {portrait && onChangeStyle && (
          <div className="flex items-center bg-stone-950 p-1 rounded-lg border border-amber-900/40">
            <button
              onClick={() => onChangeStyle('videogame')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                portrait.style === 'videogame'
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Video Game
            </button>
            <button
              onClick={() => onChangeStyle('cartoon')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                portrait.style === 'cartoon'
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Cartoon
            </button>
          </div>
        )}
      </div>

      {/* Portrait Canvas View */}
      <div className="relative aspect-square w-full max-w-[340px] mx-auto rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner flex items-center justify-center">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center animate-pulse">
            <div className="w-12 h-12 rounded-full border-3 border-amber-400/40 border-t-amber-400 animate-spin flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-xs font-semibold text-amber-300 font-cinzel">
              Forging {characterClass} Portrait...
            </div>
            <p className="text-[11px] text-slate-500">
              Applying battle heraldry, regalia & class aesthetics
            </p>
          </div>
        ) : portrait ? (
          <div className="relative w-full h-full group">
            <svg
              ref={svgRef}
              viewBox="0 0 400 400"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
              <defs>
                <radialGradient id="warriorAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="mageAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="rogueAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paladinAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="rangerAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#14532d" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="clericAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="bardAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fb7185" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#881337" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="druidAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#14532d" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="warlockAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="monkAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#164e63" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Backdrop */}
              <rect width="400" height="400" fill="#090d16" />

              {/* Class Visual Components */}
              {renderClassVisuals(portrait)}
            </svg>

            {/* Quick overlay pill with class style */}
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-[10px] font-semibold text-slate-300 backdrop-blur">
              {characterClass} · {portrait.style === 'videogame' ? 'Video Game RPG' : 'Cartoon Chibi'}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
              <Sparkles className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">
                No Portrait Generated Yet
              </div>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
                Generate a custom cartoon or video-game portrait matched to the {characterClass} class.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Two explicit requested buttons: "Generate Portrait" and "Regenerate Portrait" */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Portrait</span>
        </button>

        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-98 border border-slate-700 rounded-xl transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Regenerate Portrait</span>
        </button>
      </div>

      {/* Extra Action: Download Portrait PNG if portrait exists */}
      {portrait && (
        <div className="mt-2.5 flex items-center justify-end">
          <button
            onClick={handleDownload}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            title="Download portrait as PNG"
          >
            <Download className="w-3 h-3" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Download PNG'}</span>
          </button>
        </div>
      )}
    </section>
  );
};
