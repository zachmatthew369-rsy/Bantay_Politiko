import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Send,
  Lock,
  Radio,
  MessageSquare
} from 'lucide-react';
import { Politician } from '../../types';
import { CitizenFeedbackItem, VoteChoice } from '../../hooks/useSentimentStream';

interface CitizenSentimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  politician: Politician;
  userVote?: VoteChoice | null;
  isStreamConnected?: boolean;
  isSubmitting?: boolean;
  feedbackLog?: CitizenFeedbackItem[];
  onSubmitSentiment?: (
    politician: Politician,
    choice: 'supportive' | 'concerned' | 'undecided',
    comment: string
  ) => Promise<boolean> | void;
}

export const CitizenSentimentModal: React.FC<CitizenSentimentModalProps> = ({
  isOpen,
  onClose,
  politician,
  userVote,
  isStreamConnected = false,
  isSubmitting = false,
  feedbackLog = [],
  onSubmitSentiment
}) => {
  const [userComment, setUserComment] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<'supportive' | 'concerned' | 'undecided'>('supportive');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalResponses = politician.sentiment.totalResponses || 0;
  const supportiveVotes = politician.sentiment.notCorruptVotes || 0;
  const concernedVotes = politician.sentiment.corruptVotes || 0;
  const undecidedVotes = politician.sentiment.undecidedVotes || 0;

  const supportivePercent =
    totalResponses > 0 ? Math.round((supportiveVotes / totalResponses) * 100) : 0;
  const concernedPercent =
    totalResponses > 0 ? Math.round((concernedVotes / totalResponses) * 100) : 0;
  const undecidedPercent =
    totalResponses > 0 ? Math.max(0, 100 - supportivePercent - concernedPercent) : 0;

  const history = politician.sentiment.history || [];

  const officialFeedback = feedbackLog.filter((item) => item.politicianId === politician.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userVote || isSubmitting) return;
    if (onSubmitSentiment) {
      const ok = await onSubmitSentiment(politician, selectedSentiment, userComment.trim());
      if (ok) {
        setSubmitted(true);
        setUserComment('');
        setTimeout(() => {
          setSubmitted(false);
        }, 2500);
      }
    }
  };

  // Compute SVG coordinates from live history
  const chartLeft = 45;
  const chartRight = 565;
  const chartTop = 20;
  const chartBottom = 135;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;

  const getY = (pct: number) => chartBottom - (Math.max(0, Math.min(100, pct)) / 100) * chartHeight;
  const getX = (index: number, count: number) =>
    count <= 1 ? (chartLeft + chartRight) / 2 : chartLeft + (index / (count - 1)) * chartWidth;

  const supportivePoints = history
    .map((pt, i) => `${getX(i, history.length)},${getY(pt.supportivePercent)}`)
    .join(' ');
  const concernedPoints = history
    .map((pt, i) => `${getX(i, history.length)},${getY(pt.concernedPercent)}`)
    .join(' ');

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
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">Citizen Sentiment Intelligence</h2>
                {isStreamConnected && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-300/30 px-2 py-0.5 rounded-full">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    Live SSE Stream
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100">
                100% real-time verified citizen submissions for {politician.name} (Zero simulated data)
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
                Public sentiment reflects genuine, single-vote-locked citizen feedback. BantayPolitiko explicitly does not treat public polls as legal determination of corruption. Official findings require COA audit observation memos and judicial outcomes.
              </p>
            </div>
          </div>

          {/* 3 Sentiment Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800">Supportive / Not Corrupt</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-emerald-700 tabular-nums">
                  {supportivePercent}%
                </span>
                <span className="text-[11px] text-emerald-600 block tabular-nums">
                  {supportiveVotes.toLocaleString()} verified {supportiveVotes === 1 ? 'response' : 'responses'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-rose-800">Concerned / Misconduct</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-rose-700 tabular-nums">
                  {concernedPercent}%
                </span>
                <span className="text-[11px] text-rose-600 block tabular-nums">
                  {concernedVotes.toLocaleString()} verified {concernedVotes === 1 ? 'response' : 'responses'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Undecided</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-slate-700 tabular-nums">
                  {undecidedPercent}%
                </span>
                <span className="text-[11px] text-slate-500 block tabular-nums">
                  {undecidedVotes.toLocaleString()} verified {undecidedVotes === 1 ? 'response' : 'responses'}
                </span>
              </div>
            </div>
          </div>

          {/* Live Historical Trend Visualization */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-bold text-[#102A56] uppercase tracking-wider">
                  Live Verified Sentiment Trajectory
                </h3>
                <span className="text-[11px] text-slate-400">
                  Real-time progression updated immediately via SSE on every verified vote ({totalResponses.toLocaleString()} total)
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

            {history.length === 0 ? (
              <div className="h-36 w-full rounded-xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-4">
                <TrendingUp className="w-6 h-6 text-slate-300 mb-1.5" />
                <p className="text-xs font-bold text-slate-600">No verified votes recorded yet for {politician.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Percentages start strictly at 0%. Cast a verified vote below to begin the live SSE ledger.
                </p>
              </div>
            ) : (
              <div className="h-44 w-full">
                <svg viewBox="0 0 600 160" className="w-full h-full">
                  {/* Horizontal percentage grid lines */}
                  {[0, 25, 50, 75, 100].map((pct) => {
                    const y = getY(pct);
                    return (
                      <g key={pct}>
                        <line x1={chartLeft} y1={y} x2={chartRight} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                        <text x={chartLeft - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="600">
                          {pct}%
                        </text>
                      </g>
                    );
                  })}

                  {history.length >= 2 && (
                    <>
                      <polyline
                        points={supportivePoints}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points={concernedPoints}
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}

                  {history.map((pt, i) => {
                    const x = getX(i, history.length);
                    const timeLabel = new Date(pt.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    return (
                      <g key={`${pt.timestamp}-${i}`}>
                        <circle cx={x} cy={getY(pt.supportivePercent)} r="4" fill="#10B981" />
                        <circle cx={x} cy={getY(pt.concernedPercent)} r="4" fill="#EF4444" />
                        {(history.length <= 6 || i === 0 || i === history.length - 1 || i % Math.ceil(history.length / 5) === 0) && (
                          <text x={x} y="153" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">
                            #{pt.totalResponses} ({timeLabel})
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>

          {/* Anti-Brigading Methodology Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0757D9]" />
              <span>Anti-Brigading & Gated Single-Vote Security</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-600">
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block">Single Active Vote Lock</span>
                <span>Server enforces exactly 1 verified vote per citizen per public official via HMAC gate + device lock.</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block">Server-Authoritative SSE</span>
                <span>Every tally and percentage is computed on the backend ledger and pushed instantaneously via EventSource.</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block">Zero Synthetic Padding</span>
                <span>All counters start at 0 with zero fake baseline votes or static placeholder percentages.</span>
              </div>
            </div>
          </div>

          {/* Recent Verified Citizen Remarks */}
          {officialFeedback.length > 0 && (
            <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-2.5">
              <h4 className="text-xs font-bold text-[#102A56] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0757D9]" />
                <span>Verified Citizen Remarks for {politician.name} ({officialFeedback.length})</span>
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {officialFeedback.map((fb) => (
                  <div key={fb.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          fb.sentiment === 'supportive'
                            ? 'bg-emerald-100 text-emerald-800'
                            : fb.sentiment === 'concerned'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {fb.sentiment === 'supportive'
                          ? 'Supportive'
                          : fb.sentiment === 'concerned'
                          ? 'Concerned'
                          : 'Undecided'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Receipt {fb.receiptCode} · {fb.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-700">{fb.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Citizen Voice */}
          {userVote ? (
            <div className="border border-blue-200 rounded-2xl p-4 bg-blue-50/70 flex items-start gap-3 text-xs text-blue-900">
              <Lock className="w-4 h-4 text-[#0757D9] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Single-Vote Fairness Lock Active</strong>
                <span>
                  You have already cast your verified vote (
                  <strong>
                    {userVote === 'not_corrupt'
                      ? 'Supportive / Not Corrupt'
                      : userVote === 'corrupt'
                      ? 'Concerned / Misconduct'
                      : 'Undecided'}
                  </strong>
                  ) for {politician.name}. Duplicate submissions are blocked by the server security gate.
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-800">
                Submit Your Gated, Single-Vote Civic Sentiment
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
                placeholder="Optional: State reasons for your opinion (e.g. project delivery speed, healthcare access, budget transparency)..."
                rows={2}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />

              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Protected by Civic Voter Security Gate · 1 vote per official.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#0757D9] disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Recording...' : 'Submit Verified Sentiment'}</span>
                </button>
              </div>

              {submitted && (
                <p className="text-xs font-bold text-emerald-600 text-center">
                  ✓ Response verified and broadcast live via SSE!
                </p>
              )}
            </form>
          )}
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
