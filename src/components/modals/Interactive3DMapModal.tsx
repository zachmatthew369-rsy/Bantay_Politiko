import React, { useState } from 'react';
import {
  X,
  MapPin,
  Coins,
  FolderKanban,
  Users,
  Compass,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Eye,
  Camera,
  Play,
  Sun,
  Moon,
  Building,
  Navigation,
  Sparkles,
  SplitSquareVertical,
  Maximize2
} from 'lucide-react';
import { PHILIPPINES_PROVINCES } from '../../data/mockData';
import { ProvinceMapData } from '../../types';
import { IsometricCityCanvas, SelectedBuildingInfo } from '../smartcity/IsometricCityCanvas';
import { FloatingAnalyticsPanels } from '../smartcity/FloatingAnalyticsPanels';

export type ArchipelagoType = 'Visayas' | 'Luzon' | 'Mindanao' | 'Palawan';

interface Interactive3DMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectFromProvince?: (projectName: string) => void;
  onAskAIAboutProvince?: (provinceName: string) => void;
  initialArchipelago?: ArchipelagoType;
}

export const Interactive3DMapModal: React.FC<Interactive3DMapModalProps> = ({
  isOpen,
  onClose,
  onSelectProjectFromProvince,
  onAskAIAboutProvince,
  initialArchipelago = 'Visayas'
}) => {
  // Mode selection: 'smart_city' (3D Isometric WebGL Smart City) vs 'archipelago' (Territorial Province Map)
  const [viewMode, setViewMode] = useState<'smart_city' | 'archipelago'>('smart_city');

  // Archipelago Selector State
  const [selectedArchipelago, setSelectedArchipelago] = useState<ArchipelagoType>(initialArchipelago);

  // Smart City state
  const [selectedCity, setSelectedCity] = useState<string>('Metro Cebu');
  const [activeLayer, setActiveLayer] = useState<'all' | 'traffic' | 'energy' | 'air' | 'budget'>('all');
  const [selectedBuilding, setSelectedBuilding] = useState<SelectedBuildingInfo | null>(null);
  const [isCinematic, setIsCinematic] = useState<boolean>(false);
  const [nightMode, setNightMode] = useState<boolean>(false);

  // Archipelago Map state
  const [selectedProvince, setSelectedProvince] = useState<ProvinceMapData>(
    PHILIPPINES_PROVINCES[0] // Cebu
  );
  const [islandFilter, setIslandFilter] = useState<'All' | 'Luzon' | 'Visayas' | 'Mindanao'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmbedded3DInArchipelago, setShowEmbedded3DInArchipelago] = useState<boolean>(true);

  if (!isOpen) return null;

  // Handle Archipelago Change
  const handleArchipelagoChange = (arch: ArchipelagoType) => {
    setSelectedArchipelago(arch);
    if (arch === 'Visayas') {
      setSelectedCity('Metro Cebu');
      setSelectedProvince(PHILIPPINES_PROVINCES.find((p) => p.id === 'cebu') || PHILIPPINES_PROVINCES[0]);
    } else if (arch === 'Luzon') {
      setSelectedCity('Metro Manila');
      setSelectedProvince(PHILIPPINES_PROVINCES.find((p) => p.id === 'manila') || PHILIPPINES_PROVINCES[1]);
    } else if (arch === 'Mindanao') {
      setSelectedCity('Davao Hub');
      setSelectedProvince(PHILIPPINES_PROVINCES.find((p) => p.id === 'davao') || PHILIPPINES_PROVINCES[2]);
    } else {
      setSelectedCity('Palawan Biosphere');
      setSelectedProvince(PHILIPPINES_PROVINCES.find((p) => p.id === 'palawan') || PHILIPPINES_PROVINCES[3]);
    }
  };

  const filteredProvinces = PHILIPPINES_PROVINCES.filter((p) => {
    const matchesIsland = islandFilter === 'All' || p.islandGroup === islandFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIsland && matchesSearch;
  });

  const cityOptionsByArchipelago: Record<ArchipelagoType, string[]> = {
    Visayas: ['Metro Cebu', 'Metro Iloilo', 'Bacolod Hub'],
    Luzon: ['Metro Manila', 'Clark Smart City', 'Baguio Eco-Hub'],
    Mindanao: ['Davao Hub', 'Cagayan de Oro Gateway'],
    Palawan: ['Palawan Biosphere', 'El Nido Sanctuary']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-7xl h-[94vh] flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between bg-gradient-to-r from-blue-950 via-[#063A91] to-[#0757D9] text-white gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              <Compass className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  Philippine Archipelago 3D Smart Cities Digital Twin
                </h2>
                <span className="bg-yellow-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Real WebGL 3D
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium hidden sm:block">
                Select any archipelago to inspect its real-time 3D Isometric smart city digital twin
              </p>
            </div>
          </div>

          {/* Primary View Switcher: Smart City 3D vs Archipelago Province Map */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/10 text-xs font-bold">
              <button
                onClick={() => setViewMode('smart_city')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'smart_city'
                    ? 'bg-white text-blue-900 shadow-md font-black'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>3D Isometric Smart City</span>
              </button>

              <button
                onClick={() => setViewMode('archipelago')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'archipelago'
                    ? 'bg-white text-blue-900 shadow-md font-black'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Archipelago Province Map</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close 3D map modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Archipelago Selection Bar */}
        <div className="px-5 py-2.5 bg-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs z-30">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Select Archipelago:</span>
            </span>
            <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
              {(['Visayas', 'Luzon', 'Mindanao', 'Palawan'] as const).map((arch) => {
                const isActive = selectedArchipelago === arch;
                return (
                  <button
                    key={arch}
                    onClick={() => handleArchipelagoChange(arch)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#0757D9] text-white shadow-xs font-black'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    <span>{arch === 'Visayas' ? '🏝️ Visayas' : arch === 'Luzon' ? '🏙️ Luzon' : arch === 'Mindanao' ? '⚡ Mindanao' : '🌿 Palawan'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Metro / District Selector inside Archipelago */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Metro Hub:</span>
            <div className="flex items-center gap-1">
              {cityOptionsByArchipelago[selectedArchipelago].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedCity === city
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* VIEW MODE 1: 3D ISOMETRIC PHILIPPINE SMART CITIES       */}
        {/* ======================================================= */}
        {viewMode === 'smart_city' && (
          <div className="flex-1 flex flex-col min-h-0 relative bg-slate-900">
            {/* Smart City Floating Controls Toolbar */}
            <div className="px-5 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
              {/* Analytics Layer Toggles */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-500 mr-1">Telemetry Layers:</span>
                {(
                  [
                    { id: 'all', label: 'All Layers' },
                    { id: 'traffic', label: 'Traffic Grid' },
                    { id: 'energy', label: 'Energy Grid' },
                    { id: 'air', label: 'Air Quality (AQI)' },
                    { id: 'budget', label: 'DPWH Civic Budget' }
                  ] as const
                ).map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      activeLayer === layer.id
                        ? 'bg-blue-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Cinematic Flythrough & Day/Night Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCinematic(true)}
                  disabled={isCinematic}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isCinematic ? 'Flythrough Playing...' : 'Cinematic Flythrough'}</span>
                </button>

                <button
                  onClick={() => setNightMode(!nightMode)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Toggle Day/Cyber-Twilight Mode"
                >
                  {nightMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-600" />}
                </button>
              </div>
            </div>

            {/* Real Three.js WebGL 3D Isometric Canvas Viewport */}
            <div className="flex-1 relative min-h-0 overflow-hidden">
              <IsometricCityCanvas
                activeLayer={activeLayer}
                selectedCity={selectedCity}
                onBuildingSelect={(b) => setSelectedBuilding(b)}
                isCinematic={isCinematic}
                onCinematicEnd={() => setIsCinematic(false)}
                nightMode={nightMode}
              />

              {/* Floating Glassmorphism Analytics Dashboards & Deep-Dive Drawers */}
              <FloatingAnalyticsPanels
                activeLayer={activeLayer}
                selectedBuilding={selectedBuilding}
                onCloseBuilding={() => setSelectedBuilding(null)}
                selectedCity={selectedCity}
              />

              {/* Bottom Instructions Badge */}
              <div className="absolute bottom-3 right-4 z-20 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-md text-[11px] font-bold text-slate-700 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>Showing {selectedArchipelago} · {selectedCity} 3D Digital Twin</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* VIEW MODE 2: ARCHIPELAGO PROVINCES TERRITORIAL MAP      */}
        {/* WITH INTEGRATED 3D ISOMETRIC SMART CITY DIGITAL TWIN   */}
        {/* ======================================================= */}
        {viewMode === 'archipelago' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Toolbar */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Filter Island:</span>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  {(['All', 'Luzon', 'Visayas', 'Mindanao'] as const).map((island) => (
                    <button
                      key={island}
                      onClick={() => setIslandFilter(island)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        islandFilter === island
                          ? 'bg-[#0757D9] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {island}
                    </button>
                  ))}
                </div>
              </div>

              {/* Embedded 3D Smart City Viewport Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEmbedded3DInArchipelago(!showEmbedded3DInArchipelago)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    showEmbedded3DInArchipelago
                      ? 'bg-blue-50 text-[#0757D9] border-blue-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                  <span>{showEmbedded3DInArchipelago ? '3D Twin Split-View Active' : 'Show 3D Twin Split-View'}</span>
                </button>

                <div className="flex items-center bg-white rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 w-56 shadow-2xs">
                  <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search province..."
                    className="bg-transparent border-none outline-none w-full text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Split Archipelago Canvas & Details */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
              {/* Left Column: Archipelago Interactive Vector Map */}
              <div className={`${showEmbedded3DInArchipelago ? 'lg:col-span-4' : 'lg:col-span-7'} bg-gradient-to-b from-[#EBF4FF] to-[#DCEBFF] p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300`}>
                <div className="relative w-full max-w-[360px] h-[340px] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl select-none">
                    <ellipse cx="50" cy="52" rx="42" ry="46" fill="#bfdbfe" opacity="0.3" />

                    <path
                      d="M 35 15 L 45 14 L 48 24 L 54 28 L 50 42 L 36 38 L 32 25 Z"
                      fill={selectedProvince.islandGroup === 'Luzon' ? '#1D4ED8' : '#3B82F6'}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                      className="cursor-pointer transition-colors"
                      onClick={() => handleArchipelagoChange('Luzon')}
                    />
                    <path
                      d="M 18 52 L 25 58 L 20 70 L 15 64 Z"
                      fill={selectedProvince.id === 'palawan' ? '#F59E0B' : '#60A5FA'}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                      className="cursor-pointer transition-colors"
                      onClick={() => handleArchipelagoChange('Palawan')}
                    />
                    <path
                      d="M 45 48 L 56 46 L 58 56 L 44 58 Z"
                      fill={selectedProvince.islandGroup === 'Visayas' ? '#1D4ED8' : '#3B82F6'}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                      className="cursor-pointer transition-colors"
                      onClick={() => handleArchipelagoChange('Visayas')}
                    />
                    <path
                      d="M 52 68 L 74 65 L 75 88 L 56 92 L 46 80 Z"
                      fill={selectedProvince.islandGroup === 'Mindanao' ? '#1D4ED8' : '#3B82F6'}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                      className="cursor-pointer transition-colors"
                      onClick={() => handleArchipelagoChange('Mindanao')}
                    />

                    {filteredProvinces.map((prov) => {
                      const isSelected = selectedProvince.id === prov.id;
                      return (
                        <g
                          key={prov.id}
                          onClick={() => {
                            setSelectedProvince(prov);
                            if (prov.islandGroup === 'Visayas') setSelectedArchipelago('Visayas');
                            else if (prov.islandGroup === 'Luzon') setSelectedArchipelago('Luzon');
                            else if (prov.islandGroup === 'Mindanao') setSelectedArchipelago('Mindanao');
                            if (prov.id === 'palawan') setSelectedArchipelago('Palawan');

                            if (prov.name.includes('Cebu')) setSelectedCity('Metro Cebu');
                            else if (prov.name.includes('Manila')) setSelectedCity('Metro Manila');
                            else if (prov.name.includes('Davao')) setSelectedCity('Davao Hub');
                            else if (prov.name.includes('Palawan')) setSelectedCity('Palawan Biosphere');
                          }}
                          className="cursor-pointer group"
                        >
                          {isSelected && (
                            <circle
                              cx={prov.coords.x}
                              cy={prov.coords.y}
                              r="4"
                              fill="#EF4444"
                              opacity="0.5"
                              className="animate-ping"
                            />
                          )}
                          <circle
                            cx={prov.coords.x}
                            cy={prov.coords.y}
                            r={isSelected ? 3.2 : 2.2}
                            fill={isSelected ? '#DC2626' : '#F59E0B'}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            className="transition-transform group-hover:scale-125"
                          />
                          <text
                            x={prov.coords.x}
                            y={prov.coords.y - 4}
                            textAnchor="middle"
                            fontSize="3.2"
                            fontWeight="bold"
                            fill="#0F172A"
                            className={`pointer-events-none select-none transition-opacity ${
                              isSelected ? 'opacity-100 font-black' : 'opacity-70 group-hover:opacity-100'
                            }`}
                          >
                            {prov.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-2 text-[11px] text-blue-900/80 font-bold bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-blue-200">
                  <span>Selected: {selectedProvince.name} · Click pin to load 3D Twin</span>
                </div>
              </div>

              {/* Center / Right Column: Live 3D Isometric Smart City Twin Viewport */}
              {showEmbedded3DInArchipelago && (
                <div className="lg:col-span-5 bg-slate-900 relative min-h-[300px] border-l border-slate-700 overflow-hidden flex flex-col">
                  {/* Embedded Canvas Header */}
                  <div className="absolute top-3 left-3 z-20 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-white text-xs font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>3D Isometric Twin: {selectedCity}</span>
                  </div>

                  <button
                    onClick={() => setViewMode('smart_city')}
                    className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white text-blue-900 px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 shadow-md transition-all"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Full 3D Mode</span>
                  </button>

                  <div className="flex-1 w-full h-full relative">
                    <IsometricCityCanvas
                      activeLayer={activeLayer}
                      selectedCity={selectedCity}
                      onBuildingSelect={(b) => setSelectedBuilding(b)}
                      isCinematic={false}
                      onCinematicEnd={() => {}}
                      nightMode={nightMode}
                    />
                  </div>
                </div>
              )}

              {/* Right Column: Province Detail & AI Inquiries Panel */}
              <div className={`${showEmbedded3DInArchipelago ? 'lg:col-span-3' : 'lg:col-span-5'} p-5 overflow-y-auto space-y-4 bg-white border-l border-slate-200`}>
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {selectedProvince.islandGroup} · {selectedProvince.region}
                  </span>
                  <h3 className="text-2xl font-black text-[#102A56] mt-1 tracking-tight">
                    {selectedProvince.name}
                  </h3>
                  <span className="text-xl font-black text-[#0757D9] tabular-nums block mt-1">
                    {selectedProvince.budgetTotal} Budget
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">Projects</span>
                    <span className="text-base font-extrabold text-[#102A56] tabular-nums">
                      {selectedProvince.projectsCount}
                    </span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <span className="text-[10px] text-emerald-600 font-bold block">Completed</span>
                    <span className="text-base font-extrabold text-emerald-700 tabular-nums">
                      {selectedProvince.statusBreakdown.completed}
                    </span>
                  </div>
                  <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl">
                    <span className="text-[10px] text-rose-600 font-bold block">Delayed</span>
                    <span className="text-base font-extrabold text-rose-700 tabular-nums">
                      {selectedProvince.statusBreakdown.delayed}
                    </span>
                  </div>
                </div>

                {/* Switch to Full 3D Smart City Button */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      if (selectedProvince.name.includes('Cebu')) setSelectedCity('Metro Cebu');
                      else if (selectedProvince.name.includes('Manila')) setSelectedCity('Metro Manila');
                      else if (selectedProvince.name.includes('Davao')) setSelectedCity('Davao Hub');
                      else if (selectedProvince.name.includes('Palawan')) setSelectedCity('Palawan Biosphere');
                      else setSelectedCity('Clark Smart City');
                      setViewMode('smart_city');
                    }}
                    className="w-full py-2.5 bg-[#0757D9] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    <span>Open {selectedProvince.name} Full 3D Twin</span>
                  </button>

                  {/* Ask AI Button */}
                  {onAskAIAboutProvince && (
                    <button
                      onClick={() => onAskAIAboutProvince(selectedProvince.name)}
                      className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Ask BantayAI about {selectedProvince.name}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
