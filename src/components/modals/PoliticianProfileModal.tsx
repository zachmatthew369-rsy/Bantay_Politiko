import React, { useState } from 'react';
import {
  X,
  MapPin,
  Briefcase,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Award,
  FolderKanban,
  FileCheck2,
  Scale,
  TrendingUp,
  Share2,
  ExternalLink,
  ShieldCheck,
  Building,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Globe,
  Lock,
  Radio
} from 'lucide-react';
import { Politician } from '../../types';
import { PoliticianAvatar } from '../PoliticianAvatar';
import { VoteChoice } from '../../hooks/useSentimentStream';

interface PoliticianProfileModalProps {
  politician: Politician | null;
  isOpen: boolean;
  onClose: () => void;
  onSetAsFeatured: (politician: Politician) => void;
  onVote: (type: 'corrupt' | 'not_corrupt', politician: Politician) => void;
  onOpenProjectTracker?: (projectId: string) => void;
  userVote?: VoteChoice | null;
  isSubmitting?: boolean;
  isStreamConnected?: boolean;
}

export const PoliticianProfileModal: React.FC<PoliticianProfileModalProps> = ({
  politician,
  isOpen,
  onClose,
  onSetAsFeatured,
  onVote,
  onOpenProjectTracker,
  userVote,
  isSubmitting = false,
  isStreamConnected = false
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'achievements' | 'pending' | 'sentiment'>('overview');

  if (!isOpen || !politician) return null;

  const totalResponses = politician.sentiment.totalResponses || 0;
  const corruptPercent =
    totalResponses > 0
      ? Math.round((politician.sentiment.corruptVotes / totalResponses) * 100)
      : 0;
  const notCorruptPercent = totalResponses > 0 ? 100 - corruptPercent : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-950 via-[#063A91] to-[#0757D9] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">{politician.name}</h2>
                <span className="bg-white/15 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/25">
                  {politician.roleCategory}
                </span>
                {politician.isVerified && (
                  <span className="bg-blue-400 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    ✓ Verified Official
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100 flex flex-wrap items-center gap-2 mt-0.5">
                <span>{politician.position}</span>
                <span>·</span>
                <span>{politician.jurisdiction}</span>
                {politician.politicalAffiliation && (
                  <>
                    <span>·</span>
                    <span className="text-yellow-200 font-semibold">{politician.politicalAffiliation}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSetAsFeatured(politician);
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Set as Monitored Official</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Snapshot Banner */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row items-center gap-6">
          {/* Portrait with Philippine Flag Accent Frame */}
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-md bg-gradient-to-b from-[#0038A8] via-[#F4F7FC] to-[#CE1126] p-0.5">
            <PoliticianAvatar
              name={politician.name}
              avatarUrl={politician.avatarUrl}
              roleCategory={politician.roleCategory}
              className="w-full h-full rounded-xl"
              showFlagAccent={true}
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Declared SALN</span>
              <span className="text-sm font-black text-[#102A56] tabular-nums">{politician.salnNetWorth}</span>
              <span className="text-[10px] text-emerald-600 block font-semibold">CSC Compliant ({politician.salnYear})</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Supervised Projects</span>
              <span className="text-sm font-black text-blue-700 tabular-nums">{politician.totalProjects} Projects</span>
              <span className="text-[10px] text-slate-500 block font-semibold">{politician.totalBudgetAllocated}</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Citizen Sentiment</span>
              <span className="text-sm font-black text-emerald-600 tabular-nums">{notCorruptPercent}% Approval</span>
              <span className="text-[10px] text-slate-400 block font-medium">{totalResponses.toLocaleString()} Votes</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">COA / Legal Status</span>
              <span className="text-sm font-black text-slate-800">
                {politician.verifiedRecords.ongoingInquiries > 0 ? '1 Inquiry In Review' : 'Clean Record'}
              </span>
              <span className="text-[10px] text-emerald-600 block font-semibold">
                {politician.verifiedRecords.clearedCases} Case(s) Cleared
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex flex-wrap items-center gap-2 sm:gap-4 bg-white">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Overview & Career</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'achievements'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Key Achievements</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Associated Projects ({politician.associatedProjectsList?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>COA & Pending Inquiries ({politician.pendingInquiriesList?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('sentiment')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'sentiment'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Public Sentiment & Polls</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Biography */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-[#102A56]">Biography & Public Service Profile</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {politician.biography}
                </p>
              </div>

              {/* Official Office Contact & Source Provenance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#102A56] flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>Official Office & Contact Details</span>
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div>
                      <span className="font-bold text-slate-800">Term:</span> {politician.currentTerm}
                    </div>
                    {politician.district && (
                      <div>
                        <span className="font-bold text-slate-800">District / Scope:</span> {politician.district}
                      </div>
                    )}
                    {politician.partyList && (
                      <div>
                        <span className="font-bold text-slate-800">Party-List:</span> {politician.partyList}
                      </div>
                    )}
                    {politician.contactInfo?.officeAddress && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{politician.contactInfo.officeAddress}</span>
                      </div>
                    )}
                    {politician.contactInfo?.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="tabular-nums">{politician.contactInfo.phone}</span>
                      </div>
                    )}
                    {politician.contactInfo?.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{politician.contactInfo.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#102A56] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Directory Source & Verification</span>
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div>
                      <span className="font-bold text-slate-800">Primary Source:</span>{' '}
                      {politician.sourceName || 'Official Philippine Government Directory'}
                    </div>
                    {politician.lastVerifiedDate && (
                      <div>
                        <span className="font-bold text-slate-800">Last Synced:</span> {politician.lastVerifiedDate}
                      </div>
                    )}
                    {politician.committees && politician.committees.length > 0 && (
                      <div className="pt-1">
                        <span className="font-bold text-slate-800 block mb-1">Committees:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {politician.committees.map((c, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800 text-[10px] font-bold"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {politician.sourceUrl && (
                      <a
                        href={politician.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-700 hover:underline font-bold pt-1"
                      >
                        <span>Visit Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Public Office Career History */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-[#102A56] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Public Office Career History</span>
                </h3>
                <div className="space-y-2">
                  {politician.publicOfficeHistory.map((office, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>{office}</span>
                      </span>
                      <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                        Verified Term
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Non-Partisan Distinction Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                <strong className="font-bold flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-amber-600" />
                  <span>Non-Partisan Verification Standard:</span>
                </strong>
                <p className="leading-relaxed">
                  BantayPolitiko strictly adheres to Article XI of the 1987 Philippine Constitution (Accountability of Public Officers). Public sentiment is an expression of citizen opinion and is legally distinct from formal Commission on Audit (COA) disallowances or judicial convictions.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-[#102A56] flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>Documented Public Achievements & Milestone Deliverables</span>
              </h3>

              <div className="space-y-3">
                {politician.achievements && politician.achievements.length > 0 ? (
                  politician.achievements.map((ach, i) => (
                    <div
                      key={i}
                      className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">{ach}</span>
                        <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">
                          Verified through official agency accomplishment reports
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-500 p-4 bg-slate-50 rounded-xl">
                    No documented achievements listed yet in current term.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ASSOCIATED PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#102A56] flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-blue-600" />
                  <span>Government Infrastructure & Programs Under Jurisdiction</span>
                </h3>
                <span className="text-xs text-slate-500">
                  Total Allocated: <strong className="text-[#0757D9]">{politician.totalBudgetAllocated}</strong>
                </span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                {politician.associatedProjectsList && politician.associatedProjectsList.length > 0 ? (
                  politician.associatedProjectsList.map((p) => (
                    <div key={p.id} className="p-4 hover:bg-slate-50 transition-colors space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#102A56]">{p.title}</h4>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {p.location}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-[#102A56] tabular-nums block">{p.budget}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            p.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : p.status === 'In Progress' || p.status === 'Ongoing'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${p.completionPercentage}%` }}
                            className="h-full bg-gradient-to-r from-blue-500 to-[#0757D9] rounded-full"
                          />
                        </div>
                        <span className="text-[11px] font-extrabold text-slate-700 tabular-nums w-8 text-right">
                          {p.completionPercentage}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-xs text-slate-400">No projects actively assigned.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PENDING MATTERS & COA AUDITS */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-[#102A56] flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>COA Audit Observation Memoranda & Legal Inquiries</span>
              </h3>

              <div className="space-y-3">
                {politician.pendingInquiriesList && politician.pendingInquiriesList.length > 0 ? (
                  politician.pendingInquiriesList.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-800">{inq.title}</span>
                        <span className="text-[10px] font-bold text-slate-400">{inq.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-500">{inq.agency}</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          inq.status.includes('Dismissed') || inq.status.includes('Cleared')
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <span className="font-bold text-slate-800 block">No Pending Adverse Findings</span>
                    <span>This official currently has zero pending COA disallowance notices or Ombudsman preliminary inquiries.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PUBLIC SENTIMENT & DIRECT VOTING */}
          {activeTab === 'sentiment' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Citizen Approval vs Misconduct Concerns
                    </h3>
                    {isStreamConnected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Radio className="w-2.5 h-2.5 animate-pulse" />
                        Live SSE
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 tabular-nums">
                    Total Verified Responses: {totalResponses.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  {totalResponses > 0 && (
                    <>
                      <div style={{ width: `${corruptPercent}%` }} className="bg-red-500 h-full transition-all duration-500" />
                      <div style={{ width: `${notCorruptPercent}%` }} className="bg-emerald-500 h-full transition-all duration-500" />
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-bold tabular-nums">
                  <span className="text-red-600">
                    {corruptPercent}% Misconduct Concern ({politician.sentiment.corruptVotes.toLocaleString()})
                  </span>
                  <span className="text-emerald-600">
                    {notCorruptPercent}% Approval / Support ({politician.sentiment.notCorruptVotes.toLocaleString()})
                  </span>
                </div>

                {userVote && (
                  <div className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 flex items-center justify-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#0757D9]" />
                    <span>
                      Single-Vote Fairness Lock active — your verified vote ({userVote === 'corrupt' ? 'Misconduct Concern' : userVote === 'not_corrupt' ? 'Support Public Service' : 'Undecided'}) is permanently recorded for this official.
                    </span>
                  </div>
                )}

                {/* Direct Vote Buttons inside modal */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onVote('corrupt', politician)}
                    disabled={Boolean(userVote) || isSubmitting}
                    className={`p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                      userVote === 'corrupt'
                        ? 'bg-red-700 text-white ring-4 ring-red-200 cursor-not-allowed'
                        : userVote
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-red-600 to-rose-700 text-white hover:brightness-105 active:scale-95'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{userVote === 'corrupt' ? '✓ Voted Misconduct Concern' : 'Report Misconduct'}</span>
                  </button>
                  <button
                    onClick={() => onVote('not_corrupt', politician)}
                    disabled={Boolean(userVote) || isSubmitting}
                    className={`p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                      userVote === 'not_corrupt'
                        ? 'bg-emerald-700 text-white ring-4 ring-emerald-200 cursor-not-allowed'
                        : userVote
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:brightness-105 active:scale-95'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{userVote === 'not_corrupt' ? '✓ Voted Support Service' : 'Support Public Service'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">BantayPolitiko Open Civic Dossier</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSetAsFeatured(politician);
                onClose();
              }}
              className="px-4 py-2 bg-[#0757D9] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-2xs"
            >
              Monitor on Homepage Dashboard
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
