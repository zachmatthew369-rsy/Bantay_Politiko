import React, { useState, useEffect } from 'react';
import { Users, FolderKanban, Coins, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { NATIONAL_STATS } from '../data/mockData';

interface StatsBarProps {
  onStatClick?: (statKey: string) => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({ onStatClick }) => {
  // Animated counting simulation for polished civic tech feel
  const [counts, setCounts] = useState({
    politicians: 1100,
    projects: 8200
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounts({
        politicians: NATIONAL_STATS.politiciansTracked.value,
        projects: NATIONAL_STATS.projectsMonitored.value
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      id: 'politicians',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600',
      label: 'Total Politicians Tracked',
      value: counts.politicians.toLocaleString(),
      growth: '↑ 12%',
      tooltip: 'Elected national and local officials actively monitored with public SALN and project records.'
    },
    {
      id: 'projects',
      icon: FolderKanban,
      iconBg: 'bg-blue-50 text-blue-600',
      label: 'Total Projects Monitored',
      value: counts.projects.toLocaleString(),
      growth: '↑ 18%',
      tooltip: 'Public infrastructure and social programs across DPWH, DOH, DepEd, and Local Government Units.'
    },
    {
      id: 'budget',
      icon: Coins,
      iconBg: 'bg-blue-50 text-blue-600',
      label: 'Total Budget Tracked',
      value: NATIONAL_STATS.budgetTracked.value,
      growth: '↑ 15%',
      tooltip: 'Combined Philippine appropriations, obligations, and disbursements documented on platform.'
    },
    {
      id: 'votes',
      icon: ShieldCheck,
      iconBg: 'bg-blue-50 text-blue-600',
      label: 'Total Citizen Votes',
      value: NATIONAL_STATS.citizenVotes.value,
      growth: '↑ 32%',
      tooltip: 'Verified citizen sentiment responses submitted with anti-brigading integrity checks.'
    }
  ];

  return (
    <div className="relative -mt-8 sm:-mt-10 md:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 transition-all duration-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                onClick={() => onStatClick?.(stat.id)}
                className={`flex items-center gap-4 pt-3 sm:pt-0 ${
                  index !== 0 ? 'sm:pl-6' : ''
                } cursor-pointer group hover:bg-slate-50/60 p-2 rounded-xl transition-colors`}
                title={stat.tooltip}
              >
                {/* Round Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-blue-100/70 text-[#0757D9] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Metric Content */}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-500 font-medium truncate">
                    {stat.label}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl sm:text-2xl font-black text-[#102A56] tracking-tight tabular-nums">
                      {stat.value}
                    </span>
                    <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      {stat.growth}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
