import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Users,
  MapPin,
  Briefcase,
  ChevronRight,
  X,
  Filter,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { Politician } from '../types';
import { FEATURED_POLITICIAN, OTHER_POLITICIANS } from '../data/mockData';

interface PoliticianSearchBarProps {
  onSelectPolitician: (politician: Politician) => void;
  onViewFullProfile: (politician: Politician) => void;
}

export const PoliticianSearchBar: React.FC<PoliticianSearchBarProps> = ({
  onSelectPolitician,
  onViewFullProfile
}) => {
  const allPoliticians: Politician[] = [FEATURED_POLITICIAN, ...OTHER_POLITICIANS];

  const [query, setQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = allPoliticians.filter((pol) => {
    const matchesQuery =
      pol.name.toLowerCase().includes(query.toLowerCase()) ||
      pol.position.toLowerCase().includes(query.toLowerCase()) ||
      pol.jurisdiction.toLowerCase().includes(query.toLowerCase()) ||
      pol.region.toLowerCase().includes(query.toLowerCase()) ||
      (pol.politicalAffiliation && pol.politicalAffiliation.toLowerCase().includes(query.toLowerCase()));

    const matchesPosition =
      selectedPosition === 'All' ||
      pol.position.toLowerCase().includes(selectedPosition.toLowerCase());

    const matchesRegion =
      selectedRegion === 'All' ||
      pol.region.toLowerCase().includes(selectedRegion.toLowerCase()) ||
      pol.jurisdiction.toLowerCase().includes(selectedRegion.toLowerCase());

    return matchesQuery && matchesPosition && matchesRegion;
  });

  const trendingPoliticians = [
    { id: 'gov-juan-dela-cruz', label: 'Hon. Juan Dela Cruz (Cebu)' },
    { id: 'sen-maria-santos', label: 'Sen. Maria Clara Santos' },
    { id: 'may-roberto-tan', label: 'Mayor Roberto Tan (Davao)' },
    { id: 'may-benjamin-magalong', label: 'Mayor Benjamin Magalong (Baguio)' }
  ];

  const handlePickTrending = (id: string) => {
    const found = allPoliticians.find((p) => p.id === id);
    if (found) {
      onViewFullProfile(found);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-2 relative z-30" ref={containerRef}>
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-lg shadow-blue-900/5 p-4 sm:p-5 transition-all">
        {/* Main Search Bar Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Input with Search Icon */}
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-[#0757D9] focus-within:bg-white transition-all">
            <Search className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search any politician, governor, senator, mayor, or public servant to monitor..."
              className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/60"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter: Position */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-50 border border-slate-200/90 rounded-2xl px-3 py-2 text-xs">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-700 font-semibold text-xs cursor-pointer"
              >
                <option value="All">All Positions</option>
                <option value="Governor">Governor</option>
                <option value="Senator">Senator</option>
                <option value="Mayor">Mayor</option>
              </select>
            </div>

            {/* Quick Filter: Region */}
            <div className="flex items-center bg-slate-50 border border-slate-200/90 rounded-2xl px-3 py-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-700 font-semibold text-xs cursor-pointer"
              >
                <option value="All">All Regions</option>
                <option value="Cebu">Central Visayas (Cebu)</option>
                <option value="National">National (Senate)</option>
                <option value="Davao">Davao Region</option>
                <option value="CAR">Cordillera (Baguio)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trending & Quick Search Suggestions Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-blue-600" />
            <span>Popular:</span>
          </span>
          {trendingPoliticians.map((t) => (
            <button
              key={t.id}
              onClick={() => handlePickTrending(t.id)}
              className="px-2.5 py-1 rounded-full bg-blue-50/70 hover:bg-blue-100/80 text-blue-800 text-[11px] font-semibold transition-colors flex items-center gap-1 border border-blue-100"
            >
              <span>{t.label}</span>
              <ChevronRight className="w-3 h-3 text-blue-500 opacity-60" />
            </button>
          ))}
        </div>

        {/* Live Search Results Dropdown */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 max-h-96 overflow-y-auto divide-y divide-slate-100 animate-fadeIn">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Matching Public Servants ({filtered.length})</span>
              <span className="text-[10px] text-blue-600 font-semibold">Click to view full profile & projects</span>
            </div>

            {filtered.length > 0 ? (
              filtered.map((pol) => {
                const corruptPercent = pol.sentiment.corruptVotes
                  ? Math.round((pol.sentiment.corruptVotes / pol.sentiment.totalResponses) * 100)
                  : 54;
                const notCorruptPercent = 100 - corruptPercent;

                return (
                  <div
                    key={pol.id}
                    onMouseDown={() => {
                      onViewFullProfile(pol);
                      setIsFocused(false);
                    }}
                    className="p-3 hover:bg-blue-50/60 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    {/* Politician Photo & Details */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 shadow-2xs group-hover:scale-105 transition-transform">
                        <img
                          src={pol.avatarUrl}
                          alt={pol.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-extrabold text-[#102A56] group-hover:text-[#0757D9] transition-colors truncate">
                            {pol.name}
                          </h4>
                          {pol.isVerified && (
                            <span className="text-blue-600 shrink-0 text-xs font-bold">✓</span>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-slate-600 truncate">
                          {pol.position}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {pol.jurisdiction}
                          </span>
                          <span>·</span>
                          <span>Term: {pol.currentTerm}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats: Projects & Sentiment */}
                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <div className="hidden sm:block">
                        <span className="text-[10px] text-slate-400 block font-medium">Projects Monitored</span>
                        <span className="text-xs font-bold text-[#102A56]">{pol.totalProjects} Projects</span>
                      </div>

                      <div className="hidden sm:block">
                        <span className="text-[10px] text-slate-400 block font-medium">Declared SALN</span>
                        <span className="text-xs font-bold text-blue-700 tabular-nums">{pol.salnNetWorth}</span>
                      </div>

                      <div className="bg-slate-50 group-hover:bg-white p-2 rounded-xl border border-slate-200/80 text-center">
                        <span className="text-[10px] font-bold text-slate-500 block">Approval</span>
                        <span className="text-xs font-black text-emerald-600 tabular-nums">
                          {notCorruptPercent}%
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPolitician(pol);
                          setIsFocused(false);
                        }}
                        className="p-2 rounded-xl bg-[#0757D9] text-white hover:bg-blue-700 transition-colors shadow-2xs"
                        title="Set as Monitored Official on Homepage"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">
                No politicians found matching "{query}". Try checking the spelling or selecting "All Positions".
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
