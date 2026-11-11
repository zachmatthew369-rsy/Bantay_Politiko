import React from 'react';
import { MapPin, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { GovernmentProject } from '../types';

interface LatestProjectsCardProps {
  projects: GovernmentProject[];
  onSelectProject: (project: GovernmentProject) => void;
  onViewAllProjects: () => void;
}

export const LatestProjectsCard: React.FC<LatestProjectsCardProps> = ({
  projects,
  onSelectProject,
  onViewAllProjects
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            In Progress
          </span>
        );
      case 'Ongoing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Ongoing
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 p-5 md:p-6 flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h2 className="text-base sm:text-lg font-extrabold text-[#102A56] tracking-tight">
          Latest Government Projects
        </h2>
        <button
          onClick={onViewAllProjects}
          className="text-xs font-bold text-[#0757D9] hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Projects List */}
      <div className="divide-y divide-slate-100 flex-1 flex flex-col justify-between py-2">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="py-3 sm:py-3.5 flex items-center gap-3 sm:gap-4 hover:bg-slate-50/80 p-2 rounded-xl transition-all duration-150 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="w-18 h-16 sm:w-22 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 shadow-2xs group-hover:shadow-sm transition-shadow">
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Project Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-[#102A56] group-hover:text-[#0757D9] transition-colors truncate">
                  {project.title}
                </h3>
                <div className="shrink-0">{getStatusBadge(project.status)}</div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{project.location}</span>
              </div>

              {/* Budget & Allocated */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-[11px]">
                <span className="font-extrabold text-[#102A56] tabular-nums">
                  ₱ {project.budget.toLocaleString()}
                </span>
                <span className="text-slate-400 font-medium">
                  Allocated: ₱ {project.allocatedAmount.toLocaleString()}
                </span>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div
                    style={{ width: `${project.completionPercentage}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-[#0757D9] rounded-full transition-all duration-500"
                  />
                </div>
                <span className="text-[11px] font-extrabold text-[#102A56] tabular-nums w-8 text-right">
                  {project.completionPercentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="pt-2 text-center text-[11px] text-slate-400 font-medium">
        Click any project to inspect verified photos and contracts
      </div>
    </div>
  );
};
