import React, { useState } from 'react';
import { CheckCircle2, Cog, Clock, AlertOctagon } from 'lucide-react';
import { STATUS_OVERVIEW, SECTOR_COUNTS } from '../data/mockData';

interface NationalTransparencyOverviewProps {
  onSelectSector?: (sector: string) => void;
  onSelectStatus?: (status: string) => void;
}

export const NationalTransparencyOverview: React.FC<NationalTransparencyOverviewProps> = ({
  onSelectSector,
  onSelectStatus
}) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const getStatusIcon = (label: string) => {
    switch (label) {
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'In Progress':
        return <Cog className="w-5 h-5 text-blue-600" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'Delayed':
        return <AlertOctagon className="w-5 h-5 text-rose-500" />;
      default:
        return null;
    }
  };

  const maxCount = Math.max(...SECTOR_COUNTS.map((s) => s.count));

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 p-5 md:p-6 flex flex-col justify-between h-full">
      {/* Card Header */}
      <div>
        <h2 className="text-base sm:text-lg font-extrabold text-[#102A56] tracking-tight">
          National Transparency Overview
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Track. Verify. Hold Accountable.
        </p>

        {/* 4 Status Metric Mini-Cards (Matching Screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {STATUS_OVERVIEW.map((item) => (
            <div
              key={item.label}
              onClick={() => onSelectStatus?.(item.label)}
              className="p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xs">
                  {getStatusIcon(item.label)}
                </div>
                <span className="text-xs font-bold text-slate-700 truncate">
                  {item.label}
                </span>
              </div>

              <div className="mt-2.5">
                <span className="text-lg sm:text-xl font-black text-[#102A56] tabular-nums block leading-none">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
                  {item.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects by Sector Bar Chart (Matching Screenshot) */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#102A56]">
            Projects by Sector
          </h3>

          {/* Sector Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
            {SECTOR_COUNTS.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: s.color }}
                  className="w-2.5 h-2.5 rounded-full inline-block"
                />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Bars */}
        <div className="h-36 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2 sm:px-6">
          {SECTOR_COUNTS.map((sector) => {
            const heightPercent = Math.round((sector.count / maxCount) * 100);
            const isHovered = hoveredSector === sector.name;

            return (
              <div
                key={sector.name}
                onMouseEnter={() => setHoveredSector(sector.name)}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => onSelectSector?.(sector.name)}
                className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
              >
                {/* Count Label on top of Bar */}
                <span
                  className={`text-[11px] font-black tabular-nums transition-all ${
                    isHovered ? 'text-blue-700 -translate-y-1' : 'text-slate-600'
                  }`}
                >
                  {sector.count.toLocaleString()}
                </span>

                {/* Vertical Bar */}
                <div className="w-full max-w-[48px] h-full flex items-end mt-1.5">
                  <div
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: sector.color
                    }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isHovered ? 'opacity-90 scale-x-105 shadow-md' : 'opacity-100'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
