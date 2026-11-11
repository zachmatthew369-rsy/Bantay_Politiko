import React from 'react';
import { ShieldCheck, Scale, Users, Landmark, Eye, HeartHandshake } from 'lucide-react';
import { PhilippineSunLogo } from '../PhilippineSunLogo';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Brand Mission Hero */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm text-center space-y-4">
        <PhilippineSunLogo size={56} className="mx-auto" />
        <h1 className="text-3xl font-black text-[#102A56] tracking-tight">
          BantayPolitiko
        </h1>
        <p className="text-sm font-bold text-[#0757D9]">
          Tapat na Pamahalaan, Mas Magandang Bukas.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          BantayPolitiko is an independent Philippine civic technology platform empowering citizens to monitor elected public officials, inspect government infrastructure projects, verify public spending, and participate in evidence-based public accountability.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#102A56]">Non-Partisan & Evidence-Based</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We do not declare officials corrupt based on popularity polls or social media trends. Allegations are rigorously separated from official findings and court decisions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#102A56]">Citizen Verification</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Civic observers and accredited engineers upload dated, geotagged photographs to independently verify contractor progress against public tax disbursements.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#102A56]">Right to Correction</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Public servants and contractors are accorded full right-of-reply and correction mechanisms under Philippine Republic Act No. 6713 and Data Privacy principles.
          </p>
        </div>
      </div>
    </div>
  );
};
