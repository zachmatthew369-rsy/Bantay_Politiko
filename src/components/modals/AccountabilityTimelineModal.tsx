import React, { useState } from 'react';
import {
  X,
  Scale,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Building,
  Shield,
  ExternalLink,
  Info
} from 'lucide-react';
import { ACCOUNTABILITY_TIMELINE } from '../../data/mockData';

interface AccountabilityTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountabilityTimelineModal: React.FC<AccountabilityTimelineModalProps> = ({
  isOpen,
  onClose
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen) return null;

  const filteredItems = ACCOUNTABILITY_TIMELINE.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'coa' && item.type === 'coa_audit') return true;
    if (filterType === 'ombudsman' && item.type === 'ombudsman') return true;
    if (filterType === 'cleared' && item.evidenceStatus === 'Dismissed') return true;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified Official Record':
        return (
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Shield className="w-3 h-3" /> Official COA / Gov Record
          </span>
        );
      case 'Dismissed':
        return (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Cleared / Case Terminated
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Under Civic Evaluation
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0757D9] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Scale className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">Public Accountability Timeline</h2>
                <span className="bg-emerald-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                  Verified Legal Registry
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Traceable official findings, COA audit memos, ombudsman resolutions, and judicial outcomes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close accountability timeline modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-[#0757D9] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Records ({ACCOUNTABILITY_TIMELINE.length})
            </button>
            <button
              onClick={() => setFilterType('coa')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'coa'
                  ? 'bg-[#0757D9] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              COA Audit Memos
            </button>
            <button
              onClick={() => setFilterType('ombudsman')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'ombudsman'
                  ? 'bg-[#0757D9] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Ombudsman Cases
            </button>
            <button
              onClick={() => setFilterType('cleared')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'cleared'
                  ? 'bg-[#0757D9] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Dismissed / Cleared
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Trust Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Evidence-Based Integrity Mandate:</strong>
              <p className="mt-0.5 leading-relaxed">
                All records presented in this timeline correspond to documented government filings, official Commission on Audit (COA) releases, Ombudsman dockets, or official Gazette publications. Unverified claims remain strictly cordoned until corroboration.
              </p>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {filteredItems.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#0757D9] flex items-center justify-center shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0757D9]" />
                </div>

                {/* Card Container */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition-all space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {item.date}
                    </span>
                    {getStatusBadge(item.evidenceStatus)}
                  </div>

                  <h3 className="text-sm font-extrabold text-[#102A56]">{item.title}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    {item.summary}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {item.officialEntity}
                    </span>
                    <span className="font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      Ref: {item.sourceReference}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400">Right-to-reply supported under R.A. 6713 transparency rules</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
