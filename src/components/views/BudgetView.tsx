import React from 'react';
import { Coins, TrendingUp, AlertTriangle, FileSpreadsheet, ArrowRight, Download } from 'lucide-react';
import { PUBLIC_SPENDING_DATA } from '../../data/mockData';

interface BudgetViewProps {
  onOpenSpendingModal: () => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({ onOpenSpendingModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#102A56] tracking-tight">
            Philippine National Budget Transparency Center
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Reconciling the General Appropriations Act (GAA), Department Allotments, and Actual COA Audit Observations.
          </p>
        </div>

        <button
          onClick={onOpenSpendingModal}
          className="px-4 py-2.5 bg-[#0757D9] hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center gap-2"
        >
          <Coins className="w-4 h-4" />
          <span>Launch Spending Intelligence Tool</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Highlights 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">National Tracked GAA</span>
          <span className="text-3xl font-black text-[#102A56] tabular-nums mt-1 block">₱ 1.24T</span>
          <p className="text-xs text-slate-500 mt-2">
            Aggregated infrastructure, health, education, and social development allotments.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Obligated Contracts</span>
          <span className="text-3xl font-black text-blue-700 tabular-nums mt-1 block">₱ 1.06T</span>
          <p className="text-xs text-slate-500 mt-2">
            85.5% obligation rate across registered PhilGEPS procurement dockets.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-rose-500 uppercase">Flagged COA Observations</span>
          <span className="text-3xl font-black text-rose-600 tabular-nums mt-1 block">₱ 24.8B</span>
          <p className="text-xs text-slate-500 mt-2">
            Discrepancies identified in progress pacing, unliquidated advances, or single-bid variations.
          </p>
        </div>
      </div>

      {/* Main Agency Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-extrabold text-[#102A56]">
            Agency Budget Performance & Audit Observations
          </h2>
          <button
            onClick={() => alert('Exporting full budget ledger')}
            className="text-xs font-bold text-[#0757D9] flex items-center gap-1.5 hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Full Ledger (CSV)</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {PUBLIC_SPENDING_DATA.map((item, idx) => (
            <div key={idx} className="py-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-extrabold text-sm text-[#102A56]">
                  {item.agencyOrSector}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    item.riskRating === 'Flagged Discrepancy'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {item.riskRating}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 tabular-nums pt-1">
                <div>Appropriated: ₱ {item.appropriated.toLocaleString()}M</div>
                <div>Obligated: ₱ {item.obligated.toLocaleString()}M</div>
                <div className="font-bold text-blue-700">
                  Disbursed: ₱ {item.disbursed.toLocaleString()}M
                </div>
              </div>

              {item.discrepancyNote && (
                <div className="text-xs bg-slate-50 p-2.5 rounded-xl text-slate-700 font-medium border border-slate-100">
                  <span className="font-bold text-slate-900">Note:</span> {item.discrepancyNote}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
