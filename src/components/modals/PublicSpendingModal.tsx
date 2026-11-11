import React, { useState } from 'react';
import {
  X,
  Coins,
  AlertTriangle,
  FileSpreadsheet,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Filter,
  Download
} from 'lucide-react';
import { PUBLIC_SPENDING_DATA } from '../../data/mockData';

interface PublicSpendingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicSpendingModal: React.FC<PublicSpendingModalProps> = ({ isOpen, onClose }) => {
  const [filterRating, setFilterRating] = useState<'All' | 'Flagged Discrepancy' | 'Normal'>('All');

  if (!isOpen) return null;

  const filteredData = PUBLIC_SPENDING_DATA.filter((item) => {
    if (filterRating === 'All') return true;
    return item.riskRating === filterRating;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0757D9] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Coins className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">Public Spending Intelligence</h2>
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                  DBM & COA Audited
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Identify unusual expenditure patterns, contract variations, and disbursement discrepancies
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close public spending modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Filter Discrepancies:</span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
              {(['All', 'Flagged Discrepancy', 'Normal'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRating(r)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    filterRating === r
                      ? 'bg-[#0757D9] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert('Exporting DBM GAA & COA Audit Dataset (.CSV)')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export Financial Data</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Macro Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <span className="text-[11px] text-slate-500 font-bold uppercase block">
                Total Tracked Appropriations
              </span>
              <span className="text-2xl font-black text-[#102A56] tabular-nums mt-1 block">
                ₱ 1.24 Trillion
              </span>
              <span className="text-xs text-blue-700 font-semibold mt-1 block">
                General Appropriations Act (GAA)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold uppercase block">
                Total Obligated Amount
              </span>
              <span className="text-2xl font-black text-slate-800 tabular-nums mt-1 block">
                ₱ 1.06 Trillion
              </span>
              <span className="text-xs text-slate-500 font-semibold mt-1 block">
                85.5% Obligation Rate
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-[11px] text-amber-800 font-bold uppercase block">
                Flagged Variances & Delays
              </span>
              <span className="text-2xl font-black text-amber-900 tabular-nums mt-1 block">
                ₱ 24.8 Billion
              </span>
              <span className="text-xs text-amber-700 font-semibold mt-1 block">
                COA Observation Review Active
              </span>
            </div>
          </div>

          {/* Department Breakdown Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 font-bold text-xs text-[#102A56]">
              Expenditure Pipeline by Department / Agency (Values in Million PHP)
            </div>

            <div className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => {
                const disbPercent = Math.round((item.disbursed / item.appropriated) * 100);
                const isFlagged = item.riskRating === 'Flagged Discrepancy';
                const isModerate = item.riskRating === 'Moderate Concern';

                return (
                  <div key={idx} className="p-4.5 hover:bg-slate-50/80 transition-colors space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#102A56]">
                          {item.agencyOrSector}
                        </span>
                        {isFlagged ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                            <AlertTriangle className="w-3 h-3" /> Flagged Discrepancy
                          </span>
                        ) : isModerate ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            Moderate Delay
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Normal Flow
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-bold text-slate-500">
                        Disbursement Rate: <span className="text-[#0757D9]">{disbPercent}%</span>
                      </div>
                    </div>

                    {/* Progress Comparison Bars */}
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                        <div
                          style={{ width: `${(item.disbursed / item.appropriated) * 100}%` }}
                          className="h-full bg-emerald-500"
                        />
                        <div
                          style={{
                            width: `${((item.obligated - item.disbursed) / item.appropriated) * 100}%`
                          }}
                          className="h-full bg-blue-400"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 tabular-nums">
                        <span>Appropriated: ₱ {item.appropriated.toLocaleString()}M</span>
                        <span>Obligated: ₱ {item.obligated.toLocaleString()}M</span>
                        <span className="font-bold text-emerald-700">
                          Disbursed: ₱ {item.disbursed.toLocaleString()}M
                        </span>
                      </div>
                    </div>

                    {/* Discrepancy Audit Note */}
                    {item.discrepancyNote && (
                      <div
                        className={`text-xs p-2.5 rounded-xl border font-medium ${
                          isFlagged
                            ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                            : isModerate
                            ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                            : 'bg-slate-50 border-slate-100 text-slate-600'
                        }`}
                      >
                        <strong className="font-bold">Audit Observation:</strong> {item.discrepancyNote}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400">Source: Department of Budget & Management (eBudget DBM Portal)</span>
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
