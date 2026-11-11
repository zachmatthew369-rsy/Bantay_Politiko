import React, { useState } from 'react';
import { Search, MapPin, Calendar, Briefcase, FileCheck, Shield, ChevronRight } from 'lucide-react';
import { Politician } from '../../types';
import { FEATURED_POLITICIAN, OTHER_POLITICIANS } from '../../data/mockData';

interface PoliticiansViewProps {
  onSelectPolitician: (pol: Politician) => void;
  onViewFullProfile: (pol: Politician) => void;
  onOpenTimeline: () => void;
}

export const PoliticiansView: React.FC<PoliticiansViewProps> = ({
  onSelectPolitician,
  onViewFullProfile,
  onOpenTimeline
}) => {
  const allPoliticians = [FEATURED_POLITICIAN, ...OTHER_POLITICIANS];
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = allPoliticians.filter((p) => {
    const matchesRegion = filterRegion === 'All' || p.region.includes(filterRegion);
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.position.toLowerCase().includes(search.toLowerCase()) ||
      p.jurisdiction.toLowerCase().includes(search.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Directory Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#102A56] tracking-tight">
            Philippine Politician & Public Servant Directory
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Examine declared assets (SALN), public office assignments, and evidence-verified records.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-full border border-slate-200 px-3.5 py-2 text-xs text-slate-700 w-64">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by official name or office..."
              className="bg-transparent border-none outline-none w-full text-xs"
            />
          </div>
        </div>
      </div>

      {/* Grid of Politicians */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pol) => {
          const corruptPct = pol.sentiment.corruptVotes
            ? Math.round((pol.sentiment.corruptVotes / pol.sentiment.totalResponses) * 100)
            : 50;

          return (
            <div
              key={pol.id}
              onClick={() => onViewFullProfile(pol)}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={pol.avatarUrl}
                    alt={pol.name}
                    className="w-20 h-24 rounded-2xl object-cover object-top border-2 border-slate-100 shadow-2xs group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-[#102A56] truncate">
                        {pol.name}
                      </h3>
                      {pol.isVerified && (
                        <span className="text-[#0757D9] shrink-0 text-sm font-bold">✓</span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-slate-600 mt-0.5">{pol.position}</p>

                    <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{pol.jurisdiction}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Term: {pol.currentTerm}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">Declared SALN</span>
                    <span className="font-extrabold text-[#102A56] tabular-nums">
                      {pol.salnNetWorth}
                    </span>
                  </div>
                  <div className="p-2.5 bg-blue-50 rounded-xl">
                    <span className="text-[10px] text-blue-600 font-bold block">Supervised Projects</span>
                    <span className="font-extrabold text-blue-800 tabular-nums">
                      {pol.totalProjects} Projects
                    </span>
                  </div>
                </div>

                {/* Sentiment vs Facts Mini Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-red-600">{corruptPct}% Corrupt</span>
                    <span className="text-emerald-600">{100 - corruptPct}% Not Corrupt</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div style={{ width: `${corruptPct}%` }} className="bg-red-500 h-full" />
                    <div style={{ width: `${100 - corruptPct}%` }} className="bg-emerald-500 h-full" />
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0757D9]">
                <span>View Full Civic Dossier</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
