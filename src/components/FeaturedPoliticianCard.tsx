import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  MapPin,
  Briefcase,
  Calendar,
  FileCheck2,
  Scale,
  ShieldAlert,
  Info,
  TrendingUp,
  Share2
} from 'lucide-react';
import { Lock, Radio } from 'lucide-react';
import { Politician } from '../types';
import { PoliticianAvatar } from './PoliticianAvatar';
import { VoteChoice } from '../hooks/useSentimentStream';

interface FeaturedPoliticianCardProps {
  politician: Politician;
  userVote?: VoteChoice | null;
  isStreamConnected?: boolean;
  isSubmitting?: boolean;
  onOpenSentimentModal: () => void;
  onOpenTimelineModal: () => void;
  onVote: (type: 'corrupt' | 'not_corrupt') => void;
}

export const FeaturedPoliticianCard: React.FC<FeaturedPoliticianCardProps> = ({
  politician,
  userVote,
  isStreamConnected = false,
  isSubmitting = false,
  onOpenSentimentModal,
  onOpenTimelineModal,
  onVote
}) => {
  const [activeView, setActiveView] = useState<'sentiment' | 'verified'>('sentiment');

  const handleVoteClick = (type: 'corrupt' | 'not_corrupt') => {
    if (userVote || isSubmitting) return;
    onVote(type);
  };

  const totalResponses = politician.sentiment.totalResponses || 0;
  const corruptPercent =
    totalResponses > 0
      ? Math.round((politician.sentiment.corruptVotes / totalResponses) * 100)
      : 0;
  const notCorruptPercent = totalResponses > 0 ? 100 - corruptPercent : 0;

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 overflow-hidden flex flex-col h-full relative">
      {/* Top Header Badge: "Featured Politician" */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <div className="inline-flex items-center gap-1.5 bg-[#0757D9] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
          <span>Featured Politician</span>
        </div>

        {/* View Mode Toggle: Sentiment vs Verified Records */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-[11px] font-semibold">
          <button
            onClick={() => setActiveView('sentiment')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeView === 'sentiment'
                ? 'bg-white text-[#0757D9] shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Citizen Poll
          </button>
          <button
            onClick={() => setActiveView('verified')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              activeView === 'verified'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-3 h-3 text-emerald-600" />
            <span>Verified Facts</span>
          </button>
        </div>
      </div>

      {/* Politician Profile Header (Matching Screenshot Layout) */}
      <div className="px-6 py-3 flex items-start gap-4">
        {/* Official Portrait with Philippine Flag Accent Frame */}
        <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-md bg-gradient-to-b from-[#0038A8] via-[#F4F7FC] to-[#CE1126] p-0.5">
          <PoliticianAvatar
            name={politician.name}
            avatarUrl={politician.avatarUrl}
            roleCategory={politician.roleCategory}
            className="w-full h-full rounded-xl"
            showFlagAccent={true}
          />
        </div>

        {/* Politician Details */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#102A56] tracking-tight truncate">
              {politician.name}
            </h2>
            {politician.isVerified && (
              <span title="Verified Official Identity" className="text-[#0757D9] shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5">
            {politician.position}
          </p>

          <div className="flex flex-col gap-1.5 mt-2.5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{politician.jurisdiction}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded text-[11px]">
                {politician.roleCategory}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate font-medium">{politician.currentTerm}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body: Sentiment vs Verified Records */}
      {activeView === 'sentiment' ? (
        <div className="px-6 py-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#102A56] text-center mb-3">
              What Do You Think About Their Performance?
            </h3>

            {/* Voting Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Corrupt / Report Misconduct (Red Button) */}
              <button
                onClick={() => handleVoteClick('corrupt')}
                disabled={Boolean(userVote) || isSubmitting}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl text-white transition-all shadow-md ${
                  userVote === 'corrupt'
                    ? 'ring-4 ring-red-300 scale-[1.02] bg-gradient-to-r from-red-700 to-red-800 cursor-not-allowed'
                    : userVote
                    ? 'bg-slate-300 text-slate-500 shadow-none cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#DC3545] to-[#E63946] hover:brightness-105 active:scale-95 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className={`w-4 h-4 ${userVote && userVote !== 'corrupt' ? 'text-slate-500' : 'fill-white text-red-600'}`} />
                  <span className="text-sm font-extrabold tracking-wide">Corrupt</span>
                </div>
                <span className={`text-[10px] font-medium mt-0.5 ${userVote && userVote !== 'corrupt' ? 'text-slate-500' : 'text-red-100'}`}>
                  {userVote === 'corrupt' ? '✓ Your Verified Vote' : '(Report Misconduct)'}
                </span>
              </button>

              {/* Not Corrupt / Support Service (Green Button) */}
              <button
                onClick={() => handleVoteClick('not_corrupt')}
                disabled={Boolean(userVote) || isSubmitting}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl text-white transition-all shadow-md ${
                  userVote === 'not_corrupt'
                    ? 'ring-4 ring-emerald-300 scale-[1.02] bg-gradient-to-r from-emerald-700 to-emerald-800 cursor-not-allowed'
                    : userVote
                    ? 'bg-slate-300 text-slate-500 shadow-none cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#13A66A] to-[#10B981] hover:brightness-105 active:scale-95 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className={`w-4 h-4 ${userVote && userVote !== 'not_corrupt' ? 'text-slate-500' : 'fill-white text-emerald-700'}`} />
                  <span className="text-sm font-extrabold tracking-wide">Not Corrupt</span>
                </div>
                <span className={`text-[10px] font-medium mt-0.5 ${userVote && userVote !== 'not_corrupt' ? 'text-slate-500' : 'text-emerald-100'}`}>
                  {userVote === 'not_corrupt' ? '✓ Your Verified Vote' : '(Support Service)'}
                </span>
              </button>
            </div>

            {userVote && (
              <div className="mb-3 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-[11px] font-semibold text-blue-800 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-[#0757D9]" />
                <span>Single-Vote Fairness Lock active for this official</span>
              </div>
            )}

            {/* Current Public Sentiment Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span>Current Public Sentiment</span>
                  {isStreamConnected && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      <Radio className="w-2.5 h-2.5 animate-pulse" />
                      Live SSE
                    </span>
                  )}
                </span>
                <button
                  onClick={onOpenSentimentModal}
                  className="text-[11px] text-[#0757D9] hover:underline flex items-center gap-1 font-bold"
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>Trends</span>
                </button>
              </div>

              {/* Gradient Progress Bar */}
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                {totalResponses > 0 && (
                  <>
                    <div
                      style={{ width: `${corruptPercent}%` }}
                      className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-500"
                    />
                    <div
                      style={{ width: `${notCorruptPercent}%` }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
                    />
                  </>
                )}
              </div>

              {/* Percentage Labels */}
              <div className="flex items-center justify-between text-xs font-bold pt-0.5">
                <span className="text-red-600 tabular-nums">
                  {corruptPercent}% Corrupt ({politician.sentiment.corruptVotes.toLocaleString()})
                </span>
                <span className="text-emerald-600 tabular-nums">
                  {notCorruptPercent}% Not Corrupt ({politician.sentiment.notCorruptVotes.toLocaleString()})
                </span>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Total Responses: {totalResponses.toLocaleString()}</span>
            <span>Last Updated: {politician.sentiment.lastUpdated}</span>
          </div>
        </div>
      ) : (
        /* Verified Public Records View (Trust Architecture) */
        <div className="px-6 py-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Constitutional Legal Distinction:</strong> Citizen sentiment represents subjective public perception and does not constitute judicial evidence of misconduct.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-medium block">Declared SALN Net Worth</span>
                <span className="font-extrabold text-[#102A56] text-sm tabular-nums">{politician.salnNetWorth}</span>
                <span className="text-[10px] text-slate-400 block">Year: {politician.salnYear} (CSC Compliant)</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-medium block">COA Audit Inquiries</span>
                <span className="font-extrabold text-blue-700 text-sm tabular-nums">
                  {politician.verifiedRecords.coaAuditFindings} Memo(s) Recorded
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  {politician.verifiedRecords.ongoingInquiries} Pending Review
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Ombudsman Legal Status:</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  {politician.verifiedRecords.ongoingInquiries > 0
                    ? `${politician.verifiedRecords.ongoingInquiries} Inquiry In Review`
                    : `Cleared (${politician.verifiedRecords.clearedCases} Resolved)`}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Review verified public filings, official notices, and legal findings in the public accountability archive.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenTimelineModal}
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-[#0757D9] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Open Verified Accountability Timeline →</span>
          </button>
        </div>
      )}
    </div>
  );
};
