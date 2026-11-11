import React from 'react';
import { FileText, Download, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const reports = [
    {
      title: '2026 Q3 National Infrastructure Progress & Discrepancy Audit',
      agency: 'DPWH Oversight Committee & Citizen Engineering Alliance',
      date: 'October 2026',
      size: '4.2 MB · PDF',
      summary: 'Audited physical vs financial accomplishment on 8,732 active Philippine roads, bridges, and public hospitals.'
    },
    {
      title: 'Consolidated SALN & Asset Growth Verification Study (2022-2025)',
      agency: 'Civil Service Commission / Ombudsman Archive',
      date: 'September 2026',
      size: '2.8 MB · PDF',
      summary: 'Statistical asset disclosure review across 1,248 elected provincial governors, city mayors, and legislators.'
    },
    {
      title: 'Central Visayas Health Facilities Modernization Milestone Report',
      agency: 'Department of Health Regional Office VII',
      date: 'August 2026',
      size: '1.9 MB · PDF',
      summary: 'Detailed inspection milestones, equipment calibration status, and bed capacity additions in Cebu and Bohol.'
    },
    {
      title: 'BantayPolitiko Citizen Sentiment Sampling Methodology & Safeguards',
      agency: 'Civic Data Science & Anti-Brigading Taskforce',
      date: 'July 2026',
      size: '890 KB · PDF',
      summary: 'Whitepaper detailing voter hash verification, IP geofencing, and ethical separation of public sentiment from judicial facts.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <h1 className="text-2xl font-black text-[#102A56] tracking-tight">
          Public Reports & Documentation Center
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Open access public audit observations, engineering core sampling reviews, and governance whitepapers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((r, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                <span>{r.date}</span>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{r.size}</span>
              </div>
              <h3 className="text-base font-extrabold text-[#102A56]">{r.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{r.summary}</p>
              <div className="text-[11px] font-semibold text-blue-700">Author: {r.agency}</div>
            </div>

            <button
              onClick={() => alert(`Downloading ${r.title}`)}
              className="w-full py-2.5 bg-slate-100 hover:bg-[#0757D9] hover:text-white text-slate-800 text-xs font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Report</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
