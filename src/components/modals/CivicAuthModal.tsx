import React, { useState } from 'react';
import { X, ShieldCheck, User, CheckCircle2, Lock } from 'lucide-react';
import { PhilippineSunLogo } from '../PhilippineSunLogo';

interface CivicAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userRole: string, userName: string) => void;
}

export const CivicAuthModal: React.FC<CivicAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [role, setRole] = useState<'citizen' | 'engineer' | 'auditor'>('citizen');
  const [email, setEmail] = useState('citizen.juan@example.ph');
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const roleNames = {
      citizen: 'Registered Citizen (Voter ID Verified)',
      engineer: 'Civic Civil Engineer Monitor',
      auditor: 'Public Finance Researcher'
    };
    setStatusMsg(`Logging in as ${roleNames[role]}...`);
    setTimeout(() => {
      onLoginSuccess(roleNames[role], email.split('@')[0]);
      setStatusMsg('');
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 to-[#0757D9] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PhilippineSunLogo size={36} />
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Citizen Authentication</h2>
              <p className="text-[11px] text-blue-100">BantayPolitiko Civic Access Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Selection */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Select Civic Role</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('citizen')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  role === 'citizen'
                    ? 'border-[#0757D9] bg-blue-50 text-[#0757D9] shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Citizen
              </button>
              <button
                type="button"
                onClick={() => setRole('engineer')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  role === 'engineer'
                    ? 'border-[#0757D9] bg-blue-50 text-[#0757D9] shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Engineer
              </button>
              <button
                type="button"
                onClick={() => setRole('auditor')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  role === 'auditor'
                    ? 'border-[#0757D9] bg-blue-50 text-[#0757D9] shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Researcher
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Email / Philippine Voter ID</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Security Verification</label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Biometric / SMS OTP Authentication Active</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0757D9] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In to Civic Portal</span>
          </button>

          {statusMsg && (
            <p className="text-xs font-bold text-emerald-600 text-center animate-pulse">
              {statusMsg}
            </p>
          )}

          <div className="text-[11px] text-slate-400 text-center pt-2">
            Non-partisan government oversight platform protected by Republic Act No. 10173 (Data Privacy Act of 2012).
          </div>
        </form>
      </div>
    </div>
  );
};
