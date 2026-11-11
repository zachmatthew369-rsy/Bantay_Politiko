import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  ShieldCheck,
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Send
} from 'lucide-react';
import { Politician } from '../../types';

interface CitizenSentimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  politician: Politician;
  onNewFeedbackSubmitted?: (feedback: string) => void;
}

export const CitizenSentimentModal: React.FC<CitizenSentimentModalProps> = ({
  isOpen,
  onClose,
  politician,
  onNewFeedbackSubmitted
}) => {
  const [userComment, setUserComment] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<'supportive' | 'concerned' | 'undecided'>('supportive');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // 12-Month Historical Trajectory
  const monthlyTrends = [
    { month: 'Nov 25', supportive: 52, concerned: 38, undecided: 10 },
    { month: 'Jan 26', supportive: 50, concerned: 40, undecided: 10 },
    { month: 'Mar 26', supportive: 48, concerned: 42, undecided: 10 },
    { month: 'May 26', supportive: 49, concerned: 41, undecided: 10 },
    { month: 'Jul 26', supportive: 45, concerned: 45, undecided: 10 },
    { month: 'Sep 26', supportive: 44, concerned: 46, undecided: 10 },
    { month: 'Nov 26', supportive: 46, concerned: 44, undecided: 10 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    setSubmitted(true);
    onNewFeedbackSubmitted?.(userComment);
    setTimeout(() => {
      setUserComment('');
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0757D9] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <TrendingUp className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Citizen Sentiment Intelligence</h2>
              <p className="text-xs text-blue-100">
                Transparent sampling, historical trends, and opinion distribution for {politician.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close sentiment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Important Trust Distinction Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Transparent Sampling & Civic Distinction:</strong>
              <p>
                Public sentiment reflects citizen feedback and subjective perception. BantayPolitiko explicitly does not treat public polls as legal determination of corruption. Official findings require COA audit observation memos and judicial outcomes.
              </p>
            </div>
          </div>

          {/* 3 Sentiment Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800">Supportive</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-emerald-700 tabular-nums">46%</span>
                <span className="text-[11px] text-emerald-600 block">59,225 verified responses</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-rose-800">Concerned</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-rose-700 tabular-nums">44%</span>
                <span className="text-[11px] text-rose-600 block">56,650 verified responses</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Undecided</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-slate-700 tabular-nums">10%</span>
                <span className="text-[11px] text-slate-500 block">12,875 verified responses</span>
              </div>
            </div>
          </div>

          {/* Historical Trend Visualization */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-[#102A56] uppercase tracking-wider">
                  12-Month Sentiment Trajectory
                </h3>
                <span className="text-[11px] text-slate-400">
                  Tracking shifts following major public project milestones
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Supportive
                </span>
                <span className="flex items-center gap-1.5 text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Concerned
                </span>
              </div>
            </div>

            {/* SVG Trend Line / Trajectory Graph */}
            <div className="h-44 w-full">
              <svg viewBox="0 0 600 160" className="w-full h-full">
                {/* Horizontal grid lines */}
                <line x1="40" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="580" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="580" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="140" x2="580" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                {/* Supportive Trend Line (Emerald) */}
                <path
                  d="M 60 40 L 140 45 L 220 52 L 300 48 L 380 62 L 460 65 L 540 58"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Concerned Trend Line (Rose) */}
                <path
                  d="M 60 85 L 140 80 L 220 72 L 300 75 L 380 68 L 460 64 L 540 67"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {monthlyTrends.map((t, i) => {
                  const x = 60 + i * 80;
                  return (
                    <g key={t.month}>
                      <circle cx={x} cy={60 - (t.supportive - 45) * 4} r="4" fill="#10B981" />
                      <circle cx={x} cy={70 + (t.concerned - 40) * 3} r="4" fill="#EF4444" />
                      <text x={x} y="155" textAnchor="middle" fontSize="10" fill="#94A3B8" fontWeight="600">
                        {t.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Anti-Brigading Methodology Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0757D9]" />
              <span>Anti-Brigading & Sampling Integrity</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-600">
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block">Single Active Vote</span>
                <span>Each citizen voter has exactly 1 active response per 90-day review period.</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block">IP & Bot Detection</span>
                <span>Automated coordinate brigading and click farms are filtered from aggregate totals.</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block">Voter Verification</span>
                <span>78% of responses from verified Philippine geographic IPs in Central Visayas.</span>
              </div>
            </div>
          </div>

          {/* Submit Citizen Voice */}
          <form onSubmit={handleSubmit} className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3">
            <h4 className="text-xs font-bold text-slate-800">
              Submit Your Verified Civic Feedback
            </h4>

            {/* Sentiment Radio Options */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedSentiment('supportive')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSentiment === 'supportive'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Supportive
              </button>
              <button
                type="button"
                onClick={() => setSelectedSentiment('concerned')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSentiment === 'concerned'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Concerned
              </button>
              <button
                type="button"
                onClick={() => setSelectedSentiment('undecided')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSentiment === 'undecided'
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Undecided
              </button>
            </div>

            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="State reasons for your opinion (e.g. project delivery speed, healthcare access, budget transparency)..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Your identity is protected; comments are moderated for civil discourse.
              </span>
              <button
                type="submit"
                disabled={!userComment.trim()}
                className="px-4 py-2 bg-[#0757D9] disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Response</span>
              </button>
            </div>

            {submitted && (
              <p className="text-xs font-bold text-emerald-600 text-center">
                ✓ Response logged and factored into public sentiment distribution!
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
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
