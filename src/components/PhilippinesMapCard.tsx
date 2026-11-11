import React, { useState } from 'react';
import { ArrowRight, MapPin, Layers, Sparkles, Building, ChevronRight } from 'lucide-react';
import { PHILIPPINES_PROVINCES } from '../data/mockData';

export type ArchipelagoKey = 'Luzon' | 'Visayas' | 'Mindanao' | 'Palawan';

interface PhilippinesMapCardProps {
  onOpenFullMap: (archipelago?: ArchipelagoKey) => void;
  onSelectProvince: (provId: string) => void;
  onOpenSmartCity?: (cityOrArchipelago: string) => void;
}

export const PhilippinesMapCard: React.FC<PhilippinesMapCardProps> = ({
  onOpenFullMap,
  onSelectProvince,
  onOpenSmartCity
}) => {
  const [selectedArchipelago, setSelectedArchipelago] = useState<ArchipelagoKey>('Visayas');

  const archipelagoData: Record<
    ArchipelagoKey,
    {
      name: string;
      twinName: string;
      tagline: string;
      projectsCount: number;
      budget: string;
      defaultProvince: string;
      highlightColor: string;
      pinCoords: { x: number; y: number };
    }
  > = {
    Visayas: {
      name: 'Visayas Archipelago',
      twinName: 'Metro Cebu CCLEX Corridor',
      tagline: 'Maritime Logistics & IT Innovation Belt',
      projectsCount: 742,
      budget: '₱ 28.4 Billion',
      defaultProvince: 'cebu',
      highlightColor: '#1D4ED8',
      pinCoords: { x: 164, y: 220 }
    },
    Luzon: {
      name: 'Luzon Archipelago',
      twinName: 'Metro Manila & Clark Green Hub',
      tagline: 'National Financial Core & High-Speed Transit',
      projectsCount: 3420,
      budget: '₱ 612.5 Billion',
      defaultProvince: 'manila',
      highlightColor: '#2563EB',
      pinCoords: { x: 135, y: 85 }
    },
    Mindanao: {
      name: 'Mindanao Archipelago',
      twinName: 'Metro Davao Agro-Industrial Hub',
      tagline: 'Southern Renewable Energy & Fishery Logistics',
      projectsCount: 1890,
      budget: '₱ 148.2 Billion',
      defaultProvince: 'davao',
      highlightColor: '#059669',
      pinCoords: { x: 185, y: 285 }
    },
    Palawan: {
      name: 'Palawan Archipelago',
      twinName: 'Puerto Princesa Eco-Smart Biosphere',
      tagline: 'Marine Coral Sanctuary & Zero-Carbon Tourism',
      projectsCount: 320,
      budget: '₱ 18.6 Billion',
      defaultProvince: 'palawan',
      highlightColor: '#D97706',
      pinCoords: { x: 70, y: 215 }
    }
  };

  const current = archipelagoData[selectedArchipelago];

  const handleLaunch = () => {
    if (onOpenSmartCity) {
      if (selectedArchipelago === 'Visayas') onOpenSmartCity('Metro Cebu');
      else if (selectedArchipelago === 'Luzon') onOpenSmartCity('Metro Manila');
      else if (selectedArchipelago === 'Mindanao') onOpenSmartCity('Davao Hub');
      else onOpenSmartCity('Palawan Biosphere');
    } else {
      onOpenFullMap(selectedArchipelago);
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 p-5 md:p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 z-10">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-base sm:text-lg font-extrabold text-[#102A56] tracking-tight">
              Philippines Archipelago Map
            </h2>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              3D Twin
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Select an archipelago to inspect as a 3D Isometric Smart City
          </p>
        </div>

        <button
          onClick={() => onOpenFullMap(selectedArchipelago)}
          className="text-xs font-bold text-[#0757D9] hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
        >
          <span>View by Region</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Archipelago Selector Tabs */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-100/80 p-1 rounded-xl z-10 text-xs font-bold text-slate-700 mt-1">
        {(['Visayas', 'Luzon', 'Mindanao', 'Palawan'] as const).map((arch) => {
          const isSelected = selectedArchipelago === arch;
          return (
            <button
              key={arch}
              onClick={() => setSelectedArchipelago(arch)}
              className={`py-1.5 rounded-lg transition-all text-center truncate ${
                isSelected
                  ? 'bg-white text-[#0757D9] shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {arch}
            </button>
          );
        })}
      </div>

      {/* Interactive Archipelago Graphic Area */}
      <div
        onClick={handleLaunch}
        className="relative flex-1 min-h-[220px] sm:min-h-[240px] flex items-center justify-center cursor-pointer group my-2"
        title={`Click to launch ${current.name} 3D Isometric Smart City`}
      >
        {/* Subtle Philippine Island Silhouette Vector Map */}
        <svg
          viewBox="0 0 320 340"
          className="w-full h-full max-h-[250px] object-contain drop-shadow-sm select-none"
        >
          <defs>
            <linearGradient id="islandGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="islandGradMuted" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>

          {/* Luzon Major Mass */}
          <path
            d="M135 25 C145 30 160 50 155 70 C150 90 160 110 145 130 C130 145 110 135 115 115 C120 95 105 75 115 45 Z"
            fill={selectedArchipelago === 'Luzon' ? 'url(#islandGradActive)' : 'url(#islandGradMuted)'}
            opacity={selectedArchipelago === 'Luzon' ? 1 : 0.65}
            className="transition-all duration-300"
          />
          <path
            d="M125 15 C132 18 135 30 130 42 C125 38 122 25 125 15 Z"
            fill={selectedArchipelago === 'Luzon' ? '#1D4ED8' : '#93C5FD'}
          />
          <path
            d="M155 125 C170 135 185 155 175 170 C165 160 160 145 155 125 Z"
            fill={selectedArchipelago === 'Luzon' ? '#1D4ED8' : '#93C5FD'}
          />

          {/* Palawan Island */}
          <path
            d="M55 180 C70 195 95 240 85 255 C80 250 60 210 50 190 Z"
            fill={selectedArchipelago === 'Palawan' ? '#F59E0B' : '#93C5FD'}
            opacity={selectedArchipelago === 'Palawan' ? 1 : 0.65}
            className="transition-all duration-300"
          />

          {/* Visayas Major Islands */}
          <path
            d="M105 145 C115 150 120 165 110 175 C100 170 98 155 105 145 Z"
            fill={selectedArchipelago === 'Visayas' ? '#2563EB' : '#93C5FD'}
          />
          <path
            d="M135 185 C145 188 150 205 138 212 C130 205 132 192 135 185 Z"
            fill={selectedArchipelago === 'Visayas' ? '#2563EB' : '#93C5FD'}
          />
          <path
            d="M148 205 C155 210 158 238 150 245 C144 235 145 215 148 205 Z"
            fill={selectedArchipelago === 'Visayas' ? '#2563EB' : '#93C5FD'}
          />
          {/* Cebu Island Highlight */}
          <path
            d="M162 200 C166 205 168 235 163 245 C160 238 160 210 162 200 Z"
            fill={selectedArchipelago === 'Visayas' ? '#1D4ED8' : '#93C5FD'}
            stroke={selectedArchipelago === 'Visayas' ? '#F59E0B' : 'transparent'}
            strokeWidth="1.5"
            className={selectedArchipelago === 'Visayas' ? 'animate-pulse' : ''}
          />
          <path
            d="M172 225 C180 228 182 240 174 244 C168 240 169 230 172 225 Z"
            fill={selectedArchipelago === 'Visayas' ? '#2563EB' : '#93C5FD'}
          />
          <path
            d="M185 165 C198 175 195 200 188 215 C180 205 178 185 185 165 Z"
            fill={selectedArchipelago === 'Visayas' ? '#2563EB' : '#93C5FD'}
          />

          {/* Mindanao Island Complex */}
          <path
            d="M145 255 C165 248 205 250 220 270 C225 295 195 320 165 315 C145 310 135 285 145 255 Z"
            fill={selectedArchipelago === 'Mindanao' ? 'url(#islandGradActive)' : 'url(#islandGradMuted)'}
            opacity={selectedArchipelago === 'Mindanao' ? 1 : 0.65}
            className="transition-all duration-300"
          />
          <path
            d="M125 270 C140 272 145 285 130 295 C120 290 120 278 125 270 Z"
            fill={selectedArchipelago === 'Mindanao' ? '#2563EB' : '#93C5FD'}
          />
        </svg>

        {/* Dynamic Archipelago Beacon Callout Box */}
        <div
          style={{
            top: selectedArchipelago === 'Luzon' ? '25%' : selectedArchipelago === 'Mindanao' ? '70%' : selectedArchipelago === 'Palawan' ? '48%' : '40%',
            left: selectedArchipelago === 'Palawan' ? '8%' : 'auto',
            right: selectedArchipelago === 'Palawan' ? 'auto' : '10%'
          }}
          className="absolute z-20 flex items-start gap-1.5 transition-all duration-300"
        >
          {/* Pulsing Beacon */}
          <div className="relative mt-1">
            <span className="flex h-4 w-4 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-white shadow-md items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            </span>
          </div>

          {/* Callout Card */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-xl p-2.5 min-w-[140px] transform group-hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#102A56]">{current.name}</span>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1 py-0.2 rounded font-bold">
                Active 3D
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">
              {current.twinName}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-700">
              {current.projectsCount} Tracked Projects
            </div>
            <div className="text-[11px] font-black text-[#0757D9] tabular-nums">
              {current.budget}
            </div>
          </div>
        </div>

        {/* Floating Backdrop 3D City Tag */}
        <div className="absolute bottom-2 left-3 z-10 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-bold flex items-center gap-1.5 border border-white/20">
          <Building className="w-3 h-3 text-yellow-300" />
          <span>Click to view {current.name} 3D Twin</span>
        </div>
      </div>

      {/* Button to Launch 3D Smart City for Selected Archipelago */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>3D WebGL Digital Twin</span>
        </span>
        <button
          onClick={handleLaunch}
          className="text-xs font-bold text-white bg-[#0757D9] hover:bg-blue-700 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all shadow-sm hover:shadow"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Explore {selectedArchipelago} 3D City</span>
        </button>
      </div>
    </div>
  );
};
