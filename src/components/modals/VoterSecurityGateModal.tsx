import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, RefreshCw, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { PendingVoteRequest, VoterChallenge } from '../../hooks/useSentimentStream';

interface VoterSecurityGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: VoterChallenge | null;
  pendingVote: PendingVoteRequest | null;
  error: string | null;
  isSubmitting: boolean;
  onRefreshChallenge: () => void;
  onVerify: (answer: string, pledgeAccepted: boolean) => Promise<boolean>;
}

export const VoterSecurityGateModal: React.FC<VoterSecurityGateModalProps> = ({
  isOpen,
  onClose,
  challenge,
  pendingVote,
  error,
  isSubmitting,
  onRefreshChallenge,
  onVerify
}) => {
  const [answer, setAnswer] = useState('');
  const [pledgeAccepted, setPledgeAccepted] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setAnswer('');
      setPledgeAccepted(true);
    }
  }, [isOpen, challenge?.challengeId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || !pledgeAccepted || isSubmitting) return;
    await onVerify(answer, pledgeAccepted);
  };

  const voteLabel =
    pendingVote?.voteType === 'corrupt'
      ? 'Report Misconduct Concern'
      : pendingVote?.voteType === 'not_corrupt'
      ? 'Support Public Service'
      : 'Undecided Civic Feedback';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#061e47] via-[#073989] to-[#0757D9] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">Civic Voter Security Gate</h3>
              <p className="text-[11px] text-blue-100">One-Vote Fairness & Anti-Brigading Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label="Close security gate"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Pending Action Preview */}
          {pendingVote && (
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-xs space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 block">
                Pending Verified Sentiment
              </span>
              <div className="font-extrabold text-[#102A56]">{pendingVote.politician.name}</div>
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <Lock className="w-3.5 h-3.5 text-[#0757D9]" />
                <span>Action: {voteLabel}</span>
              </div>
            </div>
          )}

          {/* Security Guarantees */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-bold text-[#102A56] block">1 Vote Per Official</span>
              <span className="text-slate-500">Cryptographic cookie + device lock prevents duplicate voting.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-bold text-[#102A56] block">Real-Time SSE Ledger</span>
              <span className="text-slate-500">Zero simulated counts — only verified citizen clicks.</span>
            </div>
          </div>

          {/* Server Challenge Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#102A56]">
                {challenge ? challenge.question : 'Loading security check...'}
              </span>
              <button
                type="button"
                onClick={onRefreshChallenge}
                className="text-[11px] font-bold text-[#0757D9] hover:underline flex items-center gap-1"
                title="Generate new check"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New Check</span>
              </button>
            </div>

            <input
              type="text"
              inputMode="numeric"
              autoFocus
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter numeric answer..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-[#0757D9] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-bold text-[#102A56]"
            />
          </div>

          {/* Integrity Pledge Checkbox */}
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={pledgeAccepted}
              onChange={(e) => setPledgeAccepted(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#0757D9] focus:ring-blue-500"
            />
            <span>
              I confirm I am a genuine citizen casting my <strong>single fair vote</strong> for this public official, and I understand sentiment polling is separate from judicial or COA findings.
            </span>
          </label>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!challenge || !answer.trim() || !pledgeAccepted || isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#0757D9] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying...' : 'Verify & Submit Vote'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
