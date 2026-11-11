import React, { useState } from 'react';
import { Search, MapPin, Building2, Calendar, Filter, ArrowRight } from 'lucide-react';
import { GovernmentProject, SectorType, ProjectStatus } from '../../types';
import { LATEST_PROJECTS } from '../../data/mockData';

interface ProjectsViewProps {
  onSelectProject: (project: GovernmentProject) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject }) => {
  const [sectorFilter, setSectorFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = LATEST_PROJECTS.filter((proj) => {
    const matchesSector = sectorFilter === 'All' || proj.sector === sectorFilter;
    const matchesStatus = statusFilter === 'All' || proj.status === statusFilter;
    const matchesSearch =
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.location.toLowerCase().includes(search.toLowerCase()) ||
      proj.implementingAgency.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Directory Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#102A56] tracking-tight">
            Government Infrastructure & Program Directory
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track physical progress vs documented financial accomplishments under DPWH, DOH, DepEd, and LGUs.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center bg-slate-100 rounded-full border border-slate-200 px-3.5 py-2 text-xs text-slate-700 w-72">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search project by title or location..."
            className="bg-transparent border-none outline-none w-full text-xs"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
        {/* Sector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-400 mr-1">Sector:</span>
          {(['All', 'Infrastructure', 'Health', 'Education', 'Agriculture'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                sectorFilter === sec
                  ? 'bg-[#0757D9] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-400 mr-1">Status:</span>
          {(['All', 'In Progress', 'Ongoing', 'Pending', 'Delayed'] as const).map((stat) => (
            <button
              key={stat}
              onClick={() => setStatusFilter(stat)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                statusFilter === stat
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {stat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onSelectProject(proj)}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer group"
          >
            {/* Top Thumbnail with Status Banner */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={proj.thumbnailUrl}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{proj.location}</span>
              </div>
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
                {proj.status}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#102A56] group-hover:text-[#0757D9] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Financial and Progress Details */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Approved Budget</span>
                    <span className="font-extrabold text-[#102A56] tabular-nums text-sm">
                      ₱ {proj.budget.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Allocated / Released</span>
                    <span className="font-bold text-slate-700 tabular-nums text-sm">
                      ₱ {proj.allocatedAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Physical Progress</span>
                    <span className="text-[#0757D9]">{proj.completionPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${proj.completionPercentage}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-[#0757D9] rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0757D9]">
                <span>Compare Dated Inspection Photos & Contract →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
