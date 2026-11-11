import React, { useState } from 'react';
import {
  X,
  MapPin,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Camera,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  UploadCloud
} from 'lucide-react';
import { GovernmentProject } from '../../types';

interface ProjectTrackerModalProps {
  project: GovernmentProject | null;
  onClose: () => void;
}

export const ProjectTrackerModal: React.FC<ProjectTrackerModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'milestones' | 'contracts'>('photos');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Banner */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0757D9] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <FileCheck className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">{project.title}</h2>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-blue-100 flex items-center gap-2">
                <span>PhilGEPS Ref: {project.philGepsRef}</span>
                <span>·</span>
                <span>{project.location}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close project tracker modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Snapshot Header */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Approved Budget</span>
            <span className="font-extrabold text-[#102A56] text-sm tabular-nums">
              ₱ {project.budget.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Implementing Agency</span>
            <span className="font-bold text-slate-800 truncate block">{project.implementingAgency}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Contractor / JV</span>
            <span className="font-bold text-slate-800 truncate block">{project.contractor}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Target Turnover</span>
            <span className="font-bold text-blue-700 block">{project.expectedCompletion}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-3">
          <button
            onClick={() => setActiveTab('photos')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'photos'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Inspection Photographs ({project.inspectionPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('milestones')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'milestones'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Milestones & Disbursements ({project.milestones.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contracts')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'contracts'
                ? 'border-[#0757D9] text-[#0757D9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Risk Indicators & COA Flags ({project.riskIndicators.length})</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Feature B: Side-by-side Progress Verification */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-900">
                      Independent Progress Verification
                    </span>
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                      Physical vs Reported
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Compares contractor billing claims against dated, geotagged on-site engineering inspection photographs.
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 font-bold block">Contractor Reported</span>
                    <span className="text-xl font-black text-blue-800 tabular-nums">
                      {project.completionPercentage}%
                    </span>
                  </div>
                  <div className="text-slate-300 font-bold text-lg">vs</div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 font-bold block">Audited Physical</span>
                    <span className="text-xl font-black text-emerald-700 tabular-nums">
                      {project.inspectionPhotos[0]?.actualVerifiedProgress || project.completionPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Inspection Photographs Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.inspectionPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition-shadow"
                  >
                    {/* Photo with Discrepancy Badge */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.stageName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        📅 {photo.date}
                      </div>
                      {photo.hasDiscrepancy ? (
                        <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Discrepancy Flagged</span>
                        </div>
                      ) : (
                        <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified In-Spec</span>
                        </div>
                      )}
                    </div>

                    {/* Photo Details */}
                    <div className="p-4 space-y-2">
                      <h4 className="text-sm font-bold text-[#102A56]">{photo.stageName}</h4>
                      <div className="text-xs text-slate-500 flex items-center justify-between">
                        <span>Reported: {photo.reportedProgress}%</span>
                        <span className="font-bold text-slate-800">
                          Verified: {photo.actualVerifiedProgress}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        "{photo.notes}"
                      </p>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                        <span>Inspector: {photo.inspector}</span>
                        <span className="font-semibold text-blue-600">{photo.inspectorAffiliation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Citizen Contributor Upload Box */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50/50">
                <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-800">
                  Have you visited this project site recently?
                </h4>
                <p className="text-[11px] text-slate-500 max-w-md mx-auto mt-0.5">
                  Citizens and accredited civic monitors may submit dated photographs and inspection observations.
                </p>
                <button
                  onClick={() => setUploadSuccess(true)}
                  className="mt-3 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                  <span>Submit Dated Photo Evidence</span>
                </button>
                {uploadSuccess && (
                  <p className="text-xs font-bold text-emerald-600 mt-2">
                    ✓ Mock upload received. Queued for civic monitor review.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#102A56]">
                Contractual Milestones & Payment Schedule
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                {project.milestones.map((m) => (
                  <div key={m.id} className="p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {m.status === 'completed' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {m.status === 'in_progress' && (
                        <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                      )}
                      {m.status === 'pending' && (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                      )}
                      <div>
                        <span className="font-bold text-slate-800 block">{m.title}</span>
                        <span className="text-[11px] text-slate-400">
                          Target: {m.targetDate} {m.completionDate ? `(Finished: ${m.completionDate})` : ''}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-[#0757D9] block">{m.budgetDisbursed}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {m.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#102A56]">
                Documented Risk Indicators & Audit Observations
              </h3>
              {project.riskIndicators.map((risk, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border ${
                    risk.level === 'Moderate' || risk.level === 'High'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase tracking-wide">
                      {risk.type}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-current">
                      Level: {risk.level}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{risk.description}</p>
                  <div className="text-[11px] text-slate-500 mt-2 font-medium">
                    Evidence Source: {risk.evidenceSource}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400">{project.sourceOfInfo}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
