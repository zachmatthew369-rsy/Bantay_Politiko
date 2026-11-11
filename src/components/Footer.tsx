import React from 'react';
import { PhilippineSunLogo } from './PhilippineSunLogo';
import { ShieldCheck, Scale, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 pt-12 pb-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <PhilippineSunLogo size={36} />
              <span className="text-xl font-black text-[#0757D9]">
                Bantay<span className="text-[#102A56]">Politiko</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Tapat na Pamahalaan, Mas Magandang Bukas. Dedicated to nonpartisan civic transparency, public infrastructure monitoring, and responsible citizen empowerment.
            </p>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider">
              Platform Features
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-blue-600 transition-colors">
                  Transparency Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('politicians')} className="hover:text-blue-600 transition-colors">
                  Politician Directory & SALN
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-blue-600 transition-colors">
                  Project Accountability Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('budget')} className="hover:text-blue-600 transition-colors">
                  Public Spending Intelligence
                </button>
              </li>
            </ul>
          </div>

          {/* Official Open Data Sources */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider">
              Integrated Data Sources
            </h4>
            <ul className="space-y-1 text-slate-500 text-[11px]">
              <li>• Commission on Audit (COA AAR)</li>
              <li>• Department of Budget and Management (DBM GAA)</li>
              <li>• Philippine Gov. Electronic Procurement (PhilGEPS)</li>
              <li>• DPWH Infra Monitoring Portal</li>
              <li>• Civil Service Commission (CSC SALN Archives)</li>
            </ul>
          </div>

          {/* Legal Trust Notice */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider">
              Legal Trust Standard
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              In accordance with democratic due process, citizen polling expresses public sentiment and is distinctly segregated from formal administrative and court determinations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 BantayPolitiko. Tapat na Pamahalaan, para sa Bawat Pilipino.
          </div>
          <div className="flex items-center gap-4">
            <span>Republic Act No. 10173 Compliant</span>
            <span>·</span>
            <span>Non-Partisan Civic Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
